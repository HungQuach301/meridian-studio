# WP-000 · Scaffold cấu trúc dự án

**Wave:** 1 · **Phụ thuộc:** không · **Trạng thái:** todo

## 1. Mục tiêu
Tạo bộ khung mã nguồn tối thiểu để các WP sau có chỗ đứng: package.json, TypeScript config,
script `validate` và `test`, và các thư mục còn thiếu. **Không viết logic nghiệp vụ nào.**

## 2. Input
- `PROJECT.md`, `AGENTS.md`, `engine/ops/guardrails.md`, `engine/docs/01-architecture.md`
- Toàn bộ `/engine/contracts/*.schema.json`

## 3. Output
- `package.json` với script `validate`, `test`, `typecheck`
- `tsconfig.json`
- `scripts/validate-schemas.ts` — duyệt mọi file JSON trong `/episodes` và `/pipeline`, validate
  bằng schema tương ứng theo bảng ánh xạ trong `engine/contracts/README.md`
- `pipeline/state.json` khởi tạo rỗng, hợp lệ theo `pipeline-state.schema.json`
- `config/secrets.example.md`

## 4. Files in scope
```
package.json
tsconfig.json
scripts/validate-schemas.ts
pipeline/state.json
config/secrets.example.md
```

## 5. Ràng buộc
- Dependency được phép thêm: `ajv@^8`, `ajv-formats@^3`, `typescript@^5`, `tsx@^4`, `vitest@^3`
- Không thêm framework, không thêm linter, không thêm bundler ở WP này.
- Node 20.

## 6. Acceptance test

**Các lệnh này Codex tự chạy trong sandbox của mình trước khi mở PR. Chủ dự án KHÔNG chạy gì.**
Kết quả phải được dán vào mục "Đã kiểm thế nào" của mô tả PR.

```
npm install
npm run validate     # phải xanh với pipeline/state.json rỗng
npm run typecheck    # phải xanh
```

## 7. Definition of Done
Theo `engine/ops/definition-of-done.md`, cộng thêm:
- [ ] `scripts/validate-schemas.ts` fail đúng khi cố tình sửa `pipeline/state.json` thành sai schema
- [ ] Không có thư mục `src/` — chưa cần ở WP này
