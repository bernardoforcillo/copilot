# Contributing

This plugin is distributed under the [PolyForm Strict License](license.md) — you're free to use
it, but redistributing it or publishing your own modified version isn't licensed. If you've
improved something, the way to share that improvement is to send it back here, not to
redistribute your own copy.

## How to propose a change

1. Fork this repository and branch off `master`.
2. Make your change (a new skill, a fix to an existing agent/skill, a reference-file
   correction, etc.) following the conventions already established in the files around it.
3. Run `node scripts/check-plugin.mjs` and fix anything it reports. It checks the invariants
   that drift silently: frontmatter, every path-shaped reference resolving, no orphaned reference
   files, mermaid blocks declaring a known diagram type, and the two hand-maintained sections of
   `docs/architecture.md` — the dispatch graph and the loop-until-converged adopters table — still
   matching what's actually on disk. It has no dependencies; if you're adding diagrams, also render
   them once (any mermaid renderer) before opening the PR, since the checker validates structure
   rather than syntax.
4. Open a pull request against `master` describing what changed and why.

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
