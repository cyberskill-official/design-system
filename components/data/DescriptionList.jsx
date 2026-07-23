import React from "react";
import { cx } from "../_utils/cx.js";

/** CyberSkill DescriptionList — term/value metadata grid. */
export function DescriptionList({ items = [], className, ...props }) {
  return (
    <dl className={cx("cs-dl", className)} {...props}>
      {items.map((it, i) => (
        <div key={i}>
          <dt>{it.term}</dt>
          <dd>{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
