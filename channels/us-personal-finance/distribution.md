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
