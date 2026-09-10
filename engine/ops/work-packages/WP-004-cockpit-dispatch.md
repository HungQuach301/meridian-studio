# WP-004 · Dispatch hello từ Cockpit

**Wave:** 1 · **Phụ thuộc:** WP-002, WP-003 đã merge/nghiệm thu · **Trạng thái:** done — chủ dự án nghiệm thu Hello #30 và đọc H; hồ sơ tại mục 9.

Phê duyệt chuẩn bị ban đầu chỉ gồm PR bảy file, fixture offline, kiểm repo,
commit/push nhánh WP, nhãn `engine` và CI tự động. Phạm vi bảy file tại mục 4 là
phạm vi triển khai PR #11; các phê duyệt sau và sáu file đóng hồ sơ được ghi riêng ở mục 9.

## 1. Mục tiêu

Chuẩn bị vòng điều khiển tối thiểu: Cockpit gửi một `repository_dispatch` hello,
Hello ghi một heartbeat, rồi Cockpit đọc kết quả tại commit được đối soát.
Không tạo episode, gate, stage sản xuất, polling, backend hoặc tính năng tương lai.
HTTP 204 chỉ xác nhận gửi; chưa phải nghiệm thu run nhận, commit hoặc UI kết quả.

## 2. Input và checkpoint

- Repo duy nhất: `HungQuach301/meridian-studio`, private.
- Main: `42056c116ba7a2aa29da482b785540bc4dd6d19e`.
- Tree: `9d0cb4ec4ba903d771fd47b5a0af8428df56c1c5`, 102 file.
- State: blob `4846d4649f5f7f4460b3560594e9fb38408b66f0`, SHA-256
  `bd1df1537db185b1d54cd39dcc9cefb19652dd9354738bb35b824fcf06cf6aee`, 88 byte;
  `updatedAt: 2026-09-09T08:39:17.722Z`, `monthlySpendUsd: 0`, `episodes: []`.
