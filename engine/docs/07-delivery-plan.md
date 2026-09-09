# 07 · Kế hoạch triển khai

Không chia theo tuần/ngày. Chia theo **wave** — mỗi wave có một sản phẩm nhìn thấy được.
Không sang wave sau khi wave hiện tại chưa đạt DoD.

---

## Wave −1 · Kiểm giả định — TUỲ CHỌN

Chủ dự án chọn không chờ bước này (2026-09-08). Giả định về format được kiểm ở **Wave 1b** bằng
dữ liệu thật thay vì kiểm trước. WP-VAL-001 giữ lại làm tuỳ chọn, chạy song song nếu muốn.

Hệ quả: Wave 1b trở thành **bắt buộc**, không được bỏ qua.

---

## Wave 0 · Nền móng tài liệu

**Mục tiêu:** có bộ tài liệu đủ để agent làm việc mà không phải đoán. Không viết một dòng code nào.

| # | Bước | Outcome | Định nghĩa hoàn thành |
|---|---|---|---|
| 0.1 | Chốt tên, tạo repo private | Repo tồn tại | Mở được, đúng tên trong naming block |
| 0.2 | Commit tài liệu tầng A (`PROJECT`, `engine/docs/00`–`04`, 5 ADR) | Định hướng cố định | Có ≥5 non-goals viết ra; mỗi ADR nêu được phương án bị loại |
| 0.3 | Commit `AGENTS.md` + `engine/ops/guardrails.md` | Agent có luật chơi | Người lạ đọc xong biết được cấm làm gì |
| 0.4 | Commit 13 contract schema | Xương sống cố định | Toàn bộ schema parse được bằng ajv, không lỗi |
| 0.5 | Commit thư viện nghiệp vụ (`library/`) | Bản sắc nội dung mã hoá | `format-spec.json` đủ 7 mốc + 6 thiết bị, parse được |
| 0.6 | Commit `engine/ops/backlog.md` + WP-000..003 | Có việc để giao | Mỗi WP có đủ 6 mục theo `wp-template.md` |

**DoD Wave 0:** repo có đủ tầng A–D, chưa có code. Anh đọc lại toàn bộ, không thấy mâu thuẫn giữa
các tài liệu. Đây là lúc tốn công đọc nhất — đừng bỏ qua.

---

## Wave 1 · Bộ khung kỹ thuật

**Mục tiêu:** vòng điều khiển thông — bấm nút trên trình duyệt, job chạy trên GitHub, kết quả về repo.

| # | Bước | Outcome | Định nghĩa hoàn thành |
|---|---|---|---|
| 1.1 | WP-000 Scaffold cấu trúc dự án | Cây thư mục + package.json | Nghiệm thu scaffold và CI được ghi tại dòng WP-000 trong backlog |
| 1.2 | WP-001 CI hardening | Validate, typecheck và guardrails | Nghiệm thu CI được ghi tại dòng WP-001 trong backlog |
| 1.3 | WP-002 Workflow hello + dispatch | Heartbeat và vòng gửi/nhận trong GitHub | PR #7 và ba run thật đã được chủ dự án nghiệm thu; chưa chứng minh client ngoài GitHub |
| 1.3a | WP-003a Spike loader Sites | Có bằng chứng nạp/thực thi mã động hoặc kết luận bị chặn | Chủ dự án thử Site thật, chấp nhận ADR-0006 và cập nhật WP-003; giới hạn 2 giờ |
| 1.4 | WP-003 Cockpit UI shell | Đọc và hiển thị pipeline state | Sau WP-001 và WP-003a; theo phương án được duyệt, hiển thị đúng trạng thái rỗng |
| 1.5 | WP-004 Nút dispatch từ UI | Client ngoài GitHub kích hoạt được workflow | Sau WP-002 và WP-003; bằng chứng thực thi riêng, không dùng lại nghiệm thu WP-002 |
| 1.6 | Nạp secret vào Actions Secrets khi WP tương ứng cần | Không secret trong code | Chủ dự án duyệt riêng; agent kiểm mã, không yêu cầu chủ dự án chạy lệnh |

