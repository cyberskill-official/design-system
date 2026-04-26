# @cyberskill/react

React 19 wrappers around `@cyberskill/web-components`. Per **RFC 2026-003**, this is a thin wrapper — it adds React-idiomatic types and event-name normalisation but no behaviour, styling, or a11y wiring.

## Wave 1 (shipped 2026-04-26)

| Component | Wraps | Hook |
|---|---|---|
| `<Button>` | `<cs-button>` | `useDisclosure` (from `@cyberskill/primitives`) |

## Wave 2 (Q1 2027)

`<Input>`, `<Modal>`, `<Toast>`, `<Card>`, `<Tabs>`, `<Table>`, `<Nav>`, `<Checkbox>`, `<Radio>`, `<Toggle>`, `<Select>` — completes the top-12.

## Usage

```tsx
import { Button, useDisclosure } from '@cyberskill/react';

export function App() {
  const dialog = useDisclosure();
  return (
    <>
      <Button variant="primary" onClick={dialog.open}>
        Open dialog
      </Button>
      {dialog.isOpen && <p>Modal content goes here.</p>}
    </>
  );
}
```

## SSR

Custom-element registration is deferred to client (`useEffect`). React 19's `use server` boundaries are respected; the component renders as a custom-element tag during SSR and hydrates client-side.

## Doctrine references

- RFC 2026-003 — `Design System/docs/RFCs/2026-003-framework-agnostic-architecture.md`
- `Design System/docs/part-3a-actions.md` — Button spec (canonical)
