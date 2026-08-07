# Cognitive load & memory

Working memory is small, effortful, and easily overloaded — every design choice either spends that scarce budget or protects it.

## Working-memory capacity (Miller, 1956; Cowan, 2001)
**Mechanism:** Working memory holds only a small number of discrete items or "chunks" simultaneously available for conscious manipulation. Capacity is limited by number of chunks, not by the raw complexity of each chunk, because chunking recodes information into fewer, larger units.
**Evidence:** Miller (1956) surveyed absolute-judgment and memory-span experiments across many stimulus dimensions (digits, letters, tones) and found a recurring capacity ceiling of about 7±2 items — "The Magical Number Seven, Plus or Minus Two." Cowan (2001) reviewed later work that controlled for covert rehearsal and chunking strategies (running memory span, visual-array tasks) and concluded the pure capacity of the focus of attention, once strategic recoding is prevented, is closer to 3–5 items, commonly cited as "the magical number 4."
**Design implications:**
- Limit simultaneously presented unrelated options or fields to roughly 4–7 chunks; group related items so users perceive fewer chunks than the raw count.
- Chunk long identifiers (phone numbers, codes, card numbers) into blocks of 3–4 characters rather than one long string.
- Avoid designs that require holding more than a handful of unlabeled state changes in mind between screens.
**Cite:** [MILL-56] [COWA-01]

## Cognitive load theory (Sweller, 1988; Sweller, van Merriënboer & Paas, 1998)
**Mechanism:** Working memory's narrow capacity and duration mean that when intrinsic task complexity, extraneous demands imposed by poor presentation, and germane processing that builds schemas together exceed capacity, learning and performance degrade. Good design minimizes extraneous load so capacity remains available for germane, schema-building processing.
**Evidence:** Sweller (1988) showed that conventional problem-solving strategies such as means-ends analysis impose heavy working-memory load compared to goal-free or worked-example problems, and that this extra load impairs schema acquisition — participants using means-ends analysis solved problems but transferred worse to new problems. Sweller, van Merriënboer & Paas (1998) formalized this into full cognitive load theory with the intrinsic/extraneous/germane taxonomy and instructional consequences, including the worked-example, split-attention, and redundancy effects.
**Design implications:**
- Strip extraneous decoration, redundant labeling, and split-attention layouts (e.g., a legend positioned far from the chart it explains).
- Provide worked examples or templates for first-time complex tasks rather than requiring users to solve them unaided.
- Match interface complexity to task complexity; simplify or scaffold before intrinsic load is already high, not after.
**Cite:** [SWEL-88] [SWEL-98]

## Chunking & expertise (Chase & Simon, 1973)
**Mechanism:** Experts do not have larger raw working-memory capacity than novices; they perceive and encode domain-specific patterns as single meaningful chunks, so each working-memory slot carries far more information.
**Evidence:** Chase & Simon's classic chess study found masters reproduced briefly viewed, game-derived board positions far more accurately than novices, but this advantage disappeared when pieces were arranged randomly — masters then recalled about as few chunks as novices. The advantage came entirely from larger, pattern-based chunks built from thousands of hours of exposure, not from a bigger memory span.
**Design implications:**
- Use recognizable, real-world-mapped naming and iconography so novices can start chunking information faster.
- Offer denser, pattern-based views (compact tables, structured dashboards) for expert/power-user modes, since experienced users chunk familiar structured data efficiently — without forcing that density on novices.
- Keep visual "chunks" (card layouts, icon groupings, list item structure) consistent across a product so returning users accumulate pattern recognition over time.
**Cite:** [CHAS-73]

