# Graphical perception & data visualization -> design

Reading a chart is a perceptual act before it is a cognitive one: viewers decode marks (position, length, angle, area, color) back into quantities using specific, measurably-different-in-accuracy visual operations, and the same pop-out and grouping machinery that governs UI scanning governs how a dashboard's eye gets pulled. This file is the applied, quantitative cousin of the core "Attention & visual hierarchy" and "Perception, Gestalt & color" lenses — read it whenever a design decision involves a chart, sparkline, stat tile, metric row, or dashboard layout, not just a full analytical plot.

## Ranked accuracy of elementary graphical perception (Cleveland & McGill, 1984)

**Field & mechanism:** Statistical graphics research decomposed "reading a chart" into elementary perceptual tasks — judging position along a common scale, judging position along non-aligned scales, judging length, direction, angle, area, volume, and color/shading — and proposed that these tasks form an ordered hierarchy of decoding accuracy, independent of the specific chart type they appear in.

**Evidence:** Controlled judgment experiments (viewers estimating the ratio of two encoded values) showed systematically lower error for position-along-a-common-scale judgments than for length judgments, lower error for length than for angle/area judgments, and highest error and greatest bias for volume and color-saturation judgments. The ordering was consistent across chart forms that used the same underlying encoding (e.g., a bar chart and a stacked-bar-with-common-baseline both cash out as position judgments).

**Transfer to design:** A metric comparison belongs on a shared baseline (bar/dot/line at a common axis), not encoded in the angle of a pie slice, the area of a bubble, or the saturation of a heatmap cell, whenever precise comparison is the goal. Dashboard KPI rows that need "which of these five numbers is bigger" answered at a glance should use aligned bars or dot plots, not donut charts or proportional icons.

**Where the analogy breaks:** The ranking is about judgment *accuracy*, not overall chart quality or appropriateness — pie charts and bubble maps remain legitimate when the goal is showing part-of-whole gestalt or rough magnitude rather than precise ranking, and a "worse" encoding (color, area) is often the right choice when the task is fast categorical gist-reading rather than quantitative comparison (see ensemble/summary perception, DVX-01/02, below).

**Cite:** [DV-01]

## Crowdsourced replication and extension of the ranking (Heer & Bostock, 2010)

**Field & mechanism:** The original Cleveland-McGill ranking was run on small in-lab samples in the 1980s; this study re-ran the same class of graphical-perception judgment tasks at scale using paid crowdworkers, and extended the task set to include additional modern chart forms (e.g., rectangular treemaps as an area-judgment case).

**Evidence:** Crowdsourced results reproduced the original accuracy ordering (position > length > angle/area) with effect sizes and confidence intervals comparable to the original lab study, validating both the original finding and crowdsourcing as a viable methodology for perceptual design research; treemap area judgments performed comparably poorly to other area-encoding tasks, as the ranking predicts.

**Transfer to design:** The position-over-length-over-area ordering can be treated as a robust, replicated finding, not a one-off lab artifact — safe to apply as a default rule for any comparison task in a metrics UI, not hedged as "one dated study said so."

**Where the analogy breaks:** Replication confirms the *ranking*, not that every chart must use the top-ranked encoding — treemaps remain a reasonable choice for showing many-item hierarchical part-of-whole structure at a glance, even though individual area judgments within them are comparatively inaccurate.

**Cite:** [DV-02]

## Preattentive processing and visual memory in visualization (Healey & Enns, 2012)

**Field & mechanism:** A review connecting the preattentive-feature literature (color, orientation, size, motion popping out of a display in under ~200–250 ms, before focused attention is needed) specifically to visualization design, plus the limits of visual working memory for what a viewer retains while comparing chart regions.

**Evidence:** The review synthesizes decades of visual-search and attention experiments (the same feature-integration and guided-search lineage as the core attention lens, TREI-80/WOLF-94) into visualization-specific guidance: a small number of preattentive channels (hue, size, orientation, motion, a handful of others) reliably pop out in complex displays; conjunctions of two or more of these channels do not pop out and require serial, effortful search; and visual working memory holds only a handful of chart elements across a saccade, limiting how much cross-chart comparison a viewer can do from memory alone.

