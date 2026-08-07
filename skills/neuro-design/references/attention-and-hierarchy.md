# Attention & visual hierarchy

Human vision cannot process a whole scene at once — a small set of pre-attentive channels pulls the eye first, top-down goals steer what gets searched, and anything outside the current focus of attention is easily missed entirely, which together dictate how a single, unambiguous focal point should be built and protected.

## Feature-integration theory & pre-attentive pop-out (Treisman, 1980)

**Mechanism:** Early vision registers separate feature maps (color, orientation, size, motion, etc.) in parallel and pre-attentively across the whole visual field. Focused, serial attention is required to bind features from the same location into a single object representation; without it, features from different objects can be miscombined into "illusory conjunctions."

**Evidence:** Searching for a target defined by a single unique feature (e.g., one red item among green) is fast with a search-time function that is flat across set size — the target "pops out" in parallel. Searching for a target defined by a conjunction of features shared with distractors (e.g., a red vertical bar among red horizontal and green vertical bars) produces reaction times that increase roughly linearly with the number of items, consistent with serial, attention-demanding search. Illusory conjunctions were demonstrated when attention was taxed or displays were brief.

**Design implications:**
- Encode the single most important element with one unique, pre-attentive feature (a color no one else has, a distinct shape, an outsized size) so it pops out without requiring a scan.
- Don't ask users to find an element defined by a combination of features (e.g., "the button that's both blue and circular") when other elements share one of those features individually — that forces slow, serial search.
- Reserve true pop-out treatment for one primary element per view; giving several elements the same "unique" feature cancels the effect.

**Cite:** [TREI-80]

## Saliency-based visual attention (Itti & Koch, 2000)

**Mechanism:** A bottom-up "saliency map" combines center-surround contrast across multiple feature channels (intensity, color, orientation) into a single topographic map of visual conspicuity. A winner-take-all process combined with inhibition-of-return predicts the sequence of locations attention and gaze visit, independent of task.

**Evidence:** The computational saliency model predicts human and primate fixation locations on natural images above chance, and reproduces classic pop-out search asymmetries and search-time patterns from simple synthetic displays. The companion review of computational models of attention (Itti & Koch, 2001) shows the same bottom-up saliency architecture also interacts with top-down, task-driven modulation of the underlying feature maps.

**Design implications:**
- The region of highest local contrast — in luminance, color, or edge orientation relative to its immediate surroundings — is where the eye lands first, regardless of what the designer intended to be "important."
- Audit backgrounds and imagery near a call to action for competing high-contrast regions (busy photography, decorative texture) that will win the saliency competition away from it.
- A single high-contrast accent against an otherwise calm, low-contrast field reliably captures the first fixation.

**Cite:** [ITTI-00], [ITTI-01]

## Guided Search (Wolfe, 1994)

**Mechanism:** Visual search combines the bottom-up saliency signal with top-down, goal-driven weighting of the same feature maps — attention is directed toward locations with the highest combined activation of "what's different here" and "what I'm looking for," rather than scanning randomly or purely serially.

**Evidence:** Guided Search 2.0 (1994) and its update, Guided Search 4.0 (2007), account for the full pop-out-to-serial continuum of reaction-time-by-set-size functions, search asymmetries (e.g., a tilted line among vertical lines is found faster than the reverse), and why some conjunction searches are faster than a strict serial self-terminating model would predict once top-down guidance narrows the candidate set.

**Design implications:**
- Prime the user's top-down search template before a find-it task — a preceding label, icon shape, or instruction that matches the target's visual features lets top-down guidance reinforce bottom-up salience.
- Keep iconography and color-coding consistent across a product so a learned top-down template transfers from screen to screen instead of resetting each time.
- When many elements share the same "signal" feature (every button is the same blue), guided search degrades toward slow serial search — differentiate the one element that is actually actionable right now.

**Cite:** [WOLF-94], [WOLF-07]

## F-pattern and layer-cake scanning (Nielsen Norman Group, 2006)

**Mechanism:** Users scan web pages rather than read them linearly. Eye-tracking shows a wide first horizontal sweep near the top of the content, a shorter second sweep further down, and a vertical scan down the left margin, producing an F-shaped gaze-density pattern on text-heavy pages. On pages with clear, frequent headings, later work found fixations instead cluster on headings and bolded terms, with users dipping into a paragraph only when its heading matches their goal — the "layer-cake" pattern.

**Evidence:** Aggregated eye-tracking heatmaps across many studied pages show the characteristic F-shaped fixation density; the layer-cake studies show fixation dwell concentrated on headings/first lines with drop-in reading beneath a matching heading and skips over non-matching sections. These are aggregated industry eye-tracking findings rather than a single controlled experiment with reported effect sizes.

