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
| UI WP-003 không cập nhật | Snapshot ghim commit; hoặc lỗi đọc state cần đối chiếu | Xem sourceCommit và mã lỗi Settings; không mặc định PAT hết hạn. Đổi commit/blob hoặc nhập lại token để thử chỉ sau phê duyệt lượt riêng; không tự reload/retry |
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

WP-003 đã được chủ dự án nghiệm thu snapshot rỗng và [PR #10](https://github.com/HungQuach301/meridian-studio/pull/10) đã merge.
Nguồn đã chạy là `a75be6c1b583c820389648bed6f4eb5cca333ce9`; snapshot state cùng commit,
`WP003_STATE_LOADED`, 0 episode và $0.00. [README](../app/README.md) ghi đầy đủ nguồn,
hai ảnh kết quả, Chrome và các giới hạn. Merge/code tài liệu sau đó không phải lượt Site mới.
Token WP-003 do chủ dự án xác nhận chỉ Meridian, Contents Read-only và Metadata read mặc định,
giữ 30 ngày; khác token WP-003a đã xóa. Không lưu token trong ứng dụng hoặc cấp thêm lượt thử.

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

Quy trình dưới đây chỉ áp dụng cho lượt mới được duyệt; lượt nghiệm thu WP-003 đã dùng hết quyền.

1. Đối soát đúng Site/version/quyền chia sẻ; ghi thời điểm và phiên bản trình duyệt.
   Mở Site riêng tư, kiểm loader đã khởi động. Không nhập token nếu trang lỗi.
2. Lấy commit Meridian và blob `engine/app/cockpit.js` đã review; state đọc tại cùng commit.
   Không lấy commit Sites hoặc tự dùng main mới nhất. Đối chiếu bảng nguồn trong README/hồ sơ.
3. Chọn Function constructor theo phê duyệt; chủ dự án nhập token chỉ Contents read vào loader
   và bấm một lượt. Có thể dùng token còn hạn do chủ dự án giữ tối đa 30 ngày, chỉ Meridian.
4. Đối chiếu HTTP 200, blob/code SHA-256 và `WP003A_EXECUTED`; marker chỉ xác nhận khởi động.
   Trong **Settings · Đọc state**, nhập token riêng rồi bấm **Đọc state** một lần.
   Cockpit không nhận token từ loader/global; không lưu storage/cookie/URL/log/Sites environment.
5. Đối chiếu `WP003_STATE_LOADED`, sourceCommit, verifiedStateBlob, stateSha256, số byte/episode
   và bảng hiển thị. Snapshot rỗng vẫn phải hiện đúng monthlySpendUsd và updatedAt nguồn.
6. Gửi ảnh/log vùng kết quả không chứa token cùng xác nhận nghiệm thu; không gửi HAR/Authorization.
   Chủ dự án xác nhận quyền và việc giữ/thu hồi token. GET thành công không kiểm được quyền dư.
   Token giữ 30 ngày không cấp thêm lượt; thu hồi khi không còn cần hoặc nghi lộ.
7. Lỗi hoặc chưa rõ: dừng, báo bằng chứng; không bấm lại, reload để thử thêm, đổi Script inline,
   nâng quyền, dispatch/rerun hoặc tự chuyển Pages. Agent đọc lại repo/state/lịch sử khi được duyệt.

Một lượt có tối đa một GET mã và một GET state; có thể có OPTIONS của trình duyệt.
Đợt đóng hồ sơ chỉ cập nhật tài liệu, không thao tác Sites hoặc dùng token.

### Cập nhật Cockpit và giới hạn

Commit mới không làm loader tự theo main. WP-003 đọc snapshot tại cùng commit đã chọn để nạp mã;
muốn cập nhật phải review commit/blob mới và duyệt riêng lượt nạp theo [README](../app/README.md).
Giữ loader nguyên byte thì thiết kế không cần redeploy; chưa có phép kiểm đối chứng hai revision.
Nếu thay loader, review Meridian rồi duyệt đồng bộ nguồn/lưu version/triển khai riêng.
Không dán toàn bộ UI hoặc sao chép Cockpit/state vào Sites.

Đã nghiệm thu đúng snapshot rỗng của WP-003; fixture có episode và nhánh lỗi mới kiểm offline.
Chưa kiểm Script inline, reload/xóa và nhập lại token trên Site thật, phép kiểm đối chứng hai
revision trên cùng Sites version, trình duyệt/phiên bản khác hoặc chính sách Sites tương lai,
client dispatch WP-004 và so toàn bộ byte archive máy chủ tải trực tiếp.
Không coi bộ nhớ token là bằng chứng đã thử reload, CI/sandbox là phép thử Site thật hoặc
một lượt đạt là khả năng tự nhận UI mới sau commit/reload. Giữ nghiệm thu WP-003a đã có.

Các giới hạn WP-003 ở đoạn trên được giữ theo mốc nghiệm thu lịch sử; vòng dispatch
và đọc H được nghiệm thu riêng trong hồ sơ WP-004 dưới đây.

## Cockpit gửi hello và đọc kết quả (WP-004)

[WP-004](../ops/work-packages/WP-004-cockpit-dispatch.md#9-hồ-sơ-đóng-wp-004)
đã merge qua PR #11 và được chủ dự án nghiệm thu Hello #30/đọc H. Quy trình dưới đây
chỉ áp dụng cho lượt mới có phê duyệt riêng; giữ lịch sử và quyền đã dùng của mọi WP.

### Review PR và chốt nguồn lượt thật

1. Mở PR → Files changed, đối chiếu đúng bảy file trong WP. Loader, ci.yml,
   contracts, package/lockfile và pipeline/state.json phải nguyên byte.
2. CI/Hello trên đúng head phải đạt; heartbeat/send-hello skipped trên push/PR.
   Đọc số fixture thật: hồi quy WP-003, nhánh UI WP-004, 30 fixture WP-002 và
   fixture admission Cockpit. DOM/fetch giả không chứng minh Site/CORS/CSP thật.
3. Review payload Cockpit riêng; không giả source_run_id Actions. Đọc giới hạn
   request_id: dùng nối bằng chứng, không phải chứng thực nguồn hoặc chống lặp bền vững.
4. Sau phê duyệt merge riêng, đối soát main M/tree/state/CI/lịch sử và blob B/hash/bytes
   Cockpit tại M. Không lấy head PR hoặc SHA Sites làm M một cách tự động.
5. Trước lượt thật, xin duyệt metadata đúng Site Meridian/version/quyền chia sẻ,
   cặp M/B, token riêng, 5 GET + 1 POST, một run nhận và một commit chỉ đổi updatedAt.
   Loader giữ nguyên; không redeploy, sao chép Cockpit/state sang Sites hoặc thử cơ chế khác.

### Một lượt Site sau khi được duyệt

1. Ghi Chrome/version thực tế, UTC bắt đầu và thời gian chủ dự án thao tác. Mở Site
   đã đối soát; loader lỗi thì dừng trước khi nhập token. Chủ dự án tự cấp/giữ/thu hồi
   token theo phạm vi đã duyệt, không gửi vào chat/ảnh. Xem config/secrets.example.md.
2. Nhập M/B và token chỉ Contents read vào loader, chọn Function constructor và
   bấm một lượt. Đối chiếu hash/HTTP 200/WP003A_EXECUTED và revision wp004-v1.
3. Settings · Đọc state: nhập token đọc riêng, bấm một lần; snapshot phải thuộc M,
   blob/hash/dữ liệu khớp trước khi nút gửi được mở. Không nhận token loader qua global.
4. Trong Gửi hello, kiểm repo/M và tác động chỉ đổi updatedAt. Nhập token dispatch
   riêng Contents read and write, chỉ Meridian, rồi bấm một lần. UI GET main phải
   bằng M trước đúng một POST event_type hello; ghi request_id và kết quả HTTP.
5. HTTP 204 chỉ xác nhận gửi. Giữ trang mở; agent đọc run Hello nhận
   repository_dispatch, attempt 1, SHA M, PASS ADMISSION và CLIENT_REQUEST_ID khớp.
   verify/heartbeat phải success, send-hello skipped. Lấy H từ log/summary heartbeat.
6. Agent đối soát H: parent duy nhất M, author/committer github-actions[bot], message
   chore: heartbeat, chỉ pipeline/state.json và chỉ giá trị updatedAt tăng; mọi byte khác
   nguyên vẹn. Đọc main/state/lịch sử, không chạy lại hoặc dùng CI nguồn thay CI H.
7. Agent cung cấp H đã nối với run/request_id. Chủ dự án nhập H và token Contents read
   riêng vào Đọc kết quả. UI GET metadata H, rồi GET state tại H, kiểm blob/delta;
   bảng đổi sang kết quả H với nhãn nguồn rõ ràng, nguồn mã M/B vẫn giữ trong bằng chứng.
8. Gửi ảnh/log vùng kết quả không token, request_id, run/H, Chrome và thời gian thực tế;
   nghiệm thu riêng vòng UI → Actions → repo → UI. Không gửi HAR/header/Authorization.

Một lượt có tối đa 5 GET + 1 POST trong ứng dụng, có thể thêm OPTIONS: tải mã M,
đọc state M, kiểm main, POST hello, đọc metadata H và state H. Mỗi thao tác UI có
timeout 15 giây cho toàn chuỗi request của thao tác đó; không poll hoặc retry.
Việc agent đọc run/commit qua kết nối GitHub được ghi riêng với request trình duyệt.
Đọc kết quả không cần Actions read/write cho PAT trình duyệt. Mã kiểm cấu trúc H/delta;
quan hệ H ↔ run ↔ request_id vẫn phải do agent đối soát, không suy ra từ metadata H đơn lẻ.

| Trạng thái/lỗi | Cách xử lý |
|---|---|
| Chưa đọc snapshot hoặc input/môi trường chưa hợp lệ | Không có POST; kiểm hướng dẫn và dữ liệu đầu vào trước lượt được duyệt |
| MAIN_MOVED / MAIN_RESPONSE | Chưa POST; dừng và đối soát checkpoint, không tự thay SHA |
| DISPATCH_ACCEPTED | HTTP 204, chờ kiểm run nhận/commit; chưa gọi là hoàn tất |
| DISPATCH_UNKNOWN / timeout sau POST | Có thể đã có run/commit; agent đọc lịch sử trước, không bấm lại/reload để gửi thêm |
| HTTP khác 200/204 | Dừng, đối chiếu bằng chứng; không tự nới quyền hoặc retry |
| RESULT_COMMIT / RESULT_BLOB / RESULT_DELTA | H/bytes không đạt; giữ bảng snapshot M, dừng để kiểm run/commit/state |
| RESULT_LOADED | Bảng H đã đọc; đối chiếu thêm bằng chứng run và xác nhận của chủ dự án |
| Rời trang, hết thời gian hoặc cần vượt phạm vi | Dừng, báo phần còn lại; không tự hủy run đã gửi, rerun hoặc mở lượt mới |

Trần 20 phút là phạm vi lượt thật ban đầu; lịch sử thực tế có POST 403, POST 204 và
hai GET đọc H được duyệt bổ sung với trần 5 phút. Thời gian chủ dự án chưa báo, chưa
kết luận các trần thời gian đều đạt. Không dùng phần ngân sách còn lại làm quyền thử thêm.
GITHUB_TOKEN ghi heartbeat không tạo CI push trên H; dùng verify tại M, validation
trong job và đối soát commit/state. Chủ dự án đã nghiệm thu vòng điều khiển WP-004/Wave 1;
quyền đóng tài liệu tách riêng, không cấp quyền provider, episode, tự cập nhật mã hoặc Wave 2.

### Hồ sơ vận hành đã nghiệm thu

- M: `ebbacf2fe0dff2f3ab227064d02bc2c3cf940647`; B: `f798741a6a541cd4bb59841244c415d7653a7b55`; H: `98ed4d8c02574e2a44f6fde8a66649d8d1736933`.
- [Hello #30, attempt 1](https://github.com/HungQuach301/meridian-studio/actions/runs/34484922516) success; request_id `06d23dd4-39e5-46a0-9fc7-85d4f5d6e336`.
  Agent kiểm hai log admission và HEARTBEAT_COMMIT; H chỉ có parent M và một file state.
- Giữ POST 403 với request_id `84997aab-a45e-46ad-86ea-1e0e40051417` trước POST 204; không gộp thành một lượt
  5 GET + 1 POST. Quyền POST đầu đã dùng; không có phê duyệt retry riêng cho POST thứ hai.
- Hai GET đọc H có phê duyệt bổ sung; HTTP 200/200, WP004_RESULT_LOADED,
  UTC 2026-09-10T14:01:49.404Z → 14:01:51.624Z. H chỉ đổi updatedAt thành
  `2026-09-10T13:49:34.919Z`, vẫn $0.00/0 episode/88 byte.
- Chủ dự án đã nghiệm thu luồng và giữ lịch sử hai POST. Chrome/thời gian thao tác
  WP-004, nguyên nhân 403 và việc đổi token/quyền giữa hai POST chưa được xác nhận.
  Không dùng Chrome WP-003 hoặc HTTP 204 để điền các thông tin này.
- [Hồ sơ đóng](../ops/work-packages/WP-004-cockpit-dispatch.md#9-hồ-sơ-đóng-wp-004)
  lưu hash, bảo toàn, sổ thời gian và giới hạn. Muốn thử mới phải lập nguồn/phạm vi/quyền
  mới; không dùng lại lượt đã hết quyền hoặc token giữ 30 ngày làm sự cho phép.

## Xoay secret

1. Tạo khoá mới ở nhà cung cấp.
2. Cập nhật trong repo → Settings → Secrets and variables → Actions.
3. Xác nhận khóa bằng phép thử riêng của provider đã được duyệt trong WP tương ứng.
   `hello.yml` chỉ kiểm vòng điều khiển và quyền ghi repo, không dùng hoặc kiểm khóa provider.
4. Thu hồi khoá cũ.
