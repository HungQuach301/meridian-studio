# Motion Grammar

Tài liệu chống cảm giác "trình chiếu slide". Đây là điểm thất bại lịch sử thứ hai của dự án này,
độc lập với chất lượng từng khung hình.

**Chẩn đoán:** Remotion + một danh sách layout có tên, nếu không có ràng buộc, sẽ tự nhiên sinh ra
slide. Bốn dấu hiệu của slide: máy quay đứng yên · nội dung bị *thay thế* thay vì *biến đổi* ·
chữ trên màn hình lặp lại lời đọc · cắt cảnh theo ranh giới câu.

Sáu quy tắc dưới đây là ràng buộc bắt buộc, không phải gợi ý.

---

## Quy tắc 1 · Một canvas liên tục, không phải 200 slide rời

Đây là thay đổi cấu trúc quan trọng nhất.

Một tập **không phải** chuỗi 200 khung độc lập. Nó là **một mặt phẳng lớn duy nhất** (canvas
~6000×3400px) trên đó mọi biểu đồ, sơ đồ, số liệu nằm ở vị trí cố định. Video là hành trình
**máy quay di chuyển** trên mặt phẳng đó: pan, zoom, dolly.

Hệ quả cụ thể:
- Các đối tượng liên quan nằm gần nhau về mặt không gian. Đi từ chart A sang chart B là máy quay
  trượt qua, không phải cắt.
- Người xem xây được bản đồ tinh thần về "vùng nào nói về cái gì" — điều slide không bao giờ làm được.
- Quay lại một đối tượng đã xuất hiện thì máy quay quay về đúng chỗ cũ, không vẽ lại.

Trong Remotion: một `<div>` lớn với `transform: translate() scale()` được nội suy theo thời gian.
Layout không còn là "màn hình", mà là **vùng trên canvas**.

## Quy tắc 2 · Biến đổi, không thay thế

Nếu hai đối tượng liên tiếp **chia sẻ dữ liệu**, chúng phải là **một đối tượng biến hình**, không
phải hai đối tượng nối tiếp.

| Sai (slide) | Đúng (video) |
|---|---|
| Chart cột 3 mức → cắt → chart cột 3 mức khác | Cột cũ **co giãn** sang giá trị mới, nhãn trục **đổi chữ tại chỗ** |
| Hiện số 3.240 → cắt → hiện số 38.880 | Số **đếm lên** từ 3.240 tới 38.880 |
| Bảng ma trận → cắt → highlight hàng 2 | Bảng **giữ nguyên**, hàng 2 sáng lên, hai hàng kia mờ đi |

Quy tắc kiểm: nếu hai scene liên tiếp có `claimIds` giao nhau, chúng **phải** được gộp thành một
scene có transition nội bộ. Vi phạm là lỗi ở QA.

## Quy tắc 3 · Ngân sách chữ trên màn hình

Đây là quy tắc trực tiếp xử lý "nhiều text".

| Ràng buộc | Giá trị |
|---|---|
| Tổng số từ hiện trên màn hình cả tập | **≤ 22% số từ VO** |
| Số từ tối đa hiện cùng lúc trong một khung | **12 từ** |
| Chữ trên màn hình được phép trùng lời đọc | **Không bao giờ trùng nguyên câu** |
| Câu đầy đủ hiện trên màn hình | Tối đa **6 lần/tập** (quote card, hard rule) |

Chữ trên màn hình chỉ được là: **nhãn, con số, đơn vị, và một cụm từ khoá mỗi beat**.
Cấm tuyệt đối: hiện lại nguyên câu người dẫn vừa đọc; danh sách gạch đầu dòng; đoạn văn.

Lý do: khi chữ trên màn hình lặp lời đọc, người xem chuyển sang *đọc*, và trải nghiệm lập tức
thành đọc slide.

## Quy tắc 4 · Không khung nào đứng yên

