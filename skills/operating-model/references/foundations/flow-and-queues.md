# Foundation: flow and queues

**The principles it generates:** decision latency as a managed variable, small batches,
work-in-progress limits, the finisher rule applied to a queue, and the claim that slack is not
waste.

**The mechanism:** work waits far more than it is worked on, and waiting time is governed by
utilization and batch size — both of which are things you set, usually without noticing.

## Little's Law

John Little's 1961 result, which holds for any stable queue regardless of distribution:

**L = λW** — items in the system = arrival rate × time in system

Rearranged for the version that matters: **cycle time = WIP ÷ throughput.**

Throughput is hard to change quickly; it's your actual capacity. WIP is trivially changeable — it's
just how many things you allow to be open at once. So the fastest available lever on how long
things take is **the one that feels least like working harder**: start fewer things, finish what's
open. This is the finisher rule from `ownership-and-execution.md`, derived rather than asserted.

## Utilization destroys latency before it destroys throughput

For a simple M/M/1 queue with utilization ρ = arrival rate ÷ service rate, the expected number
waiting is ρ/(1−ρ), and time in system is 1/(μ(1−ρ)). The shape of 1/(1−ρ) is the whole lesson:

| Utilization ρ | Relative time in system |
| --- | --- |
| 50% | 2× service time |
| 70% | 3.3× |
| 80% | 5× |
| 90% | 10× |
| 95% | 20× |

Nothing dramatic happens at 80%; everything happens between 90% and 100%. A person or system
planned to be fully busy is not efficient, it is a queue with unbounded wait — and the first
symptom isn't less output, it's that everything suddenly takes much longer. **Slack is the price of
responsiveness**, and refusing to buy it is why "we're at capacity" and "why does everything take
three weeks" are always reported by the same team.

Variability makes it worse in a specific way (Kingman's approximation): waiting time scales
with (ρ/(1−ρ)) × the average of the squared coefficients of variation of arrivals and service. So
*unpredictable* work of the same average size queues much harder than predictable work — which is
why interrupts and incidents cost more than their hours (`reliability-and-incidents.md`) and why
reducing variability is as valuable as adding capacity.

## Batch size

Donald Reinertsen's *The Principles of Product Development Flow* (2009) formalizes the trade-off:
batch size balances a **transaction cost** (per-release overhead) against a **holding cost** (delay,
risk, and inventory carried while waiting). Optimal batch size falls as transaction cost falls —
which is the entire argument for investing in the deploy pipeline: cheap releases make small
batches optimal, and small batches are what make everything else in this model work.

Large batches carry costs that compound rather than add:

- **Feedback is diluted.** Fourteen changes, one metric movement, no attribution — the experiment
  you paid for returns a mystery (`uncertainty-and-information.md`).
- **Risk is superlinear.** Failure probability rises with content, and diagnosis cost rises with
  the number of candidate causes, so expected debugging time rises faster than batch size.
- **Queues form behind them.** A big item occupies the reviewer, the environment, the release slot;
  everything behind it inherits the wait.
- **Inventory rots.** An open branch drifts from the codebase around it; the merge cost grows with
  age, which is a holding cost people rarely count as one.

The empirical corroboration is in *Accelerate* (Forsgren, Humble, Kim, 2018): small batches, short
lead time, and frequent deploys correlate with both higher throughput *and* higher stability —
the trade-off people assume exists between speed and safety doesn't appear in the data.

## Queues you can't see

The costly queues are usually not the ones in your issue tracker:

- **The undecided decision.** It occupies a slot, blocks the work behind it, and its context decays
  while it sits. `decision-latency.md` puts a deadline and a default on it for exactly this reason.
- **The unreviewed diff.** Waiting for review is often the largest single component of cycle time,
  and it's pure waiting — no one is working on it.
- **The half-finished feature behind a flag.** Inventory that is complete enough to have cost you
  and incomplete enough to have returned nothing.
- **Context switching.** Two open items don't halve your speed; they add switch cost each time,
  which is why WIP limits beat multitasking even when nothing is blocked.

To find them: measure **decision-needed → decided** and **written → in front of users**. If either
is dominated by waiting rather than working, adding effort will not fix it — only reducing WIP,
reducing batch size, or buying slack will.

## When this mechanism is absent

The principle voids, or weakens, where:

- **The work isn't a repeating flow** — a single one-shot project has no steady-state queue, and
  the arithmetic doesn't apply.
- **The constraint is elsewhere.** Goldratt's theory of constraints (*The Goal*, 1984): optimizing a
  non-bottleneck yields nothing. If the actual limit is a single approval, an external dependency,
  or one irreplaceable person, WIP limits downstream just move the queue.
- **Batches are indivisible.** Some changes genuinely cannot ship in pieces (a schema cutover, a
  regulatory release). Then the correct response is to reduce the *risk* of the batch — rehearsal,
  staged rollout, rollback path — rather than to pretend it can be split.
