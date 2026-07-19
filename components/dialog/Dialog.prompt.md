**Dialog** — modal overlay + centred panel. `aria-modal`, labelled by title, overlay-click closes. Compose footer actions with `Button`s. Goes near-fullscreen on narrow viewports.

```jsx
<Dialog
  open={open}
  title="Send your wish?"
  onClose={() => setOpen(false)}
  actions={<>
    <Button variant="secondary" onClick={() => setOpen(false)}>Not now</Button>
    <Button onClick={submit}>Send wish</Button>
  </>}
>
  A real person on the team replies within one business day.
</Dialog>
```

- Pair with Heavy Glass (`className="cs-surface-heavy"`) only after checking APCA against the backdrop.
