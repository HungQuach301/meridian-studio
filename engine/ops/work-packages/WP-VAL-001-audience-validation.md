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
