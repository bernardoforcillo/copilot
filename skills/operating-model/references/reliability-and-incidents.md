# Reliability and incidents

Reliability is where end-to-end ownership stops being a slogan. Whoever shipped it carries it when
it breaks — and the operating question isn't "how do we never break things", it's **how much
unreliability this product, at this maturity, can afford, and what a failure is obliged to leave
behind.**

## Reliability is a budget, not a virtue

Perfect reliability is available and costs more than it's worth for almost everything. Decide the
target explicitly, per the maturity column in `radical-simplicity.md`, and let it govern what you
build:

| | Unvalidated / prototype | Early users | Mature / revenue-bearing |
| --- | --- | --- | --- |
| **Acceptable failure** | Anything short of data loss | Short outages; nothing silent | Only what the stated target allows |
| **Detection** | You notice when you use it | Error-rate alert and one uptime check | Alerting on the user-visible symptom, per segment |
| **Response** | Fix when convenient | Same-day, by the owner | Defined path, rehearsed rollback |
| **Recovery** | Redeploy | Rollback you've actually tested | Rollback plus restore-from-backup you've actually tested |
| **Post-incident** | Nothing | A note and a regression test | Written postmortem, action items with owners |
| **Never optional** | Backups exist and a restore has been tried once; secrets aren't in the repo; the deploy can be undone | — | — |

The bottom row is the floor at every maturity: data loss and a lost credential are the two failures
that don't get a proportionality argument, because they can't be recovered from by shipping harder.

## The error budget is what makes the target operational

A reliability target that nothing depends on is a sentence in a document. What turns it into an
operating instrument is stating it as a budget you are allowed to spend:

- **Pick one or two indicators the user actually feels** — the share of requests that succeed, the
  latency at a percentile, on the flows that matter. Not uptime of a machine, not CPU.
- **Set the target from what the product needs**, not from the number of nines that sounds
  serious. 99.9% over a month is about 43 minutes of failure; 99.99% is about 4, and costs roughly
  an order of magnitude more to hold. Most products should buy the first one and spend the
  difference on the product.
- **The gap between the target and 100% is the budget**, and it is meant to be spent — on releases,
  migrations, and experiments. A quarter that ends with the budget untouched is not a triumph; it
  says the target is too strict, or that you bought reliability with velocity you could have spent
  elsewhere.
- **The budget has a consequence attached, or it isn't a budget.** Budget remaining → keep
  shipping. Budget exhausted → reliability work outranks feature work until it recovers, and that
  ranking is not renegotiated during the incident that caused it. Deciding this in advance is what
  stops the argument from being had while everyone is upset.
- **Below the maturity line where an SLO makes sense, say so** rather than inventing one. A
  prototype with 40 users has no meaningful denominator; the honest version is the "acceptable
  failure" row of the table above.

The mechanics — indicator specification, burn-rate alerting, the arithmetic of a monthly window —
are in the project blueprint `../../../docs/engineering/observability-and-slos.md`. This file only
fixes the operating rule: **the target is a number you chose, the budget is the permission it buys,
and the consequence of exhausting it is written down before it happens.**

## Toil has a budget too

Toil is operational work that is manual, repetitive, automatable, reactive, devoid of lasting
value, and — the property that makes it dangerous — **grows in proportion to the thing it
supports**. Restarting the stuck job every Monday is toil. Diagnosing why it sticks is not.

- **Cap it deliberately.** The standard rule is that no more than half of operational time should
  be toil; at very small scale the number matters less than the trend. If your operational load is
  growing at the same rate as your usage, you are on a line that ends with no time to build
  anything.
- **Measure it before you argue about it.** One number, reconstructed from your own week: hours
  spent on work that produced nothing that lasts. Most people are surprised by it in one direction
  or the other, which is the point.
- **Automate the top item, not the set.** The single most frequent manual intervention, automated
  once, usually collapses a quarter of the total — and automating the tail is itself unearned
  complexity (`radical-simplicity.md`).
- **Accepting toil is a legitimate answer**, once. "This runs every Monday, takes four minutes, and
  we are choosing to keep doing it by hand" is a decision. Doing it every Monday while calling it
  operations, and never pricing it, is not.

## Running the incident itself

Even alone, the incident has separable jobs, and the failure mode is doing all of them at once
badly:

- **Command** — decides what happens next and holds the current picture. Whoever holds this does
  *not* also do the debugging: the moment they're deep in a log, nobody is steering.
- **Operations** — the only role that touches the system. One pair of hands changing things at a
  time; two people fixing in parallel is how the second incident starts.
- **Communications** — tells users and anyone waiting, on a rhythm, even when the update is "still
  investigating". Silence is read as absence.

