# ADR-0006 · Phân phối Cockpit bằng loader tĩnh trên Sites

**Trạng thái:** Chấp nhận  
**Ngày:** 2026-09-09  
**Người quyết định:** HungQuach301  
**Phạm vi:** Kết luận WP-003a và định hướng triển khai WP-003  
**Soạn thảo:** Agent theo yêu cầu của chủ dự án; chủ dự án duyệt nội dung và quyết định.

## Bối cảnh

Meridian Studio sử dụng ba mặt phẳng: Sites phục vụ giao diện,
GitHub repository lưu mã nguồn và trạng thái, GitHub Actions thực thi
công việc. Chủ dự án thao tác bằng trình duyệt.

Repository `HungQuach301/meridian-studio` là nguồn sự thật duy nhất.

WP-003a kiểm chứng liệu loader tĩnh trên Sites có thể lấy JavaScript
từ repository riêng tư và thực thi trong trình duyệt hay không.
Giới hạn của spike là 2 giờ, gồm thời gian chuẩn bị, đối soát và thử nghiệm.

Chủ dự án đã nghiệm thu một lượt Function constructor và kết quả UTF-8
trên Sites phiên bản 1 bằng Google Chrome. Việc nghiệm thu lượt thử
được ghi nhận riêng với việc phê duyệt ADR này.

## Các phương án đã cân nhắc

| Phương án | Đánh giá |
| --- | --- |
| Loader tĩnh trên Sites, lấy JavaScript từ Meridian và thực thi bằng Function constructor | Có bằng chứng thực tế đã được chủ dự án nghiệm thu; đề xuất chọn cho WP-003. |
| Loader dùng Script inline | Chưa thử; không coi là cơ chế dự phòng đã được nghiệm thu. |
| Sao chép toàn bộ Cockpit vào Sites sau mỗi thay đổi | Không chọn làm quy trình mặc định; khiến bản triển khai phải mang theo toàn bộ mã giao diện. |
| Sites nhúng GitHub Pages hoặc chuyển hẳn sang Pages | Không chọn trong ADR này; không tự chuyển phương án khi gặp lỗi. |

## Quyết định đề xuất

### 1. Chọn loader tĩnh trên Sites cho WP-003

Tiếp tục kiến trúc loader tĩnh trên Sites, lấy mã Cockpit từ Meridian
và sử dụng Function constructor làm cơ chế thực thi đã kiểm chứng.

Kết luận này áp dụng cho phiên bản, mã nguồn và môi trường đã thử.
Đây là cơ sở triển khai WP-003, chưa phải nghiệm thu Cockpit hoàn chỉnh.

Không thêm hoặc nâng dependency, action, framework hay bundler để
thực hiện phương án này. JavaScript chạy trong trình duyệt không làm
thay đổi contracts hoặc quy ước triển khai của Engine.

### 2. Giữ Meridian là nguồn sự thật duy nhất

Kho Git do Sites quản lý chỉ giữ bản sao triển khai loader và metadata
hosting, với đúng hai file nguồn:

| File trong kho Sites | Nguồn hoặc vai trò |
| --- | --- |
| `dist/index.html` | Bản sao nguyên byte của `engine/app/loader.html` tại commit Meridian đã được duyệt. |
| `.openai/hosting.json` | Metadata phục vụ hosting, trỏ tới `dist` và đúng Site Meridian. |

Không phát triển Cockpit trong kho Sites. Không sao chép `cockpit.js`,
`pipeline/state.json`, tài liệu hoặc toàn bộ lịch sử Meridian vào kho này.

Mọi thay đổi loader phải bắt đầu từ Meridian, được review và duyệt trước
khi đồng bộ bản sao triển khai sang Sites.

### 3. Gắn mỗi lượt nạp mã với nguồn đã xác minh

Loader của phép thử sử dụng:

- Repository cố định: `HungQuach301/meridian-studio`.
- Đường dẫn cố định: `engine/app/cockpit.js`.
- Commit SHA cụ thể đã được duyệt.
- Blob SHA dự kiến đã được đối soát.
- GitHub Contents API để đọc mã; giải mã UTF-8 và kiểm tra blob trước
  khi thực thi.
- SHA-256 của mã để ghi nhận bằng chứng.

Không diễn giải cơ chế hiện tại thành “luôn theo main” hoặc
“commit mới rồi reload là tự nhận giao diện mới”.

Quy trình chọn và cập nhật commit/blob cho Cockpit phải được mô tả rõ
trong WP-003 trước triển khai. Không tự thử lại hoặc tự đổi cơ chế
thực thi khi gặp lỗi.

### 4. Giữ ranh giới truy cập và credential

Site Meridian sử dụng cấu hình chia sẻ riêng tư chỉ chủ sở hữu.
Quyền chia sẻ phải được đối soát trước thao tác triển khai được duyệt.

Token đọc GitHub của phép thử là fine-grained token chỉ có
Contents read trên `HungQuach301/meridian-studio`. Chủ dự án tự nhập
trên Site; token không được gửi vào chat hoặc lưu trong mã nguồn,
metadata hosting, URL hay bằng chứng.

Token chỉ tồn tại trong bộ nhớ của phiên làm việc. Không dùng
localStorage, sessionStorage hoặc cookie để lưu token.

Credential nguồn ngắn hạn của kho Sites và token đọc Meridian có
hai mục đích riêng biệt; không dùng thay thế cho nhau.

WP-003 phải mô tả rõ cách nhận token để đọc trạng thái. Không giả định
token dùng để tải mã được truyền sẵn cho Cockpit qua biến toàn cục.

Quyền ghi repository, Actions hoặc dispatch không thuộc quyết định này.

### 5. Giữ WP-003 ở phạm vi Cockpit chỉ đọc

Đặc tả WP-003 cần chuyển sang các đầu ra:

- `engine/app/cockpit.js`: giao diện Cockpit chạy qua loader.
- `engine/app/README.md`: hướng dẫn sử dụng và vận hành bằng trình duyệt.

WP-003 tiếp tục đọc và hiển thị `pipeline/state.json`, bao gồm trạng thái
rỗng; chưa bổ sung nút ghi, gate hoặc dispatch.

Trước triển khai, WP-003 phải xác định cách khởi động và báo hoàn tất
phù hợp với loader hiện có. Thay đổi loader, nếu cần, phải được nêu
thành phạm vi riêng để chủ dự án duyệt.

Dữ liệu giả phục vụ kiểm tra phải nằm trong fixture tạm; không sửa
`pipeline/state.json` thật để tạo tình huống thử.

## Bằng chứng đã được nghiệm thu

### Nguồn và phiên bản triển khai

| Mốc | Giá trị |
| --- | --- |
| Meridian main | `423353caaf795db764602283abf299b1e7778871` |
| Meridian tree | `c107d50aaa51895e5d33f1658eedf5499d335e97` |
| Blob của loader | `589b292d88a7b8578541feea5eedb3634d8cddb4` |
| SHA-256 của loader | `8ce0d5d03b0d1a5a18e7ece4337d7fb68e072c6d3c987619b4f02b794fccbdc0` |
| Commit kho Sites | `c720b33be01a575e383444fe49e803135d6b0f2b` |
| Site | `meridian-studio` — Meridian Studio |
| Project ID | `appgprj_6aa16be27e688191956ed0746e3af820` |
| Phiên bản | `1` |
| Version ID | `appgprj_6aa16be27e688191956ed0746e3af820~appgver_ff3f047e374481919d61d43b1713372d` |
| Deployment ID | `appgdep_6aa16ea9d6088191ad326edc6fa8982b` |
| Kết quả triển khai | `succeeded` |
| Blob của mã thử | `3489a8b303d049b650a222e24e420e51aa110b1b` |
| SHA-256 của mã thử | `44247934c534d274c81d108bde10c0d423364b1e4b0990c5ae5a77aaa18dd6aa` |

