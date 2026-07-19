**Card** — warm content panel (14px radius, soft shadow). Compose with `CardHeader` / `CardBody` / `CardFooter`. `interactive` makes it a hoverable button; add `className="cs-surface-standard"` for glass over imagery.

```jsx
<Card interactive onClick={open}>
  <CardHeader title="Design System v1.6" subtitle="Platform squad" />
  <CardBody>Liquid Glass bindings + 50 style packs.</CardBody>
  <CardFooter><Badge variant="ochre">Now</Badge></CardFooter>
</Card>
```
