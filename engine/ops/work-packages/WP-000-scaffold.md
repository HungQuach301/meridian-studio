# WP-000 · Scaffold + CI tối thiểu

**Wave:** 1 · **Phụ thuộc:** không · **Trạng thái:** todo

> **Ghi chú sửa đổi 2026-09-08:** WP này ban đầu chỉ gồm scaffold, và `ci.yml` thuộc WP-001.
> Nhưng đó là một phụ thuộc vòng: acceptance test cần chạy Node, môi trường thi công
> (ChatGPT Work) không có sandbox chạy Node, chỗ duy nhất chạy được là Actions — mà Actions
> cần `ci.yml`, còn `ci.yml` lại cần `package.json` từ chính WP này.
> Đã gộp CI tối thiểu vào đây. WP-001 chuyển thành CI hardening.

## 1. Mục tiêu
Tạo bộ khung tối thiểu **và** một workflow CI đủ để chạy acceptance test. Không viết logic nghiệp vụ.

## 2. Input
`PROJECT.md`, `AGENTS.md`, `engine/ops/guardrails.md`, `engine/docs/01-architecture.md`,
toàn bộ `engine/contracts/*.schema.json`

## 3. Output
- `package.json` với script `validate`, `test`, `typecheck`
- `tsconfig.json`
- `scripts/validate-schemas.ts` — duyệt mọi file JSON trong `/episodes` và `/pipeline`, validate
  bằng schema tương ứng theo bảng ánh xạ trong `engine/contracts/README.md`
- `pipeline/state.json` khởi tạo rỗng, hợp lệ theo `pipeline-state.schema.json`
- `.github/workflows/ci.yml` — **CI tối thiểu**: Node 20, `npm ci`, `npm run validate`,
  `npm run typecheck`. Chạy trên `push` mọi nhánh và trên `pull_request`.

## 4. Files in scope
```
package.json
tsconfig.json
scripts/validate-schemas.ts
pipeline/state.json
.github/workflows/ci.yml
```

## 5. Ràng buộc
- Dependency được phép thêm: `ajv@^8`, `ajv-formats@^3`, `typescript@^5`, `tsx@^4`, `vitest@^3`
- Không thêm framework, linter, bundler.
- Node 20.
- `ci.yml` khai `permissions: contents: read` tường minh. Không thêm job nào ngoài
  `validate` và `typecheck` — phần guardrail checks thuộc WP-001.
- Không tạo thư mục `src/`.

## 6. Acceptance test — **LOẠI 2** (chạy trong GitHub Actions)

Môi trường thi công không có sandbox Node. Quy trình:
1. Đẩy commit lên nhánh `wp/WP-000-scaffold`
2. CI tự chạy trên nhánh đó
3. **Chỉ mở PR sau khi CI xanh**
4. Dán link workflow run vào mô tả PR

Kiểm bắt buộc, ghi kết quả vào mô tả PR:
```
npm ci && npm run validate     -> xanh với pipeline/state.json rỗng
npm ci && npm run typecheck    -> xanh
```
Cộng một lần chạy chứng minh validator **fail đúng**: tạm sửa `pipeline/state.json` thành sai
schema, xác nhận CI đỏ, rồi khôi phục.

## 7. Definition of Done
Theo `engine/ops/definition-of-done.md`, cộng thêm:
- [ ] CI xanh trên nhánh trước khi mở PR, có link workflow run trong mô tả PR
- [ ] Đã chứng minh validator fail đúng khi state sai schema
- [ ] Không có thư mục `src/`
- [ ] `ci.yml` chỉ có 2 job, không thêm gì ngoài phạm vi
