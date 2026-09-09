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

## PAT cho Cockpit ở WP sau

Quyền Contents write hoặc Actions write chỉ được xét khi WP thực sự cần thao tác ghi;
phải duyệt riêng, không kế thừa từ WP-003a. Token đọc của spike không phải bằng chứng
dispatch từ Cockpit đã được nghiệm thu.

Tham chiếu quyền đọc Contents API:
https://docs.github.com/en/rest/repos/contents#get-repository-content

Xem R3 trong `engine/docs/06-risk-register.md`.

## Quy tắc
1. Không secret nào xuất hiện trong code, log, artifact, hay mô tả PR.
2. Xoay khoá theo quy trình trong `engine/docs/05-runbook.md`.
3. Nghi ngờ lộ → thu hồi trước, điều tra sau.
