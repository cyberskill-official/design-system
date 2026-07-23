import React from "react";
import { makeT, useLang } from "../_i18n/i18n.js";
import { cx } from "../_utils/cx.js";

/**
 * CyberSkill DataTable — semantic table with caption, column scope headers,
 * per-column render, and an empty state. Solid surface (dense content).
 */
export function DataTable({
  caption,
  columns,
  rows,
  rowKey = "id",
  emptyState,
  lang,
  className,
}) {
  const normalized = Array.isArray(rows) ? rows : [];
  const [ref, L] = useLang(lang);
  const es = emptyState != null ? emptyState : makeT("DataTable", L)("empty");
  return (
    <div ref={ref} className={cx("cs-table-wrap", className)}>
      <table className="cs-table">
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          <tr>{columns.map((c) => <th key={c.key} scope="col">{c.header}</th>)}</tr>
        </thead>
        <tbody>
          {normalized.length === 0 ? (
            <tr><td colSpan={columns.length} className="cs-table__empty">{es}</td></tr>
          ) : (
            normalized.map((row, i) => (
              <tr key={row[rowKey] ?? i}>
                {columns.map((c) => <td key={c.key}>{c.render ? c.render(row) : row[c.key]}</td>)}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
