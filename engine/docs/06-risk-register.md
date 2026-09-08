# 06 · Sổ rủi ro

Rà lại ở đầu mỗi wave. Cột "Dấu hiệu sớm" quan trọng hơn cột "Giảm thiểu" — phát hiện sớm rẻ hơn xử lý.

Thang: T = Thấp, TB = Trung bình, C = Cao.

---

## R1 · YouTube xếp vào nhóm nội dung sản xuất hàng loạt
**Xác suất C · Tác động C** — *mức rủi ro tăng đáng kể ở nhịp 7 tập/tuần*

Nhịp 1 tập/ngày ở độ dài 20 phút là chính xác dấu hiệu mà hệ thống của YouTube dùng để nhận diện
nội dung sản xuất hàng loạt. Kênh tham chiếu chạy đúng nhịp này và có ~181 video nhưng đa số chỉ
đạt vài nghìn view — sản lượng cao không tự chuyển thành kết quả. Nếu chọn nhịp này, các biện pháp
dưới đây không còn là tuỳ chọn.

- **Phòng ngừa (bắt buộc ở nhịp 7/tuần):**
  1. Gate 1 không bao giờ được bỏ. Mỗi tập có thesis do người viết. Fast Lane **không** được bỏ Gate 1.
  2. Mỗi tập có ít nhất một số liệu mà không kênh nào khác đang dùng cho chủ đề đó.
  3. Không hai tập liên tiếp cùng pillar.
  4. Không mascot hoạt hoạ lặp lại trong thumbnail.
  5. Khai báo nội dung AI đúng quy định.
  6. **Kênh faceless** — không có sự hiện diện người thật, nên bốn cơ chế bù trừ trong
     `channels/us-personal-finance/persona.md` là BẮT BUỘC: mỗi tập có ít nhất một con số tự tính chưa ai công bố ·
     công bố bảng tính công khai · nêu nguồn uy tín bằng chữ · trả lời 20 bình luận đầu trong 2 giờ.
- **Phòng ngừa bổ sung:** nhịp tăng dần theo giai đoạn — 3 tập/tuần cho 10 tập đầu, chỉ lên 7 tập/tuần khi đủ 4 điều kiện mở khoá trong `engine/docs/04-nfr.md`.
- **Giảm thiểu:** giảm ngay về 3 tập/tuần, tăng phần bình luận cá nhân, tạm dừng đăng để rà soát.
- **Dấu hiệu sớm:** view trung bình giảm đều qua 10 tập liên tiếp; tỷ lệ hiển thị đề xuất tụt;
  đơn kiếm tiền bị từ chối; retention 30 giây giảm dần.
- **Ngưỡng hành động:** nếu view trung bình 10 tập gần nhất thấp hơn 10 tập trước đó **hai lần liên
  tiếp**, giảm nhịp xuống 3 tập/tuần và rà lại chất lượng trước khi tăng lại.

## R2 · Agent trôi phạm vi, tự sửa contract
**Xác suất C · Tác động C**

- **Phòng ngừa:** `guardrails.md` liệt kê file cấm chạm; mỗi WP ghi rõ "Files in scope";
  CI chặn mọi thay đổi trong `/contracts` nếu PR không có nhãn `contract-change`.
- **Giảm thiểu:** revert PR ngay; nếu quyết định đó thực sự đúng thì mở ADR rồi làm lại.
- **Dấu hiệu sớm:** PR chạm file ngoài danh sách; PR có số file thay đổi lớn bất thường.

## R3 · PAT trong trình duyệt bị lộ
**Xác suất TB · Tác động C**

- **Phòng ngừa:** fine-grained PAT, đúng một repo, hạn 30 ngày, quyền tối thiểu; repo private;
  không dùng chung máy/trình duyệt.
- **Giảm thiểu:** thu hồi token ngay, xoay khoá, rà toàn bộ commit lạ và Actions log.
- **Dấu hiệu sớm:** commit hoặc workflow run mà mình không tạo.

## R4 · Chi phí API vượt kiểm soát
**Xác suất TB · Tác động TB**

- **Phòng ngừa:** trần chi phí trong `04-nfr.md`; đếm token mỗi stage; job tự dừng khi vượt trần tập.
- **Giảm thiểu:** tắt stage đắt nhất, chuyển research sang model rẻ hơn, giảm số scene.
- **Dấu hiệu sớm:** chi phí/tập tăng dần qua các tập; đồng hồ trên cockpit vọt.

## R5 · Hết phút Actions hoặc job vượt 6 giờ
**Xác suất TB · Tác động TB**

- **Phòng ngừa:** render theo matrix từng nhóm scene; cache node_modules và Chromium;
  giới hạn độ dài tập ở 25 phút.
