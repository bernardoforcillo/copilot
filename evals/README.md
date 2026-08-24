# Evals

Two kinds of measurement, because a skill can fail in two independent ways: it can be good advice
that never loads, or it can load reliably and give bad advice.

| File | Measures | How it runs |
| --- | --- | --- |
| `<skill>-trigger.json` | **Triggering** — does the skill's description cause it to load on the queries it should, and stay out of the way on the near-misses? | `skill-creator`'s `scripts/run_eval.py`, which runs each query through `claude -p` and checks whether the skill was consulted |
| `<skill>-tasks.json` | **Output quality** — given that it loaded, does the advice have the properties the skill claims? | Task prompts with objectively checkable assertions, graded against a with-skill and a without-skill run |

## Trigger evals

Twenty queries per skill, ten that should trigger and ten near-misses that should not. The
near-misses are the load-bearing half: a query that shares vocabulary with the skill but belongs to
another desk (or to no desk) is what separates a description that discriminates from one that just
matches keywords.

```
cd <skill-creator path>
python3 -m scripts.run_eval \
  --eval-set <this repo>/evals/operating-model-trigger.json \
  --skill-path <this repo>/skills/operating-model \
  --runs-per-query 2 --num-workers 3 --timeout 300 --model <session model> --verbose < /dev/null
```

Each query runs more than once because triggering is stochastic; the reported rate per query is
what matters, not a single yes/no.

**Two traps that produce a confident zero rather than an error**, both found the hard way:

- **The harness reads `name` out of `SKILL.md` frontmatter.** A skill without one registers under
  an empty name and nothing can trigger. `scripts/check-plugin.mjs` now enforces the field for
  exactly this reason.
- **The default timeout is far too short for a reasoning model doing real tool calls.** At
  `--timeout 90 --num-workers 8`, runs are killed before the model reaches its first tool call and
  every one of them records as "did not trigger". The same query that scored 0.00 there scores 1.00
  at `--timeout 300 --num-workers 3`. Redirect stdin (`< /dev/null`) too, or each subprocess wastes
  its first seconds waiting for input that never comes.

A trigger rate of zero across *every* positive query is almost always the harness, not the
description. Check one query by hand — run `claude -p` with the command file in place and look for
a `Skill` tool call in the stream — before touching a description on the strength of a zero. Add `scripts/run_loop.py` (same arguments plus `--max-iterations`) to
have it propose description rewrites and score them on a held-out split — but read the proposed
description before applying it: an optimizer will happily produce a description that triggers well
and describes the skill badly.

### What the first run measured

Both skills, 20 queries each, 2 runs per query, `--num-workers 3 --timeout 300`, opus:

| Skill | Positives firing at least once | Mean rate on positives | Near-misses that fired |
| --- | --- | --- | --- |
| `operating-model` | 6 / 10 | 0.35 | **0 / 10** |
| `modeling` | 3 / 10 | 0.15 | **0 / 10** |

Perfect precision, poor recall — and the misses are on central cases (mapping a flow across
services, which state transitions are legal, what a feature costs per use). A rewrite of both
descriptions naming exactly those situations, plus the anti-under-triggering line skill-creator
recommends, produced no detectable change (0.35 → 0.30 and 0.15 → 0.15) and was reverted.

**Know what this measurement can resolve before reading a delta as a result.** With `k` runs per
query over `m` positives, the standard error of the mean rate is `sqrt(m·p(1−p)/k)/m`. At k=2,
m=10, p≈0.3 that is ±0.10, so a before/after difference carries a 95% interval of about ±0.28:

| To resolve a difference of | Runs per query | Calls per skill |
| --- | --- | --- |
| 0.20 | 9 | 180 |
| 0.15 | 15 | 300 |
| 0.10 | 33 | 660 |

So this configuration is a **floor check**, not an A/B for description wording: it answers "does
the skill load at all, and do the near-misses stay clean?" It cannot referee two candidate
descriptions, and treating a ±0.1 swing as evidence is reading noise.

### The structural finding

Triggering held near-perfect specificity and low recall across two quite different description
texts. That's consistent with how skills load: Claude consults one when the task isn't something it
can already handle, and most of these prompts are advice-shaped questions it answers directly. The
practical consequence is worth stating plainly — **these desks earn their keep when invoked
(`/copilot:operating-model`, `/copilot:modeling`) or dispatched as agents, more than as ambient
skills that fire on their own.** A description rewrite is unlikely to change that, which is why
the reverted attempt is recorded here rather than repeated.

## Task evals

Three prompts per skill, each with assertions phrased so that a grader (or a person) can mark them
pass/fail from the output alone. They are written to catch the specific failures these desks exist
to prevent — endorsing a service split with no measured trigger, putting optimisation before
deletion in a takeover, ranking everything as worth doing, a sequence diagram with no failure path,
a cost model with rates asserted from memory, a state machine with implicit timeouts.

Running them properly means one run with the skill and one without, then grading both: the
question is not "is the output good" but "is it better than what you'd get anyway". Without a
baseline, a passing assertion may be measuring the model rather than the skill.

## What is deliberately not measured

Neither file measures whether the advice is *correct* in a given project — that needs the project.
These evals check that the skill loads when it should and that its output has the properties it
claims. That's the honest scope, and it's stated here so the numbers aren't read as more than they
are.
