# Platform and compounding

The reinvestment edge of the operating loop is where the model stops being a set of good habits
and starts being a machine: each cycle should leave behind something that makes the next one
cheaper. A platform, in this sense, isn't infrastructure — it's **the set of things you only had to
decide, build, or learn once.**

The test for whether you have one: if the next project starts from the same blank page the last
one did, you don't. You have a sequence of projects.

## What belongs in the shared layer

The components that repeatedly justify centralization, in rough order of how reliably they pay
back:

| Component | Why it centralizes well | What it looks like at small scale |
| --- | --- | --- |
| Identity / auth | Security-critical, changes rarely, identical everywhere, expensive to get wrong twice | One auth module or provider integration, reused verbatim |
| Payments & subscriptions | Regulatory surface, edge cases (dunning, proration, refunds, tax) that cost months to rediscover | One billing integration and its webhook handling, copied forward |
| Analytics & attribution | Only useful if the schema is the same across products, which is exactly what nobody does per-product | One event schema and one ingestion path, defined once |
| Experimentation | Assignment, exposure logging, and stats are easy to get subtly wrong and identical in every product | A tiny assignment helper plus a fixed analysis notebook |
| Deploy / CI / observability | Every product needs it; nobody wants to re-learn it per product | One pipeline template and one dashboard template |
| Data infrastructure | Value grows superlinearly with how much lands in the same place | One warehouse and one loader, not one per app |
| Prediction models (e.g. lifetime value) | Need volume across products to be any good at all | Usually *not* worth it below real volume — say so rather than building a toy |
| Conventions and know-how | The cheapest of all, and the most often skipped | Reference files, templates, a memory wiki, a plugin like this one |

What deliberately stays local: the product's actual domain logic, its interface, and anything whose
requirements differ per product. Centralizing those produces the classic over-general internal
framework that fits nothing and blocks everything.

## When extraction is earned

Extraction is a complication like any other and takes the same burden of proof
(`radical-simplicity.md`), with one component-specific rule:

- **The third consumer, not the second.** Two implementations tell you what varies; three tell you
  what's stable. Extract at the third — earlier and you're generalizing from a sample of two.
- **Extract from working code, never toward it.** A shared component distilled from three shipped
  implementations is a summary of reality; one designed in advance is a specification of your
  assumptions.
- **The maintenance is now yours forever.** Every shared component acquires consumers who are
  blocked when it breaks. Extract only what you're prepared to keep operating, and prefer boring,
  slow-changing pieces (auth, billing, deploy) over fast-changing ones (UI patterns, domain rules).
- **Buy the commodity, build the differentiator.** Anything where the market's version is
  adequate and the switching cost is bounded is a purchase, not a project. The exception is
  something whose data or behavior *is* your advantage — that's the part worth owning even when a
  vendor sells one.

## The compounding arithmetic

Why this matters more than it feels like it should: the payoff isn't the time saved on one
project, it's the shape of the curve across many.

- **A one-off saves once. A component saves every time.** A day spent on something you reuse in
  ten projects is an hour each, and it improves — the tenth use runs on a component that survived
  nine rounds of contact with reality.
- **The data compounds harder than the code.** Code you reuse saves time; data you accumulate
  changes what questions are answerable at all. Experiments, incidents, price tests, and cohort
  histories that land in the same place become an asset no single project could have produced —
  and it's the asset that makes the *next* decision cheaper rather than the next build.
- **Judgment compounds hardest and is the easiest to lose.** The reason a decision was made
  survives only if it was written down. This plugin's `capture-learnings` skill exists exactly for
  this step, and skipping it is how a team runs the loop for years without the loop ever getting
  cheaper.

## Measuring whether the platform is paying

Internal tooling is the single easiest place to spend unlimited time with no accountability,
because its cost is visible and its benefit isn't. Hold it to the same standard as anything else:

- **State the saving before building**, in the unit that matters — hours per use × uses per
  quarter, or a class of bug it eliminates — and check it afterwards like any other measurement.
- **Count the consumers.** A shared component with one consumer is a refactor with extra steps; if
  the second and third never arrive, retire it rather than maintaining it out of loyalty.
- **Track the trend, not the total.** The question is whether cycle *n+1* was cheaper than cycle
  *n*. If every project still costs what the first one did, the platform is decoration.
- **Retire deliberately.** Components that stopped being used are complications that lost their
  justification — they go under the deletion rule in `asset-transformation.md`.

## Anti-patterns

- **The platform team with no customers.** Building the shared layer before any product needs it,
  then looking for adopters.
- **Centralizing the differentiator.** Pushing domain logic into the shared layer, where every
  product's special case becomes a shared-layer feature flag.
- **The framework nobody can leave.** A shared component with no escape hatch turns every one of
  its limitations into a company-wide limitation.
- **Tooling as procrastination.** Building the thing that helps you build the thing, indefinitely.
  The saving was supposed to be stated in advance for exactly this reason.
- **Reinvesting nothing.** Running the loop and leaving no component, no data, and no written
  decision behind — the version of this model that stays a sequence of projects forever.
