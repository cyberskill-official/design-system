import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill LumiAvatar — the golden-genie mascot avatar. Pass `src` (e.g. lumi-poster.webp) or fall back to the ✦ glyph. */
export function LumiAvatar({ src, size = "md", ring = false, alt = "Lumi", className, ...props }) {
  return (
    <span className={cx("cs-lumi", `cs-lumi--${size}`, ring && "cs-lumi--ring", className)} {...props}>
      {src ? <img src={src} alt={alt} /> : <span aria-hidden="true">✦</span>}
    </span>
  );
}
