# Security baseline

The floor, not a program. Everything here is proportionate for a small team, and none of it is
optional once real user data exists — these are the items in the "not proportional to maturity"
row: the failures that can't be recovered from by shipping harder.

## Identity and access

- **AuthN and authZ are separate.** Authenticate at the edge, authorize per resource in the domain
  layer. A route-level check is not authorization; it's a routing rule that resembles one.
- **Deny by default.** New endpoint, new field, new job: unauthorized unless something explicitly
  grants it.
- **Least privilege for machines too.** Per-service credentials, scoped to what that service does,
  rotatable without a redeploy of everything else.
- **MFA on every human account that can reach production**, including the registrar, the DNS, the
  cloud console, and the CI provider — the accounts people forget are the ones attacks use.
- **Network position is not authorization.** "Inside the VPN" and "in the cluster" are not
  identities; every call is authenticated and authorized on its own, from wherever it comes. The
  perimeter model fails the moment one thing inside it is compromised, and something inside it
  eventually will be — a stolen session, a dependency, a misconfigured egress rule.

## Secrets

- Never in the repo, never in an image, never in an environment variable printed by a debug
  endpoint. A secret scanner runs in CI.
- Rotation must be possible without downtime, and must have been done at least once — an
  unrehearsed rotation is a belief.
- Anything leaked is burned: rotate first, investigate second.

## Data

- **Classify before you store**: public, internal, personal, sensitive-personal. The classification
  decides retention, encryption, access, and what may go into logs or an LLM prompt.
- **Encrypt in transit everywhere** (TLS, including inside the cluster where feasible) and at rest
  via the platform's default.
- **Minimize**: don't collect what you don't need, don't keep it after you need it. The cheapest
  breach is of data you never had.
- **PII never reaches logs, analytics, error trackers, or model prompts** unless a written decision
  says otherwise and names the legal basis.

## Application

- Validate and reject at the boundary; parameterize every query; encode on output. The old three
  still cover most of it.
- Dependencies: automated updates, an audit in CI, and a policy for what to do with a critical
  advisory (who decides, how fast).
- Rate-limit and throttle anything unauthenticated, and anything expensive per call — an
  unmetered endpoint that fans out to a paid API is a bill someone else can write for you.
- Webhooks and callbacks are attacker-controlled input: verify signatures, check timestamps, and
  make handlers idempotent.

## Build and supply chain

The dependency you didn't audit and the build you can't reproduce are the two ways code you never
wrote ends up in production.

- **Production artifacts are built by the pipeline, from a commit, and never from a laptop.** A
  human-built image is unattributable by construction.
- **Pin and lock**: exact versions, a committed lockfile, and updates as reviewed changes rather
  than as a floating range that silently moves. Verify checksums where the ecosystem provides them.
- **Record what went in**: the commit, the build inputs, and the resulting digest, kept somewhere
  you can query after an advisory lands. "Which of our running images contain this package?" is a
  question you will be asked under time pressure.
- **Deploy by digest, not by mutable tag.** A tag that can be re-pointed is a supply chain with a
  hole in it.
- **Treat CI as production.** It holds the credentials that can deploy; its secrets, its access,
  and the third-party actions it runs are part of the attack surface, not part of the tooling.

## Operations

- Deploys are reproducible and attributable: who deployed what, when, from which commit.
- Backups exist, are encrypted, and a restore has been performed at least once
  (`operating-model`'s `${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/reliability-and-incidents.md`).
- An incident has a named first responder and a written path — including the decision of who tells
  users, and when.
- Third-party access (contractors, tools, integrations) is inventoried and reviewed; offboarding
  removes it the same day.

## Checklist

- [ ] AuthZ per resource, deny by default; network position grants nothing
- [ ] Artifacts built only in CI, deployed by digest, with build inputs recorded
- [ ] MFA on every production-reaching account, including registrar and CI
- [ ] Secret scanning in CI; rotation rehearsed once
- [ ] Data classified; retention set; PII excluded from logs, analytics and prompts
- [ ] Dependency audit in CI with a stated response policy
- [ ] Rate limits on unauthenticated and paid-fan-out endpoints
- [ ] Webhook signatures verified, handlers idempotent
- [ ] Encrypted backups with a rehearsed restore
