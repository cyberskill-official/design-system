import React from "react";
import { cx } from "../_utils/cx.js";

/** CyberSkill ProgressBar — determinate progress. variant: ochre (default) | umber | success. */
export function ProgressBar({ value = 0, max = 100, variant, label, className }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cx("cs-progress", variant && `cs-progress--${variant}`, className)}
      role="progressbar" aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={max} aria-label={label}>
      <span className="cs-progress__fill" style={{ inlineSize: pct + "%", width: pct + "%" }} />
    </div>
  );
}
