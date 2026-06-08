#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { resources } from "./index.js";

const ROOT = resolve(import.meta.dirname, "../../..");

function send(payload) {
  const body = JSON.stringify(payload);
  process.stdout.write(`Content-Length: ${Buffer.byteLength(body)}\r\n\r\n${body}`);
}

function response(id, result) {
  send({ jsonrpc: "2.0", id, result });
}

function error(id, code, message) {
  send({ jsonrpc: "2.0", id, error: { code, message } });
}

function readResource(uri) {
  const resource = resources.find((item) => item.uri === uri);
  if (!resource) return null;
  return {
    uri: resource.uri,
    mimeType: resource.mimeType,
    text: readFileSync(resolve(ROOT, resource.path), "utf8")
  };
}

function handle(message) {
  const { id, method, params } = message;
  if (method === "initialize") {
    response(id, {
      protocolVersion: "2025-11-25",
      serverInfo: { name: "@cyberskill/mcp-components", version: "0.1.0-prototype" },
      capabilities: { resources: {} }
    });
    return;
  }
  if (method === "resources/list") {
    response(id, { resources: resources.map(({ path, ...resource }) => resource) });
    return;
  }
  if (method === "resources/read") {
    const resource = readResource(params?.uri);
    if (!resource) {
      error(id, -32004, "Unknown resource");
      return;
    }
    response(id, { contents: [resource] });
    return;
  }
  if (method === "ping") {
    response(id, {});
    return;
  }
  error(id, -32601, "Method not found");
}

let buffer = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  buffer += chunk;
  while (buffer.includes("\r\n\r\n")) {
    const headerEnd = buffer.indexOf("\r\n\r\n");
    const header = buffer.slice(0, headerEnd);
    const match = /Content-Length:\s*(\d+)/i.exec(header);
    if (!match) {
      buffer = buffer.slice(headerEnd + 4);
      continue;
    }
    const length = Number(match[1]);
    const bodyStart = headerEnd + 4;
    const bodyEnd = bodyStart + length;
    if (buffer.length < bodyEnd) return;
    const body = buffer.slice(bodyStart, bodyEnd);
    buffer = buffer.slice(bodyEnd);
    try {
      handle(JSON.parse(body));
    } catch (err) {
      error(null, -32700, err instanceof Error ? err.message : "Parse error");
    }
  }
});
