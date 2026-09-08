# Cinematography — kỹ thuật video thật áp vào canvas

Tài liệu học nghề. Rút từ ngữ pháp dựng phim và motion design chuyên nghiệp, chỉ giữ phần
chuyển giao được sang hệ canvas 2D + máy quay ảo của Remotion.

Đọc cùng `motion-grammar.md` (ràng buộc bắt buộc). File này giải thích **tại sao** các ràng buộc
đó tồn tại, và cho thêm kỹ thuật để nâng chất.

---

## 1. J-cut — kỹ thuật đòn bẩy cao nhất

**Đây là thứ duy nhất quan trọng nhất trong toàn bộ tài liệu này.**

Slide luôn đổi hình và đổi lời **cùng lúc**. Phim gần như không bao giờ làm vậy.

| Kiểu cắt | Cơ chế | Cảm giác |
|---|---|---|
| Cắt thẳng | Hình và tiếng đổi cùng lúc | Slide, máy móc |
| **J-cut** | **Tiếng của ý mới bắt đầu TRƯỚC khi hình đến 0,4–1,0 giây** | Chuyên nghiệp, có đà |
| **L-cut** | Tiếng của ý cũ kéo dài qua hình mới 0,3–0,8 giây | Mượt, liên tục |

Trong hệ của anh: máy quay bắt đầu di chuyển tới đối tượng mới **sau khi** VO đã nói được vài từ
đầu của ý mới. Người xem nghe trước, thấy sau — não họ đã đợi sẵn hình, nên khi hình tới thì cảm
giác là *đến đúng lúc* chứ không phải *bị chuyển sang*.

Cài đặt: mọi scene có `continuity: "camera-move"` phải có `audioLeadMs` từ 400 đến 1000.
Cấm giá trị 0 trừ khi cố ý tạo cú sốc.

Chỉ riêng việc này đã xoá được phần lớn cảm giác trình chiếu.

---

## 2. Từ vựng chuyển động máy quay — mỗi cú phải có lý do

Chuyển động không có động cơ trông như màn hình chờ. Mỗi loại chuyển động mang một nghĩa cố định.
Dùng sai nghĩa thì người xem thấy sai mà không biết vì sao.

| Chuyển động | Nghĩa | Dùng khi |
|---|---|---|
| **Pan ngang** | So sánh giữa các thứ ngang hàng | Đi qua 3 ngưỡng của ma trận |
| **Dolly in** (đẩy vào) | Cam kết, "cái này quan trọng" | Ngay trước một con số quyết định |
| **Dolly out** (kéo ra) | Tiết lộ bối cảnh lớn hơn | Sau một chi tiết, mở ra toàn cảnh |
| **Arc** (vòng quanh) | Khảo sát, xem xét nhiều mặt | Sơ đồ dòng tiền, cấu trúc |
| **Whip pan** (quét nhanh + motion blur) | Đổi chủ đề dứt khoát | Ranh giới beat |
| **Push-in chậm** (2–4% trong 8 giây) | Tăng căng thẳng ngầm | Đoạn kể chuyện nhân vật |

**Quy tắc hướng nhất quán** (tương đương luật 180 độ trong phim): nếu thời gian chạy trái→phải
thì luôn trái→phải, cả tập. Nếu "xấu" nằm bên phải trục thì luôn bên phải. Đảo hướng giữa chừng
làm người xem mất phương hướng mà không biết tại sao.

---

## 3. Vật lý chuyển động — thứ tách nghiệp dư khỏi chuyên nghiệp

Đây là phần amateur bỏ qua nhiều nhất và cũng dễ sửa nhất.

| Kỹ thuật | Cách làm | Vì sao |
|---|---|---|
| **Ease, không bao giờ linear** | `cubic-bezier(0.22, 1, 0.36, 1)` | Vật thể thật có quán tính. Linear = máy móc |
| **Overshoot & settle** | Vượt đích 3–5% rồi lùi về trong 120ms | Cho cảm giác khối lượng |
| **Anticipation** | Lùi nhẹ 2% ngược hướng trong 80ms trước khi đi | Báo trước cho mắt |
| **Stagger** | Các phần tử đến lệch nhau 40–80ms, không cùng lúc | Cùng lúc = đồ hoạ. Lệch = sống |
| **Follow-through** | Phần tử phụ dừng sau phần tử chính 100ms | Vật lý thật |
| **Motion blur** | Bật khi tốc độ > 800px/giây | Không có blur thì mắt thấy giật |
| **Speed ramp** | Nhanh ở giữa cú di chuyển, chậm hai đầu | Rút ngắn thời gian mà không thấy vội |

Riêng **stagger** là thứ rẻ nhất và hiệu quả nhất: cùng một biểu đồ, cho các cột vào lệch nhau
60ms thay vì cùng lúc, cảm giác đổi hẳn.

---

## 4. Chiều sâu — làm 2D trông không phẳng

