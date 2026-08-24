# Worked examples

Four end-to-end applications of the operating loop, written as the verdicts an
`operating-partner` pass would actually produce. They exist because the principles are easy to
agree with in the abstract and hard to apply against something you want to build.

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
`references/vite-react-conventions.md` worth doing, and only on paths actually touched by upcoming
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
