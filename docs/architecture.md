# Architecture

How this plugin's skills and agents dispatch each other, and the shared pattern the
review/audit-shaped ones use to iterate toward a converged result.

## Dispatch graph

Every peer-dispatch edge below runs synchronously (`run_in_background: false`), report-only,
one hop at a time (a subagent never re-dispatches whoever dispatched it), under a shared
depth cap of 5 nested dispatches. These rules are stated per-agent in each file; they apply
uniformly to every edge in this graph, so they're stated once here instead of five times.

```mermaid
graph LR
  subgraph Skills["Skills (user-facing entry points)"]
    capture-learnings
    prd
    growth
    gtm
    lollapalooza
    software-architecture
    neuro-design
    neuro-design-audit
    commit
  end

  subgraph Agents["Agents (dispatched by skills or peers)"]
    librarian
    product-strategist
    growth-marketer
    gtm-engineer
    software-architect
    neuro-design-reviewer
  end

  subgraph External["External (other installed plugins)"]
    code-architect["feature-dev:code-architect"]
    brainstorming["superpowers:brainstorming"]
  end

  capture-learnings --> librarian
  prd --> product-strategist
  growth --> growth-marketer
  gtm --> gtm-engineer
  lollapalooza -.router.-> software-architect
  lollapalooza -.router.-> growth-marketer
  lollapalooza -.router.-> neuro-design-reviewer
  lollapalooza -.router.-> product-strategist
  software-architecture -.delegate for isolated pass.-> software-architect
  neuro-design -.delegate for isolated pass.-> neuro-design-reviewer
  neuro-design-audit -.shares reference files with.-> neuro-design-reviewer

  product-strategist -->|Ideate, parallel| gtm-engineer
  product-strategist -->|Ideate, parallel| growth-marketer
  product-strategist -->|Ideate, parallel| neuro-design-reviewer
  product-strategist -->|Prototype| code-architect
  prd -.hands off after approval.-> brainstorming

  growth-marketer <-->|one-hop max, never re-dispatch caller| gtm-engineer
  gtm-engineer -->|flow/retention question| neuro-design-reviewer
```

**Terminal nodes** — no outgoing peer-dispatch of their own: `software-architect`,
`neuro-design-reviewer`, `librarian`.

**The one non-obvious edge**: `growth-marketer` and `gtm-engineer` dispatch each other —
`growth-marketer` treats `gtm-engineer` as its "primary chain" for build work; `gtm-engineer`
dispatches `growth-marketer` for a strategy pass before building. This isn't a clean DAG edge.
It stays safe only because both files independently state the same two rules (one hop is the
norm; never re-dispatch whoever dispatched you) — this doc is where that mutual relationship
is visible in one place instead of split across two files' prose.

`commit` has no outgoing edges — it's fully self-contained.

## The loop-until-converged pattern

Four skills/agents in this plugin do review or audit work where a single pass isn't always
the end of the story: findings come back, some get fixed, and the fix should be re-checked
rather than taken on faith. Each uses the same four-step shape (the same shape
`superpowers:subagent-driven-development`'s fix-loop already uses for reviewing implementation
tasks, generalized here to a skill/agent looping on its own output):

1. **Round counter** starts at 1.
2. **Convergence check** — adopter-specific (see below). If met, stop and report success.
3. **If not met and round < cap** — take the round's action (adopter-specific: apply an
   approved fix, dispatch one more lens, etc.), increment the round, return to step 2.
4. **At the cap** — do not force a false convergence. Report the residual — what's still
   open, and why — and let the user decide what happens next. Never claim a clean result when
   the cap was hit with issues still open.

Each adopter states only its own convergence condition, cap, and per-round action, and points
back to this section — the four-step shape itself isn't restated per adopter.

### Adopters

| Adopter | Convergence | Cap | Per-round action |
| --- | --- | --- | --- |
| `neuro-design-audit` skill | No lens scored `Blocking` remains | 3 rounds | Apply approved fixes for current `Blocking` findings, re-run the six-lens audit |
| `software-architect` agent (review mode) | No rule verdict is `real gap` (only `compliant`/`premature` remain) | 3 rounds | Scaffold the approved fix for current `real gap` findings, re-review against the same rule set |
| `capture-learnings` skill (lint mode) | `node .claude/memory/check.mjs` exits 0 and no unresolved contradiction/stale-claim/orphan/dangling-link remains | 3 rounds | Apply approved fixes, re-run the full lint pass |
| `lollapalooza` skill (Step 3) | Two or more independent lenses agree, or every applicable lens from the lens-mapping table has been dispatched | Bounded by the lens-mapping table itself (at most ~5 lenses) rather than a separate number | Dispatch the next applicable undispatched lens, re-run the synthesis |
