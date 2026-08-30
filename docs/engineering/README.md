# Engineering reference base

Project-level blueprints: the documents a system needs to be designed, argued about, operated, and
handed over. They are templates to copy into a target project's own `docs/`, not documentation of
this plugin.

Each one is deliberately short. A blueprint that takes a day to fill in gets skipped, and a
skipped blueprint teaches nothing — so every template here fits on a page or two and asks only for
what changes a decision.

| Document | Fill it in when | Lives for |
| --- | --- | --- |
| [system-design-template.md](system-design-template.md) | Before building a system or a substantial feature | Until the design ships, then it becomes the ADR trail |
| [adr-template.md](adr-template.md) | Every one-way-door decision | Forever — ADRs are append-only |
| [api-design-guide.md](api-design-guide.md) | Before the first endpoint of a new surface | The life of the API |
| [data-modeling-guide.md](data-modeling-guide.md) | Before the first migration | The life of the schema |
| [testing-strategy.md](testing-strategy.md) | Once per project, revisited when maturity changes | Reviewed each maturity step |
| [observability-and-slos.md](observability-and-slos.md) | When the first real user arrives | Reviewed after each incident |
| [incident-postmortem-template.md](incident-postmortem-template.md) | After an incident that hits the triggers it lists | Until its action items close, then as a record |
| [security-baseline.md](security-baseline.md) | Before the first deploy that handles real data | Reviewed quarterly |
| [release-and-environments.md](release-and-environments.md) | Before the second environment exists | The life of the pipeline |

## How these connect to the plugin's desks

- **Shape** comes from `${CLAUDE_PLUGIN_ROOT}/skills/software-architecture/SKILL.md` — layers,
  dependency direction, scaling triggers, and the stack conventions.
- **Views and diagrams** come from `${CLAUDE_PLUGIN_ROOT}/skills/modeling/SKILL.md` — including
  the profit chain, which is why the system design template asks for unit cost.
- **Whether the complexity was earned** is judged by
  `${CLAUDE_PLUGIN_ROOT}/skills/operating-model/SKILL.md`; the maturity column it defines is what
  sets the level of rigor these documents ask for.
- **What survives the project** goes to
  `${CLAUDE_PLUGIN_ROOT}/skills/capture-learnings/SKILL.md` — the memory wiki is where a
  document's conclusions outlive the document.

The product-side counterparts are in [`../product/README.md`](../product/README.md).

## The one rule

Every document here answers a question someone actually has. If nobody has the question, don't
write the document — the cost of a stale blueprint is higher than the cost of not having one,
because a stale one is still believed.
