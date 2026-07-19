**Drawer** — slide-in side panel + scrim (the Status Hub detail pattern). Escape / scrim-click close; `side="left"` for left.

```jsx
<Drawer open={open} onClose={close} title="Design System v1.6"
  actions={<Button>Open project</Button>}>
  <DescriptionList items={meta} />
</Drawer>
```
