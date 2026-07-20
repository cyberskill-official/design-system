import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill Masonry — column-packed gallery (CSS columns). */
export function Masonry({ columns = 3, gap = 16, children, className, style }) {
  return (
    <div className={cx("cs-masonry", className)} style={{ columnCount: columns, columnGap: gap, ...style }}>
      {React.Children.map(children, (c) => <div className="cs-masonry__item" style={{ marginBottom: gap }}>{c}</div>)}
    </div>
  );
}
