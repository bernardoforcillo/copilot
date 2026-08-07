# Interruption science & the attention economy -> design

Interruption research grew out of a simple observation about real office work: almost nobody works on one task uninterrupted from start to finish. Email arrives, a colleague stops by, a notification fires, and the worker has to suspend one goal, handle another, and — often much later — pick the first one back up. Cognitive scientists and HCI researchers built a body of work around exactly this cycle: how memory holds a suspended goal, when an interruption costs the least, and what happens to performance and affect when it doesn't. In parallel, a separate but overlapping literature — part media studies, part business strategy, part philosophy — treats attention itself as the scarce resource that products, platforms, and notification systems compete for, and asks what obligations designers have when they hold that leverage. This file imports both bodies of work: the cognitive mechanics of interruption and resumption, and the ethical frame for attention capture that sits on top of it. The transfer target is concrete — notification timing and batching, focus/do-not-disturb modes, and resumption cues — not abstract restraint.

## The cost of interrupted work: speed, stress, and a persistent myth

**Field & mechanism:** When knowledge workers are interrupted mid-task, the naive expectation is that the interrupted task simply takes longer to finish. Field research on real office workers instead found a compensatory pattern: people speed up to make up for lost time, so total completion time for the interrupted task is not reliably longer — but the speed-up is not free. It comes paired with measurably higher stress, frustration, time pressure, and effort. A companion diary-study approach — having workers log their own task switches and interruptions across a real workday rather than in a lab — showed that this pattern is pervasive rather than a lab artifact, and surfaced the idea of "working spheres": clusters of related tasks and documents a person is juggling, where switching *between* spheres is reported as more disruptive and harder to resume than switching within one.

**Evidence:** Instrumented, in-situ observation of real office workers (interruption logging plus physiological/self-report stress measures) found interrupted work was completed in comparable or less time than uninterrupted work, with significantly elevated subjective stress and frustration — a compensatory speed-up, not a resumption-delay effect. A separate diary-logging field study of task switching across real workdays corroborated that interruptions and resulting task fragmentation are constant features of information work, not an occasional nuisance.

**Transfer to design:** Don't optimize interruption-heavy tools purely for "time to complete" — a user can hit the same completion time while accumulating stress that shows up later as errors, disengagement, or abandonment. Track frustration and perceived pressure (via lightweight in-product signals or periodic surveys) alongside throughput. Treat "working spheres" as a real design unit: grouping related tasks, tabs, or documents together, and making it cheap to tell which sphere a given interruption belongs to, reduces the harder, cross-sphere kind of switch.

**Where the analogy breaks:** A widely repeated claim about interruption research asserts a long, precise, universal time-to-resume figure after any interruption. That specific claim does not come from this line of research and should not be cited as if it did — the actual, evidenced finding is a stress/speed tradeoff with high individual and task-dependent variability in resumption time, not a single fixed number that applies to every interruption or every worker.

**Cite:** [IN-01], [IN-02]

## Memory for goals and the mechanics of resumption

**Field & mechanism:** A suspended task's goal has to be held somewhere between the moment of interruption and the moment of resumption. The memory-for-goals model treats a pending goal as a memory trace whose activation decays over time — the longer and more demanding the intervening interruption, the weaker the trace — but activation can be restored by cues associated with the original task (a half-finished sentence, an open document, a visible partial state). Separately, whether people get advance notice of an interruption changes what they do with the moments before it: given the chance, people often perform brief "resumption planning" — a quick mental note or rehearsal of where they are and what comes next — which measurably shortens the time and effort needed to pick the task back up.

**Evidence:** Cognitive modeling work grounded in activation-based memory theory formalized goal decay and cue-driven reactivation as the mechanism behind resumption success and failure. Controlled interruption experiments that varied whether participants had warning before being interrupted found that those who engaged in brief preparatory encoding resumed the primary task faster and with fewer errors than those interrupted without warning.

