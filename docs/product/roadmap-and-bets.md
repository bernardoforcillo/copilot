# Roadmap and bets: <period>

> Date: <YYYY-MM-DD> · Owner: <name>

A roadmap is a ranked set of bets with stopping conditions, not a delivery schedule with dates
attached to features. The format below is the expected-value ranking from the `operating-model`
desk, made into a page you can hand to someone.

## The bets, ranked

| # | Bet | Effect if it works | Probability | Cost to *learn* | Rank | Kill criterion |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | | | | | | |
| 2 | | | | | | |

Rules that keep this honest:

- **Cost to learn, not cost to build.** A two-day probe that resolves a 50/50 question outranks a
  six-week build that assumes the answer.
- **Compare against the best alternative, not against zero.** "Worth doing" is not the bar.
- **State the base rate** for work of this shape before adjusting for specifics. Most rewrites run
  long; most features move no metric.
- **Every bet has a kill criterion** written now — a date, a threshold, or a discovery.

## The graveyard

What was considered and is deliberately not being done, with one line each on why it lost. This
section is longer than the one above in any honest roadmap, and it's the one that prevents the
same idea being re-litigated every month.

## Reserved capacity

The share of capacity that is *not* ranked: maintenance, dependency updates, deletion,
documentation, incident follow-ups. These lose every individual EV comparison and win the
aggregate one, so they get reserved rather than ranked
(`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/limits-and-failure-modes.md`).

Suggested: name a percentage and hold it.

## Bets in flight

| Bet | Started | Decision due | Status | Kill criterion still valid? |
| --- | --- | --- | --- | --- |

A bet past its decision date with no decision is the most expensive state work can be in — it holds
attention and returns nothing. Decide or kill.

## What would change this ranking

The observations that would reorder the table: a measurement, a customer signal, a cost change, a
competitor move. Written down so the next revision starts from evidence rather than from scratch.
