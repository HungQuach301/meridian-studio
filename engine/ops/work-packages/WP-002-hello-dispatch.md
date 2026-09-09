# WP-002 · Workflow hello + repository_dispatch

**Wave:** 1 · **Phụ thuộc:** WP-000, WP-001 · **Trạng thái:** in-review

> Sửa đổi được chủ dự án duyệt ngày 2026-09-09: chuẩn bị một PR trong bốn file dưới đây,
> kiểm bằng CI tự động và fixture tạm. Chấp nhận phép thử repository_dispatch bằng
> GITHUB_TOKEN từ Actions; kiểm chứng client ngoài GitHub/cockpit để WP-004.
> Chưa cho phép merge, dispatch/rerun, gọi provider hoặc triển khai.

## 1. Mục tiêu

Chứng minh Actions nhận lệnh hello và có thể ghi heartbeat ngược vào repo. Đây là phép
thử hạ tầng trung tính về genre/kênh, không phải stage sản xuất; không xây interface
của WP-009a và không gọi provider. Mục tiêu của PR là chuẩn bị và kiểm offline;
chỉ nghiệm thu vòng ghi thật sau merge và phê duyệt chạy riêng.

## 2. Input

Đọc PROJECT.md, AGENTS.md, guardrails, kiến trúc, WP-001, CI hiện có và upgrade-safety.
Checkpoint trước triển khai: main `bc7686d1a77c5cd4e51758b7441d06067712988e`,
tree `d5edd11b792a30534faa05988a070b7d6dc2a81a`, CI `34308143586` success, attempt 1.
Checkpoint đổi thì dừng và báo. Repo duy nhất: HungQuach301/meridian-studio.

## 3. Output và sự kiện

Một file `.github/workflows/hello.yml`, tên workflow **Hello**:

| Sự kiện/chế độ | Kết quả |
|---|---|
| push mọi nhánh, pull_request opened/synchronize/reopened | Chỉ job verify; fixture trong RUNNER_TEMP, không ghi repo hoặc gửi dispatch |
| workflow_dispatch, mode=heartbeat | Sau verify và admission, ghi một heartbeat trên main |
| workflow_dispatch, mode=send-hello | Sau verify và admission, gửi đúng một repository_dispatch event_type=hello; job gửi không ghi state |
| repository_dispatch, action=hello | Sau verify và admission, ghi một heartbeat; không gửi sự kiện tiếp |

workflow_dispatch bắt buộc `expected_sha` đầy đủ 40 ký tự; mode là choice heartbeat/send-hello.
Job gửi đưa expected_sha, source_run_id và source_run_attempt=1 vào client_payload.
Job thật chỉ nhận main, đúng repo, đúng SHA sự kiện/checkout/expected_sha, attempt 1.
Sai context thì fail trước khi cấp token cho bước ghi/gửi. Không lấy ref/path/command
hay dữ liệu state từ payload. Không ghi payload đầy đủ hoặc token vào log.

## 4. Files in scope

```
.github/workflows/hello.yml
engine/ops/work-packages/WP-002-hello-dispatch.md
engine/docs/05-runbook.md
engine/ops/backlog.md
```

Cập nhật đặc tả trước rồi triển khai workflow trên cùng nhánh `wp/WP-002-hello-dispatch`.
Runbook chỉ bổ sung vận hành WP-002 và sửa câu hello xác nhận khóa provider.
Backlog chỉ dòng WP-002, thêm phụ thuộc WP-001 và trạng thái in-review, chưa done.

`pipeline/state.json` là đầu ra của lượt chạy thật được duyệt sau merge, **không phải
file sửa trong PR chuẩn bị**. Trong lượt thật chỉ được đổi updatedAt; giữ tất cả trường
khác, kể cả dữ liệu kênh/episode và trường chưa biết. Không sửa contracts.

## 5. Ràng buộc triển khai

- Không thêm/nâng dependency hoặc action. Giữ nguyên package.json, package-lock.json,
  ci.yml và hai action SHA checkout/setup-node của WP-001. Node 20, ubuntu-24.04, npm ci.
- Quyền mặc định/job verify: contents: read. Chỉ job heartbeat và send-hello có
  contents: write; không thêm actions: write hay quyền khác. Không đổi settings,
  quyền repository, gói GitHub, secret hoặc PAT. GITHUB_TOKEN là token tự cấp của job,
  chỉ đưa vào môi trường bước Git/HTTP cần dùng; checkout không lưu credential.
- Logic heartbeat TypeScript ESM sinh trong RUNNER_TEMP, strict typecheck bằng
  TypeScript hiện có. Cùng logic được dùng cho fixture và lượt thật; không thêm helper
  vào repo. YAML anchors dùng lại bước chuẩn bị, không sao chép logic kiểm tra.
- Validate state đầu vào và candidate bằng pipeline-state.schema.json có sẵn. Chỉ
  sau khi candidate hợp lệ và chỉ khác updatedAt mới được thay file checkout. Chạy
  validator CLI trước/sau thay file, xác minh mọi file nguồn còn lại nguyên vẹn.
