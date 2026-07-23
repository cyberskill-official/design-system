import React from "react";
import { makeT, useLang } from "../_i18n/i18n.js";
import { cx } from "../_utils/cx.js";

/** Fixed-position stack for Toasts (bottom-right). */
export function ToastStack({ children, lang, className }) {
  const [ref, L] = useLang(lang);
  return <div ref={ref} className={cx("cs-toast-stack", className)} role="region" aria-label={makeT("Toast", L)("notifications")}>{children}</div>;
}

/** CyberSkill Toast — transient notification. variant: default | success | danger. */
export function Toast({ variant = "default", title, icon, onClose, lang, children, className, ...props }) {
  const [ref, L] = useLang(lang);
  return (
    <div ref={ref} className={cx("cs-toast", `cs-toast--${variant}`, className)} role="status" {...props}>
      <span className="cs-toast__icon" aria-hidden="true">
        {icon ?? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5 5 11-11" /></svg>}
      </span>
      <div>
        {title ? <div className="cs-toast__title">{title}</div> : null}
        {children ? <div className="cs-toast__body">{children}</div> : null}
      </div>
      {onClose ? (
        <button type="button" className="cs-toast__close" aria-label={makeT("Toast", L)("dismiss")} onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      ) : null}
    </div>
  );
}
