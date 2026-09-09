# Cockpit chỉ đọc · WP-003

Cockpit hiển thị snapshot của `pipeline/state.json` trong repository private
`HungQuach301/meridian-studio`. Snapshot luôn thuộc **cùng commit Meridian**
được chọn để nạp mã Cockpit. Phiên này đọc một lần; không poll hoặc tự theo main.

Nguồn giao diện: `engine/app/cockpit.js`, revision `wp003-v1`.
Loader chuẩn: `engine/app/loader.html`, giữ nguyên trong WP-003.
Kho nguồn Sites chỉ lưu bản sao loader và metadata hosting theo
[ADR-0006](../docs/02-adr/ADR-0006-cockpit-delivery.md).

## Quyền và trạng thái nghiệm thu

Chuẩn bị PR, fixture hoặc CI **không cấp quyền dùng token hoặc thử Site**.
Phải có phê duyệt riêng cho token, Site/version, commit/blob và số lượt.
Không dùng lại quyền WP-002/WP-003a. WP-003 không có thao tác ghi, gate hoặc dispatch.

PR hai file chưa đóng toàn bộ WP-003: nghiệm thu Site, phê duyệt merge và tài liệu đóng WP
theo [Definition of Done](../ops/definition-of-done.md) còn là các bước riêng.
Backlog, runbook và hồ sơ WP-003a không thuộc hai file triển khai được duyệt.

## Review nguồn bằng trình duyệt

1. Mở PR WP-003 trên GitHub → **Files changed**: chỉ `engine/app/cockpit.js` và README này.
2. Đọc bốn mục PR và kết quả offline. Trong **Checks**, kiểm đúng head đã review:
   CI đạt `validate`, `typecheck`, `guardrails`; Hello đạt `verify`,
   `heartbeat`/`send-hello` skipped. CI push có `guardrails-push`;
   kết quả push không thay thế kiểm PR.
3. Đối chiếu bảng nguồn trong PR: commit Meridian đủ 40 ký tự, blob Cockpit đủ 40 ký tự,
   SHA-256 và kích thước mã. Mở liên kết file có commit cố định, không dựa vào trang main.
4. Blob là định danh bytes của file, **khác commit SHA**. Không điền commit kho Sites,
   tree SHA hoặc blob state vào trường blob Cockpit. Thiếu SHA thì yêu cầu agent
   đối soát read-only và bổ sung hồ sơ, không tự đoán.
5. Đối chiếu state và blob/SHA-256 state tại cùng commit. Nguồn đổi ngoài hồ sơ thì dừng.
6. Sau review, quyết định riêng lượt Site. CI xanh không thay nghiệm thu UI và không cấp quyền merge.

Hash được ghi trong PR sau khi mã tồn tại; không nhúng commit của chính file vào mã.
Loader vẫn tính lại Git blob/SHA-256 trước khi thực thi mã tải về.

## Một lượt Site khi được duyệt riêng

Một phiên có tối đa **một GET tải mã + một GET đọc state**.
Trình duyệt có thể gửi OPTIONS cho CORS. Lỗi không cấp thêm lượt hoặc quyền reload.

