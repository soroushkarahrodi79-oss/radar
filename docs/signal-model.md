# Tourism Signal Radar — Signal Model

## Modeling principles

- Model the decision trail, not the publishing ecosystem.
- Keep Source and Signal separate and allow many-to-many evidence relationships.
- Use relationships for context-specific claims; do not copy source metadata into Signals.
- Store only categories that change ordering, review, or decisions.
- Preserve material revisions as events.
- Prefer a compact aggregate plus an append-only event history over a deeply normalized schema.

## Concept map

```text
Source ──< SignalEvidence >── Signal ──< SignalProjectRelevance >── Project
                                  │
                                  ├── DecisionEvent / SignalEvent
                                  └──< SignalWatchTopic >── WatchTopic (optional in MVP)
```

`SignalEvidence` and `SignalProjectRelevance` are first-class because their notes describe a relationship, not either endpoint. `SignalEvent` is an audit trail, not a separate workflow engine.

## Source

A retrievable evidence object created independently of the Signal interpretation. A Source can support, contradict, or contextualize several Signals.

### Required fields

| Field | Meaning |
|---|---|
| `id` | Stable internal identifier |
| `title` | Source title or concise identifier |
| `sourceType` | One controlled type |
| `publisher` | Responsible publishing entity or author |
| `publicationDate` | Date of publication/release; precision may be day, month, or year |
| `locator` | URL, DOI, report identifier, or repository locator |
| `origin` | `PRIMARY` or `SECONDARY` relative to the reported development |
| `peerReview` | `YES`, `NO`, or `NOT_APPLICABLE`; never inferred from document style |
| `capturedAt` | System timestamp |

### Optional fields

- `authors`
- `accessedAt`
- `language`
- `version`
- `archivedLocator`
- `methodTransparency`: `CLEAR`, `PARTIAL`, `OPAQUE`, or `NOT_APPLICABLE`
- `notes`: bibliographic or access notes only

### Source types

Use a short controlled list: `SCIENTIFIC_STUDY`, `OFFICIAL_ANNOUNCEMENT`, `POLICY_OR_REGULATION`, `DATASET_OR_DOCUMENTATION`, `TECHNICAL_REPORT`, `INDUSTRY_REPORT`, `JOURNALISM`, `EXPERT_COMMENTARY`, `OTHER`.

Type does not determine authority by itself. A regulation may be primary for a rule but irrelevant as evidence of its tourism impact.

## Signal

A reviewed interpretation that a material external condition, capability, policy, behavior, or evidence base changed—or may be changing—in a way potentially relevant to a tourism decision.

A Signal is neither a topic (“wildfire”) nor a source summary (“a paper was published”). Its title and claim should express the development.

### Required fields

| Field | Meaning |
|---|---|
| `id` | Stable internal identifier |
| `title` | Compact, scannable development label |
| `claim` | Two to four concise sentences stating what happened and its boundary |
| `domain` | One primary domain; optional secondary tags do not become a taxonomy project |
| `detectedAt` | When the development was first captured |
| `asOfDate` | Date through which the evidence was reviewed |
| `evidenceQuality` | `HIGH`, `MEDIUM`, or `LOW`, derived by rubric |
| `evidenceRationale` | Short visible reason tied to the rubric |
| `priority` | `P1`, `P2`, or `P3`, derived by gates |
| `workflowStatus` | `OPEN` or `CLOSED` |
| `disposition` | Current human decision; may be `UNDECIDED` |
| `createdAt`, `updatedAt` | System timestamps |

### Optional fields

- `whyItMatters`: cross-project consequence; omit if project reasons carry all useful meaning
- `uncertainties`: concise unresolved questions
- `move`: structured THE MOVE object
- `supersededBySignalId`
- secondary `tags`

`lastUpdated` is a system timestamp, not a user field. `asOfDate` communicates evidence currency and may differ from it.

## Project

A user-defined decision context to which Signals may be relevant. Names such as TFM, SNTO, HATI, or LocalFlow are example data only.

