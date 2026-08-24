---
description: Use when the user asks for growth or launch strategy — launch plans, channel/audience strategy, waitlist and referral mechanics, message framing — or invokes /growth <task>. Dispatches the growth-marketer subagent, which itself peer-dispatches gtm-engineer to implement the handoff when build was asked for.
---

# Growth

Delegate to the `growth-marketer` subagent (`agents/growth-marketer.md`) instead of doing growth
work inline. It carries the standing brief for growth strategy — AARRR/RARRA diagnosis, North
Star Metric selection, growth-loops design, network-based growth plays, ICE/RICE prioritization,
experiment rigor — and it chains `gtm-engineer` itself when the ask includes implementation, not
just strategy. This skill's job is to route the request correctly and relay what comes back, not
to reproduce any of that reasoning here.

## How to dispatch

1. **Compose the prompt.** Pass the user's task verbatim, plus whatever context the agent can't
   discover from the repo on its own: target market, timing, channels already tried, links the
   user pasted. State explicitly whether the user wants strategy only, or strategy plus build —
   this determines whether `growth-marketer` needs to chain `gtm-engineer` itself.
2. **Pick isolation.** Use the `Agent` tool with `subagent_type: "growth-marketer"`.
   - `isolation: "worktree"` when the dispatch will write files — strategy briefs land as files
     under `docs/gtm/`, so most dispatches need this.
   - Plain dispatch (no worktree) only for a purely verbal research question that produces no
     files at all.
3. **Relay the report in full**, including the worktree path, so the user knows exactly where to
   look and what to review.

## Rules

- **Never commit the agent's output.** The user reviews and commits it themselves — per-file
  staging, following the `/commit` skill's conventions. This skill does not run `git add` or
  `git commit`.
- **Never publish, send, or post anything external.** Drafts of outbound copy are fine; sending or
  publishing them is not this skill's job, or the dispatched agent's.
- **Directly implementable work skips this skill.** If the ask is copy, SEO, or events work with
  no strategy step needed, don't dispatch `growth-marketer` — use `/gtm` instead.
- **In-product flow or retention work routes elsewhere.** For flow, activation, or retention
  mechanics inside the product itself, dispatch `neuro-design-reviewer` or use the
  `neuro-design`/`neuro-design-audit` skills instead of this one.
- **Evidence standard comes from the operating model.** Whatever this skill's strategy work
  proposes is held to `operating-model`'s `${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/evidence-and-experimentation.md`: a primary
  metric with a target set in advance, guardrails, the cohort-lifetime-value frame for any spend,
  and an experiment only where one can actually settle the question.
- **Multiple independent growth tracks get parallel dispatches**, one worktree each, rather than
  one dispatch trying to cover unrelated tracks at once.