**Design implications:**
- Front-load the key word or phrase in headings, link text, and a paragraph's first sentence (inverted-pyramid writing) — scanners disproportionately register the start.
- Use frequent, descriptive, genuinely scannable subheadings; treat them as the retrieval index readers actually use, not as visual decoration.
- Keep left edges aligned and predictable, since the vertical scan tracks down the left margin.
- Note: the classic "Z-pattern"/Gutenberg diagram often taught alongside F-pattern scanning is widely taught but its primary source is not verified — treat it as folklore, not evidence, and prefer the F-pattern/layer-cake findings above.

**Cite:** [NNG-06], [NNG-19]

## Change blindness & inattentional blindness (Simons, 1998)

**Mechanism:** Detailed visual representations are not continuously maintained from moment to moment. Without focused attention on a specific object or location at the exact moment it changes, even large changes go undetected (change blindness); unexpected objects or events fully in view but outside the observer's current attentional set can also go completely unnoticed (inattentional blindness).

**Evidence:** Simons & Levin (1998) staged a real-world interaction in which an experimenter asking a pedestrian for directions was covertly swapped for a different person while a door was carried between them; roughly half of the approached pedestrians failed to notice they were now talking to someone else. Simons & Chabris (1999) had observers count basketball passes in a video; a person in a gorilla suit walked through the scene, stopped, thumped its chest, and left, over about nine seconds — roughly half of participants failed to report seeing it (sustained inattentional blindness), regardless of how obvious the gorilla seems in hindsight.

