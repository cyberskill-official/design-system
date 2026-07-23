import React from 'react';

/**
 * Shared CSF matrix helpers — exhaustive size × variant × key-state grids
 * without hand-rolling nested maps in every story file.
 */

/** Cartesian product of axis value arrays → array of combo objects. */
export function cartesian(axes) {
  const entries = Object.entries(axes).filter(([, vals]) => Array.isArray(vals) && vals.length);
  if (!entries.length) return [{}];
  return entries.reduce(
    (acc, [key, vals]) => acc.flatMap((row) => vals.map((v) => ({ ...row, [key]: v }))),
    [{}],
  );
}

/** Default + one-flag-true rows for interactive state argTypes. */
export function stateCombos(keys = []) {
  const present = keys.filter(Boolean);
  const rows = [{}];
  for (const key of present) {
    rows.push({ [key]: true });
  }
  return rows;
}

/** Label for a combo (e.g. `primary · md · loading`). */
export function comboLabel(combo, order = Object.keys(combo)) {
  const parts = [];
  for (const key of order) {
    if (!(key in combo)) continue;
    const v = combo[key];
    if (v === true) parts.push(key);
    else if (v === false || v == null) continue;
    else parts.push(String(v));
  }
  return parts.join(' · ') || 'default';
}

/** Flex/grid wrapper used by exhaustive CSF stories. */
export function MatrixGrid({ children, gap = 12, minWidth = 120, style }) {
  return (
    <div
      data-csf-matrix-grid
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap,
        alignItems: 'flex-start',
        ...style,
      }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div key={child?.key ?? i} style={{ minWidth }} data-csf-matrix-cell>
              {child}
            </div>
          ))
        : children}
    </div>
  );
}
