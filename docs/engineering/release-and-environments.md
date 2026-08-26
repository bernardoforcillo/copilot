# Release and environments

The release pipeline sets the optimal batch size for everything else: when releasing is cheap,
small batches are correct, and small batches are what make feedback informative and rollbacks
boring (`operating-model`'s `${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/foundations/flow-and-queues.md`). Investment here pays
into every other practice.

## Environments — as few as defend themselves

Each environment is a complication with a recurring cost: infrastructure, drift, data, and the
question "which one is this bug in?".

| Environment | Justified by | Watch for |
| --- | --- | --- |
| Local | Always | Divergence from production runtime — use the same container image |
| Preview / per-PR | Reviewers who need to click the change | Cost and orphaned resources; expire them automatically |
| Staging | A migration or integration that genuinely cannot be tested otherwise | Becoming a permanent bug farm nobody trusts |
| Production | Always | — |

Two environments plus previews is a defensible default for a small team. A staging environment that
nobody trusts is worse than none, because it adds a step and provides no signal.

## The pipeline

Every commit to the main branch runs: format check → lint → type check → build → fast tests →
container build → deploy to the first environment. Mechanical checks belong here, not in review.

- **Trunk-based, short-lived branches.** A branch older than a couple of days is inventory that's
  rotting (merge cost grows with age).
- **The main branch is always releasable.** Incomplete work hides behind a flag, not behind a
  branch.
- **Build once, promote the artifact.** The container that ran in preview is the container that
  reaches production — rebuilding per environment reintroduces the difference you were testing
  against.
- **Migrations run separately from the deploy**, expand/contract, so a rollback of code doesn't
  require a rollback of schema.

## Rollout and rollback

- **Progressive by default at maturity**: canary channel, then stable — for a Flux-managed repo,
  that's the two-channel layout in `software-architecture`'s
  `${CLAUDE_PLUGIN_ROOT}/skills/software-architecture/references/kubernetes-deployment-conventions.md`.
- **An automatic rollback signal** beats a heroic human one: error rate or latency past a threshold
  on the canary reverts it.
- **Rollback is rehearsed, not assumed.** If it has never been executed, it is a plan, not a path.
- **Feature flags have owners and removal dates.** A flag system with permanent flags is a second
  configuration language, and every stale flag multiplies the untested state space.

## Production readiness, before it carries real traffic

A separate gate from the feature-launch checklist in
[`../product/launch-readiness.md`](../product/launch-readiness.md): that one asks whether a
*change* is ready for users, this one asks whether a *service* is ready to be depended on. Run it
once per service — when it first takes real traffic, and again when it starts carrying something
that matters (payment, personal data, another service's critical path).

- [ ] **Someone is named as its owner**, and that person can deploy, roll back, and read its logs
      without asking anyone.
- [ ] **One or two SLIs with a target and an error budget** exist
      ([`observability-and-slos.md`](observability-and-slos.md)) — or a written statement that the
      service is below the maturity line where an SLO means anything.
- [ ] **The pages it can produce are enumerated**, symptom-based, and at least one has been fired
      deliberately to check that it reaches a human who can act.
- [ ] **Dependency failure is defined behaviour**: for each thing it calls, what it does when that
      is slow, down, or wrong — timeout, retry with a bound, degrade, or fail loudly. Unbounded
      retries against a struggling dependency are how one outage becomes two.
- [ ] **Limits exist**: rate limits, quotas, payload caps, and a maximum concurrency it will run
      at. An unmetered path that fans out to a paid API is a bill anyone can write for you.
- [ ] **Capacity is known for the expected peak**, not the average, with the constrained resource
      named (connections, memory, a third-party quota).
- [ ] **Rollback has been executed on this service**, not planned. Same for restore-from-backup if
      it owns data.
- [ ] **A one-page runbook** exists: how to roll back, how to restore, how to turn it off, what its
      alerts mean. Written for a reader under stress.
- [ ] **There is an off switch** — a flag or a route change that removes it from the critical path
      without a deploy.
- [ ] **Its cost per unit and its ceiling are known**, and an alarm exists on the ceiling.

Anything unticked is either work to do before it takes traffic, or an explicitly accepted risk with
a date to revisit — the same standard the operating model applies everywhere
(`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/reliability-and-incidents.md`).

## Release hygiene

- Version and changelog generated from conventional commits — the `commit` skill's format exists so
  this is free.
- Every deploy is attributable to a commit and a person, and observable in the dashboards as an
  annotation, so "did the deploy do this?" takes one look.
- Deploys are boring on purpose: no manual steps, no out-of-hours heroics, no "only <name> can
  release".

## Checklist

- [ ] Number of environments justified individually
- [ ] Same artifact promoted across environments
- [ ] Mechanical checks in CI, none in human review
- [ ] Migrations decoupled from code deploys, expand/contract
- [ ] Canary with an automatic revert signal (at maturity)
- [ ] Rollback rehearsed on a real deploy
- [ ] Every flag has an owner and a removal date
- [ ] Deploys annotated in dashboards
