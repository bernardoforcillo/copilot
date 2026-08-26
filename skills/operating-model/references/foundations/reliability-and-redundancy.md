# Foundation: reliability and redundancy

**The principles it generates:** reliability as a budget rather than a virtue, the error budget
with a consequence attached, the maturity table's reliability row, staged rollout and rollback
ahead of extra replicas, alerting on the user-visible symptom, and the non-negotiable floor
(backups with a tested restore, no secrets in the repo, an undoable deploy) that ignores the
proportionality argument entirely.

**The mechanism:** availability composes multiplicatively along a dependency chain and improves
only through redundancy whose benefit is capped by how independent the failures are — while the
cost of each additional nine grows geometrically and the user-perceived benefit is bounded by the
parts of the path you don't own. Those three facts put the optimum strictly below 100%, and the
error budget is that optimum written down as permission to spend.

## Serial composition: your ceiling is a product

For components that must all work, availability multiplies: **A = ∏ Aᵢ**. Nothing about this is
adjustable by effort.

| Chain | Each at 99.9% | Resulting availability | Monthly failure budget |
| --- | --- | --- | --- |
| 1 component | 99.9% | 99.9% | ~43 min |
| 3 components | 99.9% | 99.7% | ~2 h 10 min |
| 6 components | 99.9% | 99.4% | ~4 h 20 min |
| 10 components | 99.9% | 99.0% | ~7 h 10 min |

Two consequences follow directly, and neither is a matter of taste:

- **Every dependency added is availability spent**, before it has delivered anything. That is the
  reliability half of the burden of proof in `complexity-and-coupling.md`: a new service, a new
  queue, a new third-party call each subtract from a budget you were already inside.
- **The reliability of a system is bounded by its worst link**, so effort spent hardening the
  second-worst is close to wasted. Find the term dominating the product before optimizing anything.

The same arithmetic explains why *removing* a component is often the cheapest reliability work
available — and why it never gets proposed, because deletion doesn't look like engineering.

## Parallel redundancy: the benefit is capped by correlation

For k redundant components where any one suffices, unavailability multiplies instead:
**1 − A = ∏ (1 − Aᵢ)**. Two independent 99% components give 99.99%; three give 99.9999%. This is
the entire promise of redundancy, and it rests on one word: *independent*.

Real failures correlate, and the correlated modes are exactly the ones redundancy is powerless
against:

- **The same change.** A bad deploy, a config push, a feature flag — applied to every replica by the
  system whose job is to keep them identical.
- **The same dependency.** Both replicas call the same database, resolve the same DNS, present the
  same certificate, live in the same region, bill to the same account.
- **The same bug.** Identical code has identical defects; k copies of a program that mishandles a
  leap second mishandle it k times, simultaneously.
- **The same saturation.** Under load, the replica that takes over inherits the traffic that killed
  the first one — the failover is a load transfer, and it arrives at the worst moment.

With a correlated fraction c of failures, redundancy can only attack the (1 − c) part: effective
unavailability floors at roughly c × (1 − A). If most of your failures come from your own changes —
and at small scale most do — then **the deploy pipeline is the shared-fate dependency**, and a
second replica buys almost nothing while a rehearsed rollback buys almost everything. That is a
derivation, not a preference: it says where the money goes at each stage, and it says why
`release-and-environments.md` puts rollback ahead of replication.

Perrow's *Normal Accidents* (1984) names the general form: tight coupling plus interactive
complexity means added protection introduces new interactions, so past some point each defensive
component adds more correlated failure modes than independent ones it removes. Richard Cook's *How
Complex Systems Fail* (1998) supplies the operational corollary — complex systems run in a degraded
mode continuously, so the interesting question is never "is it healthy" but "how much margin is
left".

## The marginal cost of a nine

Each additional nine is a 10× reduction in permitted failure time, and it cannot be bought with
more of the same: it requires eliminating a whole class of failure — first single-machine failure,
then single-zone, then correlated deploys, then the human in the loop. So cost rises roughly
geometrically with each nine.

The value side does not. Two effects cap it:

- **The user's path includes what you don't own** — their network, their device, DNS, the app store,
  their own client bugs. Once your contribution to failures is well below theirs, the next nine is
  invisible to them and detectable only by you.
- **Value is bounded by what the flow is worth.** A nine on a nightly report earns nothing; a nine
  on a payment path earns whatever the payment path earns.

With a geometric cost curve and a bounded value curve, the optimum is **interior and strictly below
100%** — an argument from arithmetic, not from resignation. The error budget is that optimum stated
as a quantity, and the reason it must be *spendable* is the same one: an optimum you never reach
from below means you overpaid, so a budget that ends the quarter untouched is a receipt for
velocity you spent without deciding to.

## Why the budget must carry a consequence

`uncertainty-and-information.md` gives the rule: information is worth exactly zero if it cannot
change a decision. A service level objective with no attached consequence is such a number — it is
measured, published, missed, and followed by the same roadmap. The error budget policy (budget
remaining → ship; budget exhausted → reliability outranks features) is what converts the
measurement into an instrument, and it must be written *before* the budget is exhausted, because it
is a rule about a moment when nobody will want to obey it.

## Impact is three multiplied terms, not one

Expected loss from failures is **frequency × exposure × duration**, and duration decomposes further
into detect + diagnose + mitigate. Each term has a different, cheap lever:

| Term | The lever | Typical small-team state |
| --- | --- | --- |
| Frequency | Tests, review, change discipline, fewer components | Usually the only one people work on |
| Exposure | Canary, staged rollout, per-segment flags, quotas | Cheap and routinely skipped |
| Duration → detect | Symptom-based alerting on the user-visible flow | Usually the largest single term |
| Duration → mitigate | A rehearsed rollback and a written runbook | Believed rather than tested |

The practical finding falls straight out of the multiplication: an outage where 90 minutes of four
hours was *noticing* is a detection problem wearing an engineering problem's clothes, and no amount
of hardening the failing component addresses it. It also explains why alerting on causes is a
defect rather than a nuance — a cause alert has a low true-positive rate on the term that matters
(is the user affected?) and a high false-positive rate everywhere else, which by the signal
argument in `defects-and-detection.md` makes its information value negative once people learn to
ignore it.

## Ruin is not a point on the curve

Data loss, an exposed credential, an unrecoverable corruption: these end the sequence rather than
subtracting from it, so they are not tradeable against expected value at any budget
(`irreversibility-and-optionality.md`, and the Kelly argument in `compounding-and-capital.md`).
This is the derivation of the floor row in `../reliability-and-incidents.md` — the items that get
no proportionality argument, at any maturity, because their cost isn't bounded by the value of the
flow they interrupt.

## When this mechanism is absent

The reasoning above voids, or changes shape, where:

- **There is no usable denominator.** Below a certain traffic level, a monthly availability figure
  is a ratio of small integers: one bad hour in a week with forty requests is not measurably
  distinct from noise. The honest instrument at that stage is a written statement of acceptable
  failure, not an SLO with a decimal point.
- **The cost of failure is set externally** — safety, regulation, a contract with penalties. Then
  the value curve is not bounded by the flow's worth, the optimum is not interior, and rigor is set
  by the consequence rather than by the stage (`limits-and-failure-modes.md`).
- **The chain isn't yours.** When your availability is dominated by a managed dependency you cannot
  observe or influence, your budget is mostly theirs; the real levers become degradation behaviour
  and honest communication, not engineering on your side of the boundary.
- **Nothing depends on it yet.** The availability of an unused system is a number about nothing, and
  work spent on it is the maturity mismatch in its most expensive direction.
