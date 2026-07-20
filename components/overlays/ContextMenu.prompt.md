**ContextMenu** — right-click menu on a zone ( "-" = separator; `danger` items).

```jsx
<ContextMenu items={[{label:"Duplicate"},"-",{label:"Delete",danger:true}]}>
  <div className="card">Right-click me</div>
</ContextMenu>
```
