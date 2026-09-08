# 05 · Runbook vận hành

Sổ tay dùng hằng ngày. Viết dần từ Wave 2, cập nhật mỗi khi gặp sự cố mới.

## Chạy một tập (đường chuẩn)

1. Mở cockpit → tab **Gate Inbox**.
2. Nếu có mục "Chọn đề tài": đọc 5 đề tài đã chấm, chọn một, **tự gõ 1–2 câu thesis**, bấm `Start`.
3. Chờ ~25 phút. Pipeline chạy S04→S07.
4. Gate Inbox xuất hiện "Duyệt kịch bản": đọc, sửa trực tiếp, bấm `Approve`.
5. Chờ ~90 phút. Pipeline chạy S09→S13.
6. Gate Inbox xuất hiện "Spot check": xem 60s đầu + 30s kết, bấm `Pass`.
7. Xem `package.json`, chọn title và thumbnail, bấm `Publish` → video lên chế độ riêng tư.
8. Kiểm tra trên YouTube Studio, đặt lịch công khai.

## Nhịp tuần khi có nhiều kênh

Chi phí chuyển ngữ cảnh giữa các kênh lớn hơn thời gian thao tác. Hai quy tắc:

- **Gom gate theo lô:** thứ Hai toàn bộ Gate 1 của cả ba kênh · thứ Tư Gate 2 · thứ Sáu Gate 3.
- **Một ngày chỉ đụng một kênh** cho mọi việc ngoài gate — viết CP, đọc bình luận, rà insight.
  Thứ Ba kênh 1, thứ Năm kênh 2, thứ Bảy kênh 3.

## Chạy Fast Lane

Bấm `Fast Lane` trên thẻ episode. Bỏ Gate 1 và Gate 3. Dùng khi cần ra sản phẩm nhanh và chấp nhận
chất lượng thấp hơn.

## Sự cố thường gặp

| Triệu chứng | Nguyên nhân thường gặp | Xử lý |
|---|---|---|
| Job đỏ ở S04 | Nguồn dữ liệu đổi cấu trúc hoặc rate limit | Xem log, chạy lại stage; nếu lặp lại thì cập nhật `data-sources.md` |
| Pipeline dừng ở S05 | Fact-check báo cờ đỏ | Đọc `factcheck.json`, sửa thesis hoặc bỏ claim, chạy lại từ S04 |
| Render vượt thời gian | Quá nhiều scene hoặc layout nặng | Giảm số scene, kiểm tra layout mới thêm |
| Phụ đề lệch | ASR căn sai ở đoạn có số | Chạy lại S10; nếu lặp lại thì thêm SSML break |
| UI không cập nhật | PAT hết hạn | Tạo PAT mới trên GitHub → Settings → Developer settings, nhập lại vào ô Settings của cockpit |
| Upload thất bại | Hết quota ngày | Chờ sang ngày mới hoặc đăng thủ công |

## Chạy lại từ giữa pipeline

Mọi stage idempotent. Trên thẻ episode, bấm vào stage muốn chạy lại → `Re-run from here`.
Artifact của các stage sau sẽ bị đánh dấu stale.

## Rollback (toàn bộ trên web, không cần máy local)

| Cần hoàn tác | Làm thế nào |
|---|---|
| Một PR đã merge | Mở PR đó trên GitHub → nút **Revert** → merge PR revert |
| Một file sai | Mở file → tab **History** → chọn phiên bản cũ → nút **...** → **Revert** |
| Một artifact của episode | Chạy lại stage đó từ cockpit; artifact mới ghi đè |

Không bao giờ force push lên `main`.

## Triển khai lại cockpit

Phụ thuộc phương án đã chốt ở ADR-0006:

| Phương án | Cách cập nhật UI |
|---|---|
| A · Loader | Commit `engine/app/cockpit.js`. Xong. Reload trang Sites là thấy bản mới |
| B · iframe → Pages | Merge PR. Actions tự deploy. Xong |
| C · Pages | Merge PR. Actions tự deploy. Xong |

Chỉ Phương án A cần dán Sites, và chỉ đúng **một lần** lúc thiết lập ban đầu.

## Xoay secret

1. Tạo khoá mới ở nhà cung cấp.
2. Cập nhật trong repo → Settings → Secrets and variables → Actions.
3. Chạy `hello.yml` để xác nhận.
4. Thu hồi khoá cũ.
