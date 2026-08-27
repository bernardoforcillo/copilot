# Foundation: defects and detection

**The principles it generates:** the code-review standard and the restricted list of what may block
a change, small diffs and the one-business-day response, the split between what CI owns and what a
human is for, tests as the definition of what a system promises, the regression test that follows
every incident, and the rule that a flaky test is worse than no test.

**The mechanism:** a defect's cost grows with how long it survives, and every filter you can put in
its path has a detection probability that depends on what the filter can *see* and on how much
attention it gets per unit of work. Arranging cheap filters in series, each used only where its
detection probability is high, is the whole of the discipline; almost every argument about review
and testing is really an argument about one of those two quantities.

## Cost rises with survival time

A defect caught while writing costs the seconds to retype a line. The same defect caught in review
costs a round-trip plus the author's context. In CI, a re-run. In production, it costs
rediscovery, diagnosis under time pressure, blast radius, the trust of whoever hit it, and the
removal of whatever was built on top of it meanwhile.

Boehm's *Software Engineering Economics* (1981) is the origin of the cost-of-change curve, and its
famous multipliers (10× per stage) have been fairly criticized as over-generalized from thin data —
Laurent Bossavit's *The Leprechauns of Software Engineering* (2015) traces exactly how thin. What
survives the criticism is the part the reasoning needs: **monotonicity**. The cost is
non-decreasing in survival time because each later stage adds strictly more work to the fix — the
rediscovery, the context reload, the dependents. You do not need the multiplier to derive "filter
early"; you need only the direction.

## Filters in series, and the independence condition

With filters of detection probability p₁ … pₙ, the escape probability is **∏ (1 − pᵢ)**. Two
mediocre filters beat one good one — 0.7 and 0.7 leave 9% escaping, against 20% for a single 0.8 —
**provided they fail independently**.
(`node scripts/mechanisms.mjs escapeProbability 0.7 0.7` against `escapeProbability 0.8`.)

That proviso is the entire design rule for a pipeline:

| Filter | High detection probability on | Near-blind to |
| --- | --- | --- |
| Type system / compiler | Representable-state errors, signatures | Semantics, intent |
| Linter / formatter | Convention, known bug patterns | Anything requiring meaning |
| Unit tests | Regressions in specified behaviour | Behaviour nobody specified |
| Integration tests | Boundary and contract mismatches | Load, real-world data shapes |
| Human review | Intent mismatch, layering, missing cases, unbounded input | Anything not visible in the diff |
| Production monitoring | Everything else, expensively | Nothing — it is the filter of last resort |

Filters that overlap are cost without coverage. A human checking formatting duplicates a filter
with p ≈ 1 and adds nothing, while consuming the scarce attention that only *this* filter has —
which is the derivation of "CI owns the mechanical, review owns what CI cannot see". It is the same
argument James Reason's defence-in-depth model makes in reverse: layers help because their holes
are in different places, and layers whose holes line up are one layer that costs more.

**How much correlation kills the claim — computed, because "two mediocre filters beat one good
one" is exactly the kind of slogan this tier exists to bound.** With correlation ρ between the two
filters' misses, escape is `q₁q₂ + ρ·√(p₁q₁p₂q₂)`:

| ρ between the misses | Escape, two filters at p = 0.7 | Versus one filter at p = 0.8 |
| --- | --- | --- |
| 0 (independent) | 9.0% | better |
| 0.2 | 13.2% | better |
| 0.5 | 19.5% | barely better |
| **0.52** | **20.0%** | **break-even** |
| 0.8 | 25.8% | worse |
| 1.0 | 30.0% | much worse |

`node scripts/mechanisms.mjs escapeCorrelated 0.7 0.7 0.5`. So the pair wins only while their
misses are less than about half correlated — and the pairs teams actually build (a reviewer and a
linter checking the same convention; two reviewers from the same team reading the same diff with
the same assumptions) sit well above that line. Two filters do not compose by being two; they
compose by looking at different things, and a redundant one is worse than dropping it, because it
also spends attention.

## Attention is the scarce input, so size is the control variable

A reviewer brings roughly fixed attention to a change. Detection probability per line therefore
falls as the diff grows, and past a few hundred lines review degrades into sampling: the reviewer
sees the shape, not the defects. This is why the observed relationship between review size and
defects found is so consistent — Fagan's inspection results (IBM Systems Journal, 1976), the Cisco
study reported in Jason Cohen's *Best Kept Secrets of Peer Code Review* (2006), and the measured
picture at scale in Sadowski et al. (ICSE-SEIP, 2018), where most changes are small and reviewed by
one person in hours.

