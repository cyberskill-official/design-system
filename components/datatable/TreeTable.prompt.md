**TreeTable** — expandable nested rows in a table.

```jsx
<TreeTable defaultExpanded={["p"]} columns={[{key:"name",header:"Item"},{key:"pct",header:"Progress"}]}
  nodes={[{key:"p",name:"Platform",pct:"70%",children:[{key:"ds",name:"Design System",pct:"72%"}]}]}/>
```
