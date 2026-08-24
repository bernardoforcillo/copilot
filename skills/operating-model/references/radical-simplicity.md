# Radical simplicity

The default solution is the simplest one that satisfies the requirement as stated today. It does
not have to argue for itself. Every departure from it does — and the argument has to be made
*before* the departure ships, with evidence that exists now rather than evidence you expect to
have later.

This inverts the usual burden of proof. The common failure isn't that someone proposes a
complication without thinking; it's that the complication arrives as the default and the simple
alternative is the thing forced to justify itself ("but that won't scale", "but we'll need
this later"). Reversing which side carries the burden is the entire mechanism.

## What counts as proof

A complication is earned when at least one of these is true and written down where the next
person will find it:

- **A measured number you have today.** A p95 latency, a query count, a bill, an error rate, a
  queue depth — observed, dated, and attached to the decision. "Reads are slow" is not a number.
  "The dashboard query is 2.4s at p95 against 40 GB, measured 2026-08-14" is.
- **A failure that already happened.** An incident, a data-loss near-miss, a rollback, a customer
  report. The complication is the fix for a specific thing that went wrong, not insurance against
  a thing that hasn't.
- **A requirement in writing from someone who can set requirements.** A contractual obligation, a
  compliance rule, a platform constraint you cannot design around. Not an inferred future need.
- **The one-way-door test.** The decision is genuinely hard to reverse later and cheap to get
  right now — a storage format, a public API contract, an identifier scheme, a data model that
  other systems will copy. One-way doors are where deliberation is worth its cost; two-way doors
  are where speed beats sophistication.

Anything else — "it's the industry standard", "we might need it", "it's cleaner", "everyone does
it this way" — is not proof. It is the thing the rule exists to stop.

## The complication ledger

Common complications and the evidence each one requires before it lands. This table is the fast
path; when the complication is architectural,
`${CLAUDE_PLUGIN_ROOT}/skills/software-architecture/references/scaling-and-infra.md` carries the
full trigger→action framework behind these rows.

| Complication | Evidence required before it's earned |
| --- | --- |
| A new service / process boundary | A measured scaling or deploy-cadence conflict between two parts of the current system, or an independent team boundary that actually exists |
| A cache | An observed hot-read pattern with a measured cost, plus a stated staleness tolerance |
| A queue / async fan-out | A measured latency the caller can't absorb, or a real multi-consumer requirement — not a single producer talking to a single consumer |
| A generic abstraction / plugin layer | Three concrete existing call sites, not two, and none of them hypothetical |
| A new dependency | The thing it does is something you'd otherwise write and maintain, and its maintenance cost (updates, CVEs, transitive tree) is smaller than that |
| A feature-flag / config system | More than one flag actually in flight at once, with a stated removal date per flag |
| A new environment / cluster / account | An isolation requirement that a namespace or a config value can't satisfy |
| A new recurring process or meeting | A named failure it prevents, and a date on which it gets re-examined |
| A new test tier (E2E, load, contract) | The maturity gate below says this product is at that stage, and a class of bug that the tier below it demonstrably missed |

Absence of evidence resolves toward the simpler side. When a complication can't be settled either
way, ship the simple version and let the system produce the number that settles it.

## Rigor is proportional to maturity

The same product does not deserve the same rigor at every stage of its life, and applying
mature-product rigor to an unvalidated one is one of the most expensive mistakes available: it
spends the scarce resource (time before the idea is proven or killed) on the abundant one (quality
of something that may not survive). Applying prototype rigor to a product with paying users is the
symmetric mistake, and the more visible one.

| | Unvalidated / prototype | Early users | Mature / revenue-bearing |
| --- | --- | --- | --- |
| **Automated tests** | Tests for the risky core only; no coverage target | Unit + integration on the paths users hit; regression test per incident | Unit, integration, and end-to-end on revenue and data-integrity paths |
| **Release** | Ship straight to the one environment that exists | Staged rollout; a rollback you've actually rehearsed | Multi-stage rollout, canary channel, automated rollback signal |
| **Experimentation** | None — the sample can't settle anything | Directional reads; qualitative feedback carries more weight | A/B by default for changes that touch conversion, retention, or price |
| **Observability** | Logs, one error alert | Error rate, latency, and the one business metric that matters | Full metric set, per-segment reads, guardrails wired to alerts |
| **Review** | Self-review; CI does lint/format/types | Peer review on non-obvious logic | Peer review with an explicit reviewer of record for risky surfaces |
| **Docs** | A README that lets you rerun it in six months | Interface docs and a runbook | Architecture decisions recorded, runbooks tested |

Say which column you're in before arguing about how much rigor a piece of work deserves. Most
disagreements about process are actually disagreements about which column the product is in.

## Where the effort goes instead

Simplicity is not less care — it's care spent where a machine can't spend it.

- **Everything mechanically checkable belongs in CI**, not in a human's head: formatting, linting,
  type checks, dependency audits, build. A review comment about formatting is a defect in the
  pipeline, not in the diff.
- **Human review spends itself on what can't be automated**: whether the logic is correct, whether
  the boundary is in the right place, whether the failure mode was considered, whether this is the
  simplest shape that works.
- **Reuse before building** — an existing internal library, template, or already-solved pattern in
  the same repo beats a fresh implementation. But generalizing on the *first* duplication is itself
  unearned complexity; the third call site is when a shared abstraction stops being speculation.

## The reduction loop

When a design or diff has accumulated complications, don't argue them one at a time in the
abstract — run them through the reduction loop in the `operating-model` skill, which strips one
unjustified complication per round until every survivor has a written justification from the
"What counts as proof" list above.

## Anti-patterns

- **Anticipatory scale.** Architecture sized for a user count you don't have, justified by a
  growth curve you're guessing at. The cost is paid now, in every change you make to it, in
  exchange for a benefit that arrives only in the branch of the future where you were right.
- **Premature platformization.** Building the general system before the second and third concrete
  cases exist to shape it. Platforms extracted from three working things are good; platforms
  imagined before one is a specification of your assumptions.
- **Ceremony inflation.** Process added after each incident and never removed. Every recurring
  ritual needs the same justification as a cache, and a date on which it gets re-examined.
- **Sophistication as signal.** Choosing the more impressive solution because it's more
  impressive. If the simple version would have worked, the sophisticated one was a cost with no
  buyer.
