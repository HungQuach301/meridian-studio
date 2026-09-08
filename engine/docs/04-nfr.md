# 04 · Yêu cầu phi chức năng

Đây là ràng buộc agent luôn quên nếu không viết ra. Mọi WP phải tuân thủ.

## Chi phí — ngân sách ba giai đoạn

Ngân sách không phải một con số cố định mà là **ba mức, mở khoá theo chất lượng đạt được**.
Lý do: chất lượng hình ảnh là điểm thất bại lịch sử của dự án này. Đổ tiền vào vận hành trước khi
chứng minh được chất lượng là cách chắc chắn để lặp lại thất bại đó.

### Giai đoạn 1 · Xây dựng (Wave 0–4)

| Hạng mục | Ngân sách |
|---|---|
| Tổng cho toàn giai đoạn | **600 USD** (một lần, không tính theo tháng) |
| Trong đó dành riêng cho lặp thiết kế layout | ≥ 300 USD |

Đây là tiền mua chất lượng hình ảnh vĩnh viễn. Layout tốt thì mọi tập về sau đều thừa hưởng.
Tiêu hết 600 USD mà layout chưa đạt thì **dừng lại xem xét**, không sang giai đoạn 2.

### Giai đoạn 2 · Thử nghiệm (10 tập đầu)

| Hạng mục | Ngân sách |
|---|---|
| Chi phí API một tập | **35 USD** |
| Nhịp đăng | **3 tập/tuần** (không phải 7) |
| Chi phí biến đổi/tháng | ~455 USD |
| Chi phí cố định/tháng | ~150 USD (stock subscription + Actions) |
| **Tổng/tháng** | **~605 USD** |

### Giai đoạn 3 · Chạy đủ nhịp

| Hạng mục | Ngân sách |
|---|---|
| Chi phí API một tập | **35 USD** |
| Nhịp đăng | **7 tập/tuần** (~30 tập/tháng) |
| Chi phí biến đổi/tháng | 1.050 USD |
| Chi phí cố định/tháng | 150 USD |
| **Tổng/tháng** | **1.200 USD** |

### Điều kiện mở khoá giai đoạn 3

Chỉ chuyển sang giai đoạn 3 khi **cả bốn** điều kiện sau đạt:

1. 10 tập đầu đều qua `visualScore` ≥ 8/10 ngay lần render đầu tiên.
2. Toàn bộ 12 layout đã được duyệt qua Layout Gallery, không layout nào ở trạng thái tạm chấp nhận.
3. Chi phí trung bình thực tế ≤ 35 USD/tập.
4. Retention 30 giây trung bình 10 tập ≥ 55%.

Thiếu bất kỳ điều kiện nào thì **ở lại giai đoạn 2**. Không có ngoại lệ.

### 35 USD một tập chi vào đâu

| Hạng mục | Ước tính |
|---|---|
| Research hai lượt + fact-check đối kháng (model mạnh, ngữ cảnh dài) | 12–16 USD |
| Outline + script 3.500 từ | 3–5 USD |
| Storyboard ~200 scene (model mạnh, output có cấu trúc) | 6–9 USD |
| TTS 20 phút + ASR căn chỉnh | 1 USD |
| Ảnh nền sinh (10–15 ảnh, chỉ nền trừu tượng) | 1–2 USD |
| QA thị giác 10 khung | 0,2 USD |
| **Biên cho một lần render lại sau khi QA fail** | 4–6 USD |

Khoản cuối là lý do chính nâng từ 20 lên 35: ở mức 20 USD, một tập fail QA thị giác sẽ vượt trần
và bị chặn, khiến áp lực thực tế là hạ chuẩn QA xuống. Ngân sách phải cho phép làm lại.

### Hành vi khi vượt trần

| Trần | Hành vi |
|---|---|
| Một tập vượt 35 USD | Job dừng, ghi cờ, chờ người quyết. **Không tự động hạ chuẩn QA** |
| Một tập fail QA lần thứ hai | Dừng hẳn tập đó, chuyển sang Gate người. Không render lần ba |
| Tháng vượt trần giai đoạn hiện tại | Orchestrator ngừng nhận episode mới tới đầu tháng sau |

### Cảnh báo sớm trên cockpit

Vàng ở 70% trần tháng, đỏ ở 90%. Cockpit hiển thị rõ đang ở giai đoạn nào và còn thiếu điều kiện
nào để mở khoá giai đoạn kế.

### Nếu chi phí trung bình vượt 35 USD/tập

Thứ tự tối ưu, làm từ trên xuống. **Không bao giờ hạ chuẩn QA thị giác để tiết kiệm.**
1. Chuyển lượt research thứ nhất sang model rẻ hơn, giữ model mạnh cho fact-check.
2. Giảm số scene bằng cách tăng thời lượng trung bình mỗi scene.
3. Giảm số ảnh nền sinh, tăng tỷ lệ data card.
4. Giảm nhịp đăng.

## Thời gian

| Stage | Trần |
|---|---|
| Research + fact-check | 15 phút |
| Script | 10 phút |
| Storyboard + visual assembly | 20 phút |
| Render (tập 22 phút) | 90 phút |
| Tổng một tập, không tính thời gian chờ người | 3 giờ |

## Chất lượng đầu ra

- Video: 1920×1080, H.264, 30fps.
- Audio: chuẩn hoá **‑14 LUFS**, true peak ≤ ‑1 dBTP.
- Phụ đề: lệch tối đa 200ms so với VO.
- Safe area: không chữ nào nằm ngoài 90% khung.
- 100% claim số liệu truy ngược được về `sources.json`.

## Quota

- YouTube upload: tối đa **4/ngày** ở giai đoạn 3, **2/ngày** ở giai đoạn 2 (nhịp 7 tập/tuần cần ~1/ngày; biên 4 cho phép dồn tập). Ngưỡng kỹ thuật là ~5–6/ngày.
- GitHub Actions: cảnh báo khi dùng quá 70% phút miễn phí trong tháng.

## Bảo mật

- Không secret trong code, trong log, trong artifact.
- PAT của cockpit: fine-grained, một repo, hạn tối đa 30 ngày.
- Mọi workflow chạy với quyền tối thiểu (`permissions:` khai tường minh).

## Khả năng phục hồi

- Mọi stage idempotent: chạy lại cho kết quả như nhau.
- Pipeline đứt ở stage N → chạy tiếp được từ stage N, không phải từ đầu.
- Mọi thay đổi artifact là một commit → rollback bằng git revert.
