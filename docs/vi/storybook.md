# Storybook — Live hub duy nhất (host)

Storybook **10** là **live interactive hub duy nhất** cho operator trên `design.cyberskill.world`. Nó vẫn **không** thuộc hợp đồng consumer portable.

## URL

| Ngữ cảnh | Đường dẫn |
|---|---|
| Live production | `https://design.cyberskill.world/playground/` |
| Site đóng gói local | `/playground/` sau `npm run build:site` |
| Dev local | `npm run storybook` → http://localhost:6006 |

## Nội dung gồm

- CSF component đầy đủ với **Default + ma trận điều khiển sâu** (`Matrix` / `AllVariants`)
- **Thanh CSF (không phải tích đầy đủ cartesian):**
  - `AllSizes` mỗi khi có `argTypes.size` (ramp token hoặc size số đại diện)
  - `States` (hoặc subsection Matrix) phủ `disabled` / `loading` / `error` / `busy` khi các argTypes đó tồn tại
  - Non-goal rõ: tích đầy đủ N chiều mọi tổ hợp prop **không** bắt buộc
- Toolbar globals: Theme × Element × Language (cùng trục với templates)
- Story **Live/** cho bề mặt portable không-component (Motion, Identity Lab, template playground, kitchen-sink, image slots, AI cluster, RTL, Atomic View iframe)
- Cùng `styles.css` như production
- Addon: `@storybook/addon-docs` + `@storybook/addon-a11y` (essentials gộp vào core ở SB10)

## Config

- `.storybook/main.js` — config Storybook 10 ESM, Vite + alias `@cs` → `components/`
- Autodocs qua `tags: ['autodocs']` trên CSF meta (không `docs.autodocs` trong main)

## Consumer vẫn dùng (không đổi)

| Đối tượng | Tiêu thụ |
|---|---|
| Static / bất kỳ framework | `styles.css` + `.cs-*` |
| React production | `styles.css` + `_ds_bundle.js` |
| ESM | `_esm/cs.mjs` |
| Tokens | `tokens/*` |
| Claude Design | `templates/**/*.dc.html` |

## Lệnh

```bash
npm install
npm run storybook
npm run build:storybook    # → storybook-static/
npm run build:site         # đóng gói Live hub dưới .vercel-static/playground/
npm run test:storybook-contract
```

## Bản đồ

Bề mặt HTML portable iframe từ Live/* được liệt kê trong `docs/live-hub.md`.
