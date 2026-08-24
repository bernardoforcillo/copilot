# Foundation: incentives and trust

**The principles it generates:** end-to-end ownership, why handoffs fail, compensation and
evaluation by impact, the false-negative caveat on an extreme talent bar, and the line between
monetization and extraction.

**The mechanism:** behavior follows the payoff structure, not the stated intention — and in repeated
interactions, the payoff structure includes what the other side does next.

## Agency: the cost of deciding without bearing the consequence

Jensen and Meckling (*Theory of the Firm*, 1976) named the general form: whenever a decision-maker
(the agent) doesn't bear the full consequence of the decision, costs appear that no amount of good
faith removes — the agent's optimum simply isn't the principal's.

Every handoff at a layer boundary creates one of these gaps. The backend engineer who "finished"
before the feature reached a user, the person who shipped without instrumenting, the agent that
returned code nobody verified: in each case the decision-maker's payoff (my part is done) detaches
from the outcome (does the thing work). End-to-end ownership is not a cultural preference — it is
the structural fix, closing the gap by making the same person hold both ends.

Three practical corollaries:

- **Skin in the game.** Taleb's (2018) framing of a very old idea: decisions improve when the
  decider is exposed to the downside. Equity, on-call, owning the metric you moved — all are the
  same mechanism at different scales.
- **The metric you're paid on is the job you actually have.** If evaluation counts shipped
  features, features ship — instrumented or not, needed or not. This is Goodhart
  (`uncertainty-and-information.md`) pointed at people instead of proxies.
- **Nobody is coming.** In a flat structure, the payoff for waiting to be told what to do is zero
  and the payoff for finding the highest-value work is the whole game. That only holds if the
  evaluation actually rewards outcome over assignment — otherwise "entrepreneurial default" is a
  slogan attached to an incentive that punishes it.

## Selection under noise

Evaluation measures a signal correlated with true quality, never quality itself. Let ρ be that
correlation. Two results follow, and both are counter-intuitive enough that ignoring them is the
norm:

**False negatives dominate under extreme selectivity.** When you accept the top fraction of a
signal that correlates imperfectly with quality, the accepted group is enriched for quality — but
the *rejected* group contains a large absolute number of people who would have been excellent, and
that number grows as the selection ratio shrinks. Selecting ~0.04% of applicants (the disclosed
ratio behind the model this desk draws on) with any realistic ρ means rejecting vastly more capable
people than you accept. That is not a flaw to be fixed — it is what a filter at that ratio does.
The error is claiming the process *identifies* the good people rather than that it returns a small,
heavily over-filtered subset of them.

**Regression to the mean applies to people, not just to metrics.** Selecting on an extreme
observation selects partly for noise, so subsequent performance is on average less extreme. The
star hire who is merely good, the star quarter followed by an ordinary one, the "obviously
brilliant" interview that becomes an average colleague — all are predicted by the arithmetic and
routinely misread as a change in the person.

The defense against both is the rubric written *before* the search
(`talent-and-standards.md`): fixed criteria, multiple weakly-correlated signals scored separately,
and a threshold rather than a ranking against imagined alternatives. A standard that's re-decided
continuously against hypothetical replacements has no fixed point, and produces churn instead of
calibration.

## Repeated games: why trust is capital

Axelrod (*The Evolution of Cooperation*, 1984): in a one-shot prisoner's dilemma, defection
dominates; in an indefinitely repeated one, conditional cooperation outperforms it, because the
"shadow of the future" makes today's defection cost tomorrow's cooperation. The strategy's strength
comes from being nice, retaliatory, forgiving, and *legible*.

Applied to a business, this is the whole account of reputation:

- **Trust is a stock, not a flow.** It accumulates slowly through many small kept promises and can
  be spent quickly in one broken one. It doesn't appear on any dashboard, which is exactly why it
  loses every ranking that counts only instrumented outcomes.
- **An aggressive price rise on a captive base is a defection with a visible payoff.** The revenue
  is immediate and measurable; the cost is a change in how the other side plays the *next* round —
  slower word of mouth, faster churn on the next change, a defensive reaction to your next
  acquisition. The cost lands late, on a different line, often attributed to something else.
- **The shadow of the future is the discipline.** If you intend to be in this market for a decade,
  a strategy that assumes users can't leave is a bet against your own longevity. If you don't
  intend to be here, you're running the one-shot game — which is a coherent strategy and worth
  admitting to rather than describing as operational excellence.
- **Legibility matters as much as the behavior.** Grandfathering announced in advance buys more
  than grandfathering discovered afterwards; a status page during an outage buys more than a fix
  nobody saw. Cooperation only sustains cooperation if the other side can tell you cooperated.

## Selection effects, one level up

Every rule you set also selects who deals with you. A high bar selects colleagues; an aggressive
price selects for users with high switching costs and against users with alternatives; a demanding
culture published up front (rather than discovered) selects for people who wanted it. This is
usually described as culture and is more accurately described as a filter — and the filter is
running whether or not you designed it. Worth asking of any rule: *who does this select for, and
is that who I want on the other side of the next round?*

## When this mechanism is absent

The principle voids, or weakens, where:

- **The game genuinely doesn't repeat** — a wind-down, a final sale, a market you're exiting. Then
  the cooperative equilibrium isn't sustained by anything. This is far rarer than it's claimed, and
  a decision-maker who believes it while the organization keeps playing has simply externalized the
  cost onto whoever is there next round.
- **The decision-maker and the consequence-bearer cannot be joined** — regulated separations,
  contractual boundaries, some safety-critical roles where independent review is the point. Then
  agency cost is managed by monitoring and audit rather than by ownership, and end-to-end ownership
  is the wrong prescription.
- **Reputation cannot propagate** — no reviews, no word of mouth, no repeat purchase, no visible
  history. Rare in software, and worth checking before assuming it: the model's whole cooperative
  half rests on this channel existing.
