# Social influence & persuasion -> design

Every interface persuades. A checkout flow, an onboarding sequence, a settings screen — each one shapes what a person notices, what feels normal, and what feels costly to refuse. The research below, mostly from social psychology's classic and modern literature on compliance and attitude change, describes the mechanisms that make persuasion work. The same mechanisms build trust and reduce friction for a genuine offer, or extract consent a user would not knowingly give — the technique is identical, and the deciding factor is not the tactic but whether the underlying claim is true, the choice is reversible, and the target would endorse the influence if it were made visible to them. That test — **"would the user thank us for this if they saw exactly what we did and why?"** — is used throughout this file to separate ethical persuasion from manipulation and dark patterns. Where a technique fails that test, it is flagged explicitly under "Where the analogy breaks."

## Core principles (Cialdini's six, plus attitude-change research)

## 1. Reciprocity
**Field & mechanism:** Social psychology of exchange. People feel obligated to return a favor, gift, or concession — even a small, uninvited one — and the obligation persists independent of whether they like the giver.
**Evidence:** In a classic field study, a confederate who gave participants an unsolicited can of Coke before asking them to buy raffle tickets sold roughly twice as many tickets as a confederate who gave nothing, regardless of how much the participant said they liked the confederate — the favor itself carried the effect (Regan, 1971). In restaurant field trials, servers who left a small piece of candy with the check raised tip percentage measurably over no-candy controls, and a second piece delivered as an apparently spontaneous, personalized gesture raised tips substantially further — the *manner* of giving, not just the gift, mattered (Strohmetz et al., 2002).
**Transfer to design:** Give real value before asking for anything — a useful default report, a genuinely free tier, proactive help in a support flow, an unprompted fix. Small, well-timed, sincere gestures (a personalized note, a real discount, an unlocked feature) build goodwill that eases a later, legitimate ask.
**Where the analogy breaks:** A "free gift" that exists only to manufacture guilt, a "free trial" engineered to be forgotten so it converts to a paid plan by default, or a fake personalization ("just for you!" sent to everyone) is reciprocity weaponized rather than earned — it counts as a dark pattern once the gift is a prop rather than a genuine value exchange.
**Cite:** [SI-01], [SI-02], [SI-03]

## 2. Commitment & consistency (foot-in-the-door)
**Field & mechanism:** Once people commit to a small, freely chosen position, they feel internal and social pressure to behave consistently with it, making them far more likely to agree to a larger, related request later.
**Evidence:** Homeowners who first agreed to display a small, unobtrusive sign about safe driving were, weeks later, far more likely to agree to install a large, unattractive "Drive Carefully" billboard in their front yard than homeowners approached cold with the large request only (Freedman & Fraser, 1966).
**Transfer to design:** Sequence onboarding as a series of small, genuinely optional commitments (set one preference, complete one profile field) that build toward the full setup, and let each step be visibly a free choice rather than a forced gate.
**Where the analogy breaks:** Using foot-in-the-door to smuggle in consent — a small, innocuous permission request that is quietly followed by broader data-access or billing requests the user would have refused if asked upfront — is consent creep, a documented dark-pattern family, not legitimate sequencing.
**Cite:** [SI-01], [SI-04]

## 3. Social proof (conformity)
**Field & mechanism:** People use others' behavior as evidence for the correct action, especially under ambiguity — and will conform to a group's visibly wrong judgment even when the correct answer is unambiguous to them privately.
**Evidence:** In Asch's line-judgment paradigm, a lone real participant seated among confederates who unanimously gave an obviously wrong answer conformed to the wrong answer on a substantial share of critical trials, and roughly three-quarters of participants conformed at least once across the session, despite the correct answer being visually obvious in a private control condition (Asch, 1956).
**Transfer to design:** Show real, verifiable social signals — genuine usage counts, verified reviews, "teams like yours use this setting" drawn from real aggregate data — especially at decision points where the user is uncertain.
**Where the analogy breaks:** Fabricated review counts, bot-generated testimonials, or fake "12 people are looking at this right now" counters are manufactured social proof; they are deceptive by construction and sit squarely inside the FTC's and academic dark-pattern taxonomies.
**Cite:** [SI-01], [SI-05]

