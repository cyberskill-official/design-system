export function createRslPolicy({ url = "/", permits = [], prohibits = ["ai-training"], payment = null } = {}) {
  const permitsXml = permits.map((item) => `      <permits type="usage">${item}</permits>`).join("\n");
  const prohibitsXml = prohibits.map((item) => `      <prohibits type="usage">${item}</prohibits>`).join("\n");
  const paymentXml = payment ? `      <payment><custom>${payment}</custom></payment>` : "";
  return [
    '<rsl xmlns="https://rslstandard.org/rsl">',
    `  <content url="${url}">`,
    "    <license>",
    permitsXml,
    prohibitsXml,
    paymentXml,
    "    </license>",
    "  </content>",
    "</rsl>",
    ""
  ].filter(Boolean).join("\n");
}

export const provenanceMaturity = {
  c2paSigning: "Planned",
  rslPolicy: "Prototype",
  crawlerAuthorization: "Concept",
  watermarking: "Concept"
};
