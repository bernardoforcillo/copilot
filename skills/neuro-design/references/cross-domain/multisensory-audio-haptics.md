# Multisensory, audio & haptics -> design

Interfaces are experienced through more than the eyes. Sound, touch (haptics), and their constant, largely automatic interaction with vision shape how quickly an event is noticed, how confidently it's interpreted, and how "real" or responsive a piece of software feels. The brain does not process channels independently and then compare notes late — it binds them, from single neurons in the midbrain up through learned crossmodal associations, often before an event ever reaches conscious attention. This file covers that science — multisensory integration, crossmodal correspondences, sound-design vocabularies (auditory icons vs. earcons), sonification, tactile/haptic acuity, sound symbolism, and multisensory alerting — and applies it to sound design, notifications, haptics, and accessibility. Full citation details are in `references/bibliography.md` (keys MS-01–MS-19, MSX-01–MSX-06).

## Multisensory integration & superadditivity (Meredith & Stein, 1986; Stein & Meredith, 1993)

**Field & mechanism:** Neurophysiology. Neurons in the superior colliculus receive converging visual, auditory, and somatosensory input. When two weak, spatially- and temporally-coincident signals from different modalities arrive together, the combined neural response can exceed the sum of the two unimodal responses ("superadditivity"); when the signals are spatially or temporally disparate, integration is suppressed instead. A companion principle, inverse effectiveness, holds that the proportional gain from combining channels is largest when each channel alone is weak.

**Evidence:** Meredith & Stein (1986) recorded cat superior-colliculus neurons and showed response enhancement well beyond a simple sum for spatiotemporally coincident multimodal stimuli, along with the spatial and temporal "rules" that govern when integration occurs. Stein & Meredith (1993), *The Merging of the Senses*, synthesized this into a foundational account of crossmodal binding at the single-neuron level, including inverse effectiveness.

**Transfer to design:** A subtle visual change (a soft highlight) paired with a synchronized, co-located sound or haptic pulse is detected and localized far better than either channel alone — this is why "flash + click" or "glow + tap" reads as more responsive than a silent visual change. The gain is largest precisely when each channel alone is weak, so this technique earns its keep on low-salience confirmations, not on alerts that are already loud and obvious, where stacking more channels yields little.

**Where the analogy breaks:** Superior-colliculus integration is a fast, reflexive, spatially precise orienting response in animals, not a learned symbolic interpretation. UI events are symbolic and interpreted, so a neural "boost" in salience doesn't guarantee the user understands what the boosted signal means. On-screen audio and haptic feedback are also rarely truly co-located in space (device speaker vs. a phone vibrating in a pocket), so the spatial-coincidence rule driving the strongest neural gains often doesn't strictly apply to software.

**Cite:** [MS-01]
**Cite:** [MS-02]

## Crossmodal correspondences (Spence, 2011)

**Field & mechanism:** Cognitive psychology and psychophysics. People make consistent, non-arbitrary associations between a dimension in one sense and a dimension in another — pitch maps to size (high pitch = small/light, low pitch = large/heavy), to brightness (high pitch = bright), and to spatial elevation (high pitch = physically "up") — likely arising from statistical regularities in the environment and shared underlying neural coding.

**Evidence:** Spence (2011) reviews decades of speeded-classification and matching studies across audition, vision, touch, taste, and smell, showing these associations are robust, largely consistent across individuals, and influence reaction times even when the crossmodal dimension is task-irrelevant — congruent pairings speed responses, incongruent pairings slow them.

**Transfer to design:** Use pitch to encode magnitude or urgency, and keep the mapping consistent: rising pitch for "loading" or "increasing," a low tone for a large, heavy, or serious action (destructive confirmations), a high, light tone for a small one (a single item added). Pair spatial audio panning or vertical screen position with pitch congruently — a large UI element paired with a low-pitched sound feels coherent; the same element with a high, thin sound feels dissonant, even to users who can't say why.

