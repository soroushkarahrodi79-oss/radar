# Final Validation Report — Tourism Signal Radar Phase 0

> Status: this is an **intermediate evaluation**, not a closed report. See
> "Evaluación intermedia" below for why no verdict is issued yet, and
> "Experimento mínimo pendiente" for exactly what remains.

## Validation period

Signals on record span **2026-08-24 to 2026-09-03** (11 calendar days). This
is a report on the evidence that exists *now*, not a claim that the 10-working-day
/ 2-week window defined in `VALIDATION.md` has closed — nothing in the repo
records a start/end date for the window, so completeness cannot be asserted
either way.

## Number of real Signals

**7** rows in `signals.csv`, all 7 with a matching human evaluation in
`validation-log.csv` (RAD-001 through RAD-007). This is below the 10–15
target range stated in `VALIDATION.md`.

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

**Answer (pass / fail): neither — insufficient evidence to apply either
label honestly.** The narrow existence claim (multi-source signals occur)
is supported. The two claims the question actually depends on — source
reuse across signals, and synthesis adding value over aggregation — are not
evidenced by anything currently logged.

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
on, and 3 of those 4 carry no stated reason. A 100% "useful" rate with no
`reject` outcome recorded at all is also, on its face, an untested claim:
there is no logged case where a human found a move unhelpful, so the
question "does this fail on some real move?" has not been given the
opportunity to fail. No such failing example exists in the log — none is
invented here.

Separately: `contradiction_present = no` for all 7 signals. `VALIDATION.md`
explicitly calls for forcing a contradiction case at least once — this has
not happened yet, and a contradiction case is exactly where a generic
"why it matters" line would be expected to diverge most from a genuinely
bounded MOVE.

**Answer (pass / fail): neither.** The self-reported usefulness rate is
clean (7/7) but self-reported usefulness with zero rejections is a weak
signal on its own; the harder behavioral proxy (act vs. ignored) is a
minority (3/7), and the one hard case the protocol requires (contradiction)
has not been tested at all.

---

## Q3 — Does Radar beat a structured Notion/Obsidian template?

**Evidence:**

None. Neither `signals.csv` nor `validation-log.csv` contains any row or
note describing a side-by-side comparison against a Notion/Obsidian
template. This comparison has not been executed.

**Answer (pass / fail): cannot be answered.** No PASS or FAIL is declared
here — there is nothing to evaluate against.

---

## Observed failures

None recorded. No row in `validation-log.csv` marks `the_move_useful = no`
or `human_decision = reject`. This is a gap in coverage, not evidence of a
flawless system — see Evidence gaps below.

## Evidence gaps

1. **No contradiction case logged** (`contradiction_present` is `no` for all
   7 rows), though `VALIDATION.md` requires forcing one.
2. **No "signal that deserves no move" logged** — all 7 rows carry a
   proposed MOVE; there is no record of a signal correctly identified as
   not warranting one.
3. **No Q3 template comparison run.**
4. **Source reuse across signals is untracked** — no Sources file exists to
   confirm or deny that individual sources feed more than one Signal.
5. **No field distinguishes "synthesis added value" from "sources merely
   co-occurred."**
6. **Zero `reject` outcomes and zero `the_move_useful = no` outcomes** — the
   log has not yet captured a case where THE MOVE failed, so Q2's harder
   claim is untested on the downside.
7. **Signal count (7) is below the 10–15 target** in `VALIDATION.md`.
8. **`ignored` reasons are inconsistent** — 3 of 4 ignored rows give no
   explanation, making it impossible to tell deliberate deferral (as in
   RAD-005) apart from low priority or disagreement with the move.

---

## Evaluación intermedia (estado provisional)

The decision table below, unchanged from `VALIDATION.md`/`validation/README.md`,
has three outcomes: **BUILD** (all 3 pass), **KILL** (Q1 or Q2 fails), and
**REPOSITION / TEMPLATE** (only Q3 fails). None of these can be applied
honestly right now:

