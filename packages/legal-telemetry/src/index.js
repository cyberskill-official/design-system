const allowedEvents = new Set([
  "consent.presented",
  "consent.changed.granted",
  "consent.changed.declined",
  "consent.changed.revoked",
  "consent.changed.updated"
]);

const piiLike = /(@|cccd|passport|phone|email|address|freeText|fullName)/i;

export function validateConsentEvent(event) {
  const required = [
    "event",
    "consentId",
    "purposeId",
    "jurisdiction",
    "lawfulBasis",
    "consentState",
    "policyVersion",
    "copyVersion",
    "actorType",
    "actorRef",
    "surfaceId",
    "locale",
    "timestamp"
  ];
  const errors = [];
  for (const key of required) {
    if (!(key in event)) errors.push(`missing ${key}`);
  }
  if (!allowedEvents.has(event.event)) errors.push(`invalid event ${event.event}`);
  for (const [key, value] of Object.entries(event)) {
    if (piiLike.test(key) || (typeof value === "string" && piiLike.test(value))) {
      errors.push(`possible raw PII in ${key}`);
    }
  }
  return { ok: errors.length === 0, errors };
}
