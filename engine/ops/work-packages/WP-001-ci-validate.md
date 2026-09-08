# WP-001 · CI validate schema

**Wave:** 1 · **Phụ thuộc:** WP-000 · **Trạng thái:** todo

## 1. Mục tiêu
Mọi PR phải chạy validate schema và typecheck. PR sai schema bị chặn tự động.
Đồng thời chặn hai vi phạm guardrail phổ biến nhất: sửa `/contracts` và commit file lớn.

## 2. Input
`package.json` từ WP-000, `engine/ops/guardrails.md`.

## 3. Output
- `.github/workflows/ci.yml`

## 4. Files in scope
```
.github/workflows/ci.yml
```

## 5. Ràng buộc
- Chạy trên `pull_request` với mọi nhánh đích.
- `permissions:` khai tường minh, chỉ `contents: read`.
- Ba job: `validate`, `typecheck`, `guardrails`.
- Job `guardrails` fail nếu: PR thay đổi file trong `engine/contracts/` mà không có nhãn `contract-change`,
  hoặc có file mới > 5MB.
- Cache `node_modules`.

## 6. Acceptance test
```
# 1. Mở PR sửa pipeline/state.json thành JSON sai schema  -> CI đỏ ở job validate
# 2. Mở PR sửa engine/contracts/brief.schema.json không nhãn     -> CI đỏ ở job guardrails
# 3. Mở PR sửa README.md                                   -> CI xanh
```

## 7. Definition of Done
Theo `engine/ops/definition-of-done.md`, cộng thêm:
- [ ] Đã chạy thật cả 3 tình huống trong acceptance test và ghi kết quả vào mô tả PR
