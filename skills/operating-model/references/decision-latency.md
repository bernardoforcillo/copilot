# Decision latency

Speed in this model is not about typing faster or working longer. It's about **how long a decision
sits undecided, and how big a batch you commit before finding out whether you were right.** Both
are operating variables you set deliberately, and both are usually set by accident.

The frame: every decision has a cost of being wrong and a cost of being late. Most teams optimize
only the first, which is why most decisions are slower than the cost of being wrong justifies.

## Two-way doors and one-way doors

- **Two-way door** — reversible at a cost you can absorb: a library choice inside one module, a
  UI arrangement, a copy change, an internal tool, most refactors. **Decide fast, alone, and
  move.** Deliberation here is pure cost: you'll learn more from shipping it than from thinking
  about it, and you can undo it.
- **One-way door** — expensive or impossible to reverse: a storage format, a public API contract,
  an identifier scheme, a data model other systems will copy, a price rise on the existing base, a
  key hire, a public commitment. **Slow down, write it up, seek the disagreement.** These are the
  few places where the deliberation pays for itself.

Most decisions treated as one-way doors aren't. The useful question is not "how important is
this?" but "what does it cost to undo?" — and importance and reversibility are independent. Note
that a two-way door with a *migration* attached (a schema you can change but only with a backfill)
is a door that's slowly closing: reversible now, one-way in six months, so the deliberation is
worth spending today and not later.

## Time-box the decision, not just the work

A decision left open is not free. It holds attention, blocks the work behind it, and quietly
degrades — the context that made it decidable goes stale.

- **Set the deadline when you notice the decision**, not when it becomes urgent: "we decide the
  storage format by Thursday, with whatever we know then."
- **Name what evidence would change your mind, and what it costs to get.** If the answer is "a
  two-day probe", run the probe. If it's "three months of usage", you're not going to have that
  evidence in time and you should decide without it, explicitly.
- **Default when the deadline hits.** A stated default ("if we haven't decided, we use Postgres")
  converts a stall into a decision, and it's almost always better than continued deliberation.
- **Log one-way-door decisions where they'll be found.** The `commit` skill's *why* and the
  memory-wiki page are the two cheap places; the reason survives longer than your memory of it.

## Batch size

The size of what you commit before finding out whether it worked determines almost everything else:
how fast you learn, how big the rollback is, how confusing the failure is, how long the review
takes.

- **Small batches make the feedback loop informative.** One change, one signal. A release with 14
  changes and a metric that moved gives you a mystery, not a finding.
- **Big batches hide their own risk.** Everything about a large change is estimated; everything
  about a small one is observed.
- **Work in progress is inventory that rots.** Every open branch, half-finished feature, and
  unreviewed diff is capital committed with no return yet, drifting from the codebase around it.
  Limit how many exist at once — finishing the third one is almost always worth more than starting
  a fourth (`ownership-and-execution.md`'s finisher rule, applied to your queue rather than to a
  single piece of work).
- **Prefer the coarsest thing that produces a real signal**, not the smallest possible change.
  Batch size is a tool for learning, not a virtue in itself; a change too small to move anything
  measurable teaches you nothing either.

## The cost of coordination

Coordination is the tax the model tries hardest to avoid, because it grows with people and doesn't
produce anything by itself. What actually reduces it:

- **One owner per outcome** (`ownership-and-execution.md`). Most meetings exist because ownership
  is split, and no meeting will fix that.
- **Written and asynchronous by default.** A written proposal is reviewable on someone else's
  schedule, survives, and forces the reasoning into a checkable shape. A meeting produces a
  decision only the attendees know about.
- **Meet for the one-way doors and the disagreements**, where the bandwidth is worth it — and end
  with the decision written down, or the meeting didn't happen.
- **Every recurring meeting is a complication** under `radical-simplicity.md`: it needs the named
  failure it prevents and a date to be re-examined. Standing meetings are the only complication
  most teams never audit.

## Measuring latency

Two numbers worth watching, both cheap to reconstruct from git and your issue tracker:

- **Time from decision-needed to decision-made** — where the stalls actually are. Usually much
  larger than time-to-implement, and nobody measures it.
- **Time from change written to change in front of users** — review, release cadence, gating. This
  is the loop's cycle time; it caps how fast anything else in the model can learn.

If either is dominated by waiting rather than doing, the fix is a process change, not more effort.

Four further numbers are worth reconstructing once a quarter, because together they say whether
speed is being bought at the cost of stability or alongside it. They're the standard delivery
measures from the multi-year DevOps research programme summarized in *Accelerate* (Forsgren,
Humble and Kim, 2018), and the result that matters is the one most people assume away:

| Number | What it is | What it tells you |
| --- | --- | --- |
| **Deployment frequency** | How often a change reaches users | Batch size, in practice rather than in intent |
| **Lead time for change** | Commit → running in production | Where the queue is: review, CI, or a release window |
| **Change failure rate** | Share of deploys that need a fix or a rollback | Whether the speed is real or borrowed |
| **Time to restore** | Failure → service restored | The property that makes small batches safe |

**Throughput and stability move together, not against each other.** Teams that deploy more often
also fail less and recover faster, because the same things cause both: small batches, an automated
pipeline, and a rehearsed rollback. The trade-off people assume between "moving fast" and "being
careful" is usually a symptom of an expensive release process — fix the process, and the trade-off
stops existing. That's the same conclusion `foundations/flow-and-queues.md` reaches from the
queueing side; the four numbers are how you check it against your own repo instead of taking it on
authority.

Two cautions before treating them as targets. They're a diagnosis, not a scoreboard: pushed on
directly they're trivially gamed (deploy frequency rises if you split one change into six commits;
change failure rate falls if you stop calling things failures), which is the Goodhart problem from
`foundations/uncertainty-and-information.md` in its most common industrial form. And at very small scale the denominators are
tiny — with four deploys a month, a change failure rate is a fraction with an uninformative
numerator, and the honest read is the trend over a quarter, not this month's number.

## Anti-patterns

- **Treating every decision as one-way.** The most common form of slowness, and it feels like
  rigor.
- **Deciding by exhaustion.** Whoever is still arguing at the end wins, which selects for
  stamina rather than for being right.
- **The permanent "let's discuss it next week."** A decision with no deadline and no default.
- **Batching to reduce overhead.** Bundling changes because releases are expensive: the release
  process is the defect, not the batch size.
- **Speed applied to the one-way door.** The mirror-image failure — moving fast through the one
  category of decision where slowing down actually pays.
