import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill Menubar — app-style horizontal menu bar. menus: [{label, items:[{label,onSelect,danger}|"-"]}]. */
export function Menubar({ menus = [], className }) {
  const [open, setOpen] = React.useState(null);
  const wrap = React.useRef(null);
  React.useEffect(() => {
    if (open == null) return;
    const d = (e) => { if (wrap.current && !wrap.current.contains(e.target)) setOpen(null); };
    const k = (e) => { if (e.key === "Escape") setOpen(null); };
    document.addEventListener("mousedown", d);
    document.addEventListener("keydown", k);
    return () => { document.removeEventListener("mousedown", d); document.removeEventListener("keydown", k); };
  }, [open]);
  return (
    <div ref={wrap} className={cx("cs-menubar", className)} role="menubar">
      {menus.map((m, i) => (
        <span key={i} className="cs-menubar__wrap">
          <button type="button" role="menuitem" aria-haspopup="menu" aria-expanded={open === i} className={cx("cs-menubar__top", open === i && "is-open")}
            onClick={() => setOpen(open === i ? null : i)} onMouseEnter={() => { if (open != null && open !== i) setOpen(i); }}>{m.label}</button>
          {open === i ? (
            <span className="cs-menu__list" role="menu">
              {m.items.map((it, j) => it === "-"
                ? <span key={j} className="cs-menu__sep" />
                : <button key={j} type="button" role="menuitem" className={cx("cs-menu__item", it.danger && "cs-menu__item--danger")} onClick={() => { setOpen(null); it.onSelect && it.onSelect(); }}>{it.label}</button>)}
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}