| Field | Required | Meaning |
|---|---:|---|
| `id` | yes | Stable identifier |
| `name` | yes | User-defined label |
| `description` | yes | Scope and intended outcome in a few sentences |
| `decisionQuestions` | no | Questions that help assess relevance |
| `domains` | no | Discovery hints, not hard filters |
| `status` | yes | `ACTIVE` or `INACTIVE` |
| `createdAt`, `updatedAt` | yes | System timestamps |

Avoid project phases, owners, tasks, budgets, and deliverables. This product links intelligence to projects; it does not manage projects.

## SignalProjectRelevance

The contextual explanation of why a Signal may affect a Project.

| Field | Required | Meaning |
|---|---:|---|
| `signalId`, `projectId` | yes | Composite identity |
| `reason` | yes | The affected assumption, decision, metric, or activity |
| `implication` | no | A project-specific consequence when it adds information beyond `reason` |
| `attention` | no | `HIGH` or `NORMAL` only if it changes Radar routing |
| `confirmedByUser` | yes | Prevents suggested links masquerading as decisions |
| `createdAt`, `updatedAt` | yes | System timestamps |

Do not require `HIGH / MEDIUM / LOW` relevance. It adds a second ranking system and invites arbitrary grading. A link either has an explicit reason or should not exist. The optional binary attention flag is justified only to escalate a genuinely decision-critical project link.

## SignalEvidence

The claim-specific relationship between a Source and a Signal.

| Field | Required | Meaning |
|---|---:|---|
| `signalId`, `sourceId` | yes | Composite identity |
| `relationship` | yes | `SUPPORTS`, `CONTRADICTS`, or `CONTEXTUALIZES` |
| `evidenceNote` | conditional | What the Source contributes; required for contradiction and whenever contribution is not evident |
| `scopeMatch` | yes | `DIRECT` or `INDIRECT` |
| `addedAt` | yes | System timestamp |
| `addedBy` | yes | `USER` or `AI_DRAFT_CONFIRMED_BY_USER` |

`CONTEXTUALIZES` covers definitions, background, and adjacent findings; it must not count as corroborating support. Multiple secondary articles repeating one primary announcement remain one evidence chain, not independent corroboration.

## WatchTopic

A user-defined monitoring question that groups future developments across Sources and Signals. It is justified because a Project asks “what affects this body of work?” while a WatchTopic asks “what is changing in this theme?”

| Field | Required | Meaning |
|---|---:|---|
| `id` | yes | Stable identifier |
| `name` | yes | Human-readable theme, e.g. “Wildfire × Visitor Capacity” |
| `monitoringQuestion` | yes | What change would matter and why |
| `state` | yes | `ACTIVE` or `DORMANT` |
| `lastReviewedAt` | no | Last deliberate review time |

Do not add “High Attention” as a WatchTopic state; it is presentation priority, not lifecycle. In the first manual test WatchTopic may be implemented as a saved label plus a question. If users do not revisit themes independently of projects, remove the entity.

## SignalWatchTopic

A simple many-to-many link containing `signalId`, `watchTopicId`, and `linkedAt`. No relevance score is needed.

## Human disposition

Disposition records what the user currently intends to do about the Signal. It is distinct from workflow status and from whether the move has been completed.

| Value | Meaning |
|---|---|
| `UNDECIDED` | No human decision yet |
| `MONITOR` | Seek meaningful change or stronger evidence before another decision |
| `TEST` | Run a bounded validation or experiment |
| `ADOPT` | Apply the insight/capability to a project or method |
| `DISMISS` | Take no further action given current evidence/context |

Replace `READ`: reading is an activity, not a decision. Replace `INTEGRATE` with `ADOPT`: integration is one possible implementation of adoption. Replace `IGNORE` with `DISMISS`: ignoring is ambiguous and often accidental. `DEFER` is represented by `UNDECIDED` plus a review date only when a decision trigger exists.

## Signal lifecycle and workflow status

Use only:

- `OPEN`: the signal still requires monitoring, a decision, a move, or an outcome.
- `CLOSED`: no current follow-up is required.

