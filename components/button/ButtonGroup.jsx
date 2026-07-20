import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill ButtonGroup — joins adjacent Buttons into one segmented cluster (role=group). */
export function ButtonGroup({ children, label, className, ...props }) {
  return <div className={cx("cs-btngroup", className)} role="group" aria-label={label} {...props}>{children}</div>;
}
