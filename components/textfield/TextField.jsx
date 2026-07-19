import React from "react";

function cx(...c) { return c.filter(Boolean).join(" "); }

let uid = 0;
function useId(prefix) {
  const [id] = React.useState(() => `${prefix}-${++uid}`);
  return id;
}

/**
 * CyberSkill TextField — label + input with optional description and error.
 * Programmatic label association and aria-describedby wiring; IME-safe.
 */
export function TextField({
  id,
  label,
  description,
  error,
  disabled = false,
  readOnly = false,
  className,
  children,
  ...props
}) {
  const generatedId = useId("cs-textfield");
  const inputId = id ?? generatedId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <label
      className={cx("cs-field", disabled && "is-disabled", error && "is-invalid", className)}
      htmlFor={inputId}
    >
      <span className="cs-field__label">{label}</span>
      {description ? <span id={descriptionId} className="cs-field__description">{description}</span> : null}
      <input
        {...props}
        id={inputId}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className="cs-field__control"
      />
      {error ? <span id={errorId} className="cs-field__error" role="alert">{error}</span> : null}
    </label>
  );
}
