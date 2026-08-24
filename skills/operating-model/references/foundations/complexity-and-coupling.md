# Foundation: complexity and coupling

**The principle it generates:** radical simplicity — the burden of proof on every complication, the
third-consumer rule for extraction, delete-before-optimize, migrate-over-rewrite, and the
preference for small teams.

**The mechanism:** the cost of a system grows with the number of *interactions* it permits, not the
number of parts it contains — and interactions grow combinatorially while parts grow linearly.

## The arithmetic

Three growth laws, each of which is the real reason behind a rule that otherwise sounds like taste.

**Interactions, not parts.** *n* components that can each reach every other admit *n(n−1)/2*
pairwise interactions. Going from 4 components to 8 doubles the parts and takes the pairwise
interactions from 6 to 28 — nearly five times as many ways to interfere. This is why "just one more service" is never one more thing.

**State space multiplies.** A system whose components have *s₁, s₂, … sₙ* states has *∏sᵢ*
reachable configurations, not *∑sᵢ*. Three booleans in one function is 8 paths; three independent
feature flags across a request is 8 deployments' worth of behavior you have never tested together.
Each flag, each option, each mode multiplies rather than adds — which is why "it's just a config
option" is the most reliably underestimated cost in software.

**Coordination grows the same way.** Brooks's observation in *The Mythical Man-Month* (1975): *n*
people have *n(n−1)/2* communication paths. Output per person is roughly flat; coordination cost is
quadratic. That is the entire case for a small, dense team — not a claim about how brilliant anyone
is, just the arithmetic of who has to talk to whom. It's also why adding people to a late project
makes it later.

## Why complications are permanent liabilities

A complication is not paid for once at build time. It is paid on **every subsequent change**, for
as long as the system lives: read it, reason about it, work around it, test it, migrate it, explain
it. Roughly, cost ≈ (rate of change) × (remaining lifetime) × (marginal difficulty it adds) — and
the first two terms are exactly the ones nobody estimates when arguing for it.

This is why the burden of proof sits where it does. The person adding the complication pays the
first installment and none of the rest. Everyone who touches the system afterwards pays the
remainder, including the person who added it, six months later, having forgotten why.

Two further mechanisms make it worse:

- **Accretion is the default.** Lehman's laws of software evolution (1980): a system in use must
  continuously change, and its complexity increases unless work is explicitly done to reduce it.
  Nothing removes complexity on its own. Deletion is the only force pointing the other way, which
  is what makes it the highest-return activity in an inherited system.
- **Every observable behavior becomes a dependency.** Hyrum's law: given enough consumers, all
  observable behavior of your system — including behavior you never promised — will be depended
  upon by someone. Complications therefore harden into contracts, and a "temporary" one is only
  temporary until it has a second user.

## Essential vs accidental

Brooks again, *No Silver Bullet* (1986): complexity is **essential** (inherent in the problem) or
**accidental** (introduced by how you solved it). Radical simplicity is a claim about the accidental
half only, and confusing the two produces both of the classic failures:

- Treating essential complexity as accidental gives you the too-simple solution that's wrong in
  ways you discover later — distributed consensus, timezones, tax, cryptography, i18n,
  accessibility. Here the simple version doesn't satisfy the requirement, so it fails the same
  proof test the complicated one does.
- Treating accidental complexity as essential is how every framework, abstraction layer, and
  "extensibility" argument defends itself. The test is concrete: could a competent person satisfy
  the *stated requirement* with less machinery? If yes, the excess is accidental.

## Two structural corollaries

**Near-decomposability** (Herbert Simon, *The Architecture of Complexity*, 1962): complex systems
that survive are almost always hierarchic and nearly decomposable — dense interaction inside
modules, sparse interaction between them. This is the mechanism under layering and dependency
direction: boundaries don't remove interactions, they cap which ones are permitted, which is what
keeps the *n(n−1)/2* term from applying globally. It is also why a boundary drawn in the wrong
place is worse than none: it adds cost without reducing the exponent.

**Conway's law** (Melvin Conway, 1968): a system's structure mirrors the communication structure of
the organization that built it. Splitting a service therefore imposes an organizational boundary
whether or not one exists — which is why a service split with no corresponding team boundary tends
to produce coordination cost without autonomy, the worst half of both arrangements.

**Gall's law** (John Gall, *Systemantics*, 1975): a complex system that works is invariably found to
have evolved from a simple system that worked, and a complex system designed from scratch never
works. This is the mechanism behind the rewrite base rate: the working system encodes thousands of
small corrections that no design document contains.

## When this mechanism is absent

The principle voids, or weakens sharply, where:

- **The complexity is essential.** Nothing is gained by pretending an irreducibly hard problem is
  simple; the proof requirement applies to the simple option too.
- **The system is genuinely short-lived.** Cost ≈ rate of change × remaining lifetime; a script that
  runs twice and is deleted has almost no remaining lifetime, so almost nothing is at stake.
  (Beware: most "throwaway" code has a longer lifetime than predicted — this is a real exception
  that is claimed far more often than it holds.)
- **The interactions are already capped by construction.** A pure function, a stateless job, an
  isolated component with one entry point — the combinatorial term doesn't apply to what can't
  interact.

## The discipline it demands in return

Deletion needs the mirror of the rule that governs addition. Chesterton's fence (G. K. Chesterton,
1929): don't remove something until you know why it's there. In practice that's the usage evidence
the deletion rule in `asset-transformation.md` requires — the grep, the traffic data, the reason
recorded in the commit. Complexity is expensive; *unexamined* deletion is how you convert an
expensive system into a broken one.
