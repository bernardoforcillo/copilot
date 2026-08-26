# Code review

Review is the second reader a design gets before it becomes permanent, and — measured honestly —
it is usually the largest single term in the time between "written" and "in front of users". Both
halves matter: a review that catches nothing is a tax, and a review that takes three days is a tax
on everything queued behind it. This file is about getting a real signal out of it at a latency
that doesn't dominate the loop.

## Origin

**Source:** Google, *eng-practices* — "The Standard of Code Review", "Speed of Code Reviews", "How
to Write Code Review Comments", and the CL author's guide (google.github.io/eng-practices).
**Source:** Titus Winters, Tom Manshreck and Hyrum Wright (eds.), *Software Engineering at Google*
(O'Reilly, 2020), ch. "Code Review".
**Source:** Caitlin Sadowski, Emma Söderberg, Luke Church, Michal Sipko and Alberto Bacchelli,
"Modern Code Review: A Case Study at Google" (ICSE-SEIP, 2018) — the measured picture: most changes
are small, most have a single reviewer, and turnaround is measured in hours rather than days.
**Source:** Peter C. Rigby and Christian Bird, "Convergent Contemporary Software Peer Review
Practices" (FSE, 2013) — independently developed review processes converge on small changes,
few reviewers, and low latency.

The figures below are as published by those sources and are not re-verified here; they're quoted
as orders of magnitude to argue from, not as targets to hit.

**Why these rules hold**, rather than who practises them, is derived in the operating-model desk's
foundations tier:
`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/foundations/defects-and-detection.md` —
defect cost monotone in survival time, filters composing as ∏(1−pᵢ) only where they fail
independently, fixed reviewer attention per change (so size is the control variable), and the
information asymmetry between an author who holds the intent and a reviewer who holds the artifact,
which is what decides the restricted blocking list below. When a review rule is contested, argue
from there; if the mechanism isn't present, drop the rule rather than defending it by citation.

## The standard: code health, not perfection

**Approve the change once it definitely improves the overall code health of the system, even if it
isn't perfect.** That is the whole rule, and every failure mode of review is a departure from it in
one of two directions:

- **Too strict** — withholding approval until the change matches what the reviewer would have
  written. Review never converges, latency explodes, and authors start batching work to amortize
  the pain, which makes the next review worse.
- **Too loose** — approving because the author is trusted, the diff is long, or the sprint is
  ending. A rubber stamp is worse than no review: it spends the time and buys none of the signal.

Two corollaries worth stating because they're where the rule is usually misread:

- "No worse than what's there" is not the bar. The bar is *better*; a change that adds a second
  way of doing something already done in the codebase degrades health even when the diff is clean.
- **Principle over preference.** A comment is grounded in a technical fact, a measured number, or
  a written convention of this project — or it's a preference, and it gets marked as one and
  doesn't block. Where the two of you genuinely disagree on a principle, the resolution is the
  written convention or the data, never seniority and never fatigue.

## The three questions a review resolves

Google splits approval into three separable signals — correctness and design, ownership of the
directory being changed, and language readability. On a small team the three collapse into one
person, but the questions don't collapse, and naming which one you're withholding on is what makes
a review actionable:

| Question | What it's really asking | Who answers it at small scale |
| --- | --- | --- |
| **Is it correct?** | Does it do what the description says, including on the failure paths? | Whoever reviews |
| **Is this the right place for it?** | Layer, boundary, ownership — `code-organization.md`'s dependency rule | Whoever owns that part of the system |
| **Does it read like the rest of the codebase?** | Idiom, naming, structure a future reader (or agent) will copy | Whoever knows the language and the project's conventions |

"Looks fine" answers none of them. "Correct, but this belongs in the domain layer, not the handler"
answers all three and tells the author exactly what to do.

## Size is the variable that decides everything else

Defect detection falls off with diff size, and it falls off faster than attention does — which is
why a 900-line change gets an LGTM in four minutes and a 90-line change gets six comments. The
practical rules:

- **One self-contained change per review**, doing one thing, with its tests, mergeable on its own.
- **Split refactor from behavior.** A diff that moves code *and* changes what it does is
  unreviewable: the reviewer can't tell which lines are the change. Refactor first, land it, then
  change behavior on top.
- **A few hundred lines is the order of magnitude**, not a rule to game. Generated files, lockfiles
  and pure moves don't count against it; a 40-line change to an authorization check is a big review.
- **If it can't be split, say why in the description**, and expect the review to take proportionally
  longer — a migration that must land atomically is a legitimate exception, "I forgot to split it"
  isn't.

This is the batch-size argument from `operating-model`'s
`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/decision-latency.md`, applied to the one
queue that every change passes through.

## Latency is the term that dominates

- **Respond within one business day.** Respond, not necessarily finish: "I can look properly
  tomorrow, but the migration path is the part I'll be asking about" unblocks the author's
  thinking at a cost of thirty seconds.
- **Round-trips multiply.** Three rounds at a day each is a week of calendar time on a change that
  took two hours to write, and by round three the author has swapped context out and pays to load
  it again. Ask everything you have in the first pass.
- **Batch reviews at your own natural boundaries** — between tasks, not mid-task — but never let
  "I'll do reviews at the end of the day" become the reason someone is blocked overnight.
- **Approve with comments when the remaining points are nits.** "LGTM, fix the naming before you
  merge" ends the round-trip and trusts the author to do the trivial part; withholding approval for
  a nit is how a one-day review becomes a three-day one.

## What review owns, and what CI owns

Everything mechanical belongs to the pipeline: format, lint, type check, build, dependency audit,
the fast test suite (`../../../docs/engineering/testing-strategy.md`). **A human comment about
formatting is a defect in the pipeline, not a thorough review.**

What's left is what a human is actually for:

- **Shape** — does this belong in this layer, does it respect the dependency direction, does it
  introduce a second pattern where one already exists (`code-organization.md`).
- **Complications that haven't been earned** — the new abstraction with one call site, the cache
  with no measured trigger, the queue for a load nobody has seen
  (`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/radical-simplicity.md` and
  `scaling-and-infra.md`).
- **The failure paths** — timeouts, partial writes, retries, idempotency. The happy path is what
  the author already exercised.
- **Tests that assert behavior**, and that a bug being fixed has a test that fails on the old code.
- **Data and security decisions** — what gets logged, what crosses a boundary, what a new field
  makes possible.
- **The description** — whether the *why* is written down somewhere it will survive
  (`${CLAUDE_PLUGIN_ROOT}/skills/commit/SKILL.md`).

## Writing the comments

- **Address the code, not the author.** "This handler now owns a business rule" rather than "you
  put a business rule in the handler". It reads as less of a fight for exactly the same content.
- **Say why, and give the direction rather than the keystrokes.** The author knows the code better
  than you do; a comment that names the problem and the constraint gets a better fix than one that
  dictates the patch.
- **Label severity explicitly.** `Blocking:` / `Suggestion:` / `Nit:` / `Question:`. An unlabeled
  comment is read as blocking, which is how three nits hold up a change for a day.
- **Ask a question when you're guessing.** Half of review comments are the reviewer not having the
  context, and a question costs nothing while a confident wrong instruction costs a round-trip.
- **Comment count is not a quality metric.** A review that finds one real boundary violation beat
  the one that found eleven naming preferences.

## The author's side

- **Write the description for someone who wasn't there**: what changes, and why this way. It
  becomes the commit body and is the only part of the change that's still readable in a year.
- **Review your own diff first**, as a reviewer would, before requesting one. It is the cheapest
  round-trip you will ever save.
- **Answer every comment** — apply it, or reply with the reason. Silently rewriting the code
  around a comment leaves the reviewer re-deriving what you decided.
- **Don't bundle.** The unrelated cleanup you noticed goes in its own change; bundled cleanups are
  how a reviewable diff becomes an unreviewable one.

## Reviewing agent-produced changes

The standard doesn't change, but the priors do. Agent-written diffs are long, internally
consistent, confidently wrong in specific ways, and they reproduce whatever pattern is already in
the codebase — including the ones you were trying to get rid of. What to look for first:

- **Invented surface**: an API, flag, or field that doesn't exist, used plausibly.
- **A duplicated helper** rather than the one already in the shared layer — the most common way an
  agent degrades code health while the diff looks clean.
- **Complexity with no trigger**: retries, caches, abstraction layers, configuration knobs added
  "for robustness" against nothing that has happened.
- **Tests that assert the implementation** — mocks verifying the exact call sequence the same agent
  just wrote, which pass forever and catch nothing.
- **Scope creep**: three unrelated improvements folded into the change, each individually
  defensible, collectively unreviewable. Ask for it split, the same as you would from a person.

And the rule that makes the rest of it work: **the human who approves it owns it.** An LGTM on an
agent's diff makes the change yours in every sense this plugin's
`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/ownership-and-execution.md` means — you
carry it when it breaks, and "the agent wrote it" is not a cause in a postmortem.

## When review isn't the instrument

- **Working alone.** Self-review with a checklist, plus delay (read it the next morning), catches
  a surprising amount — but it will not catch a wrong shape. That's what a design note before the
  code is for: `../../../docs/engineering/system-design-template.md`, and
  `../../../docs/engineering/adr-template.md` for a one-way door.
- **A decision, not a diff.** If the disagreement is about the approach, stop reviewing lines and
  go back to the design; a review thread is the most expensive place to have an architecture
  argument.
- **A prototype you intend to throw away.** Review it for data loss and secrets, and skip the rest
  — rigor proportional to maturity applies here as everywhere.

## Checklist

- [ ] The change does one thing and carries its tests
- [ ] Refactor and behavior change are in separate diffs
- [ ] Mechanical checks are green in CI before a human reads it
- [ ] Layer and dependency direction respected; no second pattern introduced
- [ ] Every new complication has a trigger you can name
- [ ] Failure paths reviewed, not just the happy path
- [ ] Every comment labeled blocking / suggestion / nit / question
- [ ] First response inside one business day
- [ ] Approved once it improves code health — not once it's perfect
