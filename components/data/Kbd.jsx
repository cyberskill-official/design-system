import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill Kbd — keyboard key hint. */
export function Kbd({ children, className, ...props }) {
  return <kbd className={cx("cs-kbd", className)} {...props}>{children}</kbd>;
}
