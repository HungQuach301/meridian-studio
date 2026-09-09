# 01 · Kiến trúc

## Ràng buộc nền tảng (không thương lượng)

- Không có máy local. Mọi thao tác qua trình duyệt.
- ChatGPT Sites **chỉ host tĩnh**: không render video, không chạy job nền, không giữ secret.
- Không có server, không có database.

## Ba mặt phẳng

```
┌───────────────────────────────────────────────────────────┐
│  CONTROL PLANE — ChatGPT Sites (SPA tĩnh)                  │
│  Cockpit: bảng pipeline · gate inbox · artifact viewer     │
│  · thư viện · analytics · đồng hồ tài nguyên               │
└───────────┬───────────────────────────────┬───────────────┘
            │ đọc qua GitHub API            │ repository_dispatch
            ▼                               ▼
┌───────────────────────────┐   ┌───────────────────────────┐
│  STATE PLANE — GitHub repo│   │  COMPUTE PLANE — Actions  │
│  Nguồn sự thật duy nhất.  │◄──┤  1 workflow / stage       │
│  Mọi artifact là file.    │   │  + orchestrator           │
│  Git history = audit trail│   │  Remotion · ffmpeg · API  │
└───────────────────────────┘   └───────────┬───────────────┘
                                            │
              ┌─────────────────────────────┼──────────────┐
              ▼                ▼            ▼              ▼
          LLM API          TTS/ASR     Stock/Image    YouTube API
```

## Luồng một tập

1. Anh bấm nút trên cockpit → UI gọi GitHub API `repository_dispatch`.
2. Workflow tương ứng thức dậy, đọc artifact đầu vào từ repo.
3. Gọi dịch vụ ngoài (LLM / TTS / stock / YouTube), xử lý.
4. Validate output bằng schema, commit ngược vào repo.
5. Cập nhật `pipeline/state.json`.
6. UI poll repo, hiển thị trạng thái mới.

## Quyết định công nghệ

| Hạng mục | Chọn | Xem |
|---|---|---|
| Host UI | ChatGPT Sites | ADR-0001 |
| State store | GitHub repo | ADR-0003 |
| Compute | GitHub Actions | ADR-0001 |
| Render video | Remotion (React) + ffmpeg | ADR-0002 |
| Lưu binary | GitHub Releases | ADR-0004 |
| Điểm can thiệp người | 3 gate | ADR-0005 |

## Nguyên tắc không máy local (zero-local)

**Không có bước nào trong dự án này chạy trên máy cá nhân của chủ dự án.**
Bảng dưới liệt kê mọi loại lệnh và nơi nó thực sự chạy.

| Việc | Chạy ở đâu | Chủ dự án làm gì |
|---|---|---|
| `npm ci`, `npm run test`, `npm run validate`, `npm run typecheck` | GitHub Actions runner, Node 20 cho CI hiện tại | Mở link CI để xem kết quả; ChatGPT Work chuẩn bị thay đổi và thu bằng chứng |
| Cài Remotion, Chromium, ffmpeg | GitHub Actions runner | Không làm gì |
| Render video | GitHub Actions runner | Không làm gì |
| Tạo file, sửa file, commit | ChatGPT Work trên nhánh WP (qua PR) hoặc giao diện web GitHub | Duyệt phạm vi rồi xem diff trên trình duyệt |
| Xem diff, duyệt, merge | Giao diện web GitHub | Bấm nút |
| Hoàn tác một PR đã merge | Nút **Revert** trên trang PR của GitHub | Bấm nút |
| Xem trước cockpit | Preview của ChatGPT Sites hoặc GitHub Pages theo phương án được duyệt | Mở link trong trình duyệt |
| Chạy pipeline | GitHub Actions, kích hoạt từ cockpit | Bấm nút trên cockpit |

**Cấm tuyệt đối:** không tài liệu nào, không WP nào được yêu cầu chủ dự án chạy lệnh terminal,
cài phần mềm, hay mở file bằng giao thức `file://`. Nếu một WP cần điều đó, WP đó viết sai.

## ChatGPT đồng bộ với GitHub như thế nào

GitHub là nguồn sự thật duy nhất. ChatGPT Work là nơi nhận yêu cầu và chuẩn bị thay đổi:

1. Đọc lại main, tài liệu bắt buộc và WP tại SHA đã xác minh.
2. Sửa đúng phạm vi trên nhánh WP; bản làm việc tạm không thay thế repo GitHub.
3. Push kích hoạt CI GitHub Actions. CI hiện tại chạy Node 20, cài từ lockfile và thu
   bằng chứng nghiệm thu Loại 2; không đòi chủ dự án chạy lệnh.
