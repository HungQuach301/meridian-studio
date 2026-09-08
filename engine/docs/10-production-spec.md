# 10 · Production Spec — quy trình, tiêu chuẩn, công cụ

Tài liệu tra cứu khi thực thi. Mỗi stage có 5 phần: vai trò · cách làm · công cụ/provider ·
output · định nghĩa hoàn thành.

**Cảnh báo về độ tươi:** phần provider và giá là thứ lỗi thời nhanh nhất trong toàn bộ repo.
Số liệu dưới đây tham chiếu thời điểm giữa 2026. Kiểm lại giá và điều khoản thương mại trước
khi cam kết. Phần quy trình và tiêu chuẩn thì ổn định.

---

# BẢNG TỔNG PROVIDER

| Hạng mục | Lựa chọn chính | Dự phòng | Ghi chú chi phí |
|---|---|---|---|
| LLM research + fact-check | Model suy luận mạnh, ngữ cảnh dài | Model rẻ hơn cho lượt 1 | Chiếm ~40% chi phí tập |
| LLM script + storyboard | Model mạnh, output có cấu trúc | — | Chiếm ~30% |
| TTS | Inworld Realtime TTS 1.5 Max | Gemini Flash TTS · ElevenLabs v3 | Xem phân tích bên dưới |
| ASR căn từ | WhisperX (word-level) | Deepgram Nova | Rẻ, ~0,1 USD/tập |
| Ảnh nền | Bất kỳ provider sinh ảnh | — | Chỉ nền trừu tượng |
| Nhạc nền | Epidemic Sound / Artlist | — | Thuê bao tháng |
| Stock | Pexels (miễn phí) / Storyblocks | — | Trần 15% thời lượng |
| Render | Remotion + GitHub Actions matrix | Remotion Lambda | Xem phân tích bên dưới |
| QA thị giác | Model có thị giác | — | ~0,2 USD/tập |
| Dữ liệu | FRED / BLS / Census / IRS API | — | Miễn phí, cần API key |

## Chọn TTS — phân tích

Giọng đọc quyết định cảm nhận chất lượng nhiều hơn người ta tưởng, và đây là chỗ đáng trả tiền.

Theo bảng xếp hạng ELO Speech Arena (đánh giá mù, chỉ tiếng Anh) giữa 2026: **Inworld Realtime
TTS 1.5 Max đứng #1 với ELO 1.208, giá ~35 USD/triệu ký tự**; Google Gemini Flash TTS #2 với ELO
1.206. Cả hai đều **vượt ElevenLabs v3 ở mức giá thấp hơn đáng kể** — ElevenLabs đã tăng giá
khoảng 239% so với năm trước, v2/v3 API khoảng 120 USD/triệu ký tự.

Tính cho dự án này: một tập 20 phút ≈ 18.000 ký tự.

| Provider | Chi phí/tập | Chi phí/tháng (30 tập) |
|---|---|---|
| Inworld TTS 1.5 Max | ~0,63 USD | ~19 USD |
| ElevenLabs v3 | ~2,16 USD | ~65 USD |
| Kokoro-82M (mã nguồn mở, chạy CPU) | 0 USD | 0 USD |

Cả ba đều nằm gọn trong ngân sách 35 USD/tập, nên **chọn theo chất lượng giọng, không theo giá**.

Khuyến nghị: dùng **Kokoro-82M miễn phí ở Wave 2** để dựng pipeline (đủ tốt để kiểm timing và
căn chỉnh), rồi **chuyển sang Inworld ở Wave 3** khi bắt đầu làm nội dung thật.

Bắt buộc kiểm trước khi cam kết: điều khoản **cho phép dùng thương mại và kiếm tiền trên YouTube**.
Đây là rủi ro R11, và điều khoản khác nhau rõ rệt giữa các provider.

## Render trên GitHub Actions — phân tích

Remotion render bằng cách chạy headless Chromium, **chụp ảnh từng khung rồi đẩy qua ffmpeg**.
Thời gian render tỷ lệ với số khung và độ phức tạp mỗi khung.

