# @cyberskill/react-native

React Native primitives for the CyberSkill Design System. Per **RFC 2026-003** + the §14.7 expansion entry (RN cross-platform compatibility). Closes audit criterion **A6.3 → 4** path; → 5 once Phase 4 ships the full top-12 + per-component compatibility matrix.

## What's here (Phase 3 — shipped 2026-04-26)

| Component / hook | Status |
|---|---|
| `<Button>` | ✅ shipping (variants × sizes × loading + reduced-motion) |
| `<ThemeProvider>` + `useTheme` + `useTokens` | ✅ shipping (light / dark / high-contrast / sepia) |
| `TOKENS` constants | ✅ shipping (mirrors DTCG JSON; Phase 4 auto-generates) |

## What's next (Phase 4)

`<Input>`, `<Modal>`, `<Toast>`, `<Card>`, `<Tabs>`, `<Table>` (FlatList wrapper), `<Nav>`, `<Checkbox>`, `<Radio>`, `<Toggle>`, `<Select>` — completes the top-12. Plus the per-component RN-compatibility matrix (audit §14.7).

## Architecture

RN cannot consume `@cyberskill/web-components` (no custom-element runtime). Instead this package re-implements the styled layer using RN primitives (`Pressable`, `Text`, `View`, `ActivityIndicator`). **Behaviour** still comes from `@cyberskill/primitives` (the headless layer); **tokens** still come from `@cyberskill/tokens` (re-exported as JS constants in `./tokens.ts`).

This means:
- The React, Vue, Svelte, and RN packages all share the same primitive API.
- The same token name (`color.semantic.danger`) resolves to the same value across platforms.
- A11y semantics are platform-native (RN `accessibilityRole`, `accessibilityState`, `AccessibilityInfo` for reduced-motion).

## Usage

```tsx
import { ThemeProvider, Button } from '@cyberskill/react-native';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Button variant="primary" onPress={() => console.log('pressed')}>
        Save
      </Button>
    </ThemeProvider>
  );
}
```

## Doctrine references

- RFC 2026-003 — `Design System/docs/RFCs/2026-003-framework-agnostic-architecture.md`
- `Design System/docs/00-audit-and-roadmap.md` §14.7 — RN expansion entry
- `Design System/docs/part-3a-actions.md` — Button spec (canonical)
