# Human factors & safety-critical systems -> design

Human factors engineering studies how operators perceive, decide, and act inside high-stakes systems — cockpits, control rooms, operating theaters, nuclear plants — where a missed signal or a slip of the hand has consequences measured in lives, not lost clicks. The field built its models (signal detection, error taxonomies, situation awareness, workload) precisely because "just be careful" doesn't scale as a safety strategy; systems have to be built so that normal human perception, attention, and memory fail gracefully. Everyday software rarely carries aviation-grade stakes, but its errors, alerts, forms, and confirmations are the exact same class of problem at lower amplitude: users miss things, misread state, get too many warnings to trust any of them, and over- or under-trust automation. This file imports the load-bearing findings and states plainly where the transfer holds and where it doesn't.

## Signal detection & the alarm problem

**Field & mechanism:** Signal Detection Theory (SDT) separates a detector's *sensitivity* (how well signal and noise can actually be discriminated, d′) from its *criterion* (where the observer sets the threshold for calling something a "signal"). Every detection decision falls into one of four cells — hit, miss, false alarm, correct rejection — and moving the criterion always trades misses against false alarms; you cannot lower both by decree, only by improving sensitivity or changing the payoff structure. Sorkin extended this directly to engineered alarms: an alarm system is a detector too, and its designer picks a criterion (how sensitive to make the trigger) that trades missed true events against nuisance false alarms.

**Evidence:** Green & Swets formalized SDT from psychophysics and radar operation, showing the hit/false-alarm tradeoff is a property of the criterion, not the observer's competence. Sorkin's applied analysis of alarm systems showed that when false-alarm rates are high relative to the base rate of true events, operators rationally recalibrate their trust and respond more slowly, ignore, or disable the alarm — a "cry wolf" dynamic that is a predictable consequence of the underlying statistics, not operator carelessness.

**Transfer to design:** Any alerting mechanism — form validation errors, destructive-action warnings, system notifications — is a detector with a criterion. Tune the criterion to the real cost of a miss versus a false alarm for that specific alert, not one global sensitivity for everything. Low-stakes issues (a slightly weak password) warrant a lenient, low-friction criterion; high-stakes ones (irreversible deletion) warrant a stricter, harder-to-miss one. Track false-alarm rate as a first-class design metric for any warning/error system, the same way an alarm engineer would.

**Where the analogy breaks:** SDT assumes an objectively verifiable ground truth for what counts as a "true signal" (a real radar contact, a real patient event). Many UI "alerts" — a nagging save-your-progress banner, a marketing modal — have no such ground truth, so the hit/false-alarm framing is a loose metaphor there, not a literal measurement.

**Cite:** [HF-01], [HF-02]

## Human error: slips, lapses, mistakes & the Swiss cheese model

**Field & mechanism:** Reason's Generic Error-Modeling System distinguishes error types by where the failure occurs in the action cycle: *slips* and *lapses* are execution or memory failures under a correct intention (you meant to click Save, you clicked Delete because the icons swapped position), while *mistakes* are planning failures — the wrong intention was formed in the first place, whether by misapplying a familiar rule or reasoning badly through something novel. The Swiss cheese model reframes accidents as the product of a system, not a person: every defensive layer (procedures, interface constraints, training, oversight) has holes, most holes are latent and harmless alone, and a bad outcome only occurs when holes in successive layers momentarily align.

**Evidence:** Reason's taxonomy and the Swiss cheese model were developed from and validated against real accident investigations across aviation, nuclear power, and healthcare, where post-incident analysis repeatedly found not one culpable error but a chain of small, individually survivable weaknesses.

**Transfer to design:** Slips call for interface-level defenses — irreversible and reversible actions should not sit adjacent with similar affordances; destructive actions should require a distinguishing confirmation step. Mistakes call for better cues and mental models — if users routinely form the wrong intention, the interface's signifiers are miscommunicating, not the user. When triaging a bug or an incident, look for the *chain* of contributing design weaknesses (ambiguous label + no confirm step + no undo) rather than stopping at "user error."

**Where the analogy breaks:** The Swiss cheese model was built to explain organizational, multi-layered systemic failures (an aircraft accident involving maintenance, procedure, and crew). Applying it to a single-user UI slip can overstate the case — sometimes one bad button placement really is the whole story, and reaching for a "systemic layers" narrative can obscure a simple, cheap fix.

**Cite:** [HF-03], [HF-04]

## Situation awareness

