# WP-001 · CI hardening

**Wave:** 1 · **Phụ thuộc:** WP-000 · **Trạng thái:** in-progress

> **Sửa đổi được chủ dự án duyệt 2026-09-09:** WP-000 đã cung cấp CI tối thiểu.
> WP-001 bổ sung guardrails và cache npm; nghiệm thu bằng fixture tạm trong Actions.
> Giữ tên file hiện tại để các liên kết không đổi. Một WP = một nhánh = một PR.

## 1. Mục tiêu
Giữ nguyên validate schema, typecheck và 9 test của WP-000; thêm kiểm tra thay đổi
contract và kích thước file. CI báo lỗi vi phạm; việc bắt buộc checks trước merge còn
phụ thuộc cấu hình bảo vệ nhánh và gói GitHub, không do workflow tự thiết lập.

## 2. Input
`PROJECT.md`, `AGENTS.md`, `engine/ops/guardrails.md`,
`engine/docs/01-architecture.md`, CI và lockfile đã nghiệm thu trong WP-000.

Checkpoint trước triển khai: main `d07591e2cb895d30b80e9aebbbe84576fac3ee2c`,
tree `3878857beb18c07697b4d34890a0c3e9669a3411`.

## 3. Output
Workflow có đúng ba job `validate`, `typecheck`, `guardrails`; cache npm theo lockfile,
fixture acceptance và log có SHA, Node, kết quả/exit code. Tài liệu phản ánh ChatGPT Work
là môi trường thi công, GitHub Actions Node 20 là nơi nghiệm thu Loại 2.

## 4. Files in scope
```
.github/workflows/ci.yml
engine/ops/work-packages/WP-001-ci-validate.md
engine/docs/01-architecture.md
engine/docs/13-upgrade-safety.md
engine/docs/05-runbook.md
engine/ops/backlog.md
```

Cập nhật năm tài liệu trên nhánh WP trước, rồi triển khai workflow. Kiến trúc chỉ đổi
mô tả môi trường thi công/nghiệm thu; upgrade-safety chỉ đổi phân loại nghiệm thu;
runbook bổ sung thao tác CI; backlog chỉ đổi dòng WP-001. Không sửa hồ sơ WP-000.

## 5. Ràng buộc
- **Dependency mới: không.** Giữ nguyên package.json, package-lock.json, Vitest 3.2.7
  đã khóa và hai action SHA từ WP-000. Không thêm action, framework hay helper vào repo.
- Node 20; luôn `npm ci`. Dùng `actions/setup-node` với `cache: npm` và
  `cache-dependency-path: package-lock.json`; cache gói tải xuống, không cache node_modules.
- Giữ `permissions: contents: read`; không thêm quyền, secret, settings, provider hay deploy.
- Chạy `push` trên mọi nhánh và `pull_request` trên mọi nhánh đích, gồm
  `opened`, `synchronize`, `reopened`, `labeled`, `unlabeled`.
- Đúng ba job ID nêu trên. Check của guardrails trên push có tên `guardrails-push`;
  check trên PR tên `guardrails`, để kết quả push không thay thế kiểm tra nhãn của PR.
- Dùng payload sự kiện và Git trong runner; không gọi API để lấy nhãn/diff.
  PR kiểm toàn bộ diff từ merge-base của base/head tới head, không chỉ commit cuối.
  Thiếu/sai payload, SHA, lịch sử hay dữ liệu diff phải fail; không biến lỗi đọc thành diff rỗng.
- Contract: PR thêm, sửa, xóa, đổi tên vào/ra `engine/contracts/` mà không có
  nhãn chính xác `contract-change` phải fail. Nhãn chỉ thỏa điều kiện CI,
  **không cấp quyền cho agent sửa contract**; vẫn cần quyết định riêng của chủ dự án/ADR.
- Kích thước: **5 MB = 5.000.000 byte**. File thêm/sửa/đổi tên ở head đúng ngưỡng
  được qua; lớn hơn phải fail dù có nhãn contract. Kiểm cả push và PR.
  Push thường so before/after; push tạo nhánh kiểm toàn bộ file ở head.
  File xóa không kiểm kích thước. Dùng blob Git, xử lý tên file bằng phân cách NUL;
  đối tượng không đọc/đo được phải fail.
