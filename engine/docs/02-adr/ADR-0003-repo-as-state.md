# ADR-0003 · Repo làm state store

**Trạng thái:** Chấp nhận

## Bối cảnh
Pipeline 14 stage cần lưu trạng thái và artifact giữa các stage. Không có server để chạy database.

## Phương án đã cân nhắc
1. **Database ngoài (Supabase/Firebase)** — thêm phụ thuộc, thêm secret, thêm chi phí, và tách rời
   artifact khỏi mã nguồn.
2. **Actions Artifacts** — có hạn lưu trữ, không truy vấn được từ UI, không có lịch sử.
3. **Repo Git** — chọn.

## Quyết định
Mọi artifact là file trong `/episodes/{id}/`. Trạng thái pipeline là `pipeline/state.json`.
Mọi thay đổi là một commit.

## Hệ quả
- (+) Một nguồn sự thật duy nhất. Không có vấn đề đồng bộ.
- (+) Lịch sử, diff, rollback, code review — có sẵn.
- (+) Agent đọc/ghi cùng một nơi với code, không cần credential riêng.
- (−) Không phù hợp cho ghi tần suất cao — chấp nhận được vì pipeline chạy theo tập.
- (−) Repo có thể phình. Ràng buộc: không commit binary, xem ADR-0004.
- (−) Ghi đồng thời từ hai job có thể xung đột — mỗi job chỉ ghi trong thư mục episode của nó.
