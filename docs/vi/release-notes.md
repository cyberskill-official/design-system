# Ghi chú phát hành

Điểm nổi bật sản phẩm cho operator — **không** phải git log và **không** phải `CHANGELOG.md`. Hệ thống thiết kế không maintain file changelog. Phiên bản giữ cố định **1.0.0**; chân lý kỹ thuật là tip repo, chân lý hướng sản phẩm là trang này (đồng bộ Storybook **Release Notes**).

## Storybook tại gốc domain

`design.cyberskill.world/` là site sản phẩm Storybook đầy đủ. Docs, Foundations, Components, Release Notes và Status nằm trong một sidebar. Đường legacy `/dashboard` và `/playground` redirect về `/`.

Consumer portable không đổi: `styles.css`, `_ds_bundle.js`, và `_esm/cs.mjs`. Storybook chỉ là tooling host.

## Quality gate trên Status

Story **Status** nhúng bảng gate nhanh (`_audit/run.html`). Gate cứng fail board khi hỏng; hàng advisory được gắn nhãn rõ và không lật aggregate pass. Mở Status lần đầu sẽ auto-run; dùng **Re-run** khi cần chạy lại.

## Docs và template song ngữ

Docs operator công khai có cặp EN·VI dưới `docs/` / `docs/vi/`. Template giữ bilingual EN·VN với chế độ ngôn ngữ tách hoàn toàn. Chuỗi component resolve từ registry trung tâm.

## Foundations và thư viện CSF

Toolbar Theme × Element × Language khớp template production. Mọi primary công khai có Default + ma trận điều khiển trung thực. Foundations gồm màu, typography, spacing, elevation, motion, và 15 pack Ngũ Hành.

## Token và bản native

Token CSS, DTCG (`tokens/tokens.dtcg.json`), và mirror SwiftUI / Compose / Flutter giữ lockstep qua token pipeline. Text không bao giờ nằm trên `-accent` mid-tone — doctrine APCA được gate enforce.

## Những gì chúng ta không bao giờ ship

- File gốc **`CHANGELOG.md`** (cấm bởi doctrine và docs-consistency)
- Bump VERSION khi chưa có quyết định tường minh từ owner
- Storybook như dependency của consumer
