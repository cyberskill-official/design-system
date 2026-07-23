import React from "react";
import { cx } from "../_utils/cx.js";

/** CyberSkill Steps — horizontal progress stepper. Steps before `current` are done, `current` is active. */
export function Steps({ steps = [], current = 0, className }) {
  return (
    <div className={cx("cs-steps", className)}>
      {steps.map((s, i) => {
        const state = i < current ? "done" : i === current ? "active" : "todo";
        return (
          <div key={i} className={cx("cs-step", `cs-step--${state}`)}>
            <span className="cs-step__marker">{state === "done" ? "✓" : s.n || i + 1}</span>
            <span className="cs-step__title">{s.title}</span>
            {s.body ? <span className="cs-step__body">{s.body}</span> : null}
          </div>
        );
      })}
    </div>
  );
}
