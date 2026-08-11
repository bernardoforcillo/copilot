---
name: neuro-design-audit
description: Audit an existing UI (screenshot, live URL, description, or front-end code) against neuroscience-of-design principles and return prioritized, scored findings. Use when reviewing, critiquing, or improving an existing interface.
---

# Neuro-Design Audit

Review a UI against six evidence-based lenses and return a prioritized, actionable findings report. This skill shares its knowledge base with the `neuro-design` skill and the `neuro-design-reviewer` agent — the principles live in one place and are read on demand.

## When to use

- Reviewing or critiquing an existing screen, flow, component, or landing page.
- Deciding what to improve first on a UI that already exists.
- Producing a second-opinion design review with citations.

For designing something new (rather than auditing something that exists), use the `neuro-design` skill instead.

## Inputs to gather first

1. **The artifact** — a screenshot/image, a live URL, front-end code, or a written description of the UI.
2. **The design's goal** — the primary user task or business objective. Findings are judged against this goal; "reduce salience of X" is only a defect if X isn't the goal.
3. **Context** — platform (web/iOS/Android/desktop), audience, and any constraints.

If the goal is missing, ask for it before scoring — severity depends on it.

## The six lenses

Load the matching reference file on demand (progressive disclosure) and check the artifact against its `## Design checklist`:

| Lens | Reference file |
| :--- | :--- |
| Attention & visual hierarchy | `${CLAUDE_PLUGIN_ROOT}/skills/neuro-design/references/attention-and-hierarchy.md` |
| Cognitive load & memory | `${CLAUDE_PLUGIN_ROOT}/skills/neuro-design/references/cognitive-load-and-memory.md` |
| Perception, Gestalt & color | `${CLAUDE_PLUGIN_ROOT}/skills/neuro-design/references/perception-gestalt-color.md` |
| Motor control & interaction | `${CLAUDE_PLUGIN_ROOT}/skills/neuro-design/references/motor-and-interaction.md` |
| Emotion, aesthetics & memory | `${CLAUDE_PLUGIN_ROOT}/skills/neuro-design/references/emotion-and-memory.md` |
| Reading & typography | `${CLAUDE_PLUGIN_ROOT}/skills/neuro-design/references/typography-and-reading.md` |

For domain-specific artifacts, also consult the matching cross-domain file in `${CLAUDE_PLUGIN_ROOT}/skills/neuro-design/references/cross-domain/` — e.g. `graphical-perception-dataviz.md` for charts/dashboards, `neurodiversity-inclusive.md` for accessibility, `human-factors-safety.md` for alarms/error-prone flows, `behavioral-economics.md` and `social-influence-persuasion.md` to check for dark patterns.

## Workflow

1. **Gather** the three inputs above.
2. **Per lens**, read its reference file and evaluate the artifact against each checklist item. Note concrete observations tied to specific elements ("the primary CTA and the newsletter banner have equal salience").
3. **Score each lens** — `Pass` (no meaningful issue) · `Minor` (works, could be better) · `Blocking` (measurably hurts the stated goal) — with a one-line justification.
4. **Rank findings** by severity, then by impact on the stated goal.
5. **Output** using the template below.

## Output template

```
## Neuro-design audit — <artifact name>
Goal: <the design goal used to judge findings>

### Lens scores
- Attention & hierarchy: <Pass|Minor|Blocking> — <one line>
- Cognitive load & memory: <Pass|Minor|Blocking> — <one line>
- Perception, Gestalt & color: <Pass|Minor|Blocking> — <one line>
- Motor & interaction: <Pass|Minor|Blocking> — <one line>
- Emotion & memory: <Pass|Minor|Blocking> — <one line>
- Reading & typography: <Pass|Minor|Blocking> — <one line>

### Prioritized findings
| # | Severity | Lens | Finding (what & where) | Principle | Recommended fix |
|---|----------|------|------------------------|-----------|-----------------|
| 1 | Blocking | ... | ... | <name + cite key, e.g. Fitts's law [FITTS-54]> | ... |

### Top 3 highest-impact fixes
1. ...
2. ...
3. ...
```

## Rules

- Every finding names the principle it rests on and its bibliography cite key (from the reference file's `Cite:` lines). Do not invent principles or citations.
- Stay within the stated goal; flag aesthetic preferences as `Minor` at most unless they demonstrably harm the goal.
- Prefer specific, buildable fixes ("increase primary CTA contrast to ≥3:1 and remove the competing banner outline") over vague advice ("improve hierarchy").

## Loop

If the user wants findings fixed rather than just reported, this audit loops instead of
stopping at one pass — see the shared loop-until-converged pattern in
`../../docs/architecture.md`. Convergence here means no lens scored `Blocking` remains; the
cap is 3 rounds. Each round: apply the user-approved fixes for the current `Blocking`
findings, then re-run the six-lens audit against the updated artifact. At the cap, report the
remaining `Blocking`/`Minor` findings as residual — never report an artifact as passing while
a `Blocking` finding is still open.
