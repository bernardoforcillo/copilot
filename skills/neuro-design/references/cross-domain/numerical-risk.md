# Numerical cognition & risk communication -> design

Humans do not process numbers the way calculators do. Quantity is represented by an ancient, imprecise "number sense" long before it is represented in language or symbols, and reasoning about probability and risk from a single statistic is fragile even in trained professionals — physicians included. This matters anywhere an interface asks someone to read, compare, or act on a number: an analytics dashboard where a reader must judge whether a change is meaningful, a pricing page where a discount or fee must be weighed, a consent or risk-disclosure flow where a diagnostic or screening statistic determines a real decision, a financial-terms screen where an interest rate or fee structure must be compared against alternatives. The literature imported here spans three converging fields — the cognitive neuroscience of number representation (how magnitude is encoded and compared), decision science (how presentation format changes the conclusion drawn from a mathematically identical statistic), and health/risk communication (how doctors and patients understand diagnostic and treatment statistics in practice) — and they agree on one practical lesson: the format used to display a number is not a neutral wrapper around a fixed quantity of information. Format is itself part of what gets communicated, and it can inflate, distort, or salvage comprehension independent of the underlying arithmetic.

## The mental number line

**Field & mechanism:** Dehaene's account of the "number sense" holds that numbers are represented internally as an analog magnitude — a continuous, spatially-oriented mental quantity — that underlies both approximate quantity judgment and, built on top of it, exact symbolic/verbal arithmetic. This analog magnitude representation is evolutionarily old and developmentally early, present well before children learn to count or read digits.

**Evidence:** Convergent evidence comes from reaction-time studies showing numeric comparisons follow a compressed, non-linear scale (the size and distance effects: comparing 1 vs. 2 is faster and more accurate than comparing 8 vs. 9, even though both pairs differ by one), from neuropsychological patients with parietal damage who show number-specific spatial deficits, and from cross-cultural replications of the basic magnitude-comparison signature.

**Transfer to design:** Core lens — magnitude is represented and compared as an analog, ratio-scaled quantity on an implicit internal scale, not as a discrete symbolic value, so people intuit relative size before they compute exact differences. Number/risk display: number lines, sliders, gauges, and progress bars exploit this representation directly and are read faster than an equivalent raw numeral; when placing several values for comparison, keep the visual scale genuinely linear (or clearly and legibly non-linear, e.g. labeled log axes) since the mental number line assumes proportional spacing and a distorted scale will be misread as if it were proportional.

**Where the analogy breaks:** The number-line metaphor describes an implicit magnitude representation, not a claim that a literal left-to-right line is a human universal — the *direction* of the spatial mapping is a learned convention tied to reading/writing direction (see SNARC, below) and reverses in some cultures. Treat approximate, ratio-scaled magnitude sense as the universal; treat spatial direction as a convention to verify against your audience.

**Cite:** [NR-01]

## The approximate number system: a shared, ratio-limited quantity sense

**Field & mechanism:** Beneath exact symbolic counting, humans and many other species share an evolutionarily ancient Approximate Number System (ANS) that estimates and compares quantities without counting, obeying Weber's law: discriminability depends on the *ratio* between two quantities, not their absolute difference, so distinguishing 10 from 20 is easy while distinguishing 90 from 100 is hard despite an identical absolute gap of ten.

**Evidence:** Feigenson, Dehaene & Spelke's review synthesizes infant looking-time studies, comparative work across species, and adult psychophysics, all showing the same ratio-dependent discrimination signature, and describe it as one of two dissociable "core systems" for number present from infancy. Halberda, Mazzocco & Feigenson later measured ANS precision (via rapid dot-array comparison) in fourteen-year-olds and found it correlated with school mathematics achievement dating back to kindergarten, even controlling for other cognitive abilities — establishing ANS acuity as a measurable trait with real downstream consequence, not only a laboratory curiosity.

**Transfer to design:** Core lens — quantity discrimination is inherently noisier for larger numbers and for close ratios, regardless of a user's numeracy training, so a difference that is arithmetically large can still "feel" negligible if the ratio is close (940 vs. 1,000 reads as roughly equal; 40 vs. 100 does not, despite a smaller absolute gap). Number/risk display: wherever a comparison matters — a price change, a before/after metric, a performance delta — don't rely on readers to spontaneously register a close-ratio difference from raw numerals; call the delta out explicitly ("+6%", "$60 more") rather than trusting the ANS to resolve it unaided.

