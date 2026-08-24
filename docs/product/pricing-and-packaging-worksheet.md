# Pricing and packaging worksheet: <product / change>

> Date: <YYYY-MM-DD> · Owner: <name> · Type: new price | packaging change | rise on existing base

Price is the highest-leverage variable in most software businesses and the one most often set once
by guessing. This worksheet forces the two halves to meet: what a unit costs (from the model) and
what it's worth (from the customer).

## 1. The unit and the value metric

- **Unit**: what the customer is buying one of.
- **Value metric candidates**, and which one actually tracks value received (seats? usage? volume?
  outcomes?).
- **Does the value metric match the cost driver?** If price is per seat and cost is per document,
  write that gap down now — it's where the margin surprise will come from.

## 2. Cost floor

From `${CLAUDE_PLUGIN_ROOT}/skills/modeling/references/profit-modeling.md`:

| Driver | Per-unit cost | Share |
| --- | --- | --- |
| | | |

- Variable cost per unit: —
- Fixed and stepped cost: —
- **Break-even usage per subscriber**: fixed ÷ contribution, and where the heavy tail sits.

Rates must be looked up and dated. Support and operational cost belong in this table; they are
routinely the largest driver and never on the cloud invoice.

## 3. Willingness to pay

- What the alternatives cost, including "do it manually" and "do nothing".
- What the job is worth to the customer, in their units (hours saved, risk avoided, revenue
  gained) — from the JTBD brief.
- Evidence: what non-buyers said, what people already pay for adjacent things. Note that stated
  willingness to pay is weak evidence; a real purchase decision is strong.

## 4. Packaging

| Tier | Who it's for | What's in it | Limit that separates it | Price |
| --- | --- | --- | --- | --- |

- The separating limit should be the value metric, not a feature the cheap tier is punished by
  losing.
- Free tier (if any): what it's *for* — acquisition, virality, or evaluation — and where it stops.
  A free tier with no stated purpose gets tightened later, which is the most reliably resented
  change there is.

## 5. The change, ordered by reversibility

Tick where this change sits, and justify anything below the first two:

- [ ] Packaging only (most reversible)
- [ ] New-customer price, existing base grandfathered
- [ ] Discount / trial structure
- [ ] Free-tier boundary tightened
- [ ] Price rise on the existing base (one-way door)

For a rise on the existing base: notice period, who communicates it and how, grandfathering or
step-up schedule, and the clean exit (export, one-click cancel, refund of the unstarted period).

## 6. Measurement

- Primary: revenue per cohort. **Guardrails: churn by tenure, support volume, refund rate,
  cancellation reasons, and organic sign-ups.**
- The organic sign-up guardrail is the one that catches a "win" that ate the growth engine — at
  small scale word of mouth is most of acquisition, so the trust cost lands there first.
- Decision date, and the condition for rolling back.

## 7. The line

State plainly what this change will not do: no retroactive charges, no dark-pattern cancellation,
no removing capability inside a term someone already paid for, no pricing that depends on the
customer not noticing. If the plan needs any of those to work, it isn't a pricing plan.
