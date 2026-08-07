---
description: Use at the end of executing a plan or PRD (or when the user asks to capture lessons / update memory) to distil reusable knowledge into the .claude/memory wiki. Bootstraps the wiki automatically on first use in a project. Never auto-commits.
---

# Capture Learnings

`capture-learnings` maintains `.claude/memory/` — a project's committed, git-versioned,
cross-linked markdown wiki of compounding knowledge — per the routing rubric and page format
defined in `.claude/rules/memory-wiki.md`. That rules file is itself created by this skill's
own bootstrap step if it is missing, so the skill is fully self-installing: the first time it
runs in a project it sets up everything it needs, then proceeds straight to the requested
work. Two modes hang off this one entry point — `ingest`, which distils a just-completed
plan or PRD into the wiki, and `lint`, which health-checks the wiki that already exists.

## Bootstrap (runs before either mode, every invocation)

Before doing anything else, check whether `.claude/memory/` exists in the current project:

- **If `.claude/memory/` does not exist**, create it with no confirmation prompt:
  - Copy `${CLAUDE_PLUGIN_ROOT}/skills/capture-learnings/templates/index.md` to
    `.claude/memory/index.md`.
  - Copy `${CLAUDE_PLUGIN_ROOT}/skills/capture-learnings/templates/log.md` to
    `.claude/memory/log.md`.
  - Copy `${CLAUDE_PLUGIN_ROOT}/skills/capture-learnings/templates/check.mjs` to
    `.claude/memory/check.mjs`.
  - Copy `${CLAUDE_PLUGIN_ROOT}/skills/capture-learnings/templates/memory-wiki-rule.md` to
    `.claude/rules/memory-wiki.md`.
  - Then proceed straight to the requested mode below — no separate confirmation step.
- **If `.claude/memory/` exists but is missing `index.md`, `log.md`, or `check.mjs`**, stop
  and report the mismatch instead of touching anything. A partial or foreign directory at
  that path may not be this skill's format, and overwriting or merging into it blind risks
  destroying content that isn't ours to manage. Tell the user what's missing and let them
  decide how to proceed.
- **If `.claude/memory/` exists and has all three files**, skip bootstrap entirely and go
  straight to the requested mode.

## Modes

- `/capture-learnings [plan-or-prd-path]` — **ingest** (the default mode). Distils the
  named plan or PRD (or the most recently completed one, if no path is given) into the wiki.
- `/capture-learnings lint` — **lint**. Health-checks the existing wiki for contradictions,
  staleness, orphans, and drift, without ingesting anything new.

## Ingest procedure

1. **Locate the source.** Use the given path if one was passed. Otherwise, look for the
   most recently completed file in `docs/superpowers/plans/` or `docs/superpowers/prd/`. If
   it's ambiguous which file is "the" recently completed one (for example, several plans
   finished around the same time, or none look clearly done), ask the user to confirm before
   proceeding rather than guessing.
2. **Dispatch the librarian.** In the main session, dispatch the `librarian` subagent via
   the `Agent` tool with `subagent_type: "librarian"`, passing the source path as its prompt.
   Relay the librarian's summary back to the user verbatim — don't paraphrase or compress it.
   Only run the ingest steps below inline, in the main session, if the `Agent` tool is
   unavailable.
3. **What the librarian does** (whether run as a subagent or inline): read the source
   document and reflect on the session that produced it; extract candidate lessons, applying
   a YAGNI filter that drops anything already recorded elsewhere (in the wiki, in
   `.claude/rules/`, or in an existing skill) rather than re-saving it; route each surviving
   candidate using the rubric in `.claude/rules/memory-wiki.md`; integrate each one into an
   existing page rather than creating a duplicate whenever an existing page already covers
   that topic; update `index.md` to reflect any new or changed pages and append an entry to
   `log.md`; run `node .claude/memory/check.mjs` as the gate that the wiki is still
   internally consistent before finishing; and report a per-file "what I saved and where"
   summary. None of this is committed — ingest only ever leaves working-tree changes for the
   user to review and commit themselves.

## Lint procedure

Read every page in `.claude/memory/` plus `index.md`, and report:

- **Contradictions** — pages that assert conflicting facts about the same topic.
- **Stale claims** — verify that files, flags, or commands a page references still exist in
  the codebase as described; treat a page's `updated` date as suspect if it's older than a
  plan or PRD that has since superseded what it describes.
- **Orphans** — pages with no inbound `[[link]]` from any other page.
- **Dangling links** — `[[link]]` references that point at a slug with no corresponding page.
- **Missing pages** — concepts referenced repeatedly across pages but never given a page of
  their own.
- **Index drift** — mismatches between what `index.md` lists and what actually exists on
  disk.

Always end the lint pass with `node .claude/memory/check.mjs` and append a
`## [<date>] lint | <scope>` entry to `log.md` describing what was checked. Report every
finding, but fix nothing without the user's explicit approval first — lint is diagnostic by
default, not self-healing.

## Rules

- Never auto-commit. Ingest and lint both leave changes staged in the working tree only;
  committing is always a separate, explicit step the user takes.
- Never edit the wiki without showing the summary of proposed changes first — the user sees
  what would change before it's written.
- Personal notes about the user (preferences, feedback on how to work, working style) never
  enter `.claude/memory/`. Those belong in the harness's own memory store, not the project
  wiki — `.claude/memory/` is for project and reference knowledge only.
- No emoji anywhere in wiki content.
- Keep pages terse: one fact or topic per page, integrated into an existing page when one
  already fits rather than spawning near-duplicates.
