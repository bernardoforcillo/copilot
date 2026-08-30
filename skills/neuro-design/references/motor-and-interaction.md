# Motor control & interaction

**The constants under this lens.** Fitts's law — movement time logarithmic in distance over target
width, which makes edges and corners effectively infinite targets and small controls a permanent
tax — is derived in `foundations/perceptual-limits.md`, along with the response thresholds
(~100 ms, ~1 s, ~10 s). Fitts does not void for expert users; Hick largely does, which is why dense
professional tools are correct for daily users and wrong for first encounters.

Every tap, drag, click, and keystroke is a movement problem before it is a visual one. The motor system trades speed against accuracy in lawful, quantifiable ways, and the nervous system's feedback loops have real latencies that interface response times either respect or fight. This lens covers the mechanics of pointing (Fitts's law), the mechanics of dragging through constrained paths (the steering law), the perceptual thresholds that make software feel "instant" versus "slow," and the two-phase (ballistic + corrective) structure of every reach, tap, or drag a user makes. Get these numbers right and interaction feels effortless; violate them and no amount of visual polish will make a control feel responsive.

## Fitts's Law (Fitts, 1954)

**Mechanism:** Pointing at a target is a speed–accuracy trade-off: the nervous system alternates coarse ballistic motion with corrective micro-adjustments driven by visual and proprioceptive feedback, and each correction costs time. The farther away and the smaller a target, the more corrective cycles are needed to land inside it.

**Evidence:** Movement time is a linear function of the *index of difficulty*: **MT = a + b·log2(2D/W)**, where D is the distance to the target's center and W is the target's width along the movement axis. The relationship holds across limbs, input devices (mouse, stylus, touch, eye-gaze), and scales — one of the most replicated quantitative laws in psychology.

