# BOOTSTRAP — Meridian Studio

File này để MÁY xử lý. Anh đọc `MERIDIAN.md` (mục đầu tiên bên dưới).

Tong so file: 92

---

<<<FILE: MERIDIAN.md>>>
# MERIDIAN — Tài liệu chủ

Một file duy nhất. Mọi thứ anh cần để bắt đầu. Repo còn ~80 file kỹ thuật nhưng chúng dành cho
agent đọc, không phải cho anh.

---

# I · THÔNG SỐ

| Hạng mục | Giá trị |
|---|---|
| Dự án | Meridian Studio · repo `meridian-studio` |
| Bản chất | Nhà máy **nghiên cứu — sản xuất — vận hành — tối ưu nhiều kênh** |
| Kiến trúc | **4 lớp**: Engine · Genre Pack · Channel Pack · Portfolio |
| Phạm vi hiện tại | 1 genre (`data-explainer`) · 1 kênh (`us-personal-finance`) |
| Lộ trình | 3 kênh cùng khán giả Mỹ 28–45: tài chính → y tế → ô tô |
| Nhận diện | Faceless hoàn toàn |
| Nhịp | Theo pha: 8–12 → 12–16 → 16–20 tập/tháng/kênh |
| Doanh thu | **Quảng cáo → Affiliate → Email** |
| Độ dài tập | 18–24 phút (vì số điểm quảng cáo) |
| Gate người | 3, gom theo lô. Trần 3 kênh |
| Triển khai | ChatGPT Work + **Codex Cloud** · zero-local · host ChatGPT Sites |
| Render | Remotion, canvas liên tục 6000×3400 với máy quay di chuyển |

---

# II · QUYẾT ĐỊNH VỀ KIỂM GIẢ ĐỊNH

Chủ dự án chọn **không chờ** bước kiểm giả định khán giả trước (WP-VAL-001). Bắt đầu xây ngay.

Hệ quả: giả định "khán giả Mỹ muốn ma trận ngưỡng ba tầng 20 phút" sẽ được kiểm bằng **dữ liệu
thật ở Wave 1b** — A/B ba biến thể format trong 20 tập đầu. Wave 1b vì vậy là **bắt buộc**.

Việc đầu tiên là **WP-000**.

---

# III · KHỞI ĐỘNG — 12 BƯỚC COPY-PASTE

🖱 bấm chuột · 📋 dán khối. Anh chỉ tự nghĩ 4 chỗ trống.

## 🖱 Bước 1
ChatGPT → **Projects** → **New project** → tên `Meridian Studio`

## 📋 Bước 2 — KHỐI 1 (Instructions của Project)

```
Dự án: Meridian Studio (repo GitHub: meridian-studio).
Nhà máy nghiên cứu - sản xuất - vận hành - tối ưu NHIỀU kênh YouTube phân tích định lượng
cho thị trường Mỹ. Vận hành hoàn toàn trong trình duyệt: ChatGPT Sites làm UI, GitHub repo
làm nơi lưu trạng thái, GitHub Actions làm nơi chạy xử lý. Không server, không database,
không máy local.

KIẾN TRÚC BỐN LỚP - quy tắc quan trọng nhất:
/engine          trung tính về thể loại VÀ kênh
/genres/{genre}  theo THỂ LOẠI: layout, format-spec, asset-policy, compliance
/channels/{slug} theo KÊNH: bible, persona, lexicon, tokens, topic-map, monetization
/portfolio       dùng chung: học chéo, thư viện mô hình, nghiên cứu ngách

Một file thuộc Engine CHỈ KHI nó đúng với mọi thể loại và mọi kênh. Nghi ngờ thì đẩy
xuống Genre Pack. Nghi ngờ tiếp thì đẩy xuống Channel Pack.

Phạm vi hiện tại: 1 genre (data-explainer), 1 kênh (us-personal-finance).
Kênh faceless hoàn toàn. Doanh thu ưu tiên: quảng cáo > affiliate > email.

Tôi là người mới với Codex. Giả định tôi không biết thuật ngữ chuyên ngành trừ khi tôi
dùng nó trước.

Nguyên tắc bắt buộc:
1. Luôn đọc PROJECT.md, AGENTS.md, engine/ops/guardrails.md trước khi đề xuất bất cứ gì.
2. Không đề xuất giải pháp cần server chạy liên tục, database ngoài, hay máy local.
3. Không đề xuất sửa file trong /engine/contracts. Thấy schema sai thì nêu rồi dừng.
4. Không thêm hằng số nội dung vào /engine. Chúng thuộc Genre Pack hoặc Channel Pack.
5. Không mở rộng phạm vi. Tôi hỏi A thì chỉ trả lời A.
6. Khi tôi yêu cầu viết tài liệu: viết đúng MỘT file, đầy đủ, trong MỘT khối code, dán
   được ngay. Không giải thích trước hay sau khối code.
7. Không hỏi lại tôi trừ khi thiếu thông tin khiến không làm được.
8. Yêu cầu của tôi mâu thuẫn với tài liệu đính kèm thì nói thẳng chỗ mâu thuẫn trước.
9. Trả lời bằng tiếng Việt. Code và tên biến bằng tiếng Anh. Nội dung cho kênh bằng
   tiếng Anh Mỹ.
```

## 🖱 Bước 3
Project → **Files** → upload đúng 3 nhóm: `BOOTSTRAP.md` · hai transcript kênh tham chiếu ·
ba ảnh lưới video

## 📋 Bước 4 — KHỐI 2 (chat `W0 · PROJECT`)

```
Trong BOOTSTRAP.md có file PROJECT.md.

Thông tin của tôi:
- Tên tài khoản GitHub: <ĐIỀN username GitHub>
- Tên dự án tôi muốn dùng: <ĐIỀN, hoặc gõ: giữ nguyên Meridian>
- Một câu về mục tiêu riêng của tôi với dự án này: <ĐIỀN 1 câu>

Viết lại toàn bộ PROJECT.md với thông tin trên điền vào khối Naming và mục Mục tiêu.
Giữ nguyên toàn bộ mục Non-goals, Kiến trúc bốn lớp, và Nguyên tắc bất di bất dịch.
Xuất markdown đầy đủ trong MỘT khối code. Không giải thích.
```

## 📋 Bước 5 — KHỐI 3 (chat `W0 · Channel Bible`)

```
Trong BOOTSTRAP.md có file channels/us-personal-finance/channel-bible.md.
Đọc nó cùng hai transcript và ba ảnh thumbnail đính kèm.

Ràng buộc đã chốt, không cần hỏi lại: kênh faceless hoàn toàn. Doanh thu ưu tiên quảng
cáo. Đã bỏ pillar spending-psychology vì RPM thấp nhất và phụ thuộc văn hoá nhất, còn 5
pillar: housing, debt, investing, career-income, retirement.

Viết lại toàn bộ file đó.
Giữ nguyên: bảng giọng, mục Cấm kỵ, nhịp theo pha, bốn cơ chế bù trừ R1 cho kênh faceless.
Dựa vào hai transcript và ba ảnh thumbnail để đề xuất phần Định vị một câu sắc hơn bản
hiện tại, nhắm đúng khán giả Mỹ 28-45 đang đứng trước một quyết định tiền lớn.
Xuất markdown đầy đủ trong MỘT khối code. Không giải thích.
```

## 🖱 Bước 6
`github.com` → `+` → **New repository** → name `meridian-studio` → **Private** →
tích **Add a README file** → **Create repository**

## 🖱 Bước 7
**Add file** → **Create new file** → tên `BOOTSTRAP.md` → dán toàn bộ → **Commit changes**
(Nghẽn thì **Add file** → **Upload files** → kéo file vào)

## 🖱 Bước 8
Làm hai lần: **Add file** → **Create new file** → gõ đường dẫn đầy đủ → dán → **Commit**

| Lần | Đường dẫn | Nội dung từ |
|---|---|---|
| 1 | `PROJECT.md` | Bước 4 |
| 2 | `channels/us-personal-finance/channel-bible.md` | Bước 5 |

## 🖱 Bước 9
`chatgpt.com/codex` → **Connect to GitHub** → **Install and Authorize** →
**Only select repositories** → chọn `meridian-studio` → **Create environment** →
bật **Agent internet access**

## 📋 Bước 10 — KHỐI 4 (Codex, chia 4 lô)

Lô 1 — engine/docs. Lô 2 — engine/contracts + engine/ops. Lô 3 — genres + channels.
Lô 4 — portfolio + gốc, và xoá BOOTSTRAP.

Mẫu cho mỗi lô, thay `<LÔ>` và `<DANH SÁCH>`:

```
Repo: meridian-studio

Đọc BOOTSTRAP.md ở gốc repo. Mỗi file được phân tách bằng dòng đánh dấu dạng:

<<<FILE: đường/dẫn/file>>>
...nội dung...
<<<END>>>

NHIỆM VỤ LÔ <LÔ>: chỉ tạo các file có đường dẫn bắt đầu bằng <DANH SÁCH>.

RÀNG BUỘC:
- KHÔNG tạo file nào khác ngoài phạm vi lô này.
- KHÔNG sửa nội dung, KHÔNG rút gọn, KHÔNG bỏ dòng nào.
- Các file .json phải parse được nguyên vẹn.
- GIỮ NGUYÊN bản trong repo, không ghi đè: PROJECT.md,
  channels/us-personal-finance/channel-bible.md
- KHÔNG xoá BOOTSTRAP.md (trừ lô cuối).

Mở MỘT pull request tên "Batch <LÔ>". Mô tả PR ghi rõ số file đã tạo.
```

## 🖱 Bước 11 — Duyệt PR
Tab **Files changed** → kiểm đủ số file · hai file ở Bước 8 giữ nguyên · JSON parse được →
**Merge**

## 📋 Bước 12 — KHỐI 5 (Codex, WP đầu tiên)

```
Repo: meridian-studio

Đọc PROJECT.md, AGENTS.md, engine/ops/guardrails.md và engine/docs/01-architecture.md.
Thực hiện đúng engine/ops/work-packages/WP-000-scaffold.md.

RÀNG BUỘC:
- Chỉ chạm các file trong mục "Files in scope" của WP.
- Chỉ thêm dependency có tên và phiên bản trong mục "Ràng buộc".
- Không viết logic nghiệp vụ.
- Không thêm hằng số nội dung vào /engine.
- Tự chạy acceptance test loại 1 trước khi mở PR, dán kết quả vào mô tả PR.

Mở MỘT pull request, mô tả đủ 4 mục theo AGENTS.md.
```

## 📋 Khi PR sai — KHỐI 6

```
PR #<SỐ> chưa đạt. Vấn đề:
1. <mô tả cụ thể>
2. <mô tả cụ thể>

Đọc lại engine/ops/guardrails.md và engine/ops/definition-of-done.md.
Sửa trên đúng nhánh của PR này, không mở PR mới.
Không thay đổi gì ngoài các vấn đề tôi nêu.
```

Đừng sửa tay. Sửa tay thì agent không học, lần sau sai y hệt.

---

# IV · BẢY VIỆC ĐÃ LÀM SẴN TRONG REPO NÀY

Tất cả đều là "tách ranh giới, chưa xây implementation" — gần như không tốn code, rất đắt nếu
sửa sau.

| # | Việc | Ở đâu |
|---|---|---|
| 1 | Tách 4 lớp thư mục | Cấu trúc repo |
| 2 | `format-spec`, `layouts.json`, `asset-policy` xuống Genre Pack | `genres/data-explainer/` |
| 3 | Bỏ non-goal cấm đa kênh, thêm `genre` + `engineVersion` | `PROJECT.md`, `channel.json` |
| 4 | Contract đọc/ghi qua interface, không gọi thẳng GitHub API | `AGENTS.md`, guardrail 11y |
| 5 | Interface provider ở Engine, lựa chọn ở Genre Pack | guardrail 11x |
| 6 | **Bằng chứng công sức người** — điều kiện thứ 5 của bộ lọc ngách | `proof-of-human-effort.md` |
| 7 | Versioning + 6 cơ chế nâng cấp không gãy | `engine/docs/13-upgrade-safety.md` |

---

# V · PIPELINE 18 STAGE

```
KHỐI A — Hoạch định
  S01 Signal Scan      [tự động]   → signals.json (trọng số RPM 30%)
  S02 Topic Scoring    [tự động]   → topics.ranked.json
  S03 GATE 1           [NGƯỜI]     → brief.json — thesis + tiêu đề + kiểm mới lạ

KHỐI B — Sáng tạo
  S04 Research         [tự động]   → dossier + sources (>=1 con số phái sinh)
  S05 Fact-check       [tự động]   → cờ đỏ thì DỪNG
  S06 Outline          [tự động]   → 7 mốc + adBreaks sinh từ curiosityBridge
  S07 Script           [tự động]   → 6 thiết bị + lượt soát bản địa
  S08 GATE 2           [NGƯỜI]     → script.approved.md

KHỐI C — Sản xuất
  S09  Storyboard      [tự động]   → ~200 scene trên canvas liên tục
  S09.5 PREFLIGHT      [máy]       → 12 kiểm tra tĩnh, ~0 USD — bắt 80% lỗi
  S10  Voice & Timing  [tự động]   → vo.wav + captions
  S11  Visual Assembly [tự động]   → props + assets + prompt/seed lưu lại
  S11.5 PROOF RENDER   [máy]       → 12 ảnh + clip 15s, ~0,1 USD
  S12  Render          [tự động]   → final.mp4 + 3 Shorts dọc riêng
  S13  QA 3 lớp + GATE 3           → kỹ thuật · thị giác · chuyển động

KHỐI D — Phân phối & học
  S14a Packaging   → 5 title, 3 thumbnail, adBreaks, affiliate, link bảng tính
  S14b Publish     → riêng tư trước
  S14c Measure     → 48h/7d/28d
  S14d Learn       → insight + cultural-correction + PR (KHÔNG auto-merge)
  S14e Distribution [NGƯỜI] → ~23 phút/tập
```

---

# VI · BỐN CỔNG CHẶN

| Cổng | Ở đâu | Không qua thì |
|---|---|---|
| **Wave 1b** A/B format | 20 tập đầu | Không sang kênh 2 |
| **WP-004a** Spike canvas liên tục | Wave 2, trước Layout Gallery | WP-005 và WP-006a bị chặn |
| **WP-003a** Spike loader Sites | Wave 1 | Chưa quyết được cách host |
| **WP-006a** Layout Gallery | Wave 2 | Không sang Wave 3 |

---

# VII · NĂM ĐIỀU CHƯA GIẢI ĐƯỢC

**Chưa biết khán giả Mỹ có muốn phân tích sâu không.** Giả định cốt lõi. WP-VAL-001 kiểm nó.

**Vòng tự cải thiện không chạy trong 20–30 tập đầu.** Không có tín hiệu thì không có gì để học.

**Độ sâu phân tích mỏng hơn hiểu biết bản địa.** Sao chép được, chậm nhưng được. Bù bằng thư viện
mô hình tích luỹ.

**Ràng buộc zero-local có trần.** Khoảng một kênh chạy tốt hoặc ba kênh chạy vất vả. Quanh tháng
8–10 cần backend nhỏ. Đã thiết kế interface để chuyển được.

**Ba lần bỏ dở có thể không phải vấn đề quản trị.** Không tài liệu nào trả lời được liệu tháng thứ
sáu anh còn muốn làm việc này không.

---

# BẮT ĐẦU

Phần III, Bước 1. Ba bước đầu mất khoảng 15 phút.
<<<END>>>

<<<FILE: .gitignore>>>
node_modules/
.env
.env.*
dist/
out/
*.mp4
*.mov
*.wav
*.mp3
.DS_Store
episodes/*/assets/
episodes/*/render/
<<<END>>>

<<<FILE: AGENTS.md>>>
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

Chủ dự án **không có máy local** và chỉ dùng trình duyệt. Mọi lệnh bạn viết ra chỉ được chạy
trong sandbox Codex hoặc GitHub Actions — không bao giờ yêu cầu chủ dự án chạy lệnh, cài phần
mềm, hay mở file bằng `file://`. Thao tác của người chỉ được là bấm nút trên web GitHub,
ChatGPT, hoặc cockpit.

## Cách làm việc

- Chỉ thực hiện đúng phạm vi của WP được giao. Một task = một WP = một PR.
- Chỉ sửa các file được liệt kê trong mục "Files in scope" của WP. Chạm file khác = vi phạm.
- Không thêm dependency mới trừ khi WP ghi rõ tên và phiên bản.
- Không đổi cấu trúc thư mục.
- Không sửa bất cứ file nào trong `/contracts`. Nếu thấy schema sai, viết vào phần mô tả PR và dừng.
- Không tạo file "tiện ích", "helper", "refactor" mà WP không yêu cầu.
- Không viết code cho tính năng tương lai. Chỉ làm đúng việc hôm nay.

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
<<<END>>>

<<<FILE: CHANGELOG.md>>>
# CHANGELOG

## 0.1.1 — 2026-09-08

- WP-VAL-001 chuyển từ cổng chặn sang tuỳ chọn theo quyết định chủ dự án. Wave 1b trở thành bắt buộc.

## 0.1.0 — 2026-09-08 · Tái cấu trúc bốn lớp, đổi tên Meridian

- Đổi tên Foundry → **Meridian**. Repo `meridian-studio`.
- Tách bốn lớp: `/engine` · `/genres/{genre}` · `/channels/{slug}` · `/portfolio`.
- `format-spec`, `layouts.json`, `asset-policy.json`, `compliance` xuống Genre Pack.
- Palette và font tách thành `visual-tokens.json` theo kênh (chống rủi ro lan danh mục).
- Chiến lược khác biệt: **độ sâu phân tích định lượng**, không dựa kinh nghiệm cá nhân.
  Persona viết lại: kênh là bản phân tích, không có người dẫn.
- Doanh thu: Quảng cáo → Affiliate → Email. Trục RPM 30% ở S02. Bỏ pillar spending-psychology.
- `brief.schema`: versions · workingTitle · noveltyCheck · rpmTier · evergreenScore ·
  explorationEpisode · formatVariant · proposedBy.
- `outline.schema`: adBreaks sinh tự động từ curiosityBridge.
- `package.schema`: 3 Shorts dọc render riêng · affiliate có FTC · link bảng tính.
- Thêm WP-VAL-001 (kiểm giả định khán giả, trước Wave 0) và WP-004a (spike canvas, cổng chặn).
- Thêm CP template, `13-upgrade-safety.md`, `proof-of-human-effort.md`, lớp Portfolio.
- Guardrail 11z/11y/11x/11w: cấm hằng số nội dung vào engine, bắt buộc interface state và provider.
<<<END>>>

<<<FILE: PROJECT.md>>>
# PROJECT

> Điểm neo duy nhất. Agent PHẢI đọc file này trước mọi tác vụ.

## Naming

| Khoá | Giá trị |
|---|---|
| PROJECT_NAME | Meridian |
| PROJECT_FULL | Meridian Studio |
| REPO | meridian-studio |
| SITE_SLUG | meridian-studio |
| OWNER | <ĐIỀN username GitHub> |
| ENGINE_VERSION | 0.1.0 |

## Mục tiêu

Một nhà máy **nghiên cứu — sản xuất — vận hành — tối ưu nhiều kênh YouTube**, vận hành hoàn toàn
trong trình duyệt, với con người chỉ can thiệp ở 3 cổng duyệt.

## Kiến trúc bốn lớp

```
/engine                  Trung tính về thể loại và kênh. Không chứa hằng số nào của nội dung
/genres/{genre}          Theo THỂ LOẠI: layout, format-spec, asset-policy, compliance
/channels/{slug}         Theo KÊNH: bible, persona, lexicon, tokens, topic-map, monetization
/portfolio               Dùng chung: học chéo, thư viện mô hình, nghiên cứu ngách, quản trị
```

**Quy tắc phân định:** một file thuộc Engine chỉ khi nó đúng với **mọi thể loại và mọi kênh**.
Nghi ngờ thì đẩy xuống Genre Pack. Nghi ngờ tiếp thì đẩy xuống Channel Pack.

## Phạm vi hiện tại

- Genre Pack: **chỉ `data-explainer`**
- Channel: **chỉ `us-personal-finance`**
- Lớp Portfolio: tồn tại nhưng gần như rỗng

Ranh giới được tách từ ngày đầu vì sửa sau rất đắt. Implementation chỉ xây khi có nhu cầu thật.

## Non-goals

1. **Không** xây Genre Pack thứ hai trước khi 3 kênh đầu chứng minh mô hình.
2. **Không** xây backend server, database, hay bất cứ thứ gì cần máy chủ chạy liên tục.
3. **Không** yêu cầu bất kỳ thao tác nào trên máy local. Chỉ trình duyệt.
4. **Không** dùng model sinh video cho thể loại `data-explainer` (xem ADR-0002).
5. **Không** làm hệ thống đăng nhập nhiều người dùng.
6. **Không** tối ưu hoá sớm: không caching layer, không abstraction "cho tương lai" ngoài hai
   interface đã khai (state backend, provider).
7. **Không** chạy hết công suất — năng lực sản xuất và tốc độ đăng là hai thứ khác nhau.
8. **Không** vượt 3 kênh khi vẫn giữ đủ 3 gate người.

## Nguyên tắc bất di bất dịch

1. **Contract-first.** Agent không sửa `/engine/contracts`.
2. **Repo là nguồn sự thật.** Nhưng mọi stage đọc/ghi qua interface, không gọi thẳng GitHub API.
3. **Một WP = một task Codex = một PR.**
4. **Vertical slice trước.** Chạy xuyên suốt trước, chất lượng sau.
5. **Ba gate người:** chốt thesis · duyệt kịch bản · spot check.
6. **Tách ranh giới ngay, xây implementation sau.**

## Trạng thái

Xem `engine/ops/backlog.md`. Việc đầu tiên là **WP-VAL-001**, không phải WP-000.
<<<END>>>

<<<FILE: README.md>>>
# Meridian Studio

Nhà máy nghiên cứu — sản xuất — vận hành — tối ưu nhiều kênh YouTube phân tích định lượng.
Vận hành trong trình duyệt.

## Bắt đầu

| Nếu bạn là | Đọc |
|---|---|
| Chủ dự án, lần đầu | **`MERIDIAN.md`** — tài liệu chủ, mọi thứ trong đó |
| Agent (Codex) | `PROJECT.md` → `AGENTS.md` → `engine/ops/guardrails.md` → WP được giao |
| Người vận hành | `engine/docs/05-runbook.md` |

## Bốn lớp

```
/engine                    Trung tính về thể loại VÀ kênh
  docs/ contracts/ ops/ library/ app/ templates/
/genres/data-explainer     Theo thể loại: format-spec, layouts, asset-policy, compliance, prompts
/channels/us-personal-finance   Theo kênh: bible, persona, lexicon, tokens, topic-map, monetization
/portfolio                 Dùng chung: niche-research, cross-learning, portfolio-gates, model-library
/episodes /pipeline /config
```

**Quy tắc:** một file thuộc Engine chỉ khi nó đúng với mọi thể loại và mọi kênh.
<<<END>>>

<<<FILE: channels/us-personal-finance/channel-bible.md>>>
# Channel Bible

Tài liệu bản sắc. Mọi prompt pack tham chiếu file này. Đổi ở đây thì cả kênh đổi.

## Định vị một câu

A US personal-finance channel that answers one concrete money question per episode using real,
sourced data, turns it into a quantified threshold matrix the viewer can locate themselves in,
and closes with hard rules — not encouragement.

## Khán giả

- 28–45 tuổi, thu nhập hộ 70K–150K USD, đang đứng trước một quyết định tài chính lớn.
- Không thiếu thông tin. Thiếu **khung để ra quyết định**.
- Đã chán lời khuyên chung chung và không tin chúng nữa.

## Giọng

| Có | Không |
|---|---|
| Bình tĩnh, phân tích, tôn trọng trí tuệ người xem | Hò hét, gấp gáp, "you won't believe" |
| Miễn tội cho người xem, đổ tội cho hệ thống | Chê trách, dạy đời |
| Số liệu cụ thể có nguồn | Số liệu tròn trịa không nguồn |
| Thừa nhận điều mình không biết | Khẳng định chắc nịch về tương lai |
| Ngôi thứ hai trực tiếp ("you") | Ngôi thứ ba xa cách ("people who...") |

## Sáu trụ chủ đề (pillar)

1. `housing` — thuê vs mua, thế chấp, chi phí ẩn sở hữu nhà
2. `debt` — thẻ tín dụng, vay sinh viên, vay mua xe, thứ tự trả nợ
3. `investing` — index fund, 401k/IRA, phí, kỳ vọng lợi suất thực
4. `career-income` — đàm phán lương, đổi việc, thu nhập phụ, rủi ro nghề
5. `retirement` — quy tắc rút, an sinh xã hội, chi phí y tế
6. `spending-psychology` — lifestyle creep, so sánh xã hội, chi phí sĩ diện

## Nhân dạng

**Kênh faceless hoàn toàn** — không mặt, không giọng thật, không tên thật, trong mọi tập.
Bốn cơ chế bù trừ bắt buộc: phân tích dữ liệu gốc · công bố phép tính · nêu nguồn uy tín bằng chữ ·
hiện diện thật trong bình luận. Chi tiết: `channels/us-personal-finance/persona.md`.

Xem `channels/us-personal-finance/persona.md`. Kênh là bản phân tích, không có người dẫn.
Uy tín đến từ phân tích kiểm chứng được công khai: con số phái sinh + bảng tính công bố + sổ nguồn 100%.

## Cấm kỵ

- Không khuyến nghị mã cổ phiếu, crypto cụ thể, hay sản phẩm tài chính có tên.
- Không hứa lợi nhuận, không dùng "guaranteed", "risk-free", "get rich".
- Không nội dung chính trị đảng phái.
- Không so sánh cá nhân hoá kiểu "if you're not doing X you're failing".
- Không bịa nhân vật có thật. Nhân vật minh hoạ phải được nêu rõ là composite.

## Định dạng chuẩn

- Độ dài: 18–24 phút.
- Nhịp đăng: **tăng dần theo giai đoạn**, xem `engine/docs/04-nfr.md`.
  - Giai đoạn 2 (10 tập đầu): **3 tập/tuần**
  - Giai đoạn 3 (sau khi đạt điều kiện mở khoá): **7 tập/tuần**
- Ở nhịp này, ba yêu cầu bù trừ trở thành BẮT BUỘC, không phải tuỳ chọn:
  1. Mỗi tập phải có thesis riêng do người viết ở Gate 1 — không có ngoại lệ, không Fast Lane bỏ Gate 1.
  2. Mỗi tập phải có ít nhất một số liệu mà không kênh nào khác đang dùng cho chủ đề đó.
  3. Không hai tập liên tiếp cùng pillar.
  Lý do: xem R1 trong `engine/docs/06-risk-register.md`.
- Một tập = một câu hỏi = một ma trận ngưỡng.
<<<END>>>

<<<FILE: channels/us-personal-finance/channel.json>>>
{
  "slug": "us-personal-finance",
  "displayName": "<chưa chốt>",
  "genre": "data-explainer",
  "engineVersion": "0.1.0",
  "market": "US",
  "language": "en-US",
  "distributionPhase": "phase-0",
  "cadencePerMonth": 10,
  "faceless": true,
  "status": "pre-launch",
  "googleAccount": "<tách biệt với các kênh khác>",
  "ttsVoiceId": "<chọn một, không bao giờ đổi>",
  "pillars": ["housing", "debt", "investing", "career-income", "retirement"],
  "notes": "spending-psychology đã bỏ: RPM thấp nhất và phụ thuộc văn hoá nhất"
}
<<<END>>>

<<<FILE: channels/us-personal-finance/data-sources.md>>>
# Data Sources

Danh sách trắng. **Researcher chỉ được lấy số liệu từ các nguồn này.** Số liệu ngoài danh sách =
cờ đỏ ở fact-check.

| Publisher | Dùng cho | Ghi chú |
|---|---|---|
| **FRED** (Federal Reserve Economic Data) | Lãi suất, lạm phát CPI, tỷ lệ tiết kiệm, giá nhà | Luôn ghi `seriesId` vào sổ nguồn |
| **BLS** (Bureau of Labor Statistics) | Thu nhập, việc làm, CPI chi tiết, chi tiêu hộ gia đình (CEX) | |
| **US Census Bureau** | Nhân khẩu, thu nhập hộ theo vùng, giá thuê trung vị (ACS) | |
| **Freddie Mac PMMS** | Lãi suất vay mua nhà cố định 30 năm và 15 năm | Cập nhật hằng tuần |
| **IRS** | Bậc thuế, giới hạn đóng góp hưu trí, khấu trừ | |
| **SSA** (Social Security Administration) | An sinh xã hội, tuổi hưu, mức chi trả | |
| **FDIC** | Lãi suất tiền gửi, thống kê ngân hàng | |
| **CFPB** | Dữ liệu khiếu nại tín dụng, quy định bảo vệ người tiêu dùng | |

## Quy tắc

1. Mỗi con số → một mục trong `sources.json` với `sourceUrl`, `publisher`, `asOfDate`, `retrievedAt`.
2. Giữ nguyên đơn vị gốc trong sổ nguồn. Quy đổi chỉ làm ở script và ghi rõ cách quy đổi.
3. Số liệu cũ hơn 18 tháng phải nêu rõ mốc thời gian trong lời đọc.
4. Cấm: bài báo thứ cấp, blog, diễn đàn, trang tổng hợp SEO, số liệu từ trí nhớ của model.
5. Nếu không tìm được nguồn cho một claim → **bỏ claim đó**, không ước lượng.

## Thêm nguồn mới
Chỉ chủ dự án được thêm. Agent đề xuất trong mô tả PR, không tự sửa file này.
<<<END>>>

<<<FILE: channels/us-personal-finance/distribution.md>>>
# Distribution

Nhà máy không phải là kênh. Toàn bộ phần còn lại của repo nói về **sản xuất**; file này nói về
**phân phối**.

Nhà máy có thể chạy hoàn hảo và kênh vẫn chết. Hai thứ này độc lập nhau hơn người ta tưởng.

## Ba pha, mỗi pha một chiến lược khác hẳn

### Pha 0 · 0 → 100 sub — giai đoạn tìm kiếm

Ở pha này **không có thuật toán đề xuất nào giúp anh**. Kênh mới không có tín hiệu để hệ thống
biết đẩy video cho ai. Nguồn view duy nhất khả thi là **tìm kiếm**.

Hệ quả cho việc chọn đề tài — ngược hẳn với trực giác:

| Pha 0 cần | Pha 2 cần |
|---|---|
| Câu hỏi **rất hẹp**, ít người tìm nhưng cạnh tranh thấp | Câu hỏi rộng, nhiều người quan tâm |
| "Should I pay off a 5.2% car loan early?" | "How to get out of debt" |
| Tiêu đề khớp đúng cụm người ta gõ | Tiêu đề gây tò mò |

**10 tập đầu phải là 10 câu hỏi hẹp và cụ thể.** Đây là điều chỉnh trực tiếp cho `topic-map.md`
và cho Strategist ở S02: trong pha 0, trục `saturation` được ưu tiên cao hơn trục `demand`.

Đăng đều 3 tập/tuần theo giai đoạn 2 của ngân sách. Đừng chạy 7 tập/tuần ở pha này — chưa có tín
hiệu nào để khuếch đại, chỉ đốt tiền.

### Pha 1 · 100 → 1.000 sub — giai đoạn phễu

Shorts trở thành công cụ chính. Mỗi tập đã sinh sẵn 2–3 shorts từ đoạn ma trận ngưỡng ở S14a.

- Đăng 1 short mỗi ngày, lệch ngày với video dài.
- Short phải kết bằng một câu dẫn sang video dài, không tự đủ.
- Short lấy từ đoạn có **con số cụ thể**, không lấy đoạn kể chuyện.

Bắt đầu dùng **playlist làm series**: mỗi pillar một playlist, đặt tên như một khoá học ngắn chứ
không phải một danh sách.

### Pha 2 · 1.000+ sub — giai đoạn khuếch đại

Lúc này mới chuyển sang đề tài rộng và nhịp 7 tập/tuần. Trước mốc này, tăng nhịp là lãng phí.

## A/B thumbnail — cơ chế thật

Ta sinh 3 thumbnail và 5 tiêu đề mỗi tập nhưng trước đây **chưa mô tả cách chọn**. Đây là quy trình:

**Thumbnail:** YouTube Studio có tính năng thử nghiệm và so sánh cho phép chạy nhiều biến thể
thumbnail trên cùng một video và tự chọn cái thắng. Nạp cả 3 biến thể, để hệ thống chạy.
Đây là nguồn dữ liệu chính cho `insight.md`.

**Tiêu đề:** không có A/B tự động. Quy trình thủ công:
1. Đăng với tiêu đề xếp hạng cao nhất theo `title-formulas.md`.
2. Sau 48 giờ, nếu CTR < 3%, đổi sang tiêu đề thứ hai.
3. Ghi lại cặp (formula, CTR) vào `metrics.json`.
4. Sau 10 tập, Analyst đã có đủ dữ liệu để biết formula nào thắng trên kênh này.

**Quan trọng:** chỉ đổi **một biến** mỗi lần. Đổi cả tiêu đề lẫn thumbnail cùng lúc thì không học
được gì.

## Bình luận — kênh phản hồi bị đánh giá thấp

Bình luận có hai giá trị, giá trị thứ hai lớn hơn:

1. Tín hiệu tương tác cho hệ thống đề xuất.
2. **Nguồn nạp Thesis Bank chất lượng cao.** Câu hỏi lặp lại nhiều lần trong bình luận là bằng
   chứng trực tiếp về chỗ khán giả thực sự vướng — tốt hơn mọi công cụ nghiên cứu từ khoá.

Quy trình:
- Trả lời **20 bình luận đầu trong 2 giờ sau khi công khai**. Đây là cửa sổ quan trọng nhất.
- Ghim một bình luận chứa chính mid-CTA của tập.
- Mỗi tuần, quét bình luận tìm câu hỏi lặp → nạp vào Thesis Bank.

Ở nhịp 30 tập/tháng, việc này tốn khoảng 20 phút/ngày. Nên tính vào ngân sách thời gian: **thời
gian người thật thực tế là ~35 phút sản xuất + ~20 phút phân phối mỗi tập**.

## Thứ tự ưu tiên các chỉ số

Không phải chỉ số nào cũng quan trọng như nhau, và thứ tự thay đổi theo pha.

| Pha | Chỉ số quyết định | Vì sao |
|---|---|---|
| 0 | **Retention 30 giây** | Chưa có impression để nói về CTR. Giữ chân là tất cả |
| 1 | **CTR** | Bắt đầu có impression; CTR quyết định có được đẩy tiếp không |
| 2 | **Average view duration + sub/view** | Quyết định kênh có tăng trưởng bền không |

Tối ưu sai chỉ số theo pha là cách phổ biến để tốn công vô ích.

## Giờ đăng

Kênh nhắm Mỹ, người vận hành ở Việt Nam (UTC+7). Đặt lịch, đừng đăng tay:
- Video dài: **6–8h sáng giờ miền Đông Mỹ** (= 17–19h giờ Việt Nam), thứ Ba–Thứ Năm.
- Shorts: lệch ngày với video dài, cùng khung giờ.
- Trả lời 20 bình luận đầu trong 2 giờ sau công khai = **19–21h giờ Việt Nam**. Ghi vào lịch.

## Việc phải làm mỗi tập (ngoài sản xuất)

| Việc | Thời điểm | Thời gian |
|---|---|---|
| Chọn tiêu đề, nạp 3 thumbnail vào thử nghiệm | Trước khi công khai | 3 phút |
| Đặt lịch, gắn playlist, viết ghim bình luận | Trước khi công khai | 3 phút |
| Trả lời 20 bình luận đầu | 2 giờ sau công khai | 15 phút |
| Kiểm CTR, đổi tiêu đề nếu < 3% | Sau 48 giờ | 2 phút |

## Điều KHÔNG làm ở pha 0

- Không chạy quảng cáo.
- Không mua sub, không trao đổi sub.
- Không đăng chéo lên nhiều nền tảng cùng lúc — dàn mỏng công sức khi chưa biết cái gì hiệu quả.
- Không đổi tên kênh, ảnh đại diện, hay định vị giữa chừng. Nhất quán quan trọng hơn tối ưu.
<<<END>>>

<<<FILE: channels/us-personal-finance/lexicon.md>>>
# Lexicon

Bộ từ vựng sở hữu của kênh. Đây là cách xây thương hiệu tư tưởng: lặp lại cùng một bộ thuật ngữ
giữa các tập cho tới khi khán giả dùng chúng để tự mô tả hoàn cảnh của mình.

**Yêu cầu: mỗi script dùng ít nhất 3 thuật ngữ dưới đây.**

Lưu ý: các thuật ngữ này được đúc mới bằng tiếng Anh, **không dịch** từ bộ từ vựng của kênh tham
chiếu. Cột "Cảm hứng" chỉ để đối chiếu nội bộ, không dùng trong nội dung.

| Thuật ngữ | Nghĩa dùng trong kênh | Cảm hứng |
|---|---|---|
| **Quiet wealth** | Của cải không nhìn thấy: tiền không tiêu, xe cũ chưa đổi, giấc ngủ không lo hoá đơn | giàu ngầm |
| **Cash-flow bleed** | Dòng tiền rò rỉ đều đặn qua các khoản nhỏ cố định | tháo van dòng tiền |
| **The voluntary sentence** | Khoản nợ dài hạn tự nguyện ký, khoá tự do lựa chọn trong N năm | bản án tù tự nguyện |
| **Ego gap** | Khoảng cách giữa hình ảnh muốn thể hiện và thu nhập thực | khoảng cách cái tôi |
| **Survival fund** | Quỹ dự phòng tính bằng số tháng sống được nếu mất toàn bộ thu nhập | quỹ dự phòng sinh tồn |
| **Location-independent income** | Nguồn thu vận hành được từ bất kỳ đâu | dòng tiền độc lập địa lý |
| **Frozen asset** | Tài sản trên giấy nhưng không bán được khi cần tiền | tài sản đóng băng |
| **The honeymoon window** | 3–6 tháng đầu sau một thay đổi lớn, khi dopamine che lấp chi phí thật | giai đoạn trăng mật |
| **Threshold check** | Bài tự chấm: bạn đang ở ngưỡng nào trong ba ngưỡng | — |
| **Hidden-cost tax** | Tổng chi phí không xuất hiện trên bảng tính ban đầu | chi phí ẩn |

