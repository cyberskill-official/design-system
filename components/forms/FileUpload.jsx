import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill FileUpload — click-or-drag dropzone. Calls onFiles(File[]) on select/drop. */
export function FileUpload({ title = "Drop files here or browse", hint = "PNG, JPG, or PDF up to 10MB", accept, multiple = false, onFiles, icon, className }) {
  const [drag, setDrag] = React.useState(false);
  const pick = (files) => { if (files && files.length && onFiles) onFiles(Array.from(files)); };
  return (
    <label
      className={cx("cs-dropzone", drag && "is-dragging", className)}
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files); }}
    >
      <span className="cs-dropzone__icon">
        {icon ?? <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 16V4M7 9l5-5 5 5" /><path d="M5 16v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3" /></svg>}
      </span>
      <span className="cs-dropzone__title">{title}</span>
      <span className="cs-dropzone__hint">{hint}</span>
      <input type="file" accept={accept} multiple={multiple} style={{ display: "none" }} onChange={(e) => pick(e.target.files)} />
    </label>
  );
}
