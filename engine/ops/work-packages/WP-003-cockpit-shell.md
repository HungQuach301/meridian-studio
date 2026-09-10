# WP-003 · Cockpit UI shell

**Wave:** 1 · **Phụ thuộc:** WP-001, WP-003a · **Trạng thái:** done — snapshot rỗng đã nghiệm thu; PR #10 đã merge; hồ sơ đóng theo phê duyệt riêng

## 1. Mục tiêu

Cockpit JavaScript một file chạy qua loader tĩnh trên Sites theo ADR-0006, đọc
`pipeline/state.json` từ `HungQuach301/meridian-studio` bằng GitHub API và hiển thị
bảng pipeline. Chưa có nút ghi, gate hoặc dispatch.

## 2. Input

- `engine/contracts/pipeline-state.schema.json` — chỉ đọc, không sửa contract.
- `engine/docs/01-architecture.md` và `engine/docs/02-adr/ADR-0006-cockpit-delivery.md`.
- `engine/ops/work-packages/WP-003a-sites-loader-spike.md` — nguồn/bằng chứng và giới hạn.
- `engine/app/loader.html` — giao diện nạp mã và tín hiệu hoàn tất hiện có.

## 3. Output

- `engine/app/cockpit.js` — thay probe bằng UI chỉ đọc, không build step.
- `engine/app/README.md` — hướng dẫn dùng loader và review nguồn bằng trình duyệt.

## 4. Files in scope khi WP-003 được duyệt triển khai

```
engine/app/cockpit.js
engine/app/README.md
```

Đợt đồng bộ hồ sơ WP-003a chỉ sửa đặc tả này, chưa sửa hai file đầu ra.
Loader không thuộc phạm vi triển khai nêu trên. Nếu cần đổi loader, dừng và xin phạm vi riêng.

## 5. Ràng buộc và việc phải chốt trước triển khai

- Vanilla JavaScript một file, không framework, bundler, dependency/action mới hoặc build step.
- Mã chuẩn ở Meridian; kho Sites chỉ giữ loader và hosting metadata, không copy Cockpit/state.
- Ghi commit SHA và blob SHA được review cho mỗi revision tải qua loader; không tự theo main.
  README phải hướng dẫn lấy hai SHA từ hồ sơ review, không nhầm với commit kho nguồn Sites.
- Function constructor là cơ chế đã được nghiệm thu. Không tự fallback Script inline/Pages.
- Chốt cách khởi động và báo hoàn tất tương thích loader hiện có trước khi triển khai.
  Marker của probe không thay cho nghiệm thu chức năng Cockpit.
- Token đọc state do chủ dự án nhập qua ô Settings, fine-grained chỉ Contents read của Meridian,
  chỉ giữ trong bộ nhớ phiên; không lưu storage/cookie/URL/log/Sites environment.
- Không giả định token dùng tải mã được truyền cho Cockpit qua biến toàn cục. Đặc tả triển khai
  phải làm rõ hai bước nhập token; nếu muốn thay giao diện token của loader thì xin duyệt riêng.
- Chỉ gọi `api.github.com`; chưa có quyền ghi, Actions hoặc dispatch.
- Hiển thị episode: id, stage, status, spend; `monthlySpendUsd`; thời điểm `updatedAt`.
- Trạng thái rỗng phải rõ ràng, không lỗi. Không sửa state thật để tạo episode mẫu.
- Quy trình cập nhật revision và thử trên Site thật cần phê duyệt riêng; chưa chứng minh
  cập nhật hai revision trên cùng Sites version mà không triển khai lại.

## 6. Acceptance đã đạt

