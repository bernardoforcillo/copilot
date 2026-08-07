# Neurodiversity & inclusive cognition -> design

Neurodiversity is the observation that brains vary — in how they process language, sustain attention, filter sensory input, and change with age — as a matter of ordinary human variation, not a single "normal" cognitive profile with deviations to patch. That framing matters for design because it argues against building for an imagined average user and then bolting on an "accessible" alternate path. It also happens to be a field thick with well-intentioned but under-evidenced folk claims — a specific typeface that "fixes" dyslexia, a sensory profile that supposedly describes "the autistic user," a font size that magically works for "older users" — that get repeated in style guides long after the underlying studies failed to replicate or never supported the strong claim in the first place. This file tries to hold both things at once: real, load-bearing mechanisms (visual crowding, working-memory bottlenecks, contrast sensitivity loss, executive-function differences) and a clear line under the claims that don't hold up, because designing on a myth wastes effort and can crowd out the intervention that actually works.

## Dyslexia: a phonological-processing difference, and what actually helps with the visual side

**Field & mechanism:** Dyslexia is best characterized, per Vellutino and colleagues' review of four decades of research, as a deficit centered on phonological processing — the ability to represent, store, and manipulate the sound structure of language — not a general visual or intelligence deficit. That said, the visual presentation of text still matters mechanically: dense text forces small, tightly packed letters into the reader's parafoveal vision, where crowding (the difficulty isolating a letter from its flanking neighbors, described elsewhere in this library's core typography lens) is elevated in many dyslexic readers relative to typical readers, independent of the phonological deficit itself.

**Evidence:** Zorzi and colleagues directly tested the crowding-reduction hypothesis in a PNAS study: extra-large letter and word spacing, with no change to letter shape or typeface, produced a significant improvement in reading speed and accuracy for dyslexic children across two language groups, comparable in scale to more intensive reading interventions. This is a real, replicated mechanism — reducing visual crowding helps — that is separable from marketing claims about specific "dyslexia fonts" (addressed next).

**Transfer to design:** Increase letter-spacing and word-spacing generously in body text, especially for anything positioned as accessible or educational; this is cheap, reversible, and helps a population wider than diagnosed dyslexic readers (anyone reading in a noisy visual environment or at a glance). Treat spacing as a first-class typographic lever, not an afterthought after font selection.

**Where the analogy breaks:** The phonological deficit is the core of the reading disability; spacing is a compensatory perceptual aid for the visual symptom, not a treatment for the underlying language-processing difference, and its benefit is a matter of degree, not a "cure." The crowding mechanism Zorzi's intervention targets is the same crowding phenomenon studied generally in parafoveal letter recognition — the fix generalizes because the underlying visual bottleneck is not dyslexia-specific.

**Cite:** [ND-01], [ND-02]

## The "dyslexia font" myth

**Field & mechanism:** Several commercial typefaces (most visibly Dyslexie and OpenDyslexic) are marketed on the claim that specific letterform features — heavier bottoms, varied stroke weights, exaggerated ascenders/descenders — reduce letter confusion for dyslexic readers. This is a strong, specific mechanistic claim about letter *shape*, distinct from the spacing claim above.

**Evidence:** The shape claim does not hold up under controlled comparison. Kuster and colleagues found Dyslexie font produced no reading-speed or accuracy benefit over a standard font for children with or without dyslexia when other typographic variables were controlled. Wery & Diliberto similarly found a specialized dyslexia font did not improve reading rate, and any accuracy differences were inconsistent. Rello & Baeza-Yates's earlier, more permissive study of "good fonts for dyslexia" is frequently cited by font vendors as supporting evidence, but its own findings point toward general typographic properties — sans-serif design, larger letter and word spacing, larger x-height — as the drivers of any benefit observed, not the dyslexia-specific shape claims. The British Dyslexia Association's style guide, tellingly, does not center its recommendations on a specific proprietary font; it recommends generic, well-established readability properties (clear sans-serif options, generous spacing, avoiding italics and dense justified blocks, off-white backgrounds) that overlap heavily with general accessible-typography practice rather than anything dyslexia-exclusive.

**Transfer to design:** Do not select or promote a typeface on the basis of "designed for dyslexia" marketing claims. Instead, apply the underlying, evidence-backed properties directly: adequate letter/word spacing (see the entry above), a plain sans-serif or well-spaced serif, sufficient x-height, left-aligned (not justified) text, and avoiding long italicized passages. These help broadly, not just dyslexic readers, which is itself informative.

**Where the analogy breaks:** This is the entry where the "evidence has myths" warning is most direct: a specific, testable claim (this letterform shape reduces reading errors) was tested and did not replicate as a shape-specific effect, while a superficially similar but mechanistically different claim (spacing reduces crowding) did. Conflating the two — as much consumer-facing guidance still does — is the exact error this file exists to correct.

**Cite:** [ND-03], [ND-04], [ND-05], [ND-06]

## ADHD: attention as a downstream effect of inhibition, and the double-edged effect of ambient stimulation

**Field & mechanism:** Barkley's influential model reframes ADHD not as a primary deficit of attention itself, but as a deficit of behavioral inhibition that secondarily disrupts several executive functions (working memory, self-regulation, internalized speech, planning) — attention problems are downstream of weaker inhibitory control over competing responses and distractors, not a standalone "can't focus" trait. Separately, environmental visual clutter has a measurable, direct cost to sustained attention in young children broadly.

**Evidence:** Fisher and colleagues ran a controlled classroom experiment with kindergarten-age children and found that a highly decorated classroom (walls covered with instructional displays) produced more time off-task and lower learning-related test performance than a sparse classroom, in a small but controlled sample of typically-developing children — this is a study of visual environment and general attention in young children, not a study of diagnosed ADHD populations specifically, and its sample size argues for treating it as suggestive rather than definitive at scale.

**Transfer to design:** Favor visually calm interfaces with a clear focal point over dense, decorative layouts, especially in contexts aimed at children or attention-demanding tasks — this overlaps directly with this library's core attention-and-hierarchy lens (one focal point, minimal competing salience) rather than requiring an ADHD-specific pattern.

**Where the analogy breaks:** Extrapolating a young-children's-classroom finding to adult software UI, or to ADHD-diagnosed users specifically rather than attention broadly, is an analogy, not a direct replication — the original study's population and medium (physical classroom walls) differ from a digital interface enough that the *direction* of the effect (less clutter, better sustained attention) transfers more confidently than any specific magnitude would.

**Cite:** [ND-07], [ND-08]

## ADHD and white noise: a real but narrow, inverted-U effect — not a "turn on background noise" prescription

**Field & mechanism:** A body of work on "moderate brain arousal" proposes that some inattentive and ADHD-diagnosed children are under-aroused, and that a moderate level of unpredictable auditory noise can raise arousal into a more functional range for cognitive tasks — a stochastic-resonance-style account where a bit of the "wrong" input compensates for insufficient internal signal.

**Evidence:** Söderlund and colleagues found background white noise improved memory-task performance specifically in children independently rated as low-attentive, while typically-attentive children in the same study did not show the same gain and could show a cost — an interaction, not a uniform benefit. Baijot and colleagues found converging neurophysiological (event-related potential) evidence of benefit specifically in an ADHD-diagnosed sample. Both studies are moderate in sample size and specific to particular cognitive tasks.

**Transfer to design:** Where ambient or white-noise features exist (focus-mode audio, "brown noise" toggles), treat them as an optional, user-initiated, individually-tuned tool for people who already know it helps them — not a default or an assumption that applies to "focus mode" users broadly. The same input that helps one profile can measurably hurt another in the same room.

**Where the analogy breaks:** This is an inverted-U, individual-differences finding, not a general design principle; it does not license adding background sound or motion "for focus" as a blanket default, and it can directly conflict with the needs of sensory-sensitive users (including many autistic users, see below) for whom unpredictable ambient sound is aversive rather than helpful. Never force it; always make it opt-in and easily reversible.

**Cite:** [ND-09], [ND-10]

## Autism: sensory processing differences are common but highly heterogeneous — there is no single "autism-friendly" profile

**Field & mechanism:** Robertson & Baron-Cohen's review of sensory perception in autism describes atypical sensory processing — which can run in either direction, hyper-reactivity (over-responsive, easily overwhelmed) or hypo-reactivity (under-responsive, seeking more input) — across visual, auditory, tactile, and other modalities, along with differences in multisensory integration (how information from different senses gets combined).

**Evidence:** Ben-Sasson and colleagues' meta-analysis found atypical sensory-modulation symptoms reported across a majority of the autism studies reviewed, but with prevalence estimates that varied enormously depending on the measure and definition used — the finding is "sensory differences are common" more confidently than it is "sensory differences take this specific form." South & Rodgers's review adds that sensory over-responsivity is specifically linked to anxiety in autism, suggesting sensory environment design is not just a comfort question but plausibly a mental-health-relevant one. Tola and colleagues reviewed built-environment (architectural) design guidance for autism — acoustic control, lighting, sensory zoning, predictable spatial layout — for physical spaces like schools and housing.

**Transfer to design:** Provide user-level control over stimulation-heavy elements — animation, autoplay video/audio, motion effects, background sound, high-contrast flashing states — rather than a single fixed "calm" or "stimulating" default. Predictability (consistent navigation, advance notice of changes, no surprising autoplaying media) helps broadly across this profile even where specific sensory thresholds differ person to person.

**Where the analogy breaks:** This is the single clearest heterogeneity warning in the file: because hyper- and hypo-reactivity both occur, sometimes in the same individual across different modalities, there is no one "autism-friendly interface" preset to design toward — a muted, animation-free UI helps some autistic users and does nothing for, or actively under-serves, others who are hypo-reactive and seeking more sensory signal. Tola et al.'s findings are additionally about physical architecture; carrying acoustic/lighting guidance for a school building over to a screen interface is an analogy, not a direct transfer.

**Cite:** [ND-11], [ND-12], [ND-13], [ND-14]

## Aging: general slowing and real vision changes — but age is a poor proxy for ability

**Field & mechanism:** Salthouse's processing-speed theory proposes that a substantial share of age-related decline across many different cognitive tasks is explained by a single common factor — general slowing of processing speed — rather than by independent, domain-specific declines in each ability. Separately, Owsley's review of vision and aging documents concrete optical and retinal changes: reduced pupil size and light reaching the retina, lens yellowing and increased scatter, reduced contrast sensitivity, slower adaptation to darkness, greater sensitivity to glare, and presbyopia (loss of near-focus accommodation).

**Evidence:** Both are well-established, broadly replicated patterns in the cognitive-aging and vision-science literatures respectively. Charness & Boot's review of aging and technology use adds an important qualifier: gaps in older adults' technology use are driven by a combination of these ability changes *and* by experience, training design, and self-efficacy/attitudes toward technology — not by ability decline alone.

**Transfer to design:** Increase default text size and contrast, avoid relying on fine motor precision or fast time-limited input, and provide adequate task time — these serve real, well-documented vision and processing-speed changes. This overlaps with the motor-control lens's guidance on target size (the same speed-accuracy tradeoff behind Fitts's original target-acquisition studies applies more acutely as motor precision and processing speed change with age).

