# Phase 0 — Lean Validation

This replaces the heavy 10-day instrumented study in `docs/product-contract.md`
for the **solo, single-user** case. Same purpose, a third of the cost.

The original protocol (12–18 curated signals, day-5 and day-10 interviews, SUS,
processing-time instrumentation, field-audit sheets) is research-grade usability
science. For one researcher validating their own tool, most of that measures
*refinements* before proving the *core bet*. We test the core bet first.

## The only three questions that can kill or greenlight this

Everything else is a refinement you tune *after* these pass.

1. **Does the multi-source Signal actually happen — or does it collapse into RSS?**
   In real use, do several sources fold into one Signal, and do some sources feed
   more than one Signal? If almost every source becomes its own one-line note,
   the product is a reader with extra fields. **Kill.**

2. **Is THE MOVE more useful than a "why it matters" line?**
   For actionable signals, does the bounded next step change or confirm what you
   actually do — or is it generic advice you'd have written anyway? If it reads
   like a templated closing sentence, the differentiation is gone. **Kill.**

3. **Does this beat a Notion/note template?**
   Be honest: could a linked note template give you the same traceability and
   follow-through with less friction? If yes, **use the template and stop here.**

## Running evidence

All signals, human evaluations, and the final report live in [`validation/`](validation/). GitHub is the source of truth. See [`validation/README.md`](validation/README.md) for the logging protocol.

## The test (≈2 weeks, real work only)

- Use the workbook in `prototype/output/` on **your actual signals** (TFM / work),
  not a curated corpus. Aim for **10–15 real signals** as they naturally occur.
- **One line of logging per signal** — no stopwatch, no SUS, no separate audit
  sheets. For each signal jot: `#sources`, was THE MOVE useful? (y/n), did you act
  on it or deliberately reject it? (act / reject / ignored).
- Deliberately force the hard cases at least once each: a **multi-source** signal,
  a **contradiction**, and a signal that **deserves no move**. These are where the
  model earns its keep.
- End of week 2: answer the three questions in one paragraph each. That's the report.

## Go / kill rule

| Result | Decision |
|---|---|
| All 3 pass | **Build** the MVP — start from `docs/mvp-backlog.md` P0 items. |
| Q1 or Q2 fails | **Kill or reposition.** The core bet didn't hold. |
| Only Q3 fails | Ship as a **Notion/Obsidian template**, not software. Cheaper, same value. |

Failure triggers a redesign or a template, not a reinterpretation of the metric.

## What we intentionally dropped (and why it's safe)

- **Median processing-time thresholds, SUS** — speed is a refinement; it only
  matters once you know the workflow is worth doing at all.
- **Curated 12–18 signal corpus with seeded/user split** — authoring cost shows up
  naturally in real use; a staged corpus mostly tests the corpus.
- **Day-5 / day-10 interviews** — for n=1 (you), the interview is just the week-2
  paragraph. Add structured interviews only when you test a *second* user.
- **The prototype's heavier sheets** (Field Audit, Daily Sessions, Review Log) —
  keep Radar, Signals, Sources, Evidence Links, Projects. Trim the rest; they
  instrument a study we're not running yet.

If and when a second real user appears, re-introduce the structured interview and
one timing measure. Not before.
