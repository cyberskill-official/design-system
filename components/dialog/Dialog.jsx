import React from "react";

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
  closeLabel = "Close",
  ...props
}) {
  const titleId = useId("cs-dialog") + "-title";
  if (!open) return null;
  return (
    <div className="cs-dialog-layer">
      <div className="cs-dialog__overlay" onClick={onClose} aria-hidden="true" />
      <section
        {...props}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cx("cs-dialog", className)}
      >
        <header className="cs-dialog__header">
          <h2 id={titleId} className="cs-dialog__title">{title}</h2>
          {onClose ? (
            <button type="button" className="cs-button cs-button--ghost cs-button--sm" onClick={onClose} aria-label={closeLabel}>✕</button>
          ) : null}
        </header>
        <div className="cs-dialog__body">{children}</div>
        {actions ? <footer className="cs-dialog__actions">{actions}</footer> : null}
      </section>
    </div>
  );
}
