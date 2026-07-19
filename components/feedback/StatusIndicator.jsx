import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill StatusIndicator — coloured dot + label. status: online | busy | offline | error. */
export function StatusIndicator({ status = "offline", pulse = false, children, className, ...props }) {
  return (
    <span className={cx("cs-status", `cs-status--${status}`, pulse && "cs-status--pulse", className)} {...props}>
      <span className="cs-status__dot" aria-hidden="true" />
      {children}
    </span>
  );
}
