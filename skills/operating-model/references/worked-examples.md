# Worked examples

Seven end-to-end applications of the operating loop, written as the verdicts an
`operating-partner` pass — or, for the last three, a `reliability-engineer` or `code-reviewer`
pass — would actually produce. They exist because the principles are easy to agree with in the
abstract and hard to apply against something you want to build.

**The numbers below are invented for the examples.** They are there because the mechanisms in
`foundations/` are arithmetic, and arithmetic with no numbers in it is a slogan; none of them come
from a real system, and none should be reused as a benchmark.

---

## 1. "Split PDF export into its own service, behind a queue"

*Go backend, Kubernetes/Flux deploy, ~400 daily active users, one paid tier.*

**Maturity column:** early users → mature. Signals: paying users exist, a production deploy with
release history, error-rate alerting present, no per-segment analytics yet.

| Principle | Verdict | Evidence |
| --- | --- | --- |
| Radical simplicity | **unearned complexity** (×2) | The service split cites "export is slow and might scale differently" — no measured p95, no deploy-cadence conflict, one team. The queue serves a single producer and a single consumer. Neither meets the ledger's bar. |
| Ownership | aligned | One owner, end to end, including the deploy. |
| Impact | **real gap** | No stated metric. "Exports feel slow" is a complaint, not a target. |
| Evidence | **real gap** | No instrumentation on export duration today, so the change can't be evaluated after shipping either. |
| Maturity | **misapplied rigor** (too high) | A second service means a second pipeline, second dashboard, second on-call surface, at a scale where one process is still comfortable. |
| Transformation | n/a | Nothing inherited. |

**Recommendation.** Instrument export duration and failure rate first (a day). If p95 is genuinely
bad, the ordered ladder is: profile and fix the hot path → run the export in a goroutine with a
status endpoint → *then* a queue, if the measured latency actually can't be absorbed by the caller
→ and only then a separate service, if the measurements show a real scaling or deploy conflict.
Each rung requires the previous rung's measurement. Dispatch `software-architect` if the queue rung
is reached, to check it against `software-architecture`'s `scaling-and-infra.md`.

**What the loop caught:** the proposal was a solution ranked before the problem was measured.

---

## 2. Inheriting a five-year-old React admin app

*Vite/React frontend, unknown test coverage, ~30 internal users, the previous owner has left.*

**Takeover mode output.**

**Assess** — the asset is: the workflows those 30 people run daily, the encoded edge cases nobody
remembers the reason for, the integrations, the data. The cost base is: the state library nobody
uses anymore, three routing patterns, a component folder with 60% dead files, a CI pipeline that
takes 20 minutes.

**Migrate** — move it onto foundations already running before touching the code: your pipeline,
your error reporting, your deploy target, your dependency policy. That is a week and it removes
most of the operational risk without changing a line of product behavior.

**Delete** — measure first, delete loudly: unreferenced components (grep, including dynamic
imports and config), routes with no traffic in the last 90 days, dependencies nothing imports,
feature flags permanently on. Every deletion is a separate revertible commit.

**Then optimize** — only now is a refactor toward the `software-architecture` skill's
`${CLAUDE_PLUGIN_ROOT}/skills/software-architecture/references/vite-react-conventions.md` worth doing, and only on paths actually touched by upcoming
work.

**Explicitly not:** a rewrite. Base rate says it takes longer than estimated and reproduces the
edge cases badly, and here the entire asset *is* the edge cases. If a rewrite is proposed anyway,
the report states the base rate out loud and asks what specifically makes this case different.

---

## 3. "Raise the price from €9 to €19"

*Solo-run SaaS, 220 paying users, mostly acquired by word of mouth.*

**Maturity column:** mature (revenue-bearing), small scale.

- **Evidence** — **real gap**: 220 users can't power an experiment on conversion at any useful
  effect size. Say so rather than running one; the honest instrument here is new-customer pricing
  plus a before/after read with the seasonality caveat stated.
- **Reversibility** (`decision-latency.md`) — a rise on the existing base is a one-way door. The
  ladder in `pricing-and-value-capture.md` says start at the reversible end: repackage, then price
  new sign-ups at €19 while grandfathering the existing base, then read three months of conversion
  and churn before considering the base at all.
- **Guardrails** — churn by tenure, support volume, cancellation reasons, and *organic sign-ups*.
  At this scale word of mouth is most of acquisition, so the trust cost lands on the growth engine
  itself; that's the number most likely to reveal a "win" as a loss.
