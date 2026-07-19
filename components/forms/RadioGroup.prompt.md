**RadioGroup / Radio** — single-choice radios in a labelled fieldset, controlled by `value`/`onChange`. Brand accent-color.

```jsx
<RadioGroup legend="Plan" value={plan} onChange={setPlan}
  options={[{value:"mo",label:"Monthly"},{value:"yr",label:"Annual",description:"Two months free"}]} />
```
