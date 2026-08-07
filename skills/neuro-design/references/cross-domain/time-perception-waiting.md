# Time perception & the psychology of waiting -> design

Clock time and *felt* time are different quantities. The same ten seconds of a spinner can feel instantaneous or interminable depending on how much attention the wait demands, whether it is filled with information or left blank, whether its cause and end point are known, and how fair it feels relative to other people waiting alongside you. Interfaces manufacture waits constantly — network round-trips, file processing, queueing for a human agent, onboarding steps — and almost none of that engineering targets the actual bottleneck: not the wait itself, but the *experience* of it. A closely related finding from the emotion literature is worth carrying in as background even though it isn't a wait-specific study: Fredrickson and Kahneman's work on duration neglect shows that once an episode is over, people's retrospective judgment of it is barely influenced by how long it lasted at all — it is dominated by the peak moment and the ending. That single fact reframes almost everything below: shortening a wait by a few seconds is usually less valuable than fixing how it *feels* moment to moment and how it *ends*.

This file surveys the experimental psychology of time perception (how prospective and retrospective duration judgments are formed, and how attention and cognitive load distort them), the services-marketing literature on queueing psychology (why an unexplained, unoccupied, unfair wait feels far longer than an equal-length wait that is none of those things), and the HCI literature on progress indicators (which shapes and augmentations make an identical wait feel faster). It closes with consumer-research findings on what to tell people while they wait, and on background music as a time-perception manipulation.

## The attentional-gate model of prospective time estimation (Zakay, 1989)

**Field & mechanism:** Cognitive psychology of time perception. Zakay's attentional-gate model treats subjective time as the output of an internal pacemaker-accumulator system: a pacemaker emits pulses at a roughly constant rate, and an attentional "gate" controls how many of those pulses reach an accumulator whose total is read out as felt duration. When a person knows in advance they will need to judge an interval's length (a *prospective* judgment), some attention is allocated to monitoring time itself, letting pulses through; when that same attention is diverted onto a concurrent, non-temporal task, fewer pulses accumulate and the interval is judged shorter after the fact — even though physical duration was identical.

**Evidence:** Across controlled laboratory paradigms manipulating the difficulty of a concurrent task performed during a to-be-timed interval, increasing the non-temporal processing demand of that task systematically shortens prospective duration estimates and productions, consistent with an attentional resource being shared between "watching the clock" and the task at hand.

**Transfer to design:** A wait filled with an absorbing, effortful task (active input, a mini-game, a genuinely engaging status narrative) will tend to feel shorter than the same wait spent staring at an inert spinner, because it pulls attention away from monitoring elapsed time. This is the mechanistic reason "filled time" strategies work, not just folk intuition.

**Where the analogy breaks:** The model was built and validated on short, tightly controlled laboratory intervals (seconds to a couple of minutes) with simple concurrent tasks; it does not by itself explain longer real-world waits, which are also shaped by expectation, fairness, and affect (see Maister and Osuna below). Loading a wait with a task that itself frustrates or adds cognitive load can backfire — the goal is *absorption*, not merely occupation.

**Cite:** [TW-02]

## Prospective vs. retrospective duration judgments are formed by different processes (Zakay & Block, 1997)

**Field & mechanism:** Cognitive psychology of time perception. Zakay and Block's review distinguishes two ways duration judgments arise: prospective judgments (formed while attending to time as an interval unfolds, governed by the attentional-gate mechanism above) and retrospective judgments (formed after the fact, with no advance expectation of having to estimate duration, and driven instead by how much contextual and episodic information was encoded and is later retrievable from memory — a "storage-size" or memory-based account).

**Evidence:** The two judgment types dissociate experimentally: manipulations that load attention (busier concurrent tasks) shrink prospective estimates but have little or opposite effect on retrospective ones; manipulations that increase the amount of distinct, memorable content or segmentation within an interval inflate retrospective estimates (a richer memory trace implies "that must have taken a while") without necessarily changing prospective ones.

