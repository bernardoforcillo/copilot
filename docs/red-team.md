# Red team: trying to break this plugin's own claims

> Date: 2026-08-27 · Method: arithmetic, internal counterexample, and the repo's own history
> Re-run: when a claim is added that carries a number, or when one of the verdicts below is disputed

The foundations tier says a claim is exactly as strong as the condition that would make it false
(`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/foundations/how-to-argue.md`). Until this
pass, nothing had tried to make any of them false. That is the difference between a tier that
*could* be falsified and one that has been put through the attempt, and it is the gap this document
closes.

**The rule of this exercise: a claim that survives is rewritten with the range in which it holds; a
claim that loses is changed in the source file, not defended here.** Nine claims were attacked.
None survived unchanged in the form it was originally written — which is either evidence that the
attack was serious, or that the original claims were loose. Both readings are compatible with what
follows, and the honest position is that some of both is true.

Every number below is reproducible: `node scripts/mechanisms.mjs <fn> <args>`, and
`node scripts/mechanisms.mjs sweep <fn> <argIndex> <from> <to> <steps> <args>` for the ranges.

---

## 1. "Two mediocre filters beat one good one"

**As written:** filters compose as ∏(1 − pᵢ), so 0.7 and 0.7 leave 9% escaping against 20% for a
single 0.8 — with independence noted as a condition.

**The attack:** independence was stated and then never priced. What does the claim look like at the
correlations real filter pairs actually have?

**The computation** (`escapeCorrelated 0.7 0.7 <rho>`): escape rises from 9% at ρ = 0 to 19.5% at
ρ = 0.5, crosses the single-filter 20% at **ρ ≈ 0.52**, and reaches 30% at ρ = 1.

**Verdict: weakened, and a consequence added.** The pair wins only while its misses are less than
about half correlated — and the pairs teams build (a reviewer checking what the linter checks, two
reviewers from the same team with the same assumptions) sit above that line. Beyond it a second
filter is not merely redundant, it is *worse than dropping one*, because it also spends attention.
`defects-and-detection.md` now carries the table and the crossover.

## 2. "Small batches make failures less likely"

**As written:** batch size raises both P(bad release) and time to restore, so halving it improves
both — which is why throughput and stability co-move.

**The attack:** hold total change volume fixed. Splitting it across more releases can't remove
defects from the changes; where do they go?

**The computation** (`defectsPerPeriod 100 <releases> 0.05`): with 100 changes at p = 0.05, the
number of *releases carrying a defect* rises 0.99 → 3.21 → 4.01 → 5.00 as releases go 1 → 5 → 10 →
100, converging on volume × p.

**Verdict: over-claim removed.** Small batches do not reduce how often something breaks. They
reduce per-release failure probability (what the change-failure-rate metric measures), the
candidate set during diagnosis, the blast radius, and therefore time to restore. The co-movement
result is about rate and recovery, not incident count. `flow-and-queues.md` now says so, with the
table.

## 3. "Every dependency added is availability spent"

**As written:** availability multiplies along a serial chain, so each new service, queue or
third-party call subtracts from the budget.

**The attack:** a cache you can miss, an enrichment you can skip, a provider you can fall back from
— none of these fails the request when it fails. Are they in the product term?

**Verdict: qualified.** The serial product counts *hard* dependencies only. A dependency with a
defined degradation path leaves the product and enters a different term — which is why "make the
dependency optional" is frequently cheaper than any amount of hardening it. The carve-out is now in
`reliability-and-redundancy.md`, along with the instruction to sort dependencies into hard and
degradable before computing anything, since the sort is usually the finding.

## 4. "A second replica buys almost nothing; buy the rollback"

**As written:** most failures at small scale arrive through your own deploys, which every replica
receives, so redundancy attacks the wrong term.

**The attack:** "most" is doing all the work, and it was never quantified. Where is the line?

**The computation:** a replica removes roughly the (1 − c) independent share of unavailability;
halving time-to-restore removes about half the duration term on *all* incidents. Replication wins
when **c < 0.5**.

**Verdict: survives with its crossover stated.** The claim holds for the common case and is wrong
for a team whose incidents are genuinely hardware or single-zone. The instruction is now to count
last quarter's incidents by cause first — "most outages are self-inflicted" is the usual case, not
a law.

## 5. "Toil saturates, so the ceiling must be defended before it binds"

**As written:** operational load that scales with the system consumes fixed capacity, and the
escape becomes unaffordable exactly when it becomes necessary.