- [CI 34424112337](https://github.com/HungQuach301/meridian-studio/actions/runs/34424112337)
  và [Hello 34424112305](https://github.com/HungQuach301/meridian-studio/actions/runs/34424112305):
  success, attempt 1; heartbeat/send-hello skipped. 66 run, 22 Hello, không run đang chạy.
- Đọc PROJECT, AGENTS, guardrails, kiến trúc, ADR-0006, DoD/template, backlog,
  delivery plan, runbook, NFR/risk/upgrade-safety, WP-002/WP-003, loader/Cockpit,
  hello.yml/ci.yml, schema state và package/lockfile tại checkpoint này.

Checkpoint đổi ngoài tác động đã duyệt thì dừng, không tự chọn nguồn khác.

## 3. Output và giao thức

### Nguồn và khởi động

| Ký hiệu | Ràng buộc |
|---|---|
| M | Main sau merge WP-004, được review/đối soát và duyệt cho lượt thật |
| B | Blob Cockpit đã review tại M; ghi thêm SHA-256 và số byte |
| H | Commit heartbeat được agent nối với run nhận/request_id; parent duy nhất là M |

Trong PR chuẩn bị, M/B/H chưa được cấp cho lượt thật; nguồn đã chạy và nghiệm thu
nay được ghi ở mục 9. Loader vẫn nạp commit/blob cụ thể bằng Function constructor,
không theo main hoặc tự retry. Cockpit dựng UI/listener đồng bộ rồi đặt
`wp003aComplete`/`wp003aRevision` cho kiểm sau 250 ms; marker chỉ xác nhận boot, mã tối đa 65.536 byte.

### Một lượt gửi và một lượt đọc kết quả

1. Settings đọc snapshot ban đầu tại M bằng token Contents read nhập riêng.
2. Chỉ sau khi snapshot hợp lệ mới mở phần Gửi hello. Chủ dự án nhập token dispatch
   riêng; UI hiện repo/M và tác động chỉ đổi updatedAt, rồi bấm một lần.
3. UI khóa lượt trước request; GET main phải bằng M, sau đó đúng một POST tới
   `https://api.github.com/repos/HungQuach301/meridian-studio/dispatches`:

```json
{
  "event_type": "hello",
  "client_payload": {
    "expected_sha": "<M: SHA đủ 40 ký tự đã duyệt>",
    "source": "cockpit",
    "request_id": "<UUID v4 tạo trong bộ nhớ của lượt gửi>"
  }
}
```

4. Admission chỉ nhận đúng ba khóa của nhánh Cockpit, UUID v4 hợp lệ; từ chối
   trộn source_run_id/source_run_attempt hoặc khóa/payload không đúng. Nhánh WP-002
   không có source vẫn yêu cầu source_run_id/source_run_attempt như trước; không
   giả mạo ID của sender Actions. Giữ repo/main/SHA/attempt 1 và admission trước ghi.
5. HTTP 204: đã gửi, chờ đối soát. Khi POST đã bắt đầu nhưng không có phản hồi rõ,
   kết quả chưa xác định; không retry. Agent đọc lịch sử để biết đã có run/commit chưa.
6. Agent nối request_id trong log nhận với H; chủ dự án nhập H được cung cấp và
   token Contents read vào Đọc kết quả. UI chỉ đọc sau HTTP 204 của lượt gửi này.
7. GET metadata H phải khớp SHA, parent M, bot/message heartbeat và chỉ một file
   pipeline/state.json modified. GET state tại H phải khớp blob file trong commit;
   kiểm bytes/UTF-8/JSON/phần hiển thị và chỉ timestamp gốc thay đổi, tăng so với M.
   UI hiển thị dữ liệu H với nhãn nguồn H, giữ nguồn mã M/B và bằng chứng snapshot M.

Đọc kết quả thủ công, không poll/tìm run qua API từ Cockpit; không cần quyền Actions
cho PAT trình duyệt. Request_id chỉ là khóa nối bằng chứng, không chứng minh nguồn
trình duyệt hay chống lặp bền vững. Admission SHA, push thường và lượt tuần tự hạn chế
tác động lặp; không tuyên bố exactly-once hoặc tự cấp lượt mới qua reload.

Một lượt Site sau này có trần **5 GET + 1 POST**: mã M, state M, main trước POST,
metadata H, state H và POST hello. Có thể có OPTIONS của trình duyệt. Mỗi thao tác UI
có timeout 15 giây cho chuỗi request của thao tác đó; không retry. Không dùng 204 hay
metadata commit riêng lẻ thay cho bằng chứng run nhận gắn với request_id.

## 4. Files in scope

```text
engine/ops/work-packages/WP-004-cockpit-dispatch.md
engine/app/cockpit.js
.github/workflows/hello.yml
engine/app/README.md
config/secrets.example.md
engine/docs/05-runbook.md
engine/ops/backlog.md
```

Hello chỉ mở rộng admission và fixture: giữ job heartbeat/sender, action SHA,
permissions và concurrency hiện có. Backlog chỉ dòng WP-004. Runbook thêm vận hành
WP-004; README tách quy trình mới khỏi hồ sơ WP-003. Config chỉ mô tả tên/quyền.
Không sửa PROJECT/AGENTS/guardrails/ADR, loader, ci.yml, contracts, package/lockfile,
WP-002/WP-003/WP-003a hoặc file khác. Không thêm helper/harness vào repo.
pipeline/state.json giữ nguyên trong PR; một heartbeat thật chỉ được đổi updatedAt
sau merge và phê duyệt thực thi riêng, không sửa state để tạo fixture.

## 5. Ràng buộc, quyền và ngân sách

- Không thêm/nâng dependency hoặc action. Node 20 trong CI, npm ci từ lockfile hiện có:
  Ajv 8.20.0, ajv-formats 3.0.1, TypeScript 5.9.3, tsx 4.23.13, Vitest 3.2.7.
- Cockpit vẫn JavaScript một file theo ngoại lệ phân phối UI đã chấp nhận;
  worker Hello TypeScript strict/ESM, không đổi quy ước stage.
- Token đọc riêng chỉ Meridian/Contents read/Metadata read mặc định. Token dispatch
  riêng chỉ Meridian/Contents read and write/Metadata read mặc định, hạn tối đa 30 ngày.
  Contents write rộng hơn endpoint dispatch; cần chủ dự án duyệt rõ cho lượt thật.
  Không nâng token đọc WP-003, không thêm Actions write hoặc quyền khác.
- Chủ dự án tự cấp/nhập/quản lý token; không gửi vào chat. Không lưu token trong
  storage/cookie/URL/log/global/Sites environment. Không đọc token loader; xóa ô nhập
  ngay, thả tham chiếu sau chuỗi request/khi rời trang. Không ghi raw exception/body/header.
- Chỉ api.github.com, HTTPS; credentials omit, cache no-store, redirect error,
  referrerPolicy no-referrer. Không dùng request ghi để thăm dò quyền.
- Job verify contents read; job heartbeat dùng GITHUB_TOKEN contents write như cũ.
  Bot push không tự sinh CI push trên H; dùng verify nguồn, validation và read-back.
- Tổng WP-004 tối đa **150 phút**, gồm **7 phút 41 giây** lập kế hoạch đã dùng.
  Lượt chuẩn bị PR này tối đa **90 phút** từ ngân sách còn lại; bắt đầu
  `2026-09-10T01:41:43.789Z`. Theo dõi CI và đọc lại đều tính vào cùng sổ.
  Thời gian thực tế cuối lượt ghi trong mô tả PR/bàn giao; không đặt lại ngân sách,
  không dùng quyền/thời gian WP-002/WP-003a/WP-003, không cộng thời gian chờ người giữa lượt.
- Merge, metadata/lượt Site, token thật, một run nhận/một commit heartbeat và đóng hồ sơ
  là các phê duyệt riêng sau review. Một WP = một PR, nhánh wp/WP-004-cockpit-dispatch.
- Hết thời gian hoặc cần vượt phạm vi thì dừng và báo phần còn lại. Không tự rerun,
  hủy run đã gửi, đổi settings/quyền hoặc cấp thêm lượt.

## 6. Acceptance test

### Trước PR/merge — offline và CI tự động

| Kiểm | Tiêu chí |
|---|---|
| Loader/Cockpit | Dùng mã thật với DOM/fetch/timer giả; boot đồng bộ, không network khi boot; giữ hồi quy snapshot rỗng/episode/optional/UTF-8/lỗi của WP-003 |
| Dispatch | Chưa đọc state/thiếu input/sai môi trường không POST; đúng nguồn một GET main + một POST; payload chính xác; bấm trùng không thêm request |
| Dispatch âm | Main đổi, HTTP khác 200/204, JSON sai, timeout/rời trang/response trễ/redirect fail; không tự retry, token không vào DOM/bằng chứng/global/storage |
| Kết quả | Một GET metadata + một GET state H; SHA/parent/bot/message/file/blob đúng, chỉ updatedAt đổi và tăng; bảng/nhãn nguồn H đúng |
| Kết quả âm | H sai/không phải con M, nhiều parent/file, đổi dữ liệu khác, timestamp không tăng, số lớn/decimal bị làm tròn, dữ liệu/HTTP/integrity sai: từ chối, giữ bảng M |
| Worker | 30 fixture WP-002 giữ nguyên; thêm nhánh Cockpit hợp lệ và trường hợp sai source/UUID/khóa/binding/SHA/attempt; tiến trình âm exit 1 và đúng mã lỗi |
| Repo | npm run test/validate/typecheck đạt; CI/Hello đúng head/ngữ cảnh đạt; heartbeat/send-hello skipped trên push/PR; toàn bộ file ngoài scope nguyên byte |

Fixture/harness ở thư mục tạm; không state thật, token thật, network production hoặc
provider. Ghi runtime, SHA nguồn, hash harness, số case thực chạy và kết quả trong PR.
Quét chuỗi giống secret; phân biệt prefix mẫu trong tài liệu với giá trị credential.
Typecheck repo không bao phủ Cockpit; DOM giả không chứng minh CSS/CSP/CORS/Site thật.

### Sau merge — tiêu chí đối chiếu với hồ sơ mục 9

Đối soát M/tree/CI/state/lịch sử và B/hash mã/loader; đối soát metadata đúng Site
Meridian/version/quyền chia sẻ theo phê duyệt riêng. Chủ dự án review bảng nguồn và
phạm vi token/5 GET + 1 POST rồi duyệt đúng một lượt, trần đề xuất 20 phút từ ngân sách.
Không triển khai version mới hoặc sao chép Cockpit/state sang Sites.

Cần ảnh/log không secret, Chrome thực tế, UTC và thời gian chủ dự án thao tác;
HTTP 204/request_id; một run Hello repository_dispatch attempt 1 có verify/heartbeat
success, send-hello skipped; H/parent/bot/message/diff; state blob/SHA-256 trước/sau;
UI hiển thị đúng state H. History tăng đúng một run nhận, một commit heartbeat;
mọi byte khác ngoài token timestamp của state giữ nguyên. Không gọi CI nguồn là CI H.

## 7. Definition of Done

Theo [DoD chung](../definition-of-done.md), cộng thêm:

- [x] Đúng bảy file, không dependency/action mới, kiểm offline và CI đạt.
- [x] PR đủ bốn mục/nhãn engine, chủ dự án đọc toàn bộ diff tại head đã xác minh.
- [x] Chủ dự án duyệt merge riêng; main sau merge/checks được đối soát.
- [x] Chủ dự án nghiệm thu vòng UI → repository_dispatch → heartbeat → UI tại M/B/H cụ thể.
- [x] Backlog/runbook/hồ sơ được đồng bộ sau phê duyệt đóng riêng; chưa done chỉ nhờ HTTP 204.

Idempotency/khôi phục stage sản xuất không áp dụng cho UI này; giữ nguyên kiểm
timestamp, byte preservation và điều kiện dừng của heartbeat WP-002.
Giữ nghiệm thu WP-003 và token đọc giữ 30 ngày theo xác nhận lịch sử của chủ dự án.
Script inline, phép kiểm reload/xóa và nhập lại token, hai revision đối chứng cùng
Sites version, trình duyệt/chính sách khác, dữ liệu có episode/các nhánh lỗi còn lại
và archive máy chủ nguyên byte vẫn chưa được nghiệm thu. Vòng điều khiển Wave 1 đã
được chủ dự án nghiệm thu riêng qua WP-004; không suy ra commit/reload tự cập nhật UI,
exactly-once hoặc quyền thực thi Wave 2.

## 8. Nguồn kỹ thuật

- [Quyền repository_dispatch: Contents write](https://docs.github.com/en/rest/repos/repos#create-a-repository-dispatch-event).
- [repository_dispatch dùng default branch](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#repository_dispatch).
- [GITHUB_TOKEN và trigger](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow).
- [Đọc commit: Contents read](https://docs.github.com/en/rest/commits/commits#get-a-commit).

## 9. Hồ sơ đóng WP-004

Chủ dự án đã xác nhận: “Tôi nghiệm thu luồng WP-004 qua Hello #30 và kết quả đọc H,
giữ nguyên lịch sử hai POST.” Nghiệm thu này độc lập với WP-002/WP-003a/WP-003.

### Nguồn, checks và bảo toàn

| Nguồn | Giá trị |
|---|---|
| PR đã merge / head đã review | [PR #11](https://github.com/HungQuach301/meridian-studio/pull/11) / `2a72af64724397dfa850d0141fa8153754dbee4f` |
| M / tree M | `ebbacf2fe0dff2f3ab227064d02bc2c3cf940647` / `d2001451aa4a4a702c8e0e95d429a7be2d20461d` |
| B / revision | `f798741a6a541cd4bb59841244c415d7653a7b55` / `wp004-v1` |
| SHA-256 mã / byte | `eb361e3382d4a5bdb3994fd6f73a34448d95bd29d740092cf9fc157712e19683` / 36.767 |
| State M blob / SHA-256 | `4846d4649f5f7f4460b3560594e9fb38408b66f0` / `bd1df1537db185b1d54cd39dcc9cefb19652dd9354738bb35b824fcf06cf6aee` |
| H / tree H | `98ed4d8c02574e2a44f6fde8a66649d8d1736933` / `5b218117dfa53de39d0ed2897a8a9a856d3c71ca` |
| State H blob / SHA-256 | `3ba90b96e8ee3c6d8774d81eb82da8c96a10c6f5` / `5783182b5c082cf78166e2df38caa46999a25ede101b1568dc54ccef8b40ae36` |

[CI sau merge 34443092297](https://github.com/HungQuach301/meridian-studio/actions/runs/34443092297) và
[Hello sau merge 34443092257](https://github.com/HungQuach301/meridian-studio/actions/runs/34443092257) success, attempt 1.
Nguồn M có sáu checks push ban đầu và ba checks của receiver #30; H không có
check-run riêng. Không gọi CI tại M là CI tại H. Bằng chứng offline/P2 BOM/CI tại
head review giữ trong PR #11 và README; không chạy lại Site hoặc fixture để đóng hồ sơ.

H có đúng một parent M, author/committer github-actions[bot], message
`chore: heartbeat`. Cây M và H đều 103 file; 102 file ngoài state giữ nguyên blob/mode.
State cả hai mốc đều 88 byte, monthlySpendUsd 0, episodes []; so byte chỉ khác
`updatedAt`: `2026-09-09T08:39:17.722Z` → `2026-09-10T13:49:34.919Z`.
Trước commit đóng hồ sơ: main H, 82 run/30 Hello, không run đang chạy;
chỉ thêm một receiver và một heartbeat so với M.

### Lịch sử lượt thật và phạm vi quyền

| Sự kiện thực tế | Bằng chứng |
|---|---|
| POST thứ nhất, HTTP 403 | request_id `84997aab-a45e-46ad-86ea-1e0e40051417`; UTC 2026-09-10T12:50:53.717Z → 12:50:55.833Z; WP004_HTTP_403, postStarted=true. Đối soát sau đó vẫn M, 81 run/29 Hello, không H. |
| POST thứ hai, HTTP 204 | request_id `06d23dd4-39e5-46a0-9fc7-85d4f5d6e336`; UTC 2026-09-10T13:48:05.142Z → 13:48:06.724Z; WP004_DISPATCH_ACCEPTED. Đây là POST khác lượt 403. |
| Run nhận | [Hello #30](https://github.com/HungQuach301/meridian-studio/actions/runs/34484922516), ID 34484922516, repository_dispatch, attempt 1, head M; verify/heartbeat success, send-hello skipped. Hai log admission ghi đúng CLIENT_REQUEST_ID; log heartbeat ghi HEARTBEAT_COMMIT H. |
| Hai GET đọc H được duyệt bổ sung | Cùng request_id của POST 204; UTC 2026-09-10T14:01:49.404Z → 14:01:51.624Z (2,220 giây); commit/state HTTP 200/200; requestNumber 1 của thao tác đọc, WP004_RESULT_LOADED. |

Ảnh ứng dụng còn ghi HTTP 200 khi tải mã và snapshot M ở cả hai lần mở.
Không gộp lịch sử thành một lượt chuẩn 5 GET + 1 POST: quyền POST ban đầu đã sử dụng
ở lượt 403; POST 204 xuất hiện sau đó, không có phê duyệt retry riêng trong trao đổi.
Đối soát kỹ thuật và nghiệm thu của chủ dự án không hồi tố xóa khác biệt phạm vi này.
Hai GET đọc H sau đó có phê duyệt bổ sung rõ ràng, trần 5 phút, không POST/retry/rerun.
Không suy ra cơ chế chống lặp bền vững từ requestNumber 1 hoặc một receiver thành công.

### Môi trường, thông tin còn thiếu và giới hạn

Nguồn Sites được đối soát trước lượt thử là Meridian Studio,
`https://meridian-studio.quach-hung.chatgpt.site`, project
`appgprj_6aa16be27e688191956ed0746e3af820`, version
`appgprj_6aa16be27e688191956ed0746e3af820~appgver_ff3f047e374481919d61d43b1713372d`.
Đây là metadata đã đọc ở giai đoạn được duyệt; đợt đóng hồ sơ không đọc/đổi Sites.
Đối soát triển khai ghi env_set_revision 0; lần đọc cấu hình environment hiện hành
không thành công, không kết luận đã kiểm toàn bộ cấu hình chưa triển khai.

- Chrome của lượt WP-004 và thời gian chủ dự án chuẩn bị token/thao tác từng lượt:
  **chưa cung cấp**. Chrome 152.0.7977.83 của WP-003 vẫn là bằng chứng lịch sử riêng.
- Phạm vi token đã duyệt: token đọc riêng chỉ Meridian/Contents read; token dispatch
  riêng chỉ Meridian/Contents read and write, Metadata read mặc định, hạn tối đa 30 ngày.
  Chủ dự án tự nhập/quản lý; agent không nhận token hoặc kiểm quyền/hạn độc lập.
  Việc đổi token/quyền giữa hai POST chưa được chủ dự án xác nhận; HTTP 403 chưa rõ
  nguyên nhân. HTTP 204 không chứng minh token không có quyền dư.
- Giữ các phần chưa kiểm tại mục 7. HTTP 403 đã được quan sát trên Site; các nhánh lỗi
  khác, BOM và dữ liệu có episode không vì thế trở thành nghiệm thu Site.
- Không sửa loader, state hoặc code để ghi hồ sơ; không gọi provider, tạo episode,
  dispatch/rerun, thử thêm hoặc coi đóng hồ sơ là quyền thực thi tiếp.

### Sổ thời gian và commit đóng

| Công việc đã ghi | Thời gian |
|---|---|
| Lập kế hoạch WP-004 | 7 phút 41 giây |
| Chuẩn bị PR | 47 phút 02 giây |
| Review lần đầu | 6 phút 41 giây |
| Sửa P2 BOM | 12 phút 09 giây |
| Review bản sửa | 4 phút 07 giây |
| Merge và đối soát | 8 phút 43 giây |
| Kế hoạch preflight | 7 phút 57 giây |
| Đối soát trước lượt Site | 6 phút 10 giây |
| Đối soát lượt 403 | 3 phút 25 giây |
| Đối soát lượt 204 và H | 5 phút 59 giây |
| Chuẩn bị bước hai GET | 1 phút 11 giây |
| Đối soát ảnh đọc H | 56 giây |
| Kế hoạch đóng hồ sơ | 4 phút 08 giây |
| Tổng đến trước đợt đóng | **116 phút 09 giây** |

Ngân sách WP-004 tối đa 150 phút; tại mốc trên còn tối đa **33 phút 51 giây**,
chưa trừ thời gian chủ dự án chưa báo. Các khoảng UTC trong log không thay tổng
thời gian chuẩn bị/thao tác của chủ dự án; không cộng thời gian chờ người giữa lượt.
Chưa đủ dữ liệu chốt thời gian chủ dự án hoặc kết luận các trần lượt thật đều đạt.

Chủ dự án duyệt đợt đóng hồ sơ bắt đầu `2026-09-10T14:13:56.330Z`, tối đa 10 phút từ ngân sách
còn lại, một commit tài liệu trên main H và CI tự động; không PR mới.
Phạm vi đóng riêng gồm đúng sáu file/vị trí trong kế hoạch: backlog dòng WP-004,
WP-004, phần WP-004 README, runbook, kiến trúc và delivery plan. 97 file còn lại,
đặc biệt mã/loader/workflows/contracts/package/lockfile/state, phải giữ nguyên.
Thời gian thực tế đợt đóng, CI tự động và checkpoint sau commit được báo trong bàn giao
sau commit, không giả định ở mốc sổ này. Không đặt lại ngân sách hoặc dùng quyền WP khác.
