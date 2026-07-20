**Form + FormField** — named-field collection on submit + bilingual error summary.

```jsx
<Form onSubmit={save} errors={{email:"Enter a valid email."}}>
  <FormField label="Work email" required error={errs.email}><input name="email" className="cs-field__control"/></FormField>
  <Button type="submit">Send</Button>
</Form>
```
