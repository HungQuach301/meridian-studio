# ADR-0001 · Ba mặt phẳng: Sites + repo + Actions

**Trạng thái:** Chấp nhận

## Bối cảnh
Ràng buộc: không máy local, chỉ trình duyệt. ChatGPT Sites chỉ host tĩnh — không render video,
không chạy job nền, không giữ secret. Nhưng nhà máy cần compute nặng và lưu trữ có trạng thái.

## Phương án đã cân nhắc
1. **Toàn bộ trên ChatGPT Sites** — bất khả thi, không có compute.
2. **Thuê VPS / dùng Vercel + Supabase** — khả thi nhưng vi phạm ràng buộc "chỉ trình duyệt",
   thêm chi phí cố định, thêm bề mặt vận hành.
3. **Sites (UI) + GitHub repo (state) + GitHub Actions (compute)** — chọn.

## Quyết định
Tách ba mặt phẳng. UI tĩnh trên Sites chỉ đọc repo qua GitHub API và bắn `repository_dispatch`.
Toàn bộ xử lý chạy trong Actions. Toàn bộ trạng thái nằm trong repo.

## Hệ quả
- (+) Không server, không chi phí cố định, thao tác được hoàn toàn từ trình duyệt.
- (+) Git history cho audit trail và rollback miễn phí.
- (−) Bị ràng buộc bởi giới hạn Actions (job 6 giờ, phút miễn phí hằng tháng).
- (−) UI phải giữ PAT trong trình duyệt — điểm yếu bảo mật, xem R3.
- (−) Độ trễ: UI phải poll repo, không có realtime push.
