# Live hub = Storybook

## Quyết định

**Storybook là live interactive hub duy nhất** cho operator trên `design.cyberskill.world`. Không có trang Live View riêng. Tab **Live** trên Dashboard mở `/playground/`.

## Các bề mặt

| Bề mặt | Vai trò |
|---|---|
| **Storybook Live** (`/playground/`) | Hub tương tác host: toolbar Theme × Element × Language, CSF component đầy đủ (Default + ma trận điều khiển), và story Live/* (iframe vào HTML portable) |
| **Atomic View** (`guidelines/atomic-view.html`) | Lưới component zero-build portable cho gates và duyệt clone-and-open — không phải Live hub của site |
| **Guidelines / templates khác** | Specimen portable; mở từ Storybook Live/* khi khám phá Motion, Identity Lab, kitchen-sink, v.v. |

## Bản đồ bề mặt (story Live/*)

| Entry Storybook | HTML portable |
|---|---|
| Components/* CSF | Nguồn React dưới `components/` |
| Live/Surfaces → Components (Atomic View) | `guidelines/atomic-view.html` |
| Live/Surfaces → Motion | `guidelines/motion.html` |
| Live/Surfaces → Identity Lab | `ui_kits/status-hub/identity-lab.html` |
| Live/Surfaces → Template Playground | `templates/playground.html` |
| Live/Surfaces → Kitchen Sink | `templates/kitchen-sink.html` |
| Live/Surfaces → Image Slots | `templates/image-slots-demo.html` |
| Live/Surfaces → AI Cluster | `templates/ai-cluster-demo.html` |
| Live/Surfaces → RTL | `guidelines/rtl-preview.html` |

## Consumer portable (không đổi)

Consumer vẫn link `styles.css` / `_ds_bundle.js` / ESM / templates. **Không** yêu cầu Storybook trong product app. Xem `docs/consuming.md`.

## Local

```bash
npm run storybook          # Live hub tại http://localhost:6006
npm run build:site         # đóng gói Live hub tại /playground/
```
