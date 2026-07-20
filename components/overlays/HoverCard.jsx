import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill HoverCard — hover/focus-triggered rich preview panel (delayed open/close). */
export function HoverCard({ trigger, children, openDelay = 150, closeDelay = 200, className }) {
  const [open, setOpen] = React.useState(false);
  const t1 = React.useRef(); const t2 = React.useRef();
  const show = () => { clearTimeout(t2.current); t1.current = setTimeout(() => setOpen(true), openDelay); };
  const hide = () => { clearTimeout(t1.current); t2.current = setTimeout(() => setOpen(false), closeDelay); };
  React.useEffect(() => () => { clearTimeout(t1.current); clearTimeout(t2.current); }, []);
  return (
    <span className={cx("cs-hovercard", className)} onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {trigger}
      {open ? <span className="cs-hovercard__panel" role="dialog">{children}</span> : null}
    </span>
  );
}
