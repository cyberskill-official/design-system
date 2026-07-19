import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill TypingIndicator — animated dots for when Lumi is composing a reply. */
export function TypingIndicator({ label = "Lumi is typing", className }) {
  return (
    <span className={cx("cs-typing", className)} role="status" aria-label={label}>
      <span /><span /><span />
    </span>
  );
}
