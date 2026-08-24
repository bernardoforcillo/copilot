# Data modeling guide

The schema outlives every service that reads it. It is the most one-way of the doors in a typical
system, which is why it deserves the deliberation the `modeling` skill reserves for that category.

## Start from the domain, not the screens

- Model entities, their identity, and their invariants first — the `modeling` skill's
  `${CLAUDE_PLUGIN_ROOT}/skills/modeling/references/structural-views.md` for aggregates and multiplicities. Screens change; the domain
  changes slowly.
- **Draw the ER diagram before the first migration.** Cardinality on every relationship. The
  questions it forces — can this be empty, can there be two, what happens to the children — are the
  ones that produce data bugs when skipped.
- **One aggregate, one transaction.** If a single operation must update two aggregate roots
  atomically, either the boundary is wrong or you need an explicit saga with compensations, and
  that's a design decision to record, not to discover.

## Rules that pay for themselves

- **Natural keys are traps; use surrogate ids** (UUIDv7 or equivalent so they sort by time), and
  keep the natural key as a unique constraint where one genuinely exists.
- **Constraints in the database.** Not-null, foreign keys, unique, check constraints. Application
  validation is a UX affordance; the database is the only thing that's actually true.
- **Money as integer minor units + currency.** Never floats. Never a bare number without currency.
- **Timestamps in UTC**, with `created_at` and `updated_at` on everything that mutates.
- **Soft delete is a decision, not a default.** It changes every query and every unique constraint;
  if you need it, say why, and make the "alive" predicate part of the index.
- **Enumerations**: store the string, constrain it, and keep the set in one place shared with the
  code. Integer enums save nothing and cost every debugging session.
- **Nullable means "not applicable"**, not "not filled in yet". If it means the latter, model the
  state explicitly.

## Migrations

- **Expand → migrate → contract**, always, in separate deploys: add the new column, backfill and
  dual-write, cut readers over, then drop the old one. A single-step migration is a rollback you
  can't perform.
- **Backfills are jobs, not migrations** — resumable, rate-limited, observable, restartable.
- **Every migration must be reversible or explicitly declared irreversible** in its own header. An
  irreversible migration is a one-way door and takes an ADR.
- **Test the restore, not the backup.** A backup whose restore has never been run is a belief
  (`operating-model`'s `${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/reliability-and-incidents.md`).

## Growth and cost

- Know which tables grow with users, which grow with time, and which grow with both — the last
  category is where the surprise bill lives.
- Decide retention before the first row lands, not after the storage line item becomes visible.
- Index for the queries you actually run, and measure before adding one: an unused index is a write
  tax on every insert.
- Large blobs go to object storage with the reference in the row; the database is for facts about
  the blob, not the blob.

## Checklist before the first migration

- [ ] ER diagram with cardinalities, reviewed
- [ ] Aggregate boundaries drawn, no cross-root transaction
- [ ] Constraints in the schema, not just the code
- [ ] Money and time representations decided
- [ ] Expand/contract plan for the first foreseeable change
- [ ] Retention and growth class per table
- [ ] Restore rehearsed once, on a real dump
