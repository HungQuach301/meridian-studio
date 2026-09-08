# PROJECT

> Điểm neo duy nhất. Agent PHẢI đọc file này trước mọi tác vụ.

## Naming

| Khoá | Giá trị |
|---|---|
| PROJECT_NAME | Meridian |
| PROJECT_FULL | Meridian Studio |
| REPO | meridian-studio |
| SITE_SLUG | meridian-studio |
| OWNER | HungQuach301 |
| ENGINE_VERSION | 0.1.0 |

## Mục tiêu

Một nhà máy **nghiên cứu — sản xuất — vận hành — tối ưu nhiều kênh YouTube phân tích định lượng
cho thị trường Mỹ**, vận hành hoàn toàn trong trình duyệt, với con người chỉ can thiệp ở 3 cổng duyệt.

## Kiến trúc bốn lớp

```
/engine                  Trung tính về thể loại và kênh. Không chứa hằng số nào của nội dung
/genres/{genre}          Theo THỂ LOẠI: layout, format-spec, asset-policy, compliance
/channels/{slug}         Theo KÊNH: bible, persona, lexicon, tokens, topic-map, monetization
/portfolio               Dùng chung: học chéo, thư viện mô hình, nghiên cứu ngách, quản trị
```

**Quy tắc phân định:** một file thuộc Engine chỉ khi nó đúng với **mọi thể loại và mọi kênh**.
Nghi ngờ thì đẩy xuống Genre Pack. Nghi ngờ tiếp thì đẩy xuống Channel Pack.

## Phạm vi hiện tại

- Genre Pack: **chỉ `data-explainer`**
- Channel: **chỉ `us-personal-finance`**
- Lớp Portfolio: tồn tại nhưng gần như rỗng

Ranh giới được tách từ ngày đầu vì sửa sau rất đắt. Implementation chỉ xây khi có nhu cầu thật.

## Non-goals

1. **Không** xây Genre Pack thứ hai trước khi 3 kênh đầu chứng minh mô hình.
2. **Không** xây backend server, database, hay bất cứ thứ gì cần máy chủ chạy liên tục.
3. **Không** yêu cầu bất kỳ thao tác nào trên máy local. Chỉ trình duyệt.
4. **Không** dùng model sinh video cho thể loại `data-explainer` (xem ADR-0002).
5. **Không** làm hệ thống đăng nhập nhiều người dùng.
6. **Không** tối ưu hoá sớm: không caching layer, không abstraction "cho tương lai" ngoài hai
   interface đã khai (state backend, provider).
7. **Không** chạy hết công suất — năng lực sản xuất và tốc độ đăng là hai thứ khác nhau.
8. **Không** vượt 3 kênh khi vẫn giữ đủ 3 gate người.

## Nguyên tắc bất di bất dịch

1. **Contract-first.** Agent không sửa `/engine/contracts`.
2. **Repo là nguồn sự thật.** Nhưng mọi stage đọc/ghi qua interface, không gọi thẳng GitHub API.
3. **Một WP = một task Codex = một PR.**
4. **Vertical slice trước.** Chạy xuyên suốt trước, chất lượng sau.
5. **Ba gate người:** chốt thesis · duyệt kịch bản · spot check.
6. **Tách ranh giới ngay, xây implementation sau.**

## Trạng thái

Xem `engine/ops/backlog.md`. Việc đầu tiên là **WP-VAL-001**, không phải WP-000.
