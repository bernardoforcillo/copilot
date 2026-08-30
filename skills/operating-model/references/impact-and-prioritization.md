# Impact and prioritization

Work is chosen by expected value, and by nothing else — not by age in the backlog, not by who
asked, not by how nearly finished it is, not by how much was already invested in it. The scarce
resource is attention, and every hour spent on the third-best available piece of work is an hour
that the best one didn't get.

## Rank by expected value

For each candidate piece of work, state three things and multiply:

**EV ≈ (size of the effect if it works) × (probability it works) ÷ (cost to find out)**

(`node scripts/mechanisms.mjs expectedValue 100 0.5 2` against the same effect and odds behind a
30-day build.) None of the three needs to be precise; they need to be *explicit*. The value of writing them down
isn't the arithmetic, it's that unstated assumptions become arguable. A candidate whose "effect if
it works" nobody can name is not a candidate — it's a preference.

Three corrections that do most of the work in practice:

- **Cost to find out ≠ cost to build.** The number that matters is what it costs to learn whether
  the effect is real. A two-day probe that resolves a 50/50 question beats a six-week build that
  assumes the answer, even when the six-week build is the eventual deliverable.
- **Compare against the alternative, not against zero.** Every piece of work is competing with the
  best thing you're not doing. "This is worth doing" is not the bar. "This is worth doing *more
  than that*" is.
- **Base rate first.** Before estimating the probability from this project's specifics, ask what
  usually happens with work of this shape. Most rewrites take longer and deliver less than
  predicted; most "quick migrations" aren't; most features move no metric at all. Start from the
  reference class and adjust, rather than reasoning from the specifics alone. (`lollapalooza`'s
  base-rate check is the same move, applied to a decision instead of a queue.)

## The backlog is a graveyard, and that's correct

Most of what's in the backlog is meant to stay there permanently. A backlog is not a queue you're
behind on; it's a record of things that lost to something better and will probably keep losing.

This has two practical consequences:

- **Don't groom the graveyard.** Time spent estimating, refining, or re-prioritizing items that
  will never be the highest-EV thing is pure overhead. Groom the top; leave the tail alone.
- **Don't feel obligated by age.** An item that has been waiting a year has lost every ranking for
  a year. That's evidence about its value, not a claim on your time.

The corollary is that saying no is the normal outcome, and it doesn't require the work to be bad.
"Good, but it loses to what we're doing" is the most common honest answer.

## Kill criteria, written before you start

Every non-trivial piece of work states, before it begins, the condition under which it gets
stopped: a date, a metric threshold, a signal that the assumption was wrong. Written in advance,
because after you've invested three weeks, no threshold you invent will be honest.

- **A date**: "if this isn't in front of users by the 30th, we stop and reassess."
- **A number**: "if the pilot doesn't move activation by 2 points, we don't build the full version."
- **A discovery**: "if it turns out we need our own scheduler for this, we stop and re-scope."

When a kill criterion fires, the work stops. That's the whole point of writing it down: to move
the decision to a moment when you were still capable of making it clearly. This pairs with the
finisher rule in `ownership-and-execution.md` — quick to abandon, but never quick to leave
half-done.

## Long horizon, fast pace

These two are usually posed as a trade-off, and they aren't. The horizon governs *what* you pick;
the pace governs *how* you execute it.

- **Long horizon on choices.** Prefer the work whose value compounds — tooling you'll reuse,
  a data asset that gets richer, a fix to the thing that keeps generating incidents, an
  understanding that transfers. One-off wins that leave nothing behind rank lower than their
  immediate effect suggests.
- **Fast pace on execution.** Once chosen, ship it at the coarsest useful granularity, quickly,
  and read the result. Speed over sophistication when in doubt — most decisions are two-way doors,
  and deliberation on a two-way door is a cost with no buyer. `decision-latency.md` carries the
  door taxonomy, how to time-box the decision itself, and why work in progress is inventory that
  rots.

The compounding preference is why "boring infrastructure work" often outranks a visible feature,
and why the reverse is true when the infrastructure work serves a product that hasn't proven it
deserves to exist yet.

## Objectives, and the key results that grade them

Expected-value ranking answers "what next". It doesn't answer "what is this sequence of decisions
supposed to add up to by the end of the quarter" — and without that, ranking drifts toward whatever
was measurable and near at hand. A lightweight goal frame fixes the horizon without turning into
planning ceremony:

- **An objective is a direction, stated qualitatively** ("new users reach the thing they came for
  without help"). Two or three at a time, at most. The point of the number being small is what it
  excludes.
- **Key results are outcomes, not activities.** "Activation from 14% to 25%" is a key result;
  "ship onboarding v2" is a milestone that may or may not produce one. Two to four per objective,
  each with a number and a date.
- **Separate committed from aspirational, and say which each one is.** A committed result is
  expected to land in full, and missing it is a problem to escalate rather than to explain. An
  aspirational one is deliberately set where you'd be pleased with roughly two thirds of it —
  and if you keep hitting those in full, they were sandbagged, which costs more than missing them
  would have.
- **Grade them, and grade them honestly.** The grade exists to recalibrate the next set — to tell
  you whether you systematically over- or under-reach — and for nothing else.
- **Never attach the grade to a reward, a review, or anyone's judgment of the person.** The moment
  a number decides a payout, the number gets chosen for safety rather than for ambition, and you
  have bought yourself a quarter of conservative targets and creative accounting. This is
  Goodhart's law with a personal incentive attached; see
  `foundations/uncertainty-and-information.md`.

**How this reconciles with EV ranking**: objectives set what kind of work is in scope, ranking
picks inside it, and the two disagreeing is informative rather than annoying. When the
highest-expected-value work available is repeatedly off-objective, the objective is wrong — that's
a signal to change it deliberately, not permission to abandon the ranking.

## Reading your own throughput

Once a month, look back rather than forward: of the work you actually finished, how much of it was,
in hindsight, the highest-EV work available at the time? The failure this catches is not laziness —
it's drift: reactive work, work that arrived with a name attached, work that was easy to start.
The `capture-learnings` skill is where the answer belongs if the project keeps a memory wiki.

## Anti-patterns

- **Sunk cost as an argument.** How much has already been spent is information about the past.
- **Prioritization by requester.** Whoever asked most recently, most loudly, or most senior is not
  an EV input.
- **Effort as value.** Hard is not the same as valuable; a week of difficult work on a thing that
  moves nothing is a week.
- **Infinite optionality.** Keeping five things half-alive so none has to be killed. See the
  permanent 90%.
- **Metric with no decision attached.** If no plausible value of the number would change what you
  do, the number isn't worth measuring — and the work it was supposed to justify wasn't ranked.
