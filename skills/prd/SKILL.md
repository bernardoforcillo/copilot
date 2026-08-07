---
description: Use when the user wants to define a new product feature — turn a raw idea or problem into a rigorous PRD through a design-thinking process before any technical design — or invokes /prd <feature>. Facilitates the dialogue in the main loop and dispatches the product-strategist subagent for the heavy research passes.
---

# PRD

`/prd → docs/superpowers/prd/YYYY-MM-DD-<feature>.md → superpowers:brainstorming → spec → writing-plans`

This skill is the **facilitator**: it runs in the main loop, holds the dialogue with the user,
and owns the two human gates (problem-lock, PRD-approval). It never does the heavy research
itself — for each design-thinking phase that needs real digging, it dispatches the
`product-strategist` subagent (`Agent` tool, `subagent_type: "product-strategist"`, plain — no
worktree, since that agent edits nothing) and relays a condensed version of what comes back.
The output is a single file, `docs/superpowers/prd/YYYY-MM-DD-<feature>.md`, written using the
template below. Once the user approves it, this skill hands off to `superpowers:brainstorming`
to turn the approved PRD into a technical spec, which then feeds `writing-plans`.

## When NOT to use this

- **A bug or a purely technical change** — no new product surface, just fixing or refactoring
  something that already exists. Use `superpowers:systematic-debugging` for the bug case, or go
  straight to `superpowers:brainstorming` for a technical change that needs no product framing.
- **Pure GTM/marketing execution** — positioning, landing copy, launch docs with no new product
  behavior involved. Use `/gtm`.
- **Growth strategy execution** — acquisition, retention, or referral work against an existing
  feature. Use `/growth`.
- **A tiny, already-well-understood tweak** — the why/who/what/success are already obvious and
  agreed. Skip the PRD and go straight to `superpowers:brainstorming`.

This skill exists for one job: defining a new feature's why, who, what, and success criteria
*before* any solutioning starts. If that framing work is already done or isn't needed, route
around it rather than forcing every request through nine steps.

## Procedure

Nine steps, two of them hard gates. Steps 1, 4, and 5 dispatch `product-strategist`; the rest
stay in the main loop with the user.

**0. Kick off** (main loop)
Restate the user's idea back in one line to confirm shared understanding. Confirm this is
genuinely a product-definition task — if it matches one of the "when NOT to use this" cases
instead, route there now, before spending any dispatch budget.

**1. Empathize** — dispatch `product-strategist`
Send an Empathize brief: the idea as given, plus whatever context the user has already supplied
(existing docs, prior conversations, constraints). The agent surveys the current product
surface, runs a JTBD Switch Interview reconstruction, and pulls real usage evidence if an
analytics tool is available. Relay a condensed version of its evidence pack back to the user —
the sharpened who and the sharpened pain — not the raw report.

**2. GATE 1 — problem-lock** (human gate)
Present the problem statement, the job-to-be-done, and who it's for. Get explicit user
confirmation before any ideation starts — this is a hard stop, not a formality. Where the
framing forks into distinct options (which persona is primary, which problem framing to run
with), use `AskUserQuestion` to make the user's choice crisp and explicit rather than assuming.

**3. Define** (main loop, with the user — no dispatch)
Synthesize a sharp problem statement, a "How Might We" reframing, and success criteria directly
with the user. `product-strategist` fed the evidence in step 1; this step is where that evidence
gets turned into decisions, in the room, with the person who owns them. If `product-strategist`'s
Empathize pass suggested it, optionally use the PRFAQ format (mock press release + FAQ) as the
synthesis artifact bridging Define into Ideate/Prototype.

**4. Ideate** — dispatch `product-strategist`
The agent peer-dispatches three lenses in parallel, each strictly report-only: `growth-marketer`
for acquisition, network effects, and referral implications; `gtm-engineer` for positioning,
messaging, and how the thing gets found once it ships; and `neuro-design-reviewer` for
in-product flow, activation, and retention mechanics. Present 2-3 candidate approaches back to
the user with their trade-offs laid out side by side, plus a recommendation — the synthesis, not
three raw sub-reports stapled together.

