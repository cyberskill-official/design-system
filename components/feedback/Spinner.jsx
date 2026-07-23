import React from "react";
import { makeT, useLang } from "../_i18n/i18n.js";
import { cx } from "../_utils/cx.js";

/** CyberSkill Spinner — indeterminate loading indicator. */
export function Spinner({ size = 20, label, lang, className, style, ...props }) {
  const [ref, L] = useLang(lang);
  const lbl = label != null ? label : makeT("Spinner", L)("label");
  return <span ref={ref} role="status" aria-label={lbl} className={cx("cs-spinner", className)} style={{ inlineSize: size, blockSize: size, width: size, height: size, ...style }} {...props} />;
}