Reason for closure is stored separately as `RESOLVED`, `DISMISSED`, `SUPERSEDED`, or `NO_LONGER_RELEVANT`. This avoids ambiguous overlaps such as WATCHING status plus WATCH action, or TESTING status plus TEST action.

Current disposition and Move state explain the active work. `DETECTED`, `REVIEWED`, `TESTING`, and `INTEGRATED` are events, not mutually exclusive lifecycle states.

## Action lifecycle

Action is represented by two coordinated but non-duplicative fields:

1. `disposition` records the current human intent (`MONITOR`, `TEST`, `ADOPT`, or `DISMISS`).
2. `move.executionState` records whether the confirmed next step is `NOT_STARTED`, `IN_PROGRESS`, `COMPLETED`, or `CANCELLED`.

A disposition can change after an outcome. For example, a completed TEST may lead to ADOPT, MONITOR, or DISMISS. That change creates a `DISPOSITION_DECIDED` event; the old move and its outcome remain in history, and a new confirmed move is created only when another next step is justified.

Do not add `READ` to this lifecycle: reading is an event. Do not use `INTEGRATED` as an action state: integration is an adoption outcome. Do not treat `ARCHIVED` as action: it is only a view/storage preference.

## THE MOVE

A Signal may have one current recommended move. It is a recommendation until the user confirms it.

| Field | Required | Meaning |
|---|---:|---|
| `text` | yes | Short verb-led next action |
| `rationale` | yes | Why this is the smallest defensible step; one sentence |
| `basisAsOf` | yes | Evidence review date supporting the recommendation |
| `reviewTrigger` | yes | Condition, result, or date that prompts reconsideration |
| `recommendationProvenance` | yes | `USER` or `AI_DRAFT_CONFIRMED_BY_USER` |
| `confirmationState` | yes | `DRAFT` or `CONFIRMED` |
| `executionState` | yes | `NOT_STARTED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED` |
| `dueDate` | no | Only when a real deadline exists |
| `outcomeNote` | conditional | Required when completed or cancelled |

The move is not a task-management system. It has no assignee, checklist, dependencies, or recurring schedule in MVP.

### Quality test

A valid move:

- begins with a concrete verb;
- names the object and boundary;
- can be completed or deliberately declined;
- states the trigger for the next decision;
- does not assert an inference as fact;
- is no longer than two concise sentences.

“Explore AlphaEarth” fails. “Compare AlphaEarth and the current NDVI indicator on two known sites; revisit adoption only if it changes anomaly detection without unacceptable processing cost” passes.

## Event history

Store a compact append-only `SignalEvent` when material meaning changes.

| Event | Minimum payload |
|---|---|
| `SIGNAL_CREATED` | initial claim and author/provenance |
| `CLAIM_REVISED` | previous/new claim and reason |
| `EVIDENCE_ADDED_OR_CHANGED` | Source, relationship, note |
| `QUALITY_CHANGED` | previous/new category and rationale |
| `PRIORITY_CHANGED` | previous/new category and override reason if any |
| `DISPOSITION_DECIDED` | previous/new value and user note |
| `MOVE_CONFIRMED_OR_REVISED` | previous/new move and basis date |
| `MOVE_OUTCOME_RECORDED` | execution result and outcome note |
| `SIGNAL_CLOSED_OR_REOPENED` | reason |
| `SIGNAL_SUPERSEDED` | successor Signal id and reason |

Routine typo fixes and display metadata changes need not create events. Events capture changes that could alter interpretation or action.

## Evolution rules

- **Signal becomes stronger:** add evidence; reapply quality rubric; record the changed rationale and reconsider priority/move.
- **New evidence contradicts it:** link as `CONTRADICTS`; expose a contradiction flag; keep the old claim; revise only with a reason and event.
- **Becomes irrelevant:** close with `NO_LONGER_RELEVANT`; preserve project links and prior decision.
- **Recommended test completed:** record outcome; disposition may become `ADOPT`, `MONITOR`, or `DISMISS`; close only when no follow-up remains.
- **Test fails:** record what failed and boundary; do not convert a failed test into proof that the underlying signal is false.
- **Integrated into a project:** set disposition `ADOPT`, record outcome, close `RESOLVED` if no monitoring remains.
- **Superseded:** link the successor, close as `SUPERSEDED`, and keep both claims visible.

