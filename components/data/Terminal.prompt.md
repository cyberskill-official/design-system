**Terminal** — console block with prompt input (onCommand → output).

```jsx
<Terminal welcome="Type `help`." onCommand={(c)=>c==="help"?"wish · status · clear":"command not found: "+c}/>
```
