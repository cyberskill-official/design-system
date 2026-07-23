import React from "react";
import { cx } from "../_utils/cx.js";

function Node({ n, depth, selected, onSelect, defaultOpen }) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  const kids = n.children || [];
  return (
    <li role="treeitem" aria-expanded={kids.length ? open : undefined} aria-selected={selected === n.key}>
      <span className={cx("cs-tree__row", selected === n.key && "is-selected")} style={{ paddingInlineStart: depth * 18 + 6 }}>
        {kids.length ? (
          <button type="button" className="cs-tree__twist" aria-hidden="true" tabIndex={-1} onClick={() => setOpen((o) => !o)}>{open ? "▾" : "▸"}</button>
        ) : <span className="cs-tree__twist" aria-hidden="true" />}
        <button type="button" className="cs-tree__label" onClick={() => { onSelect && onSelect(n.key, n); if (kids.length) setOpen((o) => !o); }}>{n.label}</button>
      </span>
      {kids.length && open ? <ul role="group">{kids.map((c) => <Node key={c.key} n={c} depth={depth + 1} selected={selected} onSelect={onSelect} defaultOpen={defaultOpen} />)}</ul> : null}
    </li>
  );
}

/** CyberSkill Tree — expandable hierarchy. nodes: {key,label,children[]}. Single select via onSelect. */
export function Tree({ nodes = [], selected, onSelect, defaultOpen = false, className }) {
  return <ul role="tree" className={cx("cs-tree", className)}>{nodes.map((n) => <Node key={n.key} n={n} depth={0} selected={selected} onSelect={onSelect} defaultOpen={defaultOpen} />)}</ul>;
}
