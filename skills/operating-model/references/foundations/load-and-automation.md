# Foundation: operational load and automation

**The principles it generates:** the ceiling on toil, automate the top item rather than the set,
accepting a manual cost once as a legitimate decision, the runbook, the regression test that
follows an incident, and the reinvestment edge of the operating loop — the claim that a cycle
which leaves nothing reusable behind is a sequence of tasks wearing a loop's shape.

**The mechanism:** operational work that scales with the size or usage of a system consumes a fixed
capacity, and the work that would remove it is drawn from the same pool. That makes it a positive
feedback trap rather than a nuisance: past a threshold, the load itself prevents the only action
that reduces the load.

## The saturation arithmetic

Let capacity per week be **C**, and let operational load be **L = c · N**, where N measures scale
(users, services, integrations, scheduled jobs) and c the per-unit manual cost. Capacity available
for building is **B = C − c·N**.

| N (relative) | L at c = 2h | B out of a 40h week |
| --- | --- | --- |
| 1× | 2h | 38h |
| 4× | 8h | 32h |
| 10× | 20h | 20h |
| 18× | 36h | 4h |
| 20× | 40h | **0** |

Three things about that last row are worth stating precisely, because they are what makes the
ceiling a mechanism rather than an aesthetic preference:

- **It arrives suddenly.** B falls linearly, so nothing feels wrong until it does; the same shape
  as the utilization curve in `flow-and-queues.md`, and it produces the same surprise.
- **It is self-locking.** The automation that would cut c is build work, funded from B. At B ≈ 0 the
  escape is unaffordable exactly when it becomes necessary — so the ceiling has to be defended
  *before* it binds, which is the entire argument for capping toil at a fraction rather than
  reacting when it hurts.
- **Success causes it.** N grows when the product works. An operating model that treats operational
  load as a hygiene issue rather than a scaling term has coupled its own capacity, inversely, to
  its own success.

The standard rule of thumb — no more than about half of operational time on toil — is one choice of
threshold on this curve. The threshold is arguable; the shape isn't.

## What the automation actually buys, and what it costs

Net saving over a horizon H, with frequency f:

**saving = H · f · (t_manual − t_auto) − (t_build + H · m)**

where m is the maintenance the automation itself demands. Two terms in that expression are the ones
people leave out, and both of them are where automation projects go wrong:

- **m is not zero.** Automation is a component: it breaks, it drifts from the thing it automates,
  it needs credentials rotated. `complexity-and-coupling.md` counts it like any other part — which
  is why automating the tail of the distribution is unearned complexity even when each individual
  case "would only take an afternoon".
- **H is not infinite.** It is bounded by the probability the automated thing survives. A service
  you may delete next quarter has a short H, and the correct answer for it is often a documented
  manual procedure, not a script (`uncertainty-and-information.md`: pay for information and
  machinery in proportion to how long the decision they serve will stand).

The term the formula *understates* is the interruption. Manual operational work is unpredictable
work in the sense of Kingman's approximation (`flow-and-queues.md`): variability queues harder than
volume does, so an hour of unscheduled intervention costs more than an hour of scheduled work — it
lands in the middle of something else, and the switching cost is paid twice. Counting toil in raw
hours therefore systematically undervalues removing it.

## Why the top item dominates

Interventions are not uniformly distributed: a small number of recurring failures account for most
of the operational hours, the same heavy tail that shows up in support tickets and in error logs.
Under a heavy tail, **automating the head captures most of the benefit at a fraction of the total
build cost**, and each subsequent item has a worse ratio than the one before it.

This produces the operating rule directly: measure the load first, automate the largest recurring
item, then re-measure — because removing the head often changes which item is next, and because the
re-measurement is what stops the exercise from becoming an automation programme with its own
maintenance burden.

## Amdahl's bound: what refuses to be automated sets the floor

If a fraction **s** of the operational work is irreducibly human — a judgement call, a supplier
phone call, a decision someone must own — then no amount of automation reduces total load below
s·L. The achievable reduction is bounded by **1/s**, which is Amdahl's 1967 argument transplanted
from parallelism to operations.

The practical consequence is that the honest target is never zero, and that the highest-value
automation is often not the one that removes the most minutes but the one that removes the most
*decisions* from the critical path — the runbook that turns a diagnosis into a lookup, the alert
that says which of four things it is.

## Stabilize before you automate

Lisanne Bainbridge's *Ironies of Automation* (1983) supplies the constraint that makes naive
automation backfire, and it transfers to software operations almost unchanged:

- **Automation takes the easy cases and leaves the hard ones.** The human is left with exactly the
  rare, ambiguous incidents — and with less practice, because the routine cases that built the
  skill are gone.
- **Skill decays where it isn't exercised.** The rollback nobody has run, the restore nobody has
  tested, the manual failover path nobody remembers: these are the operations that fail when the
  automation does, which is precisely when they are needed.
- **Automating an unstable procedure encodes the instability** and executes it faster and more
  often, with the human further from the loop.

Three rules follow, and they are why `../reliability-and-incidents.md` insists on rehearsal:
automate the procedure *after* it is decided, keep the manual path exercised on a schedule, and
prefer automation that fails loudly and stops over automation that retries silently. An automation
whose failure mode is a wrong action at scale is a worse trade than the toil it replaced.

## Toil removal as capital conversion

Removing a recurring cost converts a stream into a stock: you pay once and receive an annuity of
returned capacity, which is then available to remove the next one. That is the compounding argument
in `compounding-and-capital.md` applied to your own week, and it is the mechanism behind the
reinvestment edge of the operating loop — not a moral preference for tooling.

It also fixes the ranking rule: a recurring failure's cost is *frequency × (user impact + your time
+ the interruption premium)*, discounted by the probability the system survives the horizon. That
number is often larger than the feature it competes with, and occasionally much smaller — in which
case writing down "we accept this cost" is the correct output, and continuing to pay it silently is
not.

## When this mechanism is absent

The ceiling and the automation preference void, or invert, where:

- **f · H is small.** A task done rarely, or on a system with a short remaining life, has no
  payback; the manual procedure with a written runbook is the cheaper instrument.
- **The work is irregular.** If each instance differs, there is no stable pattern to encode, and an
  attempt to automate produces a configuration language plus the original judgement call.
- **The manual step is the control.** Where a human pause is the safeguard on an irreversible action
  — a production data change, a destructive migration — automating it removes the thing that was
  doing the work (`irreversibility-and-optionality.md`).
- **Load doesn't scale with the system.** Fixed, bounded operational work does not saturate
  anything, and treating it as a growing threat produces its own kind of over-investment.