**Where the analogy breaks:** Do not treat "older user" as a proxy for "low technical ability" or design condescendingly on that assumption — Charness & Boot's own point is that attitude, prior experience, and training opportunity explain real variance independent of raw ability, and within-age-group variance in both cognitive and technical-skill measures is large. A single age-based persona flattens a population that ranges from lifelong power users to first-time adopters.

**Cite:** [ND-15], [ND-16], [ND-17]

## Colour-vision deficiency: real, common, and unevenly distributed — never encode meaning by hue alone

**Field & mechanism:** Red-green colour-vision deficiency (the common inherited forms, protanopia/protanomaly and deuteranopia/deuteranomaly) arises from variation in the genes encoding retinal cone photopigments, which sit on the X chromosome — which is why prevalence differs sharply by sex.

**Evidence:** Birch's survey work puts red-green colour-vision deficiency at roughly 8% of males and well under 1% of females of Northern European descent, with prevalence varying by population ancestry — a real, well-characterized, but unevenly distributed condition, not a uniform "some people are colorblind" fact.

**Transfer to design:** Never signal state, category, or required action by hue alone; pair color with an icon, label, pattern, or position, and meet the contrast minimums already established as baseline requirements (WCAG's contrast-minimum and non-text-contrast success criteria). Test palettes against a colour-vision-deficiency simulator as a standard design-review step, not an occasional audit.

**Where the analogy breaks:** Colour-vision deficiency is not binary or uniform — the common red-green forms differ from the much rarer blue-yellow (tritan) forms and from total colour blindness (achromatopsia, a different and far rarer mechanism), and severity varies continuously from mild anomaly to full dichromacy within each type. A single "colorblind mode" toggle that assumes one profile does not serve the range this population actually spans; that clinical range is documented in the broader colour-vision-deficiency literature this library's core perception lens draws on.

**Cite:** [ND-18]

## Cognitive accessibility: a consensus synthesis, not a single controlled-trial finding

**Field & mechanism:** The W3C's Cognitive and Learning Disabilities Accessibility Task Force (COGA) guidance synthesizes design patterns addressing memory load, attention, language complexity, executive function, and learning differences broadly — plain language, consistent and predictable navigation, minimizing reliance on memory across steps, avoiding strict timing pressure, and providing help and clear error recovery.

**Evidence:** COGA is an expert-consensus synthesis document produced by the W3C Web Accessibility Initiative, drawing on a wide base of prior cognitive-accessibility research and practitioner experience, rather than a single new empirical study; its authority comes from being the field's most current, broadly reviewed synthesis, not from being one controlled trial with an effect size.

**Transfer to design:** Treat COGA's patterns as a practical checklist for reducing cognitive load and ambiguity broadly across a product — most of its guidance (plain language, consistent navigation, minimal memory burden, forgiving error handling) helps every user under time pressure or cognitive load, not only users with diagnosed cognitive or learning disabilities.

**Where the analogy breaks:** Because it is a synthesis rather than a single study, individual COGA recommendations vary in how directly they trace to a specific controlled finding versus broad practitioner consensus; treat it as the best available authoritative guidance, not as a source of individually citable effect sizes the way a single experimental paper would be.

**Cite:** [ND-19]

## Universal Design: seven principles built for physical space, adopted for digital

**Field & mechanism:** The Principles of Universal Design, developed at North Carolina State University's Center for Universal Design under Ronald Mace and collaborators, define seven properties a well-designed environment or product should have: equitable use, flexibility in use, simple and intuitive use, perceptible information, tolerance for error, low physical effort, and adequate size and space for approach and use.

**Evidence:** The principles were developed from architectural and product-design practice and disability-rights advocacy (Mace himself designed from lived experience as a wheelchair user), formalized as a consensus framework rather than derived from a single controlled experiment, and have since become a standard reference point cited across accessible product and interface design broadly.

**Transfer to design:** Use the seven principles as a structural review lens for any interface: is there one equitable path rather than a segregated "accessible version," does the design flex to different methods of use, is the simplest interpretation the correct one, is critical information perceptible through more than one channel, are errors tolerated and reversible, is physical/interaction effort low, and is there adequate space (tap target size, layout breathing room) to use it accurately.

**Where the analogy breaks:** The principles were written for physical, architectural, and product design — building entrances, door handles, kitchen tools — and their translation into digital interface heuristics is a widely adopted but informal analogy, not a verbatim digital specification; some principles (physical space and reach) map cleanly to touch-target sizing, while others (approach and use) require real reinterpretation for a screen rather than a literal reading.

**Cite:** [ND-20]

## Design checklist

- Increase letter- and word-spacing generously in body text — this is the reliably evidenced typographic intervention for dyslexic readers, not a specific proprietary "dyslexia font."
- Never adopt a font on the basis of "designed for dyslexia" marketing; use plain sans-serif, generous spacing, adequate x-height, and left-aligned text, which is what the underlying evidence actually supports.
- Keep default visual density low and give users control over animation, autoplay media, and ambient sound — treat any "focus mode" white-noise or motion feature as opt-in, never a forced default, since the same stimulation helps some profiles and harms others.
- Never encode state or meaning by hue alone; pair color with icon, label, or position, and check every palette against a colour-vision-deficiency simulator.
- Design for real vision and processing-speed change with age (larger text, higher contrast, generous timing, large touch targets) without treating "older user" as shorthand for "low technical ability."
- Build configurability rather than a single "inclusive" preset — sensory, motion, and stimulation needs vary enough within any one diagnostic label (autism, ADHD, dyslexia) that no single default serves the whole group.
- Reduce working-memory burden broadly (persistent state, visible steps, plain language, consistent navigation) — this is a shared bottleneck across multiple learning-disability profiles, not a fix specific to any one label.
- Involve disabled and neurodivergent users directly in design and testing rather than designing from assumptions about them; treat accessibility features as core infrastructure, not a bolted-on alternate path.

## Deeper dive (v3)

## Working memory as a shared bottleneck across learning disabilities

**Field & mechanism:** Rather than each learning disability having a wholly distinct cognitive signature, a substantial body of work finds working-memory capacity — the ability to hold and manipulate information briefly in mind — as a shared, domain-general predictor of difficulty across different academic-skill disabilities.

**Evidence:** Swanson & Jerman's meta-analysis found children with math disabilities show significant working-memory deficits relative to typically-achieving peers, robust across the studies reviewed. Swanson, Zheng & Jerman's companion meta-analysis found a comparable pattern for reading disabilities, with phonological/verbal working memory the most consistently implicated component. The convergence across two nominally distinct disability labels, using the same meta-analytic method, is the interesting finding: a working-memory bottleneck recurs across labels rather than being unique to any one of them.

**Transfer to design:** Reducing working-memory demand generally — visible progress and state, avoiding "remember this from three steps ago" interaction patterns, offloading rather than requiring mental tracking — is a design lever that plausibly benefits multiple learning-disability profiles at once, rather than requiring a separate accommodation per diagnostic label.

**Where the analogy breaks:** These are correlational meta-analyses establishing working memory as a robust *correlate* of these disabilities, not intervention studies — they do not show that training working memory directly improves reading or math outcomes (a separate and more contested question), only that reducing working-memory load in the task itself is addressing a real, measured bottleneck in the affected population.

**Cite:** [NDX-01], [NDX-02]

## The curb-cut effect: a compelling frame, not a controlled finding

**Field & mechanism:** The term originates from literal curb cuts — sidewalk ramps installed under disability-rights activism, originally for wheelchair users — which then measurably ended up serving a much larger population: parents with strollers, delivery and luggage carts, cyclists, and many others never targeted by the original accommodation. Blackwell's essay extends this as a general policy and design argument: designing for people at the margins often produces infrastructure or products with markedly broader benefit than designing for an assumed "average" user.

**Evidence:** Blackwell's piece is a case-based policy argument published in a magazine of record for the field (Stanford Social Innovation Review), built on illustrative examples (curb cuts, OXO's ergonomic kitchen tools originally designed for users with arthritis, captioning) rather than a controlled experiment measuring the effect's size or reliability.

