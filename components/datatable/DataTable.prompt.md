**DataTable** — semantic table with a caption, scoped column headers, per-column `render`, and an empty state. Dense content, so it stays on a solid surface (never glass).

```jsx
<DataTable
  caption="Releases"
  columns={[
    { key: "ver", header: "Version" },
    { key: "date", header: "Ships" },
    { key: "status", header: "Status", render: (r) => <span className={`pill ${r.tone}`}>{r.status}</span> },
  ]}
  rows={releases}
  rowKey="ver"
  emptyState="No releases yet"
/>
```