## Hick–Hyman law (Hick, 1952; Hyman, 1953)
**Mechanism:** Reaction time to choose among options grows logarithmically, not linearly, with the number of equiprobable choices, because decision time tracks the information (in bits) that must be resolved to identify the correct option.
**Evidence:** Hick (1952) measured choice-reaction time across varying numbers of stimulus–response alternatives and found RT ≈ a + b·log₂(n), matching an information-theoretic account. Hyman (1953) manipulated the probability and sequential predictability of stimuli and confirmed reaction time tracks actual transmitted information rather than raw alternative count — frequent or predictable options are selected faster even within a large set.
**Design implications:**
- Reduce the number of equally weighted, flat top-level choices in menus and navigation; use hierarchy or progressive disclosure instead.
- Make the most probable or frequent action the fastest to reach — defaults, recents, and pinned items reduce effective decision entropy.
- Structure choices into stages so users resolve them sequentially rather than scanning one large flat set at once.
**Cite:** [HICK-52] [HYMA-53]

## Recognition over recall (Standing, 1973; Nielsen, 1994)
**Mechanism:** Recognition (matching a presented option against what is stored) draws on fast, high-capacity perceptual matching, while recall (generating an answer from memory with no cue) is slow and capacity-limited. Interfaces that let users recognize the right choice among visible options impose far less cognitive burden than ones requiring recall of commands, names, or prior state.
**Evidence:** Standing (1973) showed participants up to 10,000 photographs over several days and found recognition accuracy remained remarkably high even at very large set sizes, demonstrating the huge capacity of recognition memory for pictures relative to the tiny capacity of recall. Nielsen (1994) codified "recognition rather than recall" as one of the ten usability heuristics, arguing that making objects, actions, and options visible — instead of requiring users to remember information across screens or commands — reduces memory load and errors.
**Design implications:**
- Show available actions and options visibly (menus, visible commands) instead of relying on users to remember hidden shortcuts or syntax.
- Preserve context and breadcrumbs so users recognize where they are rather than recalling a navigation path.
- Use recognizable icons, thumbnails, and previews instead of requiring users to recall file names, IDs, or exact wording.
**Cite:** [STAN-73] [NIEL-94]

## Cognitive offloading (Risko & Gilbert, 2016; Sparrow, Liu & Wegner, 2011)
**Mechanism:** People routinely reduce internal cognitive demand by using the physical or digital environment to store and manipulate information rather than doing it entirely "in the head" — an adaptive strategy that changes what gets encoded internally versus encoded only as "where to find it."
**Evidence:** Risko & Gilbert (2016) reviewed offloading across memory, perception, and decision-making (e.g., rotating an object instead of mentally rotating it, using reminders and lists) and framed it as a rational trade-off between internal cognitive cost and external tool cost. Sparrow, Liu & Wegner (2011), "Google effects on memory," found that when people expect information to remain accessible (e.g., saved on a computer), they show poorer recall of the information itself but better recall of where to find it again — memory adapts to treat reliably available external stores as an extension of itself.
**Design implications:**
- Provide reliable persistent state (undo, history, saved drafts, search) so users can safely offload instead of holding information in their heads.
- Design for "where did I put it" retrieval — search, recents, breadcrumbs — rather than expecting users to recall exact values or prior configurations.
- When something truly must be remembered internally (e.g., a one-time code to enter elsewhere), don't assume the interface will still be visible at the moment of recall — surface it again at the point of need.
**Cite:** [RISK-16] [SPAR-11]

## Zeigarnik effect (Zeigarnik, 1927; MacLeod, 2020)
**Mechanism:** Interrupted or incomplete tasks stay more cognitively accessible and intrusive in memory than completed ones, because an unresolved goal maintains a state of tension that biases attention and recall back toward it until it is finished.
**Evidence:** Zeigarnik's original studies (1927) found participants recalled interrupted tasks roughly twice as often as completed ones in free recall. MacLeod (2020) revisits the Zeigarnik effect alongside the related von Restorff isolation effect, tracing the historical record and later replication attempts, and finds the core interruption-recall advantage broadly supported but moderated by factors such as ego-involvement, interruption timing, and task meaningfulness — not a fixed, context-free constant.
**Design implications:**
- Use visible progress indicators and incomplete-state cues (progress bars, unread badges, "continue where you left off") to respect — not exploit — the pull of unfinished tasks.
- Persist and resurface interrupted flows (saved drafts, resumable checkout) since users are primed to want to return to them.
- Avoid manufacturing artificial incompleteness (fake progress, "you're almost done!" nags with no real state) purely to induce anxiety-driven return visits.
**Cite:** [ZEIG-27] [MACL-20]

