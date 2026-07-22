**Button** — the primary action control; Umber-filled by default, Ochre focus ring, 44px touch target. Use for the main action in a view; step down to `secondary` / `tertiary` / `ghost` for lower emphasis, `danger` for destructive actions.

```jsx
<Button variant="primary" size="md" onClick={save}>Save wish</Button>
<Button variant="secondary" icon={<Icon name="arrow-right" />}>Learn more</Button>
<Button variant="danger" loading>Deleting…</Button>
```

- **variant**: `primary` (Umber) · `secondary` (outlined) · `tertiary` (subtle raised) · `ghost` · `danger` · `danger-ghost`

- **size**: `xs` · `sm` (36px) · `md` (44px, default) · `lg` (52px)
- **loading** shows a spinner + sets `aria-busy`; **fullWidth** stretches; **icon** adds a leading glyph.
