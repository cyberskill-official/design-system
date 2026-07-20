import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill Link — brand-styled anchor. variant: default | muted | standalone (arrow). external adds ↗ + rel. */
export function Link({ href = "#", variant = "default", external = false, children, className, ...props }) {
  return (
    <a href={href} className={cx("cs-link", variant !== "default" && "cs-link--" + variant, className)}
      target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} {...props}>
      {children}
      {external ? <span aria-hidden="true"> ↗</span> : variant === "standalone" ? <span aria-hidden="true"> →</span> : null}
    </a>
  );
}
