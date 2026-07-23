import React from "react";
import { cx } from "../_utils/cx.js";

/** CyberSkill Toggle — a single pressable on/off button (≠ Switch: no form semantics; ≠ SegmentedControl: standalone). */
export function Toggle({ pressed, defaultPressed = false, onChange, icon, children, disabled = false, className, ...props }) {
  const [inner, setInner] = React.useState(defaultPressed);
  const on = pressed != null ? pressed : inner;
  const flip = () => { const v = !on; if (pressed == null) setInner(v); onChange && onChange(v); };
  return (
    <button type="button" className={cx("cs-toggle", className)} aria-pressed={on} disabled={disabled} onClick={flip} {...props}>
      {icon ? <span aria-hidden="true" style={{ display: "inline-flex" }}>{icon}</span> : null}
      {children}
    </button>
  );
}
