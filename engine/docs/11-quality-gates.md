# 11 · Quality Gates — dịch kiểm tra về đầu chuỗi

Tài liệu xử lý điểm thất bại lịch sử thứ ba: **các bước đầu không đạt, dồn gánh nặng sang QA cuối
chuỗi, vòng lặp sửa nhiều mà chất lượng vẫn không lên.**

## Chẩn đoán

Đây là lỗi kinh điển: **kiểm tra chất lượng vào sản phẩm thay vì xây chất lượng vào quy trình.**

Ba triệu chứng, và ba nguyên nhân gốc:

| Triệu chứng | Nguyên nhân gốc |
|---|---|
| QA bắt được nhiều lỗi | Lỗi được phép sinh ra ở stage trước mà không bị chặn ngay tại chỗ |
| Sửa nhiều vòng mà không lên chất lượng | Vòng lặp sửa *sản phẩm*, không sửa *đặc tả sinh ra sản phẩm* |
| Mỗi vòng lặp rất đắt và chậm | Điểm kiểm nằm sau bước đắt nhất (render), không nằm trước |

Sửa cả ba bằng năm cơ chế dưới đây.

---

## Cơ chế 1 · Preflight — kiểm storyboard trước khi render

**Thay đổi quan trọng nhất.** Thêm stage **S09.5 · Preflight** ngay sau storyboard.

Phần lớn tiêu chí chất lượng là **phân tích tĩnh trên file JSON**, không cần pixel. Chi phí gần
bằng không, thời gian vài giây.

| Kiểm tra | Nguồn dữ liệu | Trước đây kiểm ở |
|---|---|---|
| `onScreenWordRatio` ≤ 0,22 | tổng `onScreenWords` / số từ script | S13 (sau render) |
| Phân bổ `shotSize` (15-25/45-60/20-30%) | đếm trên storyboard | S13 |
| `durationStdDevRatio` ≥ 0,4 | thống kê `durationMs` | S13 |
| `staticFrameMaxMs` ≤ 400 | quét `camera.move` | S13 |
| J-cut: `audioLeadMs` 400–1000 | mọi scene `camera-move` | chưa kiểm |
| Morph bắt buộc khi `claimIds` giao nhau | so sánh scene liền kề | chưa kiểm |
| Stock ≤ 15% thời lượng | tổng thời lượng scene có stock | S13 |
| Không lặp layout+variant liên tiếp | quét tuần tự | chưa kiểm |
| Mọi số trong `data` có `claimId` khớp `sources.json` | đối chiếu | S13 |
| Hướng nhất quán (trục thời gian, phía "xấu") | quét toạ độ camera | chưa kiểm |
| Bố cục cấm (căn giữa, gạch đầu dòng) | quét `layout` + `onScreenWords` | chưa kiểm |
| Mọi scene có asset | quét | S13 |

**Kết quả:** khoảng 80% lỗi mà S13 từng bắt, giờ bị bắt ở S09.5 với chi phí ~0 USD và ~5 giây,
thay vì ~6 USD và ~25 phút.

Preflight fail → quay lại S09 với báo cáo lỗi cụ thể, **không đi tiếp**.

---

## Cơ chế 2 · Proof render — 15 giây trước 20 phút

Thêm stage **S11.5 · Proof Render** trước render đầy đủ.

Thay vì render 36.000 khung rồi mới biết hình xấu, render trước:
- **12 ảnh tĩnh** ở các mốc: cold open, mỗi beat mở đầu, ma trận ngưỡng, hai ngã rẽ, closing loop
- **Một clip 15 giây** của cú chuyển cảnh khó nhất trong tập (morph phức tạp nhất, hoặc cú di
  chuyển máy quay dài nhất)

Chạy QA thị giác và QA chuyển động trên đúng phần đó.

| | Proof render | Full render |
|---|---|---|
| Số khung | ~460 | 36.000 |
| Thời gian | ~1–2 phút | ~10–25 phút |
| Phút runner | ~5 | 180–400 |
| Chi phí | ~0,1 USD | ~5 USD |

Proof fail → quay về S09 hoặc S11 tuỳ nguyên nhân. **Chỉ khi proof pass mới render đầy đủ.**

---

## Cơ chế 3 · Định tuyến nguyên nhân gốc

Khi QA fail, báo cáo **bắt buộc nêu stage gây ra lỗi**, và pipeline chạy lại **từ stage đó**,
không phải từ stage kề trước.

| Lỗi phát hiện | Nguyên nhân gốc | Chạy lại từ |
|---|---|---|
| `onScreenWordRatio` > 0,22 | Storyboard đặt quá nhiều chữ | S09 |
| Chart sai số | Storyboard lấy sai claim | S09 |
| Chữ trùng nguyên câu VO | Script viết câu không thể rút gọn | **S07** |
| Nhịp đều như slide | Storyboard cắt theo câu | S09 |
| Thiếu thiết bị nội dung | Script | S07 |
| Claim không nguồn | Research | S04 |
| Ma trận ngưỡng yếu | Thesis không định lượng được | **S03 — Gate 1** |
| Layout vỡ bố cục | Template | WP layout, không phải tập này |

