# Foundation: compounding and capital

**The principles it generates:** the reinvestment edge of the operating loop, the platform tier,
the long-horizon preference in prioritization, acquire → transform → reinvest, build-vs-buy, and
the claim that extraction without reinvestment eventually runs out of asset.

**The mechanism:** returns that are reinvested grow geometrically; returns that are consumed grow
linearly. Over enough cycles the difference is not a matter of degree, and almost everything else in
this model is subordinate to keeping the cycles coming.

## The arithmetic that makes the rest matter

Value after *n* cycles at rate *r*, reinvested: **V = V₀(1+r)ⁿ**. Consumed instead: **V = V₀ + n·r·V₀**.

At r = 20% over 10 cycles, reinvestment gives 6.2× and consumption gives 3×. At 20 cycles it's
38× versus 5×. Three consequences follow directly:

- **The reinvestment *rate* dominates the return rate.** A modest return that is fully redeployed
  beats a spectacular one that isn't. This is why "what did this project leave behind that the next
  one can use?" is a more important question than "how good was this project?"
- **Depreciation is subtracted before exponentiation.** Real growth is (1 + r − d)ⁿ, where *d* is
  decay: components rot, dependencies break, knowledge leaves with people, data goes stale. A
  platform that saves 20% and costs 20% to maintain compounds at zero. Maintenance is not overhead
  *against* compounding, it's a term inside it.
- **Ruin sets the whole product to zero.** No sequence of good bets survives one unrecoverable
  outcome, because the exponent is a product, not a sum. This is the mathematical version of the
  argument in `irreversibility-and-optionality.md`, and the reason a compounder's bet sizing is
  conservative in a specific place: never on the term that can zero the product. (Kelly's 1956
  criterion is the formal treatment: growth-optimal sizing is bounded well below "all in" precisely
  because ruin is absorbing.)

## Where the recurring return actually comes from

Three mechanisms, all of which need repetition to exist at all:

**Economies of scope.** A shared component costs *C* once and serves *k* products, so its cost per
product is *C/k* — a fixed cost converted into an approximately marginal one. This is the whole
economic case for a platform, and it also states its precondition: **k must actually be greater than
one.** A "platform" with a single consumer is a refactor with extra vocabulary. It's also why the
extraction rule is the third consumer and not the second (`platform-and-compounding.md`): you need
*k* ≥ 3 both to justify the cost and to know what actually varies.

**Learning curves.** Wright's law (1936), observed across manufacturing and repeatedly in software
delivery: unit cost falls by a roughly constant percentage per doubling of *cumulative* experience.
Note the variable — cumulative output, not elapsed time. Doing the same class of thing repeatedly
and keeping what you learn is what moves you down the curve; doing many unrelated things once each
never does. This is the mechanism behind "the *n*-th transformation is cheaper than the first" and
behind the entire reinvestment edge.

**Data with increasing returns.** Code you reuse saves time; data you accumulate changes which
questions are answerable at all. Experiments, incidents, cohort histories and price tests that land
in one place become an asset no single project could produce — with the caveat that data also
depreciates, so an accumulated corpus that nobody curates decays into storage cost.

## Make, buy, or centralize

Ronald Coase, *The Nature of the Firm* (1937): activities move inside a firm when the transaction
cost of coordinating them through the market exceeds the cost of coordinating them internally, and
outside when the reverse holds. That's the same calculation as build-vs-buy-vs-extract, and it says
the answer is not fixed — it moves when either cost moves.

Practically: buy the commodity (bounded switching cost, adequate market version), build the
differentiator (the thing whose behavior or data *is* your advantage), and centralize what is
identical across consumers, slow-changing, and expensive to get wrong twice — auth, billing,
deploy, measurement. Centralizing the fast-changing and product-specific inverts the calculation:
the internal coordination cost exceeds what it saves, which is the internal-framework failure mode.

## Payback, cost of capital, and holding

Two numbers decide whether an investment can be made at all, independent of whether it's good:

- **Payback period versus the horizon you can finance.** A three-year payback is only available to
  someone who can carry three years. This is why the same investment is correct for a funded
  operator and wrong for a solo developer, and why cohort-level lifetime value has to be compared
  against a horizon, not just against cost (`evidence-and-experimentation.md`).
- **Opportunity cost is the real hurdle rate.** An investment competes with the best alternative
  use of the same capacity, not with zero — the ranking rule in `impact-and-prioritization.md` is
  this, stated for time instead of money.

And the reason to hold rather than flip: an asset that's improved and kept keeps contributing to
the exponent. Selling converts a compounding stream into a single sum, which is only correct when
the proceeds compound faster somewhere else.

## Why extraction has a horizon

Raising price on a captive base and cutting the cost of serving them both increase the current
period's return. Neither adds to the asset. If *r* is produced by consuming the thing that produced
it — the user base's trust, the product's capability, the team's knowledge — then *d* rises as *r*
rises, and the compounding rate (1 + r − d) can fall while the reported return climbs. That's the
mechanism, not a moral objection: extraction is a strategy that borrows from later cycles, and it
works exactly until later arrives.

## When this mechanism is absent

The principle voids, or weakens, where:

- **There is no next cycle.** A one-off project, a product about to be sunset, a contract ending.
  Reinvestment has nothing to compound into, and building the platform is pure cost.
- **The decay rate exceeds the return.** Fast-moving domains where today's tooling is obsolete
  before it's amortized. Rent rather than build.
- **k = 1.** One consumer, forever. Then the shared component's arithmetic never applies, and
  "extract it, it'll be reusable" is a prediction, not a calculation.
- **The horizon is shorter than the payback.** Correct investment, wrong balance sheet. Say that
  plainly rather than dressing the constraint as a judgment about value.
