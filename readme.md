# copilot

Bernardo's personal Claude Code plugin — a set of skills, agents, and a Stop hook covering
design review, project knowledge management, commit discipline, product/growth work, and
software architecture. Single-maintainer, source-available (see [license.md](license.md)).

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
- Skill `software-architecture` with four reference files: two technology-agnostic (scaling/
  infra trigger-action rules; layered code-organization/dependency-direction rules), two
  concrete to Bernardo's own Go + Vite/React + Kubernetes/Flux stack.
- Agent `software-architect` — reviews a design/PR against all four by default; scaffolds a
  new service, module, or k8s app/channel on request.

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

## License and contributing

Free to use; not licensed for redistribution or publishing a modified copy — see
[license.md](license.md). Improvements are welcome back via pull request — see
[contributing.md](contributing.md).
