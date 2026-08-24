# PRD: <feature>

> Status: draft | approved | shipped | killed · Author: <name> · Date: <YYYY-MM-DD>
> Maturity column: prototype | early users | mature

The `prd` skill runs the five-phase dialogue that fills this in; this file is the artifact it
produces. A PRD that lists features without a problem, a metric, and a stopping condition is a
build order, not a product decision.

## 1. Problem

The job and the circumstance ([jtbd-brief.md](jtbd-brief.md)), stated in one paragraph, with the
evidence behind it and its strength. Who has it, how often, what it costs them today.

## 2. Why now

What changed — a measurement, a customer signal, a platform shift, a competitor move, a cost. If
nothing changed, this is a backlog item that hasn't won yet, and that's a fine answer.

## 3. Users and scenarios

The actors (including the operational ones: support, admin, the scheduled job) and the two or three
scenarios this must handle. Use case view, if a picture helps
(`${CLAUDE_PLUGIN_ROOT}/skills/modeling/references/behavioral-views.md`).

## 4. Success

- **Primary metric**, its current value, and the target that counts as success — set now, not after
  the result is visible.
- **Guardrails** that must not degrade.
- **How it will be measured**, and whether the sample can actually settle it. If it can't, say so
  and name the fallback (staged rollout, holdout, qualitative with sample size).

## 5. Requirements

Numbered, each traceable to a scenario, each testable. Split must-have from should-have, and be
honest that should-have means "not in this version".

| # | Requirement | Scenario | How it's verified |
| --- | --- | --- | --- |
| R1 | | | |

## 6. Non-goals

What this deliberately does not do. The section that keeps the scope from growing while nobody is
watching.

## 7. Lifecycle and states

If the feature introduces an entity with a status, the state machine belongs here — including the
transitions nobody wants to think about: expired, refunded, abandoned, failed payment.

## 8. Unit economics

The unit this feature produces, its variable cost, and whether it changes contribution
(`${CLAUDE_PLUGIN_ROOT}/skills/modeling/references/profit-modeling.md`). A feature that costs money
per use and isn't priced needs that stated as a decision, not discovered in an invoice.

## 9. Risks and open questions

Leap-of-faith assumptions still untested, unresolved forks, anything the evidence didn't settle.

## 10. Kill criterion

The date, threshold, or discovery at which this stops — written before work starts, because after
three weeks of investment no threshold you invent will be honest.

## 11. Rollout and comms

Stages, who is told what and when, and what support needs to know before day one.

## 12. Hand-off

Pointer to the technical spec and the system design
([../engineering/system-design-template.md](../engineering/system-design-template.md)).
