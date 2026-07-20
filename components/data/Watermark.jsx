import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill Watermark — repeats rotated text behind children (draft/confidential marking). */
export function Watermark({ text = "CyberSkill", opacity = 0.09, gap = 140, rotate = -22, children, className }) {
  const svg = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${gap}" height="${gap}"><text x="50%" y="50%" font-family="Be Vietnam Pro, sans-serif" font-size="14" font-weight="700" fill="#45210E" fill-opacity="${opacity}" text-anchor="middle" transform="rotate(${rotate} ${gap / 2} ${gap / 2})">${String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;")}</text></svg>`
  );
  return (
    <div className={cx("cs-watermark", className)} style={{ position: "relative" }}>
      {children}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `url("data:image/svg+xml,${svg}")` }} />
    </div>
  );
}
