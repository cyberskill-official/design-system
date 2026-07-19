import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** Fixed-position stack for Toasts (bottom-right). */
export function ToastStack({ children, className }) {
  return <div className={cx("cs-toast-stack", className)} role="region" aria-label="Notifications">{children}</div>;
}

/** CyberSkill Toast — transient notification. variant: default | success | danger. */
export function Toast({ variant = "default", title, icon, onClose, children, className, ...props }) {
  return (
    <div className={cx("cs-toast", `cs-toast--${variant}`, className)} role="status" {...props}>
      <span className="cs-toast__icon" aria-hidden="true">
        {icon ?? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5 5 11-11" /></svg>}
      </span>
      <div>
        {title ? <div className="cs-toast__title">{title}</div> : null}
        {children ? <div className="cs-toast__body">{children}</div> : null}
      </div>
      {onClose ? (
        <button type="button" className="cs-toast__close" aria-label="Dismiss" onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      ) : null}
    </div>
  );
}
