# Contributing

This plugin is distributed under the [PolyForm Strict License](license.md) — you're free to use
it, but redistributing it or publishing your own modified version isn't licensed. If you've
improved something, the way to share that improvement is to send it back here, not to
redistribute your own copy.

## How to propose a change

1. Fork this repository and branch off `master`.
2. Make your change (a new skill, a fix to an existing agent/skill, a reference-file
   correction, etc.) following the conventions already established in the files around it.
3. Run `node scripts/check-plugin.mjs` and fix anything it reports. It now also runs
   `scripts/mechanisms.mjs --test`, which recomputes every figure quoted in the foundations tier
   and the worked examples from the models they claim to follow from — so editing a number in
   prose without editing the model (or the reverse) fails the check rather than drifting. It checks the invariants
   that drift silently: frontmatter, every path-shaped reference resolving, no orphaned reference
   files, mermaid blocks declaring a known diagram type, and the two hand-maintained sections of
   `docs/architecture.md` — the dispatch graph and the loop-until-converged adopters table — still
   matching what's actually on disk. It has no dependencies; if you're adding diagrams, also render
   them once (any mermaid renderer) before opening the PR, since the checker validates structure
   rather than syntax.
4. If you're adding a file to a `references/foundations/` directory, it has to keep the tier's
   contract — open with `# Foundation: <topic>`, state `**The principle(s) it generates:**` and
   `**The mechanism:**`, and end with a `## When this mechanism is absent` section. The checker
   enforces all four, because a derivation with no voiding condition is an assertion with a
   better title. If the file makes an arithmetic claim, add the model to `scripts/mechanisms.mjs`
   and pin the figure in its self-test.
5. If you changed a skill's description or its advice, consider running the matching eval set in
   `evals/` — the trigger set catches a description that stopped discriminating, and the task set
   catches advice that lost a property it claims.
6. If your claim carries a number, add the model to `scripts/mechanisms.mjs`, pin the figure in
   its self-test, and attack it in [docs/red-team.md](docs/red-team.md) before trusting it — that
   file's standing instruction is that a claim with a number is untested until someone has tried to
   compute it wrong. `node scripts/mechanisms.mjs sweep <fn> <argIndex> <from> <to> <steps> <args>`
   is the fastest way to find the parameter range where a conclusion flips.
7. If your change adds a desk, an agent, or a checker rule, update
   [docs/self-audit.md](docs/self-audit.md) — its numbers and its open-items table are what stop
   the plugin from holding other projects to a standard it doesn't apply to itself.
8. Open a pull request against `master` describing what changed and why.

Forking to open a pull request is fine — the license restricts redistributing the software,
not sending a patch back to its maintainer.

## Contribution license

By submitting a pull request, you agree that your contribution is licensed to the maintainer
(Bernardo Forcillo) for inclusion in this project under the same terms as the rest of the
project, and that the maintainer may distribute, modify, and relicense it as part of this
project going forward. You retain copyright on your own contribution; you're just granting
the rights needed for it to become part of a single, maintainer-distributed codebase instead
of a separately-licensed patch.

## Review

There's one maintainer. Expect PRs to be reviewed and merged (or declined) at their
discretion — this keeps the plugin coherent as a single, personally-maintained tool rather
than a design-by-committee one.