## Design checklist
- Limit simultaneous unrelated choices or fields to roughly 4–7 chunks; group and label so users perceive fewer chunks than the raw count.
- Strip extraneous visual and interaction complexity before adding features; reserve added complexity for what genuinely helps users build a correct mental model.
- Reuse consistent, recognizable visual and interaction patterns so returning users build expertise-driven chunking over time.
- Keep top-level menus and navigation shallow; put the most probable actions closest and fastest to reach.
- Show options and prior context rather than requiring recall — visible menus, previews, breadcrumbs, recent items.
- Provide durable, retrievable state (history, undo, search) so users can safely offload instead of mentally holding information.
- Persist and resurface interrupted or incomplete flows respectfully, without manufacturing false urgency to exploit the pull of unfinished tasks.

## Deeper dive (v2)

## Multicomponent working memory & the episodic buffer (Baddeley & Hitch, 1974; Baddeley, 1992, 2000)
**Mechanism:** Working memory is not a single unitary store but a multicomponent system: a central executive that allocates attention and control, a phonological loop that maintains verbal/acoustic information through subvocal rehearsal, a visuospatial sketchpad that maintains visual/spatial information, and — added later — an episodic buffer that integrates information from the loop, the sketchpad, and long-term memory into unified, multimodal episodes.
**Evidence:** Baddeley & Hitch (1974) replaced the earlier unitary short-term-store model using dual-task experiments showing that concurrent verbal and spatial tasks interfere with each other far less than two same-modality tasks do, implying separate slave subsystems. Baddeley (1992) reviewed a decade of supporting evidence for the three-component model, including neuropsychological dissociations between verbal and spatial deficits. Baddeley (2000) added the episodic buffer to explain integration effects the original model couldn't — such as prose recall exceeding the phonological loop's span — proposing a limited-capacity store that binds information across modalities and links it to long-term memory.
**Design implications:**
- Verbal/textual load and visuospatial load draw on separate working-memory subsystems; pairing a diagram with spoken or sequenced narration causes less same-channel competition than pairing a diagram with on-screen text the user must read at the same time.
- A secondary task in a different modality (e.g., a voice command while viewing a visual dashboard) interferes less than two competing visual tasks — but a genuine central-executive bottleneck (decision-making, task-switching) still competes regardless of modality.
- Do the integration work of the episodic buffer for the user: combine text, image, and context into one coherent unit (e.g., an itemized receipt with both visual and textual summary) rather than forcing users to mentally bind separate representations.
**Cite:** [CLM-BADH-74] [CLM-BADD-92] [CLM-BADD-00]

## Measuring cognitive load & germane load (Paas, 1992; Paas & van Merriënboer, 1994)
**Mechanism:** Because cognitive load is an internal, unobservable state, it is commonly estimated through subjective self-report (mental-effort rating scales) or performance/transfer measures. "Germane load" specifically denotes effortful processing that builds durable schemas — desirable load — as distinct from extraneous load, which is wasted effort caused by poor presentation.
**Evidence:** Paas (1992) validated a 9-point subjective mental-effort rating scale administered immediately after a task; it correlated with training-strategy manipulations and predicted transfer performance in statistics training, establishing a simple, practical load measure. Paas & van Merriënboer (1994) manipulated worked-example variability (low vs. high variability practice) and found that high-variability practice produced better transfer-test performance at comparable or only slightly higher invested mental effort — evidence that some increases in load are germane (schema-building) rather than wasteful, and the basis for an "instructional efficiency" metric combining performance and effort.
**Design implications:**
- When evaluating how hard a flow is, don't rely on completion time alone; pair it with a quick post-task effort rating to distinguish "fast but straining" from "fast and easy."
- Distinguish load that helps users build lasting understanding (varied practice, meaningful decision points) from load that is pure friction (confusing labels, inconsistent placement); cut the latter, not necessarily the former.
- When simplifying a flow, verify what was removed was extraneous load — not the germane load that actually helps first-time users form a correct mental model.
**Cite:** [CLM-PAAS-92] [CLM-PAAS-94]

