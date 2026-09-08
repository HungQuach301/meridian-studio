# WP-003 · Cockpit UI shell

**Wave:** 1 · **Phụ thuộc:** WP-001 · **Trạng thái:** todo

## 1. Mục tiêu
Trang tĩnh một file, deploy được lên ChatGPT Sites, đọc `pipeline/state.json` từ GitHub API và
hiển thị bảng pipeline. Chưa có nút bấm, chưa có gate — chỉ đọc và hiển thị.

## 2. Input
- `engine/contracts/pipeline-state.schema.json`
- `engine/docs/01-architecture.md` mục Cockpit

## 3. Output
- `engine/app/index.html` — HTML + CSS + JS trong một file, không build step
- `engine/app/README.md` — cách deploy lên Sites

## 4. Files in scope
```
engine/app/index.html
engine/app/README.md
```

## 5. Ràng buộc
- **Không framework, không bundler, không npm dependency, không build step.** Vanilla JS trong một file.
- Lý do: cockpit được cập nhật bằng cách copy-paste vào ChatGPT Sites. Nhiều file là không triển khai được.
- PAT nhập qua ô Settings trong trang, lưu bằng biến trong bộ nhớ phiên. Không ghi vào bất kỳ đâu khác.
- Không gọi bất kỳ API nào ngoài `api.github.com`.
- Hiển thị: bảng episode (id, stage, status, spend), đồng hồ `monthlySpendUsd`, thời điểm cập nhật.
- Trạng thái rỗng phải hiển thị đàng hoàng, không lỗi.

## 6. Acceptance test

Codex tự kiểm trong sandbox, chụp lại kết quả vào mô tả PR:
```
# Serve app/ bằng http server tạm trong sandbox, mở bằng headless browser
# -> render được bảng rỗng, không lỗi console
# Thêm 1 episode giả vào pipeline/state.json -> render đúng 1 dòng
```

Chủ dự án kiểm bằng cách: copy nội dung `engine/app/index.html` từ nút **Raw** trên GitHub,
dán vào ChatGPT Sites, publish, mở link.

## 7. Definition of Done
Theo `engine/ops/definition-of-done.md`, cộng thêm:
- [ ] Không có chuỗi nào giống token trong mã nguồn
- [ ] Trang chạy được khi dán thẳng vào ChatGPT Sites: một file duy nhất, không build step, không import cục bộ
