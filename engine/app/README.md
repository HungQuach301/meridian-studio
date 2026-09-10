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

Chủ dự án đã nghiệm thu một lượt Cockpit đọc snapshot rỗng trên Site; nguồn và bằng chứng
được ghi tại mục "Hồ sơ nghiệm thu snapshot rỗng WP-003" bên dưới. Quyền lượt thử đó đã dùng hết.
[PR #10](https://github.com/HungQuach301/meridian-studio/pull/10) đã được review và merge; chủ dự án đã duyệt đóng hồ sơ WP-003 bằng
một commit tài liệu riêng trên main. [Hồ sơ đóng và sổ thời gian](../ops/work-packages/WP-003-cockpit-shell.md#8-hồ-sơ-đóng-wp-003)
đối chiếu [Definition of Done](../ops/definition-of-done.md), backlog và runbook.
Đợt đóng hồ sơ có phạm vi tài liệu được duyệt riêng; PR triển khai vẫn chỉ có hai file.
Nghiệm thu và các giới hạn của WP-003a giữ nguyên; hoàn tất WP-003 không đóng toàn bộ Wave 1.

## Review nguồn bằng trình duyệt

1. Mở [PR triển khai WP-003 #10](https://github.com/HungQuach301/meridian-studio/pull/10) trên GitHub → **Files changed**: chỉ `engine/app/cockpit.js` và README này.
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
2. Khi được duyệt, chủ dự án tự cấp hoặc dùng lại fine-grained PAT còn hạn: chỉ Meridian,
   **Contents — Read-only**, Metadata read mặc định, hạn tối đa 30 ngày.
   Theo quyết định của chủ dự án cho WP-003, có thể giữ token phía chủ dự án trong thời hạn
   30 ngày để giảm việc tạo lại; không kéo dài hạn token hoặc quyền thực hiện lượt thử.
   Không gửi token vào chat/ảnh. Token WP-003a đã xóa theo xác nhận; không dùng lại quyền đó.
3. Mở Site riêng tư, chờ loader đã khởi động; trang lỗi thì dừng trước khi nhập token.
4. Nhập commit/blob Cockpit từ hồ sơ, chọn **Function constructor**, nhập token trực tiếp
   vào loader và bấm chạy một lượt.
5. Đối chiếu bằng chứng loader. Cockpit phải hiện **Meridian Studio · Cockpit**,
   `wp003-v1` và chưa tải dữ liệu. `WP003A_EXECUTED` chỉ xác nhận khởi động mã.
6. Trong **Settings · Đọc state**, nhập lại token và bấm **Đọc state** một lượt.
   Có thể dùng cùng token ở bước 2; đây là hai lần nhập riêng.
   Cockpit không đọc ô token loader hoặc token trên `window`.
7. Khi có `WP003_STATE_LOADED`, đối chiếu bảng, chi phí tháng, thời điểm và bằng chứng.
   Snapshot rỗng phải hiện **Chưa có episode**, đúng chi phí và timestamp nguồn.
8. Mở **Nguồn snapshot và bằng chứng lượt đọc**, gửi ảnh/log vùng kết quả đã loại secret
   cùng xác nhận nghiệm thu. Không gửi HAR, Authorization hoặc ảnh token.
9. Kết thúc: chủ dự án xác nhận quyền token và việc giữ hoặc thu hồi. Với quyết định giữ
   30 ngày của WP-003, không bắt buộc thu hồi sau mỗi lượt; thu hồi qua GitHub khi không
   còn cần, hoặc ngay khi nghi lộ token. Không dùng token quá hạn hay tự tạo thêm lượt thử.
   Quyền và vòng đời token là xác nhận của chủ dự án; GET thành công không chứng minh
   token không có quyền dư. Agent không nhận, đọc hoặc lưu giá trị token.
   Agent đọc lại repo/state/lịch sử để kiểm lượt Site không tạo commit/workflow run.

Giữ token 30 ngày là quyết định về token do chủ dự án quản lý, không phải lưu token trong ứng dụng.
Mỗi phiên được duyệt vẫn nhập riêng vào loader và Settings; không tự đăng nhập lại hoặc tự tải.
Trong Cockpit, ô token xóa ngay khi nhận giá trị và khi kết thúc/rời trang. Tham chiếu chỉ tồn tại
trong hàm xử lý, được thả sau khi gọi fetch và trong phần dọn dẹp.
Không lưu localStorage, sessionStorage, cookie, URL, log, biến toàn cục hoặc Sites environment.
Cockpit hủy request đọc state khi rời trang; handler pagehide của loader chỉ xóa ô token.
Giữ trang mở đến khi có kết quả. Chưa nghiệm thu hành vi rời trang/reload trên Site thật.

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

## Hồ sơ nghiệm thu snapshot rỗng WP-003

Chủ dự án đã xác nhận nghiệm thu Cockpit đọc snapshot rỗng theo hai ảnh kết quả gửi trong
hội thoại WP-003. Agent đối chiếu ảnh/log với nguồn GitHub và đọc lại repo sau lượt thử;
đây không phải agent trực tiếp thao tác trình duyệt hoặc kiểm token độc lập.

### Nguồn được nạp và môi trường

| Mốc | Giá trị đã đối soát |
|---|---|
| Commit mã và state của lượt thử | `a75be6c1b583c820389648bed6f4eb5cca333ce9` |
| Tree của commit đã thử | `a2ad382174440362d63c5dacc8fc4d2467861321` |
| Path mã | `engine/app/cockpit.js` |
| Blob Cockpit | `a19612eb3d608f848e2970b0d858516ee5f67fc4` |
| SHA-256 Cockpit | `c51905810fe779b8555aaa67df2a39d0558c7dd168a0c361c45227fdb1d0bbea` |
| Blob loader giữ nguyên | `589b292d88a7b8578541feea5eedb3634d8cddb4` |
| SHA-256 loader | `8ce0d5d03b0d1a5a18e7ece4337d7fb68e072c6d3c987619b4f02b794fccbdc0` |
| Site | [Meridian Studio](https://meridian-studio.quach-hung.chatgpt.site) |
| Project ID | `appgprj_6aa16be27e688191956ed0746e3af820` |
| Sites version 1 | `appgprj_6aa16be27e688191956ed0746e3af820~appgver_ff3f047e374481919d61d43b1713372d` |
| Deployment | `appgdep_6aa16ea9d6088191ad326edc6fa8982b` — succeeded |
| Commit kho nguồn Sites | `c720b33be01a575e383444fe49e803135d6b0f2b` |
| Chrome do chủ dự án cung cấp | `152.0.7977.83 (Official Build) (64-bit)` |

Trước lượt thử, metadata đúng Site xác nhận version 1, quyền custom revision 1 chỉ có
chủ sở hữu, không có editor/nhóm/người xem bổ sung; environment revision 0.
Archive metadata khớp 2 file, 20.480 byte và hash
`sha256:4d1385033e77599234abecdd711a84353213b49bacdd36d05fa4a8583001fe97`.
Không tạo version, triển khai hoặc thay đổi Site trong lượt WP-003 này.

Chủ dự án đồng thời báo "Updating Chrome (29%)". Hồ sơ chỉ ghi phiên bản được cung cấp;
không xác nhận Chrome đã cập nhật xong hoặc đã thử phiên bản sau cập nhật.
Commit bổ sung README sau nghiệm thu không phải commit đã nạp trên Site.

### Kết quả trong hai ảnh

| Phần | Bắt đầu UTC ngày 2026-09-09 | Kết thúc UTC | Kết quả |
|---|---|---|---|
| Loader, Function constructor | `23:35:23.540Z` | `23:35:24.930Z` | HTTP 200; blob/code SHA-256 khớp; `WP003A_EXECUTED` |
| Đọc state trong Settings | `23:36:10.465Z` | `23:36:11.340Z` | HTTP 200; `requestNumber: 1`; revision `wp003-v1`; `WP003_STATE_LOADED` |

| Snapshot đã hiển thị | Giá trị |
|---|---|
| Path | `pipeline/state.json` |
| sourceCommit | `a75be6c1b583c820389648bed6f4eb5cca333ce9` |
| verifiedStateBlob | `4846d4649f5f7f4460b3560594e9fb38408b66f0` |
| stateSha256 | `bd1df1537db185b1d54cd39dcc9cefb19652dd9354738bb35b824fcf06cf6aee` |
| stateBytes / episodeCount | `88` / `0` |
| episodes / UI | `[]` / **Chưa có episode** |
| monthlySpendUsd / UI | `0` / **$0.00** |
| updatedAt | `2026-09-09T08:39:17.722Z` |

Chủ dự án báo đã bấm một lần; hai ảnh ghi một lượt loader và một lượt state thuộc cùng
commit đã duyệt. Log loader chỉ xác nhận khởi động; log state và nội dung bảng là bằng
chứng riêng cho chức năng được nghiệm thu. Khoảng 47,800 giây từ đầu loader đến cuối
state không thay thế tổng thời gian thao tác do chủ dự án báo.

Chủ dự án xác nhận token fine-grained chỉ chọn Meridian, Contents Read-only và Metadata
read mặc định; quyết định giữ token trong 30 ngày. Token này không được ghi nhận là đã thu hồi.
Đây là xác nhận của chủ dự án, không phải kiểm quyền hoặc ngày hết hạn độc lập của agent.

Đối soát GitHub trước/sau lượt thử: main
`2eefcc3ac147529813de676b5f37690927fd07d3`, tree
`85bab2fac00f7af8bbbc0f4f82825bb00f0c66ae`, head PR #10 và state giữ nguyên;
58 workflow run, 18 Hello, không run đang chạy hoặc run mới. CI/Hello tại head đã thử
vẫn success, attempt 1; heartbeat/send-hello skipped. Các run từ commit đồng bộ tài liệu
sau đó là CI mới riêng, không phải phát sinh do lượt Site.

### Sổ thời gian đến trước đợt đồng bộ hồ sơ

| Phần WP-003 | Thời gian thực tế đã ghi |
|---|---:|
| Chuẩn bị PR và theo dõi CI | 27 phút 46 giây |
| Review read-only | 7 phút 42 giây |
| Chuẩn bị/đối soát trước Site | 3 phút 57 giây |
| Chủ dự án tạo token và chạy thử | 5 phút 23 giây |
| Đối soát sau Site | 2 phút 19 giây |
| Tổng WP-003 trước đồng bộ | **47 phút 07 giây / 90 phút** |
| Riêng lượt Site, gồm chuẩn bị/thao tác/đối soát | **11 phút 39 giây / 15 phút** |

Khoản thời gian Site nằm trong tổng WP-003, không cộng hai lần. Còn 42 phút 53 giây trước
đợt đồng bộ này; thời gian đồng bộ README/mô tả PR và theo dõi CI tiếp tục ghi trong PR.
Không đặt lại ngân sách hoặc dùng ngân sách/quyền WP-003a. Lượt Site đã dùng hết quyền thử.

### Mốc sau merge và đóng hồ sơ

Head PR #10 đã review là `4f56a162fbe3184f00e87ba5ca39a938f412f73a`; commit merge/main
`3d72e2bd6836baa7e752da4c5667a1c6f4ff6fc4`, tree `32cf997a58708e1233ba56b3dbf123f1856eefaa`.
[CI 34422376087](https://github.com/HungQuach301/meridian-studio/actions/runs/34422376087) và [Hello 34422376095](https://github.com/HungQuach301/meridian-studio/actions/runs/34422376095)
đều success, attempt 1; heartbeat/send-hello skipped. State giữ nguyên blob/SHA-256/88 byte.
Đối soát sau merge có 64 workflow run, 21 Hello, không run đang chạy; 62 run trước giữ nguyên.

Nguồn nghiệm thu Site vẫn là `a75be6c1b583c820389648bed6f4eb5cca333ce9`.
Commit merge và commit đóng tài liệu không phải các lượt Site mới. Bảng thời gian phía trên
là mốc lịch sử trước đồng bộ; số cộng dồn tiếp theo nằm tại
[WP-003 mục 8](../ops/work-packages/WP-003-cockpit-shell.md#8-hồ-sơ-đóng-wp-003).
CI của commit đóng tài liệu được đối soát và báo riêng khi bàn giao, không lấy CI merge thay thế.

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

Site thật đã được chủ dự án nghiệm thu cho đúng snapshot rỗng, nguồn và môi trường nêu trên.
Fixture có episode và các nhánh lỗi mới được kiểm offline, chưa là nghiệm thu trên Site thật.
Giữ các phần chưa kiểm: Script inline; reload/xóa và nhập lại token; phép kiểm đối chứng hai
revision Cockpit cùng Sites version; trình duyệt/phiên bản khác hoặc chính sách Sites tương lai;
client dispatch WP-004. Không suy rộng lượt đã đạt thành khả năng tự cập nhật UI sau commit/reload.
Archive trước đó được đối soát qua tái dựng tar/metadata,
chưa tải trực tiếp archive máy chủ để so toàn bộ byte. Giữ nghiệm thu WP-003a đã có.

Dừng khi checkpoint ngoài phê duyệt đổi; cần sửa loader/contracts hoặc thêm file,
dependency/action/quyền; checks chưa đạt; nguồn sai; nghi lộ token; hoặc hết ngân sách.
Không đặt lại ngân sách hoặc đóng WP khi còn thiếu nghiệm thu.