**Transfer to design:** The curb-cut effect is a useful argument for why accessibility investment is not a narrow-audience cost center — it is a legitimate case for prioritizing inclusive features. Use it as motivation, and look for concrete instances in your own product (does a feature built for one need serve others) rather than assuming it automatically.

**Where the analogy breaks:** This is the softest evidence base in the file, and it is frequently over-cited as if it were a guarantee: not every accessibility feature broadly benefits everyone, some are targeted and appropriately neutral for other users, and treating the curb-cut effect as a universal law can wrongly imply accessibility work is always costless or always has a business case beyond the ethical one — sometimes the correct justification is simply that it serves the people it was built for.

**Cite:** [NDX-03]

## Captions: built for deaf and hard-of-hearing viewers, empirically useful far beyond that audience

**Field & mechanism:** Captions render spoken audio (and relevant sound effects) as on-screen text synchronized to video, originally and still primarily an access requirement for deaf and hard-of-hearing viewers.

**Evidence:** Gernsbacher's review synthesizes a body of comprehension research showing captions measurably improve comprehension, attention, and information retention broadly — including for hearing viewers, viewers in noisy or sound-off environments, second-language learners, and children learning to read — not just for the audience captions were originally mandated for.

**Transfer to design:** Provide accurate captions and transcripts by default for any video or audio content, and treat them as a comprehension feature for the whole audience, not solely a compliance requirement for a subset of users.

