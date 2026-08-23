# Tourism Signal Radar — Design System

## Visual philosophy

Tourism Signal Radar should feel like a calm intelligence brief annotated by a rigorous researcher. It borrows the density and seriousness of an intelligence terminal, the traceability of a research notebook, and the decisiveness of a cockpit—without imitating terminal chrome, financial tickers, or control-room spectacle.

Design priorities:

1. decision hierarchy;
2. evidence legibility;
3. compact scanning;
4. restrained semantics;
5. comfortable long-form reading.

Decoration never competes with uncertainty or action.

## Mode recommendation

Ship **light and dark modes**, following the operating-system preference, because the mobile PWA may be used in varied field conditions. Design light mode first for evidence readability and print/export compatibility; validate dark mode independently rather than inverting colors mechanically.

The product must not use dark mode as a shortcut to “intelligence” aesthetics.

## Typography

Use a highly legible UI sans-serif with tabular numerals and broad platform availability. A system stack is acceptable. Do not mix a display face into MVP.

| Role | Mobile guidance | Use |
|---|---|---|
| Display | 28/34, 700 | Radar date or rare empty-state headline |
| Title | 22/28, 700 | screen and Signal titles |
| Section | 17/22, 650 | major Detail sections |
| Body | 16/23, 400 | claims, rationales, Source notes |
| Compact body | 14/19, 450 | card metadata and list rows |
| Label | 12/16, 650, modest tracking | categories and section labels |
| Micro | 11/15, 500 | timestamps/provenance; never essential alone |

Rules:

- body text never below 14 px; critical content stays at 16 px;
- use sentence case, including badges and actions;
- reserve all caps for compact categorical codes such as P1, not headings;
- line length on wider screens: 45–75 characters;
- do not use font weight alone to express state.

## Spacing and geometry

Use a 4 px base with primary increments: 4, 8, 12, 16, 24, 32, 40, 48.

- screen gutters: 16 px on narrow mobile, 20–24 px on larger screens;
- card internal padding: 14–16 px;
- section separation: 24–32 px;
- related label/value gap: 4–8 px;
- list-row minimum height: 52 px;
- interactive target minimum: 44×44 px;
- corners: 10–12 px cards, 8–10 px controls, full pill only for short filters/statuses.

Avoid nested cards. Use section dividers and background layers to express containment.

## Surface and elevation

Use three visual layers:

1. **Canvas:** application background.
2. **Section:** subtle grouped background for Radar groups or Detail sections.
3. **Raised control:** sheets, menus, and the active THE MOVE component.

Prefer borders and tonal difference to large shadows. One soft elevation token is sufficient for sheets/sticky controls. Glass blur is not part of the system.

## Semantic color architecture

Color roles must not overlap. Exact values are selected later by contrast testing; the semantics are fixed now.

### Neutral foundation

- `canvas`, `surface`, `surface-raised`
- `text-primary`, `text-secondary`, `text-muted`
- `border`, `border-strong`

Most of the interface uses neutral colors.

### One accent family: interaction

Use a restrained blue or blue-violet family only for selected navigation, links, focus, and the primary action. It must not also encode evidence or priority.

### Priority: structure, not traffic-light color

- P1: strong leading rule, high-contrast label, and top placement;
- P2: medium rule/label emphasis;
- P3: quiet neutral label.

Priority is primarily communicated through order, label, weight, and border thickness. A single warm accent may support P1, but red is reserved for destructive actions and critical errors. P1 is not synonymous with danger.

### Evidence: one ordered hue family

Use one blue-green family with lightness/saturation steps for HIGH/MEDIUM/LOW plus explicit text labels. Contradiction uses a distinct patterned/icon treatment and text `Contradictory evidence`; it is not merely “low evidence.”

Evidence colors never style buttons or domains.

### Workflow and outcomes

- open/neutral: neutral outline;
- completed/resolved: reserved success green plus icon/text;
- draft/unconfirmed: dashed border and neutral/amber text;
- destructive/error: red, used sparingly;
- stale/warning: amber with text explanation.

### Domains

Domains use neutral text chips or optional icons. Do not assign every domain a color. Domain is taxonomy, not urgency.

## Contrast and non-color cues

- meet WCAG 2.2 AA: 4.5:1 normal text, 3:1 large text and meaningful UI components;
- every color-coded state includes a label and, where useful, icon/shape;
- focus indicators remain visible in both modes;
- test evidence and accent hues under common color-vision deficiencies;
- avoid placing muted text on tinted surfaces without explicit contrast checks.

## Card system

### Radar Signal card

An edge-to-edge list card with:

- priority rule and label;
- title, up to two lines;
- one-line material change;
- project context;
- evidence label/contradiction marker;
- disposition or review trigger.

One card should normally occupy 112–152 px vertically. Expanded cards are a user action, not the default.

### Evidence row

A list row, not a decorative card. Show Source title, publisher/date, type, relationship, and a compact origin/peer-review note when relevant.

### Project and Watch rows

Use consistent list geometry with entity name, decision question/context, attention count, and last material change. No image thumbnails.

### Card rules

