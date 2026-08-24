# Experiment brief: <name>

> Owner: <name> · Started: <YYYY-MM-DD> · Decision due: <YYYY-MM-DD>

One page, filled in **before** the experiment runs. Its whole purpose is to make the decision
rule exist before the data does — deciding what counts as success after seeing the result is how a
coin flip becomes a strategy.

## Hypothesis

**Because** <evidence you already have>, **we believe** <change> **will cause** <effect on which
metric>, **for** <which users>. If the "because" is empty, this is a guess — which is allowed, but
should be labelled and cheap.

## The change

What exactly varies between arms. One change, or the result is unattributable.

## Design

| | |
| --- | --- |
| Unit of assignment | user / session / account |
| Arms and split | control 50% / variant 50% |
| Primary metric | |
| Minimum effect worth detecting | |
| Sample required per arm | n ≈ 16σ²/δ² — show the arithmetic |
| Expected duration at current traffic | |
| Guardrails | latency, errors, support volume, refunds, churn |
| Segments read (pre-registered) | |

**If the required sample exceeds what you can collect in a reasonable window, stop here.** An
underpowered test doesn't return a weak answer, it returns a random one that looks like an answer.
Fall back to a staged rollout with guardrail monitoring, a holdout, or qualitative evidence with
its sample size stated — and say which you chose and why.

## Decision rule

| Outcome | Decision |
| --- | --- |
| Primary metric moves ≥ target, guardrails clean | Ship |
| No detectable effect | Revert — the change didn't earn its complexity |
| Guardrail degrades | Revert regardless of the primary metric |
| Mixed by segment | <named in advance: which segment governs> |

## Rules of the run

- Fixed horizon; **no peeking-and-stopping**. Early stopping on a favourable read inflates false
  positives well past the nominal threshold.
- No new segments invented after seeing the data.
- Re-read the metric one cycle later before treating a win as permanent — novelty effects decay.

## Result

> Filled in at the end. Date, observed effect with its interval, guardrail status, decision taken,
> and what was learned that outlives the decision — that last line is what goes to the memory wiki.
