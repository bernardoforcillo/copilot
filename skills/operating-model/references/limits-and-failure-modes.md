# Limits and failure modes

**The mechanism under this file.** This is the foundations tier read from the other end: each
context below is one where several mechanisms are simultaneously absent, and the "When this
mechanism is absent" section of each file in `foundations/` is the per-mechanism version of the
same content. When a context here is disputed, argue it with
`foundations/how-to-argue.md`'s test — name the mechanism, name the assumption, check whether it
holds here — and where two mechanisms both apply and disagree, use
`foundations/conflicting-mechanisms.md` rather than picking the one you prefer.

Every operating model is tuned for a context, and this one is tuned for a specific and narrow one:
**consumer or prosumer software, iterated continuously, where mistakes are cheap and reversible,
demand is measurable, and the operator is small and fast.** Inside that context it's very strong.
Outside it, several of its principles are actively wrong, and applying them anyway is the most
predictable way to do damage with this file set.

Say which context you're in before applying the model. If it's one of the ones below, use the
adaptation rather than the default.

## Where the model doesn't transfer

**Safety-critical and regulated work** — medical devices, avionics, payments infrastructure,
anything where a defect injures someone or breaks a law. The maturity gate is void here: rigor is
set by the consequence of failure, not by the product's stage, and "ship it and read the metric" is
not an available strategy when the metric is harm. Radical simplicity still applies to *design*;
the evidence-scaled process does not apply to *verification*.

**Research and genuinely novel engineering** — where the outcome distribution is unknown and most
attempts fail. Expected-value ranking degenerates when you can't estimate either the effect or the
probability, and enforcing kill criteria on a fixed schedule kills the long-tail results that are
the entire point. Adaptation: budget the exploration as a portfolio ("this share of capacity is
uncertain"), and rank *inside* it by information gained rather than by expected value.

**Community and open-source projects** — where contributors are volunteers and the currency is
trust, not throughput. Talent density, aggressive filtering, and impact-only prioritization
translate into a project nobody can contribute to. Adaptation: the simplicity and evidence
principles carry; the talent and prioritization ones don't.

**Client and agency work** — where the requirement is contractual and the buyer isn't the user.
"The backlog is a graveyard" is not available when the backlog is the statement of work.
Adaptation: apply the model to *how* you build, not to *what* — the choice was already sold.

**Long-horizon infrastructure and deep tech** — where the payoff is years out and there's no early
metric that means anything. Short feedback loops measure the wrong thing here, and a fast-pace bias
selects for whatever produces a visible number soonest.

**Anything with high-consequence irreversible steps** — migrations that can't be undone, data
deletions, public commitments. The two-way-door bias is correct only where doors are actually
two-way (`decision-latency.md`).

## Where the model damages itself

Failure modes internal to the model, in rough order of how often they occur:

- **Simplicity misread as ignorance of the domain.** Some problems are irreducibly hard —
  distributed consensus, tax, timezones, i18n, cryptography, accessibility. The simple version
  isn't simpler, it's just wrong in ways you'll discover later. The proof requirement cuts both
  ways: the *simple* option also has to be shown to satisfy the requirement, and in these domains
  it usually doesn't.
- **Measurement applied where effects aren't measurable.** Below real traffic, most changes cannot
  be resolved by experiment. Running the ritual anyway produces confident noise, which is worse
  than an admitted judgment call.
- **Optimizing the measurable at the expense of the unmeasured.** Conversion is easy to see; trust,
  craft, accessibility, and the second-order effect on word of mouth are not, so they lose every
  ranking they enter. This is how a product gets locally optimal and globally worse, one defensible
  decision at a time.
- **Impact-only prioritization starving maintenance.** Dependency updates, deletions, and
  documentation rarely win an EV comparison on any single round, and always win the aggregate one.
  Reserve capacity for them instead of ranking them, or they never happen.
- **Extraction mistaken for the model.** The playbook's returns are partly produced by cutting
  hard and charging more (`asset-transformation.md`, `pricing-and-value-capture.md`). It's possible
  to keep the discipline and refuse the extraction — and it's possible to do the reverse, which is
  the version that eventually runs out of asset.
- **The talent bar as an identity.** An extreme filter is dominated by false negatives, and a
  standard held continuously without a stable rubric becomes a churn engine
  (`talent-and-standards.md`). "High bar" is a claim about the rubric, not about how many people
  you rejected.
- **Speed as the terminal value.** The pace is supposed to serve the horizon. A team that's fast at
  producing things nobody chose deliberately has kept the visible half of the model and dropped the
  half that made it work.
- **Ownership as overload.** End-to-end ownership without the authority or the time to exercise it
  is just responsibility for outcomes you can't control, which is the mechanism most likely to burn
  out the person carrying it.

## The honest reading

This model optimizes for a specific objective: efficient, compounding operation of software
businesses with a small number of people. It's genuinely good at that. It is not a theory of good
engineering in general, it is not neutral about what kind of product gets built, and several of the
things it's best at — cutting cost bases, raising prices on captive users, filtering people
aggressively — are things you can decide not to do while keeping everything else. That decision
isn't included in the model. Make it yourself, write it down, and check your own work against it,
because nothing in the six principles will raise the question for you.
