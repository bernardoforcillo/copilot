# Embodied cognition & conceptual metaphor -> design

The mind does not reason about abstract things in a vacuum — it recruits the same sensorimotor machinery built for navigating physical space, handling objects, and feeling temperature or weight, and repurposes it, via systematic metaphor, to structure concepts like time, importance, mood, and social closeness. This is why "up" reads as good, why a heavier prototype can feel more "solid," and why dragging something into a folder makes intuitive sense without a manual. The transfer to interface design is direct: gestures, spatial layout, and skeuomorphic vocabulary all borrow their intuitiveness from pre-existing embodied and metaphorical structure the user already has. But this is also one of psychology's most contested territories — several of its most quotable findings (incidental warmth, incidental weight) are also headline cases in the replication crisis, so this file pairs every load-bearing claim with its boundary condition.

## Conceptual metaphor theory (Lakoff & Johnson, 1980/2003; Johnson, 1987)

**Field & mechanism:** Cognitive linguistics. Abstract concepts are not represented "raw" — they are structured by systematic metaphorical mappings from concrete, bodily source domains onto abstract target domains (ARGUMENT IS WAR, MORE IS UP, IMPORTANT IS BIG, AFFECTION IS WARMTH), and those mappings are themselves grounded in recurring embodied experience: image schemas such as CONTAINER, PATH, BALANCE, and FORCE that emerge from moving through and manipulating the physical world (Johnson, 1987).

**Evidence:** Lakoff & Johnson's analysis of everyday conventional expressions ("prices are rising," "I'm feeling up today," "she attacked my argument") shows metaphors are not decorative but systematic and productive — each source domain (WAR, JOURNEY, CONTAINER) brings a consistent bundle of entailments that predictably carries over to the target domain, evidenced by the sheer regularity of the mappings across large samples of ordinary language.

**Transfer to design:** interface vocabulary — folders, trash, desktop, layers, "move forward," "go back," stacks — works because it recruits metaphor mappings users already possess; spatial layout (up = more/better, forward = future, containment = category membership) should align with metaphors already embedded in a user's language rather than invent new, arbitrary ones.

**Where the analogy breaks:** metaphors are as much cultural/linguistic convention as embodied universal — a "desktop" or "trash can" is natural to some populations and opaque to others, and pushing a metaphor past its natural entailments (over-committed skeuomorphism) constrains a design more than it clarifies it.

**Cite:** [EC-01], [EC-02]

## Image schemas in HCI (Hurtienne & Israel, 2007; Hurtienne, Weber & Blessing, 2008)

**Field & mechanism:** Applied cognitive linguistics / tangible interaction design. Image schemas (CONTAINER, PATH, LINK, BALANCE, NEAR–FAR, UP–DOWN, PART–WHOLE) are recurring sensorimotor patterns abstracted from everyday bodily experience — grasping, moving through space, balancing — that shape how intuitively people can operate an unfamiliar interface, especially tangible and gestural ones.

**Evidence:** Hurtienne & Israel's tangible-interaction studies, and the follow-up by Hurtienne, Weber & Blessing, empirically link interface mappings consistent with a given image schema (squeezing = decrease, pouring = transfer, pulling = fetch) to faster, more accurate first-use performance — "intuitive use" — than arbitrary mappings, with the benefit most pronounced for novice and older users who have less accumulated interface-specific experience to fall back on.

**Transfer to design:** for gesture and tangible/AR interaction, pick actions congruent with the image schema the physical metaphor evokes — pull-to-refresh (SOURCE-PATH-GOAL), drag-into-folder (CONTAINER), pinch-to-shrink (near-far/scaling) — so the correct action follows from the gesture's real-world entailments and needs less explicit instruction.

**Where the analogy breaks:** image-schema congruence predicts intuitiveness mainly on first encounter; expert, habitual users readily learn arbitrary-but-efficient mappings that no longer need embodied congruence, and some concepts genuinely admit multiple, competing schemas — schema choice is not always unambiguous and still needs user testing.

**Cite:** [EC-03], [EC-04]

## Grounded cognition (Barsalou, 2008)

**Field & mechanism:** Cognitive psychology / neuroscience of concepts. Grounded cognition holds that concepts — even abstract ones — are represented by partial reactivation of the sensorimotor, perceptual, and introspective states experienced when the concept was acquired, rather than by amodal, purely symbolic representations; comprehension is a simulation of embodied experience, carried out in modality-specific brain systems.

