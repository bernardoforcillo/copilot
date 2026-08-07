# Scaling and infrastructure

A trigger→action framework for scaling and infrastructure decisions: what to reach for, and — more
often the part that matters — what *not* to reach for yet. Every entry below states the mechanism,
the concrete signal that should trigger the change, and the action to take. The meta-rule at the end
governs all the others: justify every layer of complexity against numbers you actually have today,
not numbers you're guessing you'll need someday.

## Statelessness

**Source:** Adam Wiggins, *The Twelve-Factor App*, Factor VI "Processes" (2011). https://12factor.net/processes

Twelve-Factor's sixth factor requires application processes to be stateless and share-nothing: no
process may assume that anything it wrote to local memory or local disk during one request will
still be there for the next, because the next request can land on a different replica, or on the
same process after a restart or redeploy. Anything that genuinely needs to persist — a user
session, an uploaded file, a computed result, a job's progress — belongs in a stateful backing
service (a database, object storage, or a shared cache) addressed over the network, never held
in-process. This is exactly what makes horizontal scaling and clean restarts cheap: any request
can be routed to any replica, and any replica can be killed and replaced without losing data,
because no single replica is the sole owner of anything.

**Trigger → action:** Before reaching for an in-memory cache, a session map, or a "just keep it in
a package-level variable" shortcut, ask whether a second replica or a restart would lose or
fragment that data. If the answer is yes, move it to a backing service now — retrofitting
statelessness after replicas are already carrying divergent in-memory state is a much bigger job
than starting stateless.

## Horizontal-first, but not dogma

**Source:** Google, *SRE Workbook*, "Rethinking Task Size in SRE" (sre.google/workbook).

The SRE Workbook treats horizontal scaling — running more, smaller replicas — as the strong
industry-default for redundancy and simplicity: replicas are easy to reason about, easy to
load-balance across, and any single replica's failure only removes a fraction of total capacity.
But the same guidance pushes back on treating "more, smaller tasks" as an unconditional good — it
argues elite practice weighs each replica's per-task overhead (scheduling cost, fixed per-replica
memory, coordination cost) against the actual reduction in failure-domain risk it buys, rather than
reflexively maximizing replica count. Vertical scaling — a bigger machine, not more of them — earns
its place when a workload is genuinely CPU- or memory-bound in a way replicas cannot parallelize: a
single long-running compute job with state that can't be sharded across processes, as distinct from
a stateless request-serving handler that scales horizontally by definition.

**Trigger → action:** Default to adding replicas for anything that serves discrete requests. Reach
for vertical scaling only once profiling shows one genuinely unsplittable job is CPU- or
memory-bound and more replicas would not parallelize it — not as a first response to "it's slow."

## Microservices threshold

**Source:** Martin Fowler, "MonolithFirst" / "MicroservicePremium" (martinfowler.com/bliki, 2015).

Fowler's central point is that microservices carry a real, non-optional operational premium —
network calls where there were function calls, distributed transactions where there were database
transactions, independent deployment and versioning, service discovery, distributed tracing — and
that almost every successful microservice system on public record started as a monolith that later
got too big, not as microservices from day one. MonolithFirst's advice follows directly: build the
monolith first and extract services only once a specific pain point has proven itself, because good
service boundaries are hard to draw correctly before the domain is understood well enough to know
where they belong. The real trigger for splitting is a *proven, isolated bottleneck* — a component
whose scaling needs, deployment cadence, or failure-isolation needs have measurably diverged from
the rest of the system — or a genuine team-ownership boundary, not a traffic level and not
"microservices by default."

Evidence runs in both directions and is public record, not folklore. Shopify has publicly described
keeping a modular monolith — a Ruby on Rails codebase past 2.8M lines, with Packwerk enforcing
module boundaries in-process — splitting a piece out only where a boundary violation had already
proven costly, not preemptively. Segment publicly reversed a microservices migration in its
"Goodbye Microservices" account, consolidating back after the operational overhead of many small
services outweighed the isolation benefits it bought. Amazon Prime Video's 2023 published
postmortem went the opposite direction for one specific component: it moved a monitoring service
*from* a microservices/Step Functions architecture *to* a monolith, citing the orchestration and
storage overhead of the distributed version as the proven bottleneck, and reported a 90% cost
reduction from the consolidation.

**Trigger → action:** Start new systems as a monolith. Split out a service only once you can name
the specific, measured bottleneck or team-ownership boundary a split actually fixes — never split
because of an assumed future traffic level or because microservices are the perceived default
architecture. Evidence points in either direction, split or consolidate, never by default.