## 4. Social norms (descriptive framing)
**Field & mechanism:** Cialdini's focus theory of normative conduct distinguishes *descriptive* norms (what most people actually do) from *injunctive* norms (what is socially approved or disapproved); each moves behavior through a different route, and citing the wrong one, or citing a norm that isn't locally true, can backfire.
**Evidence:** Litter-field experiments showed that making a descriptive norm salient (seeing others litter in an already-littered environment) increased littering, while pairing a norm cue with a clear injunctive signal (a single piece of litter in an otherwise clean environment, signaling disapproval) reduced it — norm salience alone was not enough; which norm was made salient mattered (Cialdini, Reno, & Kallgren, 1990). In a hotel field study, a sign reporting that most previous guests in that exact room reused their towels produced meaningfully higher reuse than a standard environmental-appeal sign, and framing the norm at the local, specific level (this room) beat a generic appeal to all guests (Goldstein, Cialdini, & Griskevicius, 2008).
**Transfer to design:** Prefer specific, true, locally relevant descriptive norms ("87% of teams in your plan use two-factor auth") over generic appeals, and never state a norm you cannot verify.
**Where the analogy breaks:** Citing a favorable-sounding but untrue or cherry-picked norm ("most users upgrade") to pressure a purchase is fabricated social proof under a different name; it fails the disclosure test immediately.
**Cite:** [SI-01], [SI-06], [SI-07]

## 5. Authority
**Field & mechanism:** People defer to perceived authority and expertise, often past the point their own judgment would otherwise stop them, because authority is used as a cognitive shortcut for "this must be correct or safe."
**Evidence:** In Milgram's obedience studies, roughly two-thirds of participants administered what they believed was the maximum, clearly dangerous shock level to another person simply because a lab-coated experimenter calmly instructed them to continue, despite the "victim's" audible protests (Milgram, 1963).
**Transfer to design:** Use real credentials, real security certifications, and named experts to build warranted trust — a visible "reviewed by our security team" is useful when it is true and verifiable.
**Where the analogy breaks:** Fake trust badges, invented certifications, or impersonating an official body (a bank, a government agency) to borrow unearned authority is authority-washing — a well-documented dark pattern and, in impersonation cases, potentially fraud.
**Cite:** [SI-01], [SI-08]

## 6. Liking
**Field & mechanism:** People are more easily persuaded by communicators they find likeable — attractiveness, similarity, and warmth all increase compliance independent of argument quality.
**Evidence:** In a campus survey/petition study, a more physically attractive communicator produced significantly greater opinion change in the audience than a less attractive communicator delivering the identical message (Chaiken, 1979).
**Transfer to design:** Warm, human microcopy, a friendly and consistent brand voice, and genuine responsiveness in support interactions build real rapport that makes legitimate requests easier to accept.
**Where the analogy breaks:** Manufacturing false rapport — a chatbot posing as a sympathetic human, or "friendly" copy engineered specifically to lower a user's guard right before an unfavorable term — turns liking into a manipulation lever rather than a byproduct of a genuinely good relationship.
**Cite:** [SI-01], [SI-09]

## 7. Scarcity
**Field & mechanism:** Options perceived as scarce, limited, or about to disappear are valued more highly than the same option perceived as abundant, because scarcity is read as an implicit signal of quality and threatens the freedom to choose it later.
**Evidence:** In a controlled experiment, identical cookies rated higher in desirability when presented in a jar with only two cookies versus a jar with ten, and scarcity attributed to high social demand (other people had taken the cookies) increased desirability even further than scarcity attributed to the experimenter's arbitrary allocation (Worchel, Lee, & Adewole, 1975).
**Transfer to design:** Show real, live inventory or seat counts when scarcity is genuine and independently verifiable by the user.
**Where the analogy breaks:** Fake countdown timers that reset on refresh, "only 2 left" labels not tied to real inventory, and manufactured urgency are among the most extensively documented dark patterns in large-scale audits of e-commerce sites; scarcity claims that are not literally true are the clearest bright line in this entire file.
**Cite:** [SI-01], [SI-10]

## 8. Pre-Suasion (priming the moment before the ask)
**Field & mechanism:** Cialdini's later work argues that persuasion happens largely *before* the message itself — whatever concept, emotion, or association is made salient in the moment right before a request determines how the request is received, because attention "primed" toward one association temporarily suppresses competing associations.
**Evidence:** Cialdini's *Pre-Suasion* synthesizes and extends decades of priming and attention research (including several of the norm and framing studies above) into a single practical claim: arranging what people are attending to and associating with immediately before an ask — a "privileged moment" — is often more decisive than anything in the ask's content or wording.
**Transfer to design:** Use the moments immediately before a decision point deliberately and honestly — show a security explanation right before a permission request, show real outcomes right before an upgrade prompt — so that what's made salient is directly relevant and true.
**Where the analogy breaks:** Using pre-suasive framing to *misdirect* attention away from a cost — surfacing a cheerful, unrelated image or message right as a subscription auto-renews, timed specifically to reduce scrutiny — is manufactured misdirection, not context-setting.
**Cite:** [SI-01], [SI-11]

