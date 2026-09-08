# Data Sources

Danh sách trắng. **Researcher chỉ được lấy số liệu từ các nguồn này.** Số liệu ngoài danh sách =
cờ đỏ ở fact-check.

| Publisher | Dùng cho | Ghi chú |
|---|---|---|
| **FRED** (Federal Reserve Economic Data) | Lãi suất, lạm phát CPI, tỷ lệ tiết kiệm, giá nhà | Luôn ghi `seriesId` vào sổ nguồn |
| **BLS** (Bureau of Labor Statistics) | Thu nhập, việc làm, CPI chi tiết, chi tiêu hộ gia đình (CEX) | |
| **US Census Bureau** | Nhân khẩu, thu nhập hộ theo vùng, giá thuê trung vị (ACS) | |
| **Freddie Mac PMMS** | Lãi suất vay mua nhà cố định 30 năm và 15 năm | Cập nhật hằng tuần |
| **IRS** | Bậc thuế, giới hạn đóng góp hưu trí, khấu trừ | |
| **SSA** (Social Security Administration) | An sinh xã hội, tuổi hưu, mức chi trả | |
| **FDIC** | Lãi suất tiền gửi, thống kê ngân hàng | |
| **CFPB** | Dữ liệu khiếu nại tín dụng, quy định bảo vệ người tiêu dùng | |

## Quy tắc

1. Mỗi con số → một mục trong `sources.json` với `sourceUrl`, `publisher`, `asOfDate`, `retrievedAt`.
2. Giữ nguyên đơn vị gốc trong sổ nguồn. Quy đổi chỉ làm ở script và ghi rõ cách quy đổi.
3. Số liệu cũ hơn 18 tháng phải nêu rõ mốc thời gian trong lời đọc.
4. Cấm: bài báo thứ cấp, blog, diễn đàn, trang tổng hợp SEO, số liệu từ trí nhớ của model.
5. Nếu không tìm được nguồn cho một claim → **bỏ claim đó**, không ước lượng.

## Thêm nguồn mới
Chỉ chủ dự án được thêm. Agent đề xuất trong mô tả PR, không tự sửa file này.
