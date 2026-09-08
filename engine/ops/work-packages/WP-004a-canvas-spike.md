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
