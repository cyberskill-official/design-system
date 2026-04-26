# @cyberskill/codemods

Migration codemods from popular React design systems to `@cyberskill/react`. Per audit `§14.16` expansion. Phase 3 ships regex-based transforms that cover ~80% of typical usage; Phase 4 swaps in jscodeshift for AST-aware coverage of edge cases.

## Phase 3 — shipped 2026-04-26

| Source DS | Module | Coverage |
|---|---|---|
| Material UI v5+ | `./material` | Button (color/variant), TextField, Switch, Card, Modal, Tabs |
| Shopify Polaris (2025 unified) | `./polaris` | Button (variant/tone), TextField, Toggle, Banner, Card, Tabs |
| IBM Carbon 11+ | `./carbon` | Button (kind), TextInput, Tile/ClickableTile, Toggle, InlineNotification, Modal, Tabs, Checkbox, Radio |

## Usage

```bash
# Material UI → CyberSkill, single file
pnpm dlx @cyberskill/codemods material src/Button.tsx

# Polaris → CyberSkill, dry-run on a glob
pnpm dlx @cyberskill/codemods polaris 'src/**/*.tsx' --dry-run

# Carbon → CyberSkill, JSON summary for CI
pnpm dlx @cyberskill/codemods carbon src/index.tsx --json
```

## Programmatic

```js
import { transformMaterial } from '@cyberskill/codemods/material';

const before = readFileSync('src/Button.tsx', 'utf8');
const { source, changes, warnings } = transformMaterial(before);
console.log(`${changes.length} rules fired; ${warnings.length} warnings.`);
```

## Hard guarantees

1. **Anchor immutables** (Umber + Ochre) are never overridden — codemods never touch token values.
2. **Manual review required** — every codemod emits warnings for cases that don't auto-translate (theme tokens, sx-style props, app providers).
3. **Reversible** — codemods produce text edits to existing files; standard `git diff` shows what changed.
4. **No file moves** — codemods only edit content. Restructuring is a manual job.

## What gets warned about

- Material `sx={{...}}` — no token map exists; manual conversion needed.
- Material `createTheme` / `useTheme` — replace with `@cyberskill/react` ThemeProvider.
- Polaris `<AppProvider>` / `<Page>` — restructure to `<ThemeProvider>` + DashboardTemplate.
- Carbon `<Theme>` wrapper / SCSS `@use` lines — replace with `@cyberskill/tokens` CSS imports.
- Carbon SCSS variables (`$ui-01` etc.) — map to CyberSkill semantic tokens.

## Doctrine references

- Audit recommendation `§14.16` — "Detailed migration codemods"
- `Design System/docs/part-16-adoption-designops.md` — adoption playbook
- `Design System/docs/RFCs/2026-003-framework-agnostic-architecture.md`
