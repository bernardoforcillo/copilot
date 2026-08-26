# Postmortem: <short title, what users experienced>

> Date of incident: <YYYY-MM-DD> · Author: <name> · Status: draft | reviewed | actions closed
> Severity: <sev> · User impact: <what, for whom, for how long> · Error budget spent: <%>

The purpose of this document is to make the failure permanently more expensive to repeat, and
nothing else. It is **blameless**: it names systems, decisions, and missing safeguards, never
people. A postmortem that produces no change to the system was a meeting with a document attached.

## When to write one

Agree the triggers in advance, so writing one is never a judgment about how bad it looked:

- User-visible downtime or data loss above the threshold you set (or *any* data loss).
- A significant share of the error budget spent in one event
  (`observability-and-slos.md`).
- A manual intervention was needed to restore service.
- A failure that has now happened twice, whatever its size.
- Anyone asks for one — the request itself is evidence that the cause isn't understood.

Below those triggers, a note and a regression test are the whole obligation
(`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/reliability-and-incidents.md`).

## Summary

Three sentences, written for someone who wasn't there: what broke, who felt it, how it was
restored. Written last, read first.

## Impact

| | |
| --- | --- |
| Users affected | <count / share / segment> |
| Duration (start → mitigated → resolved) | <times, with timezone> |
| What they experienced | <errors, wrong data, slowness, silence> |
| Revenue / data consequence | <money, records affected, none> |
| Detected by | alert / user report / noticed by hand |

**Time to detect** and **time to mitigate** are the two numbers to track across incidents; they
say more about the system's operability than the count of incidents does.

## Timeline

Times in one timezone, stated. Include the actions that *didn't* help — they're where the
diagnosis cost went.

| Time | Event |
| --- | --- |
| <hh:mm> | <change deployed / alert fired / hypothesis / action taken / effect> |

## What happened

The mechanism, in the order it actually operated: the trigger, the condition that made the trigger
harmful, the way it propagated, and why it stopped. Write it so a reader can follow the causal
chain without knowing this system.

## Contributing factors

Not "the root cause" — most incidents have several factors, and the single-cause framing hides the
ones you could most cheaply have removed. For each: what it is, and whether it's addressed below.

- **Trigger** — the change or event that started it.
- **Latent condition** — what made the trigger harmful (a missing limit, an untested path, a
  default, an assumption that stopped holding).
- **Detection gap** — why it took as long as it did to notice.
- **Response friction** — what made restoring service slower than it needed to be (missing access,
  an unrehearsed rollback, an unknown runbook step).

**"Human error" is never a factor.** If a keystroke could do this, the finding is the system that
allowed one keystroke to do this.

## Where we got lucky

The part most templates omit and most incidents have: what would have made this materially worse
had it been slightly different — the time of day, the traffic level, which customer, the fact that
someone happened to be looking. Luck is not a control, and naming it is how the next version of
this incident gets prevented rather than survived.

## What went well

Worth recording honestly: the alert that did fire, the rollback that worked, the backup that
restored. These are the controls to keep funding.

## Action items

The only part of this document with teeth. Every line has an owner and a date, or it is not an
action item. Rank them by expected value like any other work
(`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/impact-and-prioritization.md`) — and if
one loses that ranking, delete it and say so rather than leaving a permanent open item that
implies coverage you don't have.

| # | Action | Type | Owner | Due | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | <the regression test that fails on the old code> | prevent | | | |
| 2 | | detect | | | |
| 3 | | mitigate | | | |
| 4 | | process | | | |

**Item 1 is non-negotiable**: a test that fails against the code as it was. Without it the same
failure is still available and you've paid for it twice.

Prefer *prevent* and *detect* items over *process* items. "Be more careful during deploys" is not
an action; "the deploy refuses to run a migration and a code change in the same step" is.

## Follow-up

- [ ] Reviewed by someone who wasn't the responder
- [ ] Action items filed where the work actually gets ranked, not only in this document
- [ ] What generalizes captured in the memory wiki
      (`${CLAUDE_PLUGIN_ROOT}/skills/capture-learnings/SKILL.md`)
- [ ] A date to check that the actions closed — an open item nobody revisits is a false sense of
      coverage

## Provenance of this format

The blameless framing, the trigger-based writing rule, the "where we got lucky" section, and the
insistence on owned and dated action items follow the postmortem practice published in Betsy
Beyer, Chris Jones, Jennifer Petoff and Niall Richard Murphy (eds.), *Site Reliability
Engineering* (O'Reilly, 2016), ch. "Postmortem Culture: Learning from Failure", and its treatment
in *The Site Reliability Workbook* (O'Reilly, 2018). The contributing-factors breakdown rather
than a single root cause is standard practice in resilience engineering; it's used here because
the single-cause form reliably terminates the analysis at the last human who touched the system.
