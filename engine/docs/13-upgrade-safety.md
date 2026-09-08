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

Codex không chạy được mọi acceptance test — sandbox không có secret production.

| Loại | Chạy ở đâu | Ví dụ |
|---|---|---|
| **Loại 1** | Sandbox Codex, trước khi mở PR | schema, typecheck, unit test, render 5 giây dữ liệu giả |
| **Loại 2** | Actions sau khi merge, có secret thật | render đầy đủ, TTS thật, upload, so sánh cặp thị giác |

Mỗi WP phải ghi rõ acceptance test thuộc loại nào.
