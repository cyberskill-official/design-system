**Form + FormField** — named-field collection + bilingual error summary; optional controller: `rules` validate on submit, `name`d FormFields auto-wire value/onChange + per-field errors.

```jsx
<Form rules={{email:["required", v=>/.+@.+/.test(v)?null:"Enter a valid email."]}} onSubmit={save}>
  <FormField label="Work email" required name="email"><TextField label="Work email"/></FormField>
  <FormField label="Đồng ý" name="agree" valueProp="checked"><Checkbox label="Đồng ý điều khoản"/></FormField>
  <Button type="submit">Send</Button>
</Form>
```

Manual mode unchanged: omit `rules`/`name`, pass `errors={{email:"…"}}` yourself.

**asyncRules** (7.0): optional map of field name → async `(value, values) => message|null`. Runs after sync `rules` pass; blocks submit while pending.
