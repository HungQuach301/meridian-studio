# Visual System

Design token cho mọi Remotion composition. Agent không được tự chọn màu hay font.

## Palette và font — ĐÃ CHUYỂN xuống Channel Pack

Xem `channels/{slug}/visual-tokens.json`. Lý do: ba kênh dùng chung genre phải **khác nhau về
màu và font** để chống rủi ro lan danh mục. File này chỉ giữ chart grammar và motion rules —
thứ đúng cho mọi kênh cùng thể loại.

Bảng dưới là bản mẫu tham chiếu, không phải giá trị cứng.

## Palette (mẫu)

| Token | Hex | Dùng cho |
|---|---|---|
| `--ink` | `#12161C` | Chữ chính, nền tối |
| `--paper` | `#F7F5F0` | Nền sáng |
| `--accent` | `#D93025` | Từ khoá cảm xúc, mũi tên, cảnh báo. **Chỉ một điểm đỏ mỗi khung** |
| `--positive` | `#1E7A4C` | Chuỗi dữ liệu tích cực |
| `--neutral` | `#5B6470` | Chú thích, trục, lưới |
| `--highlight` | `#E8B93B` | Nhấn thứ cấp, hiếm dùng |
| `--surface` | `#FFFFFF` | Card, panel |

Cấm dùng màu ngoài bảng này.

## Typography

| Vai trò | Font | Cỡ (1080p) | Weight |
|---|---|---|---|
| Title card | Inter | 96px | 800 |
| Section head | Inter | 64px | 700 |
| Body / nhãn chart | Inter | 40px | 500 |
| Chú thích nguồn | Inter | 24px | 400 |
| Số lớn | Inter Tight | 140px | 800, tabular-nums |

## Chart grammar

1. **Mọi chart có nhãn nguồn ở góc dưới trái**, cỡ 24px, dạng `Source: {publisher}, {asOfDate}`.
2. Tối đa 2 chuỗi dữ liệu trên một chart. Cần hơn thì tách thành hai scene.
3. Trục Y luôn bắt đầu từ 0 với biểu đồ cột. Không cắt trục để phóng đại.
4. Số trên cột hiển thị trực tiếp, không bắt người xem đọc trục.
5. Không dùng biểu đồ tròn.
6. Không dùng hiệu ứng 3D, đổ bóng, gradient trên phần tử dữ liệu.

## Motion

| Quy tắc | Giá trị |
|---|---|
| Thời lượng chuyển cảnh | 300–450ms |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` — không bao giờ linear |
| Overshoot | Vượt đích 3–5%, lùi về trong 120ms |
| Anticipation | Lùi 2% ngược hướng trong 80ms trước khi đi |
| Stagger phần tử | Lệch nhau 40–80ms, không bao giờ cùng lúc |
| Motion blur | Bật khi tốc độ > 800px/giây |
| Parallax | Lớp nền 30% tốc độ máy quay, giữa 100%, trước 130% |
| Chart vẽ dần | 600ms, không bounce |
| Cấm | Zoom giật, xoay, particle, lens flare |

## Canvas liên tục

Tập là **một canvas 6000x3400px duy nhất**, không phải chuỗi khung rời. Máy quay (viewport
1920x1080) di chuyển trên đó. Layout không phải "màn hình" mà là **vùng trên canvas**.

Trong Remotion: một div lớn với `transform: translate() scale()` nội suy theo thời gian.
Chi tiết ràng buộc: `engine/library/motion-grammar.md`.

## Layout

- Safe area: mọi chữ nằm trong 90% khung.
- Lưới 12 cột, gutter 48px, margin 96px.
- Một khung một ý. Cần hai ý thì hai scene.

## Nhịp và chống lặp

Xem `engine/library/visual-quality-bar.md` mục "Nhịp cảnh" và "Chống lặp". Hai mục đó là ràng buộc bắt
buộc cho Visual Director, không phải gợi ý.

## Cấm bổ sung

- Không dùng ảnh sinh bởi model cho bất cứ thứ gì **có chữ hoặc có số**. Model sinh ảnh viết chữ
  sai và bịa số. Chữ và số luôn do Remotion render.
- Ảnh sinh chỉ được dùng làm **nền trừu tượng hoặc texture**, không bao giờ làm nội dung chính.
- Không dùng ảnh stock kiểu doanh nghiệp chung chung. Danh sách cấm trong `visual-quality-bar.md`.
