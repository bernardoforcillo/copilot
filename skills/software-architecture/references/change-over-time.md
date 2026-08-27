# Change over time

Most architecture advice is about the first version. This file is about the property that decides
whether a system is still workable in three years: **can it absorb every change it will be
required to absorb** — a security patch, a language version, a dependency that dropped support, a
regulation, a platform deprecation — at a cost you can pay on the day it arrives.

That's a different question from "is the code clean", and it has a different answer. Code that
reads well but cannot be upgraded is unsustainable; code that is ugly and mechanically changeable
usually isn't.

## Origin

**Source:** Titus Winters, Tom Manshreck and Hyrum Wright (eds.), *Software Engineering at Google*
(O'Reilly, 2020) — "software engineering is programming integrated over time"; sustainability as
the capacity to change for every valid reason over the expected lifetime; Hyrum's law; the
Beyoncé rule; the large-scale-change mechanics; and the rules-versus-guidance treatment of style.
**Source:** Jez Humble and David Farley, *Continuous Delivery* (2010), and the trunk-based
development literature that followed it, for branch age as inventory and for "main is always
releasable".
**Source:** Rachel Potvin and Josh Levenberg, "Why Google Stores Billions of Lines of Code in a
Single Repository" (CACM, July 2016), for the one-version rule and the atomic-change argument —
read alongside its own stated costs, which are the part usually dropped when it's cited.

Cited by title from standard literature and not re-verified here; the derivations below are this
plugin's own, and each names the mechanism it rests on.

## Sustainability is a cost question, not an aesthetic one

The operative test for any part of a system: **if you had to make the change today, what would it
cost?** Pick the changes you know are coming — a major language release, the framework's next
version, the dependency that will lose its maintainer, the key you'll have to rotate — and price
them. A system where each of those is a week is sustainable; one where any of them is "we'd have
to rewrite" is not, whatever the code looks like.

The mechanism that makes deferral expensive is compounding distance, not decay. Upgrade cost rises
with the number of intervening versions *and* with the amount of your own code written against the
old assumptions in the meantime, so it grows faster than linearly in the time you wait — which
inverts the intuition that postponing an upgrade saves it for later. **If it hurts, do it more
often**: the frequent small upgrade is not discipline for its own sake, it's the only version of
the upgrade whose cost you have measured.

The corollary for dates: a dependency's support horizon is a *deadline you were given*, not a
suggestion, and the cheapest moment to move is while the old version still works — which is also
the only moment at which nobody feels any urgency.

## Time turns behaviour into contract

Hyrum's law (`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/foundations/complexity-and-coupling.md`):
with enough consumers, every observable behaviour of your system becomes something someone depends
on, regardless of what you documented. Ordering of results nobody promised, the exact text of an
error, a timing side effect, a field that happens to be present — all of it hardens into interface
as soon as it has enough users.

Three consequences that are design decisions, not warnings:

- **Make less observable.** What isn't visible can't be depended on. Randomize what you don't
  promise (iteration order), avoid leaking internal identifiers, keep error strings out of the
  contract by giving callers codes instead.
- **The set of dependents only grows**, so the door closes with time
  (`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/foundations/irreversibility-and-optionality.md`).
  A choice that's cheap to change today because two callers exist is a one-way door at two hundred.
  Spend deliberation early on the things that will accumulate dependents: identifiers, formats,
  public error semantics, anything another team or another product will copy.
- **Versioning is how you buy back the option.** An explicit version at a boundary converts an
  irreversible change into a reversible one, at the price of running two paths for a while. That
  price is what versioning is *for*; refusing to pay it is choosing the one-way door.

## One version, one truth

Within a single build, multiple versions of the same dependency are not a convenience, they're a
defect waiting for the diamond to close: A needs lib@1, B needs lib@2, and the moment something
needs both, one of them is running against a version it was never tested with. The number of such
pairs grows combinatorially with the number of independently-chosen versions, which is why the
policy that scales is **one version per repository, upgraded centrally**.

At small scale the practical form is unglamorous and cheap: a single lockfile per repo, no
per-module version pinning "just for now", upgrades landed as their own reviewable changes, and a
fork of a dependency treated as a permanent tax with an owner — because a fork is a version nobody
will ever upgrade for you.

## Branch age is inventory

Merge cost grows with the *product* of how long a branch lives and how fast the trunk moves, and
the work of resolving that cost is pure holding cost: it produces nothing
(`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/foundations/flow-and-queues.md`). Hence
the trunk-based default:

- **Short-lived branches**, measured in a day or two rather than a sprint.
- **Main is always releasable**, and incomplete work hides behind a flag rather than behind a
  branch — a flag is a runtime switch you control, a branch is a divergence you must reconcile.
- **Flags have owners and removal dates.** A permanent flag is a second configuration language and
  it multiplies the state space you can't test (`code-organization.md`'s complexity argument).
- **The exception is the indivisible cutover** — a storage format, a protocol migration. Then the
  answer isn't a long branch, it's the expand/contract sequence below.

