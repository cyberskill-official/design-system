import React from "react";
import { makeT, useLang } from "../_i18n/i18n.js";
import { cx } from "../_utils/cx.js";

/** CyberSkill FileUpload — click-or-drag dropzone. Calls onFiles(File[]) on select/drop. */
export function FileUpload({ title, hint, accept, multiple = false, onFiles, icon, lang, className }) {
  const [drag, setDrag] = React.useState(false);
  const pick = (files) => { if (files && files.length && onFiles) onFiles(Array.from(files)); };
  const [ref, L] = useLang(lang);
  const t = makeT("FileUpload", L);
  const tt = title != null ? title : t("title");
  const hh = hint != null ? hint : t("hint");
  return (
    <label
      ref={ref}
      className={cx("cs-dropzone", drag && "is-dragging", className)}
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files); }}
    >
      <span className="cs-dropzone__icon">
        {icon ?? <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 16V4M7 9l5-5 5 5" /><path d="M5 16v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3" /></svg>}
      </span>
      <span className="cs-dropzone__title">{tt}</span>
      <span className="cs-dropzone__hint">{hh}</span>
      <input type="file" accept={accept} multiple={multiple} style={{ display: "none" }} onChange={(e) => pick(e.target.files)} />
    </label>
  );
}