**The attack:** the shape is right, but the *urgency* depends on one unstated parameter.

**The computation** (`periodsToThreshold 5 17.5 <growth>`): from 5 hours in a 35-hour week, toil
reaches half the week in ~29 months at +30% usage per 6 months, ~18 at +50%, ~11 at +100%, ~7 at
+200%.

**Verdict: survives, urgency qualified.** At +30% the correct answer may be "note it and carry on";
at +200% it is two quarters away. `load-and-automation.md` now carries the table, and a reliability
review that reports urgency without the growth rate has skipped the input that decides it.

## 6. "LTV = revenue ÷ churn"

**As written:** the geometric sum, used to argue that halving churn doubles lifetime value.

**The attack:** the closed form assumes a *constant hazard*. Real cohorts churn hardest early, so
what does the error look like?

**The computation** (`ltvFromSurvival` against `ltv`): for a cohort whose monthly churn starts at
12% and decays toward 2%, true LTV is ~25.5 months of revenue. R/c on the first month's churn says
8.3; R/c on the 12-month average churn (6.7%) says 14.9.

**Verdict: weakened sharply.** The naive number is not slightly off — it can be a third of the
truth, biased toward underspending on acquisition that would have paid back. The closed form is now
labelled a sanity check for a flat, mature cohort, with the summed-curve function offered instead;
the plateau expression carries the same caveat.

## 7. "A stale document is worse than no document"

**As written:** flatly, as a consequence of documents having no filter of their own.

**The attack:** a runbook whose steps are 70% valid, clearly dated, read at 3 a.m. — is that worse
than an empty page?

**Verdict: qualified, and the recommended action changed.** The claim holds when the reader *cannot
tell* the document is stale. Dating, ownership and a visible last-checked marker restore most of
the value, so they come before deletion; deletion is for content that is wrong, not merely old.
`knowledge-and-decay.md` now says that, which reverses the action its earlier phrasing implied.

## 8. "The third consumer, not the second"

**As written:** extract a shared component at the third consumer.

**The attack:** does the cost arithmetic actually say three?

**The computation** (`sharedVsLocal 30 3 10 <k>`): with a shared component costing 3× a local one
to build and 30% of a local build to adapt per consumer, the shared version is still more expensive
at k = 3 and only wins around k = 5.

**Verdict: the justification was wrong, the rule survives on a different mechanism.** Cost
amortization alone would say wait. The rule is epistemic — three implementations are the smallest
sample that separates what varies from what is stable — and `platform-and-compounding.md` now says
so, so a dispute about the number gets answered with the mechanism actually in use. (Found in the
previous pass; recorded here because it is the same exercise.)

## 9. "This repo's mechanical checks are independent of the author"

**As written, in the self-audit:** the checker reads the filesystem rather than the prose, so it is
independent of the correlated human filter.

**The attack:** who wrote the rules?

**Verdict: half of it was false.** The checker's *execution* is independent — it cannot be talked
into a wrong answer, and it caught four count drifts, two contract drifts and two arithmetic errors
that survived multiple readings. Its *rule selection* is not: every invariant it enforces was chosen
by the same process that wrote the prose, so a blind spot in the author is a blind spot in the rule
set. That is why the two arithmetic errors were found by *computing* rather than by checking — the
model was written to answer a question, and answering it truthfully was not optional. The self-audit
now states the distinction instead of claiming clean independence.

---

## What this exercise is worth, and what it isn't

**Worth:** every claim above now carries the range in which it holds, and four of them told the
reader to do something different from what the original phrasing implied (optional dependencies
before hardening; count incident causes before buying redundancy; date the runbook before deleting
it; sum the retention curve before believing an LTV).

**Not worth:** this is not an independent review. It was run by the same process that wrote the
claims, which is exactly the correlated-filter problem in §1 — a red team that shares the author's
blind spots finds the errors that arithmetic makes visible and misses the ones that need a
different mind. The two errors it found were both caught by *computing something*, which is the
part of the exercise that isn't correlated with anybody's opinion. Treat the rest as a first pass,
and treat a claim that has never been attacked from outside this repo as untested rather than
confirmed.

**The standing instruction:** when a claim in this plugin acquires a number, it goes into
`scripts/mechanisms.mjs` and gets attacked here before it is trusted. When one loses, the source
file changes and this document records what it used to say — because the record of a retired claim
is the only thing that stops it from coming back.
