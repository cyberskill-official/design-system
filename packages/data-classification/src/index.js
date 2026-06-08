export const dataClasses = [
  "public",
  "internal",
  "personal",
  "sensitive",
  "important",
  "core",
  "restricted"
];

export function requiresTransferReview(field) {
  return field.transferScope === "cross-border" &&
    ["personal", "sensitive", "important", "core", "restricted"].includes(field.dataClass);
}

export function classifyField(field) {
  const errors = [];
  if (!dataClasses.includes(field.dataClass)) errors.push(`invalid dataClass ${field.dataClass}`);
  if (!field.purposeId) errors.push("missing purposeId");
  if (!field.retentionClass) errors.push("missing retentionClass");
  return {
    ok: errors.length === 0,
    errors,
    transferReviewRequired: errors.length === 0 && requiresTransferReview(field)
  };
}
