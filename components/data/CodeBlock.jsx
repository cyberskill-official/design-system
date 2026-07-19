import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill CodeBlock — dark mono code panel with a filename bar + copy button. */
export function CodeBlock({ code = "", filename, language = "code", showBar = true, className }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    try { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1400); } catch (e) { /* no-op */ }
  };
  return (
    <div className={cx("cs-code", className)}>
      {showBar ? (
        <div className="cs-code__bar">
          <span>{filename || language}</span>
          <button type="button" className="cs-code__copy" onClick={copy}>{copied ? "Copied ✓" : "Copy"}</button>
        </div>
      ) : null}
      <pre><code>{code}</code></pre>
    </div>
  );
}
