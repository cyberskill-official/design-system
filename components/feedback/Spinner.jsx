import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill Spinner — indeterminate loading indicator. */
export function Spinner({ size = 20, label = "Loading", className, style, ...props }) {
  return <span role="status" aria-label={label} className={cx("cs-spinner", className)} style={{ inlineSize: size, blockSize: size, width: size, height: size, ...style }} {...props} />;
}
