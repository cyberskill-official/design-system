import React from "react";
import { makeT, useLang } from "../_i18n/i18n.js";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill DataGrid — advanced table: sortable columns, selectable rows, sticky header scroll area. */
export function DataGrid({ columns = [], rows = [], rowKey = "id", selectable = false, selected = [], onSelect, height = 280, caption, empty, lang, className }) {
  const [sort, setSort] = React.useState(null); // {key, dir}
  const [ref, L] = useLang(lang);
  const t = makeT("DataGrid", L);
  const sorted = React.useMemo(() => {
    if (!sort) return rows;
    const col = columns.find((c) => c.key === sort.key);
    const val = (r) => (col && col.sortValue ? col.sortValue(r) : r[sort.key]);
    return [...rows].sort((a, b) => { const x = val(a), y = val(b); return (x > y ? 1 : x < y ? -1 : 0) * (sort.dir === "asc" ? 1 : -1); });
  }, [rows, sort, columns]);
  const allSel = selectable && rows.length && rows.every((r) => selected.includes(r[rowKey]));
  const toggleAll = () => onSelect && onSelect(allSel ? [] : rows.map((r) => r[rowKey]));
  const toggle = (k) => onSelect && onSelect(selected.includes(k) ? selected.filter((x) => x !== k) : [...selected, k]);
  return (
    <div ref={ref} className={cx("cs-datagrid", className)} style={{ maxBlockSize: height }}>
      <table className="cs-table">
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          <tr>
            {selectable ? <th scope="col" className="cs-datagrid__selcol"><input type="checkbox" aria-label={t("selectAll")} checked={!!allSel} onChange={toggleAll} /></th> : null}
            {columns.map((c) => (
              <th key={c.key} scope="col" aria-sort={sort && sort.key === c.key ? (sort.dir === "asc" ? "ascending" : "descending") : undefined}>
                {c.sortable ? (
                  <button type="button" className="cs-datagrid__sort" onClick={() => setSort((s) => (!s || s.key !== c.key ? { key: c.key, dir: "asc" } : s.dir === "asc" ? { key: c.key, dir: "desc" } : null))}>
                    {c.header}<span aria-hidden="true">{sort && sort.key === c.key ? (sort.dir === "asc" ? " ▲" : " ▼") : " ↕"}</span>
                  </button>
                ) : c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 ? (
            <tr><td colSpan={columns.length + (selectable ? 1 : 0)} className="cs-table__empty">{empty != null ? empty : t("empty")}</td></tr>
          ) : sorted.map((r, i) => {
            const k = r[rowKey] != null ? r[rowKey] : i;
            return (
              <tr key={k} className={selected.includes(k) ? "is-selected" : undefined}>
                {selectable ? <td className="cs-datagrid__selcol"><input type="checkbox" aria-label={t("selectRow")} checked={selected.includes(k)} onChange={() => toggle(k)} /></td> : null}
                {columns.map((c) => <td key={c.key}>{c.render ? c.render(r) : r[c.key]}</td>)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