- Q1 and Q2 are **neither clean passes nor clean fails** on the evidence
  above — each has a supported partial claim and an unevidenced harder
  claim.
- Q3 has **no evidence at all**, so it cannot be marked failed (that would
  require a comparison that was run and lost) or passed.

Declaring BUILD would launder an untested Q3 and an untested contradiction
case into a pass. Declaring KILL would treat "not yet evidenced" as "failed,"
which is a different claim and not supported by the log. Declaring
REPOSITION/TEMPLATE would assert Q3 failed when it was never run. None of
these are available without either inventing evidence or reinterpreting a
gap as a result — both are excluded by `validation/README.md`'s "AI must
never interpret a failure as a partial pass" and by not fabricating data.

This is **not** a fourth decision category added to the protocol, and it
does not change the BUILD / KILL / REPOSITION rule in `VALIDATION.md`. It
is a statement that the rule cannot yet be applied, pending the minimum
evidence below.

---

## Final verdict

**Verdict:** _(intentionally left blank — see "Evaluación intermedia" above)_

### Decision rules (from VALIDATION.md)

| Result | Decision |
|---|---|
| All 3 pass | **BUILD** — start from `docs/mvp-backlog.md` P0 items |
| Q1 or Q2 fails | **KILL** — the core bet did not hold |
| Only Q3 fails | **REPOSITION / TEMPLATE** — ship as a Notion/Obsidian template, not software |

Failure triggers a redesign or a template. It must not be reinterpreted as a
near-pass or a metric to tune.

---

## Experimento mínimo pendiente (para cerrar Q3 y un caso de contradicción)

Two bounded, cheap experiments close the evidence gaps that block a verdict.
Neither result is predicted or assumed here.

**1. Q3 — template replication test (~30–45 minutes, one sitting)**

Pick one already-logged multi-source signal that was acted on (RAD-004,
RAD-006, or RAD-007 — all `act`). Reconstruct that same signal, its
evidence links, and its MOVE by hand in a linked Notion or Obsidian note
using only backlinks/templates, timed from a blank page. Log, honestly, in
one paragraph: which parts Radar's structure gave "for free" that the
template took extra steps to reproduce (if any), and which parts the
template handled just as well or with less friction. This is exactly the
comparison `VALIDATION.md` Q3 asks for and currently has zero instances of.

**2. One forced contradiction case (~30–60 minutes, whenever two
conflicting sources on an existing project are found)**

`VALIDATION.md` explicitly sanctions deliberately seeking this case (it is
listed as one of the hard cases to force at least once), so this is not a
staged-corpus violation. Find two sources that actually disagree on an
existing project (e.g., an official comparator vs. an independent estimate
on HATI-Madrid or SNTO/TFM), log it as RAD-008 with
`contradiction_present = yes`, and evaluate it through the normal protocol
— a human, not AI, fills `the_move_useful` and `human_decision` in
`validation-log.csv`.

**What each result would mean:**

- Q3 experiment favors Radar (template took visibly more manual steps to
  reach the same traceability) **and** the contradiction case is marked
  useful/acted → both open questions close in Radar's favor; combined with
  the already-positive lean on Q1/Q2 (majority multi-source, majority
  self-reported useful), the case for **BUILD** strengthens, though the
  ignored-reason gap and low signal count (7) would still be worth closing
  before committing.
- Q3 experiment shows the template matches Radar with less friction, while
  Q1/Q2 still read positively overall → **REPOSITION / TEMPLATE**, per the
  existing rule (only Q3 fails).
- Contradiction case is marked **not useful** or **rejected** → this is the
  first real datapoint against Q2's clean 7/7 usefulness rate; if it holds
  up alongside the existing 4/7 ignored pattern, that pushes toward
  **KILL**, since Q2 failing on its own is sufficient per the rule.

No outcome is fabricated or assumed above — these are the three branches
the existing decision rule already defines; running the two experiments is
what lets one of them apply honestly.