Chạy lại từ S12 khi nguyên nhân ở S09 là lãng phí thuần tuý — đây chính là cơ chế đốt thời gian
mà không lên chất lượng.

---

## Cơ chế 4 · Retry có giới hạn, có leo thang

Vòng lặp vô hạn là cách chắc chắn để tốn nhiều mà không đạt.

| Lần fail | Hành động |
|---|---|
| 1 | Chạy lại stage đó, **chèn nguyên văn báo cáo lỗi vào prompt** |
| 2 | Chạy lại lần cuối với prompt đã thu hẹp phạm vi vào đúng lỗi |
| 3 | **Dừng. Chuyển sang Gate người.** Không retry lần ba |

Cộng thêm: **cùng một loại lỗi fail 2 lần trên 2 tập khác nhau → bắt buộc mở PR sửa đặc tả**
(prompt pack, `format-spec.json`, hoặc `motion-grammar.md`). Không được retry tiếp cho tới khi
PR đó được duyệt.

Đây là cơ chế biến vòng lặp sửa sản phẩm thành vòng lặp sửa quy trình. Thiếu nó, lỗi lặp mãi mãi.

---

## Cơ chế 5 · Self-check bắt buộc trong mỗi persona

Mỗi persona phải tự khai kết quả kiểm trước khi xuất artifact. Validator so **số khai** với
**số tính được**. Lệch nhau là fail ngay, kể cả khi số thực tế vẫn trong ngưỡng.

Ví dụ Visual Director phải khai:
```json
"selfCheck": {
  "onScreenWordRatio": 0.19,
  "shotSizeMix": {"wide": 0.20, "medium": 0.52, "close": 0.28},
  "durationStdDevRatio": 0.47,
  "jcutCoverage": 1.0,
  "morphWhereRequired": true,
  "stockRatio": 0.11
}
```

Lý do: buộc agent **thực sự đếm** thay vì cảm tính. Trong thực tế đây là thứ nâng tỷ lệ đạt lần
đầu nhiều nhất, vì phần lớn lỗi sinh ra từ việc agent không kiểm tra chính đầu ra của mình.

---

## Chỉ số theo dõi: First-Pass Yield

**Đừng đo "cuối cùng có đạt không". Đo "có đạt ngay lần đầu không".**

FPY của mỗi stage = số lần pass ngay lần đầu / tổng số lần chạy.

| FPY | Chẩn đoán | Hành động |
|---|---|---|
| ≥ 90% | Stage khoẻ | Không làm gì |
| 70–90% | Đặc tả hơi mơ hồ | Bổ sung ví dụ vào prompt pack |
| < 70% | **Đặc tả sai, không phải agent kém** | Dừng sản xuất, viết lại đặc tả stage đó |

FPY dưới 70% nghĩa là anh đang yêu cầu một thứ mà chính tài liệu của anh không mô tả đủ rõ.
Thêm retry không giải quyết được. **Sửa đặc tả.**

Ghi FPY vào `pipeline/state.json`, hiển thị trên cockpit theo stage.

---

## Nguyên tắc bao trùm

> Mỗi lần QA bắt được lỗi, câu hỏi đúng không phải "sửa thế nào" mà là
> **"vì sao lỗi này được phép sinh ra, và kiểm ở đâu thì rẻ hơn?"**

Nếu câu trả lời là "kiểm sớm hơn được", thì thêm kiểm tra đó vào stage sớm hơn, ngay lập tức.
Đây là công việc thường trực, không phải việc làm một lần.

---

## Bảng vị trí kiểm tra sau khi dịch về đầu chuỗi

| Điểm kiểm | Kiểm gì | Chi phí một lần fail |
|---|---|---|
| S02 | Đề tài dựng được ma trận ngưỡng không | ~0,2 USD |
| S03 Gate 1 | Thesis có định lượng được không | 5 phút của anh |
| S05 | Claim có nguồn, không vi phạm YMYL | ~2 USD |
| S07 self-check | Đủ 6 thiết bị, ≥3 lexicon, mọi số có claimId | ~4 USD |
| S08 Gate 2 | Đọc thành tiếng có vấp không | 15 phút của anh |
| **S09.5 Preflight** | **12 kiểm tra tĩnh — 80% lỗi bắt ở đây** | **~0 USD, 5 giây** |
| **S11.5 Proof render** | **12 ảnh + clip 15 giây** | **~0,1 USD, 2 phút** |
| S13 | Chỉ còn lỗi thật sự cần pixel đầy đủ | ~5 USD, 25 phút |
| S13 Gate 3 | Spot check | 5 phút của anh |

Trước khi dịch về đầu chuỗi: hầu hết lỗi bị bắt ở S13, mỗi lần fail tốn ~5 USD và ~25 phút.
Sau khi dịch: hầu hết bị bắt ở S09.5, mỗi lần fail tốn ~0 USD và ~5 giây.

**Đó là toàn bộ khác biệt.**