**Field & mechanism:** Endsley's model defines situation awareness (SA) in three levels: Level 1 is perceiving the relevant elements in the environment, Level 2 is comprehending what those elements mean together, and Level 3 is projecting their future state. SA is a working-memory-bound, actively maintained mental model of "what's happening and where this is going," and it decays quickly if the interface stops refreshing it.

**Evidence:** Endsley's framework emerged from and was validated against operator performance in dynamic, high-tempo domains (air traffic control, aviation), where loss of SA — not lack of skill — was repeatedly identified as the proximate cause of operator error.

**Transfer to design:** Dashboards, monitoring tools, and any interface tracking a changing system should support all three levels, not just the first: show current elements (status, counts), show what they mean together (is this combination normal or abnormal), and show trajectory (is this getting better or worse, and how fast). Don't force users to reconstruct system state from memory across screens; persist and surface it.

**Where the analogy breaks:** SA research targets continuously changing, safety-critical environments monitored by trained operators under time pressure. Most software state is far more static and forgiving — a project management board doesn't decay the way an aircraft's flight state does — so importing the full three-level rigor everywhere is over-engineering for low-tempo, low-stakes contexts.

**Cite:** [HF-05]

## Workload measurement: NASA-TLX

**Field & mechanism:** NASA-TLX is a multidimensional subjective workload rating instrument, scoring a task on six weighted sub-scales — Mental Demand, Physical Demand, Temporal Demand, Performance, Effort, and Frustration — that combine into a single workload index used to compare tasks or interface designs.

**Evidence:** Hart & Staveland developed and validated TLX across dozens of laboratory and applied tasks, establishing it as the standard subjective workload metric in aviation and human-factors research, reliably distinguishing higher- from lower-demand task variants.

**Transfer to design:** Workload is a design variable, not just a UX vibe — a dense dashboard or a long checkout flow can be interrogated along the same six axes to find *which* dimension is overloaded (is it mental demand from too many decisions, or frustration from unclear error recovery?) rather than treating "this feels like a lot" as unactionable.

**Where the analogy breaks:** TLX is a self-report instrument calibrated and normed on aviation/military/lab tasks; its absolute scores don't transfer cleanly across very different task domains, and self-reported workload can itself be reactive to the act of measurement. Treat it as a structured way to decompose *where* load comes from in a design review, not as a portable numeric benchmark.

**Cite:** [HF-06]

## Alarm fatigue & the cry-wolf effect

**Field & mechanism:** When alarms fire far more often than they indicate a real, actionable event, operators habituate: response slows, alarms get silenced, thresholds get widened past safe limits, or devices get muted altogether. This is the applied, large-scale consequence of the signal-detection criterion problem above, documented at population scale in clinical settings.

**Evidence:** The Joint Commission's Sentinel Event Alert 50 named alarm fatigue a national patient-safety hazard after reviewing hundreds of alarm-related adverse events. Cvach's integrative review compiled studies showing clinical monitors can generate hundreds of alarms per patient per day with the vast majority non-actionable. Sowan and colleagues' survey of ICU nurses documented the direct behavioral response: widening alarm limits, adjusting or disabling alarms, and reduced trust in the system, driven by sheer volume.

**Transfer to design:** Every notification, badge, and warning drawn from the same channel competes for the same finite trust budget. Reserve interrupting, urgent-styled alerts for events that are both rare and actionable; route everything else to a calmer, non-modal channel (a log, a digest, a quiet badge). If an alert type's dismiss-without-reading rate climbs, that is a leading indicator the channel is being trained into irrelevance — the fix is raising the bar for what fires, not restyling the alert to be louder.

**Where the analogy breaks:** These findings come from ICU contexts with extreme alarm density (hundreds of alerts per patient per day) and near-continuous life-critical monitoring. Most consumer software's notification volume is orders of magnitude lower, so the specific thresholds (e.g., what false-alarm rate triggers fatigue) don't port over numerically — only the qualitative mechanism does.

**Cite:** [HF-07], [HF-08], [HF-09], [HF-10]

## Automation complacency & automation bias

**Field & mechanism:** Parasuraman & Riley's taxonomy separates automation *misuse* (over-reliance — reduced monitoring of a system that's actually working, i.e., complacency) from *disuse* (under-reliance — ignoring or turning off automation that is actually reliable, out of distrust). Parasuraman & Manzey's review further distinguishes complacency (attenuated monitoring effort) from automation *bias*, where users substitute the automation's output for their own vigilant information-seeking, producing both omission errors (not noticing the automation failed to do something) and commission errors (following an automated recommendation despite contradicting evidence in front of them).