- Timestamp UTC ISO, phải tăng so với updatedAt cũ. Với cùng input và timestamp,
  kết quả giống hệt; hai sự kiện mới có timestamp mới là hành vi heartbeat được duyệt.
  Không thay định nghĩa idempotent của stage sản xuất; rerun attempt >1 bị từ chối.
- Chỉ stage/commit pipeline/state.json; tác giả và committer github-actions[bot],
  message chính xác `chore: heartbeat`. Không skip-ci, không tạo PR hay Release từ job.
- Heartbeat dùng concurrency group cố định, cancel-in-progress: false. Không hủy
  heartbeat đang chạy; đây không phải hàng đợi bền vững. Chủ dự án chạy tuần tự,
  đợi xác minh xong rồi mới xin lượt tiếp theo. Không đặt job gửi vào group này.
- Kiểm remote main bằng expected_sha trước ghi và ngay trước push. Push thường một
  lần; main đổi/push bị từ chối thì fail, không fetch-rebase, force-push hoặc retry.
  Sau push đọc lại commit qua Git, kiểm SHA/parent/file/state; báo run và commit URL.
- Job send-hello kiểm lại main, gửi một HTTP POST tới đúng endpoint repo bằng token
  job, redirect bị từ chối, chỉ 204 là đạt. Không retry/fallback hoặc in response body.
  204 chỉ xác nhận gửi; phải kiểm thêm run nhận để nghiệm thu repository_dispatch.
- Push do GITHUB_TOKEN không tự tạo CI push. Bằng chứng là verify của nguồn,
  validator trước/sau ghi và read-back của commit heartbeat, không phải CI mới trên
  commit heartbeat. Không dùng PAT hoặc nới quyền để ép CI.

## 6. Acceptance test

### Trước merge — Loại 2, GitHub Actions, fixture tạm

CI push đạt trước khi mở PR; sau đó kiểm CI và Hello trên đúng head/ngữ cảnh PR.

| Tình huống | Kết quả bắt buộc |
|---|---|
| CI WP-001 | validate, typecheck, guardrails-push trên push / guardrails trên PR xanh; 9 test cũ giữ nguyên |
| Heartbeat từ state hợp lệ, kể cả state có episode/trường bổ sung | Candidate hợp schema, chỉ updatedAt đổi, input không đổi |
| Cùng input/timestamp hai lần; hai heartbeat kế tiếp | Cùng input cho bytes giống nhau; timestamp mới giữ toàn bộ dữ liệu khác |
| State thiếu episodes, JSON hỏng, timestamp sai/không tăng | CLI thật exit 1 với mã lỗi đúng, không sinh candidate |
| Candidate đổi trường khác hoặc không hợp schema | Từ chối trước ghi/commit |
| Context đúng của hai mode và repository_dispatch | Admission CLI thật pass, không phát HTTP request |
| Sai repo/ref/SHA/mode/event/attempt hoặc thiếu binding | Admission CLI thật fail với mã lỗi đúng |
| Sau kiểm tra | Hash state, contracts, lockfile và toàn bộ nguồn checkout giữ nguyên; không file nguồn mới |

Log phải có source SHA, event, Node/npm, số fixture thật và kết quả exit code.
Fixture âm đạt là tiến trình con fail đúng; không gọi đó là PR thật đỏ. Nhánh ghi/gửi
phải skipped ở push/PR. Typecheck cả worker tạm, chạy npm run test/validate/typecheck.

### Sau merge — Loại 2, chạy thật, CHƯA được duyệt trong PR này

1. Đối chiếu main/tree/CI mới và xin duyệt đúng một workflow_dispatch heartbeat,
   expected_sha bằng main được duyệt, attempt 1. Xác minh run và commit/state kết quả.
2. Chỉ sau đó xác minh checkpoint mới và xin duyệt một workflow_dispatch send-hello
   cùng đúng một run nhận repository_dispatch; attempt 1, không rerun/retry.
3. Tổng dự kiến ba workflow run, hai commit heartbeat. Có run URL, event, input SHA,
   source_run_id ở lượt nhận, commit SHA/parent, author/message và diff chỉ updatedAt.
4. Thiếu run nhận, timeout sau request/push, lỗi quyền hoặc main đổi: dừng, đọc lịch sử
   để biết hành động đã xảy ra chưa; không tự gửi/chạy lại hay đổi settings.

Không coi phép thử này là cockpit/client ngoài GitHub đã hoạt động; nghiệm thu đó ở WP-004.

## 7. Definition of Done

Theo engine/ops/definition-of-done.md. PR đủ bốn mục và nhãn engine; ghi link run,
head/source SHA và bằng chứng fixture. Giữ rủi ro required checks chưa cưỡng chế và
npm audit report-only đã chấp nhận ở WP-001, không mở browser/UI/dev server.
Chỉ cập nhật done sau chủ dự án nghiệm thu hai đường heartbeat thật và duyệt ghi nhận.

## 8. Nguồn kỹ thuật

- [GITHUB_TOKEN và trigger](https://docs.github.com/actions/using-workflows/triggering-a-workflow)
- [Quyền repository_dispatch](https://docs.github.com/en/rest/repos/repos#create-a-repository-dispatch-event)
- [YAML anchors](https://docs.github.com/en/actions/how-tos/reuse-automations/reuse-workflows#yaml-anchors-and-aliases)