**Where the analogy breaks:** Correspondences are statistical tendencies, not fixed rules; strength varies by pairing (pitch–size is one of the most robust; others, like pitch–taste, are weaker and more culturally contingent) and by individual (musicians and synesthetes show stronger or different mappings). They bias speed and preference, not comprehension — a mismatched pairing makes a cue slightly less fluent to process, not unintelligible.

**Cite:** [MS-03]

## The McGurk effect (McGurk & MacDonald, 1976)

**Field & mechanism:** Speech perception. Visual articulatory information (lip movement) is automatically fused with auditory phonetic information during speech perception, sometimes overriding the acoustic signal entirely to produce a perceived sound that matches neither input alone — the classic demonstration dubs an audio "ba" onto a video mouth saying "ga," and listeners hear "da."

**Evidence:** McGurk & MacDonald (1976) showed the effect is involuntary and persists even once a listener knows it's an illusion and knows the audio and video sources are mismatched.

**Transfer to design:** Video calls, voice assistants with animated avatars, and virtual agents need lip-sync/mouth-shape animation tightly synchronized with audio — approximate mouth movement doesn't just look wrong, it can distort what users perceive themselves to have heard, particularly in noisy conditions where visual speech cues normally help most. Accurate, synchronized captions or lip animation genuinely aid comprehension for hard-of-hearing or noisy-environment users, since vision and audition are being combined, not just displayed side by side.

**Where the analogy breaks:** The effect depends on a live, well-articulated human (or a convincingly realistic) face; abstract UI motion, generic icon animation, or a low-fidelity avatar doesn't carry the same phonetic information and won't produce comparable fusion. It's a narrow speech-perception phenomenon, not a general license to assume any two mismatched audio/visual channels will "blend" into something coherent.

**Cite:** [MS-04]

## Auditory icons vs. earcons (Gaver, 1986; Blattner, Sumikawa & Greenberg, 1989)

**Field & mechanism:** Auditory interface design. Two competing philosophies for non-speech interface sound. Auditory icons (Gaver) use caricatured, everyday sounds whose source is recognizable and causally tied to the represented event — a crumpling-paper sound for deleting a file, a clink for an incoming object — so meaning is carried by ecological association, not convention. Earcons (Blattner, Sumikawa & Greenberg) are abstract, structured musical motifs built from pitch, rhythm, timbre, and dynamics, combined compositionally like a musical grammar, so families of related events can share a motif while differing systematically (e.g., a shared rhythmic shape for "error," varied in pitch for severity).

**Evidence:** Gaver (1986) introduced auditory icons in the SonicFinder, arguing their intuitiveness requires no learning because they exploit everyday causal listening. Blattner, Sumikawa & Greenberg (1989) formalized construction rules for earcons and showed structured, hierarchical earcon families can represent nested or compositional information — such as menu depth — that a real-world sound can't directly encode.

**Transfer to design:** Reach for an auditory icon when a sound must be instantly, universally interpretable without training (a camera-shutter click, a paper-crumple on delete). Reach for an earcon, or a consistent sound-design system more generally, when an abstract taxonomy of events needs encoding — a rising three-note motif family for "success" states, sharing a motif but varying pitch or instrument for severity or category, so users learn a grammar once and generalize it.

**Where the analogy breaks:** Auditory icons only work when a plausible, culturally legible real-world source sound exists — many digital actions (syncing, background processing) have no natural sound analogue, forcing an arbitrary choice anyway. Earcons require deliberate learning and are easily confused if the motif family grows too large or isn't rehearsed; neither approach is definitively superior across all tasks, and the better choice is genuinely task-dependent.

**Cite:** [MS-05]
**Cite:** [MS-06]

## Sonification (Kramer et al., 1997)

**Field & mechanism:** Data-to-sound mapping. Sonification is the systematic use of non-speech audio to represent data or system state, exploiting the ear's high temporal resolution and its ability to monitor a stream in the background while the eyes are occupied elsewhere.