**Transfer to design:** Whether you are optimizing for the moment-to-moment feel of a wait (prospective — e.g., a progress screen the user is actively watching) or for how a wait is remembered afterward (retrospective — e.g., "how long did onboarding feel, looking back?") calls for different, sometimes opposite, tactics: absorb attention to shrink a prospective wait, but a *varied*, event-rich wait may be remembered as longer than a monotonous one even if it felt fine while happening.

**Where the analogy breaks:** Most product waits are prospective (users are actively watching a spinner or progress bar and know they're waiting) rather than retrospective, so the retrospective mechanism matters far less often in interface work than in, say, memory of an entire multi-day experience or trip. Don't reach for "make it memorable" as a wait-shortening tactic when the user is staring at the screen in real time.

**Cite:** [TW-03]

## Meta-analytic confirmation of prospective/retrospective duration effects (Block & Zakay, 1997)

**Field & mechanism:** Cognitive psychology of time perception, meta-analysis. Block and Zakay aggregated decades of experimental studies comparing prospective and retrospective duration-judgment paradigms (verbal estimation, production, reproduction, comparison) to test whether the attentional and memory-based mechanisms proposed for each generalize across methods and interval lengths.

**Evidence:** The meta-analysis confirms that prospective judgments are, on average, reliably longer than retrospective judgments of equivalent intervals, and that the two paradigms respond to different moderators — attentional demand of a concurrent task chiefly moves prospective judgments; the amount and segmentation of encoded information chiefly moves retrospective ones — with the strength of these effects varying by which specific judgment method (estimation vs. production vs. reproduction) was used.

**Transfer to design:** Because the effect is a meta-analytic regularity across many paradigms and not a single lab quirk, it is safe to treat "attention-filled prospective waits feel shorter" and "information-rich intervals are remembered as longer" as reasonably robust design levers rather than one-off findings — but their *effect sizes* vary by task, so pilot rather than assume a fixed percentage improvement.

**Where the analogy breaks:** The underlying studies span verbal estimation, production, and reproduction tasks that don't map cleanly onto any single UI wait; treat the meta-analysis as evidence that the mechanisms are real and directionally reliable, not as a source of a specific number (e.g., "fills feel 20% shorter") to promise stakeholders.

**Cite:** [TW-01]

## Cognitive load shortens prospective duration judgments (Block, Hancock & Zakay, 2010)

**Field & mechanism:** Cognitive psychology of time perception, meta-analysis. This later meta-analysis specifically isolates the effect of a concurrent task's cognitive-load level on prospective duration judgment, testing the attentional-gate prediction that harder concurrent tasks leave less spare attention for timing and should therefore produce shorter felt duration.

**Evidence:** Across the pooled studies, increasing the cognitive load of a concurrent non-temporal task reliably shortens prospective duration judgments and productions of the interval during which it is performed, with the effect present across a range of task types, though its magnitude is moderated by exactly how duration is measured (estimation vs. production) and by interval length.

**Transfer to design:** A wait spent on a genuinely demanding, engaging step (e.g., completing a short profile, making a meaningful choice, actively configuring something) will tend to feel shorter than an equally long wait spent idle — the busier the attention, the less is left over to notice time passing. This is a mechanistic complement to Myers's and Harrison's progress-indicator findings below: occupying attention and showing progress are two independent levers, not the same one.

**Where the analogy breaks:** There is a ceiling: cognitive load that becomes frustrating, confusing, or effortful in a way the user resents will add negative affect that can outweigh the pure time-perception benefit. Loading a wait with busywork the user recognizes as filler (rather than something absorbing or useful) risks feeling manipulative once noticed.

**Cite:** [TW-04]

## Maister's propositions on the psychology of waiting lines (1985)

**Field & mechanism:** Services marketing / operations management. Maister's widely-cited chapter is not a single experiment but a synthesis of principles about what makes an objectively equal wait feel longer or shorter, organized as propositions: unoccupied time feels longer than occupied time; pre-process waits (before service visibly begins) feel longer than in-process waits; anxiety lengthens perceived waits; uncertain or unexplained waits feel longer than known, explained ones; unfair waits feel longer than equitable ones; and people will tolerate longer waits for services they value more.

**Evidence:** The propositions are drawn from and consistent with the queueing and service-encounter literature of the era (occupancy, explanation, and equity effects on satisfaction with waits), presented as a practitioner-facing synthesis rather than a single controlled study with its own effect size — later work (including Taylor and the Hui & Tse and Antonides studies below) independently tested and largely supported several of the individual propositions.

**Transfer to design:** Treat each proposition as a direct design lever: replace idle spinners with occupying content; move visible progress as early as possible so the "pre-process" segment (the part before anything appears to be happening) is minimized; state *why* something is taking time and *how long* it will take; and make queue position and fairness (e.g., strict FIFO processing order, visible queue position) legible so users don't suspect they're being skipped.

**Where the analogy breaks:** Maister's propositions describe service queues (call centers, restaurants, banks) where social presence, staff behavior, and physical environment shape the experience alongside pure timing; several of the levers (visible fairness relative to *other waiting people*, staff apologies, environmental comfort) have no literal interface equivalent and must be translated, not copied — e.g., "fairness" in software becomes "did my request get processed in the order I submitted it," not a literal queue of other visible users.

**Cite:** [TW-05]

## The psychological cost of waiting as a disutility function (Osuna, 1985)

**Field & mechanism:** Mathematical/cognitive psychology. Osuna formalizes waiting as imposing a psychological cost (disutility) that is not simply proportional to elapsed clock time, but grows as a function of the *uncertainty* about how much longer the wait will last — anxiety escalates as a wait continues without resolution because the person's estimate of the remaining wait, and their confidence in that estimate, keeps degrading.

**Evidence:** The model derives predictions — consistent with the broader queueing-psychology literature — that psychological cost accelerates for waits without a known endpoint and is comparatively contained for waits with a credible, known bound, formalizing the intuitive but previously undertheorized asymmetry between "I don't know how much longer" and "five more minutes, guaranteed."

**Transfer to design:** Converting an unbounded wait into a bounded one (even an approximate, honestly-communicated bound: "usually under 2 minutes") is disproportionately valuable relative to its cost to implement — it caps the anxiety-driven escalation of psychological cost even when it doesn't change expected clock time at all.

**Where the analogy breaks:** The model is a formal/mathematical treatment abstracted from any one domain; it says nothing about *how* to communicate a bound (framing, tone, channel), which is where the consumer-research findings below (Hui & Tse; Munichor & Rafaeli) become necessary complements.

**Cite:** [TW-06]

## Percent-done progress indicators reduce perceived wait and anxiety (Myers, 1985)

**Field & mechanism:** Human-computer interaction, early empirical HCI. Myers ran one of the first controlled studies testing whether showing users a percent-done indicator during a computer operation changes their experience of the wait, motivated by the observation that users given no feedback during long operations frequently assumed the system had frozen or crashed.

**Evidence:** Participants who saw a percent-done indicator during waits reported lower anxiety and rated the wait as more acceptable than participants given no indicator during equivalent objective delays, and strongly preferred having the indicator; the paper became a foundational reference establishing that *any* credible progress feedback is better than none for both perceived duration and user confidence that the system is still working.

**Transfer to design:** Never leave a wait of more than a second or two with zero feedback. A percent-done or otherwise informative progress indicator is close to a minimum bar, not a nice-to-have — its absence risks users interpreting a working system as a frozen or failed one, on top of any pure time-perception cost.

**Where the analogy breaks:** This establishes only that *some* progress indicator beats *none* — it does not by itself say which shape, animation, or augmentation of a progress bar is best; that refinement is the contribution of the Harrison et al. studies below, and a naive linear percent-done bar is not the last word on the topic.

**Cite:** [TW-09]

## Progress-bar behavior shapes perceived duration independent of real duration (Harrison, Amento, Kuznetsov & Bell, 2007)

**Field & mechanism:** Human-computer interaction, controlled perception experiments. "Rethinking the Progress Bar" tested how the *shape* of a progress bar's fill-rate curve over an identical total real duration changes how fast or slow users perceive that same wait to be, and which curve shapes users prefer.

**Evidence:** Progress bars that filled with increasing speed toward the end (starting slow, accelerating to completion) were perceived as faster and were preferred over bars with a constant linear rate; bars that decelerated near the end (fast start, slow finish) were perceived as slower and least preferred; bars that paused, stalled, or moved backward were strongly disliked and undermined trust in the indicator, independent of the true elapsed time, which was held constant across conditions.

**Transfer to design:** Where the underlying operation's true progress can be legitimately front-loaded or reported non-linearly, prefer a fill curve that accelerates toward completion over one that decelerates or stalls near the end — the same real duration is judged faster and rated more favorably. Never let a progress bar visibly regress or stall for a noticeable period; it costs more in trust and perceived duration than an honest linear bar would.

**Where the analogy breaks:** The manipulated curve shapes in the study did not correspond to genuine underlying progress — they were animation choices layered on a fixed real duration. Deliberately mismatching displayed progress and true progress to exploit this effect is a step toward deceptive UI (fake progress bars, artificially front-loaded fills that then stall) and should be used only when the displayed curve remains an honest approximation of real work remaining, not a manipulation designed to mislead.

**Cite:** [TW-08]

## Manipulating perceived duration with visual augmentation of progress bars (Harrison, Yeo & Hudson, 2010)

**Field & mechanism:** Human-computer interaction, controlled perception experiments. This follow-up study tested whether *visual augmentations* layered on an otherwise identical, real-time-accurate progress bar — animated fill textures, moving stripes, gradient treatments — could bias perceived speed and duration independent of the bar's actual, honest fill rate.

**Evidence:** Certain visual augmentations (e.g., animated motion cues moving in the direction of progress) made an identically-paced progress bar feel faster and more pleasant to watch than a plain, static fill, without altering true elapsed time or the bar's real completion rate — meaning perceived performance can be improved through animation and texture even while progress reporting stays fully truthful.

**Transfer to design:** Add subtle motion or texture cues to progress indicators (a moving highlight, a gentle animated gradient) as a low-cost way to make an honestly-paced wait feel more pleasant and faster, layered on top of — not instead of — accurate progress reporting.

**Where the analogy breaks:** These augmentations were tested as decorative overlays on a real, accurate progress signal; they are not a substitute for having accurate progress information in the first place, and overusing motion can itself become a distraction or accessibility concern (vestibular sensitivity, motion-reduction preferences) that these lab studies did not need to account for.

**Cite:** [TW-10]

## Consumer evaluation of service waits: perception, explanation, and affect (Antonides et al., 2002; Hui & Tse, 1996; Taylor, 1994)

**Field & mechanism:** Consumer and services-marketing psychology. This cluster of field and experimental studies examines how *perceived* (not objective) waiting time, the presence or absence of explanatory information, and the negative affect (frustration, anger, anxiety) a wait induces combine to shape customer satisfaction and service evaluation.

**Evidence:** Antonides et al. found perceived and objective waiting time diverge systematically and that this gap, along with whether expectations were set in advance, predicts satisfaction better than clock time alone. Hui & Tse found the *optimal content* of information given during a wait depends on its length: for short waits, extensive information about cause or duration draws attention to the wait and can reduce satisfaction, while for long waits the same information helps people cognitively reappraise and cope, improving satisfaction relative to no information. Taylor found that wait duration's effect on service evaluation is substantially mediated by the negative affect (particularly anger and uncertainty) the wait provokes, rather than acting directly — two people experiencing an identical objective delay can rate the service very differently depending on how much anger or uncertainty it triggered.

**Transfer to design:** Calibrate how much you explain a wait to its expected length — a two-second wait rarely needs a caption, but a two-minute one benefits from an explanation of cause and an estimate of remaining time. For longer processes, prioritize reducing uncertainty and frustration (clear cause, credible estimate, a way to cancel or check status) over shaving a few seconds off the clock, since affect mediates the outcome more than raw duration does.

**Where the analogy breaks:** These are field and survey studies of real consumer services (call centers, retail, banks) where social and monetary stakes (a real complaint, a real purchase decision) are present; low-stakes software waits (an image finishing rendering) may not generate comparable affect, so the size of the "explain long waits, don't over-explain short ones" effect will be smaller in low-stakes contexts than in the original service settings.

**Cite:** [TW-11], [TW-12], [TW-13]

## Filled-wait communication: numeric updates outperform apologies (Munichor & Rafaeli, 2007)

**Field & mechanism:** Consumer/applied psychology, field experiment. This study directly compared different types of "filler" content played to customers on hold on the telephone — apology messages versus informative numeric updates (e.g., estimated remaining wait time or queue position) — to see which reduced hang-ups and improved the caller's experience of an on-hold wait.

**Evidence:** Apology-only fillers ("we're sorry for the delay") tended to backfire: by explicitly foregrounding the fact of the wait, they drew attention to it and were associated with *worse* outcomes (more hang-ups, more negative affect) than a neutral or informative alternative; numeric, informative fillers (a concrete estimated wait time or position in queue) improved patience and reduced abandonment relative to apology messages.

**Transfer to design:** When a wait needs any accompanying message, favor concrete, actionable information (an estimate, a position, a next step) over a bare apology. A repeated "we're sorry for the delay" with no new information is often worse than saying nothing, because it re-anchors attention on the wait without giving the user anything to do with that attention.

**Where the analogy breaks:** The study concerns telephone hold experiences with a human-voice filler message; the specific wording effects (apology vs. number) may not transfer directly to silent visual UI copy, where the dynamics of re-triggering attention to the wait each time a message repeats could differ from an audio channel the caller cannot glance away from.

**Cite:** [TW-14]

## Music tempo and structure modulate perceived waiting time (Kellaris & Kent, 1992)

**Field & mechanism:** Consumer psychology, experimental. This study examined how properties of background music played during a wait — tempo and structural complexity — affect how long the wait is judged to have lasted, connecting consumer time-perception research to the attentional mechanisms described above: music that is more complex or demands more processing consumes more attentional resources, which (per the attentional-gate model) should leave less attention free to track elapsed time.

**Evidence:** Musical tempo and structure were found to interact in their effect on subjective time estimates rather than tempo alone driving the effect in one simple direction — the attentional demand and processing of the music's structure, not just how fast or slow it was, shaped how long the accompanying wait was judged to be, decoupling perceived duration from both objective duration and from how much people said they enjoyed the music.

**Transfer to design:** Background audio or ambient motion played during a wait is not a purely aesthetic choice — its complexity and how much processing it invites will influence how long the wait feels, sometimes independent of whether people report liking it. Treat wait-time audio/motion design as a time-perception lever in its own right, worth testing rather than assuming "pleasant" and "time-shortening" are the same property.

**Where the analogy breaks:** The study is about background music specifically, in consumer/retail-style waiting contexts; generalizing directly to silent visual "filler" content (animations, illustrations) requires caution, since the auditory-attention mechanisms music engages are not identical to visual attention capture, even though both ultimately compete for the same general attentional-gate resource.

**Cite:** [TW-15]

## Design checklist

- Never leave a wait beyond a second or two with zero feedback — a percent-done or otherwise informative progress indicator is close to a minimum requirement, not a polish item.
- Where true progress can be reported non-linearly and honestly, prefer a fill curve that speeds up toward completion over one that slows down or stalls near the end; never let a bar visibly stall or move backward.
- Fill waits with something absorbing (a meaningful step, real information, subtle motion) rather than leaving them inert — occupied attention shrinks felt duration; inert waiting does not.
- Convert unbounded waits into bounded ones with a credible estimate ("usually under 2 minutes") even when you can't shorten the actual expected time — capping uncertainty caps the escalating anxiety cost of waiting.
- Scale explanation to wait length: skip captions on sub-second waits, but explain cause and give a time/position estimate for waits long enough that users could otherwise suspect something is broken or unfair.
- If a wait needs accompanying copy, make it informative and concrete (estimate, position, next step) rather than a bare, repeated apology — apologies with no new information can make a wait feel worse, not better.
- Minimize the pre-process segment of a wait (the part before anything visibly starts) — start showing real progress as early as truthfully possible, since unoccupied "nothing is happening yet" time feels disproportionately long.
- Treat skeleton screens, optimistic UI, and low-cost animated fills as perceived-performance tools distinct from actual load-time optimization — they change felt duration without changing the clock, and are cheap complements to (not substitutes for) real speed work.
