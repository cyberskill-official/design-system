import React from "react";
import { cx } from "../_utils/cx.js";

/** CyberSkill Slider — brand-tinted native range input. Pass native props (min/max/step/value/onChange). */
// `children` is destructured but never rendered on purpose: keeps stray children out of {...props} → void <input>.
export function Slider({ className, children, ...props }) {
  return <input type="range" className={cx("cs-slider", className)} {...props} />;
}
