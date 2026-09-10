# WP-004 · Dispatch hello từ Cockpit

**Wave:** 1 · **Phụ thuộc:** WP-002, WP-003 đã merge/nghiệm thu · **Trạng thái:** in-review — chuẩn bị PR, chưa merge hoặc nghiệm thu lượt thật

Chủ dự án duyệt chuẩn bị một PR trong đúng bảy file dưới đây, fixture offline,
kiểm repo, commit/push nhánh WP, nhãn `engine` và CI tự động. Chưa duyệt merge,
thao tác Sites, cấp/dùng token thật, dispatch/rerun hoặc gọi provider.

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

M/B/H của lượt thật chưa được cấp trong PR chuẩn bị. Loader vẫn nạp một commit/blob
cụ thể, Function constructor, không theo main hoặc tự retry. Cockpit dựng UI/listener
đồng bộ rồi đặt `wp003aComplete`/`wp003aRevision` để tương thích kiểm sau 250 ms.
Mã UTF-8 không quá 65.536 byte. Marker loader chỉ xác nhận khởi động.

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

### Sau merge — CHƯA được duyệt

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

- [ ] Đúng bảy file, không dependency/action mới, kiểm offline và CI đạt.
- [ ] PR đủ bốn mục/nhãn engine, chủ dự án đọc toàn bộ diff tại head đã xác minh.
- [ ] Chủ dự án duyệt merge riêng; main sau merge/checks được đối soát.
- [ ] Chủ dự án nghiệm thu vòng UI → repository_dispatch → heartbeat → UI tại M/B/H cụ thể.
- [ ] Backlog/runbook/hồ sơ được đồng bộ sau phê duyệt đóng riêng; chưa done chỉ nhờ HTTP 204.

Idempotency/khôi phục stage sản xuất không áp dụng cho UI này; giữ nguyên kiểm
timestamp, byte preservation và điều kiện dừng của heartbeat WP-002.
Giữ nghiệm thu WP-003, token đọc giữ 30 ngày theo xác nhận chủ dự án và mọi giới hạn
đã ghi: Script inline, reload/xóa và nhập lại token trên Site thật, hai revision đối chứng
cùng Sites version, trình duyệt/chính sách khác, dữ liệu có episode/lỗi trên Site và
archive máy chủ nguyên byte. Không suy ra commit/reload tự cập nhật UI hoặc Wave 1 đã xong.

## 8. Nguồn kỹ thuật

- [Quyền repository_dispatch: Contents write](https://docs.github.com/en/rest/repos/repos#create-a-repository-dispatch-event).
- [repository_dispatch dùng default branch](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#repository_dispatch).
- [GITHUB_TOKEN và trigger](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow).
- [Đọc commit: Contents read](https://docs.github.com/en/rest/commits/commits#get-a-commit).
