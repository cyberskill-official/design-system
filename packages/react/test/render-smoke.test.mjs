#!/usr/bin/env node
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  AIDisclosureBadge,
  Button,
  DataTable,
  Dialog,
  HumanReviewGate,
  TextField
} from "../src/index.js";

const cases = [
  {
    name: "Button",
    html: renderToStaticMarkup(React.createElement(Button, null, "Luu thay doi"))
  },
  {
    name: "TextField",
    html: renderToStaticMarkup(React.createElement(TextField, { label: "Ho va ten", defaultValue: "Nguyen An" }))
  },
  {
    name: "Dialog",
    html: renderToStaticMarkup(React.createElement(Dialog, { open: true, title: "Xac nhan" }, "Noi dung can xac nhan"))
  },
  {
    name: "DataTable",
    html: renderToStaticMarkup(React.createElement(DataTable, {
      caption: "Nguoi hoc",
      columns: [{ key: "name", header: "Ten" }],
      rows: [{ id: "1", name: "Lan" }]
    }))
  },
  {
    name: "AIDisclosureBadge",
    html: renderToStaticMarkup(React.createElement(AIDisclosureBadge, { label: "AI ho tro" }))
  },
  {
    name: "HumanReviewGate",
    html: renderToStaticMarkup(React.createElement(HumanReviewGate, { summary: "Can nguoi duyet truoc khi gui." }))
  }
];

const failures = cases.filter(({ html }) => !html || html.length < 20);
if (failures.length) {
  console.error("[components:render] render failures:");
  for (const failure of failures) console.error(`  - ${failure.name}`);
  process.exit(1);
}

console.log(`[components:render] ${cases.length} components rendered to static markup`);
