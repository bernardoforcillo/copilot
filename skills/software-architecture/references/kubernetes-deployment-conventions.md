# Kubernetes/Flux deployment conventions

Structural conventions for how Bernardo lays out Kubernetes deployments managed by Flux — the
directory shape a deploy repo follows, how stable and canary channels coexist, how a workload's
manifests are named, and how image tags get rolled out automatically. These are personal
defaults for new deployment work, not conclusions derived from an external spec; treat every
entry here as a preference to apply consistently, not a law to enforce blindly. Per-project
literal values — a specific namespace name, a specific hostname, a specific NodePort number, a
specific image repository — are deliberately written as `<placeholder>` tokens below instead of
being copied from any one project, because those facts are project-specific and belong in that
project's own repo, not in a conventions reference meant to travel unchanged across projects. The
*structure* is the deliberate exception: the stack choice, the directory layout, the
stable/canary two-channel pattern, the pod-hardening baseline, and the image-tag automation shape
all stay concrete and specific, because they're Bernardo's actual default stack, not a
hypothetical one — only the literal per-project names get placeholder-ized, never the stack or
the shape of the layout itself.

## 1. Stack

The default deployment target is Flux for GitOps reconciliation, Traefik for ingress, cert-manager
for TLS, and Cilium for pod-level network policy. Ingress goes through Traefik's own
`IngressRoute` CRD, not the native Kubernetes `Ingress` resource, so routing rules can use
Traefik's richer matching and can reference shared `Middleware` and `TLSOption` objects rather
than duplicating that configuration per route. TLS certificates are issued by cert-manager: a
`Certificate` resource requests a cert from a `ClusterIssuer`, and cert-manager keeps the backing
secret renewed automatically. Pod-level network policy is expressed as Cilium's
`CiliumNetworkPolicy` rather than the plain Kubernetes `NetworkPolicy` resource, for Cilium's
richer L3/L4/L7 selectors.

## 2. Layout

The deploy repo's structure is `<namespace>/<app>/<channel>/`, rooted in a small set of top-level
files:

```
<repo root>/
  repository.yaml        # Flux GitRepository + Kustomization; bootstrap only, excluded from the sync list
  kustomization.yaml      # the sync entry point Flux builds; every applied manifest must be listed in resources:
  policies/                # CiliumNetworkPolicy manifests, applied separately, never via kustomization.yaml
  <namespace>/
    namespace.yaml
    commons.yaml            # namespace-scoped Traefik Middleware + TLSOption, shared by every app in this namespace
    <app>/
      main/                 # stable channel
      canary/               # optional canary channel
```

`repository.yaml` is the Flux `GitRepository` plus the bootstrap `Kustomization` that points Flux
at this repo — it is applied once to bootstrap the cluster and is deliberately excluded from the
regular sync list, so it never gets reconciled as part of the normal apply flow. `kustomization.yaml`
is the actual sync entry point Flux builds on every reconciliation: every manifest meant to be
applied must be listed in its `resources:`, or it silently never applies. `policies/` holds
`CiliumNetworkPolicy` manifests specifically, applied separately from `kustomization.yaml` rather
than folded into it. Each namespace gets its own folder containing `namespace.yaml`, a shared
`commons.yaml` with that namespace's Traefik `Middleware`/`TLSOption` objects, and one folder per
app. Before considering any manifest change done, validate the whole tree builds offline:
`kubectl kustomize <path>`.

## 3. Stable/canary two-channel pattern

Each app gets a `main/` folder for its stable channel, and optionally a `canary/` folder for a
canary channel. Both channels carry the same file set — `deployment.yaml`, `service.yaml`,
`ingress.yaml` (a Traefik `IngressRoute`), `certificate.yaml`, and `update.yaml` (that channel's
image automation) — so a channel is fully self-contained and can be reconciled or torn down
independently of its sibling. The canary channel reuses the shared `commons.yaml` middlewares
from its namespace rather than duplicating them, with one adjustment: drop the `www`-redirect
middleware if the canary's host has no `www` variant of its own. Canary still gets its own
`Certificate`, since it fronts a different hostname than stable. Give each channel's workload a
distinct `tier` label (e.g. `stable` vs. `canary`) rather than relying on channel folder location
alone — a `CiliumNetworkPolicy` that selects by app label (not by tier) then automatically covers
both channels without needing a separate policy per channel.

## 4. Naming convention

