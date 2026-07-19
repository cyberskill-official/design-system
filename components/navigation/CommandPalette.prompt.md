**CommandPalette** — ⌘K overlay with search + grouped, filterable actions (Escape / scrim-click close). Controlled via `open`/`onClose`.

```jsx
<CommandPalette open={open} onClose={() => setOpen(false)} groups={[
  { label: "Go to", items: [{ label: "Dashboard", shortcut: "G D", onSelect: goDash }] },
]} />
```