**DoD Wave 1:** anh bấm một nút trên trình duyệt, một job chạy, ghi một file vào repo, UI hiển thị
file đó. Chưa có nội dung gì — chỉ có vòng điều khiển.

---

## Wave 2 · First Light

**Mục tiêu:** một video 60 giây do máy render, từ script anh gõ tay. Đây là mốc quan trọng nhất.

| # | Bước | Outcome | Định nghĩa hoàn thành |
|---|---|---|---|
| 2.0 | **WP-004a SPIKE canvas liên tục** — CỔNG CHẶN | ADR-0007 với số đo thật | 4 chỉ số trong ngưỡng; ❌ thì chặn 2.1 trở đi |
| 2.1 | Cài Remotion trong Actions | Render mẫu 5 giây | mp4 xuất hiện trong Release |
| 2.2 | Dựng 5 layout đầu | Title card, chart cột, chart đường, ma trận ngưỡng, hai ngã rẽ | Render đủ 5, đúng token |
| 2.2b | **CỔNG CHẶN — Layout Gallery (WP-006a)** | Trang render mọi layout ở 3 bộ dữ liệu mẫu | Chủ dự án chấm từng layout theo 8 tiêu chí. Không qua thì không sang Wave 3 |
| 2.3 | Nối TTS | File VO từ đoạn text | Nghe được, đúng giọng đã chọn |
| 2.4 | Nối ASR căn timing | `timing.json` + `captions.srt` | Lệch ≤ 200ms |
| 2.5 | Ghép ffmpeg | Video 60 giây hoàn chỉnh | Có tiếng, có phụ đề, loudness ≈ ‑14 LUFS |
| 2.6 | Xem trên cockpit | Video phát được trong UI | |

**DoD Wave 2:** mở cockpit, bấm phát, xem được một video 60 giây có chart động và VO.
**Nếu tới đây mà đã viết hơn 20 file code, dừng lại và cắt phạm vi.**

---

## Wave 1b · A/B format — BẮT BUỘC (chạy song song Wave 3–4, 20 tập đầu)

`format-spec.json` rút từ một kênh 181 video mà đa số chỉ vài nghìn view — chưa kiểm chứng với
khán giả Mỹ. Nhân sang ba kênh mà chưa kiểm là nhân ba rủi ro.

| Biến thể | Khác gì baseline |
|---|---|
| `cold-open-stat` | Mở bằng thống kê sốc thay vì nhân vật |
| `matrix-at-5min` | Ma trận ngưỡng ở phút 5 thay vì phút 10 |
| `short-12min` | 12 phút thay vì 22 |

Mỗi biến thể 5 tập, đo retention 30s và AVD. Khoá format rồi mới sang kênh 2.
Ghi `formatVariant` vào `brief.json`.

---

## Wave 3 · Xưởng nội dung

**Mục tiêu:** từ brief anh chốt, máy ra kịch bản 20 phút đúng khuôn, có nguồn.

| # | Bước | Outcome | Định nghĩa hoàn thành |
|---|---|---|---|
| 3.1 | S04 Research + sổ nguồn | `dossier.md` + `sources.json` | 100% claim số liệu có URL từ `data-sources.md` |
| 3.2 | S05 Fact-check pass | `factcheck.json` | Gieo 3 claim sai → bắt được cả 3; có cờ đỏ thì pipeline dừng |
| 3.3 | S06 Outline theo format-spec | `outline.json` | Validate schema; đủ 7 mốc; mỗi phần có cầu nối tò mò |
| 3.4 | S07 Script | `script.md` 3.200–3.600 từ | Có đủ 6 thiết bị nội dung; ≥3 từ trong `lexicon.md` |
| 3.5 | Gate 2 trên UI | Sửa script trên trình duyệt, commit ngược | Sửa xong reload thấy bản mới |
| 3.6 | Kiểm định bản địa | Kịch bản đọc như người Mỹ viết | Không còn cấu trúc câu dịch; không còn cơ chế tài chính Việt |

