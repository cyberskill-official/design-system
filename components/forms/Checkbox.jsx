import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill Checkbox — native checkbox (brand accent-color) + label/description. */
export function Checkbox({ label, description, disabled = false, className, children, ...props }) {
  return (
    <label className={cx("cs-check", disabled && "is-disabled", className)}>
      <input type="checkbox" disabled={disabled} {...props} />
      <span className="cs-check__text">
        <span>{label}</span>
        {description ? <span className="cs-check__desc">{description}</span> : null}
      </span>
    </label>
  );
}
