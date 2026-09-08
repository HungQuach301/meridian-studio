# ADR-0004 · Binary lưu ở GitHub Releases

**Trạng thái:** Chấp nhận

## Bối cảnh
Một tập sinh ra ~200MB–1GB gồm mp4, wav, ảnh. Repo nên giữ dưới 1GB.

## Phương án đã cân nhắc
1. **Commit thẳng vào repo** — repo phình không thể cứu sau vài tập. Loại.
2. **Git LFS** — có hạn băng thông ở gói miễn phí, thêm phức tạp.
3. **Object storage ngoài (R2/S3)** — thêm secret và chi phí, nhưng là phương án dự phòng tốt.
4. **GitHub Releases** — chọn.

## Quyết định
Mỗi episode tạo một Release với tag `ep/{id}`. Binary upload làm release asset qua API.
Repo chỉ chứa file text và JSON. `.gitignore` chặn mọi đuôi binary.

## Hệ quả
- (+) Không tốn dung lượng repo, tải về được từ trình duyệt, có API đầy đủ.
- (+) Không thêm secret nào.
- (−) Không phù hợp nếu sau này cần streaming — khi đó chuyển sang R2, đây là quyết định đảo được.
