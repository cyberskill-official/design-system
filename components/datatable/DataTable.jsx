import React from "react";

function cx(...c) { return c.filter(Boolean).join(" "); }

/**
 * CyberSkill DataTable — semantic table with caption, column scope headers,
 * per-column render, and an empty state. Solid surface (dense content).
 */
export function DataTable({
  caption,
  columns,
  rows,
  rowKey = "id",
  emptyState = "No records",
  className,
}) {
  const normalized = Array.isArray(rows) ? rows : [];
  return (
    <div className={cx("cs-table-wrap", className)}>
      <table className="cs-table">
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          <tr>{columns.map((c) => <th key={c.key} scope="col">{c.header}</th>)}</tr>
        </thead>
        <tbody>
          {normalized.length === 0 ? (
            <tr><td colSpan={columns.length} className="cs-table__empty">{emptyState}</td></tr>
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
