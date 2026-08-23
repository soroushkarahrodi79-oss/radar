# Tourism Signal Radar — Product Contract

## Contract status

- Phase: 0 — product validation
- Product state: documentation only; no application exists
- Primary user: one tourism researcher, destination analyst, or innovation practitioner managing several projects
- Core promise: turn a material external change into a traceable, defensible next move

This contract is a boundary. Features that do not improve the chain **Signal → Evidence → Decision → Action** are outside the first product.

## Problem

Tourism decision-makers monitor many fragmented domains: climate, mobility, protected areas, geospatial intelligence, AI, governance, tourism technology, and research. The relevant material arrives as papers, policy notices, datasets, institutional announcements, and reporting. A conventional reader preserves the fragmentation: it helps users consume items but not decide what changed, why it matters to active work, how trustworthy it is, or what to do next.

The cost is not simply unread material. It is delayed decisions, repeated interpretation, weak traceability, premature adoption, and forgotten follow-up.

## Target user

### Initial user

A research-oriented tourism professional who:

- works across several simultaneous projects;
- repeatedly scans external developments;
- needs to explain why a decision was made;
- can judge domain relevance but has limited time;
- prefers a small defensible action over a speculative recommendation.

### Not the initial user

- a casual tourism-news reader;
- a newsroom or publishing team;
- an enterprise knowledge-management administrator;
- a team requiring permissions, assignments, or approval chains;
- a user seeking autonomous decisions.

## Job to be done

> When credible external developments may affect my tourism projects, help me identify the few changes that matter, inspect the evidence and uncertainty, and record the smallest rational next action so I can act without rereading the whole information stream.

Supporting jobs:

- preserve the distinction between a source and the interpreted signal it supports;
- connect a signal to one or more projects without hard-coded project names;
- revisit signals when evidence or project context changes;
- retain a compact decision history rather than silently rewriting past reasoning.

## Product thesis

The useful unit is not an article. It is a reviewed **Signal**: an interpreted, time-bounded development supported or challenged by one or more **Sources**, connected to project implications, and—when warranted—ending in **THE MOVE**.

The product wins only if it reduces decision latency and improves decision traceability. More ingestion, more summaries, and more daily content are not success by themselves.

## Differentiation

The differentiated loop is:

1. **Signal:** state the material change, not the headline.
2. **Evidence:** show why it is believed and what contradicts it.
3. **Relevance:** identify the affected project and the concrete reason.
4. **Decision:** record the human disposition and uncertainty.
5. **Action:** define the smallest defensible next move.

RSS readers optimize collection and reading. Reference managers optimize citation storage. Alerts optimize discovery. Project tools optimize execution. Tourism Signal Radar occupies the narrow handoff between reviewed external evidence and a project decision.

## Product principles

1. **Decision value over volume.** A quiet radar is acceptable.
2. **Sources are evidence; signals are interpretations.** Never collapse them.
3. **AI drafts; humans decide.** Generated text is visibly attributed and reviewable.
4. **No evidence laundering.** Repetition, model confidence, or a polished summary cannot strengthen evidence.
5. **Smallest rational next action.** THE MOVE should normally be bounded, reversible, and testable.
6. **History is append-only in meaning.** Corrections and changed decisions are recorded, not silently overwritten.
7. **No fake precision.** Use explicit rules and ordinal categories only when they change a decision.
8. **Finite attention.** The Radar is a curated daily work surface, never an infinite feed.

## Core workflow

### Morning scan

1. Open Radar.
2. Review a finite set of Priority 1 and Priority 2 signals, with changes since last review exposed.
3. Open a signal that affects an active project or requires a decision.
4. Inspect the factual claim, evidence mix, contradictions, project relevance, and current recommendation.
5. Choose a human disposition: test, adopt, monitor, dismiss, or defer.
6. Confirm or edit THE MOVE when action is warranted.
7. Later record the outcome; the signal remains traceable.

### Signal review

1. Capture one or more Sources.
2. Draft or revise a Signal claim.
3. Mark each source's relationship to the claim.
4. Apply the deterministic evidence-quality rubric.
5. Link only genuinely affected projects and write a relevance reason.
6. Assign priority using transparent gates.
7. Confirm a disposition and THE MOVE.

## MVP

The MVP is a manual, single-user decision notebook with five logical surfaces, delivered through four primary navigation destinations:

- **Radar:** a finite prioritized review queue.
- **Signal Detail:** the full decision object, reached contextually rather than through primary navigation.
- **Watchlist:** monitored questions or themes and their changed signals.
- **Projects:** active project contexts and linked signals.
- **Evidence:** a lightweight source library and traceability view.

The MVP must support:

- manual Source capture;
- manual Signal creation and editing;
- several Sources per Signal and several Signals per Source;
- support, contradiction, and context evidence relationships;
- transparent evidence quality with a visible rationale;
- project links with a written relevance reason;
- categorical priority determined by explicit gates;
- a human disposition distinct from workflow status;
- THE MOVE with ownerless-but-bounded next step, review trigger, and optional due date;
- change history for evidence, recommendation, and human decision;
- search and finite filters sufficient for approximately 50–200 signals.