## Attention residue (Leroy, 2009)
**Mechanism:** When people switch from one task to another without completing the first, part of their attention remains fixated on the unfinished task — "attention residue" — degrading performance on the subsequent task. This is distinct from ordinary task-switching overhead: the residue lingers because the incomplete goal continues to draw cognitive resources.
**Evidence:** Leroy (2009) had participants switch between tasks either after completing Task A or after being interrupted mid-Task A, and found performance on the following Task B was reliably worse following an incomplete switch, with the effect larger when Task A was more complex or deadline-driven. Simply instructing participants to focus on Task B did not eliminate the residue.
**Design implications:**
- Support reaching a clear, deliberate stopping point (or full completion) before a workflow switches context, rather than silently interrupting mid-task.
- When an interface must interrupt (a modal, a notification), give users a fast way to capture or save state so the "unfinished" feeling resolves rather than lingering into the next task.
- Avoid designs that force frequent switching between cognitively demanding tasks (e.g., constant toggling between a form and a lookup panel).
**Cite:** [CLM-LERO-09]

## Serial position effect (Murdock, 1962)
**Mechanism:** In free recall of a list, items near the beginning (primacy) and the end (recency) are remembered better than items in the middle, because early items receive more rehearsal into long-term memory while late items are still resident in short-term memory at test.
**Evidence:** Murdock (1962) varied list length and presentation rate in free-recall experiments and plotted the classic U-shaped serial position curve, showing primacy and recency as separable effects — recency collapses when a delay or distractor task intervenes before recall, while primacy does not — an early empirical anchor for distinguishing short-term from long-term memory stores.
**Design implications:**
- Place the most important item first, where encoding is strongest, and the most actionable or urgent item last, where availability at decision time is highest, in lists, menus, and summaries.
- Don't bury critical options or information in the middle of a long list — that position is recalled worst.
- If a delay or distraction (e.g., a follow-up dialog) will separate a list from the user's next decision, expect the recency advantage to fade; bring the relevant item back into view rather than relying on memory of "the last thing I saw."
**Cite:** [CLM-MURD-62]

**See also (cross-domain):** [`../cross-domain/multimedia-learning.md`](../cross-domain/multimedia-learning.md) · [`../cross-domain/behavioral-economics.md`](../cross-domain/behavioral-economics.md) · [`../cross-domain/human-factors-safety.md`](../cross-domain/human-factors-safety.md)

## Deeper dive (v3)

## Template theory & chess memory (Gobet & Simon, 1996)
**Mechanism:** Extending chunking theory, expert memory in structured domains relies not just on simple chunks but on higher-order "templates" — chunks with open slots that can be rapidly filled with variable information — letting experts encode and retrieve far more information per fixation than a chunk-only account predicts.
**Evidence:** Gobet & Simon (1996) showed chess masters could reproduce several simultaneously presented board positions, not just one, with accuracy far exceeding what fixed chunk-capacity limits alone would allow. They modeled this with templates — chunks containing open slots — that let masters store multiple boards' worth of information as one integrated schema, extending Chase & Simon's original chunking account.
**Design implications:**
- For expert/power-user interfaces used repeatedly with structured data, design consistent "template" layouts with fixed slots for variable data (e.g., a stable dashboard-card format), letting returning users build template-level pattern recognition rather than only item-level recognition.
- Expect expertise effects to compound: experienced users of a specific, consistent structured interface may handle far more simultaneous state than novice-facing complexity budgets assume — but only because of repeated exposure to a consistent template, not innate capacity.
**Cite:** [CLM2-GOBE-96]