## Quy tắc dùng
- Giới thiệu thuật ngữ lần đầu bằng một câu định nghĩa ngắn, sau đó dùng tự nhiên.
- Không đúc thuật ngữ mới trong script. Muốn thêm thì cập nhật file này trước.
- Không dùng quá 5 thuật ngữ trong một tập — nhiều quá thành sáo rỗng.
<<<END>>>

<<<FILE: channels/us-personal-finance/monetization.md>>>
# Monetization — us-personal-finance

Thứ tự ưu tiên: **Quảng cáo → Affiliate → Email**.

## Hàm mục tiêu

```
Doanh thu ≈ Số tập × View/tập × Số điểm quảng cáo × RPM
```

Bốn biến, tối ưu được cả bốn. Khác với mô hình affiliate-trước: **số tập quay lại thành biến có
ý nghĩa**, vì quảng cáo scale gần tuyến tính theo sản lượng.

## Ngưỡng hoà vốn

RPM ngách ~15, sau khấu trừ thuế 30% còn **10,5 hiệu dụng**.

| Nhịp | Chi phí/tháng | View/tháng cần |
|---|---|---|
| 10 tập | ~480 USD | ~46.000 |
| 12 tập | ~570 USD | ~54.000 |
| 20 tập | ~850 USD | ~81.000 |

Ba đường làm bài toán khả thi: **ngách RPM cao** (nhân đôi hoặc ba RPM) · **nội dung thường xanh
tích luỹ** (tháng 12 doanh thu đến từ toàn bộ tập đã đăng, không chỉ tập mới) · **ba kênh giới
thiệu chéo**.

## Biến 1 · RPM

RPM chênh 3–5 lần giữa các nhóm chủ đề trong cùng ngành tài chính.

| Nhóm | RPM tương đối | Chủ đề |
|---|---|---|
| Cao nhất | 3–5× | Thế chấp, tái cấp vốn, thẻ tín dụng, bảo hiểm, thuế, môi giới |
| Cao | 2–3× | Đầu tư, hưu trí, vay sinh viên |
| Trung bình | 1–1,5× | Nghề nghiệp, đàm phán lương |
| Thấp nhất | 0,7–1× | Tâm lý chi tiêu — **đã bỏ khỏi pillar** |

**Trọng số chấm chủ đề ở S02:** nhu cầu 30% · cạnh tranh 20% · **RPM 30%** · khả năng dựng ma
trận ngưỡng 20%.

## Biến 2 · Lọc địa lý qua tiêu đề

RPM Mỹ cao hơn nhiều lần các thị trường tiếng Anh khác. Đòn bẩy công sức gần bằng không:

Đưa thuật ngữ đặc thù Mỹ vào tiêu đề — **401k, Roth IRA, FICO, HSA, Medicare, W-2, HELOC, PMI,
FHA, 1099** — tự lọc khán giả Mỹ.

## Biến 3 · Điểm chèn quảng cáo

Tác động **30–50% doanh thu quảng cáo mỗi tập**, và gần như miễn phí để làm đúng.

- Độ dài **18–24 phút** đặt được 4–5 điểm chèn, cộng đầu và cuối video.
- Đặt **đúng ranh giới beat, ngay sau `curiosityBridge`**. Người xem đang muốn biết tiếp thì ngồi
  qua quảng cáo. Đặt giữa đoạn phân tích thì họ bỏ.
- `outline.json` đã có sẵn `curiosityBridge` ở mọi ranh giới beat → **vị trí tối ưu tính được tự
  động**, ghi vào trường `adBreakMs`.

## Biến 4 · View

- **3 Shorts dọc render riêng** mỗi tập, không cắt từ video ngang. Với canvas 6000×3400 chỉ là
  đổi viewport và đường máy quay.
- **Chuỗi 3 tập** thiết kế để xem liền, mỗi tập kết bằng câu hỏi tập sau trả lời.
- **Nội dung thường xanh** — một tập tốt tạo doanh thu nhiều năm.

## Affiliate — mức bảo hiểm

2–3 link trong description, có công bố quan hệ theo FTC. **Không đọc thành lời, không chèn đoạn
quảng cáo, không đổi cách chọn chủ đề.**

Vì sao vẫn giữ: doanh thu quảng cáo biến động mạnh theo mùa (Q4 cao, tháng 1 sụt sâu). Affiliate
làm phẳng đường doanh thu, và là thứ còn lại nếu kênh bị hạn chế kiếm tiền.

## Email — mức bảo hiểm

Một link tới bảng tính trong description. Không popup, không kêu gọi trong video.
Danh sách chung cho cả ba kênh. Tài sản duy nhất không phụ thuộc thuật toán.

## Thuế

Việt Nam chưa có hiệp định thuế được phê chuẩn với Mỹ → **khấu trừ 30%** trên doanh thu từ người
xem Mỹ. Hệ số **0,7** vào mọi tính toán. Nộp W-8BEN khi vào YPP, không nộp thì bị khấu trừ tới
24% trên doanh thu **toàn cầu**.
<<<END>>>

<<<FILE: channels/us-personal-finance/persona.md>>>
# Persona

Kênh ẩn danh không có nghĩa là không có nhân dạng. Khán giả cần một *ai đó* để tin, kể cả khi
không thấy mặt.

Kênh tham chiếu có "Anh Ba" — một nhân vật. Ta đã bỏ mascot hoạt hoạ vì lý do đúng, nhưng phải
thay bằng một nhân dạng khác, không được để trống.

## Nguồn uy tín — kênh là bản phân tích, không phải một người

Chiến lược đã chốt: khác biệt đến từ **độ sâu phân tích định lượng**, không từ kinh nghiệm cá
nhân. Nên kênh không có người dẫn. **Kênh là bản phân tích.**

> "We publish the math. Check it yourself."

Giống một ấn phẩm nghiên cứu hơn là một cá nhân. Điều này nhất quán với faceless, nhân bản sang
ba kênh dễ, và không phụ thuộc vào việc ai đó có sống ở Mỹ hay không — **số học trung tính về
văn hoá**.

Ba thứ tạo uy tín, tất cả đều kiểm chứng được công khai:
1. Mỗi tập có **một con số phái sinh chưa ai công bố** — bằng chứng có người tính thật
2. **Bảng tính công khai** kèm mỗi tập — "đây là mô hình, tự kiểm phép tính"
3. **Sổ nguồn 100%** — mọi số truy ngược được về nguồn chính thống

**Cấm:** bịa danh tính, bịa bằng cấp, bịa nơi làm việc, giả làm người Mỹ.

## Bảy thành phần nhân dạng — cần chốt trước Wave 3

| # | Thành phần | Trạng thái | Ghi chú |
|---|---|---|---|
| 1 | **Tên kênh và tên người dẫn** | ⬜ chờ chốt | Tên người dẫn có thể là tên thật hoặc bút danh |
| 2 | **Câu tự giới thiệu một dòng** | ⬜ | Xuất hiện ở M2 mọi tập, không đổi |
| 3 | **Nguồn uy tín** | ✅ | Phân tích kiểm chứng được công khai — không gắn với cá nhân |
| 4 | **Câu mở cố định** | ⬜ | Sau cold open, trước lời hứa |
| 5 | **Câu kết cố định** | ⬜ | Cuối mọi tập, không đổi |
| 6 | **Chữ ký phương pháp** | ✅ | Ma trận ngưỡng ba tầng + quy đổi tiền ra thời gian sống |
| 7 | **Điều từ chối làm** | ✅ | Không khuyến nghị mã cụ thể, không hứa lợi nhuận, không bán khoá học |

Thành phần 7 quan trọng hơn vẻ ngoài của nó: **nói rõ mình từ chối làm gì là cách xây niềm tin
nhanh nhất** trong một ngách đầy người bán khoá học. Nên nêu thẳng trong description mọi tập.

## Giọng — ba đặc trưng cố định

1. **Bình tĩnh, không hò hét.** Không "you won't believe", không đếm ngược, không giọng gấp.
2. **Đứng về phía người xem, chống lại hệ thống.** Không bao giờ chê người xem. Lỗi luôn nằm ở
   cách sản phẩm được thiết kế, ở áp lực xã hội, ở marketing.
3. **Thừa nhận điều mình không biết.** "Số liệu tới tháng này cho thấy X, nhưng nếu Y đổi thì kết
   luận này sai." Đây là thứ phân biệt phân tích với rao giảng.

## ĐÃ CHỐT · Faceless hoàn toàn

Không lộ mặt. Không giọng thật. Không tên thật. Toàn bộ VO là TTS.
Quyết định này **đã đóng**, không mở lại.

Hệ quả: faceless loại bỏ biện pháp chống R1 mạnh nhất là sự hiện diện người thật. Bốn cơ chế
dưới đây thay thế nó, và cả bốn đều **bắt buộc**, không phải tuỳ chọn.

## Bốn cơ chế bù trừ R1 — vẫn giữ nguyên

Kể cả khi có Analyst's Note, bốn cơ chế dưới đây vẫn bắt buộc:

**1. Phân tích dữ liệu gốc.** Mỗi tập có ít nhất một con số tự tính, chưa ai công bố.

**2. Công bố phép tính.** Bảng tính công khai kèm mỗi tập: *"Here's the model. Check my math."*
Đây là cơ chế xây niềm tin mạnh nhất, và gần như không kênh nào làm.

**3. Nguồn uy tín nêu bằng chữ.**
Mục About và description mọi tập: *"Independent quantitative analysis. Every number sourced.
Every model published."* Không nhắc tới bất kỳ cá nhân nào.

**4. Hiện diện thật trong bình luận.** Trả lời 20 bình luận đầu trong 2 giờ, viết tay, không mẫu.

### Bù lại, faceless-mặc-định vẫn giữ được ba lợi thế

- Nhân dạng không phụ thuộc hoàn toàn một cá nhân.
- Không giới hạn nhịp bởi lịch quay — thân bài vẫn sản xuất được không cần anh.
- Người xem tập trung vào lập luận.

## Quyết định còn lại

| # | Quyết định | Trạng thái |
|---|---|---|
| 1 | Tên kênh | ⬜ chờ chốt |
| 2 | Bút danh người dẫn (hoặc không dùng tên, chỉ dùng "I") | ⬜ chờ chốt |
| 3 | Giọng TTS cụ thể — chọn một và **không bao giờ đổi** | ⬜ chờ Wave 3 |
| 4 | Câu mở cố định và câu kết cố định | ⬜ chờ Wave 3 |

Mục 3 quan trọng hơn vẻ ngoài: với kênh faceless, **giọng đọc chính là nhân dạng**. Đổi giọng
giữa chừng tương đương đổi người dẫn chương trình.
<<<END>>>

<<<FILE: channels/us-personal-finance/thesis-bank.md>>>
# Thesis Bank

Kho luận điểm. Đây là **nguồn cung khan hiếm nhất của cả nhà máy** — khan hiếm hơn tiền, hơn thời
gian, hơn năng lực render.

## Vì sao tồn tại

Nhà máy chạy 30 tập/tháng. Gate 1 yêu cầu một luận điểm riêng cho mỗi tập. Nghĩa là 30 góc nhìn
độc đáo mỗi tháng, đều đặn, không nghỉ.

Insight không scale như thời gian. Nếu sản xuất theo lịch mà nạp ý tưởng cũng theo lịch, đến tập
thứ 12 sẽ bắt đầu xuất hiện những thesis kiểu "mua nhà đắt hơn bạn nghĩ" — và đó chính là lúc
kênh trở thành thứ mà bốn biện pháp chống R1 đang cố ngăn.

**Nguyên tắc: nạp liên tục, rút theo lịch.** Bank được nạp khi anh đọc, khi làm nghề, khi nói
chuyện — độc lập hoàn toàn với lịch sản xuất.

## Ràng buộc cứng

> **Không sản xuất khi bank có dưới 15 thesis khả dụng.**

Ràng buộc này ngang hàng với trần ngân sách. Cockpit hiển thị số thesis còn lại; dưới 15 thì
orchestrator ngừng nhận episode mới cho tới khi được nạp thêm.

Lý do: khi bank cạn, áp lực đăng bài sẽ ép anh chấp nhận thesis yếu. Chặn bằng hệ thống thì không
phải dựa vào ý chí.

## Một thesis hợp lệ là gì

Ba điều kiện, thiếu một là không hợp lệ:

1. **Có thể sai.** Là một khẳng định, không phải mô tả chủ đề.
   - Không hợp lệ: "Chi phí thật của việc sở hữu nhà"
   - Hợp lệ: "Với thu nhập dưới 120K, thuê nhà ở phần lớn thị trường Mỹ hiện tạo ra tài sản ròng
     cao hơn mua, và điểm đảo chiều nằm ở tỷ lệ trả trước 20% chứ không phải ở lãi suất"

2. **Định lượng được thành 3 ngưỡng.** Nếu không nghĩ ra được 3 mức có số, đề tài không phù hợp
   với format kênh.

3. **Có người hiểu biết sẽ phản đối.** Đây là bài kiểm quan trọng nhất.
   Nếu không ai phản đối, đó không phải luận điểm — đó là mô tả.

## Bốn dạng luận điểm

Rút từ teardown kênh tham chiếu. Dùng làm khuôn khi bí, nhưng **không được dùng cùng một dạng
hai tập liên tiếp**.

| Dạng | Cấu trúc | Ví dụ |
|---|---|---|
| **Chi phí ẩn** | Thứ ai cũng làm có một khoản chi không ai tính | Bảo trì nhà 1–2%/năm nuốt hết phần lợi từ tăng giá |
| **Đảo chiều ngưỡng** | Lời khuyên phổ biến đúng ở một phía ngưỡng, sai ở phía kia | Trả nợ trước hạn khôn ngoan dưới 6% lãi, dại trên 6% |
| **Nhị phân giả** | Hai lựa chọn ai cũng tranh cãi thực ra không phải hai | Không phải thuê-hay-mua, mà là dòng tiền cố định chiếm bao nhiêu phần thu nhập |
| **Hệ quả trễ** | Quyết định hôm nay có cái giá xuất hiện sau N năm | Vay xe 84 tháng biến khoản trả nhỏ thành tài sản âm suốt 5 năm |

## Cấu trúc một mục trong bank

```yaml
- id: TB-023
  claim: "<1-2 câu, phải có thể sai>"
  contradicts: "<niềm tin mặc định mà nó phản bác>"
  archetype: hidden-cost | threshold-reversal | false-binary | delayed-consequence
  pillar: housing | debt | investing | career-income | retirement | spending-psychology
  thresholds: ["<ngưỡng 1>", "<ngưỡng 2>", "<ngưỡng 3>"]
  provable_by: "<nguồn dữ liệu nào chứng minh hoặc bác bỏ>"
  conviction: high | medium | low
  origin: "<đọc ở đâu / gặp trong việc gì / ai nói>"
  added: YYYY-MM-DD
  used_in: null
```

## Nguồn nạp — theo chiến lược "phân tích dữ liệu, không phải kinh nghiệm cá nhân"

Xếp theo chất lượng, từ tốt nhất:

1. **Mâu thuẫn giữa hai nguồn dữ liệu.** Khi FRED và BLS kể hai câu chuyện khác nhau về cùng
   một thứ, ở đó có một luận điểm — và nó có bằng chứng sẵn.
2. **Câu hỏi nhiều người tìm nhưng chưa ai trả lời bằng số.** Từ pipeline nghiên cứu đối thủ
   (`portfolio/niche-research.md` bước 5). Đây là nguồn chính của chiến lược mới.
3. **Ngưỡng ẩn trong dữ liệu.** Chạy số qua nhiều mức, tìm điểm mà kết luận đảo chiều. Mỗi điểm
   đảo chiều là một thesis dạng threshold-reversal.
4. **Bình luận dưới video.** Câu hỏi lặp lại nhiều lần là bằng chứng trực tiếp về chỗ khán giả
   vướng — và là kênh phát hiện sai lệch văn hoá.
5. **Lịch công bố số liệu vĩ mô.** Biết trước cái gì sắp ra thì chuẩn bị được luận điểm trước.

**Lưu ý:** Gate 1 giờ là **duyệt hoặc bác luận điểm máy đề xuất** (2 phút phán đoán), không
còn là tự viết (5 phút sáng tạo). Máy đề xuất từ nguồn 1–3; người giữ quyền bác.

## Nghi thức nạp

**Mỗi tuần một lần, 30 phút, không gắn với sản xuất.** Mục tiêu 3–5 thesis mới.

Không đạt được 3 thesis trong 30 phút là tín hiệu quan trọng: nghĩa là anh đang tiêu thụ ý tưởng
nhanh hơn tạo ra. Khi đó **giảm nhịp đăng**, không phải hạ chuẩn thesis.

## Chống thoái hoá

| Kiểm tra | Ngưỡng |
|---|---|
| Thesis khả dụng trong bank | ≥ 15, cảnh báo ở 20 |
| Cùng archetype hai tập liên tiếp | Cấm |
| Cùng pillar hai tập liên tiếp | Cấm |
| Thesis `conviction: low` được dùng | Chỉ khi bank > 25 |
| Tuổi thesis khi dùng | Cảnh báo nếu < 3 ngày (viết vội cho kịp lịch) |

Mục cuối đáng chú ý: thesis viết trong ngày sản xuất gần như luôn yếu hơn thesis đã nằm trong
bank vài tuần. Bank tồn tại để tách thời điểm *nghĩ ra* khỏi thời điểm *cần dùng*.
<<<END>>>

<<<FILE: channels/us-personal-finance/thumbnail-spec.md>>>
# Thumbnail Spec

Rút từ quy tắc bất biến của kênh tham chiếu, **đã thay lớp hình ảnh** cho thị trường Mỹ.

## Vì sao không dùng mascot hoạt hoạ

Kênh tham chiếu dùng một nhân vật vẽ 2D lặp lại ở gần như 100% thumbnail. Ở thị trường Mỹ, phong
cách hoạt hoạ vector bão hoà + mặt nhân vật lặp lại + chữ đỏ toàn hoa là dấu hiệu nhận dạng của
nhóm kênh nội dung máy sản xuất hàng loạt. Khán giả Mỹ đọc nó là spam trong nửa giây, và đây cũng
là rủi ro R1 trong sổ rủi ro.

**Giữ lại tính bất biến của khuôn. Thay lớp hình ảnh bằng hệ dữ liệu.**

## Bốn slot cố định

```
┌──────────────────────────────────────────┐
│  SLOT 1: LINE 1 (đen/xanh đậm)           │
│  SLOT 2: RED WORD (đỏ, đúng 1-2 từ)      │
├──────────────────────────────────────────┤
│                                          │
│  SLOT 3: VISUAL                          │
│  (chart đơn giản 2-3 cột / đường /       │
│   ma trận 3 ô — KHÔNG mặt người)         │
│                                          │
│         SLOT 4: PROP + mũi tên đỏ        │
└──────────────────────────────────────────┘
```

## Quy tắc bất biến

| Yếu tố | Quy tắc |
|---|---|
| Chữ | Tối đa 2 dòng, tối đa 6 từ, VIẾT HOA, font đậm nén |
| Từ đỏ | **Đúng một** từ khoá cảm xúc màu đỏ mỗi thumbnail. Không hơn |
| Dấu câu | Kết bằng `?` hoặc `!` |
| Visual | Biểu đồ đơn giản đọc được ở 168×94px. Nếu không đọc được ở cỡ đó thì sai |
| Mũi tên | Một mũi tên đỏ khoanh vào điểm quan trọng nhất |
| Mặt người | Không dùng. Không mascot, không stock portrait |
| Nền | Một màu nền sáng từ palette, không gradient rối |

## Kiểm tra bắt buộc
- [ ] Thu nhỏ về 168×94px vẫn đọc được dòng 1 và từ đỏ
- [ ] Không có yếu tố nào ngoài 4 slot
- [ ] Số liệu trong chart khớp `sources.json`
- [ ] Ba biến thể khác nhau ở **từ đỏ và visual**, không chỉ khác màu
<<<END>>>

<<<FILE: channels/us-personal-finance/title-formulas.md>>>
# Title Formulas

Bảy khuôn rút từ teardown kênh tham chiếu, đã bản địa hoá sang tiếng Anh Mỹ.
Packager sinh 5 tiêu đề mỗi tập, mỗi tiêu đề gắn nhãn `formula` theo `package.schema.json`.

## Nguyên tắc xuyên suốt
**Tiêu đề nói về NGƯỜI XEM, không nói về chủ đề.** Nếu bỏ được chữ "you"/"your" mà câu vẫn tự nhiên,
tiêu đề đó chưa đạt.

| # | Formula | Khuôn | Ví dụ |
|---|---|---|---|
| 1 | `numbered-list` | `{N} {things} that {consequence}` | `6 Expenses That Quietly Eat 40% Of Your Paycheck` |
| 2 | `binary-choice` | `{A} or {B}: Which One Is Actually {loaded adjective}?` | `Renting or Buying: Which One Is Actually The Trap?` |
| 3 | `expose` | `Who's Really {surprising claim}?` / `The Truth About {familiar thing}` | `Who's Actually Faking Being Rich?` |
| 4 | `counter-intuitive-command` | `Got {amount}? Don't {obvious action} Yet` | `Got $100K Saved? Don't Invest It Yet` |
| 5 | `age-or-number-anchor` | `At {age}: Where Do You Actually Stand?` | `At 45, Where Should Your Net Worth Actually Be?` |
| 6 | `geo-compare` | `Why {place A} Beats {place B} For {goal}` | `Why Austin Beats Seattle For Building Wealth` |
| 7 | `trend-hook` | `{Current trend} — {caution}` | `The Pickleball Business Boom — Read This First` |

## Ràng buộc kỹ thuật
- ≤ 100 ký tự, lý tưởng 45–65 để không bị cắt trên mobile.
- Title Case, không viết hoa toàn bộ.
- Tối đa một dấu `?` hoặc `!`.
- Không clickbait sai sự thật: điều tiêu đề hứa phải có trong video (chính sách metadata gây hiểu lầm).
- Không dùng số liệu trong tiêu đề nếu không có claimId tương ứng.
<<<END>>>

<<<FILE: channels/us-personal-finance/topic-map.md>>>
# Topic Map

Bản đồ chủ đề. Signal Scan dùng file này để biết khoảng trống nằm ở đâu.

## Quy tắc chọn đề tài

Một đề tài chỉ hợp lệ nếu **dựng được ma trận ngưỡng 3 tầng bằng số liệu có nguồn**.
Không dựng được → loại, dù chủ đề hấp dẫn đến đâu. Đây là bộ lọc quan trọng nhất.

## Series khởi đầu (12 tập đầu)

| # | Pillar | Câu hỏi | Ngưỡng dự kiến |
|---|---|---|---|
| 1 | housing | Rent or buy in 2026? | Down payment 20%+ / 10–20% / <10% |
| 2 | housing | What does owning actually cost beyond the mortgage? | Chi phí ẩn <2% / 2–4% / >4% giá trị nhà/năm |
| 3 | debt | Which debt do you kill first? | Lãi suất <6% / 6–12% / >12% |
| 4 | debt | Is a car loan ever rational? | Giá xe <35% / 35–60% / >60% thu nhập năm |
| 5 | investing | How much should be in the market vs cash? | Quỹ dự phòng <3 / 3–6 / >6 tháng |
| 6 | investing | What return should you actually expect? | Phí quỹ <0.1% / 0.1–0.5% / >0.5% |
| 7 | career-income | When is switching jobs worth it? | Tăng <10% / 10–20% / >20% |
| 8 | career-income | Is a side hustle worth your hours? | Thu nhập/giờ so với lương chính |
| 9 | retirement | Are you behind at your age? | Bội số thu nhập theo tuổi |
| 10 | retirement | 401k vs Roth vs taxable — which order? | Bậc thuế hiện tại |
| 11 | spending-psychology | How much lifestyle creep is too much? | Tăng chi tiêu so với tăng thu nhập |
| 12 | spending-psychology | What does status actually cost you? | Ego gap tính bằng số tháng làm việc |

## Khoảng trống cần theo dõi
Cập nhật từ `insight.md` sau mỗi 10 tập. Signal Scan đọc mục này.

_(chưa có dữ liệu — điền sau Wave 6)_
<<<END>>>

<<<FILE: channels/us-personal-finance/visual-tokens.json>>>
{
  "channel": "us-personal-finance",
  "note": "Palette và font là THEO KÊNH, không theo genre — để ba kênh không trông giống nhau (rủi ro lan danh mục). Chart grammar và motion rules vẫn ở genres/*/visual-system.md.",
  "palette": {
    "ink": "#12161C",
    "paper": "#F7F5F0",
    "accent": "#D93025",
    "positive": "#1E7A4C",
    "neutral": "#5B6470",
    "highlight": "#E8B93B",
    "surface": "#FFFFFF"
  },
  "typography": {
    "family": "Inter",
    "numeric": "Inter Tight",
    "weights": {
      "title": 800,
      "section": 700,
      "body": 500,
      "caption": 400
    }
  },
  "ttsVoiceId": "<chọn một, KHÔNG BAO GIỜ đổi — với kênh faceless, giọng chính là nhân dạng>",
  "musicMood": "minimal-analytical",
  "lightDirection": "top-left",
  "generatedImageStyle": {
    "prompt_suffix": "<ĐIỀN một cụm phong cách cố định cho kênh này, ví dụ: 'muted editorial illustration, soft grain, cool blue-grey palette'>",
    "note": "Mỗi kênh MỘT phong cách ảnh sinh, không đổi. Ba kênh phải khác nhau rõ rệt — đây là một phần của tách nhận diện chống rủi ro lan danh mục."
  }
}
<<<END>>>

<<<FILE: config/secrets.example.md>>>
# Secrets

**File này chỉ liệt kê TÊN secret. Không bao giờ chứa giá trị.**

Khai ở: repo → Settings → Secrets and variables → Actions → New repository secret.

| Tên | Dùng cho | Stage |
|---|---|---|
| `LLM_API_KEY` | Research, fact-check, script, storyboard, packaging | S04–S09, S14a |
| `TTS_API_KEY` | Sinh voice-over | S10 |
| `ASR_API_KEY` | Căn chỉnh timestamp | S10 |
| `IMAGE_API_KEY` | Sinh ảnh nền | S11 |
| `STOCK_API_KEY` | Kéo stock photo/video | S11 |
| `YOUTUBE_CLIENT_ID` | OAuth YouTube | S14b–S14c |
| `YOUTUBE_CLIENT_SECRET` | OAuth YouTube | S14b–S14c |
| `YOUTUBE_REFRESH_TOKEN` | OAuth YouTube | S14b–S14c |

## PAT cho cockpit (KHÔNG khai ở đây)

Cockpit chạy trong trình duyệt nên không đọc được Actions Secrets. Anh nhập PAT trực tiếp vào ô
Settings của trang. Yêu cầu:
- Loại: **fine-grained personal access token**
- Repository access: **chỉ `meridian-studio`**
- Permissions: `Contents: Read and write`, `Actions: Read and write`
- Expiration: tối đa **30 ngày**

Xem R3 trong `engine/docs/06-risk-register.md`.

## Quy tắc
1. Không secret nào xuất hiện trong code, log, artifact, hay mô tả PR.
2. Xoay khoá theo quy trình trong `engine/docs/05-runbook.md`.
3. Nghi ngờ lộ → thu hồi trước, điều tra sau.
<<<END>>>

<<<FILE: engine/app/loader.html>>>
<!-- Dán MỘT LẦN vào ChatGPT Sites. Sau đó không bao giờ dán lại. -->
<!-- Mọi thay đổi UI về sau chỉ là commit app/cockpit.js lên GitHub. -->
<div id="meridian-root">
  <div id="meridian-gate" style="font-family:system-ui;max-width:420px;margin:64px auto;padding:24px">
    <h2 style="margin:0 0 8px">Meridian Cockpit</h2>
    <p style="color:#5B6470;font-size:14px;margin:0 0 16px">
      Nhập fine-grained PAT (chỉ repo meridian-studio, quyền Contents + Actions).
      Token chỉ nằm trong phiên trình duyệt này.
    </p>
    <input id="meridian-pat" type="password" placeholder="github_pat_..."
           style="width:100%;padding:10px;border:1px solid #5B6470;border-radius:6px;font-size:14px">
    <button id="meridian-go"
            style="margin-top:12px;width:100%;padding:10px;border:0;border-radius:6px;
                   background:#12161C;color:#F7F5F0;font-size:14px;cursor:pointer">
      Mở cockpit
    </button>
    <pre id="meridian-err" style="color:#D93025;font-size:12px;white-space:pre-wrap;margin-top:12px"></pre>
  </div>
</div>

<script>
(function () {
  var OWNER = "REPLACE_OWNER";      // <-- điền username GitHub
  var REPO  = "meridian-studio";
  var PATH  = "app/cockpit.js";
  var BRANCH = "main";

  var err = document.getElementById("meridian-err");

  document.getElementById("meridian-go").onclick = function () {
    var pat = document.getElementById("meridian-pat").value.trim();
    if (!pat) { err.textContent = "Chưa nhập token."; return; }
    err.textContent = "Đang tải cockpit...";

    var url = "https://api.github.com/repos/" + OWNER + "/" + REPO +
              "/contents/" + PATH + "?ref=" + BRANCH + "&t=" + Date.now();

    fetch(url, {
      headers: {
        Authorization: "Bearer " + pat,
        Accept: "application/vnd.github.v3+json"
      }
    })
    .then(function (r) {
      if (!r.ok) throw new Error("GitHub API " + r.status + " — kiểm tra token và quyền repo.");
      return r.json();
    })
    .then(function (j) {
      var code = decodeURIComponent(escape(atob(j.content.replace(/\n/g, ""))));
      window.MERIDIAN_PAT = pat;
      window.MERIDIAN_CFG = { owner: OWNER, repo: REPO, branch: BRANCH };
      // Cách 1: Function constructor
      try {
        new Function(code)();
        return;
      } catch (e1) {
        // Cách 2: chèn thẻ script inline
        var s = document.createElement("script");
        s.textContent = code;
        document.body.appendChild(s);
      }
    })
    .catch(function (e) {
      err.textContent =
        "LỖI: " + e.message +
        "\n\nNếu lỗi nhắc tới Content Security Policy hoặc 'unsafe-eval', " +
        "nghĩa là ChatGPT Sites chặn nạp mã động. Chuyển sang Phương án B (iframe -> GitHub Pages).";
    });
  };
})();
</script>
<<<END>>>

<<<FILE: engine/contracts/README.md>>>
# Contracts

Xương sống của hệ thống. Mỗi artifact có đúng một schema ở đây.

## Quy tắc

1. **Agent KHÔNG được sửa bất cứ file nào trong thư mục này.** Thấy schema sai thì nêu trong mô tả
   PR và dừng lại.
2. Đổi schema chỉ qua ADR mới do chủ dự án viết.
3. Mọi stage phải validate input trước khi xử lý và validate output trước khi ghi.
4. Schema dùng JSON Schema draft 2020-12.

## Ánh xạ stage ↔ artifact

| Stage | Artifact | Schema |
|---|---|---|
| S01–S02 | `signals.json`, `topics.ranked.json` | `signals.schema.json` |
| S03 Gate 1 | `00-brief.json` | `brief.schema.json` |
| S04 | `01-dossier.md`, `01-sources.json` | `sources.schema.json` |
| S05 | `02-factcheck.json` | `factcheck.schema.json` |
| S06 | `03-outline.json` | `outline.schema.json` |
| S07 | `04-script.md` + front-matter | `script.schema.json` |
| S09 | `05-storyboard.json` | `storyboard.schema.json` |
| S10 | `06-timing.json` | `timing.schema.json` |
| S12 | `07-render-manifest.json` | `render-manifest.schema.json` |
| S14a | `08-package.json` | `package.schema.json` |
| S14b | `08-publication.json` | `publication.schema.json` |
| S14c | `09-metrics.json` | `metrics.schema.json` |
| Toàn cục | `pipeline/state.json` | `pipeline-state.schema.json` |
<<<END>>>

<<<FILE: engine/contracts/brief.schema.json>>>
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "meridian/brief.schema.json",
  "title": "Brief",
  "description": "Đề tài đã chốt ở Gate 1. thesis BẮT BUỘC do người viết.",
  "type": "object",
  "required": [
    "episodeId",
    "topic",
    "thesis",
    "thesisId",
    "thesisArchetype",
    "pillar",
    "audience",
    "targetDurationMin",
    "createdBy",
    "proposedBy",
    "workingTitle",
    "noveltyCheck",
    "versions"
  ],
  "additionalProperties": false,
  "properties": {
    "episodeId": {
      "type": "string",
      "pattern": "^[0-9]{4}-[0-9]{2}-[a-z0-9-]+$"
    },
    "topic": {
      "type": "string",
      "minLength": 10,
      "maxLength": 200
    },
    "thesis": {
      "type": "string",
      "minLength": 40,
      "maxLength": 500,
      "description": "1-2 câu luận điểm riêng. Không được sinh tự động."
    },
    "pillar": {
      "type": "string",
      "enum": [
        "housing",
        "debt",
        "investing",
        "career-income",
        "retirement",
        "spending-psychology"
      ]
    },
    "audience": {
      "type": "object",
      "required": [
        "ageRange",
        "householdIncomeUsd",
        "decisionContext"
      ],
      "properties": {
        "ageRange": {
          "type": "string"
        },
        "householdIncomeUsd": {
          "type": "string"
        },
        "decisionContext": {
          "type": "string"
        }
      }
    },
    "targetDurationMin": {
      "type": "integer",
      "minimum": 8,
      "maximum": 25
    },
    "thresholdMatrixHypothesis": {
      "type": "string",
      "description": "Dự kiến 3 ngưỡng định lượng sẽ dùng. Nếu không nghĩ ra được, đề tài không phù hợp."
    },
    "createdBy": {
      "type": "string",
      "enum": [
        "human"
      ],
      "description": "Người DUYỆT. Máy đề xuất, người giữ quyền bác."
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    },
    "thesisId": {
      "type": "string",
      "pattern": "^TB-[0-9]{3}$",
      "description": "ID từ thesis-bank. Máy nạp từ nguồn dữ liệu; người không tự viết trong ngày sản xuất."
    },
    "thesisArchetype": {
      "type": "string",
      "enum": [
        "hidden-cost",
        "threshold-reversal",
        "false-binary",
        "delayed-consequence"
      ],
      "description": "Không được trùng archetype với tập liền trước."
    },
    "versions": {
      "type": "object",
      "description": "Đóng băng phiên bản lúc bắt đầu. Xem engine/docs/13-upgrade-safety.md.",
      "required": [
        "engine",
        "genre",
        "channel"
      ],
      "properties": {
        "engine": {
          "type": "string"
        },
        "genre": {
          "type": "string"
        },
        "channel": {
          "type": "string"
        },
        "prompts": {
          "type": "object"
        }
      }
    },
    "workingTitle": {
      "type": "string",
      "maxLength": 100,
      "description": "Viết tiêu đề NGAY ở Gate 1. Chưa viết được tiêu đề hấp dẫn thì thesis chưa đủ sắc — bắt lỗi ở đây tốn 0 USD thay vì 35."
    },
    "noveltyCheck": {
      "type": "object",
      "required": [
        "videosChecked",
        "contradicts",
        "verdict"
      ],
      "description": "Luận điểm phải mâu thuẫn với >=3 trong 5 video đã có. Không mâu thuẫn với gì nghĩa là không có gì mới.",
      "properties": {
        "videosChecked": {
          "type": "integer",
          "minimum": 5
        },
        "contradicts": {
          "type": "integer",
          "minimum": 3
        },
        "duplicateRisk": {
          "type": "string",
          "enum": [
            "none",
            "similar",
            "duplicate"
          ],
          "description": "duplicate thì LOẠI — không sản xuất bản sao của video đã có"
        },
        "verdict": {
          "type": "string",
          "enum": [
            "pass",
            "fail"
          ]
        }
      }
    },
    "rpmTier": {
      "type": "string",
      "enum": [
        "highest",
        "high",
        "medium",
        "low"
      ],
      "description": "low thì cần lý do đặc biệt mới duyệt"
    },
    "evergreenScore": {
      "type": "integer",
      "minimum": 1,
      "maximum": 5,
      "description": "Tuổi thọ nội dung. 1 = bám tin, 5 = thường xanh nhiều năm."
    },
    "explorationEpisode": {
      "type": "boolean",
      "description": "20% số tập cố ý đi ngược thứ dữ liệu nói là tốt nhất."
    },
    "proposedBy": {
      "type": "string",
      "enum": [
        "machine",
        "human"
      ],
      "description": "Ai đề xuất thesis. Chiến lược mới: mặc định machine."
    },
    "formatVariant": {
      "type": "string",
      "description": "Biến thể format cho A/B ở giai đoạn 1b: ví dụ cold-open-stat, matrix-at-5min, short-12min. Mặc định 'baseline'."
    }
  }
}
<<<END>>>

<<<FILE: engine/contracts/factcheck.schema.json>>>
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "meridian/factcheck.schema.json",
  "title": "Fact-check Report",
  "description": "Kết quả đối chất. Có bất kỳ mục nào status=red thì pipeline PHẢI dừng.",
  "type": "object",
  "required": ["episodeId", "verdict", "findings"],
  "properties": {
    "episodeId": { "type": "string" },
    "verdict": { "type": "string", "enum": ["pass", "warn", "block"] },
    "findings": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["claimId", "status", "reason"],
        "properties": {
          "claimId": { "type": "string" },
          "status": { "type": "string", "enum": ["green", "yellow", "red"] },
          "reason": { "type": "string" },
          "ymylRisk": {
            "type": "string",
            "enum": ["none", "advice-like", "guarantee-like", "prohibited"],
            "description": "advice-like trở lên phải viết lại câu đó"
          },
          "suggestedRewrite": { "type": "string" }
        }
      }
    }
  }
}
<<<END>>>

