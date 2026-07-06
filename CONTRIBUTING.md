# Contributing to the CyberSkill Design System

Cảm ơn bạn — thank you for helping the system grow. This guide is the short operational companion to `README.md` (the operating manual) and `DESIGN.md` (the single source of truth). When they disagree, `DESIGN.md` wins.

## The one rule

Substantive changes to `DESIGN.md` require an RFC. Editorial fixes (typos, broken links, prose clarity) do not.

## Change paths

1. Editorial fix (PATCH): edit `DESIGN.md` or `README.md` directly, add a row under `[Unreleased]`/current PATCH in `CHANGELOG.md`, run `npm run verify:all`, open a PR.
2. New capability (MINOR — new tokens, components, style packs, parts): write an RFC first (template referenced in `README.md` §RFC process; drafts live in local `meta/rfcs/`), get a decision, then land doctrine + implementation + changelog together.
3. Breaking change (MAJOR): RFC plus deprecation notice plus migration path. Never touches the anchor immutables (Umber `#45210E`, Ochre `#F4BA17`, slogans, Vietnamese-first, voice axes, APCA floor).

## Before you open a PR

```bash
npm install
npm run verify:all        # tokens, packs (50/50), components, bundle budgets, artifacts — must be GREEN
npm run audit             # CSAF audit; fails on unapproved score regressions vs docs/audit-baseline.json
```

The audit gate implements the no-silent-regression policy: if your change drops a criterion score, either fix it or record a signed override and update the baseline in the same PR (`npm run audit:baseline`), explaining why in the PR description.

## Style-pack contributions

Read `packages/style-packs/AUTHORING.md`. Hard laws: scoped selectors only, no anchor overrides, `.cs-button` stays ≥ 44px, focus never removed, APCA floors hold in light mode.

## Conduct

Warm, direct, honest, respectful — the same voice axes the system ships with. English and Vietnamese are both welcome in issues and PRs.
