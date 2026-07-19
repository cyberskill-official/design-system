import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill SearchField — pill search input with icon + clear. Controlled or uncontrolled. */
export function SearchField({ value, onChange, onClear, placeholder = "Search…", className, children, ...props }) {
  const [inner, setInner] = React.useState("");
  const val = value != null ? value : inner;
  const set = (v) => (onChange ? onChange(v) : setInner(v));
  return (
    <div className={cx("cs-search", className)}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
      <input {...props} type="text" role="searchbox" value={val} placeholder={placeholder} onChange={(e) => set(e.target.value)} />
      {String(val).length ? (
        <button type="button" className="cs-search__clear" aria-label="Clear search" onClick={() => { set(""); onClear && onClear(); }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      ) : null}
    </div>
  );
}