**Evidence:** Skitka, Mosier & Burdick's decision-making experiments demonstrated automation bias directly: participants using an automated decision aid made more errors of both types than participants without one, including trained, experienced participants who "should have known better" — the bias is a structural property of relying on automation as a heuristic, not a competence gap.

**Transfer to design:** AI-assisted and auto-filled features need friction proportional to stakes: surface confidence/uncertainty rather than presenting outputs as flatly authoritative, require active confirmation before a high-stakes automated suggestion is committed, and periodically surface ground-truth information so users don't lose the calibration to catch a wrong suggestion. Avoid "rubber-stamp" UI where accepting the default is a single low-effort tap and reviewing it requires real work — that shape of interaction is exactly what produces omission errors.

**Where the analogy breaks:** The founding studies used trained operators in high-stakes, monitoring-heavy tasks (flight decks, batch-process control, X-ray screening) under sustained time pressure. Casual, low-stakes consumer AI features (an autocomplete suggestion with a one-tap undo) carry much lower cost per miss, so the same design remedy (forced confirmation, friction) is good practice but the urgency and appropriate friction level differ by orders of magnitude from the source domain.

**Cite:** [HF-11], [HF-12], [HF-13]

## Stimulus-response compatibility & natural mapping

**Field & mechanism:** Fitts & Seeger showed that reaction time and error rate depend on the spatial/relational correspondence between a stimulus array and the response array used to act on it — compatible layouts (a right-side light paired with a right-side switch) are faster and more accurate than incompatible ones, because compatible mappings require no extra mental recoding step. Norman generalized this into "natural mapping": design where the spatial and functional relationship between controls and their effects matches the user's real-world expectation, alongside affordances, signifiers, and feedback, is the difference between an interface that feels obvious and one that requires memorization.

**Evidence:** Fitts & Seeger's original reaction-time experiments across multiple stimulus-response layouts quantified the compatibility effect directly. Norman's subsequent analysis of everyday artifacts (stove-knob-to-burner mapping is the canonical example) extended the finding from lab reaction-time tasks to the design of physical and digital products broadly.

**Transfer to design:** Controls should sit spatially near, and be laid out congruently with, the thing they affect — a volume slider's up direction should mean louder, a settings toggle's on-state should read unambiguously as on, tab order should match visual/reading order. Where multiple controls parallel multiple effects (an equalizer, a settings grid), preserve their real-world or previously-learned spatial correspondence rather than optimizing layout for something else (alphabetical order, screen space) that breaks the mapping.

**Where the analogy breaks:** The original compatibility studies used discrete physical switches and lights with unambiguous, culturally uniform spatial relationships. Touchscreen and gestural interfaces often have no fixed physical layout to be "compatible" with, and what counts as a natural mapping there is itself a learned convention (swipe-to-dismiss, pull-to-refresh) that varies by platform and cohort — the underlying principle (match action to expectation) holds, but "natural" is doing more cultural work than it did on a physical control panel.

**Cite:** [HF-14], [HF-15]

## Arousal and performance: the Yerkes-Dodson law

**Field & mechanism:** Yerkes-Dodson describes an inverted-U relationship between arousal and performance: performance rises with increasing arousal up to an optimum, then falls as arousal continues to increase, and the optimal arousal level is lower for difficult/complex tasks than for simple ones. Popularly, this is invoked to argue interfaces should induce "just enough" urgency or stress — too little and users are disengaged, too much and they make mistakes.

**Evidence:** The original 1908 study measured shock-avoidance maze learning in mice as a function of stimulus (shock) intensity and task difficulty. Teigen's historical/critical review traces how this narrow finding became a "law for all seasons" applied far beyond its evidentiary base, and notes that the inverted-U itself, and the difficulty-dependent optimum, are inconsistently replicated when tested directly in complex human task performance.

**Transfer to design:** Treat "add urgency to improve focus" and "reduce stress to reduce errors" as directional heuristics with real but soft support, not a precise curve to engineer against. For genuinely high-stakes, high-complexity flows (an irreversible financial transaction, a medical form), err toward calm, low-arousal design — complexity narrows the safe arousal band. For low-stakes, low-engagement tasks, some urgency cues (a visible deadline, a light progress indicator) are more likely to help than hurt.

**Where the analogy breaks:** This is the most-overextended finding in the file: the source is rodent shock-avoidance behavior, not human cognitive-interface performance, and Teigen's own critique is that the "law" is frequently cited well past what the data support. Cite it as a loose heuristic about the shape of the arousal-performance relationship, never as a quantitative model for tuning UI urgency.

