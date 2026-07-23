# Tiêu thụ & nâng cấp CyberSkill Design System

Cách mọi project — do người hoặc agent điều khiển — áp dụng design system HTML-first này, và cách nhận update an toàn.

## Đường nhanh cho AI agent (Claude Code, hoặc điều khiển một agent)

**Bạn nhận:** `styles.css` (400+ token + class `.cs-*` + bề mặt Liquid Glass, `@import` `tokens/` + `base/`) · `_ds_bundle.js` (React component đã compile, không cần build) · `_esm/cs.mjs` (entry ESM re-export mọi component) · `_ds_manifest.json` (inventory máy đọc được) · mỗi component `Name.d.ts` (API) + `Name.prompt.md` (brief dùng) · `tokens/tokens.dtcg.json` (W3C DTCG) + `tokens.json`/`tokens.js`.

**Checkout repo** — clone hoặc copy cả cây; mọi thứ là static đường dẫn tương đối. Điểm vào: `dashboard.html` (hub) · `guidelines/atomic-view.html` (mọi component live) · `templates/<slug>/` (điểm bắt đầu copy được). Đọc `SKILL.md` trước khi author bất kỳ thứ gì on-brand; bản đồ sâu hơn ở `llms.txt` (inventory) và file này (hướng dẫn adopt + upgrade đầy đủ bên dưới).

**Sau import — chứng minh health.** Mở `_audit/run.html` (hoặc tab **Health** trên dashboard), để bảng gate chạy xong (mọi fast gate). Tất cả xanh = bản copy nhất quán nội bộ (contrast, docs, portability, tokens, consumer path, behavior, a11y, stories, bilingual parity).

**Quy tắc giữ transfer lossless:**
- Không bao giờ hardcode hậu tố namespace bundle (xem "Resolve by prefix" bên dưới — gate enforce).

- Không bao giờ tạo lại/đổi màu logo — dùng `assets/logo-mark.svg` / component `Logo`.

- Mọi chuỗi UI ship EN + VN qua registry; không inline chuỗi một ngôn ngữ trong component.

- Anchors (Umber/Ochre), tên class `.cs-*`, tên token `--cs-*` là hợp đồng ổn định.

- Mở rộng hệ thống? Theo `CONTRIBUTING.md` (Expansion Rule: lan tới mọi deliverable trong một change; verify qua `_audit/`).

## Adopt qua npm (tùy chọn)

Package có thể publish (`private: false`, phiên bản cố định **1.0.0** đến khi LAUNCH). License vẫn **UNLICENSED** — cài từ registry (hoặc tarball đã pack) **không** tự cấp quyền redistribution. Đến khi owner nói LAUNCH và chọn license mở, **consumer cần grant tường minh** từ CyberSkill để dùng package trong sản phẩm.

```bash
# sau khi workflow npm-publish chạy thành công (hoặc từ tarball đã pack)
npm install cyberskill-design-system@1.0.0
```

Rồi link styles và import từ entry package (`_esm/cs.mjs` qua `exports["."]`) , hoặc tiếp tục dùng đường cây tĩnh bên dưới. Tarball đã publish là **cả cây portable** (styles, tokens, components, templates, guidelines, docs, UI kits) — không phải subset “chỉ lib” tối thiểu. Tooling chỉ-host (Storybook, `_audit/`) không nằm trong `files[]`.

**Đường publish (maintainer):** `prepublishOnly` chạy `build:bundle` + `build:design-md --check`. Workflow `.github/workflows/npm-publish.yml` trên `workflow_dispatch` / tag `v*`; **soft-skip** khi thiếu `NPM_TOKEN` (`node _audit/ci/npm-publish.mjs --dry-run` luôn liệt kê tarball). Xem `docs/ci-cd.md`.

## Adopt (hai đường, cộng shortcut module)

**1. Static / prototype / mock — link stylesheet.** Copy `styles.css` (+ `tokens/`, `base/`, `fonts/` mà nó `@import`, hoặc serve cả cây) và link; bạn có mọi token `--cs-*`, class component `.cs-*`, và bề mặt Liquid Glass. Compose bằng class (xem `templates/kitchen-sink.html`). Copy mọi asset bạn tham chiếu từ `assets/`.

