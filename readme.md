# copilot

Bernardo's personal Claude Code plugin — a set of skills, agents, a Stop hook, and a project
reference base covering design review, project knowledge management, commit discipline,
product/growth work, software architecture, system modeling through to unit economics, and the
operating model that decides what's worth building at all. Single-maintainer, source-available (see [license.md](license.md)).

## What's inside

### Neuro-design
Design decisions and reviews grounded in cited neuroscience/cognitive-science research
(attention, cognitive load, perception & color, motor interaction, emotion, typography).

- Skill `neuro-design` — apply the six lenses while building a UI.
- Skill `neuro-design-audit` — review an existing UI against the same lenses, inline.
- Agent `neuro-design-reviewer` — delegate an isolated, structured second-opinion critique.

### Memory wiki
Gives any project a committed, git-versioned knowledge base (`.claude/memory/`) distinct
from personal harness memory — bootstrapped automatically on first use.

- Skill `capture-learnings` — ingest a finished plan/PRD into the wiki, or lint it for health.
- Agent `librarian` — runs the ingest in isolation so it doesn't consume the main session's context.
- A self-gated `Stop` hook nudges you to run `/capture-learnings` after plan/PRD work, but only
  in a project that already has a wiki.

### Commit
- Skill `commit` — Conventional Commits discipline (atomic, typed, imperative, explains *why*),
  deferring to a project's own convention when one already exists.

