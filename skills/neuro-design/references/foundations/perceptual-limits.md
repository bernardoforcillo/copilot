# Foundation: perceptual and motor limits

**The principles it generates:** visual hierarchy as a requirement rather than a style, the
cognitive-load lens, minimum target sizes and edge-anchored controls, grouping instead of trimming
when choices must exist, response-time thresholds for feedback, contrast and type-size floors, and
the general claim that a design can be *wrong* rather than merely unfashionable.

**The mechanism:** the person using the interface is a channel with fixed capacity and known
constants — a small high-acuity window, a working memory of a few items, serial attention for
anything requiring a decision, pointing time logarithmic in distance over target size, and
perceptual thresholds in the hundreds of milliseconds. These constants do not improve with
motivation, training, or good taste. Every design is therefore constrained optimization against
them, and the six lenses in this desk are the constraints written as guidance.

## The constants, and what each one forbids

| Constant | Approximate value | What it rules out |
| --- | --- | --- |
| High-acuity foveal window | ~2° of visual angle — roughly a thumbnail at arm's length | Any layout assuming the user sees the whole screen at once; peripheral text is detected, not read |
| Perceptual span in reading | ~7–9 characters right of fixation | Long line lengths; text that must be scanned rather than read in saccades |
| Working memory | ~4 ± 1 chunks (Cowan, 2001, revising Miller's 7 ± 2) | Multi-step flows that require carrying values; comparisons that need two screens |
| Attention for decisions | Serial; one focus at a time | Two things that must both be noticed at the same instant |
| Change blindness | Unattended changes are routinely missed entirely | Silent state changes; "we showed a message" as evidence the user saw it |
| Perceived instantaneity | ~100 ms | Feedback delayed past it reads as "did my click register?" |
| Uninterrupted flow of thought | ~1 s | Transitions over a second without a progress signal |
| Sustained attention on a wait | ~10 s | Waits past it without something to look at or leave for |

These are population statistics, and they get *worse* in the tail: contrast sensitivity declines
with age, acuity varies, motor precision varies, and attention is already spent by whatever the
person was doing before your interface arrived. Designing against the median is designing for the
best case.

## Fitts's law: pointing time is logarithmic

**MT = a + b · log₂(2D / W)** — movement time depends on the *ratio* of distance to target width,
not on either alone (Fitts, 1954; Card, English and Burr, 1978, for the pointing-device version).

What it derives:

- **Screen edges and corners are effectively infinite in one dimension**, because the pointer stops
  there. A control at the edge is faster than a larger control near it.
- **Halving a target costs a fixed increment of time**, every time — small controls are not a
  neutral aesthetic choice, they are a permanent tax on every use.
- **Frequently paired actions belong near each other**, since D is what you control most cheaply.
- **Touch changes W, not the law.** The finger's contact area sets the effective minimum, which is
  why platform guidelines converge on similar minimum sizes from different directions.

## Hick–Hyman: choice time grows with the logarithm of the alternatives

**RT = a + b · log₂(n + 1)** for a flat set of equally-plausible options, where a is a fixed
overhead per decision and b the cost per bit.

**A correction worth keeping, because it is the kind of error this tier exists to catch.** The
usual next sentence — "so group 30 items into 5 groups of 6, because two small logarithms beat one
big one" — does not follow from this law. Two-stage choice pays the intercept *twice*: with
a = 200 ms and b = 150 ms/bit, one choice among 30 costs ≈ 943 ms, while choosing among 5 and then
among 6 costs ≈ 1,209 ms. Grouping is *slower* on Hick's terms alone. Run it:
`node scripts/mechanisms.mjs hickMs 30` against `hickMs 5` plus `hickMs 6`.

The mechanism that actually makes grouping win is a different one: **Hick's law prices a decision
among alternatives you already know; finding an item you have to look for is visual search, and
serial search is roughly linear in the number of items scanned.** Grouping cuts the scanned set —
30 items at ~40 ms each is ~1,200 ms, while scanning 5 group labels and then 6 items is ~440 ms.
Linear beats logarithmic here because linear is the term you are removing.

Two consequences follow, and they differ from the folk version:

- **Group to reduce search, not to reduce choice.** The grouping has to be *visible and
  predictable* — labels the user can rule out at a glance — or it adds a stage without removing a
  search.
- **"Reduce the number of options" misfires when applied literally.** Removing an option a user
  needs converts a sub-second decision into a support ticket; the log term was never the expensive
  part.

## The interface is a signal-detection problem

Every badge, alert, banner and notification is a signal with a false-alarm rate, and the person
receiving it adjusts their criterion accordingly (Green and Swets, 1966). Once a class of signal
has been wrong often enough, it is rationally ignored — and the adaptation generalises to the
channel, not just the specific signal.

This is exactly the argument that makes a flaky test negative-value in
`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/foundations/defects-and-detection.md`, and
it transfers without modification: **an attention-getting element that is often not worth attending
to consumes the attention available for the one that is.** A red dot on everything is a red dot on
nothing. The practical rule that follows is a budget: how many things per screen are allowed to
claim attention, decided in advance, spent deliberately.

## Why these constraints are different from the rest of design

Most design decisions are conventions: they are true because people have learned them, and they
change with fashion and platform. The constants above are not learned, do not respond to
persuasion, and are the same for your users as for everyone else's. That gives the desk its
epistemic position: **a layout that violates them is wrong in a way that can be demonstrated**,
while a layout that merely looks unfashionable is a preference — and the reviewer who conflates the
two spends their credibility on the second and has none left for the first.

The lens files in `../` carry the evidence and the specific numbers, and `../bibliography.md`
carries the full citation set for this desk; this file exists so that a finding can be argued from
the mechanism when someone disagrees, and withdrawn when the mechanism doesn't apply. The works
named above (Fitts 1954; Hick 1952 and Hyman 1953; Miller 1956; Cowan 2001; Card, Moran and Newell
1983 for the time constants; Green and Swets 1966) are cited by title and year from standard
literature and were not re-verified when this file was written — check any of them you intend to
lean on in an argument.

## When these mechanisms are absent or change shape

- **Expert users with overlearned patterns.** Hick's law largely collapses for someone who is
  recalling rather than searching — which is why dense professional tools, keyboard shortcuts, and
  option-rich interfaces are correct for populations that use them daily and wrong for first
  encounters. Fitts's law does *not* collapse; motor time is not eliminated by expertise.
- **A different channel.** Screen-reader users, voice interfaces, and haptic-only feedback have
  their own constants — serial by construction, with different memory demands. Applying visual
  hierarchy reasoning there produces confident nonsense.
- **No decision attached.** An ambient or glanceable display that nobody acts on is not subject to
  the attention budget in the same way; the failure mode there is being ignored, which may be
  acceptable.
- **A population you can actually measure.** For a tool used by four known people, direct
  observation beats population statistics — the constants are a prior, and a real measurement of
  your real users outranks it.
- **Time is genuinely not scarce.** Where the interaction is rare, deliberate, and unhurried (a
  yearly tax filing, an irreversible destructive action), *slowing the user down* can be the
  correct design — the same friction that is a defect in a frequent path is a safeguard in a
  one-way door.