Agent đã kiểm bằng DOM/fetch giả trong thư mục tạm, Node v24.19.0: 88 case đạt, gồm khởi động
đồng bộ với loader nguyên byte, snapshot rỗng/có episode, optional/zero, UTF-8, dữ liệu sai,
HTTP/network/timeout/integrity, bấm trùng, pagehide và token không vào bằng chứng/storage/global.
[PR #10](https://github.com/HungQuach301/meridian-studio/pull/10) ghi hash harness/runtime/kết quả; fixture không sửa state thật.
Không coi DOM/fetch giả là nghiệm thu trình duyệt/Site thật hoặc typecheck cho Cockpit.

Chủ dự án đã nghiệm thu một lượt Site theo hai ảnh: `WP003A_EXECUTED` và `WP003_STATE_LOADED`,
nguồn mã/state cùng commit `a75be6c1b583c820389648bed6f4eb5cca333ce9`, 88 byte, 0 episode, $0.00.
Chrome do chủ dự án cung cấp: `152.0.7977.83 (Official Build) (64-bit)`; báo Updating 29%
không chứng minh cập nhật hoàn tất. Token chỉ Meridian/Contents Read-only/Metadata read mặc định
và giữ 30 ngày là xác nhận của chủ dự án, không phải kiểm quyền/ngày hết hạn độc lập.

PR #10 đã review tại head `4f56a162fbe3184f00e87ba5ca39a938f412f73a` và merge riêng sau phê duyệt.
CI sau merge dùng Node v20.20.2: test 9/9, validate 13 schema/1 JSON/0 failure, typecheck và
guardrails-push đạt; Hello verify đạt, heartbeat/send-hello skipped. Hồ sơ chi tiết ở mục 8.
Lượt Site đã dùng hết quyền; không tự thử lại, đổi cơ chế, redeploy hoặc dùng quyền WP-003a.

## 7. Definition of Done

Theo `engine/ops/definition-of-done.md`, cộng thêm:

- [x] WP-003a đã đóng hồ sơ và ADR-0006 được chấp nhận; chủ dự án duyệt phạm vi WP-003.
- [x] Khởi động, token đọc state và quy trình cập nhật revision đã chốt, phù hợp loader.
- [x] Đúng hai file đầu ra; không sửa loader/contracts/state/dependency/workflow ngoài phê duyệt.
- [x] UI rỗng và fixture episode đạt; không có secret trong mã hoặc bằng chứng.
- [x] README chỉ hướng dẫn thao tác trình duyệt, ghi rõ phần chưa kiểm.
- [x] Chủ dự án nghiệm thu Cockpit theo lượt kiểm riêng; CI đạt và merge được duyệt riêng.

## 8. Hồ sơ đóng WP-003

Chủ dự án duyệt đóng hồ sơ đúng sáu file/vị trí đã lập kế hoạch, bằng một commit tài liệu
trên main và CI tự động, không mở PR mới. Phê duyệt này riêng với hai file triển khai ở mục 4:

- `engine/ops/backlog.md`: chỉ dòng WP-003.
- `engine/docs/05-runbook.md`: xử lý UI snapshot và phần vận hành WP-003 đã duyệt.
- `engine/ops/work-packages/WP-003-cockpit-shell.md`: trạng thái, acceptance, checklist và hồ sơ này.
- `engine/docs/01-architecture.md`: trạng thái Cockpit và phân biệt vòng đời hai token.
- `engine/docs/07-delivery-plan.md`: bước 1.4 và phần Wave 1 còn thiếu.
- `engine/app/README.md`: trạng thái review/merge/đóng và mốc sau merge.

### Nguồn và bằng chứng

- [PR #10](https://github.com/HungQuach301/meridian-studio/pull/10); head review `4f56a162fbe3184f00e87ba5ca39a938f412f73a`.
- Merge/main `3d72e2bd6836baa7e752da4c5667a1c6f4ff6fc4`; tree `32cf997a58708e1233ba56b3dbf123f1856eefaa`.
- [CI sau merge 34422376087](https://github.com/HungQuach301/meridian-studio/actions/runs/34422376087) và [Hello 34422376095](https://github.com/HungQuach301/meridian-studio/actions/runs/34422376095): success, attempt 1.
- Nguồn đã chạy trên Site: `a75be6c1b583c820389648bed6f4eb5cca333ce9`, blob Cockpit
  `a19612eb3d608f848e2970b0d858516ee5f67fc4`, SHA-256
  `c51905810fe779b8555aaa67df2a39d0558c7dd168a0c361c45227fdb1d0bbea`.
- Loader giữ blob `589b292d88a7b8578541feea5eedb3634d8cddb4`, SHA-256
  `8ce0d5d03b0d1a5a18e7ece4337d7fb68e072c6d3c987619b4f02b794fccbdc0`.
- State cùng commit: blob `4846d4649f5f7f4460b3560594e9fb38408b66f0`, SHA-256
  `bd1df1537db185b1d54cd39dcc9cefb19652dd9354738bb35b824fcf06cf6aee`; 88 byte,
  `updatedAt: 2026-09-09T08:39:17.722Z`, `monthlySpendUsd: 0`, `episodes: []`.
- [Hai ảnh/log, Sites version/deployment, Chrome và xác nhận token](https://github.com/HungQuach301/meridian-studio/blob/4f56a162fbe3184f00e87ba5ca39a938f412f73a/engine/app/README.md#hồ-sơ-nghiệm-thu-snapshot-rỗng-wp-003)
  đã được chủ dự án nghiệm thu; agent đối chiếu nguồn, không trực tiếp thao tác Site hoặc kiểm token độc lập.

Đối soát trước commit đóng: 102 file, 64 workflow run, 21 Hello, không run đang chạy.
Chỉ sáu tài liệu trên được phép đổi; 96 file còn lại, code/loader/contracts/package/lockfile/
workflows/state, ADR-0006 và hồ sơ WP-003a giữ nguyên byte. Không có quyết định kiến trúc mới.

### Đối chiếu DoD

| Nhóm | Cơ sở hoàn tất |
|---|---|
| Kỹ thuật | Test/validate/typecheck/CI sau merge đạt; dependency giữ nguyên; bằng chứng quét không có giá trị credential ở PR #10. Prefix mẫu trong tài liệu/quy tắc không phải secret thật |
| Chức năng | 88 case offline và snapshot rỗng được chủ dự án nghiệm thu; hai mục idempotency/khôi phục dành cho stage không áp dụng cho UI này |
| Phạm vi | Hai file triển khai trong PR #10; sáu file đóng hồ sơ được chủ dự án duyệt riêng; không sửa mẫu DoD hoặc tự mở rộng quyền |
| Tài liệu và phê duyệt | PR #10 đủ bốn mục, head đã review và merge được duyệt; backlog/runbook và trạng thái WP-003 được đồng bộ trong commit đóng này |

CI của commit đóng hồ sơ được theo dõi và đọc lại khi bàn giao; link/kết quả mới báo riêng,
không gọi CI của merge là CI của commit tài liệu. Nếu CI chưa đạt/hết ngân sách thì dừng và báo,
không tự rerun hoặc thêm commit ngoài quyền một commit đã duyệt.

### Giới hạn giữ nguyên

Chỉ snapshot rỗng tại nguồn/môi trường đã ghi được nghiệm thu Site. Dữ liệu có episode và lỗi
mới có bằng chứng offline. Chưa kiểm Script inline; reload/xóa và nhập lại token; phép kiểm
đối chứng hai revision trên cùng Sites version; trình duyệt/phiên bản khác hoặc chính sách Sites
tương lai; client dispatch WP-004; so toàn bộ byte archive máy chủ tải trực tiếp.
Không suy rộng thành tự nhận UI mới sau commit/reload. Merge/đóng hồ sơ không là lượt Site mới.
Giữ nghiệm thu WP-003a và các header/checkbox lịch sử của hồ sơ đó; không sửa ADR-0006.
Token WP-003 giữ 30 ngày theo xác nhận chủ dự án; không ghi là đã thu hồi, không lưu trong
ứng dụng và không cấp thêm lượt thử. WP-004 và DoD Wave 1 vẫn chưa hoàn tất.

### Sổ thời gian cộng dồn

| Giai đoạn WP-003 | Thời gian thực tế đã ghi |
|---|---:|
| Chuẩn bị PR và CI | 27 phút 46 giây |
| Review code read-only | 7 phút 42 giây |
| Chuẩn bị/đối soát trước Site | 3 phút 57 giây |
| Chủ dự án tạo token và chạy thử | 5 phút 23 giây |
| Đối soát sau Site | 2 phút 19 giây |
| Đồng bộ README/mô tả PR và CI, gồm đọc lại | 17 phút 22 giây |
| Review hồ sơ read-only | 4 phút 11 giây |
| Merge-only và CI sau merge | 4 phút 48 giây |
| Lập kế hoạch đóng read-only | 4 phút 25 giây |
| Tổng trước đợt đóng | **77 phút 53 giây** |
| Đợt đóng đến mốc soạn hồ sơ dưới đây | **4 phút 20 giây** |
| Tổng đến mốc soạn hồ sơ | **82 phút 13 giây / 90 phút** |
| Còn lại tại mốc soạn hồ sơ | **7 phút 47 giây** |

Đợt đóng bắt đầu `2026-09-10T00:58:15.556Z`; mốc soạn hồ sơ
`2026-09-10T01:02:34.804Z`. Kiểm diff/commit/push/CI/đọc lại sau mốc này tiếp tục cộng
vào cùng ngân sách và báo số thực tế tại bàn giao; không tạo commit thứ hai chỉ để cập nhật đồng hồ.
Lượt Site 11 phút 39 giây / 15 phút đã nằm trong tổng, không cộng hai lần. Không tính thời gian
chờ chủ dự án giữa các lượt; không đặt lại ngân sách hoặc dùng thời gian/quyền WP-003a.
