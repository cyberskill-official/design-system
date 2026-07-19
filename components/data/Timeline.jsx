import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill Timeline — vertical event trail. item.state: "done" (default) | "now" | "todo". */
export function Timeline({ items = [], className }) {
  return (
    <div className={cx("cs-timeline", className)}>
      {items.map((it, i) => (
        <div key={i} className={cx("cs-timeline__item", it.state === "now" && "cs-timeline__item--now", it.state === "todo" && "cs-timeline__item--todo")}>
          <span className="cs-timeline__marker" aria-hidden="true">{it.state === "todo" ? "" : it.state === "now" ? "→" : "✓"}</span>
          <div>
            <div className="cs-timeline__title">{it.title}</div>
            {it.meta ? <div className="cs-timeline__meta">{it.meta}</div> : null}
            {it.body ? <div className="cs-timeline__body">{it.body}</div> : null}
          </div>
        </div>
      ))}
    </div>
  );
}
