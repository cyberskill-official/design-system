**DataGrid** — sortable + selectable table with sticky header.

```jsx
<DataGrid selectable selected={sel} onSelect={setSel} rowKey="key"
  columns={[{key:"name",header:"Project",sortable:true},{key:"pct",header:"Progress",sortable:true}]} rows={rows}/>
```

**filterText / filterKeys / pinned:** client filter query, optional key subset, and sticky column pin.

**virtual / virtualThreshold / rowHeight:** windowed body rows for large datasets (auto when rows ≥ 80). Sets `data-virtual="true"` and `data-row-count`.

**persistKey:** stores column order in `localStorage` under `cs:datagrid:cols:<persistKey>`; pin control reorders a column to first.
