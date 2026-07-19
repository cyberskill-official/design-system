import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill Breadcrumb — hierarchical trail; last item is current. */
export function Breadcrumb({ items = [], className, ...props }) {
  return (
    <nav aria-label="Breadcrumb" {...props}>
      <ol className={cx("cs-breadcrumb", className)}>
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i}>
              {last
                ? <span className="cs-breadcrumb__current" aria-current="page">{it.label}</span>
                : <><a href={it.href || "#"}>{it.label}</a><span className="cs-breadcrumb__sep" aria-hidden="true">/</span></>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
