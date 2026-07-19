import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill Badge — compact status label. variant: neutral | solid | ochre | success | danger | warning | info. */
export function Badge({ variant = "neutral", dot = false, children, className, ...props }) {
  return (
    <span className={cx("cs-badge", variant !== "neutral" && `cs-badge--${variant}`, className)} {...props}>
      {dot ? <span className="cs-badge__dot" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
