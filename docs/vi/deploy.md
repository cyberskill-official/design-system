# Deploy site Atomic live (Vercel / VPS / mọi static host)

Hai track:

1. **Design system portable (consumers)** — vẫn là cây file tĩnh: không cần bundler. Link `styles.css` + tùy chọn `_ds_bundle.js` / ESM. Claude Design, Google Stitch, và product app không cần Node hay Storybook.
2. **Host site (`design.cyberskill.world`)** — output tĩnh đóng gói cho Vercel. Packaging **có** chạy Node một lần lúc deploy để Storybook playground tùy chọn ship tại `/playground/`. Vẫn không có app server chạy dài.

`index.html` redirect tới `dashboard.html` (Overview · Docs · Live · Health · Tokens). Live = Storybook tại `/playground/`.

## Vercel (khuyến nghị)

1. Push repo (xem `docs/sync.md`) lên GitHub.
2. Vercel → **Add New Project** → import repo.
3. **Framework preset: "Other"** (không Next.js/CRA). Ưu tiên tin `vercel.json` hơn là gõ lệnh trên dashboard.
4. Deploy. `/` → `index.html` → `/dashboard.html`. Storybook (nếu build thành công) ở `/playground/`.
5. Custom domain: Project → Settings → Domains, thêm, trỏ DNS theo hướng dẫn Vercel.

**`vercel.json` khóa đường đóng gói host:**

| Trường | Giá trị | Vì sao |
|---|---|---|
| `framework` | `null` | Không auto-detect framework |
| `installCommand` | `npm install` | Chỉ-host: cài Storybook/dev tooling cho build playground tĩnh |
| `buildCommand` | `npm run build:site` | `build:storybook` rồi `scripts/vercel-static-output.mjs` |
| `outputDirectory` | `.vercel-static` | Webroot đóng gói (cây portable + `playground/`) |

Tương đương local: `npm install && npm run build:site`, rồi serve `.vercel-static/`.

Consumer clone repo vẫn mở file trực tiếp — họ **không** chạy `build:site`.

## Ảnh social preview (OG)

Ship cho production (`design.cyberskill.world`):
- Head `dashboard.html` đã gồm:
  - `og:image` → `https://design.cyberskill.world/assets/og-dashboard.png`
  - `twitter:card` = `summary_large_image`
  - `twitter:image` (cùng URL)

Nếu host dưới **domain khác**, đổi absolute URL trong ba meta tag cho khớp origin, hoặc re-export PNG và giữ path `assets/og-dashboard.png`.

**Misconfig thường gặp:** chọn preset JS framework (Next/CRA) — Vercel chạy đồ thị build sai và có thể 404 root docs. Preset phải giữ **"Other"** và `vercel.json` phải sở hữu install/build/output (xem bảng trên). `package.json` có thể publish (`"private": false`) cho đường npm; nó cũng mang script **chỉ-host** (`build:storybook`, `build:site`, verify/test) mà product app không nên phụ thuộc (xem `docs/consuming.md` và `docs/storybook.md`). Packaging copy webroot portable cộng Storybook vào `.vercel-static` (gồm root docs mà publish static trần từ repo-root có thể bỏ). **Phân biệt misconfig hosting với bug docs thật:** mở `/_audit/docs-consistency.html` trên URL *đã deploy* — gate phát hiện body HTML/error nơi lẽ ra là raw `.md`/`.json` và báo "hosting is intercepting this path".

## VPS generic / nginx / mọi static host

**Không Storybook:** serve root repo làm webroot (chỉ cây portable).

**Có Storybook playground:** chạy `npm run build:site` trên host hoặc CI, rồi serve `.vercel-static/` làm webroot.

Ví dụ Nginx (repo root hoặc `.vercel-static` làm `root`):
server {
  server_name design.cyberskill.world;
  index index.html;
}
Không cần rewrite — mọi path trong hệ thống là file thật (`dashboard.html`, `guidelines/atomic-view.html`, `_audit/run.html`, v.v.), không phải client-side route. Static file server (Caddy, Apache, S3+CloudFront, GitHub Pages) đều làm tương tự — trỏ vào root repo.

## Checklist sau deploy
1. Mở `/` — xác nhận vào dashboard (không 404 hay directory listing).
2. Mở tab **Health** (hoặc `/_audit/run.html` trực tiếp) — để board chạy xong, xác nhận mọi fast gate pass trên bản *đã deploy* (CDN cache, MIME type, hoặc file thiếu có thể lộ ở đây dù check local sạch).
3. Nếu có đỏ, đọc hàng gate fail trên Health board và mở trang gate đó để chi tiết — xem `docs/consuming.md` → "After import — prove health".
4. Kiểm `/guidelines/atomic-view.html` load trực tiếp (trang nặng nhất — React + compiled bundle qua mạng).
5. Nếu packaging gồm Storybook, mở `/playground/` và xác nhận một story render (ví dụ Components/Button).

## Những gì KHÔNG làm
- Đừng ép **consumer** qua Storybook hoặc app bundler — hợp đồng của họ vẫn là clone-and-link `styles.css` (+ bundle tùy chọn). Host-site packaging (`build:site`) chỉ cho `/playground/` của site live này và layout package tĩnh.
- Đừng đổi Vercel framework preset khỏi "Other" / `framework: null`.
- Đừng gitignore bất kỳ thư mục top-level nào ngoài những gì `.gitignore` đã liệt kê (`uploads/`, `scraps/`, `_audit/exports/`, `storybook-static/`, `.vercel-static/`) — mọi thư mục khác, **kể cả tiền tố underscore như `_esm/`**, là source và phải ship trong cây portable. Xem `docs/sync.md`.


## Protocol re-run Health sau deploy (release gate)

Sau mọi production deploy:
2. Mở tab Docs / `docs/viewer.html#README.md` — body không được kẹt ở Loading…
3. `curl -sS https://<host>/VERSION` phải trả plain semver text, không HTML.
4. `curl -sS -I https://<host>/package.json` phải là `application/json` hoặc `text/plain`, không SPA shell.


## Ghi chú Content-Security-Policy

Static hosting có thể ship CSP chặt. Allowance điển hình cho hệ thống này:
- `script-src 'self' https://unpkg.com` nếu load React từ CDN cho Atomic View
- `font-src 'self'`

- `img-src 'self' data:`
Ưu tiên self-host React cạnh `_ds_bundle.js` cho install air-gapped.

## OG đa domain

Meta production trỏ `https://design.cyberskill.world/assets/og-dashboard.png`. Trên host khác, chỉ thay absolute origin trong `dashboard.html` `og:image` và `twitter:image` — giữ path `/assets/og-dashboard.png`.

## Storybook playground (chỉ-host)

Path production: **`/playground/`** (Storybook static export dưới `.vercel-static/playground/`).

| Lệnh | Kết quả |
|---|---|
| `npm run storybook` | Dev server (chỉ local) |
| `npm run build:storybook` | Ghi `storybook-static/` |
| `npm run build:site` | Build Storybook + copy cây portable → `.vercel-static/` (gồm `playground/`) |

Xem `docs/storybook.md`. Consumer portable không cần đường này — họ dùng `styles.css` + `_ds_bundle.js` / ESM.
