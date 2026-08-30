---
name: neuro-design
description: Apply neuroscience and cognitive-science principles when designing or building any UI, layout, flow, or visual — covering attention, cognitive load, perception & color, motor interaction, emotion, and typography. Use when creating, laying out, or improving an interface, choosing a visual hierarchy, or making design trade-offs.
---

# Neuro-Design

Design decisions grounded in how the brain actually perceives, attends, remembers, moves, feels, and reads. Each lens below is backed by a reference file of evidence-based principles (mechanism → evidence → design implications) with real citations. Read a lens's file when a decision touches it — the files use progressive disclosure so you only load what you need.

For reviewing an *existing* UI instead of building one, use the `neuro-design-audit` skill or delegate to the `neuro-design-reviewer` agent — both apply these same reference files.

## The six lenses

- **Attention & visual hierarchy** — pre-attentive pop-out, saliency, guided search, scan patterns, change blindness. One clear focal point; salience aligned to the user's goal. → `references/attention-and-hierarchy.md`
- **Cognitive load & memory** — working-memory limits (~4 chunks), cognitive load theory, chunking, Hick's law, recognition over recall, offloading, Zeigarnik. Cut extraneous load; keep choices few. → `references/cognitive-load-and-memory.md`
- **Perception, Gestalt & color** — Gestalt grouping, figure-ground, opponent-process color, contrast & color-vision deficiency, isolation effect. Group by structure, not borders; never rely on hue alone. → `references/perception-gestalt-color.md`
- **Motor control & interaction** — Fitts's law, steering law, response-time thresholds, Doherty threshold, feedback loops. Big/close targets; fast, felt feedback. → `references/motor-and-interaction.md`
- **Emotion, aesthetics & memory of experience** — emotional design levels, aesthetic-usability effect, peak-end rule, 50 ms first impressions, processing fluency, positive affect. Polish the first impression and the ending; ethics guardrails on reward mechanics. → `references/emotion-and-memory.md`
- **Reading & typography** — visual word form area, saccades & perceptual span, parallel letter recognition, crowding, print size & legibility. Familiar letterforms, comfortable measure and size. → `references/typography-and-reading.md`

Full sources: `references/bibliography.md`.

## The constants underneath the lenses

`references/foundations/perceptual-limits.md` is the tier below the six lenses: the fixed constants
they are guidance for — the ~2° high-acuity window, ~4 chunks of working memory, serial attention,
change blindness, Fitts's logarithmic pointing time, Hick–Hyman's logarithmic choice time, and the
100 ms / 1 s / 10 s response thresholds — plus the signal-detection argument that makes an
attention-claiming element that is usually not worth attending to a *negative* for the whole
channel. Read it when a finding is disputed: argue from the constant, and withdraw the finding when
the constant doesn't apply (an expert recalling rather than searching, a non-visual channel, an
interaction where slowing the user down is the point).

## Cross-domain lenses

Twenty adjacent fields whose research transfers to interface design. Each augments one or more core lenses and carries its own evidence and boundary conditions ("where the analogy breaks"). Read on demand.

**Foundational sectors:**

- **Behavioral economics & choice architecture** — defaults, framing, anchoring, decoy, choice overload, mental accounting, endowment/sunk-cost; ethical vs dark-pattern use. → `references/cross-domain/behavioral-economics.md`
- **Neuroaesthetics** — beauty correlates, curvature preference, averageness, fluency, MAYA/typicality, the golden-ratio myth. → `references/cross-domain/neuroaesthetics.md`
- **Human factors & safety-critical systems** — signal detection, human error, alarms, workload, automation bias, SEEV, checklists, mapping. → `references/cross-domain/human-factors-safety.md`
- **Multimedia learning & instructional design** — Mayer's principles, split-attention, worked examples, generative learning, testing & spacing (onboarding/docs). → `references/cross-domain/multimedia-learning.md`
- **Environmental psychology & wayfinding** — cognitive maps, Lynch's legibility elements, landmarks, survey vs route knowledge, attention restoration. → `references/cross-domain/wayfinding-spatial.md`
- **Motivation & game design** — flow, self-determination/PENS, overjustification, reward schedules, goal-gradient; ethics of gamification. → `references/cross-domain/motivation-game-design.md`
- **Social influence & persuasion** — reciprocity, social proof, authority, scarcity, ELM, reactance, inoculation; persuasion vs manipulation. → `references/cross-domain/social-influence-persuasion.md`
- **Multisensory, audio & haptics** — multisensory integration, crossmodal correspondences, earcons/auditory icons, sound symbolism, tactons. → `references/cross-domain/multisensory-audio-haptics.md`
- **Graphical perception & data visualization** — encoding rankings, preattentive attributes, ensemble coding, colormaps, chartjunk debate, deception. → `references/cross-domain/graphical-perception-dataviz.md`
- **Neurodiversity & inclusive cognition** — dyslexia, ADHD, autism, aging, low vision; curb-cut effect, evidence-based inclusive design and myth-busts. → `references/cross-domain/neurodiversity-inclusive.md`

