# @cyberskill/primitives

Headless behaviour primitives for the CyberSkill Design System. Per **RFC 2026-003** (framework-agnostic architecture), this package owns *behaviour* — state machines, focus management, ARIA wiring, keyboard handling. It owns *no styling*; that's `@cyberskill/web-components`.

## Wave 1 (shipped 2026-04-26)

| Primitive | What it does | Demo? |
|---|---|---|
| `useDisclosure` / `createDisclosure` | Open/close pattern (modals, drawers, popovers, accordions) | ✅ full + tests |
| `createFocusTrap` | Restrict keyboard focus to a container while active | ✅ skeleton |
| `createTabs` | WAI-ARIA tablist with keyboard navigation | ✅ skeleton |

## Wave 2 (Q1 2027 target)

`useDialog`, `useToast`, `useTooltip`, `useCombobox`, `useMenu`, `useListbox`, `useToggle`, `useCheckbox`, `useRadio`, `useSlider`, `useSwitch`, `useSelect`, `useTooltip` — full coverage of the doctrine's top-12 primitive list per `00-audit-and-roadmap.md` §11.4.

## Conventions

Every primitive exports:

1. **`create*(options)`** — vanilla-JS constructor returning `{state, props, methods, subscribe}`. No framework dependency.
2. **`use*(options)`** — hook-shaped adapter consumed by framework wrappers.

The vanilla constructor is the source of truth; the hook is sugar.

## Test

```bash
cd packages/primitives
node --test src/*.test.mjs
```

(Or `pnpm -r --filter @cyberskill/primitives test` from the workspace root.)

## Doctrine references

- RFC 2026-003 — `Design System/docs/RFCs/2026-003-framework-agnostic-architecture.md`
- `Design System/docs/00-audit-and-roadmap.md` §6 A.2.5 — Headless-primitive option (audit criterion)
- WAI-ARIA Authoring Practices — adopted patterns