Số liệu tham chiếu từ dự án Remotion Matrix Renderer trên GitHub Actions:

| Số khung | Số worker | Thời gian |
|---|---|---|
| 9.000 | 1 | 31 phút |
| 9.000 | 10 | 6 phút |
| 9.000 | 20 | 5 phút |
| 9.000 | 50 | 6,7 phút |
| 9.000 | >100 | thất bại |

Tính cho tập 20 phút @30fps = **36.000 khung**:
- Một worker: ~2 giờ
- 20 worker: ~10–25 phút thực tế, tiêu tốn ~180–400 phút runner
- 30 tập/tháng: ~5.400–12.000 phút runner

Ba kết luận đưa thẳng vào thiết kế:
1. **Dùng matrix 16–20 worker.** Trên 50 không nhanh thêm; trên 100 thất bại.
2. **Repo private tiêu phút Actions rất nhanh.** Gói miễn phí không đủ; dự trù ~100 USD/tháng
   phần vượt hạn mức. Đã tính trong 150 USD chi phí cố định.
3. **Motion blur là hệ số nhân chi phí render** — nó phải render nhiều khung con cho mỗi khung.
   Vì vậy nó nằm ở ưu tiên 7 trong `cinematography.md`, không phải ưu tiên 1.

Đường thoát nếu Actions không đủ: **Remotion Lambda** là hướng chính thức cho video dài, phân tán
khung ra nhiều Lambda song song. Chỉ chuyển khi Actions thực sự thành nút thắt.

---

# QUY TRÌNH 16 STAGE

## S01 · Signal Scan

- **Vai trò:** Strategist
- **Cách làm:** quét ba nguồn song song — số liệu vĩ mô vừa công bố, chủ đề đang lên trong ngách
  personal finance Mỹ, khoảng trống trong `topic-map.md`.
- **Công cụ:** FRED API (`series/observations`), BLS API v2, Census ACS API, web search.
- **Output:** `signals.json` — 15–20 tín hiệu, mỗi tín hiệu có URL nguồn và độ mới tính bằng ngày.
- **Tiêu chuẩn:** mọi tín hiệu có nguồn thuộc danh sách trắng · độ mới ≤ 90 ngày cho tín hiệu
  vĩ mô · không tín hiệu nào nằm ngoài 6 pillar.
- **DoD:** validate `signals.schema.json` · ≥15 tín hiệu · không tín hiệu trùng lặp ngữ nghĩa.

## S02 · Topic Scoring

- **Vai trò:** Strategist
- **Cách làm:** chấm bốn trục — demand, saturation (ngược chiều), bibleFit, thresholdMatrixFeasible.
- **Output:** `topics.ranked.json` — top 5 kèm điểm và lý do.
- **Tiêu chuẩn:** **bộ lọc quyết định** — đề tài không dựng được ma trận ngưỡng 3 tầng bằng số
  liệu có nguồn thì `thresholdMatrixFeasible: false` và bị loại, dù hấp dẫn đến đâu.
- **DoD:** đúng 5 đề tài · mỗi đề tài nêu rõ 3 ngưỡng dự kiến · không đề tài nào trùng pillar với
  tập liền trước.

## S03 · GATE 1 — Chốt đề tài + Thesis

- **Vai trò:** CHỦ DỰ ÁN. Không uỷ quyền.
- **Cách làm:** chọn 1 trong 5, tự gõ 1–2 câu luận điểm riêng.
- **Công cụ:** cockpit, ô nhập text.
- **Output:** `00-brief.json` với `createdBy: "human"`.
- **Tiêu chuẩn:** thesis dài 40–500 ký tự · phải là một khẳng định có thể sai, không phải mô tả
  chủ đề · phải nêu được góc nhìn mà số liệu sẽ chứng minh hoặc bác bỏ.
- **DoD:** schema chặn nếu `createdBy` khác `human` · thời gian ~5 phút.

## S04 · Research Dossier

