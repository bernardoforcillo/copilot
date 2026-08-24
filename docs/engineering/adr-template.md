# ADR-<NNNN>: <short decision title>

> Status: proposed | accepted | superseded by ADR-<NNNN> · Date: <YYYY-MM-DD> · Deciders: <names>

Architecture Decision Records (Michael Nygard's format, 2011) exist because the *reason* for a
decision decays faster than the decision itself, and whoever inherits it will otherwise rebuild
rather than read. One decision per record. Records are **append-only**: a decision that changes
gets a new ADR that supersedes the old one, and the old one stays.

## Context

The forces at play: the requirement, the constraint, the measurement, the deadline. Written so
that someone who wasn't there can tell whether the same forces still hold. State facts and their
dates — "p95 checkout latency was 1.9s on 2026-08-14" — not adjectives.

Say whether this is a **one-way door** (expensive or impossible to reverse) or a two-way one. That
classification is why this record exists at all: two-way doors rarely need an ADR.

## Decision

The decision, in the active voice, one paragraph. "We will store idempotency keys in Postgres with
a 24-hour TTL, enforced by a partial index."

## Consequences

- **What becomes easier**, concretely.
- **What becomes harder**, concretely — this half is what makes an ADR worth reading later.
- **What this commits us to**: contracts others will depend on, migrations that will be needed,
  costs that are now recurring.
- **What we deliberately gave up**, and the condition under which we'd revisit.

## Alternatives considered

| Alternative | Why not |
| --- | --- |
| | |

Include "do nothing" and the option that was obviously simpler — if the simpler one lost, the
reason belongs here, because that's the question the next reader will have.

## Revisit trigger

The observation that would make this decision wrong: a volume, a cost, a failure, a date. A
decision with no revisit trigger silently becomes permanent, which is only correct for genuine
one-way doors.