## Ego depletion — and its replication boundary (Baumeister, Bratslavsky, Muraven & Tice, 1998; Hagger et al., 2016)
**Mechanism:** The original ego-depletion model proposed that self-control draws on a shared, limited internal resource, so exerting self-control on one task depletes what's available for a subsequent, unrelated self-control task.
**Evidence:** Baumeister et al. (1998) reported experiments (e.g., resisting a radish/cookie temptation, then persisting on unsolvable puzzles) in which participants who exerted self-control on an initial task gave up faster or performed worse on a later, unrelated self-control task, framing willpower as a depletable resource. However, Hagger, Chatzisarantis et al. (2016) ran a large, preregistered multi-lab replication of a canonical depletion paradigm across thousands of participants and found no significant depletion effect overall — a result that substantially undercut confidence in the size and robustness of the original effect and became a landmark case in psychology's replication crisis.
**Design implications:**
- Treat "willpower depletion" as a contested, non-robust mechanism; do not justify design choices (e.g., "wear down users' resistance to increase conversions") on ego depletion as if it were settled science.
- Prefer better-replicated mechanisms — working-memory limits, cognitive load, attention residue — over ego-depletion framing when justifying "reduce decision fatigue" design rationale.
- If citing "decision fatigue" to stakeholders, flag it as a popular but empirically contested claim rather than an established finding.
**Cite:** [CLM2-BAUM-98] [CLM2-HAGG-16]

## Picture superiority & dual coding (Paivio, 1971; Nelson, Reed & Walling, 1976)
**Mechanism:** Dual-coding theory holds that verbal and nonverbal (imagery) information are processed and stored through two partially independent, interconnected systems. Pictures tend to be encoded in both systems — as an image and, via naming, verbally — while words are encoded primarily verbally, giving pictures an extra retrieval pathway and, generally, a memory advantage over words.
**Evidence:** Paivio (1971) established dual-coding theory with extensive experimental evidence that concrete, imageable words are recalled and recognized better than abstract words, and pictures better still. Nelson, Reed & Walling (1976) directly tested the "picture superiority effect" and found pictures recognized and recalled more accurately than their corresponding words even when nameability and meaning were controlled, localizing the advantage to encoding — pictures are encoded with richer, more distinctive detail than words, not merely retrieved differently.
**Design implications:**
- Pair critical labels or actions with distinctive icons or imagery rather than text alone; the redundant, dual-coded representation is more recognizable and memorable later than text alone.
- Use meaningful, distinctive imagery for content users need to find again later (e.g., visually distinct document or file thumbnails) rather than uniform icons or text-only lists.
- Don't use this to justify decorative images with no informational content — the effect depends on meaningful, distinctive pictorial encoding of the content itself, not visual clutter.
**Cite:** [CLM2-PAIV-71] [CLM2-NELS-76]

## Prospective memory (McDaniel & Einstein, 2000)
**Mechanism:** Prospective memory — remembering to perform a planned action at a future point ("when I see X, do Y") — relies on two distinct processes: a strategic, resource-demanding monitoring process that keeps the intention actively in mind, and a more automatic process where a salient environmental cue spontaneously triggers retrieval with little effortful monitoring.
**Evidence:** McDaniel & Einstein's multiprocess framework (2000) synthesized experimental evidence that prospective-memory performance depends heavily on cue salience and the demands of the ongoing task: distinctive, focal cues well-integrated with the ongoing activity support fast, relatively automatic noticing, while non-salient or peripheral cues require costly strategic monitoring that competes with other working-memory demands — explaining why some "remember to do X later" designs succeed effortlessly while others fail even with reminders technically present.
**Design implications:**
- Make reminders and pending-action cues visually salient and deliver them in the context where the action is actually performable, rather than relying on users to remember to check for them.
- Don't just make a reminder available somewhere; a badge buried in a rarely visited screen relies on effortful self-monitoring that people are bad at sustaining — surface it at the moment and place of relevance instead.
- For time- or event-triggered tasks (e.g., "come back and confirm this in three days"), use active notifications rather than expecting unprompted recall — passive availability is a weak retrieval trigger.
**Cite:** [CLM2-MCDA-00]

**See also (cross-domain):** [`../cross-domain/multimedia-learning.md`](../cross-domain/multimedia-learning.md) · [`../cross-domain/behavioral-economics.md`](../cross-domain/behavioral-economics.md) · [`../cross-domain/human-factors-safety.md`](../cross-domain/human-factors-safety.md)