## Gateway / routing

**Source:** Melvin Conway, "Conway's Law" (1968; originally "How Do Committees Invent?", Datamation).
**Source:** Matthew Skelton & Manuel Pais, *Team Topologies* (IT Revolution Press, 2019), the "Reverse Conway Maneuver".

Conway's Law holds that any system design mirrors the communication structure of the organization
that built it — teams end up building components that match how they talk to each other, not some
abstractly optimal decomposition. Team Topologies turns this into a deliberate technique, the
"Reverse Conway Maneuver": to get a particular architecture, shape team boundaries first and let
system structure follow. A gateway is the direct consequence of this dynamic, not an independent
scaling mechanism in itself — once team-boundary-driven service proliferation has produced enough
independently-owned services that direct client-to-service addressing becomes unreasonable (clients
tracking N service locations, N auth schemes, N versioning policies), a gateway exists to shield
clients from that internal structure. Netflix's open-sourced Zuul is the canonical instance of this
pattern in production.

**Trigger → action:** Once more than one service exists, route client traffic through a gateway
rather than direct service-to-service addressing from the client, and keep every non-gateway
service off the public network entirely. Don't stand up a gateway before a second service exists —
there is nothing yet for it to shield.

## AuthN vs. authZ

Authentication (verifying who a caller is) and authorization (what that caller may do) have
different scaling properties once a token scheme exists. Authentication reduces to a local
cryptographic check — verify a signed token's signature and expiry against a known public
key/secret — with no network hop required per request. Authorization can piggyback on claims
already inside that validated token (scopes, roles) for coarse-grained checks, escalating to a live
lookup only when a decision genuinely depends on current, mutable state (a permission just revoked,
a resource-level ACL). Token *issuance* — the one operation that needs private key material and a
single source of truth for identity — stays centralized in exactly one place; every service that
merely validates a token duplicates only the public verification logic, never the signing logic.

**Trigger → action:** Once a token scheme exists, validate tokens locally at each service's edge
instead of calling a central auth service per request. Never let a second service acquire the
private signing key or its own issuance logic — that turns one source of truth into several that
can silently drift apart.

## Large files / blobs

Proxying a large upload through an application server means that server holds the full request body
in memory or on local disk, ties up a request-handling worker for the entire transfer, and then
re-uploads the same bytes a second time to wherever they actually need to live — tripling data
movement for no benefit. Storing blob bytes directly in a relational database compounds the
problem: it bloats the database's storage and backup size with data its own indexing and query
engine can't do anything useful with, and it competes with transactional traffic for I/O. The
presigned-URL pattern avoids both: the API writes only metadata (filename, size, owner, a pointer)
and returns a short-lived, size-capped URL that authorizes a direct write to object storage; the
client then uploads (or downloads) directly against that URL, and the application server never
touches the bytes at all.

**Trigger → action:** Any endpoint accepting or serving a file of meaningful size should return a
presigned upload/download URL instead of streaming the bytes itself. Never add a blob or file
column to a relational table — store a pointer (an object-storage key) instead.

## Async fan-out

**Source:** AWS Well-Architected Framework, Reliability Pillar (aws.amazon.com/architecture/well-architected).

