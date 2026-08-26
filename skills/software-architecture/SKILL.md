---
name: software-architecture
description: Apply scaling, code-organization, code-review, and Bernardo's concrete Go + Vite/React + Kubernetes stack conventions when designing, reviewing, or scaffolding a service, module, or deployment. Use when making an architecture/infra decision, organizing code into layers, setting the standard for reviewing a change (including an agent-written one), or setting up a new service or k8s app/channel.
---

# Software Architecture

Architecture decisions grounded in a small set of concrete references: a trigger-based framework
for scaling/infra choices, a layered dependency-direction framework for organizing code, the
standard a change is reviewed against before it becomes permanent, and Bernardo's own structural
defaults for Vite/React frontends and Kubernetes/Flux deployments. Each reference file is
self-contained — read the one that matches the decision in front of you rather than loading all
five.

## When to use

- Making an architecture or infrastructure decision — whether to add a cache, split a service,
  introduce a queue, add a gateway, and similar trigger-driven calls.
- Organizing new code into layers, or deciding which layer a piece of logic belongs in.
- Scaffolding a new service, a new Vite/React app or module, or a new Kubernetes app/channel.
- Reviewing a change — yours, someone else's, or an agent's — and deciding what blocks a merge.

These five references are for self-guided decisions while building. For a full design or PR
review instead — checking existing code or a deploy manifest against all of them at once —
dispatch the `software-architect` agent instead of applying the files yourself.

## The five references

- **Scaling and infrastructure** — a trigger→action framework: the concrete signal that should
  make you reach for a cache, split a service, add a gateway, introduce async fan-out, or similar,
  and what to deliberately not reach for yet; ends with a section mapping each trigger onto a
  concrete Go + Kubernetes project. Read `references/scaling-and-infra.md` for depth.
- **Code organization** — the five-layer dependency-direction framework (UI/presentation,
  transport/interface, domain, capabilities/adapters, shared foundations) and the rule that
  dependencies only point inward; ends with a section mapping the layers onto Go services and
  Vite/React apps concretely. Read `references/code-organization.md` for depth.
- **Code review** — the standard a change is approved against (does it definitely improve the
  overall code health of the system), why diff size decides how much review actually catches, the
  one-business-day response rule, the split between what CI owns and what a human is for, comment
  discipline, and the priors that change when the diff was written by an agent. Read
  `references/code-review.md` for depth.
- **Vite/React conventions** — Bernardo's structural defaults for a Vite/React source tree: the
  `~` alias, module-as-folder with an `index.ts(x)` entry point, feature-first component
  organization, hook placement, vertical slices, and state placement. Read
  `references/vite-react-conventions.md` for depth.
- **Kubernetes/Flux deployment conventions** — Bernardo's structural defaults for a Flux-managed
  deploy repo: the Traefik/cert-manager/Cilium stack, the `<namespace>/<app>/<channel>/` layout,
  the stable/canary two-channel pattern, naming, pod hardening, and image-tag automation. Read
  `references/kubernetes-deployment-conventions.md` for depth.

## Related agent

`agents/software-architect.md` applies these same reference files when dispatched for a full
architecture/PR review or to scaffold a new service, module, or deployment end to end — use it
when the task calls for a complete pass rather than a single decision.

## Related skill

These files decide the *shape* of a system. The `operating-model` skill decides whether that
shape's complications were earned in the first place — the burden of proof that a cache, a
service split, or a queue has to meet before `scaling-and-infra.md`'s trigger even applies, and
how much rigor the product's maturity actually justifies. Reach for it when the question is "does
this deserve to exist?" rather than "what should this look like?".
