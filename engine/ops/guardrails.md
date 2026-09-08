# Guardrails

Danh sách cấm. Agent vi phạm bất kỳ mục nào → PR bị từ chối, không thương lượng.

## Cấm tuyệt đối

1. **Không sửa bất cứ file nào trong `/engine/contracts/`.** Thấy schema sai → nêu trong mô tả PR, dừng lại.
2. **Không sửa `PROJECT.md`, `AGENTS.md`, `engine/ops/guardrails.md`, `engine/engine/docs/02-adr/`.** Đây là tài liệu của người.
3. **Không đổi cấu trúc thư mục** đã khai trong `engine/docs/01-architecture.md`.
4. **Không chạm file ngoài mục "Files in scope"** của WP đang làm.
5. **Không thêm dependency** không được liệt kê tên và phiên bản trong WP.
6. **Không hardcode secret** dưới bất kỳ hình thức nào, kể cả trong test hay comment.
7. **Không commit binary** (mp4, mov, wav, mp3, ảnh > 1MB). Dùng GitHub Releases.
8. **Không viết code cho tính năng chưa được yêu cầu.** Không "chuẩn bị cho tương lai".
9. **Không tạo file helper/util/refactor** mà WP không yêu cầu.
10. **Không force push, không sửa lịch sử `main`.**

## Cấm về ranh giới lớp

11z. **Không thêm bất kỳ hằng số nội dung nào vào `/engine`** — tên layout, quy tắc format, trần
     stock, danh sách pillar, palette. Chúng thuộc Genre Pack hoặc Channel Pack.
11y. **Không gọi thẳng GitHub API từ stage.** Phải qua interface state backend.
11x. **Không hardcode tên model hay provider.** Phải qua interface provider, cấu hình ở Genre Pack.
11w. **Không xây Genre Pack thứ hai** trước khi 3 kênh đầu chứng minh mô hình.

## Cấm về kiến trúc

11a. **Không đề xuất hay yêu cầu bất kỳ bước nào chạy trên máy cá nhân của chủ dự án.**
     Không lệnh terminal, không cài phần mềm, không mở file bằng `file://`, không Docker,
     không editor cục bộ. Mọi lệnh chỉ chạy trong sandbox Codex hoặc GitHub Actions.
     Mọi thao tác của người chỉ được là bấm nút trên trình duyệt.
11. Không đề xuất hay dùng: server chạy liên tục, database ngoài, message queue, container registry.
12. Không dùng model sinh video (text-to-video). Xem ADR-0002.
13. Không lưu state ở đâu ngoài repo. Xem ADR-0003.
14. Không đọc/ghi ngoài `/episodes/{id}/`, `/pipeline/`, thư mục tạm của job.

## Cấm về nội dung

15. Không sinh câu mang tính khuyến nghị đầu tư ("you should buy", "this will make you rich").
16. Không dùng số liệu không có mục tương ứng trong `sources.json`.
17. Không dịch nội dung từ tiếng Việt sang tiếng Anh. Viết mới bằng tiếng Anh.
18. Không bê cơ chế tài chính Việt Nam (lãi suất thả nổi, ân hạn gốc lãi, sổ đỏ thế chấp) vào bối cảnh Mỹ.
19. Không dùng asset không có dòng license.

## Phải làm

20. Validate input và output bằng schema ở mọi stage.
21. Mọi stage idempotent.
22. Mô tả PR đủ 4 mục: Đã làm gì / Đã kiểm thế nào / File đã chạm / Rủi ro còn lại.
23. Gặp mâu thuẫn giữa WP và tài liệu định hướng → **dừng và báo cáo**, không tự quyết.
