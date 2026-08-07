# Memory wiki

The project's compounding knowledge base lives at `.claude/memory/` — a committed,
git-versioned, cross-linked markdown wiki. The `capture-learnings` skill maintains it; you
rarely hand-edit it.

## Two stores, one maintainer

| Store | Location | Committed | Holds |
| --- | --- | --- | --- |
| **Project wiki** | `.claude/memory/` | Yes | `type: project`, `reference` |
| **Personal memory** | the harness's own memory store | No | `type: user`, `feedback` |

Project/reference knowledge goes in the repo wiki. Personal notes (who the user is, how they
like to work) go in the harness's own memory, never committed here.

## Page format

```markdown
---
name: <slug>                 # kebab-case, equals the filename
description: <one-line>       # recall relevance + index hook
metadata:
  type: project | reference
  updated: YYYY-MM-DD         # bump on every edit — drives staleness detection
  sources: [docs/superpowers/plans/<file>.md]   # provenance, optional
---

<the fact. Link related pages with [[their-slug]] liberally — a [[slug]] with no page yet is
a to-write marker. For project pages, prefer stating the why.>
```

## index.md and log.md

- `index.md` — content catalog, categorized (`## Project`, `## Reference`), one line per
  page: `- [Title](slug.md) — hook`. Every page appears exactly once.
- `log.md` — append-only. Entry prefix `## [YYYY-MM-DD] <op> | <topic>` where `<op>` is
  `ingest`, `lint`, or `migrate`.

## Operations (run by the capture-learnings skill)

- **Ingest** — after a plan/PRD is completed: read it, reflect on the session, extract
  compounding lessons, route each (rubric below), integrate into existing pages (don't
  duplicate), update `index.md`, append `log.md`, run the checker.
- **Lint** — health-check: contradictions, stale claims (verify against code), orphans,
  dangling `[[links]]`, missing pages, index drift. Propose fixes and questions.
- Both end with `node .claude/memory/check.mjs` passing, and never auto-commit — always show
  a summary and let the user approve.

## Routing rubric

| Lesson | Destination |
| --- | --- |
| Ongoing project context / constraints / external pointers | `.claude/memory/` (`project`/`reference`) |
| Preference, working style, feedback on how to work | harness memory (`user`/`feedback`) — not committed |
| Durable convention/gotcha for everyone | **propose** moving to `.claude/rules/*.md` |
| Reusable multi-step workflow | **propose** a `.claude/skills/<name>/` skill |
| Only-this-feature detail | note beside the plan/PRD, or skip |

## Reminder hook (opt-in)

The plugin ships a `Stop` hook (`${CLAUDE_PLUGIN_ROOT}/hooks/capture-learnings-nudge.sh`) that
nudges you to run `/capture-learnings` after plan/PRD work. It only fires in a project that
already has `.claude/memory/` (this file's presence is itself the opt-in signal) and only when
a plan/PRD file changed in the last 30 minutes. It never writes the wiki itself.