Nguồn triển khai:
[PR #8](https://github.com/HungQuach301/meridian-studio/pull/8).

Site:
[Meridian Studio](https://meridian-studio.quach-hung.chatgpt.site).

Archive phiên bản 1 có `file_count = 2`, kích thước 20.480 byte và
content hash:

`sha256:4d1385033e77599234abecdd711a84353213b49bacdd36d05fa4a8583001fe97`

Hai đường dẫn trong archive là `dist/index.html` và
`dist/.openai/hosting.json`. Đường dẫn metadata trong archive khác
đường dẫn metadata tại gốc kho nguồn do bước đóng gói.

Đối soát archive dựa trên metadata phiên bản và việc tái dựng tar
chuẩn hóa từ hai file, cho kết quả hash khớp. Chưa tải trực tiếp
archive phía máy chủ để so sánh toàn bộ byte.

### Lượt thử Function constructor

Chủ dự án thực hiện đúng một lượt bằng Google Chrome; số phiên bản
Chrome chưa được ghi nhận.

```jsonl
{"repository":"HungQuach301/meridian-studio","path":"engine/app/cockpit.js","ref":"423353caaf795db764602283abf299b1e7778871","expectedBlob":"3489a8b303d049b650a222e24e420e51aa110b1b","mechanism":"function","startedAt":"2026-09-09T14:49:33.396Z"}
{"httpStatus":200}
{"verifiedBlob":"3489a8b303d049b650a222e24e420e51aa110b1b","codeSha256":"44247934c534d274c81d108bde10c0d423364b1e4b0990c5ae5a77aaa18dd6aa"}
{"outcome":"WP003A_EXECUTED","finishedAt":"2026-09-09T14:49:34.509Z"}
```

Ảnh kết quả cho thấy:

- Trạng thái `WP003A_EXECUTED`.
- Nội dung `Loader OK`.
- Chuỗi `wp003a-v1 · Kiểm tra UTF-8: tiếng Việt — ✓`.
- Nút chạy lượt thử đã bị vô hiệu hóa.

Thời gian từ bắt đầu đến kết thúc trong log là 1,113 giây.
Chủ dự án báo tổng thời gian tạo token và chạy thử là 3 phút.

Chủ dự án xác nhận token chỉ có Contents read của Meridian, đã xóa
token, và nghiệm thu kết quả Function constructor cùng UTF-8.
Quyền và việc xóa token là xác nhận của chủ dự án, không phải kết quả
kiểm tra token độc lập của agent.

Lượt thử được duyệt đã hoàn tất; không còn lượt thử được phép chạy
theo phê duyệt đó.

### Checkpoint repository

Tại lần đối soát phục vụ bản đề xuất:

- Main và tree khớp các giá trị ghi trên.
- Có 44 workflow run toàn repo, gồm 12 run Hello; không có run đang chạy.
- [CI 34360862197](https://github.com/HungQuach301/meridian-studio/actions/runs/34360862197):
  success, attempt 1.
- [Hello 34360862138](https://github.com/HungQuach301/meridian-studio/actions/runs/34360862138):
  success, attempt 1; heartbeat và send-hello skipped.
- SHA-256 của `pipeline/state.json` giữ nguyên:
  `bd1df1537db185b1d54cd39dcc9cefb19652dd9354738bb35b824fcf06cf6aee`.
- `updatedAt = 2026-09-09T08:39:17.722Z`,
  `monthlySpendUsd = 0`, `episodes = []`.

## Những phần chưa kiểm chứng

Không coi các nội dung sau là đã đạt:

1. Cơ chế Script inline.
2. Hành vi xóa token và nhập lại token sau reload trên Site thật.
3. Hai revision Cockpit khác nhau chạy trên cùng phiên bản Sites
   mà không triển khai lại.
4. Trình duyệt khác, phiên bản Chrome khác hoặc thay đổi chính sách
   thực thi mã của Sites trong tương lai.
5. Cockpit đọc và hiển thị trạng thái thật theo WP-003.
6. Client ngoài GitHub thực hiện dispatch theo WP-004.

Thành công của một lượt thử không chứng minh khả năng cập nhật UI
tự động, mọi cơ chế thực thi đều hoạt động, hoặc toàn bộ Cockpit
đã sẵn sàng sử dụng.

## Hệ quả

- Chủ dự án có thể sử dụng giao diện qua trình duyệt; mã nguồn và lịch sử
  review tiếp tục tập trung tại Meridian.
- Bản sao triển khai trên Sites có phạm vi nhỏ, với chuỗi đối soát rõ
  từ commit Meridian đến loader, commit Sites, phiên bản và deployment.
- Quy trình phải quản lý commit/blob của mã được phép nạp; không được
  dựa vào giả định tự theo main.
- Thay đổi loader cần quy trình review và triển khai được duyệt.
- Function constructor phụ thuộc chính sách thực thi mã của môi trường
  hosting và trình duyệt. Khi không hoạt động, dừng và báo bằng chứng;
  không tự chuyển sang Script inline hoặc Pages.
- Không cần thêm lượt thử để ghi nhận kết luận hẹp đã được nghiệm thu.
  Kiểm chứng các phần còn thiếu cần phạm vi và phê duyệt riêng.

## Áp dụng và điều kiện đóng WP-003a

Sau khi chủ dự án phê duyệt nội dung ADR, đề xuất đồng bộ đúng bảy file:

1. `engine/ops/work-packages/WP-003a-sites-loader-spike.md`
   — ghi hồ sơ kết quả, nghiệm thu, nguồn triển khai, giới hạn và ngân sách;
   giữ nguyên các mốc lịch sử.
2. `engine/docs/02-adr/ADR-0006-cockpit-delivery.md`
   — thêm ADR với nội dung và trạng thái được chủ dự án duyệt.
3. `engine/docs/02-adr/README.md`
   — thêm dòng ADR-0006, trạng thái khớp ADR.
4. `engine/ops/work-packages/WP-003-cockpit-shell.md`
   — đồng bộ phụ thuộc, đầu ra và quy trình loader; giữ phạm vi chỉ đọc.
5. `engine/docs/01-architecture.md`
   — ghi kết luận đã kiểm chứng và dẫn chiếu ADR.
6. `engine/docs/05-runbook.md`
   — chỉ cập nhật phần WP-003a/Cockpit; loại bỏ giả định tự theo main,
   tự nhận UI mới sau reload hoặc tự chuyển Pages.
7. `engine/ops/backlog.md`
   — chỉ cập nhật dòng WP-003a khi đủ điều kiện đóng.

WP-003a chỉ được đóng khi chủ dự án đã nghiệm thu lượt thử, phê duyệt
ADR, hồ sơ liên quan đã đồng bộ, các kiểm tra yêu cầu đạt và chủ dự án
duyệt hoàn tất. Hiện tại việc nghiệm thu lượt thử đã có; việc đóng
hồ sơ chưa hoàn tất.

Giữ giới hạn 2 giờ và tiếp tục dùng sổ thời gian hiện có. Không đặt lại
ngân sách khi chuyển hội thoại hoặc chuyển sang công việc tài liệu.
Nếu hết thời gian trước khi đóng hồ sơ, ghi rõ phần còn lại và dừng;
không đánh dấu done thiếu căn cứ.

Phê duyệt nội dung ADR không tự cấp quyền sửa repo, mở hoặc merge PR,
triển khai WP-003, thao tác Sites, dùng token hay chạy thêm phép thử.
Các thao tác đó cần phê duyệt riêng.

Đợt đồng bộ tài liệu không sửa mã nguồn, contracts, dependency,
lockfile, workflow hoặc `pipeline/state.json`.