At one or two people you wear all three, so make the switching explicit: "I'm stopping the
diagnosis to post an update" is a role change, and saying it out loud (or in the channel) is what
stops the update from never happening. Two more rules that pay for themselves:

- **Declare early, downgrade freely.** Declaring an incident that turns out to be small costs a
  message; not declaring one that turns out to be large costs the first thirty minutes.
- **Keep a live document as you go** — timeline, what you've tried, what you've ruled out, current
  hypothesis. It is the handover if someone joins, and it is 80% of the postmortem you would
  otherwise reconstruct from memory a day later, badly.

## Alert on the symptom, not the cause

Two rules that cover most alerting failure:

- **Page on what the user experiences** — requests failing, the flow not completing, the job not
  producing output. Cause-based alerts (CPU, memory, queue depth) belong on a dashboard you consult
  during an incident, not in a pager, because they fire when nothing is wrong and stay silent when
  something is.
- **Every alert must be actionable and rare.** An alert nobody acts on trains you to ignore the
  channel where the real one arrives. If it fired and the answer was "yeah, that happens", it is a
  defect: fix the threshold, fix the underlying flapping, or delete it.

Alert fatigue is a complication that accumulated without ever passing the proof test in
`radical-simplicity.md` — treat a noisy alert set as debt to be deleted, not as thoroughness.

## What an incident owes you

The failure already happened; the only question left is whether you get paid for it. Three
deliverables, in order, and the second one is non-negotiable:

1. **Restore service first.** Mitigate, then diagnose. Rolling back a deploy you don't yet
   understand is correct; understanding it while users are down is not.
2. **A regression test that fails on the old code.** This is the mechanism that converts an
   incident into a permanent improvement, and the single highest-return habit in this file. No test
   means the same failure is still available to you, and you've paid for it twice.
3. **A written cause, blameless and specific.** What happened, what made it possible, what would
   have caught it earlier, what changes — with an owner and a date, or it isn't an action item.
   "Human error" is never a cause; the cause is the system that allowed one keystroke to do that.
   Agree the *triggers* for writing a full one in advance — data loss, a large share of the error
   budget in one event, a manual restore, or the same failure twice — so that writing one is never
   a judgment about how embarrassing it was. The blueprint to fill in is
   `../../../docs/engineering/incident-postmortem-template.md`; below the triggers, the note and
   the regression test are the whole obligation.

An incident is also evidence in the sense `radical-simplicity.md` means it: a failure that already
happened is exactly the proof that earns a complication. The retry logic, the queue, the extra
environment you couldn't justify last month may be justified now — and only now.

## On-call for very small teams

Below a few people, formal rotation is unearned complexity and pretending otherwise produces
theatre. What actually holds:

- **Decide what wakes you and what waits**, and encode it: a payment path failing is a
  now-problem, a nightly report failing is a tomorrow-problem. Anything not on the wake list gets
  a channel you check on a schedule, not a notification.
- **Make the recovery boring and documented.** One page: how to roll back, how to restore, how to
  put up a status message. You will read it under stress, so write it for that reader.
- **Tell users before they tell you.** A status note during an outage costs one message and buys
  most of the trust that the outage spends.
- **Automate the recurring fix, or accept it as a known cost.** What you refuse to do is fix the
  same thing manually every week while calling it operations.

## Reliability as a prioritization input

Incidents are not outside the ranking; they compete like everything else
(`impact-and-prioritization.md`). The framing that keeps this honest: the cost of a recurring
failure is *frequency × (user impact + your time)*, compounded by the fact that it interrupts
whatever else you were doing, which is the most expensive property any work can have. That number
is often larger than the feature it's competing against — and occasionally it's much smaller, in
which case the correct decision is to write down "we accept this failure" and stop paying attention
to it.

## Anti-patterns

- **The heroic fix, undocumented.** Restored at 2 a.m., no test, no note — the same incident,
  purchased again.
- **Postmortems as a ritual.** Written, filed, never producing a change. The action item with an
  owner and a date is the whole product.
- **Alerting on everything.** Coverage measured in alert count rather than in incidents actually
  caught.
- **Prototype-grade reliability on a paid product**, or **mature-grade reliability on a prototype**
  — both are the maturity mismatch, and the second one is the expensive-and-invisible direction.
- **No tested restore.** Backups whose restore path has never been run are a belief, not a backup.
- **An SLO with no consequence.** A target published, missed, and followed by the same roadmap.
  The budget's only function is what it changes when it runs out.
- **Spending nothing.** A budget that ends every month untouched is reliability bought with
  velocity that nobody decided to spend.
- **Toil re-labelled as ownership.** The same manual fix every week, never counted, never
  automated, and described as being close to the system.
