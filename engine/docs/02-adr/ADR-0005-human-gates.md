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