**Design implications:**
- Never rely on a silent, peripheral, or simultaneous change alone to communicate a critical state update (a silently-updated total, a toast appearing while the user's eyes are elsewhere) — pair it with a capture cue at the user's actual point of regard, or require explicit confirmation.
- Assume users engaged in an absorbing task will miss unrelated changes elsewhere on screen, no matter how visually obvious those changes seem to the designer reviewing them in isolation.
- Validate state transitions (confirmations, undo affordances) rather than assuming a color or content change was consciously seen.

**Cite:** [SIMO-99], [SIMO-98]

## Attentional capture by abrupt onset (Yantis & Jonides, 1984)

**Mechanism:** An object that appears abruptly in the visual field — an "onset" — captures attention automatically and largely independent of the observer's current search goal, because the visual system prioritizes newly-appearing perceptual objects over the existing scene.

**Evidence:** In visual-search experiments, a target that appeared as an abrupt new onset was found with reaction times essentially independent of how many other, non-onset items were present in the display, indicating it was processed first regardless of display size; an equivalent luminance change to an item already present in the display did not show the same privileged, set-size-independent capture. Later work refined the boundary conditions under which onset capture can be attenuated by strong top-down control.

**Design implications:**
- Use genuinely abrupt appearance (popping in, not fading in) sparingly, reserved for time-critical information the user actually needs at that moment — it will hijack attention involuntarily, whether wanted or not.
- Avoid gratuitous onsets (ads, badges, animated banners) appearing mid-task; they cost attention regardless of their relevance to the user's goal.
- Reserve true onset treatment for one system-initiated interrupt at a time; simultaneous onsets compete rather than both succeeding.

**Cite:** [YANT-84]

## Design checklist

- Give the single most important element on a view exactly one unique pre-attentive feature (color, size, or orientation); don't stack several pop-out cues on it while leaving the rest of the screen equally plain.
- Maximize local contrast at the one spot that should be seen first, and audit surrounding imagery/clutter for competing high-contrast regions that will out-compete it for the first fixation.
- Keep icon and color conventions consistent across the product so top-down guided search reinforces bottom-up salience instead of resetting on every screen.
- Front-load key words in headings, link text, and opening sentences, and write frequent, descriptive subheadings — users scan in F- and layer-cake patterns, not linearly.
- Never signal a critical update through a silent or peripheral change alone; pair it with a capture cue at the point of regard or require explicit confirmation.
- Reserve abrupt onset/appearance for genuinely urgent, user-relevant interrupts, one at a time — gratuitous or promo-styled onsets get filtered out or actively resented.
- Match an alert's salient channel (color, motion, onset) to what the user is already primed to look for in that context; loudness alone does not guarantee it gets noticed.
- Treat headings and labels as the primary retrieval index for scanning users, not as decoration to be minimized.

## Deeper dive (v2)

## Attentional blink (Raymond, Shapiro & Arnell, 1992)

**Mechanism:** After identifying one target within a rapid serial visual presentation (RSVP) stream, the ability to detect or report a second target is transiently impaired for a few hundred milliseconds afterward — a bottleneck in consolidating a target into working memory / conscious report, not a low-level masking or visibility effect.

**Evidence:** In RSVP streams (roughly 8–10 items per second), second-target report accuracy dropped sharply when the second target appeared at a lag of about 200–500 ms after the first, often falling to well below performance on trials with a single target, before recovering by around 500–700 ms. Performance stayed near-ceiling when the second target immediately followed the first ("lag-1 sparing"), pointing to a genuine post-perceptual attentional bottleneck rather than simple visual interference.

**Design implications:**
- Don't present two sequential pieces of critical information within roughly half a second of each other (two rapid toasts, a confirmation immediately followed by another alert) — the second is likely to be missed even though it was technically shown.
- Space sequential status messages or notifications by at least half a second to a second if both must be consciously registered.
- In fast-updating feeds or streams, expect that a user who just consciously registered one item will miss whatever appears in the fraction of a second right after it.

**Cite:** [ATT-01]

## Contingent attentional capture (Folk, Remington & Johnston, 1992)

**Mechanism:** Capture of attention by a salient stimulus is not purely automatic — it is contingent on the observer's current top-down attentional control settings. A stimulus captures attention only when it matches the feature the observer is currently set to detect; an equally salient stimulus in a non-matching feature dimension does not capture attention.

**Evidence:** In spatial-cueing experiments, a cue sharing the target-defining feature (e.g., a color cue while searching for a specific color) produced reliable cueing/validity effects on reaction time, while a cue that was equally visually salient but defined by a non-matching feature (e.g., an abrupt onset during a color search) produced no capture at all.

**Design implications:**
- Salience alone does not guarantee an alert gets noticed — align its salient channel to whatever feature the user is already primed to detect in that context, or it can be filtered out entirely.
- If users are in "find the error" mode tuned to red, a differently-colored urgent element may be missed; match urgent-signal styling to the established convention for that flow.
- Don't assume a "louder" UI treatment automatically wins attention; a mismatched channel (motion, when the user is scanning for color) can be treated as noise and ignored.

**Cite:** [ATT-02]

## Zoom-lens model of attention (Eriksen & St. James, 1986)

**Mechanism:** The spatial extent of focused attention behaves like a zoom lens rather than a fixed-size spotlight — it can be widened to cover a larger region or narrowed to a small one, with a tradeoff between the area covered and processing depth/resolution at any given point within it.

**Evidence:** Identification accuracy for a probe item varied systematically with the size of a pre-cued attentional region: performance for items within a narrowly cued zone was higher than for a widely cued zone, and accuracy for items just outside the cued region fell off — consistent with a single attentional aperture of variable size rather than several independent fixed spotlights.

**Design implications:**
- Narrow the effective attentional "zoom" (a focused modal, a spotlighted single step) when precision matters — users process a smaller, cued area more thoroughly than a wide one.
- Wide dashboards asking users to monitor many regions at once necessarily trade off per-region processing depth; expect shallower detection accuracy the more of the screen must be covered simultaneously.
- Progressive disclosure that narrows scope step by step leverages the zoom-in mode; overview/summary screens operate in a lower-resolution zoom-out mode by design, not by user failure.

**Cite:** [ATT-03]

## Banner blindness (Benway, 1998)

**Mechanism:** Users develop a learned, top-down attentional filter that actively suppresses regions and visual formats strongly associated with advertising or irrelevant content, overriding what would otherwise be a visually salient, pop-out design.

**Evidence:** In usability tests where participants searched a web page for specific information, they frequently failed to see or use banner-styled elements — including ones directly relevant to the task at hand — even when the banner was visually prominent and even when participants were later shown they had looked directly at the region. This directly contradicted the expectation that a bright, attention-grabbing banner would necessarily be noticed.

**Design implications:**
- Never place genuinely important, task-relevant content — not just promotions — in an ad-like position or format (top strip, bright rectangular box with typical ad proportions); it inherits the learned suppression regardless of its actual content.
- If a promotional-style treatment is unavoidable for important content, break the "ad schema" (irregular shape or position, inline placement within content, no dismiss control in the typical ad corner).
- Validate with realistic task-driven usability testing rather than a static design review — banner blindness only manifests when users are pursuing a real goal, not when consciously inspecting the page.

**Cite:** [ATT-04]

**See also (cross-domain):** `../cross-domain/graphical-perception-dataviz.md` (pre-attentive attributes and saliency applied to chart encoding), `../cross-domain/human-factors-safety.md` (attentional capture and signal detection in alarms and safety-critical interfaces).

## Deeper dive (v3)

## Visual working memory capacity (~4 objects) (Luck & Vogel, 1997)

**Mechanism:** Visual working memory stores a small, fixed number of integrated object representations rather than being limited feature-by-feature: once one feature of an object is stored, its other features come along largely "for free," so capacity is object-based, not feature-based.

**Evidence:** Using a change-detection paradigm (a brief sample array, a blank delay, then a test array in which observers report whether any item changed), performance stayed near ceiling for arrays of about three to four objects and then declined roughly proportionally beyond that. Capacity for objects defined by a conjunction of four features (color, orientation, size, and gap position) was nearly as good as capacity for objects defined by a single feature — around three to four items either way.

**Design implications:**
- Limit the number of items a user must hold in mind simultaneously (fields being cross-referenced, options being compared, steps to remember) to roughly three to four.
- Group related attributes into a single visual "object" (one card combining several related values) rather than scattering them as separate items — this uses object-based storage instead of consuming separate memory slots per attribute.
- When a comparison task exceeds about four items, provide a persistent on-screen reference (a comparison table) instead of relying on the user's visual working memory to hold earlier items.

**Cite:** [ATT2-01]

## Subitizing (Kaufman, Lord, Reese & Volkmann, 1949)

**Mechanism:** Small numerosities — up to about four — can be enumerated rapidly and accurately in parallel ("subitizing"), without the slower, effortful serial counting process required for larger sets.

**Evidence:** In enumeration tasks, reaction time increased only slightly per additional item for arrays of one to four items, then increased sharply per additional item once counting was required for arrays of five or more, producing a clear "elbow" in the reaction-time-by-numerosity function at around four items — the original demonstration and naming of the subitizing phenomenon.

**Design implications:**
- Keep glanceable counts (unread-item badges, step indicators, rating segments shown as discrete marks) to four or fewer if the exact quantity needs to register instantly, without counting.
- Beyond about four, show a numeral instead of discrete marks ("12 unread" rather than twelve dots) — icons or dots above roughly four force slow serial counting instead of instant apprehension.
- Apply this threshold to pagination dots, quick-glance rating displays, and stepper/progress indicators.

**Cite:** [ATT2-02]

## Posner cueing and orienting of attention (Posner, 1980)

**Mechanism:** Attention can be oriented covertly — without moving the eyes — to a spatial location via an exogenous (peripheral, automatic) or endogenous (symbolic, voluntary) cue, facilitating detection and processing at that location before, or even without, an eye movement there.

**Evidence:** In the Posner cueing paradigm, valid spatial cues (correctly indicating the upcoming target location) sped target-detection reaction time relative to a neutral cue, while invalid cues (indicating the wrong location) slowed detection relative to neutral — a benefit/cost pattern whose time course depends on the delay between cue and target. Facilitation from a peripheral cue typically emerges within roughly 100–300 ms; at longer delays a previously-cued location can instead become slower to detect again, an effect termed inhibition of return.

**Design implications:**
- A brief, well-timed cue (a subtle highlight, a directional affordance) can pre-orient attention to where a user should look next before their eyes physically move there — useful for guiding first-time users through a flow.
- Allow roughly 100–300 ms between a cue and the appearance of the content it points to, matching the time attention actually takes to arrive at the cued location.
- Avoid re-cueing the same location repeatedly in quick succession beyond that window; inhibition of return means a location just attended to becomes transiently harder to notice again, so re-flashing the same spot can backfire.

**Cite:** [ATT2-03]

## Attentional boost effect (Swallow & Jiang, 2010)

**Mechanism:** Contrary to the usual dual-task cost, detecting a target in one task can transiently enhance — not impair — encoding of unrelated information presented at the same exact moment in a concurrent task; target detection appears to trigger a brief, precisely-timed boost in attention that spreads to whatever else is on screen at that instant.

**Evidence:** In dual-task experiments (e.g., detecting an infrequent target color or tone while incidentally viewing background images), background images presented simultaneously with a detected target were later remembered significantly better than images presented alongside a non-target or distractor — an "attentional boost" at the moment of detection, despite the concurrent task normally being expected to divide and cost attention rather than enhance it.

**Design implications:**
- Time incidental content you want remembered (a brand mark, a tip, a key benefit) to coincide precisely with a moment of active target detection or confirmation (a success checkmark, a completed action), rather than placing it before or after that moment.
- Pair a confirmation or success signal with the content most worth retaining — e.g., surface a key message at the exact instant of a completed-purchase confirmation.
- This is a narrow, precisely-timed effect tied to simultaneity, not general proximity in time — don't overgeneralize it to "anything near" a success state.

**Cite:** [ATT2-04]

**See also (cross-domain):** `../cross-domain/human-factors-safety.md` (Posner-style cueing and orienting underlie alarm and signal design), `../cross-domain/graphical-perception-dataviz.md` (subitizing and numerosity limits underlie chart-encoding guidance for counts and small multiples).
