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
