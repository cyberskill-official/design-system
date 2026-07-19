import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill List container. Compose ListItem children. */
export function List({ className, children, ...props }) {
  return <div role="list" className={cx("cs-list", className)} {...props}>{children}</div>;
}

/** A row in a List: optional lead (icon/avatar), title, subtitle, trailing node. */
export function ListItem({ lead, title, subtitle, trail, onClick, children, className, ...props }) {
  const interactive = !!onClick;
  const Tag = interactive ? "button" : "div";
  return (
    <Tag role="listitem" className={cx("cs-list__item", interactive && "cs-list__item--button", className)} onClick={onClick} {...props}>
      {lead != null ? <span className="cs-list__lead">{lead}</span> : null}
      <span className="cs-list__main">
        {title != null ? <span className="cs-list__title">{title}</span> : null}
        {subtitle != null ? <span className="cs-list__sub">{subtitle}</span> : null}
        {children}
      </span>
      {trail != null ? <span className="cs-list__trail">{trail}</span> : null}
    </Tag>
  );
}