**Where the analogy breaks:** The benefit is specific to synchronized text for spoken/audio content — it does not generalize to "add text redundantly everywhere," and poor-quality (inaccurate, badly timed) captions can actively hurt comprehension rather than help it, so the mechanism depends on caption quality, not merely caption presence.

**Cite:** [NDX-04]

## Vection, motion sickness, and the case for a real motion-reduction control

**Field & mechanism:** Vection is the illusory sense of self-motion induced by visual motion cues alone — a moving visual field, parallax scrolling, or a VR environment can produce a felt sense of movement with no actual physical motion. The leading explanatory account for why this can cause visually-induced motion sickness is sensory-conflict theory: the visual system reports motion while the vestibular and proprioceptive systems report stillness, and the mismatch itself is the aversive signal.

**Evidence:** Keshavarz and colleagues' review finds vection and visually-induced motion sickness are related but not perfectly correlated across studies — strong vection does not always produce strong sickness and vice versa — meaning the relationship is real but not a simple linear dial. Susceptibility also varies substantially between individuals, overlapping with (but broader than) any single diagnostic population.

**Transfer to design:** Provide a genuine, easy-to-find control to disable non-essential motion triggered by interaction (parallax effects, auto-scrolling, large-scale animated transitions), consistent with the WCAG 2.3.3 success criterion for animation from interactions, and honor system-level reduced-motion preferences by default rather than requiring users to discover an in-app toggle.

