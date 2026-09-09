# WP-003 · Cockpit UI shell

**Wave:** 1 · **Phụ thuộc:** WP-001, WP-003a · **Trạng thái:** todo — đặc tả đã đồng bộ, chưa triển khai

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

## 6. Acceptance dự kiến khi triển khai được duyệt

Agent kiểm offline với fixture/fetch giả trong thư mục tạm: trạng thái rỗng và một episode
hợp lệ hiển thị đúng, lỗi truy cập được xử lý, không rò token và không có request ghi.
Chạy kiểm tra sẵn có của repo, không thêm dependency hoặc sửa workflow để mở rộng gate.
Các fixture không thay đổi `pipeline/state.json` thật.

Nếu được duyệt kiểm bằng trình duyệt trong sandbox, ghi rõ môi trường và kết quả;
không gọi kết quả giả/sandbox là nghiệm thu Site thật.

Chủ dự án review PR và SHA, rồi duyệt riêng lượt kiểm Site: mở URL riêng tư, nhập
commit/blob theo hồ sơ và token trực tiếp trên Site. Mọi lượt thử phải được đếm;
không tự chạy lại, đổi cơ chế hoặc deploy. Chưa dùng lại quyền của phép thử WP-003a.

## 7. Definition of Done

Theo `engine/ops/definition-of-done.md`, cộng thêm:

- [ ] WP-003a đã đóng hồ sơ và ADR-0006 được chấp nhận; chủ dự án duyệt phạm vi WP-003.
- [ ] Khởi động, token đọc state và quy trình cập nhật revision đã chốt, phù hợp loader.
- [ ] Đúng hai file đầu ra; không sửa loader/contracts/state/dependency/workflow ngoài phê duyệt.
- [ ] UI rỗng và fixture episode đạt; không có secret trong mã hoặc bằng chứng.
- [ ] README chỉ hướng dẫn thao tác trình duyệt, ghi rõ phần chưa kiểm.
- [ ] Chủ dự án nghiệm thu Cockpit theo lượt kiểm riêng; CI đạt và merge được duyệt riêng.