**Transfer to design:** Encode the one dimension a dashboard viewer must find fastest (an out-of-range metric, an anomalous point) using a single preattentive channel (color or size alone), not a conjunction ("the red AND large point"); don't require readers to hold values from one chart in memory while reading a second chart — put values that must be compared in the same visual field, aligned.

**Where the analogy breaks:** Preattentive pop-out is a population-level, feature-detector phenomenon, not a guarantee any specific viewer will consciously register a specific outlier — critical alerts still need a confirmatory, attention-capturing mechanism beyond passive color-coding (see the Human Factors alarm-fatigue material for the safety-critical boundary case).

**Cite:** [DV-03]

## The visual variables (Bertin, 1967/1983)

**Field & mechanism:** Cartography and semiology of graphics formalized the building blocks of any static graphic into a small set of "visual variables" — position, size, shape, value (lightness), color (hue), orientation, and texture/grain — each with characterized properties for whether it can represent quantitative, ordered, or purely categorical (nominal) data.

**Evidence:** Bertin's systematic analysis (largely theoretical/taxonomic rather than a controlled experiment) showed that some variables are naturally ordered and support quantitative or ordinal reading (size, value), while others are purely associative and support only categorical grouping (hue, shape, texture) — using an unordered variable like hue to encode an ordered quantity, or an ordered variable like size to encode unordered categories, produces a graphic that fights its own data.

**Transfer to design:** Match the visual variable to the data's measurement level: use hue for unordered categories (region, product line), use position/size/value for ordered or quantitative data (revenue, score, rank); when a legend requires the reader to memorize an arbitrary hue-to-category mapping, keep the category count low (roughly the ~4–7 chunk limits from the core cognitive-load lens) since hue is not itself ordered or countable at a glance.

**Where the analogy breaks:** Bertin's taxonomy predates screens, interaction, and animation — it says nothing about motion, transition, or interactive filtering as visual variables, and treating it as a complete modern encoding system (rather than the foundational static-print layer it is) misses everything interactive dashboards depend on (see animated transitions, DVX-03).

**Cite:** [DV-04]

## Data-ink ratio and the chartjunk critique (Tufte, 1983)

**Field & mechanism:** A design philosophy for statistical graphics arguing that a high proportion of the ink (or pixels) in a chart should encode actual data ("data-ink ratio"), and that decorative elements not carrying information — heavy gridlines, 3D bevels, ornamental borders, redundant framing — are "chartjunk" that should be minimized or removed.

**Evidence:** Largely a design-critical argument built from exemplars and counter-exemplars rather than a controlled comprehension experiment; Tufte demonstrates the principle through redesigns (stripping boxes, gridlines, and redundant axis labels from published graphics) rather than measuring reader performance on junk vs. minimal versions.

**Transfer to design:** As a default, remove gridlines, borders, and 3D effects that do not carry information; let whitespace and direct labeling do the work a heavy frame would have done; treat every non-data pixel as something that must earn its place, especially in small dashboard tiles and sparklines where space is scarce.

**Where the analogy breaks:** This principle is a widely-taught design heuristic, not an empirically validated law of comprehension — the maximal-data-ink aesthetic can be *actively worse* for engagement, comprehension of unfamiliar data, and long-term recall than moderately embellished charts (see Bateman, next), so treat data-ink minimization as a starting bias to be argued away from, not an absolute rule, and reserve strict minimalism for expert/dense analytical contexts rather than one-off public-facing charts.

**Cite:** [DV-05]

## Empirical pushback: "useful junk" (Bateman et al., 2010)

**Field & mechanism:** A controlled study directly tested Tufte's chartjunk hypothesis by having participants read and later recall data from matched pairs of charts — one plain/minimal, one visually embellished with thematic imagery relevant to the chart's topic — measuring both immediate interpretation accuracy and delayed recall.

