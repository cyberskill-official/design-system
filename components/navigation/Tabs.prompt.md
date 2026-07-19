**Tabs / Tab** — underlined tablist (Ochre active indicator), controlled by `value`/`onChange`. Wire your own panels via `aria-controls`.

```jsx
<Tabs value={lens} onChange={setLens}
  tabs={[{value:"board",label:"Board"},{value:"table",label:"Table",count:6}]} />
```
