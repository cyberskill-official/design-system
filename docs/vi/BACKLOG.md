# Backlog — công việc hoãn (trước launch)

Công việc đã được duyệt hướng nhưng chưa xây. Phiên bản giữ cố định **1.0.0** đến khi LAUNCH — khi một mục ship, xóa khỏi đây và mô tả trong PR (không changelog).

## Chưa triển khai

_(không còn)_

## Đã quyết / đóng (không còn là công việc đang mở)

- Whole-set audits trên mọi PR — **B đã bật**
- Pixel CI auto-fail — **A chỉ advisory**
- Figma — **A non-Enterprise** hiện tại; Tokens Studio / hand-sync; REST soft-skip
- **Live hub = chỉ Storybook** (không có trang Live View riêng) — `docs/live-hub.md`
- Dual token JSON (`tokens.json` + `tokens.dtcg.json`) — có chủ đích
- Track tài liệu tiếng Việt (`docs/vi/` + toggle EN|VI trên viewer + gate docs-lang-parity)

## Vừa ship gần đây (đã gỡ khỏi danh sách active)

- Storybook là Live hub duy nhất; Live/Surfaces map; đã xóa `live-view.html` khỏi tree
- Ma trận điều khiển CSF sâu (argTypes + Matrix/AllVariants/States) cho mọi public primary
- Storybook 10 + thanh CSF (`AllSizes` khi có `argTypes.size`; States/Matrix cho disabled/loading/error/busy) — không yêu cầu tích đầy đủ N chiều enum
- Storybook CSF cho mọi React component public (99 primaries) + gate hoàn chỉnh
- Native samples đa màn hình dưới `examples/native/{swiftui,compose,flutter}`
- Scaffold đóng gói store native (Fastlane + metadata; CI soft-skip khi thiếu `ASC_*` / `PLAY_SERVICE_ACCOUNT_JSON`; submit tắt) — sample vẫn là sample đến khi có nhu cầu sản phẩm
- Push biến màu Figma (Enterprise soft-skip)
- Đường Figma Code Connect (`figma.config.json` + 99 `.figma.tsx` + CI soft-skip) — node ID thật vẫn do operator điền
- Đường publish npm (`private: false`, `prepublishOnly`, workflow `npm-publish` soft-skip khi thiếu `NPM_TOKEN`; license UNLICENSED)
- Form field-array helpers + FormWizard
- DataGrid virtualization + lưu thứ tự cột
- Atomic View template iframe virtualization
- Bề mặt locale RTL
- Motion foundation embed
- Nhóm IA Sidebar
- Helper `cx()` dùng chung (`components/_utils/cx.js`) thay cho bản copy từng file
- Token size Button `xs` (`--cs-component-button-xs-*`)
- axe-core vendored + axe smoke nâng thành hard gate trên fast board
- Contrast dark-theme nâng thành hard trên `theme-overflow` (allowlist `REVIEWED_OK` cho near-miss canvas deck; CTA themeable dùng accent-strong + accent-on)
- Gương tài liệu `docs/vi/` + toggle EN|VI trên `docs/viewer.html` + gate docs-lang-parity
- So sánh pixel Playwright thật vs `_audit/baselines/` (`pixel-diff.mjs` + `drifted[]`/`maxDiff` advisory; quyết định A — không auto-fail PR vì %)

## Quy trình

- Mục mới vào đây khi đã duyệt nhưng chưa xây.
- Khi ship, xóa khỏi đây trong cùng change và ghi trong body PR.
- Blocker về credential trỏ tới `docs/decisions-pending.md`.