**Evidence:** Kramer et al. (1997), the NSF/ICAD sonification report, lays out a taxonomy (audification, parameter-mapping sonification, model-based sonification, with earcons and auditory icons as building blocks) and documents domains — EKG monitoring, network traffic, process monitoring — where auditory display outperforms visual-only monitoring precisely because it doesn't require gaze to be on the display.

**Transfer to design:** Sonify continuous background states the user shouldn't have to watch — a CPU-load tone, a build-progress pitch that rises as a task nears completion, a click rate that tracks streaming-log severity. This lets sound carry monitoring load in parallel with a visually-occupied task, the same parallel-channel benefit multisensory integration (see above) predicts.

**Where the analogy breaks:** Sonification helps only when the mapping is learnable and the auditory channel isn't competing with speech, music, or other alerts already present; a poorly chosen mapping (non-monotonic, culturally ambiguous) is worse than a silent display, and continuous sound in shared or open-plan environments carries a social and attentional cost that a visual dashboard doesn't.

**Cite:** [MS-07]

## Tactile acuity (Weinstein, 1968)

**Field & mechanism:** Psychophysics of touch. The skin's spatial and intensity resolution varies enormously by body region: two-point discrimination is a few millimeters on the fingertip but several centimeters on the back or forearm, setting hard physical limits on how much information a tactile channel can carry and where on the body it can be delivered legibly.

**Evidence:** Weinstein (1968), in *The Skin Senses*, mapped detection thresholds and two-point discrimination across body sites, establishing the fingertip, lips, and tongue as the highest-acuity regions and the trunk and limbs as substantially coarser — the psychophysical baseline later haptic-interface work builds on.

**Transfer to design:** Design haptic feedback for where it will actually be felt. Fine, information-bearing vibration patterns belong under a fingertip (touchscreen, stylus, controller trigger), where discrimination is fine-grained. Wrist-worn or waist-worn haptics (watches, belts) can only reliably carry coarse, low-resolution signals — a single buzz for "yes," a double buzz for "warning" — because that skin is far less discriminating.

**Where the analogy breaks:** Static two-point thresholds measured with calipers don't fully predict discrimination of complex, dynamic vibrotactile patterns — frequency and rhythm coding can partly compensate for spatial coarseness elsewhere on the body. Acuity also varies with age, skin temperature, and individual differences, so a threshold measured on average young adults isn't a hard guarantee for every user.

**Cite:** [MS-08]

## Crossmodal icons & congruence (Hoggan & Brewster, 2007; Hoggan, Kaaresoja, Laitinen & Brewster, 2008)

**Field & mechanism:** Multimodal interface design. Extending earcon/auditory-icon thinking to mobile touchscreens, "crossmodal icons" design a single event to be recognizable across sound, touch, and vision at once, so users can rely on whichever channel suits the context (silent-vibrate-only vs. sound-on) — and "crossmodal congruence" describes matching a widget's sound and vibration texture to its visual weight and size.

**Evidence:** Hoggan & Brewster (2007) designed and tested audio-tactile icon pairs on mobile devices, showing users could learn a shared rhythm/texture mapping recognizable across both modalities. Hoggan, Kaaresoja, Laitinen & Brewster (2008) tested congruent look-feel-sound touchscreen widget feedback and found congruent multimodal feedback was rated more usable and felt more "real" than incongruent pairings — especially useful for compensating for the lack of physical button feedback on flat glass.

**Transfer to design:** Design one feedback "family" per interaction — a light, high-pitched click plus a light, short vibration for a toggle; a heavier tone plus a longer buzz for a destructive confirm — so the same event is recognizable whether the user is looking, listening, or in silent mode with vibration only, since users constantly switch sound profiles. Keep the parameter mapping consistent across channels (light↔light, heavy↔heavy) rather than designing each channel in isolation.

