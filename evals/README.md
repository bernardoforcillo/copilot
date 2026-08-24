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
  --runs-per-query 3 --num-workers 6 --timeout 90 --model <session model> --verbose
```

Each query runs three times because triggering is stochastic; the reported rate per query is what
matters, not a single yes/no. Add `scripts/run_loop.py` (same arguments plus `--max-iterations`) to
have it propose description rewrites and score them on a held-out split — but read the proposed
description before applying it: an optimizer will happily produce a description that triggers well
and describes the skill badly.

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
