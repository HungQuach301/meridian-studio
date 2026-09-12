# AGENTS.md — Chỉ dẫn thường trực cho coding agent

File này được Codex đọc tự động ở mọi task. Đọc kỹ trước khi chạm vào bất cứ file nào.

## Kiến trúc bốn lớp — quy tắc quan trọng nhất

```
/engine            Trung tính về thể loại VÀ kênh
/genres/{genre}    Theo THỂ LOẠI: layout, format-spec, asset-policy, compliance
/channels/{slug}   Theo KÊNH: bible, persona, lexicon, tokens, topic-map, monetization
/portfolio         Dùng chung: học chéo, thư viện mô hình, nghiên cứu ngách
```

**Một file thuộc Engine CHỈ KHI nó đúng với mọi thể loại và mọi kênh.**
Nghi ngờ thì đẩy xuống Genre Pack. Nghi ngờ tiếp thì đẩy xuống Channel Pack.

Nếu bạn định thêm một hằng số về nội dung vào `/engine` — tên layout, quy tắc format, trần stock,
danh sách pillar — **DỪNG LẠI**. Nó thuộc Genre Pack hoặc Channel Pack.

## Hai interface bắt buộc

1. **State backend.** Mọi stage đọc/ghi qua interface, KHÔNG gọi thẳng GitHub API. Repo là
   implementation hiện tại, sẽ đổi ở tháng 6–9.
2. **Provider.** Interface ở Engine, lựa chọn provider ở Genre Pack. Không hardcode tên model.

## Thứ tự đọc bắt buộc

1. `PROJECT.md` — mục tiêu, non-goals, naming
2. `engine/ops/guardrails.md` — điều cấm
3. `engine/docs/01-architecture.md` — bản vẽ kỹ thuật
4. File work package được giao trong `engine/ops/work-packages/`

Nếu WP mâu thuẫn với 3 file trên, **DỪNG LẠI và báo cáo mâu thuẫn**. Không tự quyết.

## Ràng buộc nền tảng

Chủ dự án **không có máy local** và duyệt công việc trong chat. Agent chịu trách nhiệm chuẩn
bị workflow, input, commit/PR, thực hiện thao tác đã được duyệt bằng kết nối được hỗ trợ,
theo dõi CI và đọc lại kết quả. Không yêu cầu chủ dự án tự viết YAML/JSON, tạo workflow,
chạy lệnh, cài phần mềm, bấm Run workflow hoặc mở file bằng `file://`.

Quyền đã duyệt trong chat tiếp tục có hiệu lực trong đúng phạm vi và checkpoint; không hỏi
lại cùng một quyền. Khi thiếu khả năng kỹ thuật, nêu đúng thao tác chưa được hỗ trợ và
chuẩn bị phương án cụ thể để review. Không giả danh actor/event, dựng lời duyệt hoặc lách
giới hạn kết nối. Quy tắc này không tự mở quyền merge, phát hành hay thực thi chưa được duyệt.

Mỗi phản hồi phải kèm bước tiếp theo chi tiết: agent sẽ làm gì, chủ dự án cần duyệt hoặc
cung cấp gì (nếu thực sự còn thiếu), input/checkpoint nào áp dụng và điều kiện chuyển bước.
Với WP-004a, không hỏi lại về thời gian chuẩn bị hoặc đặt lại ngân sách. Giới hạn kỹ thuật
của job và trần tiền riêng lượt chạy vẫn được giữ theo lời duyệt của lượt đó.

## Cách làm việc

- Chỉ thực hiện đúng phạm vi của WP được giao. Một task = một WP = một PR.
- Chỉ sửa các file được liệt kê trong mục "Files in scope" của WP. Chạm file khác = vi phạm.
- Không thêm dependency mới trừ khi WP ghi rõ tên và phiên bản.
- Không đổi cấu trúc thư mục.
- Không sửa bất cứ file nào trong `/contracts`. Nếu thấy schema sai, viết vào phần mô tả PR và dừng.
- Không tạo file "tiện ích", "helper", "refactor" mà WP không yêu cầu.
- Không viết code cho tính năng tương lai. Chỉ làm đúng việc hôm nay.
- Tách chuẩn bị PR khỏi kích hoạt thực thi. Với cơ chế WP-004a tại mục 25 của WP, tạo
  nhánh chứa lệnh là hành động thực thi, cần lời duyệt đúng source/tree và cùng lượt chạy;
  không được gộp vào quyền chuẩn bị PR hoặc tự chuyển authorization sang checkpoint mới.

## Quy ước code

- TypeScript, ESM, không dùng `any`.
- Mọi stage đọc file vào / ghi file ra. Idempotent: chạy lại hai lần cho kết quả như nhau.
- Mọi stage validate input và output bằng schema tương ứng trước khi ghi.
- Không đọc/ghi bất cứ đâu ngoài `/episodes/{id}/`, `/pipeline/`, và thư mục tạm của job.
- Không hardcode secret. Đọc từ biến môi trường, tên khai trong `config/secrets.example.md`.

## Quy ước commit và PR

- Nhánh: `wp/{WP-ID}-{slug-ngắn}`
- Commit: `{WP-ID}: mô tả ngắn ở thể mệnh lệnh`
- Mô tả PR bắt buộc có 4 mục: **Đã làm gì / Đã kiểm thế nào / File đã chạm / Rủi ro còn lại**
- PR không kèm đủ 4 mục sẽ bị từ chối.

## Nguyên tắc chất lượng

Kiểm tra phải nằm ở chỗ **rẻ nhất phát hiện được lỗi**, không phải ở cuối chuỗi. Khi thêm bất kỳ
kiểm tra nào, tự hỏi: kiểm được sớm hơn không? Nếu có, đặt nó ở đó.

Khi một stage fail: báo cáo bắt buộc nêu `rootCauseStage`, và pipeline chạy lại từ stage đó chứ
không phải stage kề trước. Chi tiết: `engine/docs/11-quality-gates.md`.

Tối đa 2 retry mỗi stage. Lần 3 thì dừng và chuyển sang Gate người.
Ngoại lệ WP-004a: không retry/rerun benchmark, chỉ attempt 1 đã được duyệt. Một admission
thất bại không cho phép tạo lệnh khác để thử lại. Ptrace bị từ chối thì dừng, không tăng quyền
hoặc fallback. Bằng chứng thiếu phải giữ là thiếu; không GET lại metadata npm để dựng lại.

## Hai loại công việc

- **WP** — code. Template: `engine/ops/wp-template.md`
- **CP** — tài liệu định hình nội dung (bible, format-spec, prompt, lexicon, tokens).
  Template: `engine/ops/cp-template.md`. Duyệt một prompt không giống duyệt một hàm.

## Nhãn PR bắt buộc

`engine` · `genre:{genre}` · `channel:{slug}` · `portfolio` — để biết ngay thay đổi ảnh hưởng
một kênh hay cả ba. Thay đổi `engine` hoặc `genre` phải chạy trên kênh 1 qua 3 tập trước khi lan.

## Kiểm thử

- Trước khi mở PR, chạy: `npm run validate` (schema) và `npm run test`.
- Nếu WP có "Acceptance test", phải chạy được và pass.
- CI đỏ = không merge, không có ngoại lệ.

## Ngôn ngữ

- Tài liệu và mô tả PR: tiếng Việt.
- Code, tên biến, comment trong code: tiếng Anh.
- Nội dung sinh ra cho kênh (script, title, description): tiếng Anh Mỹ.