<<<FILE: engine/contracts/metrics.schema.json>>>
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "meridian/metrics.schema.json",
  "title": "Metrics",
  "type": "object",
  "required": ["episodeId", "snapshots"],
  "properties": {
    "episodeId": { "type": "string" },
    "snapshots": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["checkpoint", "views", "ctr", "avgViewDurationSec"],
        "properties": {
          "checkpoint": { "type": "string", "enum": ["48h", "7d", "28d"] },
          "views": { "type": "integer" },
          "impressions": { "type": "integer" },
          "ctr": { "type": "number" },
          "avgViewDurationSec": { "type": "integer" },
          "retention30s": { "type": "number" },
          "retention50pct": { "type": "number" },
          "subsGained": { "type": "integer" },
          "rpmUsd": { "type": "number" },
          "collectedAt": { "type": "string", "format": "date-time" }
        }
      }
    }
  }
}
<<<END>>>

<<<FILE: engine/contracts/outline.schema.json>>>
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "meridian/outline.schema.json",
  "title": "Narrative Outline",
  "description": "Phải khớp 7 mốc cấu trúc trong genres/data-explainer/format-spec.json.",
  "type": "object",
  "required": [
    "episodeId",
    "coldOpen",
    "promise",
    "beats",
    "twoRoads",
    "closingLoop"
  ],
  "properties": {
    "episodeId": {
      "type": "string"
    },
    "coldOpen": {
      "type": "object",
      "required": [
        "character",
        "timestamp",
        "concreteNumber",
        "text"
      ],
      "properties": {
        "character": {
          "type": "string",
          "description": "Tên riêng, tuổi, nghề, thu nhập"
        },
        "timestamp": {
          "type": "string",
          "description": "Giờ cụ thể, ví dụ 2:45 AM"
        },
        "concreteNumber": {
          "type": "string"
        },
        "text": {
          "type": "string",
          "maxLength": 600
        }
      }
    },
    "promise": {
      "type": "object",
      "required": [
        "openLoop"
      ],
      "properties": {
        "openLoop": {
          "type": "string",
          "description": "Điều sẽ tiết lộ ở cuối video"
        }
      }
    },
    "beats": {
      "type": "array",
      "minItems": 5,
      "maxItems": 8,
      "items": {
        "type": "object",
        "required": [
          "index",
          "title",
          "purpose",
          "curiosityBridge"
        ],
        "properties": {
          "index": {
            "type": "integer"
          },
          "title": {
            "type": "string"
          },
          "purpose": {
            "type": "string"
          },
          "devices": {
            "type": "array",
            "items": {
              "type": "string",
              "enum": [
                "named-character",
                "money-to-time",
                "threshold-matrix",
                "absolve-viewer",
                "two-roads",
                "lexicon"
              ]
            }
          },
          "chartSlots": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "curiosityBridge": {
            "type": "string",
            "description": "Câu nối sang beat sau. Cấm kết trung tính."
          }
        }
      }
    },
    "midCTA": {
      "type": "object",
      "properties": {
        "afterBeatIndex": {
          "type": "integer"
        },
        "text": {
          "type": "string"
        }
      }
    },
    "thresholdMatrix": {
      "type": "object",
      "required": [
        "tiers"
      ],
      "properties": {
        "tiers": {
          "type": "array",
          "minItems": 3,
          "maxItems": 3,
          "items": {
            "type": "object",
            "required": [
              "label",
              "condition",
              "monthlyNumber",
              "verdict"
            ],
            "properties": {
              "label": {
                "type": "string"
              },
              "condition": {
                "type": "string"
              },
              "monthlyNumber": {
                "type": "string"
              },
              "verdict": {
                "type": "string"
              },
              "claimIds": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    "twoRoads": {
      "type": "object",
      "required": [
        "years",
        "personA",
        "personB"
      ],
      "properties": {
        "years": {
          "type": "integer"
        },
        "personA": {
          "type": "string"
        },
        "personB": {
          "type": "string"
        }
      }
    },
    "hardRules": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Quy tắc thép người xem mang về"
    },
    "closingLoop": {
      "type": "string",
      "description": "Quay lại đúng nhân vật của cold open"
    },
    "adBreaks": {
      "type": "array",
      "description": "Điểm chèn quảng cáo, sinh TỰ ĐỘNG từ curiosityBridge ở ranh giới beat. Tác động 30-50% doanh thu quảng cáo mỗi tập.",
      "items": {
        "type": "object",
        "required": [
          "adBreakMs",
          "afterBeatIndex"
        ],
        "properties": {
          "adBreakMs": {
            "type": "integer"
          },
          "afterBeatIndex": {
            "type": "integer"
          },
          "bridgeText": {
            "type": "string"
          }
        }
      }
    }
  }
}
<<<END>>>

<<<FILE: engine/contracts/package.schema.json>>>
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "meridian/package.schema.json",
  "title": "Packaging",
  "type": "object",
  "required": [
    "episodeId",
    "titles",
    "thumbnails",
    "description",
    "chapters"
  ],
  "properties": {
    "episodeId": {
      "type": "string"
    },
    "titles": {
      "type": "array",
      "minItems": 5,
      "maxItems": 5,
      "items": {
        "type": "object",
        "required": [
          "text",
          "formula"
        ],
        "properties": {
          "text": {
            "type": "string",
            "maxLength": 100
          },
          "formula": {
            "type": "string",
            "enum": [
              "numbered-list",
              "binary-choice",
              "expose",
              "counter-intuitive-command",
              "age-or-number-anchor",
              "geo-compare",
              "trend-hook"
            ]
          }
        }
      }
    },
    "thumbnails": {
      "type": "array",
      "minItems": 3,
      "maxItems": 3,
      "items": {
        "type": "object",
        "required": [
          "file",
          "line1",
          "redWord"
        ],
        "properties": {
          "file": {
            "type": "string"
          },
          "line1": {
            "type": "string"
          },
          "line2": {
            "type": "string"
          },
          "redWord": {
            "type": "string",
            "description": "Đúng một từ khoá cảm xúc màu đỏ"
          },
          "prop": {
            "type": "string"
          }
        }
      }
    },
    "description": {
      "type": "string",
      "maxLength": 5000
    },
    "sourcesBlock": {
      "type": "string",
      "description": "Danh sách nguồn dán vào description"
    },
    "disclaimer": {
      "type": "string"
    },
    "chapters": {
      "type": "array",
      "items": {
        "type": "object",
        "required": [
          "startMs",
          "title"
        ],
        "properties": {
          "startMs": {
            "type": "integer"
          },
          "title": {
            "type": "string"
          }
        }
      }
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "shorts": {
      "type": "array",
      "minItems": 3,
      "maxItems": 3,
      "description": "3 Shorts RENDER DỌC RIÊNG từ canvas, không cắt từ video ngang. Chỉ đổi viewport và đường máy quay.",
      "items": {
        "type": "object",
        "required": [
          "file",
          "sourceBeatIndex",
          "durationSec"
        ],
        "properties": {
          "file": {
            "type": "string"
          },
          "sourceBeatIndex": {
            "type": "integer"
          },
          "durationSec": {
            "type": "integer",
            "minimum": 30,
            "maximum": 50
          },
          "renderedVertical": {
            "type": "boolean",
            "const": true
          }
        }
      }
    },
    "affiliateLinks": {
      "type": "array",
      "maxItems": 3,
      "description": "Mức bảo hiểm: chỉ trong description, có công bố FTC. Không đọc thành lời.",
      "items": {
        "type": "object",
        "properties": {
          "label": {
            "type": "string"
          },
          "url": {
            "type": "string"
          },
          "ftcDisclosure": {
            "type": "boolean",
            "const": true
          }
        }
      }
    },
    "modelSpreadsheetUrl": {
      "type": "string",
      "description": "Link bảng tính công khai. Bằng chứng công sức người + lead magnet."
    }
  }
}
<<<END>>>

<<<FILE: engine/contracts/pipeline-state.schema.json>>>
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "meridian/pipeline-state.schema.json",
  "title": "Pipeline State",
  "type": "object",
  "required": [
    "updatedAt",
    "episodes"
  ],
  "properties": {
    "updatedAt": {
      "type": "string",
      "format": "date-time"
    },
    "monthlySpendUsd": {
      "type": "number"
    },
    "episodes": {
      "type": "array",
      "items": {
        "type": "object",
        "required": [
          "episodeId",
          "stage",
          "status"
        ],
        "properties": {
          "episodeId": {
            "type": "string"
          },
          "title": {
            "type": "string"
          },
          "stage": {
            "type": "string",
            "enum": [
              "S01",
              "S02",
              "S03",
              "S04",
              "S05",
              "S06",
              "S07",
              "S08",
              "S09",
              "S09.5",
              "S10",
              "S11",
              "S11.5",
              "S12",
              "S13",
              "S14a",
              "S14b",
              "S14c",
              "S14d",
              "done"
            ]
          },
          "status": {
            "type": "string",
            "enum": [
              "idle",
              "running",
              "awaiting-gate",
              "blocked",
              "failed",
              "done"
            ]
          },
          "mode": {
            "type": "string",
            "enum": [
              "standard",
              "fast-lane"
            ]
          },
          "spendUsd": {
            "type": "number"
          },
          "flags": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "lastRunUrl": {
            "type": "string"
          },
          "staleFrom": {
            "type": "string"
          },
          "retryCount": {
            "type": "object",
            "description": "Số lần retry theo stage. Chạm 3 thì dừng, chuyển Gate người.",
            "additionalProperties": {
              "type": "integer",
              "maximum": 3
            }
          },
          "rootCauseStage": {
            "type": "string",
            "description": "Stage gây ra lỗi. Pipeline chạy lại TỪ ĐÂY, không phải từ stage kề trước."
          }
        }
      }
    },
    "firstPassYield": {
      "type": "object",
      "description": "FPY theo stage. Dưới 0.7 = đặc tả sai, phải viết lại, không phải retry.",
      "additionalProperties": {
        "type": "number",
        "minimum": 0,
        "maximum": 1
      }
    },
    "thesisBankCount": {
      "type": "integer",
      "minimum": 15,
      "description": "Số thesis khả dụng. Dưới 15 thì orchestrator ngừng nhận episode mới."
    },
    "distributionPhase": {
      "type": "string",
      "enum": [
        "phase-0",
        "phase-1",
        "phase-2"
      ],
      "description": "phase-0: 0-100 sub, đề tài hẹp, 3 tập/tuần. phase-1: 100-1000. phase-2: 1000+, mở nhịp 7/tuần."
    },
    "channels": {
      "type": "object",
      "description": "Trạng thái theo kênh. Thay cho danh sách episode phẳng khi có nhiều kênh.",
      "additionalProperties": {
        "type": "object",
        "properties": {
          "genre": {
            "type": "string"
          },
          "engineVersion": {
            "type": "string"
          },
          "distributionPhase": {
            "type": "string",
            "enum": [
              "phase-0",
              "phase-1",
              "phase-2"
            ]
          },
          "thesisBankCount": {
            "type": "integer",
            "minimum": 15
          },
          "explorationRatio": {
            "type": "number",
            "minimum": 0.18,
            "maximum": 0.25,
            "description": "20% tập cố ý đi ngược dữ liệu"
          },
          "monthlySpendUsd": {
            "type": "number"
          }
        }
      }
    },
    "portfolioSpendUsd": {
      "type": "number",
      "description": "Tổng chi phí cả danh mục. Chạm trần thì dừng kênh yếu nhất, không cắt đều."
    }
  }
}
<<<END>>>

<<<FILE: engine/contracts/publication.schema.json>>>
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "meridian/publication.schema.json",
  "title": "Publication",
  "type": "object",
  "required": ["episodeId", "videoId", "privacyStatus"],
  "properties": {
    "episodeId": { "type": "string" },
    "videoId": { "type": "string" },
    "privacyStatus": { "type": "string", "enum": ["private", "unlisted", "public"] },
    "chosenTitle": { "type": "string" },
    "chosenThumbnail": { "type": "string" },
    "scheduledAt": { "type": "string", "format": "date-time" },
    "publishedAt": { "type": "string", "format": "date-time" },
    "playlistId": { "type": "string" },
    "aiDisclosure": { "type": "boolean", "description": "Khai báo nội dung tổng hợp theo quy định YouTube" },
    "quotaUnitsUsed": { "type": "integer" }
  }
}
<<<END>>>

<<<FILE: engine/contracts/render-manifest.schema.json>>>
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "meridian/render-manifest.schema.json",
  "title": "Render Manifest",
  "type": "object",
  "required": [
    "episodeId",
    "chunks",
    "output"
  ],
  "properties": {
    "episodeId": {
      "type": "string"
    },
    "chunks": {
      "type": "array",
      "description": "Nhóm scene render song song trong Actions matrix.",
      "items": {
        "type": "object",
        "required": [
          "chunkId",
          "sceneIds"
        ],
        "properties": {
          "chunkId": {
            "type": "string"
          },
          "sceneIds": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "status": {
            "type": "string",
            "enum": [
              "pending",
              "rendering",
              "done",
              "failed"
            ]
          },
          "artifactUrl": {
            "type": "string"
          }
        }
      }
    },
    "output": {
      "type": "object",
      "required": [
        "width",
        "height",
        "fps"
      ],
      "properties": {
        "width": {
          "type": "integer",
          "const": 1920
        },
        "height": {
          "type": "integer",
          "const": 1080
        },
        "fps": {
          "type": "integer",
          "const": 30
        },
        "releaseTag": {
          "type": "string",
          "pattern": "^ep/"
        },
        "assetUrl": {
          "type": "string"
        }
      }
    },
    "qa": {
      "type": "object",
      "properties": {
        "durationMs": {
          "type": "integer"
        },
        "loudnessLufs": {
          "type": "number"
        },
        "captionDriftMaxMs": {
          "type": "integer",
          "maximum": 200
        },
        "blackFrames": {
          "type": "integer",
          "maximum": 0
        },
        "safeAreaViolations": {
          "type": "integer",
          "maximum": 0
        },
        "verdict": {
          "type": "string",
          "enum": [
            "pass",
            "fail"
          ]
        },
        "visualScore": {
          "type": "object",
          "required": [
            "sampled",
            "passed"
          ],
          "properties": {
            "sampled": {
              "type": "integer",
              "const": 10
            },
            "passed": {
              "type": "integer",
              "minimum": 8,
              "description": "Dưới 8/10 thì verdict phải là fail."
            },
            "failures": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "frameMs": {
                    "type": "integer"
                  },
                  "reason": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "motionScore": {
          "type": "object",
          "required": [
            "powerpointTest",
            "threeSecondTest",
            "mutedTest",
            "onScreenWordRatio"
          ],
          "properties": {
            "powerpointTest": {
              "type": "string",
              "enum": [
                "pass",
                "fail"
              ]
            },
            "threeSecondTest": {
              "type": "object",
              "properties": {
                "windowsSampled": {
                  "type": "integer",
                  "const": 5
                },
                "withMotion": {
                  "type": "integer",
                  "minimum": 5
                },
                "withCameraMove": {
                  "type": "integer",
                  "minimum": 2
                }
              }
            },
            "mutedTest": {
              "type": "string",
              "enum": [
                "pass",
                "fail"
              ]
            },
            "onScreenWordRatio": {
              "type": "number",
              "maximum": 0.22
            },
            "staticFrameMaxMs": {
              "type": "integer",
              "maximum": 400
            },
            "durationStdDevRatio": {
              "type": "number",
              "minimum": 0.4,
              "description": "Độ lệch chuẩn thời lượng scene / trung bình. Dưới 0.4 là nhịp đều như slide."
            },
            "shotSizeMix": {
              "type": "object",
              "properties": {
                "wide": {
                  "type": "number"
                },
                "medium": {
                  "type": "number"
                },
                "close": {
                  "type": "number"
                }
              }
            }
          }
        },
        "rootCauseStage": {
          "type": "string",
          "description": "Bắt buộc khi verdict=fail. Pipeline chạy lại từ stage này."
        },
        "soundScore": {
          "type": "object",
          "properties": {
            "sfxSyncMaxDriftMs": {
              "type": "integer",
              "maximum": 60
            },
            "sfxDensity": {
              "type": "number",
              "minimum": 0.3,
              "maximum": 0.4
            },
            "silenceBeforeKeyNumber": {
              "type": "boolean",
              "const": true
            },
            "musicLufs": {
              "type": "number",
              "maximum": -20
            }
          }
        }
      }
    },
    "proofRender": {
      "type": "object",
      "description": "S11.5 — 12 ảnh tĩnh + 1 clip 15 giây. BẮT BUỘC pass trước khi render đầy đủ.",
      "required": [
        "stills",
        "clipSec",
        "verdict"
      ],
      "properties": {
        "stills": {
          "type": "integer",
          "const": 12
        },
        "clipSec": {
          "type": "integer",
          "const": 15
        },
        "visualScore": {
          "type": "object",
          "properties": {
            "sampled": {
              "type": "integer"
            },
            "passed": {
              "type": "integer"
            }
          }
        },
        "verdict": {
          "type": "string",
          "enum": [
            "pass",
            "fail"
          ]
        },
        "rootCauseStage": {
          "type": "string"
        }
      }
    }
  }
}
<<<END>>>

<<<FILE: engine/contracts/script.schema.json>>>
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "meridian/script.schema.json",
  "title": "Script front-matter",
  "description": "Metadata của 04-script.md. Thân bài là markdown, mỗi câu một dòng.",
  "type": "object",
  "required": ["episodeId", "language", "wordCount", "devicesUsed", "lexiconUsed", "segments"],
  "properties": {
    "episodeId": { "type": "string" },
    "language": { "type": "string", "const": "en-US" },
    "wordCount": { "type": "integer", "minimum": 1200 },
    "devicesUsed": {
      "type": "array",
      "minItems": 6,
      "items": { "type": "string", "enum": ["named-character", "money-to-time", "threshold-matrix", "absolve-viewer", "two-roads", "lexicon"] },
      "description": "Bắt buộc đủ cả 6 thiết bị."
    },
    "lexiconUsed": { "type": "array", "minItems": 3, "items": { "type": "string" } },
    "segments": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["segmentId", "beatIndex", "text"],
        "properties": {
          "segmentId": { "type": "string" },
          "beatIndex": { "type": "integer" },
          "text": { "type": "string" },
          "ssml": { "type": "string" },
          "claimIds": { "type": "array", "items": { "type": "string" } }
        }
      }
    }
  }
}
<<<END>>>

<<<FILE: engine/contracts/signals.schema.json>>>
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "meridian/signals.schema.json",
  "title": "Signals and Ranked Topics",
  "type": "object",
  "required": ["generatedAt", "signals"],
  "properties": {
    "generatedAt": { "type": "string", "format": "date-time" },
    "signals": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["signalId", "text", "origin", "sourceUrl"],
        "properties": {
          "signalId": { "type": "string" },
          "text": { "type": "string" },
          "origin": { "type": "string", "enum": ["macro-release", "search-trend", "competitor-gap", "own-insight"] },
          "sourceUrl": { "type": "string", "format": "uri" },
          "freshnessDays": { "type": "integer" }
        }
      }
    },
    "ranked": {
      "type": "array",
      "maxItems": 5,
      "items": {
        "type": "object",
        "required": ["topic", "score", "rationale", "thresholdMatrixFeasible"],
        "properties": {
          "topic": { "type": "string" },
          "score": { "type": "number", "minimum": 0, "maximum": 100 },
          "demand": { "type": "number" },
          "saturation": { "type": "number" },
          "bibleFit": { "type": "number" },
          "thresholdMatrixFeasible": { "type": "boolean", "description": "false thì loại — không dựng được ma trận ngưỡng" },
          "rationale": { "type": "string" }
        }
      }
    }
  }
}
<<<END>>>

<<<FILE: engine/contracts/sources.schema.json>>>
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "meridian/sources.schema.json",
  "title": "Source Ledger",
  "description": "Sổ nguồn. Mỗi claim số liệu phải có một mục ở đây. 100% bắt buộc.",
  "type": "object",
  "required": ["episodeId", "claims"],
  "properties": {
    "episodeId": { "type": "string" },
    "claims": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["claimId", "statement", "value", "sourceUrl", "publisher", "retrievedAt"],
        "additionalProperties": false,
        "properties": {
          "claimId": { "type": "string", "pattern": "^C[0-9]{3}$" },
          "statement": { "type": "string" },
          "value": { "type": "string", "description": "Con số hoặc dữ kiện dạng chuỗi, giữ nguyên đơn vị gốc" },
          "sourceUrl": { "type": "string", "format": "uri" },
          "publisher": { "type": "string", "enum": ["FRED", "BLS", "Census", "IRS", "FreddieMac", "FDIC", "CFPB", "SSA", "Other"] },
          "seriesId": { "type": "string" },
          "asOfDate": { "type": "string", "format": "date" },
          "retrievedAt": { "type": "string", "format": "date-time" },
          "notes": { "type": "string" }
        }
      }
    }
  }
}
<<<END>>>

<<<FILE: engine/contracts/storyboard.schema.json>>>
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "meridian/storyboard.schema.json",
  "title": "Storyboard",
  "type": "object",
  "required": [
    "episodeId",
    "scenes",
    "selfCheck"
  ],
  "properties": {
    "episodeId": {
      "type": "string"
    },
    "scenes": {
      "type": "array",
      "minItems": 20,
      "items": {
        "type": "object",
        "required": [
          "sceneId",
          "segmentId",
          "layout",
          "durationMs",
          "camera",
          "shotSize",
          "continuity"
        ],
        "additionalProperties": false,
        "properties": {
          "sceneId": {
            "type": "string",
            "pattern": "^S[0-9]{4}$"
          },
          "segmentId": {
            "type": "string"
          },
          "layout": {
            "type": "string",
            "description": "ID layout. Danh sách hợp lệ nằm ở genres/{genre}/layouts.json — KHÔNG hardcode trong contract vì đó là giả định về thể loại."
          },
          "durationMs": {
            "type": "integer",
            "minimum": 1200,
            "description": "Tính từ số từ VO: (số từ / 2.6) giây. Scene có số liệu tối thiểu 3500ms."
          },
          "data": {
            "type": "object",
            "description": "Props cho Remotion. Số liệu phải trích từ sources.json."
          },
          "claimIds": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "assets": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "assetId",
                "kind",
                "license"
              ],
              "properties": {
                "assetId": {
                  "type": "string"
                },
                "kind": {
                  "type": "string",
                  "enum": [
                    "stock-photo",
                    "stock-video",
                    "generated-image",
                    "own-footage"
                  ]
                },
                "query": {
                  "type": "string"
                },
                "license": {
                  "type": "string",
                  "description": "Bắt buộc. Không có license thì không dùng."
                }
              }
            }
          },
          "layoutVariant": {
            "type": "string",
            "enum": [
              "a",
              "b",
              "c"
            ],
            "description": "Biến thể bố cục, chống lặp. Không dùng cùng layout+variant 2 lần liên tiếp."
          },
          "camera": {
            "type": "object",
            "description": "Vị trí máy quay trên canvas liên tục. Bắt buộc — không có camera thì là slide.",
            "required": [
              "x",
              "y",
              "scale",
              "move"
            ],
            "properties": {
              "x": {
                "type": "number",
                "description": "Toạ độ tâm khung trên canvas 6000x3400"
              },
              "y": {
                "type": "number"
              },
              "scale": {
                "type": "number",
                "minimum": 0.4,
                "maximum": 3.0
              },
              "move": {
                "type": "string",
                "enum": [
                  "hold-drift",
                  "pan",
                  "dolly-in",
                  "dolly-out",
                  "arc"
                ],
                "description": "hold-drift vẫn phải trôi 8-20px/s. Không có trạng thái đứng yên tuyệt đối."
              },
              "easing": {
                "type": "string",
                "const": "cubic-bezier(0.22,1,0.36,1)"
              },
              "overshoot": {
                "type": "boolean",
                "description": "Vượt đích 3-5% rồi lùi về trong 120ms"
              }
            }
          },
          "shotSize": {
            "type": "string",
            "enum": [
              "wide",
              "medium",
              "close"
            ],
            "description": "Wide 15-25%, medium 45-60%, close 20-30% thời lượng tập. Không quá 4 scene liên tiếp cùng cỡ."
          },
          "onScreenWords": {
            "type": "integer",
            "maximum": 12,
            "description": "Số từ hiện cùng lúc. Trần cứng 12. Tổng cả tập <= 22% số từ VO."
          },
          "continuity": {
            "type": "string",
            "enum": [
              "cut",
              "morph",
              "camera-move"
            ],
            "description": "morph BẮT BUỘC nếu scene này và scene trước có claimIds giao nhau."
          },
          "audioLeadMs": {
            "type": "integer",
            "minimum": 0,
            "maximum": 1000,
            "description": "J-cut: VO của ý mới bắt đầu trước khi máy quay tới, 400-1000ms. Giá trị 0 chỉ dùng khi cố ý tạo cú sốc."
          },
          "parallaxLayer": {
            "type": "string",
            "enum": [
              "back",
              "mid",
              "front"
            ],
            "description": "back di chuyển 30% tốc độ máy quay, mid 100%, front 130%"
          },
          "breathAfterMs": {
            "type": "integer",
            "maximum": 1000,
            "description": "Nhịp thở sau tiết lộ: 600-1000ms không có gì mới xảy ra."
          }
        }
      }
    },
    "stockRatio": {
      "type": "number",
      "maximum": 0.15,
      "description": "Tỷ lệ thời lượng dùng stock. Trần cứng 15%."
    },
    "selfCheck": {
      "type": "object",
      "description": "Visual Director BẮT BUỘC tự đếm và khai. Validator so số khai với số tính được; lệch nhau là fail ngay.",
      "required": [
        "onScreenWordRatio",
        "shotSizeMix",
        "durationStdDevRatio",
        "jcutCoverage",
        "morphWhereRequired",
        "stockRatio"
      ],
      "properties": {
        "onScreenWordRatio": {
          "type": "number",
          "maximum": 0.22
        },
        "shotSizeMix": {
          "type": "object",
          "required": [
            "wide",
            "medium",
            "close"
          ],
          "properties": {
            "wide": {
              "type": "number",
              "minimum": 0.15,
              "maximum": 0.25
            },
            "medium": {
              "type": "number",
              "minimum": 0.45,
              "maximum": 0.6
            },
            "close": {
              "type": "number",
              "minimum": 0.2,
              "maximum": 0.3
            }
          }
        },
        "durationStdDevRatio": {
          "type": "number",
          "minimum": 0.4
        },
        "jcutCoverage": {
          "type": "number",
          "minimum": 1.0,
          "description": "Tỷ lệ scene camera-move có audioLeadMs hợp lệ. Phải bằng 1.0."
        },
        "morphWhereRequired": {
          "type": "boolean",
          "const": true
        },
        "stockRatio": {
          "type": "number",
          "maximum": 0.15
        }
      }
    },
    "genre": {
      "type": "string",
      "description": "Genre Pack đã dùng. Validator nạp layouts.json tương ứng."
    }
  }
}
<<<END>>>

<<<FILE: engine/contracts/timing.schema.json>>>
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "meridian/timing.schema.json",
  "title": "VO Timing",
  "type": "object",
  "required": ["episodeId", "audioDurationMs", "words"],
  "properties": {
    "episodeId": { "type": "string" },
    "audioDurationMs": { "type": "integer" },
    "loudnessLufs": { "type": "number", "maximum": -13, "minimum": -15 },
    "words": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["word", "startMs", "endMs"],
        "properties": {
          "word": { "type": "string" },
          "startMs": { "type": "integer" },
          "endMs": { "type": "integer" },
          "segmentId": { "type": "string" }
        }
      }
    }
  }
}
<<<END>>>

<<<FILE: engine/docs/00-vision.md>>>
# 00 · Vision

## Vì sao làm

Sản xuất video phân tích tài chính chất lượng cao đòi hỏi nghiên cứu, kiểm chứng số liệu, dựng
biểu đồ và biên tập — chuỗi việc lặp lại, có cấu trúc rõ, và tốn thời gian. Đó là mô tả chính xác
của một quy trình có thể tự động hoá. Mục tiêu không phải "làm video bằng AI" mà là **dựng một dây
chuyền có kỷ luật**, trong đó con người chỉ giữ phần máy không làm được: góc nhìn.

## Khán giả mục tiêu

- Thị trường: Mỹ.
- Chân dung: 28–45 tuổi, thu nhập hộ gia đình 70K–150K USD, có việc làm ổn định, đang đối mặt với
  một quyết định tài chính lớn (mua nhà, đổi việc, trả nợ, tiết kiệm hưu trí).
- Trạng thái tâm lý: không thiếu thông tin, thiếu **khung để ra quyết định**. Đã đọc nhiều lời
  khuyên chung chung và không tin chúng nữa.
- Điều họ muốn mang về sau 20 phút: một ngưỡng định lượng để tự chấm điểm hoàn cảnh của mình.

## Lời hứa với người xem

Mỗi video trả lời một câu hỏi tài chính cụ thể bằng **số liệu thật có nguồn**, dựng thành một
**ma trận ngưỡng** để người xem tự định vị, và kết bằng **quy tắc cụ thể** chứ không phải lời động viên.

## Tiêu chí thành công (đo được)

| Mốc | Chỉ số | Ngưỡng |
|---|---|---|
| Nhà máy chạy | Thời gian người thật cho một tập | ≤ 35 phút |
| Nhà máy chạy | Chi phí API cho một tập | ≤ ngưỡng trong `04-nfr.md` |
| Sản phẩm đạt | Retention 30 giây đầu | ≥ 60% |
| Sản phẩm đạt | Average view duration | ≥ 6 phút |
| Sản phẩm đạt | CTR thumbnail | ≥ 4% |
| Chất lượng | Tỷ lệ claim số liệu có nguồn truy ngược được | 100% |

## Điều KHÔNG phải là thành công

- Số lượng video đăng được.
- Tốc độ render.
- Độ phức tạp của hệ thống.

Một nhà máy chạy được 10 tập tốt hơn một nhà máy chạy được 100 tập trung bình. Xem non-goals trong `PROJECT.md`.
<<<END>>>

<<<FILE: engine/docs/01-architecture.md>>>
# 01 · Kiến trúc

## Ràng buộc nền tảng (không thương lượng)

- Không có máy local. Mọi thao tác qua trình duyệt.
- ChatGPT Sites **chỉ host tĩnh**: không render video, không chạy job nền, không giữ secret.
- Không có server, không có database.

## Ba mặt phẳng

```
┌───────────────────────────────────────────────────────────┐
│  CONTROL PLANE — ChatGPT Sites (SPA tĩnh)                  │
│  Cockpit: bảng pipeline · gate inbox · artifact viewer     │
│  · thư viện · analytics · đồng hồ tài nguyên               │
└───────────┬───────────────────────────────┬───────────────┘
            │ đọc qua GitHub API            │ repository_dispatch
            ▼                               ▼
┌───────────────────────────┐   ┌───────────────────────────┐
│  STATE PLANE — GitHub repo│   │  COMPUTE PLANE — Actions  │
│  Nguồn sự thật duy nhất.  │◄──┤  1 workflow / stage       │
│  Mọi artifact là file.    │   │  + orchestrator           │
│  Git history = audit trail│   │  Remotion · ffmpeg · API  │
└───────────────────────────┘   └───────────┬───────────────┘
                                            │
              ┌─────────────────────────────┼──────────────┐
              ▼                ▼            ▼              ▼
          LLM API          TTS/ASR     Stock/Image    YouTube API
```

## Luồng một tập

1. Anh bấm nút trên cockpit → UI gọi GitHub API `repository_dispatch`.
2. Workflow tương ứng thức dậy, đọc artifact đầu vào từ repo.
3. Gọi dịch vụ ngoài (LLM / TTS / stock / YouTube), xử lý.
4. Validate output bằng schema, commit ngược vào repo.
5. Cập nhật `pipeline/state.json`.
6. UI poll repo, hiển thị trạng thái mới.

## Quyết định công nghệ

| Hạng mục | Chọn | Xem |
|---|---|---|
| Host UI | ChatGPT Sites | ADR-0001 |
| State store | GitHub repo | ADR-0003 |
| Compute | GitHub Actions | ADR-0001 |
| Render video | Remotion (React) + ffmpeg | ADR-0002 |
| Lưu binary | GitHub Releases | ADR-0004 |
| Điểm can thiệp người | 3 gate | ADR-0005 |

## Nguyên tắc không máy local (zero-local)

**Không có bước nào trong dự án này chạy trên máy cá nhân của chủ dự án.**
Bảng dưới liệt kê mọi loại lệnh và nơi nó thực sự chạy.

| Việc | Chạy ở đâu | Chủ dự án làm gì |
|---|---|---|
| `npm install`, `npm run test`, `npm run validate` | Sandbox đám mây của Codex | Không làm gì. Codex tự chạy trước khi mở PR |
| Cài Remotion, Chromium, ffmpeg | GitHub Actions runner | Không làm gì |
| Render video | GitHub Actions runner | Không làm gì |
| Tạo file, sửa file, commit | Codex (qua PR) hoặc giao diện web GitHub | Bấm nút trên trình duyệt |
| Xem diff, duyệt, merge | Giao diện web GitHub | Bấm nút |
| Hoàn tác một PR đã merge | Nút **Revert** trên trang PR của GitHub | Bấm nút |
| Xem trước cockpit | Preview của Codex hoặc GitHub Pages | Mở link trong trình duyệt |
| Chạy pipeline | GitHub Actions, kích hoạt từ cockpit | Bấm nút trên cockpit |

**Cấm tuyệt đối:** không tài liệu nào, không WP nào được yêu cầu chủ dự án chạy lệnh terminal,
cài phần mềm, hay mở file bằng giao thức `file://`. Nếu một WP cần điều đó, WP đó viết sai.

## ChatGPT đồng bộ với GitHub như thế nào

Không có "repo của ChatGPT" tách biệt cần đồng bộ hai chiều. Cơ chế thực tế:

1. Codex **clone repo GitHub vào sandbox đám mây riêng** của nó mỗi khi nhận task.
2. Codex làm việc trong sandbox đó, chạy test ở đó.
3. Xong việc, Codex **push một nhánh mới lên GitHub và mở pull request**.
4. Chủ dự án duyệt PR trên web GitHub và merge.
5. Sandbox bị huỷ. Task sau clone lại bản mới nhất.

Nghĩa là GitHub luôn là bản gốc duy nhất. Sandbox chỉ là nơi làm việc tạm, không phải bản sao
cần giữ đồng bộ.

## Triển khai cockpit — ba phương án

Vấn đề: ChatGPT Sites không tự kéo file từ GitHub. Nếu dán thẳng cockpit vào Sites thì mỗi lần
đổi UI là một lần copy-paste thủ công. Ba cách xử lý, xếp theo mức độ ưu tiên.

### Phương án A · Loader một lần (ưu tiên)

Dán vào Sites **một lần duy nhất** một trang loader ~60 dòng (`engine/app/loader.html`). Loader không
chứa logic cockpit — nó chỉ nhận PAT rồi gọi GitHub Contents API để tải `engine/app/cockpit.js` và thực
thi lúc chạy.

Từ đó về sau, **mọi thay đổi UI chỉ là commit `engine/app/cockpit.js`**. Không bao giờ dán lại Sites.
Người dùng reload trang là có bản mới (loader thêm tham số chống cache).

- Repo giữ nguyên private. Không lộ mã ra ngoài.
- Rủi ro: Sites có thể chặn thực thi mã động bằng Content Security Policy. **Chưa xác minh.**
  Phải chạy `WP-003a` để biết trước khi xây tiếp.

### Phương án B · Sites bọc iframe trỏ GitHub Pages (dự phòng)

Nếu A thất bại vì CSP: Sites chỉ chứa một thẻ `<iframe>` trỏ tới GitHub Pages. Một workflow
Actions tự deploy `engine/app/` lên Pages mỗi khi merge vào `main`. Không cần thực thi mã động, không
cần copy-paste.

- Đổi lại: trang Pages **công khai** ở gói Free (repo vẫn private, nhưng site thì ai có link
  cũng mở được). Chấp nhận được vì cockpit không chứa secret — PAT nhập lúc chạy, dữ liệu phải
  có token mới đọc được. Nhưng cấu trúc dự án sẽ lộ.

### Phương án C · Bỏ Sites, dùng thẳng GitHub Pages

Đơn giản nhất, tự deploy hoàn toàn, không thao tác thủ công nào. Đánh đổi: mất Sites làm cửa vào.

### Quyết định

Chạy `engine/ops/work-packages/WP-003a-sites-loader-spike.md` trước WP-003. Kết quả ghi vào
`engine/engine/docs/02-adr/ADR-0006-cockpit-delivery.md`.

Dù chọn phương án nào, `engine/app/cockpit.js` vẫn phải là **một file duy nhất, không dependency,
không build step** — ràng buộc này giữ cho cả ba phương án đều khả thi và cho phép đổi phương án
sau này mà không viết lại UI.

## Bảo mật

- **Secret nằm ở GitHub Actions Secrets.** Không bao giờ trong code, không bao giờ trong trình duyệt.
- Cockpit chỉ giữ một **fine-grained PAT**: đúng một repo, hạn 30 ngày, quyền tối thiểu
  (contents: read/write, actions: write).
- Đây là điểm yếu bảo mật lớn nhất của mô hình. Chấp nhận có ý thức, xem R3 trong `06-risk-register.md`.

## Giới hạn phải nhớ

| Giới hạn | Con số | Hệ quả thiết kế |
|---|---|---|
| Job Actions | tối đa 6 giờ | Render theo matrix từng nhóm scene |
| Repo | nên < 1 GB | Không commit binary |
| YouTube Data API | 10.000 unit/ngày, upload ~1.600 unit | Tối đa ~5 upload/ngày |
| ChatGPT Sites | tĩnh, không secret | Mọi logic nằm ở Actions |

## Cấu trúc artifact một tập

```
/episodes/{YYYY-MM-slug}/
  00-brief.json          Đề tài + thesis (Gate 1)
  01-dossier.md          Hồ sơ dữ kiện
  01-sources.json        Sổ nguồn
  02-factcheck.json      Kết quả đối chất
  03-outline.json        7 mốc + beat map
  04-script.md           Kịch bản
  04-script.approved.md  Sau Gate 2
  05-storyboard.json     Scene spec
  06-timing.json         Căn chỉnh VO
  06-captions.srt
  07-render-manifest.json
  08-package.json        Title/thumbnail/description
  08-publication.json
  09-metrics.json
  09-insight.md
```
<<<END>>>