- **Vai trò:** Researcher
- **Cách làm:** dựng dàn ý ngược từ thesis — cần dữ kiện nào để luận điểm đứng vững, và dữ kiện
  nào có thể phản bác nó. Lấy số **chỉ** từ danh sách trắng.
- **Công cụ:** LLM ngữ cảnh dài + FRED/BLS/Census/IRS/PMMS API + web fetch.
- **Output:** `01-dossier.md` + `01-sources.json`.
- **Tiêu chuẩn:** 100% claim số liệu có `claimId`, URL, publisher, `asOfDate`, `retrievedAt` ·
  giữ nguyên đơn vị gốc · phải có ít nhất 2 claim phản bác thesis · số liệu cũ hơn 18 tháng đánh
  dấu trong `notes`.
- **DoD:** validate `sources.schema.json` · không claim nào thiếu URL · nghiên cứu một chiều =
  fail.

## S05 · Fact & Risk Pass

- **Vai trò:** Fact-checker — **lần gọi riêng biệt, prompt đối kháng**. Không gộp với S04.
- **Cách làm:** ba lượt độc lập — xác minh số (mở URL, đối chiếu), kiểm nguồn (có trong danh sách
  trắng, có phải nguồn gốc), kiểm rủi ro YMYL (ngôn ngữ khuyến nghị, bảo đảm, hứa lợi nhuận).
- **Công cụ:** LLM mạnh + web fetch.
- **Output:** `02-factcheck.json`.
- **Tiêu chuẩn:** mỗi claim có status green/yellow/red · mỗi câu vi phạm YMYL có `suggestedRewrite`.
- **DoD:** bất kỳ `red` nào → `verdict: "block"` và **pipeline dừng**. Gieo 3 claim sai cố ý phải
  bắt được cả 3.

## S06 · Narrative Outline

- **Vai trò:** Scriptwriter
- **Cách làm:** dựng theo đúng 7 mốc trong `format-spec.json`, không thêm không bớt không đổi thứ tự.
- **Output:** `03-outline.json`.
- **Tiêu chuẩn:** cold open có tên riêng + tuổi + nghề + con số chính xác · vòng lặp mở ở M3 ·
  5–8 beat, **mỗi beat có `curiosityBridge`** · ma trận đúng 3 tầng, mỗi tầng có claimIds ·
  mid-CTA ở ~42% và đúng ranh giới beat · closing loop quay lại đúng nhân vật cold open.
- **DoD:** validate schema · không beat nào kết trung tính · 3 tầng ma trận đều có số liệu thật.

## S07 · Script

- **Vai trò:** Scriptwriter
- **Cách làm:** viết tiếng Anh Mỹ bản địa, **không dịch**.
- **Công cụ:** LLM mạnh, output có cấu trúc.
- **Output:** `04-script.md` + front-matter.
- **Tiêu chuẩn:** 3.200–3.600 từ · 145–160 từ/phút · câu tối đa 28 từ · **đủ cả 6 thiết bị** ·
  ≥3 thuật ngữ `lexicon.md`, tối đa 5 · mọi con số có `claimId` · disclaimer **không** vào lời đọc ·
  không xướng tên chương thành tiếng · không dùng claim `red`.
- **DoD:** validate `script.schema.json` (`devicesUsed` ≥6, `lexiconUsed` ≥3) · không câu nào
  trong bảng cấm `compliance.md` · không cơ chế tài chính Việt Nam trong bối cảnh Mỹ.

## S08 · GATE 2 — Duyệt kịch bản

- **Vai trò:** CHỦ DỰ ÁN
- **Cách làm:** đọc và sửa trực tiếp trên cockpit, commit ngược repo.
- **Output:** `04-script.approved.md`
- **Tiêu chuẩn:** đọc thành tiếng thử 60 giây đầu — nếu vấp thì câu đó cần viết lại.
- **DoD:** thời gian ~15 phút · file approved tồn tại và khác file gốc (nếu giống hệt thì nghi
  ngờ đã duyệt qua loa).

## S09 · Storyboard

