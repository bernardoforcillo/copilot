# Provenance

The principles in this skill are distilled from the published operating model of a European
software acquirer-operator (Bending Spoons S.p.A.) — its own culture documents and engineering
writing, its IPO prospectus, and outside reporting including the critical kind — plus the
generalizations needed to make them apply to a small team or a single engineer rather than to a
portfolio company.

The skill and agent are deliberately written without company branding: they state the model, not
the case study. This file exists so that every claim in them can be traced to a source and
checked, rather than being taken on the skill's word.

## How to read the sourcing

- **Primary** — the company's own published documents and posts. Reliable for what the company
  states its practices and principles to be.
- **Financial disclosure** — IPO prospectus and related filings. Reliable for figures and
  strategy as disclosed to regulators.
- **Journalism / secondary** — reporting and analysis. Reliable for outcomes the company doesn't
  publish itself, including costs and criticism.

Where primary and secondary sources disagree about effects — most sharply on post-acquisition
layoffs and price rises — `asset-transformation.md` states both rather than resolving them in
favour of either.

## Sources

**Primary — company documents and engineering writing**

- *A Great Spooner* — https://bendingspoons.com/documents/Culture&Policies%E2%80%94AGreatSpooner%E2%80%94CompanyWebsite.pdf — ownership as the load-bearing trait, entrepreneurial default, speaking up, the "thorough finisher" behavior (quick to abandon an unpromising task, never to leave a high-priority one incomplete), learning orientation. Feeds `ownership-and-execution.md`.
- *Controversial Principles* — https://bendingspoons.com/documents/Culture&Policies%E2%80%94ControversialPrinciples%E2%80%94CompanyWebsite.pdf — uncompromising excellence, and the practice of publishing the demanding parts of the model up front rather than discovering them on the job. Feeds `talent-and-standards.md`.
- *Pay & Benefits* — https://bendingspoons.com/documents/Culture&Policies%E2%80%94Pay&Benefits%E2%80%94CompanyWebsite.pdf — compensation by impact rather than by tenure or short-term outcome; ownership stakes as long-horizon alignment. Feeds `impact-and-prioritization.md`.
- *Our vision of a Bending Spoons software engineer* — https://medium.com/bendingspoons/our-vision-of-a-bending-spoons-software-engineer-5dd2934a21da — end-to-end problem ownership across infrastructure, database performance, and interface; generalist breadth with depth in one or two areas. Feeds `ownership-and-execution.md`.
- *Backend engineering — The Bending Spoons way* — https://medium.com/bendingspoons/backend-engineering-the-bending-spoons-way-80a845f3c075 — clean, modular, testable code; reuse over rebuild; avoiding overengineering; strict automated checks in CI so human review spends itself on logic and architecture; shared internal libraries. Feeds `radical-simplicity.md`.
- *Life on the Data Science & Analytics team* — https://medium.com/bendingspoons/life-on-the-bending-spoons-data-science-analytics-team-1146a708ffa6 — decisions from small product tweaks to long-term strategy settled on data. Feeds `evidence-and-experimentation.md`.
- *The Talent formula: approaching hiring as a science* — https://medium.com/bendingspoons/the-talent-formula-approaching-hiring-as-a-science-87de8960b326 — defining the ideal profile before the search, structured tasks over unstructured interviews, evaluation as measurement. Feeds `talent-and-standards.md`.
- *The Bending Spoons Selection Process* / *Recruiting Process* — https://jobs.bendingspoons.com/docs/Culture%20&%20Policies%E2%80%94The%20Bending%20Spoons%20Selection%20Process.pdf , https://jobs.bendingspoons.com/docs/Culture%20&%20Policies%E2%80%94The%20Bending%20Spoons%20Recruiting%20Process.pdf — the staged, test-driven filter. Feeds `talent-and-standards.md`.

**Financial disclosure**

