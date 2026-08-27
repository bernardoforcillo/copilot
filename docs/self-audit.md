# Self-audit

> Date: 2026-08-27 · Auditor: the plugin, against its own rules · Re-run: when a desk is added, or
> when a claim below stops being true

This plugin tells other people's systems that a rule is only real if something enforces it, that a
complication needs evidence, that documentation nobody checks decays silently, and that an
unmeasured claim is a preference. Applying that to somebody else's codebase and not to itself would
be the exact failure it exists to catch — so this document is the pass, with the numbers it was
actually run on and the findings it actually produced, including the unflattering ones.

Rules applied: `${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/radical-simplicity.md`,
`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/foundations/defects-and-detection.md`,
`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/foundations/knowledge-and-decay.md`,
`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/foundations/load-and-automation.md`, and
the change-level standard in
`${CLAUDE_PLUGIN_ROOT}/skills/software-architecture/references/code-review.md`.

## 1. What this is, in numbers

| | Count |
| --- | --- |
| Skills | 11 |
| Agents | 10 |
| Markdown files under `skills/` | 80 |
| Words across `skills/`, `agents/`, `docs/` | ~215,000 |
| Words in the largest desk (`neuro-design`) | ~119,000 (56% of the plugin) |
| Words in the second (`operating-model`) | ~33,000 |
| Skills with a trigger eval set | 2 of 11 |
| Skills with a task eval set | 3 of 11 |
| External plugin dependencies | 4 (`superpowers:brainstorming`, `superpowers:subagent-driven-development`, `superpowers:systematic-debugging`, `feature-dev:code-architect`) |
| Mechanical checks in `check-plugin.mjs` | 12 groups, one of which runs 55 arithmetic assertions |

**None of the figures in this table is mechanically checked.** The checker verifies counts stated
in the forms it knows (§6), and these aren't among them — they are statistics over the tree rather
than claims about a directory. So they will drift, and the reader should treat them as "true on the
date at the top" rather than as current. Recomputing them is four shell commands, and doing that is
the first step of re-running this audit.

**Finding — size is a liability, not an achievement.** Under `knowledge-and-decay.md`, a knowledge
base is judged by its worst believed page rather than by coverage, and every added page dilutes
average freshness. 205,000 words with no mechanical freshness check is a large surface of
confidently-worded prose that nothing forces to encounter the change that would invalidate it. The
mitigating structure is real — progressive disclosure means a session loads one SKILL plus one or
two references, roughly 3,000–5,000 words, not the corpus — but that mitigates *cost per use*, not
staleness.

**Finding — the reference base's own unit cost is knowable and isn't stated anywhere.** Loading
`operating-model`'s SKILL plus one applied reference is ~5,000 words ≈ 6–7k tokens; the same desk
with three references is roughly double. That's the per-invocation cost this plugin asks other
projects to compute for their features and has never computed for itself. It is now stated here.

## 2. Readiness review of the artifact

The plugin's "production" is a session that has it installed. Running the gate from
`engineering/release-and-environments.md`, honestly:

| Gate item | Verdict | Evidence |
| --- | --- | --- |
| Named owner who can change and revert it | **met** | Single maintainer, git history, no release process to route around |
| Service level, or a written statement it's below the line | **waived, stated** | The failure mode is silent under-triggering, and there is no denominator: no telemetry on how often a skill loads or is followed. An SLO here would be invented, which `reliability-and-redundancy.md` says not to do |
| Detection: something fires when it breaks | **partly met** | `scripts/check-plugin.mjs` catches structural breakage on every run; the eval sets catch triggering and advice-property regressions on 2–3 desks of 11. Nothing catches wrong advice on the other 8 |
| Dependency failure is defined behaviour | **met** | Was a gap. Each external plugin reference now has a stated fallback that routes to this plugin's own agents (`skills/prd/SKILL.md` carries the table, `agents/product-strategist.md` its own, `docs/architecture.md` the summary), and both say to check availability before promising a hand-off |
| Limits and quotas | **n/a** | No runtime, no fan-out, no bill |
| Capacity at expected peak | **met, trivially** | The constrained resource is the reader's context window, quantified in §1 |
| Rehearsed rollback | **met** | `git revert`, and `/plugin` disable; both exercised |
| One-page runbook | **met** | `contributing.md` plus this file |
| Off switch | **met** | Uninstall or disable the plugin |
| Cost ceiling known | **met, newly** | See §1 |

**Action from this section:** done in the pass that added the argument-chain check — each external
dependency degrades to a named local agent rather than to a dangling instruction, and the hand-off
is checked before it is promised rather than after a PRD is approved.

## 3. The filters, and whether they are independent

`defects-and-detection.md` says filters compose as ∏(1 − pᵢ) **only where they fail
independently**, and that overlapping filters are cost without coverage. This repo's filters:

