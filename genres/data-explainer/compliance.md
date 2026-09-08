# Compliance

## YMYL — nội dung tài chính

Nội dung tiền bạc bị soi kỹ về độ chính xác. Ba lớp bảo vệ:

1. **Sổ nguồn bắt buộc** — 100% claim số liệu truy ngược được.
2. **Fact-check pass riêng** — agent thứ hai, prompt đối kháng, có quyền chặn pipeline.
3. **Disclaimer** — trong video và trong description.

## Disclaimer

**Trong video:** card 3 giây, hiển thị ở giây 30–33, **không đọc thành tiếng**.

> This content is for education and entertainment only. It is not financial advice.
> Consult a licensed professional before making decisions about your money.

Lý do không đọc thành tiếng: kênh tham chiếu đọc khối disclaimer 16 giây ở phút 0:35. Ở thị trường
Mỹ, chèn 16 giây văn bản pháp lý vào đúng đoạn quyết định retention sẽ giết video.

**Trong description:** khối đầy đủ ở cuối, sau danh sách nguồn.

## Ngôn ngữ bị cấm trong script

| Cấm | Thay bằng |
|---|---|
| "You should buy/sell..." | "The math on this option looks like..." |
| "guaranteed", "risk-free", "can't lose" | "historically", "in most scenarios" |
| "This will make you rich" | "This changes the arithmetic in your favor" |
| "Everyone should..." | "If you're in tier 2, the numbers suggest..." |
| Tên mã cổ phiếu, crypto, sản phẩm tài chính cụ thể | Loại tài sản chung |

Fact-checker gắn `ymylRisk` cho mọi câu vi phạm. Mức `advice-like` trở lên phải viết lại.

## Khai báo nội dung AI

YouTube yêu cầu khai báo nội dung tổng hợp hoặc chỉnh sửa có thể khiến người xem nhầm là thật.
- VO sinh bằng TTS → khai báo.
- Chart, diagram, doodle → không phải nội dung gây nhầm lẫn, nhưng khai báo vẫn an toàn hơn.
- Trường `aiDisclosure` trong `publication.json` mặc định `true`.

## Bản quyền

- Mọi asset ghi một dòng trong `episodes/{id}/assets/LICENSES.md`: nguồn, license, URL, ngày tải.
- Chỉ dùng stock có license thương mại rõ ràng.
- Giọng TTS phải có điều khoản cho phép dùng thương mại và kiếm tiền.
- Nhạc nền: chỉ nguồn royalty-free có giấy phép lưu lại.
- Không dùng biểu đồ, ảnh chụp màn hình từ báo cáo có bản quyền — dựng lại từ dữ liệu gốc.

## Nhân vật minh hoạ

Nhân vật trong script là composite, không phải người thật. Nêu rõ một lần trong description:
> Characters in this video are composites created to illustrate the math. Any resemblance to a
> specific person is coincidental.
