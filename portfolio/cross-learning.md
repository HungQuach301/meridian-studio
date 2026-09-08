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
