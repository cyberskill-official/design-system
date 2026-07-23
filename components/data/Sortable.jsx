import React from "react";
import { cx } from "../_utils/cx.js";

/** CyberSkill Sortable — drag-to-reorder list (HTML5 DnD). items: [{key,label}]; onChange(newItems). */
export function Sortable({ items = [], onChange, className }) {
  const [dragKey, setDragKey] = React.useState(null);
  const [over, setOver] = React.useState(null);
  const drop = () => {
    if (dragKey == null || over == null || dragKey === over) { setDragKey(null); setOver(null); return; }
    const from = items.findIndex((i) => i.key === dragKey);
    const to = items.findIndex((i) => i.key === over);
    const next = [...items];
    next.splice(to, 0, next.splice(from, 1)[0]);
    onChange && onChange(next);
    setDragKey(null); setOver(null);
  };
  return (
    <ul className={cx("cs-sortable", className)}>
      {items.map((it) => (
        <li key={it.key} draggable
          className={cx("cs-sortable__item", dragKey === it.key && "is-dragging", over === it.key && "is-over")}
          onDragStart={() => setDragKey(it.key)}
          onDragOver={(e) => { e.preventDefault(); setOver(it.key); }}
          onDrop={drop} onDragEnd={drop}>
          <span className="cs-sortable__grip" aria-hidden="true">⠿</span>{it.label}
        </li>
      ))}
    </ul>
  );
}
