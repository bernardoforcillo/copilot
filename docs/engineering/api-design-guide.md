# API design guide

An API is a one-way door with a long memory: once something observes a behavior, that behavior is
a contract (Hyrum's law). Design accordingly — the cost of getting the shape right is paid once,
the cost of getting it wrong is paid on every future change.

## Before the first endpoint

- **Name the resources from the domain model**, not from the database tables and not from the UI
  screens. If the API's nouns and the domain's nouns differ, one of them is wrong.
- **Decide the style once and state why**: REST for resource-shaped domains and cacheable reads;
  RPC (gRPC, JSON-RPC) for action-shaped, high-throughput, internal surfaces; GraphQL only when
  many clients need genuinely different projections of the same graph — its cost is server-side
  complexity and unbounded query shapes, and it should have to earn that.
- **Write the failure catalogue before the happy path.** The error codes, their meanings, and what
  a client is supposed to *do* about each. An API whose errors are all 500 has no failure design.

## Contract rules

- **Versioning**: version the surface, not the individual endpoint. Add fields freely; never
  repurpose or remove one without a new version. A removed field is a broken client you can't see.
- **Idempotency**: every unsafe operation that a client might retry takes an idempotency key, and
  the server stores the result keyed by it. Retries are not optional — networks make them for you.
- **Pagination from day one**, cursor-based rather than offset. A list endpoint without pagination
  is a production incident with a delay fuse.
- **Explicit nullability and enums.** "Absent" and "null" must not mean different things by
  accident, and an open enum needs an `unknown` case clients can survive.
- **Time is UTC, RFC 3339, always.** Money is an integer of the minor unit plus a currency code,
  never a float.
- **Filtering, sorting, and field selection are features**, each with a cost. Add on the third
  concrete request, not the first hypothetical one.

## Security and limits

- AuthN (who you are) and authZ (what you may do) are separate layers; authorize on every request
  against the resource, never on the route alone.
- Rate limit per principal, and return the limit, remaining, and reset in headers so clients can
  behave.
- Validate at the boundary and reject unknown fields on write paths — permissive parsing becomes
  an accidental contract.
- Never put secrets, ids that leak counts, or PII in URLs; they land in logs and referrers.

## Documentation and change

- The schema (OpenAPI, protobuf) is the source of truth and lives in the repo next to the code.
  Hand-written docs drift; generated ones don't.
- Every breaking change needs a migration note, a deprecation window with a date, and a way to
  observe who is still on the old path — otherwise the window is a guess.
- Publish the failure catalogue with the same seriousness as the success schema.

## Checklist before shipping a surface

- [ ] Resources named from the domain, not the schema
- [ ] Failure catalogue written, with client actions
- [ ] Idempotency on every unsafe retryable operation
- [ ] Cursor pagination on every collection
- [ ] AuthZ per resource, rate limits with headers
- [ ] Schema in the repo, generated docs
- [ ] Deprecation and versioning policy stated
- [ ] Per-call cost known if the endpoint fans out to a paid dependency