The Reliability Pillar's loose-coupling guidance is to decouple components so a failure or slowdown
in one doesn't cascade synchronously into its callers: where an interaction genuinely doesn't need
an immediate response, an asynchronous, message-based hand-off (a queue, a stream, a pub/sub topic)
replaces a direct synchronous call, so the caller can return as soon as the message is durably
accepted rather than blocking on the callee's full processing time. That decoupling is not free, and
the cost is explicit: adopting a broker obligates a dead-letter-queue design for messages that can't
be processed, redrive logic to retry or reroute them, an explicit ordering guarantee (or an explicit
acceptance that there isn't one), and handling for the eventual-consistency window between "event
published" and "every consumer has processed it." Segment's public microservices reversal is the
concrete caution here — some of that story's operational overhead came from message-passing
machinery adopted before it was actually earning its keep.

**Trigger → action:** Introduce a broker once more than one downstream consumer needs to react to
the same event, or once a slow downstream step would otherwise block a caller that doesn't need to
wait for it. Don't add a queue for a single-producer/single-consumer interaction a direct call
already serves correctly — that's machinery adopted before it's earned, not simplification.

## Caching vs. CDN

An in-memory key-value store (Redis and equivalents) and a CDN solve two different problems that get
conflated because both get called "caching." A KV store is optimized for small, hot,
frequently-mutated data — session lookups, computed aggregates, feature flags, rate-limit counters —
served from RAM with sub-millisecond latency to a comparatively small number of application-server
callers. A CDN is optimized for large, mostly-static assets — images, video, downloadable files,
whole HTML responses — served from edge locations physically close to a geographically distributed
set of end users, at a scale of bandwidth and request volume a KV store's memory footprint was never
designed to absorb. Putting a large asset in a KV store wastes expensive RAM on something a CDN
would serve more cheaply and closer to the user; putting small, frequently-changing metadata behind
a CDN adds edge-cache-invalidation complexity for data that changes too often to benefit from it.

**Trigger → action:** Route small, frequently-changing metadata to an in-memory KV cache. Route
large or static assets to a CDN. Never store blobs or large assets in the KV layer, and don't reach
for CDN edge caching to solve an application-level hot-read problem.

## Rate limiting

Rate limiting protects a system from two related but distinct risks: abusive traffic (credential
stuffing, scraping, deliberate overload) and cost blowup from legitimate-looking but excessive usage
(a misbehaving client retrying in a tight loop, a metered downstream API being hammered). The
standard mechanism is a fast counter store — an in-memory or Redis-backed sliding-window or
token-bucket counter keyed by user ID or IP — checked at the edge (the gateway or load balancer)
before a request reaches application logic, so rejected requests cost as little compute as possible.
Because it adds a request-path dependency and a class of false-positive risk (legitimate users
tripping the limit), it is not free complexity to carry from day one.

**Trigger → action:** Add rate limiting once there's a credible, specific abuse or cost-blowup
risk — a public unauthenticated endpoint, a metered third-party API behind it, or an observed abuse
pattern — not as a reflexive day-one default on every endpoint.

## The meta-rule

**Source:** Google, *SRE Workbook*, "Non-Abstract Large System Design" (NALSD). https://sre.google/workbook/non-abstract-design/

NALSD's discipline is to design against concrete numbers — today's actual QPS, today's actual data
volume, an observed growth rate — rather than an abstract, hypothetical "web-scale" target with no
measured basis behind it. Every layer of scaling or infrastructure complexity added above the
current system has to be justified against a number that's real right now, not a projection of
where the system might be at some unspecified future point. In practice that means the trigger for
every entry in this file should be traceable to something concrete and dated: a specific
memory-wiki entry, a specific incident, a specific PR description that states the current, observed
pain point being solved — never "we'll need this eventually" with no observed pain point behind it.

**Trigger → action:** Before adopting any pattern in this file, write down the current, measured
number (or the specific incident) that makes it necessary. If that number doesn't exist yet, the
change is premature — solve the concrete problem you actually have today, not the one you're
imagining for later.

## Checklist

- Keep request handlers stateless — persist nothing in-process; anything that must survive a
  request goes to a database, object storage, or a shared cache.
- Scale via replicas by default; reach for vertical scaling only when a specific, unsplittable job
  is proven CPU- or memory-bound.
- Don't split a new service without a proven, measured bottleneck or a real team-ownership
  boundary — never by traffic level, never by default.
- Route through a gateway once more than one service exists; never put a non-gateway service
  directly on the public network.
- Centralize token issuance in one place; validate tokens at the edge, locally, without a network
  hop per request.
- Use presigned URLs for blobs; never proxy them through the app server and never store blob bytes
  in a relational database.
- Introduce a broker only once more than one consumer needs to react to the same event — not for a
  single-producer/single-consumer interaction.
- Justify every scaling or infra decision against today's actual, observed numbers (QPS, data
  volume, an incident) — never a hypothetical future scale.

## Applying this to a Go + Kubernetes project

On Bernardo's concrete default stack — Go services running on Kubernetes behind Traefik — each
trigger above maps onto a specific primitive:

- Horizontal scaling means adjusting a Kubernetes `Deployment`'s replica count, not standing up a
  new service.
- Before reaching for a new `services/<name>`, prefer adding a new domain inside an existing Go
  service's `internal/core` — a hexagonal-layout binary already isolates domains internally from
  each other (see `code-organization.md`), so a new bounded context often fits there without
  becoming a new deployable at all.
- The gateway pattern maps to a Traefik `IngressRoute`.
- If a given project isn't on this stack, apply the same trigger→action logic against whatever the
  equivalent primitive is: a process manager's or PaaS's scaling knob instead of a `Deployment`, a
  different reverse proxy instead of Traefik, a different service-boundary mechanism instead of
  `internal/core`. The decisions above are stack-agnostic even where the worked example isn't.
