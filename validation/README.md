# Validation — Tourism Signal Radar Phase 0

## Purpose

This folder contains the running evidence for the 10-working-day lean validation defined in [`VALIDATION.md`](../VALIDATION.md). The goal is to answer three questions that can kill or greenlight the build, using real signals from real work — not a staged corpus.

The validation must answer:

1. Does the multi-source Signal actually happen — or does it collapse into RSS?
2. Is THE MOVE more useful than a "why it matters" line?
3. Does Radar beat a structured Notion/Obsidian template?

## Source of truth

GitHub is the canonical record. All signal entries and human evaluations live in this folder. Do not keep a parallel copy elsewhere.

## Roles

**Scheduled automation or AI may:**
- draft candidate Signal entries in `signals.csv` (signal claim, source count, contradiction flag, proposed THE MOVE)
- propose entries for Sources as reference

**The human must:**
- judge whether THE MOVE was actually useful (yes / no)
- record the decision outcome: `act`, `reject`, or `ignored`
- add any notes that explain the judgment

**AI must never:**
- score its own recommendation
- fill in `the_move_useful` or `human_decision` in `validation-log.csv`
- interpret a failure as a partial pass

## Files

| File | Purpose |
|---|---|
| [`signals.csv`](signals.csv) | One row per Signal captured during the test |
| [`validation-log.csv`](validation-log.csv) | Human evaluation of each Signal's THE MOVE and decision |
| [`FINAL-VALIDATION-REPORT.md`](FINAL-VALIDATION-REPORT.md) | End-of-validation report filled in after day 10 |

## Failure rule

If Q1 or Q2 fails, the verdict is Kill or Reposition. If only Q3 fails, the verdict is Template. Failure must not be reinterpreted as a near-pass. See [`VALIDATION.md`](../VALIDATION.md) for the full go/kill rule.