<<<FILE: engine/docs/02-adr/ADR-0001-hosting-topology.md>>>
# ADR-0001 · Ba mặt phẳng: Sites + repo + Actions

**Trạng thái:** Chấp nhận

## Bối cảnh
Ràng buộc: không máy local, chỉ trình duyệt. ChatGPT Sites chỉ host tĩnh — không render video,
không chạy job nền, không giữ secret. Nhưng nhà máy cần compute nặng và lưu trữ có trạng thái.

## Phương án đã cân nhắc
1. **Toàn bộ trên ChatGPT Sites** — bất khả thi, không có compute.
2. **Thuê VPS / dùng Vercel + Supabase** — khả thi nhưng vi phạm ràng buộc "chỉ trình duyệt",
   thêm chi phí cố định, thêm bề mặt vận hành.
3. **Sites (UI) + GitHub repo (state) + GitHub Actions (compute)** — chọn.

## Quyết định
Tách ba mặt phẳng. UI tĩnh trên Sites chỉ đọc repo qua GitHub API và bắn `repository_dispatch`.
Toàn bộ xử lý chạy trong Actions. Toàn bộ trạng thái nằm trong repo.

## Hệ quả
- (+) Không server, không chi phí cố định, thao tác được hoàn toàn từ trình duyệt.
- (+) Git history cho audit trail và rollback miễn phí.
- (−) Bị ràng buộc bởi giới hạn Actions (job 6 giờ, phút miễn phí hằng tháng).
- (−) UI phải giữ PAT trong trình duyệt — điểm yếu bảo mật, xem R3.
- (−) Độ trễ: UI phải poll repo, không có realtime push.
<<<END>>>

<<<FILE: engine/docs/02-adr/ADR-0002-remotion-render.md>>>
# ADR-0002 · Remotion thay vì model sinh video

**Trạng thái:** Chấp nhận

## Bối cảnh
Định hướng nội dung là phân tích chuyên sâu, dùng nhiều biểu đồ động, sơ đồ, infographic, doodle.
Mọi con số trên màn hình phải khớp với `sources.json`.

## Phương án đã cân nhắc
1. **Model sinh video (text-to-video)** — kết quả không deterministic, không thể hiện đúng số liệu,
   không sửa được từng phần, chi phí cao, và bị khán giả Mỹ nhận diện là nội dung máy.
2. **Dựng thủ công trên phần mềm editing** — không tự động hoá được, cần máy local.
3. **Remotion (video viết bằng React) + ffmpeg** — chọn.

## Quyết định
Dùng Remotion làm engine render. Mỗi layout là một React composition nhận props từ dữ liệu thật.

## Hệ quả
- (+) Deterministic: cùng input cho cùng output, render lại được, sửa từng scene được.
- (+) Chart dựng từ số liệu thật, không phải minh hoạ.
- (+) Chạy được trong Actions (Node + Chromium headless).
- (−) Cần đầu tư trước vào thư viện layout — đây là chi phí lớn nhất của Wave 4.
- (−) Không tạo được cảnh quay thực tế; phải bù bằng stock và footage tự quay.
<<<END>>>

<<<FILE: engine/docs/02-adr/ADR-0003-repo-as-state.md>>>
# ADR-0003 · Repo làm state store

**Trạng thái:** Chấp nhận

## Bối cảnh
Pipeline 14 stage cần lưu trạng thái và artifact giữa các stage. Không có server để chạy database.

## Phương án đã cân nhắc
1. **Database ngoài (Supabase/Firebase)** — thêm phụ thuộc, thêm secret, thêm chi phí, và tách rời
   artifact khỏi mã nguồn.
2. **Actions Artifacts** — có hạn lưu trữ, không truy vấn được từ UI, không có lịch sử.
3. **Repo Git** — chọn.

## Quyết định
Mọi artifact là file trong `/episodes/{id}/`. Trạng thái pipeline là `pipeline/state.json`.
Mọi thay đổi là một commit.

## Hệ quả
- (+) Một nguồn sự thật duy nhất. Không có vấn đề đồng bộ.
- (+) Lịch sử, diff, rollback, code review — có sẵn.
- (+) Agent đọc/ghi cùng một nơi với code, không cần credential riêng.
- (−) Không phù hợp cho ghi tần suất cao — chấp nhận được vì pipeline chạy theo tập.
- (−) Repo có thể phình. Ràng buộc: không commit binary, xem ADR-0004.
- (−) Ghi đồng thời từ hai job có thể xung đột — mỗi job chỉ ghi trong thư mục episode của nó.
<<<END>>>

<<<FILE: engine/docs/02-adr/ADR-0004-binary-storage.md>>>
# ADR-0004 · Binary lưu ở GitHub Releases

**Trạng thái:** Chấp nhận

## Bối cảnh
Một tập sinh ra ~200MB–1GB gồm mp4, wav, ảnh. Repo nên giữ dưới 1GB.

## Phương án đã cân nhắc
1. **Commit thẳng vào repo** — repo phình không thể cứu sau vài tập. Loại.
2. **Git LFS** — có hạn băng thông ở gói miễn phí, thêm phức tạp.
3. **Object storage ngoài (R2/S3)** — thêm secret và chi phí, nhưng là phương án dự phòng tốt.
4. **GitHub Releases** — chọn.

## Quyết định
Mỗi episode tạo một Release với tag `ep/{id}`. Binary upload làm release asset qua API.
Repo chỉ chứa file text và JSON. `.gitignore` chặn mọi đuôi binary.

## Hệ quả
- (+) Không tốn dung lượng repo, tải về được từ trình duyệt, có API đầy đủ.
- (+) Không thêm secret nào.
- (−) Không phù hợp nếu sau này cần streaming — khi đó chuyển sang R2, đây là quyết định đảo được.
<<<END>>>

<<<FILE: engine/docs/02-adr/ADR-0005-human-gates.md>>>
# ADR-0005 · Ba gate người, không nhiều hơn

**Trạng thái:** Chấp nhận

## Bối cảnh
Tự động hoá càng nhiều càng tốt, nhưng hai thứ không được tự động: góc nhìn riêng (yếu tố quyết
định chất lượng và là lá chắn trước chính sách nội dung sản xuất hàng loạt của YouTube), và
trách nhiệm cuối cùng về nội dung YMYL.

## Quyết định
Đúng ba gate, không thêm:

| Gate | Ở đâu | Người làm gì | Thời gian |
|---|---|---|---|
| Gate 1 | Sau S02 Topic Scoring | Chọn đề tài, **tự viết thesis 1–2 câu** | ~5 phút |
| Gate 2 | Sau S07 Script | Đọc và sửa kịch bản | ~15 phút |
| Gate 3 | Sau S13 Auto-QA | Xem 60s đầu + 30s kết | ~5 phút |

Fast Lane bỏ Gate 1 và Gate 3, giữ Gate 2.

## Hệ quả
- (+) Thời gian người thật ≤ 35 phút/tập, đạt tiêu chí trong `00-vision.md`.
- (+) Mỗi tập có ít nhất một luận điểm do người viết.
- (−) Pipeline dừng chờ người — chấp nhận được, đây là nhà máy một người vận hành.
- (−) Nếu chủ dự án bận, hàng đợi ùn. Giảm nhẹ: Fast Lane.
<<<END>>>

<<<FILE: engine/docs/02-adr/README.md>>>
# Architecture Decision Records

Mỗi quyết định kiến trúc lớn là một file. Mục đích: ghi lại **tại sao**, để không lật lại
quyết định cũ mỗi lần gặp khó.

Quy tắc: agent KHÔNG được tự viết ADR. Chỉ chủ dự án viết. Agent gặp mâu thuẫn thì báo cáo.

| ADR | Quyết định | Trạng thái |
|---|---|---|
| 0001 | Ba mặt phẳng: Sites + repo + Actions | Chấp nhận |
| 0002 | Remotion thay vì model sinh video | Chấp nhận |
| 0003 | Repo làm state store, không dùng database | Chấp nhận |
| 0004 | Binary lưu ở GitHub Releases | Chấp nhận |
| 0005 | Ba gate người, không nhiều hơn | Chấp nhận |
<<<END>>>

<<<FILE: engine/docs/03-glossary.md>>>
# 03 · Thuật ngữ

Anh và agent phải dùng đúng những từ này, không dùng từ đồng nghĩa.

| Thuật ngữ | Định nghĩa |
|---|---|
| **Episode** | Một tập video. Đơn vị sản xuất. ID dạng `YYYY-MM-slug`. |
| **Stage** | Một trong 14 bước của pipeline. Mỗi stage = một workflow. |
| **Gate** | Điểm dừng bắt buộc chờ người duyệt. Có đúng 3: Gate 1 thesis, Gate 2 script, Gate 3 spot check. |
| **Artifact** | Một file output của stage, có schema tương ứng trong `/contracts`. |
| **Thesis** | 1–2 câu luận điểm riêng do CHỦ DỰ ÁN viết ở Gate 1. Không được uỷ quyền cho agent. |
| **Beat** | Một đơn vị nội dung trong outline, tương ứng một ý lớn. Một tập có 5–8 beat. |
| **Scene** | Một đơn vị hình ảnh, thường tương ứng 1–2 câu VO. Một tập có 180–220 scene. |
| **Layout** | Một Remotion composition tái sử dụng được (chart cột, ma trận ngưỡng, hai ngã rẽ...). |
| **Ma trận ngưỡng** | Thiết bị nội dung lõi: chia vấn đề thành 3 mức định lượng, mỗi mức có phán quyết. |
| **Hai ngã rẽ** | Thiết bị nội dung: hai nhân vật cùng điểm xuất phát, hai kết cục sau N năm. |
| **Cảnh mở lạnh** | 15 giây đầu: một cảnh cụ thể có giờ, có tên, có con số. Không giới thiệu. |
| **Vòng lặp mở** | Lời hứa ở đầu video về điều sẽ tiết lộ ở cuối. |
| **Sổ nguồn** | `sources.json` — ánh xạ mỗi claim số liệu tới URL gốc. |
| **Fast Lane** | Chế độ rút gọn: bỏ Gate 1 và Gate 3, chỉ giữ Gate 2. |
| **WP** | Work package. Đơn vị giao việc cho agent. Một WP = một task = một PR. |
| **YMYL** | Your Money or Your Life — nhóm nội dung bị soi kỹ về độ chính xác. |
<<<END>>>

<<<FILE: engine/docs/04-nfr.md>>>
# 04 · Yêu cầu phi chức năng

Đây là ràng buộc agent luôn quên nếu không viết ra. Mọi WP phải tuân thủ.

## Chi phí — ngân sách ba giai đoạn

Ngân sách không phải một con số cố định mà là **ba mức, mở khoá theo chất lượng đạt được**.
Lý do: chất lượng hình ảnh là điểm thất bại lịch sử của dự án này. Đổ tiền vào vận hành trước khi
chứng minh được chất lượng là cách chắc chắn để lặp lại thất bại đó.

### Giai đoạn 1 · Xây dựng (Wave 0–4)

| Hạng mục | Ngân sách |
|---|---|
| Tổng cho toàn giai đoạn | **600 USD** (một lần, không tính theo tháng) |
| Trong đó dành riêng cho lặp thiết kế layout | ≥ 300 USD |

Đây là tiền mua chất lượng hình ảnh vĩnh viễn. Layout tốt thì mọi tập về sau đều thừa hưởng.
Tiêu hết 600 USD mà layout chưa đạt thì **dừng lại xem xét**, không sang giai đoạn 2.

### Giai đoạn 2 · Thử nghiệm (10 tập đầu)

| Hạng mục | Ngân sách |
|---|---|
| Chi phí API một tập | **35 USD** |
| Nhịp đăng | **3 tập/tuần** (không phải 7) |
| Chi phí biến đổi/tháng | ~455 USD |
| Chi phí cố định/tháng | ~150 USD (stock subscription + Actions) |
| **Tổng/tháng** | **~605 USD** |

### Giai đoạn 3 · Chạy đủ nhịp

| Hạng mục | Ngân sách |
|---|---|
| Chi phí API một tập | **35 USD** |
| Nhịp đăng | **7 tập/tuần** (~30 tập/tháng) |
| Chi phí biến đổi/tháng | 1.050 USD |
| Chi phí cố định/tháng | 150 USD |
| **Tổng/tháng** | **1.200 USD** |

### Điều kiện mở khoá giai đoạn 3

Chỉ chuyển sang giai đoạn 3 khi **cả bốn** điều kiện sau đạt:

1. 10 tập đầu đều qua `visualScore` ≥ 8/10 ngay lần render đầu tiên.
2. Toàn bộ 12 layout đã được duyệt qua Layout Gallery, không layout nào ở trạng thái tạm chấp nhận.
3. Chi phí trung bình thực tế ≤ 35 USD/tập.
4. Retention 30 giây trung bình 10 tập ≥ 55%.

Thiếu bất kỳ điều kiện nào thì **ở lại giai đoạn 2**. Không có ngoại lệ.

### 35 USD một tập chi vào đâu

| Hạng mục | Ước tính |
|---|---|
| Research hai lượt + fact-check đối kháng (model mạnh, ngữ cảnh dài) | 12–16 USD |
| Outline + script 3.500 từ | 3–5 USD |
| Storyboard ~200 scene (model mạnh, output có cấu trúc) | 6–9 USD |
| TTS 20 phút + ASR căn chỉnh | 1 USD |
| Ảnh nền sinh (10–15 ảnh, chỉ nền trừu tượng) | 1–2 USD |
| QA thị giác 10 khung | 0,2 USD |
| **Biên cho một lần render lại sau khi QA fail** | 4–6 USD |

Khoản cuối là lý do chính nâng từ 20 lên 35: ở mức 20 USD, một tập fail QA thị giác sẽ vượt trần
và bị chặn, khiến áp lực thực tế là hạ chuẩn QA xuống. Ngân sách phải cho phép làm lại.

### Hành vi khi vượt trần

| Trần | Hành vi |
|---|---|
| Một tập vượt 35 USD | Job dừng, ghi cờ, chờ người quyết. **Không tự động hạ chuẩn QA** |
| Một tập fail QA lần thứ hai | Dừng hẳn tập đó, chuyển sang Gate người. Không render lần ba |
| Tháng vượt trần giai đoạn hiện tại | Orchestrator ngừng nhận episode mới tới đầu tháng sau |

### Cảnh báo sớm trên cockpit

Vàng ở 70% trần tháng, đỏ ở 90%. Cockpit hiển thị rõ đang ở giai đoạn nào và còn thiếu điều kiện
nào để mở khoá giai đoạn kế.

### Nếu chi phí trung bình vượt 35 USD/tập

Thứ tự tối ưu, làm từ trên xuống. **Không bao giờ hạ chuẩn QA thị giác để tiết kiệm.**
1. Chuyển lượt research thứ nhất sang model rẻ hơn, giữ model mạnh cho fact-check.
2. Giảm số scene bằng cách tăng thời lượng trung bình mỗi scene.
3. Giảm số ảnh nền sinh, tăng tỷ lệ data card.
4. Giảm nhịp đăng.

## Thời gian

| Stage | Trần |
|---|---|
| Research + fact-check | 15 phút |
| Script | 10 phút |
| Storyboard + visual assembly | 20 phút |
| Render (tập 22 phút) | 90 phút |
| Tổng một tập, không tính thời gian chờ người | 3 giờ |

## Chất lượng đầu ra

- Video: 1920×1080, H.264, 30fps.
- Audio: chuẩn hoá **‑14 LUFS**, true peak ≤ ‑1 dBTP.
- Phụ đề: lệch tối đa 200ms so với VO.
- Safe area: không chữ nào nằm ngoài 90% khung.
- 100% claim số liệu truy ngược được về `sources.json`.

## Quota

- YouTube upload: tối đa **4/ngày** ở giai đoạn 3, **2/ngày** ở giai đoạn 2 (nhịp 7 tập/tuần cần ~1/ngày; biên 4 cho phép dồn tập). Ngưỡng kỹ thuật là ~5–6/ngày.
- GitHub Actions: cảnh báo khi dùng quá 70% phút miễn phí trong tháng.

## Bảo mật

- Không secret trong code, trong log, trong artifact.
- PAT của cockpit: fine-grained, một repo, hạn tối đa 30 ngày.
- Mọi workflow chạy với quyền tối thiểu (`permissions:` khai tường minh).

## Khả năng phục hồi

- Mọi stage idempotent: chạy lại cho kết quả như nhau.
- Pipeline đứt ở stage N → chạy tiếp được từ stage N, không phải từ đầu.
- Mọi thay đổi artifact là một commit → rollback bằng git revert.
<<<END>>>

<<<FILE: engine/docs/05-runbook.md>>>
# 05 · Runbook vận hành

Sổ tay dùng hằng ngày. Viết dần từ Wave 2, cập nhật mỗi khi gặp sự cố mới.

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

## Triển khai lại cockpit

Phụ thuộc phương án đã chốt ở ADR-0006:

| Phương án | Cách cập nhật UI |
|---|---|
| A · Loader | Commit `engine/app/cockpit.js`. Xong. Reload trang Sites là thấy bản mới |
| B · iframe → Pages | Merge PR. Actions tự deploy. Xong |
| C · Pages | Merge PR. Actions tự deploy. Xong |

Chỉ Phương án A cần dán Sites, và chỉ đúng **một lần** lúc thiết lập ban đầu.

## Xoay secret

1. Tạo khoá mới ở nhà cung cấp.
2. Cập nhật trong repo → Settings → Secrets and variables → Actions.
3. Chạy `hello.yml` để xác nhận.
4. Thu hồi khoá cũ.
<<<END>>>

<<<FILE: engine/docs/06-risk-register.md>>>
# 06 · Sổ rủi ro

Rà lại ở đầu mỗi wave. Cột "Dấu hiệu sớm" quan trọng hơn cột "Giảm thiểu" — phát hiện sớm rẻ hơn xử lý.

Thang: T = Thấp, TB = Trung bình, C = Cao.

---

## R1 · YouTube xếp vào nhóm nội dung sản xuất hàng loạt
**Xác suất C · Tác động C** — *mức rủi ro tăng đáng kể ở nhịp 7 tập/tuần*

Nhịp 1 tập/ngày ở độ dài 20 phút là chính xác dấu hiệu mà hệ thống của YouTube dùng để nhận diện
nội dung sản xuất hàng loạt. Kênh tham chiếu chạy đúng nhịp này và có ~181 video nhưng đa số chỉ
đạt vài nghìn view — sản lượng cao không tự chuyển thành kết quả. Nếu chọn nhịp này, các biện pháp
dưới đây không còn là tuỳ chọn.

- **Phòng ngừa (bắt buộc ở nhịp 7/tuần):**
  1. Gate 1 không bao giờ được bỏ. Mỗi tập có thesis do người viết. Fast Lane **không** được bỏ Gate 1.
  2. Mỗi tập có ít nhất một số liệu mà không kênh nào khác đang dùng cho chủ đề đó.
  3. Không hai tập liên tiếp cùng pillar.
  4. Không mascot hoạt hoạ lặp lại trong thumbnail.
  5. Khai báo nội dung AI đúng quy định.
  6. **Kênh faceless** — không có sự hiện diện người thật, nên bốn cơ chế bù trừ trong
     `channels/us-personal-finance/persona.md` là BẮT BUỘC: mỗi tập có ít nhất một con số tự tính chưa ai công bố ·
     công bố bảng tính công khai · nêu nguồn uy tín bằng chữ · trả lời 20 bình luận đầu trong 2 giờ.
- **Phòng ngừa bổ sung:** nhịp tăng dần theo giai đoạn — 3 tập/tuần cho 10 tập đầu, chỉ lên 7 tập/tuần khi đủ 4 điều kiện mở khoá trong `engine/docs/04-nfr.md`.
- **Giảm thiểu:** giảm ngay về 3 tập/tuần, tăng phần bình luận cá nhân, tạm dừng đăng để rà soát.
- **Dấu hiệu sớm:** view trung bình giảm đều qua 10 tập liên tiếp; tỷ lệ hiển thị đề xuất tụt;
  đơn kiếm tiền bị từ chối; retention 30 giây giảm dần.
- **Ngưỡng hành động:** nếu view trung bình 10 tập gần nhất thấp hơn 10 tập trước đó **hai lần liên
  tiếp**, giảm nhịp xuống 3 tập/tuần và rà lại chất lượng trước khi tăng lại.

## R2 · Agent trôi phạm vi, tự sửa contract
**Xác suất C · Tác động C**

- **Phòng ngừa:** `guardrails.md` liệt kê file cấm chạm; mỗi WP ghi rõ "Files in scope";
  CI chặn mọi thay đổi trong `/contracts` nếu PR không có nhãn `contract-change`.
- **Giảm thiểu:** revert PR ngay; nếu quyết định đó thực sự đúng thì mở ADR rồi làm lại.
- **Dấu hiệu sớm:** PR chạm file ngoài danh sách; PR có số file thay đổi lớn bất thường.

## R3 · PAT trong trình duyệt bị lộ
**Xác suất TB · Tác động C**

- **Phòng ngừa:** fine-grained PAT, đúng một repo, hạn 30 ngày, quyền tối thiểu; repo private;
  không dùng chung máy/trình duyệt.
- **Giảm thiểu:** thu hồi token ngay, xoay khoá, rà toàn bộ commit lạ và Actions log.
- **Dấu hiệu sớm:** commit hoặc workflow run mà mình không tạo.

## R4 · Chi phí API vượt kiểm soát
**Xác suất TB · Tác động TB**

- **Phòng ngừa:** trần chi phí trong `04-nfr.md`; đếm token mỗi stage; job tự dừng khi vượt trần tập.
- **Giảm thiểu:** tắt stage đắt nhất, chuyển research sang model rẻ hơn, giảm số scene.
- **Dấu hiệu sớm:** chi phí/tập tăng dần qua các tập; đồng hồ trên cockpit vọt.

## R5 · Hết phút Actions hoặc job vượt 6 giờ
**Xác suất TB · Tác động TB**

- **Phòng ngừa:** render theo matrix từng nhóm scene; cache node_modules và Chromium;
  giới hạn độ dài tập ở 25 phút.
- **Giảm thiểu:** chia render thành 2 job nối tiếp; nâng gói Actions.
- **Dấu hiệu sớm:** thời gian job tăng dần; cảnh báo 70% phút trong tháng.

## R6 · Repo phình vì binary
**Xác suất TB · Tác động C**

- **Phòng ngừa:** `.gitignore` chặn mọi đuôi binary; CI từ chối PR có file > 5MB; dùng Releases.
- **Giảm thiểu:** giao Codex một WP riêng để dọn lịch sử bằng `git filter-repo` trong sandbox (tốn công, tránh bằng mọi giá).
- **Dấu hiệu sớm:** kích thước repo tăng nhanh giữa hai wave.

## R7 · Sai số liệu tài chính (rủi ro YMYL)
**Xác suất TB · Tác động C**

- **Phòng ngừa:** sổ nguồn bắt buộc; fact-check pass bằng agent riêng biệt; chỉ dùng nguồn trong
  `data-sources.md`; disclaimer trong mọi video và description.
- **Giảm thiểu:** gỡ video, đăng đính chính công khai, ghi vào `insight.md`.
- **Dấu hiệu sớm:** claim không gắn được URL; fact-check báo cờ vàng lặp lại ở cùng loại số liệu.

## R8 · Nội dung nghe như dịch máy
**Xác suất C · Tác động C**

- **Phòng ngừa:** viết mới hoàn toàn bằng tiếng Anh, cấm dịch từ tiếng Việt; cấm bê nguyên cơ chế
  tài chính Việt Nam (lãi suất thả nổi, ân hạn gốc lãi) sang bối cảnh Mỹ; bước kiểm định bản địa 3.6.
- **Giảm thiểu:** thuê người bản ngữ đọc soát vài tập đầu; xây `lexicon.md` từ nguồn tiếng Anh gốc.
- **Dấu hiệu sớm:** retention 30 giây đầu thấp bất thường; bình luận về cách diễn đạt.

## R9 · Chạm trần quota YouTube API
**Xác suất T · Tác động TB**

- **Phòng ngừa:** giới hạn 3 upload/ngày; đồng hồ quota trên cockpit; gộp lời gọi `videos.list` theo lô 50.
- **Giảm thiểu:** đăng thủ công tạm thời; xin nâng quota.
- **Dấu hiệu sớm:** đồng hồ quota gần trần trước cuối ngày.

## R10 · Phụ thuộc ChatGPT Sites
**Xác suất TB · Tác động T**

- **Phòng ngừa:** toàn bộ trạng thái nằm trong repo chứ không ở Sites; UI là tầng mỏng, thay được.
- **Giảm thiểu:** chuyển UI sang GitHub Pages trong vòng một WP.
- **Dấu hiệu sớm:** Sites đổi chính sách, giới hạn, hoặc gián đoạn.

## R11 · Vi phạm bản quyền stock, nhạc, giọng
**Xác suất TB · Tác động C**

- **Phòng ngừa:** mỗi asset ghi license trong `assets/LICENSES.md`; chỉ dùng nguồn cho phép thương mại;
  giọng TTS phải có điều khoản cho phép dùng thương mại.
- **Giảm thiểu:** thay asset, gỡ video, phản hồi claim.
- **Dấu hiệu sớm:** asset không có dòng license; Content ID claim.

## R12 · Dự án bị bỏ dở (rủi ro lớn nhất)
**Xác suất C · Tác động C**

Đã có ba lần khởi động trước. Nguyên nhân thường không phải kỹ thuật mà là **phạm vi quá lớn trước
khi có thành quả nhìn thấy được**.

- **Phòng ngừa:** Wave 2 phải ra video 60 giây trước khi làm bất cứ gì khác; mỗi wave có sản phẩm
  xem được; non-goals trong `PROJECT.md` được đọc lại ở đầu mỗi wave.
- **Giảm thiểu:** cắt phạm vi xuống Fast Lane, bỏ toàn bộ phần "nền tảng", chấp nhận thủ công một số stage.
- **Dấu hiệu sớm:** một wave kéo dài mà chưa có gì chạy được; số file code tăng nhanh hơn số tính năng
  dùng được; xuất hiện ý nghĩ "làm lại từ đầu cho sạch".

---

## Rà soát

| Wave | Rủi ro cần rà kỹ |
|---|---|
| 0 | R12 |
| 1 | R2, R3, R12 |
| 2 | R5, R6, R12 |
| 3 | R7, R8 |
| 4 | R4, R5, R11 |
| 5 | R1, R9, R11 |
| 6 | R1, R7 |
<<<END>>>

<<<FILE: engine/docs/07-delivery-plan.md>>>
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
| 1.1 | WP-001 Codex scaffold cấu trúc | Cây thư mục + package.json | Cây khớp `01-architecture.md`, `npm install` chạy được |
| 1.2 | WP-002 CI validate schema | PR sai schema bị chặn | Cố tình push JSON sai → CI đỏ |
| 1.3 | WP-003 Workflow `hello.yml` | Actions chạy được | Trigger thủ công → job xanh |
| 1.4 | WP-004 UI shell trên Sites | Trang mở được, đọc `pipeline/state.json` | Truy cập slug thấy danh sách episode (rỗng) |
| 1.5 | WP-005 Nút dispatch từ UI | UI bắn được `repository_dispatch` | Bấm nút → job xuất hiện trong tab Actions |
| 1.6 | Nạp secret vào Actions Secrets | Không secret trong code | `git grep -iE "sk-\|ghp_\|AIza"` không ra kết quả |

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
<<<END>>>

<<<FILE: engine/docs/08-getting-started.md>>>
# 08 · Bắt đầu từ số không

Viết cho người chưa từng dùng Codex. Làm đúng thứ tự, không nhảy bước.
Mọi ô ```prompt``` là văn bản dán thẳng, không cần sửa gì trừ chỗ ghi `<...>`.

**Chuẩn bị:** một tài khoản GitHub, một gói ChatGPT có Codex, một trình duyệt, file `BOOTSTRAP.md`.

**Bốn giai đoạn:** Project → Chỉnh tài liệu → GitHub → Codex.
Ba giai đoạn đầu làm hoàn toàn trong ChatGPT.

---

# GIAI ĐOẠN 1 · Dựng Project trong ChatGPT

## Bước 1 · Tạo Project

Project là một thư mục chứa nhiều chat, dùng chung file và chỉ dẫn. Mọi chat trong project tự động
thừa hưởng phần Instructions — đây là lý do phải dùng Project thay vì chat rời.

1. Thanh bên trái → **Projects** → **New project**
2. Tên: `Meridian Studio`

## Bước 2 · Dán Instructions cho Project

Mở phần **Instructions** của project, dán nguyên khối này:

```prompt
Dự án: Meridian Studio (repo GitHub: meridian-studio).
Nhà máy sản xuất video YouTube phân tích tài chính cá nhân cho thị trường Mỹ,
vận hành hoàn toàn trong trình duyệt: ChatGPT Sites làm UI, GitHub repo làm nơi lưu
trạng thái, GitHub Actions làm nơi chạy xử lý. Không có server, không có database,
không có máy local.

Tôi là người mới với Codex. Hãy giả định tôi không biết thuật ngữ chuyên ngành trừ
khi tôi dùng nó trước.

Nguyên tắc bắt buộc khi trả lời trong project này:
1. Luôn đọc PROJECT.md, AGENTS.md và engine/ops/guardrails.md trong file đính kèm trước khi
   đề xuất bất cứ gì.
2. Không đề xuất giải pháp cần server chạy liên tục, database ngoài, hay máy local.
3. Không đề xuất sửa file trong thư mục /contracts. Nếu thấy schema sai, nêu vấn đề
   và dừng lại, không tự sửa.
4. Không mở rộng phạm vi. Nếu tôi hỏi A, chỉ trả lời A. Không đề xuất thêm B, C, D.
5. Khi tôi yêu cầu viết tài liệu, viết đúng MỘT file mỗi lần, đầy đủ, dán được ngay.
6. Nếu yêu cầu của tôi mâu thuẫn với tài liệu đính kèm, nói thẳng chỗ mâu thuẫn
   trước khi làm.
7. Trả lời bằng tiếng Việt. Code, tên biến, comment trong code bằng tiếng Anh.
   Nội dung sinh cho kênh YouTube bằng tiếng Anh Mỹ.
```

## Bước 3 · Upload đúng 4 nhóm file

Trong project, phần **Files**, tải lên:

| Upload | Vì sao |
|---|---|
| `BOOTSTRAP.md` | Chứa toàn bộ 63 file tài liệu. Một file là đủ |
| Hai transcript kênh tham chiếu | Bằng chứng gốc để đối chiếu khi bàn về format |
| Ba ảnh lưới video kênh tham chiếu | Cơ sở cho thumbnail spec |

**Không upload gì khác.** File thừa làm loãng ngữ cảnh và khiến trả lời kém đi rõ rệt.

## Bước 4 · Quy ước đặt tên chat

Mỗi chat là một việc. Đặt tên theo mẫu `W{wave} · {chủ đề}`:

```
W0 · Chỉnh tài liệu nền
W0 · Chốt chi phí và nhịp
W1 · WP-000 Scaffold
W1 · Cockpit UI
W2 · Remotion
```

**Một chat cho một chủ đề.** Chat dài lan man là nguyên nhân số một khiến chất lượng trả lời tụt.
Khi thấy chat đã đi lạc chủ đề, mở chat mới.

---

# GIAI ĐOẠN 2 · Chỉnh tài liệu nền (vẫn trong ChatGPT)

Anh chỉ cần đọc và chỉnh **3 file**: `PROJECT.md`, `engine/docs/04-nfr.md`, `channels/us-personal-finance/channel-bible.md`.
Bảy file bắt buộc còn lại dùng nguyên. Xem `START-HERE.md` để biết vì sao.

## Bước 5 · Chat đầu tiên

Tạo chat mới trong project, đặt tên **`W0 · Chỉnh tài liệu nền`**. Dán:

```prompt
Trong BOOTSTRAP.md đính kèm có file PROJECT.md. Hãy:
1. Trích ra nội dung hiện tại của PROJECT.md.
2. Đặt cho tôi tối đa 5 câu hỏi để cá nhân hoá file này (tên dự án, tài khoản GitHub,
   mục tiêu riêng của tôi).
3. Chưa viết lại file. Chỉ hỏi.
```

Trả lời xong, dán tiếp:

```prompt
Dựa trên câu trả lời của tôi, viết lại toàn bộ PROJECT.md.
Giữ nguyên cấu trúc và mục non-goals. Xuất ra dạng markdown đầy đủ trong một khối code
để tôi copy. Không giải thích thêm.
```

## Bước 6 · Xác nhận trần chi phí

Trần đã chốt: **20 USD/tập, 606 USD/tháng, 30 tập/tháng**. Anh không cần quyết gì thêm, chỉ cần
xác nhận con số khớp với thực tế túi tiền.

Chat mới: **`W0 · Xác nhận chi phí`**

```prompt
Trong BOOTSTRAP.md có file engine/docs/04-nfr.md với trần chi phí đã chốt:
20 USD/tập, 606 USD/tháng, 30 tập/tháng.

Ước tính giúp tôi chi phí thực tế cho một tập video 20 phút gồm:
- Nghiên cứu và kiểm chứng bằng LLM
- Viết kịch bản 3.500 từ
- Sinh storyboard cho ~200 scene
- Sinh voice-over 20 phút bằng TTS
- Sinh 10-15 ảnh nền
- Sinh gói packaging

Cho tôi khoảng dao động, và chỉ ra hạng mục nào chiếm phần lớn chi phí.
Nếu ước tính vượt 20 USD, đề xuất cách cắt giảm theo thứ tự trong mục
"Nếu chi phí trung bình vượt 20 USD/tập" của file đó.
Chưa sửa file.
```

Nếu ước tính lệch nhiều so với 20 USD, dán tiếp:

```prompt
Viết lại toàn bộ engine/docs/04-nfr.md với trần mới: <số> USD/tập, <số> USD/tháng.
Cập nhật cả bảng cảnh báo sớm (70% và 90%) theo con số mới.
Xuất markdown đầy đủ trong một khối code.
```

## Bước 7 · Chỉnh channel bible

Chat mới: **`W0 · Channel Bible`**

```prompt
Trong BOOTSTRAP.md có file channels/us-personal-finance/channel-bible.md. Đọc nó cùng với hai transcript và
ba ảnh thumbnail đính kèm.

Hỏi tôi 5 câu để cá nhân hoá phần định vị và giọng kênh. Đặc biệt hỏi rõ: tôi có muốn
xuất hiện trong video (giọng thật, mặt thật) hay hoàn toàn ẩn danh.
Chưa viết lại file.
```

Lưu ý: câu hỏi ẩn danh hay không quan trọng hơn vẻ ngoài của nó. Ở nhịp 7 tập/tuần, việc có mặt
người thật trong ít nhất một tập mỗi tuần là biện pháp phòng ngừa rủi ro R1.

---

# GIAI ĐOẠN 3 · Đưa lên GitHub

## Bước 8 · Tạo repo

1. `github.com` → nút `+` góc phải trên → **New repository**
2. Repository name: `meridian-studio`
3. Chọn **Private**
4. Tích **Add a README file**
5. **Create repository**

## Bước 9 · Dán BOOTSTRAP.md vào repo

1. Trong repo, bấm **Add file** → **Create new file**
2. Ô tên file gõ: `BOOTSTRAP.md`
3. Dán toàn bộ nội dung file `BOOTSTRAP.md`
4. Cuộn xuống, bấm **Commit changes**

Nếu file quá lớn để dán một lần, dùng **Add file → Upload files** rồi kéo file vào.

## Bước 10 · Dán 3 file đã chỉnh ở Giai đoạn 2

Với mỗi file (`PROJECT.md`, `engine/docs/04-nfr.md`, `channels/us-personal-finance/channel-bible.md`):

1. **Add file** → **Create new file**
2. Gõ **đường dẫn đầy đủ**, ví dụ `engine/docs/04-nfr.md`. GitHub tự tạo thư mục khi anh gõ dấu `/`
3. Dán nội dung → **Commit changes**

Ba file này sẽ ghi đè bản trong BOOTSTRAP khi Codex bung file ở bước sau — nên phải dán **trước**.

---

# GIAI ĐOẠN 4 · Codex

## Bước 11 · Kết nối Codex với repo

1. Mở `chatgpt.com/codex`, đăng nhập
2. Bấm **Connect to GitHub** → cửa sổ GitHub bật lên → **Install and Authorize**
3. Ở màn hình chọn quyền, chọn **Only select repositories** → chọn đúng `meridian-studio`.
   **Không cấp quyền toàn bộ tài khoản.**
4. Quay lại Codex, chọn repo `meridian-studio` → **Create environment**
5. Bật **Agent internet access** — cần để tải Remotion và thư viện

**Phân biệt quan trọng:** ứng dụng GitHub trong ChatGPT thường chỉ **đọc** repo để phân tích.
Để **sinh, sửa và đẩy code** thì phải dùng Codex.
- Chat trong Project = bàn bạc, viết tài liệu.
- Codex = thi công code.

## Bước 12 · Task đầu tiên — bung BOOTSTRAP

Trong Codex, chọn repo, dán:

```prompt
Đọc BOOTSTRAP.md ở gốc repo. File này chứa toàn bộ tài liệu dự án, mỗi file được phân
tách bằng dòng đánh dấu dạng:

<<<FILE: đường/dẫn/file.md>>>
...nội dung...
<<<END>>>

Nhiệm vụ:
1. Tạo đúng từng file theo đường dẫn và nội dung đã cho.
2. KHÔNG sửa nội dung, KHÔNG thêm file, KHÔNG bớt file.
3. Ba file sau đã tồn tại trong repo với phiên bản mới hơn — GIỮ NGUYÊN bản trong repo,
   không ghi đè bằng bản trong BOOTSTRAP:
   PROJECT.md, engine/docs/04-nfr.md, channels/us-personal-finance/channel-bible.md
4. Sau khi tạo xong toàn bộ, xoá BOOTSTRAP.md.
5. Mở một pull request duy nhất, mô tả PR có đủ 4 mục: Đã làm gì / Đã kiểm thế nào /
   File đã chạm / Rủi ro còn lại.
```