**Transfer to design:** Leave state cues behind when a task is suspended — a visible draft, a highlighted "you were here" marker, a short auto-generated summary of in-progress state — rather than requiring the user to reconstruct where they left off from memory alone. Where the system controls interruption timing (a save prompt, a sync conflict, a modal), give a brief warning beat before the interruption lands rather than firing it instantly, so the user has a moment to mentally bookmark their place.

**Where the analogy breaks:** The resumption-planning benefit was demonstrated for interruptions the person could anticipate by at least a few seconds. Many software interruptions (a crash, an incoming call, an urgent alert) are unannounced by nature, and building in an artificial warning delay for every interruption to manufacture this benefit would itself defeat the purpose of time-sensitive alerts — the remedy applies to interruptions the system actually controls the timing of, not all of them.

**Cite:** [IN-03], [IN-04]

## Interrupting at the right moment: breakpoints

**Field & mechanism:** Not all moments within a task are equally bad to interrupt. Tasks decompose into a hierarchy of subtasks and steps, and the boundary between two subtasks — a "breakpoint" — is a structurally lower-cost place to interrupt than the middle of one, because less in-flight mental state has to be held across the interruption. Experiments that systematically varied where within a task an interruption landed found that interruptions delivered at coarser task boundaries produced less negative affect and lower disruption than interruptions delivered mid-subtask. This motivated a follow-on line of work asking whether breakpoints could be detected automatically, building computational models from a user's ongoing interaction trace (input patterns, application state, task structure) to estimate in real time where the current low-cost breakpoints are.

**Evidence:** Controlled lab studies that varied interruption timing relative to task structure found a consistent and repeatable moment-of-interruption effect on both performance and self-reported annoyance. Follow-on modeling work using logged interaction data demonstrated that breakpoints of varying granularity could be identified computationally with reasonable accuracy from behavioral signals alone, without requiring the user to explicitly flag them.

**Transfer to design:** This is the direct evidentiary basis for notification batching and deferral: instead of delivering a notification the instant it arrives, hold it until the system can infer the user has reached a natural breakpoint (task completion, an idle beat, a navigation away from a focused view), then deliver it. Where explicit breakpoints are visible in the product's own task model (finishing a form section, saving a document, completing a checklist item), treat those moments as preferred delivery points for anything that can wait.

**Where the analogy breaks:** Breakpoint-timing studies used tasks with a clear, externally definable subtask structure (editing documents, solving puzzles with discrete steps). Much real software use is unstructured or continuous (reading, browsing, open-ended chat) where "the next breakpoint" is fuzzy or doesn't exist on a useful timescale, and inferring one from behavioral signals alone is far less reliable than in the structured tasks these studies used.

**Cite:** [IN-05], [IN-06]

## Task-switching cost

**Field & mechanism:** Switching from one task to another is not instantaneous even for simple, well-practiced tasks. Classic task-switching experiments show a measurable reaction-time and error-rate penalty when a person switches from task A to task B compared with repeating the same task, attributed to executive processes that have to reconfigure the relevant mental "task set" (which rules, goals, and stimulus-response mappings currently apply). Part of this cost persists even when the person has advance warning and time to prepare for the switch — a residual cost that active preparation alone cannot fully eliminate.

**Evidence:** Reaction-time experiments comparing task-repeat and task-switch trials, with preparation interval systematically varied, isolated a reliable switch-cost effect and showed it only partially shrinks with more preparation time, implicating an executive reconfiguration process that isn't simply "not being ready."

**Transfer to design:** Every context switch a UI forces on a user — jumping between an inbox and a document, between a chat panel and a form — carries a small but real, non-eliminable cognitive tax, even for a returning "expert" user who knows both contexts well. Minimize forced switching for tightly coupled work (keep related actions in one view rather than requiring a tab or window change) and where a switch is unavoidable, don't assume a "just glance and come back" interruption is free just because it's brief.

