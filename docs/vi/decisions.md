# Quyết định (maintainer)

Các lựa chọn của owner định hình CI, đồng bộ Figma, và phân phối. How-to nằm ở `docs/figma.md` và `docs/ci-cd.md` — file này chỉ là biên bản quyết định. Không phải hướng dẫn consumer.

## 1. Whole-set audits trên mọi PR

**Lựa chọn owner: B — Bật trên mọi PR** (Th7 2026)

`whole-set-audits` chạy trên push, pull_request, schedule (`0 3 * * *`), và `workflow_dispatch`. Dự kiến ~15–20 phút cho job đó.

## 2. Pixel-threshold CI auto-fail

**Lựa chọn owner: bật — hard gate** (Th7 2026)

So sánh `%` pixel Playwright (`_audit/ci/pixel-diff.mjs`) là hard gate. Drift trên ngưỡng làm fail hàng Pixel CI trên board và job CI `pixel-diff` (không `continue-on-error`). Trang review side-by-side visual / component baseline vẫn advisory (drift đánh giá bằng mắt). Sau redesign có chủ đích, làm mới `_audit/baselines/` bằng `--update` và commit các PNG.

## 3. Figma / Tokens Studio

**Lựa chọn owner: A — non-Enterprise hiện tại** (Th7 2026)

Giữ plan Figma hiện tại. Variables REST API chỉ Enterprise — job ghi **soft-skip** (exit 0 + report) khi plan hoặc secret không hoàn tất được write. Soft-skip đó **không** phải sync Variables live — đừng coi CI xanh là chứng minh Figma Variables đã cập nhật. Đồng bộ màu = hand-sync và/hoặc Tokens Studio từ `tokens/tokens.dtcg.json`. Xem `docs/figma.md`.

## 4. Live hub = chỉ Storybook

**Lựa chọn owner: Storybook là live hub duy nhất** (Th7 2026)

- Operator dùng Storybook tại `/` cho Theme × Element × Language và ma trận điều khiển component.
- Không có trang Live View riêng trong tree.
- Legacy `/dashboard`, `/dashboard/`, `/dashboard.html`, `/dashboard/:path*`, `/playground`, `/playground/`, `/playground/:path*` redirect về `/`.
- Atomic View portable và HTML tĩnh khác vẫn phục vụ gate zero-build và consumer; chúng không phải entry sản phẩm của site.
- Bản đồ bề mặt: `docs/live-hub.md`.

## 5. Hai nguồn token JSON

**Lựa chọn owner: giữ cả `tokens.json` và `tokens.dtcg.json`** (Th7 2026)

| File | Vai trò |
|---|---|
| `tokens/tokens.dtcg.json` | Interchange W3C DTCG / regen native |
| `tokens/tokens.json` | Export nhóm theo hướng CSS |
| `tokens/*.css` + `styles.css` | UI runtime |

## 6. Code Connect — đường đã ship; **chưa live** đến khi có node ID + plan

**Trạng thái: provisional / soft-skip — không phải publish library live** (Th7 2026)

- Job CI `code-connect` + `figma.config.json` + 99 mapping `*.figma.tsx` đã trong repo.
- Publish chạy khi có `FIGMA_TOKEN` / `FIGMA_FILE_KEY` và API chấp nhận file; nếu không, job **soft-skip** (exit 0 + report) mà không làm đỏ board. Soft-skip ≠ publish Code Connect thành công.
- **Vẫn cần cho publish live xanh:** plan Org/Enterprise có Code Connect, component **đã publish** lên team library, và `nodeId` thật trong `code-connect/node-map.json` (thay stub tổng hợp `9999:*` — không invent node ID). Xem `docs/figma.md`.

## 7. npm publish — đường đã ship; **chưa live** đến khi có grant + `NPM_TOKEN`

**Trạng thái: provisional / soft-skip — phân phối registry chưa duyệt mặc định** (Th7 2026)

- `package.json` là `private: false`; tên package **`cyberskill-design-system`**; `prepublishOnly` chạy `build:bundle` + `build:design-md --check`.
- Workflow `.github/workflows/npm-publish.yml` trên `workflow_dispatch` / tag `v*`; thiếu `NPM_TOKEN` thì job **soft-skip** (exit 0 + báo cáo tarball). Soft-skip ≠ release đã publish.
- License giữ **UNLICENSED**; phiên bản giữ **1.0.0**. Consumer cần **grant tường minh** từ owner (xem `docs/consuming.md`) — publish lên public registry không tự open-source package.

## 8. Đóng gói store native — scaffold đã ship; submit tắt

**Trạng thái: đường Fastlane live; secret signing do operator sở hữu; không submit store** (Th7 2026)

- Scaffold dưới `examples/native/{swiftui,compose,flutter}/fastlane/` + placeholder metadata listing.
- Workflow `.github/workflows/native-store.yml`; dry-run luôn; kiểm signed-release cần `ASC_KEY_ID` / `ASC_ISSUER_ID` / `ASC_KEY_P8` / `PLAY_SERVICE_ACCOUNT_JSON`.
- Lane `upload_store` từ chối submit — sample vẫn là sample đến khi có nhu cầu sản phẩm. Xem `examples/native/README.md`.

## Việc maintainer (đang mở)

Theo dõi vận hành — không phải marketing sản phẩm, không phải backlog công khai:

1. **Code Connect node ID** — thay stub tổng hợp `9999:*` trong `code-connect/node-map.json` bằng node ID library đã publish khi Figma Org/Enterprise sẵn sàng.
2. **Grant npm / `NPM_TOKEN`** — đặt GitHub secret và cấp grant consumer tường minh trước khi coi cài từ registry là đường phân phối đã duyệt.
3. **Chốt registry products** — nâng `docs/products.md` từ mapping product → element tạm thời thành registry khóa.

## Cách đổi một quyết định

Sửa dòng **Lựa chọn owner** tại đây. Người triển khai nối lại CI và docs liên quan trong cùng một change.