- **Impact** — high EV, but the cost-to-find-out is much lower on the new-customer path than on
  the base path, which is what decides the order.

**Recommendation.** New-customer price to €19 now, base grandfathered indefinitely, decision on the
base revisited in one quarter with the guardrail data in hand. Dispatch `growth-marketer` if the
packaging question turns into a positioning question.

---

## 4. Reviewing a 900-line agent-produced PR

*An agent was asked to "add CSV import"; it returned a generic import framework.*

- **Talent and standards** — the acceptance criteria weren't stated before dispatch, so everything
  beyond CSV import was accepted implicitly. That's a defect in the brief, and the fix is upstream:
  next dispatch states the scope, the file boundaries, and "no new abstractions."
- **Radical simplicity** — **unearned complexity**: a format-agnostic parser interface, a plugin
  registry, and a config schema, for one format with one call site. The ledger requires three
  concrete call sites for a generic abstraction; there is one.
- **Reduction loop** — round 1: remove the registry, check what breaks (nothing — one caller).
  Round 2: collapse the interface into the CSV implementation (nothing breaks). Round 3: keep the
  column-mapping helper, which the tests exercise and which has a real second caller. Converged:
  ~180 lines remain, each with a justification.
- **Evidence** — **real gap** until fixed: no metric on import success/failure rate, which is the
  one number that says whether the feature works in the wild.
- **Ownership** — unchanged by the fact that an agent wrote it. Whoever dispatched it owns the
  result, including the parts they didn't read.

**What the loop caught:** the generated shape was the elaborate one, and elaborate is the default
failure mode of generated code — not because it's wrong, but because nothing in its production
required it to be justified.

---

## 5. "What should our SLO be?" — a first error budget

*Two services and a managed database, ~1,200 paying users, checkout is the flow that matters.*

**Mode:** `reliability-engineer`, audit. **Maturity column:** mature (revenue-bearing), small scale.

**Step 1 — what the chain already costs you.** Availability multiplies
(`foundations/reliability-and-redundancy.md`), so the ceiling is set before any engineering:

| Component | Assumed availability | Notes |
| --- | --- | --- |
| CDN / edge | 99.99% | Managed, not yours |
| App service | 99.9% | Yours |
| Database (managed) | 99.95% | Their SLA, not your promise |
| Payment provider | 99.9% | Yours in the user's eyes, theirs in fact |
| **Serial product** | **≈ 99.74%** | ≈ 1 h 52 min of failure per 30 days |

The first finding writes itself: **a 99.9% target is not available to you at all** without changing
the chain, because two of the four terms belong to somebody else. Publishing 99.9% would be
promising something you cannot deliver even with perfect code.

**Step 2 — pick the indicator and the target you can hold.** SLI: share of checkout attempts that
complete without a server-side error, measured at the edge. Target: **99.5% monthly**, which is
~3 h 36 min of budget — above the chain's floor with room for your own releases, and honestly
achievable. The 99.9% option isn't reachable without changing the chain at all — and doing so (removing
single-instance failure, degrading gracefully when the payment provider is down, multi-region for
the database) costs an order of magnitude more to buy ~2 h 50 min of additional uptime a month on
a flow that earns what this one earns.

**Step 3 — the consequence, written now.** Budget above 25% remaining → ship normally. Budget
exhausted → reliability work outranks features until the next window opens, and the ranking is not
renegotiated during the incident that caused it. Without this line the SLO is a number with no
decision attached, which `foundations/uncertainty-and-information.md` values at exactly zero.

**Step 4 — where the money goes.** Last quarter's failures: 6 incidents, 5 of them caused by
their own deploys, 1 by the payment provider. Redundancy only attacks the independent fraction, and
5/6 of these arrive through the pipeline that keeps every replica identical. So:

| Candidate | Attacks | Verdict |
| --- | --- | --- |
| Second app replica | Independent instance failure (~1/6 of incidents) | **misapplied rigor** — buys little here |
| Automatic rollback on canary error rate | Duration on 5/6 of incidents | **do this first** |
| Symptom alert on checkout success rate | Detection time — currently ~35 min of a ~70 min mean | **do this second** |
| Degrade gracefully when payments are down | Exposure on the remaining incident class | Third, if the budget says so |

**What the loop caught:** the team was about to buy availability in the one form that their own
failure data said would not deliver it.

---

## 6. A week of toil, measured