A workload's manifests are named off a single `<workload>` name: `<workload>` for the `Deployment`
itself, `<workload>-svc` for the `Service`, `<workload>-ingress` for the `IngressRoute`, and
`<workload>-tls` for both the `Certificate` resource and the TLS secret it produces. Keeping every
related object's name derivable from the one workload name makes it possible to find every
manifest touching a given workload by grepping for its name, without having to know each
resource's own independently-chosen name.

## 5. Pod hardening baseline

Every workload's `securityContext` carries the same baseline: `runAsNonRoot: true`; every Linux
capability dropped (`drop: ["ALL"]`, adding nothing back unless a specific, documented need
requires it) alongside `allowPrivilegeEscalation: false` (without it, a setuid binary in the image
could still escalate privileges even with capabilities dropped); `readOnlyRootFilesystem: true`,
with an `emptyDir` volume mounted wherever the app genuinely needs scratch space (most commonly
`/tmp`); and `seccompProfile: RuntimeDefault`. When
the runtime image is itself a distroless non-root image, also set `runAsUser`, `runAsGroup`, and
`fsGroup` explicitly to that image's actual UID/GID rather than leaving them unset — commonly
`65532` for `gcr.io/distroless/*:nonroot` images. This baseline applies to every new workload, not
just ones handling sensitive data; the cost of applying it up front is far lower than retrofitting
it after a workload has quietly grown a dependency on write access it never actually needed.

## 6. Service exposure

A workload is exposed as a `NodePort` `Service`, fronted by a Traefik `IngressRoute` rather than
exposed directly. The `IngressRoute`'s `services[].port` must match the `Service`'s own `port` —
these two numbers are declared independently in two different manifests, so they can silently
drift out of sync if one is edited without the other; check both whenever either changes.

## 7. Image-tag automation (Flux Image Automation)

Each app gets exactly one `ImageRepository`, which scans the app's built image and is shared
across all of that app's channels — there's one image being built, even when multiple channels
consume it at different tags. Each channel then gets its own `ImagePolicy` matching that channel's
tag pattern: stable matches `^[0-9]{14}-[0-9a-fA-F]{40}$`, canary matches
`^[0-9]{14}-[0-9a-fA-F]{40}-canary$`, and stable's policy additionally excludes any moving
`latest` or `-canary` tag so it can never accidentally pick up a canary build. One
`ImageUpdateAutomation` scans the whole app folder, so a single automation object drives every
channel's markers rather than needing one automation per channel. Each `Deployment`'s `image:`
line carries a setter marker comment the automation rewrites in place —
`# {"$imagepolicy": "<namespace>:<app>-image-policy"}` — and that marker must never be removed or
hand-edited; removing it silently breaks automated rollout for that workload. Image tags follow
`<YYYYMMDDHHMMSS>-<full-sha>` built from the stable branch, and
`<YYYYMMDDHHMMSS>-<full-sha>-canary` built from the canary/integration branch. The
timestamp-plus-full-sha shape is deliberate: an immutable tag like this survives even after a
moving `latest` tag advances to point somewhere else, so a Deployment pinned to a specific
timestamp-sha tag never silently changes underneath it.

## 8. Adding an app or channel

Adding a brand-new app: create `<namespace>/<app>/<channel>/` by copying an existing app's `main/`
folder as the starting point rather than inventing a new layout from scratch, add every new
manifest to `kustomization.yaml` (or it never applies), and add a `CiliumNetworkPolicy` under
`policies/` if the app needs network rules distinct from what an existing policy already covers.
Adding a new channel to an existing app: add the channel's folder with its own manifest set plus
its own `ImagePolicy` (reusing the app's existing `ImageRepository` and `ImageUpdateAutomation`
rather than creating new ones), give the channel's workload its own distinct `tier` label, and
register every new file in `kustomization.yaml`.

## Checklist

- Mirror an existing app's `main/` folder for a new app rather than inventing a new layout.
- Register every new manifest in `kustomization.yaml` — an unregistered manifest silently never
  applies.
- Apply the full pod-hardening baseline (`runAsNonRoot`, drop `ALL` capabilities,
  `allowPrivilegeEscalation: false`, read-only root filesystem, `seccompProfile: RuntimeDefault`)
  to every new workload.
- Keep the `IngressRoute`'s service port in sync with the `Service`'s port.
- Give a new channel its own distinct `tier` label.
- Never remove or hand-edit an `$imagepolicy` setter marker.
- Validate offline with `kubectl kustomize` before considering a manifest done.