**Cite:** [HF-16], [HF-17]

## Design checklist

- Set alert/warning thresholds to the real cost of a miss vs. a false alarm for that specific case — don't apply one global sensitivity to every notification type.
- Reserve interrupting, urgent-styled alerts for events that are both rare and actionable; route everything else to a calm, dismissible channel to protect the alert channel's credibility.
- Design for slips (separate destructive from routine actions, confirm before irreversible steps, offer undo) as much as for mistakes (fix ambiguous labels and mental-model mismatches) — most real incidents are a chain of small weaknesses, not one culpable click.
- Keep system state continuously visible in monitoring/dashboard UIs — current status, what it means, and where it's trending — rather than requiring users to reconstruct it from memory.
- Decompose "this feels like too much" into its actual source (decision volume, unclear recovery paths, time pressure) before redesigning; workload has separable components.
- Add friction to AI-assisted and auto-filled actions in proportion to their stakes; surface confidence and require active confirmation before committing high-stakes automated suggestions.
- Map controls' spatial and functional layout to their real-world or previously-learned effect (natural mapping) rather than to incidental constraints like alphabetization or available space.
- Favor calm, low-arousal design for high-stakes/high-complexity flows; save urgency cues for low-stakes tasks where they're more likely to help engagement than cause error.

## Deeper dive (v3)

## SEEV: where attention goes across multiple displays

**Field & mechanism:** The SEEV model predicts where an operator's visual attention will go across a multi-instrument display as a function of four factors: Salience (how visually attention-grabbing a signal is), Effort (the cost of moving attention/gaze to it), Expectancy (how likely useful information is to appear there, based on its typical event rate), and Value (how important that information is to the current task). Attention allocation is a weighted balance of these, not a simple scan pattern.

**Evidence:** Wickens and colleagues validated SEEV with eye-tracking studies of pilots monitoring multiple flight instruments and displays, showing gaze allocation across displays was well predicted by the combination of salience, effort, expectancy, and task value, outperforming simpler scanning models.

**Transfer to design:** For any UI with multiple regions competing for attention (a dashboard with several panels, a form with inline validation plus a summary sidebar), reason explicitly about all four terms: is the most valuable information also the most salient and the cheapest to reach, or is it buried somewhere low-salience/high-effort while a low-value element dominates visually? Realign salience and layout position with actual task value, not with whichever panel happened to ship first.

**Where the analogy breaks:** SEEV was built and validated on physical, fixed-position analog/digital cockpit instruments with well-characterized information bandwidth per channel. Software UI "channels" (a scrolling feed, a collapsed accordion) don't have comparably stable spatial positions or measurable event rates, so the model's effort term in particular — calibrated on eye/head movement cost between fixed instruments — maps only loosely onto scrolling, tapping, or navigating between app screens.

**Cite:** [HFX-01]

## Rasmussen's skills-rules-knowledge framework

**Field & mechanism:** Rasmussen's SRK framework describes three levels of cognitive control an operator can be in: skill-based (automatic, continuous sensorimotor performance guided directly by signals, requiring no conscious attention), rule-based (recognizing a familiar situation as a sign and applying a stored if-then procedure), and knowledge-based (a genuinely novel situation with no matching rule, requiring explicit symbolic reasoning and mental-model-based problem solving from first principles). Error types and appropriate remedies differ by level.

**Evidence:** Rasmussen developed SRK from analysis of operator behavior and error in industrial process control (nuclear and chemical plants), where distinguishing "the operator executed a wrong-but-familiar rule" from "the operator had no applicable procedure and reasoned it out wrong" led to different, targeted interventions.

**Transfer to design:** Diagnose which level a user error sits at before prescribing a fix. Skill-level errors need better perceptual feedback (make the signal driving the automatic action unambiguous). Rule-level errors need disambiguation between similar-looking situations that currently trigger the same learned response (near-identical icons, similar confirmation dialogs). Knowledge-level errors — genuinely novel situations for the user — need support for reasoning (context, explanations, safe ways to explore) rather than more procedure or more warning text, since there's no stored rule to reinforce yet.

**Where the analogy breaks:** SRK levels are conceptually distinct but not cleanly separable in a single real interaction: an expert user in a familiar app can slide between rule-based and knowledge-based processing within the same task as conditions shift. Treating "novice users = knowledge-based, expert users = skill-based" as a fixed segmentation for design personas oversimplifies a framework that was meant to classify moment-to-moment cognitive control, not user types.

