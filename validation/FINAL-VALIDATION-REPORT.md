# Final Validation Report — Tourism Signal Radar Phase 0

> **Status: CLOSED.** This report was intermediate until the owner decision
> of 2026-09-20 recorded in [`PROJECT_STATUS.md`](../PROJECT_STATUS.md).
> Phase 0 is closed. The standalone build is not authorized. See "Owner
> decision" below for the disposition and its grounds.

## Validation period

Signals on record span **2026-08-24 to 2026-09-03** (11 calendar days), with
**no new organic signals logged after 2026-09-03**. This is a report on the
evidence that exists, not a claim that the 10-working-day / 2-week window
defined in `VALIDATION.md` ran to completion — nothing in the repo records a
formal start/end date for the window.

## Number of real Signals

**7** rows in `signals.csv`, all 7 with a matching human evaluation in
`validation-log.csv` (RAD-001 through RAD-007). This is below the 10–15
target range stated in `VALIDATION.md`. The validation stopped at 7 organic
signals; no additional signal was added to reach the target, and none is
added by this report.

---

## Q1 — Do multi-source Signals genuinely emerge?

**Evidence:**

- `multi_source = yes` (source_count ≥ 2) in **5 of 7** signals (71%):
  RAD-002 (2), RAD-003 (3), RAD-004 (2), RAD-006 (3), RAD-007 (2).
- `multi_source = no` (source_count = 1) in 2 of 7: RAD-001, RAD-005.