**Extended sectors:**

- **Chronobiology, light & time-of-day** — circadian/melanopsin response, blue light, dark-mode polarity evidence, alertness by hour. → `references/cross-domain/chronobiology-light.md`
- **Embodied cognition & conceptual metaphor** — image schemas, spatial metaphor (up=more), grounding; skeuomorphism & gesture semantics. → `references/cross-domain/embodied-cognition.md`
- **Psycholinguistics & content design** — given-new, negation cost, garden-paths, readability limits, semantic illusions (microcopy). → `references/cross-domain/psycholinguistics-content.md`
- **Interruption science & attention economy** — interruption cost, resumption, breakpoints, task-switching; notification timing & ethics. → `references/cross-domain/interruption-attention.md`
- **Time perception & the psychology of waiting** — prospective/retrospective timing, Maister's principles, progress-bar dynamics. → `references/cross-domain/time-perception-waiting.md`
- **Habit formation & behavior change** — cue-based automaticity, time-to-habit, Fogg B=MAP, implementation intentions, COM-B/BCW; streaks/variable-reward ethics. → `references/cross-domain/habit-behavior-change.md`
- **Numerical cognition & risk communication** — number sense, natural frequencies, icon arrays, denominator neglect, numeracy. → `references/cross-domain/numerical-risk.md`
- **Trust, credibility & the uncanny valley** — uncanny valley, trust calibration, media equation, anthropomorphism, algorithm aversion. → `references/cross-domain/trust-uncanny-valley.md`
- **Cross-cultural cognition & perception** — holistic vs analytic attention, reading direction/RTL, color symbolism; anti-stereotype limits. → `references/cross-domain/cross-cultural.md`
- **Evolutionary perception & supernormal stimuli** — face detection/pareidolia, baby-schema, threat detection; ethics of evolved biases. → `references/cross-domain/evolutionary-perception.md`

Each core reference file also ends with `## Deeper dive (v2)` and `## Deeper dive (v3)` sections; each cross-domain file carries a `## Deeper dive (v3)` extension. All add further principles, effect sizes, and cross-links.

## Quick checklist (highest-leverage rules)

Apply these by default; open the matching reference file when a decision needs depth or a citation.

1. **One focal point per view.** Encode the single most important element with one pre-attentive channel (contrast, size, or position); don't stack competing pop-outs — they cancel. *(attention)*
2. **Keep primary choices to ~4 chunks.** Segment or progressively disclose long option lists to cut decision time. *(cognitive load — Hick)*
3. **Prefer recognition over recall.** Show the options; don't make users remember commands or prior state. *(cognitive load)*
4. **Group by structure, not lines.** Use proximity and common region before adding borders or dividers. *(Gestalt)*
5. **Never signal meaning by hue alone.** Pair color with icon/text/shape; meet WCAG contrast (4.5:1 body text, 3:1 large text & UI components). *(perception/color)*
6. **Targets ≥ 44 px / 48 dp.** Place frequent actions near the pointer or at screen edges/corners (effectively infinite size). *(motor — Fitts)*
7. **Feedback under 100 ms; progress beyond ~1 s.** Aim for perceived response under ~400 ms (skeleton screens, optimistic UI). *(motor — response-time / Doherty)*
8. **Engineer the first impression and the ending.** Visual appeal is judged in ~50 ms; memory of an experience is dominated by its peak and its end. *(emotion — first impression, peak-end)*
9. **Legible body text.** ~16 px minimum, line length ~45–75 characters, adequate leading; avoid ALL-CAPS for long passages. *(typography)*
10. **Maximize processing fluency — ethically.** Simple, legible, familiar patterns build trust and perceived usability; never use reward/loss-aversion mechanics as dark patterns. *(emotion / ethics)*

## How to use this skill

1. Identify which lenses the current design decision touches (often 2–3).
2. Read those reference files and apply their `## Design checklist`.
3. When you make a trade-off, name the principle behind it (and its citation key) so the reasoning is auditable.
