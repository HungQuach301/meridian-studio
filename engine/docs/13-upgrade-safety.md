# 13 · Upgrade Safety

Sáu cơ chế cho phép sửa đổi và nâng cấp mà không ảnh hưởng cấu phần đang vận hành.

## 1 · Versioning — nền của mọi thứ khác

Mỗi episode ghi lại **phiên bản** của contract, Genre Pack, Channel Pack và prompt đã dùng để tạo
ra nó, vào `00-brief.json`:

```json
"versions": {
  "engine": "0.1.0",
  "genre": "data-explainer@0.3.0",
  "channel": "us-personal-finance@0.2.0",
  "prompts": {"researcher": "1.2", "scriptwriter": "2.0"}
}
```

Không có điều này thì không tái lập được tập cũ, không so sánh được A/B, và không biết một thay
đổi ảnh hưởng tập nào.

## 2 · Quy tắc 3 tập

Mọi thay đổi ở `/engine` hoặc `/genres` phải **chạy trên kênh 1 qua ít nhất 3 tập** trước khi áp
cho kênh 2 và 3.

Không cần hạ tầng staging — chỉ cần một nhãn trên PR và kỷ luật.

## 3 · Golden set trong CI

5 brief cố định. Mỗi PR chạm prompt phải chạy lại và so output với bản chuẩn. Chi phí ~2 USD mỗi
lần, rẻ hơn nhiều so với phát hiện sau 10 tập.

Đây là bộ hồi quy cho **nội dung**, tương đương test hồi quy cho code.

## 4 · Thay đổi cộng thêm, không thay thế

- Layout mới thì **thêm** vào `layouts.json`, không sửa layout cũ
- Prompt mới thì tạo phiên bản mới, kênh chuyển sang khi sẵn sàng
- Contract chỉ được **thêm trường tuỳ chọn**. Thêm trường bắt buộc là thay đổi phá vỡ, phải qua ADR

## 5 · Cờ phiên bản theo kênh

`channel.json` có `engineVersion`. Kênh 1 lên `0.2.0` trước, kênh 2 và 3 giữ `0.1.0` cho tới khi
yên tâm.

Đây là cách thay môi trường staging bằng cấu hình — phù hợp với ràng buộc zero-local.

## 6 · Đóng băng khi đang chạy

Một episode đã bắt đầu pipeline thì **dùng phiên bản đã ghi ở lúc bắt đầu** cho tới khi xong.
Không nhận thay đổi giữa chừng. Tránh trường hợp tập chạy nửa chừng với hai phiên bản prompt
khác nhau.

## Hai loại nghiệm thu

Phân loại theo nơi chạy; WP phải ghi rõ môi trường, dữ liệu, thời điểm và bằng chứng.

| Loại | Chạy ở đâu | Dữ liệu và thời điểm |
|---|---|---|
| **Loại 1** | Môi trường tạm của coding agent nếu có runtime phù hợp | Dữ liệu giả, không secret production; kiểm trước PR |
| **Loại 2** | GitHub Actions | Có thể chạy CI trước merge với fixture, không secret; hoặc chạy thật sau merge khi được duyệt riêng |

ChatGPT Work chuẩn bị thay đổi và đọc bằng chứng từ Actions. WP-000 và WP-001 dùng
**Loại 2 trên Node 20, trước merge, không gọi provider hay dùng secret production**.
Không phải mọi acceptance đều cần Codex Cloud; không yêu cầu chủ dự án có máy local.

Mỗi WP phải chỉ rõ lệnh/kịch bản, SHA nguồn, tiêu chí pass/fail và liên kết workflow run.
Với fixture âm, ghi exit code và lỗi mong đợi của tiến trình thật; harness xanh không có
nghĩa PR thật đã đỏ. Không thay fixture bằng kết quả giả hoặc test không có assertion.

Nhãn Loại 2 **không cấp quyền** dùng secret, gọi TTS/LLM/YouTube, render production,
dispatch/rerun hay triển khai. Những thao tác đó cần phê duyệt riêng theo phạm vi WP.
