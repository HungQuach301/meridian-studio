# Architecture Decision Records

Mỗi quyết định kiến trúc lớn là một file. Mục đích: ghi lại **tại sao**, để không lật lại
quyết định cũ mỗi lần gặp khó.

Quy tắc: agent KHÔNG được tự viết ADR. Chỉ chủ dự án viết. Agent gặp mâu thuẫn thì báo cáo.

| ADR | Quyết định | Trạng thái |
|---|---|---|
| 0001 | Ba mặt phẳng: Sites + repo + Actions | Chấp nhận |
| 0002 | Remotion thay vì model sinh video | Chấp nhận |
| 0003 | Repo làm state store, không dùng database | Chấp nhận |
| 0004 | Binary lưu ở GitHub Releases | Chấp nhận |
| 0005 | Ba gate người, không nhiều hơn | Chấp nhận |
| [0006](ADR-0006-cockpit-delivery.md) | Loader tĩnh trên Sites, thực thi bằng Function constructor; chủ dự án đã duyệt nội dung | Chấp nhận |