**Evidence:** Immediate interpretation accuracy was statistically indistinguishable between plain and embellished charts (embellishment did not impair comprehension as the chartjunk hypothesis predicted); delayed recall (both of the chart's values and its overall message), measured days later, was significantly *better* for the embellished charts, and participants self-reported enjoying the embellished charts more.

**Transfer to design:** For public-facing, one-time-exposure, or memorability-sensitive charts (an annual report highlight, a social share card, an onboarding stat), a tasteful, topic-relevant illustrative element does not cost comprehension and can materially improve what the viewer remembers a week later — this is a legitimate, evidence-backed exception to strict data-ink minimalism, not merely decoration for its own sake.

**Where the analogy breaks:** The benefit was shown for memorability and affect on a one-shot exposure, not for repeated, expert, high-density analytical use (a trading dashboard, an ops monitoring wall) — where minimal ink remains the better default because the same viewer reads the same chart hundreds of times and inflates neither engagement nor memory value from embellishment, only clutter and slower scanning.

**Cite:** [DV-06]

## Rainbow colormap harm (Borland & Taylor, 2007)

**Field & mechanism:** A critique of the once-default "rainbow" (jet-style) colormap for encoding continuous scalar data (heatmaps, scientific imaging, choropleth-style continuous fills), arguing it is perceptually non-uniform and actively misleading.

**Evidence:** The rainbow colormap's perceived lightness does not vary monotonically with the underlying data value — it has non-uniform steps (long flat regions in green/yellow, abrupt jumps elsewhere) that create false banding and boundaries not present in the data, and it is not ordered in a way colorblind viewers, or any viewer relying on lightness alone, can decode; the argument is illustrated with side-by-side reconstructions showing the same dataset producing visibly different, misleading feature boundaries purely from colormap choice.

**Transfer to design:** Never use an unordered, non-monotonic-lightness rainbow palette to encode a continuous quantitative variable (a heatmap, a continuous choropleth, a correlation matrix); this is one of the few near-absolute "don't" rules in the file.

**Where the analogy breaks:** The critique targets *continuous scalar* encoding specifically — a categorical legend that happens to use several distinct rainbow-adjacent hues for unordered categories is a different (and legitimate) use of hue as a nominal visual variable (Bertin, DV-04), not the same failure mode.

**Cite:** [DV-07]

## Colormap misuse across science communication (Crameri, Shephard & Heron, 2020)

**Field & mechanism:** A survey and technical analysis of colormap choice across a large corpus of published scientific figures, formalizing the properties a "perceptually uniform" scientific colormap needs — order, uniformity, and (for some use cases) whether the map should be perceptually flat-out symmetric/diverging around a meaningful midpoint.

**Evidence:** A substantial share of surveyed published figures used colormaps (rainbow-family and otherwise) that were not perceptually uniform, introducing artificial visual structure not present in the underlying data, misrepresenting effect sizes, and in some cases obscuring the actual pattern the figure was meant to communicate; the paper provides a taxonomy (sequential, diverging, categorical, cyclic) mapped to correct data types and a set of scientifically validated uniform alternatives.

**Transfer to design:** Choose the colormap *type* to match the data's structure — sequential for one-directional continuous data, diverging for data with a meaningful zero/midpoint (e.g., percent change, sentiment), categorical/qualitative for unordered groups, cyclic only for genuinely cyclic data (time-of-day, angle) — and default to a perceptually uniform sequential/diverging map (viridis-family or equivalent) rather than an arbitrary gradient picked for brand color match.

**Where the analogy breaks:** Perceptual uniformity is necessary but not sufficient for accessibility — a perceptually uniform sequential map can still be unreadable to colorblind viewers if its endpoints collapse under a common color-vision deficiency; uniformity and CVD-safety must be checked independently (see Nuñez et al., next).

**Cite:** [DV-08]

## Colormaps optimized for color-vision deficiency (Nuñez, Anderton & Renslow, 2018)

**Field & mechanism:** A computational method for evaluating and optimizing colormaps specifically against simulated color-vision deficiency (protanopia, deuteranopia, tritanopia), rather than only against typical-vision perceptual uniformity.

**Evidence:** Standard "perceptually uniform" colormaps that perform well for typical vision were shown to still lose discriminability under simulated CVD in specific regions of their range; the paper introduces an optimization procedure and validated CVD-safe alternative colormaps that preserve monotonic, discriminable steps under all three common deficiency types simultaneously.

**Transfer to design:** Test any sequential/diverging colormap used for a critical quantitative encoding (not just categorical legends) under CVD simulation before shipping it, and prefer colormaps validated for CVD-safety over ones chosen purely for aesthetic or brand fit; this generalizes the core lens's "never signal by hue alone" rule to continuous encodings specifically.

**Where the analogy breaks:** CVD-optimized colormaps are a real constraint satisfaction with trade-offs — a map optimized to be maximally CVD-safe may have lower perceptual dynamic range for typical vision than a non-CVD-safe alternative, so the optimization is a deliberate accessibility-first trade, not a free win with no cost to typical-vision fidelity.

**Cite:** [DV-09]

## Viridis as a validated default (van der Walt & Smith, 2015)

**Field & mechanism:** The design and adoption story of the viridis colormap family, created to replace jet/rainbow as the default in a major scientific plotting library, engineered from the ground up for perceptual uniformity, monotonic lightness, and colorblind-safety.

**Evidence:** Viridis was constructed using a perceptually uniform color space (rather than RGB interpolation) so that equal steps in data value produce equal steps in perceived lightness, verified to remain discriminable under simulated CVD, and to degrade gracefully to grayscale (preserving ordering when printed or viewed without color); it became a widely adopted, empirically-scrutinized default precisely because it satisfies the uniformity and CVD-safety properties the rainbow map fails.

**Transfer to design:** When no strong reason argues otherwise, default continuous-quantitative fills (heatmaps, choropleths, density plots, dashboard "intensity" cells) to a viridis-family (or comparably validated modern uniform) colormap rather than building a custom gradient from brand colors — brand-gradient customization should be tested for uniformity and CVD-safety before it replaces a validated default, not assumed safe because it "looks nice."

**Where the analogy breaks:** Viridis and its siblings were optimized for scientific, information-dense figures; a marketing or brand-forward context may reasonably trade some perceptual uniformity for identity consistency in low-stakes decorative charts — the trade should be a conscious one made by someone who has read this entry, not a default absence of consideration.

**Cite:** [DV-10]

## The banking-to-45-degrees principle (Cleveland, McGill & McGill, 1988)

**Field & mechanism:** A follow-up to the original graphical-perception ranking specifically about line charts: the *aspect ratio* (height-to-width) of a line chart changes how accurately viewers can judge the rate of change (slope) it depicts, and there is a describable optimum.

**Evidence:** Controlled judgment experiments on slope/rate perception found that viewers most accurately compare rates of change when a chart's aspect ratio is chosen so that the line segments in the chart average about 45 degrees from horizontal ("banking to 45°") — charts stretched too wide (flattening all slopes) or too tall (steepening all slopes) systematically distort perceived rate-of-change comparisons even though the underlying data and axis scales are identical.

**Transfer to design:** For any line chart whose primary purpose is showing rate of change (a growth curve, a trend line, a sparkline meant to convey "accelerating" vs "flat"), choose the aspect ratio deliberately — don't let it default to whatever rectangle the container happens to be — and consider banking to ~45° average slope when precise trend comparison across multiple lines or time windows matters.

**Where the analogy breaks:** Banking-to-45° optimizes for *slope judgment accuracy* specifically; it is not the right criterion when a chart's purpose is showing absolute level (where position-on-a-common-scale dominates, DV-01) or when a fixed aspect ratio is required for layout consistency across a dashboard grid — in the latter case, consistent proportions across a dashboard often matter more for comparability than optimal banking on any one tile.

**Cite:** [DV-11], [DV-01]

## Psychophysics of graphical proportion judgment (Spence, 1990; Stevens, 1957)

**Field & mechanism:** The psychophysical study of how perceived magnitude relates to physical stimulus magnitude in general (Stevens' power law: perceived magnitude grows as a power function of physical magnitude, with exponents that differ by stimulus dimension) and specifically for simple graphical elements like bar length, area, and angle (Spence, 1990).

**Evidence:** Stevens' power-law psychophysics showed that perceived magnitude does not scale linearly with physical stimulus magnitude across many perceptual dimensions, with dimension-specific exponents (e.g., perceived area grows slower than physical area — area judgments are systematically underestimated at the high end); Spence's graphical-elements work found comparable systematic biases specifically for chart primitives — angle and area judgments in graphics show the same kind of exponent-driven under/overestimation as psychophysical stimuli generally, reinforcing why length/position-based encodings (which are closer to a linear, exponent-near-1 relationship) outperform area/angle encodings in the Cleveland-McGill ranking.

**Transfer to design:** Treat area- and angle-based encodings (bubble size, pie-slice angle, icon scaling) as inherently biased toward underestimation of large values relative to small ones — if area must be used (e.g., a bubble map), consider a compensating scale, and never assume that doubling a circle's radius will be perceived as "twice as much" by viewers.

**Where the analogy breaks:** Power-law exponents were derived largely from simple, isolated psychophysical stimuli and small controlled graphical primitives; they describe a first-order perceptual bias, not the full context effects of a real chart (surrounding chart junk, comparison anchors, labels) which can partially correct or worsen the raw psychophysical bias in practice.

**Cite:** [DV-12], [DV-13]

## Displaying proportions and percentages (Spence & Lewandowsky, 1991)

**Field & mechanism:** A direct empirical comparison of common chart types (pie charts, bar charts, tables, and stacked/divided bar variants) specifically for the task of judging and comparing proportions/percentages, rather than absolute magnitudes.

**Evidence:** For proportion-judgment tasks specifically, pie charts performed comparably well to bar charts for simple part-of-whole and comparison-of-two-proportions tasks — contrary to a blanket "pie charts are always bad" folk claim — though performance advantages shifted depending on the specific comparison being asked for (single-slice-to-whole vs. slice-to-slice vs. across multiple pies), with bar-based encodings holding an edge as the comparison task grew more complex (many categories, precise ranking).

**Transfer to design:** A single pie chart showing one part-of-whole split with few (2–5) categories is a legitimate, empirically supportable choice for a proportion story, not an automatic design smell — reserve the blanket "never use pie charts" rule for cases with many slices, multiple pies being compared to each other, or when precise ranking (not just gestalt proportion) is the actual task, where bar/dot encodings remain measurably better per the core Cleveland-McGill ranking.

**Where the analogy breaks:** This finding narrows, but does not overturn, DV-01's general angle/area penalty — it shows the penalty is task-dependent (small, simple proportion judgments are more pie-tolerant than the general ranking implies) rather than showing pie charts are broadly equivalent to bar charts across all reading tasks.

**Cite:** [DV-14]

## Judgments of change and proportion (Hollands & Spence, 1992)

**Field & mechanism:** A further controlled study of how accurately viewers judge *change* (e.g., "how much did this grow between two time points") when it is displayed as a proportion/percentage versus displayed as the raw before/after values themselves, across different chart encodings.

**Evidence:** Judging a proportion of change directly from a chart that shows only the derived percentage (a single bar labeled "+40%") was reliably less accurate, and more subject to systematic bias, than judging the same change from a chart that showed the two underlying raw values (before and after bars/points) and let the viewer derive the change perceptually or arithmetically; the bias direction and magnitude depended on the specific encoding used to show the derived proportion.

**Transfer to design:** When a dashboard needs to communicate "this metric grew by X%," show the underlying before/after (or time-series) values alongside the percentage callout rather than the percentage alone — the raw values let the viewer's own position/length judgment (the most accurate elementary task, DV-01) corroborate or replace the abstracted percentage.

**Where the analogy breaks:** This is a precision/verifiability argument, not a universal rule against summary statistics — a single well-labeled percentage change is often the right *primary* callout for glanceable KPI tiles where space is scarce; the finding argues for making the underlying values available (a tooltip, a small trend line, a secondary label), not for banning percentage-only displays outright.

**Cite:** [DV-15]

## Information-processing analysis of graph reading (Simkin & Hastie, 1987)

**Field & mechanism:** A cognitive task-analysis model of graph reading that decomposes chart interpretation into a small set of elementary information-processing operations (e.g., anchoring on a reference point, then computing a ratio or difference relative to it) and predicts which chart type will be faster/more accurate for which specific comparison task based on how many of these operations it requires.

**Evidence:** Experiments comparing bar, pie, and divided-bar charts on matched comparison tasks (comparing two adjacent values, comparing a value to a whole, comparing values across non-adjacent categories) found that accuracy and response time varied by chart type in ways predicted by the number and type of elementary operations the model says each task/chart-type pairing requires — no single chart type dominated across all task types; each had specific comparison tasks it supported with fewer required operations.

**Transfer to design:** There is no single "best" chart type in the abstract — choose the chart form based on the *specific comparison* the user actually needs to make (adjacent-category comparison, part-to-whole, cross-group comparison), since different encodings minimize the cognitive operations needed for different comparison tasks; this justifies task-first chart selection over a fixed house-style "we always use bar charts" rule.

**Where the analogy breaks:** The model is a cognitive task-analysis, not a physiological or perceptual-accuracy account like Cleveland-McGill — it explains *processing effort/speed* for structured comparison tasks, and doesn't by itself cover memorability, aesthetic response, or perceptual accuracy for magnitude estimation, which are separate, complementary literatures (DV-01, DVX-06).

**Cite:** [DV-16]

## How deceptive are deceptive visualizations? (Pandey et al., 2015)

**Field & mechanism:** A controlled study directly measuring how much common chart-distortion techniques (truncated/non-zero y-axis baselines, inverted axes, non-linear/mismatched axis scaling) bias viewers' quantitative judgments relative to an honestly-scaled version of the same data.

**Evidence:** Truncating a bar chart's y-axis (not starting at zero) produced significantly inflated perceived differences between bars compared to a zero-baselined version of the identical data, with the size of the distortion scaling with how aggressively the axis was truncated; inverted and rescaled axes produced comparable, measurable misjudgments; the distortions persisted even though participants could, in principle, read the axis labels correctly — the perceptual/comparative read overrode the labeled values.

**Transfer to design:** Bar charts (length/area-anchored-at-zero encodings) should start their value axis at zero by default, since the visual comparison (length) is what viewers actually use regardless of what the axis labels literally say; a non-zero baseline is defensible for line charts showing *trend/rate* over a narrow, clearly-labeled range (where position, not length-from-zero, is the operative judgment, per DV-01) but should be flagged explicitly (a visible break mark, an annotated baseline) when used, precisely because the default reading assumes zero.

**Where the analogy breaks:** The finding targets bar/length-style encodings specifically — for line and scatter charts where position (not length from a baseline) is the operative judgment per Cleveland-McGill, a zoomed/non-zero range is often the *correct* choice to reveal meaningful variation, and forcing every chart to include zero can flatten genuinely important signal (a blanket "always start at zero" rule is itself a common oversimplification of this finding).

**Cite:** [DV-17]

## Design checklist

- Encode precise comparisons on a shared, zero-baselined position/length scale (aligned bars, dot plots) before reaching for angle, area, or color-saturation encodings — reserve the latter for rough gestalt or categorical reads.
- Match each visual variable to its data's measurement level: hue for unordered categories, position/size/value for ordered or quantitative data; never make a reader memorize more than ~5–7 arbitrary hue mappings.
- Default continuous quantitative fills (heatmaps, choropleths) to a perceptually uniform, CVD-safe colormap (viridis-family or equivalent); never use a rainbow/jet colormap for continuous data.
- Choose a line chart's aspect ratio deliberately for the comparison it needs to support; consider banking to ~45° average slope when precise rate-of-change comparison matters.
- Treat data-ink minimalism as the default for dense, expert, repeated-use dashboards, but allow tasteful, topic-relevant embellishment for one-shot, public-facing, or memorability-sensitive charts — the chartjunk-is-always-bad rule is not empirically settled.
- Start bar-chart value axes at zero by default (length/area encodings mislead otherwise); reserve non-zero, zoomed ranges for line/position-based trend charts, and flag any intentional truncation visibly.
- Pick chart type by the specific comparison task the viewer needs (adjacent values, part-to-whole, cross-group), not by house style alone — no single chart form wins every task.
- Show the underlying raw values alongside a derived percentage/change callout so viewers can corroborate the summary with their own (more reliable) position judgment.

## Deeper dive (v3)

## Ensemble and statistical-summary perception (Ariely, 2001; Szafir et al., 2016)

**Field & mechanism:** Beyond reading individual data points, the visual system can rapidly extract summary statistics — mean, variance, numerosity — from a whole set of items in a single glance, without the viewer being able to report the value of any individual item ("ensemble coding" or "summary statistical perception"); Szafir et al. mapped this specifically onto the elements common visualizations are built from (color, size, position, orientation of many marks).

**Evidence:** Ariely's foundational work showed observers could accurately report the mean size of a set of circles shown briefly, even while being at chance for identifying whether any specific probed circle had been in the set — average extraction is fast, parallel, and largely independent of the ability to recall individual members. Szafir et al. extended this to visualization-relevant mark properties, finding ensemble mean judgments for position and size were reasonably accurate, while ensemble judgments for color-based encodings (average hue of a set of colored marks) were substantially less accurate, and that the number of distinguishable "classes" a viewer can extract from a scatter/multi-series display is limited well below the number of series often placed on real charts.

**Transfer to design:** A scatterplot, dot cloud, or multi-line chart intended to convey "the overall trend/average" is doing real perceptual work even without explicit aggregation lines — viewers do extract gist-level means and spread from raw marks reasonably well for position/size encodings, which supports showing raw distributions instead of only pre-aggregated summaries when position/size are the encoding channel. Conversely, don't rely on a viewer perceptually "averaging" a set of differently-colored marks to judge which color-coded group dominates — provide an explicit count or aggregate for color-heavy multi-series displays.

**Where the analogy breaks:** Ensemble perception is fast and largely automatic but coarse — it supports gist judgments ("roughly higher," "roughly more spread out"), not the precise quantitative comparisons the Cleveland-McGill ranking addresses; a dashboard that needs a precise numeric answer should not lean on ensemble perception alone, only on it for at-a-glance shape/trend impressions.

**Cite:** [DVX-01], [DVX-02]

## Animated transitions in statistical graphics (Heer & Robertson, 2007)

**Field & mechanism:** A study of whether animating a chart between two states (e.g., a bar chart re-sorting, or transforming into a scatterplot) helps viewers track how specific data points moved/changed, compared to simply cutting from the first state to the second, or showing small-multiple static frames.

**Evidence:** Well-designed, smooth animated transitions between chart states (with consistent object identity preserved across the animation) significantly improved viewers' ability to track specific data trends and identify which items changed how, compared to an instant cut between the before/after states; poorly-designed transitions (or ones without preserved object correspondence) did not show this benefit and could underperform a static comparison.

**Transfer to design:** When a dashboard re-sorts, re-filters, or re-aggregates a chart in response to user interaction, animate the transition with preserved per-item identity (each bar/point tweens to its new position/value rather than the whole chart cross-fading) so users can track what changed, not just that something changed.

**Where the analogy breaks:** The benefit is specific to *transitions between two related states of the same data*, driven by object-tracking mechanisms — it does not generalize to decorative or attention-getting animation unrelated to a state change (auto-playing intro animations, looping chart flourishes), which mainly cost attention per the core attention lens's abrupt-onset findings without offering any tracking benefit.

**Cite:** [DVX-03]

## Uncertainty visualization and why it's often skipped (Hullman, 2020)

**Field & mechanism:** A study of visualization authors' practices and reasoning around whether to depict uncertainty (error bars, confidence bands, prediction intervals) at all, examining the gap between what uncertainty-communication research recommends and what published/shipped visualizations actually do.

**Evidence:** Interviews and analysis of authoring practice found uncertainty is frequently omitted from published visualizations even when the underlying data supports it, for reasons including concern that uncertainty bands will be misread as itself meaningful structure, tooling friction, house-style pressure toward clean/confident-looking charts, and genuine difficulty choosing an uncertainty representation the target audience will correctly interpret — not merely oversight.

**Transfer to design:** When a dashboard metric carries real uncertainty (a forecast, a small-sample rate, an estimate with a wide confidence interval), the default should be to show that uncertainty rather than a bare point estimate, but the representation must be chosen for the audience's statistical literacy — a technically correct but unfamiliar interval representation can create false confidence or confusion, so pair a new uncertainty encoding with a brief explanatory legend the first time a user encounters it.

**Where the analogy breaks:** This is an observational study of *why* uncertainty gets dropped, not a controlled comparison proving every chart needs formal uncertainty bands — for low-stakes, high-familiarity metrics (a page-view counter) added uncertainty visualization can add noise without changing any decision the viewer makes, so the recommendation applies most strongly where the uncertainty could plausibly change a viewer's decision.

**Cite:** [DVX-04]

## Hypothetical outcome plots (Kale, Nguyen, Kay & Hullman, 2019)

**Field & mechanism:** An alternative to static error bars/confidence bands for communicating uncertainty: animating a sequence of individual plausible draws from the underlying distribution ("hypothetical outcome plots," HOPs), so uncertainty is conveyed by the visible variability across frames rather than by a static interval shape.

**Evidence:** In controlled studies, untrained viewers (no statistics background required) reading hypothetical outcome plots judged trends and made comparisons under uncertainty (e.g., "is this trend really increasing, or could it be flat") more accurately, and with less overconfidence, than viewers reading equivalent static error-bar or confidence-band representations of the same underlying distribution — animation let the frequentist notion of "repeated draws" be experienced directly rather than abstractly decoded from a band's shape.

**Transfer to design:** For an audience not trained to correctly decode confidence-band width (most consumer/business dashboard users), consider an animated ensemble of plausible outcomes over a static band when the goal is calibrated trend/comparison judgment under real uncertainty — this is a legitimate, evidence-backed alternative to the default static error bar, not merely a stylistic variant.

**Where the analogy breaks:** HOPs require animation/interaction infrastructure and a moment of viewing time per chart, unsuitable for a static export, a printed report, or a glanceable single-fixation dashboard tile — static bands remain the right choice where the medium can't animate or where a viewer will only look for a fraction of a second.

**Cite:** [DVX-05]

## What makes a visualization memorable (Borkin et al., 2013)

**Field & mechanism:** A large-scale study measuring which visual properties of real-world, published charts and infographics predict how well viewers remember having seen them (and recall their content) after a delay, isolating memorability as its own measurable property distinct from comprehension speed or accuracy.

**Evidence:** Memorability varied enormously across chart types and was reliably predictable from visual properties independent of the underlying data: charts with unique visual content (pictograms, unusual colors/layouts, human-recognizable imagery) and higher information density/text were significantly more memorable than plain, "textbook-clean" statistical charts (simple bar/line/pie with minimal embellishment), and memorability for a given chart was consistent across different viewers and stable when re-tested later — it is a real, measurable property of the chart itself, not noise.

**Transfer to design:** For a chart meant to be remembered later (an executive summary slide, a report's headline figure, a social/share graphic), distinctive visual character and some genuine information density measurably help recall — this directly corroborates Bateman's "useful junk" finding (DV-06) with a larger, more systematic dataset, and argues against always defaulting to the plainest possible chart when the goal includes memorability, not just in-the-moment comprehension speed.

**Where the analogy breaks:** Memorability and comprehension speed/accuracy are shown to be at least partly independent properties — the most memorable chart in the study is not necessarily the fastest or most accurate to read, so a repeatedly-consulted operational dashboard (which prizes fast, accurate, low-fatigue reading over any single memorable impression) should still prioritize the plainer, DV-01-ranked encodings over memorability-optimized ones.

**Cite:** [DVX-06]

## Empirical model of slope-ratio comparisons (Talbot, Gerth & Hanrahan, 2012)

**Field & mechanism:** A follow-up refinement to the banking-to-45-degrees line (DV-11), directly testing how accurately viewers judge the *ratio* between two slopes (e.g., "is this trend line's growth rate twice as steep as that one's") across different chart layouts, including small multiples versus a single overlaid chart.

**Evidence:** Slope-ratio judgment accuracy depended measurably on layout choices beyond simple aspect ratio/banking — comparing slopes across separate small-multiple panels was reliably less accurate than comparing them within a single shared panel where both lines could be viewed together, and accuracy also depended on the specific slope values being compared (near-equal slopes were harder to rank than clearly different ones), refining rather than overturning the general banking guidance.

**Transfer to design:** When a dashboard's actual task is comparing the *rate of change* of two or more trends (not just their end values), prefer overlaying them in one shared panel over splitting them into separate small-multiple tiles, since direct co-location measurably improves slope-ratio judgment; reserve small multiples for tasks where each trend's own shape matters more than precise cross-trend rate comparison.

**Where the analogy breaks:** Small multiples remain empirically superior for other tasks this study did not test for — many-series overview scanning, avoiding overplotting/occlusion, and showing each series' internal pattern without visual interference from the others — so the slope-ratio finding argues for task-specific layout choice, not a general preference for overlaid over small-multiple charts.

**Cite:** [DVX-07], [DV-11]
