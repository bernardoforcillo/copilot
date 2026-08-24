# Launch readiness: <feature>

> Target date: <YYYY-MM-DD> · Owner: <name> · Maturity column: prototype | early users | mature

A launch checklist scaled to the maturity column. A prototype going to ten friendly users does not
need this whole list; a change to a revenue path does, and skipping it there is where the
expensive surprises live. Tick or explicitly waive each line — a waiver with a reason is fine, a
silent skip isn't.

## Product

- [ ] The primary metric, its target, and the guardrails are instrumented **and verified in
      production** — not merely implemented
- [ ] The kill criterion is written and someone owns watching it
- [ ] Failure and empty states designed, not just the happy path
- [ ] Copy reviewed; error messages tell the user what to *do*
- [ ] Accessibility pass on the new surfaces

## Engineering

- [ ] Rollback path rehearsed on this change, not assumed
- [ ] Migration is expand/contract and independently reversible
- [ ] Rate limits and quotas on anything unauthenticated or with a paid fan-out
- [ ] Load characteristics known for the expected peak, not the average
- [ ] Alerts exist for the new failure modes, and page only on symptoms
- [ ] Per-unit cost known; the bill has a ceiling or an alarm

## Support and operations

- [ ] Support knows what shipped, what can go wrong, and what to say
- [ ] The three most likely tickets have written answers
- [ ] The manual steps in the flow are named, and their cost is accepted deliberately
- [ ] Someone is on call who can actually roll this back

## Legal and data

- [ ] New personal data classified, retention set, excluded from logs and prompts
- [ ] Terms, privacy policy, or DPA updated if the data flow changed
- [ ] Third-party terms permit this use

## Communication

- [ ] Users told in advance if behaviour or price changes for them
- [ ] Changelog and docs updated
- [ ] Internal note: what shipped, what to watch, who to ask

## Post-launch

- [ ] A date in the calendar to read the metric and decide: keep, iterate, or revert
- [ ] A date to remove the feature flag
- [ ] What was learned goes to the memory wiki
      (`${CLAUDE_PLUGIN_ROOT}/skills/capture-learnings/SKILL.md`)

**Reverting is a normal outcome.** Most changes move nothing; a change that didn't earn its
complexity should come back out, and a launch process that treats reverting as failure guarantees
accumulation.
