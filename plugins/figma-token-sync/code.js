figma.showUI(__html__, { width: 420, height: 520 });

function flattenTokens(node, prefix = []) {
  const rows = [];
  for (const [key, value] of Object.entries(node ?? {})) {
    const path = [...prefix, key];
    if (value && typeof value === "object" && "$value" in value) {
      rows.push({
        name: path.join("/"),
        type: value.$type,
        value: value.$value,
        description: value.$description ?? ""
      });
    } else if (value && typeof value === "object") {
      rows.push(...flattenTokens(value, path));
    }
  }
  return rows;
}

figma.ui.onmessage = async (message) => {
  if (message.type !== "preview-tokens") return;
  try {
    const parsed = JSON.parse(message.tokens);
    const rows = flattenTokens(parsed);
    figma.ui.postMessage({
      type: "token-preview",
      count: rows.length,
      rows: rows.slice(0, 100)
    });
  } catch (error) {
    figma.ui.postMessage({
      type: "token-error",
      message: error instanceof Error ? error.message : "Invalid token JSON"
    });
  }
};