**Evidence:** Barsalou's review integrates behavioral findings (perceptual-symbol priming, action-compatibility effects, where responses are faster when a required motor action matches an object's implied action) with neuroimaging showing motor-cortex activation during comprehension of action verbs and visual-cortex activation during imagined-object tasks — comprehension recruits the same systems used in the original embodied experience.

**Transfer to design:** interfaces that let users act on information — manipulate, drag, physically arrange, sort by hand — build stronger, more available mental representations than interfaces that only present information for passive reading; simulated hands-on interaction (drag-to-sort, pinch-to-zoom, direct manipulation) leverages the same grounding that makes hands-on learning outperform passive exposure.

**Where the analogy breaks:** grounded cognition is a theory of mental representation, not a design mandate — adding gratuitous "physical" interaction to a task that is inherently abstract or symbolic (forcing 3D manipulation onto what is really a spreadsheet) adds motor cost without a matching comprehension benefit; the theory does not license unlimited skeuomorphism.

**Cite:** [EC-05]

## SNARC: spatial-numerical association (Dehaene, Bossini & Giraux, 1993)

**Field & mechanism:** Numerical cognition. The Spatial-Numerical Association of Response Codes (SNARC) effect shows people implicitly represent numbers along a directional "mental number line" — in left-to-right reading cultures, small numbers are processed faster with left-side responses and large numbers faster with right-side responses, independent of what the number actually means in the task.

**Evidence:** In a parity-judgment task with no explicit spatial content, Dehaene, Bossini & Giraux found a reliable interaction between number magnitude and response side; the direction of the effect reverses in populations that read right-to-left, showing the mental number line's orientation is tied to orthographic/reading experience, not fixed biology.

**Transfer to design:** sequences, timelines, progress indicators, and numeric scales should run in the culturally congruent direction — small-to-large, left-to-right for LTR-reading users — so they align with the automatic mental number line; sliders, number pads, and magnitude-encoding charts feel more natural when increasing value moves in the expected spatial direction.

**Where the analogy breaks:** the mental number line's direction is orthographically/culturally determined, not universal — mirroring a left-to-right layout for RTL-reading users (Arabic, Hebrew) without actually flipping the underlying spatial-magnitude mapping fights their intuitions rather than supporting them.

**Cite:** [EC-06]

## Affect and vertical position (Meier & Robinson, 2004)

**Field & mechanism:** Embodied affective cognition. The GOOD IS UP / BAD IS DOWN metaphor is active enough to bias rapid, low-level perceptual-attentional processing, not just deliberate language use — vertical position and affective valence are linked bidirectionally in automatic cognition.

**Evidence:** Meier & Robinson found people classify positive words faster when they appear in the upper visual field and negative words faster in the lower visual field, and that manipulating vertical position can shift the speed and direction of affective evaluations — evidence the up/down-good/bad mapping operates during fast, automatic judgment.

**Transfer to design:** success/positive states (confirmations, achievements, rising trend lines, level-ups) are processed more fluently placed higher or animated moving upward; negative/error states (warnings, declining trends, deletions) are more congruent lower or moving downward — use vertical placement and motion as a secondary, reinforcing cue for valence.

**Where the analogy breaks:** the effect size is modest and easily overridden by stronger explicit cues (color, icon, copy) — don't rely on vertical position as the sole carrier of meaning, and don't override strongly established domain conventions (e.g., red-down/green-up in finance) just to chase this effect.

**Cite:** [EC-07]

## Good/bad and handedness (Casasanto, 2009)

**Field & mechanism:** Body-specific embodied cognition. Casasanto's "body-specificity hypothesis" holds that the good=one-side mapping is not fixed to a universal direction but tracks each individual's bodily fluency — right-handers associate "good" with their dominant (right) side and "bad" with the non-dominant (left) side; left-handers show the mirror-image pattern.

**Evidence:** In forced-choice tasks (e.g., placing a preferred item in a box on the dominant vs. non-dominant side of a diagram), right-handers reliably judged dominant-side placement as better, while left-handers showed the reversed association — demonstrating the mapping is fluency-dependent, not a fixed universal.

**Transfer to design:** this is primarily a caution against assuming a single universal "good = right" spatial convention (e.g., always placing the primary call-to-action on the right) as embodied fact; the effect is small, individual-fluency-dependent, and measured under tightly controlled forced-choice conditions.

**Where the analogy breaks:** real interfaces are dominated by much stronger, learned conventions (LTR reading flow, right-aligned primary actions, established platform patterns) that this lab effect is unlikely to outcompete — there is no good evidence base for building separate left-handed vs. right-handed UI layouts on this finding alone.

**Cite:** [EC-08]

