# Structural views

What the system *is*: the things, their relationships, the units that deploy, and the machines they
run on. Four views carry almost all the value — class/domain, package, component, deployment — with
object and composite structure as occasional specialists.

## Domain / class view

The most useful and most abused diagram in UML. Its value is in the constraints, not the boxes.

**Model the domain, not the code.** At CIM/PIM level (`uml-core-concepts.md`) a class is a concept
with identity, state, and rules — not a struct. Getters, DTOs, repositories, and framework types
belong to the PSM level and usually shouldn't appear at all.

**Draw the aggregate boundaries.** Borrowing the one idea from Domain-Driven Design that changes
diagrams: group entities into aggregates with a single root, where the root owns the lifecycle of
everything inside (composition), and everything *outside* references the aggregate only by the
root's identity — never by a pointer to an inner part. The boundary tells you three things at once:
what has to be consistent in one transaction, what can be split later without pain, and where a
lock or a version number belongs.

**Put the multiplicities on.** `Order 1 —— 1..* LineItem` is a claim you can test: an order with no
lines is invalid, and deleting the order deletes the lines. Most domain bugs are a multiplicity
nobody wrote down.

**Invariants belong on the model.** UML's OCL is heavier than most projects want, but a note on the
diagram — `{sum(lines.total) == order.total}`, `{status transitions only via the state machine}` —
is the cheap version, and it's usually the thing the reader most needs.

Checklist before you keep a class diagram:
- Every association has multiplicities on both ends.
- Every composition genuinely owns its parts' lifecycle.
- No generalization that isn't substitutable — roles and statuses are attributes.
- Aggregate roots identified; cross-aggregate references are by id.
- Nothing on it exists only because the ORM needs it.

**Mapping to Go:** an aggregate is usually a package with the root type exported and inner types
unexported or constructed only through the root. **Mapping to a Vite/React tree:** the domain model
is not the component tree — it's what the store and the API client speak; the component tree is a
different (development) view. `software-architecture`'s `${CLAUDE_PLUGIN_ROOT}/skills/software-architecture/references/code-organization.md` carries
the layering rules both map into.

## Object view

A snapshot of instances with real values. Rarely worth a permanent diagram, occasionally the
fastest way to settle an argument about a confusing structure ("show me one actual example"), and
genuinely useful in a bug report or a test fixture description.

## Package view

Modules and their dependencies. The one diagram that catches architectural drift, because the
question it answers — *does anything point the wrong way?* — is exactly the rule
`code-organization.md` states: dependencies point inward, cycles are forbidden. A package diagram
whose arrows form a cycle is a finding, not a picture.

Keep it coarse (top-level modules only), and prefer generating it from the code where the tooling
allows — a hand-drawn package diagram is stale within a month, and a stale one is worse than none
because it's still believed.

## Component view

Deployable or independently-replaceable pieces and, crucially, their **provided and required
interfaces**. This is the view that makes a boundary real: the component's promise is the provided
interface, its dependencies are the required ones, and anything else touching it is a violation.

Draw it when the question is *what talks to what, through which contract* — before splitting a
service, when introducing a third party, when a boundary keeps leaking. Annotate third-party
components with `«external»`: the distinction between "we can change this" and "we cannot" is the
single most decision-relevant thing on the diagram.

C4's container level is the same view with fewer ceremonies, and usually the better default —
`mermaid-cookbook.md` has both.

## Deployment view

Nodes (machines, pods, managed services), the artifacts that run on them, and the communication
paths between. It answers *what runs where*, and it is the only structural view that natively
carries **cost**, which is why `profit-modeling.md` starts here.

Include, or it isn't answering the question:
- **Replica counts and their scaling rule** — fixed, HPA on CPU, queue-length based, or manual.
- **Managed services and their pricing unit** — per request, per GB stored, per GB egressed, per
  active user, per token.
- **The trust boundaries** — which hops cross the internet, which cross a VPC, which are in-process.
- **The stateful nodes** — where the data actually lives, and what its backup and restore path is
  (`operating-model`'s `${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/reliability-and-incidents.md` makes that non-negotiable).

For a Kubernetes/Flux deploy, the node structure mirrors the `<namespace>/<app>/<channel>/` layout
in `software-architecture`'s `${CLAUDE_PLUGIN_ROOT}/skills/software-architecture/references/kubernetes-deployment-conventions.md`; the deployment
diagram is that layout with cost and traffic annotations added.

## Composite structure view

Internals of a component in terms of parts, ports, and connectors. Specialist. Worth it exactly
once: when a single component has enough internal wiring that people keep getting it wrong, and
you're not ready to split it. If you find yourself drawing it often, the component is too big —
that's the finding.

## Choosing between them

| Situation | View |
| --- | --- |
| Arguing about what the business concepts *are* | Domain/class at CIM level |
| Arguing about consistency, transactions, or locking | Domain/class with aggregate boundaries |
| Suspecting architectural drift or a dependency cycle | Package |
| Splitting a service, or adding a third party | Component (or C4 container) |
| Planning capacity, cost, or failure domains | Deployment |
| Onboarding someone to an unfamiliar system | C4 context, then container — nothing finer |
