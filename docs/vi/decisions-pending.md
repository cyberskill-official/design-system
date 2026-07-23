# Quyết định (owner)

Các lựa chọn đã ghi nhận của owner. How-to cấu hình nằm ở `docs/figma.md` và `docs/ci-cd.md` — file này chỉ chứa quyết định.

## 1. Whole-set audits trên mọi PR

**Lựa chọn owner: B — Bật trên mọi PR** (Th7 2026)

`whole-set-audits` chạy trên push, pull_request, schedule (`0 3 * * *`), và `workflow_dispatch`. Dự kiến ~15–20 phút cho job đó.

## 2. Pixel-threshold CI auto-fail

**Lựa chọn owner: A — Chỉ advisory** (Th7 2026)

Các hàng pixel / visual-baseline vẫn advisory. PR không bị auto-fail vì % pixel diff cho đến khi quyết định này đổi.

## 3. Figma / Tokens Studio

**Lựa chọn owner: A — non-Enterprise hiện tại** (Th7 2026)

Giữ plan Figma hiện tại. Variables REST API chỉ Enterprise — CI soft-skip. Đồng bộ màu = hand-sync và/hoặc Tokens Studio từ `tokens/tokens.dtcg.json`. Xem `docs/figma.md`.

## 4. Live hub = chỉ Storybook

**Lựa chọn owner: Storybook là live hub duy nhất** (Th7 2026)

- Operator dùng `/playground/` (Storybook) cho Theme × Element × Language và ma trận điều khiển component.
- Không có trang Live View riêng trong tree.
- Tab **Live** trên Dashboard tải Storybook/playground.
- Atomic View portable và HTML tĩnh khác vẫn phục vụ gate zero-build và consumer; chúng không phải Live hub của site.
- Bản đồ bề mặt: `docs/live-hub.md`.

## 5. Hai nguồn token JSON

**Lựa chọn owner: giữ cả `tokens.json` và `tokens.dtcg.json`** (Th7 2026)

| File | Vai trò |
|---|---|
| `tokens/tokens.dtcg.json` | Interchange W3C DTCG / regen native |
| `tokens/tokens.json` | Export nhóm theo hướng CSS |
| `tokens/*.css` + `styles.css` | UI runtime |

## 6. Code Connect — đường live; node ID vẫn do operator sở hữu

**Trạng thái: đường đã ship; lần publish xanh đầu tiên vẫn bị chặn bởi công việc Figma library** (Th7 2026)

- Job CI `code-connect` + `figma.config.json` + 99 mapping `*.figma.tsx` đã trong repo (Quyết định **1C** soft-skip).
- Soft-skip khi thiếu `FIGMA_TOKEN` / `FIGMA_FILE_KEY` hoặc API **403 / 404 / 429**.
- **Vẫn cần cho publish live xanh:** plan Org/Enterprise có Code Connect, component **đã publish** lên team library, và `nodeId` thật trong `code-connect/node-map.json` (thay stub tổng hợp `9999:*`). Xem `docs/figma.md`.

## 7. npm publish — đường đã ship; registry auth + grant license

**Trạng thái: workflow live; phân phối vẫn bị gate bởi secrets + policy** (Th7 2026)

- `package.json` là `private: false`; `prepublishOnly` chạy `build:bundle` + `build:design-md --check`.
- Workflow `.github/workflows/npm-publish.yml` trên `workflow_dispatch` / tag `v*`; soft-skip khi thiếu `NPM_TOKEN`.
- License giữ **UNLICENSED**; phiên bản giữ **1.0.0** đến khi LAUNCH. Consumer cần **grant tường minh** từ owner (xem `docs/consuming.md`) — publish lên public registry không tự open-source package.

## 8. Đóng gói store native — scaffold đã ship; submit tắt

**Trạng thái: đường Fastlane live; secret signing do operator sở hữu; không submit store** (Th7 2026)

- Scaffold dưới `examples/native/{swiftui,compose,flutter}/fastlane/` + placeholder metadata listing.
- Workflow `.github/workflows/native-store.yml`; dry-run luôn; soft-skip khi thiếu `ASC_KEY_ID` / `ASC_ISSUER_ID` / `ASC_KEY_P8` / `PLAY_SERVICE_ACCOUNT_JSON` (Quyết định **1C**).
- Lane `upload_store` từ chối submit — sample vẫn là sample đến khi có nhu cầu sản phẩm. Xem `examples/native/README.md`.

## Cách đổi một quyết định

Sửa dòng **Lựa chọn owner** tại đây. Người triển khai nối lại CI/docs và `docs/BACKLOG.md` khi cần.
