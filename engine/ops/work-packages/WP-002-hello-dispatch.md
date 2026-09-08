# WP-002 · Workflow hello + repository_dispatch

**Wave:** 1 · **Phụ thuộc:** WP-000 · **Trạng thái:** todo

## 1. Mục tiêu
Chứng minh vòng điều khiển thông: một sự kiện từ bên ngoài kích hoạt Actions, job ghi kết quả
ngược vào repo. Đây là nền của toàn bộ compute plane.

## 2. Input
`engine/docs/01-architecture.md` mục "Luồng một tập".

## 3. Output
- `.github/workflows/hello.yml`: nhận `repository_dispatch` với `event_type: hello`, và cả
  `workflow_dispatch` để bấm tay. Job ghi một dòng timestamp vào `pipeline/state.json`
  (trường `updatedAt`) và commit.

## 4. Files in scope
```
.github/workflows/hello.yml
```

## 5. Ràng buộc
- Dependency được phép thêm: không.
- `permissions: contents: write` — không hơn.
- Commit bằng `github-actions[bot]`, message `chore: heartbeat`.
- Job phải idempotent: chạy hai lần không tạo xung đột.

## 6. Acceptance test
```
# Bấm Run workflow trong tab Actions -> job xanh, pipeline/state.json có updatedAt mới
# Gọi repository_dispatch bằng curl với PAT -> job xuất hiện và chạy
```

## 7. Definition of Done
Theo `engine/ops/definition-of-done.md`, cộng thêm:
- [ ] Ghi vào `engine/docs/05-runbook.md` cách gọi dispatch thủ công bằng curl
