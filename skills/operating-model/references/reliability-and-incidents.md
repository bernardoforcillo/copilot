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
