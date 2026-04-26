# @cyberskill/svelte

Svelte 5+ runes wrappers around `@cyberskill/web-components`. Per **RFC 2026-003** § Open question 5 (Svelte 5+ only; Svelte 4 sunset 2026).

## Wave 2 (shipped 2026-04-26)

- `<Button>` — wraps `<cs-button>`
- `useDisclosure` — runes-friendly adapter

## Usage

```svelte
<script lang="ts">
  import { Button, useDisclosure } from '@cyberskill/svelte';

  const dialog = useDisclosure();
  let isOpen = $state(dialog.state.isOpen);
  dialog.subscribe(() => { isOpen = dialog.state.isOpen; });
</script>

<Button variant="primary" onclick={dialog.open}>Open</Button>

<cs-modal open={isOpen || undefined} title="Hello">
  Modal content.
</cs-modal>
```

## Wave 3 (Q2 2027)

Adds `<Input>`, `<Modal>`, `<Toast>`, `<Card>`, `<Tabs>`, `<Table>`, `<Nav>`, `<Checkbox>`, `<Radio>`, `<Toggle>`, `<Select>` Svelte wrappers. Until then, use `<cs-*>` custom elements directly in templates.