- **Vai trò:** Visual Director
- **Cách làm:** đặt mọi đối tượng lên **canvas 6000×3400**, rồi dàn hành trình máy quay. Không
  dàn slide.
- **Công cụ:** LLM mạnh, output JSON có cấu trúc.
- **Output:** `05-storyboard.json` — 180–220 scene.
- **Tiêu chuẩn:**
  - Mỗi scene khai `camera` (x, y, scale, move). `move` không bao giờ đứng yên tuyệt đối.
  - `audioLeadMs` 400–1000 cho mọi scene `camera-move` (J-cut).
  - `continuity: "morph"` bắt buộc khi claimIds giao với scene trước.
  - `onScreenWords` ≤12/scene; tổng cả tập ≤22% số từ VO.
  - `shotSize`: wide 15–25%, medium 45–60%, close 20–30%. Không quá 4 scene liên tiếp cùng cỡ.
  - `parallaxLayer` khai đủ 3 tầng.
  - `breathAfterMs` 600–1000 sau con số gây sốc.
  - Độ lệch chuẩn thời lượng scene ≥40% trung bình.
  - Stock ≤15% thời lượng; không stock doanh nghiệp chung chung.
  - Số trong `data` khớp `sources.json`.
- **DoD:** validate schema · không scene thiếu visual · không dùng cùng layout+variant 2 lần liên tiếp.

## S09.5 · Preflight — phân tích tĩnh storyboard

- **Vai trò:** máy. Không gọi LLM.
- **Cách làm:** 12 kiểm tra tĩnh trên `05-storyboard.json`, không render gì.
- **Công cụ:** script TypeScript thuần, chạy trong Actions.
- **Output:** `05-preflight.json`
- **Tiêu chuẩn:** xem bảng đầy đủ trong `engine/docs/11-quality-gates.md` cơ chế 1.
- **DoD:** chi phí ~0 USD, thời gian <5 giây · fail thì quay lại S09 với báo cáo lỗi cụ thể,
  **không đi tiếp** · so `selfCheck` do Visual Director khai với số tính được, lệch là fail.

**Đây là điểm kiểm quan trọng nhất của toàn pipeline.** Nó bắt ~80% lỗi mà S13 từng bắt, với
chi phí bằng 1/50 và thời gian bằng 1/300.

## S10 · Voice & Timing

- **Vai trò:** Audio Engineer
- **Cách làm:** TTS sinh VO một mạch theo SSML, rồi ASR căn timestamp **từng từ**.
- **Công cụ:** Kokoro-82M (Wave 2) → Inworld TTS (Wave 3+); WhisperX cho word-level alignment;
  ffmpeg loudnorm.
- **Output:** `vo.wav`, `06-timing.json`, `06-captions.srt`.
- **Tiêu chuẩn:** loudness **−14 LUFS**, true peak ≤ −1 dBTP · caption lệch ≤200ms · SSML break
  ở chỗ cần nhịp thở · nhạc nền ở −22 LUFS, duck khi có VO.
- **DoD:** validate `timing.schema.json` · đo loudness bằng ffmpeg và ghi vào file · nghe thử 30
  giây không có artifact.

## S11 · Visual Assembly

- **Vai trò:** Visual Director
- **Cách làm:** sinh props Remotion từ số liệu thật; kéo stock theo query; sinh ảnh nền.
- **Công cụ:** provider sinh ảnh (chỉ nền trừu tượng), Pexels/Storyblocks API.
- **Output:** `scenes/*.props.json`, `assets/`, `assets/LICENSES.md`.
- **Tiêu chuẩn:** **không dùng ảnh sinh cho bất cứ thứ gì có chữ hoặc số** · mỗi asset một dòng
  license · query stock phải chứa danh từ cụ thể từ chính câu VO.
- **DoD:** không asset nào thiếu license · tổng thời lượng stock ≤15%.

## S11.5 · Proof Render — 15 giây trước 20 phút

