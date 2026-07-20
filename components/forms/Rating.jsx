import React from "react";
import { makeT, useLang } from "../_i18n/i18n.js";
function cx(...c) { return c.filter(Boolean).join(" "); }
const STAR = "M12 2l2.9 6.2 6.6.8-4.9 4.6 1.3 6.5L12 16.9 6.1 20l1.3-6.5L2.5 9l6.6-.8z";

/** CyberSkill Rating — whole-star rating. Controlled or uncontrolled; readOnly for display. Click the current value to clear. */
export function Rating({ value, defaultValue = 0, onChange, max = 5, readOnly = false, label, lang, className }) {
  const [inner, setInner] = React.useState(defaultValue);
  const val = value != null ? value : inner;
  const set = (n) => { if (readOnly) return; const v = n === val ? 0 : n; if (value == null) setInner(v); onChange && onChange(v); };
  const [ref, L] = useLang(lang);
  const lbl = label != null ? label : makeT("Rating", L)("label");
  return (
    <div ref={ref} className={cx("cs-rating", className)} role="radiogroup" aria-label={lbl + ": " + val + " / " + max} data-readonly={readOnly ? "true" : undefined}>
      {Array.from({ length: max }).map((_, i) => (
        <button key={i} type="button" role="radio" aria-checked={i < val} aria-label={(i + 1) + " / " + max} className={i < val ? "on" : undefined} onClick={() => set(i + 1)} tabIndex={readOnly ? -1 : 0}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < val ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true"><path d={STAR} /></svg>
        </button>
      ))}
    </div>
  );
}
