import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill Tabs — data-driven tablist, controlled by value/onChange. Ochre underline on active. */
export function Tabs({ tabs = [], value, onChange, className, ...props }) {
  return (
    <div role="tablist" className={cx("cs-tabs", className)} {...props}>
      {tabs.map((t) => (
        <button key={t.value} type="button" role="tab" aria-selected={value === t.value}
          className="cs-tab" onClick={() => onChange && onChange(t.value)}>
          {t.label}
          {t.count != null ? <span className="cs-tab__count">{t.count}</span> : null}
        </button>
      ))}
    </div>
  );
}

/** A single tab button, for hand-composed tablists. */
export function Tab({ selected = false, count, children, className, ...props }) {
  return (
    <button type="button" role="tab" aria-selected={selected} className={cx("cs-tab", className)} {...props}>
      {children}
      {count != null ? <span className="cs-tab__count">{count}</span> : null}
    </button>
  );
}
