# Tourism Signal Radar — Decision System

## Purpose

This system determines how a reviewed Signal is described, ordered, decided, and evolved. It is intentionally transparent and categorical. It does not calculate truth, predict impact, or replace professional judgment.

## Four epistemic layers

Every Signal Detail view must keep these layers visibly separate:

| Layer | Question | Content | Authority |
|---|---|---|---|
| **Source fact** | What does the evidence directly establish? | Extracted or quoted claims tied to Sources | Source, verified by user |
| **Interpretation** | What development do the Sources collectively indicate? | Signal claim, uncertainty, evidence relationships | Analyst/user; AI may draft |
| **Recommendation** | What is the smallest rational next step? | THE MOVE and rationale | Advisory; AI may draft |
| **Human decision** | What will be done? | Disposition, confirmed move, outcome | User only |

AI-generated text must never appear in the Source fact layer. A model output is not corroboration.

## Evidence quality

Evidence quality answers:

> How well does the current evidence establish this Signal claim, within the claim's stated scope?

It does not answer whether the Signal matters, whether the Source is famous, or whether the recommendation will succeed.

### Review dimensions

Review each dimension explicitly; do not average or weight it.

1. **Directness:** does evidence address the claim and intended scope directly?
2. **Origin and authority:** is the Source responsible for the event/data, or merely reporting another source? Is it competent for the claim?
3. **Method transparency:** can the method, sample, assumptions, or release conditions be inspected where applicable?
4. **Independent corroboration:** do independent evidence chains agree? Repeated syndication is one chain.
5. **Challenge state:** is there credible contradiction or a serious unresolved limitation?
6. **Currency:** is the evidence current enough for the claim? Recency is claim-dependent, not inherently better.

Peer review is evidence about process, not a universal trump card. An official release is stronger than a peer-reviewed paper for whether a service launched; a sound study may be stronger for whether it works.

### Deterministic categories

#### HIGH

Use only when all are true:

- at least one competent, traceable Source directly establishes the central claim;
- the primary evidence or method is inspectable enough for the claim type;
- either an independent evidence chain corroborates the claim **or** the claim is a directly verifiable event for which the responsible primary Source is sufficient;
- no credible contradiction undermines the central claim within its stated scope;
- evidence is current enough for the decision.

The rationale must state which route was used: independently corroborated finding or directly verifiable primary event.

#### MEDIUM

Use when the central claim is plausible and decision-relevant but one material limitation remains, such as:

- only one credible but incomplete evidence chain;
- indirect scope match or uncertain transferability;
- partial methodological transparency;
- credible mixed findings that bound but do not defeat the claim;
- older evidence still relevant but needing confirmation.

#### LOW

Use when any of the following governs the claim:

- only commentary, unattributed reporting, or a non-verifiable assertion is available;
- evidence is materially indirect or outside the claim's scope;
- method opacity prevents basic scrutiny;
- a credible contradiction attacks the central claim and cannot yet be resolved;
- the evidence is too stale for the decision.

`LOW` means weakly established, not false and not unimportant.

### Display requirements

Never show the category alone. Show:

- category label;
- one-sentence rationale;
- count of supporting, contradicting, and contextual Sources;
- the dominant limitation when category is not HIGH;
- evidence review date.

### Reassessment triggers

Reapply the rubric when a Source is added/removed, a relationship changes, the claim scope changes, credible contradiction appears, or the evidence becomes stale for the decision. Record category changes in history.

## Priority

Priority answers:

> In what order should this user review Signals for current decisions?

It is not importance in the abstract and is not evidence quality. A low-evidence safety constraint can demand urgent review; a high-evidence scientific advance can remain background.

### Gate questions

Evaluate in order:

1. **Material change:** is this genuinely new or newly strengthened/contradicted since the user last reviewed it?
2. **Project or watch relevance:** does it affect a stated decision question, assumption, threshold, deadline, or active monitoring question?
3. **Decision window:** would delaying review plausibly close an option, increase exposure, or miss a near-term deadline?
4. **Actionability:** can the user make, prepare, test, or deliberately postpone a decision now?
5. **Evidence adequacy:** is there enough evidence to justify at least a bounded response? This may be a verification step rather than adoption.

### Categories

#### P1 — decide or contain now

Assign P1 when:

- there is a material change;
- it has an explicit active-project implication or a time-sensitive watch implication; and
- either a decision window exists **or** a bounded action/test is available now; and
- evidence supports at least that proposed response.

A potentially severe but LOW-quality report may be P1 only if THE MOVE is to verify, contain, or monitor—not to adopt its unverified claim.

#### P2 — review and monitor

Assign P2 when:

- the change is credible enough to track and relevant to a project/watch topic;
- but the decision window is not immediate, action is not yet clear, or more evidence is required.

#### P3 — retain as context

Assign P3 when:

- relevance is indirect or prospective;
- no current project/watch decision changes;
- the item is useful background or early weak evidence.

If there is no material change and no contextual value, do not create a Signal.

### Ordering within a category

Avoid hidden weighting. Order with deterministic tie-breakers:

1. unresolved due/review trigger;
2. explicit decision deadline;
3. confirmed high-attention project link;
4. contradiction or meaningful evidence change since last review;
5. oldest unreviewed item.

Do not order by clicks, popularity, publisher prestige, or raw recency.

### Overrides

The user may override priority, but must select or write a short reason. Show `Rule result: P2 · User override: P1`. Re-evaluate an override at the next review trigger.

## Disposition, status, and execution

Three distinct questions prevent lifecycle ambiguity:

| Dimension | Question | Values |
|---|---|---|
| `disposition` | What has the human decided? | `UNDECIDED`, `MONITOR`, `TEST`, `ADOPT`, `DISMISS` |
| `workflowStatus` | Does the Signal require further attention? | `OPEN`, `CLOSED` plus closure reason |
| `move.executionState` | What happened to the next step? | `NOT_STARTED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED` |

Examples:

- `TEST + OPEN + IN_PROGRESS`: a test is underway.
- `ADOPT + CLOSED/RESOLVED + COMPLETED`: insight was applied; no follow-up remains.
- `MONITOR + OPEN + NOT_STARTED`: wait for a named trigger; the move may be “check the next release.”
- `DISMISS + CLOSED/DISMISSED + CANCELLED`: user deliberately declined action.

“Reading” and “reviewed” are events. “Integrated” is an outcome of adoption. “Archived” is a storage/view choice, not a knowledge state.

## Choosing a disposition

Apply these rules after reviewing evidence and project context:

- **TEST** when a bounded experiment can resolve a material uncertainty at acceptable cost.
- **ADOPT** only when evidence is adequate for the claimed use, the project implication is explicit, and adoption risk is acceptable. HIGH evidence is not automatically required; the reason must match the decision's reversibility and stakes.
- **MONITOR** only with a named review trigger. “Keep an eye on it” is invalid.
- **DISMISS** when evidence is insufficient and no verification is worth the cost, the Signal is irrelevant, or a test/adoption failed for the intended context. Record the reason.
- **UNDECIDED** is temporary. P1 Signals cannot remain undecided beyond their decision window without an explicit defer-until trigger.

## THE MOVE decision rule

### When required

THE MOVE is required for:

- every P1 Signal;
- any Signal with disposition TEST or ADOPT;
- MONITOR when a concrete review trigger can be expressed.

It is optional for P2/P3 background context and absent when no rational action exists. Forcing a move onto every signal produces hollow recommendations.

### Construction sequence

1. Name the decision uncertainty.
2. Identify the smallest action that materially reduces it or contains exposure.
3. Bound scope, time, dataset, location, or cost.
4. Match action strength to evidence strength and reversibility.
5. State what result/condition triggers reconsideration.
6. Check that no inference is presented as Source fact.

### Action ladder

Choose the lowest sufficient rung:

1. **Verify:** retrieve primary evidence or confirm a claim.
2. **Compare:** run a bounded parity or sensitivity check.
3. **Pilot:** test in a limited operational context.
4. **Adopt:** change a project method or operation.
5. **Scale:** expand an already validated change.

Evidence does not map mechanically to a rung. Stakes, reversibility, and project context govern the final human decision. A LOW-quality urgent safety signal may justify verification or temporary containment, not full adoption.

### Move lint

Reject or revise a move if it:

- uses vague verbs such as explore, consider, leverage, or investigate without a boundary;
- merely says read the Source;
- repeats “why it matters”;
- prescribes adoption while acknowledging untested transferability;
- has no completion condition or review trigger;
- claims certainty that the evidence rationale does not support;
- contains several dependent projects disguised as one step.

