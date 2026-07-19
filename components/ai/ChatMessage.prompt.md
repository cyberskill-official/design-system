**ChatMessage** — one turn in a Lumi conversation. `role="lumi"` (Ochre genie, left) or `role="user"` (Umber, right). Override `avatar` with the real mascot image where you have it.

```jsx
<div className="cs-chat">
  <ChatMessage role="lumi">Tell me a wish, and I'll share plain advice first.</ChatMessage>
  <ChatMessage role="user">A faster checkout.</ChatMessage>
</div>
```