Codex chạy trong sandbox riêng và mở một pull request. Anh mở PR, xem tab **Files changed**,
kiểm ba thứ: đúng số file, ba file được giữ nguyên, BOOTSTRAP đã bị xoá. Đúng thì **Merge**.

## Bước 13 · Task thứ hai — WP-000

```prompt
Đọc PROJECT.md, AGENTS.md, engine/ops/guardrails.md và engine/docs/01-architecture.md.
Thực hiện đúng engine/ops/work-packages/WP-000-scaffold.md.

Ràng buộc:
- Chỉ chạm các file liệt kê trong mục "Files in scope" của WP.
- Chỉ thêm dependency có tên trong mục "Ràng buộc" của WP.
- Không viết logic nghiệp vụ.
- Chạy được acceptance test trong WP trước khi mở PR.

Mở một pull request duy nhất, mô tả PR đủ 4 mục theo AGENTS.md.
```

## Bước 14 · Khi PR sai

Đừng sửa tay. Comment vào PR và giao lại task:

```prompt
PR #<số> chưa đạt. Vấn đề:
1. <mô tả cụ thể vấn đề 1>
2. <mô tả cụ thể vấn đề 2>

Đọc lại engine/ops/guardrails.md và engine/ops/definition-of-done.md.
Sửa trên đúng nhánh của PR này, không mở PR mới.
Không thay đổi gì ngoài các vấn đề tôi nêu.
```

Sửa tay thì agent không học, lần sau sai y hệt.

---

# Nhịp làm việc từ đây

Với mỗi WP tiếp theo, lặp đúng 5 bước:

1. Trong chat project (`W1 · ...`), bàn để viết file `WP-XXX.md`. Prompt mẫu:

```prompt
Tôi cần viết work package tiếp theo: WP-<số> <tên>.
Đọc engine/ops/wp-template.md, engine/ops/backlog.md và engine/docs/07-delivery-plan.md trong BOOTSTRAP.

Viết đầy đủ file engine/ops/work-packages/WP-<số>-<slug>.md theo đúng 7 mục của template.
Mục "Files in scope" phải liệt kê đường dẫn chính xác, không dùng dấu sao.
Mục "Acceptance test" phải là lệnh chạy được hoặc bước kiểm thủ công xác minh được.
Xuất markdown đầy đủ trong một khối code.
```

2. Commit file WP vào repo bằng giao diện GitHub.
3. Sang Codex, giao task trỏ tới đúng file WP đó.
4. Đọc PR → merge hoặc yêu cầu sửa.
5. Cập nhật `engine/ops/backlog.md`.

**Nguyên tắc bất di bất dịch: một WP = một task Codex = một PR.**

---

# Sai lầm hay gặp của người mới

| Sai lầm | Hậu quả | Cách tránh |
|---|---|---|
| Bảo agent "làm hết đi" | PR khổng lồ không đọc nổi, merge mù, hệ thống vỡ sau 3 wave | Một WP một task |
| Đọc hết 63 file trước khi bắt đầu | Rối, nản, bỏ cuộc | Chỉ 10 file ở `START-HERE.md` |
| Viết trước toàn bộ contract và prompt pack | Viết trong lúc chưa biết gì, phải viết lại | Viết đúng trước wave cần |
| Sửa tay khi PR sai | Agent không học, lần sau sai y hệt | Comment vào PR, giao lại task |
| Upload cả chục file vào Project | Trả lời loãng, chất lượng tụt | Chỉ 3 nhóm file ở Bước 3 |
| Một chat dùng cho mọi việc | Ngữ cảnh nhiễu, agent quên chỉ dẫn | Một chat một chủ đề |
| Cấp quyền GitHub cho toàn bộ tài khoản | Bề mặt rủi ro lớn không cần thiết | Only select repositories |
| Nhảy sang Wave 2 khi Wave 1 chưa xong | Nợ kỹ thuật dồn, mất kiểm soát | Đọc DoD trong `07-delivery-plan.md` |
<<<END>>>

<<<FILE: engine/docs/09-document-index.md>>>
# 09 · Danh mục tài liệu

> **Đừng đọc file này trước.** Nếu anh mới bắt đầu, đọc `START-HERE.md` — nó chỉ liệt kê 10 file
> bắt buộc. File này là danh mục đầy đủ để tra cứu, không phải danh sách việc phải làm.

Cột **Tầng**: `BẮT BUỘC` = cần trước khi bắt đầu · `W{n}` = viết trước Wave n · `SỐNG` = viết dần
trong lúc chạy · `THAM KHẢO` = đọc một lần rồi để đó.

Toàn bộ tài liệu của dự án, ý nghĩa và ai đọc. Không có tài liệu nào ngoài danh sách này.

## Tầng A · Định hướng (người viết, agent chỉ đọc)

| File | Nội dung | Ý nghĩa | Ai đọc |
|---|---|---|---|
| `PROJECT.md` **[BẮT BUỘC]** | Tên, naming block, mục tiêu, non-goals, nguyên tắc | Điểm neo duy nhất. Đổi tên dự án chỉ sửa ở đây | Người + agent |
| `README.md` | Cửa vào repo, bản đồ thư mục | Chỉ đường cho người mới | Người |
| `AGENTS.md` **[BẮT BUỘC]** | Chỉ dẫn thường trực cho Codex | File agent đọc tự động mọi task. Quan trọng nhất của build pack | Agent |
| `engine/docs/00-vision.md` **[THAM KHẢO]** | Vì sao làm, khán giả, tiêu chí thành công đo được | Ngăn dự án trôi sang "làm cho vui" | Người |
| `engine/docs/01-architecture.md` **[BẮT BUỘC]** | Ba mặt phẳng, luồng, quyết định, giới hạn nền tảng | Bản vẽ kỹ thuật. Agent tra ở đây thay vì tự chọn | Người + agent |
| `engine/engine/docs/02-adr/ADR-0001..0005` | Mỗi quyết định lớn: bối cảnh, phương án loại, lựa chọn, hệ quả | Lịch sử **tại sao**. Ngăn lật lại quyết định cũ mỗi lần gặp khó | Người + agent |
| `engine/docs/03-glossary.md` **[THAM KHẢO]** | Định nghĩa 15 thuật ngữ lõi | Anh và agent nói cùng một thứ tiếng | Người + agent |
| `engine/docs/04-nfr.md` **[BẮT BUỘC]** | Trần chi phí, thời gian, chất lượng, quota, bảo mật | Ràng buộc agent luôn quên nếu không viết ra | Agent |
| `engine/docs/05-runbook.md` **[SỐNG]** | Chạy tập, xử lý sự cố, rollback, xoay khoá | Sổ tay vận hành hằng ngày | Người |
| `engine/docs/06-risk-register.md` **[SỐNG]** | 12 rủi ro: phòng ngừa, giảm thiểu, dấu hiệu sớm | Rà ở đầu mỗi wave | Người |
| `engine/docs/07-delivery-plan.md` | 7 wave, từng bước, outcome, DoD | Kế hoạch triển khai | Người |
| `engine/docs/08-getting-started.md` | Từng bước khởi động với ChatGPT Work + Codex | Hướng dẫn cho người mới | Người |
| `engine/docs/09-document-index.md` | Chính file này | Bản đồ tài liệu | Người |

## Tầng B · Contract (xương sống)

| File | Artifact tương ứng | Ý nghĩa |
|---|---|---|
| `engine/contracts/README.md` | — | Quy tắc đổi contract + bảng ánh xạ stage ↔ artifact |
| `engine/contracts/signals.schema.json` | `signals.json` | Tín hiệu chủ đề và bảng chấm điểm. Chứa bộ lọc `thresholdMatrixFeasible` |
| `engine/contracts/brief.schema.json` | `00-brief.json` | Đề tài + thesis. Ràng buộc `createdBy: human` |
| `engine/contracts/sources.schema.json` | `01-sources.json` | Sổ nguồn. Publisher giới hạn theo danh sách trắng |
| `engine/contracts/factcheck.schema.json` | `02-factcheck.json` | Kết quả đối chất + mức rủi ro YMYL |
| `engine/contracts/outline.schema.json` | `03-outline.json` | 7 mốc cấu trúc, ma trận 3 tầng, cầu nối tò mò |
| `engine/contracts/script.schema.json` | `04-script.md` | Ràng buộc đủ 6 thiết bị và ≥3 thuật ngữ lexicon |
| `engine/contracts/storyboard.schema.json` | `05-storyboard.json` | Scene, layout đóng, license bắt buộc |
| `engine/contracts/timing.schema.json` | `06-timing.json` | Căn chỉnh VO, ràng buộc loudness |
| `engine/contracts/render-manifest.schema.json` | `07-render-manifest.json` | Chunk render song song + kết quả QA |
| `engine/contracts/package.schema.json` | `08-package.json` | 5 title, 3 thumbnail, description, chapter |
| `engine/contracts/publication.schema.json` | `08-publication.json` | Trạng thái đăng, khai báo AI, quota đã dùng |
| `engine/contracts/metrics.schema.json` | `09-metrics.json` | Số liệu ở 3 mốc thời gian |
| `engine/contracts/pipeline-state.schema.json` | `pipeline/state.json` | Trạng thái toàn cục, cockpit đọc file này |

## Tầng C · Build pack

| File | Nội dung | Ý nghĩa |
|---|---|---|
| `engine/ops/guardrails.md` **[BẮT BUỘC]** | 23 điều cấm và phải làm | Hàng rào. Thiếu nó agent sẽ "cải tiến" và làm vỡ hệ thống |
| `engine/ops/definition-of-done.md` | DoD chung cho mọi WP | Chuẩn nghiệm thu, tránh tranh cãi |
| `engine/ops/wp-template.md` | Mẫu 7 mục của một work package | Bảo đảm mọi WP đủ thông tin để agent không phải đoán |
| `engine/ops/backlog.md` | 27 WP xếp theo wave và phụ thuộc | Bảng điều khiển tiến độ |
| `engine/ops/work-packages/WP-000..003` | 4 WP đầu, đã viết đầy đủ | Đủ để bắt đầu Wave 1 ngay |

## Tầng D · Thư viện nghiệp vụ (tài sản lâu dài nhất)

| File | Nội dung | Ý nghĩa |
|---|---|---|
| `channels/us-personal-finance/channel-bible.md` **[BẮT BUỘC]** | Định vị, khán giả, giọng, 6 pillar, cấm kỵ | Bản sắc kênh. Đổi ở đây thì cả kênh đổi |
| `genres/data-explainer/format-spec.json` **[BẮT BUỘC]** | 7 mốc cấu trúc + 6 thiết bị nội dung, máy đọc được | Kết quả teardown mã hoá thành ràng buộc. Quyết định chất lượng đầu ra hơn mọi phần code |
| `channels/us-personal-finance/title-formulas.md` **[W5]** | 7 khuôn tiêu đề bản Mỹ | Packager sinh 5 title theo đây |
| `channels/us-personal-finance/thumbnail-spec.md` **[W5]** | 4 slot cố định, lý do bỏ mascot | Giữ tính bất biến của khuôn, thay lớp hình ảnh |
| `genres/data-explainer/visual-system.md` **[W2]** | Palette, typography, chart grammar, motion | Agent không được tự chọn màu hay font |
| `channels/us-personal-finance/lexicon.md` **[W3]** | 10 thuật ngữ sở hữu bản tiếng Anh | Xây thương hiệu tư tưởng bằng ngôn ngữ |
| `channels/us-personal-finance/topic-map.md` **[W6]** | Bộ lọc chọn đề tài + 12 tập đầu | Signal Scan đọc để biết khoảng trống ở đâu |
| `genres/data-explainer/compliance.md` **[W3]** | YMYL, disclaimer, khai báo AI, bản quyền | Ba lớp bảo vệ trước rủi ro R1 và R7 |
| `channels/us-personal-finance/data-sources.md` **[W3]** | Danh sách trắng 8 nguồn số liệu Mỹ | Researcher chỉ được lấy số từ đây |
| `genres/data-explainer/prompts/README.md` | Nguyên tắc chung prompt pack | |
| `genres/data-explainer/prompts/strategist.md` | Persona S01–S02 | |
| `genres/data-explainer/prompts/researcher.md` | Persona S04 | |
| `genres/data-explainer/prompts/factchecker.md` | Persona S05, đối kháng với Researcher | Phải là hai lần gọi riêng, không gộp |
| `genres/data-explainer/prompts/scriptwriter.md` | Persona S06–S07 | Prompt quan trọng nhất |
| `genres/data-explainer/prompts/visual-director.md` | Persona S09 | |
| `genres/data-explainer/prompts/packager.md` | Persona S14a | |
| `genres/data-explainer/prompts/analyst.md` | Persona S14d | |
| `portfolio/references/anhbataichinh/teardown.md` | Phân tích kênh tham chiếu | Nguồn của `format-spec.json`, `title-formulas.md`, `thumbnail-spec.md` |

## Tầng E · Cấu hình và mã

| File | Nội dung |
|---|---|
| `config/secrets.example.md` | **Tên** secret cần khai, không bao giờ chứa giá trị |
| `.gitignore` | Chặn binary và secret |
| `CHANGELOG.md` | Nhật ký theo wave |
| `pipeline/state.json` | Trạng thái khởi tạo rỗng |
| `.github/workflows/` | Sinh ở Wave 1 (WP-001, WP-002) |
| `engine/app/` | Sinh ở Wave 1 (WP-003) |
| `templates/` | Sinh ở Wave 2 (WP-005, WP-006) |

## Tầng F · Sinh tự động, không viết tay

`episodes/{id}/00-brief.json` → `09-insight.md`. Pipeline ghi ra, anh không tạo thủ công.
<<<END>>>

<<<FILE: engine/docs/10-production-spec.md>>>
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
<<<END>>>

<<<FILE: engine/docs/11-quality-gates.md>>>
# 11 · Quality Gates — dịch kiểm tra về đầu chuỗi

Tài liệu xử lý điểm thất bại lịch sử thứ ba: **các bước đầu không đạt, dồn gánh nặng sang QA cuối
chuỗi, vòng lặp sửa nhiều mà chất lượng vẫn không lên.**

## Chẩn đoán

Đây là lỗi kinh điển: **kiểm tra chất lượng vào sản phẩm thay vì xây chất lượng vào quy trình.**

Ba triệu chứng, và ba nguyên nhân gốc:

| Triệu chứng | Nguyên nhân gốc |
|---|---|
| QA bắt được nhiều lỗi | Lỗi được phép sinh ra ở stage trước mà không bị chặn ngay tại chỗ |
| Sửa nhiều vòng mà không lên chất lượng | Vòng lặp sửa *sản phẩm*, không sửa *đặc tả sinh ra sản phẩm* |
| Mỗi vòng lặp rất đắt và chậm | Điểm kiểm nằm sau bước đắt nhất (render), không nằm trước |

Sửa cả ba bằng năm cơ chế dưới đây.

---

## Cơ chế 1 · Preflight — kiểm storyboard trước khi render

**Thay đổi quan trọng nhất.** Thêm stage **S09.5 · Preflight** ngay sau storyboard.

Phần lớn tiêu chí chất lượng là **phân tích tĩnh trên file JSON**, không cần pixel. Chi phí gần
bằng không, thời gian vài giây.

| Kiểm tra | Nguồn dữ liệu | Trước đây kiểm ở |
|---|---|---|
| `onScreenWordRatio` ≤ 0,22 | tổng `onScreenWords` / số từ script | S13 (sau render) |
| Phân bổ `shotSize` (15-25/45-60/20-30%) | đếm trên storyboard | S13 |
| `durationStdDevRatio` ≥ 0,4 | thống kê `durationMs` | S13 |
| `staticFrameMaxMs` ≤ 400 | quét `camera.move` | S13 |
| J-cut: `audioLeadMs` 400–1000 | mọi scene `camera-move` | chưa kiểm |
| Morph bắt buộc khi `claimIds` giao nhau | so sánh scene liền kề | chưa kiểm |
| Stock ≤ 15% thời lượng | tổng thời lượng scene có stock | S13 |
| Không lặp layout+variant liên tiếp | quét tuần tự | chưa kiểm |
| Mọi số trong `data` có `claimId` khớp `sources.json` | đối chiếu | S13 |
| Hướng nhất quán (trục thời gian, phía "xấu") | quét toạ độ camera | chưa kiểm |
| Bố cục cấm (căn giữa, gạch đầu dòng) | quét `layout` + `onScreenWords` | chưa kiểm |
| Mọi scene có asset | quét | S13 |

**Kết quả:** khoảng 80% lỗi mà S13 từng bắt, giờ bị bắt ở S09.5 với chi phí ~0 USD và ~5 giây,
thay vì ~6 USD và ~25 phút.

Preflight fail → quay lại S09 với báo cáo lỗi cụ thể, **không đi tiếp**.

---

## Cơ chế 2 · Proof render — 15 giây trước 20 phút

Thêm stage **S11.5 · Proof Render** trước render đầy đủ.

Thay vì render 36.000 khung rồi mới biết hình xấu, render trước:
- **12 ảnh tĩnh** ở các mốc: cold open, mỗi beat mở đầu, ma trận ngưỡng, hai ngã rẽ, closing loop
- **Một clip 15 giây** của cú chuyển cảnh khó nhất trong tập (morph phức tạp nhất, hoặc cú di
  chuyển máy quay dài nhất)

Chạy QA thị giác và QA chuyển động trên đúng phần đó.

| | Proof render | Full render |
|---|---|---|
| Số khung | ~460 | 36.000 |
| Thời gian | ~1–2 phút | ~10–25 phút |
| Phút runner | ~5 | 180–400 |
| Chi phí | ~0,1 USD | ~5 USD |

Proof fail → quay về S09 hoặc S11 tuỳ nguyên nhân. **Chỉ khi proof pass mới render đầy đủ.**

---

## Cơ chế 3 · Định tuyến nguyên nhân gốc

Khi QA fail, báo cáo **bắt buộc nêu stage gây ra lỗi**, và pipeline chạy lại **từ stage đó**,
không phải từ stage kề trước.

| Lỗi phát hiện | Nguyên nhân gốc | Chạy lại từ |
|---|---|---|
| `onScreenWordRatio` > 0,22 | Storyboard đặt quá nhiều chữ | S09 |
| Chart sai số | Storyboard lấy sai claim | S09 |
| Chữ trùng nguyên câu VO | Script viết câu không thể rút gọn | **S07** |
| Nhịp đều như slide | Storyboard cắt theo câu | S09 |
| Thiếu thiết bị nội dung | Script | S07 |
| Claim không nguồn | Research | S04 |
| Ma trận ngưỡng yếu | Thesis không định lượng được | **S03 — Gate 1** |
| Layout vỡ bố cục | Template | WP layout, không phải tập này |

Chạy lại từ S12 khi nguyên nhân ở S09 là lãng phí thuần tuý — đây chính là cơ chế đốt thời gian
mà không lên chất lượng.

---

## Cơ chế 4 · Retry có giới hạn, có leo thang

Vòng lặp vô hạn là cách chắc chắn để tốn nhiều mà không đạt.

| Lần fail | Hành động |
|---|---|
| 1 | Chạy lại stage đó, **chèn nguyên văn báo cáo lỗi vào prompt** |
| 2 | Chạy lại lần cuối với prompt đã thu hẹp phạm vi vào đúng lỗi |
| 3 | **Dừng. Chuyển sang Gate người.** Không retry lần ba |

Cộng thêm: **cùng một loại lỗi fail 2 lần trên 2 tập khác nhau → bắt buộc mở PR sửa đặc tả**
(prompt pack, `format-spec.json`, hoặc `motion-grammar.md`). Không được retry tiếp cho tới khi
PR đó được duyệt.

Đây là cơ chế biến vòng lặp sửa sản phẩm thành vòng lặp sửa quy trình. Thiếu nó, lỗi lặp mãi mãi.

---

## Cơ chế 5 · Self-check bắt buộc trong mỗi persona

Mỗi persona phải tự khai kết quả kiểm trước khi xuất artifact. Validator so **số khai** với
**số tính được**. Lệch nhau là fail ngay, kể cả khi số thực tế vẫn trong ngưỡng.

Ví dụ Visual Director phải khai:
```json
"selfCheck": {
  "onScreenWordRatio": 0.19,
  "shotSizeMix": {"wide": 0.20, "medium": 0.52, "close": 0.28},
  "durationStdDevRatio": 0.47,
  "jcutCoverage": 1.0,
  "morphWhereRequired": true,
  "stockRatio": 0.11
}
```

Lý do: buộc agent **thực sự đếm** thay vì cảm tính. Trong thực tế đây là thứ nâng tỷ lệ đạt lần
đầu nhiều nhất, vì phần lớn lỗi sinh ra từ việc agent không kiểm tra chính đầu ra của mình.

---

## Chỉ số theo dõi: First-Pass Yield

**Đừng đo "cuối cùng có đạt không". Đo "có đạt ngay lần đầu không".**

FPY của mỗi stage = số lần pass ngay lần đầu / tổng số lần chạy.

| FPY | Chẩn đoán | Hành động |
|---|---|---|
| ≥ 90% | Stage khoẻ | Không làm gì |
| 70–90% | Đặc tả hơi mơ hồ | Bổ sung ví dụ vào prompt pack |
| < 70% | **Đặc tả sai, không phải agent kém** | Dừng sản xuất, viết lại đặc tả stage đó |

FPY dưới 70% nghĩa là anh đang yêu cầu một thứ mà chính tài liệu của anh không mô tả đủ rõ.
Thêm retry không giải quyết được. **Sửa đặc tả.**

Ghi FPY vào `pipeline/state.json`, hiển thị trên cockpit theo stage.

---

## Nguyên tắc bao trùm

> Mỗi lần QA bắt được lỗi, câu hỏi đúng không phải "sửa thế nào" mà là
> **"vì sao lỗi này được phép sinh ra, và kiểm ở đâu thì rẻ hơn?"**

Nếu câu trả lời là "kiểm sớm hơn được", thì thêm kiểm tra đó vào stage sớm hơn, ngay lập tức.
Đây là công việc thường trực, không phải việc làm một lần.

---

## Bảng vị trí kiểm tra sau khi dịch về đầu chuỗi

| Điểm kiểm | Kiểm gì | Chi phí một lần fail |
|---|---|---|
| S02 | Đề tài dựng được ma trận ngưỡng không | ~0,2 USD |
| S03 Gate 1 | Thesis có định lượng được không | 5 phút của anh |
| S05 | Claim có nguồn, không vi phạm YMYL | ~2 USD |
| S07 self-check | Đủ 6 thiết bị, ≥3 lexicon, mọi số có claimId | ~4 USD |
| S08 Gate 2 | Đọc thành tiếng có vấp không | 15 phút của anh |
| **S09.5 Preflight** | **12 kiểm tra tĩnh — 80% lỗi bắt ở đây** | **~0 USD, 5 giây** |
| **S11.5 Proof render** | **12 ảnh + clip 15 giây** | **~0,1 USD, 2 phút** |
| S13 | Chỉ còn lỗi thật sự cần pixel đầy đủ | ~5 USD, 25 phút |
| S13 Gate 3 | Spot check | 5 phút của anh |

Trước khi dịch về đầu chuỗi: hầu hết lỗi bị bắt ở S13, mỗi lần fail tốn ~5 USD và ~25 phút.
Sau khi dịch: hầu hết bị bắt ở S09.5, mỗi lần fail tốn ~0 USD và ~5 giây.

**Đó là toàn bộ khác biệt.**
<<<END>>>

<<<FILE: engine/docs/12-success-criteria.md>>>
# 12 · Success Criteria

Tiêu chí thành công ở 5 tầng, từ mỗi tập tới cả dự án. Kèm điều kiện dừng.

---

## Tầng 1 · Một tập đạt chuẩn

Tự động kiểm, không cần phán đoán.

| # | Tiêu chí | Ngưỡng | Kiểm ở |
|---|---|---|---|
| 1 | Thesis lấy từ bank, không viết tại chỗ | `thesisId` tồn tại | S03 |
| 2 | Không trùng archetype/pillar với tập trước | — | S03 |
| 3 | Claim số liệu có nguồn | 100% | S05 |
| 4 | Không cờ đỏ YMYL | 0 | S05 |
| 5 | Có ≥1 con số tự tính chưa ai công bố | ≥1 | S05 |
| 6 | Đủ 6 thiết bị nội dung | 6/6 | S07 |
| 7 | Từ vựng sở hữu | 3–5 | S07 |
| 8 | Tỷ lệ chữ trên màn hình | ≤22% | S09.5 |
| 9 | Phân bổ cỡ cảnh | 15-25 / 45-60 / 20-30% | S09.5 |
| 10 | Độ lệch chuẩn thời lượng scene | ≥40% trung bình | S09.5 |
| 11 | J-cut phủ toàn bộ camera-move | 100%, 400–1000ms | S09.5 |
| 12 | Morph khi trùng claimIds | 100% | S09.5 |
| 13 | Khung tĩnh tối đa | ≤400ms | S09.5 |
| 14 | Tỷ lệ stock | ≤15% | S09.5 |
| 15 | Điểm thị giác (Frame Test) | ≥8/10 | S11.5 → S13 |
| 16 | Bài kiểm Slideshow 3 phần | pass cả 3 | S13 |
| 17 | Loudness VO | −14 LUFS ±0,5 | S13 |
| 18 | Lệch caption | ≤200ms | S13 |
| 19 | Lệch SFX | ≤60ms | S13 |
| 20 | Mật độ SFX | 0,30–0,40 | S13 |

**Tập đạt = 20/20.** Không có trạng thái "tạm chấp nhận".

## Tầng 2 · Quy trình khoẻ

Không đo sản phẩm, đo cỗ máy làm ra sản phẩm.

| Chỉ số | Ngưỡng khoẻ | Ngưỡng báo động | Hành động khi báo động |
|---|---|---|---|
| First-Pass Yield mỗi stage | ≥90% | <70% | **Dừng sản xuất, viết lại đặc tả stage đó** |
| Số retry trung bình mỗi tập | ≤1 | ≥3 | Rà `rootCauseStage`, sửa upstream |
| Chi phí thực tế mỗi tập | ≤35 USD | >45 USD | Cắt theo thứ tự trong `04-nfr.md` |
| Thời gian người thật mỗi tập | ≤58 phút | >90 phút | Rà gate nào đang tốn thời gian |
| Thesis Bank | ≥20 | <15 | **Ngừng nhận tập mới** |
| Tỷ lệ script bị sửa ở Gate 2 | 20–60% | <10% | Dấu hiệu duyệt qua loa, không phải script tốt lên |

Dòng cuối là cơ chế phát hiện chính anh đang rubber-stamp. Nếu tỷ lệ sửa tụt về gần 0, đó gần như
chắc chắn là mệt mỏi chứ không phải chất lượng tăng.

## Tầng 3 · Cổng chuyển wave

| Wave | Điều kiện qua |
|---|---|
| 0 → 1 | Tài liệu đầy đủ, đọc lại không mâu thuẫn |
| 1 → 2 | Bấm nút trên trình duyệt → job chạy → file vào repo → UI hiển thị |
| 2 → 3 | **Layout Gallery được duyệt từng layout theo 8 tiêu chí** + clip 20 giây máy quay di chuyển không có cảm giác slide + clip morph mượt |
| 3 → 4 | Từ 2 câu thesis ra kịch bản 20 phút, mọi số có nguồn, đọc như người Mỹ viết |
| 4 → 5 | Một tập hoàn chỉnh đạt 20/20 tiêu chí tầng 1 |
| 5 → 6 | Một tập đi từ thesis đến công khai, chỉ chạm 3 gate |

## Tầng 4 · Kênh — theo pha phân phối

Chỉ số quyết định **đổi theo pha**. Tối ưu sai chỉ số theo pha là cách phổ biến để tốn công vô ích.

| Pha | Sub | Chỉ số quyết định | Ngưỡng đạt | Nhịp |
|---|---|---|---|---|
| **0** | 0–100 | Retention 30 giây | ≥55% | 3 tập/tuần |
| **1** | 100–1.000 | CTR | ≥4% | 3 tập/tuần |
| **2** | 1.000+ | Average view duration · sub/view | ≥6 phút | 7 tập/tuần |

### Điều kiện mở khoá nhịp 7 tập/tuần

Cả **bốn** phải đạt, thiếu một thì ở lại pha hiện tại:

1. 10 tập đầu đều đạt `visualScore` ≥8/10 **ngay lần render đầu tiên**
2. Cả 12 layout đã duyệt qua Gallery, không cái nào "tạm chấp nhận"
3. Chi phí trung bình thực tế ≤35 USD/tập
4. Retention 30 giây trung bình 10 tập ≥55%

## Tầng 5 · Dự án

| Mốc | Tiêu chí |
|---|---|
| Nhà máy chạy được | Một tập đi trọn 18 stage không can thiệp ngoài 3 gate |
| Nhà máy chạy bền | 10 tập liên tiếp không tập nào cần retry quá 1 lần |
| Sản phẩm đạt chuẩn | 10 tập liên tiếp đạt 20/20 tiêu chí tầng 1 |
| Kênh có tín hiệu | Retention 30 giây ≥55% trung bình 10 tập |
| Kênh tăng trưởng | Đạt điều kiện mở khoá pha 2 |
| Hoà vốn | Doanh thu × 0,7 ≥ 1.200 USD/tháng (xem ghi chú thuế) |

**Ghi chú thuế:** Việt Nam chưa có hiệp định thuế được phê chuẩn với Mỹ, nên doanh thu từ người
xem Mỹ bị khấu trừ 30%. Kênh nhắm 100% khán giả Mỹ, nên hệ số 0,7 áp cho gần như toàn bộ doanh
thu. Điểm hoà vốn thực tế cao hơn con số danh nghĩa khoảng 43%. Phải nộp W-8BEN trong AdSense
trước tập đầu tiên — không nộp thì bị khấu trừ tới 24% trên doanh thu **toàn cầu**.

---

## Điều kiện dừng

Đặt ra trước để mỗi lần khó khăn không phải tự hỏi "có nên bỏ không" — chỉ cần kiểm tiêu chí.
Nghịch lý là chính vì có nó mà việc tiếp tục trở nên dễ hơn.

| Điều kiện | Hành động |
|---|---|
| Tiêu hết 600 USD ngân sách xây dựng mà Layout Gallery chưa qua | **Dừng, đánh giá lại giả định về hình ảnh** |
| Một wave kéo dài mà chưa có gì chạy được | Cắt phạm vi xuống Fast Lane |
| FPY của một stage <70% sau 2 lần sửa đặc tả | Đơn giản hoá stage đó hoặc bỏ hẳn |
| Wave 1b: cả 3 biến thể format đều retention 30s <45% | **Dừng. Thiết kế lại format trước khi sang kênh 2** |
| Sau 30 tập: retention 30 giây <45% và sub <300 | **Dừng sản xuất. Đánh giá lại toàn bộ giả định về nội dung, không tự động làm tiếp** |
| Tổng chi phí danh mục chạm trần | Dừng kênh yếu nhất, không cắt đều |
| View trung bình 10 tập gần nhất thấp hơn 10 tập trước, hai lần liên tiếp | Giảm về 3 tập/tuần, rà chất lượng |
| Xuất hiện ý nghĩ "làm lại từ đầu cho sạch" | **Đây là dấu hiệu R12. Dừng lại, đọc `engine/docs/06-risk-register.md`** |

Dòng cuối không phải đùa. Đã có ba lần khởi động trước, và ý nghĩ đó là triệu chứng chứ không
phải giải pháp.
<<<END>>>

<<<FILE: engine/docs/13-upgrade-safety.md>>>
# 13 · Upgrade Safety

Sáu cơ chế cho phép sửa đổi và nâng cấp mà không ảnh hưởng cấu phần đang vận hành.

## 1 · Versioning — nền của mọi thứ khác

Mỗi episode ghi lại **phiên bản** của contract, Genre Pack, Channel Pack và prompt đã dùng để tạo
ra nó, vào `00-brief.json`:

```json
"versions": {
  "engine": "0.1.0",
  "genre": "data-explainer@0.3.0",
  "channel": "us-personal-finance@0.2.0",
  "prompts": {"researcher": "1.2", "scriptwriter": "2.0"}
}
```

Không có điều này thì không tái lập được tập cũ, không so sánh được A/B, và không biết một thay
đổi ảnh hưởng tập nào.

## 2 · Quy tắc 3 tập

Mọi thay đổi ở `/engine` hoặc `/genres` phải **chạy trên kênh 1 qua ít nhất 3 tập** trước khi áp
cho kênh 2 và 3.

Không cần hạ tầng staging — chỉ cần một nhãn trên PR và kỷ luật.

## 3 · Golden set trong CI

5 brief cố định. Mỗi PR chạm prompt phải chạy lại và so output với bản chuẩn. Chi phí ~2 USD mỗi
lần, rẻ hơn nhiều so với phát hiện sau 10 tập.

Đây là bộ hồi quy cho **nội dung**, tương đương test hồi quy cho code.

## 4 · Thay đổi cộng thêm, không thay thế

- Layout mới thì **thêm** vào `layouts.json`, không sửa layout cũ
- Prompt mới thì tạo phiên bản mới, kênh chuyển sang khi sẵn sàng
- Contract chỉ được **thêm trường tuỳ chọn**. Thêm trường bắt buộc là thay đổi phá vỡ, phải qua ADR

## 5 · Cờ phiên bản theo kênh

`channel.json` có `engineVersion`. Kênh 1 lên `0.2.0` trước, kênh 2 và 3 giữ `0.1.0` cho tới khi
yên tâm.

Đây là cách thay môi trường staging bằng cấu hình — phù hợp với ràng buộc zero-local.

## 6 · Đóng băng khi đang chạy

Một episode đã bắt đầu pipeline thì **dùng phiên bản đã ghi ở lúc bắt đầu** cho tới khi xong.
Không nhận thay đổi giữa chừng. Tránh trường hợp tập chạy nửa chừng với hai phiên bản prompt
khác nhau.

## Hai loại nghiệm thu

Codex không chạy được mọi acceptance test — sandbox không có secret production.

| Loại | Chạy ở đâu | Ví dụ |
|---|---|---|
| **Loại 1** | Sandbox Codex, trước khi mở PR | schema, typecheck, unit test, render 5 giây dữ liệu giả |
| **Loại 2** | Actions sau khi merge, có secret thật | render đầy đủ, TTS thật, upload, so sánh cặp thị giác |

Mỗi WP phải ghi rõ acceptance test thuộc loại nào.
<<<END>>>

<<<FILE: engine/library/cinematography.md>>>
# Cinematography — kỹ thuật video thật áp vào canvas

Tài liệu học nghề. Rút từ ngữ pháp dựng phim và motion design chuyên nghiệp, chỉ giữ phần
chuyển giao được sang hệ canvas 2D + máy quay ảo của Remotion.

Đọc cùng `motion-grammar.md` (ràng buộc bắt buộc). File này giải thích **tại sao** các ràng buộc
đó tồn tại, và cho thêm kỹ thuật để nâng chất.

---

## 1. J-cut — kỹ thuật đòn bẩy cao nhất

**Đây là thứ duy nhất quan trọng nhất trong toàn bộ tài liệu này.**

Slide luôn đổi hình và đổi lời **cùng lúc**. Phim gần như không bao giờ làm vậy.

| Kiểu cắt | Cơ chế | Cảm giác |
|---|---|---|
| Cắt thẳng | Hình và tiếng đổi cùng lúc | Slide, máy móc |
| **J-cut** | **Tiếng của ý mới bắt đầu TRƯỚC khi hình đến 0,4–1,0 giây** | Chuyên nghiệp, có đà |
| **L-cut** | Tiếng của ý cũ kéo dài qua hình mới 0,3–0,8 giây | Mượt, liên tục |

Trong hệ của anh: máy quay bắt đầu di chuyển tới đối tượng mới **sau khi** VO đã nói được vài từ
đầu của ý mới. Người xem nghe trước, thấy sau — não họ đã đợi sẵn hình, nên khi hình tới thì cảm
giác là *đến đúng lúc* chứ không phải *bị chuyển sang*.

Cài đặt: mọi scene có `continuity: "camera-move"` phải có `audioLeadMs` từ 400 đến 1000.
Cấm giá trị 0 trừ khi cố ý tạo cú sốc.

Chỉ riêng việc này đã xoá được phần lớn cảm giác trình chiếu.

---

## 2. Từ vựng chuyển động máy quay — mỗi cú phải có lý do

Chuyển động không có động cơ trông như màn hình chờ. Mỗi loại chuyển động mang một nghĩa cố định.
Dùng sai nghĩa thì người xem thấy sai mà không biết vì sao.

| Chuyển động | Nghĩa | Dùng khi |
|---|---|---|
| **Pan ngang** | So sánh giữa các thứ ngang hàng | Đi qua 3 ngưỡng của ma trận |
| **Dolly in** (đẩy vào) | Cam kết, "cái này quan trọng" | Ngay trước một con số quyết định |
| **Dolly out** (kéo ra) | Tiết lộ bối cảnh lớn hơn | Sau một chi tiết, mở ra toàn cảnh |
| **Arc** (vòng quanh) | Khảo sát, xem xét nhiều mặt | Sơ đồ dòng tiền, cấu trúc |
| **Whip pan** (quét nhanh + motion blur) | Đổi chủ đề dứt khoát | Ranh giới beat |
| **Push-in chậm** (2–4% trong 8 giây) | Tăng căng thẳng ngầm | Đoạn kể chuyện nhân vật |

**Quy tắc hướng nhất quán** (tương đương luật 180 độ trong phim): nếu thời gian chạy trái→phải
thì luôn trái→phải, cả tập. Nếu "xấu" nằm bên phải trục thì luôn bên phải. Đảo hướng giữa chừng
làm người xem mất phương hướng mà không biết tại sao.

---

## 3. Vật lý chuyển động — thứ tách nghiệp dư khỏi chuyên nghiệp

Đây là phần amateur bỏ qua nhiều nhất và cũng dễ sửa nhất.