| Filter | Catches | Detection | Independent of the others? |
| --- | --- | --- | --- |
| `check-plugin.mjs` | Frontmatter, broken internal paths, orphaned references, dispatch-graph and adopter-table drift, mermaid fences, eval JSON shape, marketplace sync, stated counts, and the foundations tier's own contract (a derivation must name its mechanism and its voiding condition) | High, mechanical | Yes — it reads the filesystem, not the prose |
| `mechanisms.mjs --test`, run by the checker | Divergence between a figure quoted in prose and the model it claims to follow from | High, mechanical, and it has already caught two substantive errors (below) | Yes — it computes rather than reads |
| Argument-chain check | A reference file that states a rule without naming the mechanism under it — the case where progressive disclosure delivers a reader straight to an assertion | High, mechanical | Yes — it reads structure, not argument quality |
| Trigger evals | A description that stopped discriminating | Measured, noisy (see `evals/README.md` on what a 20×2 configuration can resolve) | Yes |
| Task evals | Advice that lost a property it claims | Only on the 3 desks that have a set | Yes |
| Maintainer reading the diff | Everything else | Falls with diff size, per §5 | **No** |
| Use in real work | Wrong advice, eventually | Slow, unrecorded | Yes, but no feedback path back into the repo |

**The honest finding.** Most of this plugin's prose is produced and reviewed inside the same
process — an agent writes it, and the review is performed in the same session by the same model
that wrote it. Those two filters are strongly correlated: their holes are in the same place, which
is exactly the configuration `defects-and-detection.md` says provides less coverage than it
appears to. The two mitigations that actually are independent are the mechanical checker and the
maintainer's own reading; the correct response is therefore to **push as many invariants as
possible into the checker** rather than to promise more careful review.

That is what happened during this audit, and the mechanisms added since have earned the claim
rather than illustrated it. **The clearest evidence that a mechanical filter catches what
same-process review does not:** the design desk's foundations file repeated the standard summary of
Hick's law — split 30 options into 5 groups of 6 and the choice gets faster, because two small
logarithms beat one big one. It survived writing and re-reading. The first time the model was
executed, it returned the opposite (two-stage choice pays the fixed intercept twice: ~1,209 ms
against ~943 ms), and the real mechanism behind grouping turned out to be search cost, which is
linear rather than logarithmic. A correlated human filter could not have caught that; running the
arithmetic caught it in one command.

The second catch is smaller and of the same kind. `pricing-and-value-capture.md` carried "$100 to
$249/yr, about an 86% increase" — figures and percentage that cannot both be right (that pair is
+149%). It had been read several times. The file now states the endpoint and says the percentage
depends on which base you take, because the honest answer is that both bases circulate and this
repo cannot verify either.

## 4. The complication ledger, applied to the plugin's own files

`radical-simplicity.md` asks what evidence earns each complication; the desk's own maintenance rule
says a reference file that has never been opened during real work is speculative.

- **What can be checked:** every reference file is *reachable* — the checker fails on an orphan, so
  no file is unreferenced by its skill.
- **What cannot:** whether any of them has ever been *read* in the course of a real decision. There
  is no telemetry, and adding some is not available in this architecture.
- **The honest position**, stated rather than resolved: reachability is not evidence of value. The
  files added most recently — the operational foundations, the change-over-time reference, this
  audit — have not yet settled a real dispute. They are kept on the explicit understanding that the
  first argument they fail to settle is the evidence that should shrink or delete them.
- **The one asymmetry worth naming:** `neuro-design` is over half the plugin's words and has the most
  files by a wide margin. It is also the desk with the clearest external grounding (a cited
  bibliography). Both facts can be true; the audit records the concentration without proposing a
  cut it has no evidence for.

## 5. This branch, under the plugin's own review standard

The work that added the operational half and the foundations tier, measured:

| Commit | Insertions | Verdict under `code-review.md` |
| --- | --- | --- |
| `feat(software-architecture): code-review reference` | 213 | Within the norm |
| `feat(operating-model): the operational half` | 279 | Within the norm |
| `feat(docs): postmortem template, readiness gate, blueprint fixes` | 257 | Within the norm |
| `test(evals)` | 103 | Fine |
| `feat(agents): code-reviewer and reliability-engineer` | 408 | **Above the line** |
| `feat(foundations): derive the operational material` | 616 | **Well above the line** |
| The change carrying this audit (foundations for three more desks, `change-over-time`, worked examples, the count check, this file) | ~1,220 | **Furthest above the line of all of them** |