**Where the analogy breaks:** These studies used carefully co-designed, tested icon sets on specific devices; ad hoc combinations of stock system sounds and default haptic buzzes don't automatically inherit the congruence benefit. Over-applying a single "buzz plus click for everything" pattern erodes the very distinctiveness that makes crossmodal icons work.

**Cite:** [MS-09]
**Cite:** [MS-10]

## Sound symbolism: bouba/kiki (Köhler, 1929; Rogers & Ross, 1975; Ramachandran & Hubbard, 2001; Maurer, Pathman & Mondloch, 2006)

**Field & mechanism:** Sound symbolism. Certain speech sounds are non-arbitrarily associated with certain shapes — rounded, sonorant sounds ("bouba," "maluma") are matched to rounded shapes; sharp, plosive sounds ("kiki," "takete") are matched to angular, spiky shapes — across ages and largely across cultures, suggesting a shared crossmodal mapping between articulatory/acoustic and visual-shape properties.

**Evidence:** Köhler (1929) first described the maluma/takete pairing as a Gestalt demonstration. Rogers & Ross (1975) replicated the effect cross-culturally with a non-Western, then-largely-unschooled population, reducing the odds it's purely a learned association with Latin letterforms. Maurer, Pathman & Mondloch (2006) showed the bouba/kiki mapping is present in children as young as 2.5 years old, before full literacy. Ramachandran & Hubbard (2001) situated the effect within a broader neurological account of synesthesia and crossmodal abstraction, proposing shared representations of angularity and curvature across visual and articulatory-motor systems.

**Transfer to design:** Match product naming, icon shapes, and sound design so they reinforce rather than fight each other — a soft, rounded brand mark pairs naturally with a soft-sounding name and a legato UI sound; a sharp, angular icon (alerts, precision tools) pairs with a crisp name and a short, plosive click. It's a cheap, evidence-backed lever for coherence across naming, iconography, and micro-sound-design.

**Where the analogy breaks:** The effect is a statistical bias in forced-choice matching tasks, not a strong deterministic rule — it can be overridden by existing semantic associations, brand familiarity, and language-specific phonology, and it says nothing about which specific shape or sound is objectively "better," only about relative congruence between a given pair.

**Cite:** [MS-11]
**Cite:** [MS-12]
**Cite:** [MS-13]
**Cite:** [MS-14]

## Change deafness (Vitevitch, 2003; Eramudugolla et al., 2005)

**Field & mechanism:** Auditory attention. The auditory analogue of change blindness: listeners frequently fail to notice substantial changes in an auditory scene — such as a speaker's voice being swapped, or a sound object added or removed — when attention isn't specifically directed at the changing element, showing auditory awareness, like visual awareness, is attention-gated rather than an automatic byproduct of hearing.

**Evidence:** Vitevitch (2003) showed listeners often fail to notice when a different speaker reads a sentence partway through, despite the acoustic change being large and easily discriminable when attended. Eramudugolla et al. (2005) showed directing attention to the location or identity of a changing sound source largely eliminates the deafness, confirming the effect reflects attentional allocation rather than a sensory limit.

**Transfer to design:** Don't assume users will notice a change to an ongoing audio or haptic state — a ringtone that changes, a background alert tone that escalates — just because it's audible; if it matters, cue attention to it explicitly (a distinct onset transient, a brief pause before the change, a visual co-signal) rather than relying on continuous monitoring. This matters most for status sounds or ambient audio that shift meaning over time, such as a call-quality tone degrading.

**Where the analogy breaks:** Change deafness has mostly been studied with speech and relatively rich, naturalistic soundscapes; a simple, isolated system beep in an otherwise quiet context is far more likely to be noticed than a change embedded in a busy auditory scene, so the effect's size is highly context-dependent and shouldn't be assumed for every audio UI.

**Cite:** [MS-15]
**Cite:** [MS-16]

## The parchment-skin illusion (Jousmäki & Hari, 1998)