## Example record: AlphaEarth

```yaml
signal:
  id: sig_alphaearth_ee_2026
  title: "AlphaEarth embeddings become testable in destination monitoring"
  claim: >
    AlphaEarth satellite embeddings are now accessible through Earth Engine for
    analysis workflows. Availability reduces the access barrier, but no reviewed
    evidence yet shows that they improve this user's visitor-pressure indicators.
  domain: REMOTE_SENSING
  detectedAt: 2026-08-18
  asOfDate: 2026-08-20
  evidenceQuality: HIGH
  evidenceRationale: "Direct official availability is confirmed; performance for the intended tourism use remains unvalidated."
  priority: P1
  workflowStatus: OPEN
  disposition: TEST
  uncertainties:
    - "Incremental value over current NDVI anomaly indicators"
  move:
    text: "Compare AlphaEarth and the current NDVI indicator on two known sites before changing the monitoring pipeline."
    rationale: "A bounded parity test resolves the project-specific uncertainty without committing to integration."
    basisAsOf: 2026-08-20
    reviewTrigger: "Review when the two-site comparison and processing-cost estimate are complete."
    recommendationProvenance: USER
    confirmationState: CONFIRMED
    executionState: NOT_STARTED

sources:
  - id: src_gee_announcement
    title: "AlphaEarth Foundations in Google Earth Engine"
    sourceType: OFFICIAL_ANNOUNCEMENT
    publisher: "Google Earth Engine"
    publicationDate: 2026-08-17
    locator: "https://example.invalid/official-announcement"
    origin: PRIMARY
    peerReview: NOT_APPLICABLE
    methodTransparency: PARTIAL

evidenceLinks:
  - signalId: sig_alphaearth_ee_2026
    sourceId: src_gee_announcement
    relationship: SUPPORTS
    scopeMatch: DIRECT
    evidenceNote: "Confirms service availability, not fitness for the project's indicators."

projectLinks:
  - signalId: sig_alphaearth_ee_2026
    projectId: project_user_defined_01
    reason: "May change the remote-sensing inputs used for anomaly monitoring."
    implication: "Requires a parity test before any methodology change."
    attention: HIGH
    confirmedByUser: true
```

The example URL is deliberately non-functional and the project name is not embedded in the model.

## Example record: contradictory evidence

```yaml
signal:
  id: sig_heat_capacity_urban_01
  title: "Heat thresholds are entering urban visitor-capacity decisions"
  claim: >
    Two destination guidance documents now include heat exposure in operational
    visitor limits. A local observational study reports weaker behavioral response,
    so generalization beyond those destinations remains uncertain.
  evidenceQuality: MEDIUM
  evidenceRationale: "Direct policy evidence supports adoption in two contexts; empirical tourism effects are mixed and not yet broadly corroborated."
  priority: P2
  workflowStatus: OPEN
  disposition: MONITOR

evidenceLinks:
  - sourceId: src_policy_a
    relationship: SUPPORTS
    scopeMatch: DIRECT
  - sourceId: src_policy_b
    relationship: SUPPORTS
    scopeMatch: DIRECT
  - sourceId: src_observational_c
    relationship: CONTRADICTS
    scopeMatch: INDIRECT
    evidenceNote: "Observed visits declined less than the guidance assumptions predict."
```

The contradiction lowers confidence in transferability; it does not erase the fact that the two policies changed.

## Explicitly rejected fields

- AI confidence percentage
- composite 0–100 signal score
- mandatory relevance level
- engagement counts
- sentiment
- read/unread as a decision state
- Signal author reputation score
- separate `summary`, `whatHappened`, `abstract`, and `description` fields
- arbitrary evidence weights stored as truth

Add a rejected field later only when an observed workflow cannot be supported without it.
