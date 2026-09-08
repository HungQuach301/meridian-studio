# ADR-0002 · Remotion thay vì model sinh video

**Trạng thái:** Chấp nhận

## Bối cảnh
Định hướng nội dung là phân tích chuyên sâu, dùng nhiều biểu đồ động, sơ đồ, infographic, doodle.
Mọi con số trên màn hình phải khớp với `sources.json`.

## Phương án đã cân nhắc
1. **Model sinh video (text-to-video)** — kết quả không deterministic, không thể hiện đúng số liệu,
   không sửa được từng phần, chi phí cao, và bị khán giả Mỹ nhận diện là nội dung máy.
2. **Dựng thủ công trên phần mềm editing** — không tự động hoá được, cần máy local.
3. **Remotion (video viết bằng React) + ffmpeg** — chọn.

## Quyết định
Dùng Remotion làm engine render. Mỗi layout là một React composition nhận props từ dữ liệu thật.

## Hệ quả
- (+) Deterministic: cùng input cho cùng output, render lại được, sửa từng scene được.
- (+) Chart dựng từ số liệu thật, không phải minh hoạ.
- (+) Chạy được trong Actions (Node + Chromium headless).
- (−) Cần đầu tư trước vào thư viện layout — đây là chi phí lớn nhất của Wave 4.
- (−) Không tạo được cảnh quay thực tế; phải bù bằng stock và footage tự quay.