- *Final IPO prospectus* — https://bendingspoons.com/documents/financials/2026/Bending%20Spoons%20Final%20Prospectus%20As%20Filed.pdf and the F-1 filings at https://www.sec.gov/Archives/edgar/data/0002004711/000110465926071170/tm2613674-7_f1.htm — the acquire → transform/optimize → reinvest Playbook, unchanged in shape since 2013; the "Platform" defined as people, proprietary technologies, and proprietary data; the shared data infrastructure, lifetime-value prediction model, and experimentation toolkit; disclosed underwriting targets (65% levered / 25% unlevered IRR on deals closed 2023–Q1 2026); disclosed scale of the measurement platform (≈3,000 experiments in 2025; ≈3.8bn data points/day in Q1 2026). Feeds `asset-transformation.md` and `evidence-and-experimentation.md`.

**Journalism and secondary analysis**

- *Twisting the rules of building software* (The Pragmatic Engineer) — https://newsletter.pragmaticengineer.com/p/twisting-the-rules-of-building-software — the "radically simple solution, and bring proof when adding complexity" principle, and engineering process chosen per product maturity: mature products carry more automated tests, more release stages, and more experimentation; young ones deliberately don't. Feeds `radical-simplicity.md`.
- *The Pulse: Bending Spoons' acquisition strategy* (The Pragmatic Engineer) — https://blog.pragmaticengineer.com/the-pulse-bending-spoons-acquisition-strategy/ — the acquisition model seen from the engineering side.
- *S-1 breakdown* (Tanay Jaipuria) — https://www.tanayj.com/p/bending-spoon-s-1-breakdown — the shared-platform economics: tooling and data each product gets that none could justify building alone, and the underwriting improving with each deal.
- *Bending Spoons Operating Manual* (Colin Keeley) — https://www.colinkeeley.com/blog/bending-spoons-operating-manual — the "be good, not lucky" framing: designing an operating machine so outcomes depend less on luck.
- Reporting on hiring selectivity — https://fortune.com/2026/07/15/bending-spoons-hired-0-04-of-800000-job-applicants-2025-ceo-says-hiring-unlike-useless-interviews/ — ~800,000 applications, ~0.04% hired, tests rather than unstructured interviews doing the filtering. Feeds the false-negative caveat in `talent-and-standards.md`.
- Reporting on post-acquisition outcomes — https://techcrunch.com/2026/07/05/what-is-bending-spoons-everything-to-know-about-aols-acquirer/ and coverage of the Evernote, Meetup, and WeTransfer acquisitions — large layoffs at acquired companies, migration onto centralized infrastructure, and aggressive price increases with the resulting user backlash. Feeds the "where this does damage" section of `asset-transformation.md`.
- Investigative reporting on the acquire-cut-raise pattern — https://www.ftm.eu/articles/wetransfer-owner-buys-up-apps-then-makes-them-more-expensive — the sequence applied across acquisitions: redundancies first, then price increases and product changes, with profitability lifting immediately after purchase. Feeds `pricing-and-value-capture.md` and the "where this does damage" section of `asset-transformation.md`.
- Reporting on the specific pricing moves — https://www.forbes.com/sites/iainmartin/2026/07/01/how-bending-spoons-built-a-184-billion-empire-by-buying-internet-has-beens-like-aol/ and https://discussion.evernote.com/forums/topic/145109-bending-spoons-price-increases-begin/ — Evernote's personal plan moving from roughly $100 to $249/yr (~86%), free tiers narrowed, and WeTransfer's $15 and $25 plans consolidated into a single $25 tier with free transfers capped at 10/month. These are the figures quoted in `pricing-and-value-capture.md`; they come from journalism and user forums rather than from the company, and are stated there as reported rather than as disclosed.
- Analysis of the shared-platform components — https://www.tanayj.com/p/bending-spoon-s-1-breakdown and https://www.francescatabor.com/articles/2025/7/28/bending-spoons-a-different-kind-of-tech-company — one platform covering engineering, billing, marketing, and support, with central data infrastructure, a lifetime-value predictor, an experimentation toolkit, a payments system, and a recruiting system offered to every product team. Feeds the "what belongs in the shared layer" table in `platform-and-compounding.md`, generalized to small-team equivalents.
- Employee reviews (Glassdoor) — https://www.glassdoor.com/Reviews/Bending-Spoons-Reviews-E1164562.htm — the reported failure mode of continuous evaluation: high turnover, and feedback quality varying with the individual lead. Feeds `talent-and-standards.md`.

## The foundations tier

`references/foundations/` is a different kind of file from the rest of this skill. It doesn't
describe anyone's practice — it derives each principle from a published result, so the principle
can be checked, argued with, and switched off when its mechanism is absent. The works it draws on,
by file:

- **complexity-and-coupling** — Frederick P. Brooks Jr., *The Mythical Man-Month* (1975), for the
  *n(n−1)/2* communication-path argument, and *No Silver Bullet* (1986) for essential vs accidental
  complexity; Herbert A. Simon, *The Architecture of Complexity* (1962), for near-decomposability;
  Melvin E. Conway, *How Do Committees Invent?* (1968); Meir M. Lehman's laws of software evolution
  (1980) for accretion; John Gall, *Systemantics* (1975), for evolved-from-simple; Hyrum's law
  (Hyrum Wright, hyrumslaw.com) for behavior hardening into contract; G. K. Chesterton, *The Thing*
  (1929), for the fence.
- **uncertainty-and-information** — Frank H. Knight, *Risk, Uncertainty and Profit* (1921); Ronald
  A. Howard, *Information Value Theory* (IEEE Transactions on Systems Science and Cybernetics,
  1966); Amos Tversky and Daniel Kahneman, *Judgment under Uncertainty: Heuristics and Biases*
  (Science, 1974); Charles Goodhart (1975) in Marilyn Strathern's (1997) formulation, and Donald T.
  Campbell (1979). The sample-size expression (n ≈ 16σ²/δ² per arm at 80% power, α = 0.05) is the
  standard two-sample rule of thumb.
- **irreversibility-and-optionality** — Jeff Bezos's 2015 Amazon shareholder letter for the Type 1 /
  Type 2 door framing; standard real-options reasoning for the asymmetry; Nassim Nicholas Taleb,
  *Antifragile* (2012), for convexity under uncertainty.
- **flow-and-queues** — John D. C. Little, *A Proof for the Queuing Formula: L = λW* (Operations
  Research, 1961); standard M/M/1 results for the 1/(1−ρ) latency curve and Kingman's approximation
  for variability; Donald G. Reinertsen, *The Principles of Product Development Flow* (2009), for
  batch size and cost of delay; Nicole Forsgren, Jez Humble and Gene Kim, *Accelerate* (2018), for
  the empirical throughput/stability result; Eliyahu M. Goldratt, *The Goal* (1984), for
  constraints.
- **compounding-and-capital** — Ronald H. Coase, *The Nature of the Firm* (Economica, 1937), for
  make-vs-buy as transaction costs; T. P. Wright (1936) for the learning curve; J. L. Kelly Jr.
  (1956) for growth-optimal sizing and the absorbing nature of ruin.
- **incentives-and-trust** — Michael C. Jensen and William H. Meckling, *Theory of the Firm* (Journal
  of Financial Economics, 1976), for agency costs; Robert Axelrod, *The Evolution of Cooperation*
  (1984), for repeated games and the shadow of the future; Nassim Nicholas Taleb, *Skin in the Game*
  (2018); standard results on selection under imperfect signal correlation and regression to the
  mean (Kahneman, *Thinking, Fast and Slow*, 2011, for the latter's practical treatment).

These are cited by title and year from standard literature; the session that wrote this file had no
network access to the publishers, so nothing here was re-verified against the original text at
writing time. Check any citation you intend to lean on. The *derivations* — which principle follows
from which mechanism, and when it voids — are this plugin's own reasoning, not the cited authors'
claims about this operating model.

## Caveats

- Company-published material describes intent; it is not independent evidence of practice.
- Figures are as disclosed at the dates given and go stale.
- Several widely-repeated operational details (internal system names, exact overhead-reduction
  percentages, per-app revenue lifts) circulate only in secondary summaries and are deliberately
  not used in this skill.
- The generalizations to a solo engineer or small team are this plugin's own — they're an
  adaptation of the model, not a claim about how the company works at that scale.
- Four of the applied reference files are largely this plugin's own construction rather than
  distillation: `reliability-and-incidents.md` and `decision-latency.md` generalize from standard
  practice (error budgets, blameless postmortems, one-way/two-way doors, batch size) because the
  company publishes little on either; `limits-and-failure-modes.md` is a deliberate counterweight
  written against the model, not from it; `worked-examples.md` is invented illustration, and its
  numbers are made up for the example rather than drawn from any real system.