- **Vai trò:** máy + model thị giác
- **Cách làm:** render 12 ảnh tĩnh ở các mốc quan trọng (cold open, mỗi beat mở đầu, ma trận
  ngưỡng, hai ngã rẽ, closing loop) + 1 clip 15 giây của cú chuyển cảnh khó nhất tập. Chạy QA
  thị giác và chuyển động trên đúng phần đó.
- **Công cụ:** Remotion `renderStill` + `renderMedia` phạm vi hẹp; model thị giác.
- **Output:** `07-proof.json`
- **Tiêu chuẩn:** ~460 khung, ~1–2 phút, ~5 phút runner, ~0,1 USD.
- **DoD:** **chỉ khi proof pass mới render đầy đủ** · fail thì quay về S09 hoặc S11 tuỳ
  `rootCauseStage`.

## S12 · Render

- **Vai trò:** máy
- **Cách làm:** Remotion render matrix 16–20 worker song song, ffmpeg ghép, trộn audio.
- **Công cụ:** Remotion + GitHub Actions matrix; Remotion Lambda là đường thoát.
- **Output:** `final.mp4` đẩy lên GitHub Release tag `ep/{id}`.
- **Tiêu chuẩn:** 1920×1080, H.264, 30fps, CRF 18, yuv420p · không commit binary vào repo.
- **DoD:** validate `render-manifest.schema.json` · mọi chunk `status: done` · không job nào chạm
  trần 6 giờ.

## S13 · QA ba lớp + GATE 3

- **Vai trò:** máy (2 lớp đầu) + CHỦ DỰ ÁN

**Lớp 1 — QA kỹ thuật.** ffmpeg/ffprobe đo: độ dài, loudness, caption lệch, khung đen, safe area,
scene thiếu asset, số trong chart khớp `sources.json`. Gieo 5 lỗi cố ý phải bắt ≥4.

**Lớp 2 — QA thị giác.** Lấy **10 khung ngẫu nhiên**, đưa qua model thị giác với Frame Test:
"khung hình này tự nó có nói được điều gì không?". `visualScore` <8/10 → fail.

**Lớp 3 — QA chuyển động.** Bài kiểm Slideshow ba phần: PowerPoint test · 3-giây test (5/5 cửa sổ
có chuyển động, ≥2/5 có máy quay di chuyển) · tắt tiếng test. Cộng các chỉ số đo được:
`onScreenWordRatio` ≤0,22 · `staticFrameMaxMs` ≤400 · `durationStdDevRatio` ≥0,4 · phân bổ shotSize.

**GATE 3:** chủ dự án xem 60 giây đầu + 30 giây kết, ~5 phút.

- **Output:** `qa.report.json` với `visualScore` và `motionScore`.
- **DoD:** cả ba lớp pass · fail lần 2 thì **dừng hẳn tập đó**, không render lần 3.

## S14a · Packaging

- **Vai trò:** Packager
- **Cách làm:** sinh 5 title theo 7 khuôn, 3 thumbnail theo 4 slot, description, chapter, shorts.
- **Công cụ:** LLM + Remotion render thumbnail.
- **Output:** `08-package.json`, `thumbnails/`, `shorts/`.
- **Tiêu chuẩn:** 5 title, mỗi cái một formula khác nhau, ≤100 ký tự, chứa "you"/"your" · 3
  thumbnail khác nhau ở **từ đỏ và visual**, không chỉ khác màu · đọc được ở 168×94px · description
  ≤5000 ký tự có khối nguồn + composite-character + disclaimer · chapter đặt tên mô tả nội dung,
  không "Part 1" · 2–3 shorts 30–50 giây từ đoạn ma trận ngưỡng.
- **DoD:** validate schema · không mặt người trong thumbnail · không số liệu thiếu claimId.

## S14b · Publish

- **Vai trò:** Publisher
- **Cách làm:** upload YouTube Data API v3 ở chế độ **riêng tư**, gắn playlist, khai báo AI.
- **Công cụ:** YouTube Data API v3 (`videos.insert`, `thumbnails.set`), OAuth refresh token.
- **Output:** `08-publication.json`
- **Tiêu chuẩn:** `privacyStatus: "private"` lúc upload · `aiDisclosure: true` · ≤4 upload/ngày ·
  ghi `quotaUnitsUsed` (mỗi upload ~1.600 unit trên hạn mức 10.000/ngày).