## Non-goals

Not in the initial product:

- automated scraping or large ingestion pipelines;
- vector search, RAG, recommendation engines, or ML ranking;
- autonomous agents or autonomous decisions;
- a full reference manager or replacement for Zotero;
- social feeds, collaboration, organizations, roles, billing, or subscriptions;
- browser extensions, native apps, or push notification infrastructure;
- complex analytics dashboards;
- automatic methodology changes or external project integration;
- publication workflows or a tourism-news product.

## Assumptions to test

1. Multiple Sources often resolve into one useful Signal rather than one summary per Source.
2. Users can write a decision-relevant signal claim consistently.
3. THE MOVE is more valuable than a conventional “why it matters” summary.
4. A three-level evidence rubric is understandable and consistent enough for decisions.
5. Explicit project relevance reduces re-reading rather than adding clerical work.
6. A finite daily radar creates a return habit without automated ingestion.
7. The user will record action outcomes often enough to close the learning loop.
8. Manual review can remain under a tolerable time budget.

## Failure conditions

Kill or substantially reposition the product if the manual test shows any of the following:

- at least 70% of Sources become one Signal each, with no useful cross-source synthesis;
- users treat THE MOVE as generic advice or cannot distinguish it from “why it matters”;
- the Radar is used as a reading list rather than a decision queue;
- median reviewed-Signal processing time remains above 12 minutes after the learning period;
- fewer than 30% of relevant signals lead to a recorded monitor, test, adoption, or dismissal decision;
- users cannot explain evidence quality from the visible rubric;
- after two weeks, the user does not voluntarily return on at least 3 working days per week;
- maintaining project links and statuses costs more time than it saves;
- an alert reader plus a structured note template provides equivalent value.

## First-test success criteria

Proceed to coding only if a 10-working-day manual prototype with 12–18 real signals demonstrates:

- **Signal/Source separation:** at least 30% of signals use two or more sources, or at least 20% of sources inform more than one signal; qualitative interviews confirm the distinction is useful.
- **THE MOVE utility:** at least 70% of actionable signals receive a move rated useful (4 or 5 on a 5-point post-use question), and at least 50% are executed, scheduled, or explicitly rejected.
- **Evidence comprehension:** in 80% of sampled signals, the user can explain the evidence category using the underlying criteria without seeing a numeric score.
- **Priority usefulness:** at least 80% of Priority 1 items are reviewed within one working day and fewer than 20% are later judged background-only.
- **Field economy:** no required field is skipped or judged redundant in more than 40% of records.
- **Processing cost:** median review time is at most 8 minutes per signal by the second week; source capture alone is at most 2 minutes.
- **Return behavior:** the user opens the prototype voluntarily on at least 6 of 10 working days and reports that at least three visits changed or confirmed a decision.
- **Traceability:** for every acted-upon signal, the user can identify the supporting source(s), interpretation, recorded decision, and resulting move in under 60 seconds.

These are learning thresholds, not claims of statistical validity. Failure should trigger redesign or termination, not metric reinterpretation.

## Manual prototype test

### Corpus

Curate 12–18 genuine developments across climate, AI, mobility, protected areas, tourism data, and destination governance. Include deliberately difficult cases:

- three multi-source developments;
- two contradictory evidence sets;
- two low-authority but potentially urgent reports;
- two sources relevant to multiple projects;
- two signals that deserve no immediate move;
- one signal superseded during the test.

### Prototype

Use a structured table or linked-document prototype. Do not automate collection or generation. Seed half the signals; have the user create the remainder to expose authoring cost.

### Procedure

1. **Day 0:** explain Signal versus Source using one example; do not train the scoring rubric beyond its visible wording.
2. **Days 1–5:** user performs a 10-minute morning Radar scan and processes selected signals. Record screen/task time and field edits.
3. **Day 5 interview:** ask for definitions of evidence, priority, disposition, status, and THE MOVE; remove or revise misunderstood fields.
4. **Days 6–10:** introduce contradictions, updates, and a completed or failed test. Observe whether history and evolution remain understandable.
5. **Day 10 interview:** compare the prototype with the user's current alerts, bookmarks, notes, and reference manager.
6. **One-week follow-up:** check whether moves were performed and whether any signal was revisited without prompting.

### Measures

- number of Sources per Signal and Signals per Source;
- time to capture a Source, review a Signal, and recover a decision rationale;
- fields ignored, corrected, or misunderstood;
- priority changes and false Priority 1 assignments;
- moves executed, scheduled, edited, rejected, or forgotten;
- signal state changes after support, contradiction, test success, and test failure;
- voluntary opens and self-reported decisions affected;
- System Usability Scale may be recorded, but behavioral thresholds govern the build decision.

## Critical review

### 1. Why might this become a fancy RSS reader?