## 9. Elaboration Likelihood Model — the two routes of persuasion
**Field & mechanism:** The ELM proposes two routes to attitude change: a *central* route, where a motivated, able audience carefully evaluates argument quality and forms durable, behavior-predictive attitudes, and a *peripheral* route, where a less motivated or less able audience relies on heuristic cues (source attractiveness, message length, number of arguments) instead of argument substance, forming weaker, less stable attitudes.
**Evidence:** Petty and Cacioppo's foundational model and subsequent experimental program show that manipulating argument quality changes attitudes mainly under high-elaboration conditions, while manipulating peripheral cues (like source expertise) changes attitudes mainly under low-elaboration conditions, and that central-route attitude change is measurably more resistant to counter-persuasion and more predictive of later behavior (Petty & Cacioppo, 1986).
**Transfer to design:** For high-stakes decisions (pricing plans, data-sharing consent, medical or financial choices), design for the central route — give real comparative information the user can actually evaluate, not just a confident tone and a big "Recommended" badge.
**Where the analogy breaks:** Deliberately engineering a low-elaboration state for a decision that deserves careful evaluation — burying material terms in dense legal text while surrounding the "Agree" button with warm color and reassuring peripheral cues — exploits the ELM to keep users on the peripheral route precisely where the central route matters most.
**Cite:** [SI-01], [SI-12]

## 10. Web credibility
**Field & mechanism:** Users form credibility judgments about a website or product very quickly, from a specific, identifiable set of surface and structural cues rather than from deep verification.
**Evidence:** In a large qualitative study asking users to think aloud while evaluating real websites, the single most frequently cited factor in credibility judgments was the site's visual design and information design/structure, ahead of the actual information content, the site's apparent motive, and its real-world affiliation or expertise (Fogg et al., 2003). The related Stanford Web Credibility Research program translated this into concrete, actionable guidelines: make claims easy to verify with outside sources, show the real people and organization behind the site, highlight genuine expertise, and — critically — avoid any error, however small, since small errors (a typo, a broken link) disproportionately damage credibility judgments.
**Transfer to design:** Invest in clean visual and information design as a credibility signal in its own right, keep every claim independently verifiable, show real named people and real contact/support channels, and treat small polish errors as trust-relevant, not merely cosmetic.
**Where the analogy breaks:** Polishing the surface specifically to compensate for a product or claim that would not survive scrutiny — a beautifully designed page for a service with no real support behind it — inverts the intended use of these guidelines, which are about making genuine trustworthiness legible, not about substituting design polish for it.
**Cite:** [SI-13], [SI-16]

## 11. The social-priming replication boundary — a caution built into the evidence itself
**Field & mechanism:** Not every "priming" claim in the social-influence literature holds up, and this specific case is itself an important lesson for design: subtle, incidental environmental cues were once believed to shift behavior automatically and unconsciously, but the strongest claims in this vein have had serious replication trouble.
**Evidence:** In an influential and widely cited study, participants primed with words related to old age (via a scrambled-sentence task) subsequently walked measurably more slowly down a hallway than participants primed with neutral words, taken as evidence that trait concepts activated outside awareness can directly drive unconscious behavior (Bargh, Chen, & Burrows, 1996). A later direct replication attempt using an automated, experimenter-blind timing method (instead of a manual stopwatch operated by a research assistant who could be aware of the hypothesis) found no such effect — until the experimenters were told what result to expect, at which point the effect reappeared, implicating experimenter expectancy rather than genuine unconscious priming as the likely original cause (Doyen, Klein, Pichon, & Cleeremans, 2012).
**Transfer to design:** Treat strong claims of subtle, unconscious environmental priming (background color subtly "primes" trust, a font subconsciously "primes" purchase intent) with real skepticism; where the underlying literature is contested, prefer the effects in this file that have held up under direct replication and larger samples (norms, reciprocity, ELM) over one-off priming claims.
**Where the analogy breaks:** Marketing a design decision as backed by "priming science" when the specific effect invoked belongs to the contested, weakly replicated end of the literature is itself a form of manipulation — persuading a stakeholder or a user with a false appeal to authority of science.
**Cite:** [SI-14], [SI-15]

## Ethics note

