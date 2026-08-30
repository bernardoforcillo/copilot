# Metrics tree: <product>

> Date: <YYYY-MM-DD> · Owner: <name>

One page connecting the number a piece of work moves to the number the business runs on. Its
purpose is to make "this improves engagement" checkable: either the path from that metric to money
exists, or the claim doesn't.

## The tree

```mermaid
graph TD
  NR["North star<br/>(the value delivered, counted)"] --> REV["Revenue"]
  NR --> ACQ["New users"]
  NR --> ACT["Activation rate"]
  NR --> RET["Retention"]
  NR --> EXP["Expansion"]
  ACQ --> CH1["Organic"]
  ACQ --> CH2["Paid"]
  ACT --> A1["Time to first value"]
  ACT --> A2["Setup completion"]
  RET --> R1["Week-4 return rate"]
  RET --> R2["Involuntary churn<br/>(failed payment)"]
  EXP --> E1["Units per account"]
  EXP --> E2["Upgrade rate"]
  REV --> ARPU["Contribution per unit"]
  ARPU --> COST["Variable cost per unit"]
```

Replace every node with your own. The tree is only useful if each edge is an arithmetic or causal
claim you'd defend.

## Definitions

| Metric | Exact definition | Source | Current | Target | Owner |
| --- | --- | --- | --- | --- | --- |
| North star | | | | | |

The **exact definition** column is the one that matters: "active user" means nothing until it says
which action, in which window, deduplicated how. Two people using the same word for different
queries is the most common measurement failure there is.

## The north star

One metric that counts **value delivered to users**, not value extracted from them. Revenue is the
result; the north star is the leading behavior that produces it. Test: if this number doubled and
revenue didn't follow within a plausible lag, the choice is wrong.

## How a node gets on the tree

Never by being easy to log. Derive each one in three steps, and keep the first two next to the
metric so the next reader can check the reasoning rather than the number alone:

| Goal (in words) | Signals (observable behaviour) | Metric (with window and denominator) |
| --- | --- | --- |
| <what success means for the user here> | <what they'd do, or stop doing, if it worked — including the failure-shaped signals: abandonment, retries, tickets> | <the rate you can actually compute> |

For a user-facing surface, the five categories worth choosing between — happiness, engagement,
adoption, retention, task success — and the rule that you pick one or two rather than filling in
all five, are in
`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/evidence-and-experimentation.md`.

## Guardrails

The metrics that must not get worse while the others improve: latency, error rate, support volume,
refund rate, unsubscribes, churn by tenure. Every experiment inherits these
(`operating-model`'s `${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/evidence-and-experimentation.md`).

## Segments

Which cuts you always read: platform, geography, plan, tenure, usage decile. Decided in advance so
the flattering cut can't be found after the fact. State whether usage is heavy-tailed — it almost
always is, and if it is, the average is not a design input.

## Known proxy risks

For each proxy metric: what it stands for, and how it would detach under optimization pressure
(Goodhart). The mitigation is usually a guardrail plus a periodic re-validation against the thing
it proxies.
