# WP-003a · Spike: Sites có nạp được mã động không

**Wave:** 1  
**Phụ thuộc:** WP-000 đã hoàn tất  
**Trạng thái:** in-progress — chuẩn bị PR; chưa nghiệm thu Sites  
**Loại:** SPIKE — câu trả lời có/không từ bằng chứng thật  
**Repository nguồn sự thật:** `HungQuach301/meridian-studio`

**Giới hạn: tối đa 2 giờ thực hiện spike, gồm chuẩn bị kỹ thuật, kiểm tra và thử thật.**
Ghi thời gian đã dùng và phần còn lại trong hồ sơ bàn giao; không đặt lại đồng hồ qua chat.
Hết thời gian phải dừng và báo kết quả, kể cả khi chưa xác định được khả năng nền tảng.

## 1. Mục tiêu và quyền hiện tại

Xác định một Site tĩnh có thể tải và thực thi JavaScript từ repo private Meridian hay không.
Kết quả quyết định cách phân phối Cockpit ở WP-003. Chưa xây bảng pipeline, gate hoặc dispatch.

Chủ dự án đã duyệt:

- Chuẩn bị **một PR, đúng sáu file Meridian** ở mục 4.1; cho phép CI tự động.
- Kho Git do Sites quản lý chỉ lưu bản sao triển khai loader và metadata hosting;
  Meridian vẫn là nguồn sự thật duy nhất.
- Token thử chỉ **Contents read**.
- Chủ dự án giữ quyền nghiệm thu và viết/quyết định ADR.

**Chưa được duyệt:** merge; tạo kho/Site; lấy credential Sites; lưu/triển khai phiên bản;
dùng PAT thật; dispatch/rerun; gọi provider; đổi settings/quyền repository.
Chấp nhận thiết kế bản sao không phải quyền thực thi các thao tác này.

## 2. Input và checkpoint

Đọc `PROJECT.md`, `AGENTS.md`, `engine/ops/guardrails.md`,
`engine/docs/01-architecture.md` và WP này trước hành động.
Đọc thêm `07-delivery-plan.md`, backlog, loader, WP-003,
`config/secrets.example.md`, `02-adr/README.md`, ADR-0001/0003,
NFR, risk register R3/R10, runbook, upgrade safety, definition-of-done,
package/lockfile và CI hiện có.

### Checkpoint trước chuẩn bị PR

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
6. Sau nghiệm thu: ADR-0006 do chủ dự án viết/quyết định và tài liệu WP-003 đồng bộ.

## 4. Files in scope

### 4.1. Được sửa trong PR hiện tại — đúng sáu file

| File | Phạm vi |
|---|---|
| `engine/ops/work-packages/WP-003a-sites-loader-spike.md` | Đặc tả, phân công, quyền, đóng gói, acceptance và điều kiện dừng |
| `engine/docs/01-architecture.md` | Cách phân phối loader; bản sao Sites; quyền đọc; đường ADR và giới hạn Pages liên quan |
| `engine/docs/07-delivery-plan.md` | Chỉ bảng Wave 1 để khớp backlog |
| `config/secrets.example.md` | Quyền token cho spike; phân biệt credential Sites và quyền của WP sau |
| `engine/app/loader.html` | Owner/path đúng; kiểm nguồn; giải mã; chẩn đoán; quản lý token |
| `engine/app/cockpit.js` | Marker tối thiểu và UTF-8, chưa có tính năng Cockpit |

Không sửa `PROJECT.md`, `AGENTS.md`, guardrails, contracts, package, lockfile, workflow,
runbook, backlog hoặc ADR trong PR hiện tại. Không mở PR thứ hai để xử lý phần thiếu.

### 4.2. Giai đoạn Sites — chưa thực hiện, cần duyệt riêng

Kho nguồn Sites chỉ có hai file nội dung được quản lý:

| File | Nội dung |
|---|---|
| `dist/index.html` | Bản sao nguyên byte của loader tại commit Meridian được duyệt |
| `.openai/hosting.json` | `project_id` do nền tảng trả về và `static.directory: "dist"` |