- Fixture và helper sinh lúc chạy chỉ ở `$RUNNER_TEMP`; gọi chính checker/validator
  được dùng cho nguồn thật và kiểm exit code. Không sửa nguồn checkout,
  contracts thật hoặc `pipeline/state.json`; xác minh nguyên vẹn sau chạy.
- Giữ báo cáo npm audit của WP-000. Chủ dự án đã chấp nhận hai mục moderate liên quan
  Vitest trong CI Node hiện tại; không mở browser/UI/dev server hay nâng dependency.
- Chỉ một PR WP-001. Cho phép CI tự động và gắn/gỡ nhãn trên PR này để nghiệm thu.
  Không merge, dispatch/rerun thủ công hoặc triển khai trong tác vụ chuẩn bị PR.

## 6. Acceptance test — LOẠI 2 (GitHub Actions, dữ liệu tạm)

Chạy CI push đạt trước khi mở PR. Sau đó nghiệm thu ngữ cảnh PR và sự kiện nhãn
trên chính PR WP-001; ghi link run, head/source SHA, phiên bản Node/npm và log thực tế.

| Tình huống | Kết quả bắt buộc |
|---|---|
| Nguồn thật hợp lệ | Ba job xanh, Node 20, npm ci, validate, typecheck và 9 test hiện có đạt |
| State hợp lệ trong thư mục tạm | Validator CLI thật exit 0 |
| State tạm thiếu episodes | Validator CLI thật exit 1 và báo required property episodes |
| Contract thêm/sửa/xóa/đổi tên vào hoặc ra, không nhãn | Checker thật exit 1 vì thiếu contract-change |
| Cùng fixture contract có nhãn chính xác | Qua điều kiện contract; nhãn gần giống không được qua |
| File thêm/sửa/đổi tên ở 5.000.000 / 5.000.001 byte | Qua / fail tương ứng; nhãn không bỏ qua giới hạn |
| README nhỏ là thay đổi duy nhất | Checker exit 0 |
| PR nhiều commit, base phân kỳ, tên có khoảng trắng/xuống dòng | Kiểm đúng toàn bộ thay đổi, cả đường dẫn cũ/mới |
| Thiếu hoặc sai base/head/payload | Checker exit khác 0 do lỗi dữ liệu |
| Push thường và push tạo nhánh | Kiểm kích thước; không áp nhãn PR cho push |
| Gắn rồi gỡ nhãn trên PR WP-001 | CI tự phát sinh; log action, nhãn và cùng head SHA đúng |
| Cache chưa có và cache hit | Log hai tình huống từ CI tự động; npm ci và test vẫn đạt |
| Sau mọi kiểm tra | Checkout không đổi; hash state, lockfile và contracts nguyên vẹn |

Negative fixture đạt khi tiến trình con **fail đúng** và harness xác nhận cả exit code
lẫn lý do. Job harness xanh không được mô tả thành PR thật/CI thật đã đỏ. Các fixture
thay thế ba PR thử nghiệm trong đặc tả cũ; không tạo PR phụ hay sửa state/contracts thật.

## 7. Definition of Done
Theo `engine/ops/definition-of-done.md`, cộng thêm:
- [ ] Diff đúng sáu file; tài liệu được cập nhật trước workflow.
- [ ] Bằng chứng Loại 2 đủ cả nguồn thật, fixture, cache và sự kiện nhãn.
- [ ] PR đủ bốn mục; backlog WP-001 ghi trạng thái review và liên kết bằng chứng.
- [ ] Giới hạn required checks và rủi ro Vitest được nêu rõ.
- [ ] Chủ dự án review toàn bộ diff trước khi cho phép merge riêng.

Tại checkpoint 2026-09-09, main chưa được bảo vệ (`protected: false`, required checks off).
API rulesets của repo private trả 403 do giới hạn gói GitHub. WP này không thay đổi gói,
độ riêng tư, quyền hoặc settings; CI đỏ vẫn phải dừng merge theo quy trình của chủ dự án.
