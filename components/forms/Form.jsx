import React from "react";
import { makeT, useLang } from "../_i18n/i18n.js";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill Form — semantic form: collects named field values on submit; shows a bilingual error summary. */
export function Form({ onSubmit, errors = {}, children, lang, className, ...props }) {
  const [ref, L] = useLang(lang);
  const t = makeT("Form", L);
  const keys = Object.keys(errors).filter((k) => errors[k]);
  return (
    <form {...props} ref={ref} className={cx("cs-form", className)} noValidate
      onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); const v = {}; fd.forEach((val, k) => { v[k] = val; }); onSubmit && onSubmit(v); }}>
      {keys.length ? (
        <div className="cs-form__summary" role="alert">
          <b>{t("summary")}</b>
          <ul>{keys.map((k) => <li key={k}>{errors[k]}</li>)}</ul>
        </div>
      ) : null}
      {children}
    </form>
  );
}

/** CyberSkill FormField — label + control + hint/error line (pairs with Form `errors`). */
export function FormField({ label, required = false, hint, error, children, lang, className }) {
  const [ref, L] = useLang(lang);
  const t = makeT("Form", L);
  return (
    <label ref={ref} className={cx("cs-formfield", error && "has-error", className)}>
      <span className="cs-formfield__label">{label}{required ? <em aria-label={t("required")}> *</em> : null}</span>
      {children}
      {error ? <span className="cs-formfield__error" role="alert">{error}</span> : hint ? <span className="cs-formfield__hint">{hint}</span> : null}
    </label>
  );
}
