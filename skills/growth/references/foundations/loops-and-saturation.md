# Foundation: loops and saturation

**The principles it generates:** loops preferred over campaigns, retention ranked above
acquisition, the north-star metric as a leading behaviour rather than a revenue figure, channel
economics read as a curve rather than a number, lifetime value as the frame for any spend, and the
payback horizon as a financing constraint.

**The mechanism:** a user base is a stock governed by a difference equation. Whether growth
plateaus or compounds depends on one structural question — is acquisition a constant flow, or is it
proportional to the stock? — and almost every growth argument is really a disagreement about which
regime you are in.

## Two regimes, one equation

Let **N** be active users, **a** the users acquired per period from a source that doesn't depend on
N, **c** the fraction that churns per period, and **k** the users each existing user brings per
period through the product itself.

**N(t+1) = N(t) + a + k·N(t) − c·N(t)**

Everything below is that line read carefully.

**Regime 1 — constant-flow acquisition (k = 0).** The stock converges to a plateau:

**N\* = a / c**

| Acquisition a | Monthly churn c | Plateau N\* |
| --- | --- | --- |
| 100 / month | 10% | 1,000 |
| 100 / month | 5% | 2,000 |
| 100 / month | 2% | 5,000 |
| 200 / month | 5% | 4,000 |

Run it: `node scripts/mechanisms.mjs plateau 100 0.05` and, with a loop,
`node scripts/mechanisms.mjs plateau 100 0.05 0.025` — the third argument is k.

Three readings, and the first one surprises people every time:

- **A paid channel run at constant intensity has a ceiling**, and consistency does not raise it.
  Once you are at the plateau, every new user is replacing a departing one — the spend is buying
  the same number twice.
- **Halving churn does what doubling spend does**, at a cost that usually isn't proportional.
- **Growth that "stalled" often didn't**: it arrived at a/c, which was decided the day the channel
  and the retention curve were fixed.

**Regime 2 — proportional acquisition (k > 0).** The stock grows geometrically when **k > c**, and
otherwise still plateaus, but higher:

**N\* = a / (c − k)** when k < c

So a loop that doesn't reach escape velocity is not useless — it multiplies the plateau by
1/(1−k/c). At k = half of c, the plateau doubles. The honest question is therefore never "are we
viral" but **what is k, measured, and how does it compare to c** — two numbers, both of which you
can estimate from your own data this week.

## Retention is the multiplier on everything

The lifetime-value form of the same geometric series: with revenue R per period and churn c,

**LTV ≈ R / c**

Churn appears in the denominator of both LTV and the plateau, which is why it is the single lever
with two large effects — halving it doubles the value of every user you already paid for *and*
doubles the size the business settles at. `${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/foundations/compounding-and-capital.md`
is the general form: a rate improvement compounds, a one-time addition doesn't.

The corollary is a ranking rule the acquisition-first instinct gets backwards: below a certain
retention, acquisition spend is pouring water into a bucket whose hole you have declined to
measure. Fix the hole first — not for tidiness, but because every acquisition euro is multiplied by
1/c.

## Saturation: CAC is a curve, not a number

Within any channel, the addressable audience is finite and its members do not respond identically.
Rational targeting reaches the most responsive first, so as spend rises you are buying progressively
less responsive attention: **marginal cost per acquisition rises with volume**, mechanically, before
any competitor does anything.

Two further effects push the same way. Frequency saturates — the same person seeing the message a
fifth time converts less than they did the second. And an auction-priced channel prices your
audience against everyone else who wants it, so the curve shifts upward over time even at constant
volume.

Consequences worth stating plainly, because they are where growth plans go wrong:

- **A blended CAC quoted as one number is a point on a curve**, valid only at the volume it was
  measured at. Plans that scale spend 5× and hold CAC constant are arithmetic fiction.
- **Channel diversification is not a hedge, it's a way to stay on the cheap part of several
  curves** — the reason to add a channel is usually that the current one has become expensive at
  the margin, not that concentration is risky.
- **Saturation is why a loop is worth more than its k suggests**: the loop's cost per acquisition
  doesn't rise with volume the way a purchased channel's does, because it's produced by the product
  rather than bought from an auction.

## Payback horizon is a financing constraint

LTV > CAC is not sufficient; you have to be able to *carry* the gap. A cohort that repays in three
years is only spendable against if three years of it can be financed, and a business that spends
past its ability to carry the gap can be right about the unit economics and still not survive to
collect them — the ruin case in `${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/foundations/compounding-and-capital.md`.

At small scale the operative number is therefore months-to-payback, not the LTV:CAC ratio, and it
should be compared against the cash you actually hold rather than against an industry rule of
thumb.

## Why a loop is capital and a campaign is consumption

A campaign converts money into a stock of users, once. A loop converts product work into a *rate*
that applies to the stock you already have — its output next month is proportional to this month's
result. That is the difference between buying an asset and buying an outcome, and it is why the
compounding preference in
`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/impact-and-prioritization.md` ranks a
product change that raises k above a campaign with the same immediate effect.

It is also why loop work is judged on a different horizon: k improvements pay geometrically and
therefore look unimpressive in the period they land.

## Measurement traps specific to this equation

- **Aggregate churn is a mix statistic.** A blended rate improving while every cohort worsens is a
  standard occurrence when acquisition is growing; read cohorts, always
  (`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/evidence-and-experimentation.md`).
- **k measured on early adopters over-predicts.** The first users are the most enthusiastic
  population you will ever have, and they share for reasons the median user won't.
- **Attribution buys a story, not a mechanism.** A channel credited by a last-touch model is not
  the channel that caused the acquisition; the loop is systematically under-credited because it
  leaves no click.

## When this mechanism is absent

The equation stops describing the business where:

- **Purchase is one-shot.** No repeat usage means no churn term and no geometric LTV; the model
  becomes a funnel with a fixed conversion rate, and retention advice doesn't apply.
- **The market is small enough that saturation dominates everything.** With a few thousand possible
  customers, there is no regime where a loop runs — the correct frame is direct sales against a
  named list.
- **The cycle is long and the sample tiny.** Enterprise deals at one per quarter cannot be modelled
  with a per-period difference equation; per-deal reasoning replaces it.
- **Distribution is gated.** Where a platform, a regulator, or a distributor decides who reaches
  the market, acquisition is neither proportional nor freely purchasable, and the binding constraint
  is the relationship rather than the arithmetic.
