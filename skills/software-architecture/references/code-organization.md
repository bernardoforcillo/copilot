# Code organization

A layered, dependency-direction architecture: which layer a given piece of code belongs to, which
direction dependencies between layers are allowed to point, and why a violation of that direction is
the single most common way a codebase degrades as it grows — a problem that compounds once AI agents
are writing code alongside people, because an agent reproduces whatever pattern it finds already in
the code, good or bad, with no independent judgment about whether that pattern was ever the right one.

## Origin

**Source:** Alistair Cockburn, "Hexagonal Architecture" (alistair.cockburn.us, Sept 2005).
**Source:** Robert C. Martin, "The Clean Architecture" (blog.cleancoder.com, 2012; book *Clean
Architecture*, 2017).
**Source:** Eric Evans, *Domain-Driven Design* (2003), ch. 4, "Layered Architecture".

Cockburn's original hexagonal write-up is usually flattened to "the domain doesn't touch the
database," but the actual intent is broader and symmetric: ports exist on *both* sides of the
application core — the driving side (UI, tests, and automation that exercise the application) and
the driven side (the database, mail, and other external services the application depends on) — so
the application can be developed and tested in isolation from whatever sits on either side of it.
Martin's Clean Architecture gives that symmetry a name, the Dependency Rule: "source code
dependencies can only point inwards; nothing in an inner circle can know anything about an outer
circle." Evans' *Domain-Driven Design*, ch. 4, is the origin of the concrete stack most teams
actually build from — UI → Application → Domain → Infrastructure — the layered shape the rest of
this file's five-layer breakdown is a direct descendant of.

## The layers

Five layers, from the outside in:

- **UI/presentation** — expresses user intent. No business logic, no direct vendor or database
  calls.
- **Transport/interface** — validates input, authenticates, authorizes, and delegates. Owns no
  business decisions of its own.
- **Domain** — owns the product/business decisions. The only layer allowed to call
  capabilities/adapters.
- **Capabilities/adapters** — each adapter wraps exactly one external system, behind an interface
  *defined by the domain layer*, not by the adapter itself.
- **Shared foundations** — cross-cutting config and shared packages. The one layer allowed to be
  imported from more than one place in the chain above; every other layer is imported from at most
  the layer immediately outside it.

## The dependency rule

Never skip a layer, and never let a lower layer import a higher one. UI must never import a vendor
SDK or a database driver directly — if a feature needs a vendor integration, it goes through the
transport and domain layers, never straight from the UI. Domain must never import a concrete
adapter: domain defines the interface, the adapter implements it and imports domain, never the
reverse. The transport layer's job is deliberately narrow — validate, authenticate, authorize,
delegate — and that narrowness is load-bearing. A vaguer job description for the same layer ("bridge
between client and backend") is exactly how a handler quietly accumulates caching, retries, and
business rules until it has become an unmaintainable god layer that owns decisions it was never
supposed to own.

## Build order, reversed

The dependency rule above describes *call* direction. Build order for a feature that spans more than
one layer runs the other way: data model/contracts (domain plus shared foundations) first, then the
interface/transport wiring, then UI/polish last. Building UI before the backend layer it depends on
means the implementer — human or AI — fills the gap with an assumption about what the backend will
look like, and that assumption gets thrown away once the real backend lands, wasting the work spent
polishing UI against it.

## Enforce mechanically, not just by convention

Convention alone erodes as a codebase grows, and it erodes faster with AI agents in the loop, since
an agent reproduces whatever pattern it finds already in the code — including a violation, if that's
what's there — rather than independently re-deriving the boundary the convention was supposed to
protect. Some mechanical backstop is worth having once convention alone stops holding: a lint rule
forbidding a vendor import outside the adapter layer, a dependency-forbidding package-manager config,
a `go vet`-style static check for the domain-to-adapter direction. Not every project needs one of
these from day one; it is worth investigating once a boundary violation has actually happened, not
pre-emptively for a violation that hasn't.

## Naming and supply-chain hygiene

One predictable naming convention across a project's own files reduces guesswork for both people and
AI agents; whatever convention the project already uses, follow it rather than introducing a second
one alongside it. Supply-chain hygiene is a related but separate concern, and different ecosystems
have different supply-chain threat models — don't port one ecosystem's mitigation to another by
analogy. npm-style install-time script gating, for example, has no meaningful Go equivalent, because
Go modules never execute install-time scripts in the first place. Go's structural defense is a
different mechanism aimed at a different risk: checksum verification via `go.sum` against a public
transparency log, plus vulnerability scanning via a tool such as `govulncheck` — a defense against
tampered or known-vulnerable code, not against a too-fresh package version.

## Checklist

- Map every change to exactly one layer before writing code.
- Never let UI import a vendor SDK or a DB driver directly.
- Never let domain import a concrete adapter — domain defines the interface, adapters implement it.
- Keep the transport layer to validate-authenticate-authorize-delegate, nothing more.
- For a cross-layer feature, build data model/contracts first, then wiring, then UI.
- Watch for a transport handler quietly accumulating business logic — that's the "fat controller"
  failure mode.
- Add a mechanical enforcement backstop once convention alone stops holding a boundary.

## Applying this to Go services + Vite/React apps

Bernardo's concrete default: in a Go service, `internal/core` is the domain layer — it owns and
defines the adapter interfaces. `internal/adapter/*` is the capabilities layer: it implements those
interfaces and imports `internal/core`, never the reverse. `internal/adapter/{httpapi,connectapi}`-
style packages are the transport layer. In a Vite/React app, `src/features/*` is the UI layer, and
`src/lib/api` (or the project's equivalent) is the transport layer that calls the backend. If a typed
schema — protobuf- or OpenAPI-generated types — already enforces the frontend-backend contract, don't
bolt on a second runtime validator at that same boundary; it would duplicate a contract that's
already generated and type-checked. If a given project isn't on this stack, map the same five layers
onto its actual module boundaries rather than skipping the exercise.