**Where the analogy breaks:** ANS acuity predicts formal math achievement only correlationally, with modest effect sizes, and is not a hard ceiling on comprehension — explicit symbolic scaffolding (exact labels, a computed delta, a stated percentage) routinely lets people outperform their raw ANS precision. Treat ANS limits as a reason to add explicit numeric scaffolding, not as evidence that some users simply cannot be helped to see a comparison.

**Cite:** [NR-02], [NR-10]

## SNARC: numbers carry an automatic spatial code

**Field & mechanism:** The Spatial-Numerical Association of Response Codes (SNARC) effect: people respond faster to small numbers with a left-side response and large numbers with a right-side response (reversed in some populations), even in tasks — like judging whether a digit is odd or even — that have nothing to do with magnitude or space. Numbers automatically activate a spatial code as a byproduct of processing them at all.

**Evidence:** Dehaene, Bossini & Giraux's parity-judgment experiments held the numeric stimuli constant and varied only which hand was assigned to which response, isolating a genuinely automatic magnitude-to-space mapping unrelated to the explicit task. The effect's direction was modulated by participants' reading/writing direction, showing it is real but culturally inflected rather than a fixed hardware constant.

**Transfer to design:** Core lens — number magnitude and spatial position are linked automatically, below the level of conscious strategy, which is a stronger and more specific claim than "numbers can be laid out on a line." Number/risk display: sequences, timelines, and scales that place smaller values toward the reading-direction start and larger values toward the reading-direction end align with this automatic mapping and scan more naturally than a reversed or non-monotonic layout; a slider or stepper whose spatial order fights the expected magnitude direction adds a small but measurable friction tax to every read.

**Where the analogy breaks:** The direction of SNARC is not universal — it is contingent on reading/writing convention, attenuates or reverses in right-to-left readers, and can be overridden by context. It supports a weak, checkable directional default, not a strong universal layout rule.

**Cite:** [NR-03]

## Natural frequencies make Bayesian reasoning tractable

**Field & mechanism:** Gigerenzer & Hoffrage showed that Bayesian inference problems — notoriously error-prone when stated as conditional probabilities and percentages — become dramatically easier when the identical information is restated as natural frequencies: counts out of an explicitly stated reference population ("10 out of 1,000 people have the condition; of those 10, 8 test positive; of the other 990, about 95 also test positive"), rather than base rates and conditional probabilities in isolation. Natural frequencies preserve the joint reference-class information that a bare percentage format forces the reasoner to reconstruct mentally.

**Evidence:** Correct Bayesian inference rates rose from roughly 10–20% on standard probability-format problems to 50–90% on mathematically equivalent natural-frequency versions of the same problems, a pattern replicated across lay participants and, in follow-up work, physicians reasoning about diagnostic test results — with no additional statistics training required, only a change in how the same numbers were presented.

**Transfer to design:** Core lens — a format that preserves an explicit reference class does the joint-probability computation for the reader implicitly, while an isolated percentage or conditional probability offloads that reconstruction onto the reader, where it routinely fails. Number/risk display: state conditional or diagnostic risk figures ("if this test is positive, your actual chance of having the condition is...") as natural frequencies against an explicit, stated population size rather than bare percentages or odds ratios, especially wherever a base rate must be combined with a test or model accuracy figure — medical results, fraud/risk scores, statistical-significance claims.

**Where the analogy breaks:** The natural-frequency advantage is best established for exactly this class of problem: combining a base rate with a conditional accuracy figure to infer a posterior. It is not a general license to prefer frequency counts over percentages everywhere — for a simple, non-Bayesian proportion (a single conversion rate, a completion percentage) a plain percentage is usually just as clear and more compact.

**Cite:** [NR-04]

## Icon arrays close the low-numeracy comprehension gap

**Field & mechanism:** Galesic, Garcia-Retamero & Gigerenzer tested icon arrays — grids of small figures or dots where a shaded subset represents the affected proportion, e.g. "10 of these 100 icons are highlighted" — as a risk-communication format specifically aimed at readers with lower numeracy, who struggle most with percentage-only statements.

**Evidence:** Compared against text/percentage-only risk statements, icon arrays produced comparable or better comprehension among higher-numeracy participants and substantially better comprehension among lower-numeracy participants, narrowing the numeracy-driven comprehension gap rather than only helping readers who were already numerate.

**Transfer to design:** Core lens — a discrete, countable visual representation converts an abstract percentage-comparison task into an easier visual counting/subitizing task, which depends far less on formal numeracy than reading a percentage does. Number/risk display: use icon arrays or equivalent unit charts for probability and risk figures aimed at a general or mixed audience — a consent screen, a side-effect frequency, an approval-odds figure — rather than a bare percentage or fraction, especially wherever the audience's numeracy is unknown or known to vary widely.

