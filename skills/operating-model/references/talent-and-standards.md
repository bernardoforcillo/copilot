# Talent and standards

Evaluation of people and of work is treated as measurement, not impression. The claim behind it:
unstructured judgment — an interview that goes wherever the conversation goes, a review that
reports how the code felt — has poor predictive validity and excellent confidence, which is the
worst combination available.

This file covers hiring, contractors, collaborators, and reviewing work produced by an agent. The
mechanics are the same in all four cases: define the target before you look, evaluate against it,
and keep the bar independent of how much you need the answer to be yes.

## Define the target before you search

Before evaluating anyone — or anything — write down what "good" would look like for this specific
role, task, or deliverable. The qualities that actually matter, in order, with the observable
behavior that would demonstrate each. Not "strong engineer": *"can take an ambiguous problem to a
shipped, instrumented change without a spec — evidenced by having done it, described end to end,
with the decisions and their reasons."*

Written first, this is a rubric. Written afterwards, it's a rationalization of a decision already
made. That's the entire difference, and it's why the order is non-negotiable.

## Evaluate with structured, comparable signals

- **Same tasks, same order, same criteria for every candidate.** Comparability is what makes an
  evaluation informative; a bespoke conversation with each person produces a ranking of rapport.
- **Prefer work samples over self-report.** A problem solved in front of you, or a body of work
  you can inspect, beats a description of past work. What people are asked to do should resemble
  what they'd actually do.
- **Score each dimension separately, before forming an overall view.** Combining as you go lets
  one strong impression drag every other score up with it.
- **Test for reasoning and learning speed, not for accumulated familiarity** — especially where
  breadth and end-to-end ownership are expected (`ownership-and-execution.md`). What someone can
  figure out predicts more than what they already know, in a role whose stack will change.

## Density over headcount

A small group of people who are each genuinely excellent outperforms a larger mixed group, because
coordination cost grows with headcount while output per person doesn't. This is the case for
holding the bar even when you're under-staffed and a warm body would relieve real pressure: the
hire below the bar doesn't add a fraction of a person, it adds coordination, review load, and a
new floor for what's acceptable.

The honest cost, because it's substantial: an extreme bar means rejecting almost everyone,
including many people who would have done fine. Selection at that ratio is dominated by
false negatives, and treating the process as though it identifies *the* good people — rather than
a small, over-filtered subset of them — is a misreading of what a filter does.

## Feedback frequency and its failure mode

Feedback is most useful close to the work — specific, soon after, about a thing that happened —
rather than accumulated for a periodic review, which is too late to change anything and too coarse
to act on. The standard is held continuously rather than revisited annually.

Its documented failure mode, worth stating: frequent evaluation without a stable rubric collapses
into cultural fit and the evaluator's preferences, and a permanently open assessment produces
churn and insecurity that costs more than the calibration is worth. The rubric written in advance
is the guard against the first; a bar that's a threshold, not a ranking against hypothetical
replacements, is the guard against the second.

## Reviewing agent-produced work

The same rubric mechanics apply to output from an AI agent, and the failure modes are sharper
because the volume is higher and the surface is more confident:

- **State acceptance criteria before dispatching**, in the prompt — the same "define the target
  first" rule. Anything you didn't ask for explicitly, you're accepting implicitly.
- **Check the claim, not the confidence.** Run the test, read the diff, verify the number. A
  fluent report of success is not evidence of success.
- **Apply the same complication test** from `radical-simplicity.md`. Generated code trends toward
  the elaborate solution — abstraction layers, options, defensive scaffolding — because that shape
  is well-represented in what it learned from. Most of it hasn't earned its place.
- **Ownership doesn't transfer.** Whoever dispatched the agent owns the result end to end,
  including the parts they didn't read.

## Anti-patterns

- **The rubric written afterwards.** A justification wearing a rubric's clothes.
- **Bar lowered under deadline.** The pressure that makes the exception feel reasonable is the
  pressure the bar exists for.
- **Culture fit as a scoring dimension.** Unless it's defined as specific observable behavior, it
  scores similarity to the evaluator.
- **Evaluating against hypothetical replacements.** A standard nobody can ever clear stably is a
  churn engine, not a bar.
- **Confidence as a signal.** From a candidate or from an agent, it's a property of the
  presentation, not of the work.