4. Mở một PR theo WP, kiểm thêm ngữ cảnh PR và ghi link run/SHA/kết quả thật trong mô tả.
5. Chủ dự án đọc diff và checks trên web. Chỉ merge khi có phê duyệt riêng.
6. Tác vụ tiếp theo xác minh lại main; không dựa vào bản làm việc tạm của phiên trước.

Loại nghiệm thu và việc cho phép dùng secret/provider được quy định riêng trong
`13-upgrade-safety.md` và từng WP. Việc chạy CI không tự cấp quyền triển khai.

## Triển khai cockpit — ba phương án

Vấn đề: ChatGPT Sites không tự kéo file từ GitHub. Nếu dán thẳng cockpit vào Sites thì mỗi lần
đổi UI là một lần copy-paste thủ công. Ba cách xử lý, xếp theo mức độ ưu tiên.

### Phương án A · Loader một lần (ưu tiên)

Dán vào Sites **một lần duy nhất** một trang loader ~60 dòng (`engine/app/loader.html`). Loader không
chứa logic cockpit — nó chỉ nhận PAT rồi gọi GitHub Contents API để tải `engine/app/cockpit.js` và thực
thi lúc chạy.

Từ đó về sau, **mọi thay đổi UI chỉ là commit `engine/app/cockpit.js`**. Không bao giờ dán lại Sites.
Người dùng reload trang là có bản mới (loader thêm tham số chống cache).

- Repo giữ nguyên private. Không lộ mã ra ngoài.
- Rủi ro: Sites có thể chặn thực thi mã động bằng Content Security Policy. **Chưa xác minh.**
  Phải chạy `WP-003a` để biết trước khi xây tiếp.

### Phương án B · Sites bọc iframe trỏ GitHub Pages (dự phòng)

Nếu A thất bại vì CSP: Sites chỉ chứa một thẻ `<iframe>` trỏ tới GitHub Pages. Một workflow
Actions tự deploy `engine/app/` lên Pages mỗi khi merge vào `main`. Không cần thực thi mã động, không
cần copy-paste.

- Đổi lại: trang Pages **công khai** ở gói Free (repo vẫn private, nhưng site thì ai có link
  cũng mở được). Chấp nhận được vì cockpit không chứa secret — PAT nhập lúc chạy, dữ liệu phải
  có token mới đọc được. Nhưng cấu trúc dự án sẽ lộ.

### Phương án C · Bỏ Sites, dùng thẳng GitHub Pages

Đơn giản nhất, tự deploy hoàn toàn, không thao tác thủ công nào. Đánh đổi: mất Sites làm cửa vào.

### Quyết định

Chạy `engine/ops/work-packages/WP-003a-sites-loader-spike.md` trước WP-003. Kết quả ghi vào
`engine/engine/docs/02-adr/ADR-0006-cockpit-delivery.md`.

Dù chọn phương án nào, `engine/app/cockpit.js` vẫn phải là **một file duy nhất, không dependency,
không build step** — ràng buộc này giữ cho cả ba phương án đều khả thi và cho phép đổi phương án
sau này mà không viết lại UI.

## Bảo mật

- **Secret nằm ở GitHub Actions Secrets.** Không bao giờ trong code, không bao giờ trong trình duyệt.
- Cockpit chỉ giữ một **fine-grained PAT**: đúng một repo, hạn 30 ngày, quyền tối thiểu
  (contents: read/write, actions: write).
- Đây là điểm yếu bảo mật lớn nhất của mô hình. Chấp nhận có ý thức, xem R3 trong `06-risk-register.md`.

## Giới hạn phải nhớ

| Giới hạn | Con số | Hệ quả thiết kế |
|---|---|---|
| Job Actions | tối đa 6 giờ | Render theo matrix từng nhóm scene |
| Repo | nên < 1 GB | Không commit binary |
| YouTube Data API | 10.000 unit/ngày, upload ~1.600 unit | Tối đa ~5 upload/ngày |
| ChatGPT Sites | tĩnh, không secret | Mọi logic nằm ở Actions |

## Cấu trúc artifact một tập

```
/episodes/{YYYY-MM-slug}/
  00-brief.json          Đề tài + thesis (Gate 1)
  01-dossier.md          Hồ sơ dữ kiện
  01-sources.json        Sổ nguồn
  02-factcheck.json      Kết quả đối chất
  03-outline.json        7 mốc + beat map
  04-script.md           Kịch bản
  04-script.approved.md  Sau Gate 2
  05-storyboard.json     Scene spec
  06-timing.json         Căn chỉnh VO
  06-captions.srt
  07-render-manifest.json
  08-package.json        Title/thumbnail/description
  08-publication.json
  09-metrics.json
  09-insight.md
```