**Where the analogy breaks:** The measured costs come from simple, well-defined lab tasks (categorization, arithmetic) switched on a timescale of seconds. Software task switches are typically far more complex and heterogeneous, so the specific reaction-time magnitudes from these experiments don't transfer numerically — only the qualitative claim that switching has a real, partially irreducible cost does.

**Cite:** [IN-07]

## Attention residue

**Field & mechanism:** Leaving Task A before it's finished to start Task B doesn't fully free up attention for Task B — a portion of attention stays attached to the unfinished first task, a phenomenon termed attention residue, and it measurably impairs performance on the second task. The effect is reduced when the first task is actually completed, or when the person reaches some form of explicit closure on it (a decision made, a stopping point consciously chosen) before switching, rather than being pulled away mid-stream.

**Evidence:** Controlled studies comparing performance on a second task after either completing or being interrupted mid-way through a first task found consistently worse subsequent performance in the interrupted condition, with the residue effect attenuated when participants reached closure before switching.

**Transfer to design:** This is the direct mechanism behind why "just switch to your other task for a second" is more costly than it feels — and the direct justification for focus modes that batch and suppress switch-inducing prompts during a work session. Where a task can't be finished before a forced switch, support explicit closure: a lightweight "save your place and state your next step" prompt gives some of the same benefit as true completion, because it converts an open loop into something closed enough to set down.

**Where the analogy breaks:** The studies isolate residue from voluntary or externally forced task switches in controlled conditions with two clearly bounded tasks. Real work often involves many simultaneously open, loosely related threads rather than a clean A-then-B switch, and it's not established that the same residue mechanism scales linearly with the number of open threads — the finding supports "minimize unclosed switches," not a precise cost model for juggling many tasks at once.

**Cite:** [IN-08]

## Media multitasking and sustained filtering ability

**Field & mechanism:** People differ in how much they habitually multitask across media streams (texting while watching video, switching between browser tabs and messaging apps). A body of work compared heavy and light habitual media multitaskers on laboratory tests of cognitive control — filtering out irrelevant information, switching between task rules, holding relevant information in working memory — to ask whether heavy multitasking is associated with better or worse underlying attentional control.

**Evidence:** Comparing self-identified heavy versus light media multitaskers on lab tasks found heavy multitaskers performed *worse* at filtering out irrelevant stimuli and showed more interference from task-irrelevant information, despite frequently believing themselves to be effective multitaskers — a correlational finding, not a demonstration that multitasking causes the deficit (the reverse — that people with weaker filtering gravitate toward multitasking — remains a live alternative explanation).

**Transfer to design:** Treat self-reported comfort with multitasking skeptically as a design input — "our power users say they like having five things open at once" doesn't establish that performance holds up under that condition, and heavy simultaneous-stream interfaces may be more taxing than user preference surveys suggest. Where a product's core value depends on sustained, careful attention (writing, analysis, review), offering an explicit reduced-stimuli mode is a reasonable hedge against this gap between preference and performance.

**Where the analogy breaks:** This is a correlational, individual-differences finding about habitual multitasking behavior measured outside any specific product, not an experimental result about any particular interface's design. It should not be read as "multitasking UIs cause cognitive damage" — the causal direction is unresolved, and the lab tasks used to measure filtering ability are far removed from any everyday multitasking scenario a product might create.

**Cite:** [IN-09]

## Field studies of real-world notifications

**Field & mechanism:** Lab studies of interruption use controlled, artificial tasks; field studies instrument real computer and phone use to see how interruption and recovery actually unfold outside the lab. One line of work logged real desktop interruptions (incoming messages, alerts) alongside what happened afterward, finding wide variability in recovery time and — notably — that a substantial fraction of interruptions led to "task migration," where the person moved on to a different task entirely rather than returning to the original one. A separate line of work logged real smartphone notifications in situ, finding that people typically respond within minutes of a notification arriving, that most notification content is not actually urgent, and that higher notification volume tracks with users' self-reported feelings of being overwhelmed.

