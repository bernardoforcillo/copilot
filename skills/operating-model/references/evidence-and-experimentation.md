# Evidence and experimentation

Decisions get settled by measurement wherever measurement is available and honest — from a copy
change to a pricing move to a multi-year strategy. Where it isn't available, the decision is made
on stated assumptions that are written down as assumptions, not laundered into confidence.

The point isn't rigor for its own sake. It's that taste is expensive to be wrong with and
impossible to audit, while a number can be argued with by someone who wasn't in the room.

## Instrumentation ships with the feature

A feature that ships without the measurement that would tell you whether it worked has not been
finished — it's been abandoned at the last step (see `ownership-and-execution.md`). Before writing
the feature, write down:

1. **The metric it's supposed to move**, and its current value. One primary metric, not a
   dashboard. If you can't name one, you haven't stated why you're building it.
2. **The size of move that would count as success**, decided now, not after seeing the result.
3. **The guardrails** — the metrics that must *not* get worse: latency, error rate, churn,
   support volume, refund rate, unsubscribes. A win on the primary metric that quietly degrades a
   guardrail is a loss you'll discover a quarter late.
4. **The decision each outcome triggers**: what you do if it works, if it does nothing, if it
   hurts. A measurement with no decision attached is overhead.

## When an experiment is the right tool

A controlled experiment (A/B) is the strongest available evidence and is not always available.
Reach for it when all of these hold:

- **The change is reversible and the exposure is splittable** — you can genuinely run both arms.
- **The traffic is enough** to detect the size of effect you care about in a time you can wait
  through. Compute this *before* running: an underpowered test doesn't return a weak answer, it
  returns a random one that looks like an answer.
- **The metric is close to the change.** Effects on conversion, activation, or a click-path are
  measurable in days; effects on annual retention are not measurable in an experiment you can
  afford to wait for, and need a proxy chosen deliberately.
- **The product is mature enough to be worth it** — see the maturity gate in
  `radical-simplicity.md`. On an unvalidated product, the sample can't settle anything and the
  experiment infrastructure is unearned complexity.

When those don't hold, say which one failed and fall back deliberately: a staged rollout with
guardrail monitoring, a holdout cohort, a before/after read with the seasonality caveat stated, or
qualitative evidence with its sample size named. All of these are legitimate; presenting any of
them with the confidence of an experiment is not.

## Reading results honestly

- **Read by segment, not only in aggregate.** The same change routinely helps one platform,
  geography, or cohort and hurts another; the aggregate hides both. Decide the segments you'll cut
  by in advance — otherwise you'll find the flattering cut after the fact.
- **Pre-register the cut, the metric, and the horizon.** Deciding what counts as success after
  seeing the data is how a coin flip becomes a strategy.
- **A flat result is a result.** Most changes move nothing; that's the base rate. "No effect" is a
  cheap, valuable finding, and reverting is the correct response to it — a change that didn't
  earn its place is complication with no benefit (`radical-simplicity.md`).
- **Don't stop early on a good-looking partial read.** Peeking and stopping at the first
  favourable moment inflates false positives; fix the horizon in advance and honour it.
- **Effects decay.** A novelty win frequently disappears in weeks. For anything that touches
  retention or revenue, re-read the metric a cycle later before treating the win as permanent.

## Lifetime value as the spend frame

Any decision to spend money to acquire users — ads, referral incentives, a free tier, a discount —
is a bet that the value of the cohort acquired exceeds what it cost to acquire it. The frame:

- **Model the value of a cohort, not of an average user.** Cohorts differ enormously by channel,
  geography, and platform; an average across them justifies spend on the bad ones with the returns
  of the good ones.
- **Compare against the payback horizon you can actually finance.** A cohort that pays back in
  three years is only spendable against if you can carry three years of it.
- **Organic beats paid when the product does the acquiring.** Spend that has to keep growing to
  hold the same position is renting demand; a product change that increases the rate users bring
  other users is the same money spent on an asset. Rank accordingly — this is the compounding
  preference from `impact-and-prioritization.md` applied to marketing spend.

For the strategy layer above this — loops, channel selection, retention mechanics — this plugin's
`growth` skill and `growth-marketer` agent are the specialists; this file only fixes the standard
of evidence they're held to.

## Scale changes what's answerable

Two things become possible only with volume, and knowing which side of the line you're on prevents
both over- and under-investment: a portfolio of products sharing one measurement platform can
resolve small effects that no single product could detect, and a decision made once can be
re-used across many products, which is what makes the platform worth building. Below that scale,
the honest position is that most small effects are simply not measurable by you, and the correct
response is to prefer changes whose expected effect is large enough to see.

## Anti-patterns

- **Dashboard theatre.** Metrics nobody has attached a decision to.
- **HiPPO with a number.** Running the test, disliking the result, shipping anyway. If the
  decision was never going to follow the evidence, the test was a cost with no buyer.
- **Optimizing a proxy into the ground.** Every proxy metric detaches from the thing it proxies
  once you push hard enough on it; guardrails exist to catch this, and so does periodically asking
  what the proxy was for.
- **Experimenting on an unvalidated product.** Precision applied to a question the market hasn't
  been asked yet.
- **Aggregate-only reporting.** The single most common way a real regression ships as a win.
