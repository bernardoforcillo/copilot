# Foundation: what makes an argument load-bearing

**The principles it generates:** the derivation table in this skill, the instruction in every agent
to argue the mechanism rather than the rule and to *withdraw* a verdict when the mechanism is
absent, the requirement that each file in this tier state its own voiding condition, the preference
for a measured number over a cited practice, and the maintenance rule that a file kept for a use
that hasn't happened yet must say so out loud.

**The mechanism:** a claim is exactly as strong as the condition that would make it false. An
argument from authority has no such condition — nothing about it could come out otherwise, so it
cannot be checked and cannot be corrected. An argument from a mechanism carries its own failure
conditions with it, which is what lets it be used in a context nobody wrote it for, and what lets
it be *retired* when that context turns out to be different.

This file is the tier's own standard, applied to the tier.

## The ladder of grounds

Every claim in this plugin sits on one of these rungs. The obligation is not to be on the top one —
often you can't be — it's to **say which rung you're on**, because the reader's next move depends
on it.

| Rung | Form | What would falsify it | Typical failure |
| --- | --- | --- | --- |
| Measured here, now | "Our p95 is 1.8 s; the cache took it to 240 ms" | A re-measurement | Measuring the wrong thing precisely |
| Measured elsewhere, comparable setting | "Teams with this pipeline shape recover faster" | Your own measurement disagreeing | The setting isn't comparable, and nobody checked |
| Derived from a model whose assumptions hold here | "Availability multiplies, so this chain caps at 99.74%" | Showing an assumption doesn't hold | Over-transfer (below) |
| Published practice at a named organization | "A large search company caps toil at 50%" | Nothing — practice isn't a prediction | Cargo-culting the artifact without the condition that produced it |
| Analogy | "It's like a factory queue" | Nothing, until made into a model | Analogy doing the work of evidence |
| Authority, seniority, aesthetics | "This is the standard way" | Nothing | The argument nobody can lose, therefore nobody can win |

Two cautions, because the ladder is not a simple ordering:

- **A derivation is not automatically better than a measurement.** A model with a wrong assumption
  is confidently precise, which is worse than a crude number that's right. When a derivation and a
  measurement disagree, the measurement wins and the model is the thing under investigation.
- **The bottom two rungs are not forbidden, they're unfinished.** "It's like a queue" is a fine
  place to start and a terrible place to stop: turn it into a model with quantities, or label it as
  intuition.

## What a derivation has to contain

Four parts. Missing any one of them, it is rhetoric with a diagram:

1. **The mechanism**, stated as a relation between quantities — not as a virtue. "Availability
   multiplies along a serial chain" is a mechanism; "we take reliability seriously" is not.
2. **The assumptions it needs.** Independence, stationarity, repetition, a next cycle, a reference
   class, a denominator large enough to speak. These are the parts that go missing when a rule
   travels between contexts.
3. **A prediction that could come out otherwise.** If every outcome is consistent with the claim,
   the claim carries no information (`uncertainty-and-information.md`: information that can't change
   a decision is worth zero — this is the same result applied to arguments instead of measurements).
4. **The voiding condition** — the observation that would retire the rule. Every file in this tier
   ends with one, and that section is not a disclaimer; it is the part that makes the rest usable.

This is Toulmin's structure — claim, grounds, warrant, rebuttal (*The Uses of Argument*, 1958) —
with the rebuttal promoted from an afterthought to a required field.

## "Hard to vary" is the working test

David Deutsch's criterion (*The Beginning of Infinity*, 2011): a good explanation is one whose
parts cannot be swapped out without ruining the prediction. It's the sharpest available test for
whether you have a mechanism or a slogan.

- *Easy to vary:* "small batches are better because they're more agile." Replace "agile" with
  "modern", "lean", or "professional" and the sentence survives intact — which means it predicted
  nothing.
- *Hard to vary:* "a release of n changes contains a defect with probability 1 − (1 − p)ⁿ, and its
  diagnosis searches n candidates, so batch size raises both terms of expected loss." Change any
  part and the prediction changes with it. It can be wrong — which is what makes it worth
  something.

Applied to this plugin: any rule you can restate with the nouns swapped, and which still sounds
right, has not been derived yet.

## Three ways a mechanism argument goes wrong

**Mechanism theatre.** Arithmetic wrapped around a conclusion that was already fixed. The tells are
specific: the numbers are always illustrative and never measured; the model was chosen after the
conclusion; and no value of any input would change the recommendation. The correction is to state,
before computing, which result would change your mind — and then to look at whether the real inputs
are anywhere near it.

**Over-transfer.** The model is real, the assumption isn't present here. This is the most common
failure in this plugin's own material, and the reason each file lists its assumptions:

| Model | Assumption that quietly fails | What it looks like when it fails |
| --- | --- | --- |
| Redundancy multiplies reliability | Failures are independent | Five replicas, one bad deploy, total outage |
| Queueing / Little's Law | A repeating flow near steady state | A one-off project "optimised" for WIP |
| Expected value | The bet repeats, and ruin is off the table | A single irreversible bet sized by its average outcome |
| Base rates | Your case is in the reference class | A genuinely new category priced with old odds |
| A/B arithmetic | The sample can resolve the effect | An underpowered test read as a result |
| Compounding | There is a next cycle | Investment in a platform for a product being sunset |

**Choosing the mechanism that gives you what you wanted.** Several mechanisms usually apply at
once, and they don't always agree — simplicity says delete the second path, reliability says keep
the fallback. Picking the one that supports your preference and calling it a derivation is the
sophisticated version of having no argument. The correction is procedural: enumerate the mechanisms
that apply, name the one that argues *against* you, and say why it loses here. (`lollapalooza`'s
multiple independent lenses are this same correction, run as a process rather than as a habit.)

The honest version of that case — both mechanisms genuinely present, genuinely disagreeing — is not
a failure at all, and it has its own procedure: `conflicting-mechanisms.md`. Put both in the same
units, compare magnitudes before directions, look for the crossover rather than the winner, and
when it is genuinely tied, say the decision is under-determined by mechanism instead of
manufacturing a derivation for the answer you were going to pick anyway.

## The burden sits with whoever imports the rule

A practice imported from another context carries that context's assumptions with it, invisibly. So
the person proposing "we should do X because they do X" owes the check — what mechanism makes X
work there, and is it operating here — and the person doubting it owes nothing beyond asking. This
is not politeness; it's where the information is. The importer knows what X is, and only the local
context can say whether the mechanism is present, so the question has to be asked in that
direction.

The practical form in this plugin: when a desk states a rule, it names the mechanism. When an agent
issues a verdict and someone pushes back, the agent goes to the mechanism — and if the mechanism
isn't there, it withdraws rather than defending by precedent.

## How to lose an argument well

- **Withdraw the verdict, not the analysis.** Say which assumption turned out to be absent. That
  sentence is worth more to the other person than the original finding was.
- **Keep the parts that don't depend on the absent mechanism.** Error budgets void under external
  safety requirements; detection time and rehearsed rollback do not. Abandoning the whole position
  is as sloppy as defending all of it.
- **Say what changed your mind**, so the next argument can start from there rather than repeating
  this one (`knowledge-and-decay.md`: an undocumented reversal gets re-litigated exactly like an
  undocumented decision).
- **An argument you cannot lose is one you were not having.** If no observation the other party
  could produce would move you, say so honestly — you're expressing a preference, and preferences
  are legitimate as long as they're labelled.

## Make the quantitative half runnable

Prose arithmetic cannot be checked and drifts silently the moment an example is edited. Every
quantitative mechanism in this tier is therefore also a function in
`../../../../scripts/mechanisms.mjs`, with a self-test that pins the figures appearing in the
reference files and worked examples: `node scripts/mechanisms.mjs --test`. Argue from the mechanism,
then *run* the mechanism against your own numbers rather than against the example's.

This is not decoration, and the honest evidence for that is the first thing it caught. The Hick's
law section of the design desk's `perceptual-limits.md` claimed — as almost every summary of that
law does — that splitting 30 options into 5 groups of 6 is faster because two small logarithms beat
one large one. Executed, the model says the opposite: two-stage choice pays the fixed intercept
twice and comes out slower. The real mechanism behind grouping turned out to be a different one
(serial visual search is linear in the items scanned, and grouping cuts the scanned set), and the
file now says so. A claim that had been repeated for years survived until the arithmetic was run
once.

## When this mechanism is absent

Arguing from first principles is itself a complication, and it doesn't earn its place everywhere:

- **The decision is reversible and small.** Deliberating a two-way door costs more than undoing it
  (`irreversibility-and-optionality.md`). Act, observe, adjust — the experiment is the argument.
- **The disagreement is about values, not facts.** Whether the product should feel playful or
  austere, whether to serve this customer segment at all: no mechanism adjudicates these, and
  dressing a preference in arithmetic to win them is mechanism theatre with better manners.
- **The other party can't check the mechanism and the stakes don't justify teaching it.** Then the
  honest resolution is ownership, not argument: whoever carries the consequence decides
  (`../ownership-and-execution.md`), and the reasoning gets written down for whoever inherits it.
- **Speed dominates correctness.** During an incident, the mechanism argument waits; restore first,
  and hold the postmortem afterwards, where the analysis is worth its cost
  (`../reliability-and-incidents.md`).
