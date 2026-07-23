import React from "react";
import { cx } from "../_utils/cx.js";

/** CyberSkill Switch — accessible toggle (role="switch"); Umber on, Ochre knob-track in dark. */
// `children` is destructured but never rendered on purpose: keeps stray children out of {...props} → void <input>.
export function Switch({ label, disabled = false, className, children, ...props }) {
  return (
    <label className={cx("cs-switch", disabled && "is-disabled", className)}>
      <input type="checkbox" role="switch" disabled={disabled} {...props} />
      <span className="cs-switch__track" aria-hidden="true" />
      {label ? <span className="cs-switch__label">{label}</span> : null}
    </label>
  );
}