**Where the analogy breaks:** Icon arrays help most where audience numeracy genuinely varies and the number itself is the primary content of the screen; for expert, numerate audiences comparing many values at once (an analyst reviewing a metrics dashboard), a well-labeled numeral or compact chart is usually faster to scan, and icon arrays don't extend gracefully to very small, very large, or highly precise values.

**Cite:** [NR-05]

## Denominator neglect and ratio bias

**Field & mechanism:** Reyna & Brainerd's fuzzy-trace theory account of "ratio bias": people frequently judge probability by attending to the numerator (the count of favorable or target cases) while under-weighting the denominator (the total reference class), producing errors like preferring "9 in 100" over the mathematically larger "1 in 10" because 9 simply reads as "more" than 1.

**Evidence:** Their review synthesizes decades of ratio-bias findings — including the classic result that people will choose to draw from a container with more total marked-winning chances even when the actual win probability is objectively lower — and situates the effect within fuzzy-trace theory, where people default to a coarse, categorical "gist" of a number (some vs. none, more vs. less) rather than a precise verbatim ratio computation, particularly under time pressure or low motivation.

**Transfer to design:** Core lens — readers extract a rough categorical gist from a numerator-heavy presentation more readily and more quickly than they compute an exact ratio, so any display that puts large numerators next to inconsistently-scaled denominators invites a numerator-only comparison. Number/risk display: normalize denominators whenever comparative risk or rate figures are shown together — always "per 1,000," never mixing "3 in 10" against "150 in 10,000" on the same screen — so that a reader's fast, gist-level read and a careful, precise read reach the same conclusion.

**Where the analogy breaks:** Denominator neglect is best documented for probability and frequency comparisons where the ratio itself is the decision-relevant quantity; it is not evidence of bias for judgments that are legitimately about raw counts (total revenue, total signups), where attending mainly to the numerator is not actually an error. Confirm the decision genuinely turns on a ratio before "correcting" numerator-only attention.

**Cite:** [NR-06]

## Format effects on perceived treatment benefit

**Field & mechanism:** Covey's meta-analysis synthesizes studies on how the *format* used to express an identical benefit statistic — relative risk reduction ("cuts your risk by half"), absolute risk reduction ("reduces your risk from 2% to 1%"), or number-needed-to-treat — changes readers' perceived magnitude of benefit and their stated willingness to accept a treatment or intervention, despite all three formats describing exactly the same underlying effect.

**Evidence:** Across the pooled studies, relative-risk framing consistently produced substantially higher perceived benefit and higher uptake intentions than absolute-risk or number-needed-to-treat framing of the identical effect — a pattern robust enough across populations and studies to treat as a reliable, generalizable format effect rather than an isolated finding.

**Transfer to design:** Core lens — the arithmetic format chosen to express a benefit or improvement figure systematically shifts perceived magnitude independent of the true effect size, making format itself a persuasion lever rather than neutral packaging. Number/risk display: report absolute figures alongside relative figures — never relative alone — for any benefit, discount, or improvement claim where the reader needs to calibrate true magnitude: pair "50% off" with the actual price difference, pair a relative-risk claim with its absolute baseline and post-treatment rate.

**Where the analogy breaks:** The evidence base is specifically about probabilistic treatment and screening benefits with a definable baseline risk; it doesn't directly generalize to non-probabilistic quantities (a feature-completion percentage, a flat discount on a fixed price) where there is no analogous "baseline risk" being modified. The underlying lesson — relative framing inflates perceived magnitude — still applies broadly, but the tested evidence is health-decision-specific.

**Cite:** [NR-07]

## Visual risk communication: format is part of the message

**Field & mechanism:** Lipkus & Hollands' review of visual risk-communication formats — bar charts, pie charts, icon arrays, line graphs, "risk ladders" (an ordered vertical scale showing where a given risk sits relative to a range of reference risks) — catalogs which formats support accurate risk perception and which distort it. Ancker, Senathirajah, Kukafka & Starren's later systematic review extends this to concrete graph design features specifically for health risk communication: axis scaling, ordering, color use, and labeling conventions.

**Evidence:** Lipkus & Hollands synthesize experimental comparisons showing, for example, that risk ladders support better-calibrated risk perception than an isolated single-number statement, and that poorly chosen or truncated axes distort perceived magnitude. Ancker et al.'s systematic review of the health-risk graph literature identifies recurring, evidence-backed features — part-to-whole displays outperform bare numbers for comprehension, vertical axes should generally start at zero, color and order should follow a consistent severity convention — versus features repeatedly shown to mislead readers.

