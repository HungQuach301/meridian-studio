# WP-006a · Layout Gallery — cổng chất lượng hình ảnh

**Wave:** 2 · **Phụ thuộc:** WP-006 · **Trạng thái:** todo
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
