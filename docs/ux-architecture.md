# Tourism Signal Radar — Mobile UX Architecture

## Experience objective

On an iPhone-sized screen, a user should be able to determine in under one minute:

- what materially changed;
- which active decision it affects;
- how well the claim is established;
- whether evidence changed or conflicts;
- what the next defensible move is.

The app is a finite decision workspace, not a content feed. Every list has a count, a meaningful end, and a stated ordering rule.

## Information architecture

### Primary navigation

Use a four-item bottom bar:

1. **Radar** — current review and action queue
2. **Watch** — monitored themes/questions
3. **Projects** — decision contexts
4. **Evidence** — source capture and traceability

**Signal Detail is not a tab.** It is the central object opened from any context and returned to that context. Making it a fifth tab would imply a separate browse destination and crowd one-handed navigation.

“Library” is renamed **Evidence** because the product is not a general reading archive. Evidence is secondary in emphasis but remains a primary destination in the manual MVP because fast manual Source capture is essential to testing the thesis. If direct capture is rare, move it under global create/search after validation.

### Global controls

- top-right search on every root surface;
- persistent bottom navigation within thumb reach;
- context-aware `+` action: add Signal from Radar, WatchTopic from Watch, Project from Projects, Source from Evidence;
- sheets for quick filters and simple decisions;
- full-screen routes for creation or claim editing where careful review is needed.

No hamburger menu is required in MVP.

## Content hierarchy shared across surfaces

1. **Decision urgency:** P1/P2/P3 and due/review trigger
2. **Material change:** claim and “changed since review” marker
3. **Project/watch relevance:** explicit context and reason
4. **Evidence state:** quality, rationale, contradiction
5. **Human disposition and move:** current decision and next step
6. **Metadata:** dates, domains, provenance, history

Metadata never outranks the claim or move.

## Radar

### Purpose

Provide a finite daily worklist of changed Signals and unresolved moves, ordered by transparent decision priority.

### Information hierarchy

1. Header: date, `N to review`, search
2. **Needs decision**: P1 Signals and expired review triggers
3. **Changed evidence**: contradictions or material updates since last review
4. **Monitor today**: P2 review triggers due
5. **Context**: optional collapsed P3 section
6. End state: “Radar clear” plus next known review trigger

The default Radar contains at most 10 cards. If more qualify, show a finite “8 more” queue with reason and filters—never endless loading.

### Signal card

Compact cards show only:

- priority rail/label (`P1`, `P2`, `P3`);
- title and one-line claim change;
- affected project chips, maximum two plus count;
- evidence label and contradiction icon/text if present;
- disposition or move state;
- due/review trigger;
- “new evidence” or “changed decision” marker when applicable.

Do not show publisher thumbnails, engagement, decorative domain imagery, or several competing badges.

### Primary action

Open the most urgent Signal Detail.

### Secondary actions

- mark reviewed without deciding (P2/P3 only);
- filter by project, watch topic, priority, or changed evidence;
- add a Signal;
- resume an in-progress move.

No swipe-to-dismiss in MVP; destructive or meaning-changing gestures are too easy to trigger accidentally.

### Navigation

- tap card → Signal Detail, preserving Radar position;
- tap project chip → project-filtered Signal list;
- tap evidence marker → Signal Detail scrolled to Evidence.

### Empty state

> Radar clear. No decisions or review triggers are due. Next review: [date/topic].

Offer `Add signal` and `Review Watchlist`, not fake recommendations.

### Loading state

Show a stable skeleton for the header and three compact rows; keep bottom navigation interactive. Do not animate indefinitely.

### Error state

Keep the last locally available Radar with “May be out of date” and last-sync time. Offer Retry. Never replace cached decisions with a blank screen.

### Typical taps

- inspect top Signal: **1 tap**;
- confirm an already sound TEST move: card → confirm = **2 taps**;
- filter to a project: filter → project = **2 taps**;
- reach Evidence for a contradiction: card → evidence section = **2 taps**.

## Signal Detail

### Purpose

Present one complete, traceable decision object and let the user make or update the human decision.

### Information hierarchy

Use a single vertical reading path:

1. **Sticky orientation header:** title, priority, workflow status, back
2. **What changed:** Signal claim, detected/as-of dates, “changed since your review” diff access
3. **Relevant to:** confirmed projects and concise reasons
4. **Why it matters:** only when it adds cross-project consequence
5. **Evidence:** quality label, rationale, support/contradict/context counts, strongest limitation, source rows
6. **Decision:** current disposition and confirmation provenance
7. **THE MOVE:** recommended step, rationale, review trigger, execution state
8. **Uncertainty and history:** collapsed by default unless a material change exists

Facts, interpretation, recommendation, and human decision have explicit section labels. Generated draft content displays “AI draft — not evidence” until confirmed.

### Primary action

Context dependent:

- undecided: `Choose decision`;
- draft move: `Review move`;
- confirmed active move: `Update progress`;
- material new evidence: `Reassess`.

Only one filled primary button is visible at a time.

### Secondary actions

- edit Signal claim;
- add/link Source;
- link Project;
- change priority with reason;
- view history;
- close, reopen, or supersede Signal.

High-consequence actions require confirmation and show what history event will be recorded.

### Decision sheet

Present plain-language choices with consequence:

- Monitor — wait for a named trigger
- Test — run a bounded validation
- Adopt — apply to a project
- Dismiss — deliberately take no action

Choosing Monitor immediately requests a review trigger. Choosing Test/Adopt opens THE MOVE editor. Dismiss requests a reason. This prevents invalid partial states.

### THE MOVE editor

Use three inputs:

1. Next step (required, two sentences maximum)
2. Why this step (required, one sentence)
3. Review when (required condition or date)

Show lightweight lint for vague verbs and excessive scope. No multi-step task builder.

### Navigation

- opened from Radar/Watch/Project/Evidence and returns to its origin and scroll position;
- Source row → Source Detail sheet/full route;
- Project row → Project Detail;
- successor/prior event → linked Signal Detail.

### Empty state

New Signal uses a guided blank state: claim → Source link → relevance → decision. Evidence quality and priority remain “Not assessed” rather than receiving guessed defaults.

### Loading state

Render cached title/claim immediately where available. Skeleton only individual unresolved sections to avoid layout shift.

### Error state

If one section fails, preserve the rest and identify the failed section. A save failure retains the user's draft locally and offers Retry/Copy; it must not imply a decision was recorded.

### Typical taps

- Radar → inspect evidence: **1 tap + scroll**;
- decide TEST and confirm an existing move: card → choose decision → Test → confirm = **4 taps**;
- add an existing Source: add/link → search result → confirm relationship = **3 taps**;
- record completed move: update progress → Completed → save outcome = **3 taps**, plus typing.

## Watchlist

### Purpose

Monitor enduring questions rather than individual articles and expose what changed within each theme.

### Information hierarchy

1. Active topics with due/changed topics first
2. Monitoring question, not just topic name
3. count of changed Signals since last review
4. last reviewed and next trigger
5. Dormant topics collapsed

Example row:

> **Wildfire × Visitor Capacity**  
> What restrictions or risk thresholds alter admissible visitors or transport?  
> 2 changed signals · Review due today

### Primary action

Open a WatchTopic and review changed Signals.

### Secondary actions

- add topic;
- edit monitoring question;
- mark topic reviewed;
- make dormant/reactivate;
- link/unlink an existing Signal.

### WatchTopic Detail

Show the monitoring question, due change summary, linked open Signals ordered P1–P3, recent closed Signals, and review history. Do not create charts for small counts.

- **Purpose:** decide whether a monitored question has materially changed and whether its linked Signals need action.
- **Primary action:** open the highest-priority changed Signal.
- **Secondary actions:** mark review complete, edit the question/trigger, link a Signal, or make the topic dormant.
- **Navigation:** back returns to the same Watchlist position; Signal and Project links open their contextual Details.
- **Empty state:** “No Signals linked yet”; offer `Link existing signal`, not an automatically generated feed.
- **Loading state:** preserve the topic question and cached rows while changed counts resolve.
- **Error state:** keep cached links and do not record a completed review if saving fails.
- **Typical taps:** Watchlist → topic → top Signal = **2 taps**; complete a review = topic → `Mark reviewed` = **2 taps**.

