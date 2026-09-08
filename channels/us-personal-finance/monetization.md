# Monetization — us-personal-finance

Thứ tự ưu tiên: **Quảng cáo → Affiliate → Email**.

## Hàm mục tiêu

```
Doanh thu ≈ Số tập × View/tập × Số điểm quảng cáo × RPM
```

Bốn biến, tối ưu được cả bốn. Khác với mô hình affiliate-trước: **số tập quay lại thành biến có
ý nghĩa**, vì quảng cáo scale gần tuyến tính theo sản lượng.

## Ngưỡng hoà vốn

RPM ngách ~15, sau khấu trừ thuế 30% còn **10,5 hiệu dụng**.

| Nhịp | Chi phí/tháng | View/tháng cần |
|---|---|---|
| 10 tập | ~480 USD | ~46.000 |
| 12 tập | ~570 USD | ~54.000 |
| 20 tập | ~850 USD | ~81.000 |

Ba đường làm bài toán khả thi: **ngách RPM cao** (nhân đôi hoặc ba RPM) · **nội dung thường xanh
tích luỹ** (tháng 12 doanh thu đến từ toàn bộ tập đã đăng, không chỉ tập mới) · **ba kênh giới
thiệu chéo**.

## Biến 1 · RPM

RPM chênh 3–5 lần giữa các nhóm chủ đề trong cùng ngành tài chính.

| Nhóm | RPM tương đối | Chủ đề |
|---|---|---|
| Cao nhất | 3–5× | Thế chấp, tái cấp vốn, thẻ tín dụng, bảo hiểm, thuế, môi giới |
| Cao | 2–3× | Đầu tư, hưu trí, vay sinh viên |
| Trung bình | 1–1,5× | Nghề nghiệp, đàm phán lương |
| Thấp nhất | 0,7–1× | Tâm lý chi tiêu — **đã bỏ khỏi pillar** |

**Trọng số chấm chủ đề ở S02:** nhu cầu 30% · cạnh tranh 20% · **RPM 30%** · khả năng dựng ma
trận ngưỡng 20%.

## Biến 2 · Lọc địa lý qua tiêu đề

RPM Mỹ cao hơn nhiều lần các thị trường tiếng Anh khác. Đòn bẩy công sức gần bằng không:

Đưa thuật ngữ đặc thù Mỹ vào tiêu đề — **401k, Roth IRA, FICO, HSA, Medicare, W-2, HELOC, PMI,
FHA, 1099** — tự lọc khán giả Mỹ.

## Biến 3 · Điểm chèn quảng cáo

Tác động **30–50% doanh thu quảng cáo mỗi tập**, và gần như miễn phí để làm đúng.

- Độ dài **18–24 phút** đặt được 4–5 điểm chèn, cộng đầu và cuối video.
- Đặt **đúng ranh giới beat, ngay sau `curiosityBridge`**. Người xem đang muốn biết tiếp thì ngồi
  qua quảng cáo. Đặt giữa đoạn phân tích thì họ bỏ.
- `outline.json` đã có sẵn `curiosityBridge` ở mọi ranh giới beat → **vị trí tối ưu tính được tự
  động**, ghi vào trường `adBreakMs`.

## Biến 4 · View

- **3 Shorts dọc render riêng** mỗi tập, không cắt từ video ngang. Với canvas 6000×3400 chỉ là
  đổi viewport và đường máy quay.
- **Chuỗi 3 tập** thiết kế để xem liền, mỗi tập kết bằng câu hỏi tập sau trả lời.
- **Nội dung thường xanh** — một tập tốt tạo doanh thu nhiều năm.

## Affiliate — mức bảo hiểm

2–3 link trong description, có công bố quan hệ theo FTC. **Không đọc thành lời, không chèn đoạn
quảng cáo, không đổi cách chọn chủ đề.**

Vì sao vẫn giữ: doanh thu quảng cáo biến động mạnh theo mùa (Q4 cao, tháng 1 sụt sâu). Affiliate
làm phẳng đường doanh thu, và là thứ còn lại nếu kênh bị hạn chế kiếm tiền.

## Email — mức bảo hiểm

Một link tới bảng tính trong description. Không popup, không kêu gọi trong video.
Danh sách chung cho cả ba kênh. Tài sản duy nhất không phụ thuộc thuật toán.

## Thuế

Việt Nam chưa có hiệp định thuế được phê chuẩn với Mỹ → **khấu trừ 30%** trên doanh thu từ người
xem Mỹ. Hệ số **0,7** vào mọi tính toán. Nộp W-8BEN khi vào YPP, không nộp thì bị khấu trừ tới
24% trên doanh thu **toàn cầu**.
