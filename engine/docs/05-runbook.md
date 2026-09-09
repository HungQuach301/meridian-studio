# 05 · Runbook vận hành

Sổ tay dùng hằng ngày. Viết dần từ Wave 2, cập nhật mỗi khi gặp sự cố mới.

## Kiểm CI và review PR (WP-001)

1. Trong GitHub, mở PR của WP → **Files changed**. Đối chiếu từng file với Files in scope;
   xem **Commits** để xác nhận head SHA đã được review.
2. Mở **Checks** hoặc link run trong mô tả PR. Chọn run có sự kiện `pull_request`
   và đúng head; kiểm đủ `validate`, `typecheck`, `guardrails` đều hoàn tất, xanh.
   Push có check `guardrails-push`; kết quả này không thay thế guardrails của PR.
3. Trong log, kiểm Node 20, `npm ci`, 9 test validator hiện tại, validate/typecheck,
   fixture acceptance và dòng xác nhận nguồn không đổi. Cache npm miss/hit đều phải
   cài từ lockfile; cache không thay bước cài hoặc bước test.
4. Nếu có thay đổi contract, đọc cả đường dẫn cũ/mới trong diff. Nhãn
   `contract-change` chỉ thỏa điều kiện CI, không thay thế phê duyệt contract/ADR
   và không cho agent quyền sửa schema. Không gắn nhãn chỉ để làm một PR trái phạm vi xanh.
5. Khi việc thử nhãn đã được duyệt, gắn/gỡ nhãn trong thanh bên PR. Mỗi thao tác tự
   tạo CI qua `labeled`/`unlabeled`; chờ run mới nhất, đối chiếu action/nhãn/head
   trong log. Giữ nhãn `engine` cho WP-001 sau khi kết thúc phép thử.
6. Đọc đủ bốn mục mô tả PR và rủi ro còn lại. CI đỏ, thiếu bằng chứng hoặc head đổi
   sau review thì dừng merge; báo lại để sửa trong phạm vi được duyệt.
7. Chỉ bấm merge sau phê duyệt riêng của chủ dự án. Tác vụ chuẩn bị WP-001 dừng ở PR.
   Không tự bấm **Re-run jobs**, dispatch workflow, đổi settings hay triển khai.

| Lỗi CI | Xử lý trên trình duyệt |
|---|---|
| Validator báo schema sai | Mở log lỗi, đối chiếu dữ liệu/schema; giao sửa trong phạm vi WP, không sửa contract để né lỗi |
| Guardrails báo thiếu contract-change | Kiểm diff và quyền thay contract; xin quyết định riêng nếu cần, không tự gắn nhãn để bỏ qua |
| Blob vượt 5.000.000 byte | Đọc tên file/kích thước trong log; giao đưa nội dung lớn ra khỏi repo theo chính sách artifact |
| Guardrails không đọc được base/head/payload | Dừng review, báo lỗi dữ liệu CI; không chấp nhận kết quả từ diff rỗng |
| npm ci báo lockfile không khớp | Dừng; không tự tạo lại lockfile hay nâng dependency trong WP-001 |

**Giới hạn required checks:** tại checkpoint 2026-09-09, repo private có main
`protected: false`, required checks off. API rulesets trả 403 do giới hạn gói GitHub.
CI hiện phát hiện lỗi nhưng chưa khóa nút merge bằng bảo vệ nhánh. Chủ dự án phải
thực hiện quy trình review phía trên. Repo giữ private; WP-001 không đổi gói/quyền/settings.
Muốn bắt buộc checks bằng GitHub cần quyết định riêng về gói phù hợp và cấu hình bảo vệ,
rồi đọc lại settings để xác minh; không coi việc thêm workflow là đã hoàn tất bước đó.

Các fixture âm nằm trong thư mục tạm của runner. Log `expected exit 1` cùng lỗi đúng
là bằng chứng checker/validator từ chối dữ liệu sai, không phải bằng chứng PR thật đỏ.
Mô tả PR phải phân biệt hai trường hợp này.