| Kỹ thuật | Cách làm | Vì sao |
|---|---|---|
| **Ease, không bao giờ linear** | `cubic-bezier(0.22, 1, 0.36, 1)` | Vật thể thật có quán tính. Linear = máy móc |
| **Overshoot & settle** | Vượt đích 3–5% rồi lùi về trong 120ms | Cho cảm giác khối lượng |
| **Anticipation** | Lùi nhẹ 2% ngược hướng trong 80ms trước khi đi | Báo trước cho mắt |
| **Stagger** | Các phần tử đến lệch nhau 40–80ms, không cùng lúc | Cùng lúc = đồ hoạ. Lệch = sống |
| **Follow-through** | Phần tử phụ dừng sau phần tử chính 100ms | Vật lý thật |
| **Motion blur** | Bật khi tốc độ > 800px/giây | Không có blur thì mắt thấy giật |
| **Speed ramp** | Nhanh ở giữa cú di chuyển, chậm hai đầu | Rút ngắn thời gian mà không thấy vội |

Riêng **stagger** là thứ rẻ nhất và hiệu quả nhất: cùng một biểu đồ, cho các cột vào lệch nhau
60ms thay vì cùng lúc, cảm giác đổi hẳn.

---

## 4. Chiều sâu — làm 2D trông không phẳng

| Kỹ thuật | Cách làm |
|---|---|
| **Parallax** | Chia canvas thành 3 lớp. Lớp nền di chuyển 30% tốc độ máy quay, lớp giữa 100%, lớp trước 130% |
| **Độ sâu trường ảnh** | Blur 2–4px cho lớp không phải tiêu điểm |
| **Phân cấp kích thước** | Đối tượng "xa" nhỏ hơn và nhạt màu hơn (opacity 0.6) |
| **Đổ bóng có hướng** | Một hướng ánh sáng duy nhất cho cả tập, thường trên-trái |

Parallax là kỹ thuật hiệu quả nhất trên mỗi đơn vị công sức. Chỉ cần lớp nền chạy chậm hơn là
mắt lập tức đọc ra chiều sâu.

---

## 5. Bố cục — chỗ amateur hay sai nhất

| Nguyên tắc | Chi tiết |
|---|---|
| **Lead space** | Chừa khoảng trống ở phía máy quay đang đi tới. Đi sang phải thì để trống bên phải |
| **Lệch tâm** | Đặt tiêu điểm ở giao điểm 1/3. **Căn giữa = tĩnh = slide** |
| **Khoảng âm** | Chuyên nghiệp dùng khoảng trống nhiều hơn amateur tưởng. 40–60% khung trống là bình thường |
| **Đường dẫn mắt** | Trục biểu đồ, mũi tên, mép khối phải dẫn mắt tới tiêu điểm |
| **Một tiêu điểm** | Mỗi khung đúng một chỗ mắt nên nhìn. Hai chỗ = không chỗ nào |

---

## 6. Nhịp dựng

- **Cắt vào nhịp lời nói**, không cắt vào dấu chấm câu. Chỗ người dẫn nhấn giọng là chỗ cắt.
- **Biến thiên độ dài**: một chùm 4 cắt nhanh (1,5s) rồi một cú giữ dài (9s). Đều nhau là slide.
- **Nhịp thở**: sau một con số gây sốc, giữ 0,6–1,0 giây không có gì mới xảy ra. Cho người xem
  kịp thấm. Amateur luôn lấp đầy khoảng này.
- **Giữ lâu hơn sau tiết lộ**, ngắn hơn khi dựng bối cảnh.

---

## 7. Thống nhất thị giác

- **Một hướng sáng duy nhất** cho cả tập.
- **Grain nhẹ + vignette rất nhẹ** phủ toàn bộ: làm các phần tử đồ hoạ trông như thuộc cùng một
  thế giới thay vì các mảnh ghép. Đây là mẹo rẻ và hiệu quả.
- **Bảng màu hạn chế** — đã có trong `visual-system.md`.

---

## 8. Điều KHÔNG chuyển giao được

Đừng phí công bắt chước: shot-reverse-shot, rack focus cho hội thoại, quy tắc eyeline,
handheld rung mạnh, lens flare. Chúng thuộc ngữ pháp quay người thật, áp vào đồ hoạ dữ liệu
sẽ thành giả tạo.

---

## 9. Cách tự học — bài tập cụ thể

**Bài tập shot log.** Chọn 3 phút của một video giải thích chất lượng cao. Lập bảng, mỗi dòng
một cắt:

| Thời điểm | Cỡ cảnh | Chuyển động máy | Lý do đổi | Tiếng dẫn hình bao nhiêu ms |
|---|---|---|---|---|

Làm đủ 3 phút. Anh sẽ thấy ngay ba thứ: độ dài cắt biến thiên lớn thế nào, tiếng gần như luôn
dẫn trước hình, và tỷ lệ cỡ cảnh phân bố ra sao. Làm bài này với 3 video là đủ để hình thành
trực giác.

**Nguồn nên nghiên cứu** (xem cách dựng, không phải nội dung):
- Vox, Johnny Harris — chuyển động bản đồ và dữ liệu, dùng nhiều J-cut
- Kurzgesagt — canvas liên tục và parallax, gần nhất với mô hình của anh
- Bloomberg Originals, FT Film — đồ hoạ tài chính nghiêm túc, đúng ngành của anh
- Wendover / PolyMatter — chuyển động dữ liệu tiết chế, ngân sách thấp mà vẫn chuyên nghiệp

Xem **tắt tiếng** một lượt trước. Nếu vẫn theo dõi được thì đó là video làm tốt phần hình.

---

## 10. Ưu tiên triển khai

Không làm hết một lúc. Thứ tự theo tỷ lệ hiệu quả trên công sức:

| Ưu tiên | Kỹ thuật | Wave |
|---|---|---|
| 1 | J-cut (`audioLeadMs` 400–1000ms) | 2 |
| 2 | Ease + overshoot + stagger | 2 |
| 3 | Parallax 3 lớp | 2 |
| 4 | Từ vựng chuyển động máy quay có nghĩa | 2 |
| 5 | Lead space + lệch tâm | 2 |
| 6 | Nhịp thở sau tiết lộ | 3 |
| 7 | Motion blur + speed ramp | 4 |
| 8 | Grain + vignette thống nhất | 4 |

Bốn cái đầu phải xong trước khi qua cổng Layout Gallery (WP-006a).
<<<END>>>

<<<FILE: engine/library/motion-grammar.md>>>
# Motion Grammar

Tài liệu chống cảm giác "trình chiếu slide". Đây là điểm thất bại lịch sử thứ hai của dự án này,
độc lập với chất lượng từng khung hình.

**Chẩn đoán:** Remotion + một danh sách layout có tên, nếu không có ràng buộc, sẽ tự nhiên sinh ra
slide. Bốn dấu hiệu của slide: máy quay đứng yên · nội dung bị *thay thế* thay vì *biến đổi* ·
chữ trên màn hình lặp lại lời đọc · cắt cảnh theo ranh giới câu.

Sáu quy tắc dưới đây là ràng buộc bắt buộc, không phải gợi ý.

---

## Quy tắc 1 · Một canvas liên tục, không phải 200 slide rời

Đây là thay đổi cấu trúc quan trọng nhất.

Một tập **không phải** chuỗi 200 khung độc lập. Nó là **một mặt phẳng lớn duy nhất** (canvas
~6000×3400px) trên đó mọi biểu đồ, sơ đồ, số liệu nằm ở vị trí cố định. Video là hành trình
**máy quay di chuyển** trên mặt phẳng đó: pan, zoom, dolly.

Hệ quả cụ thể:
- Các đối tượng liên quan nằm gần nhau về mặt không gian. Đi từ chart A sang chart B là máy quay
  trượt qua, không phải cắt.
- Người xem xây được bản đồ tinh thần về "vùng nào nói về cái gì" — điều slide không bao giờ làm được.
- Quay lại một đối tượng đã xuất hiện thì máy quay quay về đúng chỗ cũ, không vẽ lại.

Trong Remotion: một `<div>` lớn với `transform: translate() scale()` được nội suy theo thời gian.
Layout không còn là "màn hình", mà là **vùng trên canvas**.

## Quy tắc 2 · Biến đổi, không thay thế

Nếu hai đối tượng liên tiếp **chia sẻ dữ liệu**, chúng phải là **một đối tượng biến hình**, không
phải hai đối tượng nối tiếp.

| Sai (slide) | Đúng (video) |
|---|---|
| Chart cột 3 mức → cắt → chart cột 3 mức khác | Cột cũ **co giãn** sang giá trị mới, nhãn trục **đổi chữ tại chỗ** |
| Hiện số 3.240 → cắt → hiện số 38.880 | Số **đếm lên** từ 3.240 tới 38.880 |
| Bảng ma trận → cắt → highlight hàng 2 | Bảng **giữ nguyên**, hàng 2 sáng lên, hai hàng kia mờ đi |

Quy tắc kiểm: nếu hai scene liên tiếp có `claimIds` giao nhau, chúng **phải** được gộp thành một
scene có transition nội bộ. Vi phạm là lỗi ở QA.

## Quy tắc 3 · Ngân sách chữ trên màn hình

Đây là quy tắc trực tiếp xử lý "nhiều text".

| Ràng buộc | Giá trị |
|---|---|
| Tổng số từ hiện trên màn hình cả tập | **≤ 22% số từ VO** |
| Số từ tối đa hiện cùng lúc trong một khung | **12 từ** |
| Chữ trên màn hình được phép trùng lời đọc | **Không bao giờ trùng nguyên câu** |
| Câu đầy đủ hiện trên màn hình | Tối đa **6 lần/tập** (quote card, hard rule) |

Chữ trên màn hình chỉ được là: **nhãn, con số, đơn vị, và một cụm từ khoá mỗi beat**.
Cấm tuyệt đối: hiện lại nguyên câu người dẫn vừa đọc; danh sách gạch đầu dòng; đoạn văn.

Lý do: khi chữ trên màn hình lặp lời đọc, người xem chuyển sang *đọc*, và trải nghiệm lập tức
thành đọc slide.

## Quy tắc 4 · Không khung nào đứng yên

**Mọi khung hình, mọi thời điểm, phải có ít nhất một phần tử đang chuyển động.**

Ba tầng chuyển động, luôn chồng lên nhau:

| Tầng | Nội dung | Luôn bật |
|---|---|---|
| Nền | Máy quay trôi chậm liên tục trên canvas: 8–20px/giây, hoặc scale 1.0→1.04 | Có |
| Giữa | Đối tượng dữ liệu đang vẽ, đang co giãn, đang đếm số | Khi có dữ liệu |
| Trước | Phần tử nhấn: mũi tên vẽ ra, vòng khoanh, nhãn trượt vào | Khi cần nhấn |

Cấm: khung tĩnh hoàn toàn quá **400ms** ở bất kỳ điểm nào trong tập.

## Quy tắc 5 · Cỡ cảnh phải thay đổi

Slide có một cỡ duy nhất. Video có ngữ pháp cỡ cảnh.

| Cỡ cảnh | Nội dung | Tỷ lệ bắt buộc |
|---|---|---|
| **Wide** | Nhìn toàn cảnh một vùng canvas, thấy quan hệ giữa nhiều đối tượng | 15–25% thời lượng |
| **Medium** | Một biểu đồ hoặc sơ đồ chiếm khung | 45–60% |
| **Close** | Một con số hoặc một chi tiết lấp đầy màn hình | 20–30% |

Không quá **4 scene liên tiếp cùng cỡ cảnh**. Mỗi beat phải mở bằng một cú thay đổi cỡ rõ rệt
(thường là wide để định vị, rồi đẩy vào medium).

## Quy tắc 6 · Cắt theo ý, không theo câu

Ranh giới scene bám vào **chỗ ý nghĩa đổi hướng**, không phải dấu chấm câu.

- Một scene có thể trải 4–5 câu nếu chúng cùng phát triển một ý.
- Một câu có thể chứa 2 scene nếu giữa câu có bước ngoặt.
- Thời lượng scene phải **biến thiên**: độ lệch chuẩn của thời lượng scene trong một tập
  ≥ 40% giá trị trung bình. Thời lượng đều tăm tắp là dấu hiệu chắc chắn của slide.

---

## Bố cục bị cấm hoàn toàn

Đây là chữ ký của slide, cấm xuất hiện dù chỉ một lần:

1. Tiêu đề căn giữa phía trên + danh sách gạch đầu dòng bên dưới
2. Bố cục "chữ trái, hình phải" hoặc ngược lại, lặp đi lặp lại
3. Khung có viền, đổ bóng, trông như thẻ slide đặt trên nền
4. Số trang, thanh tiến trình kiểu slide, "Phần 1/5" hiện trên màn hình
5. Chuyển cảnh kiểu presentation: lật, trượt ngang toàn khung, mờ chồng
6. Chữ xuất hiện từng dòng theo kiểu build của PowerPoint

## Bài kiểm Slideshow

Áp cho mọi tập trước khi đăng. Ba phần:

**Phần 1 — Bài kiểm PowerPoint.** Nếu toàn bộ nội dung hình ảnh của tập này có thể chuyển thành
một file PowerPoint mà **không mất gì**, thì nó không phải video. Trượt.

**Phần 2 — Bài kiểm 3 giây.** Lấy 5 cửa sổ 3 giây ngẫu nhiên. Trong mỗi cửa sổ phải có chuyển
động liên tục. Ít nhất **2 trên 5** cửa sổ phải có máy quay di chuyển giữa các đối tượng.

**Phần 3 — Bài kiểm tắt tiếng.** Tắt tiếng, xem 60 giây bất kỳ. Vẫn phải theo dõi được mạch lập
luận qua hình. Nếu chỉ thấy chữ đang đợi được đọc lên thì trượt.

Kết quả ghi vào `qa.report.json` trường `motionScore`. Trượt bất kỳ phần nào → tập không đăng.
<<<END>>>

<<<FILE: engine/library/prompts/README.md>>>
# Prompt Pack

Sáu persona, mỗi persona một file. Mỗi stage nạp đúng một file làm system prompt.

Nguyên tắc:
1. Persona không tự do sáng tạo. Mọi ràng buộc lấy từ `channel-bible.md`, `format-spec.json`,
   `compliance.md`, `data-sources.md`.
2. Researcher và Fact-checker phải là **hai lần gọi riêng biệt với prompt đối lập**. Không gộp.
3. Mỗi persona chỉ ghi ra artifact của mình, không được sửa artifact của persona khác.
4. Mọi output phải validate được bằng schema tương ứng.

| File | Stage | Artifact |
|---|---|---|
| `strategist.md` | S01–S02 | `signals.json` |
| `researcher.md` | S04 | `dossier.md`, `sources.json` |
| `factchecker.md` | S05 | `factcheck.json` |
| `scriptwriter.md` | S06–S07 | `outline.json`, `script.md` |
| `visual-director.md` | S09 | `storyboard.json` |
| `packager.md` | S14a | `package.json` |
| `analyst.md` | S14d | `insight.md` |
<<<END>>>

<<<FILE: engine/library/sound-design.md>>>
# Sound Design

Món hời rẻ nhất còn sót lại. Chi phí gần bằng không, tác động lên cảm nhận chất lượng rất lớn.

**Nguyên tắc cốt lõi: âm thanh bán chuyển động.** Một cú pan có whoosh thì cảm giác là chuyển động
thật; không có tiếng thì cảm giác là hình đang đổi. Đây là một phần của vấn đề slide, không chỉ là
vấn đề âm thanh.

## Bốn lớp

| Lớp | Nội dung | Mức |
|---|---|---|
| 1 · VO | Giọng đọc | **−14 LUFS**, true peak ≤ −1 dBTP |
| 2 · Music bed | Nhạc nền liên tục | **−22 LUFS**, duck −6 dB khi có VO |
| 3 · Motion SFX | Âm đồng bộ với chuyển động | đỉnh **−18 đến −24 dB** |
| 4 · Texture | Nền phòng rất nhẹ, giữ cho không "chết" | **−40 dB** |

Lớp 4 hay bị bỏ qua: im lặng tuyệt đối giữa các câu nghe như file bị lỗi. Một lớp nền cực nhẹ
làm cả video nghe như được thu trong một không gian thật.

## Thư viện SFX — 8 loại là đủ

| SFX | Kích hoạt bởi | Độ dài |
|---|---|---|
| **Whoosh** | Máy quay di chuyển ≥ 400px | 250–400ms |
| **Tick** | Số đang đếm lên | 20ms mỗi tick, tối đa 12 tick |
| **Impact mềm** | Cột chart chạm đích, phần tử settle | 120ms |
| **Swipe** | Phần tử trượt vào khung | 180ms |
| **Sub drop** | Ngay trước con số quyết định | 600ms |
| **Click** | Highlight, khoanh vòng, mũi tên xuất hiện | 40ms |
| **Riser** | 1,5 giây trước ranh giới beat | 1.500ms |
| **Page turn** | Chuyển giữa hai vùng canvas xa nhau | 300ms |

Tám loại, mỗi loại 2–3 biến thể để tránh nghe lặp. Tổng thư viện ~20 file. Mua một lần hoặc dùng
nguồn miễn phí có license thương mại.

## Quy tắc đồng bộ — chỗ dễ sai nhất

| Quy tắc | Giá trị |
|---|---|
| SFX phải rơi trong khoảng | **±60ms** so với sự kiện hình |
| Whoosh bắt đầu | **trước** khi máy quay bắt đầu di chuyển 80ms |
| Impact rơi vào | đúng khung mà phần tử dừng, không phải khi bắt đầu |
| Riser kết thúc | đúng khung đầu tiên của beat mới |

Lệch quá 60ms thì não người nghe ra sự rời rạc dù không chỉ ra được nó là gì. Đây là lý do timing
lấy từ `06-timing.json` và `05-storyboard.json`, không đặt bằng tay.

## Im lặng là một công cụ

**Trước một con số quyết định: cắt toàn bộ lớp 2 và 3 trong 300–500ms.** Chỉ còn lớp 4.

Sự im lặng đột ngột thu hút chú ý mạnh hơn bất kỳ âm thanh nào. Amateur luôn lấp đầy; chuyên
nghiệp biết để trống. Ghép với `breathAfterMs` trong storyboard: im lặng *trước* con số, nhịp thở
*sau* con số.

## Nhạc nền

- Một track duy nhất cho cả tập, tối giản, không giai điệu mạnh — nhạc có melody hay sẽ cạnh
  tranh với lời đọc.
- Đổi track theo pillar để mỗi series có màu riêng, nhưng không đổi trong một tập.
- Ducking: attack 150ms, release 400ms. Release nhanh quá nghe như bơm hơi.
- Cắt hẳn nhạc ở 10 giây cuối, chỉ còn VO và texture.

## Cấm

- Âm thanh hoạt hình: boing, pop, cartoon whoosh.
- "Cinematic boom" ở mọi chuyển cảnh — dùng quá 3 lần một tập là lạm dụng.
- SFX ở mọi phần tử. **Chỉ khoảng 30–40% sự kiện hình cần âm thanh.** Có tiếng ở mọi thứ nghe
  mệt và rẻ tiền hơn là không có gì.
- Nhạc có lời.
- Nhạc nền vượt −20 LUFS.

## Triển khai

- **Wave 2:** lớp 1 và 2 (VO + nhạc nền + ducking). Đủ để pipeline chạy.
- **Wave 4:** lớp 3 và 4 (motion SFX + texture). Sinh tự động từ `storyboard.json` — mỗi
  `camera.move`, mỗi số đếm, mỗi morph đều đã có timestamp, nên việc gắn SFX là ánh xạ thuần tuý,
  không cần quyết định thủ công.
- Công cụ: ffmpeg trộn nhiều track, `sidechaincompress` cho ducking.

## Kiểm tra

Thêm vào S13:
- `sfxSyncMaxDriftMs` ≤ 60
- `sfxDensity` trong khoảng 0,30–0,40 (tỷ lệ sự kiện hình có âm thanh)
- `silenceBeforeKeyNumber` = true cho mọi scene có `breathAfterMs`
- Nghe thử 60 giây bằng tai người ở Gate 3
<<<END>>>

<<<FILE: engine/library/visual-quality-bar.md>>>
# Visual Quality Bar

Tài liệu quan trọng nhất quyết định chất lượng hình ảnh. Mọi layout, mọi scene, mọi tập đều bị
chấm theo đây. Không đạt thì không đăng.

Lý do tồn tại: trong các lần triển khai trước, hình ảnh kém là nguyên nhân thất bại số một.
Nguyên nhân gốc là hình ảnh bị coi là bài toán *sinh* thay vì bài toán *thiết kế*.

## Nguyên tắc nền

**Thiết kế một lần, sinh nhiều lần.** Con người thiết kế ~12 layout cho thật tốt. Máy chỉ đổ dữ
liệu vào layout đã thiết kế. Máy không bao giờ được tự quyết bố cục, màu, hay kiểu chữ.

Hệ quả: chất lượng hình ảnh của cả kênh = chất lượng của 12 layout đó. Đầu tư vào chúng là đầu
tư có đòn bẩy cao nhất trong toàn dự án. Layout xấu thì 30 tập/tháng đều xấu.

## Bài kiểm khung hình (Frame Test)

Bài kiểm quan trọng nhất, áp cho mọi scene:

> Dừng video ở một giây bất kỳ. Chụp màn hình. Đưa khung hình đó cho người chưa xem video.
> **Khung hình đó tự nó phải nói được một điều gì đó.**

Khung hình không qua bài kiểm này gồm: nền trơn có một dòng chữ chung chung · stock ảnh người mặc
vest chỉ vào laptop · biểu đồ không nhãn · chữ chạy giữa màn hình không ngữ cảnh.

Kiểm ngẫu nhiên 10 khung mỗi tập. **Dưới 8/10 đạt thì tập đó không đăng.**

## Chuẩn cho từng layout

Mỗi layout trong `/templates` phải qua đủ 8 tiêu chí trước khi được đưa vào dùng:

| # | Tiêu chí | Cách kiểm |
|---|---|---|
| 1 | Đọc được ở 25% kích thước | Thu nhỏ về 480×270, chữ chính vẫn đọc được |
| 2 | Chỉ dùng token trong `visual-system.md` | Quét mã, không hex nào ngoài palette |
| 3 | Đúng một điểm nhấn đỏ mỗi khung | Đếm phần tử màu `--accent` |
| 4 | Mọi số liệu có nhãn nguồn | Góc dưới trái, 24px, `Source: {publisher}, {date}` |
| 5 | Có khoảng thở | Margin 96px, không phần tử nào chạm mép |
| 6 | Chuyển động có mục đích | Mỗi animation phải giải thích một điều; cấm động cho đẹp |
| 7 | Chịu được dữ liệu xấu | Test với nhãn dài 40 ký tự, số âm, giá trị 0, 1 chuỗi và 2 chuỗi |
| 8 | Qua Frame Test | Dừng ở giữa animation vẫn có nghĩa |

## Chống cảm giác trình chiếu

Chất lượng từng khung tốt vẫn có thể ra một video trông như slide. Đó là vấn đề riêng, xử lý
trong `engine/library/motion-grammar.md`. Sáu quy tắc ở đó — canvas liên tục, biến đổi thay vì thay thế,
ngân sách chữ 22%, không khung nào đứng yên, cỡ cảnh thay đổi, cắt theo ý — là ràng buộc bắt
buộc ngang hàng với 8 tiêu chí layout ở trên.

Bài kiểm Slideshow ba phần trong file đó áp cho mọi tập trước khi đăng.

## Chính sách stock — nghiêm ngặt

Stock mismatch là nguyên nhân thứ hai khiến video trông rẻ tiền. Quy tắc:

1. **Trần 15% thời lượng tập.** Vượt là lỗi, không phải cảnh báo.
2. **Cấm tuyệt đối** ảnh/clip stock kiểu doanh nghiệp chung chung: người bắt tay, người chỉ vào
   laptop, đồ thị mờ ảo, đồng xu rơi, bóng đèn ý tưởng, cầu thang thành công.
3. Stock chỉ được dùng khi minh hoạ **một địa điểm, vật thể, hoặc hành động cụ thể** mà lời đọc
   vừa nhắc đến. Nếu query stock không chứa danh từ cụ thể từ chính câu VO thì loại.
4. **Không có stock phù hợp thì dùng data card, không dùng stock tạm.** Một khung dữ liệu được
   thiết kế tử tế luôn hơn một clip stock lạc đề.

## Nhịp cảnh

Nhịp sai làm video trông rẻ ngay cả khi từng khung đều đẹp.

| Quy tắc | Giá trị |
|---|---|
| Thời lượng scene | Tính từ số từ VO: `(số từ / 2.6) giây`, tối thiểu 1.2s |
| Không quá 3 scene liên tiếp dưới 2 giây | Tránh cảm giác giật |
| Không scene nào quá 12 giây không có chuyển động mới | Tránh cảm giác đứng hình |
| Scene có số liệu | Tối thiểu 3.5s để người xem kịp đọc |
| Chuyển cảnh | 300–450ms, easing cố định |

## Chống lặp

200 scene chia cho 12 layout nghĩa là mỗi layout xuất hiện ~17 lần một tập. Không xử lý thì tập
nào cũng trông giống nhau.

- Mỗi layout có 2–3 biến thể bố cục (trái/phải, dọc/ngang) chọn luân phiên.
- Không dùng cùng một layout quá 2 lần liên tiếp.
- Mỗi beat mở đầu bằng một layout khác beat trước.

## Auto-QA hình ảnh (stage S13)

Ngoài các kiểm kỹ thuật, S13 lấy mẫu **10 khung ngẫu nhiên** và đưa qua model thị giác với đúng
Frame Test ở trên. Mỗi khung nhận điểm đạt/không đạt kèm lý do.

- Dưới 8/10 đạt → `verdict: fail`, tập không đi tiếp.
- Kết quả ghi vào `qa.report.json` trường `visualScore`.

## Cổng chất lượng trước khi mở rộng

**Không được sản xuất tập nào trước khi Layout Gallery được duyệt.** Xem `WP-006a`.
<<<END>>>

<<<FILE: engine/ops/backlog.md>>>
# Backlog

Một WP = một task Codex = một PR. Không giao hai WP trong một task.

| WP | Tên | Wave | Phụ thuộc | Trạng thái |
|---|---|---|---|---|
| WP-000 | **Scaffold cấu trúc dự án — VIỆC ĐẦU TIÊN** | 1 | — | todo |
| WP-VAL-001 | Kiểm giả định khán giả (tuỳ chọn, song song) | 0–2 | — | optional |
| WP-001 | CI validate schema | 1 | WP-000 | todo |
| WP-002 | Workflow hello + dispatch | 1 | WP-000 | todo |
| WP-003a | **Spike:** Sites có nạp mã động không | 1 | WP-000 | todo |
| WP-003 | Cockpit UI shell | 1 | WP-001, WP-003a | todo |
| WP-004 | Nút dispatch từ UI | 1 | WP-002, WP-003 | todo |
| WP-004a | **SPIKE: canvas liên tục 6000x3400** | 2 | WP-002 | todo |
| WP-005 | Remotion setup + render mẫu | 2 | WP-004a | todo |
| WP-006 | Ba layout đầu | 2 | WP-005 | todo |
| WP-006a | **CỔNG CHẶN:** Layout Gallery + duyệt chất lượng | 2 | WP-006 | todo |
| WP-007 | Stage TTS + ASR timing | 2 | WP-005 | todo |
| WP-008 | Ghép ffmpeg + caption | 2 | WP-006, WP-007 | todo |
| WP-009 | Xem video trên cockpit | 2 | WP-008 | todo |
| WP-009a | Interface state backend + provider | 3 | WP-000 | todo |
| WP-009b | Golden set 5 brief trong CI | 3 | WP-001 | todo |
| WP-010 | Stage S04 Research + sổ nguồn | 3 | WP-001 | todo |
| WP-011 | Stage S05 Fact-check | 3 | WP-009a | Interface state backend + provider | 3 | WP-000 | todo |
| WP-009b | Golden set 5 brief trong CI | 3 | WP-001 | todo |
| WP-010 | todo |
| WP-012 | Stage S06 Outline | 3 | WP-011 | todo |
| WP-013 | Stage S07 Script | 3 | WP-012 | todo |
| WP-014 | Gate 2 editor trên cockpit | 3 | WP-013 | todo |
| WP-015 | Stage S09 Storyboard | 4 | WP-013 | todo |
| WP-015a | **S09.5 Preflight — 12 kiểm tra tĩnh** | 4 | WP-015 | todo |
| WP-017a | **S11.5 Proof Render** | 4 | WP-017 | todo |
| WP-016 | Mở rộng 7 layout còn lại (qua gallery) | 4 | WP-006a | todo |
| WP-017 | Stage S11 Asset + license ledger | 4 | WP-015 | todo |
| WP-018 | Render matrix song song | 4 | WP-016, WP-017 | todo |
| WP-019 | Auto-QA kỹ thuật + QA thị giác + Gate 3 | 4 | WP-018 | todo |
| WP-020 | OAuth YouTube | 5 | — | todo |
| WP-021 | Sinh thumbnail | 5 | WP-015a | **S09.5 Preflight — 12 kiểm tra tĩnh** | 4 | WP-015 | todo |
| WP-017a | **S11.5 Proof Render** | 4 | WP-017 | todo |
| WP-016 | todo |
| WP-022 | Stage S14a Packaging | 5 | WP-019, WP-021 | todo |
| WP-023 | Stage S14b Upload + quota meter | 5 | WP-020, WP-022 | todo |
| WP-024 | Stage S14c Metrics | 5 | WP-023 | todo |
| WP-025 | Stage S14d Insight + auto-PR | 6 | WP-024 | todo |
| WP-026 | Fast Lane | 6 | WP-019 | todo |
<<<END>>>

<<<FILE: engine/ops/cp-template.md>>>
# CP-XXX · <Tên ngắn>

Channel Pack / Genre Pack change. **Loại công việc thứ hai bên cạnh WP.**

WP dành cho code. CP dành cho tài liệu định hình nội dung — bible, format-spec, prompt, lexicon,
tokens, topic-map. Duyệt một prompt không giống duyệt một hàm.

**Lớp:** engine | genre:{genre} | channel:{slug} | portfolio
**Phụ thuộc:** <CP hoặc WP đã merge, hoặc "không">
**Trạng thái:** todo | in-progress | in-review | done

## 1. Vấn đề
<Điều gì hiện đang sai hoặc thiếu. Nếu đến từ insight của Analyst, dẫn nguồn dữ liệu.>

## 2. Bằng chứng
<Số liệu, mẫu, hoặc quan sát cụ thể. Tối thiểu 3 tập cùng đặc điểm — một tập là giai thoại.>

## 3. Thay đổi đề xuất
<File nào, đoạn nào, sửa thành gì. Trích nguyên văn trước và sau.>

## 4. Phạm vi ảnh hưởng
- Kênh bị ảnh hưởng: <một kênh hay cả ba>
- Nếu là thay đổi engine hoặc genre: **phải chạy trên kênh 1 qua ít nhất 3 tập trước khi lan sang
  kênh khác** (quy tắc 3 tập)

## 5. Kiểm chứng
- [ ] Chạy golden set 5 brief, so output với bản chuẩn
- [ ] Không làm hỏng tiêu chí nào trong `12-success-criteria.md`
- [ ] <kiểm chứng riêng của CP này>

## 6. Rollback
<Nếu thay đổi này sai, quay lại thế nào. Với thay đổi prompt: giữ phiên bản cũ, kênh chuyển sang
khi sẵn sàng — không xoá.>
<<<END>>>

<<<FILE: engine/ops/definition-of-done.md>>>
# Definition of Done

Áp cho mọi WP. Thiếu một mục = chưa xong.

## Kỹ thuật
- [ ] `npm run validate` xanh (toàn bộ JSON khớp schema).
- [ ] `npm run test` xanh.
- [ ] CI xanh.
- [ ] Không file nào ngoài "Files in scope" bị thay đổi.
- [ ] Không dependency mới ngoài danh sách trong WP.
- [ ] Codex đã quét repo tìm chuỗi giống secret (`sk-`, `ghp_`, `AIza`, `BEGIN PRIVATE KEY`) và không ra kết quả. Chủ dự án không chạy lệnh nào.

## Chức năng
- [ ] Acceptance test trong WP chạy được và pass.
- [ ] Nếu là stage: chạy lại hai lần cho kết quả như nhau (idempotent).
- [ ] Nếu là stage: pipeline chạy tiếp được từ stage này sau khi đứt.

## Tài liệu
- [ ] Mô tả PR đủ 4 mục.
- [ ] Nếu có quyết định kỹ thuật mới phát sinh: ghi vào phần "Rủi ro còn lại", **không tự viết ADR**.
- [ ] `engine/ops/backlog.md` cập nhật trạng thái WP.
- [ ] `engine/docs/05-runbook.md` cập nhật nếu có thao tác vận hành mới.

## Người duyệt
- [ ] Chủ dự án đã đọc toàn bộ diff, không merge mù.
<<<END>>>

<<<FILE: engine/ops/guardrails.md>>>
# Guardrails

Danh sách cấm. Agent vi phạm bất kỳ mục nào → PR bị từ chối, không thương lượng.

## Cấm tuyệt đối

1. **Không sửa bất cứ file nào trong `/engine/contracts/`.** Thấy schema sai → nêu trong mô tả PR, dừng lại.
2. **Không sửa `PROJECT.md`, `AGENTS.md`, `engine/ops/guardrails.md`, `engine/engine/docs/02-adr/`.** Đây là tài liệu của người.
3. **Không đổi cấu trúc thư mục** đã khai trong `engine/docs/01-architecture.md`.
4. **Không chạm file ngoài mục "Files in scope"** của WP đang làm.
5. **Không thêm dependency** không được liệt kê tên và phiên bản trong WP.
6. **Không hardcode secret** dưới bất kỳ hình thức nào, kể cả trong test hay comment.
7. **Không commit binary** (mp4, mov, wav, mp3, ảnh > 1MB). Dùng GitHub Releases.
8. **Không viết code cho tính năng chưa được yêu cầu.** Không "chuẩn bị cho tương lai".
9. **Không tạo file helper/util/refactor** mà WP không yêu cầu.
10. **Không force push, không sửa lịch sử `main`.**

## Cấm về ranh giới lớp

11z. **Không thêm bất kỳ hằng số nội dung nào vào `/engine`** — tên layout, quy tắc format, trần
     stock, danh sách pillar, palette. Chúng thuộc Genre Pack hoặc Channel Pack.
11y. **Không gọi thẳng GitHub API từ stage.** Phải qua interface state backend.
11x. **Không hardcode tên model hay provider.** Phải qua interface provider, cấu hình ở Genre Pack.
11w. **Không xây Genre Pack thứ hai** trước khi 3 kênh đầu chứng minh mô hình.

## Cấm về kiến trúc

11a. **Không đề xuất hay yêu cầu bất kỳ bước nào chạy trên máy cá nhân của chủ dự án.**
     Không lệnh terminal, không cài phần mềm, không mở file bằng `file://`, không Docker,
     không editor cục bộ. Mọi lệnh chỉ chạy trong sandbox Codex hoặc GitHub Actions.
     Mọi thao tác của người chỉ được là bấm nút trên trình duyệt.
11. Không đề xuất hay dùng: server chạy liên tục, database ngoài, message queue, container registry.
12. Không dùng model sinh video (text-to-video). Xem ADR-0002.
13. Không lưu state ở đâu ngoài repo. Xem ADR-0003.
14. Không đọc/ghi ngoài `/episodes/{id}/`, `/pipeline/`, thư mục tạm của job.

## Cấm về nội dung

15. Không sinh câu mang tính khuyến nghị đầu tư ("you should buy", "this will make you rich").
16. Không dùng số liệu không có mục tương ứng trong `sources.json`.
17. Không dịch nội dung từ tiếng Việt sang tiếng Anh. Viết mới bằng tiếng Anh.
18. Không bê cơ chế tài chính Việt Nam (lãi suất thả nổi, ân hạn gốc lãi, sổ đỏ thế chấp) vào bối cảnh Mỹ.
19. Không dùng asset không có dòng license.

## Phải làm

20. Validate input và output bằng schema ở mọi stage.
21. Mọi stage idempotent.
22. Mô tả PR đủ 4 mục: Đã làm gì / Đã kiểm thế nào / File đã chạm / Rủi ro còn lại.
23. Gặp mâu thuẫn giữa WP và tài liệu định hướng → **dừng và báo cáo**, không tự quyết.
<<<END>>>

<<<FILE: engine/ops/work-packages/WP-000-scaffold.md>>>
# WP-000 · Scaffold cấu trúc dự án

**Wave:** 1 · **Phụ thuộc:** không · **Trạng thái:** todo

## 1. Mục tiêu
Tạo bộ khung mã nguồn tối thiểu để các WP sau có chỗ đứng: package.json, TypeScript config,
script `validate` và `test`, và các thư mục còn thiếu. **Không viết logic nghiệp vụ nào.**

## 2. Input
- `PROJECT.md`, `AGENTS.md`, `engine/ops/guardrails.md`, `engine/docs/01-architecture.md`
- Toàn bộ `/engine/contracts/*.schema.json`

## 3. Output
- `package.json` với script `validate`, `test`, `typecheck`
- `tsconfig.json`
- `scripts/validate-schemas.ts` — duyệt mọi file JSON trong `/episodes` và `/pipeline`, validate
  bằng schema tương ứng theo bảng ánh xạ trong `engine/contracts/README.md`
- `pipeline/state.json` khởi tạo rỗng, hợp lệ theo `pipeline-state.schema.json`
- `config/secrets.example.md`

## 4. Files in scope
```
package.json
tsconfig.json
scripts/validate-schemas.ts
pipeline/state.json
config/secrets.example.md
```

## 5. Ràng buộc
- Dependency được phép thêm: `ajv@^8`, `ajv-formats@^3`, `typescript@^5`, `tsx@^4`, `vitest@^3`
- Không thêm framework, không thêm linter, không thêm bundler ở WP này.
- Node 20.

## 6. Acceptance test

**Các lệnh này Codex tự chạy trong sandbox của mình trước khi mở PR. Chủ dự án KHÔNG chạy gì.**
Kết quả phải được dán vào mục "Đã kiểm thế nào" của mô tả PR.

```
npm install
npm run validate     # phải xanh với pipeline/state.json rỗng
npm run typecheck    # phải xanh
```