**Field & mechanism:** Crossmodal perceptual illusion. Sound can bias tactile perception: when the sound of hands rubbing together is filtered to boost high frequencies (mimicking dry, crinkly paper), people perceive their own skin as feeling drier; boosting low frequencies makes skin feel smoother and more moist — direct evidence that audition actively recalibrates a concurrent tactile percept, not merely accompanies it.

**Evidence:** Jousmäki & Hari (1998) had participants rub their palms together while hearing the resulting sound played back in real time through headphones with the frequency spectrum manipulated, and found this changed self-reported skin-texture perception — the "parchment-skin illusion."

**Transfer to design:** The sound accompanying a touch or gesture interaction can measurably change how the material or texture "feels" to the user, even with no change to the physical surface — a crisp, high-frequency click on a scroll or swipe gesture can make flat glass feel more textured or mechanical than a dull, low-frequency sound would, a cheap way to add perceived material quality to touchscreens.

**Where the analogy breaks:** The effect was demonstrated for a specific self-generated action (rubbing one's own palms) with real-time, physically-linked sound; how strongly it generalizes to externally-triggered UI sounds not causally tied to the user's own movement is an open question, and the illusion shifts a rating, not a categorical perception — it's a seasoning, not a substitute for real haptic engineering.

**Cite:** [MS-17]

## Multisensory warnings (Spence & Ho, 2008; Ho, Reed & Spence, 2007)

**Field & mechanism:** Applied human factors. Combining auditory and tactile (and sometimes visual) warning signals produces faster and more reliable detection and response than any single-modality warning alone, particularly under high workload or divided visual attention, because redundant signals across modalities are less likely to all be missed at once and can leverage the superadditive integration described above.

**Evidence:** Spence & Ho (2008) review multisensory warning-signal design for event perception and safe driving, arguing auditory and tactile channels are underused relative to vision despite a driver's visual attention already being loaded by the primary driving task. Ho, Reed & Spence (2007) showed multisensory (audio plus tactile) in-car collision warnings produced faster brake-reaction times than unimodal auditory or tactile warnings alone, especially when the visual channel was occupied.

**Transfer to design:** For safety-critical or time-critical alerts — destructive-action confirmations, collision-style warnings in AR or vehicle UIs, critical system errors — pair a distinct sound with a distinct haptic pulse rather than relying on a visual toast alone, especially when the user's visual attention is likely elsewhere (a notification while the phone is in a pocket, a warning while eyes are on a driving task). Keep the combination spatially and temporally coincident where possible, echoing the integration rules above.

**Where the analogy breaks:** This literature is grounded in safety-critical and vehicular contexts with real consequences for missed signals; applying the same "stack every channel" logic to routine, low-stakes notifications risks alarm fatigue (see the human-factors cross-domain file) — redundant multisensory alerting is a scarce resource, best reserved for genuinely high-priority events rather than spent on every notification.

**Cite:** [MS-18]
**Cite:** [MS-19]

## Design checklist

- Pair a subtle visual change with a synchronized, co-located sound or haptic pulse for low-salience confirmations — the multisensory gain is largest exactly when each channel alone is weak.
- Keep pitch, size, and spatial mappings congruent (high pitch = small/light/up, low pitch = large/heavy/down) across sound, iconography, and motion.
- Choose auditory icons (real-world sounds) for actions that need zero learning; choose earcons (structured musical motifs) for representing an abstract taxonomy of states.
- Route continuous background status into sound (sonification) only when the mapping is simple, monotonic, and won't compete with speech or other alerts already present.
- Design haptic patterns for where they'll be felt — fine, discriminable patterns for fingertips; coarse single/double pulses for wrist- or waist-worn devices.
- Build one feedback "family" per interaction, matching sound weight to haptic weight to visual weight, so the same event reads consistently sound-on, silent, or vibrate-only.
- Reserve combined audio-plus-haptic (or audio-plus-haptic-plus-visual) redundant alerting for genuinely high-priority, safety-critical events — stacking every channel on routine notifications causes alarm fatigue, not faster response.
- Don't assume a changing ambient sound or vibration will be noticed on its own — cue attention explicitly (a transient, a pause, a co-signal) when a state change actually matters.

## Deeper dive (v3)

## Colavita visual dominance (Colavita, 1974; Sinnett, Spence & Soto-Faraco, 2007)

**Field & mechanism:** Attention and multisensory conflict. When presented with simultaneous, individually well-detectable visual and auditory stimuli, people show a strong bias toward reporting or responding to the visual stimulus and toward missing or omitting a response to the auditory one on combined trials — "visual dominance" — suggesting vision is prioritized over audition when the two compete for a single response, rather than the two being weighted equally.

**Evidence:** Colavita (1974) first demonstrated the effect: on bimodal trials pairing a light and a tone (each also tested alone), participants overwhelmingly reported only the light and simply omitted the tone response, despite near-perfect detection of the tone alone — an omission/response-bias pattern, not a sensory-threshold difference. Sinnett, Spence & Soto-Faraco (2007) replicated and extended the effect under more controlled conditions, confirming the visual-dominance bias persists across stimulus intensities and response mappings and is a genuine perceptual/attentional prioritization rather than an artifact of the original design.

**Transfer to design:** Don't assume an important auditory or haptic alert will be equally "heard" while a visually rich or busy interface simultaneously demands attention — visual information tends to win the competition for a limited-capacity response, so a critical audio cue paired with heavy on-screen activity risks being effectively suppressed, not just competed with. In multi-channel notification design, don't treat a sound as a safe fallback for a moment when the screen itself is already visually loud.

**Where the analogy breaks:** The classic paradigm uses simple, meaningless lights and tones in a forced binary-response task; real UI sounds carry semantic content and often aren't competing for literally the same behavioral response as a visual event, so the specific omission effect — as opposed to a general vision-priority tendency — may not transfer directly to complex, naturalistic interfaces.

**Cite:** [MSX-01]
**Cite:** [MSX-02]

## Sensory substitution (Bach-y-Rita, Collins, Saunders, White & Scadden, 1969)

**Field & mechanism:** Neuroplasticity and perception. The brain can learn to interpret information delivered through an atypical sensory channel as if it were the "native" sense the information represents, given a systematic, learnable mapping and sufficient training — evidence that sensory modality is as much about the structure of the information and the brain's plasticity as about the specific peripheral organ delivering it.

**Evidence:** Bach-y-Rita, Collins, Saunders, White & Scadden (1969) built a tactile-vision substitution system — a grid of vibrating tactors on the back, driven by a camera the user could pan and scan — and showed blind participants could learn to perceive spatial layout, depth, and even rudimentary looming through patterned touch, describing this as genuinely perceptual learning, not just inference.

**Transfer to design:** Accessibility features that translate one modality into another — screen-reader audio for visual layout, haptic patterns for visual alerts, vibration cues for spatial or navigational information — are not merely workarounds; with a consistent, learnable, spatially or temporally structured mapping, they can become genuinely fluent with practice. This argues for investing in one consistent, well-structured mapping across a product rather than ad hoc, one-off translations from visual to non-visual.

**Where the analogy breaks:** The original results required extensive training (many hours) and a tightly-coupled, self-controlled camera the user could actively pan and scan, closing a perception-action loop; a passive, one-off haptic buzz standing in for a visual alert doesn't recreate that closed-loop, trained system and shouldn't be expected to deliver equivalent richness or fluency without comparable investment.

**Cite:** [MSX-03]

## Tactons (Brewster & Brown, 2004)

**Field & mechanism:** Structured haptic communication. "Tactons," by analogy with earcons, are structured, abstract tactile messages built by systematically varying vibrotactile parameters — rhythm, amplitude, frequency, and body location — to compositionally encode information non-visually: a haptic equivalent of a structured sound-design grammar rather than one undifferentiated buzz.

**Evidence:** Brewster & Brown (2004) proposed a formal design space for tactons, analogous to Blattner et al.'s earcon rules, and demonstrated users could learn and distinguish tacton "families" varying systematically along these parameters, enabling richer haptic vocabularies than a single generic vibration.

**Transfer to design:** Build a real haptic vocabulary rather than one generic buzz for everything — vary rhythm (short-short-long vs. one long pulse) for message category, and amplitude or frequency for urgency or magnitude, mirroring how earcons compose pitch, rhythm, and timbre. This lets eyes-free users, low-vision users, and anyone in a heads-down context distinguish several distinct message types by touch alone.

**Where the analogy breaks:** Tacton vocabularies require learning just as earcons do, and the number of reliably distinguishable tactons is smaller than for sound, since tactile discrimination and working memory for haptic patterns is more limited. A rich tacton system that performs well in a lab study can be over-engineered for real users who never get dedicated training time.

**Cite:** [MSX-04]

## Temporal ventriloquism (Morein-Zamir, Soto-Faraco & Kingstone, 2003)

**Field & mechanism:** Crossmodal temporal perception. Just as spatial ventriloquism pulls a sound's perceived location toward a synchronous visual event, "temporal ventriloquism" shows the perceived timing of a visual event can be pulled toward a nearby (but not simultaneous) auditory event — audition, which has finer temporal resolution than vision, biases when a visual event is perceived to occur.

**Evidence:** Morein-Zamir, Soto-Faraco & Kingstone (2003) showed a sound presented shortly before or after two visual flashes could shift and, in some conditions, sharpen temporal-order judgments and perceived timing of the visual events — an auditory-driven analogue of the classic ventriloquist effect, applied to time rather than space.

**Transfer to design:** A well-timed sound cue can sharpen the perceived timing of a visual UI event — a click played essentially simultaneously with a button's visual state change can make the interaction feel more instantaneous and precise than the visual change alone, because the ear's superior temporal resolution effectively "snaps" the perceived visual timing to the sound's onset.

**Where the analogy breaks:** The effect operates over a narrow temporal window (tens of milliseconds); a delayed or laggy sound — common on real devices due to audio-pipeline latency — doesn't produce the same crisping effect and can instead create a perceptible, jarring mismatch. The benefit depends entirely on tight audio latency that many software audio stacks don't guarantee.

**Cite:** [MSX-05]

## Redundancy gain & the race model (Miller, 1982)

**Field & mechanism:** Response-time modeling. When a target can be detected via either of two redundant signals — a simultaneous light and tone, either sufficient to trigger a response — responses are faster than to either signal alone (the "redundant signals effect"). The key theoretical question is whether this speed-up merely reflects statistical facilitation (whichever channel happens to finish processing first "wins" a race between independent channels) or true neural coactivation (evidence from the two signals is pooled before a response is triggered, producing gains beyond what an independent race could produce).

**Evidence:** Miller (1982) formalized the "race model inequality" as a test distinguishing these accounts, and showed redundant visual-plus-auditory signals produced reaction-time gains exceeding the theoretical bound for a pure statistical race — evidence for genuine coactivation, where the two channels' signals are pooled rather than independently raced.

**Transfer to design:** Providing two redundant, sufficient cues for the same critical event — a visual highlight and a sound, either enough to notice it — reliably speeds detection beyond what either channel delivers alone. This gives a quantifiable, well-modeled justification for redundant alerting in exactly the safety-critical or high-priority cases where speed matters (echoing multisensory warnings, above), distinct from the merely qualitative "it feels more responsive" intuition.

**Where the analogy breaks:** The race-model/coactivation framework concerns detection speed for a single, well-defined event, not comprehension, memory, or subjective annoyance. The same redundancy that speeds detection of one flagged event says nothing about how repeated, redundant signaling across many routine events affects overall attention or fatigue (see alarm fatigue in the human-factors file) — it is not license to redundant-signal everything.

**Cite:** [MSX-06]