**Where the analogy breaks:** WCAG 2.3.3 is a Level AAA (aspirational, not baseline-required) criterion, and in practice many products ignore both it and the OS-level reduced-motion signal — this is a case where the standard exists but is inconsistently implemented, and susceptibility to motion-triggered discomfort is broad (including vestibular disorders unrelated to any neurodivergence label), so this entry is inclusive design more generally, not neurodiversity-specific.

**Cite:** [NDX-05], [NDX-06]

## What screen-reader users actually do, versus what interfaces assume

**Field & mechanism:** Screen readers convert on-screen content to synthesized speech or braille output, and experienced users develop systematic, non-linear navigation strategies — jumping between headings, browsing landmark regions, listing links, or using in-page search — rather than passively listening to content top-to-bottom in document order.

**Evidence:** The WebAIM Screen Reader User Survey (an annual, large-sample but self-selected/convenience survey of screen-reader users) documents these navigation patterns directly, alongside the fact that a meaningful share of respondents have low vision rather than total blindness, and that assistive-technology-and-browser combinations vary considerably — screen-reader users are not a monolithic population using a single tool one way. Borodin and colleagues' academic study of browsing strategies independently corroborates the pattern of structured, non-linear navigation (heading jumps, landmark use, form-mode traversal) among experienced users.

