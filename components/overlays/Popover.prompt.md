**Popover** — floating panel with interactive content, anchored to a trigger. Uncontrolled or controlled; `align="end"` right-aligns.

```jsx
<Popover trigger={<button className="cs-button cs-button--secondary cs-button--sm">Filter</button>}>
  <RadioGroup legend="Status" options={statusOptions} value={s} onChange={setS} />
</Popover>
```
