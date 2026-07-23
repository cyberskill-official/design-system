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

## 6. Code Connect — đường đã ship; **hoãn** trên Figma free

**Trạng thái: provisional / soft-skip — không phải publish library live** (Th7 2026; hoãn Th7 2026)

- Job CI `code-connect` + `figma.config.json` + 99 mapping `*.figma.tsx` đã trong repo (snippet import dùng `@cyberskill/design`).
- Publish soft-skip khi thiếu secret hoặc API trả 403/404/429. Soft-skip ≠ publish Code Connect thành công.
- **Owner hoãn:** giữ **Figma free / non-Org** — không theo đuổi Code Connect live đến khi có ghế Org/Enterprise và team library đã publish. Khi đó thay stub `9999:*` trong `code-connect/node-map.json` bằng `nodeId` thật. Xem `docs/figma.md`.

## 7. npm publish — đường đã ship; **chưa live** đến khi có grant + `NPM_TOKEN`

**Trạng thái: provisional / soft-skip — phân phối registry chưa duyệt mặc định** (Th7 2026)

- `package.json` là `private: false`; tên package **`@cyberskill/design`** (convention scoped `@cyberskill/*`; `publishConfig.access: public`); `prepublishOnly` chạy `build:bundle` + `build:design-md --check`.
- Workflow `.github/workflows/npm-publish.yml` trên `workflow_dispatch` / tag `v*`; thiếu `NPM_TOKEN` thì job **soft-skip** (exit 0 + báo cáo tarball). Soft-skip ≠ release đã publish.
- License giữ **UNLICENSED**; phiên bản giữ **1.0.0**. Consumer cần **grant tường minh** từ owner (xem `docs/consuming.md`) — publish lên public registry không tự open-source package. Org npm **`@cyberskill`** phải tồn tại (hoặc được tạo) trước lần publish đầu.

## 8. Đóng gói store native — scaffold đã ship; submit tắt

**Trạng thái: đường Fastlane live; secret signing do operator sở hữu; không submit store** (Th7 2026)

- Scaffold dưới `examples/native/{swiftui,compose,flutter}/fastlane/` + placeholder metadata listing.
- Workflow `.github/workflows/native-store.yml`; dry-run luôn; kiểm signed-release cần `ASC_KEY_ID` / `ASC_ISSUER_ID` / `ASC_KEY_P8` / `PLAY_SERVICE_ACCOUNT_JSON`.
- Lane `upload_store` từ chối submit — sample vẫn là sample đến khi có nhu cầu sản phẩm. Xem `examples/native/README.md`.

## 9. Registry products — đã khóa

**Lựa chọn owner: khóa registry product → element** (Th7 2026)

`docs/products.md` (+ `docs/vi/products.md`) là nguồn chân lý **đã khóa** cho tám ánh xạ portfolio. Agent và kit phải dùng các hàng đó; không invent ánh xạ product → element mới. Mọi thay đổi cần sửa biên bản quyết định này trong cùng change.

## Mặc định roadmap (mở khóa phân phối)

Ghi nhận Th7 2026 — chỉ mặc định tài liệu; **không cái nào đang live**:

- **Figma Variables** — giữ Tokens Studio / non-Enterprise (quyết định §3). Soft-skip Variables REST vẫn trung thực.
- **Code Connect** — **bỏ qua khi còn Figma free**; chỉ xem lại sau Org + library đã publish + `nodeId` thật (quyết định §6). Soft-skip ≠ publish.
- **npm** — giữ soft-skip đến khi có grant owner + `NPM_TOKEN` + org `@cyberskill` trên registry (quyết định §7). Soft-skip ≠ release đã publish.

## Việc maintainer (đang mở)

Theo dõi vận hành — không phải marketing sản phẩm, không phải backlog công khai:

1. **Code Connect** — hoãn (Figma free). Khi lên Org: thay stub `9999:*` trong `code-connect/node-map.json` bằng node ID library đã publish.
2. **Grant npm / `NPM_TOKEN`** — tạo/claim org npm **`@cyberskill`**, đặt GitHub secret, và cấp grant consumer tường minh trước khi coi `npm install @cyberskill/design` là đường đã duyệt.

~~3. Chốt registry products~~ — **xong** (Th7 2026): xem quyết định §9; `docs/products.md` đã khóa.

Schema sidecar và Storybook `FullMatrix` tiếp tục lớn **theo cơ hội** khi primary đã đủ điều kiện (hiện chỉ Button có FullMatrix theo contract) — không phải đợt mass-add. Xem `docs/quality-gates.md`.

## Cách đổi một quyết định

Sửa dòng **Lựa chọn owner** tại đây. Người triển khai nối lại CI và docs liên quan trong cùng một change.
