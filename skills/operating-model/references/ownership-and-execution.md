# Ownership and execution

**The mechanism under this file.** End-to-end ownership is derived in
`foundations/incentives-and-trust.md`: agency costs appear wherever the decider doesn't bear the
consequence, and every handoff creates one. The finisher rule and the WIP argument come from
`foundations/flow-and-queues.md` (cycle time = WIP ÷ throughput). It voids where decider and
consequence-bearer must be kept apart by design — audit, regulated separation of duties — in which
case the handoff is the control, not the failure.

Ownership is the trait the rest of this operating model depends on. Every other principle —
simplicity, impact ranking, evidence, transformation — describes a judgment call, and a judgment
call only has force if someone is on the hook for the outcome rather than for their slice of the
work.

## End to end, or it isn't ownership

Whoever owns a problem owns it from the data model through the deploy to the interface to the
number it was supposed to move. Not "owns the backend part". The boundary of the work is the
outcome, not the layer.

Concretely, on any piece of work you own:

- You design the data model and the contract, not just consume someone else's.
- You write the code, and you review the shape it's giving the system, not only its correctness.
- You ship it — the pipeline, the flag, the rollout, the rollback path are yours too.
- You instrument it, and you go back and read the number afterwards. Work whose result nobody ever
  read isn't finished; it's abandoned at the last step.
- You carry it when it breaks, and the fix for the incident includes the regression test — see
  `reliability-and-incidents.md` for what else that incident owes you.

The handoff at a layer boundary — "backend's done, waiting on frontend", "shipped, waiting on
analytics" — is the failure mode this rule exists to remove. Every handoff is a place where the
outcome becomes nobody's, and where the person with the most context stops being the person
making the decision.

## Breadth with one or two depths

The shape to aim for is a generalist who can move across the whole stack — infrastructure,
database performance, backend, client, interface — with genuine depth in one or two areas. Not a
specialist who needs three other specialists to ship anything, and not a generalist with no floor
anywhere.

The practical test: for any layer of a system you own, you should be able to make a correct change
without asking someone else to make it for you, and you should know which one or two layers you're
the right person to be *trusted* on. The breadth is what makes end-to-end ownership possible at
all; the depth is what stops "end to end" from meaning "shallow everywhere".

Deliberately, this means accepting that you'll be slower than a specialist in most areas most of
the time — and that this is cheaper than the coordination cost of routing every change through the
person who's fastest at it.

## The finisher rule

Two behaviors that look contradictory and aren't:

- **Be quick to abandon.** Work that stops looking promising gets dropped early and without
  ceremony — no sunk-cost continuation, no shipping something you no longer believe in because it's
  nearly done. Killing work is a normal, expected, frequent outcome, not an admission of anything.
- **Never leave a high-priority thing half-done.** Once something is genuinely worth doing, it
  gets finished — not left at 90%, not left working-but-uninstrumented, not left behind a flag
  nobody turns on. "Almost done" for weeks is the most expensive state work can be in: it holds
  attention, blocks the branch, and delivers nothing.

The distinction is a decision, made explicitly: this is worth finishing, or this is dead. What's
not allowed is the third state, where nobody decides and the work quietly persists.

## Working without titles

Decision rights come from owning the outcome and from having the relevant context — not from a
level. Two consequences worth stating plainly, because they're where flat structures usually fail:

- **Speak up, especially when it's uncomfortable.** A disagreement you had and didn't voice is
  worth nothing; a disagreement you voice, lose, and then execute on wholeheartedly is worth a lot.
  If a decision looks wrong, say so once, clearly, with your reasoning — then commit either way.
- **Nobody is coming to tell you what to do.** The default is entrepreneurial: find the thing worth
  doing, check it against the impact ranking, and start. Waiting for assignment is itself a
  decision, and usually a bad one.

Small teams with a high standard beat large teams with a mixed one, for a specific mechanical
reason: coordination cost grows with headcount while output per person doesn't. That's the case
for density; `talent-and-standards.md` covers how the standard is actually measured, and what it
costs when it's applied badly.

## Write it down

End-to-end ownership only scales if what you decided outlives your memory of deciding it. Two
places, and no third:

- **The decision, where the code lives** — an architecture note, a memory-wiki page, a commit body
  that explains *why*. This plugin's `capture-learnings` skill and `commit` skill both exist to
  make this cheap; use them rather than inventing a third place.
- **The number, next to the work it justified** — the measurement that made a complication earned
  (see `radical-simplicity.md`), dated, so the next person can check whether it's still true.

An undocumented decision gets re-litigated by whoever inherits it, usually at the worst moment,
and usually by rebuilding rather than by reading.

## Anti-patterns

- **Ownership as assignment.** A name in a ticket field is not ownership. Ownership is who reads
  the metric afterwards.
- **The permanent 90%.** Work that's always nearly done. Force the decision: finish it or kill it.
- **Silent disagreement.** Reservations expressed after the outcome is known are the least useful
  form of correctness available.
- **Depth-only staffing.** Structuring work so that every change needs three people is how a small
  team acquires the coordination costs of a large one without the capacity.