**Evidence:** Field instrumentation of real desktop work capturing interruption source, timing, and subsequent activity documented that recovery from an interruption often does not mean returning to the interrupted task at all. In-situ mobile logging paired with experience-sampling surveys found rapid habitual responding to notifications alongside a volume-linked stress relationship, distinguishing "most notifications get handled quickly" from "notification load is emotionally costless," which are not the same claim.

**Transfer to design:** Design for task migration as a real, common outcome, not an edge case — make it cheap and low-friction to return to a task that was displaced by a notification (persistent state, a visible "resume where you left off" affordance), rather than assuming the user will naturally circle back. Treat notification *volume* as a variable to manage independently from any single notification's urgency or relevance — a stream of individually reasonable, well-targeted notifications can still add up to a stress-inducing load.

**Where the analogy breaks:** Both studies observed existing notification ecosystems (email, IM, general smartphone use circa their publication) rather than testing a specific redesigned notification system experimentally — they describe what happens under current designs, and support diagnosing problems, but weren't set up to prove which specific redesign (e.g., batching every 30 minutes versus every 2 hours) produces the best outcome; that requires local measurement.

**Cite:** [IN-10], [IN-11]

## Attention-aware systems: computing interruptibility

**Field & mechanism:** If the cost of an interruption depends heavily on timing (as the breakpoint research above shows), then a system that can estimate a user's current interruptibility — how costly an interruption would be right now — can use that estimate to decide whether to deliver, delay, or suppress a notification. This line of work makes the case for building such attention-aware systems directly into software: rather than treating every notification as either always-immediate or manually silenced by the user, let the system model interruptibility from available signals (application focus, activity patterns, calendar state, explicit status) and act on it.

**Evidence:** A synthesis of the interruption-cost and breakpoint-detection literature, combined with early prototypes of interruptibility-sensing systems, made the case that inferred interruptibility could substantially reduce the cost of poorly timed notifications compared with immediate, undifferentiated delivery — while cautioning that inference is probabilistic and imperfect, so systems need graceful ways to handle a wrong guess (easy override, low cost of a missed low-priority notification).

**Transfer to design:** This is the architectural blueprint for modern focus modes and adaptive do-not-disturb: infer or let the user declare an interruptibility state, route notifications through a priority filter keyed to that state, and default uncertain or low-value notifications to batching rather than immediate delivery. Always pair automatic inference with an easy manual override — attention-aware systems that misjudge and can't be quickly corrected create their own new source of frustration.

**Where the analogy breaks:** The original case for attention-aware systems predates the mature sensor and ML infrastructure many modern devices now have, and assumed relatively coarse interruptibility signals. Modern systems can infer far more (location, biometric signals, precise app usage) than the source work anticipated, which strengthens the technical case but also raises privacy and consent considerations that weren't the focus of the original argument and need separate treatment.

**Cite:** [IN-12]

## The attention economy: attention as a competed-for resource

