# 01 · Kiến trúc

## Ràng buộc nền tảng (không thương lượng)

- Không có máy local. Mọi thao tác qua trình duyệt.
- Trong Meridian, ChatGPT Sites **chỉ dùng để host UI tĩnh**: không render video, không chạy job nền,
  không giữ secret runtime. Đây là lựa chọn kiến trúc của dự án, không phải mô tả toàn bộ khả năng Sites.
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

## Triển khai cockpit — phương án đang kiểm chứng

### Phương án A · Loader từ repo, bản triển khai tĩnh trên Sites

Nguồn chuẩn là `engine/app/loader.html` và `engine/app/cockpit.js` trong
`HungQuach301/meridian-studio`. Loader nhận token đọc từ chủ dự án, gọi GitHub Contents API
để tải `engine/app/cockpit.js` và thử thực thi trong trình duyệt.

**Chưa kết luận Sites cho phép thực thi mã động.** WP-003a phải thử trên Site thật và chủ dự án
nghiệm thu trước khi chốt phương án cho WP-003. Mã thử hiện yêu cầu commit SHA và blob SHA đã
review, chỉ tải đúng revision đó; không tự theo main. Thử hai revision trên cùng phiên bản
Sites là bằng chứng bổ sung, không được thay bằng một lần xuất hiện marker thành công.

Chủ dự án đã chấp nhận ngoại lệ giới hạn: kho Git do Sites quản lý chỉ lưu bản sao triển khai
loader và metadata hosting. Meridian vẫn là nguồn sự thật duy nhất; không phát triển UI độc
lập, không sao chép state, mã Cockpit hoặc tài liệu kênh sang kho Sites.

| Nguồn chuẩn ở Meridian | Bản sao/metadata ở kho nguồn Sites |
|---|---|
| `engine/app/loader.html` tại commit được duyệt | `dist/index.html`, nguyên byte |
| Site ID thực tế do nền tảng cấp | `.openai/hosting.json`, chỉ `project_id` và `static.directory: "dist"` |

Không thêm hai file đóng gói vào repo Meridian. Không thêm framework, bundler, dependency
hoặc action. Gói tĩnh không dùng Worker ứng dụng, D1, R2, runtime capabilities hoặc migration.
Mọi chỉnh sửa loader bắt đầu từ PR Meridian, không sửa riêng bản sao Sites.

Chuỗi bằng chứng triển khai phải nối:
**commit Meridian → hash loader → commit kho nguồn Sites → phiên bản Sites → deployment**.
SHA kho nguồn Sites có thể khác SHA Meridian; tham số lưu phiên bản phải dùng SHA kho nguồn
Sites đã đẩy thành công. Archive chỉ chứa `dist/index.html` và
`dist/.openai/hosting.json` do công cụ đóng gói chuẩn hóa.

Chấp nhận thiết kế bản sao chưa cấp quyền tạo kho/Site, lấy credential, lưu hoặc triển khai.
Hiện chỉ chuẩn bị PR WP-003a. Các thao tác Sites cần phê duyệt riêng; không bỏ qua quy trình
nguồn Git bằng cách dán HTML hoặc chỉ gửi archive. Mỗi URL Sites đã triển khai là production,
kể cả khi chỉ chủ dự án và quản trị viên workspace truy cập được.

Tham chiếu vòng đời Sites: https://learn.chatgpt.com/docs/sites

### Phương án B/C · GitHub Pages — chưa được duyệt

B là Sites bọc iframe trỏ Pages; C là dùng trực tiếp Pages.
Không tự chuyển sang B/C khi A thất bại. Cần chủ dự án quyết định riêng về quyền truy cập,
khả năng dùng Pages với gói GitHub hiện tại và phạm vi workflow/deploy.

GitHub Free không cung cấp Pages từ repo private; không giả định repo private có thể giữ
nguyên trên Free khi dùng Pages. Điều kiện gói và tính công khai của website phải được
xác minh trước khi đề xuất triển khai:
https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages

### Quyết định sau phép thử

WP-003a ở `engine/ops/work-packages/WP-003a-sites-loader-spike.md`.
Kết quả cuối do chủ dự án viết và chấp nhận tại
`engine/docs/02-adr/ADR-0006-cockpit-delivery.md`; file này chưa được tạo.
Đường dẫn có hai lần `engine/` trong tài liệu cũ là dẫn chiếu sai, không phải thư mục mới.

WP-003 hiện còn mô tả copy-paste `index.html`; chưa triển khai theo mô tả đó.
Sau kết quả, cập nhật WP-003 và runbook bằng phạm vi được duyệt riêng trước khi xây Cockpit.

`engine/app/cockpit.js` giữ một file JavaScript trình duyệt, không dependency và không build
step theo ràng buộc phân phối UI. Đây không phải thay đổi quy ước TypeScript của stage Engine.

## Bảo mật

- Secret của provider nằm ở GitHub Actions Secrets, không đưa vào code, log hoặc trình duyệt.
- WP-003a dùng fine-grained PAT **chỉ Contents read**, đúng repo Meridian, hạn tối đa 30 ngày.
  Chủ dự án tự nhập trên Site đã được duyệt; không gửi token vào chat.
- Token chỉ tồn tại trong bộ nhớ cần cho request. Không lưu localStorage, sessionStorage,
  cookie, URL hoặc biến môi trường Sites; không đặt token trên `window` cho mã thử.
- Loader chỉ GET tới `api.github.com`, chặn redirect và không tự retry. Ô token được xóa;
  reload yêu cầu nhập lại. Giao diện không thể chứng minh token không có quyền dư:
  chủ dự án phải kiểm quyền khi cấp, không dùng request ghi để kiểm.
- Credential ngắn hạn do Sites cấp để đẩy bản triển khai là credential kỹ thuật riêng.
  Chưa được lấy/sử dụng trong bước chuẩn bị PR này và không thay cho PAT đọc của loader.
- Quyền ghi/Actions cho công việc Cockpit sau này phải được duyệt theo WP tương ứng.
  WP-003a không cần và không cấp các quyền đó. Xem R3 trong `06-risk-register.md`.

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
