# Persistent Project Rules

## Product thesis

Tourism Signal Radar is a mobile-first decision-support PWA, not a news reader. Its only core chain is:

**Signal → Evidence → Decision → Action**

Optimize for fewer defensible decisions, not more content. Every important actionable Signal should end in the smallest rational next step: **THE MOVE**.

## Canonical concepts

- **Source:** retrievable evidence.
- **Signal:** a reviewed interpretation of a material change; never synonymous with an article.
- **Project:** user-defined decision context; never hard-code project names.
- **Evidence relationship:** Supports, Contradicts, or Contextualizes.
- **Disposition:** Undecided, Monitor, Test, Adopt, or Dismiss—the human decision.
- **Workflow status:** Open or Closed, with closure reason.
- **THE MOVE:** short, bounded, reviewable recommendation; draft until human-confirmed.

Follow `SIGNAL_MODEL.md` and `DECISION_SYSTEM.md` if terminology is disputed.

## Decision philosophy

- Keep Source fact, interpretation, recommendation, and human decision visibly separate.
- Use High/Medium/Low evidence only through deterministic criteria and always show rationale.
- Use P1/P2/P3 only for review order through transparent gates.
- Never add 0–100 confidence, weighted composite scoring, or opaque ranking.
- Match action strength to evidence, stakes, and reversibility.
- Preserve material history; never silently rewrite a past claim, decision, or move.
- Contradictory evidence is first-class and visible.

## AI rules

- AI may extract or draft; it may not confirm facts, evidence quality, relevance, disposition, adoption, dismissal, or THE MOVE.
- AI output is never a Source and never corroboration.
- Generated content must carry provenance and `DRAFT` until user confirmation.
- Every factual assertion must remain traceable to a retrievable Source.
- If a Source cannot be verified, quarantine the claim; do not promote it to evidence.

## Scope constraints

Initial product is single-user and manual. Do not add scraping pipelines, vector databases, RAG, autonomous agents, ML ranking, collaboration, organizations, roles, billing, subscriptions, native apps, browser extensions, push systems, complex dashboards, or automatic methodology changes.

Do not build infrastructure for hypothetical scale. New scope requires observed validation evidence and an updated Product Contract.

## UX principles

- Mobile is canonical; all actions must work comfortably on iPhone-sized screens.
- Radar is finite, priority-led, and has a clear end. No infinite scroll or engagement ranking.
- Use four root destinations: Radar, Watch, Projects, Evidence. Signal Detail is contextual.
- Maintain strong hierarchy: change → relevance → evidence → decision → move → metadata.
- Minimize typing, but never auto-default a judgment.
- One filled primary action per screen.
- Provide designed empty, loading, offline/stale, and error states.
- Use color semantically and redundantly with text/shape; meet WCAG 2.2 AA.
- Avoid dashboard grids, domain rainbows, neon/terminal cosplay, glassmorphism, and unnecessary charts.

## Anti-scope-creep questions

Before accepting a feature, ask:

1. Which link in Signal → Evidence → Decision → Action does it improve?
2. Which observed user failure requires it?
3. Can a simpler manual workflow validate the need?
4. Does it risk turning the product into a feed, reference manager, or project manager?
5. Does it preserve human authority and evidence traceability?

Reject or defer the feature if answers are weak.

## Technical principles for later implementation

- Do not implement until the manual prototype clears `PRODUCT_CONTRACT.md` gates.
- Keep domain rules independent of UI and storage frameworks.
- Enforce Source–Signal many-to-many relationships and explicit relationship types.
- Treat user-defined labels/projects as data, not enums or source code.
- Store material decision changes as append-only events.
- Use deterministic, testable priority/evidence rules; expose rule explanations.
- Make provenance a required part of AI-assisted fields.
- Prefer local-first draft resilience and portable export over premature services.
- Start with the smallest coherent architecture for one user and tens/hundreds of Signals.
- Add dependencies only for a demonstrated need; keep accessibility and mobile performance in acceptance criteria.

## Phase gates

- **Phase 0:** documentation and 10-day manual prototype only.
- **Build gate:** Signal/Source distinction, THE MOVE value, evidence comprehension, processing time, return behavior, and template advantage must pass.
- **Automation gate:** add assistance only after the manual decision workflow works and the measured bottleneck is known.

When uncertain, favor traceability, a smaller move, less metadata, and less automation.
