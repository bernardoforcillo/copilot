# Vite/React structural conventions

Structural conventions for how a Vite/React frontend's source tree is organized — where a file
lives, how it's named, how it's imported, and where a given piece of state belongs. These are
Bernardo's personal defaults for new Vite/React work, not conclusions derived from an external
framework or spec; treat every entry here as a preference to apply consistently, not a law to
enforce blindly. This file deliberately does not catalogue project-specific literal facts — no
design token names, no specific package names, no dependency-version-pinned bug workarounds. Those
observations belong in a given project's own memory-wiki, captured the moment they're actually hit
on a project using those exact libraries, not baked into a conventions reference that's meant to
travel unchanged across projects.

## 1. `~` path alias for `src/`

Import from an app's own `src/` using a `~` alias instead of chaining `../../../` relative paths
across folders. `import { App } from '~/app'` reaches into `src/app`; a bare `~` resolves to `src`
itself. Configure the alias in two places, kept in sync: `tsconfig.json`'s
`compilerOptions.paths`, so the editor and type-checker resolve it, and `vite.config.ts`'s
`resolve.alias`, so the bundler resolves it the same way — letting the two drift apart produces the
false-green failure mode of code that type-checks but doesn't build, or that builds but the editor
can't navigate. The alias belongs to a single app's own tree; a cross-package import (from a shared
library, a monorepo sibling) still goes through the package's own name, never `~`, so an import
path always signals whether it's reaching inside the current app or pulling in from somewhere else.

## 2. Module-as-folder, with an `index.ts(x)` entry point

Every module — a screen, a feature, a component, a group of related hooks — is a folder, not a bare
file, and that folder exposes an `index.ts` or `index.tsx` entry point. The import then targets the
folder (`~/features/checkout`), not one specific file inside it, so the module's internal file
layout can be reorganized without touching every call site that imports it. Everything the module
owns — its own helper functions, its own hooks, its own styles, its own tests — is co-located
inside that same folder, rather than scattered into parallel top-level `hooks/`, `styles/`, or
`__tests__/` trees. A reader who opens a module's folder should find everything relevant to that
module in one place, not have to assemble the picture by jumping across several distant
directories.

## 3. Feature-based components, atomic-design tier second

Components are organized by feature first, and only inside a feature by atomic-design tier
second — never the other way around. The tiers are `atoms`, `molecules`, `organisms`, and
`templates`; `pages` is reserved for an app's own routes, which are not reusable components and are
never added to a shared component library. An app's feature root is `src/features/<feature>/`; a
shared library that has no app-level notion of "features" drops that wrapper and roots the same
feature name directly at `src/<feature>/`. Within a feature, each tier folder carries a barrel file
re-exporting that tier's components, and the feature's own top-level barrel re-exports its
tiers — so both "give me every atom this feature owns" and "give me everything this feature
exports" resolve through a single, predictable import.

## 4. Hooks, and feature vs. infra placement

Hooks live under a `hooks/` folder, one folder-module per hook, following the same module-as-folder
shape as everything else. The larger placement question — feature or infra — is decided by one
test: does this code render anything? If it renders UI, it's a feature, living under
`src/features/<name>/`, with no exceptions. If it's cross-cutting plumbing with no UI of its
own — internationalization setup, an API client, analytics wiring — it's top-level infra, laid out
as a flat-file module such as `src/i18n/`. Infra directories are a pattern to apply, not a fixed,
closed list to pick from: add a new one only when a genuine piece of non-UI plumbing needs a home,
and if that thing ever grows a rendered component, it has crossed the line into being a feature and
belongs under `src/features/` instead, not bolted onto the infra folder it started in.

## 5. Vertical slices, named by business domain

Each feature is self-contained — its own component tiers, its own hooks, its own tests — rather
than the application being split first by technical layer (a top-level `components/`, a top-level
`hooks/`, a top-level `services/` that every feature reaches into). A feature is a vertical slice
through the whole stack of concerns it needs, not a horizontal layer shared across every feature.
Feature names are business-domain names — what the product does — never technical ones like
`controllers`, `handlers`, or `utils`; the folder structure should read as a table of contents for
the product, not for the tech stack it happens to be built on. Resist adding internal layering to a
feature just to match some other feature's shape — a small feature stays flat, and extra internal
structure gets added only once that specific feature's own logic has grown genuinely complex enough
to need it, not pre-emptively for the sake of consistency.

## 6. State placement: local vs. store, persisted vs. ephemeral

Two independent questions decide where a piece of client state lives. First, shared or local: if
only one component (or its direct children, via props) needs a piece of state, it stays
local — `useState` or `useReducer` — and doesn't get promoted to a shared store just because it
"might be needed elsewhere" someday; it gets promoted once a second component actually needs to
read or write it, not before. Second, persisted or ephemeral, decided per field rather than per
store: state that represents real application data, or an intentional user preference, usually
should survive a reload; a flag that's only meaningful for the current session — a modal's
open/closed state, an in-progress form's dirty flag — usually shouldn't. When state does live in a
shared store, the store itself is split by domain the same way features are — one slice per
concern, not one giant global store everything reaches into; a slice that has accumulated unrelated
concerns is a sign it should be split, not a sign the pattern doesn't fit.

## 7. Lowercase kebab-case names

Files and folders are named in lowercase kebab-case, even when the thing they export is a
PascalCase symbol: a component exported as `CheckoutSummary` lives in `checkout-summary.tsx`,
inside a folder also named in kebab-case. This keeps naming predictable independent of what a given
file happens to export, and avoids the case-sensitivity mismatches that can otherwise surface when
a repository is cloned across filesystems with different case rules.

## 8. Library and stack choice: offered, not mandated

`react-aria-components` paired with `motion` is a combination that's worked well before for
building accessible, animated components, and it's a reasonable starting point to reach for on a
brand-new project with no existing choice already made. It is a suggestion, not a requirement: on
any project that has already chosen its own component or animation library, use what the project
has already chosen rather than introducing a second, competing choice alongside it. Gotchas that
are pinned to a specific library's specific version — a particular animation library's warmup
delay, a particular test runner's global-shadowing quirk — are deliberately left out of this file.
Those belong in that project's own memory-wiki, captured the next time they're actually hit on a
project using those exact library versions, not catalogued here where they'd go stale the moment a
dependency is upgraded.

## Checklist

- Configure the `~` alias in both `tsconfig.json` and `vite.config.ts`, kept in sync.
- Give every module a folder, with an `index.ts`/`index.tsx` entry point.
- Organize components by feature first, atomic-design tier second.
- Name features by business domain, never by technical layer.
- Keep state local until at least two components need it, and persist only the fields that
  represent real data or an intentional preference.
- Use kebab-case for every file and folder name.
- Don't invent a new top-level infra directory for something that renders UI — that's a feature.