**Field & mechanism:** Once information became abundant rather than scarce, the scarce resource shifted to the human capacity to attend to it. Framing attention explicitly as an economic resource — something with supply, demand, and competition — reframes product design decisions (what notifies, what autoplays, what's designed to be "sticky") as decisions about how to win a share of a fundamentally limited, non-renewable resource, in direct competition with every other attention-seeking product and person in a user's life.

**Evidence:** This is a conceptual/strategic framework rather than an experimental finding: it names and organizes an economic dynamic — attention scarcity, competition for it, and its treatment as a tradeable commodity in business strategy — that had been implicit in advertising- and engagement-funded business models, giving designers and strategists a vocabulary for a dynamic they were already participating in.

**Transfer to design:** Naming the dynamic is itself useful: when evaluating a proposed feature, ask explicitly "does this compete for attention because it serves the user's goal, or because it serves the product's attention budget" — the two motivations produce superficially similar features (a notification, an autoplay, a badge) for very different reasons, and only one of them is defensible on its own terms.

**Where the analogy breaks:** The attention-economy framing describes an aggregate, market-level dynamic across an entire information ecosystem. It doesn't, by itself, tell a designer whether any single specific feature is ethically fine or exploitative — that finer-grained judgment needs the ethics-of-attention-capture work below, not the economic framing alone.

**Cite:** [IN-13], [IN-14]

## Ethics of attention capture

**Field & mechanism:** If attention is scarce and competed for, the ethical question is what obligations a designer has toward the people whose attention is being captured. One strand argues the stakes are about autonomy: technologies optimized to capture and hold attention can override a person's own capacity for reflection and self-directed goal pursuit — the very faculties a person needs to decide, on reflection, what deserves their attention in the first place — making this a threat to freedom, not merely a matter of wasted time. A second, complementary strand analyzes specific attention-capture techniques (variable/unpredictable rewards, infinite scroll, engineered social feedback loops) through the lens of manipulation: drawing a line between legitimate persuasion, which engages a person's rational agency, and manipulation, which exploits psychological vulnerabilities to bypass it — and argues some mainstream attention-capture design crosses that line.

**Evidence:** Both are philosophical/ethical analyses rather than empirical experiments: one builds a normative argument (grounded in autonomy and the conditions for self-governance) for why attention-capturing design is a distinct moral category, not just an efficiency or annoyance issue; the other builds an applied-ethics framework distinguishing manipulative from non-manipulative influence and applies it specifically to social-media and attention-economy business models, using addiction-adjacent design patterns as the central case.

**Transfer to design:** State the principle plainly and apply it as a test: a design decision that increases engagement *by exploiting* a psychological vulnerability (intermittent-reward uncertainty, social comparison, manufactured urgency, friction-free consumption paired with high-friction exit) is ethically distinct from one that increases engagement *by better serving* a goal the user would endorse on reflection — even when the two look similar in an engagement dashboard. Prefer stopping cues, natural end points, and neutral defaults over designs whose primary function is to prevent a natural stopping point from occurring. When a feature's main measurable effect is time-on-product rather than progress toward the user's own stated goal, treat that as a signal to scrutinize the feature's ethics, not just its performance.

**Where the analogy breaks:** These are normative arguments about where a line should be drawn, not measurements of where users currently draw it themselves — reasonable people, including affected users, disagree about which specific patterns count as manipulative versus merely engaging, and the frameworks don't resolve every contested case (a well-crafted recommendation feed, for instance) with the same clarity as their central examples (slot-machine-style variable rewards).

**Cite:** [IN-15], [IN-16]

## Design checklist

- Measure stress/frustration alongside completion time for interruption-heavy flows — a compensatory speed-up can hide a real cost that shows up later as errors or abandonment.
- Leave visible state cues (a draft, a "you were here" marker, an auto-generated resume summary) whenever a task can be suspended, so resumption doesn't depend on the user's unaided memory.
- Batch and defer notifications toward natural breakpoints (task completion, idle moments, navigation transitions) instead of delivering everything the instant it arrives.
- Build focus/do-not-disturb modes on an explicit interruptibility model, always paired with an easy manual override for when the inference is wrong.
- Minimize forced context switches in tightly coupled workflows, and where a switch is unavoidable, support explicit closure (a quick "save state and note next step") rather than an abrupt cutoff.
- Design for task migration as the common case after an interruption — make returning to a displaced task cheap and visible rather than assuming users will naturally circle back.
- Treat notification volume as its own variable to manage, separate from any individual notification's relevance — many individually reasonable notifications can still add up to an overwhelming load.
- Before shipping an engagement-boosting feature, ask whether it serves a goal the user would endorse on reflection or whether it works by exploiting a psychological vulnerability — treat "time-on-product went up" as a question, not an automatic win.
