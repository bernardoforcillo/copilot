# Foundation: when mechanisms conflict

**The principles it generates:** the reduction loop's insistence on checking what actually breaks
rather than arguing in the abstract, `lollapalooza`'s demand for two or more independent lenses, the
instruction in every agent to name the mechanism that argues *against* its finding, the maturity
table (which is one conflict resolved by scale), and every "prefer X unless Y" rule in this plugin.

**The mechanism:** each mechanism is a partial model that prices one cost. Two of them can be
simultaneously true, both present, and predict opposite actions — because they are pricing different
things. A conflict is therefore not evidence that one model is wrong; it is evidence that the
decision has more than one term. The resolution is to express the terms in the same units and
compare magnitudes, and the failure is to pick the model whose conclusion you preferred.

`how-to-argue.md` names that failure and leaves the honest case open. This file closes it.

## A conflict is not a contradiction

"Delete the fallback path" follows from complexity and coupling: fewer parts, fewer interactions,
fewer states nobody tested. "Keep the fallback path" follows from reliability and redundancy: it
cuts the duration term when the dependency fails. Both statements are true, both mechanisms are
operating, and neither is refuted by the other. What has happened is that the decision has two
terms, and only one of them was on the table.

The general form: a mechanism predicts a directional effect on **one** quantity. A decision needs
the sum over all the quantities that matter. Anyone who resolves a conflict by asserting that their
mechanism is "more fundamental" has quietly replaced a sum with a preference — there is no ranking
of mechanisms in the abstract, only magnitudes in a context.

## The resolution procedure

In order. Stop at the first step that resolves it; most conflicts die at step two.

**1. Put both in the same units.** Money per period, minutes of user-visible failure, hours per
week, expected value. The unit doesn't matter as long as it's shared. If neither side *can* be
expressed in a common unit, this is not a mechanism conflict — it's a values conflict wearing one,
and `how-to-argue.md` says to label it and decide it by ownership rather than by arithmetic.

**2. Compare magnitudes, not directions.** Almost every conflict that feels balanced is lopsided by
an order of magnitude, and it feels balanced only because both sides were stated qualitatively. The
fallback path costs one branch and a test; the outage it prevents costs frequency × exposure ×
duration. Compute both crudely before arguing about either.

**3. Ask which mechanism binds at this scale.** Mechanisms have regimes, and the honest output of a
conflict is usually a **crossover point** rather than a winner. At 40 users, the sample-size
mechanism dominates the experimentation mechanism, so the experiment can't settle anything; at
40,000 the reverse holds. Naming the crossover ("this flips when we pass roughly N") converts an
argument into a trigger — which is what `radical-simplicity.md`'s complication ledger is made of.

**4. Check whether one is a special case of the other.** A fallback whose absence has already
caused an incident is not "complexity versus reliability" — it is essential complexity, which the
complexity mechanism itself carves out. Many apparent conflicts dissolve here, and the tell is that
one side's voiding condition is exactly the other side's premise.

**5. Break the tie with reversibility.** When the magnitudes are genuinely comparable — and only
then — prefer the option that preserves the option. This is the one principled tie-break that
requires no further information (`irreversibility-and-optionality.md`): equal expected values are
not equal when one branch keeps the decision available and the other closes it.

**6. If it is still tied, say so.** The decision is under-determined by mechanism. It goes to
whoever owns the outcome (`../ownership-and-execution.md`), gets time-boxed, and is recorded as a
judgement call — not written up as a derivation. A coin flip described honestly is worth more than
a derivation reverse-engineered from the answer.

## The standing conflicts in this plugin

These are the pairs that come up repeatedly. Each is genuine — both mechanisms are present — and
each has a characteristic resolution.

