# System design: <name>

> Status: draft | in review | accepted | superseded  ·  Author: <name>  ·  Date: <YYYY-MM-DD>
> Maturity column: prototype | early users | mature (see the operating-model skill)

## 1. The question

What decision does this document exist to make? One sentence. If more than one, split the document.

## 2. Problem and constraints

- **What breaks today**, with a measurement and a date — not a feeling.
- **Who is affected**, and how often.
- **Hard constraints**: contractual, regulatory, platform, budget, deadline. Mark each as a real
  constraint or an assumed one.
- **Explicit non-goals.** The list that stops the design from growing while nobody is looking.

## 3. Current state

One diagram at the coarsest level that shows the problem — usually C4 container. What exists, what
it costs, where the failure or the limit is.

## 4. Proposed design

- **The views that answer the question** (see the `modeling` skill): typically a container
  diagram, one sequence for the critical flow including its failure path, and a state machine if
  any entity gains a lifecycle.
- **What changes**, listed as a diff against current state rather than described from scratch.
- **The domain model**, if new concepts appear: entities, aggregate boundaries, invariants,
  multiplicities.

## 5. Complexity budget

Every complication this design introduces — a service, a queue, a cache, a dependency, an
environment, an abstraction — with the evidence that earned it: a number measured today, a failure
that already happened, a written requirement, or a genuine one-way door. Anything without evidence
comes out of the design before this document is accepted.

| Complication | Evidence | Verdict |
| --- | --- | --- |
| | | earned / cut |

## 6. Unit economics

- **The unit** this system produces, and its expected volume.
- **Variable cost per unit**, by driver, with the dominant one named.
- **Fixed and stepped cost**, and where the next step lands.
- **Contribution per unit** and break-even volume, if the unit is priced.

Method: the `modeling` skill's `${CLAUDE_PLUGIN_ROOT}/skills/modeling/references/profit-modeling.md`. Rates must be looked up and dated,
never recalled.

## 7. Alternatives considered

At least two, each with why it lost. "Do nothing" is always one of them, and if it's close, say so.

## 8. Risks and failure modes

What breaks, how you'd know, and what the blast radius is. Include the irreversible ones separately
— data loss, migration without a back-out, a contract others will depend on.

## 9. Rollout

Stages, the flag or channel, the rollback path (tested, not assumed), and the migration plan if
data moves. Name the point of no return.

## 10. Instrumentation

The primary metric this design should move, its current value, the target, the guardrails, and the
kill criterion — a date or a threshold at which the work stops. A design without this section
cannot be evaluated after it ships.

## 11. Open questions

What isn't settled, who can settle it, and by when.
