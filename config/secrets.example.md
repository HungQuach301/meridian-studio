# Secrets

**File này chỉ liệt kê TÊN secret. Không bao giờ chứa giá trị.**

Khai ở: repo → Settings → Secrets and variables → Actions → New repository secret.

| Tên | Dùng cho | Stage |
|---|---|---|
| `LLM_API_KEY` | Research, fact-check, script, storyboard, packaging | S04–S09, S14a |
| `TTS_API_KEY` | Sinh voice-over | S10 |
| `ASR_API_KEY` | Căn chỉnh timestamp | S10 |
| `IMAGE_API_KEY` | Sinh ảnh nền | S11 |
| `STOCK_API_KEY` | Kéo stock photo/video | S11 |
| `YOUTUBE_CLIENT_ID` | OAuth YouTube | S14b–S14c |
| `YOUTUBE_CLIENT_SECRET` | OAuth YouTube | S14b–S14c |
| `YOUTUBE_REFRESH_TOKEN` | OAuth YouTube | S14b–S14c |

## PAT cho spike WP-003a (KHÔNG khai ở Actions Secrets)

Chỉ tạo hoặc sử dụng sau phê duyệt phép thử thật. Chủ dự án nhập trực tiếp vào ô token trên
Site đã được duyệt; không gửi giá trị vào chat, repo, log hoặc ảnh bằng chứng.

- Loại: **fine-grained personal access token**.
- Repository access: **chỉ `HungQuach301/meridian-studio`**.
- Permissions: **Contents — Read-only**; Metadata read mặc định của GitHub.
- Không cấp Contents write, Actions write hoặc quyền repository khác cho spike.
- Expiration: tối đa **30 ngày**.
- Không lưu trong localStorage, sessionStorage, cookie, URL hoặc Sites environment variables.
- Loader xóa ô nhập và chỉ giữ token trong biến bộ nhớ cần cho request; không chuyển token
  cho `cockpit.js` qua biến toàn cục. Reload phải nhập lại.
- Không dùng request ghi hoặc dispatch để kiểm quyền token. Chủ dự án xác nhận quyền đã cấp;
  thành công của một GET không chứng minh token không có quyền dư.

Credential kỹ thuật do Sites cấp để đẩy bản triển khai loader là loại riêng.
Không ghi credential đó vào file này, Git remote URL hoặc cấu hình Git; chỉ dùng trong thao
tác được duyệt. Bước chuẩn bị PR WP-003a chưa được lấy hoặc sử dụng credential Sites.

## PAT cho Cockpit WP-004 — cần duyệt lượt thật riêng

PR WP-004 chỉ chuẩn bị code/fixture; chưa cấp hoặc dùng token thật. Chủ dự án tự
cấp, nhập và quản lý; agent không nhận giá trị token qua chat hoặc ảnh bằng chứng.

| Token | Repository và quyền | Chỗ nhập |
|---|---|---|
| Đọc mã/snapshot/kết quả | Chỉ Meridian; Contents Read-only; Metadata read mặc định | Loader và Settings đọc state/kết quả, nhập riêng cho từng thao tác |
| Dispatch riêng | Chỉ Meridian; Contents Read and write; Metadata read mặc định | Gửi hello trong Cockpit, chỉ khi có phê duyệt một lượt thật |

- Repository access: chỉ `HungQuach301/meridian-studio`; fine-grained PAT, hạn tối đa
  30 ngày theo NFR. Không nâng quyền token đọc WP-003 đang được chủ dự án giữ.
- `repository_dispatch` cần Contents write. Quyền này rộng hơn một endpoint dispatch;
  chủ dự án phải duyệt rõ trước lượt thật. Không cần Actions write hoặc quyền khác.
- Không khai PAT trình duyệt ở Actions Secrets hoặc Sites environment. Token ghi
  của job heartbeat vẫn là `GITHUB_TOKEN` hiện có, không lấy PAT từ payload.
- UI xóa ô nhập ngay; token chỉ tồn tại trong hàm xử lý chuỗi request, được thả khi
  kết thúc/hủy. Không lưu storage, cookie, URL, log, biến toàn cục hoặc truyền từ loader.
- Giữ token đọc WP-003 30 ngày là quyết định lịch sử của chủ dự án, không phải
  quyền dùng token hoặc thử WP-004; hạn/quyền token được chủ dự án xác nhận,
  không phải agent kiểm độc lập. Không dùng POST để thăm dò quyền.
- Lỗi/timeout không cấp thêm lượt, không tự nới quyền, retry/rerun hoặc đổi cơ chế.

Quy trình và trần request ở
[WP-004](../engine/ops/work-packages/WP-004-cockpit-dispatch.md).
[Quyền repository_dispatch](https://docs.github.com/en/rest/repos/repos#create-a-repository-dispatch-event).

Tham chiếu quyền đọc Contents API:
https://docs.github.com/en/rest/repos/contents#get-repository-content

Xem R3 trong `engine/docs/06-risk-register.md`.

## Quy tắc
1. Không secret nào xuất hiện trong code, log, artifact, hay mô tả PR.
2. Xoay khoá theo quy trình trong `engine/docs/05-runbook.md`.
3. Nghi ngờ lộ → thu hồi trước, điều tra sau.
