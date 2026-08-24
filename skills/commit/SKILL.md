---
name: commit
description: Use when the user asks to commit changes, stage work, or write a git commit message — produces a Conventional Commits message that reads like a senior engineer wrote it. Defers to the project's own commit convention if one already exists.
---

# Commit

This skill produces atomic, clearly typed, imperative commits that explain *why* a change was
made, not just *what* changed — the diff already shows *what*. Use it any time the user asks to
commit changes, stage work, or write a commit message.

## First, check for a project convention

Before applying anything below, check whether the project already has its own commit
convention. Look for, in order:

- A `commitlint.config.*` file (or equivalent commit-linting config) at the repo root.
- A `CONTRIBUTING.md` (or similar) section that documents commit-message rules.
- An existing, consistent style visible in `git log -20 --oneline` — if the last twenty
  commits agree on a format that differs from what follows, that's the project's real
  convention, whether or not it's written down anywhere.

If any of these exist, follow that convention instead of the rest of this skill. Everything
below is the default this skill falls back to when a project has no convention of its own.

## A good commit IS

- **Atomic** — one logical change. If the working tree mixes unrelated edits, split them into
  separate commits rather than bundling them.
- **Conventionally typed** — `type(scope): subject`, using one of the standard types below.
- **Imperative & specific** — "add tender filters", not "added stuff" and not "various fixes".
- **Motivated** — the body explains *why* the change was made (trade-offs, context, the
  problem being solved), not a restatement of *what* changed, since the diff already shows that.

## Header format

`type(scope): subject`

| Field | Rule |
|-------|------|
| `type` | Required. One of `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert` (Conventional Commits, formalized by Benjamin E. Coe in 2017, built on the Angular project's own prior commit convention). |
| `scope` | Optional. The narrowest accurate scope for this project's structure — a package, module, or directory name. Omit it if nothing fits cleanly; don't force a scope that isn't accurate. |
| `subject` | Required. Imperative mood ("add", "fix", "rename" — not "added", "fixes", "renaming"), no leading capital, no trailing period. |
| header length | The full header line (`type(scope): subject`) should be ≤ 100 characters, and aiming for ≤ 72 keeps it readable in `git log --oneline` and most tooling. |
| `!` before `:` | Add `!` immediately before the colon (e.g. `refactor(db)!:`) to mark a breaking change. Pair it with a `BREAKING CHANGE:` footer that explains what broke. |

## The first line must stand alone as a complete sentence

Write the header as a complete imperative sentence, not a sentence fragment. Google's own
engineering-practices guide
(`google.github.io/eng-practices/review/developer/cl-descriptions.html`) makes the reasoning
explicit: the first line is what engineers see when they search version-control history by
description, often years later, with no other context in view. A vague fragment like "fix
stuff" or "updates" is useless in that search result; "handle expired session in login flow"
is not.

## Body and footers

- Leave a blank line after the subject line before the body starts.
- Wrap body lines at ≤ 100 characters.
- Use the body to explain motivation, trade-offs, and anything a reviewer can't infer from the
  diff alone — including known shortcomings or follow-up work that's deliberately not included.
- After another blank line, add footers for anything structured:
  - Issue references: `Closes #142`.
  - Breaking changes: `BREAKING CHANGE: <what broke and how to migrate>`.
  - Co-authors, when applicable.

## Why atomic commits matter — bisectability, not just tidiness

Atomic commits aren't a style preference; they're what makes trunk-based development's core
debugging tool work. Per trunk-based development's rationale (trunkbaseddevelopment.com), when
a build breaks, the standard response is to bisect commit by commit to find the one that broke
it. That only works — and a clean revert of just the offending change only works — if each
commit is a single, self-contained logical change.

The real-world failure mode is documented in OpenStack's `GitCommitMessages` wiki: a Nova
commit bundled a libvirt-call refactor together with an unrelated API switch. Because the
commit mixed two unrelated changes, "a trivial revert is not possible, due to the wide variety
of unrelated changes included." That's exactly what atomicity prevents — an unrelated change
riding along in the same commit as the one that turns out to be broken, making both revert and
bisect fail.

## Squash vs. preserve history

This is a live, situational tension — not a settled rule. Either way, keep the underlying
logical commits atomic:

- Squashing is appropriate for a branch's own noisy, WIP intermediate history — "fix typo",
  "address review comment", "wip" — commits that were never meant to stand alone in the
  permanent history.
- Squashing is *not* appropriate for collapsing a large PR's genuinely distinct logical changes
  into a single commit. Doing that destroys the bisectability and clean-revert properties
  described above, for the whole PR at once.

## Workflow

1. **Understand the change.** `git status`, `git diff`, `git diff --staged` — know exactly
   what's modified before touching staging.
2. **Make it atomic.** If the working tree mixes unrelated changes, stage only the related
   hunks with `git add <paths>` (or interactively). Never `git add -A` or `git add .` blindly —
   that stages whatever happens to be dirty, regardless of whether it belongs in this commit.
3. **Classify type/scope/subject** using the header format above.
4. **Write the body** — the motivation and context a reviewer needs.
5. **Commit with a real multi-line message** — pass multiple `-m` flags; each becomes its own
   paragraph (subject, then body, then footers).
6. **Respect hooks.** If `pre-commit` or `commit-msg` fails, fix the underlying cause and
   retry. Never bypass a failing hook with `--no-verify`.

## Worked examples

```
feat(web): add tender search filters

Users could only browse the full tender list. Add status, region, and
deadline filters so they can narrow results before opening a tender.

Closes #142
```

```
fix(api): handle missing deadline in tender serializer

Draft tenders have no deadline, which made the serializer throw and
return a 500. Default to null and let the client render "TBD".
```

```
refactor(db)!: rename tenders.owner_id to created_by

BREAKING CHANGE: the tenders API now returns `createdBy` instead of
`ownerId`. Update any client reading `ownerId`.
```

```
chore: pin pnpm to 11.8.0 via packageManager
```

## Common mistakes

| Mistake | Fix |
|---------|-----|
| `Fix bug` (capitalized) | Lower-case subject: `fix: …` |
| `fixed the login bug` (past tense) | Imperative: `fix: handle expired session` |
| `fix: update stuff.` (vague + period) | Be specific, drop the trailing period |
| `feat: …` for a bug fix | Match intent — use `fix:` |
| Bundling unrelated edits | Split into atomic commits |
| `git commit --no-verify` to skip a failing hook | Fix the lint/message; never bypass |
