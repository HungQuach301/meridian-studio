# 12 · Success Criteria

Tiêu chí thành công ở 5 tầng, từ mỗi tập tới cả dự án. Kèm điều kiện dừng.

---

## Tầng 1 · Một tập đạt chuẩn

Tự động kiểm, không cần phán đoán.

| # | Tiêu chí | Ngưỡng | Kiểm ở |
|---|---|---|---|
| 1 | Thesis lấy từ bank, không viết tại chỗ | `thesisId` tồn tại | S03 |
| 2 | Không trùng archetype/pillar với tập trước | — | S03 |
| 3 | Claim số liệu có nguồn | 100% | S05 |
| 4 | Không cờ đỏ YMYL | 0 | S05 |
| 5 | Có ≥1 con số tự tính chưa ai công bố | ≥1 | S05 |
| 6 | Đủ 6 thiết bị nội dung | 6/6 | S07 |
| 7 | Từ vựng sở hữu | 3–5 | S07 |
| 8 | Tỷ lệ chữ trên màn hình | ≤22% | S09.5 |
| 9 | Phân bổ cỡ cảnh | 15-25 / 45-60 / 20-30% | S09.5 |
| 10 | Độ lệch chuẩn thời lượng scene | ≥40% trung bình | S09.5 |
| 11 | J-cut phủ toàn bộ camera-move | 100%, 400–1000ms | S09.5 |
| 12 | Morph khi trùng claimIds | 100% | S09.5 |
| 13 | Khung tĩnh tối đa | ≤400ms | S09.5 |
| 14 | Tỷ lệ stock | ≤15% | S09.5 |
| 15 | Điểm thị giác (Frame Test) | ≥8/10 | S11.5 → S13 |
| 16 | Bài kiểm Slideshow 3 phần | pass cả 3 | S13 |
| 17 | Loudness VO | −14 LUFS ±0,5 | S13 |
| 18 | Lệch caption | ≤200ms | S13 |
| 19 | Lệch SFX | ≤60ms | S13 |
| 20 | Mật độ SFX | 0,30–0,40 | S13 |

**Tập đạt = 20/20.** Không có trạng thái "tạm chấp nhận".

## Tầng 2 · Quy trình khoẻ

Không đo sản phẩm, đo cỗ máy làm ra sản phẩm.

| Chỉ số | Ngưỡng khoẻ | Ngưỡng báo động | Hành động khi báo động |
|---|---|---|---|
| First-Pass Yield mỗi stage | ≥90% | <70% | **Dừng sản xuất, viết lại đặc tả stage đó** |
| Số retry trung bình mỗi tập | ≤1 | ≥3 | Rà `rootCauseStage`, sửa upstream |
| Chi phí thực tế mỗi tập | ≤35 USD | >45 USD | Cắt theo thứ tự trong `04-nfr.md` |
| Thời gian người thật mỗi tập | ≤58 phút | >90 phút | Rà gate nào đang tốn thời gian |
| Thesis Bank | ≥20 | <15 | **Ngừng nhận tập mới** |
| Tỷ lệ script bị sửa ở Gate 2 | 20–60% | <10% | Dấu hiệu duyệt qua loa, không phải script tốt lên |

Dòng cuối là cơ chế phát hiện chính anh đang rubber-stamp. Nếu tỷ lệ sửa tụt về gần 0, đó gần như
chắc chắn là mệt mỏi chứ không phải chất lượng tăng.

## Tầng 3 · Cổng chuyển wave

| Wave | Điều kiện qua |
|---|---|
| 0 → 1 | Tài liệu đầy đủ, đọc lại không mâu thuẫn |
| 1 → 2 | Bấm nút trên trình duyệt → job chạy → file vào repo → UI hiển thị |
| 2 → 3 | **Layout Gallery được duyệt từng layout theo 8 tiêu chí** + clip 20 giây máy quay di chuyển không có cảm giác slide + clip morph mượt |
| 3 → 4 | Từ 2 câu thesis ra kịch bản 20 phút, mọi số có nguồn, đọc như người Mỹ viết |
| 4 → 5 | Một tập hoàn chỉnh đạt 20/20 tiêu chí tầng 1 |
| 5 → 6 | Một tập đi từ thesis đến công khai, chỉ chạm 3 gate |