**Finding — the rule was crossed twice, and the mitigation used was subject-splitting rather than
size-splitting.** The defence available is that the size rule rests on a mechanism — fixed reviewer
attention against a diff where any line can break any other — and new self-contained prose files
have weaker coupling than 600 lines of code: a reviewer can read one foundations file, form a
verdict, and move on without holding the others in memory. That is a real difference in the
mechanism, not an excuse, and it is exactly the argument `code-reviewer` is instructed to accept
from an author when the mechanism genuinely differs.

What is *not* defensible and is recorded as a finding: those commits also carried edits to
existing files (SKILL tables, agent briefs, the readme), and those edits do have the coupling the
rule is about. They should have landed separately from the new files.

The last row is the sharpest version of the finding, and it is deliberately not softened: a change
that adds a self-audit criticising diff size is itself the largest diff in the branch. The mitigation
applied — splitting by subject across commits so each is separately readable and revertible — is the
same one the standard offers an author whose change is genuinely indivisible in one dimension but
divisible in another. It is a mitigation, not a pass.

## 6. Toil in this repo, measured — and the one thing automated during the audit

Recurring manual work, from this session's own history:

| Item | Observed | Status |
| --- | --- | --- |
| Updating the dispatch graph and adopters table when an agent is added | Enforced by the checker since an earlier change | Automated |
| Keeping numbers in prose true ("six references", "eleven foundations", "seven worked examples", "ten loop adopters") | **Went stale 4 times in this session alone** | **Automated** — check (8) in `scripts/check-plugin.mjs`, verified by breaking each of the four claims and watching it fail |
| Keeping the foundations tier's shape (mechanism named, voiding condition present, reachable from the derivation table) | Two files drifted from the tier's own phrasing while being written | **Automated** — check (9), verified by removing a voiding-condition section and a table reference and watching both fail |
| Keeping quoted arithmetic true to the models | Two substantive errors found once the models were run | **Automated** — check (11) runs `mechanisms.mjs --test` over 55 pinned figures, verified by perturbing a model constant and watching four diverge |
| Keeping every rule connected to its mechanism | 8 of 12 core/applied files named no foundation at all — a reader arriving directly got an assertion | **Automated** — check (10), verified by removing the references from one file and watching it fail |
| Keeping readme prose descriptions in step with the desks | Manual, drifts slowly | Accepted, with a reason: the text is judgement, not a count |
| Keeping `provenance.md` in step with the claims it sources | Manual | Accepted; a mechanical version would check that a source exists, not that it supports the claim |
| Rendering mermaid to catch syntax errors the fence check can't see | Manual, per `contributing.md` | Accepted — a real renderer needs a browser dependency this repo doesn't want |

The automated row is the audit obeying its own rule: a failure that already happened, four times, is
exactly the evidence `radical-simplicity.md` requires before building the check — and per
`load-and-automation.md`, automating the head of the distribution beats a programme covering
everything.

## 7. Where this got lucky, and what's still open

**Lucky:** the structural checker existed before the foundations tier was written. Without it, the
same session that added ten cross-referenced files would have produced broken paths silently — it
caught several during this work, immediately, at zero cost.

**Open items**, each with an owner and the honest status:

| # | Item | Type | Status |
| --- | --- | --- | --- |
| 1 | Stated-count drift | prevent | **Done** — checker rule (8), test-verified |
| 2 | External plugin dependencies have no stated fallback | prevent | **Done** — fallbacks routing to local agents, stated where each hand-off happens |
| 3 | 8 of 11 desks have no eval set of any kind | detect | Open; the honest cost is that their advice is unmeasured, and `evals/README.md` already says what a small eval configuration can and can't resolve |
| 4 | Author and reviewer are the same process for most prose | detect | Structural; mitigated by pushing invariants into the checker — three more went in during this pass, and the arithmetic one immediately caught an error two human-equivalent reads had missed |
| 6 | Quantitative claims that are *not* in `mechanisms.mjs` are still unchecked prose | detect | **Mostly closed** — the core and applied files' arithmetic (EV, sample size, price moves, compounding, shared-cost amortization, learning curve) is now pinned too. What remains unchecked is prose arithmetic in the other desks, and any figure quoted from a source rather than computed |
| 7 | The `neuro-design` cross-domain files (20 of them) are outside the argument-chain check | detect | Open, deliberately: they are a subdirectory of applied evidence rather than rules, and forcing each to cite a constant would produce boilerplate rather than connection |
| 5 | No evidence any reference file has been read in real work | — | Accepted and stated; the deletion bias in the maintenance rule is the only available correction |

## 8. When to re-run this

When a desk is added, when the checker gains or loses a rule, or when any number in §1 changes by
more than a little. If this document is more than a year old and none of that has happened, the
correct action is to delete it rather than to refresh it — a self-audit nobody acted on is exactly
the ritual `reliability-and-incidents.md` warns about when it says postmortems that produce no
change were meetings with a document attached.