## Large-scale change: the only shape that works

A change that touches many call sites cannot be one atomic diff without becoming unreviewable
(`code-review.md`: reviewer attention is fixed, so detection falls with size). The mechanism that
resolves the conflict is to split by *reversibility*, not by file count:

1. **Expand** — add the new thing beside the old one. Nothing breaks; the diff is small and the
   review is about the new design only.
2. **Migrate** — move call sites mechanically, in batches, with the compiler or a codemod doing the
   transformation rather than a human doing it by hand. A mechanical migration is a filter with
   p ≈ 1 for the class of error it could introduce, which is exactly why it must be mechanical:
   two hundred hand-edited call sites are two hundred chances to be creative.
3. **Contract** — delete the old path once nothing calls it, as its own revertible change.

Each step is separately reviewable, separately revertible, and separately abandonable — which
means a migration that turns out to be wrong costs you one step, not the whole programme. Schema
migrations use the same three-step shape for the same reason
(`../../../docs/engineering/release-and-environments.md`); it isn't a database technique, it's what
irreversibility does to any wide change.

## A rule is only a rule if a machine enforces it

Style guides, layering conventions, dependency policies: each is a filter, and a filter whose
detection depends on human attention has p < 1 and degrades with fatigue, turnover, and diff size
(`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/foundations/defects-and-detection.md`).
A formatter, a linter rule, an import restriction, a CI check — same rule, p ≈ 1, zero marginal
cost per run, and no opinion attached to it when it fires.

Two rules follow, and the second one is the one people skip:

- **Automate the rule, or state it as guidance.** Both are legitimate; what isn't is a "standard"
  enforced by whoever happens to review, which produces inconsistent code *and* the impression
  that rules are negotiable.
- **Don't write rules you won't enforce.** An unenforced rule doesn't decay quietly to neutral, it
  teaches everyone — including the agent reading your codebase for patterns — that the written
  conventions are decorative.

Where a rule genuinely can't be automated (naming that requires judgement, layering in a language
without an import checker), write it down with an example and a counter-example, and accept that
it is guidance with a lower detection rate. Then watch for the case where the violation actually
happened, which is the evidence that earns building the mechanical check
(`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/radical-simplicity.md`).

## Deprecation is a process, not an announcement

The asymmetry that makes deprecations stall: the person who wants the old thing gone is not the
person who has to change. Without a mechanism, migration is permanently the second priority of
everyone who could do it, and the deprecated path outlives the person who deprecated it.

What actually works, in order:

1. **Close the door first.** Make the old path un-addable — a lint rule, a compile-time deprecation
   that fails CI for new call sites, a removed default. A deprecation whose dependent set is still
   growing is not a deprecation.
2. **Own the migration**, don't delegate it. The party with the context is the one deprecating; a
   codemod written once beats N teams reading the same migration note.
3. **Set a date, publicly**, and make the cost of the date visible. Without one, nothing changes
   priority; with one, the work becomes schedulable.
4. **Delete.** A deprecated path that is never removed is the worst of both: the maintenance cost
   of two implementations plus the confusion of two blessed ways to do the same thing.

## What the tests promise is what the system promises

The time-dimension version of the testing rule: whoever changes this code next has no access to
your intentions, only to the checks that fail. So an untested behaviour is a behaviour that may
legitimately break, and holding the changer responsible for it is blame standing in for a missing
mechanism — the same substitution `../../operating-model/references/reliability-and-incidents.md`
rejects in postmortems.

Practically: a behaviour someone depends on gets a test *at the boundary they depend on*, and the
test is the artefact you point at during the argument, not the documentation.

## Applying this on a small team

- Trunk-based, branches measured in days, flags for anything unfinished, and a weekly slot for
  dependency updates so the upgrade cost stays sampled rather than accumulated.
- One lockfile per repo, upgrades as their own changes, no "temporary" second version.
- Wide changes as expand → mechanical migrate → contract, each landing separately. `gofmt -r`,
  the compiler, and codemods do the middle step; you do not.
- Every convention either has a CI check or is labelled guidance in the project's own rules file —
  and the reviewer stops enforcing what the pipeline should own (`code-review.md`).
- Deprecations get a lint rule that blocks new callers, an owner, and a date, recorded where the
  project keeps decisions (`${CLAUDE_PLUGIN_ROOT}/skills/commit/SKILL.md`,
  `${CLAUDE_PLUGIN_ROOT}/skills/capture-learnings/SKILL.md`).

## Checklist

- [ ] The upgrades you know are coming have a priced cost, not a vague plan
- [ ] Nothing observable is promised by accident — what you don't guarantee is hidden or varied
- [ ] One version of each dependency per repo, upgraded centrally
- [ ] No branch older than a couple of days; unfinished work behind flags with removal dates
- [ ] Wide changes split expand → migrate → contract, the migration mechanical
- [ ] Every stated convention is machine-enforced, or explicitly labelled as guidance
- [ ] Every deprecation has a closed door, an owner, a date, and a deletion
