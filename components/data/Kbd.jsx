import React from "react";
import { cx } from "../_utils/cx.js";

/** CyberSkill Kbd — keyboard key hint. */
export function Kbd({ children, className, ...props }) {
  return <kbd className={cx("cs-kbd", className)} {...props}>{children}</kbd>;
}
