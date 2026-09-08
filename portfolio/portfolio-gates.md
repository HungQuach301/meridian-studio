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
