# Emotion, aesthetics & memory of experience

**The constants under this lens.** The one from `foundations/perceptual-limits.md` that binds here
is signal detection: a receiver facing enough false alarms rationally stops responding, so an
interface that manufactures urgency it cannot back up spends the channel it will need later. The
rest of this lens rests on its own cited evidence rather than on a fixed perceptual constant, and
saying which is which is what keeps a finding arguable.

Interfaces are not evaluated purely on task completion — they are felt, and they are remembered. Two people can complete the identical flow with the identical number of clicks and walk away with opposite impressions, because affect is generated on a separate, faster track than deliberate judgment, and because memory of an experience is a *reconstruction*, not a recording. This lens covers three linked ideas: (1) emotion shapes cognition and behavior in predictable, mechanistic ways (Norman's three processing levels; positive affect literally broadens thinking and problem-solving); (2) global judgments of an experience — trust, likability, "usability" itself — are colored by affect that is often set before conscious analysis even starts (50 ms first impressions, the aesthetic-usability effect, processing fluency); and (3) the *memory* of an experience, which is what drives return visits, referrals, and reviews, is not an average of every moment but a biased summary dominated by the peak, the end, and duration is largely ignored (peak-end rule, duration neglect). Underneath both effects sits basic neuroscience of reward and loss — dopaminergic reward-prediction-error signaling, and the asymmetric weight the mind gives to losses over equivalent gains. All of these mechanisms are dual-use: they can make a genuinely good product feel as good as it is, or they can be aimed at extracting behavior a clear-headed user wouldn't choose. This file treats the ethical boundary as part of the design principle, not an appendix to it.

## Three levels of emotional design (Norman, 2004)

**Mechanism:** Norman decomposes product experience into three processing levels that operate semi-independently: **visceral** (fast, automatic, pre-conscious reactions to appearance, color, shape, sound — "does this look good/safe?"), **behavioral** (the experience of use — effectiveness, ease, feel of the interaction itself), and **reflective** (the slowest level — conscious meaning-making: self-image, memory, story, "what does owning/using this say about me?"). The three levels can conflict — a product can look beautiful (visceral) but be frustrating to operate (behavioral), or be effortless to use but forgettable in retrospect (weak reflective).

**Evidence:** Norman synthesizes converging findings from perception, HCI, and product design (including the Kurosu & Kashimura and Tractinsky aesthetic-usability studies below) into the three-level framework; it has since become a standard organizing model in design practice and design-research curricula for separating "looks good," "works well," and "means something" as distinct, independently-diagnosable failure modes.

**Design implications:**
- Diagnose problems by level: a "the app feels cheap" complaint is visceral (fix visuals/motion/sound), a "I can't figure out how to do X" complaint is behavioral (fix flow/affordances), and a "I don't feel loyal to this" complaint is reflective (fix story/identity/long-term value).
- Don't over-invest in visceral polish to compensate for a broken behavioral layer — first impressions can get someone to try a product, but a frustrating behavioral layer will still churn them.
- Reflective-level payoffs (a sense of mastery, identity, memory) compound over repeated use; invest here for retention, not just first conversion.
**Cite:** [NORM-04]

## Aesthetic-usability effect (Kurosu & Kashimura, 1995; Tractinsky, 1997)

**Mechanism:** People infer usability from appearance. A visually appealing interface is judged as *more usable* even when actual, measured usability (task success, error rate) is held constant or is objectively worse — attractiveness acts as a halo that biases the perception of every other quality, including ones the aesthetics have no logical bearing on.

**Evidence:** Kurosu & Kashimura (1995) had participants rate 26 ATM interface layouts and found perceived ease-of-use correlated far more strongly with apparent (visual) usability than with actual, measured usability. Tractinsky (1997) replicated the finding cross-culturally (Japan and Israel), which mattered because it ruled out the original result being a Japan-specific design-culture artifact, strengthening the case for a general perceptual bias rather than a local one.

**Design implications:**
- Visual polish is not cosmetic — it changes users' tolerance for friction and their forgiveness of errors elsewhere in the flow.
- Never use this effect to *disguise* a poorly-functioning product; the halo raises expectations that unmet functionality will eventually violate, converting goodwill into a sharper backlash ("it looked so good, why doesn't it work?").
- Invest in visual craft proportionally to how much first impressions matter for the entry point in question (landing pages, onboarding, app-store screenshots) — it will move perceived quality even before a single task is attempted.
**Cite:** [KURO-95] [TRAC-97]

## Peak-end rule & duration neglect (Kahneman, Fredrickson, Schreiber & Redelmeier, 1993; Fredrickson & Kahneman, 1993)

**Mechanism:** Memory of an extended experience is not an average or integral of how it felt moment-to-moment. Instead, retrospective evaluation is dominated by two data points: the most intense moment (the peak, positive or negative) and how it ended. The actual duration of the experience — how long the discomfort or pleasure lasted — is largely discarded ("duration neglect"). This is a systematic divergence between the *experiencing self* (which lives every moment) and the *remembering self* (which is what decides whether to repeat the experience).

**Evidence:** Fredrickson & Kahneman (1993) had participants continuously rate affect during unpleasant film clips, then retrospectively evaluate the whole episode; retrospective ratings tracked peak and final moments far better than they tracked clip duration or the moment-by-moment average. Kahneman et al. (1993)'s cold-pressor experiment is the classic demonstration: participants preferred to repeat a *longer* trial (same painful temperature, then extended with a period of slightly-less-painful water) over a shorter trial that ended at peak pain — objectively more total pain, but a "better" ending produced a preference to repeat it.

**Design implications:**
- Identify the peak moment in a flow (often either the worst friction point or the most delightful moment) and deliberately design it — a bad peak (a cryptic error, a stalled loading state) will dominate memory of an otherwise fine experience.
- Engineer strong endings: a confirmation screen, a small celebratory moment, a clear "you're done" signal — the last impression is disproportionately what gets remembered and reported.
- Don't assume shaving a few seconds off overall duration matters more than fixing the worst moment or the closing moment — duration neglect means users will barely notice a length change but will vividly remember a bad low point or a flat ending.
**Cite:** [KAHN-93] [FREK-93]

## Memories of colonoscopy: real-world peak-end validation (Redelmeier, Katz & Kahneman, 2003)

**Mechanism:** The peak-end rule was validated outside the lab with a real, unpleasant medical procedure, showing that deliberately manipulating the *ending* of an experience — without reducing total discomfort, and in fact while adding to it — can improve remembered experience and subsequent behavior.

**Evidence:** In a randomized trial, one group of colonoscopy patients had the procedure end normally; a second group had the scope left in place, motionless, for an extra period after the clinically necessary portion was complete — adding mild but strictly non-zero discomfort, and therefore strictly more total discomfort than the control group. The extended group nonetheless reported *less* negative overall memory of the procedure and had measurably higher rates of returning for follow-up colonoscopies, because the procedure now ended on a less-severe note rather than at its peak.

**Design implications:**
- A flow's final step is a design surface in its own right — closing on the least-negative or most-positive note available is often worth more to remembered experience than shortening the flow.
- This is real evidence that "ending well" beats "ending fast" for driving return behavior — relevant to checkout flows, support interactions, and any process users must willingly repeat.
- Use this pattern only to genuinely soften an unavoidably difficult experience (e.g., a cancellation flow that closes with clear next steps and no hard feelings) — never to pad out a flow with artificial friction and then relieve it, which is manufacturing the peak it claims to resolve.
**Cite:** [REDL-03]

## 50-millisecond first impressions (Lindgaard, Fernandes, Dudek & Brown, 2006)

**Mechanism:** Visual appeal judgments of an interface are formed almost instantly and are highly stable — what a viewer decides in the first fraction of a second correlates strongly with their considered judgment made after much longer exposure. This means first impressions are not a rough draft revised by later scrutiny; they are closer to an anchor that later scrutiny confirms.

**Evidence:** Lindgaard et al. (2006) flashed web page screenshots for 50 ms and had participants rate visual appeal; these near-instant ratings correlated highly (r ≈ .75+) with ratings given after 500 ms exposure, and predicted longer-exposure judgments well. The result has since been widely cited (and partially replicated at even shorter exposures in follow-up work) as evidence that aesthetic judgment is one of the fastest evaluations the visual system performs.

**Design implications:**
- Treat the very first viewport — the one seen before any scrolling or interaction — as the highest-leverage real estate in the entire product; it is disproportionately what determines whether a user forms a positive or negative prior.
- A/B test first-screen visual composition (layout balance, whitespace, hero imagery) specifically for immediate appeal, separately from testing for downstream conversion — they are related but not identical measurements.
- Don't rely on later screens or later copy to "win back" a user whose 50 ms impression was negative; that impression is a strong anchor, not a blank slate.
**Cite:** [LIND-06]

## Processing fluency & aesthetic pleasure (Reber, Schwarz & Winkielman, 2004)

**Mechanism:** The ease with which the brain processes a stimulus — perceptually (clarity, contrast, symmetry) or conceptually (familiarity, semantic coherence, prior exposure) — is itself experienced as positively valenced. Fluent processing is misattributed to properties of the stimulus (beauty, truth, trustworthiness, likability) rather than correctly attributed to the ease of processing itself. This is the general mechanism underlying several more specific effects (aesthetic-usability, mere exposure, the "illusory truth effect" for repeated statements).

**Evidence:** Reber et al.'s review synthesizes converging experimental evidence that manipulating fluency alone — through figure-ground contrast, symmetry, prototypicality, repetition/priming, or even font legibility — shifts aesthetic-pleasure and truth judgments in the predicted direction, independent of the actual content or accuracy of the stimulus. The theory explains why symmetric, high-contrast, prototypical, and previously-seen stimuli are reliably rated as more attractive across many unrelated experimental paradigms.

**Design implications:**
- Legible type, adequate contrast, clean alignment, and predictable layout patterns aren't just accessibility requirements — they measurably raise how much users like and trust an interface, independent of its actual content quality.
- Familiar UI patterns (standard nav placements, conventional icons) are processed more fluently than novel ones and will be rated as more pleasant and more trustworthy — novelty carries a fluency tax that must be paid for with a real benefit.
- Fluency-driven trust is a bias, not a validity check — pair it with real transparency (accurate claims, real credentials) rather than using polish to substitute for substance; fluent-but-false content is exactly what makes misinformation feel more credible on repetition.
**Cite:** [REBE-04]

## Broaden-and-build theory of positive emotion (Fredrickson, 2001)

**Mechanism:** Negative emotions narrow cognition and behavior toward a specific fight/flight/freeze response (evolutionarily adaptive for acute threat). Positive emotions do the functional opposite: they broaden the scope of attention, cognition, and behavioral repertoire — widening what a person notices, how creatively they think, and what actions they consider — and over time this broadened mode builds lasting personal resources (resilience, skills, social bonds). This reframes positive affect from a pleasant side-effect into a functional driver of better exploration, learning, and problem-solving.

**Evidence:** Fredrickson's review and subsequent experimental work (e.g., inducing joy or contentment via short film clips) shows broadened attentional scope on standard cognitive tasks (e.g., wider global-local attention allocation, more varied action-tendency listings) compared to neutral or negative-affect conditions, plus longitudinal evidence that positive-affect inductions build durable coping resources over time ("broaden-and-build" upward spirals).

**Design implications:**
- Reducing user frustration is not only about removing a negative — inducing genuine positive affect (delight, a sense of accomplishment, humor used well) measurably widens exploration and creative use of a product, which matters for feature discovery and learning tools.
- Stressful, narrowing states (error anxiety, time pressure, fear of loss) push users toward narrow, defensive, satisficing behavior — expect reduced exploration and increased reliance on familiar paths under those states.
- For learning- or exploration-oriented products (onboarding, creative tools, education), prioritize inducing calm-positive affect before asking users to explore unfamiliar functionality — a stressed user is a narrowed user.
**Cite:** [FRED-01]

## Reward-prediction-error signaling (Schultz, Dayan & Montague, 1997)

**Mechanism:** Midbrain dopamine neurons don't fire in proportion to reward received — they fire in proportion to the *difference* between reward received and reward expected (the prediction error). An unexpected reward produces a strong dopaminergic burst; a fully-predicted reward produces little to no burst even though the reward itself is identical; and an expected reward that fails to arrive produces a dip below baseline. This is the foundational neural mechanism behind why *unpredictable* positive outcomes (variable-ratio reinforcement, surprise, "what will happen this time") are more motivationally potent than fixed, fully-predictable ones — the mechanistic root of everything from slot-machine design to notification-badge anticipation.

**Evidence:** Schultz, Dayan & Montague's foundational primate electrophysiology work established that dopamine neuron firing tracks a computational reward-prediction-error signal rather than reward magnitude per se — the now-canonical model underlying computational reinforcement learning and much of behavioral/neuro-economics.

**Design implications:**
- Fully predictable rewards (a progress bar that always fills the same way) generate weaker engagement than rewards with some genuine, bounded variability — but variability is also the mechanism behind compulsive-use patterns, so its use carries real ethical weight (see Ethics note below).
- Prediction-error spikes are attention-grabbing by design — use them sparingly and for things that genuinely matter (a real achievement, a real update), not as a default motivational layer bolted onto routine actions.
- A product that always delivers exactly what it promises, with no surprise, will feel reliable but flat; a product that never delivers what it promises will feel untrustworthy — the reward system responds to calibrated, honest variability, not to gaming the prediction-error signal itself.
**Cite:** [SCHU-97]

## Prospect theory & loss aversion (Kahneman & Tversky, 1979)

**Mechanism:** People evaluate outcomes as gains or losses relative to a reference point, not as absolute states — and losses loom psychologically larger than equivalent-magnitude gains (loss aversion, typically estimated around a 2:1 weighting). The resulting value function is concave for gains, convex for losses, and kinked at the reference point, which also predicts systematic risk-seeking to avoid a sure loss and risk-aversion to lock in a sure gain.

**Evidence:** Kahneman & Tversky's original choice experiments demonstrated that preferences reverse depending on whether logically identical outcomes are framed as gains or losses (framing effects), and that people demand more to give up an item than they would pay to acquire it — establishing prospect theory as a better descriptive (though not normative) model of choice under risk than expected-utility theory, and eventually contributing to Kahneman's Nobel Prize in Economics.

**Design implications:**
- Framing identical information as an avoidable loss ("you'll lose access to X") is more motivating than framing it as a foregone gain ("keep access to X") — this asymmetry is powerful and therefore requires restraint (see Ethics note).
- Free trials, default-enrolled subscriptions, and "you have N days left" framings all activate loss aversion around something the user hasn't necessarily internalized as theirs yet — use only where the underlying offer is genuinely fair and cancellation is genuinely easy.
- Reference points can be reset by the interface itself (e.g., showing "before/after" framing) — be deliberate about what reference point a screen implies, since it silently determines whether the same number reads as a gain or a loss.
**Cite:** [KAHT-79]

## Ethics note

Every mechanism in this file is dual-use, and the line between "good design" and "dark pattern" is often a matter of degree, not kind. The distinguishing question is always: **does this reduce friction and add real value the user would endorse if it were made explicit, or does it extract a choice a clear-headed user would not make?**

- **Reward-prediction-error (SCHU-97)** used to make genuine achievements feel good is legitimate; used to manufacture variable-ratio compulsion loops (unpredictable rewards with no real value attached, engineered purely to maximize session count) is not — this is the mechanism behind loot boxes and slot-machine-style engagement patterns.
- **Loss aversion / prospect theory (KAHT-79)** used to honestly communicate a real, time-limited consequence is legitimate; used to fabricate scarcity, manufacture false urgency, or frame an easy cancellation as a scary loss is not.
- **Peak-end rule (KAHN-93, FREK-93, REDL-03)** used to genuinely close a flow well (clear confirmation, honest reassurance) is legitimate; used to bury a bad experience by inserting a manufactured "nice" moment right before the user leaves, without fixing the underlying problem, is not.
- **Processing fluency and the aesthetic-usability effect (REBE-04, KURO-95, TRAC-97)** used to make a genuinely good, accurate product easier to trust is legitimate; used as visual polish to paper over dishonest claims, hidden terms, or a product that doesn't work is not — fluency makes falsehoods *more* convincing, which raises the ethical stakes of using it well.
- A practical test: if the mechanism would stop working the moment the user became aware you were using it, it is manipulation. If it still works — and the user would still approve — once it's explained to them, it's design.

## Design checklist

- Diagnose feedback by Norman's level (visceral/behavioral/reflective) before prescribing a fix — a beautiful-but-broken product and a functional-but-forgettable one need opposite interventions.
- Invest real design effort in the first viewport / first 50 ms — it anchors judgment more than later content can undo.
- Identify and deliberately design the peak moment (best or worst) and the ending of every meaningful flow — memory is built from these two points, not the average experience.
- Maximize processing fluency (contrast, symmetry, familiar patterns, legible type) to build trust and perceived quality — and pair it with content that's actually true.
- Use variability and prediction-error rewards sparingly and only for genuine value; never engineer compulsive variable-ratio loops.
- Frame consequences honestly; don't manufacture false urgency or false scarcity to exploit loss aversion.
- Let positive affect do work — genuine delight broadens exploration and learning, not just satisfaction scores.
- Before shipping any emotion-leveraging mechanic, apply the "would it still work if we explained it to the user" test.

## Deeper dive (v2)

## Mere exposure effect (Zajonc, 1968) & meta-analytic confirmation (Bornstein, 1989)

**Mechanism:** Repeated, even non-conscious, exposure to a stimulus increases liking for it — familiarity itself is rewarding, independent of any reasoned evaluation of the stimulus's actual qualities. This is a special case of processing fluency: repetition makes a stimulus easier to process, and that ease is experienced as mild positive affect and misattributed to liking.

**Evidence:** Zajonc's original experiments repeatedly exposed participants to novel stimuli (nonsense words, Chinese-like characters, faces) with no other information given, and found liking increased monotonically with exposure frequency, even under conditions where participants couldn't consciously recognize having seen the stimulus before. Bornstein's 1989 meta-analysis of over 200 studies confirmed the effect is robust and reliable overall, while also mapping its boundary conditions: the effect is strongest for initially neutral-to-positive stimuli, is weaker or reverses for stimuli that were disliked from the start, and famously follows an inverted-U with exposure count — liking rises with repetition up to a point, then can decline with excessive repetition (tedium/wear-out).

**Design implications:**
- Consistent, repeated exposure to a brand mark, icon, or interaction pattern builds affinity over time even without persuasive content — visual consistency across touchpoints is itself a liking-building strategy.
- Don't over-repeat: the inverted-U means novelty needs periodic refresh (seasonal creative, redesigns) before repetition curdles into wear-out and irritation.
- This effect cannot rescue a stimulus that was actively disliked on first exposure — fix a bad first impression rather than trying to expose your way out of it.
**Cite:** [EMO-ZAJO-68] [EMO-BORN-89]

## Affect-as-information (Schwarz & Clore, 1983)

**Mechanism:** People often use their current feeling state as information about the object of judgment itself — "how do I feel about this?" gets answered by consulting incidental mood, even when that mood was caused by something entirely unrelated (the weather, an unrelated prior event). This is a misattribution mechanism distinct from, but related to, processing fluency: it's not ease-of-processing being mistaken for stimulus quality, but *incidental mood* being mistaken for a judgment about the stimulus.

**Evidence:** Schwarz & Clore's classic study had people rate life satisfaction on sunny versus rainy days (unaware their mood was linked to weather); ratings were markedly more positive on sunny days — unless participants were first asked about the weather, which correctly re-attributed their mood to its actual cause and eliminated the bias. This "discounting" finding (the effect disappears once the true source of mood is made salient) is the key evidence that the mechanism really is misattribution, not a genuine effect of weather on life quality.

**Design implications:**
- A user's mood entering a flow (frustration from a prior task, stress from context outside the product) will bleed into their evaluation of your product even when your product didn't cause it — be aware of what state users are likely in at each entry point.
- Incidental positive touches (a pleasant transition, a small unexpected kindness) placed just before a judgment moment (a rating prompt, a pricing decision) can measurably shift that judgment — this is powerful and sits close to the ethical line; use it to reflect real quality, not to launder a bad experience via a mood boost right before asking for a review.
- Making the true source of a bad mood explicit and separate from your product (e.g., a clear explanation for why something failed, attributing delay to a named external cause) can help prevent misattributed blame — the same discounting mechanism that removes weather's effect on satisfaction works for interfaces too.
**Cite:** [EMO-SCHW-83]

## Arousal-enhanced memory (Cahill & McGaugh, 1995; Cahill, Prins, Weber & McGaugh, 1994)

**Mechanism:** Emotionally arousing experiences are remembered more vividly and durably than emotionally neutral ones of equal informational content — and this isn't just a general "interesting things are memorable" effect. It's mediated by a specific physiological pathway: adrenergic (epinephrine/norepinephrine) activation during and after an arousing event modulates amygdala activity, which in turn strengthens consolidation of the memory being formed elsewhere in the brain at that time.

**Evidence:** Cahill, Prins, Weber & McGaugh (1994) showed that propranolol (a beta-adrenergic blocker) selectively impaired long-term memory for the emotionally arousing portion of a story, while leaving memory for a matched, emotionally-neutral version of the same story intact — direct pharmacological evidence that adrenergic arousal, not just narrative interest, drives the enhanced memory. Cahill & McGaugh (1995) further demonstrated the enhancement effect behaviorally with arousing versus neutral slide narratives, showing superior long-term (but not necessarily immediate) recall for the arousing material.

**Design implications:**
- Moments engineered to carry real emotional charge (surprise, accomplishment, relief, humor) are the moments most likely to be remembered — concentrate memorable branding, key information, and calls-to-action near genuinely arousing moments rather than flat, neutral stretches of a flow.
- Because this works on *any* strong arousal, not just positive arousal, a stressful error state is also disproportionately memorable — which is exactly why a bad error experience does lasting reputational damage disproportionate to how "small" the underlying bug was.
- Arousal enhances memory consolidation over time (effects grow relative to neutral material at longer delays) — this favors designing for what a user will remember tomorrow or next week, not just what tests well in an immediate post-task survey.
**Cite:** [EMO-CAHI-95] [EMO-CAHI-94]

## Affect heuristic (Slovic, Finucane, Peters & MacGregor, 2007)

**Mechanism:** People use a quick, affective "good/bad" gut reaction as a mental shortcut for complex judgments, especially judgments of risk and benefit — and critically, perceived risk and perceived benefit end up *inversely* correlated in people's minds (things that feel good are judged both more beneficial and less risky, and vice versa) even when real-world risk and benefit are often positively correlated or unrelated. This heuristic is fast, efficient, and usually adaptive, but it substitutes affect for the actual, harder analytic work of separately assessing risk and benefit.

**Evidence:** Slovic and colleagues' program of research (synthesized in this 2007 review) shows that manipulating incidental affect toward a technology or activity shifts stated risk judgments and benefit judgments in opposite directions simultaneously, that time pressure (which suppresses deliberate override) strengthens the inverse relationship, and that this pattern replicates across judgments of chemicals, technologies, and everyday activities.

**Design implications:**
- A feature or product with a strong positive "vibe" will be perceived as lower-risk than its actual risk profile warrants — for anything with real stakes (financial, health, privacy, safety), don't rely on positive affect alone to reassure users; provide explicit, analytic risk information too, since affect will otherwise silently substitute for it.
- Conversely, an unfamiliar or aesthetically unpolished feature will be perceived as riskier than it actually is — genuine polish is doing real communicative work here, not just decoration.
- Time-pressured decision moments (checkout urgency, countdown timers) suppress the deliberate override of affect-driven judgment — using time pressure to push a risk/benefit decision the user hasn't fully evaluated exploits this mechanism and crosses into manipulation.
**Cite:** [EMO-SLOV-07]

**See also (cross-domain):** `cross-domain/behavioral-economics.md`, `cross-domain/motivation-game-design.md`, `cross-domain/social-influence-persuasion.md`, `cross-domain/neuroaesthetics.md`

## Deeper dive (v3)

## Negativity bias: bad is stronger than good (Baumeister, Bratslavsky, Finkenauer & Vohs, 2001; Rozin & Royzman, 2001)

**Mechanism:** Across an unusually wide range of psychological domains, negative events, information, and feedback have a larger, faster, and more durable impact on cognition, emotion, and behavior than positive events of equal objective magnitude. This asymmetry appears to be adaptive (a missed threat is costlier than a missed opportunity) but it means "the interface felt fine overall" is not a symmetric counterweight to "one moment felt bad" — bad moments are simply heavier.

**Evidence:** Baumeister et al.'s wide-ranging review synthesizes converging evidence across relationships, learning, impression formation, and emotion regulation that bad events consistently outweigh comparably good ones in their effect on subsequent state and judgment. Rozin & Royzman's complementary review formalizes several distinct facets of the asymmetry (negativity dominance, negativity potency, steeper negative gradients, greater negative differentiation) and traces its likely evolutionary origin in threat-avoidance systems that had to be more responsive to danger than to opportunity.

**Design implications:**
- One bad moment in an otherwise smooth flow does more damage to overall evaluation than one additional good moment does to improve it — prioritize eliminating negative moments over adding incremental positive ones once a baseline of competence exists.
- Error and failure states deserve disproportionate design investment relative to their frequency, precisely because their emotional weight is disproportionate to their frequency.
- Negative feedback about a product spreads and sticks harder than positive feedback (reviews, word of mouth) — this is a structural fact about attention and memory, not a fixable "perception problem," so it argues for over-investing in preventing bad experiences rather than counter-messaging them after the fact.
**Cite:** [EMO2-BAUM-01] [EMO2-ROZI-01]

## Circumplex model of affect (Russell, 1980)

**Mechanism:** Emotional states can be mapped onto a two-dimensional space defined by valence (pleasant ↔ unpleasant) and arousal (activated ↔ deactivated), rather than treated as a long list of discrete, unrelated categories. "Excited" and "calm" can both be positive-valence states that differ mainly in arousal; "anxious" and "sad" can both be negative-valence states that differ the same way. This gives designers a compact, generalizable vocabulary for describing exactly what emotional target a moment in a flow is aiming for, beyond a single good/bad axis.

**Evidence:** Russell's original multidimensional scaling studies of emotion-word ratings found that a circular ordering along two orthogonal dimensions (valence and arousal) accounted for the structure of how people judge emotion terms and facial expressions, and this two-dimensional circumplex has since become one of the most widely used frameworks in affective science for organizing and measuring emotional states experimentally.

**Design implications:**
- Specify target emotional states in two dimensions, not one — "calm and positive" (low arousal, positive valence — for a completed transaction) is a different design target than "excited and positive" (high arousal, positive valence — for a game win), and they call for different pacing, motion, and sound design.
- Matching arousal to task stakes matters: a high-arousal, high-energy treatment on a routine, low-stakes action (marking an email read) reads as manipulative or exhausting; a flat, low-arousal treatment on a genuinely significant moment (a big purchase, a major milestone) reads as anticlimactic.
- Use the valence/arousal grid to audit a flow's emotional pacing end-to-end, not just its net sentiment — a flow that's technically "net positive" but oscillates unpredictably between high and low arousal can feel chaotic even if every individual moment scores well.
**Cite:** [EMO2-RUSS-80]

## Appraisal theory (Lazarus, 1991; Scherer, 2009)

**Mechanism:** Emotions are not direct, automatic reactions to events themselves but to the individual's *appraisal* of those events — a cognitive evaluation along dimensions like goal relevance, goal congruence, who/what caused it, how controllable/copeable it is, and how it fits expectations. The same objective event (e.g., a slow-loading screen) produces different emotions in different people, or in the same person at different times, because the appraisal — not the event — determines the emotional outcome.

**Evidence:** Lazarus's cognitive-motivational-relational theory, built from decades of stress and coping research, established that appraisal (primary: "does this matter to me and how", secondary: "what can I do about it") mediates between event and emotional/behavioral response, explaining individual variation in emotional reaction to identical stressors. Scherer's component process model formalizes this further with a specific, ordered sequence of appraisal checks (relevance, implications, coping potential, normative significance) that componentially generates the resulting emotion and its associated physiological and expressive pattern, and has been influential in affective computing and emotion-modeling research.

**Design implications:**
- The same failure (a declined payment, a lost connection) will be appraised very differently depending on perceived controllability and cause — a clear explanation that restores a sense of "what can I do about this" changes the emotional outcome even without changing the underlying event.
- Design copy and system feedback are appraisal inputs, not neutral descriptions — how an error is explained (blame attribution, controllability framing, expectation-setting) actively shapes the emotion the user ends up feeling, not just their understanding of what happened.
- Anticipated appraisal matters as much as after-the-fact appraisal — setting accurate expectations up front (progress indicators, realistic time estimates) changes how an eventual delay or setback gets appraised when it happens, because it's no longer a violated expectation.
**Cite:** [EMO2-LAZA-91] [EMO2-SCHE-09]

## Emotion regulation & reappraisal (Gross, 1998)

**Mechanism:** People actively regulate their own emotional responses, and *when* in the emotional process they intervene matters enormously for the outcome. Gross's process model distinguishes antecedent-focused strategies (applied before an emotional response is fully generated — e.g., reappraisal: reinterpreting a situation's meaning) from response-focused strategies (applied after the emotion has already been generated — e.g., suppression: inhibiting the outward expression of an emotion already underway). These have very different downstream consequences.