## 7. Definition of Done
Theo `engine/ops/definition-of-done.md`, cộng thêm:
- [ ] `scripts/validate-schemas.ts` fail đúng khi cố tình sửa `pipeline/state.json` thành sai schema
- [ ] Không có thư mục `src/` — chưa cần ở WP này
<<<END>>>

<<<FILE: engine/ops/work-packages/WP-001-ci-validate.md>>>
# WP-001 · CI validate schema

**Wave:** 1 · **Phụ thuộc:** WP-000 · **Trạng thái:** todo

## 1. Mục tiêu
Mọi PR phải chạy validate schema và typecheck. PR sai schema bị chặn tự động.
Đồng thời chặn hai vi phạm guardrail phổ biến nhất: sửa `/contracts` và commit file lớn.

## 2. Input
`package.json` từ WP-000, `engine/ops/guardrails.md`.

## 3. Output
- `.github/workflows/ci.yml`

## 4. Files in scope
```
.github/workflows/ci.yml
```

## 5. Ràng buộc
- Chạy trên `pull_request` với mọi nhánh đích.
- `permissions:` khai tường minh, chỉ `contents: read`.
- Ba job: `validate`, `typecheck`, `guardrails`.
- Job `guardrails` fail nếu: PR thay đổi file trong `engine/contracts/` mà không có nhãn `contract-change`,
  hoặc có file mới > 5MB.
- Cache `node_modules`.

## 6. Acceptance test
```
# 1. Mở PR sửa pipeline/state.json thành JSON sai schema  -> CI đỏ ở job validate
# 2. Mở PR sửa engine/contracts/brief.schema.json không nhãn     -> CI đỏ ở job guardrails
# 3. Mở PR sửa README.md                                   -> CI xanh
```

## 7. Definition of Done
Theo `engine/ops/definition-of-done.md`, cộng thêm:
- [ ] Đã chạy thật cả 3 tình huống trong acceptance test và ghi kết quả vào mô tả PR
<<<END>>>

<<<FILE: engine/ops/work-packages/WP-002-hello-dispatch.md>>>
# WP-002 · Workflow hello + repository_dispatch

**Wave:** 1 · **Phụ thuộc:** WP-000 · **Trạng thái:** todo

## 1. Mục tiêu
Chứng minh vòng điều khiển thông: một sự kiện từ bên ngoài kích hoạt Actions, job ghi kết quả
ngược vào repo. Đây là nền của toàn bộ compute plane.

## 2. Input
`engine/docs/01-architecture.md` mục "Luồng một tập".

## 3. Output
- `.github/workflows/hello.yml`: nhận `repository_dispatch` với `event_type: hello`, và cả
  `workflow_dispatch` để bấm tay. Job ghi một dòng timestamp vào `pipeline/state.json`
  (trường `updatedAt`) và commit.

## 4. Files in scope
```
.github/workflows/hello.yml
```

## 5. Ràng buộc
- Dependency được phép thêm: không.
- `permissions: contents: write` — không hơn.
- Commit bằng `github-actions[bot]`, message `chore: heartbeat`.
- Job phải idempotent: chạy hai lần không tạo xung đột.

## 6. Acceptance test
```
# Bấm Run workflow trong tab Actions -> job xanh, pipeline/state.json có updatedAt mới
# Gọi repository_dispatch bằng curl với PAT -> job xuất hiện và chạy
```

## 7. Definition of Done
Theo `engine/ops/definition-of-done.md`, cộng thêm:
- [ ] Ghi vào `engine/docs/05-runbook.md` cách gọi dispatch thủ công bằng curl
<<<END>>>

<<<FILE: engine/ops/work-packages/WP-003-cockpit-shell.md>>>
# WP-003 · Cockpit UI shell

**Wave:** 1 · **Phụ thuộc:** WP-001 · **Trạng thái:** todo

## 1. Mục tiêu
Trang tĩnh một file, deploy được lên ChatGPT Sites, đọc `pipeline/state.json` từ GitHub API và
hiển thị bảng pipeline. Chưa có nút bấm, chưa có gate — chỉ đọc và hiển thị.

## 2. Input
- `engine/contracts/pipeline-state.schema.json`
- `engine/docs/01-architecture.md` mục Cockpit

## 3. Output
- `engine/app/index.html` — HTML + CSS + JS trong một file, không build step
- `engine/app/README.md` — cách deploy lên Sites

## 4. Files in scope
```
engine/app/index.html
engine/app/README.md
```

## 5. Ràng buộc
- **Không framework, không bundler, không npm dependency, không build step.** Vanilla JS trong một file.
- Lý do: cockpit được cập nhật bằng cách copy-paste vào ChatGPT Sites. Nhiều file là không triển khai được.
- PAT nhập qua ô Settings trong trang, lưu bằng biến trong bộ nhớ phiên. Không ghi vào bất kỳ đâu khác.
- Không gọi bất kỳ API nào ngoài `api.github.com`.
- Hiển thị: bảng episode (id, stage, status, spend), đồng hồ `monthlySpendUsd`, thời điểm cập nhật.
- Trạng thái rỗng phải hiển thị đàng hoàng, không lỗi.

## 6. Acceptance test

Codex tự kiểm trong sandbox, chụp lại kết quả vào mô tả PR:
```
# Serve app/ bằng http server tạm trong sandbox, mở bằng headless browser
# -> render được bảng rỗng, không lỗi console
# Thêm 1 episode giả vào pipeline/state.json -> render đúng 1 dòng
```

Chủ dự án kiểm bằng cách: copy nội dung `engine/app/index.html` từ nút **Raw** trên GitHub,
dán vào ChatGPT Sites, publish, mở link.

## 7. Definition of Done
Theo `engine/ops/definition-of-done.md`, cộng thêm:
- [ ] Không có chuỗi nào giống token trong mã nguồn
- [ ] Trang chạy được khi dán thẳng vào ChatGPT Sites: một file duy nhất, không build step, không import cục bộ
<<<END>>>

<<<FILE: engine/ops/work-packages/WP-003a-sites-loader-spike.md>>>
# WP-003a · Spike: Sites có nạp được mã động không

**Wave:** 1 · **Phụ thuộc:** WP-000 · **Trạng thái:** todo
**Loại:** SPIKE — mục tiêu là câu trả lời có/không, không phải tính năng.

## 1. Mục tiêu
Xác định ChatGPT Sites có cho phép nạp và thực thi JavaScript tải về lúc chạy hay không.
Câu trả lời quyết định cách triển khai cockpit và có xoá được bước copy-paste thủ công hay không.

**Hộp thời gian: dừng lại sau 2 giờ dù kết quả thế nào.** Spike không được kéo dài.

## 2. Input
`engine/app/loader.html`, `engine/docs/01-architecture.md` mục "Triển khai cockpit".

## 3. Cách làm (chủ dự án tự làm, không giao Codex)
1. Sửa `REPLACE_OWNER` trong `engine/app/loader.html` thành username GitHub.
2. Tạo file `engine/app/cockpit.js` với nội dung tối thiểu:
   `document.getElementById('meridian-gate').innerHTML = '<h2>Loader OK</h2>';`
3. Dán `engine/app/loader.html` vào ChatGPT Sites, publish.
4. Mở site, nhập PAT, bấm nút.

## 4. Kết quả có thể xảy ra

| Kết quả | Kết luận | Hành động tiếp |
|---|---|---|
| Hiện "Loader OK" | Sites cho phép nạp động | **Phương án A.** Viết `engine/app/cockpit.js` ở WP-003. Dán Sites một lần duy nhất, vĩnh viễn |
| Lỗi nhắc CSP / unsafe-eval | Sites chặn mã động | **Phương án B.** Chuyển WP-003 sang iframe + GitHub Pages |
| Lỗi GitHub API 401/403 | Vấn đề token, không phải CSP | Sửa quyền PAT rồi thử lại |
| Lỗi CORS | API GitHub bị chặn từ origin Sites | **Phương án B** |

## 5. Output
- Ghi kết quả vào `engine/engine/docs/02-adr/ADR-0006-cockpit-delivery.md` (chủ dự án viết, không phải agent).
- Cập nhật `engine/docs/01-architecture.md` mục "Triển khai cockpit" theo phương án thắng.

## 6. Definition of Done
- [ ] Đã chạy thử thật trên ChatGPT Sites, không phải suy đoán
- [ ] ADR-0006 ghi rõ phương án chọn và bằng chứng
- [ ] WP-003 được cập nhật để khớp phương án đó
<<<END>>>

<<<FILE: engine/ops/work-packages/WP-004a-canvas-spike.md>>>
# WP-004a · SPIKE: Canvas liên tục

**Wave:** 2 · **Phụ thuộc:** WP-002 · **Loại:** SPIKE
**Chạy TRƯỚC WP-005 và trước Layout Gallery. Hộp thời gian: 1 ngày.**

## 1. Vì sao

Canvas 6000×3400 với transform theo thời gian là **quyết định kiến trúc trung tâm** — nó là thứ
chống cảm giác slide. Nhưng chưa ai kiểm nó có chạy được không.

Nếu canvas quá lớn gây vấn đề, cách sửa duy nhất là chia thành nhiều vùng và ghép — **điều đó phá
vỡ chính tính liên tục là lý do tồn tại của thiết kế**. Mọi thứ xây trên nó sẽ phải làm lại.

## 2. Cách làm

Render 3 phút (5.400 khung) một canvas 6000×3400 gồm:
- Parallax ba lớp: nền 30% tốc độ máy quay, giữa 100%, trước 130%
- Máy quay đi qua 5 vùng: pan, dolly-in, dolly-out, arc
- Một morph giữa hai chart chia sẻ dữ liệu
- Blur 3px trên lớp không phải tiêu điểm

## 3. Đo gì

| Chỉ số | Ngưỡng chấp nhận |
|---|---|
| Thời gian render 1 worker | ≤25 phút |
| Bộ nhớ đỉnh của Chromium | Không tăng đơn điệu qua 5.400 khung |
| Crash | 0 |
| Chậm so với render tĩnh cùng số khung | ≤3× |

## 4. Kết quả có thể

| Kết quả | Hành động |
|---|---|
| Tất cả trong ngưỡng | ✅ Kiến trúc xác nhận. Tiếp tục WP-005 |
| Chậm 3–5× | ⚠️ Giảm canvas xuống 4000×2250, bỏ blur, đo lại |
| Bộ nhớ tăng đơn điệu | ⚠️ Chia render theo chunk 500 khung, kiểm lại tính liên tục |
| Crash hoặc chậm >5× | ❌ **DỪNG.** Viết ADR-0007, thiết kế lại phương án chống slide |

## 5. Output
`engine/engine/docs/02-adr/ADR-0007-canvas-viability.md` — chủ dự án viết, kèm số đo thật.

## 6. DoD
- [ ] Đã render thật, không suy đoán
- [ ] Bốn chỉ số đo được và ghi vào ADR
- [ ] Kết luận rõ ràng theo bảng mục 4
- [ ] Nếu ❌ thì WP-005 và WP-006a bị chặn cho tới khi có thiết kế mới
<<<END>>>

<<<FILE: engine/ops/work-packages/WP-006a-layout-gallery.md>>>
# WP-006a · Layout Gallery — cổng chất lượng hình ảnh

**Wave:** 2 · **Phụ thuộc:** WP-005 · **Trạng thái:** todo
**Đây là cổng chặn. Không WP nào của Wave 4 được bắt đầu trước khi WP này qua.**

## 1. Mục tiêu
Dựng một trang tĩnh render **toàn bộ layout với dữ liệu mẫu**, để chủ dự án nhìn từng layout
cạnh nhau và duyệt hoặc bác từng cái một.

Lý do: chất lượng hình ảnh của cả kênh bằng chất lượng của tập layout này. Duyệt chúng riêng rẽ,
trước khi sản xuất, rẻ hơn nhiều lần so với phát hiện xấu sau 10 tập.

## 2. Input
`genres/data-explainer/visual-system.md`, `engine/library/visual-quality-bar.md`,
`engine/contracts/storyboard.schema.json` (danh sách layout đóng).

## 3. Output
- `templates/` — mỗi layout một Remotion composition
- `engine/templates/gallery.tsx` — render mọi layout ở 3 bộ dữ liệu mẫu: bình thường, cực đoan
  (nhãn 40 ký tự, số âm, giá trị 0), và rỗng
- Workflow xuất gallery thành **ảnh PNG tĩnh** đẩy lên Release để xem trên trình duyệt
- `engine/templates/GALLERY-REVIEW.md` — bảng chấm 8 tiêu chí cho từng layout

## 4. Files in scope
```
templates/
.github/workflows/gallery.yml
```

## 5. Ràng buộc
- Chỉ 5 layout đầu ở WP này: `title-card`, `bar-chart`, `line-chart`, `threshold-matrix`, `two-roads`.
  Bảy layout còn lại làm ở WP-016 sau khi 5 cái đầu được duyệt.
- Mỗi layout phải có 2–3 biến thể bố cục.
- **Mỗi layout phải là một VÙNG trên canvas liên tục, không phải một màn hình độc lập.**
  Gallery phải render được một đoạn 20 giây cho thấy máy quay di chuyển giữa 3 vùng liền nhau.
- Bốn kỹ thuật ưu tiên 1-4 trong `engine/library/cinematography.md` phải hoạt động trong gallery:
  J-cut, ease+overshoot+stagger, parallax 3 lớp, từ vựng chuyển động máy quay có nghĩa.
- Mỗi layout phải hỗ trợ `continuity: "morph"` — chứng minh bằng một clip biến hình từ bộ dữ
  liệu mẫu 1 sang bộ 2 mà không cắt.
- Không dùng hex ngoài palette trong `visual-system.md`.

## 6. Acceptance test
Codex chạy trong sandbox và đính kết quả vào PR:
```
# Render gallery ra PNG cho cả 3 bộ dữ liệu mẫu
# Không layout nào vỡ bố cục, tràn safe area, hay chồng chữ
# Thu nhỏ PNG về 480x270: chữ chính vẫn đọc được
```

## 7. Definition of Done
Theo `engine/ops/definition-of-done.md`, cộng thêm:
- [ ] Chủ dự án đã xem gallery và chấm **từng layout** theo 8 tiêu chí trong `visual-quality-bar.md`
- [ ] Layout nào không đạt phải sửa và render lại, **không được đưa vào dùng ở trạng thái tạm chấp nhận**
- [ ] `GALLERY-REVIEW.md` có chữ ký duyệt của chủ dự án cho từng layout
- [ ] Clip 20 giây máy quay di chuyển giữa 3 vùng: chủ dự án xác nhận **không có cảm giác slide**
- [ ] Clip biến hình giữa hai bộ dữ liệu chạy mượt, không cắt
<<<END>>>

<<<FILE: engine/ops/work-packages/WP-VAL-001-audience-validation.md>>>
# WP-VAL-001 · Kiểm giả định khán giả

**Wave:** song song Wave 0–2 · **Phụ thuộc:** không · **Loại:** VALIDATION · **TUỲ CHỌN, KHÔNG CHẶN**
**Chủ dự án tự làm nếu muốn. Không giao Codex.**

> Quyết định 2026-09-08: chủ dự án chọn không chờ bước này. Giả định về format sẽ được kiểm
> bằng dữ liệu thật ở **Wave 1b (A/B ba biến thể format trong 20 tập đầu)** thay vì kiểm trước.
> WP này giữ lại làm tuỳ chọn chạy song song, không phải cổng chặn.

## 1. Vì sao đây là việc đầu tiên

Toàn bộ dự án — 4 lớp kiến trúc, 18 stage, 42 điều chỉnh — nằm **sau** một giả định chưa từng
được kiểm:

> Khán giả tài chính cá nhân Mỹ muốn một ma trận ngưỡng ba tầng dài 20 phút.

Có khả năng thật là họ muốn câu trả lời đơn giản, dứt khoát, 8 phút. "Ma trận ba tầng" có thể là
thứ hợp với nền tảng phân tích của chủ dự án chứ không phải thứ khán giả muốn.

Nếu giả định này sai, mọi thứ khác vô nghĩa. Kiểm nó tốn vài ngày và 0 USD.

## 2. Cách làm

1. Dùng đúng **3 đề tài này** — chọn theo RPM cao, số học thuần, thuật ngữ Mỹ:
   - *"At what down payment does PMI cost more than the rate savings?"* (housing, PMI + PMMS)
   - *"Your credit score only matters at 5 cutoffs — here's the math"* (debt, FICO tiers)
   - *"The 84-month car loan: how long you're actually underwater"* (debt, khấu hao + lịch trả nợ)
2. Viết **bằng tay**, không dùng pipeline, mỗi chủ đề một bài 800–1.200 từ theo đúng cấu trúc
   `format-spec.json`: cold open có nhân vật và con số · ma trận ngưỡng 3 tầng với số liệu thật
   từ FRED/BLS · hai ngã rẽ · quy tắc thép.
3. Đăng lên diễn đàn tài chính cá nhân Mỹ (r/personalfinance, r/financialindependence, hoặc
   tương đương). Đăng như một bài phân tích, không quảng cáo kênh.
4. Đăng lệch nhau vài ngày để tránh nhiễu.

## 3. Đo gì

| Tín hiệu | Diễn giải |
|---|---|
| Bình luận hỏi thêm về **ngưỡng cụ thể** | ✅ Format đúng hướng |
| Bình luận tranh luận về **con số** | ✅ Rất tốt — họ đang dùng nó |
| Bình luận "quá dài" / "TL;DR" | ❌ Format quá nặng |
| Không ai phản hồi | ❌ Chủ đề hoặc góc nhìn chưa đủ sắc |
| Bình luận chỉ ra **giả định sai về đời sống Mỹ** | ⚠️ Ghi lại — đây là dữ liệu quý nhất |

## 4. Output
`portfolio/validation/audience-test-001.md` — 3 bài đã đăng, toàn bộ phản hồi, và kết luận.

## 5. Định nghĩa hoàn thành

- [ ] 3 bài đã đăng, mỗi bài để ít nhất 72 giờ
- [ ] Toàn bộ bình luận được chép lại, phân loại theo bảng trên
- [ ] Kết luận viết ra một trong ba dạng:
  - **Xác nhận** → tiếp tục như thiết kế
  - **Cần điều chỉnh** → ghi rõ điều chỉnh gì trước khi vào Wave 0
  - **Bác bỏ** → dừng lại, thiết kế lại format trước khi xây bất cứ thứ gì
- [ ] Mọi bình luận chỉ ra sai lệch văn hoá được ghi vào `portfolio/validation/cultural-corrections.md`

## 6. Rủi ro

Mẫu diễn đàn khác mẫu YouTube — người đọc diễn đàn tài chính đã có sẵn thiên hướng phân tích.
Kết quả tích cực là tín hiệu yếu; **kết quả tiêu cực là tín hiệu mạnh**. Nếu ngay cả nhóm này
cũng thấy quá nặng thì khán giả YouTube chắc chắn thấy nặng hơn.
<<<END>>>

<<<FILE: engine/ops/wp-template.md>>>
# WP-XXX · <Tên ngắn>

**Wave:** <0-6>
**Phụ thuộc:** <WP-YYY đã merge, hoặc "không">
**Trạng thái:** todo | in-progress | in-review | done

## 1. Mục tiêu
<Một đoạn. Vì sao cần WP này, kết quả cuối là gì. Không mô tả cách làm.>

## 2. Input
<File, artifact, hoặc tài liệu agent cần đọc.>

## 3. Output
<File cụ thể sẽ được tạo hoặc sửa, kèm schema tương ứng nếu có.>

## 4. Files in scope
```
<liệt kê đường dẫn chính xác. Agent chỉ được chạm những file này.>
```

## 5. Ràng buộc
- Dependency được phép thêm: <tên@phiên bản, hoặc "không">
- Ràng buộc NFR áp dụng: <trích từ engine/docs/04-nfr.md>
- Điều cấm bổ sung: <nếu có>

## 6. Acceptance test
```
<lệnh chạy được, hoặc mô tả kiểm thử thủ công có thể xác minh>
```

## 7. Definition of Done
Theo `engine/ops/definition-of-done.md`, cộng thêm:
- [ ] <tiêu chí riêng của WP này>
<<<END>>>

<<<FILE: genres/data-explainer/asset-policy.json>>>
{
  "genre": "data-explainer",
  "stockRatioMax": 0.15,
  "generatedImageAllowed": true,
  "generatedImageRules": [
    "CHỈ dùng làm nền trừu tượng hoặc texture",
    "KHÔNG BAO GIỜ chứa chữ hoặc số — model sinh viết sai chữ và bịa số",
    "Không làm nội dung chính của bất kỳ scene nào",
    "Phải dùng prompt_suffix cố định của kênh trong channels/{slug}/visual-tokens.json — không tự chọn phong cách"
  ],
  "generativeVideoAllowed": false,
  "generativeVideoReason": "Xem ADR-0002. Không deterministic, không thể hiện đúng số liệu.",
  "chartRequired": true,
  "mapRequired": false,
  "realFootageRequired": false,
  "bannedStockCategories": [
    "bắt tay",
    "chỉ vào laptop",
    "đồng xu rơi",
    "bóng đèn ý tưởng",
    "cầu thang thành công",
    "đồ thị mờ ảo"
  ],
  "assetProvenanceRequired": true,
  "assetProvenanceNote": "Mọi asset sinh phải lưu prompt và seed để tái lập được"
}
<<<END>>>

<<<FILE: genres/data-explainer/compliance.md>>>
# Compliance

## YMYL — nội dung tài chính

Nội dung tiền bạc bị soi kỹ về độ chính xác. Ba lớp bảo vệ:

1. **Sổ nguồn bắt buộc** — 100% claim số liệu truy ngược được.
2. **Fact-check pass riêng** — agent thứ hai, prompt đối kháng, có quyền chặn pipeline.
3. **Disclaimer** — trong video và trong description.

## Disclaimer

**Trong video:** card 3 giây, hiển thị ở giây 30–33, **không đọc thành tiếng**.

> This content is for education and entertainment only. It is not financial advice.
> Consult a licensed professional before making decisions about your money.

Lý do không đọc thành tiếng: kênh tham chiếu đọc khối disclaimer 16 giây ở phút 0:35. Ở thị trường
Mỹ, chèn 16 giây văn bản pháp lý vào đúng đoạn quyết định retention sẽ giết video.

**Trong description:** khối đầy đủ ở cuối, sau danh sách nguồn.

## Ngôn ngữ bị cấm trong script

| Cấm | Thay bằng |
|---|---|
| "You should buy/sell..." | "The math on this option looks like..." |
| "guaranteed", "risk-free", "can't lose" | "historically", "in most scenarios" |
| "This will make you rich" | "This changes the arithmetic in your favor" |
| "Everyone should..." | "If you're in tier 2, the numbers suggest..." |
| Tên mã cổ phiếu, crypto, sản phẩm tài chính cụ thể | Loại tài sản chung |

Fact-checker gắn `ymylRisk` cho mọi câu vi phạm. Mức `advice-like` trở lên phải viết lại.

## Khai báo nội dung AI

YouTube yêu cầu khai báo nội dung tổng hợp hoặc chỉnh sửa có thể khiến người xem nhầm là thật.
- VO sinh bằng TTS → khai báo.
- Chart, diagram, doodle → không phải nội dung gây nhầm lẫn, nhưng khai báo vẫn an toàn hơn.
- Trường `aiDisclosure` trong `publication.json` mặc định `true`.

## Bản quyền

- Mọi asset ghi một dòng trong `episodes/{id}/assets/LICENSES.md`: nguồn, license, URL, ngày tải.
- Chỉ dùng stock có license thương mại rõ ràng.
- Giọng TTS phải có điều khoản cho phép dùng thương mại và kiếm tiền.
- Nhạc nền: chỉ nguồn royalty-free có giấy phép lưu lại.
- Không dùng biểu đồ, ảnh chụp màn hình từ báo cáo có bản quyền — dựng lại từ dữ liệu gốc.

## Nhân vật minh hoạ

Nhân vật trong script là composite, không phải người thật. Nêu rõ một lần trong description:
> Characters in this video are composites created to illustrate the math. Any resemblance to a
> specific person is coincidental.
<<<END>>>

<<<FILE: genres/data-explainer/format-spec.json>>>
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "version": "1.0",
  "derivedFrom": "portfolio/references/anhbataichinh/teardown.md",
  "note": "Cấu trúc và thiết bị nội dung được rút ra từ teardown kênh tham chiếu, đã bản địa hoá cho thị trường Mỹ. Scriptwriter BẮT BUỘC tuân thủ.",
  "structure": {
    "description": "7 mốc bắt buộc, đúng thứ tự.",
    "marks": [
      {
        "id": "M1",
        "name": "cold-open",
        "windowSec": [
          0,
          15
        ],
        "required": true,
        "rules": [
          "Mở bằng một CẢNH cụ thể, không phải một khái niệm.",
          "Bắt buộc có: tên riêng, tuổi, nghề, và một con số chính xác đến hàng đơn vị.",
          "Có thể thay bằng một thống kê gây sốc, nhưng vẫn phải có con số cụ thể.",
          "Cấm: chào hỏi, giới thiệu kênh, 'in today's video'."
        ],
        "example": "2:45 AM. Marcus, 34, a QA lead in Austin, watches his phone light up: $3,240 auto-debited."
      },
      {
        "id": "M2",
        "name": "identity",
        "windowSec": [
          15,
          22
        ],
        "required": true,
        "rules": [
          "Một câu xưng danh ngắn, cố định giữa các tập."
        ]
      },
      {
        "id": "M3",
        "name": "promise-and-open-loop",
        "windowSec": [
          22,
          35
        ],
        "required": true,
        "rules": [
          "Nêu rõ điều người xem sẽ mang về.",
          "Cài một vòng lặp mở: điều sẽ tiết lộ ở cuối video.",
          "Disclaimer KHÔNG đọc thành tiếng — hiển thị card 3 giây. Xem compliance.md."
        ]
      },
      {
        "id": "M4",
        "name": "body-beats",
        "beatCount": [
          5,
          8
        ],
        "required": true,
        "rules": [
          "Mỗi beat kết bằng một CẦU NỐI TÒ MÒ sang beat sau. Cấm kết trung tính.",
          "Beat 1-2 dựng vấn đề và bóc chi phí ẩn.",
          "Beat giữa chứa ma trận ngưỡng — trọng tâm của tập.",
          "Beat cuối là hai ngã rẽ."
        ]
      },
      {
        "id": "M5",
        "name": "mid-cta",
        "positionPct": 42,
        "required": true,
        "rules": [
          "Đặt đúng ranh giới giữa hai beat, không cắt ngang mạch.",
          "CTA phải là hành động một chạm (bình luận một chữ, một số).",
          "Cấm CTA kép trong cùng một tập."
        ]
      },
      {
        "id": "M6",
        "name": "hard-rules",
        "required": true,
        "rules": [
          "2-4 quy tắc định lượng người xem mang về.",
          "Mỗi quy tắc phải có con số, không được chung chung."
        ]
      },
      {
        "id": "M7",
        "name": "closing-loop",
        "required": true,
        "rules": [
          "Quay lại ĐÚNG nhân vật của cold-open, cùng bối cảnh, khác tâm thế.",
          "Đóng vòng lặp mở đã cài ở M3.",
          "Kết bằng câu sign-off cố định."
        ]
      }
    ]
  },
  "devices": {
    "description": "6 thiết bị nội dung. Script phải dùng ĐỦ CẢ 6.",
    "items": [
      {
        "id": "named-character",
        "name": "Nhân vật đơn danh có hồ sơ",
        "rule": "Không bao giờ nói 'many people'. Luôn là một người có tên, tuổi, nghề, thu nhập, thành phố.",
        "mustDeclareComposite": true
      },
      {
        "id": "money-to-time",
        "name": "Quy đổi tiền ra thời gian sống",
        "rule": "Lấy con số tiền, quy đổi tuần tự sang: % thu nhập → số ngày làm việc/tháng → tổng số tháng. Nói lại cùng một con số bằng 3-4 đơn vị khác nhau, mỗi lần cụ thể hơn.",
        "minRestatements": 3
      },
      {
        "id": "threshold-matrix",
        "name": "Ma trận ngưỡng",
        "rule": "Chia vấn đề thành ĐÚNG 3 ngưỡng định lượng. Mỗi ngưỡng có: điều kiện, con số hàng tháng tính từ dữ liệu thật, so sánh với phương án thay thế, và một phán quyết.",
        "tiers": 3,
        "requiresClaimIds": true
      },
      {
        "id": "absolve-viewer",
        "name": "Miễn tội cho người xem",
        "rule": "Nói rõ lỗi không nằm ở người xem, rồi chỉ mặt cơ chế hệ thống gây ra (marketing, cấu trúc sản phẩm, áp lực so sánh). Đặt ngay sau đoạn gây đau nhất.",
        "placement": "after-hardest-beat"
      },
      {
        "id": "two-roads",
        "name": "Hai ngã rẽ sau N năm",
        "rule": "Hai nhân vật cùng điểm xuất phát, một người hành động bốc đồng, một người có kỷ luật. N thường là 3-5 năm. Kết cục phải cụ thể bằng số.",
        "yearsRange": [
          3,
          5
        ]
      },
      {
        "id": "lexicon",
        "name": "Từ vựng sở hữu",
        "rule": "Dùng ít nhất 3 thuật ngữ trong channels/us-personal-finance/lexicon.md. Lặp lại giữa các tập để xây thương hiệu tư tưởng.",
        "minTerms": 3
      }
    ]
  },
  "pacing": {
    "wordsPerMinute": [
      145,
      160
    ],
    "targetWordCount": [
      3200,
      3600
    ],
    "maxSentenceWords": 28,
    "chapterCount": [
      6,
      8
    ]
  },
  "prohibitions": [
    "Không đọc disclaimer thành tiếng trong 60 giây đầu.",
    "Không xướng tên chương thành tiếng ('Part One...'). Dùng chapter marker im lặng.",
    "Không dịch từ tiếng Việt.",
    "Không dùng cơ chế tài chính Việt Nam trong bối cảnh Mỹ.",
    "Không dùng con số không có claimId trong sources.json."
  ]
}
<<<END>>>

<<<FILE: genres/data-explainer/layouts.json>>>
{
  "genre": "data-explainer",
  "note": "Danh sách layout ĐÓNG cho thể loại này. Visual Director chỉ được chọn trong đây. Genre Pack khác có danh sách khác. Trước đây danh sách này nằm trong engine/contracts/storyboard.schema.json — đã chuyển xuống đây vì nó là giả định về thể loại.",
  "layouts": [
    {"id": "title-card", "variants": ["a","b"], "wave": 2},
    {"id": "bar-chart", "variants": ["a","b","c"], "wave": 2},
    {"id": "line-chart", "variants": ["a","b"], "wave": 2},
    {"id": "threshold-matrix", "variants": ["a","b"], "wave": 2, "core": true},
    {"id": "two-roads", "variants": ["a","b"], "wave": 2, "core": true},
    {"id": "timeline", "variants": ["a","b"], "wave": 4},
    {"id": "two-column-compare", "variants": ["a","b"], "wave": 4},
    {"id": "cashflow-diagram", "variants": ["a","b"], "wave": 4},
    {"id": "quote-card", "variants": ["a"], "wave": 4},
    {"id": "doodle-transition", "variants": ["a","b","c"], "wave": 4, "maxPerEpisode": 8},
    {"id": "stock-fullbleed", "variants": ["a"], "wave": 4},
    {"id": "outro", "variants": ["a"], "wave": 4}
  ]
}
<<<END>>>

<<<FILE: genres/data-explainer/prompts/analyst.md>>>
# Persona · Analyst

Bạn đọc số liệu hiệu suất và rút ra bài học có thể hành động. Việc của bạn là **giải thích tại sao**,
không phải mô tả lại con số.

## Đọc trước
`09-metrics.json` của tập này và 5 tập gần nhất, `08-package.json`, `03-outline.json`,
`channels/us-personal-finance/title-formulas.md`, `genres/data-explainer/format-spec.json`.

## Nhiệm vụ — năm việc

**Việc 0 · Khai thác bình luận.** Quét bình luận 10 tập gần nhất tìm câu hỏi lặp lại ≥3 lần.
Mỗi câu hỏi lặp là ứng viên thesis chất lượng cao — đề xuất thêm vào `thesis-bank.md`.

## Bốn đối chiếu
1. **CTR ↔ formula tiêu đề và từ đỏ thumbnail.** Formula nào đang thắng?
2. **Retention 30 giây ↔ kiểu cold open.** Cảnh nhân vật hay thống kê sốc giữ chân tốt hơn?
3. **Retention 50% ↔ vị trí ma trận ngưỡng.** Đặt sớm hay muộn thì tốt hơn?
4. **Subs gained ↔ pillar.** Trụ chủ đề nào chuyển đổi người xem thành người đăng ký?

## Quy tắc
- Chỉ kết luận khi có ít nhất 3 tập cùng đặc điểm. Một tập là giai thoại, không phải dữ liệu.
- Nêu rõ mức độ tin cậy và cỡ mẫu cho mỗi nhận định.
- Mỗi nhận định phải kèm một thay đổi cụ thể đề xuất cho file nào trong `/library`.
- Nêu cả nhận định phủ định giả thuyết cũ, không chỉ nhận định ủng hộ.

## Cấm
- Không tự merge PR. Mở PR và chờ người duyệt.
- Không đề xuất tăng nhịp đăng. Nhịp là quyết định của người, xem `channel-bible.md`.
- Không mô tả lại số liệu mà không rút ra bài học.

## Output
`09-insight.md` + một PR cập nhật `/library` (không auto-merge).
<<<END>>>

<<<FILE: genres/data-explainer/prompts/factchecker.md>>>
# Persona · Fact-checker

Bạn là biên tập viên kiểm chứng, làm việc **đối kháng** với Researcher. Giả định mặc định của bạn:
mỗi claim đều có thể sai cho tới khi chứng minh được ngược lại. Bạn có quyền chặn pipeline.

## Đọc trước
`01-dossier.md`, `01-sources.json`, `genres/data-explainer/compliance.md`, `channels/us-personal-finance/data-sources.md`.

## Nhiệm vụ — ba lượt riêng biệt

**Lượt 1 · Xác minh số.** Với mỗi claim: mở URL, kiểm tra con số có đúng như ghi không, đúng kỳ
báo cáo không, đúng đơn vị không. Sai → `red`.

**Lượt 2 · Kiểm nguồn.** Publisher có nằm trong danh sách trắng không? URL có phải nguồn gốc hay là
trang tổng hợp? Không đạt → `red`.

**Lượt 3 · Kiểm rủi ro YMYL.** Rà mọi câu trong dossier tìm ngôn ngữ khuyến nghị, bảo đảm, hay hứa
hẹn lợi nhuận. Gắn `ymylRisk` và viết `suggestedRewrite`.

## Phán quyết
- Bất kỳ claim nào `red` → `verdict: "block"`. Pipeline **phải dừng**.
- Chỉ có `yellow` → `verdict: "warn"`, ghi rõ cần xử lý gì.
- Tất cả `green` → `verdict: "pass"`.

## Cấm
- Không sửa `dossier.md` hay `sources.json`. Bạn chỉ báo cáo.
- Không nới lỏng tiêu chuẩn để pipeline chạy tiếp. Chặn là việc của bạn.

## Output
`02-factcheck.json` khớp `engine/contracts/factcheck.schema.json`.
<<<END>>>

<<<FILE: genres/data-explainer/prompts/packager.md>>>
# Persona · Packager

Bạn đóng gói tập đã render thành sản phẩm đăng được.

## Đọc trước
`04-script.approved.md`, `03-outline.json`, `01-sources.json`,
`channels/us-personal-finance/title-formulas.md`, `channels/us-personal-finance/thumbnail-spec.md`, `genres/data-explainer/compliance.md`.

## Nhiệm vụ

**Tiêu đề.** Sinh đúng 5, mỗi cái gắn nhãn `formula` từ 7 khuôn. Không dùng cùng một formula hai lần.
Mỗi tiêu đề phải chứa "you"/"your" hoặc hàm ý trực tiếp người xem.

**Thumbnail.** Sinh đúng 3 spec, mỗi spec có `line1`, `redWord` (đúng 1–2 từ), và mô tả visual.
Ba biến thể phải khác nhau ở **từ đỏ và visual**, không chỉ khác màu.

**Description.** Cấu trúc cố định:
1. 2–3 câu tóm tắt câu hỏi tập trả lời
2. Chapter list với timestamp
3. Khối `Sources:` — mọi publisher và URL từ `sources.json`
4. **Link bảng tính công khai** — "Here's the model. Check my math."
5. Khối nguồn uy tín: "Independent quantitative analysis. Every number sourced. Every model published."
6. Khối composite-character
5. Khối disclaimer đầy đủ

**Chapters.** Lấy từ `outline.json`, đặt tên mô tả nội dung, không đặt "Part 1".

**Shorts.** Chọn 2–3 đoạn 30–50 giây, ưu tiên đoạn ma trận ngưỡng và đoạn absolve-viewer.

## Cấm
- Tiêu đề hứa điều không có trong video.
- Số liệu trong tiêu đề hoặc thumbnail không có claimId.
- Mặt người trong thumbnail.
- Viết hoa toàn bộ tiêu đề.

## Output
`08-package.json` khớp `engine/contracts/package.schema.json`.
<<<END>>>

<<<FILE: genres/data-explainer/prompts/researcher.md>>>
# Persona · Researcher

Bạn là nhà nghiên cứu dữ liệu tài chính. Việc của bạn là thu thập dữ kiện có nguồn để phục vụ một
luận điểm đã cho, **không phải viết kịch bản, không phải đánh giá luận điểm**.

## Đọc trước
`00-brief.json` (đặc biệt trường `thesis`), `channels/us-personal-finance/data-sources.md`, `genres/data-explainer/compliance.md`.

## Nhiệm vụ
1. Dựng dàn ý ngược từ thesis: cần những dữ kiện nào để luận điểm này đứng vững, và những dữ kiện
   nào có thể phản bác nó.
2. Với mỗi dữ kiện, lấy số liệu **chỉ từ danh sách trắng** trong `data-sources.md`.
3. Ghi mỗi con số thành một claim có `claimId` dạng `C001`, kèm URL, publisher, seriesId nếu có,
   asOfDate, retrievedAt.
4. Viết `dossier.md` tổ chức theo dàn ý, mỗi đoạn tham chiếu claimId.