**Transfer to design:** Core lens — format is not decoration layered on top of a risk number, it is part of what gets communicated, and specific, testable choices reliably improve or degrade comprehension. Number/risk display: default risk and probability charts to zero-based, linearly-scaled axes; provide an explicit comparison point (a benchmark line, a risk ladder) rather than an isolated figure; avoid choices documented to mislead — truncated axes, unlabeled log scales, an inconsistent color-to-severity mapping.

**Where the analogy breaks:** Both reviews synthesize health-risk-communication studies, where getting magnitude exactly right carries direct safety and consent stakes; some of the guidance (always start at zero, in particular) is more safety-critical there than in general analytics contexts, where a non-zero baseline with clearly labeled relative-change framing is a legitimate, standard convention for domain-expert trend reading.

**Cite:** [NR-08], [NR-11]

## Numeracy moderates susceptibility to framing

**Field & mechanism:** Peters, Västfjäll, Slovic, Mertz, Mazzocco & Dickert studied how individual differences in objective numeracy — the measured ability to understand and use numeric and probabilistic information — predict susceptibility to framing effects and decision quality, independent of general intelligence: highly numerate readers rely more on a decision's numeric content and less on affect or gist, while less numerate readers are more swayed by non-numeric framing and affective cues attached to the identical numbers.

**Evidence:** Across experiments manipulating numeric framing (e.g., identical information presented as a gain frame versus a loss frame, or with an affect-laden versus neutral descriptor), lower-numeracy participants showed larger framing-driven shifts in judgment than higher-numeracy participants, who extracted and reasoned from the numbers more consistently regardless of how they were framed — establishing numeracy as a distinct trait that moderates decision quality, not merely a proxy for education or general intelligence.

**Transfer to design:** Core lens — the same interface is read very differently by high- and low-numeracy users, and low-numeracy users are specifically more vulnerable to being steered by framing and affect rather than substance, which raises the ethical bar for framing choices in any numeric disclosure aimed at a general population. Number/risk display: for consequential numeric decisions shown to a mixed audience — pricing, risk, consent, financial terms — don't let a single framing carry the message alone; pair numeric content with a framing-neutral restatement or a visual aid (an icon array, absolute figures) so the substance survives independent of the reader's numeracy.

**Where the analogy breaks:** Numeracy as measured here is a stable individual trait assessed via dedicated instruments; a single interaction can't diagnose a given user's numeracy level in real time, so "design for low numeracy" is necessarily a population-level default — assume mixed numeracy and support the least-numerate reading — rather than something adaptively targeted per user without an explicit measurement step.

**Cite:** [NR-09]

## Graph literacy is a separable skill from numeracy

**Field & mechanism:** Galesic & Garcia-Retamero distinguish "graph literacy" — the specific skill of extracting and reasoning from information presented in charts and graphs — from general numeracy, arguing it is a separable competency requiring independent assessment and support, and developed a short graph-literacy scale validated across multiple countries.

**Evidence:** Their cross-cultural comparison found substantial variation in graph literacy across national samples and confirmed that graph literacy predicted comprehension of visually presented risk information above and beyond general numeracy scores alone: some people who handle raw numbers competently still struggle specifically to read a chart, and vice versa.

**Transfer to design:** Core lens — the ability to read a chart is its own skill, not a byproduct of being "good with numbers," so a well-designed numeric display doesn't guarantee a chart will be read correctly by the same audience, and the reverse also holds. Number/risk display: never assume graph literacy in a general or international audience; provide a text or numeric restatement alongside any chart carrying decision-relevant content (a trend line, a comparative bar chart), and test chart comprehension separately from numeric comprehension when validating a risk or data display with real users.

**Where the analogy breaks:** The graph-literacy scale was validated on standard chart types common in health-communication materials (bar, line, pie); it doesn't directly characterize comprehension of the denser, more specialized visualizations common in professional analytics tooling (heatmaps, multi-series small multiples, log-scaled scatter plots), which likely demand additional literacy the general-population scale wasn't built to measure.

**Cite:** [NR-12]

## Measuring risk literacy: the Berlin Numeracy Test

**Field & mechanism:** Cokely, Galesic, Schulz, Ghazal & Garcia-Retamero developed the Berlin Numeracy Test, a short adaptive instrument built specifically to measure "risk literacy" — statistical numeracy applied to probabilistic and risk reasoning — with better discriminating power among higher-numeracy and highly educated populations than earlier numeracy scales, which tended to top out and fail to distinguish among more numerate respondents.

