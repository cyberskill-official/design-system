import React from "react";

function cx(...c) { return c.filter(Boolean).join(" "); }

/**
 * CyberSkill HumanReviewGate — an AI-native checkpoint: a risk label, a
 * plain-language summary, an optional reviewer, and Approve / Reject actions.
 * Keeps a human in the loop before a high-stakes AI action proceeds.
 */
export function HumanReviewGate({
  risk = "review required",
  summary,
  reviewer,
  onApprove,
  onReject,
  approveLabel = "Approve",
  rejectLabel = "Reject",
  className,
}) {
  return (
    <section className={cx("cs-review-gate", className)} aria-label="Human review gate">
      <div className="cs-review-gate__risk">{risk}</div>
      <p className="cs-review-gate__summary">{summary}</p>
      {reviewer ? <p className="cs-review-gate__reviewer">Reviewer: {reviewer}</p> : null}
      <div className="cs-review-gate__actions">
        <button type="button" className="cs-button cs-button--secondary" onClick={onReject}>{rejectLabel}</button>
        <button type="button" className="cs-button cs-button--primary" onClick={onApprove}>{approveLabel}</button>
      </div>
    </section>
  );
}