## Hello và repository_dispatch (WP-002)

WP-002 đang chuẩn bị PR. **Chưa bấm Run workflow hoặc Re-run jobs** cho tới khi merge
và có phê duyệt riêng gắn với checkpoint mới. Không cần terminal, PAT hoặc secret mới.

### Review trước merge

1. Mở PR → Files changed: đúng hello.yml, WP-002, runbook và duy nhất dòng backlog WP-002.
   pipeline/state.json, ci.yml, contracts và dependency/lockfile phải giữ nguyên.
2. Mở Checks: CI có validate/typecheck/guardrails xanh. Hello có verify xanh;
   heartbeat và send-hello phải skipped trên push/PR.
3. Trong verify, kiểm source SHA, Node 20, npm ci, strict typecheck worker tạm,
   fixture thực tế, npm test/validate/typecheck và xác nhận toàn bộ nguồn không đổi.
4. Fixture âm phải có exit 1 và đúng mã lỗi; chưa có commit heartbeat hoặc HTTP dispatch.
   Chủ dự án đọc diff và bốn mục PR, rồi mới quyết định merge riêng.

### Thử thật sau merge và phê duyệt riêng

1. Yêu cầu ChatGPT Work xác minh main/tree và CI sau merge, chuẩn bị expected_sha đầy đủ.
   Duyệt một lượt heartbeat trước. Trên GitHub repo → Actions → **Hello** →
   **Run workflow**: branch main, mode heartbeat, expected_sha đúng SHA đã duyệt.
2. Đợi run completed/success, attempt 1. Trong log/summary lấy SOURCE_SHA,
   HEARTBEAT_COMMIT và link commit. Mở commit: chỉ updatedAt của pipeline/state.json đổi;
   author/committer github-actions[bot], message chore: heartbeat, parent đúng nguồn.
3. Sau read-back đạt, xác minh checkpoint mới rồi xin duyệt lượt send-hello cùng một
   run nhận. Bấm Run workflow trên main, mode send-hello, expected_sha mới đã duyệt.
4. Run gửi phải báo HTTP 204 và không ghi state. Trong Actions mở thêm run Hello có
   event repository_dispatch; source_run_id trong admission phải khớp run gửi,
   expected_sha khớp nguồn. Kiểm heartbeat commit theo bước 2. Không có vòng gửi tiếp.
5. Tổng dự kiến ba workflow run, hai heartbeat commit. Không bấm lại nếu chưa thấy
   kết quả. HTTP 204 không thay cho bằng chứng run nhận thành công.

Heartbeat dùng GITHUB_TOKEN nên push của bot **không tự tạo CI push mới**. Đọc verify
trên SHA nguồn, validation trong job ghi và read-back commit; không báo CI nguồn là
CI của heartbeat. Hello không kiểm khóa LLM/TTS/ASR và không chứng minh cockpit đã nối;
phần client ngoài GitHub/cockpit thuộc WP-004. Main chưa có required checks cưỡng chế,
vẫn phải review thủ công như WP-001. Không thay đổi settings để làm phép thử xanh.

| Lỗi | Xử lý |
|---|---|
| WP002_ADMISSION hoặc WP002_MAIN_MOVED | Dừng; kiểm input, SHA, branch, attempt và lịch sử main; không tự đổi input/chạy lại |
| WP002_STATE_JSON / WP002_STATE_SCHEMA / WP002_TIMESTAMP / WP002_STATE_DELTA | Mở log, đối chiếu state và schema; giao sửa trong phạm vi được duyệt, không sửa contract |
| Push bị từ chối / HTTP khác 204 | Dừng và đọc bằng chứng; không retry, nâng quyền, thêm PAT hoặc đổi settings |
| Timeout sau push/request | Kiểm commit/run nhận read-only trước; kết quả có thể đã xảy ra dù job đỏ |
| Heartbeat pending/cancelled | Không coi concurrency là hàng đợi bền vững; không mở nhiều lượt cùng lúc, không tự rerun |

