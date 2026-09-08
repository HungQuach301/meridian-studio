# WP-003a · Spike: Sites có nạp được mã động không

**Wave:** 1 · **Phụ thuộc:** WP-000 · **Trạng thái:** todo
**Loại:** SPIKE — mục tiêu là câu trả lời có/không, không phải tính năng.

## 1. Mục tiêu
Xác định ChatGPT Sites có cho phép nạp và thực thi JavaScript tải về lúc chạy hay không.
Câu trả lời quyết định cách triển khai cockpit và có xoá được bước copy-paste thủ công hay không.

**Hộp thời gian: dừng lại sau 2 giờ dù kết quả thế nào.** Spike không được kéo dài.

## 2. Input
`engine/app/loader.html`, `engine/docs/01-architecture.md` mục "Triển khai cockpit".

## 3. Cách làm (chủ dự án tự làm, không giao Codex)
1. Sửa `REPLACE_OWNER` trong `engine/app/loader.html` thành username GitHub.
2. Tạo file `engine/app/cockpit.js` với nội dung tối thiểu:
   `document.getElementById('meridian-gate').innerHTML = '<h2>Loader OK</h2>';`
3. Dán `engine/app/loader.html` vào ChatGPT Sites, publish.
4. Mở site, nhập PAT, bấm nút.

## 4. Kết quả có thể xảy ra

| Kết quả | Kết luận | Hành động tiếp |
|---|---|---|
| Hiện "Loader OK" | Sites cho phép nạp động | **Phương án A.** Viết `engine/app/cockpit.js` ở WP-003. Dán Sites một lần duy nhất, vĩnh viễn |
| Lỗi nhắc CSP / unsafe-eval | Sites chặn mã động | **Phương án B.** Chuyển WP-003 sang iframe + GitHub Pages |
| Lỗi GitHub API 401/403 | Vấn đề token, không phải CSP | Sửa quyền PAT rồi thử lại |
| Lỗi CORS | API GitHub bị chặn từ origin Sites | **Phương án B** |

## 5. Output
- Ghi kết quả vào `engine/engine/docs/02-adr/ADR-0006-cockpit-delivery.md` (chủ dự án viết, không phải agent).
- Cập nhật `engine/docs/01-architecture.md` mục "Triển khai cockpit" theo phương án thắng.

## 6. Definition of Done
- [ ] Đã chạy thử thật trên ChatGPT Sites, không phải suy đoán
- [ ] ADR-0006 ghi rõ phương án chọn và bằng chứng
- [ ] WP-003 được cập nhật để khớp phương án đó