### Product / GTM desk
A design-thinking → strategy → execution pipeline, each piece grounded in real named
frameworks (JTBD, Continuous Discovery, AARRR/RARRA, growth loops, Clay's GTM-engineering
definition) plus concrete company case studies (Amazon's PRFAQ, Superhuman's PMF engine,
DoorDash's experimentation platform).

- Skill `prd` — facilitates a five-phase design-thinking dialogue, writes a PRD, hands off to
  `superpowers:brainstorming` for the technical spec.
- Agent `product-strategist` — the research engine `prd` dispatches per phase; peer-dispatches
  the three lenses below for Ideate.
- Agent `growth-marketer` / skill `growth` — network-based growth strategy and metrics diagnosis.
- Agent `gtm-engineer` / skill `gtm` — the doer: copy, SEO, analytics, signal-based GTM automation.
- In-product UX questions route to `neuro-design-reviewer` above instead of a separate agent.

### Software architecture
- Skill `software-architecture` with five reference files: three technology-agnostic (scaling/
  infra trigger-action rules; layered code-organization/dependency-direction rules; the code-review
  standard — approve on overall code health, why diff size decides what review catches, the
  one-business-day response, what CI owns versus what a human is for, and the priors that change
  when the diff came from an agent), two concrete to Bernardo's own Go + Vite/React +
  Kubernetes/Flux stack.
- Agent `software-architect` — the *shape*: reviews a design against every applicable file, or
  scaffolds a new service, module, or k8s app/channel on request.
- Agent `code-reviewer` — the *change*: reviews a diff, a PR, or a working tree against the
  code-review standard and returns one verdict (approve / approve with nits / changes requested /
  split first), findings separated into blocking, suggestion and nit, and a fix loop when you want
  them applied rather than listed. Hands a finding up to `software-architect` when it stops being
  about the diff and starts being about the boundary, and to `operating-partner` when the honest
  finding is that the change shouldn't exist yet.

### Operating model
How work gets chosen, how much rigor it earns, who owns it end to end, what counts as evidence, and
what happens to a system you inherit rather than start. Twelve reference files in two tiers.

*Core, one per principle*: radical simplicity (the burden of proof sits on every complication, not
on the simple version), ownership and execution, impact and prioritization by expected value,
evidence and experimentation, asset transformation (acquire → transform → reinvest, at business
scale and at codebase scale), talent and standards.

*Applied, loaded when the decision is about their subject*: platform and compounding (what belongs
in a shared layer, when extraction is earned, whether the platform is paying), pricing and value
capture (the business half — packaging before price, levers ordered by reversibility, and the line
between monetization and extraction), reliability and incidents (reliability as a budget set by
maturity, the error budget as the thing that makes a target operational, a ceiling on toil, how the
incident itself is run when one person is command, operations and communications at once, and what
an incident owes you), decision latency (one-way vs two-way doors, batch size, work in progress as
rotting inventory, and the four delivery measures that say whether speed was bought at the cost of
stability), limits and failure modes (where this model does not transfer, and how it damages itself
where it does), and worked examples (four end-to-end passes with real verdicts).

*Foundations, under `references/foundations/`*: the mechanism each principle is derived from, so a
rule can be argued with instead of obeyed — interaction combinatorics and essential-vs-accidental
complexity; value of information, base rates and the sample-size arithmetic that says what a small
product can and can't settle; reversibility as the axis decisions actually sort on; Little's Law
and the 1/(1−ρ) latency curve; compounding, learning curves and transaction costs; agency costs and
repeated games. Each file ends with the condition under which its mechanism is absent — which is
also the condition under which the principle above it stops being true. The derivation table in
the skill maps principle → mechanism → what voids it.

`references/provenance.md` traces every principle to its source — including the critical reporting
on where the playbook does damage, the site-reliability, engineering-practices and delivery-research
literature behind the running-a-service half, the standard literature behind the foundations tier,
and an explicit note on which files are this plugin's own construction rather than distillation,
and which practices don't transfer below a certain scale.

- Skill `operating-model` — the six principles, the operating-loop graph they gate, a *reduction
  loop* that strips unjustified complications one at a time until each survivor has a written
  justification, and the derivation table linking each principle to the mechanism it comes from.
- Agent `reliability-engineer` — the operational half, run against a specific system: a
  production-readiness review before a service carries real traffic, structure during a live
  incident (restore first, split command from hands-on-the-system from comms, keep the live doc),
  the postmortem afterwards, or an audit of service levels, alerting, on-call and toil. Reports
  over-investment as plainly as gaps, never runs a command that mutates a running system, and never
  states a threshold or a cost from memory.
- Agent `operating-partner` — a full pass over a plan, diff, roadmap, or inherited codebase: it
  establishes whether the model applies to the target's domain at all, then which maturity column
  the product is in, then a verdict per principle (`aligned` / `unearned complexity` /
  `misapplied rigor` / `real gap`),
  plus ranking mode (expected-value ordering with kill criteria) and takeover mode (assess →
  migrate → delete → optimize). Contested findings are argued from the mechanism rather than the
  rule, and withdrawn if the mechanism turns out not to apply. Also serves as `lollapalooza`'s
  capital-allocation lens.

## Installation

**Test locally first** (from this repo's root, where `.claude-plugin/marketplace.json` lives):

```
/plugin marketplace add ./
/plugin install copilot@copilot
```

**From GitHub**, once this repo is pushed (no remote is configured yet — swap in the real path):

```
/plugin marketplace add bernardoforcillo/copilot
/plugin install copilot@copilot
```

Verify with `/plugin` (Installed / Errors tabs) or `/plugin list`.

## Usage

Skills are invoked scoped to the plugin: `/copilot:<skill-name>` — e.g. `/copilot:commit`,
`/copilot:prd <feature>`, `/copilot:software-architecture`. Agents are dispatched the same
way, `@copilot:<agent-name>` (e.g. `@copilot:software-architect`) or via the `Agent` tool with
`subagent_type: "<agent-name>"`.

### Modeling
The UML pillars that earn their place — use case, domain/class, sequence, state machine, component,
deployment — plus the step most modeling guides omit: carrying the model through to money.

- Skill `modeling` — the five questions and the view that answers each, the modeling flow, and a
  *traceability loop* that converges only when every element traces to a requirement **and** every
  requirement appears in a view. Five references: UML core concepts (relationship semantics, 4+1,
  CIM/PIM/PSM), structural views, behavioral views, profit modeling, and a mermaid cookbook whose
  every snippet is parser-validated.
- `references/profit-modeling.md` is the centrepiece: use case gives the unit, sequence gives
  variable cost, deployment gives fixed and stepped cost, the state machine gives lifecycle
  economics, and the activity view gives operational cost — ending in contribution per unit,
  break-even volume, the dominant cost driver, and the EV of a proposed change.
- Agent `system-modeler` — produces a model set, reviews an existing design for traceability and
  notation honesty, or runs the profit chain. Emits validated mermaid and never carries a
  provider's pricing from memory.

### Project reference base
`docs/engineering/` and `docs/product/` hold the blueprints a project copies into its own docs:
system design and ADR templates, API and data-modeling guides, testing strategy (including the
size contract that decides what a test may touch), observability and SLOs (golden signals and
burn-rate alerting), a security baseline (identity, supply chain, build provenance), release and
environments (with the production-readiness gate a service passes before it carries real traffic),
and a blameless incident postmortem template — and on the product side JTBD brief, PRD, metrics
tree, experiment brief, pricing and packaging worksheet, roadmap and bets, launch readiness. Each is a page or two, each asks only for what changes a decision, and each points back
at the desk whose rules it applies.

## Checks

`node scripts/check-plugin.mjs` validates the plugin's structure: skill/agent frontmatter, every
path-shaped file reference, orphaned reference files, mermaid blocks (closed, and declaring a known
diagram type), and whether `docs/architecture.md`'s dispatch graph and loop-adopters table still
describe what exists. No dependencies; exit 0 means consistent.

## Evals

`evals/` holds two kinds of measurement, because a skill fails in two independent ways — good advice
that never loads, and advice that loads reliably and is wrong.

- `<skill>-trigger.json` — 20 queries per skill, half of them near-misses that belong to another
  desk, run through `claude -p` by `skill-creator`'s `run_eval.py` to measure whether the
  description actually discriminates.
- `<skill>-tasks.json` — task prompts with objectively checkable assertions, written against the
  specific failures each desk exists to prevent (endorsing a split with no measured trigger,
  optimising before deleting in a takeover, protecting a reliability target nobody is spending,
  answering an incident with "be more careful", approving an unreviewable diff, a sequence diagram
  with no failure path, a cost model with rates asserted from memory). `software-architecture`
  has a task set without a trigger set, since that desk is reached by invocation rather than by
  ambient triggering.

See [evals/README.md](evals/README.md) for how to run them, what the first run measured (perfect
precision, low recall on both new desks), what that configuration can and cannot resolve, and what
it deliberately doesn't measure.

## License and contributing

Free to use; not licensed for redistribution or publishing a modified copy — see
[license.md](license.md). Improvements are welcome back via pull request — see
[contributing.md](contributing.md).
