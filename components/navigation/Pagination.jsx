import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

function pages(page, count) {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  const out = [1];
  const lo = Math.max(2, page - 1), hi = Math.min(count - 1, page + 1);
  if (lo > 2) out.push("…");
  for (let p = lo; p <= hi; p++) out.push(p);
  if (hi < count - 1) out.push("…");
  out.push(count);
  return out;
}

/** CyberSkill Pagination — page controls with prev/next and ellipsis. */
export function Pagination({ page = 1, pageCount = 1, onChange, className, ...props }) {
  const go = (p) => onChange && p >= 1 && p <= pageCount && p !== page && onChange(p);
  return (
    <nav aria-label="Pagination" className={cx("cs-pagination", className)} {...props}>
      <button type="button" onClick={() => go(page - 1)} disabled={page <= 1} aria-label="Previous page">‹</button>
      {pages(page, pageCount).map((p, i) =>
        p === "…"
          ? <span key={"e" + i} className="cs-pagination__ellipsis" aria-hidden="true">…</span>
          : <button key={p} type="button" aria-current={p === page ? "page" : undefined} onClick={() => go(p)}>{p}</button>
      )}
      <button type="button" onClick={() => go(page + 1)} disabled={page >= pageCount} aria-label="Next page">›</button>
    </nav>
  );
}