This supports the first half of Q1 as written in `VALIDATION.md` ("do
several sources fold into one Signal") — most logged signals are not
one-source-per-note.

**What this evidence does not show:**

- The second half of Q1 — "do some sources feed more than one Signal" —
  cannot be checked from `signals.csv`/`validation-log.csv`. These files
  record only a `source_count` per signal, not individual source
  identifiers. There is no Sources table in this repo linking specific
  sources across signal rows, so source reuse across signals is unverified.
- Existence of multi-source signals is not the same as the synthesis adding
  value. The schema has no field recording whether combining N sources
  produced an interpretation the human could not have gotten from reading
  each source separately (vs. simple concatenation). No such judgment is
  logged anywhere.

**Verdict: partial, and closed partial.** The narrow existence claim
(multi-source signals occur) is supported (5/7). The claim Q1 actually
depends on — that synthesis across sources adds incremental value over
reading each source separately — was never adequately demonstrated in the
7-signal record and no further signals will be collected to test it. This
report does not convert "not demonstrated" into either a pass or a fail; it
records the gap as final.

---

## Q2 — Is THE MOVE genuinely useful?

**Evidence:**

- `the_move_useful = yes` in **7 of 7** rows (100%).
- `human_decision`: **act = 3** (RAD-004, RAD-006, RAD-007), **ignored = 4**
  (RAD-001, RAD-002, RAD-003, RAD-005). **reject = 0**.
- Notes distinguish *why* signals were ignored in only one case: RAD-005 was
  deliberately deferred ("to avoid reopening HATI scope during publication
  closure") — a scope decision, not a judgment that the move was weak.
  RAD-001, RAD-002, RAD-003 give no reason beyond "no action was taken."

**What this evidence does not show:**

"Useful" and "acted on" are different claims, and the protocol in
`VALIDATION.md` asks specifically whether THE MOVE "changes or confirms
what you actually do" — that is the `act`/`ignored` split, not the
`the_move_useful` column. On that split, only 3 of 7 (43%) evaluated
signals actually changed behavior; 4 of 7 were judged useful but not acted
on, and 3 of those 4 carry no stated reason. `contradiction_present = no`
for all 7 signals, and no row carries `human_decision = reject` or
`the_move_useful = no`.

**Verdict: weak and selection-biased, and closed weak.** Every one of the
7 signals was self-marked useful and none was rejected or marked "no move
deserved" — a 100% positive rate with zero negative cases is evidence of an
untested downside, not evidence of robustness. The question "does THE MOVE
fail on some real case?" was never given the chance to fail: no
contradiction case and no rejection case were ever logged. This report does
not manufacture either case to close the gap; the gap is recorded as the
final state of Q2.

---

## Q3 — Does Radar beat a structured Notion/Obsidian template?

**Evidence (repository):**

None. Neither `signals.csv` nor `validation-log.csv` contains any row or
note describing a side-by-side comparison against a Notion/Obsidian
template. **The formal template comparison defined in `VALIDATION.md` was
not completed and will not be run.**

**Evidence (operational, outside the CSV ledger — owner-supplied):**

- Soroush OS already runs working Notion databases for **Intelligence** and
  **Decisions**.
- That existing workflow already records signals, claims, evidence,
  counterevidence, project links, decision impact, THE MOVE, human outcomes,
  and recheck conditions — i.e., it already covers the schema Radar was
  built to formalize.
- It is already in active use as part of the owner's operating system and
  automations, with no separate maintenance burden.
- No demonstrated benefit from the 7-signal Radar record justifies
  maintaining a second, standalone application for the same job.

**Verdict: no formal comparison ran; operational evidence closes the
question anyway.** The controlled, timed template-replication experiment
described in the prior draft of this report was never executed and is not
retroactively claimed here. Separately from that unrun experiment, the
owner's already-operating Notion workflow constitutes standing evidence
that the core job (capture → evidence/counterevidence → decision impact →
THE MOVE) is already served without a standalone tool. These are two
different kinds of evidence and are not conflated: the formal experiment is
absent; the operational comparator is present and sufficient for the owner
decision below.

---

## Observed failures

None recorded. No row in `validation-log.csv` marks `the_move_useful = no`
or `human_decision = reject`. This remains a gap in coverage, not evidence
of a flawless system, and it is now a permanent gap in this dataset — no
further signals will be added to close it.

## Evidence gaps (final — will not be closed by further logging)

1. **No contradiction case logged** (`contradiction_present` is `no` for all
   7 rows), though `VALIDATION.md` called for forcing one.
2. **No "signal that deserves no move" logged** — all 7 rows carry a
   proposed MOVE; there is no record of a signal correctly identified as
   not warranting one.
3. **No Q3 template comparison run.**
4. **Source reuse across signals is untracked** — no Sources file exists to
   confirm or deny that individual sources feed more than one Signal.
5. **No field distinguishes "synthesis added value" from "sources merely
   co-occurred."**
6. **Zero `reject` outcomes and zero `the_move_useful = no` outcomes** — the
   log never captured a case where THE MOVE failed, so Q2's harder claim is
   untested on the downside.
7. **Signal count (7) is below the 10–15 target** in `VALIDATION.md`.
8. **`ignored` reasons are inconsistent** — 3 of 4 ignored rows give no
   explanation, making it impossible to tell deliberate deferral (as in
   RAD-005) apart from low priority or disagreement with the move.

These gaps are recorded, not resolved. Continuing to log signals solely to
close them — after real signal generation had already stopped for over two
weeks (last organic signal 2026-09-03) — would mean manufacturing evidence
to fit a target sample size. That would **reduce**, not improve, the
evidential integrity of this record, which is why it was not done.

---

## Owner decision (2026-09-20)

**Disposition: KILL_STANDALONE_BUILD / RETAIN_AS_NOTION_METHOD.**

- The standalone Tourism Signal Radar product is **not authorized** for
  development. No MVP, no Gate 1, no further validation campaign follows
  from this report.
- The underlying method — capture a signal, connect evidence and
  counterevidence, determine decision impact, record THE MOVE — is
  **retained** as a way of working inside the existing Soroush OS Notion
  workflow (Intelligence + Decisions databases), which already implements
  it in production use.
- This is an **owner stop decision** grounded in (a) the partial/weak
  statistical record above and (b) the operational comparator: a working,
  already-used Notion system covering the same job with materially lower
  maintenance than a second, standalone application.
- This is **not** a statistically complete experiment. Q1 is partial, Q2 is
  weak and selection-biased, and Q3's formal comparison never ran. The
  decision does not claim otherwise. It is a stop grounded in the
  available evidence plus the operational comparator, not a claim that the
  original protocol concluded on its own terms.

### Decision rules as originally defined (for record only — not applied as a clean pass/fail)

| Result | Decision |
|---|---|
| All 3 pass | **BUILD** — start from `docs/mvp-backlog.md` P0 items |
| Q1 or Q2 fails | **KILL** — the core bet did not hold |
| Only Q3 fails | **REPOSITION / TEMPLATE** — ship as a Notion/Obsidian template, not software |

None of these three rows describes what actually happened: no question
cleanly passed or cleanly failed under the original protocol. The owner
decision above is a separate, explicit stop made with that ambiguity
acknowledged, not a forced fit into one of these rows.

## Final verdict

**KILL_STANDALONE_BUILD. Method retained inside the existing Notion
workflow.** See [`PROJECT_STATUS.md`](../PROJECT_STATUS.md) for the
canonical status record.