**Design implications:**
- Make frequent/high-value targets both large (big W) and close (small D) to the likely starting cursor/finger position.
- Enlarging a rarely-hit target buys little; shrinking a frequently-hit one costs a lot — budget size by frequency of use, not visual weight alone.
- Screen edges and corners are effectively infinite-width targets (the pointer can't overshoot past them) — put pinned, high-frequency actions there (OS menu bars, browser corner buttons).
- Distance matters as much as size: a nearby small button can outperform a far-away large one.

**Cite:** [FITTS-54]

## Steering Law (Accot & Zhai, 1997)

**Mechanism:** Fitts's law describes acquiring a point target; many UI actions instead require guiding the pointer *through* a constrained path (a menu, a slider track, a scrollbar) without leaving its bounds. This is a continuous, not discrete, aiming task, so it obeys a related but distinct law.

**Evidence:** For a straight tunnel of length A and width W, movement time follows **MT = a + b·(A/W)** — linear in the ratio of path length to path width, rather than logarithmic as in Fitts's law, reflecting the continuous corrective demand of staying inside the tunnel for its whole length.

**Design implications:**
- Keep drag paths (sliders, nested menus, resize handles) short and wide; long, narrow paths are disproportionately punishing, not just mildly harder.
- Avoid nested hierarchical menus with narrow submenus — every pixel of narrowing multiplies traversal time, and slips force a restart.
- Widen a draggable track or handle before lengthening it if precision errors are the complaint.

**Cite:** [ACCOT-ZHAI-97]

## Response-time thresholds (Miller, 1968; Card, Robertson & Mackinlay, 1991; Nielsen, 1993)

**Mechanism:** Human perception of "responsiveness" is not continuous — it is organized around a small number of qualitatively different experience bands tied to attention and working-memory limits: below one band the system feels like a direct extension of the body; above another band the user's attention disengages from the task entirely.

**Evidence:** Three widely replicated thresholds: **~0.1 s** — feels instantaneous, perceived as direct manipulation with no perceptible cause-and-effect gap; **~1 s** — the limit for keeping the user's flow of thought uninterrupted, though the delay is noticed; **~10 s** — the limit for keeping the user's attention on the task at all; beyond it, users mentally (or literally) switch away and need explicit progress feedback to be pulled back.
- 0.1 s: direct-manipulation feel (drag, hover, toggle).
- 1 s: navigation/search feel (user waits, but stays engaged, no spinner needed).
- 10 s: task-abandonment risk without a progress indicator.

**Design implications:**
- Anything the user directly manipulates (drag, resize, type) must respond within ~100 ms — no exceptions, even if the underlying operation is asynchronous (fake it optimistically).
- Operations between 100 ms and 1 s need no special affordance but should not be padded further.
- Operations past ~1 s need a busy indicator; past ~10 s need a determinate progress bar and an option to cancel or continue elsewhere.

**Cite:** [MILLER-68], [CARD-91], [NIELSEN-93]

## The Doherty threshold (Doherty & Thadani, 1982)

**Mechanism:** Below a critical system response latency, a user's cognitive rhythm stays locked to the machine's rhythm — they keep issuing the next action, sustaining flow. Above that latency, attention decouples from the task, engagement drops, and — measured economically — so does throughput and job satisfaction.

**Evidence:** IBM's internal productivity studies found computer response times of **~400 ms or faster** produced measurable gains in operator productivity and lower error rates compared to slower response, with returns flattening below that mark — establishing sub-half-second response as the economically justified target for interactive systems, not merely a "nice to have."

**Design implications:**
- Treat ~400 ms as the practical ceiling for perceived system response on primary actions (search-as-you-type, form validation, navigation) — even when 1 s would still meet Nielsen's "flow" threshold above.
- When true latency exceeds 400 ms, use optimistic UI updates or skeleton screens to keep the *perceived* response under the threshold.
- Instrument and monitor p95 interaction latency, not just averages — tail latency is what breaks the Doherty threshold for real users.

**Cite:** [DOHERTY-82]

## Woodworth's two-component model of aiming (Woodworth, 1899)

**Mechanism:** A goal-directed movement is not one continuous motion but two functionally distinct phases: an initial fast, ballistic "impulse" phase covering most of the distance under open-loop (feedforward) control, followed by a slower "current control" phase of small, visually-guided corrective adjustments that home in on the target.

**Evidence:** Woodworth's original tracing-and-tapping experiments showed that accuracy dropped sharply when visual feedback was removed *during* the second (corrective) phase but not during the first (ballistic) phase, and that movement accuracy scaled with available time for corrections — establishing the speed–accuracy trade-off later formalized by Fitts.

**Design implications:**
- Don't expect corrective precision during fast flicks/swipes — design gestures so the ballistic phase alone is forgiving (generous target width) rather than relying on the user's fine correction.
- Provide continuous visual feedback (cursor position, drag preview) throughout a movement — removing it mid-drag disables the corrective phase and degrades accuracy.

**Cite:** [WOODWORTH-1899]

## Closed-loop motor control (Keele, 1968)

**Mechanism:** The corrective ("current control") phase of a movement is not free — each error-correcting adjustment requires a full perceive-decide-act feedback cycle through the nervous system, which takes measurable processing time. Movements too fast or too short to allow even one such cycle cannot be corrected mid-flight.

**Evidence:** Keele's review of reaction-time and movement-accuracy data placed the minimum time for a single visually-guided feedback correction at roughly 190–260 ms; movements shorter than this are effectively pre-programmed and ballistic, with no possibility of in-flight correction.

**Design implications:**
- For very short, fast interactions (double-taps, quick swipes) don't expect or require mid-gesture correction — validate after the gesture completes, not during it.
- Where precision matters (drawing, fine drag), keep the interaction slow enough, or the target large enough, that at least one ~200 ms corrective loop can occur before commit.

**Cite:** [KEELE-68]

## The two-component model, a century on (Elliott, Helsen & Chua, 2001)

**Mechanism:** A full century of kinematic and electromyographic (EMG) data validate and refine Woodworth's original ballistic-then-corrective account: modern research shows the "ballistic" phase itself is often pre-planned as an intentionally *undershooting* primary submovement, with one or more small secondary submovements homing in afterward — a strategy that trades a near-certain small correction for a lower risk of a costly overshoot-and-reverse.

**Evidence:** Reviewing decades of studies, Elliott et al. show movement accuracy and duration are best explained by this "optimized submovement" refinement of Woodworth's model rather than by a single continuous impulse, and that the corrective sub-movement's amplitude scales predictably with target width and initial-phase variability.

**Design implications:**
- Expect users' fast movements toward small targets to systematically undershoot slightly before a final corrective micro-adjustment — build in a small forgiving margin around precise targets (sliders, resize handles) rather than a hard edge.
- When measuring or replaying user movement data (e.g., for gesture recognition), treat the terminal deceleration/correction as informative, not noise to be filtered out.

**Cite:** [ELLIOTT-01]

## Minimum touch target size (Apple HIG; Google Material)

**Mechanism:** Touch input is imprecise relative to a mouse cursor — the finger occludes the target as it lands, and the true contact area is much larger and less certain than the visual size of a button. Platform guidelines translate accumulated usability and error-rate data into a hard minimum, functioning as an applied floor on Fitts's law's W term for thumbs and fingers.

**Evidence:** Apple's Human Interface Guidelines specify a minimum hit target of **44×44 pt**; Google's Material/Android accessibility guidance specifies a minimum of **48×48 dp** — both derived from average fingertip contact-area and touch-accuracy studies, independently converging on comparable physical sizes (~7–9 mm).

**Design implications:**
- Never ship an interactive touch target smaller than 44×44 pt / 48×48 dp, even if the visible icon is smaller — pad the invisible hit area to meet the minimum.
- Increase spacing between adjacent small targets (e.g., list-row actions) so that hit-area padding doesn't overlap and cause mis-taps.
- Treat the platform minimum as a floor, not a target — primary/frequent actions should be larger still, per Fitts's law.

**Cite:** [APPLE-HIG-TARGET], [MATERIAL-TARGET]

## Design checklist

- Size and place high-frequency targets using Fitts's law: bigger and closer beats smaller and farther, and screen edges/corners are free "infinite" targets.
- Never ship a touch target under 44×44 pt / 48×48 dp; pad the hit area invisibly if the visual icon must stay small.
- Keep drag/steering paths (sliders, menus, resize handles) short and wide — path width matters more than path length.
- Respond to direct manipulation (drag, hover, type) within ~100 ms; keep primary-action perceived latency under the ~400 ms Doherty threshold using optimistic UI where real latency is higher.
- Show a busy indicator past ~1 s and a determinate, cancelable progress bar past ~10 s.
- Preserve continuous visual feedback throughout any drag or gesture — the corrective phase of a movement depends on it.
- Give precise targets a small forgiving margin rather than a hard edge; users' fast movements systematically undershoot and self-correct.
- Don't expect or require in-flight correction on very short/fast gestures (quick taps, flicks); validate on completion instead.

## Deeper dive (v2)

## The two-thirds power law (Lacquaniti, Terzuolo & Viviani, 1983)

**Mechanism:** When drawing or tracing a curved path, the hand does not move at constant speed — it automatically slows through tight curves and speeds up through gentle ones, in a tight, involuntary, lawful relationship between local curvature and local velocity that reflects a smoothness constraint on the underlying motor plan (roughly constant angular jerk).

**Evidence:** Angular velocity is proportional to curvature raised to the two-thirds power, equivalently tangential velocity V is proportional to the local radius of curvature R raised to the one-third power: **V(t) = K·[R(t)]^(1/3)**. The relationship holds across drawing tasks, limbs, and even some non-human movement, and is one of the most robust invariants in motor control research.

**Design implications:**
- When authoring or evaluating drawn/gestural input (signature capture, sketch tools, path-based games), expect and accept natural slowing on tight curves — flagging it as "hesitation" or an error is a false positive.
- Synthetic cursor/pointer animations that trace curved paths read as more natural and less robotic when their velocity profile respects the two-thirds power law rather than moving at constant speed.

**Cite:** [MOT-LACQUANITI-83]

## Crossing-based interaction (Accot & Zhai, 2002)

**Mechanism:** Target acquisition doesn't require landing inside a bounded region and stopping — the same underlying steering-law dynamics apply to the simpler act of crossing a goal line or boundary, which can be faster and more error-tolerant than point-and-click because there is no need to stop precisely inside a boundary, only to cross it.

**Evidence:** Extending the steering law, Accot & Zhai show crossing a line of width W (equivalent to a target's tolerance) behaves like acquiring a Fitts-style target at that boundary, and that crossing-based widgets (goal-crossing menus, "swipe past" toggles) can outperform point-and-click widgets of comparable size, especially under time pressure or with imprecise input devices.

**Design implications:**
- Prefer crossing gestures (swipe-to-confirm, drag-past-threshold) over precise-stop targets for fast, low-precision confirmations — e.g., a "slide to unlock" or dismiss gesture is more forgiving than a small tap target.
- Use crossing-based interaction as an accessibility-friendly alternative for users with tremor or imprecise pointing, since it removes the need to stop exactly on target.

**Cite:** [MOT-ACCOT-ZHAI-02]

## FFitts law: modeling the "fat finger" problem (Bi, Li & Zhai, 2013)

**Mechanism:** Standard Fitts's law assumes a point-like cursor; a finger is not a point — it occludes the target as it lands, and its actual landing position has systematic offset (bias) and variability (noise) relative to the visual target center, both of which are independent of the button's nominal size.

**Evidence:** The FFitts law reformulates the index of difficulty using the finger's empirically measured landing-point *offset* and *standard deviation* rather than the nominal button width, giving a substantially better fit to touch-target error rates than classic Fitts's law and revealing that a visually-adequate button can still have high miss rates if the offset/variance of typical finger placement isn't accounted for.

**Design implications:**
- Measure or budget for touch offset bias (fingers commonly land slightly below/right of the intended target) when placing small controls — don't assume the visual center is the effective center.
- When two touch targets are adjacent, effective error rate depends on finger landing variance, not just the gap between visual boundaries — err on the side of more spacing than Fitts's law alone would suggest.

**Cite:** [MOT-BI-13]

## Thumb-zone reachability (Bergström-Lehtovirta & Oulasvirta, 2014)

**Mechanism:** One-handed mobile use constrains the thumb to a biomechanically limited arc pivoting from the base of the hand; reachable, comfortable, and accurate zones on the screen are not uniform — they are shaped by grip, hand size, and phone dimensions, producing predictable "easy" and "hard" regions of the screen.

**Evidence:** Modeling the thumb's functional area from grip kinematics and empirical touch data, Bergström-Lehtovirta & Oulasvirta show accuracy and comfort degrade systematically toward the screen's top corners and the edge opposite the gripping hand, while the lower-center arc stays consistently reachable and accurate across hand sizes and phone models.

**Design implications:**
- Place frequent one-handed actions (primary navigation, compose/send, back) in the lower-center "thumb zone"; reserve top corners for rarely-used or destructive/low-frequency actions.
- Don't assume symmetric reachability — a right-hand-gripped phone has a different hard-to-reach zone than a left-hand grip; avoid placing primary actions asymmetrically without accounting for this.

**Cite:** [MOT-BERGSTROM-14]

**See also (cross-domain):** `cross-domain/human-factors-safety.md`, `cross-domain/multisensory-audio-haptics.md`

## Deeper dive (v3)

## Power law of practice (Snoddy, 1926; Newell & Rosenbloom, 1981)

**Mechanism:** Performance time (or error rate) on a skilled task decreases with practice, but not linearly or exponentially at the individual-trial level in the aggregate — pooled across large numbers of trials or subjects, improvement follows a strikingly consistent power-function decay, one of the most general quantitative regularities in the study of skill acquisition.

**Evidence:** Snoddy's mirror-tracing data first showed learning curves fit a power function; Newell & Rosenbloom formalized this as the **power law of practice**: **T_N = T_1·N^(−α)**, where T_N is time on trial N, T_1 is time on the first trial, and α is a learning-rate constant — shown to hold across perceptual, motor, and cognitive skills spanning orders of magnitude of practice.

**Design implications:**
- Expect the steepest usability/efficiency gains in a new UI or workflow during a user's first few uses, with rapidly diminishing (but never-zero) returns thereafter — front-load onboarding help accordingly and fade it as fast as the curve does.
- Don't judge a novel interaction pattern's efficiency from first-use data alone; benchmark after a realistic number of repetitions since early trials sit on the steepest part of the curve.

**Cite:** [MOT2-SNODDY-26], [MOT2-NEWELL-81]

## Boundary condition: the exponential-law critique (Heathcote, Brown & Mewhort, 2000)

**Mechanism:** The clean power-law shape found in classic studies is largely an artifact of averaging: individual learners' practice curves are frequently better described by an *exponential* decay, and averaging together many individual exponential curves — each with a different learning rate — mathematically produces a curve that looks like a power function even though no single learner actually follows one.

**Evidence:** Reanalyzing classic and new practice datasets at the individual-subject level, Heathcote et al. show the exponential model **T_N = a + (T_1 − a)·e^(−α(N−1))** fits individual learning curves as well as or better than the power law, while the power law only wins when data are averaged across subjects or practice blocks — a textbook case of an aggregation artifact.

**Design implications:**
- Treat "the power law of practice" as a population-level regularity, not a guarantee about any specific user's learning trajectory — individual users may plateau faster (or slower) than the aggregate curve predicts.
- When analyzing your own product's learning-curve or time-on-task data, fit models at the individual-user level before drawing conclusions about the *shape* of learning, not just pooled averages.

**Cite:** [MOT2-HEATHCOTE-00]

## The kinematic chain: asymmetric bimanual action (Guiard, 1987)

**Mechanism:** In skilled two-handed tasks, the hands are not functional equals — they form a kinematic chain in which the non-dominant hand sets a coarse, low-frequency spatial/temporal frame of reference (e.g., holding and orienting paper) within which the dominant hand performs fine, high-frequency, high-precision movement (e.g., writing). This division of labor is a general principle of skilled bimanual coordination, not a habit specific to handedness training.

**Evidence:** Guiard's analysis across writing, tool use, and everyday bimanual tasks shows the non-dominant hand consistently precedes the dominant hand's movement, operates at lower spatial and temporal resolution, and defines the reference frame the dominant hand's finer movements are nested within — a reliable asymmetry, not an arbitrary convention.

**Design implications:**
- In two-handed touch/stylus interfaces, assign coarse framing/navigation actions (panning, rotating the canvas, holding a modifier) to the non-preferred hand and fine manipulation (drawing, precise selection) to the preferred hand, mirroring the natural kinematic chain rather than splitting tasks arbitrarily.
- Don't design bimanual gestures that require both hands to perform equally fine-grained motion simultaneously — it fights the brain's natural asymmetric division of labor and increases error.

**Cite:** [MOT2-GUIARD-87]

## Schema theory of motor learning (Schmidt, 1975)

**Mechanism:** Rather than storing a distinct motor program for every possible movement, the motor system stores generalized programs plus two learned "schemas" abstracted from the relationship across many past trials between (a) initial conditions and response specifications and (b) the resulting sensory feedback and actual outcome: a *recall schema* used to select movement parameters (force, speed, direction) before acting, and a *recognition schema* used to evaluate incoming feedback and detect errors during and after acting.

**Evidence:** Schmidt's synthesis of variability-of-practice findings shows that practicing a *class* of related movements with varied parameters (not just repeating one exact movement) produces stronger, more transferable schemas and better performance on entirely novel instances of the movement class than repetitive practice of a single instance — the variability itself is what builds the generalizable schema.

**Design implications:**
- When teaching a gesture or interaction pattern, expose users to it across varied contexts/parameters (different target sizes, positions, speeds) rather than one fixed drill — this builds a transferable schema, not a narrow, brittle habit.
- Expect users to generalize a learned gesture to novel-but-similar situations (which can help or hurt); test new features against the schemas users likely already built from prior interactions with your product's gesture vocabulary.

**Cite:** [MOT2-SCHMIDT-75]

## The Keystroke-Level Model (Card, Moran & Newell, 1980)

**Mechanism:** Expert, routine task performance can be decomposed into a small set of primitive physical and mental operators, each with an empirically stable duration, letting total task-execution time be predicted by summing operator times — without running a user study — for any task expressible as a sequence of those operators.

**Evidence:** The KLM defines operators including **K** (keystroke, ~0.2 s for an average typist), **P** (pointing, governed by Fitts's law, ~1.1 s average), **H** (homing hand to device, ~0.4 s), **D** (drawing), **M** (mental preparation, ~1.35 s), and **R** (system response, wait time); total predicted time is the sum of the operator sequence, validated against measured expert task times across a range of interactive systems.

**Design implications:**
- Use KLM operator counts as a cheap, study-free way to compare the *expert* efficiency of two competing workflow designs (e.g., counting keystrokes + pointing operations + mental steps) before investing in a usability study.
- Every extra mental-preparation step (M, ~1.35 s) a workflow forces — an unnecessary decision point, an ambiguous label requiring a pause to parse — costs more expert time than most people expect; minimizing decision points is often cheaper than minimizing keystrokes.

**Cite:** [MOT2-CARD-80]

**See also (cross-domain):** `cross-domain/habit-behavior-change.md`, `cross-domain/embodied-cognition.md`
