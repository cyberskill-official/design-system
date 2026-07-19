**Menu / MenuItem** — dropdown anchored to a `trigger`. Uncontrolled (click toggles; outside-click / Escape close) or controlled via `open`/`onOpenChange`. `align="end"` right-aligns.

```jsx
<Menu trigger={<button className="cs-button cs-button--secondary cs-button--sm">Actions</button>}>
  <MenuItem>Duplicate</MenuItem>
  <div className="cs-menu__sep" />
  <MenuItem danger>Delete</MenuItem>
</Menu>
```