The operating consequence is unusual and worth stating plainly: **the lever on review effectiveness
is the author's, not the reviewer's.** Effort, seniority, and thoroughness on the reviewer's side
are second-order next to the size and self-containment of what they were handed. A 1,400-line diff
does not get 1,400 lines of attention; it gets one diff's worth, spread thin.

The mirror-image failure is real too: a change too small to have a coherent purpose forces the
reviewer to reconstruct the intent across several diffs, which is a different way of exceeding the
same attention budget.

## Review is a queue, and rework cost decays with the author's context

Review is a service station with one server, so `flow-and-queues.md` applies unchanged: as the
reviewer's utilization approaches 1, waiting time explodes, and the wait is pure delay — nobody is
working on the change while it sits.

The second-order term is the one that makes latency worse than it looks. The cost of acting on a
comment rises with the time since the author wrote the code, because the context they need has to
be reloaded from the artifact instead of recalled. Three round-trips at a day each therefore cost
more than three times one round-trip. Both rules in `../../../software-architecture/references/code-review.md`
— respond within a business day, and ask everything in the first pass — are consequences of that
compounding, not etiquette.

## Asymmetric information sets what may block

The author holds the intent; the reviewer holds the artifact. Detection probability is high for
defect classes visible *in the artifact* — a contradiction with the surrounding code, a layering
violation, an unhandled failure path, an unbounded input, a missing regression test — and close to
zero for classes that are not: whether this was the right product bet, whether the metric will
move, whether the abstraction will pay off in a year.

That asymmetry is the derivation of the restricted blocking list. Blocking on an artifact-invisible
class spends review's authority where its detection probability is ≈ 0, and it produces the
characteristic non-convergent review: the reviewer's preferred design cannot be falsified from the
diff, so no revision ever satisfies it. The standard "approve once it definitely improves the
overall code health of the system" is a convergence condition — it terminates on a property the
artifact can demonstrate, rather than on agreement with a design held in someone's head. Questions
about whether the change should exist belong to `../impact-and-prioritization.md`; questions about
whether the shape is right belong to the architecture desk; questions about whether it will work
belong to measurement (`../evidence-and-experimentation.md`).

## Tests are an executable specification with a decaying alternative

An invariant that lives only in someone's memory has a detection probability that decays with time
and staff turnover, and no detection at all for a future reader or an agent. A test converts it
into a filter with p ≈ 1 and near-zero marginal cost per run. That is the whole of "if you care
about the behaviour, put a test on it": the test is not documentation of the promise, it *is* the
promise, because it is the only form of it that the next change is forced to encounter.

The dual case is where the arithmetic turns negative. A flaky test has p < 1 and a non-zero false
alarm rate, and in signal-detection terms (Green and Swets, 1966) a receiver facing enough false
alarms rationally lowers its response rate — people learn to re-run rather than read. Once that
adaptation happens, the test is consuming attention while providing no detection, and the honest
value is below zero: it has degraded the filter *around* it. The same argument condemns the noisy
alert, which is why `../reliability-and-incidents.md` treats a non-actionable page as a defect
rather than as thoroughness.

## Why the incident earns the test, specifically

A defect class that has already occurred has demonstrated three things a hypothetical one hasn't:
the path is reachable, your process can produce it, and the conditions exist in your real
environment. Its base rate of recurrence is therefore far above the prior for defects in general
(`uncertainty-and-information.md` on reference classes) — which makes it the highest-expected-value
place in the entire codebase to install a permanent filter, and makes "fixed it, no test" the
purchase of the same incident twice.

## When this mechanism is absent

The reasoning above voids, or changes instrument, where:

- **The defect isn't visible in the artifact.** Performance regressions, concurrency defects under
  real load, and anything about how humans actually use the thing have p ≈ 0 in review and in most
  test suites. The correct filter is measurement — a canary, a load test, an experiment — and
  demanding that review catch them produces slow reviews that still miss them.
- **There is no next reader.** A throwaway script has no survival time for a defect to grow in, so
  every filter beyond running it is cost without payoff.
- **One filter already has p ≈ 1.** Where a type system or a schema makes the class unrepresentable,
  adding a review checklist item for it is duplicated cost — remove the check, keep the constraint.
- **The cost of a defect is bounded and trivial.** For an internal tool used by one person, the
  cheapest filter is production itself, and the elaborate pipeline is the maturity mismatch in its
  expensive direction (`radical-simplicity.md`).
