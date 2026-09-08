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

## PAT cho cockpit (KHÔNG khai ở đây)

Cockpit chạy trong trình duyệt nên không đọc được Actions Secrets. Anh nhập PAT trực tiếp vào ô
Settings của trang. Yêu cầu:
- Loại: **fine-grained personal access token**
- Repository access: **chỉ `meridian-studio`**
- Permissions: `Contents: Read and write`, `Actions: Read and write`
- Expiration: tối đa **30 ngày**

Xem R3 trong `engine/docs/06-risk-register.md`.

## Quy tắc
1. Không secret nào xuất hiện trong code, log, artifact, hay mô tả PR.
2. Xoay khoá theo quy trình trong `engine/docs/05-runbook.md`.
3. Nghi ngờ lộ → thu hồi trước, điều tra sau.