**Evidence:** Validation studies across multiple countries and administration formats showed the test predicts real-world outcomes — including the quality of medical and financial risk perception and susceptibility to framing effects — better than existing shorter numeracy measures, while remaining brief enough for practical use in applied and field research.

**Transfer to design:** Core lens — risk literacy is measurable, unevenly distributed even among educated populations, and a validated short instrument exists to characterize or segment an audience by it before a numeric interface is designed or tested. Number/risk display: when user-testing a pricing, risk-disclosure, or financial-terms interface, consider screening or stratifying participants with a brief risk-literacy measure rather than assuming a convenience sample is numerically homogeneous — comprehension failures concentrated in the lower-numeracy segment are exactly what a small, unstratified usability test tends to miss.

**Where the analogy breaks:** The test measures statistical and risk numeracy specifically, not general design-relevant literacy — reading comprehension, graph literacy, or domain expertise. A high Berlin Numeracy score doesn't guarantee a user reads charts well or understands domain-specific terminology, so it should complement, not replace, broader usability testing.

**Cite:** [NR-13]

## Helping doctors and patients make sense of statistics

**Field & mechanism:** Gigerenzer, Gaissmaier, Kurz-Milcke, Schwartz & Woloshin's review synthesizes the numerical-cognition and risk-communication literature into an applied toolkit for statistically transparent communication in medicine: replacing conditional probabilities with natural frequencies, reporting absolute risk alongside relative risk, using consistent time periods and reference classes, and training clinicians and patients directly in these representational tools rather than assuming statistical literacy emerges from general education alone.

**Evidence:** The review compiles evidence that many practicing physicians — not just patients — systematically misinterpret conditional probabilities, for example overestimating the probability of disease given a positive screening result, when statistics are presented in standard probability format. The same natural-frequency and absolute-risk reformatting interventions that help lay readers measurably improve correct interpretation among clinicians too, indicating the comprehension gap is substantially a format problem, not purely a knowledge or education gap.

**Transfer to design:** Core lens — poor statistical communication is a systemic, format-driven problem that persists even among domain experts, which makes fixing representation format unusually high-leverage: it improves comprehension for professional and lay audiences at the same time, rather than requiring separate solutions per audience segment. Number/risk display: apply the same representational toolkit — natural frequencies, paired absolute/relative figures, explicit reference classes and time windows, icon arrays — uniformly across a product's numeric surfaces, patient-facing and clinician-facing, novice- and expert-facing alike, rather than assuming "expert" audiences need less careful representation.

**Where the analogy breaks:** The reviewed interventions were tested primarily in medical diagnostic and screening contexts with well-defined base rates and test-accuracy statistics; applying the same toolkit outside health (a fraud-risk score, a legal-risk disclosure) is a reasonable extrapolation of the same principles but isn't itself part of the tested evidence base, and domains lacking a clean "test accuracy plus base rate" structure may not map onto the natural-frequency technique as directly.

**Cite:** [NR-14]

## Design checklist

- Keep number lines, sliders, gauges, and progress bars on a genuinely linear (or clearly labeled non-linear) scale — the mental number line assumes proportional spacing, and a distorted scale is misread as if it were proportional.
- State conditional or diagnostic risk figures as natural frequencies against an explicit reference population ("X out of every 1,000"), not bare conditional probabilities, anywhere a base rate must be combined with a test or model accuracy figure.
- Use icon arrays or unit charts for risk and probability figures aimed at a general or mixed-numeracy audience — they close the comprehension gap for lower-numeracy readers without costing anything for higher-numeracy readers.
- Normalize denominators across every rate or proportion shown together on one screen, so a reader's fast numerator-only glance and a careful ratio calculation reach the same conclusion.
- Pair relative-change claims (percent off, percent risk reduction) with the absolute figures behind them — relative framing alone reliably inflates perceived magnitude regardless of the true effect size.
- Default risk and trend charts to zero-based, linearly-scaled axes with an explicit comparison point (a benchmark, a risk ladder); reserve non-zero-based, relative-change framing for domain-expert trend views where that convention is understood.
- Test numeric and chart comprehension separately, across a numeracy- and graph-literacy-stratified sample, not just a convenience sample — the comprehension failures that matter most cluster in the lowest-numeracy, lowest-graph-literacy segment.
- Apply the same careful numeric representation to expert-facing and professional surfaces as to lay-facing ones — misreading of raw probability format is well documented even among trained clinicians, so "our users are experts" is not a reason to skip natural-frequency and absolute-risk framing.
