#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
echo "CyberSkill DS local verify"
echo "1) VERSION=$(cat VERSION)"
echo "2) package.json version=$(node -p "require('./package.json').version")"
test "$(cat VERSION | tr -d '[:space:]')" = "$(node -p "require('./package.json').version")"
echo "3) Serve: python3 -m http.server 8765 --bind 127.0.0.1"
echo "4) Open http://127.0.0.1:8765/_audit/run.html — require ALL hard gates PASS"
echo "5) Optional whole-set: responsive-overflow · language-overflow · theme-overflow"
echo "6) Docs: http://127.0.0.1:8765/docs/viewer.html#README.md must render body"
echo "7) Optional: node _audit/ci/run-gates.mjs http://127.0.0.1:8765/_audit/run.html"
