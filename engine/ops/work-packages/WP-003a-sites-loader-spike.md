# WP-003a · Spike: Sites có nạp được mã động không

**Wave:** 1  
**Phụ thuộc:** WP-000 đã hoàn tất  
**Trạng thái:** in-progress — Function/UTF-8 đã nghiệm thu; ADR-0006 đã chấp nhận; chờ review/merge hồ sơ  
**Loại:** SPIKE — câu trả lời có/không từ bằng chứng thật  
**Repository nguồn sự thật:** `HungQuach301/meridian-studio`

**Giới hạn: tối đa 2 giờ thực hiện spike, gồm chuẩn bị kỹ thuật, kiểm tra và thử thật.**
Ghi thời gian đã dùng và phần còn lại trong hồ sơ bàn giao; không đặt lại đồng hồ qua chat.
Hết thời gian phải dừng và báo kết quả, kể cả khi chưa xác định được khả năng nền tảng.

## 1. Mục tiêu và quyền hiện tại

Xác định một Site tĩnh có thể tải và thực thi JavaScript từ repo private Meridian hay không.
Kết quả quyết định cách phân phối Cockpit ở WP-003. Chưa xây bảng pipeline, gate hoặc dispatch.

Chủ dự án đã nghiệm thu đúng một lượt Function constructor/UTF-8 trên Sites v1 bằng Chrome,
xác nhận token chỉ Contents read và đã xóa. Chủ dự án yêu cầu agent soạn ADR-0006, phê duyệt
nội dung, rồi duyệt riêng một PR đồng bộ đúng bảy file mục 4.3 từ main
`423353caaf795db764602283abf299b1e7778871`; cho phép CI tự động.

Các phê duyệt PR #8, chuẩn bị/triển khai Sites v1 và lượt thử đã hoàn tất, không tái sử dụng.
Hiện không merge, sửa mã nguồn, thao tác Sites, dùng token, thử thêm, dispatch/rerun hoặc gọi
provider. Chủ dự án giữ quyền quyết định ADR và duyệt đóng WP-003a. Hồ sơ kết luận ở mục 10.

## 2. Input và checkpoint

Đọc `PROJECT.md`, `AGENTS.md`, `engine/ops/guardrails.md`,
`engine/docs/01-architecture.md` và WP này trước hành động.
Đọc thêm `07-delivery-plan.md`, backlog, loader, WP-003,
`config/secrets.example.md`, `02-adr/README.md`, ADR-0001/0003,
NFR, risk register R3/R10, runbook, upgrade safety, definition-of-done,
package/lockfile và CI hiện có.

### Checkpoint lịch sử trước chuẩn bị PR #8

