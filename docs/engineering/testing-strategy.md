# Testing strategy

Testing is a rigor decision, and rigor is proportional to the maturity column
(`operating-model`'s `${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/radical-simplicity.md`). The failure this document prevents is
both directions of mismatch: a prototype carrying an integration suite nobody needed, and a
revenue path with no test at all.

## Set the column first

| | Prototype | Early users | Mature / revenue |
| --- | --- | --- | --- |
| Unit | The risky core only | Paths users hit | Broad, on domain logic |
| Integration | None | The critical flow, with real dependencies | Every external boundary |
| End-to-end | None | One smoke path | Revenue and data-integrity paths |
| Contract | None | None | Every consumed and provided API |
| Load | None | Before the first known spike | Against the SLO, on a schedule |
| Coverage target | None | None | Still none — coverage is a diagnostic, not a goal |

Coverage as a target is Goodhart's law with a CI job: it optimizes for tests that execute lines
rather than tests that catch defects. Use it to *find* untested areas, never to gate.

## Size, not layer: the contract a test signs

The unit/integration/end-to-end vocabulary describes *what a test covers*, which is why arguments
about it never end. The more useful axis is what the test is **allowed to touch**, because that's
what decides whether it's fast, deterministic, and safe to run on every save:

| Size | May use | Must not | Target runtime |
| --- | --- | --- | --- |
| **Small** | One process, in-memory only | Network, disk, sleeps, clocks, other processes | milliseconds |
| **Medium** | One machine: localhost, a container, a real database | Anything off the machine, including third-party APIs | seconds |
| **Large** | Multiple machines, real deployments, external services | — | minutes, and only in CI |

Two things follow, and they're the whole reason to adopt the axis:

- **A test's size is enforceable.** "Small" is a property you can assert mechanically (no sockets,
  no filesystem, no `sleep`), while "unit" is a matter of opinion. The suite that runs on every
  save is exactly the small set.
- **Non-determinism is a size violation, not bad luck.** A test that reads the wall clock, waits on
  a real network, or depends on another test's leftovers has taken a dependency its size forbids —
  which is the mechanical cause of most flakiness, and the reason "it's flaky" is a diagnosis with
  an address rather than a shrug.

Keep the maturity table above as the answer to *how much* to test; use size as the answer to *what
each test is allowed to do*.

## What to test, in priority order

1. **The invariants of the domain** — the things that must never be true. Cheapest tests, longest
   life, survive every refactor.
2. **Every bug you've had.** A regression test per incident is the mechanism that makes the
   incident a permanent improvement rather than a recurring cost.
3. **The failure paths** — timeouts, retries, partial failure, idempotent replay. Untested error
   handling is the most common source of the second incident.
4. **The boundaries** — serialization, migrations, third-party contracts, auth decisions.
5. **The happy path**, last, because it's the one path manual use already covers.

## Rules

- **Tests assert behavior, not implementation.** A test that breaks on a refactor with no behavior
  change is a maintenance tax, not a safety net.
- **One reason to fail per test.** Multi-assert tests report the first failure and hide the rest.
- **Deterministic or deleted.** A flaky test is worse than no test: it trains the team to ignore
  red. Fix it or remove it the same day — never skip it silently. At scale, published industry
  measurements put flaky runs at a low single-digit percentage of all test runs and still describe
  it as the dominant drag on CI trust; at your scale, one flaky test in a suite of forty is a
  higher *rate* than that, and it is the one that teaches you to re-run instead of read.
- **Quarantine is a dated decision, not a parking space.** If a flaky test can't be fixed today,
  move it out of the blocking suite *with an owner and a removal date* — and delete it when the
  date passes. A quarantine folder nobody empties is a list of things you've stopped testing while
  believing you test them.
- **If you care about it, put a test on it.** A behavior with no test is a behavior the pipeline
  doesn't defend: whoever changes it next has no way to know it mattered, and is not the person at
  fault when it breaks. The test suite — not the docs, not the tribal knowledge — is the definition
  of what this system promises.
- **Fast tests run on every save; slow ones run in CI.** If the fast suite takes more than a
  minute or two, it stops being run.
- **Fakes over mocks where possible.** An in-memory implementation of a port tests real behavior;
  a mock tests that you called the function you decided to call.
- **Test data is built by factories, not fixtures**, so a schema change doesn't rewrite the suite.

## What CI owns

Everything mechanical: format, lint, type check, build, dependency audit, the fast suite. A review
comment about formatting is a defect in the pipeline. Human review spends itself on logic,
boundaries, and whether the shape is right.

## Checklist

- [ ] Maturity column stated and the table above adjusted to it
- [ ] Invariant tests exist for each aggregate
- [ ] A regression test exists for every past incident
- [ ] Failure paths covered on the critical flow
- [ ] Fast suite under two minutes
- [ ] Every test's size is declared, and the small suite touches nothing off-process
- [ ] Zero known-flaky tests; anything quarantined has an owner and a removal date
- [ ] CI runs everything mechanical, review does not