- **DoD:** video tồn tại trên kênh · chủ dự án kiểm thủ công rồi mới đặt lịch công khai.

## S14c · Measure

- **Vai trò:** Analyst
- **Công cụ:** YouTube Analytics API.
- **Output:** `09-metrics.json` ở 3 mốc 48h / 7 ngày / 28 ngày.
- **Tiêu chuẩn:** views, impressions, CTR, avgViewDuration, retention30s, retention50pct,
  subsGained, RPM.
- **DoD:** số khớp YouTube Studio · đủ cả 3 mốc.

## S14d · Learn

- **Vai trò:** Analyst
- **Cách làm:** bốn đối chiếu — CTR↔formula tiêu đề, retention30s↔kiểu cold open,
  retention50%↔vị trí ma trận, subsGained↔pillar.
- **Output:** `09-insight.md` + PR cập nhật `/library`.
- **Tiêu chuẩn:** chỉ kết luận khi có ≥3 tập cùng đặc điểm · mỗi nhận định kèm cỡ mẫu và một
  thay đổi cụ thể đề xuất cho file nào.
- **DoD:** PR mở ra, **không auto-merge** · không đề xuất tăng nhịp đăng.

## S14e · Distribution (người làm, ngoài pipeline)

- **Vai trò:** CHỦ DỰ ÁN
- **Cách làm:** xem `channels/us-personal-finance/distribution.md`.
- **Việc mỗi tập:** chọn tiêu đề + nạp 3 thumbnail vào thử nghiệm (3 phút) · đặt lịch, gắn
  playlist, ghim bình luận (3 phút) · **trả lời 20 bình luận đầu trong 2 giờ sau công khai**
  (15 phút) · kiểm CTR sau 48h, đổi tiêu đề nếu < 3% (2 phút).
- **Tiêu chuẩn:** chỉ đổi **một biến** mỗi lần. Đổi cả tiêu đề lẫn thumbnail cùng lúc thì không
  học được gì.
- **DoD:** ~23 phút/tập. Cộng với 35 phút sản xuất, **thời gian người thật thực tế là ~58 phút/tập.**

---

# TIÊU CHUẨN KỸ THUẬT TỔNG HỢP

| Hạng mục | Chuẩn |
|---|---|
| Video | 1920×1080, H.264, 30fps, CRF 18, yuv420p |
| Audio VO | −14 LUFS, true peak ≤ −1 dBTP |
| Nhạc nền | −22 LUFS, duck khi có VO |
| Caption | lệch ≤200ms |
| Safe area | mọi chữ trong 90% khung |
| Canvas | 6000×3400, viewport 1920×1080 |
| Khung tĩnh tối đa | 400ms |
| Chữ trên màn hình | ≤12 từ/scene, ≤22% tổng số từ VO |
| Scene tối thiểu | 1.200ms; scene có số liệu ≥3.500ms |
| Độ lệch chuẩn thời lượng scene | ≥40% trung bình |
| Cỡ cảnh | wide 15–25% · medium 45–60% · close 20–30% |
| J-cut | audioLeadMs 400–1000 |
| Parallax | nền 30% · giữa 100% · trước 130% |
| Easing | cubic-bezier(0.22, 1, 0.36, 1), không bao giờ linear |
| Stagger | 40–80ms |
| Overshoot | 3–5%, lùi về trong 120ms |
| Motion blur | bật khi >800px/giây (đắt — Wave 4) |
| Stock | ≤15% thời lượng |
| visualScore | ≥8/10 |
| Render worker | 16–20 (không quá 50) |
| Upload/ngày | ≤4 |
| Retry tối đa mỗi stage | 2 (lần 3 chuyển Gate người) |
| First-Pass Yield tối thiểu mỗi stage | 70% (dưới ngưỡng = viết lại đặc tả) |
