import React from "react";
import { makeT, useLang } from "../_i18n/i18n.js";
import { Icon } from "../icon/Icon.jsx";

function cx(...c) { return c.filter(Boolean).join(" "); }

const FOCUSABLE = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'audio[controls]',
  'video[controls]',
  'summary',
  'iframe',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * CyberSkill Dialog — modal overlay + panel. aria-modal, labelled by title and
 * described by its body, scrim click closes. Body scroll is locked while open
 * (prior overflow restored on close/unmount). Compose actions in the footer
 * with Buttons.
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
  const baseId = React.useId();
  const titleId = baseId + "-title";
  const bodyId = children == null ? undefined : baseId + "-body";
  const [ref, L] = useLang(lang);
  const panel = React.useRef(null);
  const closeRef = React.useRef(onClose); closeRef.current = onClose;
  React.useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () => (panel.current ? [...panel.current.querySelectorAll(FOCUSABLE)] : []);
    const first = focusables()[0];
    (first || panel.current) && (first || panel.current).focus();
    const k = (e) => {
      if (e.key === "Escape") { closeRef.current && closeRef.current(); return; }
      if (e.key !== "Tab" || !panel.current) return;
      const f = focusables();
      if (!f.length) { e.preventDefault(); panel.current.focus(); return; }
      const a = f[0], z = f[f.length - 1];
      const active = document.activeElement;
      const inside = panel.current.contains(active);
      // Wrap at either edge; if focus somehow escaped the panel, pull it back in.
      if (e.shiftKey && (!inside || active === a)) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && (!inside || active === z)) { e.preventDefault(); a.focus(); }
    };
    document.addEventListener("keydown", k);
    return () => {
      document.removeEventListener("keydown", k);
      document.body.style.overflow = prevOverflow;
      if (prev && prev.focus) prev.focus();
    };
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
        aria-describedby={bodyId != null ? bodyId : props["aria-describedby"]}
        className={cx("cs-dialog", className)}
      >
        <header className="cs-dialog__header">
          <h2 id={titleId} className="cs-dialog__title">{title}</h2>
          {onClose ? (
            <button type="button" className="cs-button cs-button--ghost cs-button--sm" onClick={onClose} aria-label={cl}>
              <Icon name="close" size="sm" />
            </button>
          ) : null}
        </header>
        <div id={bodyId} className="cs-dialog__body">{children}</div>
        {actions ? <footer className="cs-dialog__actions">{actions}</footer> : null}
      </section>
    </div>
  );
}
