import React from "react";
import { makeT, useLang } from "../_i18n/i18n.js";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill NumberField — numeric stepper with −/+ buttons and clamping. */
export function NumberField({ value, onChange, min, max, step = 1, disabled = false, lang, className, children, ...props }) {
  const [inner, setInner] = React.useState(0);
  const val = value != null ? value : inner;
  const clamp = (n) => { if (min != null) n = Math.max(min, n); if (max != null) n = Math.min(max, n); return n; };
  const set = (n) => { const c = clamp(n); onChange ? onChange(c) : setInner(c); };
  const [ref, L] = useLang(lang);
  const t = makeT("NumberField", L);
  return (
    <div ref={ref} className={cx("cs-stepper", className)}>
      <button type="button" aria-label={t("decrease")} disabled={disabled || (min != null && val <= min)} onClick={() => set(val - step)}>−</button>
      <input type="number" value={val} min={min} max={max} step={step} disabled={disabled} onChange={(e) => set(Number(e.target.value))} {...props} />
      <button type="button" aria-label={t("increase")} disabled={disabled || (max != null && val >= max)} onClick={() => set(val + step)}>+</button>
    </div>
  );
}
