# CHANGELOG

## 0.1.1 — 2026-09-08

- WP-VAL-001 chuyển từ cổng chặn sang tuỳ chọn theo quyết định chủ dự án. Wave 1b trở thành bắt buộc.

## 0.1.0 — 2026-09-08 · Tái cấu trúc bốn lớp, đổi tên Meridian

- Đổi tên Foundry → **Meridian**. Repo `meridian-studio`.
- Tách bốn lớp: `/engine` · `/genres/{genre}` · `/channels/{slug}` · `/portfolio`.
- `format-spec`, `layouts.json`, `asset-policy.json`, `compliance` xuống Genre Pack.
- Palette và font tách thành `visual-tokens.json` theo kênh (chống rủi ro lan danh mục).
- Chiến lược khác biệt: **độ sâu phân tích định lượng**, không dựa kinh nghiệm cá nhân.
  Persona viết lại: kênh là bản phân tích, không có người dẫn.
- Doanh thu: Quảng cáo → Affiliate → Email. Trục RPM 30% ở S02. Bỏ pillar spending-psychology.
- `brief.schema`: versions · workingTitle · noveltyCheck · rpmTier · evergreenScore ·
  explorationEpisode · formatVariant · proposedBy.
- `outline.schema`: adBreaks sinh tự động từ curiosityBridge.
- `package.schema`: 3 Shorts dọc render riêng · affiliate có FTC · link bảng tính.
- Thêm WP-VAL-001 (kiểm giả định khán giả, trước Wave 0) và WP-004a (spike canvas, cổng chặn).
- Thêm CP template, `13-upgrade-safety.md`, `proof-of-human-effort.md`, lớp Portfolio.
- Guardrail 11z/11y/11x/11w: cấm hằng số nội dung vào engine, bắt buộc interface state và provider.