If records are generated one-per-article, the home screen rewards freshness, and THE MOVE becomes a templated closing sentence, the product is an RSS reader with more metadata. The safeguard is behavioral: multi-source claims, project-specific implications, a finite decision queue, and recorded outcomes must be common in the manual test.

### 2. What would make someone open it every morning?

Not content volume. The user returns when the Radar reliably shows a small set of material changes, flags what became stronger or contradictory, and reminds them of moves now due. Without fresh reviewed value or pending decisions, the honest product should not demand a daily visit.

### 3. Which fields create bureaucracy without decision quality?

Separate domain and tag taxonomies, mandatory “why it matters” plus “implication” plus “relevance reason,” a relevance rating with no routing effect, manual detected and updated timestamps, and a status for every intermediate editing step are prime candidates for removal. Free-text evidence notes should live on the Signal–Source relationship only when the relationship is not obvious.

### 4. Which scoring ideas create fake precision?

Weighted 0–100 priority, averaged evidence confidence, “AI certainty,” novelty percentages, and a composite relevance score imply calibrated measurement that does not exist. Ordinal categories are acceptable only with inspectable gates and override reasons.

### 5. Where could AI silently contaminate evidence?

AI can invent source claims, merge incompatible findings, turn institutional language into asserted fact, infer corroboration from copied reporting, and write a recommendation in factual prose. Every generated field must retain provenance and review state; model output can never be counted as a Source.

### 6. Which workflows become annoying after 50 signals?

Re-rating every signal when projects change, manually closing stale watch topics, duplicating Sources, scanning long ungrouped histories, and updating status plus action plus move separately. Deduplication, saved finite views, batch archive of unchanged background items, and sparse required fields become necessary before sophisticated ingestion.

### 7. What should be generated versus manually confirmed?

AI may draft a source summary, candidate signal, domains, project matches, evidence relationship, contradiction alert, and move. A person must confirm the factual claim, source relationship, evidence category, project relevance, disposition, integration/dismissal, and final move. Dates and identifiers should be extracted deterministically where possible.

### 8. What existing products solve parts of this?

Current adjacent products already cover most individual capabilities:

- [Feedly Market Intelligence](https://feedly.com/market-intelligence) filters large source sets, surfaces trends, and synthesizes selected articles; it is the strongest warning that “AI signal detection” alone is not differentiation.
- [Inoreader](https://www.inoreader.com/blog/2026/01/discover-and-monitor-content.html) turns searches and websites into monitoring feeds, covering durable topic watch and collection.
- [Zotero](https://www.zotero.org/support/quick_start_guide) collects, organizes, searches, annotates, and cites research Sources, so this product should link or export rather than recreate reference management.
- [Readwise Reader](https://readwise.io/read) unifies articles, PDFs, newsletters, RSS, highlights, and offline reading, covering capture and consumption.
- [Notion](https://www.notion.com/help/intro-to-databases) provides configurable linked databases, properties, filters, and views capable of reproducing a manual Signal template.

The remaining hypothesis is narrow: none of these generic capabilities by itself enforces a tourism-oriented, multi-source **claim → explicit contradiction → project implication → human disposition → bounded move → outcome history**. The proposed product must prove that this opinionated workflow is better than combining two adjacent tools with a template.

### 9. What is the smallest unique value worth building?

A reviewed Signal page that combines a multi-source claim, explicit support/contradiction, one project-specific implication, a human disposition, and a testable next move—plus a finite queue ordered by transparent decision urgency.

### 10. Under what conditions should we kill the project?

Kill it if the smallest unique value does not outperform a linked note template in decision speed, traceability, or follow-through during the manual test. Also kill it if useful moves require expertise the system cannot safely support, or if users will not maintain outcomes and therefore never close the learning loop.

# PHASE 0 VERDICT

Recommendation:
VALIDATE BEFORE BUILD

Core unique value:
A traceable, multi-source tourism signal that ends in a small, defensible, project-relevant next move.

Biggest product risk:
Signal records collapse into article summaries and THE MOVE becomes generic AI prose.

Most unnecessary proposed feature:
A separate Library destination in primary navigation; Evidence can be a secondary destination and contextual layer.

Strongest design decision:
Separating Source fact, interpreted Signal, recommendation, and human decision.

Weakest assumption:
That a solo user will maintain enough decision outcomes to make the lifecycle valuable.

Minimum viable Signal:
One material-change claim, at least one linked Source with relationship, evidence rationale, optional project relevance reason, priority, human disposition, and history.

Minimum viable THE MOVE:
One specific verb-led next step with a bounded object and a trigger or condition for review.

What must be manually validated before coding:
Signal/Source separation, THE MOVE utility, evidence-rubric comprehension, authoring time, return behavior, and advantage over a structured note template.

Recommended MVP surfaces:
Radar, contextual Signal Detail, Watchlist, Projects, and secondary Evidence.

Estimated product complexity:
7/10

Estimated technical complexity:
4/10

Next action if approved:
Run the 10-working-day manual prototype with 12–18 real cross-domain signals and apply the stated go/kill thresholds.
