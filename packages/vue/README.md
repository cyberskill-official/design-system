# @cyberskill/vue

Vue 3.5+ Composition-API wrappers around `@cyberskill/web-components`. Per **RFC 2026-003**, this is a thin wrapper.

## Wave 2 (shipped 2026-04-26)

- `<Button>` — wraps `<cs-button>`
- `useDisclosure` — Vue-reactive adapter for `@cyberskill/primitives/disclosure`

## Wave 3 (Q2 2027)

`<Input>`, `<Modal>`, `<Toast>`, `<Card>`, `<Tabs>`, `<Table>`, `<Nav>`, `<Checkbox>`, `<Radio>`, `<Toggle>`, `<Select>` — completes the top-12.

In the meantime, consumers can use the custom elements directly:

```vue
<template>
  <cs-input label="Email" type="email" required />
  <cs-modal :open="isOpen" title="Confirm">…</cs-modal>
</template>
```

## Usage

```vue
<script setup>
import { Button, useDisclosure } from '@cyberskill/vue';

const dialog = useDisclosure();
</script>

<template>
  <Button variant="primary" @click="dialog.open">Open</Button>
  <cs-modal :open="dialog.isOpen" title="Hello">
    Modal content.
  </cs-modal>
</template>
```

## Vue version

Vue 3.5+ Composition API only. Vue 2 / Options API is not supported (per RFC 2026-003 § Open question 4).