| Kỹ thuật | Cách làm |
|---|---|
| **Parallax** | Chia canvas thành 3 lớp. Lớp nền di chuyển 30% tốc độ máy quay, lớp giữa 100%, lớp trước 130% |
| **Độ sâu trường ảnh** | Blur 2–4px cho lớp không phải tiêu điểm |
| **Phân cấp kích thước** | Đối tượng "xa" nhỏ hơn và nhạt màu hơn (opacity 0.6) |
| **Đổ bóng có hướng** | Một hướng ánh sáng duy nhất cho cả tập, thường trên-trái |

Parallax là kỹ thuật hiệu quả nhất trên mỗi đơn vị công sức. Chỉ cần lớp nền chạy chậm hơn là
mắt lập tức đọc ra chiều sâu.

---

## 5. Bố cục — chỗ amateur hay sai nhất

| Nguyên tắc | Chi tiết |
|---|---|
| **Lead space** | Chừa khoảng trống ở phía máy quay đang đi tới. Đi sang phải thì để trống bên phải |
| **Lệch tâm** | Đặt tiêu điểm ở giao điểm 1/3. **Căn giữa = tĩnh = slide** |
| **Khoảng âm** | Chuyên nghiệp dùng khoảng trống nhiều hơn amateur tưởng. 40–60% khung trống là bình thường |
| **Đường dẫn mắt** | Trục biểu đồ, mũi tên, mép khối phải dẫn mắt tới tiêu điểm |
| **Một tiêu điểm** | Mỗi khung đúng một chỗ mắt nên nhìn. Hai chỗ = không chỗ nào |

---

## 6. Nhịp dựng

- **Cắt vào nhịp lời nói**, không cắt vào dấu chấm câu. Chỗ người dẫn nhấn giọng là chỗ cắt.
- **Biến thiên độ dài**: một chùm 4 cắt nhanh (1,5s) rồi một cú giữ dài (9s). Đều nhau là slide.
- **Nhịp thở**: sau một con số gây sốc, giữ 0,6–1,0 giây không có gì mới xảy ra. Cho người xem
  kịp thấm. Amateur luôn lấp đầy khoảng này.
- **Giữ lâu hơn sau tiết lộ**, ngắn hơn khi dựng bối cảnh.

---

## 7. Thống nhất thị giác

- **Một hướng sáng duy nhất** cho cả tập.
- **Grain nhẹ + vignette rất nhẹ** phủ toàn bộ: làm các phần tử đồ hoạ trông như thuộc cùng một
  thế giới thay vì các mảnh ghép. Đây là mẹo rẻ và hiệu quả.
- **Bảng màu hạn chế** — đã có trong `visual-system.md`.

---

## 8. Điều KHÔNG chuyển giao được

Đừng phí công bắt chước: shot-reverse-shot, rack focus cho hội thoại, quy tắc eyeline,
handheld rung mạnh, lens flare. Chúng thuộc ngữ pháp quay người thật, áp vào đồ hoạ dữ liệu
sẽ thành giả tạo.

---

## 9. Cách tự học — bài tập cụ thể

**Bài tập shot log.** Chọn 3 phút của một video giải thích chất lượng cao. Lập bảng, mỗi dòng
một cắt:

| Thời điểm | Cỡ cảnh | Chuyển động máy | Lý do đổi | Tiếng dẫn hình bao nhiêu ms |
|---|---|---|---|---|

Làm đủ 3 phút. Anh sẽ thấy ngay ba thứ: độ dài cắt biến thiên lớn thế nào, tiếng gần như luôn
dẫn trước hình, và tỷ lệ cỡ cảnh phân bố ra sao. Làm bài này với 3 video là đủ để hình thành
trực giác.

**Nguồn nên nghiên cứu** (xem cách dựng, không phải nội dung):
- Vox, Johnny Harris — chuyển động bản đồ và dữ liệu, dùng nhiều J-cut
- Kurzgesagt — canvas liên tục và parallax, gần nhất với mô hình của anh
- Bloomberg Originals, FT Film — đồ hoạ tài chính nghiêm túc, đúng ngành của anh
- Wendover / PolyMatter — chuyển động dữ liệu tiết chế, ngân sách thấp mà vẫn chuyên nghiệp

Xem **tắt tiếng** một lượt trước. Nếu vẫn theo dõi được thì đó là video làm tốt phần hình.

---

## 10. Ưu tiên triển khai

Không làm hết một lúc. Thứ tự theo tỷ lệ hiệu quả trên công sức:

| Ưu tiên | Kỹ thuật | Wave |
|---|---|---|
| 1 | J-cut (`audioLeadMs` 400–1000ms) | 2 |
| 2 | Ease + overshoot + stagger | 2 |
| 3 | Parallax 3 lớp | 2 |
| 4 | Từ vựng chuyển động máy quay có nghĩa | 2 |
| 5 | Lead space + lệch tâm | 2 |
| 6 | Nhịp thở sau tiết lộ | 3 |
| 7 | Motion blur + speed ramp | 4 |
| 8 | Grain + vignette thống nhất | 4 |

Bốn cái đầu phải xong trước khi qua cổng Layout Gallery (WP-006a).