- one boundary per object;
- no cards inside cards;
- no more than two badges in the primary row;
- secondary metadata can wrap into a detail line;
- the entire non-interactive card area opens Detail;
- explicit inline controls have 44 px targets and do not conflict with card tapping.

## Labels and badges

Use badges only for compact, categorical state that affects interpretation:

- P1/P2/P3
- High/Medium/Low evidence
- Open/Closed
- Draft
- Contradiction

Disposition (`Test`, `Monitor`, etc.) can use an icon-plus-text compact label. Projects and domains are chips, not status badges.

Every badge uses text. Avoid colored dots without labels.

## Evidence display

The evidence header uses:

> **Medium evidence**  
> One direct official source confirms availability; intended tourism performance is untested.  
> 2 support · 1 contradiction · Reviewed 20 Aug

The category is subordinate to the rationale. Source relationship uses text plus icon:

- `+ Supports`
- `↔ Context`
- `! Contradicts`

Do not use star ratings, meters, progress bars, percentages, or shield graphics that imply certification.

## Priority representation

Priority appears as `P1`, `P2`, or `P3` with the accessible expansion:

- P1 — Decide or contain now
- P2 — Review and monitor
- P3 — Retain as context

On first use and in filters, show the expansion. In compact cards, the code is acceptable after onboarding. The priority explanation is one tap away and states which gates fired.

## THE MOVE component

THE MOVE is the strongest component on Signal Detail, but not louder than the Signal title.

### Structure

```text
THE MOVE · Confirmed recommendation

Compare AlphaEarth and the current NDVI indicator on two known sites
before changing the monitoring pipeline.

Why this step
A bounded parity test resolves project-specific uncertainty.

Review when
Comparison and processing-cost estimate are complete.

[Update progress]   More
```

### Visual rules

- use a raised neutral surface with a single interaction-accent rule;
- draft recommendations use a dashed rule and `AI draft — not evidence` label;
- confirmed recommendations use a check icon plus text, not success green unless completed;
- completed moves show outcome, completion date, and access to the prior recommendation;
- keep the main move text at body size or larger;
- no celebratory animation or gamification.

## Forms and controls

- labels remain visible above fields; placeholders are examples, not labels;
- display character guidance for claim and move without punitive countdown styling;
- selection sheets explain disposition consequences;
- judgment fields never receive automatic defaults;
- destructive actions state the history consequence;
- date pickers are optional unless a real deadline/review date is needed;
- auto-save drafts locally, but label server/persistent save state clearly.

## Navigation

### Bottom bar

- four equally spaced destinations;
- icon plus label at all times;
- selected state uses accent, weight, and indicator—not color alone;
- preserve independent scroll position per tab;
- do not hide the bar on scroll.

### Headers

Root surfaces use a compact title/search/create header. Detail uses back, concise object title, and overflow. Primary decisions live in a reachable sticky bottom action region when necessary.

## Icons and imagery

Use a single simple outline icon family. Icons support labels; they do not replace uncommon concepts. Domain emojis may appear in demo seed data but are not the production semantic system because platform rendering varies and can trivialize serious content.

No stock tourism imagery, maps, charts, or illustrations are required in MVP. Empty states may use minimal line diagrams only if they teach the workflow.

## Motion

- 120–200 ms transitions for sheets, selection, and expansion;
- respect `prefers-reduced-motion`;
- no pulsing urgency, live tickers, parallax, or feed-loading animation;
- material-change highlighting fades only after deliberate review, not elapsed viewing time.

## Accessibility and field use

- support Dynamic Type/text scaling to at least 200% without loss of actions;
- meaningful source order for screen readers follows visual hierarchy;
- announce category plus rationale, not isolated codes;
- sticky actions must not cover content or keyboard controls;
- provide clear offline/stale state for field conditions;
- external links state that they leave the app;
- timestamps use locale-aware absolute dates; relative time is supplementary;
- touch targets and spacing accommodate one-handed use and motion in the field;
- error messages identify recovery and preserve typed content.

## Content voice

- concise, analytical, and non-promotional;
- prefer “evidence does not yet establish” to “we are unsure”;
- prefer concrete verbs to innovation jargon;
- name scope and uncertainty;
- never label a Signal “game-changing,” “revolutionary,” or “must-read”;
- use “Source,” “Signal,” “Evidence,” “Decision,” and “Move” consistently.

## Anti-pattern checklist

Reject a design if it introduces:

- infinite scroll or pull-to-refresh as a reward loop;
- a mosaic dashboard on mobile;
- domain rainbow colors;
- red for every P1 Signal;
- numeric confidence gauges;
- glassmorphism, neon, or terminal cosplay;
- multiple filled call-to-action buttons;
- evidence hidden behind a generic “AI summary”;
- status dots without text;
- tiny metadata that contains essential uncertainty;
- charts for counts better expressed in one sentence.

## Validation checklist

Before implementation approval, test static mobile prototypes at 320, 375, and 430 CSS-pixel widths; light/dark mode; default and 200% text; one contradiction-heavy Signal; a long title; three linked Projects; offline/error states; and a Signal with no rational move.
