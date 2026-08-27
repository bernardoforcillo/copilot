# Foundation: knowledge and decay

**The principles it generates:** the memory wiki and its lint pass, "write the decision down where
the code lives", the commit body that explains *why*, documentation with an owner and a review
date, the design doc that is deliberately killed after it ships, and the rule that what generalizes
from a cycle has to be captured or the cycle doesn't compound.

**The mechanism:** written knowledge has no filter of its own. Code is checked continuously by
compilers, tests, and production; a document is checked by nobody, so its error rate rises
monotonically with the rate of change of what it describes. Everything below follows from that
asymmetry — including the counter-intuitive rules, like deleting documentation on purpose.

## Why documents rot and code doesn't

A statement about a system can be wrong in exactly the same way whether it is written in code or in
prose. The difference is what happens next:

| Artifact | Who checks it | Detection latency | Failure mode |
| --- | --- | --- | --- |
| Code | Compiler, tests, production traffic | Seconds to hours | Loud |
| Test | CI, every run | Minutes | Loud |
| Config / infra manifest | The deploy that uses it | Hours to days | Loud, eventually |
| Comment next to code | A reader who happens to notice | Unbounded | Silent |
| Document in a wiki | Nobody | Unbounded | Silent, and confidently believed |

The last row is the whole problem. `defects-and-detection.md` gives the arithmetic: a filter's
value comes from its detection probability, and a document's is ≈ 0 — no process forces it to
encounter the change that invalidated it. So its accuracy decays at roughly the rate the system
changes, and the *belief* in it doesn't decay at all, because a confident sentence written two
years ago reads exactly like a confident sentence written yesterday.

Two consequences follow immediately, and they are the ones people resist:

- **A stale document is worse than no document**, because it is acted on. The cost of not having
  the information is a question someone asks; the cost of having wrong information is a decision
  someone makes.
- **Volume is a liability, not an asset.** Every additional page dilutes the average freshness and
  raises the chance the reader lands on a rotten one. A knowledge base is judged by its worst
  believed page, not by its coverage.

## The half-life is set by what the document is about

Not everything decays at the same rate, which is why "keep the docs updated" fails as a policy and
a *placement* rule works instead. Sort by the rate of change of the underlying thing:

| Kind of knowledge | Half-life | Where it belongs |
| --- | --- | --- |
| How this function works | Days | The code itself; a comment only for the non-obvious *why* |
| The shape of the system right now | Weeks | Generated from the code, or a diagram regenerated on change |
| Why we chose this over that | Years — reasons don't expire, they get superseded | An ADR / decision record, append-only |
| What we learned that transfers | Years | The memory wiki, cross-linked |
| What is true of the domain | Years to decades | The domain model in code, plus a glossary |

The rule that falls out: **write the durable half, generate or delete the volatile half.** Most
documentation pain is a volatile fact written in a durable place — an endpoint list, a folder
tree, a config default, a "current architecture" page — which is precisely the content a machine
could produce on demand and a human cannot maintain.

Decisions are the inverse case and the highest-return thing to write: a reason is *append-only*
and doesn't rot the way a description does. It can be superseded, but the record of what was
believed and why stays true forever, which is why `commit`'s *why* and the ADR trail outlive every
wiki page written the same week.

## Undocumented decisions are re-litigated, and the arithmetic is bad

Say a decision took hours h to reach. Undocumented, the next person facing the same question pays
some fraction of h again — and usually pays it worse, because they lack the constraint that made
the original choice necessary and will "improve" it back to the version that was already rejected.
With k re-encounters over the system's life, the expected cost of not writing it is roughly k × h′
against a one-time cost of minutes.

This is the same information asymmetry as in `defects-and-detection.md`, displaced in time: the
author holds the intent, and the future reader — a colleague, an agent, or you in eighteen months —
holds only the artifact. Every mechanism in this plugin for writing things down (the commit body,
the ADR, the memory wiki page, the "what was learned" line in a launch checklist) exists to move
one bit of intent across that gap, and each is cheap only because it is written at the moment the
context is still free.

## Why the capture step is the compounding edge

`compounding-and-capital.md` says a cycle compounds only if something reusable survives it.
Knowledge is the cheapest thing that can survive: it costs a few minutes at the end of work you
already did, and it lowers the cost of every future cycle that touches the same ground — the
learning-curve term, made deliberate instead of accidental.

The failure this prevents is specific and common: a team that solves the same class of problem
repeatedly at full price, and experiences it as bad luck rather than as an un-captured asset. The
tell is a debugging session that ends in "oh — right, we hit this before".

## Documentation obeys the same rules as any other complication

Since a document is a component with a maintenance cost and no automatic check, it takes the same
burden of proof as any other complication (`../radical-simplicity.md`):

- **An owner**, because an unowned page is one nobody is allowed to delete.
- **A review date**, because "check the docs sometimes" has never once happened. The date is what
  converts an unbounded detection latency into a bounded one — a manual filter, deliberately
  scheduled, which is the best available substitute for a mechanical one.
- **A mechanical check where one exists.** Link checking, referenced-file existence, code samples
  that are compiled or run as tests, freshness stamps. Each converts p ≈ 0 into p ≈ 1 for one class
  of rot — the cheapest available upgrade, and the reason this plugin has a structural checker at
  all rather than a documentation-review policy.
- **Deletion as the normal end state.** Most documents should be killed, not maintained: the design
  doc once it ships, the migration runbook once the migration is done, the "temporary" workaround
  page once the workaround is gone.

## When this mechanism is absent

The reasoning above voids, or weakens, where:

- **The thing described doesn't change.** A stable file format, a mathematical derivation, a
  postmortem of an event that already happened: decay is near zero, and the write-once document is
  correct forever. (A postmortem is a record, not a description — that's why it's kept.)
- **Nobody will read it.** A document with no future reader has no re-litigation cost to avoid;
  writing it is the maturity mismatch in its expensive direction.
- **The knowledge is genuinely one-use.** Something specific to a system being deleted next month
  compounds into nothing, and the memory-wiki step is overhead.
- **A machine already holds it.** If the schema, the API contract, or the dependency graph is
  derivable from the source, the derived artifact is the documentation; writing a parallel prose
  copy creates a second source of truth whose only distinguishing property is being wrong sooner.
