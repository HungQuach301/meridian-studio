# Sound Design

Món hời rẻ nhất còn sót lại. Chi phí gần bằng không, tác động lên cảm nhận chất lượng rất lớn.

**Nguyên tắc cốt lõi: âm thanh bán chuyển động.** Một cú pan có whoosh thì cảm giác là chuyển động
thật; không có tiếng thì cảm giác là hình đang đổi. Đây là một phần của vấn đề slide, không chỉ là
vấn đề âm thanh.

## Bốn lớp

| Lớp | Nội dung | Mức |
|---|---|---|
| 1 · VO | Giọng đọc | **−14 LUFS**, true peak ≤ −1 dBTP |
| 2 · Music bed | Nhạc nền liên tục | **−22 LUFS**, duck −6 dB khi có VO |
| 3 · Motion SFX | Âm đồng bộ với chuyển động | đỉnh **−18 đến −24 dB** |
| 4 · Texture | Nền phòng rất nhẹ, giữ cho không "chết" | **−40 dB** |

Lớp 4 hay bị bỏ qua: im lặng tuyệt đối giữa các câu nghe như file bị lỗi. Một lớp nền cực nhẹ
làm cả video nghe như được thu trong một không gian thật.

## Thư viện SFX — 8 loại là đủ

| SFX | Kích hoạt bởi | Độ dài |
|---|---|---|
| **Whoosh** | Máy quay di chuyển ≥ 400px | 250–400ms |
| **Tick** | Số đang đếm lên | 20ms mỗi tick, tối đa 12 tick |
| **Impact mềm** | Cột chart chạm đích, phần tử settle | 120ms |
| **Swipe** | Phần tử trượt vào khung | 180ms |
| **Sub drop** | Ngay trước con số quyết định | 600ms |
| **Click** | Highlight, khoanh vòng, mũi tên xuất hiện | 40ms |
| **Riser** | 1,5 giây trước ranh giới beat | 1.500ms |
| **Page turn** | Chuyển giữa hai vùng canvas xa nhau | 300ms |

Tám loại, mỗi loại 2–3 biến thể để tránh nghe lặp. Tổng thư viện ~20 file. Mua một lần hoặc dùng
nguồn miễn phí có license thương mại.

## Quy tắc đồng bộ — chỗ dễ sai nhất

| Quy tắc | Giá trị |
|---|---|
| SFX phải rơi trong khoảng | **±60ms** so với sự kiện hình |
| Whoosh bắt đầu | **trước** khi máy quay bắt đầu di chuyển 80ms |
| Impact rơi vào | đúng khung mà phần tử dừng, không phải khi bắt đầu |
| Riser kết thúc | đúng khung đầu tiên của beat mới |

Lệch quá 60ms thì não người nghe ra sự rời rạc dù không chỉ ra được nó là gì. Đây là lý do timing
lấy từ `06-timing.json` và `05-storyboard.json`, không đặt bằng tay.

## Im lặng là một công cụ

**Trước một con số quyết định: cắt toàn bộ lớp 2 và 3 trong 300–500ms.** Chỉ còn lớp 4.

Sự im lặng đột ngột thu hút chú ý mạnh hơn bất kỳ âm thanh nào. Amateur luôn lấp đầy; chuyên
nghiệp biết để trống. Ghép với `breathAfterMs` trong storyboard: im lặng *trước* con số, nhịp thở
*sau* con số.

## Nhạc nền

- Một track duy nhất cho cả tập, tối giản, không giai điệu mạnh — nhạc có melody hay sẽ cạnh
  tranh với lời đọc.
- Đổi track theo pillar để mỗi series có màu riêng, nhưng không đổi trong một tập.
- Ducking: attack 150ms, release 400ms. Release nhanh quá nghe như bơm hơi.
- Cắt hẳn nhạc ở 10 giây cuối, chỉ còn VO và texture.

## Cấm

- Âm thanh hoạt hình: boing, pop, cartoon whoosh.
- "Cinematic boom" ở mọi chuyển cảnh — dùng quá 3 lần một tập là lạm dụng.
- SFX ở mọi phần tử. **Chỉ khoảng 30–40% sự kiện hình cần âm thanh.** Có tiếng ở mọi thứ nghe
  mệt và rẻ tiền hơn là không có gì.
- Nhạc có lời.
- Nhạc nền vượt −20 LUFS.

## Triển khai

- **Wave 2:** lớp 1 và 2 (VO + nhạc nền + ducking). Đủ để pipeline chạy.
- **Wave 4:** lớp 3 và 4 (motion SFX + texture). Sinh tự động từ `storyboard.json` — mỗi
  `camera.move`, mỗi số đếm, mỗi morph đều đã có timestamp, nên việc gắn SFX là ánh xạ thuần tuý,
  không cần quyết định thủ công.
- Công cụ: ffmpeg trộn nhiều track, `sidechaincompress` cho ducking.

## Kiểm tra

Thêm vào S13:
- `sfxSyncMaxDriftMs` ≤ 60
- `sfxDensity` trong khoảng 0,30–0,40 (tỷ lệ sự kiện hình có âm thanh)
- `silenceBeforeKeyNumber` = true cho mọi scene có `breathAfterMs`
- Nghe thử 60 giây bằng tai người ở Gate 3
