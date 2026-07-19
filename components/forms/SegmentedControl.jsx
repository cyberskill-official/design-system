import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill SegmentedControl — pill toggle group (single select). Matches the Status Hub lens switcher. */
export function SegmentedControl({ options = [], value, onChange, className, ...props }) {
  return (
    <div role="tablist" className={cx("cs-segmented", className)} {...props}>
      {options.map((o) => (
        <button key={o.value} type="button" role="tab" aria-selected={value === o.value} aria-pressed={value === o.value}
          onClick={() => onChange && onChange(o.value)}>
          {o.icon ? <span aria-hidden="true">{o.icon}</span> : null}
          {o.label}
        </button>
      ))}
    </div>
  );
}