**Mọi khung hình, mọi thời điểm, phải có ít nhất một phần tử đang chuyển động.**

Ba tầng chuyển động, luôn chồng lên nhau:

| Tầng | Nội dung | Luôn bật |
|---|---|---|
| Nền | Máy quay trôi chậm liên tục trên canvas: 8–20px/giây, hoặc scale 1.0→1.04 | Có |
| Giữa | Đối tượng dữ liệu đang vẽ, đang co giãn, đang đếm số | Khi có dữ liệu |
| Trước | Phần tử nhấn: mũi tên vẽ ra, vòng khoanh, nhãn trượt vào | Khi cần nhấn |

Cấm: khung tĩnh hoàn toàn quá **400ms** ở bất kỳ điểm nào trong tập.

## Quy tắc 5 · Cỡ cảnh phải thay đổi

Slide có một cỡ duy nhất. Video có ngữ pháp cỡ cảnh.

| Cỡ cảnh | Nội dung | Tỷ lệ bắt buộc |
|---|---|---|
| **Wide** | Nhìn toàn cảnh một vùng canvas, thấy quan hệ giữa nhiều đối tượng | 15–25% thời lượng |
| **Medium** | Một biểu đồ hoặc sơ đồ chiếm khung | 45–60% |
| **Close** | Một con số hoặc một chi tiết lấp đầy màn hình | 20–30% |

Không quá **4 scene liên tiếp cùng cỡ cảnh**. Mỗi beat phải mở bằng một cú thay đổi cỡ rõ rệt
(thường là wide để định vị, rồi đẩy vào medium).

## Quy tắc 6 · Cắt theo ý, không theo câu

Ranh giới scene bám vào **chỗ ý nghĩa đổi hướng**, không phải dấu chấm câu.

- Một scene có thể trải 4–5 câu nếu chúng cùng phát triển một ý.
- Một câu có thể chứa 2 scene nếu giữa câu có bước ngoặt.
- Thời lượng scene phải **biến thiên**: độ lệch chuẩn của thời lượng scene trong một tập
  ≥ 40% giá trị trung bình. Thời lượng đều tăm tắp là dấu hiệu chắc chắn của slide.

---

## Bố cục bị cấm hoàn toàn

Đây là chữ ký của slide, cấm xuất hiện dù chỉ một lần:

1. Tiêu đề căn giữa phía trên + danh sách gạch đầu dòng bên dưới
2. Bố cục "chữ trái, hình phải" hoặc ngược lại, lặp đi lặp lại
3. Khung có viền, đổ bóng, trông như thẻ slide đặt trên nền
4. Số trang, thanh tiến trình kiểu slide, "Phần 1/5" hiện trên màn hình
5. Chuyển cảnh kiểu presentation: lật, trượt ngang toàn khung, mờ chồng
6. Chữ xuất hiện từng dòng theo kiểu build của PowerPoint

## Bài kiểm Slideshow

Áp cho mọi tập trước khi đăng. Ba phần:

**Phần 1 — Bài kiểm PowerPoint.** Nếu toàn bộ nội dung hình ảnh của tập này có thể chuyển thành
một file PowerPoint mà **không mất gì**, thì nó không phải video. Trượt.

**Phần 2 — Bài kiểm 3 giây.** Lấy 5 cửa sổ 3 giây ngẫu nhiên. Trong mỗi cửa sổ phải có chuyển
động liên tục. Ít nhất **2 trên 5** cửa sổ phải có máy quay di chuyển giữa các đối tượng.

**Phần 3 — Bài kiểm tắt tiếng.** Tắt tiếng, xem 60 giây bất kỳ. Vẫn phải theo dõi được mạch lập
luận qua hình. Nếu chỉ thấy chữ đang đợi được đọc lên thì trượt.

Kết quả ghi vào `qa.report.json` trường `motionScore`. Trượt bất kỳ phần nào → tập không đăng.