**Evidence:** Gross's experimental comparisons found that reappraisal (construing an emotionally evocative film differently before/during viewing) reduced negative experience and physiological arousal without the downstream costs seen with suppression, while suppression (masking the outward expression of emotion already generated) reduced expressive behavior but did not reduce the internal experience or physiological arousal, and came with measurable cognitive cost (impaired memory for concurrent information) and worse social outcomes in later studies building on this model.

**Design implications:**
- Help users reappraise stressful moments *before* the emotion fully forms — proactive, honest framing ("this step can take up to 30 seconds due to X") reframes a wait as expected rather than alarming, which is a genuinely different (and better) outcome than just suppressing visible frustration cues after the fact.
- Don't design flows that merely suppress the outward signs of user frustration (hiding a cancel option, disabling a way to express a complaint) — suppression doesn't reduce the underlying negative experience, it just removes the signal, and it carries a real cognitive/relational cost to the person experiencing it.
- Give users tools for their own antecedent-focused regulation: preview/undo affordances, clear expectation-setting, and the ability to reframe a decision before commitment (e.g., a summary/confirm step) all support healthier emotion regulation than interfaces that spring outcomes on users and then just muffle the reaction.
**Cite:** [EMO2-GROS-98]

**See also (cross-domain):** `cross-domain/behavioral-economics.md`, `cross-domain/motivation-game-design.md`, `cross-domain/social-influence-persuasion.md`, `cross-domain/neuroaesthetics.md`
