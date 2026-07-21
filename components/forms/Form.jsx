import React from "react";
import { makeT, useLang } from "../_i18n/i18n.js";
function cx(...c) { return c.filter(Boolean).join(" "); }

const FormCtx = React.createContext(null);

/**
 * CyberSkill Form — semantic form + optional controller (v3.7).
 * Plain mode (unchanged): named native fields are collected via FormData into onSubmit(values);
 * `errors` renders the bilingual summary. Controller mode: pass `rules` (name → "required" |
 * fn(value, values) => msg|null | array of those); FormField children with `name` register via
 * context — value/onChange auto-wired, per-field errors auto-shown, submit blocked until clean.
 */
export function Form({ onSubmit, errors = {}, rules, asyncRules, initialValues, children, lang, className, ...props }) {
  const [ref, L] = useLang(lang);
  const t = makeT("Form", L);
  const [values, setValues] = React.useState(() => initialValues || {});
  const [ruleErrors, setRuleErrors] = React.useState({});
  const [pending, setPending] = React.useState(false);
  const setValue = React.useCallback((name, v) => {
    setValues((s) => ({ ...s, [name]: v }));
    setRuleErrors((e) => (e[name] ? { ...e, [name]: undefined } : e));
  }, []);
  const merged = { ...ruleErrors, ...errors };
  const keys = Object.keys(merged).filter((k) => merged[k]);
  const runRules = (v) => {
    if (!rules) return {};
    const out = {};
    for (const [name, r] of Object.entries(rules)) {
      for (const rule of (Array.isArray(r) ? r : [r])) {
        const msg = rule === "required"
          ? ((v[name] == null || String(v[name]).trim() === "") ? t("requiredField") : null)
          : (typeof rule === "function" ? rule(v[name], v) : null);
        if (msg) { out[name] = msg; break; }
      }
    }
    return out;
  };
  const runAsyncRules = async (v) => {
    if (!asyncRules) return {};
    const out = {};
    for (const [name, fn] of Object.entries(asyncRules)) {
      if (typeof fn !== "function") continue;
      try {
        const msg = await fn(v[name], v);
        if (msg) out[name] = msg;
      } catch (e) {
        out[name] = String(e && e.message || e);
      }
    }
    return out;
  };
  const ctx = { values, setValue, errors: merged, pending };
  return (
    <FormCtx.Provider value={ctx}>
      <form {...props} ref={ref} className={cx("cs-form", pending && "is-pending", className)} noValidate
        onSubmit={async (e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const v = {}; fd.forEach((val, k) => { v[k] = val; });
          Object.assign(v, values); // controller-registered fields are the source of truth
          const errs = runRules(v);
          if (Object.keys(errs).some((k) => errs[k])) { setRuleErrors(errs); return; }
          setPending(true);
          try {
            const aerrs = await runAsyncRules(v);
            setRuleErrors(aerrs);
            if (Object.keys(aerrs).some((k) => aerrs[k])) return;
            onSubmit && onSubmit(v);
          } finally { setPending(false); }
        }}>
        {keys.length ? (
          <div className="cs-form__summary" role="alert">
            <b>{t("summary")}</b>
            <ul>{keys.map((k) => <li key={k}>{merged[k]}</li>)}</ul>
          </div>
        ) : null}
        {children}
      </form>
    </FormCtx.Provider>
  );
}

/**
 * CyberSkill FormField — label + control + hint/error line. With `name` inside a Form,
 * it registers with the controller: the single element child is cloned with value/onChange
 * (set valueProp="checked" for Checkbox/Switch/Toggle-shaped children) and the field's
 * context error shows automatically (an explicit `error` prop still wins).
 */
export function FormField({ label, name, required = false, hint, error, valueProp = "value", children, lang, className }) {
  const [ref, L] = useLang(lang);
  const t = makeT("Form", L);
  const ctx = React.useContext(FormCtx);
  const err = error !== undefined && error !== null ? error : (name && ctx ? ctx.errors[name] : undefined);
  let child = children;
  if (name && ctx && React.isValidElement(children) && React.Children.count(children) === 1) {
    const cur = ctx.values[name];
    const wire = { name };
    wire[valueProp] = cur !== undefined ? cur : (valueProp === "checked" ? false : "");
    wire.onChange = (ev) => {
      const val = ev && ev.target ? (valueProp === "checked" ? ev.target.checked : ev.target.value) : ev;
      ctx.setValue(name, val);
      if (children.props.onChange) children.props.onChange(ev);
    };
    child = React.cloneElement(children, wire);
  }
  return (
    <label ref={ref} className={cx("cs-formfield", err && "has-error", className)}>
      <span className="cs-formfield__label">{label}{required ? <em aria-label={t("required")}> *</em> : null}</span>
      {child}
      {err ? <span className="cs-formfield__error" role="alert">{err}</span> : hint ? <span className="cs-formfield__hint">{hint}</span> : null}
    </label>
  );
}
