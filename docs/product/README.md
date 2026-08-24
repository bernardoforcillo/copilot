# Product reference base

The product-side counterparts to [`../engineering/README.md`](../engineering/README.md): the
documents that decide what gets built, for whom, at what price, and how you'll know it worked.

Same rule as the engineering set — each is short on purpose, and each exists to answer a question
someone actually has. A PRD nobody argues with was written too late.

| Document | Fill it in when | Answers |
| --- | --- | --- |
| [jtbd-brief.md](jtbd-brief.md) | Before proposing a solution | Who is hiring this, for what job, instead of what |
| [prd-template.md](prd-template.md) | Once the problem is locked | What we're building, for whom, and when we'd stop |
| [metrics-tree.md](metrics-tree.md) | Once per product, revisited quarterly | Which number this work is supposed to move, and how it connects to money |
| [experiment-brief.md](experiment-brief.md) | Before any change that claims a metric effect | What we expect, how we'll know, what stops us |
| [pricing-and-packaging-worksheet.md](pricing-and-packaging-worksheet.md) | Before setting or changing price | What the unit is, what it costs, what it should earn |
| [roadmap-and-bets.md](roadmap-and-bets.md) | Quarterly, or when priorities are contested | What we're betting on, ranked, with kill criteria |
| [launch-readiness.md](launch-readiness.md) | Before anything reaches users | Whether this is actually ready, and who says so |

## How these connect to the plugin's desks

- **The dialogue that produces a PRD** is `${CLAUDE_PLUGIN_ROOT}/skills/prd/SKILL.md`, with
  `product-strategist` as its research engine; these templates are the artifacts it fills.
- **Ranking and kill criteria** come from `${CLAUDE_PLUGIN_ROOT}/skills/operating-model/SKILL.md`
  — expected value, cost to learn, and the permanent backlog.
- **Evidence standards** for anything measured come from that desk's
  `${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/evidence-and-experimentation.md`; the experiment brief is that standard as a form.
- **Price and packaging** rest on `${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/pricing-and-value-capture.md`, and the unit cost side
  comes from `${CLAUDE_PLUGIN_ROOT}/skills/modeling/references/profit-modeling.md`.
- **Growth and go-to-market execution** are `${CLAUDE_PLUGIN_ROOT}/skills/growth/SKILL.md` and
  `${CLAUDE_PLUGIN_ROOT}/skills/gtm/SKILL.md`.
- **In-product experience questions** route to
  `${CLAUDE_PLUGIN_ROOT}/skills/neuro-design/SKILL.md`.
