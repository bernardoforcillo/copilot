# Foundation: demand and discovery

**The principles it generates:** the problem-lock gate before any solution work, jobs-to-be-done
reconstructed from switching behaviour rather than from stated preference, discovery as a
continuous activity rather than a phase, the MVP defined by the question it answers, success
metrics written before the build, and the kill criterion attached to every bet.

**The mechanism:** demand is private information held by the people who have it, and it is revealed
by behaviour far more reliably than by statement. Since the behaviour you care about hasn't
happened yet, every product decision is a prediction — and the accuracy of a prediction is bounded
by the evidence behind it, not by the effort spent describing it. Writing a longer specification
raises the stake without improving the odds.

## Stated and revealed preference are different measurements

Asking people what they want is a legitimate instrument with a known, large error term:
hypothetical answers cost nothing to give, people are agreeable to whoever is asking, and everyone
models their own future behaviour badly. What has evidentiary weight is what someone already did,
at a cost:

| Evidence | What it demonstrates | Weight |
| --- | --- | --- |
| Paid, and renewed | Value exceeded price, repeatedly | Strongest available before you build |
| Paid once | Value exceeded price at the moment of purchase | Strong |
| Used repeatedly (unpaid) | A real job is being done | Strong on demand, silent on willingness to pay |
| Switched away from something else, at a cost | The old solution failed at a specific moment | Strong, and it names the job |
| Signed up / joined a waitlist | Interest at near-zero cost | Weak |
| Said they would use it | Nothing about behaviour | Weakest; treat as a hypothesis, not data |
| Agreed when asked a leading question | Politeness | No weight |

This is why the useful interview is archaeological rather than predictive: reconstruct what
happened — what they were doing the week they switched, what they tried first, what they paid, what
almost stopped them — instead of asking what they would do. The past is observed; the future is
being invented in the room by someone trying to be helpful.

## The base rate governs the arithmetic

Across published experimentation programmes at companies large enough to measure it, the majority
of shipped changes move the target metric by nothing. Whatever the exact fraction in your context,
the shape holds: **the prior on any given feature working is well under one half.**

Two consequences fall out of `${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/impact-and-prioritization.md`'s
expected-value form:

- **Cost-to-find-out dominates.** When p(works) is low and uncertain, the term you can actually
  control is what it costs to resolve it. A two-day probe that moves p from 0.3 to 0.7 is worth
  more than a month of specification that leaves p exactly where it was.
- **A bigger specification is a bigger bet at the same odds.** Detail added without evidence
  increases what you lose when the prior is wrong. That is the entire argument for locking the
  problem — and for the scope discipline that follows it.

## A document inherits the accuracy of its inputs

A PRD converts uncertainty into a shared plan; it does not reduce the uncertainty. Its precision
comes from formatting, its accuracy comes from the evidence, and the two are easy to confuse
because only one of them is visible on the page. A confident document written from three
hypothetical interviews contains exactly the information of three hypothetical interviews.

Hence the gate: evidence first, document second. And hence the honest form when evidence is
missing — an assumption written *as* an assumption, with what would test it, rather than laundered
into a requirement (`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/evidence-and-experimentation.md`).

## Why discovery is continuous rather than a phase

Demand moves: substitutes appear, expectations rise with whatever else your users touch, the job
changes shape when the surrounding workflow does. So a research finding is a **dated observation**,
not a permanent fact — the decay argument in
`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/foundations/knowledge-and-decay.md`
applies to user research exactly as it applies to documentation, and with a shorter half-life than
most teams assume.

The practical form: a small, continuous contact rate with users beats a large periodic study,
because it samples the moving thing repeatedly instead of characterising it precisely once, at a
moment that is already passing.

## The probe, and what it can and cannot buy

The instrument that raises p cheaply is the one that produces *behaviour* without building the
thing: a concierge run done by hand, a pre-sale, a landing page with a real price and a real
button, an offer made to ten specific people. Their value is the value-of-information result in
`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/foundations/uncertainty-and-information.md`
— they can change the decision, so they are worth paying for.

Their limits are as sharp as their value, and skipping them is how a probe becomes theatre:

- **A probe measures interest at the moment of the probe.** It says nothing about retention, which
  is where most product value actually lives.
- **An audience recruited for the probe is not the market.** People who answered your message are
  selected on responsiveness to you.
- **A fake door burns trust proportional to how convincing it was.** It's a one-time instrument in
  a given audience, and the trust it spends is charged to the growth engine
  (`${CLAUDE_PLUGIN_ROOT}/skills/growth/references/foundations/loops-and-saturation.md`).

## Scope is set by the question, not by the feature list

"Minimum viable" is not the smallest thing you can ship; it is **the smallest artifact that can
produce a signal capable of changing the decision.** That definition does real work: it rules out
the polished small version that answers nothing, and it rules out the elaborate version whose
signal would have arrived from a tenth of it.

When no such artifact exists — infrastructure, compliance, a platform migration — say so
explicitly and build deliberately against a stated requirement, rather than pretending an MVP
frame applies. Misapplying discovery machinery to work whose requirement is already known is the
maturity mismatch running in its expensive direction.

## When this mechanism is absent

Demand is not private information, or not the binding constraint, where:

- **The work is contracted or bespoke.** The specification *is* the requirement; demand was
  revealed when someone signed. Discovery here is scope clarification, not hypothesis testing.
- **The requirement comes from law or from a platform.** No amount of user evidence changes what a
  regulator or an app store demands.
- **There is one known user.** An internal tool for a team of four: ask them, watch them work, and
  skip the apparatus — they are the entire market and they are in the room.
- **The buyer isn't the user.** Then two different behaviours matter and they can diverge: purchase
  is revealed by the buyer, renewal is revealed by usage. Measuring only one is how a product gets
  sold repeatedly and abandoned quietly.
- **No reference class exists.** In a genuinely new category, base rates are unavailable — which
  argues for *more* cheap probes and shorter commitments, not for more confident specification.
