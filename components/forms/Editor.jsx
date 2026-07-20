import React from "react";
import { makeT, useLang } from "../_i18n/i18n.js";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill Editor — light rich-text (contentEditable): bold · italic · bullet list. onChange(html). */
export function Editor({ defaultValue = "", onChange, minHeight = 120, lang, className }) {
  const box = React.useRef(null);
  const [ref, L] = useLang(lang);
  const t = makeT("Editor", L);
  const cmd = (c) => { document.execCommand(c); box.current && box.current.focus(); emit(); };
  const emit = () => { onChange && box.current && onChange(box.current.innerHTML); };
  const B = ({ c, label, children }) => (
    <button type="button" className="cs-toolbar__btn" aria-label={label} onMouseDown={(e) => { e.preventDefault(); cmd(c); }}>{children}</button>
  );
  return (
    <div ref={ref} className={cx("cs-editor", className)}>
      <div className="cs-editor__bar" role="toolbar" aria-label={t("toolbar")}>
        <B c="bold" label={t("bold")}><b>B</b></B>
        <B c="italic" label={t("italic")}><i>I</i></B>
        <B c="insertUnorderedList" label={t("list")}>≔</B>
      </div>
      <div ref={box} className="cs-editor__area" contentEditable suppressContentEditableWarning role="textbox" aria-multiline="true" aria-label={t("area")}
        style={{ minHeight }} onInput={emit} dangerouslySetInnerHTML={{ __html: defaultValue }} />
    </div>
  );
}