- **Giảm thiểu:** chia render thành 2 job nối tiếp; nâng gói Actions.
- **Dấu hiệu sớm:** thời gian job tăng dần; cảnh báo 70% phút trong tháng.

## R6 · Repo phình vì binary
**Xác suất TB · Tác động C**

- **Phòng ngừa:** `.gitignore` chặn mọi đuôi binary; CI từ chối PR có file > 5MB; dùng Releases.
- **Giảm thiểu:** giao Codex một WP riêng để dọn lịch sử bằng `git filter-repo` trong sandbox (tốn công, tránh bằng mọi giá).
- **Dấu hiệu sớm:** kích thước repo tăng nhanh giữa hai wave.

## R7 · Sai số liệu tài chính (rủi ro YMYL)
**Xác suất TB · Tác động C**

- **Phòng ngừa:** sổ nguồn bắt buộc; fact-check pass bằng agent riêng biệt; chỉ dùng nguồn trong
  `data-sources.md`; disclaimer trong mọi video và description.
- **Giảm thiểu:** gỡ video, đăng đính chính công khai, ghi vào `insight.md`.
- **Dấu hiệu sớm:** claim không gắn được URL; fact-check báo cờ vàng lặp lại ở cùng loại số liệu.

## R8 · Nội dung nghe như dịch máy
**Xác suất C · Tác động C**

- **Phòng ngừa:** viết mới hoàn toàn bằng tiếng Anh, cấm dịch từ tiếng Việt; cấm bê nguyên cơ chế
  tài chính Việt Nam (lãi suất thả nổi, ân hạn gốc lãi) sang bối cảnh Mỹ; bước kiểm định bản địa 3.6.
- **Giảm thiểu:** thuê người bản ngữ đọc soát vài tập đầu; xây `lexicon.md` từ nguồn tiếng Anh gốc.
- **Dấu hiệu sớm:** retention 30 giây đầu thấp bất thường; bình luận về cách diễn đạt.

## R9 · Chạm trần quota YouTube API
**Xác suất T · Tác động TB**

- **Phòng ngừa:** giới hạn 3 upload/ngày; đồng hồ quota trên cockpit; gộp lời gọi `videos.list` theo lô 50.
- **Giảm thiểu:** đăng thủ công tạm thời; xin nâng quota.
- **Dấu hiệu sớm:** đồng hồ quota gần trần trước cuối ngày.

## R10 · Phụ thuộc ChatGPT Sites
**Xác suất TB · Tác động T**

- **Phòng ngừa:** toàn bộ trạng thái nằm trong repo chứ không ở Sites; UI là tầng mỏng, thay được.
- **Giảm thiểu:** chuyển UI sang GitHub Pages trong vòng một WP.
- **Dấu hiệu sớm:** Sites đổi chính sách, giới hạn, hoặc gián đoạn.

## R11 · Vi phạm bản quyền stock, nhạc, giọng
**Xác suất TB · Tác động C**

- **Phòng ngừa:** mỗi asset ghi license trong `assets/LICENSES.md`; chỉ dùng nguồn cho phép thương mại;
  giọng TTS phải có điều khoản cho phép dùng thương mại.
- **Giảm thiểu:** thay asset, gỡ video, phản hồi claim.
- **Dấu hiệu sớm:** asset không có dòng license; Content ID claim.

## R12 · Dự án bị bỏ dở (rủi ro lớn nhất)
**Xác suất C · Tác động C**

Đã có ba lần khởi động trước. Nguyên nhân thường không phải kỹ thuật mà là **phạm vi quá lớn trước
khi có thành quả nhìn thấy được**.

- **Phòng ngừa:** Wave 2 phải ra video 60 giây trước khi làm bất cứ gì khác; mỗi wave có sản phẩm
  xem được; non-goals trong `PROJECT.md` được đọc lại ở đầu mỗi wave.
- **Giảm thiểu:** cắt phạm vi xuống Fast Lane, bỏ toàn bộ phần "nền tảng", chấp nhận thủ công một số stage.
- **Dấu hiệu sớm:** một wave kéo dài mà chưa có gì chạy được; số file code tăng nhanh hơn số tính năng
  dùng được; xuất hiện ý nghĩ "làm lại từ đầu cho sạch".

---

## Rà soát

| Wave | Rủi ro cần rà kỹ |
|---|---|
| 0 | R12 |
| 1 | R2, R3, R12 |
| 2 | R5, R6, R12 |
| 3 | R7, R8 |
| 4 | R4, R5, R11 |
| 5 | R1, R9, R11 |
| 6 | R1, R7 |
