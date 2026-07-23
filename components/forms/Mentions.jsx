import React from "react";
import { makeT, useLang } from "../_i18n/i18n.js";
import { cx } from "../_utils/cx.js";

/** CyberSkill Mentions — textarea that suggests @users while typing. */
export function Mentions({ value, defaultValue = "", onChange, users = [], placeholder, rows = 3, lang, className }) {
  const [inner, setInner] = React.useState(defaultValue);
  const val = value != null ? value : inner;
  const set = (v) => { if (value == null) setInner(v); onChange && onChange(v); };
  const [q, setQ] = React.useState(null);
  const [ref, L] = useLang(lang);
  const t = makeT("Mentions", L);
  const ph = placeholder != null ? placeholder : t("placeholder");
  const onInput = (v) => {
    set(v);
    const m = /(^|\s)@(\w*)$/.exec(v);
    setQ(m ? m[2].toLowerCase() : null);
  };
  const hits = q == null ? [] : users.filter((u) => u.toLowerCase().includes(q)).slice(0, 6);
  const pick = (u) => { set(val.replace(/(^|\s)@\w*$/, "$1@" + u + " ")); setQ(null); };
  return (
    <span ref={ref} className={cx("cs-mentions", className)}>
      <textarea className="cs-field__control" rows={rows} value={val} placeholder={ph} onChange={(e) => onInput(e.target.value)} />
      {hits.length ? (
        <span className="cs-mentions__pop" role="listbox">
          {hits.map((u) => <button key={u} type="button" role="option" onMouseDown={(e) => { e.preventDefault(); pick(u); }}>@{u}</button>)}
        </span>
      ) : null}
    </span>
  );
}