| Hạng mục | Giá trị |
|---|---|
| Main | `cb5ece27280c6c3f77a19d44cd9035cd4f85d516` |
| Tree | `69f4c05c451cadba4743c0dfd348c1a6537a7f71` |
| State SHA-256 | `bd1df1537db185b1d54cd39dcc9cefb19652dd9354738bb35b824fcf06cf6aee` |
| State | `updatedAt: 2026-09-09T08:39:17.722Z`; `monthlySpendUsd: 0`; `episodes: []` |
| CI | [34342275773](https://github.com/HungQuach301/meridian-studio/actions/runs/34342275773), success, attempt 1 |
| Hello | [34342275754](https://github.com/HungQuach301/meridian-studio/actions/runs/34342275754), success, attempt 1 |
| Lịch sử | 37 run toàn repo, 9 run Hello, không có run đang chạy |

Đọc lại main/tree, CI, state và lịch sử trước hành động. Nếu khác checkpoint được duyệt
thì dừng, báo khác biệt; không tự chọn SHA mới. Commit/CI do PR được duyệt tạo ra phải
được ghi vào checkpoint mới, không coi chúng là thay đổi trái phép.

WP-002 đã hoàn tất qua PR #7 và ba run success, attempt 1:

- [Heartbeat 34327921569](https://github.com/HungQuach301/meridian-studio/actions/runs/34327921569).
- [Sender 34330111639](https://github.com/HungQuach301/meridian-studio/actions/runs/34330111639).
- [Receiver 34330212617](https://github.com/HungQuach301/meridian-studio/actions/runs/34330212617).

Giữ nghiệm thu này; không dùng lại quyền thực thi WP-002.
Client ngoài GitHub/Cockpit thuộc WP-004, chưa được nghiệm thu.

## 3. Output

1. `engine/app/loader.html`: trang HTML đầy đủ, UTF-8, không dependency.
2. `engine/app/cockpit.js`: mã thử đồng bộ, chỉ tạo marker và tín hiệu hoàn tất.
3. Đặc tả, kiến trúc, bảng Wave 1 và quyền token thống nhất trong sáu file.
4. Hồ sơ PR nêu riêng kiểm tra offline/CI và phần Sites thật chưa thực hiện.
5. Sau phê duyệt thử thật: bằng chứng nguồn → bản triển khai → kết quả.
6. Sau nghiệm thu: ADR-0006 theo nội dung chủ dự án đã duyệt và tài liệu WP-003 đồng bộ.

## 4. Files in scope

### 4.1. Phạm vi lịch sử PR #8 đã merge — đúng sáu file

| File | Phạm vi |
|---|---|
| `engine/ops/work-packages/WP-003a-sites-loader-spike.md` | Đặc tả, phân công, quyền, đóng gói, acceptance và điều kiện dừng |
| `engine/docs/01-architecture.md` | Cách phân phối loader; bản sao Sites; quyền đọc; đường ADR và giới hạn Pages liên quan |
| `engine/docs/07-delivery-plan.md` | Chỉ bảng Wave 1 để khớp backlog |
| `config/secrets.example.md` | Quyền token cho spike; phân biệt credential Sites và quyền của WP sau |
| `engine/app/loader.html` | Owner/path đúng; kiểm nguồn; giải mã; chẩn đoán; quản lý token |
| `engine/app/cockpit.js` | Marker tối thiểu và UTF-8, chưa có tính năng Cockpit |

Không sửa `PROJECT.md`, `AGENTS.md`, guardrails, contracts, package, lockfile, workflow,
runbook, backlog hoặc ADR trong phạm vi PR #8. PR đồng bộ sau nghiệm thu đã được chủ dự án
duyệt riêng tại mục 4.3; không mở thêm PR ngoài quyền đó.

### 4.2. Giai đoạn Sites — phiên bản 1 đã hoàn tất theo phê duyệt riêng

Kho nguồn Sites chỉ có hai file nội dung được quản lý:

| File | Nội dung |
|---|---|
| `dist/index.html` | Bản sao nguyên byte của loader tại commit Meridian được duyệt |
| `.openai/hosting.json` | `project_id` do nền tảng trả về và `static.directory: "dist"` |

Không tạo các file này trong Meridian. Không copy `cockpit.js`, state, tài liệu,
dependency hoặc lịch sử đầy đủ của Meridian vào kho Sites. Không tự khởi tạo starter.
Archive tạm là sản phẩm đóng gói, không commit binary vào repo.

### 4.3. PR đồng bộ sau nghiệm thu — đúng bảy file đã được duyệt

| File | Phạm vi |
|---|---|
| `engine/ops/work-packages/WP-003a-sites-loader-spike.md` | Hồ sơ kết luận, quyền đã dùng, ngân sách và giới hạn; giữ mốc lịch sử |
| `engine/docs/02-adr/ADR-0006-cockpit-delivery.md` | Thêm đúng nội dung chủ dự án đã duyệt, trạng thái Chấp nhận |
| `engine/docs/02-adr/README.md` | Chỉ thêm dòng ADR-0006 với trạng thái khớp |
| `engine/ops/work-packages/WP-003-cockpit-shell.md` | Đặc tả loader/Cockpit chỉ đọc, phụ thuộc và acceptance; chưa triển khai |
| `engine/docs/01-architecture.md` | Kết luận đã nghiệm thu, dẫn ADR và giới hạn |
| `engine/docs/05-runbook.md` | Chỉ phần WP-003a/Cockpit: nguồn, phiên bản, thao tác và giới hạn |
| `engine/ops/backlog.md` | Chỉ dòng WP-003a; chưa done khi còn chờ review/merge và duyệt đóng |

Quyền soạn/ghi ADR này xuất phát từ yêu cầu và phê duyệt rõ ràng của chủ dự án,
không sửa quy tắc chung của thư mục ADR. Một file mới, sáu file sửa; 94 file cũ khác giữ nguyên.
Không sửa code, contracts, package/lockfile, workflow, state, delivery plan hoặc secrets policy.
Không merge hoặc mở PR khác trong đợt này.

## 5. Đóng gói Sites và blocker

### B1 — đã giải quyết cho gói và phiên bản 1

Ngày 2026-09-09, chủ dự án chấp nhận bản sao triển khai giới hạn tại mục 4.2.
Chốt đường **HTML tĩnh**, không framework, không build JavaScript, không dependency/action mới.

Quy trình đã dùng sau các phê duyệt riêng; không phải quyền chạy lại:

1. Xác minh commit Meridian được duyệt; tính SHA-256 loader.
2. Tạo hoặc dùng đúng Site Meridian theo hồ sơ đã xác minh, lấy ID/nguồn Git từ nền tảng.
   Không lấy thông tin hoặc dùng Site của dự án khác.
3. Sao chép nguyên byte loader thành `dist/index.html` trong bản làm việc Sites;
   đối chiếu hash trước commit.
4. Ghi hosting metadata bằng Site ID thật, không bịa ID.
5. Commit và đẩy đúng hai file nội dung vào kho nguồn Sites, dùng credential ngắn hạn
   qua xác thực từng lệnh; không ghi credential vào remote URL, Git config hoặc file.
6. Lấy SHA đầy đủ của commit đã đẩy. Dùng công cụ đóng gói Sites hiện có;
   không thêm script/dependency vào Meridian.
7. Kiểm archive chỉ gồm `dist/index.html` và `dist/.openai/hosting.json`.
8. Lưu phiên bản với đúng SHA kho nguồn Sites. Triển khai chỉ khi phiên bản đó được duyệt.

Chuỗi bằng chứng: **M → L → S → V → deployment**:

- M: commit Meridian đã duyệt.
- L: SHA-256 loader tại M, bằng hash `dist/index.html`.
- S: commit kho nguồn Sites chứa bản sao và metadata.
- V: phiên bản Sites có source SHA bằng S.
- Deployment: kết quả triển khai đúng V, với quyền truy cập đã duyệt.

S có thể khác M. Không thay SHA nguồn của phiên bản hoặc giữ archive cũ khi nguồn đã đổi.
Lưu phiên bản chưa triển khai; URL Sites đã triển khai là production, kể cả riêng tư.
Kho Sites không được trở thành nơi sửa UI độc lập hoặc lưu state.

Nếu công cụ thực tế đòi thêm file/capability/quyền, hoặc không bảo toàn cách đóng gói đã chốt:
dừng và báo khác biệt. Không dùng Worker, D1/R2, proxy, Pages hoặc repo khác làm đường vòng.

### B2 — Function constructor đã được nghiệm thu trong điều kiện đã thử

HTTP 200, blob khớp, thực thi và UTF-8 đạt trên Sites v1/Chrome. Không coi đây là kiểm
toàn bộ CSP/CORS hoặc mọi cơ chế; Script inline và các giới hạn mục 10 vẫn chưa kiểm.
Preview/sandbox hoặc CI không thay thế bằng chứng trên origin Sites đã triển khai.
Không nới CSP hoặc tắt bảo vệ trình duyệt để làm phép thử đạt.

### B3 — nội dung đã duyệt, hồ sơ còn chờ review/merge

ADR-0006 đã được chủ dự án duyệt. PR này đồng bộ WP-003 và runbook theo loader;
chưa triển khai WP-003 và chưa đánh dấu done trước khi chủ dự án duyệt đóng.
Đường ADR đúng là `engine/docs/02-adr/`; không tạo thư mục `engine/engine/docs/`.
B/C dùng Pages chưa được duyệt; GitHub Free không hỗ trợ Pages từ repo private.

## 6. Ràng buộc kỹ thuật và token

### Dependency và dữ liệu

- Không thêm/nâng dependency hoặc action; không sửa lockfile.
- Đã khóa: ajv 8.20.0, ajv-formats 3.0.1, TypeScript 5.9.3, tsx 4.23.13, Vitest 3.2.7.
- JavaScript trình duyệt một file là ràng buộc phân phối UI theo kiến trúc;
  không thay quy ước TypeScript của stage Engine.
- Không server ứng dụng, database, job nền, provider, media, Release, dispatch/rerun.
- Giữ nguyên state thật; fixture chỉ ở thư mục tạm của agent/job.
- Không thêm hằng số nội dung thể loại/kênh vào Engine.

### Token

- Fine-grained PAT, đúng repo Meridian, **Contents read**, Metadata read mặc định,
  hạn tối đa 30 ngày. Không cấp Actions write hoặc Contents write cho spike.
- Chủ dự án tự nhập trên Site đã được duyệt; không gửi vào chat hoặc ảnh bằng chứng.
- Token chỉ dùng trong bộ nhớ cho GET. Không lưu localStorage, sessionStorage, cookie,
  URL, Sites environment variables hoặc biến token toàn cục.
- Loader xóa ô token khi lấy giá trị và sau lượt thử. Reload phải nhập lại.
- Không request ghi để kiểm quyền token; chủ dự án kiểm quyền tại lúc cấp.
- Credential nguồn Sites là loại riêng; đợt đồng bộ tài liệu không lấy hoặc sử dụng credential.
- Không log request headers, token hoặc thông điệp exception thô.

### Loader và mã thử

- Người thử nhập commit SHA và blob SHA đủ 40 ký tự hex từ hồ sơ review.
  Không nhận branch, URL hoặc tên repo tùy ý.
- Một GET tới Contents API của đúng repo/path/ref; không credential cookie,
  không cache, không theo redirect, timeout tải 15 giây, không retry.
- Chỉ nhận HTTP 200, phản hồi file đúng path/blob/base64, kích thước 1–65.536 byte.
- Giải mã Base64 và UTF-8 nghiêm ngặt; tính lại Git blob SHA từ bytes và so với SHA đã duyệt.
  SHA-256 mã tải về được ghi vào bằng chứng.
- Mỗi lượt mở trang chỉ gửi một request sau input hợp lệ; khóa các điều khiển khi bắt đầu.
  Reload không phải quyền tự thử thêm.
- Người thử chọn Function hoặc script inline trước lượt thử. Không tự fallback.
- Chỉ kết luận có tín hiệu thực thi khi mã tải về tạo marker và thuộc tính hoàn tất.
  Thêm được thẻ script vào DOM chưa đủ để báo thành công.
- Probe đồng bộ chỉ tạo `Loader OK`, `wp003a-v1`, chuỗi
  `Kiểm tra UTF-8: tiếng Việt — ✓` và tín hiệu hoàn tất; không đọc state hoặc gọi mạng.
- Loader đợi 250 ms để nhận sự kiện CSP/lỗi; không dùng chờ này để suy ra CSP.
  Dù có tín hiệu thực thi, chủ dự án vẫn đối chiếu marker, UTF-8 và bằng chứng nguồn.

## 7. Acceptance

### 7.1. Tiêu chí lịch sử của phần chuẩn bị PR #8

Kiểm trong môi trường agent với dữ liệu giả, không network/token thật:

- Cú pháp HTML/JavaScript, charset, control và path đúng.
- Chạy chính script trong loader cùng chính probe trong môi trường DOM/fetch giả.
- Hai cơ chế tạo marker và UTF-8 đúng trong môi trường giả.
- Input thiếu/sai không gửi request; bấm lần hai không gửi thêm.
- HTTP lỗi, JSON hỏng, sai path/blob/encoding/size, Base64 hỏng, UTF-8 lỗi và bytes
  không khớp blob đều dừng trước thực thi.
- Lỗi runtime/compile, CSP enforce giả, thiếu tín hiệu hoàn tất không bị báo PASS.
  CSP report-only không bị kết luận là chặn thực thi.
- Không tự chạy lại bằng cơ chế khác; không đưa token/exception thô ra bằng chứng.
- Kiểm timeout, redirect policy, xóa token và không có token toàn cục.
- Hash toàn bộ file ngoài sáu file khớp checkpoint.

Harness/fixture ở thư mục tạm; không thêm file test vào repo ngoài phạm vi.
Ghi runtime, lệnh, số case và kết quả thật trong PR; không gọi DOM giả là browser/Sites test.

CI tự động hiện có chạy Node 20 và các lệnh `npm run test`, `npm run validate`,
`npm run typecheck`; đợi đạt trước khi hoàn tất chuẩn bị PR.
CI này không có test loader mới; typecheck hiện chỉ bao phủ TypeScript của repo.
Không tự thêm workflow để mở rộng CI. Ghi link và SHA của các run thực tế trong PR.

### 7.2. Kịch bản Sites thật — Function đã hoàn tất, xem kết quả mục 10

Mỗi cơ chế tối đa một lượt trong kịch bản được chủ dự án duyệt.
Phép reload hoặc thử cơ chế khác phải nằm trong phê duyệt, không tự dùng lại quyền.

1. Xác minh checkpoint và Site/version/nguồn; ghi thời điểm, trình duyệt.
2. Mở URL riêng tư. Nếu loader chưa khởi động thì không nhập token.
3. Nhập commit SHA, blob SHA và chọn cơ chế đúng hồ sơ đã duyệt.
4. Chủ dự án nhập token chỉ Contents read và bấm chạy đúng một lượt.
5. Ghi HTTP status, verified blob SHA, code SHA-256, cơ chế, outcome và thời gian.
6. Đối chiếu `Loader OK`, revision và chuỗi UTF-8; chụp vùng không chứa token.
7. Nếu có lượt reload được duyệt: xác minh trang yêu cầu nhập token lại.
8. Đối chiếu repo/state/lịch sử; thao tác Site không tạo commit hoặc workflow run
   trong Meridian. Commit bản sao ở kho nguồn Sites phải khớp hồ sơ S đã duyệt.

Muốn chứng minh cập nhật UI không triển khai lại Sites phải có phép thử riêng với
hai revision `cockpit.js` đã review, cùng một loader và cùng phiên bản Sites.
Chưa làm thì ghi rõ “chưa kiểm cập nhật giữa hai revision”; không tạo commit mới để thử
khi chưa được duyệt và không dùng một lần `Loader OK` thay bằng chứng này.

### 7.3. Phân loại kết quả

| Mã/quan sát | Kết luận |
|---|---|
| Loader chưa khởi động / WP003A_ENVIRONMENT | Bootstrap/môi trường chưa đạt; chưa kiểm được nạp mã |
| WP003A_INPUT | Input chưa hợp lệ; không gửi request |
| WP003A_HTTP_401/403/404 hoặc HTTP khác 200 | Kiểm truy cập/path/ref hoặc API; không tự đổi quyền, không kết luận CSP |
| WP003A_FETCH / WP003A_TIMEOUT | Fetch/redirect/timeout; không tự gọi là CORS |
| WP003A_RESPONSE / DECODE / INTEGRITY | Phản hồi, UTF-8 hoặc nội dung không khớp; không thực thi |
| WP003A_COMPILE | Cơ chế không biên dịch được; chưa đủ bằng chứng riêng để kết luận CSP |
| WP003A_CSP | Có sự kiện enforce chặn script của cơ chế đang thử |
| WP003A_RUNTIME | Mã có lỗi thực thi, có thể đã tác động một phần; không chạy lại |
| WP003A_NO_COMPLETION / INTERNAL | Chưa đủ bằng chứng; không báo PASS |
| WP003A_EXECUTED | Có tín hiệu thực thi; chủ dự án phải đối chiếu marker/UTF-8 và source |
| Cả hai cơ chế bị CSP chặn có bằng chứng | A bị chặn trong điều kiện đã thử; không tự chuyển Pages |

Kết quả chỉ áp dụng với nguồn, phiên bản và điều kiện đã thử; không cam kết chính sách Sites
sẽ giữ nguyên. Lỗi âm có bằng chứng là đầu ra hợp lệ; “chưa xác định” không phải nghiệm thu đạt.

## 8. Bằng chứng, điều kiện dừng và DoD

PR có bốn mục: **Đã làm gì / Đã kiểm thế nào / File đã chạm / Rủi ro còn lại**.
Bằng chứng gồm diff, SHA/tree, hash file bảo vệ, run CI, nguồn M/L/S/V khi có,
thời gian đã dùng, kết quả từng lượt và phần chưa kiểm. Không xuất HAR/log chứa Authorization.

Dừng khi checkpoint ngoài phê duyệt thay đổi; hết 2 giờ; cần thêm file/dependency/action/quyền;
không bảo toàn đóng gói/nguồn; không giữ được truy cập riêng tư; nghi lộ token;
kết quả không rõ hoặc có request ghi/commit/run ngoài dự kiến.
Không tự retry, rerun, nới CSP, sửa contracts/state hoặc dùng Pages.

### Tiêu chí lịch sử phần chuẩn bị PR #8 (không phải trạng thái hiện tại)

- [ ] Đúng sáu file; 94 file còn lại trong cây 100 file sau bổ sung probe giữ nguyên.
- [ ] Fixture không dùng mạng/token thật đạt và CI tự động đạt.
- [ ] Không sửa backlog/runbook/ADR, không merge hoặc thao tác Sites.
- [ ] PR báo rõ chưa có nghiệm thu Sites và chưa hoàn tất WP-003a.

### Hoàn tất toàn bộ WP-003a sau phê duyệt riêng

- [x] Thử Site thật có bằng chứng gắn đúng nguồn/phiên bản.
- [x] Chủ dự án nghiệm thu kết luận; token chỉ đọc/đã xóa theo xác nhận, state giữ nguyên.
- [x] Chủ dự án đã phê duyệt nội dung ADR-0006 do agent soạn theo yêu cầu.
- [ ] PR đồng bộ ADR/WP-003/runbook được review, checks đạt và merge được duyệt riêng.
- [ ] Dòng WP-003a trong backlog được cập nhật sau nghiệm thu theo quyền ghi riêng.

## 9. Bước tiếp theo cho chủ dự án

1. Mở PR đồng bộ → Files changed: đúng bảy file mục 4.3; xem ADR Chấp nhận và phần chưa kiểm.
2. Review read-only tại head SHA được cung cấp; kiểm CI tự động và ngân sách thực tế trong PR.
3. Chỉ duyệt merge/đóng hồ sơ khi checks và review đạt; PR này không có quyền merge.
4. Sau checkpoint sau merge, duyệt kế hoạch WP-003 riêng; không dùng lại lượt thử đã hoàn tất.

## 10. Hồ sơ kết luận đã nghiệm thu

### Nguồn và phiên bản

| Mốc | Giá trị |
|---|---|
| M — main Meridian | `423353caaf795db764602283abf299b1e7778871` |
| Tree Meridian | `c107d50aaa51895e5d33f1658eedf5499d335e97` |
| L — SHA-256 loader | `8ce0d5d03b0d1a5a18e7ece4337d7fb68e072c6d3c987619b4f02b794fccbdc0` |
| Blob loader / kích thước | `589b292d88a7b8578541feea5eedb3634d8cddb4` / 11.319 byte |
| S — commit nguồn Sites | `c720b33be01a575e383444fe49e803135d6b0f2b` |
| Site | Meridian Studio / `meridian-studio` / `appgprj_6aa16be27e688191956ed0746e3af820` |
| V — phiên bản 1 | `appgprj_6aa16be27e688191956ed0746e3af820~appgver_ff3f047e374481919d61d43b1713372d` |
| Deployment | `appgdep_6aa16ea9d6088191ad326edc6fa8982b`, succeeded, env revision 0 |
| URL | https://meridian-studio.quach-hung.chatgpt.site |
| Quyền đã đối soát | access_mode custom, revision 1, một allowed user là owner; không editor/group/khách được cấp quyền |
| Archive | 2 file, 20.480 byte; `sha256:4d1385033e77599234abecdd711a84353213b49bacdd36d05fa4a8583001fe97` |

Kho nguồn có đúng hai file mục 4.2; hash loader bằng bản sao triển khai. Archive có hai đường
mục 5. Hash archive đã khớp qua tái dựng tar chuẩn hóa từ hai file và đối chiếu metadata;
chưa tải trực tiếp archive máy chủ để so sánh toàn bộ byte. Quyền chia sẻ ghi theo cấu hình
Sites đã đối soát, không phải tuyên bố loại bỏ quyền quản trị hệ thống của nền tảng.

[PR #8](https://github.com/HungQuach301/meridian-studio/pull/8) đã merge từ head
`867401b630c847cebbb51a0593600ffe8faf0350`. Trước PR đồng bộ: 100 file, 44 workflow run,
12 Hello, không run đang chạy. CI [34360862197](https://github.com/HungQuach301/meridian-studio/actions/runs/34360862197)
và Hello [34360862138](https://github.com/HungQuach301/meridian-studio/actions/runs/34360862138)
đều success, attempt 1; heartbeat/send-hello skipped. State SHA-256 và nội dung khớp mục 2.
Các run CI tự động do PR đồng bộ tạo ra được ghi riêng trong PR, không sửa mốc lịch sử này.

### Lượt Function constructor và nghiệm thu

```jsonl
{"repository":"HungQuach301/meridian-studio","path":"engine/app/cockpit.js","ref":"423353caaf795db764602283abf299b1e7778871","expectedBlob":"3489a8b303d049b650a222e24e420e51aa110b1b","mechanism":"function","startedAt":"2026-09-09T14:49:33.396Z"}
{"httpStatus":200}
{"verifiedBlob":"3489a8b303d049b650a222e24e420e51aa110b1b","codeSha256":"44247934c534d274c81d108bde10c0d423364b1e4b0990c5ae5a77aaa18dd6aa"}
{"outcome":"WP003A_EXECUTED","finishedAt":"2026-09-09T14:49:34.509Z"}
```

Mã thử 478 byte, blob và SHA-256 được đối chiếu với repo. Log kéo dài 1,113 giây.
Ảnh do chủ dự án gửi thể hiện `WP003A_EXECUTED`, `Loader OK`,
`wp003a-v1 · Kiểm tra UTF-8: tiếng Việt — ✓` và nút chạy đã vô hiệu hóa.
Chủ dự án xác nhận Google Chrome (chưa ghi số phiên bản), nghiệm thu Function/UTF-8,
token chỉ Contents read của Meridian và đã xóa. Quyền/xóa token là xác nhận chủ dự án,
không phải kiểm token độc lập. Tổng tạo token + thử thật do chủ dự án báo là 3 phút.

Chủ dự án đã phê duyệt nội dung [ADR-0006](../../docs/02-adr/ADR-0006-cockpit-delivery.md).
Lượt Function đã hoàn tất; số lượt còn được phép theo phê duyệt đó là 0.

### Giới hạn giữ nguyên

Chưa kiểm Script inline; reload/xóa và nhập lại token trên Site thật; hai revision Cockpit
trên cùng Sites version không redeploy; trình duyệt khác/chính sách Sites tương lai;
Cockpit đọc state WP-003; client dispatch WP-004. Không suy rộng thành tự theo main,
tự cập nhật UI, mọi cơ chế đều chạy hoặc Cockpit đã hoàn chỉnh. Không thử thêm trong PR này.

### Sổ thời gian tiếp nối

| Giai đoạn đã ghi sổ | Phút tính vào giới hạn |
|---|---:|
| Chuẩn bị kỹ thuật ban đầu | 45 |
| Review/merge PR #8 và lập kế hoạch sau merge | 30 |
| Chuẩn bị Sites | 9 |
| Đối soát archive | 3 |
| Triển khai riêng tư | 3 |
| Đối chiếu hai SHA trên màn hình | 1 |
| Hướng dẫn lượt thử | 2 |
| Chủ dự án tạo token và chạy thử | 3 |
| Đối soát bằng chứng nghiệm thu | 3 |
| Kế hoạch đồng bộ hồ sơ | 6 |
| Soạn ADR đề xuất | 5 |
| Tổng trước PR đồng bộ | 110 |
| Còn tối đa khi bắt đầu PR đồng bộ | 10 |

Không đặt lại giới hạn 120 phút. PR đồng bộ phải ghi thời gian thực tế đã dùng và số dư
ở mô tả/bàn giao, gồm kiểm tra và theo dõi CI. Nếu hết ngân sách, dừng và báo công việc
còn lại; không đánh dấu done hoặc tự chạy thêm. Không tính khoảng chủ dự án không làm việc
thành thời gian thực thi và không thay số 3 phút thử thật bằng khoảng cách giữa các tin nhắn.
