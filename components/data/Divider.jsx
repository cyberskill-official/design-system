import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill Divider — hairline rule. `label` centres text; `vertical` for inline splits. */
export function Divider({ vertical = false, label, className, children, ...props }) {
  if (label) {
    return <div className={cx("cs-divider", "cs-divider--label", className)} role="separator" {...props}>{label}</div>;
  }
  return <hr className={cx("cs-divider", vertical && "cs-divider--vertical", className)} aria-orientation={vertical ? "vertical" : "horizontal"} {...props} />;
}
