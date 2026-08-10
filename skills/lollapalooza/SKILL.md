---
description: Apply Charlie Munger's latticework of mental models to a decision or problem — route to the plugin's existing specialist agents as lenses where relevant, apply inversion/incentive-analysis/base-rate checks inline, and synthesize on convergence (multiple independent lenses agreeing is a stronger signal than any one alone) versus tension (a genuinely hard trade-off). Use for a decision or problem worth more than one perspective, not a trivial or already-obvious call.
---

# Lollapalooza

Charlie Munger's own name for what happens when several independent mental models converge on
the same outcome: not an additive effect but an extreme, non-linear one. He introduced the
underlying multi-model approach in "A Lesson on Elementary, Worldly Wisdom As It Relates To
Investment Management and Business" (USC Business School, 1994), and named the confluence effect
itself the **Lollapalooza Tendency** in "The Psychology of Human Misjudgment" (Harvard University,
1995, revised 2005) — "the Tendency to Get Extreme Consequences from Confluences of Psychological
Tendencies Acting in Favor of a Particular Outcome." This skill applies that same logic
constructively to a decision in front of you: run the decision through several independent
mental-model lenses, and treat their convergence (or their tension) as the real signal — not any
single lens's verdict taken alone.

## When to use

Use this for a decision or problem genuinely worth more than one perspective: an architecture
choice with real trade-offs, a go/no-go call, a strategy pick between competing approaches. Don't
use it for a trivial, already-obvious call — reaching for this full multi-lens process on a
decision that doesn't need it is its own version of Munger's "man with a hammer" mistake: treating
a heavyweight tool as universally applicable regardless of fit.

## Step 1 — cross-cutting techniques (apply inline, always)

Apply these three checks directly, regardless of which lens agents get dispatched in Step 2 —
they don't need a specialist, they need to actually be done:

- **Inversion.** "Invert, always invert" — Munger's own framing, attributed to the mathematician
  Carl Jacobi. State plainly what would guarantee this decision fails, then check that the
  proposal actively avoids that failure mode, not merely that it describes an appealing upside. A
  proposal that never names its own failure conditions hasn't actually been inverted yet.
- **Incentive analysis.** Munger's incentive-caused bias tendency: name who or what actually gets
  rewarded by each option under consideration, and check that the incentive structure actually
  points toward the stated goal — not merely that it points somewhere plausibly nearby. An
  incentive that's only adjacent to the goal will bend behavior toward itself, not toward the
  goal.
- **Base-rate / outside-view check.** Before evaluating this decision's specifics, name what
  generally happens with decisions of this shape — the reference class's typical outcome — and
  adjust from that starting point rather than reasoning from the specifics alone. State the base
  rate explicitly before arguing why this case is different; most "this time is different"
  reasoning is wrong.

## Step 2 — router, not shotgun

Not every decision needs all four lens agents. Read the decision, then use this table to decide
which lenses actually apply:

| Munger discipline | Lens | Dispatch |
| --- | --- | --- |
| Psychology (25 tendencies) | Cognitive bias / persuasion | `neuro-design-reviewer` |
| Microeconomics | Incentives / competitive dynamics | `growth-marketer` |
| Engineering/Physics | Margin of safety / redundancy / scale | `software-architect` |
| Evidentiary reasoning | Avoiding self-deception / JTBD evidence | `product-strategist` |
| Mathematics/probability | Compounding, expected value, base rates | `references/gap-disciplines.md` |
| Biology/evolution | Competitive advantage, niches | `references/gap-disciplines.md` |

Name which of the four lens agents — `neuro-design-reviewer`, `growth-marketer`,
`software-architect`, `product-strategist` — actually apply to the decision in front of you (not
all four by default), and which entries in `references/gap-disciplines.md` are relevant (read
that file directly; it has no dispatchable agent behind it, so it's applied inline rather than
dispatched). Dispatch the applicable specialist agents in parallel, report-only, synchronous
(`run_in_background: false` — this plugin's established peer-dispatch convention; see
`agents/product-strategist.md`'s Ideate step for the precedent). Give each dispatched agent the
decision/problem statement plus a one-line reminder of which lens it's being asked to apply, so it
reasons from its own discipline rather than free-associating.

Watch for one double-counting trap: that same Ideate step already peer-dispatches
`growth-marketer` and `neuro-design-reviewer` internally, so when `product-strategist` is among
the dispatched lenses, don't also dispatch those two standalone in the same run — or if both do
run alongside it, flag in Step 3 that they aren't fully independent of `product-strategist`'s own
analysis.

## Step 3 — synthesize

- **Convergence check.** Do two or more independent lenses point the same direction? Name which
  ones, and why their agreement is more than additive. This inverts the Lollapalooza Tendency's
  own mechanic constructively: Munger's examples of the tendency in action — cult conversion
  methods, the Milgram obedience experiments, Tupperware parties — combine several psychological
  forces pointed in the same direction to produce an extreme, non-linear result. Here, multiple
  independent mental-model lenses agreeing is treated as unusually strong confidence, not as a
  warning sign of groupthink — because the lenses are independent disciplines, not one force
  echoing itself.
- **Tension check.** Where lenses disagree, say so explicitly and name the actual trade-off,
  rather than quietly picking a side. A synthesis that resolves disagreement without stating it
  isn't synthesis — it's silently discarding a lens's finding.
- **Man-with-a-hammer check.** Name any lens or discipline from the Step 2 table that was
  available but not dispatched, and state briefly why it doesn't apply here. This guards against
  forcing a favorite tool onto a problem it doesn't fit, and against the opposite failure of
  quietly skipping a lens that actually was relevant.

## Report structure

Every run of this skill ends in a single report, in this order:

1. **Per-lens verdict** — one entry per lens actually used, each paired with its source: the
   dispatched agent's name, or the specific `references/gap-disciplines.md` entry cited.
2. **Convergence / tension synthesis** — the Step 3 findings: where lenses agreed and why that's
   more than additive, where they genuinely disagreed and what the trade-off is.
3. **Inversion / incentive / base-rate findings** — the Step 1 checks, done inline, reported as
   findings rather than skipped.
4. **Final recommendation** — with its stated confidence explicitly tied to how many independent
   lenses agree. Two or more converging lenses earns higher stated confidence than a single lens's
   verdict; a genuine tension between lenses earns an explicitly lower-confidence, trade-off-framed
   recommendation rather than a falsely decisive one.

## Rules

This skill is report-only. It never commits, never edits a file in the target project, and never
dispatches a doer agent to actually implement anything — not `software-architect`'s scaffolding
mode, not any other agent's write path. It produces a recommendation, not a change. Acting on that
recommendation — including dispatching a specialist in doer mode to build what was decided — is a
separate, explicit follow-up the user asks for next; this skill never triggers it itself.