## Chạy một tập (đường chuẩn)

1. Mở cockpit → tab **Gate Inbox**.
2. Nếu có mục "Chọn đề tài": đọc 5 đề tài đã chấm, chọn một, **tự gõ 1–2 câu thesis**, bấm `Start`.
3. Chờ ~25 phút. Pipeline chạy S04→S07.
4. Gate Inbox xuất hiện "Duyệt kịch bản": đọc, sửa trực tiếp, bấm `Approve`.
5. Chờ ~90 phút. Pipeline chạy S09→S13.
6. Gate Inbox xuất hiện "Spot check": xem 60s đầu + 30s kết, bấm `Pass`.
7. Xem `package.json`, chọn title và thumbnail, bấm `Publish` → video lên chế độ riêng tư.
8. Kiểm tra trên YouTube Studio, đặt lịch công khai.

## Nhịp tuần khi có nhiều kênh

Chi phí chuyển ngữ cảnh giữa các kênh lớn hơn thời gian thao tác. Hai quy tắc:

- **Gom gate theo lô:** thứ Hai toàn bộ Gate 1 của cả ba kênh · thứ Tư Gate 2 · thứ Sáu Gate 3.
- **Một ngày chỉ đụng một kênh** cho mọi việc ngoài gate — viết CP, đọc bình luận, rà insight.
  Thứ Ba kênh 1, thứ Năm kênh 2, thứ Bảy kênh 3.

## Chạy Fast Lane

Bấm `Fast Lane` trên thẻ episode. Bỏ Gate 1 và Gate 3. Dùng khi cần ra sản phẩm nhanh và chấp nhận
chất lượng thấp hơn.

## Sự cố thường gặp

| Triệu chứng | Nguyên nhân thường gặp | Xử lý |
|---|---|---|
| Job đỏ ở S04 | Nguồn dữ liệu đổi cấu trúc hoặc rate limit | Xem log, chạy lại stage; nếu lặp lại thì cập nhật `data-sources.md` |
| Pipeline dừng ở S05 | Fact-check báo cờ đỏ | Đọc `factcheck.json`, sửa thesis hoặc bỏ claim, chạy lại từ S04 |
| Render vượt thời gian | Quá nhiều scene hoặc layout nặng | Giảm số scene, kiểm tra layout mới thêm |
| Phụ đề lệch | ASR căn sai ở đoạn có số | Chạy lại S10; nếu lặp lại thì thêm SSML break |
| UI không cập nhật | PAT hết hạn | Tạo PAT mới trên GitHub → Settings → Developer settings, nhập lại vào ô Settings của cockpit |
| Upload thất bại | Hết quota ngày | Chờ sang ngày mới hoặc đăng thủ công |

## Chạy lại từ giữa pipeline

Mọi stage idempotent. Trên thẻ episode, bấm vào stage muốn chạy lại → `Re-run from here`.
Artifact của các stage sau sẽ bị đánh dấu stale.

## Rollback (toàn bộ trên web, không cần máy local)

| Cần hoàn tác | Làm thế nào |
|---|---|
| Một PR đã merge | Mở PR đó trên GitHub → nút **Revert** → merge PR revert |
| Một file sai | Mở file → tab **History** → chọn phiên bản cũ → nút **...** → **Revert** |
| Một artifact của episode | Chạy lại stage đó từ cockpit; artifact mới ghi đè |

Không bao giờ force push lên `main`.

## Loader Sites và Cockpit (WP-003a / WP-003)