Không tạo các file này trong Meridian. Không copy `cockpit.js`, state, tài liệu,
dependency hoặc lịch sử đầy đủ của Meridian vào kho Sites. Không tự khởi tạo starter.
Archive tạm là sản phẩm đóng gói, không commit binary vào repo.

### 4.3. Sau thử thật — cần phạm vi cập nhật được duyệt riêng

| File | Người quyết định/nội dung |
|---|---|
| `engine/docs/02-adr/ADR-0006-cockpit-delivery.md` | Chủ dự án viết và chấp nhận quyết định/bằng chứng |
| `engine/docs/02-adr/README.md` | Chủ dự án chấp nhận mục ADR mới |
| `engine/ops/work-packages/WP-003-cockpit-shell.md` | Thêm phụ thuộc WP-003a, output và acceptance khớp quyết định |
| `engine/docs/01-architecture.md` | Ghi kết luận sau nghiệm thu |
| `engine/docs/05-runbook.md` | Thao tác triển khai/chẩn đoán đã kiểm thực tế |
| `engine/ops/backlog.md` | Chỉ dòng WP-003a; chỉ done sau nghiệm thu |

ADR thuộc chủ dự án theo README thư mục ADR. Agent tổng hợp bằng chứng, không tự viết ADR.
Danh sách sau thử không cấp quyền mở thêm PR hoặc ghi trực tiếp main.

## 5. Đóng gói Sites và blocker

### B1 — thiết kế đã chốt, thực thi còn chờ

Ngày 2026-09-09, chủ dự án chấp nhận bản sao triển khai giới hạn tại mục 4.2.
Chốt đường **HTML tĩnh**, không framework, không build JavaScript, không dependency/action mới.

Sau phê duyệt thực thi:

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

### B2 — chưa biết Sites có cho chạy mã động

CSP/CORS trên Site thật vẫn chưa được kiểm.
Preview/sandbox hoặc CI không thay thế bằng chứng trên origin Sites đã triển khai.
Không nới CSP hoặc tắt bảo vệ trình duyệt để làm phép thử đạt.

### B3 — tài liệu sau nghiệm thu còn chờ

WP-003 hiện vẫn mô tả dán `index.html` thủ công; không triển khai WP-003 trước khi đồng bộ.
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
- Credential nguồn Sites là loại riêng; chưa được lấy/sử dụng trong PR này.
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

### 7.1. Phần chuẩn bị PR

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

### 7.2. Sites thật — chưa được thực hiện

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

### Hoàn tất phần chuẩn bị PR hiện tại

- [ ] Đúng sáu file; 94 file còn lại trong cây 100 file sau bổ sung probe giữ nguyên.
- [ ] Fixture không dùng mạng/token thật đạt và CI tự động đạt.
- [ ] Không sửa backlog/runbook/ADR, không merge hoặc thao tác Sites.
- [ ] PR báo rõ chưa có nghiệm thu Sites và chưa hoàn tất WP-003a.

### Hoàn tất toàn bộ WP-003a sau phê duyệt riêng

- [ ] Thử Site thật có bằng chứng gắn đúng nguồn/phiên bản.
- [ ] Chủ dự án nghiệm thu kết luận; PAT/state/phạm vi được bảo toàn.
- [ ] Chủ dự án viết và chấp nhận ADR-0006; WP-003 và runbook khớp quyết định.
- [ ] Dòng WP-003a trong backlog được cập nhật sau nghiệm thu theo quyền ghi riêng.

## 9. Bước tiếp theo cho chủ dự án

1. Mở PR, xem đúng sáu file và phần bằng chứng/giới hạn kiểm tra.
2. Nếu muốn tiếp tục, yêu cầu review read-only tại head PR được cung cấp.
3. Chỉ duyệt merge đúng head sau review; đây chưa phải nghiệm thu Sites.
4. Duyệt riêng tạo/lưu Site, nguồn triển khai và phiên bản thử cụ thể; không cần terminal.
5. Khi Site sẵn sàng và lượt thử được duyệt, nhập token trực tiếp trên Site rồi gửi ảnh
   bằng chứng không chứa token. Không gửi PAT vào chat.
6. Nghiệm thu và quyết định ADR trước khi triển khai WP-003.
