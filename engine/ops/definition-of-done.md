# Definition of Done

Áp cho mọi WP. Thiếu một mục = chưa xong.

## Kỹ thuật
- [ ] `npm run validate` xanh (toàn bộ JSON khớp schema).
- [ ] `npm run test` xanh.
- [ ] CI xanh.
- [ ] Không file nào ngoài "Files in scope" bị thay đổi.
- [ ] Không dependency mới ngoài danh sách trong WP.
- [ ] Codex đã quét repo tìm chuỗi giống secret (`sk-`, `ghp_`, `AIza`, `BEGIN PRIVATE KEY`) và không ra kết quả. Chủ dự án không chạy lệnh nào.

## Chức năng
- [ ] Acceptance test trong WP chạy được và pass.
- [ ] Nếu là stage: chạy lại hai lần cho kết quả như nhau (idempotent).
- [ ] Nếu là stage: pipeline chạy tiếp được từ stage này sau khi đứt.

## Tài liệu
- [ ] Mô tả PR đủ 4 mục.
- [ ] Nếu có quyết định kỹ thuật mới phát sinh: ghi vào phần "Rủi ro còn lại", **không tự viết ADR**.
- [ ] `engine/ops/backlog.md` cập nhật trạng thái WP.
- [ ] `engine/docs/05-runbook.md` cập nhật nếu có thao tác vận hành mới.

## Người duyệt
- [ ] Chủ dự án đã đọc toàn bộ diff, không merge mù.