Every mechanism above is dual-use: reciprocity, social proof, authority, liking, scarcity, and framing all work equally well whether the underlying claim is true or fabricated, and whether the resulting choice serves the user or only the business. **Persuasion moves someone toward a choice using true information and honest framing, in a way they would still endorse after seeing exactly how they were influenced. Manipulation moves someone toward a choice by exploiting a psychological shortcut against their own interest, using false, hidden, or engineered conditions they would object to if made visible.** The line is not about which technique is used — it is about truth, transparency, and reversibility.

Large-scale audits of real products have found the manipulative end of nearly every mechanism above already deployed at scale: fabricated countdown timers and false scarcity, fake or incentivized reviews, confirmshaming, hidden costs revealed only at the last step, forced continuity, and roach-motel cancellation flows are documented, named dark-pattern categories, not hypothetical risks. Treat any instance of a technique in this file that fails the "would they thank us if they saw exactly what we did" test as out of bounds, full stop — regardless of expected conversion lift.

## Design checklist

1. **Truth first.** Every scarcity claim, social-proof number, and norm statement must be real, current, and independently verifiable by the user — never simulated, rounded up, or left stale after the underlying condition changes.
2. **Disclosure test.** Before shipping a persuasive pattern, ask whether the user would feel respected or deceived on learning exactly how and why it was used; if the honest explanation would embarrass the team, don't ship it.
3. **Reversibility.** Any commitment obtained through reciprocity, foot-in-the-door sequencing, or a default should be easy to undo — cancellation should cost no more effort than signup.
4. **Central route for high-stakes decisions.** Give real, comparable information for pricing, data-sharing, and consent choices rather than relying on peripheral cues (badges, warm colors, urgency) to carry a decision that deserves scrutiny.
5. **No manufactured urgency or false authority.** Countdown timers, "X people viewing," and trust badges must map to real, current facts; remove them the moment they stop being true.
6. **Earn liking honestly.** Warm tone and responsive support should reflect real service quality, not a persona built to lower guard before an unfavorable term.
7. **Symmetric defaults where stakes are personal.** Don't use default-on settings to obtain data-sharing or billing consent a user would refuse if asked directly (see the Deeper-dive defaults entries below).
8. **Skepticism toward exotic priming claims.** Prefer mechanisms with a strong, replicated evidence base (this file flags the ones that don't) over novel "unconscious priming" tactics with thin support.

## Deeper dive (v3)

## Reactance — persuasion's countervailing force
**Field & mechanism:** When people perceive that a choice or freedom is being restricted, removed, or pressured, they become motivationally aroused to reassert that freedom — often by moving toward the very option being discouraged, or resisting the option being pushed, independent of the option's actual merit.
**Evidence:** Brehm's original theory holds that reactance is proportional to the importance of the restricted freedom and the strength of the threat to it (Brehm, 1966). A later review consolidates decades of follow-up work showing reactance reliably undermines heavy-handed health and safety messaging (bans, strong "you must" language) and identifies moderators — message strength, perceived freedom, and audience trait reactance — that predict when a persuasive push will backfire into its opposite, the "boomerang effect" (Steindl et al., 2015).
**Transfer to design:** Preserve visible choice in persuasive UI — offer an easy, unshamed "no thanks," avoid forced-choice interstitials and repeated nags, and phrase guidance as information rather than command wherever the stakes allow it.
**Where the analogy breaks:** Deliberately engineering reactance to make a restricted or "forbidden" option more desirable (manufactured "banned in your region," artificial waitlists implying restriction) weaponizes the same mechanism the ethical version is designed to avoid triggering.
**Cite:** [SIX-01], [SIX-02]

## Inoculation theory — building resistance to bad persuasion
**Field & mechanism:** Like a medical vaccine, exposing someone to a weakened version of a counter-argument along with its refutation builds resistance to a later, stronger persuasion attempt making the same argument — a "prebunking" rather than a "debunking" strategy.
**Evidence:** McGuire's original inoculation studies showed that pre-exposing people to a weak challenge to a cultural belief, paired with a refutation, made them significantly more resistant to a subsequent strong attack than people given only supportive information or no preparation at all (McGuire, 1964). A modern review traces the theory's maturation into a well-supported framework now applied well beyond its original political/health-belief context, including consumer resistance to misleading marketing claims (Compton & Pfau, 2005).
**Transfer to design:** Pre-expose users to a mild version of a manipulative pattern they're likely to encounter elsewhere (a short explainer on how fake urgency or fake reviews work) so they're equipped to evaluate persuasive claims critically, inside and outside the product.
**Where the analogy breaks:** Using "inoculation" framing to pre-emptively and unfairly discredit legitimate criticism of your own product (priming users to dismiss real complaints as "misinformation") repurposes a resistance-to-manipulation tool as a manipulation tool itself.
**Cite:** [SIX-03], [SIX-04]

## Descriptive vs. injunctive norms — and the boomerang effect
**Field & mechanism:** Reporting a purely descriptive norm ("you use more energy than your efficient neighbors") can backfire on people already below the norm, nudging them to consume *more* to match it — the boomerang effect — unless an injunctive signal of approval or disapproval is attached.
**Evidence:** In a large home energy-use field experiment, households that used less energy than their neighborhood average, when told only the descriptive comparison, subsequently increased their usage toward the average; adding a simple injunctive cue — a smiley or frowny-face icon signaling social approval or disapproval — eliminated the boomerang for low users while preserving the desired reduction among high users (Schultz et al., 2007).
**Transfer to design:** Never show a purely descriptive comparison ("you're below average") without an injunctive signal of which direction is actually desired; users already performing well should be reinforced, not nudged toward the mean.
**Where the analogy breaks:** Deliberately omitting the injunctive cue to trigger a boomerang that increases consumption or engagement for profit (nudging light users toward heavier use by showing only "you use less than most people") turns a documented failure mode into an exploit.
**Cite:** [SIX-05]

## Identifiable-victim effect
**Field & mechanism:** People feel more sympathy, and give more, in response to a single identified individual's story than to statistically identical or larger-scale aggregate suffering — and, counterintuitively, prompting people to think analytically/statistically about a request reduces sympathy for an identified victim without increasing sympathy for a statistical one.
**Evidence:** Experiments manipulating whether a request for donations featured a single named, pictured child or population-level statistics found substantially higher giving for the identified individual, and a deliberative "calculation" prompt inserted before the identified-victim appeal reduced donations toward that individual (a "collapse of compassion" effect) (Small, Loewenstein, & Slovic, 2007).
**Transfer to design:** Where a real, individual story is available and consented to, using it to make an abstract cause concrete (a specific user's account of how a feature helped them) is a legitimate way to build genuine empathy for genuine impact.
**Where the analogy breaks:** Fabricating or staging an "identifiable victim" narrative — a fictional customer story, a stock photo presented as a real user — to manufacture urgency for a donation ask or purchase is fraud wearing this effect's mechanism.
**Cite:** [SIX-06]

## Defaults as choice architecture
**Field & mechanism:** Because most people accept whatever option is pre-selected — from inertia, implied endorsement, or effort avoidance — the default option in a choice exerts an outsized, often decisive effect on the final outcome, frequently larger than the effect of the underlying preference itself.
**Evidence:** Cross-country comparisons of organ-donation policy found effective consent rates around an order of magnitude higher in countries using an opt-out (presumed-consent) default than in otherwise culturally similar countries using an opt-in default — a gap far too large to be explained by underlying attitude differences alone (Johnson & Goldstein, 2003; the same study is cited as BE-06 in the behavioral-economics reference file).
**Transfer to design:** Set defaults to the option that best serves the user's own stated goals and safety (secure settings on, notifications reasonable, privacy protective) — the default is a design decision with real behavioral weight, not a neutral placeholder.
**Where the analogy breaks:** Defaulting to the option that serves the business over the user — pre-checked marketing consent, opt-out (not opt-in) data sharing, a pricier plan pre-selected at checkout — turns the well-documented power of defaults into a dark pattern the moment the default no longer matches what an informed user would choose.
**Cite:** [SIX-07]

## Privacy defaults specifically
**Field & mechanism:** The general default effect above is especially strong, and especially consequential, in privacy and data-sharing decisions, where the opt-in/opt-out framing of a consent choice can swing participation by very large margins on its own.
**Evidence:** Controlled studies of opt-in versus opt-out framing for sharing personal information with third parties found participation rates shifted dramatically simply from which state was pre-selected, with the pre-selected option read by participants as the implicitly recommended or normal choice regardless of their actual underlying privacy preference (Johnson, Bellman, & Lohse, 2002).
**Transfer to design:** Make privacy- and data-sharing defaults opt-in, not opt-out, whenever the sharing is not strictly required for the service to function, and state plainly what the default means before the user reaches it.
**Where the analogy breaks:** Pre-checking broad data-sharing or third-party marketing consent and requiring the user to find and uncheck it is one of the most heavily scrutinized dark patterns in privacy regulation (GDPR consent rules exist substantially because of this exact mechanism); it is a direct, well-evidenced misuse of this effect.
**Cite:** [SIX-08]
