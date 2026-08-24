# Behavioral views

What the system *does*: who wants what from it, what happens in what order, what states things move
through, and which steps are still done by a human. These views carry most of the requirements and
almost all of the cost.

## Use case view

Actors, the system boundary, and the goals actors have. Deceptively simple and routinely skipped,
which is why systems get built with an unexamined boundary.

What it's actually for:

- **Fixing the boundary.** Everything inside is yours to change; every actor outside is a
  constraint. Drawing it forces the question "is the payment provider inside or outside?" before
  the answer is baked into code.
- **Naming the unit.** A use case is a goal achieved in one sitting — *place an order*, *send a
  transfer*, *export a report*. That's the transaction that gets counted, priced, and measured, so
  this view is where `profit-modeling.md` picks up.
- **Catching the forgotten actors.** The support agent, the ops engineer, the scheduled job, the
  auditor, the abuser. Systems fail on the actors nobody drew.

Keep it flat. `«include»` and `«extend»` decompositions are where use case diagrams go to die; if
you're nesting them, you've started modeling the implementation. One level, verb phrases, actors on
the outside.

**Use case *text* beats the diagram.** The diagram shows scope; the value is in a few lines per
case: precondition, main flow, what happens when it fails, postcondition. Failure paths are where
the requirements actually live, and they're what turns into tests.

## Sequence view

Participants across the top, time down the page, messages between. The workhorse for any question
about *order*, *coupling*, or *what a request actually costs*.

Draw it when:
- A flow crosses more than two components and someone is guessing about the order.
- You need to see synchronous chains — every nested synchronous call is latency you can't hide and
  a failure you inherit.
- You're pricing a transaction: each message is a call, a query, a byte, or a token
  (`profit-modeling.md`).
- You're designing a failure path: timeouts, retries, compensations, and idempotency are all
  order-dependent and nearly impossible to reason about in prose.

Rules that keep them honest:
- **Show the failure fragment**, not only the happy path. A sequence diagram without an `alt` for
  the failure case is half a design.
- **Mark asynchronous messages as asynchronous.** Confusing sync and async on a sequence diagram
  is the most consequential notational error available.
- **Cap the participants at about five.** More than that and it's a system diagram pretending to
  be a flow.
- **Annotate the expensive messages.** External API calls, N+1-prone queries, large payloads — the
  reader's eye should land on them.

## Activity view

A flowchart with rigour: actions, decisions, forks and joins for parallelism, and **swimlanes for
who does what**. Its distinctive value is the swimlane: it is the clearest way to show that a step
is done by a *human*, which makes it the operational-cost view.

Use it for onboarding flows, approval and moderation processes, incident response, refund handling
— anything where the process, not the code, is the design. Then read it economically: every action
in a human lane is support time at an hourly rate, and every manual step is a candidate for the
automation calculation.

Fork/join semantics are the other reason to reach for it over a plain flowchart: it can state that
two things genuinely happen in parallel and that the flow waits for both, which a sequence diagram
expresses awkwardly and prose expresses not at all.

## State machine view

States, transitions, guards, and entry/exit actions for a *single* entity's lifecycle. The highest
bug-catching rate per minute spent of any diagram in this file.

Model any entity whose status field has more than three values — order, subscription, document,
job, session, invite. Then check:

- **Every state is reachable**, and every non-terminal state has an exit.
- **Every transition has a trigger** (event), and where it's conditional, an explicit guard.
- **The illegal transitions are named**, not merely absent. `cancelled → shipped` should be
  impossible in code, and the model is where you notice you never enforced it.
- **The terminal states are actually terminal** — including the ones nobody wanted to think about:
  refunded, expired, banned, orphaned.
- **Timeouts are transitions too.** The state something rots into when nothing happens is a design
  decision; leaving it implicit means the answer is "stuck forever".

Economically, this is the lifecycle view: activation, expansion, downgrade, churn, refund, and
involuntary churn (failed payment) are all transitions, and the ones you can name you can
instrument and price.

## Communication view

The same information as a sequence diagram, arranged as a graph with numbered messages. Better than
a sequence diagram when the question is *who talks to whom* (topology, coupling) rather than
*in what order*. Rare; when you want it, you usually want a component diagram instead.

## Interaction overview and timing views

Specialists. Interaction overview stitches several sequences into a flow — occasionally useful for
a long multi-step saga. Timing diagrams show state against a time axis with real durations — worth
it for hard real-time or protocol work, essentially never for a web product.

## Choosing between them

| The question | View |
| --- | --- |
| What is this system for, and where does it end? | Use case |
| In what order does this flow happen, and what does it call? | Sequence |
| Who does each step — and which steps are people? | Activity with swimlanes |
| What states can this be in, and what's illegal? | State machine |
| What's coupled to what? | Communication, or (usually better) component |
| Does the whole thing hang together end to end? | A scenario walked through all of the above — the "+1" in 4+1 |
