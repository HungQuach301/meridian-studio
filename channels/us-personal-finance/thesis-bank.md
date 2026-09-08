# Thesis Bank

Kho luận điểm. Đây là **nguồn cung khan hiếm nhất của cả nhà máy** — khan hiếm hơn tiền, hơn thời
gian, hơn năng lực render.

## Vì sao tồn tại

Nhà máy chạy 30 tập/tháng. Gate 1 yêu cầu một luận điểm riêng cho mỗi tập. Nghĩa là 30 góc nhìn
độc đáo mỗi tháng, đều đặn, không nghỉ.

Insight không scale như thời gian. Nếu sản xuất theo lịch mà nạp ý tưởng cũng theo lịch, đến tập
thứ 12 sẽ bắt đầu xuất hiện những thesis kiểu "mua nhà đắt hơn bạn nghĩ" — và đó chính là lúc
kênh trở thành thứ mà bốn biện pháp chống R1 đang cố ngăn.

**Nguyên tắc: nạp liên tục, rút theo lịch.** Bank được nạp khi anh đọc, khi làm nghề, khi nói
chuyện — độc lập hoàn toàn với lịch sản xuất.

## Ràng buộc cứng

> **Không sản xuất khi bank có dưới 15 thesis khả dụng.**

Ràng buộc này ngang hàng với trần ngân sách. Cockpit hiển thị số thesis còn lại; dưới 15 thì
orchestrator ngừng nhận episode mới cho tới khi được nạp thêm.

Lý do: khi bank cạn, áp lực đăng bài sẽ ép anh chấp nhận thesis yếu. Chặn bằng hệ thống thì không
phải dựa vào ý chí.

## Một thesis hợp lệ là gì

Ba điều kiện, thiếu một là không hợp lệ:

1. **Có thể sai.** Là một khẳng định, không phải mô tả chủ đề.
   - Không hợp lệ: "Chi phí thật của việc sở hữu nhà"
   - Hợp lệ: "Với thu nhập dưới 120K, thuê nhà ở phần lớn thị trường Mỹ hiện tạo ra tài sản ròng
     cao hơn mua, và điểm đảo chiều nằm ở tỷ lệ trả trước 20% chứ không phải ở lãi suất"

2. **Định lượng được thành 3 ngưỡng.** Nếu không nghĩ ra được 3 mức có số, đề tài không phù hợp
   với format kênh.

3. **Có người hiểu biết sẽ phản đối.** Đây là bài kiểm quan trọng nhất.
   Nếu không ai phản đối, đó không phải luận điểm — đó là mô tả.

## Bốn dạng luận điểm

Rút từ teardown kênh tham chiếu. Dùng làm khuôn khi bí, nhưng **không được dùng cùng một dạng
hai tập liên tiếp**.

| Dạng | Cấu trúc | Ví dụ |
|---|---|---|
| **Chi phí ẩn** | Thứ ai cũng làm có một khoản chi không ai tính | Bảo trì nhà 1–2%/năm nuốt hết phần lợi từ tăng giá |
| **Đảo chiều ngưỡng** | Lời khuyên phổ biến đúng ở một phía ngưỡng, sai ở phía kia | Trả nợ trước hạn khôn ngoan dưới 6% lãi, dại trên 6% |
| **Nhị phân giả** | Hai lựa chọn ai cũng tranh cãi thực ra không phải hai | Không phải thuê-hay-mua, mà là dòng tiền cố định chiếm bao nhiêu phần thu nhập |
| **Hệ quả trễ** | Quyết định hôm nay có cái giá xuất hiện sau N năm | Vay xe 84 tháng biến khoản trả nhỏ thành tài sản âm suốt 5 năm |

## Cấu trúc một mục trong bank

```yaml
- id: TB-023
  claim: "<1-2 câu, phải có thể sai>"
  contradicts: "<niềm tin mặc định mà nó phản bác>"
  archetype: hidden-cost | threshold-reversal | false-binary | delayed-consequence
  pillar: housing | debt | investing | career-income | retirement | spending-psychology
  thresholds: ["<ngưỡng 1>", "<ngưỡng 2>", "<ngưỡng 3>"]
  provable_by: "<nguồn dữ liệu nào chứng minh hoặc bác bỏ>"
  conviction: high | medium | low
  origin: "<đọc ở đâu / gặp trong việc gì / ai nói>"
  added: YYYY-MM-DD
  used_in: null
```

## Nguồn nạp — theo chiến lược "phân tích dữ liệu, không phải kinh nghiệm cá nhân"

Xếp theo chất lượng, từ tốt nhất:

1. **Mâu thuẫn giữa hai nguồn dữ liệu.** Khi FRED và BLS kể hai câu chuyện khác nhau về cùng
   một thứ, ở đó có một luận điểm — và nó có bằng chứng sẵn.
2. **Câu hỏi nhiều người tìm nhưng chưa ai trả lời bằng số.** Từ pipeline nghiên cứu đối thủ
   (`portfolio/niche-research.md` bước 5). Đây là nguồn chính của chiến lược mới.
3. **Ngưỡng ẩn trong dữ liệu.** Chạy số qua nhiều mức, tìm điểm mà kết luận đảo chiều. Mỗi điểm
   đảo chiều là một thesis dạng threshold-reversal.
4. **Bình luận dưới video.** Câu hỏi lặp lại nhiều lần là bằng chứng trực tiếp về chỗ khán giả
   vướng — và là kênh phát hiện sai lệch văn hoá.
5. **Lịch công bố số liệu vĩ mô.** Biết trước cái gì sắp ra thì chuẩn bị được luận điểm trước.

**Lưu ý:** Gate 1 giờ là **duyệt hoặc bác luận điểm máy đề xuất** (2 phút phán đoán), không
còn là tự viết (5 phút sáng tạo). Máy đề xuất từ nguồn 1–3; người giữ quyền bác.

## Nghi thức nạp

**Mỗi tuần một lần, 30 phút, không gắn với sản xuất.** Mục tiêu 3–5 thesis mới.

Không đạt được 3 thesis trong 30 phút là tín hiệu quan trọng: nghĩa là anh đang tiêu thụ ý tưởng
nhanh hơn tạo ra. Khi đó **giảm nhịp đăng**, không phải hạ chuẩn thesis.

## Chống thoái hoá

| Kiểm tra | Ngưỡng |
|---|---|
| Thesis khả dụng trong bank | ≥ 15, cảnh báo ở 20 |
| Cùng archetype hai tập liên tiếp | Cấm |
| Cùng pillar hai tập liên tiếp | Cấm |
| Thesis `conviction: low` được dùng | Chỉ khi bank > 25 |
| Tuổi thesis khi dùng | Cảnh báo nếu < 3 ngày (viết vội cho kịp lịch) |

Mục cuối đáng chú ý: thesis viết trong ngày sản xuất gần như luôn yếu hơn thesis đã nằm trong
bank vài tuần. Bank tồn tại để tách thời điểm *nghĩ ra* khỏi thời điểm *cần dùng*.