*Solo maintainer, four products, "no time for anything" for two months.*

**Mode:** `reliability-engineer`, audit. One week logged honestly:

| Recurring item | Frequency | Time each | Weekly cost |
| --- | --- | --- | --- |
| Restarting a stuck import job | ~3× / week | 25 min | 1 h 15 |
| Re-running the failed nightly export by hand | ~4× / week | 20 min | 1 h 20 |
| Answering "did my file upload?" support pings | ~6× / week | 10 min | 1 h 00 |
| Manual invoice correction | 1× / week | 45 min | 0 h 45 |
| Rotating a certificate that won't auto-renew | 1× / month | 90 min | ≈ 0 h 22 |
| Reading a report nobody has asked about since March | 1× / week | 20 min | 0 h 20 |
| **Total** | | | **≈ 5 h** |

Five hours out of a ~35-hour working week is 14% — under the usual half-of-operational-time
ceiling, so the finding is *not* "you are drowning". It is what the trend says: usage roughly
doubled in six months and four of these six items scale with usage
(`foundations/load-and-automation.md`), so at the same growth the number is ~10 h/week by Q2 and
~20 h by the end of the year — at which point the capacity to fix it is the capacity being eaten.

**The head of the distribution.** The import job and the export are 2 h 35 of the 5 h, and both
have the same root: a retry that gives up silently. Payback for fixing it properly — roughly 10 h
of build, ~30 min a month of maintenance, against 2 h 35 a week saved — is about four weeks, and
the horizon is safe because the import path is the product.

**The rest of the list, decided rather than accumulated:**

- Support pings (1 h) — not automation, *product*: a status the user can see removes the question.
  This is toil that a feature deletes, which is the cheapest kind.
- Invoice correction (0 h 45) — the judgement is irreducible; this is the Amdahl floor. Accept it
  explicitly, write down that it's accepted, stop re-deciding it every week.
- Certificate rotation (0 h 22) — automate only if the existing tooling makes it an afternoon;
  otherwise a dated runbook entry, because the failure is loud and rare.
- The unread report (0 h 20) — **delete**. The cheapest reliability work available is removing the
  thing, and nobody proposes it because deletion doesn't look like engineering.

**What the loop caught:** the load was inside the ceiling *today*, and on a curve that reaches it
in three quarters — which is the moment to act, because the escape gets unaffordable exactly when
it becomes urgent.

---

## 7. An 1,100-line agent PR that genuinely can't be split

*A storage-format migration: writer, reader, backfill job, generated types.*

**Mode:** `code-reviewer`. The first pass says **split first** — reviewer attention per change is
fixed, so a diff this size gets sampled rather than read
(`foundations/defects-and-detection.md`). The author replies that the service will not start
unless all four move together.

**Check the mechanism before repeating the rule.** The size rule rests on attention, not on line
count as a virtue, and its remedy assumes divisibility. Here divisibility is partly absent — so the
verdict changes shape rather than being restated:

- **What is still separable, and lands first:** the generated types (mechanical, reviewed by
  diffing the generator's input), and a preparatory rename that touches 300 of the 1,100 lines
  without changing behaviour. Reviewable surface drops to ~500 lines of real logic.
- **What the cutover becomes:** expand → migrate → contract
  (`../../software-architecture/references/change-over-time.md`). Write both formats, read the new
  one behind a flag, backfill, then delete the old writer — four small changes with a rollback at
  each step, instead of one atomic change with none.
- **If it truly must land at once** (it doesn't here), the rule is `foundations/flow-and-queues.md`'s
  indivisible-batch case: stop trying to shrink it and attack its *risk* — a dry run against a
  production copy, a rehearsed rollback including the backfill, a staged rollout by tenant.
- **Where the remaining attention goes**, stated in the report because it cannot be spent evenly:
  the read path's behaviour on rows written by the old writer, the backfill's idempotency on
  re-run, and what happens if the process dies halfway through. The nits in the generated file do
  not get read at all, and saying so is more honest than pretending they were.

**Blocking vs not.** Blocking: no test for a half-completed backfill; the rollback path reverts
code but not the flag, so a rollback lands the old reader on new-format rows. Nits (non-blocking):
naming in the migration helper, a comment that restates the code.

**What the loop caught:** the mechanism said the review could not be thorough, so the review
declared where it was thin instead of implying uniform coverage — and the fix turned out to be a
sequencing change, not a reviewing one.