### Navigation

- topic → WatchTopic Detail;
- Signal → Signal Detail;
- project chip → Project Detail.

### Empty state

> No watch topics yet. Add a question you expect to revisit, not a keyword you merely find interesting.

Offer three examples as templates without creating them automatically.

### Loading state

Stable list-row skeleton with topic-name and count positions.

### Error state

Show cached topics and a last-updated warning. Topic edits remain as local drafts if save fails.

### Typical taps

- open changed Signal in first topic: topic → Signal = **2 taps**;
- create topic: `+` → save = **2 taps**, plus typing;
- mark topic dormant: topic menu → Dormant → confirm = **3 taps**.

## Projects

### Purpose

Provide user-defined decision contexts and expose Signals that may change their assumptions or actions.

### Information hierarchy

1. Active Projects
2. project description/decision question
3. count of P1/open Signals and active moves
4. most recent material change
5. Inactive Projects collapsed

### Primary action

Open a Project Detail view.

### Secondary actions

- add/edit Project;
- set active/inactive;
- review unconfirmed suggested links (future AI-assisted feature, not MVP automation).

### Project Detail

Order content by decisions, not domains:

1. project name, scope, status
2. “Needs attention” open Signals
3. current moves
4. monitored Signals
5. closed/recent history
6. project decision questions and domains

Each Signal row exposes the relevance reason. The app does not become a task manager.

- **Purpose:** show which external changes affect this Project's current decision context.
- **Primary action:** open the highest-priority Signal that needs attention.
- **Secondary actions:** edit scope/questions, link an existing Signal, or set the Project inactive.
- **Navigation:** back restores the Projects list; linked Signals and WatchTopics open their contextual Details.
- **Empty state:** “No confirmed Signals affect this Project yet”; offer `Link existing signal` and keep the decision question visible.
- **Loading state:** render cached name/scope immediately and skeleton only the Signal groups/counts.
- **Error state:** retain cached links and relevance reasons; failed scope edits remain local drafts.
- **Typical taps:** Projects → Project → top Signal = **2 taps**; edit a decision question = Project → Edit → Save = **3 taps**, plus typing.

### Navigation

- Signal row → Signal Detail;
- evidence change marker → Signal Detail Evidence section;
- WatchTopic chip → WatchTopic Detail.

### Empty state

> Add one active project to test whether Signals can change a real decision.

Ask for name, a two-sentence scope, and optionally one decision question. Domains remain optional.

### Loading state

Show project names from local cache first; skeleton counts separately.

### Error state

Preserve cached project content with clear staleness. Failed edits remain unsaved drafts.

### Typical taps

- open highest-priority project Signal: project → Signal = **2 taps**;
- link current Signal to a Project: from Signal `Link project` → choose → write/confirm reason → save = **3 taps**, plus typing;
- inactivate project: menu → Make inactive → confirm = **3 taps**.

## Evidence

### Purpose

Capture and retrieve Sources and answer “Why do we believe this?” without reproducing a reference manager.

### Information hierarchy

1. Search and Add Source
2. `Needs linking/review` Sources
3. recently used Sources
4. filters: type, origin, peer review, linked/unlinked
5. compact result list with title, publisher/date, type, and linked-Signal count

Do not default to a chronological article feed. Unlinked Sources are an inbox with an explicit count, not a consumption stream.

### Primary action

Search existing Sources before adding a new one.

### Secondary actions

- capture Source;
- link to a Signal;
- correct metadata;
- open original locator;
- mark duplicate and merge links (P1 operational need once duplicates appear).

### Source Detail

Show bibliographic identity, source classification, method/transparency notes, linked Signals grouped by Supports/Contradicts/Contextualizes, and the external locator. Evidence quality is not assigned to a Source globally; it belongs to a Signal claim.

