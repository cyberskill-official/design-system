import React, { forwardRef, useId, useMemo, useState } from "react";
import componentSpecs from "./component-specs.json" with { type: "json" };

export const components = componentSpecs;

export function getComponentSpec(name) {
  return componentSpecs.find((component) => component.name === name) ?? null;
}

export function listComponentsBySequence(sequence) {
  return componentSpecs.filter((component) => component.sequence === sequence);
}

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function controlState({ disabled, loading, invalid }) {
  return cx(
    disabled && "is-disabled",
    loading && "is-loading",
    invalid && "is-invalid"
  );
}

export const Button = forwardRef(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    icon,
    children,
    className,
    type = "button",
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading;
  return React.createElement(
    "button",
    {
      ...props,
      ref,
      type,
      disabled: isDisabled,
      "aria-busy": loading || undefined,
      className: cx("cs-button", `cs-button--${variant}`, `cs-button--${size}`, controlState({ disabled: isDisabled, loading }), className)
    },
    icon ? React.createElement("span", { className: "cs-button__icon", "aria-hidden": true }, icon) : null,
    React.createElement("span", { className: "cs-button__label" }, children),
    loading ? React.createElement("span", { className: "cs-button__spinner", "aria-hidden": true }) : null
  );
});

export const TextField = forwardRef(function TextField(
  {
    id,
    label,
    description,
    error,
    disabled = false,
    readOnly = false,
    className,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? `cs-textfield-${generatedId}`;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return React.createElement(
    "label",
    { className: cx("cs-field", disabled && "is-disabled", error && "is-invalid", className), htmlFor: inputId },
    React.createElement("span", { className: "cs-field__label" }, label),
    description ? React.createElement("span", { id: descriptionId, className: "cs-field__description" }, description) : null,
    React.createElement("input", {
      ...props,
      ref,
      id: inputId,
      disabled,
      readOnly,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": describedBy,
      className: "cs-field__control"
    }),
    error ? React.createElement("span", { id: errorId, className: "cs-field__error", role: "alert" }, error) : null
  );
});

export function Dialog({
  open,
  title,
  children,
  actions,
  onClose,
  className,
  closeLabel = "Close",
  ...props
}) {
  const generatedId = useId();
  const titleId = `cs-dialog-${generatedId}-title`;

  if (!open) return null;

  return React.createElement(
    "div",
    { className: "cs-dialog-layer" },
    React.createElement("div", { className: "cs-dialog__overlay", onClick: onClose, "aria-hidden": true }),
    React.createElement(
      "section",
      {
        ...props,
        role: "dialog",
        "aria-modal": true,
        "aria-labelledby": titleId,
        className: cx("cs-dialog", className)
      },
      React.createElement(
        "header",
        { className: "cs-dialog__header" },
        React.createElement("h2", { id: titleId, className: "cs-dialog__title" }, title),
        onClose ? React.createElement(Button, { variant: "ghost", size: "sm", onClick: onClose, "aria-label": closeLabel }, "x") : null
      ),
      React.createElement("div", { className: "cs-dialog__body" }, children),
      actions ? React.createElement("footer", { className: "cs-dialog__actions" }, actions) : null
    )
  );
}

export function DataTable({ caption, columns, rows, rowKey = "id", emptyState = "No records", className }) {
  const normalizedRows = Array.isArray(rows) ? rows : [];
  return React.createElement(
    "div",
    { className: cx("cs-table-wrap", className) },
    React.createElement(
      "table",
      { className: "cs-table" },
      caption ? React.createElement("caption", null, caption) : null,
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          columns.map((column) => React.createElement("th", { key: column.key, scope: "col" }, column.header))
        )
      ),
      React.createElement(
        "tbody",
        null,
        normalizedRows.length === 0
          ? React.createElement(
              "tr",
              null,
              React.createElement("td", { colSpan: columns.length, className: "cs-table__empty" }, emptyState)
            )
          : normalizedRows.map((row, index) => React.createElement(
              "tr",
              { key: row[rowKey] ?? index },
              columns.map((column) => React.createElement("td", { key: column.key }, column.render ? column.render(row) : row[column.key]))
            ))
      )
    )
  );
}

export function AIDisclosureBadge({
  label = "AI assisted",
  details = "This content was generated or transformed with AI assistance.",
  sources = [],
  className
}) {
  const [open, setOpen] = useState(false);
  const generatedId = useId();
  const panelId = `cs-ai-disclosure-${generatedId}`;
  const sourceList = useMemo(() => sources.filter(Boolean), [sources]);

  return React.createElement(
    "span",
    { className: cx("cs-ai-disclosure", className) },
    React.createElement(
      "button",
      {
        type: "button",
        className: "cs-ai-disclosure__badge",
        "aria-expanded": open,
        "aria-controls": panelId,
        onClick: () => setOpen((value) => !value)
      },
      label
    ),
    open ? React.createElement(
      "span",
      { id: panelId, role: "status", className: "cs-ai-disclosure__panel" },
      React.createElement("span", { className: "cs-ai-disclosure__details" }, details),
      sourceList.length
        ? React.createElement("span", { className: "cs-ai-disclosure__sources" }, `Sources: ${sourceList.join(", ")}`)
        : null
    ) : null
  );
}

export function HumanReviewGate({
  risk = "review required",
  summary,
  reviewer,
  onApprove,
  onReject,
  approveLabel = "Approve",
  rejectLabel = "Reject",
  className
}) {
  return React.createElement(
    "section",
    { className: cx("cs-review-gate", className), "aria-label": "Human review gate" },
    React.createElement("div", { className: "cs-review-gate__risk" }, risk),
    React.createElement("p", { className: "cs-review-gate__summary" }, summary),
    reviewer ? React.createElement("p", { className: "cs-review-gate__reviewer" }, `Reviewer: ${reviewer}`) : null,
    React.createElement(
      "div",
      { className: "cs-review-gate__actions" },
      React.createElement(Button, { variant: "secondary", onClick: onReject }, rejectLabel),
      React.createElement(Button, { variant: "primary", onClick: onApprove }, approveLabel)
    )
  );
}
