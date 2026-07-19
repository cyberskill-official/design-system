import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill Popover — anchored floating panel. Uncontrolled (click toggles) or controlled. */
export function Popover({ trigger, children, align = "start", open: controlled, onOpenChange, className }) {
  const [u, setU] = React.useState(false);
  const open = controlled != null ? controlled : u;
  const set = (v) => (onOpenChange ? onOpenChange(v) : setU(v));
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const d = (e) => { if (ref.current && !ref.current.contains(e.target)) set(false); };
    const k = (e) => { if (e.key === "Escape") set(false); };
    document.addEventListener("mousedown", d);
    document.addEventListener("keydown", k);
    return () => { document.removeEventListener("mousedown", d); document.removeEventListener("keydown", k); };
  }, [open]);
  return (
    <span className={cx("cs-popover", className)} ref={ref}>
      <span onClick={() => set(!open)} aria-haspopup="dialog" aria-expanded={open}>{trigger}</span>
      {open ? <div className={cx("cs-popover__panel", align === "end" && "cs-popover__panel--end")} role="dialog">{children}</div> : null}
    </span>
  );
}
