import React from "react";
import { makeT, useLang } from "../_i18n/i18n.js";
import { cx } from "../_utils/cx.js";

/** CyberSkill TypingIndicator — animated dots for when Lumi is composing a reply. */
export function TypingIndicator({ label, lang, className }) {
  const [ref, L] = useLang(lang);
  const lbl = label != null ? label : makeT("TypingIndicator", L)("label");
  return (
    <span ref={ref} className={cx("cs-typing", className)} role="status" aria-label={lbl}>
      <span /><span /><span />
    </span>
  );
}
