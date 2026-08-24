# Foundation: irreversibility and optionality

**The principles it generates:** two-way doors decided fast and one-way doors decided carefully,
staged rollouts, kill criteria, grandfathering on price, migration rather than rewrite, and the
whole "speed over sophistication when in doubt" posture.

**The mechanism:** the cost of being wrong is bounded by the cost of undoing. Where undoing is
cheap, deliberation buys almost nothing; where it's impossible, deliberation is the only protection
you have.

## Reversibility is the axis, not importance

The intuitive sort — important decisions get more thought — is the wrong one, because importance
and reversibility are independent. A high-stakes, easily-undone choice (which cache library, this
month's pricing page copy) deserves speed. A low-stakes, permanent one (a column name in a table
three systems will read, an identifier format in a public URL) deserves the fifteen minutes it will
never be possible to spend again.

Jeff Bezos's 2015 shareholder letter names the two classes: **Type 2** decisions are "changeable,
reversible — they're two-way doors", and should be made quickly by individuals or small groups;
**Type 1** decisions are near-irreversible one-way doors and warrant deliberation. The failure mode
he names is organizations applying Type 1 process to Type 2 decisions, which produces slowness that
feels like rigor.

The operative question is therefore never "how important is this?" but **"what does it cost to
undo, and who pays it?"**

## The asymmetry that makes speed rational

A reversible decision has a bounded downside (the cost of undoing) and an unbounded-ish upside (it
might just work). That payoff shape is an option, and options are worth more the more uncertainty
there is — which inverts the intuition that uncertainty calls for caution. Under uncertainty, on a
reversible decision, *acting* is how you buy information (see `uncertainty-and-information.md`):
you cannot get the data by thinking, and the loss if you're wrong is capped.

This is also why the staged rollout is not timidity but purchase: a canary buys the right to
observe a real outcome while retaining the right to withdraw, at the price of some engineering. A
kill criterion is the same instrument applied to a project — an exit purchased in advance, while
you are still capable of setting the threshold honestly.

## Doors that close slowly

Most real decisions are neither purely reversible nor purely permanent. Three patterns:

- **Migration-gated.** Technically reversible, but only through a backfill, a dual-write, or a
  client update. Reversible today, one-way in six months — so the deliberation should be spent
  *now*, while the door is still cheap to close differently.
- **Socially ratcheted.** Technically trivial to undo, socially impossible: a price rise, a public
  commitment, a removed feature, a deprecated API. The code change is one line; the relationship
  change is permanent. This is the category most often misclassified as two-way, and
  `pricing-and-value-capture.md` exists mostly to handle one instance of it.
- **Dependency-hardened.** Hyrum's law again (see `complexity-and-coupling.md`): once enough
  consumers exist, every observable behavior is load-bearing. A door closes each time someone new
  starts depending on what's behind it, which means *time itself* converts two-way doors into
  one-way ones. Decide the things that will accumulate dependents early.

## Why rewriting is the expensive option

A working system holds two assets: the behavior it produces, and the accumulated corrections
encoded in it — the edge cases, the workarounds, the small fixes nobody documented. A rewrite spends
both to buy back only implementation, which was the replaceable part. In options language, you are
exercising an expensive irreversible option to acquire something you could have obtained
incrementally.

The incremental alternatives — move onto your infrastructure first, strangle behind the existing
interface, replace one characterized component — each preserve the option to stop. That is their
entire advantage, and it's why `asset-transformation.md` orders them the way it does.

## Ruin is the special case

An irreversible outcome that ends the sequence — data loss, insolvency, a legal violation, a
breach, a reputation-destroying incident — is not merely a bad outcome with a large negative number
attached. It removes all future decisions from the board, which is why it cannot be traded against
expected value in the normal way (`compounding-and-capital.md` has the arithmetic). This is the
justification for the non-negotiable floor in `reliability-and-incidents.md`: backups with a tested
restore, no secrets in the repo, an undoable deploy. Those aren't proportional to maturity because
ruin isn't proportional to anything.

## When this mechanism is absent

The principle voids, or inverts, where:

- **Nothing is reversible** — safety-critical, regulated, physical, or one-shot deployments. Then
  the fast-by-default posture is simply wrong, and the deliberate path is the only path.
- **Everything is reversible and costless to undo** — a scratch prototype, a local experiment. Then
  even the one-way-door machinery is overhead; just act.
- **The undo cost is borne by someone else.** Reversibility is only cheap if *you* pay for the
  reversal. A change that's trivial for you to roll back and expensive for your users to absorb is
  a one-way door with the cost externalized, and should be treated as one.
