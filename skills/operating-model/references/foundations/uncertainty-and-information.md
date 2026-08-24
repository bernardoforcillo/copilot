# Foundation: uncertainty and information

**The principles it generates:** impact-only prioritization by expected value, evidence over taste,
cost-to-learn rather than cost-to-build, kill criteria, pre-registration and guardrails, and the
rule that a measurement with no decision attached is overhead.

**The mechanism:** decisions are bets under uncertainty; information has a price and a value, and
the value is zero unless it can change what you do.

## Expected value, and what it hides

A decision's value under uncertainty is the probability-weighted sum of its outcomes. Two
refinements do most of the practical work:

- **Frank Knight (1921) separated risk from uncertainty.** Risk is a known distribution — you can
  compute. Uncertainty is an unknown distribution — you cannot, and pretending otherwise by
  attaching a precise number to a guess converts an honest unknown into a false input. Most product
  decisions are Knightian: the discipline is to state the assumption explicitly, not to fabricate
  a decimal.
- **The average hides the tail.** A decision with a good expected value and a small chance of an
  unrecoverable outcome is not a good decision, because ruin ends the sequence of future bets
  (see `compounding-and-capital.md`). Check the tail separately, always.

## The value of information

Ronald Howard's information value theory (1966) gives the result that this whole desk leans on:

> The value of information is the improvement in expected outcome it produces — **and it is exactly
> zero if the decision would be the same regardless of the answer.**

Two consequences, both stated as rules elsewhere in this skill and both derivable here:

- **A metric with no decision attached is worth nothing.** Not "less", not "nice to have" — zero,
  by construction. Before instrumenting anything, name the decision each possible answer changes.
- **Cost to *learn*, not cost to build, is the denominator of the ranking.** If a two-day probe
  resolves the uncertainty that a six-week build was going to assume, the probe has most of the
  information value at a fraction of the price. Ranking by build cost systematically overvalues
  work whose uncertainty is high.

Information is also perishable: it's worth most before the decision is made and nothing after. This
is the mechanism under kill criteria — a threshold set in advance is information purchased at the
moment it can still change the outcome.

## Base rates and updating

Posterior odds = prior odds × likelihood ratio. In practice, the failure isn't the arithmetic, it's
that the prior gets skipped entirely: Tversky and Kahneman (*Judgment under Uncertainty*, 1974)
showed people substitute how *representative* a case feels for how *frequent* its class is.

Applied here: before estimating this project's probability from its specifics, state what usually
happens to projects of this shape — rewrites, migrations, "quick" integrations, features expected
to move a metric. That reference class is the prior, and specifics are the likelihood ratio that
moves it. "This time is different" is a claim that needs its own evidence, and it's usually wrong.

**Regression to the mean** is the companion trap. Any observation containing measurement noise —
a great week, a bad quarter, a variant that won big — will on average be less extreme next time,
by an amount proportional to how noisy it was. This produces two systematic errors: crediting the
intervention that followed a bad reading, and building on an experiment result that was mostly
noise.

## Why small samples can't settle things

Detecting a difference δ with standard deviation σ requires roughly

**n ≈ 16σ² / δ²** per arm (two-sample comparison, 80% power, 5% significance)

and for a conversion rate p, σ² = p(1−p), so **n ≈ 16 p(1−p) / δ²**.

Put numbers in it, because the numbers are the argument. Detecting a 1-point lift on a 5%
conversion rate: n ≈ 16 × 0.05 × 0.95 / 0.01² ≈ **7,600 per arm**. Detecting a relative 10% lift on
that same rate (δ = 0.005): ≈ **30,000 per arm**. A product with a few hundred users per month is
not underpowered by a little — it is off by orders of magnitude, and every "experiment" it runs is
a coin flip wearing a p-value.

The quadratic in the denominator is the important part: **halving the effect you want to detect
quadruples the sample you need.** It is why big, coarse changes are measurable and fine-tuning
isn't, and why the honest move at small scale is to prefer changes whose expected effect is large
enough to see.

Three further ways the same arithmetic gets abused:

- **Peeking.** Stopping when the result first looks good inflates the false-positive rate far above
  the nominal 5%; fix the horizon in advance.
- **Multiple comparisons.** Twenty segments, one significant at p<0.05, is the expected outcome of
  pure noise. Pre-register the cuts.
- **The winner's curse.** Selecting the best of many variants selects partly for noise, so the
  measured effect of the winner is biased upward and shrinks on re-measurement.

## Goodhart's law is a measurement result, not a proverb

Goodhart (1975), in Marilyn Strathern's (1997) formulation: *when a measure becomes a target, it
ceases to be a good measure.* Campbell's law (1979) says the same about social indicators. The
mechanism: any proxy correlates with the goal through a set of paths, and optimization pressure
finds the cheapest path — which is usually the one that moves the proxy without moving the goal.

This is not an argument against measurement; it's the reason guardrails exist, the reason a proxy
needs periodic re-validation against the thing it proxies, and the reason "the metric moved" is
never by itself a claim that the product got better.

## When this mechanism is absent

The principle voids, or weakens sharply, where:

- **No outcome is measurable in a usable time frame** — long-horizon infrastructure, research,
  anything whose effect appears in years. Judgment is the correct instrument; label it as judgment
  rather than dressing it as evidence.
- **The sample can never be adequate** — small scale, per the arithmetic above. Fall back to staged
  rollouts, holdouts, and qualitative evidence with the sample size stated.
- **The decision is unique and unrepeatable** — no reference class, no base rate, one shot. Expected
  value is still the right frame; the numbers in it are assumptions and must be labeled as such.
- **The valuable outcomes are structurally unmeasured** — trust, craft, accessibility, second-order
  reputation effects. These lose every ranking that only counts what's instrumented, which is the
  failure mode named in `limits-and-failure-modes.md`. The fix is to name them as unmeasured inputs
  to the decision, not to pretend they scored zero.
