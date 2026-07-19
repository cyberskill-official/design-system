**Sidebar / NavItem** — vertical app-shell navigation. `NavItem` renders `<a>` (href) or `<button>`; `active` shows the ochre-tint current state.

```jsx
<Sidebar label="Workspace">
  <NavItem icon={<Icon name="sparkle" />} active>Overview</NavItem>
  <NavItem trail={<Badge>3</Badge>}>Projects</NavItem>
</Sidebar>
```
