# FROZEN — do not develop

This is an early Next.js / Cloudflare (vinext) spike, kept for reference only.

**It is not part of Phase 0 and must not be developed against yet.** Per the
project's own rule (`AGENTS.md`, `docs/mvp-backlog.md`), no software is built
until the lean validation in [`../../VALIDATION.md`](../../VALIDATION.md) passes.

It also already **drifts from the spec** and should not be treated as a
reference implementation. Known deviations to fix *if* it is ever revived:

- `db/schema.ts`: `whyItMatters` is `NOT NULL`, but `docs/signal-model.md` makes
  it **optional** ("omit if project reasons carry all useful meaning").
- No `evidence relationship` richness, WatchTopic, disposition history, or
  append-only `SignalEvent` semantics beyond a bare table.
- Priority / evidence quality are stored as free text with no rubric enforcement.

When (and only when) validation greenlights a build, start from
`docs/mvp-backlog.md` P0 items with a schema derived directly from
`docs/signal-model.md` — not from this spike.
