---
name: gtm
description: Use when the user asks for go-to-market work — landing/positioning copy, SEO, analytics events/funnels/experiments, launch plans, channel or keyword research — or invokes /gtm <task>. Dispatches the gtm-engineer subagent and relays its GTM report.
---

# GTM

Delegate to the `gtm-engineer` subagent (`agents/gtm-engineer.md`) instead of doing GTM work
inline. It carries the standing brief for GTM engineering — landing/positioning copy propagated
across locales, SEO, analytics events and funnels using whatever tool the project already has,
signal-based prospecting and enrichment workflows — and it ships working files, not advice. This
skill's job is to route the request correctly and relay what comes back, not to reproduce any of
that reasoning here.

## The arithmetic underneath

GTM work is execution against a growth model, so the model is worth reading before building the
thing that feeds it:
`${CLAUDE_PLUGIN_ROOT}/skills/growth/references/foundations/loops-and-saturation.md` — the plateau a
constant-flow channel converges to, why cost per acquisition rises with volume inside any channel,
what makes a loop compound rather than merely raise the plateau, and the measurement traps
(aggregate churn as a mix statistic, last-touch attribution systematically under-crediting the
loop) that make a landing page or an analytics funnel report a number that isn't the one anyone
thinks it is.

## How to dispatch

1. **Compose the prompt.** Pass the user's task verbatim, plus whatever conversation context the
   agent can't discover from the repo on its own: deadlines, target channel, which locale or
   market to author first, links the user pasted.
2. **Pick isolation.** Use the `Agent` tool with `subagent_type: "gtm-engineer"`.
   - `isolation: "worktree"` for anything that edits files — copy, locales, SEO config,
     instrumentation, docs, including a `docs/gtm/` brief.
   - Plain dispatch (no worktree) only for a task that produces no files at all — keyword
     research, a competitor scan, a live-page audit.
3. **Relay the report in full**, including the worktree path, so the user knows exactly where to
   look and what to review.

## Rules

- **Never commit the agent's output.** The user reviews and commits it themselves, following the
  `/commit` skill's conventions. This skill does not run `git add` or `git commit`.
- **Research plus edits in one dispatch is fine.** A task that mixes research and file changes
  doesn't need to be split — dispatch once, with worktree isolation, and let the agent handle
  both halves.
- **Multiple independent GTM tasks get parallel dispatches**, each agent in its own worktree,
  rather than one dispatch covering unrelated tasks at once.
- **Routing to other skills:**
  - Defining a *new* feature's why, who, and what before any build starts — use `/prd`.
  - Strategy-first work — where the channel, audience, or framing itself needs deciding — use
    `/growth`, which chains `gtm-engineer` for implementation once the strategy is set.
  - `/gtm` stays the direct implementation route: use it when the ask is already concrete
    execution work, not a strategy question.
- **The engineer may peer-dispatch itself.** `gtm-engineer` can peer-dispatch `growth-marketer` or
  `neuro-design-reviewer` when a build task raises a strategy or flow question — its report
  embeds theirs. Still relay one consolidated report back to the user, not the raw sub-reports.