- **Purpose:** verify Source identity and inspect every claim-specific use of it.
- **Primary action:** open a linked Signal or, if unlinked, `Link to signal`.
- **Secondary actions:** correct metadata, open the original, mark a duplicate, or add a relationship note.
- **Navigation:** back restores Evidence results; linked Signals open Signal Detail; original locator clearly exits the app.
- **Empty state:** for an unlinked Source, explain that it is not yet evidence for a Signal and offer linking.
- **Loading state:** keep cached bibliographic identity visible while relationships resolve.
- **Error state:** an unreachable locator is labeled without deleting metadata; failed edits remain drafts.
- **Typical taps:** Evidence → Source → linked Signal = **2 taps**; link to an existing Signal = Source → Link → choose Signal → confirm relationship = **4 taps**.

### Navigation

- Source → Source Detail;
- linked Signal → Signal Detail;
- original locator opens an external browser with clear boundary.

### Empty state

> No Sources captured. Add the first retrievable item that supports or challenges a real Signal.

### Loading state

Search uses delayed feedback and preserves the query. Avoid blanking existing results.

### Error state

If a locator is unreachable, retain metadata and label retrieval failure; do not delete links or imply the Source is false. If capture fails, keep the form draft.

### Typical taps

- find Source: search → result = **2 taps**, plus typing;
- add Source manually: `+` → save = **2 taps**, plus form entry;
- inspect a Source's related Signal: Source → linked Signal = **2 taps**.

## Search

Global search spans Signal titles/claims, Source title/publisher/identifier, Project names, and WatchTopic names. Results are grouped by entity type, not blended into a relevance-scored stream. Default ordering within groups is exact match, open/active state, then recency.

Search is retrieval, not AI answer generation. It must not synthesize a claim without entering the reviewed Signal workflow.

## Creation flow

### Minimum manual Signal creation

1. Start from an existing Source or `Add Signal`.
2. Write the material-change claim and title.
3. Link at least one Source and choose relationship.
4. Apply evidence rubric with rationale.
5. Optionally link Projects with reasons.
6. Apply priority gates.
7. Choose disposition; add/confirm THE MOVE when required.
8. Save as reviewed Signal.

Allow `Save draft` after step 2, but drafts do not appear as reviewed Radar Signals and cannot be HIGH evidence.

## Review and history interactions

- Material changes display a concise before/after diff.
- History filters to Evidence, Claim, Decision, Move, and Lifecycle.
- The newest event appears first, but the original state remains reachable.
- “Mark reviewed” records time; it never changes evidence, disposition, or status.
- Superseded Signals show a persistent successor banner.

## One-handed and low-typing rules

- place primary decisions and bottom navigation in the lower reachable area;
- minimum 44×44 CSS-pixel targets;
- use selectable reason templates followed by optional edit, never fixed reasons that hide nuance;
- remember recent Projects, WatchTopics, and Source types locally;
- default system dates where factual; never default judgment categories;
- provide voice dictation compatibility through standard text inputs;
- avoid horizontal swiping as the only way to discover an action.

## Workflow tap budget

| Workflow | Target |
|---|---:|
| Open highest-priority Signal | 1 tap |
| Reach any root surface | 1 tap |
| Inspect Source behind a Signal | 2 taps |
| Confirm an existing move | 2–4 taps |
| Record move outcome | 3 taps plus note |
| Filter Radar to Project | 2 taps |
| Create a fully reviewed Signal | no tap target; optimize completion time to ≤8 minutes |

Tap count is subordinate to error prevention. A deliberate confirmation tap is appropriate for adoption, dismissal, closure, or supersession.

## Responsive behavior beyond mobile

Mobile is canonical. On wider screens, constrain reading width and optionally show a list-detail split pane. Do not introduce dashboard grids or desktop-only information. Every action remains available on mobile.

## UX validation risks

- Five conceptual surfaces may still be one too many; test whether Evidence needs a persistent tab.
- P1/P2/P3 may be misunderstood as importance or truth; labels and onboarding must say “review order.”
- Separate disposition/status/execution may remain too complex; observe rather than defend it.
- A finite Radar requires disciplined inclusion rules; otherwise overflow simply moves the feed problem behind a count.
- Long evidence rationales and project reasons can turn Detail into a form; progressive disclosure must not hide contradictions.
