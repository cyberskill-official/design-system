import React from "react";
import { makeT, useLang } from "../_i18n/i18n.js";

function cx(...c) { return c.filter(Boolean).join(" "); }

let uid = 0;
function useId(prefix) {
  const [id] = React.useState(() => `${prefix}-${++uid}`);
  return id;
}

/**
 * CyberSkill Dialog — modal overlay + panel. aria-modal, labelled by title,
 * scrim click closes. Compose actions in the footer with Buttons.
 */
export function Dialog({
  open,
  title,
  children,
  actions,
  onClose,
  className,
  closeLabel,
  lang,
  ...props
}) {
  const titleId = useId("cs-dialog") + "-title";
  const [ref, L] = useLang(lang);
  const panel = React.useRef(null);
  const closeRef = React.useRef(onClose); closeRef.current = onClose;
  React.useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    const SEL = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
    const p = panel.current;
    const first = p ? p.querySelector(SEL) : null;
    (first || p) && (first || p).focus();
    const k = (e) => {
      if (e.key === "Escape") { closeRef.current && closeRef.current(); return; }
      if (e.key !== "Tab" || !panel.current) return;
      const f = [...panel.current.querySelectorAll(SEL)];
      if (!f.length) return;
      const a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };
    document.addEventListener("keydown", k);
    return () => { document.removeEventListener("keydown", k); if (prev && prev.focus) prev.focus(); };
  }, [open]);
  const cl = closeLabel != null ? closeLabel : makeT("Dialog", L)("close");
  if (!open) return null;
  return (
    <div ref={ref} className="cs-dialog-layer">
      <div className="cs-dialog__overlay" onClick={onClose} aria-hidden="true" />
      <section
        {...props}
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cx("cs-dialog", className)}
      >
        <header className="cs-dialog__header">
          <h2 id={titleId} className="cs-dialog__title">{title}</h2>
          {onClose ? (
            <button type="button" className="cs-button cs-button--ghost cs-button--sm" onClick={onClose} aria-label={cl}>✕</button>
          ) : null}
        </header>
        <div className="cs-dialog__body">{children}</div>
        {actions ? <footer className="cs-dialog__actions">{actions}</footer> : null}
      </section>
    </div>
  );
}
