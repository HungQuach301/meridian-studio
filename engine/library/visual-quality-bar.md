# Visual Quality Bar

Tài liệu quan trọng nhất quyết định chất lượng hình ảnh. Mọi layout, mọi scene, mọi tập đều bị
chấm theo đây. Không đạt thì không đăng.

Lý do tồn tại: trong các lần triển khai trước, hình ảnh kém là nguyên nhân thất bại số một.
Nguyên nhân gốc là hình ảnh bị coi là bài toán *sinh* thay vì bài toán *thiết kế*.

## Nguyên tắc nền

**Thiết kế một lần, sinh nhiều lần.** Con người thiết kế ~12 layout cho thật tốt. Máy chỉ đổ dữ
liệu vào layout đã thiết kế. Máy không bao giờ được tự quyết bố cục, màu, hay kiểu chữ.

Hệ quả: chất lượng hình ảnh của cả kênh = chất lượng của 12 layout đó. Đầu tư vào chúng là đầu
tư có đòn bẩy cao nhất trong toàn dự án. Layout xấu thì 30 tập/tháng đều xấu.

## Bài kiểm khung hình (Frame Test)

Bài kiểm quan trọng nhất, áp cho mọi scene:

> Dừng video ở một giây bất kỳ. Chụp màn hình. Đưa khung hình đó cho người chưa xem video.
> **Khung hình đó tự nó phải nói được một điều gì đó.**

Khung hình không qua bài kiểm này gồm: nền trơn có một dòng chữ chung chung · stock ảnh người mặc
vest chỉ vào laptop · biểu đồ không nhãn · chữ chạy giữa màn hình không ngữ cảnh.

Kiểm ngẫu nhiên 10 khung mỗi tập. **Dưới 8/10 đạt thì tập đó không đăng.**

## Chuẩn cho từng layout

Mỗi layout trong `/templates` phải qua đủ 8 tiêu chí trước khi được đưa vào dùng:

| # | Tiêu chí | Cách kiểm |
|---|---|---|
| 1 | Đọc được ở 25% kích thước | Thu nhỏ về 480×270, chữ chính vẫn đọc được |
| 2 | Chỉ dùng token trong `visual-system.md` | Quét mã, không hex nào ngoài palette |
| 3 | Đúng một điểm nhấn đỏ mỗi khung | Đếm phần tử màu `--accent` |
| 4 | Mọi số liệu có nhãn nguồn | Góc dưới trái, 24px, `Source: {publisher}, {date}` |
| 5 | Có khoảng thở | Margin 96px, không phần tử nào chạm mép |
| 6 | Chuyển động có mục đích | Mỗi animation phải giải thích một điều; cấm động cho đẹp |
| 7 | Chịu được dữ liệu xấu | Test với nhãn dài 40 ký tự, số âm, giá trị 0, 1 chuỗi và 2 chuỗi |
| 8 | Qua Frame Test | Dừng ở giữa animation vẫn có nghĩa |

## Chống cảm giác trình chiếu

Chất lượng từng khung tốt vẫn có thể ra một video trông như slide. Đó là vấn đề riêng, xử lý
trong `engine/library/motion-grammar.md`. Sáu quy tắc ở đó — canvas liên tục, biến đổi thay vì thay thế,
ngân sách chữ 22%, không khung nào đứng yên, cỡ cảnh thay đổi, cắt theo ý — là ràng buộc bắt
buộc ngang hàng với 8 tiêu chí layout ở trên.

Bài kiểm Slideshow ba phần trong file đó áp cho mọi tập trước khi đăng.

## Chính sách stock — nghiêm ngặt

Stock mismatch là nguyên nhân thứ hai khiến video trông rẻ tiền. Quy tắc:

1. **Trần 15% thời lượng tập.** Vượt là lỗi, không phải cảnh báo.
2. **Cấm tuyệt đối** ảnh/clip stock kiểu doanh nghiệp chung chung: người bắt tay, người chỉ vào
   laptop, đồ thị mờ ảo, đồng xu rơi, bóng đèn ý tưởng, cầu thang thành công.
3. Stock chỉ được dùng khi minh hoạ **một địa điểm, vật thể, hoặc hành động cụ thể** mà lời đọc
   vừa nhắc đến. Nếu query stock không chứa danh từ cụ thể từ chính câu VO thì loại.
4. **Không có stock phù hợp thì dùng data card, không dùng stock tạm.** Một khung dữ liệu được
   thiết kế tử tế luôn hơn một clip stock lạc đề.

## Nhịp cảnh

Nhịp sai làm video trông rẻ ngay cả khi từng khung đều đẹp.

| Quy tắc | Giá trị |
|---|---|
| Thời lượng scene | Tính từ số từ VO: `(số từ / 2.6) giây`, tối thiểu 1.2s |
| Không quá 3 scene liên tiếp dưới 2 giây | Tránh cảm giác giật |
| Không scene nào quá 12 giây không có chuyển động mới | Tránh cảm giác đứng hình |
| Scene có số liệu | Tối thiểu 3.5s để người xem kịp đọc |
| Chuyển cảnh | 300–450ms, easing cố định |

## Chống lặp

200 scene chia cho 12 layout nghĩa là mỗi layout xuất hiện ~17 lần một tập. Không xử lý thì tập
nào cũng trông giống nhau.

- Mỗi layout có 2–3 biến thể bố cục (trái/phải, dọc/ngang) chọn luân phiên.
- Không dùng cùng một layout quá 2 lần liên tiếp.
- Mỗi beat mở đầu bằng một layout khác beat trước.

## Auto-QA hình ảnh (stage S13)

Ngoài các kiểm kỹ thuật, S13 lấy mẫu **10 khung ngẫu nhiên** và đưa qua model thị giác với đúng
Frame Test ở trên. Mỗi khung nhận điểm đạt/không đạt kèm lý do.

- Dưới 8/10 đạt → `verdict: fail`, tập không đi tiếp.
- Kết quả ghi vào `qa.report.json` trường `visualScore`.

## Cổng chất lượng trước khi mở rộng

**Không được sản xuất tập nào trước khi Layout Gallery được duyệt.** Xem `WP-006a`.