**2. React production — nạp compiled bundle.** Link `styles.css` và `<script src="_ds_bundle.js">`, rồi đọc component từ namespace. **Resolve theo prefix, không hardcode:** bundle expose `window.CyberSkillDesignSystem_<projectId>`, và hậu tố 6-hex đó do compiler gán và **đổi khi import vào project khác**:
```html
<link rel="stylesheet" href="<path>/styles.css">
<script src="<path>/_ds_bundle.js"></script>
<script>
 const CS = window[Object.keys(window).find(k => /^CyberSkillDesignSystem_/.test(k))];
 const { Button, TextField, DataGrid } = CS;
</script>
```
Đây đúng là những gì `_audit/consumer-smoke-test.html` chạy (và assert xanh) — và `ds-base.js` của templates làm tương tự, publish alias ổn định `window.CyberSkillDS`.
**2b. Đường ESM (module) — một import, không build.** `import { Button, TextField } from "<path>/_esm/cs.mjs"` — module tự ensure React (pinned; bỏ qua khi đã có `window.React`), side-load `_ds_bundle.js` một lần, resolve namespace theo prefix, và re-export mọi component (`_audit/esm-smoke-test.html` giữ danh sách export khóa với manifest). Vẫn tự link `styles.css`.

**Templates.** Mỗi `templates/<slug>/` là Design Component seed từ `ds-base.js` (một dòng `base` để rebind đường dẫn tới nơi hệ thống này nằm tương đối với trang tiêu thụ). Copy thư mục và sửa copy/tweaks.

**Token máy đọc được.** `tokens/tokens.json` + `tokens/tokens.js` (ESM) + `tokens/tokens.dtcg.json` (W3C DTCG, cho Tokens Studio/Style Dictionary) expose mọi token nhóm theo category + map theme/element — cho pipeline native/mobile/design-tool. **Native build ship sẵn** trong `tokens/native/` (SwiftUI `CSTokens.swift` · Compose `CSTokens.kt` · Flutter `cs_tokens.dart`) kèm `tokens/provenance.json` (release, source sha-256, quy tắc chuyển đổi, sha-256 từng target); gate `token-pipeline` giữ chúng khóa với nguồn DTCG.

**HTML tĩnh / không React / không build tooling.** Link `styles.css` và compose bằng class `.cs-*` — catalog đầy đủ trong `templates/kitchen-sink.html`.

## Ba trục

Đặt Theme (`data-theme`), Element (`data-cs-element` + `data-cs-variant`), và Language (`lang` / Language tweak trên template) trên một container; mọi thứ bên trong re-skin không cần đổi code (xem `templates/playground.html`). Mặc định: `light · tho · en`. Xử lý bề mặt là liquid-glass (cố định). Bilingual: component resolve chuỗi từ `lang` (`lang="vi"` trên mọi container → tiếng Việt đầy đủ).

## Nâng cấp

- **Phiên bản cố định.** `VERSION` và `package.json` giữ **1.0.0** đến khi owner nói LAUNCH. Không có changelog design-system trong giai đoạn này — coi tip repo là chân lý duy nhất.

- Anchors (Umber/Ochre), tên class `.cs-*`, và tên token `--cs-*` là hợp đồng ổn định — an toàn để phụ thuộc. Đổi tên phá vỡ những hợp đồng đó phải hiếm và được gọi ra trong PR/docs khi xảy ra.

- **Chạy lại smoke test sau nâng cấp.** Mở `_audit/consumer-smoke-test.html` và bảng Health đầy đủ (`_audit/run.html` / tab Health dashboard) trên tip mới — runner chứng minh đường packaged vẫn resolve.

## Host playground (tùy chọn)

Site live phục vụ Storybook tại `/playground/` như **Live hub duy nhất** cho operator (Theme × Element × Language + ma trận điều khiển). Đó là **tooling chỉ-host** — đừng phụ thuộc Storybook trong product app. Atomic View portable vẫn ở `guidelines/atomic-view.html`. Xem `docs/storybook.md` và `docs/live-hub.md`.

## Spike consumer năm phút

```bash
# từ monorepo root
python3 -m http.server 8765 --bind 127.0.0.1
# mở http://127.0.0.1:8765/examples/static-hello/
# rồi http://127.0.0.1:8765/_audit/consumer-smoke-test.html
```

Sửa `examples/static-hello/index.html`: flip `data-theme="dark"` hoặc `data-cs-element="thuy"` trên `<body>`. Không install, không Storybook.

## Native sample hosts (tùy chọn)

Sample đa màn hình (Sign in · Home · Settings) nằm dưới `examples/native/swiftui`, `compose`, và `flutter`. Chúng sync token generate qua `node examples/native/sync-tokens.mjs`. Xem `examples/native/README.md`. Không bắt buộc cho web consumer.

## Mở rộng

Nếu bạn đang đổi chính hệ thống (không chỉ tiêu thụ), theo `CONTRIBUTING.md` — Expansion Rule (lan tới mọi deliverable trong một change) và doctrine verification (deep check qua `_audit/`).
