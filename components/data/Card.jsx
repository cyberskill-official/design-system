import React from "react";
function cx(...c) { return c.filter(Boolean).join(" "); }

/** CyberSkill Card — warm panel (14px radius, soft shadow). Compose with CardHeader/Body/Footer. */
export function Card({ interactive = false, flat = false, as, className, children, ...props }) {
  const Tag = as || (interactive ? "button" : "div");
  return (
    <Tag className={cx("cs-card", flat && "cs-card--flat", interactive && "cs-card--interactive", className)} {...props}>
      {children}
    </Tag>
  );
}
export function CardHeader({ title, subtitle, children, className, ...props }) {
  return (
    <div className={cx("cs-card__header", className)} {...props}>
      {title ? <h3 className="cs-card__title">{title}</h3> : null}
      {subtitle ? <p className="cs-card__subtitle">{subtitle}</p> : null}
      {children}
    </div>
  );
}
export function CardBody({ className, children, ...props }) {
  return <div className={cx("cs-card__body", className)} {...props}>{children}</div>;
}
export function CardFooter({ className, children, ...props }) {
  return <div className={cx("cs-card__footer", className)} {...props}>{children}</div>;
}
