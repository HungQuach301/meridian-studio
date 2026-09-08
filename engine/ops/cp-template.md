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