1. Đối soát Site/version/quyền truy cập đã duyệt; ghi thời điểm và số phiên bản Chrome.
   URL dự án: [Meridian Studio](https://meridian-studio.quach-hung.chatgpt.site).
   WP-003 không tự tạo version hoặc triển khai Sites.
2. Khi được duyệt, chủ dự án tự cấp fine-grained PAT: chỉ Meridian,
   **Contents — Read-only**, Metadata read mặc định, hạn tối đa 30 ngày.
   Không gửi token vào chat/ảnh. Token WP-003a đã xóa theo xác nhận; không dùng lại quyền đó.
3. Mở Site riêng tư, chờ loader đã khởi động; trang lỗi thì dừng trước khi nhập token.
4. Nhập commit/blob Cockpit từ hồ sơ, chọn **Function constructor**, nhập token trực tiếp
   vào loader và bấm chạy một lượt.
5. Đối chiếu bằng chứng loader. Cockpit phải hiện **Meridian Studio · Cockpit**,
   `wp003-v1` và chưa tải dữ liệu. `WP003A_EXECUTED` chỉ xác nhận khởi động mã.
6. Trong **Settings · Đọc state**, nhập lại token và bấm **Đọc state** một lượt.
   Có thể dùng cùng token mới ở bước 2; đây là hai lần nhập riêng.
   Cockpit không đọc ô token loader hoặc token trên `window`.
7. Khi có `WP003_STATE_LOADED`, đối chiếu bảng, chi phí tháng, thời điểm và bằng chứng.
   Snapshot rỗng phải hiện **Chưa có episode**, đúng chi phí và timestamp nguồn.
8. Mở **Nguồn snapshot và bằng chứng lượt đọc**, gửi ảnh/log vùng kết quả đã loại secret
   cùng xác nhận nghiệm thu. Không gửi HAR, Authorization hoặc ảnh token.
9. Kết thúc: chủ dự án thu hồi token qua GitHub và xác nhận. Quyền/thu hồi là xác nhận
   của chủ dự án; GET thành công không chứng minh token không có quyền dư.
   Agent đọc lại repo/state/lịch sử để kiểm lượt Site không tạo commit/workflow run.

Ô token xóa ngay khi nhận giá trị và khi kết thúc/rời trang. Tham chiếu chỉ tồn tại
trong hàm xử lý, được thả sau khi gọi fetch và trong phần dọn dẹp.
Không lưu localStorage, sessionStorage, cookie, URL, log, biến toàn cục hoặc Sites environment.
Rời trang hủy request đang chạy; trở lại trang không tự đọc lại.

Lỗi hoặc chưa rõ: dừng, gửi bằng chứng không chứa secret. Không bấm lại, reload để thử thêm,
chọn Script inline, nâng quyền, dispatch hoặc redeploy.

## Dữ liệu và trạng thái UI

| Thành phần | Quy tắc |
|---|---|
| Episode | `episodeId`, `stage`, `status`, `spendUsd`; giữ thứ tự mảng |
| Chi phí tháng | Đọc `monthlySpendUsd` trực tiếp; không cộng episode để suy ra |
| Chi phí bằng 0 | Hiện `$0.00` |
| Chi phí tùy chọn thiếu | **Chưa có dữ liệu**, không tự điền 0 |
| Cập nhật | Giữ nguyên `updatedAt` và múi giờ; `Z` là UTC |
| Trước request | **Chưa tải dữ liệu**, chưa kết luận rỗng hoặc chi phí bằng 0 |
| Đang tải | Thông báo tiến trình; khóa nút và ô token |
| Thành công với `episodes = []` | **Chưa có episode**, vẫn hiện chi phí/thời điểm |
| Lỗi | Mã lỗi cụ thể, không giả trạng thái rỗng hoặc thành công |

Dữ liệu vào DOM bằng `textContent`; chuỗi HTML chỉ là văn bản.
Không chứa quy tắc nội dung hoặc hằng số Genre/Channel trong UI Engine.

GET state tới `api.github.com/repos/HungQuach301/meridian-studio/contents/pipeline/state.json?ref=<commit đã chọn>`.
Không ghi, cookie/cache, redirect hoặc retry; timeout 15 giây.
Giới hạn UI: state giải mã **1 MiB**, phần bọc API **2 MiB**; vượt thì lỗi, không cắt dữ liệu.
Đây là giới hạn tải UI, không thay contract.

Kiểm file/path/encoding/size, Base64/UTF-8 và Git blob SHA tính từ bytes; ghi thêm SHA-256.
Đối chiếu blob state với hồ sơ ngoài UI, không hardcode hash state thật vào mã.

Bộ kiểm trình duyệt chỉ bảo vệ **phần được hiển thị**: root/episodes, timestamp,
episodeId, stage/status và trường chi phí có mặt. Giữ optional và số âm theo contract.
Các trường ngoài phần hiển thị không được kiểm toàn bộ ở đây.
Ajv của repo/fixture offline kiểm đầy đủ schema; UI không thay validator đó.

## Khởi động và bằng chứng

Mã dựng UI và đăng ký listener đồng bộ trong `meridian-gate`, rồi mới đặt
`dataset.wp003aComplete = "true"` và `dataset.wp003aRevision = "wp003-v1"`.
Đây là giao tiếp hiện có với loader kiểm sau 250 ms, không phải nghiệm thu lại WP-003a.

| Tín hiệu | Ý nghĩa |
|---|---|
| `WP003_READY` | UI đã dựng, chưa đọc state |
| `WP003_STATE_LOADING` | Một lượt đọc đang chạy |
| `WP003_STATE_LOADED` | Bytes/phần dữ liệu hiển thị đã kiểm, bảng đã dựng |
| `WP003_INPUT` / `WP003_ENVIRONMENT` | Chưa gửi request; input/môi trường chưa đạt |
| `WP003_HTTP_*` | HTTP khác 200; không tự kết luận CSP |
| `WP003_FETCH` / `WP003_TIMEOUT` | Lỗi tải/redirect/timeout; không retry |
| `WP003_RESPONSE` / `WP003_SIZE` | Phản hồi sai hoặc vượt giới hạn |
| `WP003_DECODE` / `WP003_INTEGRITY` | Base64/UTF-8 hoặc blob không khớp |
| `WP003_JSON` / `WP003_DATA` | JSON hoặc trường hiển thị không hợp lệ |
| `WP003_CANCELLED` / `WP003_INTERNAL` | Phiên kết thúc hoặc lỗi chưa xác định; chưa đạt |

Bằng chứng chỉ ghi repo/path, commit mã/state, blob Cockpit, revision, số request,
thời gian, HTTP status, blob/SHA-256/byte state, số episode và outcome.
Không ghi token, headers, response body hoặc exception thô.
Thời gian thao tác không thay `updatedAt` của state.

## Cập nhật snapshot hoặc revision

1. Agent đối soát read-only commit Meridian mới và blob Cockpit tại đó.
   Nếu chỉ state đổi, blob Cockpit có thể giữ nguyên.
2. Review nguồn/checks; ghi cặp SHA mới trong hồ sơ.
3. Duyệt riêng lượt Site rồi nhập SHA mới theo quy trình trên.
4. Commit mới hoặc reload đơn thuần không làm loader tự chọn mã mới/theo main.
5. Loader nguyên byte thì thiết kế không cần redeploy. Nếu cần đổi loader, dừng và
   duyệt phạm vi Meridian/đồng bộ Sites riêng; không copy Cockpit/state sang Sites.

## Kiểm tra và giới hạn còn lại

Harness tạm chạy chính loader/Cockpit bằng DOM/fetch giả, không token/network production.
Fixture hợp lệ được kiểm bằng schema hiện có; kiểm rỗng/có episode, optional/zero,
enum/date-time, lỗi tải/integrity, bấm trùng, timeout/rời trang, không rò token và không ghi.
Không sửa state thật hoặc thêm harness vào repo.

Chạy kiểm tra sẵn có trong môi trường agent và CI, ghi runtime/hash/kết quả thật trong PR.
CI dùng Node 20; `typecheck` chỉ bao phủ `scripts/**/*.ts`, không bao phủ Cockpit.
DOM giả không chứng minh layout/CSS, CSP/CORS hoặc hành vi Site thật.

Chưa kiểm Site thật cho: Script inline; reload/xóa và nhập lại token; hai revision Cockpit
cùng Sites version; trình duyệt khác/chính sách Sites tương lai; Cockpit đọc state WP-003;
client dispatch WP-004. Archive trước đó được đối soát qua tái dựng tar/metadata,
chưa tải trực tiếp archive máy chủ để so toàn bộ byte. Giữ nghiệm thu WP-003a đã có.

Dừng khi checkpoint ngoài phê duyệt đổi; cần sửa loader/contracts hoặc thêm file,
dependency/action/quyền; checks chưa đạt; nguồn sai; nghi lộ token; hoặc hết ngân sách.
Không đặt lại ngân sách hoặc đóng WP khi còn thiếu nghiệm thu.