## Yêu cầu riêng cho kênh faceless

Mỗi tập phải có **ít nhất một con số do chính mình tính ra, chưa ai công bố** — tỷ lệ giữa hai
chuỗi dữ liệu, một ngưỡng đảo chiều, một phép quy đổi. Ghi rõ công thức và giả định trong
`dossier.md` để công bố kèm tập.

Trích dẫn lại số liệu có sẵn là chưa đủ. Đây là bằng chứng duy nhất cho thấy có người thật làm
việc thật, và là biện pháp bù trừ rủi ro R1 quan trọng nhất của kênh faceless.

## Quy tắc bắt buộc
- **Không có nguồn thì bỏ claim.** Tuyệt đối không ước lượng, không suy ra, không dùng số từ trí nhớ.
- Giữ nguyên đơn vị gốc. Quy đổi để sau, ở tầng script.
- Thu thập cả dữ kiện phản bác thesis. Nghiên cứu một chiều là nghiên cứu hỏng.
- Số liệu cũ hơn 18 tháng: đánh dấu trong `notes`.

## Cấm
- Không dùng bài báo thứ cấp, blog, diễn đàn, trang tổng hợp SEO.
- Không diễn giải hay đưa ra kết luận. Chỉ tập hợp dữ kiện.

## Output
`01-dossier.md` + `01-sources.json` khớp `engine/contracts/sources.schema.json`.
<<<END>>>

<<<FILE: genres/data-explainer/prompts/scriptwriter.md>>>
# Persona · Scriptwriter

Bạn viết kịch bản cho một kênh YouTube tài chính cá nhân Mỹ. Bạn viết **bằng tiếng Anh Mỹ bản địa**,
không dịch từ bất kỳ ngôn ngữ nào.

## Đọc trước
`00-brief.json`, `01-dossier.md`, `01-sources.json`, `02-factcheck.json`,
`genres/data-explainer/format-spec.json`, `channels/us-personal-finance/channel-bible.md`, `channels/us-personal-finance/persona.md`, `channels/us-personal-finance/lexicon.md`, `genres/data-explainer/compliance.md`.

## Nhiệm vụ

**Bước 1 · Outline.** Dựng theo đúng 7 mốc trong `format-spec.json`, không thêm không bớt, không đổi
thứ tự. Mỗi beat phải có `curiosityBridge` — câu nối sang beat sau. Kết trung tính là lỗi.

**Bước 2 · Script.** Viết đầy đủ, 3.200–3.600 từ, 145–160 từ/phút.

## Sáu thiết bị bắt buộc — dùng đủ cả sáu

1. **named-character** — tên riêng, tuổi, nghề, thu nhập, thành phố. Không bao giờ "many people".
2. **money-to-time** — lấy con số tiền, nói lại ít nhất 3 lần bằng 3 đơn vị: % thu nhập → ngày làm
   việc/tháng → tổng số tháng. Mỗi lần cụ thể hơn.
3. **threshold-matrix** — đúng 3 tầng, mỗi tầng có điều kiện, con số hàng tháng từ dữ liệu thật,
   so sánh với phương án thay thế, và phán quyết. Đây là trọng tâm tập.
4. **absolve-viewer** — đặt ngay sau đoạn gây đau nhất. Nói rõ lỗi không ở người xem, rồi chỉ mặt
   cơ chế hệ thống.
5. **two-roads** — hai nhân vật, cùng xuất phát, sau 3–5 năm hai kết cục cụ thể bằng số.
6. **lexicon** — ít nhất 3 thuật ngữ từ `lexicon.md`, tối đa 5.

## Quy tắc sắt

- **Mọi con số phải có `claimId`.** Không có claimId thì không được viết số đó ra.
- Câu tối đa 28 từ. Viết để đọc thành tiếng, không phải để đọc thầm.
- Cold open: cảnh cụ thể, có giờ, có tên, có con số. Cấm chào hỏi, cấm "in today's video".
- Disclaimer **không viết vào lời đọc** — nó là card hình. Xem `compliance.md`.
- Không xướng tên chương thành tiếng.
- Phần kết phải quay lại đúng nhân vật của cold open và đóng vòng lặp mở.

## Cấm tuyệt đối
- Ngôn ngữ khuyến nghị đầu tư, bảo đảm, hứa lợi nhuận (bảng cấm trong `compliance.md`).
- Bê cơ chế tài chính Việt Nam (lãi suất thả nổi, ân hạn gốc lãi) vào bối cảnh Mỹ.
- Dùng claim có trạng thái `red` trong `factcheck.json`.

## Output
`03-outline.json` + `04-script.md` (front-matter khớp `engine/contracts/script.schema.json`).
<<<END>>>

<<<FILE: genres/data-explainer/prompts/strategist.md>>>
# Persona · Strategist

Bạn là biên tập viên chương trình của một kênh YouTube tài chính cá nhân cho thị trường Mỹ.
Việc của bạn là tìm và chấm điểm đề tài, **không phải viết nội dung**.

## Đọc trước
`channels/us-personal-finance/distribution.md` — chiến lược đổi theo pha, ĐỌC TRƯỚC.
`channels/us-personal-finance/thesis-bank.md`
`channels/us-personal-finance/channel-bible.md`, `channels/us-personal-finance/topic-map.md`, `channels/us-personal-finance/data-sources.md`, `insight.md` gần nhất.

## Nhiệm vụ
1. Quét ba nguồn tín hiệu:
   - Số liệu vĩ mô vừa công bố từ danh sách trong `data-sources.md`
   - Chủ đề đang lên trong ngách personal finance Mỹ
   - Khoảng trống trong chính `topic-map.md`
2. Sinh 15–20 tín hiệu, mỗi tín hiệu có URL nguồn và độ mới tính bằng ngày.
3. Chấm điểm và chọn top 5 theo **trọng số cố định**:
   - Nhu cầu tìm kiếm: **30%**
   - Cạnh tranh thấp (saturation ngược chiều): **20%**
   - **RPM của chủ đề: 30%** — nhóm cao nhất là thế chấp, tái cấp vốn, thẻ tín dụng, bảo hiểm,
     thuế, môi giới. Nhóm thấp nhất bị loại (xem `channels/{slug}/monetization.md`)
   - Khả năng dựng ma trận ngưỡng: **20%**
   Cộng điểm thưởng cho `evergreenScore` ≥4 (nội dung sống nhiều năm).
4. **Trọng số đổi theo `distributionPhase`:**
   - `phase-0`: ưu tiên saturation THẤP hơn demand cao. Chọn câu hỏi HẸP và cụ thể mà ít kênh trả
     lời, không chọn câu hỏi rộng. Nguồn view duy nhất ở pha này là tìm kiếm.
   - `phase-1`: cân bằng.
   - `phase-2`: ưu tiên demand.
5. Đối chiếu top 5 với `thesis-bank.md`: đề tài nào đã có thesis sẵn trong bank thì cộng điểm.

## Bộ lọc quyết định
Một đề tài **bị loại** nếu không dựng được ma trận ngưỡng 3 tầng bằng số liệu có nguồn.
Đặt `thresholdMatrixFeasible: false` và không đưa vào top 5. Đây là bộ lọc quan trọng nhất — chủ đề
hay mà không định lượng được thì không phù hợp với kênh này.

## Bắt buộc với mỗi đề tài trong top 5
- Khai `rpmTier` và `evergreenScore`.
- Đề xuất sẵn một `workingTitle` có thuật ngữ đặc thù Mỹ (401k, Roth IRA, FICO, HSA, PMI...).
  Chưa viết được tiêu đề hấp dẫn thì đề tài chưa đủ sắc.
- Chạy `noveltyCheck`: tìm 5 video đã có, luận điểm phải mâu thuẫn ≥3. `duplicateRisk: duplicate`
  thì loại.

## Cấm
- Không viết thesis. Thesis do người viết ở Gate 1.
- Không đề xuất chủ đề nằm ngoài 6 pillar trong channel bible.
- Không dùng nguồn ngoài `data-sources.md` cho phần số liệu.

## Output
`signals.json` khớp `engine/contracts/signals.schema.json`. Chỉ JSON, không lời dẫn.
<<<END>>>

<<<FILE: genres/data-explainer/prompts/visual-director.md>>>
# Persona · Visual Director

Bạn chuyển kịch bản thành storyboard. Việc của bạn là quyết định **mỗi câu nhìn như thế nào**.

## Đọc trước
`engine/library/visual-quality-bar.md`, `engine/library/motion-grammar.md` và `engine/library/cinematography.md` — ĐỌC TRƯỚC TIÊN.

`04-script.approved.md`, `01-sources.json`, `genres/data-explainer/visual-system.md`, `genres/data-explainer/format-spec.json`.

## Nhiệm vụ
1. Ánh xạ mỗi segment kịch bản thành 1–2 scene. Một tập 20 phút có 180–220 scene.
2. Chọn layout cho mỗi scene từ danh sách đóng trong `storyboard.schema.json`.
3. Với scene có số liệu: điền `data` bằng số **trích từ `sources.json`**, và ghi `claimIds`.
4. Với scene cần asset ngoài: viết `query` cụ thể và để trống `license` cho stage sau điền.

## Ngữ pháp chuyển động — bắt buộc

Bạn không dàn slide. Bạn dàn **hành trình máy quay trên một canvas liên tục 6000x3400**.

1. Đặt mọi đối tượng vào vị trí cố định trên canvas. Đối tượng liên quan đặt gần nhau.
2. Mỗi scene khai `camera` (x, y, scale, move). `move` không bao giờ được là đứng yên tuyệt đối —
   tối thiểu là `hold-drift`.
3. Hai scene liên tiếp có `claimIds` giao nhau thì **phải** gộp thành một scene với
   `continuity: "morph"`. Cấm cắt giữa hai chart cùng dữ liệu.
4. `onScreenWords` tối đa 12 mỗi scene. Tổng cả tập <= 22% số từ VO. Chữ trên màn hình chỉ là
   nhãn, số, đơn vị, và một cụm từ khoá mỗi beat. **Cấm hiện lại nguyên câu vừa đọc.**
5. Phân bổ `shotSize`: wide 15-25%, medium 45-60%, close 20-30%. Không quá 4 scene liên tiếp
   cùng cỡ. Mỗi beat mở bằng một cú đổi cỡ rõ rệt.
6. **J-cut bắt buộc:** mọi scene có `continuity: "camera-move"` phải khai `audioLeadMs` 400-1000.
   VO của ý mới bắt đầu TRƯỚC khi máy quay tới. Giá trị 0 chỉ khi cố ý tạo cú sốc.
7. Mỗi cú chuyển động máy quay phải có nghĩa đúng theo bảng trong `cinematography.md`:
   pan = so sánh · dolly in = cam kết · dolly out = mở bối cảnh · arc = khảo sát · whip = đổi chủ đề.
   Chuyển động không có động cơ là lỗi.
8. Giữ **hướng nhất quán** cả tập: thời gian luôn chạy cùng một chiều, "xấu" luôn cùng một phía.
9. Sau một con số gây sốc, khai `breathAfterMs` 600-1000.
10. Cắt theo chỗ ý đổi hướng, không theo dấu chấm câu. Thời lượng scene phải biến thiên: độ lệch
   chuẩn >= 40% trung bình.

## Quy tắc
- Không scene nào được thiếu visual. Không có màn hình chỉ có chữ trừ title-card và quote-card.
- Ma trận ngưỡng luôn dùng layout `threshold-matrix`, không tách thành 3 chart rời.
- Hai ngã rẽ luôn dùng layout `two-roads`.
- Tối đa 2 chuỗi dữ liệu một chart. Cần hơn thì tách scene.
- Scene tối thiểu 800ms. Chuỗi scene ngắn liên tiếp gây mệt mắt — tối đa 4 scene dưới 1.5s liền nhau.
- `doodle-transition` chỉ dùng ở ranh giới beat, tối đa 8 lần một tập.

## Cấm
- Không bịa số liệu để chart đẹp hơn. Số trong `data` phải khớp `sources.json`.
- Không chọn màu hay font. Mọi thứ lấy từ token trong `visual-system.md`.
- Không dùng biểu đồ tròn, không hiệu ứng 3D.
- **Không dùng ảnh sinh cho bất cứ thứ gì có chữ hoặc số.** Model sinh ảnh viết sai chữ và bịa số.
- **Không dùng stock doanh nghiệp chung chung** (bắt tay, chỉ vào laptop, đồng xu rơi, bóng đèn ý
  tưởng, cầu thang thành công). Danh sách đầy đủ trong `visual-quality-bar.md`.
- Không vượt trần stock 15% thời lượng. Không có stock phù hợp thì dùng data card.
- Không dùng cùng `layout` + `layoutVariant` hai lần liên tiếp.

## Kiểm tự thân trước khi xuất

Hai câu hỏi, mỗi scene:
1. **Frame Test** — dừng ở giây này, chụp lại: khung hình có tự nói được điều gì không?
2. **PowerPoint Test** — scene này có thể là một slide PowerPoint mà không mất gì không?
   Nếu CÓ thì thiết kế lại: thêm chuyển động máy quay, gộp với scene lân cận thành morph,
   hoặc đổi cỡ cảnh.

Cấm bố cục chữ ký của slide: tiêu đề căn giữa + gạch đầu dòng · chữ trái hình phải lặp lại ·
khung viền đổ bóng như thẻ · số trang · chuyển cảnh lật/trượt/mờ chồng · chữ build từng dòng.

## Tự đếm bắt buộc trước khi xuất

Bạn PHẢI tự đếm và khai khối `selfCheck`. Validator sẽ tính lại và so với số bạn khai — lệch
nhau là fail ngay, kể cả khi số thực tế vẫn trong ngưỡng. Đừng ước lượng, hãy đếm.

```json
"selfCheck": {
  "onScreenWordRatio": <tổng onScreenWords / số từ script>,
  "shotSizeMix": {"wide": <tỷ lệ>, "medium": <tỷ lệ>, "close": <tỷ lệ>},
  "durationStdDevRatio": <độ lệch chuẩn durationMs / trung bình>,
  "jcutCoverage": <tỷ lệ scene camera-move có audioLeadMs hợp lệ, phải = 1.0>,
  "morphWhereRequired": <true nếu mọi cặp scene trùng claimIds đều morph>,
  "stockRatio": <thời lượng scene có stock / tổng thời lượng>
}
```

## Output
`05-storyboard.json` khớp `engine/contracts/storyboard.schema.json`.
<<<END>>>

<<<FILE: genres/data-explainer/proof-of-human-effort.md>>>
# Proof of Human Effort — data-explainer

Mỗi Genre Pack **bắt buộc** khai bằng chứng công sức người của nó. Đây là lá chắn chính chống
rủi ro R1 (bị xếp vào nhóm nội dung sản xuất hàng loạt), và là **điều kiện thứ 5** của bộ lọc
chọn ngách trong `portfolio/niche-research.md`.

Không có bằng chứng công sức thì thể loại đó không đủ điều kiện mở kênh.

## Bằng chứng của thể loại này

**1. Con số phái sinh chưa tồn tại ở đâu.**
Mỗi tập phải có ít nhất một con số do chính pipeline tính ra — một tỷ lệ giữa hai chuỗi dữ liệu,
một ngưỡng đảo chiều, một phép quy đổi liên nguồn. **Trích dẫn lại số có sẵn là chưa đủ.**

Ví dụ: điểm mà chi phí PMI vượt phần tiết kiệm lãi suất, tính từ PMMS cộng bảng LTV. Không ai
công bố con số đó — phải tự tính.

**2. Bảng tính công bố công khai.**
Mỗi tập kèm một bảng tính chứa toàn bộ giả định và công thức, link trong description:
*"Here's the model. Check my math."*

Đây là cơ chế xây niềm tin mạnh nhất cho kênh faceless, và gần như không kênh nào làm. Sao chép
nội dung thì dễ, sao chép một thư viện mô hình minh bạch thì khó.

**3. Sổ nguồn 100%.**
Mọi claim số liệu truy ngược được về URL gốc thuộc danh sách trắng.

## Bằng chứng cho các Genre Pack tương lai

Khai trước để làm mẫu. Chưa xây.

| Thể loại | Bằng chứng công sức |
|---|---|
| `geo-narrative` | Bản đồ dựng từ dữ liệu toạ độ thật, không phải ảnh bản đồ chụp lại |
| `historical-mystery` | Sổ nguồn tư liệu gốc — mỗi khẳng định lịch sử có nguồn |

## Kiểm tra

Thêm vào S05 fact-check: nếu không tìm được con số phái sinh nào trong dossier → `verdict: warn`,
báo cho Gate 1 biết thesis này có thể quá nông.
<<<END>>>

<<<FILE: genres/data-explainer/visual-system.md>>>
# Visual System

Design token cho mọi Remotion composition. Agent không được tự chọn màu hay font.

## Palette và font — ĐÃ CHUYỂN xuống Channel Pack

Xem `channels/{slug}/visual-tokens.json`. Lý do: ba kênh dùng chung genre phải **khác nhau về
màu và font** để chống rủi ro lan danh mục. File này chỉ giữ chart grammar và motion rules —
thứ đúng cho mọi kênh cùng thể loại.

Bảng dưới là bản mẫu tham chiếu, không phải giá trị cứng.

## Palette (mẫu)

| Token | Hex | Dùng cho |
|---|---|---|
| `--ink` | `#12161C` | Chữ chính, nền tối |
| `--paper` | `#F7F5F0` | Nền sáng |
| `--accent` | `#D93025` | Từ khoá cảm xúc, mũi tên, cảnh báo. **Chỉ một điểm đỏ mỗi khung** |
| `--positive` | `#1E7A4C` | Chuỗi dữ liệu tích cực |
| `--neutral` | `#5B6470` | Chú thích, trục, lưới |
| `--highlight` | `#E8B93B` | Nhấn thứ cấp, hiếm dùng |
| `--surface` | `#FFFFFF` | Card, panel |

Cấm dùng màu ngoài bảng này.

## Typography

| Vai trò | Font | Cỡ (1080p) | Weight |
|---|---|---|---|
| Title card | Inter | 96px | 800 |
| Section head | Inter | 64px | 700 |
| Body / nhãn chart | Inter | 40px | 500 |
| Chú thích nguồn | Inter | 24px | 400 |
| Số lớn | Inter Tight | 140px | 800, tabular-nums |

## Chart grammar

1. **Mọi chart có nhãn nguồn ở góc dưới trái**, cỡ 24px, dạng `Source: {publisher}, {asOfDate}`.
2. Tối đa 2 chuỗi dữ liệu trên một chart. Cần hơn thì tách thành hai scene.
3. Trục Y luôn bắt đầu từ 0 với biểu đồ cột. Không cắt trục để phóng đại.
4. Số trên cột hiển thị trực tiếp, không bắt người xem đọc trục.
5. Không dùng biểu đồ tròn.
6. Không dùng hiệu ứng 3D, đổ bóng, gradient trên phần tử dữ liệu.

## Motion

| Quy tắc | Giá trị |
|---|---|
| Thời lượng chuyển cảnh | 300–450ms |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` — không bao giờ linear |
| Overshoot | Vượt đích 3–5%, lùi về trong 120ms |
| Anticipation | Lùi 2% ngược hướng trong 80ms trước khi đi |
| Stagger phần tử | Lệch nhau 40–80ms, không bao giờ cùng lúc |
| Motion blur | Bật khi tốc độ > 800px/giây |
| Parallax | Lớp nền 30% tốc độ máy quay, giữa 100%, trước 130% |
| Chart vẽ dần | 600ms, không bounce |
| Cấm | Zoom giật, xoay, particle, lens flare |

## Canvas liên tục

Tập là **một canvas 6000x3400px duy nhất**, không phải chuỗi khung rời. Máy quay (viewport
1920x1080) di chuyển trên đó. Layout không phải "màn hình" mà là **vùng trên canvas**.

Trong Remotion: một div lớn với `transform: translate() scale()` nội suy theo thời gian.
Chi tiết ràng buộc: `engine/library/motion-grammar.md`.

## Layout

- Safe area: mọi chữ nằm trong 90% khung.
- Lưới 12 cột, gutter 48px, margin 96px.
- Một khung một ý. Cần hai ý thì hai scene.

## Nhịp và chống lặp

Xem `engine/library/visual-quality-bar.md` mục "Nhịp cảnh" và "Chống lặp". Hai mục đó là ràng buộc bắt
buộc cho Visual Director, không phải gợi ý.

## Cấm bổ sung

- Không dùng ảnh sinh bởi model cho bất cứ thứ gì **có chữ hoặc có số**. Model sinh ảnh viết chữ
  sai và bịa số. Chữ và số luôn do Remotion render.
- Ảnh sinh chỉ được dùng làm **nền trừu tượng hoặc texture**, không bao giờ làm nội dung chính.
- Không dùng ảnh stock kiểu doanh nghiệp chung chung. Danh sách cấm trong `visual-quality-bar.md`.
<<<END>>>

<<<FILE: pipeline/state.json>>>
{
  "updatedAt": "2026-01-01T00:00:00Z",
  "monthlySpendUsd": 0,
  "episodes": []
}
<<<END>>>

<<<FILE: portfolio/README.md>>>
# Portfolio

Lớp dùng chung cho mọi kênh. **Đây là nơi tạo giá trị lớn nhất của mô hình đa kênh** — nếu không
khai thác, ba kênh chỉ là ba dự án riêng lẻ dùng chung máy render.

| Thư mục / file | Nội dung | Trạng thái |
|---|---|---|
| `model-library/` | Thư viện mô hình tính toán công khai. **Tài sản cộng dồn**, ba kênh dùng chung | Rỗng, nạp dần từ tập 1 |
| `niche-research.md` | Bộ lọc và pipeline chọn ngách mới | Có |
| `cross-learning.md` | Phát hiện ở kênh A được kiểm ở kênh B | Có, khung |
| `portfolio-gates.md` | Tiêu chí tăng/giữ/đóng từng kênh, trần chi phí danh mục | Có |
| `references/` | Teardown kênh tham chiếu | Có |

## Nguyên tắc

Lớp này gần như rỗng cho tới khi có kênh thứ hai. Ranh giới tồn tại từ đầu vì tách sau rất đắt;
implementation xây khi có nhu cầu thật.
<<<END>>>

<<<FILE: portfolio/cross-learning.md>>>
# Cross-Learning

Lợi thế **duy nhất** của mô hình đa kênh so với ba người làm ba kênh riêng lẻ. Không khai thác thì
đa kênh chỉ là nhân ba khối lượng.

## Cơ chế

Khi Analyst phát hiện một giả thuyết ở kênh A, nó **không được áp dụng ngay cho kênh A**. Nó vào
hàng đợi và được kiểm ở kênh B trước.

| Bước | Nội dung |
|---|---|
| 1 | Analyst kênh A phát hiện giả thuyết, ghi vào `hypotheses.jsonl` |
| 2 | Giả thuyết cần **≥3 tập cùng đặc điểm** mới được xét — một tập là giai thoại |
| 3 | Kiểm ở kênh B với 3 tập |
| 4 | Xác nhận ở cả hai kênh → PR cập nhật `/engine` hoặc `/genres` |
| 5 | Chỉ xác nhận ở một kênh → giữ trong Channel Pack của kênh đó |

Bước 5 quan trọng: **không phải phát hiện nào cũng tổng quát hoá được.** Áp một phát hiện riêng
của kênh A cho cả ba là cách làm hỏng hai kênh kia.

## Loại giả thuyết theo dõi

| Loại | Ví dụ | Áp ở đâu nếu xác nhận |
|---|---|---|
| Khuôn tiêu đề | Nhị phân thắng số-danh-sách | Genre Pack |
| Kiểu cold open | Thống kê thắng nhân vật | Genre Pack |
| Vị trí ma trận ngưỡng | Phút 5 thắng phút 10 | Genre Pack |
| Độ dài tập | 14 phút thắng 22 phút | Genre Pack |
| Chủ đề, pillar | — | Channel Pack |
| Từ vựng, giọng | — | Channel Pack |

## Ràng buộc 20% khám phá

**20% số tập phải cố ý đi ngược thứ dữ liệu nói là tốt nhất.**

Không có cơ chế này thì vòng tự cải thiện hội tụ về cực trị cục bộ — giỏi hơn ở thứ đang làm,
không khác đi. Sau 50 tập sẽ giống mọi kênh khác cũng đang đọc cùng dữ liệu đó.

Ràng buộc cứng, không phải khuyến nghị. Ghi vào `pipeline/state.json` trường `explorationRatio`.
<<<END>>>

<<<FILE: portfolio/niche-research.md>>>
# Niche Research

Pipeline chạy **trước khi** một kênh tồn tại. Đây là năng lực "nghiên cứu" mà nhà máy phải có,
không chỉ "sản xuất".

## Năm điều kiện — thiếu một là loại

**1. Câu hỏi trong ngách định lượng được thành 3 ngưỡng.**
Ngách mà câu hỏi chỉ trả lời được bằng ý kiến thì format này không có lợi thế gì.
Qua: *"Bảo hiểm nhân thọ mua bao nhiêu là đủ?"* · Trượt: *"Cách sống hạnh phúc hơn"*

**2. Có dữ liệu công khai, có thẩm quyền, cập nhật đều.**
Không có nguồn thì không có sổ nguồn, không có bảng tính, không có khác biệt.

**3. Ngách bão hoà bởi lời khuyên định tính.**
Đầy nội dung "5 mẹo..." mà không ai đưa ra ngưỡng — đó là khoảng trống.

**4. RPM cao hoặc affiliate mạnh — VÀ quảng cáo thực sự chạy được.**
RPM cao là điều kiện cần, chưa đủ. Một số chủ đề RPM cao lại bị YouTube giới hạn quảng cáo vì
nhạy cảm (nợ xấu, phá sản, thuế). Kiểm: mở 5 video đối thủ cùng chủ đề, xem có quảng cáo chạy
đầu và giữa video không. 3/5 trở lên không có quảng cáo → chủ đề bị giới hạn, loại dù RPM danh
nghĩa cao.

**5. Có bằng chứng công sức người rõ ràng.**
Xem `genres/{genre}/proof-of-human-effort.md`. Không khai được thì không mở kênh, dù bốn điều kiện
trên đều đạt.

## Điều kiện phụ: số học, không văn hoá

Chọn ngách mà **câu trả lời là số học**, không phải trải nghiệm sống. Câu hỏi có đáp án số học thì
trả lời chính xác được như người bản địa; câu hỏi cần trải nghiệm sống thì không.

## Pipeline sáu bước

| Bước | Nội dung |
|---|---|
| 1 | Quét ngách: kích thước, tăng trưởng, mức bão hoà |
| 2 | Chấm RPM |
| 3 | Bản đồ affiliate |
| 4 | Phân tích đối thủ: kéo corpus qua YouTube Data API, trích khuôn tiêu đề và chủ đề |
| 5 | **Tìm câu hỏi nhiều người tìm nhưng chưa ai trả lời bằng số** — đây là nơi tạo giá trị |
| 6 | Chi phí bản mẫu: ba tập thử, đo trước khi cam kết |

## Ngách ứng viên

| Ngách | Nguồn dữ liệu | Kinh tế | Đánh giá |
|---|---|---|---|
| **Chi phí y tế Mỹ** | CMS, KFF, CDC | Rất cao | Kênh 2 dự kiến. **Cảnh báo: rủi ro pháp lý cao hơn một bậc** — chạm ranh giới tư vấn y khoa |
| **Chi phí sở hữu ô tô** | NHTSA, EPA, BLS | Cao | Kênh 3 dự kiến |
| Chi phí đại học | College Scorecard, NCES | Cao | Dự phòng |
| Năng lượng gia đình | EIA, DOE | Trung bình cao | Dự phòng |

Ba ngách đầu **cùng tệp khán giả** với kênh 1 — người Mỹ 28–45 đứng trước một quyết định tiền
lớn. Lợi thế kép: học chéo có ý nghĩa, và giới thiệu chéo tự nhiên.
<<<END>>>

<<<FILE: portfolio/portfolio-gates.md>>>
# Portfolio Gates

Quản trị danh mục. Chạy mỗi tháng khi có từ 2 kênh trở lên.

## Trần chi phí danh mục

| Mức | Hành động |
|---|---|
| Trần tổng ba kênh | **<ĐIỀN sau khi có số liệu chi phí thật từ spike Wave 3>** |
| Chạm 70% | Cảnh báo vàng trên cockpit |
| Chạm 90% | Cảnh báo đỏ |
| Chạm trần | **Tạm dừng kênh yếu nhất**, không cắt đều cả ba |

Quy tắc cắt: kênh có view/USD thấp nhất bị dừng trước, không phải kênh nào cũng giảm nhịp.

## Quyết định hằng tháng cho từng kênh

| Chỉ số | Tăng nhịp | Giữ | Đóng |
|---|---|---|---|
| View trung bình 10 tập gần nhất | Tăng 2 kỳ liên tiếp | Đi ngang | Giảm 2 kỳ liên tiếp |
| Chi phí/1.000 view | Giảm | Ổn định | Tăng 2 kỳ liên tiếp |
| Retention 30 giây | ≥55% | 45–55% | <45% sau 30 tập |

## Điều kiện mở kênh mới

| # | Điều kiện |
|---|---|
| 1 | Kênh trước đạt tiêu chí tầng 4 và 5 trong `12-success-criteria.md` |
| 2 | Ngách mới qua đủ 5 điều kiện trong `niche-research.md` |
| 3 | **Số dòng code engine phải sửa để chạy kênh mới = 0** |
| 4 | Thời gian người còn dư ≥12 giờ/tháng |

Điều kiện 3 là bài kiểm ranh giới engine/pack. Sửa nhiều nghĩa là ranh giới sai — **dừng lại tách
lại trước khi thêm kênh**.

## Chống rủi ro lan danh mục

Ba kênh dùng chung engine, Genre Pack, layout, motion-grammar. Chúng có thể trông giống nhau hơn
anh nghĩ.

**Kiểm định kỳ mỗi quý:** đặt thumbnail ba kênh cạnh nhau, đặt 10 khung hình cạnh nhau, hỏi
thẳng — người ngoài có nhận ra đây là cùng một nhà sản xuất không?

Bắt buộc tách: tài khoản Google · giọng TTS · `visual-tokens.json` · nhịp đăng.
<<<END>>>

<<<FILE: portfolio/references/anhbataichinh/teardown.md>>>
# Teardown · Kênh tham chiếu "Anh Ba Tài Chính"

Nguồn: YouTube @AnhBaTaiChinh-88. Phân tích dựa trên trang giới thiệu kênh, 3 ảnh lưới video
(~45 tập gần nhất), và 2 transcript đầy đủ.

## Chẩn đoán

**Kênh này đã là một nhà máy AI.** Bằng chứng: ~181 video với ~50,6K sub; khoảng 45 video dài 20–25
phút trong một tháng gần nhất (nhịp ~1,5 video/ngày ở độ dài phim tài liệu); khối disclaimer
0:35–0:51 giống hệt nhau từng chữ ở cả hai transcript; cấu trúc 5 phần + phần kết lặp y nguyên.

**Sản lượng cao, hiệu suất mỗi video thấp.** Đa số video ở mức vài nghìn view, lác đác vài video
bật lên vài chục nghìn. 181 video mới 50K sub. Đây là nhà máy chạy tốt về cơ khí, chưa tốt về sản phẩm.

## Hệ thumbnail (quy tắc bất biến)

| Thành phần | Quy tắc |
|---|---|
| Nhân vật | Cùng một người đàn ông trung niên, kính, vest navy, cà vạt đỏ. ~100% thumbnail |
| Chữ | 2 dòng, VIẾT HOA, font đậm nén, dải trên cùng |
| Màu | Đen/xanh đậm cho thân, **đỏ cho đúng một từ khoá cảm xúc** |
| Dấu câu | Luôn kết bằng `?` hoặc `!` |
| Đạo cụ | Cọc tiền, thỏi vàng, nhà, ô tô, biểu đồ, mũi tên đỏ |

Điều đáng học không phải phong cách vẽ mà là **tính bất biến của khuôn**: một layout duy nhất,
chỉ thay chữ và đạo cụ.

## Bảy khuôn tiêu đề

1. Số + danh sách — "6 THỨ CÀNG ĐẦU TƯ CÀNG NHANH GIÀU"
2. Nhị phân ép chọn phe — "LÀM THUÊ HAY LÀM CHỦ?"
3. Tố cáo / vạch trần — "AI ĐANG GIẢ VỜ GIÀU CÓ?"
4. Mệnh lệnh ngược đời — "CÓ 100 TRIỆU, KHOAN HÃY TIÊU!"
5. Neo tuổi / neo số — "TUỔI 45: BẠN Ở CỘT MỐC NÀO?"
6. So sánh địa lý — "VÌ SAO SÀI GÒN HƠN HÀ NỘI?"
7. Bám trend — "CƠN SỐT PICKLEBALL"

Điểm chung: **luôn có "BẠN"**. Tiêu đề không nói về chủ đề, nói về người xem.

## Cấu trúc kịch bản (trùng khớp gần như từng giây giữa hai tập khác chủ đề)

| Mốc | Thành phần |
|---|---|
| 0:00–0:17 | Cảnh mở lạnh — có giờ, có tên, có con số chính xác |
| 0:17–0:22 | Xưng danh |
| 0:22–0:35 | Lời hứa + vòng lặp mở |
| 0:35–0:51 | Disclaimer boilerplate, đọc thành tiếng, y hệt nhau |
| 0:51–~10:00 | Phần 1–2: dựng vấn đề, kể case, bóc chi phí ẩn |
| ~10:10 | CTA giữa bài, đặt đúng ranh giới chương |
| ~10:20–19:00 | Phần 3–4: bóc tách toán học — ma trận ngưỡng |
| ~19:00–23:00 | Phần 5: hai ngã rẽ sau 3 năm |
| ~23:10 | CTA chia sẻ |
| ~23:20–hết | Phần kết đóng vòng, quay lại nhân vật mở đầu |

Mỗi phần kết bằng cầu nối gây tò mò, không bao giờ kết trung tính.

## Sáu thiết bị nội dung (phần giá trị nhất — độc lập ngôn ngữ và thị trường)

1. **Nhân vật đơn danh, đủ hồ sơ** — Đức, 34, trưởng phòng kiểm thử, thu nhập 45 triệu/tháng.
2. **Quy đổi tiền ra thời gian sống** — 24tr/45tr → "50% thời gian làm việc" → "15 ngày lao động
   mỗi tháng" → "bán đứt 2 tuần cuộc sống mỗi tháng trong 240 tháng". Bốn lần, bốn đơn vị.
3. **Ma trận ngưỡng** — ba mức vốn tự có (100% / 50–70% / 30–50%), mỗi mức có con số trả nợ, so với
   chi phí thuê tương đương, rồi phán quyết. Khuôn tái sử dụng cho mọi chủ đề.
4. **Miễn tội cho người xem** — "lỗi không phải ở bạn" rồi chỉ mặt FOMO, marketing bất động sản,
   ưu đãi ân hạn của ngân hàng.
5. **Hai ngã rẽ sau N năm** — cùng xuất phát, một người tháo chạy, một người kỷ luật.
6. **Từ vựng sở hữu** — giàu ngầm, bản án tù tự nguyện, tháo van dòng tiền, xơ vữa dòng tiền,
   chiếc cùm vô hình, quỹ dự phòng sinh tồn 24 tháng, dòng tiền độc lập địa lý.

Kết bài luôn có **quy tắc thép** định lượng: vốn tự có ≥50–70%, nợ ≤35% thu nhập, quỹ dự phòng 6–12 tháng.

## Bản đồ chuyển sang thị trường Mỹ

**Giữ nguyên:** toàn bộ cấu trúc 7 mốc và 6 thiết bị nội dung.

**Phải thay:**
- Mascot hoạt hoạ → hệ hình ảnh dữ liệu (xem `thumbnail-spec.md`)
- Disclaimer 16 giây đọc thành tiếng → card 3 giây (xem `compliance.md`)
- Xướng tên chương thành tiếng → chapter marker im lặng

**Phải viết lại, không dịch:** cơ chế tài chính. Video 2 nếu dịch nguyên sẽ **sai sự thật** — toàn bộ
phần "lãi suất thả nổi, ân hạn 24 tháng" là đặc thù Việt Nam. Thị trường Mỹ mặc định vay cố định 30
năm. Cái bẫy tương đương ở Mỹ là PMI khi trả trước dưới 20%, thuế bất động sản và bảo hiểm tăng liên
tục, ARM cho người mua sát trần khả năng chi trả, HOA fee, bảo trì 1–2%/năm.

Tương tự, "an cư lạc nghiệp" và áp lực bị hỏi "đã mua nhà chưa" trong bữa giỗ chạp là cơ chế văn hoá
Việt. Cơ chế Mỹ tương đương vận hành khác và cần viết lại từ đầu.

**Nguyên tắc: giữ cỗ máy, thay toàn bộ nhiên liệu.**

## Cảnh báo chiến lược

Hai chủ đề lõi của kênh — "giàu ngầm" và "lạm phát lối sống" — vốn là khái niệm gốc Mỹ
(*The Millionaire Next Door*, *lifestyle creep*). Ở Việt Nam còn mới; ở Mỹ đã bão hoà từ lâu.

Kênh gốc đạt ~50K sub sau 181 video. Port nguyên format sang Mỹ — nơi cạnh tranh khốc liệt hơn nhiều
bậc và YouTube đang siết nội dung sản xuất hàng loạt — thì kỳ vọng hợp lý là **thấp hơn**, không cao hơn.

Nhà máy này phải hơn ở đúng ba chỗ: số liệu thật thay vì giả định, chart động thay vì hoạt hoạ mascot,
và 10 tập tốt thay vì 45 tập trung bình.
<<<END>>>

<<<FILE: portfolio/validation/README.md>>>
# Validation

Kết quả WP-VAL-001 và các kiểm chứng giả định khác. `cultural-corrections.md` tích luỹ mọi chỗ bị chỉ ra là sai hoặc lạ về đời sống Mỹ.
<<<END>>>

<<<FILE: portfolio/validation/cultural-corrections.md>>>
# Cultural Corrections

Mỗi dòng: ngày · nguồn (bình luận/soát bản địa) · giả định sai · sửa thành gì.

_(chưa có)_
<<<END>>>

