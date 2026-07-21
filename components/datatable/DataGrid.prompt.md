**DataGrid** — sortable + selectable table with sticky header.

```jsx
<DataGrid selectable selected={sel} onSelect={setSel} rowKey="key"
  columns={[{key:"name",header:"Project",sortable:true},{key:"pct",header:"Progress",sortable:true}]} rows={rows}/>
```

**filterText / filterKeys / pinned** (7.0): client filter query, optional key subset, and sticky column pin.