[ADR-0006](02-adr/ADR-0006-cockpit-delivery.md) đã được chủ dự án chấp nhận.
[Hồ sơ WP-003a](../ops/work-packages/WP-003a-sites-loader-spike.md#10-hồ-sơ-kết-luận-đã-nghiệm-thu)
ghi một lượt Function constructor trên Sites v1: HTTP 200, blob khớp,
`WP003A_EXECUTED`, `Loader OK` và UTF-8 đúng, bằng Google Chrome.
Token chỉ Contents read và đã xóa theo xác nhận chủ dự án. Lượt thử đã dùng hết quyền.

### Review và đóng gói nguồn

1. Chủ dự án duyệt riêng phạm vi; agent xác minh main/tree/state/CI/lịch sử Meridian.
2. Bản sao nguồn Sites chỉ có `dist/index.html` nguyên byte từ loader đã duyệt và
   `.openai/hosting.json` với đúng project ID/static.directory. Không phát triển UI tại Sites.
3. Agent đối chiếu hash loader rồi đẩy hai file bằng credential nguồn ngắn hạn trong
   giai đoạn được duyệt. Không yêu cầu chủ dự án dùng terminal hoặc gửi credential vào chat.
4. Đóng gói theo công cụ hiện có; archive chỉ có `dist/index.html` và
   `dist/.openai/hosting.json`. Gắn phiên bản với commit nguồn Sites đã push.
5. Chủ dự án review chuỗi Meridian commit → loader hash → Sites commit → version.
   Lưu phiên bản và triển khai là hai thao tác cần quyền riêng; không tự tạo phiên bản mới.
6. Trước triển khai đúng version được duyệt, đối soát slug/project ID và quyền chia sẻ
   riêng tư chỉ chủ sở hữu. Đối soát lại deployment/version/quyền sau triển khai.

### Một lượt kiểm Site khi được duyệt riêng

1. Mở Site riêng tư, kiểm loader đã khởi động. Không nhập token nếu trang lỗi.
2. Lấy commit Meridian và blob `engine/app/cockpit.js` từ hồ sơ review, không lấy commit Sites.
3. Chọn đúng cơ chế được duyệt; chủ dự án tự nhập token chỉ Contents read và chạy một lượt.
4. Lưu log không chứa token: repo/path/ref, expected/verified blob, code SHA-256,
   HTTP status, outcome, thời gian và trình duyệt; đối chiếu nội dung hiển thị.
5. Gửi ảnh vùng kết quả không chứa token và xác nhận nghiệm thu; không gửi HAR/Authorization.
6. Kết quả lỗi hoặc chưa rõ: dừng, báo bằng chứng; không bấm lại, reload để thử thêm,
   đổi Script inline, đổi quyền, dispatch/rerun hoặc tự chuyển Pages.

Các bước trên mô tả quy trình, không cấp thêm lượt thử. Site v1 đã thử thành công;
đợt đồng bộ tài liệu không thao tác Sites hoặc dùng token.

### Cập nhật Cockpit và giới hạn

Commit mã mới không làm loader tự theo main. Phải xác minh commit/blob được phép nạp;
quy trình cập nhật và token đọc state thuộc WP-003. Nếu thay loader thì review Meridian
trước, rồi xin duyệt đồng bộ nguồn/lưu version/triển khai riêng. Không dán toàn bộ UI vào Sites.

Chưa kiểm Script inline, reload/xóa token trên Site thật, hai revision cùng Sites version,
trình duyệt khác, UI đọc state hoặc client dispatch WP-004. Không coi việc cấu hình token
trong bộ nhớ là bằng chứng đã thử reload; không coi CI/sandbox là phép thử Site thật.

## Xoay secret

1. Tạo khoá mới ở nhà cung cấp.
2. Cập nhật trong repo → Settings → Secrets and variables → Actions.
3. Xác nhận khóa bằng phép thử riêng của provider đã được duyệt trong WP tương ứng.
   `hello.yml` chỉ kiểm vòng điều khiển và quyền ghi repo, không dùng hoặc kiểm khóa provider.
4. Thu hồi khoá cũ.