## Tầng 4 · Kênh — theo pha phân phối

Chỉ số quyết định **đổi theo pha**. Tối ưu sai chỉ số theo pha là cách phổ biến để tốn công vô ích.

| Pha | Sub | Chỉ số quyết định | Ngưỡng đạt | Nhịp |
|---|---|---|---|---|
| **0** | 0–100 | Retention 30 giây | ≥55% | 3 tập/tuần |
| **1** | 100–1.000 | CTR | ≥4% | 3 tập/tuần |
| **2** | 1.000+ | Average view duration · sub/view | ≥6 phút | 7 tập/tuần |

### Điều kiện mở khoá nhịp 7 tập/tuần

Cả **bốn** phải đạt, thiếu một thì ở lại pha hiện tại:

1. 10 tập đầu đều đạt `visualScore` ≥8/10 **ngay lần render đầu tiên**
2. Cả 12 layout đã duyệt qua Gallery, không cái nào "tạm chấp nhận"
3. Chi phí trung bình thực tế ≤35 USD/tập
4. Retention 30 giây trung bình 10 tập ≥55%

## Tầng 5 · Dự án

| Mốc | Tiêu chí |
|---|---|
| Nhà máy chạy được | Một tập đi trọn 18 stage không can thiệp ngoài 3 gate |
| Nhà máy chạy bền | 10 tập liên tiếp không tập nào cần retry quá 1 lần |
| Sản phẩm đạt chuẩn | 10 tập liên tiếp đạt 20/20 tiêu chí tầng 1 |
| Kênh có tín hiệu | Retention 30 giây ≥55% trung bình 10 tập |
| Kênh tăng trưởng | Đạt điều kiện mở khoá pha 2 |
| Hoà vốn | Doanh thu × 0,7 ≥ 1.200 USD/tháng (xem ghi chú thuế) |

**Ghi chú thuế:** Việt Nam chưa có hiệp định thuế được phê chuẩn với Mỹ, nên doanh thu từ người
xem Mỹ bị khấu trừ 30%. Kênh nhắm 100% khán giả Mỹ, nên hệ số 0,7 áp cho gần như toàn bộ doanh
thu. Điểm hoà vốn thực tế cao hơn con số danh nghĩa khoảng 43%. Phải nộp W-8BEN trong AdSense
trước tập đầu tiên — không nộp thì bị khấu trừ tới 24% trên doanh thu **toàn cầu**.

---

## Điều kiện dừng

Đặt ra trước để mỗi lần khó khăn không phải tự hỏi "có nên bỏ không" — chỉ cần kiểm tiêu chí.
Nghịch lý là chính vì có nó mà việc tiếp tục trở nên dễ hơn.

| Điều kiện | Hành động |
|---|---|
| Tiêu hết 600 USD ngân sách xây dựng mà Layout Gallery chưa qua | **Dừng, đánh giá lại giả định về hình ảnh** |
| Một wave kéo dài mà chưa có gì chạy được | Cắt phạm vi xuống Fast Lane |
| FPY của một stage <70% sau 2 lần sửa đặc tả | Đơn giản hoá stage đó hoặc bỏ hẳn |
| Wave 1b: cả 3 biến thể format đều retention 30s <45% | **Dừng. Thiết kế lại format trước khi sang kênh 2** |
| Sau 30 tập: retention 30 giây <45% và sub <300 | **Dừng sản xuất. Đánh giá lại toàn bộ giả định về nội dung, không tự động làm tiếp** |
| Tổng chi phí danh mục chạm trần | Dừng kênh yếu nhất, không cắt đều |
| View trung bình 10 tập gần nhất thấp hơn 10 tập trước, hai lần liên tiếp | Giảm về 3 tập/tuần, rà chất lượng |
| Xuất hiện ý nghĩ "làm lại từ đầu cho sạch" | **Đây là dấu hiệu R12. Dừng lại, đọc `engine/docs/06-risk-register.md`** |

Dòng cuối không phải đùa. Đã có ba lần khởi động trước, và ý nghĩ đó là triệu chứng chứ không
phải giải pháp.