**Transfer to design:** Correct heading structure and landmark regions are not optional decoration for screen-reader users — they are the primary navigation mechanism experienced users actually rely on, more than reading order alone. Label forms and interactive controls explicitly rather than relying on visual/positional proximity to convey their purpose.

**Where the analogy breaks:** The WebAIM survey is a convenience sample of people who found and completed the survey, skewing toward more experienced, tech-engaged, and disproportionately English-language/US-based respondents — treat its numbers as a strong directional signal about experienced-user behavior, not a representative census of all blind and low-vision people's needs or skill levels.

**Cite:** [NDX-07], [NDX-08]

## "Nothing About Us Without Us": participatory design as a corrective to designing from assumptions

**Field & mechanism:** The disability-rights principle "nothing about us without us" holds that disabled people should be direct participants and decision-makers in designing solutions that affect them, rather than passive subjects studied and designed for by non-disabled experts, professionals, or institutions acting on their behalf.

**Evidence:** Charlton's foundational text synthesizes qualitative fieldwork and interviews across disability-rights movements internationally to ground the principle historically and politically. Spiel and colleagues' critical literature review of HCI and technology research involving autistic children found that a substantial share of that research treats autistic children predominantly as objects of study or intervention rather than as agents with meaningful input into the design process, and argues explicitly for more participatory approaches, including with autistic adults where communication differences complicate direct participation by autistic children.

**Transfer to design:** Where feasible, involve neurodivergent and disabled users directly — in research, design review, and usability testing — rather than designing solely from published profiles or assumptions about what a given diagnostic label needs; this is also the practical antidote to the heterogeneity problem raised throughout this file (no single sensory or cognitive profile represents "the" autistic, ADHD, or dyslexic user).

**Where the analogy breaks:** Charlton's work is a normative, qualitative, political-philosophy grounding rather than a testable empirical effect with a magnitude, and Spiel and colleagues' review characterizes a pattern in prior literature rather than presenting new experimental data — cite both as grounding for a participatory design practice and an ethical stance, not as quantitative HCI findings in the same sense as the studies elsewhere in this file.

**Cite:** [NDX-09], [NDX-10]
