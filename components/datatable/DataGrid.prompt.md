**DataGrid** — sortable + selectable table with sticky header.

```jsx
<DataGrid selectable selected={sel} onSelect={setSel} rowKey="key"
  columns={[{key:"name",header:"Project",sortable:true},{key:"pct",header:"Progress",sortable:true}]} rows={rows}/>
```
