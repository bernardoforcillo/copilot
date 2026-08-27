# Observability and SLOs

Observability answers "what is happening" for questions you didn't anticipate; monitoring answers
questions you did. You need both, and at small scale you need much less of either than the industry
implies — but the floor is not zero, and it starts the day the first real user arrives.

## The three signals, and what each is for

- **Metrics** — cheap, aggregate, alertable. Rate, errors, duration per endpoint or job; plus the
  one business metric that says the product is working (orders placed, files transferred,
  summaries generated). Business metrics catch outages that technical metrics miss entirely.
  Add **saturation** — how full the most constrained resource is (connection pool, queue depth,
  disk, rate-limit headroom) — to those three: it's the only one of the four that is *predictive*
  rather than descriptive, and it's the one a rate/errors/duration dashboard routinely omits until
  the outage it would have forecast.
- **Logs** — structured (JSON), one event per meaningful step, with a correlation id on every line.
  Log decisions and boundaries, not control flow. An unstructured log is a grep away from useless
  and a compliance problem away from expensive.
- **Traces** — the sequence diagram of what actually happened. Worth it once a request crosses
  three or more services or the latency question stops being answerable from one process.

Add, whatever the scale: a **correlation id** generated at the edge and propagated everywhere, and
**version/build id** on every emitted signal, so "did this start with the deploy?" is answerable in
one query.

## SLOs

An SLO is a decision about how much unreliability is acceptable, made in advance, so that
reliability work can be ranked against features instead of argued about after an outage.

- **Pick indicators the user feels**: successful-request rate and latency at a percentile, on the
  flows that matter. Not CPU, not uptime of a box.
- **Set the target from the business, not from nines-envy.** 99.9% monthly is ~43 minutes of budget;
  99.99% is ~4 minutes and costs an order of magnitude more to hold. Most products should not buy
  the second one.
- **The error budget is the operating instrument.** Budget remaining → ship; budget exhausted →
  reliability work outranks features until it recovers. That rule is the entire point; without it
  an SLO is a number in a doc.
- **One or two SLOs per service.** More than that and none of them drive anything.

Why the target belongs below 100%, why a chain of dependencies caps it before you do anything, and
why redundancy pays less than the rollback path at small scale:
`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/foundations/reliability-and-redundancy.md`.

## Alerting

- **Page on symptoms, never on causes.** "Checkout error rate above 2% for 5 minutes" pages;
  "CPU at 90%" does not. Cause metrics belong on the dashboard you open once the page fires.
- **Every alert is actionable and rare.** If the response is "yeah, that happens", it is a defect:
  fix the threshold, fix the flapping, or delete the alert.
- **Alert on budget burn rate**, not on every violation — fast burn pages, slow burn opens a
  ticket. See the windows below.
- **Ticket-worthy is not page-worthy.** Decide, per alert, which one it is; the wake list is short
  and explicit (`operating-model`'s `${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/reliability-and-incidents.md`).

### Burn-rate windows

Burn rate is "how many times faster than the budget allows": 1× exactly exhausts a monthly budget
in a month (`node scripts/mechanisms.mjs burnRate 0.02 0.995` — a 2% error rate against a 99.5%
target burns at 4×). The published recipe pairs a short window with a long one — the short one makes the
page fast, the long one keeps it from firing on a blip:

| Window | Burn rate | Budget consumed | Consequence |
| --- | --- | --- | --- |
| 1 hour | ~14× | 2% of a 30-day budget | Page |
| 6 hours | ~6× | 5% | Page |
| 1–3 days | ~1–3× | 10% | Ticket |

At small volume these thresholds are noisy — an hour with forty requests can't tell 14× from bad
luck — so put a minimum-events floor under the rule, or stay on a plain error-rate page until the
traffic supports it.

## Cost discipline

Observability bills scale with cardinality and volume, and they surprise people. Cap high-cardinality
labels (never user id as a metric label), sample traces, set log retention deliberately, and put the
observability line item in the fixed-cost column of the system design's unit economics.

## Checklist

- [ ] Correlation id at the edge, propagated, and in every log line
- [ ] RED metrics per endpoint plus one business metric
- [ ] Structured logs with retention set on purpose
- [ ] One or two user-facing SLOs with an explicit error budget and the rule for spending it
- [ ] Saturation tracked on the most constrained resource, not just rate/errors/duration
- [ ] Symptom-based pages only; every alert actionable
- [ ] Burn-rate alerting with two windows, and a minimum-events floor if traffic is small
- [ ] Dashboard that answers "did the deploy do this?" in one look
- [ ] Observability cost in the budget, cardinality capped