**5. Prototype** — dispatch `product-strategist`
The agent runs an anti-confirmation-bias gate (Assumption Mapping + a Riskiest Assumption Test)
before touching feasibility at all, then dispatches `feature-dev:code-architect`, explicitly
grounded in the project's own existing conventions — going 80→100 on what's already there is the
default; a new stack or pattern needs a stated reason. Present the high-level technical shape and
an MVP-vs-later scope cut to the user, phased in build order for any feature that spans more than
one layer: data model/contracts first, then backend wiring, then UI/polish last.

**6. Test** (main loop — no dispatch)
Draft success metrics and a measurement plan with the user, using whatever analytics convention
the project already has, or a minimal proposed taxonomy if it has none — snake_case
`object_verb` past-tense events, no PII, no invented metrics. If the user wants a concrete
validation method, offer Superhuman's PMF-survey approach (segment by *why* respondents would be
disappointed, 40%+ "very disappointed" as the traction bar) as the default.

**7. Write the PRD**
Write `docs/superpowers/prd/YYYY-MM-DD-<feature>.md` using the template below, filled from
everything gathered in steps 1-6.

**8. GATE 2 — PRD-approval** (human gate)
Ask the user to review the written file. Revise on request, looping back to whichever step needs
correcting — this gate can bounce back into Ideate, Prototype, or Test as many times as the user
needs before signing off.

**9. Hand-off**
Once approved, offer to hand the PRD to `superpowers:brainstorming` to develop the technical
spec. This skill's job ends at an approved PRD; it does not do the technical design itself.

## PRD template (9 sections)

Write the output file using this structure:

```markdown
# <Feature name>

## 1. Problem & context
The problem, who it affects, why it matters now, and the evidence behind that claim (from the
Empathize pass).

## 2. Users & JTBD
The persona(s) and their job-to-be-done. Link to the project's memory wiki (`.claude/memory/`)
if it has one and already defines these personas — extend, don't re-invent.

## 3. How Might We
The reframing statement(s) that turn the problem into a direction for ideation.

## 4. Goals & non-goals
What this feature is for, and explicitly what it is not for — apply YAGNI. A non-goal is worth
as much ink as a goal.

## 5. Approaches considered
2-3 candidate approaches surfaced during Ideate, each viewed through the three lenses
(acquisition, positioning, in-product UX), their trade-offs, and the recommendation with
reasoning.

## 6. Scope: MVP -> later
The feasibility read from `feature-dev:code-architect`, phased in build order for any
cross-layer feature (data model/contracts -> backend wiring -> UI/polish), with explicit
in-scope/out-of-scope per phase. Note where any new client-side state should live, if applicable.

## 7. Success metrics & measurement
The metrics that define success, and the events/funnels needed to instrument them.

## 8. Risks & open questions
Leap-of-faith assumptions still untested, unresolved forks, anything the evidence didn't settle.

## 9. Hand-off
Pointer to the technical spec produced by `superpowers:brainstorming`. Left empty until that
hand-off happens, then filled in with a link.
```

## Rules

- **Router, not shotgun.** Dispatch only the specialists a given phase actually needs. Never
  fire the whole panel (`gtm-engineer`, `growth-marketer`, `neuro-design-reviewer`,
  `feature-dev:code-architect`) on every pass — Ideate needs the three lenses, Prototype needs
  the architect, and that's the extent of it.
- **Ground feasibility in what exists.** Prototype's technical read builds on the project's own
  existing foundation, not a blank slate. A new stack or pattern is a deviation that needs a
  stated reason, not a default.
- **Two hard gates only.** Problem-lock and PRD-approval are the only points where this skill
  must stop and wait. Everything between them flows without a formal stop — though the user can
  interrupt at any point, gate or not.
- **Report-only, always.** Every specialist dispatched during a PRD run — `product-strategist`
  and everything it peer-dispatches — edits nothing. Relay one consolidated view back to the
  user; never dump every raw sub-report into the conversation.
- **Never commit.** The PRD lives at `docs/superpowers/prd/YYYY-MM-DD-<feature>.md` as a
  working-tree file the user reviews and commits themselves. This skill does not run `git add`
  or `git commit` on it.
