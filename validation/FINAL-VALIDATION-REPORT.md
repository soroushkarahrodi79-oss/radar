# Final Validation Report — Tourism Signal Radar Phase 0

## Validation period

<!-- e.g. 2026-09-01 to 2026-09-12 (10 working days) -->

## Number of real Signals

<!-- Count of rows in signals.csv with at least one human evaluation in validation-log.csv -->

---

## Q1 — Do multi-source Signals genuinely emerge?

> In real use, do several sources fold into one Signal, and do some sources feed more than one Signal? If almost every source becomes its own one-line note, the product is a reader with extra fields.

**Evidence:**

<!-- Summarise the signals.csv data: how many Signals had source_count > 1? How many sources appeared in more than one Signal? -->

**Answer (pass / fail):**

---

## Q2 — Is THE MOVE genuinely useful?

> For actionable Signals, does the bounded next step change or confirm what you actually do — or is it generic advice you'd have written anyway?

**Evidence:**

<!-- From validation-log.csv: how many rows have the_move_useful = yes? What fraction of all evaluated Signals is that? Quote one example that passed and one that failed. -->

**Answer (pass / fail):**

---

## Q3 — Does Radar beat a structured Notion/Obsidian template?

> Be honest: could a linked note template give you the same traceability and follow-through with less friction?

**Evidence:**

<!-- Describe the comparison honestly. What did Radar provide that a template did not? What did a template handle as well or better? -->

**Answer (pass / fail):**

---

## Observed failures

<!-- List any signals, moves, or workflow steps that did not work as expected. Do not omit failures. -->

## Evidence gaps

<!-- List any questions the validation could not answer — e.g. insufficient signals in a category, hard cases not encountered. -->

---

## Final verdict

<!-- Fill in exactly one of: BUILD | REPOSITION / TEMPLATE | KILL -->

**Verdict:**

### Decision rules (from VALIDATION.md)

| Result | Decision |
|---|---|
| All 3 pass | **BUILD** — start from `docs/mvp-backlog.md` P0 items |
| Q1 or Q2 fails | **KILL** — the core bet did not hold |
| Only Q3 fails | **REPOSITION / TEMPLATE** — ship as a Notion/Obsidian template, not software |

Failure triggers a redesign or a template. It must not be reinterpreted as a near-pass or a metric to tune.
