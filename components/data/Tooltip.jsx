import React from "react";
import { cx } from "../_utils/cx.js";

/** CyberSkill Tooltip — hover/focus bubble above the trigger. Keep label short. */
export function Tooltip({ label, children, className }) {
  return (
    <span className={cx("cs-tooltip", className)}>
      {children}
      <span className="cs-tooltip__bubble" role="tooltip">{label}</span>
    </span>
  );
}
