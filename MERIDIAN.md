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
