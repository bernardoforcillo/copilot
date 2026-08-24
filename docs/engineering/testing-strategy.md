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
  red. Fix it or remove it the same day — never skip it silently.
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
- [ ] Zero known-flaky tests, none skipped
- [ ] CI runs everything mechanical, review does not
