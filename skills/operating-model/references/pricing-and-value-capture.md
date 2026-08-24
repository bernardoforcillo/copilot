# Pricing and value capture

The business half of the model, and the part with the sharpest edges. The claim underneath it:
**price is a product decision, not a finance one** — it's the single highest-leverage variable in
most software businesses, it's usually set once by guessing and then never revisited, and unlike
almost every other change, it takes effect immediately across the entire existing base.

That leverage cuts both ways. Everything in this file works. Some of it, applied without
restraint, is exactly what earns the model its reputation.

## Why price dominates

For a subscription product, revenue is price × conversion × retention. A 10% price increase that
costs 5% of conversions is a net gain, arithmetically — and this is the calculation that drives
every aggressive pricing move you've seen. Two things make it more dangerous than it looks:

- **The effect isn't only on the margin.** Price is also a positioning signal, an expectation, and
  the term under which existing users agreed to be here. The conversion loss is measurable in a
  week; the trust loss shows up in churn, reviews, and word of mouth over quarters.
- **Elasticity differs by segment far more than in aggregate.** The users who leave at a higher
  price and the users who stay are not the same population. A price rise is also a filter, and you
  should decide in advance which population you're selecting for rather than discovering it after.

## The levers, in order of reversibility

Work from the reversible end. Everything here is subject to the evidence standard in
`evidence-and-experimentation.md` — a primary metric, a target set in advance, and guardrails.

1. **Packaging** (most reversible). What's in which tier, what the tiers are called, what the
   default selection is. Frequently produces most of the gain with none of the "you raised my
   price" reaction, because nobody's existing terms changed.
2. **Price for new customers only.** Test on new sign-ups, leave the existing base untouched. This
   is the honest way to learn willingness to pay: real money, real decisions, no broken promises.
3. **Discount and trial structure.** Annual incentive, trial length, win-back offers. Reversible,
   measurable, and usually under-optimized.
4. **Free-tier boundary.** Where "free" stops. Tightening it converts, and it also converts your
   most vocal users into your loudest critics — this is the lever most likely to be over-pulled.
5. **Price rise on the existing base** (least reversible). Immediate revenue, permanent
   relationship change. Everything below is about doing this one without lying to anyone.

## Raising price on people who already trusted you

If you do it, do it in a way you'd be willing to have quoted back to you:

- **Notice ahead of the charge**, in plain language, from a person, with the reason. Not in a
  changelog, not on the invoice.
- **Grandfather or transition.** Either hold existing users at their price, or step them up over
  renewals rather than all at once. The cost of this is small and knowable; the cost of skipping it
  isn't.
- **Give an exit that isn't punitive.** Export their data, cancel in one click, refund the
  unstarted period. A user who leaves cleanly is a neutral outcome; a user who feels trapped is a
  review, a thread, and a permanent story about you.
- **Measure the whole cost, not the revenue line.** Churn by cohort *and* by tenure, support
  volume, refund rate, review sentiment, cancellation-reason text, organic sign-ups. A price rise
  that lifts revenue 30% while halving organic acquisition may be a loss you booked as a win — and
  you'll only know if you were reading those numbers before you moved.
- **Say the tenure quiet part out loud.** Long-tenured users are the least likely to leave and
  the most likely to feel betrayed. "They won't churn" is a true prediction and a bad reason.

The documented version of the aggressive playbook: after acquisitions, price rises in the range of
a doubling (Evernote's personal plan moved from roughly $100 to $249/yr, about an 86% increase),
free tiers sharply narrowed (WeTransfer capped free transfers at 10/month), and tiers consolidated
upward (WeTransfer's $15 and $25 plans merged into a single $25 plan). It produced the margin. It
also produced sustained public backlash, a lasting association between the acquirer's name and
"the app is about to get worse," and defensive user reaction to *every subsequent acquisition* —
a cost paid by the next deal, not the one that earned it. See `provenance.md` for sources.

## Value capture when you're small

The same mechanics, minus the leverage that makes the aggressive version work:

- **You are almost certainly underpriced**, and the fix is usually packaging or new-customer
  pricing rather than a rise on the base. Start there.
- **Talk to the users who didn't buy**, not only the ones who did — willingness to pay is a
  question about the people who said no.
- **Price on the value metric that scales with what the user gets** (seats, volume, projects), not
  on what's cheap for you to count.
- **Your small base is your distribution.** At small scale, word of mouth is most of acquisition,
  so the trust cost of an aggressive move is proportionally *larger* for you than for a portfolio
  operator who can absorb one product's reputation damage. The playbook's economics don't survive
  the scale translation; its discipline does.
- **Revisit price on a schedule** — annually, deliberately, as a decision — rather than never, and
  then all at once in a panic.

## Where the line is

This model has no opinion about ethics, so state one yourself, in advance, and hold it: no
retroactive charges without notice, no dark-pattern cancellation, no removing capability people
already paid for inside a term they already bought, no pricing that depends on the user not
noticing. Everything above works without any of that. If a pricing plan needs the user not to
understand it, it isn't a pricing plan, it's a trick with a churn schedule attached.

Strategy and execution for the surrounding work — channels, positioning, lifecycle messaging —
belong to this plugin's `growth` and `gtm` desks; this file only sets what value capture is
allowed to be and what evidence it needs.

## Anti-patterns

- **Cost-plus pricing.** What it costs you to run is not what it's worth to them.
- **One price forever.** Set once at launch by intuition and never revisited, while the product
  tripled in value.
- **Testing price on the existing base first.** The one population where the mistake is
  irreversible.
- **Reading only the revenue line.** The guardrails exist precisely because the primary metric
  will look good in the short window where the damage hasn't landed yet.
- **Confusing extraction with monetization.** Monetization is capturing part of value you
  created. Extraction is capturing value from the fact that leaving is painful — it works, right
  up until the moment the asset is gone.
