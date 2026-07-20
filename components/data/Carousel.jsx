import React from "react";
import { makeT, useLang } from "../_i18n/i18n.js";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill Carousel — slides with prev/next + dots. children = slides. Bilingual aria. */
export function Carousel({ children, startIndex = 0, label, lang, className }) {
  const slides = React.Children.toArray(children);
  const [i, setI] = React.useState(Math.min(startIndex, Math.max(0, slides.length - 1)));
  const [ref, L] = useLang(lang);
  const t = makeT("Carousel", L);
  const go = (n) => setI((n + slides.length) % slides.length);
  return (
    <div ref={ref} className={cx("cs-carousel", className)} role="group" aria-roledescription="carousel" aria-label={label}>
      <div className="cs-carousel__view">
        <div className="cs-carousel__track" style={{ transform: "translateX(-" + i * 100 + "%)" }}>
          {slides.map((s, j) => <div key={j} className="cs-carousel__slide" aria-hidden={j !== i}>{s}</div>)}
        </div>
        <button type="button" className="cs-carousel__nav prev" aria-label={t("prev")} onClick={() => go(i - 1)}>‹</button>
        <button type="button" className="cs-carousel__nav next" aria-label={t("next")} onClick={() => go(i + 1)}>›</button>
      </div>
      <div className="cs-carousel__dots">
        {slides.map((_, j) => <button key={j} type="button" aria-label={t("slide") + " " + (j + 1) + "/" + slides.length} aria-current={j === i} onClick={() => setI(j)} />)}
      </div>
    </div>
  );
}
