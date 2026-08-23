# Tourism Signal Radar — MVP Backlog

## Prioritization rule

P0 work must directly enable at least one link in **Signal → Evidence → Decision → Action** and must be required to test the product thesis manually. P1 improves repeated use after the thesis is supported. P2 is optional expansion. Priority here describes delivery sequence, not Signal priority.

No backlog item authorizes implementation during Phase 0.

## P0 — validate the complete decision loop

### P0.1 Manual Source capture and retrieval

**Chain:** Evidence  
**Outcome:** User can create, find, open, edit, and identify a Source by title, type, publisher, date, locator, origin, and peer-review state.  
**Acceptance:** Duplicate search occurs before save; unavailable locators remain visible as retrieval failures; no AI output is stored as a Source.

### P0.2 Signal creation distinct from Source

**Chain:** Signal → Evidence  
**Outcome:** User can create a material-change claim and link one or more Sources.  
**Acceptance:** A reviewed Signal requires at least one Source relationship; one Source can link to several Signals and vice versa; drafts are visibly unreviewed.

### P0.3 Evidence relationships and rationale

**Chain:** Evidence → Decision  
**Outcome:** Each Source is marked Supports, Contradicts, or Contextualizes with scope and conditional note.  
**Acceptance:** Contradiction is visible on the Signal card/detail; contextual Sources are not counted as support; evidence rationale states the dominant limitation.

### P0.4 Deterministic evidence quality

**Chain:** Evidence → Decision  
**Outcome:** User applies High/Medium/Low using the published rubric.  
**Acceptance:** No numeric confidence exists; category never appears without rationale and evidence review date; category changes enter history.

### P0.5 User-defined Projects and relevance reasons

**Chain:** Signal → Decision  
**Outcome:** User creates active/inactive Projects and links Signals with explicit reasons.  
**Acceptance:** Project names are data, never schema/configuration; relevance rating is not required; Signal can have zero or several Projects.

### P0.6 Transparent Signal priority and finite Radar

**Chain:** Signal → Decision  
**Outcome:** Radar orders a finite set using P1/P2/P3 gates and deterministic tie-breakers.  
**Acceptance:** User can inspect why an item is P1/P2/P3; overrides require reasons; no infinite scroll or engagement ordering; Radar has a truthful clear state.

### P0.7 Human disposition

**Chain:** Decision  
**Outcome:** User records Undecided, Monitor, Test, Adopt, or Dismiss separately from open/closed status.  
**Acceptance:** Monitor requires review trigger; Test/Adopt lead to THE MOVE; Dismiss requires reason; AI cannot confirm a disposition.

### P0.8 THE MOVE authoring and confirmation

**Chain:** Decision → Action  
**Outcome:** User writes or confirms a bounded next step, rationale, and review trigger.  
**Acceptance:** Required for P1, Test, and Adopt; supports Draft/Confirmed provenance; vague or unbounded moves receive lint; no task-management features.

### P0.9 Move outcome and Signal closure

**Chain:** Action → learning  
**Outcome:** User records move progress/outcome and closes, reopens, or supersedes a Signal.  
**Acceptance:** Test failure does not silently falsify the Signal; closure has reason; successor is linked; unresolved follow-up remains Open.

### P0.10 Material decision history

**Chain:** Evidence → Decision → Action  
**Outcome:** User can recover claim, evidence category, priority, disposition, move, and outcome changes.  
**Acceptance:** Material revisions are append-only events; typo corrections need not pollute history; AI/user provenance is visible.

### P0.11 Core mobile surfaces and states

**Chain:** Entire chain  
**Outcome:** Mobile prototype covers Radar, Signal Detail, Watchlist, Projects, and Evidence.  
**Acceptance:** Every surface has empty/loading/error states; one filled primary action; bottom navigation has at most four items; critical workflows meet the UX tap budget.

### P0.12 Manual-test instrumentation

**Chain:** Product validation  
**Outcome:** Capture time-to-create/review, fields skipped, priority changes, move outcomes, voluntary sessions, and traceability retrieval time.  
**Acceptance:** Metrics can be exported or recorded without behavioral tracking infrastructure; the 10-day test can reach every contract success/failure threshold.

## P1 — make repeated manual use sustainable

### P1.1 Global grouped search

Search Signals, Sources, Projects, and WatchTopics with deterministic per-group ordering.

### P1.2 Source duplicate merge

Merge duplicate metadata while preserving all Signal relationships and history.

### P1.3 Saved finite Radar filters

Save project/watch/priority/evidence-change filters without creating opaque recommendation logic.

### P1.4 Review-trigger agenda

Surface due review conditions and dates locally. This is not push notification infrastructure.

### P1.5 Claim and decision diffs

Show concise before/after views for material revisions.

### P1.6 Lightweight WatchTopic review history

Record deliberate theme review, changed-Signal count, and dormant/reactivated state.

### P1.7 Local draft resilience and offline reading

Preserve pending edits and recently opened decisions under intermittent connectivity.

### P1.8 Accessibility and content stress suite

Automated and manual checks for screen readers, 200% text, contrast, keyboard/focus, long content, and small-screen widths.

### P1.9 Structured export

Export a Signal with Sources, rationale, decision, move, and history in a portable human-readable form. Do not recreate citation-library sync.

## P2 — explore only after demonstrated need

### P2.1 Assisted metadata extraction

Extract title/publisher/date/identifier as an editable draft with Source locator provenance.

### P2.2 AI-drafted Signal clustering

Suggest that several Sources may form one Signal; require human inspection and confirmation.

### P2.3 AI-drafted relevance and THE MOVE

Draft project links, rationales, contradiction flags, and moves with visible provenance and no authority to confirm.

### P2.4 Controlled import

Import selected records from feed/reference exports only if manual capture becomes the validated bottleneck. No massive ingestion pipeline.

### P2.5 List-detail layout for wide screens

Add a responsive split pane while preserving mobile information order.

### P2.6 User-defined templates

Allow limited Source or Signal templates if repeated domain workflows are observed; do not hard-code example projects.

## Explicitly not backlogged for MVP

- web scraping infrastructure;
- vector database, embeddings, RAG, or semantic answer generation;
- ML ranking or composite priority score;
- autonomous research/decision agents;
- social or multi-user collaboration;
- organization roles, billing, subscriptions;
- native application, browser extension, or push notification service;
- full reference management;
- complex charts and analytics dashboards;
- automated changes to project methods;
- external project-management integration.

These are excluded, not merely low priority. Adding one requires evidence from the manual test and a revised Product Contract.

## Backlog cut tests

Before moving any item into P0, answer yes to all:

1. Does it improve a decision rather than content consumption?
2. Does it support a measured manual-test criterion?
3. Would the full Signal → Evidence → Decision → Action loop fail without it?
4. Is there a simpler manual or existing-tool alternative?
5. Can it be implemented without infrastructure for hypothetical scale?

If question 3 is no, it is not P0. If question 4 is yes, use the simpler alternative for validation.

## Release gate

No software MVP should be scoped until the manual prototype meets the behavioral thresholds in `PRODUCT_CONTRACT.md`. Passing a usability review alone is insufficient.
