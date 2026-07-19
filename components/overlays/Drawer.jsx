import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill Drawer — slide-in side panel with scrim. side: right (default) | left. */
export function Drawer({ open, onClose, title, side = "right", children, actions, className }) {
  React.useEffect(() => {
    if (!open) return;
    const k = (e) => { if (e.key === "Escape") onClose && onClose(); };
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [open]);
  if (!open) return null;
  return (
    <>
      <div className="cs-drawer-scrim" onClick={onClose} aria-hidden="true" />
      <aside className={cx("cs-drawer", side === "left" && "cs-drawer--left", className)} role="dialog" aria-modal="true" aria-label={typeof title === "string" ? title : "Panel"}>
        <div className="cs-drawer__header">
          {title ? <h2 className="cs-drawer__title">{title}</h2> : null}
          <button type="button" className="cs-drawer__close" aria-label="Close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
        <div className="cs-drawer__body">{children}</div>
        {actions ? <div className="cs-drawer__footer">{actions}</div> : null}
      </aside>
    </>
  );
}
