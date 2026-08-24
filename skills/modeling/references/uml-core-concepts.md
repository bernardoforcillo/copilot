# UML core concepts

The notation is the smaller half of UML. What survives once you stop caring about tool
compatibility is a set of modeling ideas that are true regardless of whether you draw them: what
an abstraction is allowed to hide, what a relationship actually claims, and which level of
abstraction you're currently arguing at.

## The four pillars

**Abstraction** — a model keeps what matters for the question and drops the rest. The test isn't
"is it accurate", it's "is it accurate *about the thing being decided*". A domain model that omits
the retry policy is not wrong; a domain model that omits ownership is, if ownership is the
question.

**Encapsulation** — every element has an inside and an outside, and only the outside is a promise.
This is what makes a component diagram meaningful: the provided interface is the contract, the
internals are free to change. Where a model shows internals crossing a boundary, that boundary
doesn't exist yet in practice, whatever the code says.

**Decomposition** — a system is understood by splitting it into parts with sparse interaction
between them (Simon's near-decomposability, in `operating-model`'s
`${CLAUDE_PLUGIN_ROOT}/skills/operating-model/references/foundations/complexity-and-coupling.md`). A decomposition whose parts all talk to all
the others hasn't decomposed anything: it has added names.

**Generalization** — shared structure named once. Powerful and over-used: inheritance in a model
claims substitutability (any subtype is usable wherever the supertype is), and most "is-a"
relations people draw are actually "has-a" or "plays-the-role-of". If you can't substitute, don't
generalize.

## The six relationships, and what each actually claims

Getting these wrong is the most common way a model lies while looking rigorous.

| Relationship | Claim it makes | Use when | The lie to watch for |
| --- | --- | --- | --- |
| **Association** | These two know about each other | The plain case: an order references a customer | Drawing one where the reference is really transient (a parameter, not a field) |
| **Aggregation** (hollow diamond) | Whole/part, but parts outlive the whole | A team has members who exist without it | Aggregation and association are barely distinguishable in practice; prefer association unless the distinction changes a decision |
| **Composition** (filled diamond) | Whole/part, parts die with the whole; the whole owns their lifecycle | Order and its line items; an aggregate root and its children | Claiming composition where a "part" is independently addressable or shared — then it isn't a part |
| **Generalization** (hollow triangle) | Subtype is substitutable for supertype | A genuine is-a with substitutability | Modelling roles or states as subtypes; a `PremiumUser` subtype is usually a `plan` attribute |
| **Realization** (dashed triangle) | This element implements that contract | A concrete adapter realizing a port | Drawing it toward a concrete type instead of an interface |
| **Dependency** (dashed arrow) | Changes here can break there | Compile/usage coupling worth noting | Drawing every dependency — the diagram becomes a graph of everything and says nothing |

**Multiplicity is a constraint, not decoration.** `1`, `0..1`, `1..*`, `0..*` on each end are the
part of a class diagram most likely to catch a real bug, because they force the question nobody
asked: can this be empty? can there be two? What happens to the children when the parent goes? A
class diagram without multiplicities is a picture of nouns.

**Navigability and ownership.** An arrowhead says which side can reach the other. Two-way
navigability is a claim you should have to justify — it's the model's version of a circular
dependency, and it's usually an artifact of an ORM rather than a fact about the domain.

## Stereotypes and profiles

A stereotype (`«adapter»`, `«aggregate root»`, `«external»`) extends the notation with a meaning
your project defines. Two rules keep them useful:

- **Define them once, in the project's own docs**, or they degrade into decoration that each
  reader interprets differently.
- **Use them to carry the distinction the standard notation can't** — which elements are third
  party, which are aggregate roots, which cross a trust boundary, which cost money per call. That
  last one is the hook `profit-modeling.md` uses.

## The 4+1 view model

Philippe Kruchten's 4+1 (1995) is the answer to "which diagrams do I need?", and it predates —
and outlives — most architecture-documentation fashions. Four views, each for a different
audience, plus scenarios that tie them together:

| View | Answers | Typical diagram |
| --- | --- | --- |
| **Logical** | What are the concepts and their relationships? | Class / domain |
| **Process** | What runs concurrently, and how does it interact? | Sequence, activity, state machine |
| **Development** | How is the code organized? | Package, component |
| **Physical** | What runs where? | Deployment |
| **+1: Scenarios** | Does it actually work end to end? | Use case, walked through the other four |

The "+1" is the load-bearing part: a scenario that can't be traced through the other four views is
where the design is actually broken. That's the traceability loop in the skill, stated as a
method.

**C4 as the modern shorthand.** Simon Brown's C4 model (context → container → component → code) is
a disciplined subset of the same idea, and it maps directly: context and container are the physical
and development views at two zoom levels, component is the component view, code is the logical
one. Mermaid renders C4 natively (`C4Context`, `C4Container`), so it's often the cheapest way to
produce the top two levels — see `mermaid-cookbook.md`.

## Levels of abstraction: CIM, PIM, PSM

From Model-Driven Architecture, and useful even if you never generate a line of code from a model,
because most modeling arguments are actually two people at different levels:

- **CIM** (computation-independent) — the domain as the business sees it. No technology. "An order
  is placed, paid, fulfilled."
- **PIM** (platform-independent) — the system's structure and behavior, no technology commitments.
  "The order service owns order state; payment is an external port."
- **PSM** (platform-specific) — the actual stack. "Postgres table `orders`, Stripe webhook,
  Kubernetes deployment with two replicas."

State which level you're at before drawing. Mixing them is what produces the diagram with a domain
concept and a load balancer in the same box, which is legible to nobody and decidable by no one.

## When a model is worth keeping

Most models should be deleted after they've answered their question — they're scaffolding, and
scaffolding you leave up rots into a lie about the building. Keep one only when:

- It's **checked by something** — generated from code, validated by a test, or covered by a
  reviewer's habit. Mermaid in a repo file at least fails visibly when it stops parsing.
- It answers a question that **recurs** — onboarding, incident response, a boundary that keeps
  getting violated.
- It's **cheap to keep true** — coarse enough that ordinary changes don't invalidate it. A
  container-level diagram survives a refactor; a class diagram of the internals does not.

Anything else: put the *decision* in the ADR (`docs/engineering/adr-template.md`), and let the
diagram go.