## Contradictory evidence

Contradiction is a first-class relationship, not a negative tag.

### Procedure

1. Link the Source as `CONTRADICTS` and state exactly which part of the claim it challenges.
2. Check independence: disagreement between copied reports is not independent contradiction.
3. Compare population, geography, time, method, outcome measure, and definitions. Apparent contradiction may be a scope difference.
4. Choose one response:
   - narrow the claim;
   - split one Signal into two context-specific Signals;
   - lower evidence quality;
   - keep the claim but state the unresolved contradiction;
   - supersede the Signal if the central claim no longer holds.
5. Reassess priority and THE MOVE.
6. Preserve the former claim, rationale, decision, and move in history.

Do not “balance” source counts. One direct high-quality contradiction can outweigh several derivative reports, but the rationale—not a hidden weight—must explain the judgment.

## Signal evolution protocol

### New supporting evidence

- Add link and scope note.
- Determine whether it is an independent chain.
- Reapply quality rubric.
- Change priority only if the new evidence creates a decision implication.
- Revise THE MOVE only if the rational next step changed.

### Claim revision

Revise when the original wording is materially too broad, false, or ambiguous. Record old/new text and reason. Minor copy edits need not create history.

### Test outcome

- Record method boundary and outcome.
- A successful test may support ADOPT; it does not prove universal validity.
- A failed test may support DISMISS for this context or a revised test; it does not automatically contradict the external development.
- Update project implication and move.

### Integration/adoption

Record what changed in the Project and the basis date. Close as RESOLVED only if no monitoring trigger remains. Otherwise retain MONITOR and keep OPEN.

### Irrelevance

Close as NO_LONGER_RELEVANT with the context change (project ended, decision passed, scope changed). Do not delete the Signal.

### Supersession

Create a successor when the central development changed enough that editing would destroy interpretive history. Link both directions, close the prior Signal as SUPERSEDED, and place the current move only on the successor.

## AI boundary and provenance

AI may:

- extract candidate metadata;
- draft a concise Source summary;
- propose clustering Sources into a Signal;
- suggest evidence relationships and project links;
- flag possible contradiction;
- draft the Signal claim, evidence rationale, priority result, and THE MOVE.

AI may not:

- create or alter a Source fact without a retrievable citation;
- count its own interpretation as evidence;
- confirm a project link, evidence category, disposition, adoption, dismissal, or move;
- silently revise a claim or history;
- infer independence merely because URLs or publishers differ;
- use model probability as evidence quality.

All generated material carries `DRAFT` and provenance until a human confirms it. Confirmation records who confirmed what and when. If the source cannot be retrieved, the purported fact is quarantined as an unverified note, not promoted to a Signal claim.

## Worked decision examples

### Official capability release

- Fact: responsible provider documents availability.
- Interpretation: capability is accessible, not proven useful for tourism monitoring.
- Evidence: HIGH for availability; unestablished for performance.
- Priority: P1 if an active project is choosing indicators now; otherwise P2.
- Disposition: TEST.
- Move: bounded comparison against current baseline.

### Early report of wildfire restrictions

- Fact: one local report describes a possible access restriction; official notice absent.
- Interpretation: a near-term operating constraint may be emerging.
- Evidence: LOW.
- Priority: P1 because a decision window and exposure exist.
- Disposition: MONITOR pending verification.
- Move: verify with the responsible authority before changing capacity thresholds; set a same-day review trigger.

### Strong but irrelevant paper

- Fact: peer-reviewed study establishes a mobility pattern in a distant context.
- Interpretation: credible background with weak transferability to active projects.
- Evidence: HIGH within the study scope.
- Priority: P3.
- Disposition: DISMISS or no decision; no forced move.

## Decision-system failure checks

Audit weekly during the manual test:

- Are most Signals HIGH? The rubric or claim scope may be too permissive.
- Are most items P1? Priority is being used as importance rather than review order.
- Do MONITOR moves lack triggers? They are parking lots.
- Do Sources and Signals remain one-to-one? The product is drifting toward RSS.
- Are AI drafts confirmed without source inspection? Evidence is contaminated.
- Do users update action, status, and move redundantly? Simplify the lifecycle.
- Are overrides common? The transparent gates do not match the real decision model.