**Cite:** [HFX-02]

## Mode error and mode awareness

**Field & mechanism:** In systems with multiple operating modes, the same control input or action can produce different, sometimes contradictory, outputs depending on which mode the system is currently in. Mode error occurs when the operator's belief about the current mode diverges from the system's actual mode — often because mode transitions happen automatically, asynchronously, and with weak or absent indication — and the operator then takes an action that was correct for the mode they believed they were in.

**Evidence:** Sarter & Woods's analysis of highly automated aircraft cockpits documented repeated "automation surprises" — pilots asking "what is it doing now?" — traced to indirect, easy-to-miss mode annunciation and automatic mode transitions the crew hadn't been actively tracking, producing a systematic breakdown in mode awareness independent of pilot skill or experience.

**Transfer to design:** Any UI with modes (edit vs. view, offline vs. online, draft vs. published, a toggled "focus mode") needs the current mode continuously and saliently indicated, not just indicated at the moment of the mode switch — and the same input should not silently do different things across modes without a strong, persistent visual cue to which mode is active. Be especially wary of modes the system enters automatically (auto-save toggling a document to read-only, a session silently going offline) since those are exactly the asynchronous, operator-uninitiated transitions that caused the original cockpit incidents.

**Where the analogy breaks:** The source studies concern tightly coupled, safety-critical automation where a mode error can be catastrophic and largely unrecoverable mid-flight. Most software mode confusion is lower-stakes and reversible (undo exists, a wrong save can be corrected) — the design remedy (always indicate mode, avoid silent transitions) is still good practice, but the urgency and the "surprise" cost are not comparable to a flight-deck automation surprise.

**Cite:** [HFX-03]

## The surgical safety checklist

**Field & mechanism:** A short, structured checklist executed at fixed pause points in a workflow (before anesthesia, before incision, before the team leaves the room) forces explicit verification of critical items and — crucially — a moment of forced team communication, rather than relying on individual memory or informal coordination.

**Evidence:** Haynes, Gawande, and colleagues implemented a 19-item WHO surgical safety checklist across eight hospitals internationally and measured a drop in major complication rates from roughly 11% to 7% and in-hospital death from roughly 1.5% to 0.8%, in surgical teams that were already highly trained — the gain came from process, not added skill.

**Transfer to design:** For high-stakes, multi-step workflows (account deletion, financial transfers, publishing to production, multi-party approvals), a forced, explicit pause-and-verify step — a real summary of what's about to happen with the specific consequential details spelled out, not a generic "are you sure?" — catches errors that individual attention alone misses, especially in workflows performed routinely enough that individual steps become automatic and easy to skip.

**Where the analogy breaks:** The measured effect came from expert teams under real time pressure, and is attributed partly to the checklist forcing verbal cross-checks between team members with different roles — a distinctly multi-person mechanism. A single-user UI "checklist" pattern (a static list of items with checkboxes) that has no equivalent forced-communication or independent-verification step is borrowing the visual form without the mechanism that produced the effect, and shouldn't be expected to deliver a comparable error reduction.

**Cite:** [HFX-04]

## Vigilance decrement

**Field & mechanism:** In sustained monitoring tasks with a low rate of target events, detection performance is not stable over time — it declines measurably within the first roughly 30 minutes of continuous watch and continues to decline over an extended session, even though the observer intends and believes they are maintaining constant attention.

**Evidence:** Mackworth's original "Clock Test" — participants watching a slow-moving pointer for occasional irregular jumps, a radar-monitoring analogue — demonstrated the decrement directly and established it as a robust, replicable phenomenon of sustained low-event-rate monitoring, foundational to the study of vigilance and sustained attention.

**Transfer to design:** Interfaces that require a human to continuously watch for rare events (a moderation queue, a security-monitoring dashboard, a long-running process log) should not assume detection performance stays constant over a session. Break continuous watch into shorter shifts, use automated pre-filtering to raise the target event rate the human actually has to react to, or insert active-response check-ins rather than passive watching, since passive vigilance is the specific condition that decays.

**Where the analogy breaks:** The decrement was demonstrated in unaided, continuous, low-event-rate perceptual monitoring — a human as the sole detector. Modern software monitoring is rarely unaided in that sense: automated alerting typically does first-pass detection and pushes events to the human rather than requiring passive watching, which changes the task structure enough that the classic decrement curve doesn't directly predict decay in a push-alert-based interface the way it does in a pure watch-and-detect task.

**Cite:** [HFX-05]
