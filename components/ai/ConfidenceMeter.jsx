import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

const TONE = {
  low: { color: "var(--cs-color-semantic-danger)", label: "Low", fill: 2 },
  medium: { color: "var(--cs-color-semantic-warning)", label: "Medium", fill: 3 },
  high: { color: "var(--cs-color-semantic-success)", label: "High", fill: 5 },
};

/**
 * CyberSkill ConfidenceMeter — segmented AI-confidence indicator. Pass a numeric
 * `value` 0–1, or a `level` ("low"|"medium"|"high"). Confidence is stated in
 * words too, never colour alone — pair with AIDisclosureBadge / HumanReviewGate.
 */
export function ConfidenceMeter({ value, level, segments = 5, label = "Confidence", className }) {
  let tone, filled;
  if (value != null) {
    tone = value < 0.4 ? "low" : value < 0.75 ? "medium" : "high";
    filled = Math.max(1, Math.round(value * segments));
  } else {
    tone = level || "medium";
    filled = Math.round((TONE[tone].fill / 5) * segments);
  }
  const meta = TONE[tone];
  return (
    <div className={cx("cs-confidence", className)}>
      <div className="cs-confidence__head">
        <span>{label}</span>
        <span className="cs-confidence__level" style={{ color: meta.color }}>{meta.label}</span>
      </div>
      <div className="cs-confidence__track" role="meter" aria-valuemin={0} aria-valuemax={segments} aria-valuenow={filled} aria-label={label + ": " + meta.label}>
        {Array.from({ length: segments }).map((_, i) => (
          <span key={i} className="cs-confidence__seg" style={i < filled ? { background: meta.color } : undefined} />
        ))}
      </div>
    </div>
  );
}