| Conflict | What each side prices | How it resolves |
| --- | --- | --- |
| Delete the path (`complexity-and-coupling.md`) vs keep the fallback (`reliability-and-redundancy.md`) | Interactions and untested states vs the duration term of an outage | Magnitude: expected loss versus one branch. The crossover is the first real incident — after which it is essential complexity, not a complication |
| Small batches (`flow-and-queues.md`) vs the atomic cutover (`irreversibility-and-optionality.md`) | Feedback and diagnosis cost vs a half-migrated system | Special case: when the batch is genuinely indivisible, stop shrinking it and attack its risk — rehearsal, staged rollout, rollback |
| Act now on a two-way door vs measure first (`uncertainty-and-information.md`) | Cost of delay vs cost of being wrong | Magnitude and reversibility: when undo is cheap, acting *is* the measurement, and the probe is the more expensive way to learn the same thing |
| Automate the toil (`load-and-automation.md`) vs keep the human sharp (Bainbridge, same file) | Recurring hours vs skill decay on the rare case | Scale: automate the *decided* procedure, rehearse the manual path on a schedule. The conflict is real and the resolution is both, not a compromise |
| Write it down (`knowledge-and-decay.md`) vs documentation rots (same file) | Re-litigation cost vs believed-stale pages | Placement: write the durable half (decisions, reasons), generate or delete the volatile half |
| Improve the loop vs open a channel (`../../../growth/references/foundations/loops-and-saturation.md`) | Compounding k vs the rising marginal cost of a saturating channel | Magnitude at the current volume: the loop wins on horizon, the channel wins when k is small and the curve is still cheap |
| Review thoroughly (`defects-and-detection.md`) vs review fast (`flow-and-queues.md`) | Escape probability vs queueing delay and context decay | Crossover: detection per unit attention falls with size, so the resolution is smaller changes rather than more thorough review of large ones |
| End-to-end ownership (`incentives-and-trust.md`) vs specialization (`compounding-and-capital.md`) | Agency cost at each handoff vs the learning curve | Frequency: when handoffs are frequent, agency cost dominates; when the specialist skill is rare and the handoff is once a quarter, the curve does |
| Rank by expected value (`../impact-and-prioritization.md`) vs hold the objective | Best available bet vs coherence over a quarter | Constraint-then-rank: objectives set what is in scope, EV picks inside it — and repeated disagreement is evidence about the objective, not permission to ignore ranking |

The table is not a lookup for the answer. It is a lookup for **which two terms you should be
computing**, which is the part people skip.

## Two failure modes specific to conflicts

**The balanced-sounding split.** "Let's do a bit of both" is a resolution only when the magnitudes
are comparable; when they differ by 10×, splitting the difference is just the arithmetic-free
compromise wearing a diplomatic coat. It reliably produces the worst of the two options —
a partial fallback nobody tested, a migration that is neither atomic nor incremental.

**Promoting a mechanism to a principle.** "Simplicity always wins here" or "reliability is
non-negotiable" ends the argument by removing the sum. Sometimes that's correct — the ruin cases in
`irreversibility-and-optionality.md` genuinely are non-negotiable, because their cost isn't bounded
— but the promotion has to be justified by the *unbounded* cost, not by preference. Every other
"always" is a magnitude claim that hasn't been checked.

## How a conflict should end up in writing

The record that makes the decision auditable later, and re-openable when the crossover moves:

- Which two mechanisms were in tension, named.
- The magnitudes, in the shared unit, however crude — "roughly 3 hours a month against roughly one
  branch and one test".
- The crossover: what would have to change for the answer to flip.
- The decision, and whether it was determined by magnitude, by reversibility, or by ownership.

That is four lines, and it is exactly the content that makes the ADR worth keeping when someone
re-opens the question in a year (`knowledge-and-decay.md`).

## When this mechanism is absent

- **Only one mechanism applies.** Then there is nothing to adjudicate; apply it and move on. This
  is more common than the conflict-hunting habit suggests, and looking for a counter-mechanism to
  every finding is its own kind of theatre.
- **The conflict is between a mechanism and a constraint.** Regulation, a contract, a platform rule,
  a safety requirement: the constraint wins outright, no arithmetic required, and the mechanism's
  job is only to find the cheapest compliant option (`../limits-and-failure-modes.md`).
- **The stakes are below the cost of the analysis.** On a two-way door, running this procedure costs
  more than being wrong. Decide, observe, adjust.
- **The disagreement is about values.** No procedure over mechanisms adjudicates what the product
  should be for, or which users it should serve. Say so, and decide it by ownership.