## Warmth and weight as social embodiment — with its replication boundary (Ackerman, Nocera & Bargh, 2010; Williams & Bargh, 2008; Lynott et al., 2014; IJzerman & Semin, 2009)

**Field & mechanism:** Social/embodied priming. Classic claims here hold that incidental physical sensations transfer metaphorically into social judgment: holding a heavier clipboard makes a proposal seem more "weighty" or important (Ackerman et al.), and holding a warm cup makes a stranger seem more interpersonally "warm" (Williams & Bargh) — proposed to work because social-affective concepts are grounded in physical sensation from early experience (a caregiver's embrace pairs literal warmth with felt closeness).

**Evidence:** The original studies reported significant effects at modest sample sizes (Williams & Bargh's warmth study, N≈41–53 per experiment). IJzerman & Semin's "thermometer of social relations" independently linked ambient temperature to felt social proximity, initially converging with the warmth-priming account. This literature is also one of social psychology's most prominent replication-crisis case studies: Lynott et al.'s pre-registered, higher-powered, multi-site replication of Williams & Bargh's central warmth-priming finding found no significant effect, and the broader social/physical-priming literature (including weight-importance priming) has fared similarly poorly in subsequent higher-powered attempts.

**Transfer to design:** treat vivid single-cue embodied-priming claims — "a heavier device reads as more premium," "a warm color palette reads as more trustworthy" — as hypotheses worth A/B testing in your own product context, not as an established mechanism to justify a launch decision on citation alone.

**Where the analogy breaks:** this is the canonical boundary case in the whole file — the most-cited original effects largely failed to replicate at adequate power, so any design guidance drawn from single-cue physical-warmth or physical-weight priming should be flagged as unverified until validated with your own data; IJzerman & Semin's ambient-temperature/proximity link is comparatively more robust but concerns felt physical temperature and social proximity judgments specifically, not a license to assume all warmth-themed UI choices (colors, copy tone) reliably shift trust.

**Cite:** [EC-09], [EC-10], [EC-11], [EC-12]

## Time as space (Boroditsky, 2000)

**Field & mechanism:** Psycholinguistics / spatial cognition. Abstract temporal reasoning borrows structure from spatial motion schemas, and two competing frames coexist in everyday cognition: "moving-ego" (the observer advances through time toward the future) and "moving-time" (time itself advances toward a stationary observer — "the deadline is approaching").

**Evidence:** Boroditsky's priming experiments show that briefly activating a spatial schema (imagining oneself moving forward in a queue vs. an object moving toward oneself) predictably biases how people resolve an ambiguous temporal sentence ("next Wednesday's meeting has been moved forward two days") toward the spatially primed interpretation — direct evidence of structural transfer from spatial to temporal reasoning.

**Transfer to design:** timelines, calendars, scheduling views, and history/progress displays should commit consistently to one spatial-temporal frame (e.g., past-on-left/future-on-right, or events flowing toward the user) and keep directional language ("move a meeting forward") consistent with that visual frame; mixing frames recreates exactly the ambiguity Boroditsky's stimuli exploited.

**Where the analogy breaks:** the moving-ego/moving-time ambiguity is itself culturally and linguistically variable — languages and cultures differ in their dominant frame, and some spatialize time on a front-back axis, others on absolute geographic or vertical axes — a spatial-temporal layout that reads as unambiguous in one linguistic context can be genuinely backwards in another without localization testing.

**Cite:** [EC-13]

## Metaphor-enriched social cognition (Landau, Meier & Keefer, 2010)

**Field & mechanism:** Social psychology review. Proposes a "metaphor-enriched" model in which conceptual metaphors (physical warmth, cleanliness, verticality, distance) don't just describe social cognition figuratively — a bodily state or perceptual experience can make a structurally related abstract social judgment more cognitively accessible, conditioned on the metaphor's relevance and salience to the judgment at hand.

**Evidence:** The review synthesizes a wide range of studies (including several later shown to have replication problems — see the entry above) into a boundary-conditions framework: metaphor effects on social judgment are most likely when the abstract concept is genuinely structured by the metaphor rather than merely co-occurring with it, when the physical experience is salient, and when no stronger competing information is available to the judgment.

**Transfer to design:** use this as a reasoning framework, not a grab-bag of individual effects — before choosing a metaphor for a social/relational feature (a "closeness" slider, a "trust" gauge), ask whether the metaphor structurally maps onto the target concept and whether it will remain salient relative to competing explicit information (ratings, history, text) that could dominate the judgment instead.

**Where the analogy breaks:** the review predates, and does not resolve, the 2010s replication crisis affecting much of the literature it draws on; its boundary conditions are theoretically well-motivated but not all independently pre-registered or replicated — treat it as a generator of testable design hypotheses, not a settled causal account.

**Cite:** [EC-14]

## Natural mapping (Norman, *The Design of Everyday Things*)

**Field & mechanism:** Design/HCI grounded in embodied spatial correspondence. "Natural mapping" holds that a control should exploit the spatial/perceptual analogy between its own layout and the effect it produces (a bank of light switches arranged to mirror the physical layout of the lights they control) so the correct action follows from spatial intuition alone, without a label or a manual.

**Evidence:** Norman's canonical analysis of everyday artifacts — stove-burner knob arrangements, light-switch banks, steering-wheel/turning correspondence — shows error rates and hesitation drop sharply when a control's spatial arrangement matches its effect's spatial arrangement, and rise when the mapping is arbitrary (a single linear row of knobs controlling a 2×2 grid of burners is the textbook failure case).

**Transfer to design:** arrange controls so spatial position or orientation matches their effect — a volume slider that increases upward for louder, a left/right pan control positioned left-to-right, a multi-monitor arrangement tool laid out to match the physical monitor positions — this is the single highest-leverage, lowest-cost application of embodied spatial cognition to interface layout.

**Where the analogy breaks:** natural mapping generalizes cleanly for physical/spatial parameters (volume, position, brightness) but has no obvious "natural" mapping for many digital-native concepts (permission levels, abstract categories, feature flags) — forcing a spatial metaphor onto a genuinely non-spatial concept can manufacture false intuitions rather than remove cognitive overhead.

**Cite:** [EC-15]

## How bodies matter in interaction (Klemmer, Hartmann & Takayama, 2006)

**Field & mechanism:** HCI / tangible and embodied interaction design. Argues physical embodiment contributes five design-relevant properties that GUI-only, point-and-click design tends to overlook: thinking through doing (physical manipulation itself aids reasoning, not just execution of a decision already made), performance (the body's expressive/communicative dimension in action), visibility (the body and artifact make state and action legible to co-present others), risk (physical action carries real perceived and actual risk that shapes engagement), and thick practice (skilled bodily competence accrues through repeated, situated experience).

**Evidence:** The paper synthesizes design-research case studies and the broader tangible-computing and embodied-cognition literature into these five themes, using them to critique interaction designs that treat the body purely as an input pointer rather than as a resource for thought and social communication.

**Transfer to design:** for gestural, AR/VR, and tangible interfaces, design for "thinking through doing" (let manipulation itself help users work out a decision, not merely register one already made) and for visibility (make a collaborator's or bystander's physical actions legible to others in shared, co-present use); treat a gesture's perceived risk (dropping, breaking, embarrassment) as a genuine design variable rather than noise.

**Where the analogy breaks:** the five themes were derived from tangible and physically embodied interaction case studies; applying them wholesale to flat-glass touchscreen or mouse-and-keyboard interaction — which retains almost none of the physical world's risk, thick practice, or bystander-visibility properties — stretches the framework past the kind of embodiment it was built to describe.

**Cite:** [EC-16]

## Design checklist

- Reuse metaphor vocabulary users already have (containers, paths, layers, "forward/back") instead of inventing new spatial idioms — borrowed metaphors need less explanation than novel ones.
- Match gestures to the image schema they evoke (squeeze = shrink, pull = fetch, drag-into = contain) for faster first-use comprehension, especially for novice and older users.
- Align numeric and temporal sequences (timelines, scales, progress bars) with the reading-direction-dependent mental number line of your actual audience — flip the underlying layout for RTL locales, don't just mirror labels.
- Use vertical position/motion for valence (positive = up, negative = down) only as a secondary, reinforcing cue — never the sole carrier of meaning, and never in place of an established domain convention.
- Apply natural mapping wherever a control has a genuine physical analog (volume, position, brightness, pan); don't force a spatial metaphor onto abstract, digital-native concepts that have no natural spatial form.
- Treat single-cue embodied social-priming claims (warmth, weight, handedness-valence) as untested hypotheses to A/B test — this subfield's headline findings are a documented replication-crisis case study, not settled mechanisms.
- For tangible, gestural, and AR/VR interfaces, design for thinking-through-doing and bystander visibility, not just input efficiency, and budget for a gesture's perceived physical or social risk.
- Localize every embodied-spatial design choice (timeline direction, number-line orientation, valence-vertical pairing) — the underlying schemas are shaped by reading direction and culture, not human-universal constants.