**DoD Wave 3:** anh gõ hai câu thesis, 25 phút sau có kịch bản 20 phút đọc được, mọi số có nguồn.

---

## Wave 4 · Xưởng hình

**Mục tiêu:** một tập hoàn chỉnh 20+ phút, chất lượng đăng được, sinh tự động.

| # | Bước | Outcome | Định nghĩa hoàn thành |
|---|---|---|---|
| 4.1 | S09 Storyboard | Mỗi câu ánh xạ một scene | Không scene nào thiếu visual |
| 4.2 | Mở rộng 7 layout còn lại | Đủ diễn đạt mọi beat | **Qua Layout Gallery, chủ dự án chấm đủ 8 tiêu chí trong `visual-quality-bar.md` cho từng layout.** Không có trạng thái "tạm chấp nhận" |
| 4.3 | S11 Stock + ảnh sinh | Asset về đúng thư mục | Mỗi asset có dòng trong `LICENSES.md` |
| 4.4 | S12 Render matrix song song | Tập 22 phút render < 90 phút | Job không chạm trần 6 giờ |
| 4.5b | S13 QA chuyển động (Bài kiểm Slideshow) | `qa.report.json` có `motionScore` | Ba phần đều pass: PowerPoint test, 3-giây test (5/5 có chuyển động, ≥2/5 có máy quay di chuyển), tắt tiếng test. Tỷ lệ chữ ≤22% |
| 4.5 | S13 Auto-QA kỹ thuật + thị giác | `qa.report.json` có `visualScore` | Gieo 5 lỗi kỹ thuật → bắt ≥4. Lấy mẫu 10 khung qua model thị giác → dưới 8/10 đạt thì fail |
| 4.6 | Gate 3 trên UI | Spot check 60s đầu + 30s kết | |

| 4.7 | **10 tập đầu: sản xuất, KHÔNG đăng** | Học từ output thật, sửa `/genres` và `/channels` | Làm lại 5 tập tốt nhất rồi mới đăng |

**DoD Wave 4:** một tập đăng được lên kênh mà anh không thấy ngại.

---

## Wave 5 · Khép vòng phát hành

| # | Bước | Outcome | Định nghĩa hoàn thành |
|---|---|---|---|
| 5.1 | OAuth YouTube | Kết nối thành công | Token refresh tự động, không cần thao tác lại |
| 5.2 | Sinh thumbnail | 3 biến thể/tập | Đúng slot và palette trong `thumbnail-spec.md` |
| 5.3 | S14a Packaging | 5 title, description có nguồn + disclaimer, chapter | Description ≤ 5000 ký tự, có đủ nguồn |
| 5.4 | S14b Upload | Video lên kênh chế độ **riêng tư** | Kiểm tra thủ công rồi mới công khai |
| 5.5 | S14c Metrics | `metrics.json` ở 3 mốc | Số khớp YouTube Studio |
| 5.6 | Đồng hồ quota trên UI | Hiển thị quota còn lại | Chặn upload thứ 4 trong ngày |

**DoD Wave 5:** một tập đi từ thesis đến video công khai trên kênh mà anh chỉ chạm 3 gate.

---

## Wave 6 · Vòng học

| # | Bước | Outcome | Định nghĩa hoàn thành |
|---|---|---|---|
| 6.1 | S14d Insight engine | Đối chiếu metric với đặc điểm nội dung | Ra nhận định có căn cứ, không phải mô tả số |
| 6.2 | Tự mở PR cập nhật `/library` | Thư viện tiến hoá | PR mở ra, **không auto-merge** |
| 6.3 | S01 dùng insight làm input | Chọn đề tài thông minh hơn | |
| 6.4 | Fast Lane | Chế độ rút gọn | Từ brief tới mp4 trong một lần chạy, chỉ 1 gate |

**DoD Wave 6:** nhà máy tự đề xuất cải tiến chính nó, anh chỉ duyệt PR.
