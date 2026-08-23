# Tourism Signal Radar

A single-user decision tool for tourism researchers and destination analysts.
It turns a material external change into a **traceable, defensible next move**:

> **Signal → Evidence → Decision → Action**

It is deliberately **not** an RSS reader, a reference manager, or a project tracker.
The unit of value is a reviewed **Signal** (an interpreted change backed by one or
more Sources), ending — when warranted — in **THE MOVE**: the smallest rational next step.

---

## Current phase

**Phase 0 — validate before build.**

No production software is being built yet. The single goal right now is to prove,
with real signals, that the reviewed-Signal workflow beats a plain note template.
See **[VALIDATION.md](VALIDATION.md)** for the lean 2-week test and the go/kill rule.

The decision to write real software is gated on that test — not on how good the
documents look.

---

## Repository structure

| Path | What it is |
|---|---|
| [`docs/`](docs/) | The product spec: contract, signal model, decision system, UX, design. Source of truth. |
| [`AGENTS.md`](AGENTS.md) | Persistent rules for any human or AI working on the project. |
| [`VALIDATION.md`](VALIDATION.md) | The lean Phase-0 test that decides whether we build. |
| [`prototype/`](prototype/) | The manual test instrument: an Excel workbook + its generator/verifier scripts. This is the actual Phase-0 tool. |
| [`spikes/web/`](spikes/web/) | **Frozen** early Next.js/Cloudflare spike. Not part of Phase 0. Do not develop against it until validation passes — it already drifts from the spec. |

## The manual prototype

The Phase-0 test runs on a structured Excel workbook (already generated):

`prototype/output/tourism_signal_radar_manual_prototype.xlsx`

It is a manual decision notebook — no automation, no scraping, no AI. You capture
Sources, write Signals, link evidence, assign priority via transparent gates, and
record a disposition + THE MOVE. That is the whole test.

## Canonical concepts (30-second version)

- **Source** — retrievable evidence. Never AI output.
- **Signal** — a reviewed interpretation of a *material change*. Never "an article".
- **Evidence relationship** — Supports · Contradicts · Contextualizes.
- **Evidence quality** — HIGH / MEDIUM / LOW by deterministic rubric. No 0–100 scores.
- **Priority** — P1 / P2 / P3 for *review order only*, via transparent gates.
- **Disposition** — Undecided · Monitor · Test · Adopt · Dismiss (the human decision).
- **THE MOVE** — a bounded, reviewable next step. Draft until a human confirms it.

Full definitions live in [`docs/signal-model.md`](docs/signal-model.md) and
[`docs/decision-system.md`](docs/decision-system.md).
