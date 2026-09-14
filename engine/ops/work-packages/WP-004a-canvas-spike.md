# WP-004a · SPIKE: Canvas liên tục

**Wave:** 2 · **Phụ thuộc:** WP-002 · **Loại:** SPIKE
**Chạy trước WP-005 và Layout Gallery. Hộp thời gian trong kế hoạch: 1 ngày.**

> Hồ sơ chuẩn bị một PR, dựa trên checkpoint Meridian bên dưới. Python/observer
> đã được duyệt; chủ dự án yêu cầu hoàn tất và bỏ thời gian làm điểm chặn của
> phần chuẩn bị PR. Quyết định hiện hành và giới hạn vật chứng ở mục 22;
> các bản sửa sau review PR #13 ở mục 23–24, mục 24 thay quy tắc miễn trừ SIGKILL.
> Chưa có kết quả render hoặc nghiệm thu benchmark.

## 1. Mục tiêu và nguồn chuẩn

Kiểm chứng bằng render thật tính khả thi của một canvas liên tục 6000×3400,
theo kiến trúc Remotion (React) + ffmpeg trong ADR-0002. Đây là spike kỹ thuật,
chưa phải stage sản xuất, Layout Gallery hoặc implementation đầy đủ của WP-005.

Repository duy nhất: `HungQuach301/meridian-studio`, private.

| Mốc | Giá trị đã xác minh |
|---|---|
| Main | `8a6099724bf9afd7d8dabfdb18e125052c8c213e` |
| Tree | `72bbbf201d57e20d5cfd3aec85d2b65432e51e7e` |
| Số file | 104 |
| State blob | `3ba90b96e8ee3c6d8774d81eb82da8c96a10c6f5` |
| State SHA-256 | `5783182b5c082cf78166e2df38caa46999a25ede101b1568dc54ccef8b40ae36` |
| State | 88 byte, có newline cuối; monthlySpendUsd=0; episodes=[] |
| CI | Run 34551080684, attempt 1, success |
| Hello | Run 34551080719, attempt 1, success; verify đạt; heartbeat và send-hello skipped |
| Lịch sử | 93 run, gồm 35 Hello; không có run đang chạy; không có PR mở |

Chủ dự án đã chốt checkpoint này cho WP-004a sau khi nghiệm thu và đóng
WP-DOC-001. Các mốc be9e726, 103 file và 84/31 run trong mục 12–16 là lịch sử
của các lượt trước, không phải checkpoint hiện hành. Không sửa lại lịch sử đó.

Trước khi tiếp tục công việc có tác động lên repo, xác minh lại main, tree,
state, checks và lịch sử. Khác checkpoint thì dừng, báo chủ dự án; không tự
chọn checkpoint mới. Không dùng dữ liệu dự án khác làm trạng thái Meridian.

## 2. Quyền hiện có và điểm dừng

Chủ dự án đã duyệt chuẩn bị một PR: sửa trong phạm vi 11 file, kiểm offline,
commit/push nhánh riêng, mở một PR và CI tự động khi đủ điều kiện. Ngày
2026-09-12, chủ dự án bỏ thời gian làm điểm chặn cho việc hoàn tất phần chuẩn bị
PR và yêu cầu không hỏi lại về vấn đề này. Giữ sổ 120 phút cũ như lịch sử ở mục
20–21, không tự sửa số đã ghi hoặc đặt lại ngân sách; xem quyết định ở mục 22.
**Dừng trước cài/push nếu có dependency phát sinh chưa được duyệt.**

Metadata npm đã đối soát đủ và được chủ dự án duyệt: 228 cặp tên/phiên bản
trong cây mới, 303 quan hệ dependency; danh sách đầy đủ ở mục 20. Lockfile có
326 vị trí, giữ nguyên phiên bản tại 109 vị trí gốc. Cài offline từ archive đã
kiểm integrity/giấy phép đã thành công với lifecycle script bị vô hiệu hóa.

**Python 3.12.3, thư viện chuẩn và ngoại lệ observer tại mục 21.1 đã được duyệt**,
gồm test prerequisite trên tiến trình Node tổng hợp trong CI. Không tăng quyền
hoặc fallback khi ptrace bị từ chối; không thử lại probe đã bị từ chối trong Work.
Không có npm dependency phát sinh ngoài bộ đã đối soát. Bản nguồn metadata còn
thiếu, cây node_modules khôi phục và kết quả kiểm mới được phân biệt ở mục 22.

Chưa được merge, chuẩn bị browser Remotion, render, dispatch/rerun, dùng token
hoặc provider, tạo Release hay thao tác Sites. Từng giai đoạn đó phải có phê duyệt
riêng. Không chuyển ngân sách hoặc quyền từ WP-004 và các WP trước.

Không coi đề xuất tổng ngân sách 330 phút là ngân sách có hiệu lực. Giữ nguyên
sổ lịch sử, khoảng thời gian chưa xác định và 5 phút 49 giây đóng gói đã ghi
riêng. Không hỏi lại số dư hoặc dùng thời gian làm điểm chặn phần chuẩn bị PR.
Quyết định này không bỏ các ngưỡng hiệu năng render, giới hạn job hoặc điều kiện
chi phí của benchmark cần được duyệt riêng. Không xin lại quyền chuẩn bị PR đã có.

## 3. Files in scope

1. `engine/ops/work-packages/WP-004a-canvas-spike.md`
2. `package.json`
3. `package-lock.json`
4. `tsconfig.json`
5. `.github/workflows/canvas-spike.yml`
6. `scripts/canvas-spike.ts`
7. `scripts/canvas-spike.test.ts`
8. `genres/data-explainer/canvas-spike.tsx`
9. `genres/data-explainer/canvas-spike.fixture.json`
10. `engine/docs/05-runbook.md`
11. `engine/ops/backlog.md` — chỉ dòng WP-004a.

Giữ nguyên mọi file ngoài phạm vi, gồm ci.yml, hello.yml, loader/Cockpit,
contracts và pipeline/state.json. Không thêm helper, action hoặc dependency
ngoài danh sách được duyệt. Không nâng các dependency hiện có.

ADR không thuộc phạm vi. Đường dẫn output đúng là
`engine/docs/02-adr/ADR-0007-canvas-viability.md`. Chủ dự án quyết định và viết;
agent chỉ soạn khi có yêu cầu rõ ràng mới, sau khi có số đo thật.

## 4. Dependency npm đã chốt

Các phiên bản trực tiếp sau thuộc bộ metadata đã được duyệt. Đã kiểm nội dung
archive, SRI, giấy phép trước cài, cài offline và bundle/typecheck với package
thật. Chưa chứng minh render tương thích hoặc xác minh chữ ký publisher độc lập.

| Package | Phiên bản chính xác | License khai báo trong manifest |
|---|---|---|
| remotion | 4.0.523 | SEE LICENSE IN LICENSE.md |
| @remotion/renderer | 4.0.523 | SEE LICENSE IN LICENSE.md |
| @remotion/bundler | 4.0.523 | SEE LICENSE IN LICENSE.md |
| react | 18.2.0 | MIT |
| react-dom | 18.2.0 | MIT |
| @types/react | 18.2.79 | MIT |
| @types/react-dom | 18.2.25 | MIT |
| @types/node | 20.19.0 | MIT |
| @fontsource/inter | 5.2.5 | OFL-1.1 |
| @fontsource/inter-tight | 5.2.5 | OFL-1.1 |

Không dùng latest, dấu ^/~ cho các phiên bản trực tiếp này, hoặc tự thay phiên bản
khi nguồn lỗi. Giữ các phiên bản đã khóa trong lockfile hiện tại, bao gồm
TypeScript 5.9.3 và esbuild 0.28.2. Không suy diễn publisher Node 24.3.0 trong
manifest thành yêu cầu Node runtime.

### 4.1. Lớp phụ thuộc đầu tiên — đã được đối soát tiếp ở mục 20

16 dependency bắt buộc được pin tại lớp đầu:

| Package | Phiên bản |
|---|---|
| @remotion/licensing | 4.0.523 |
| @remotion/streaming | 4.0.523 |
| @remotion/media-parser | 4.0.523 |
| @remotion/studio | 4.0.523 |
| @remotion/studio-shared | 4.0.523 |
| @remotion/timeline-utils | 4.0.523 |
| @rspack/core | 1.7.11 |
| @rspack/plugin-react-refresh | 1.6.1 |
| css-loader | 7.1.4 |
| esbuild | 0.28.1 |
| execa | 5.1.1 |
| react-refresh | 0.18.0 |
| source-map | 0.8.0 |
| style-loader | 4.0.0 |
| webpack | 5.105.0 |
| ws | 8.21.0 |

esbuild 0.28.1 là yêu cầu bổ sung của cây mới; không thay esbuild 0.28.2 đang có.

5 dependency khai báo bằng khoảng phiên bản; bản khóa chính xác đã có ở mục 20:

| Package | Khoảng khai báo |
|---|---|
| @types/prop-types | * |
| csstype | ^3.0.2 |
| loose-envify | ^1.1.0 |
| scheduler | ^0.23.0 |
| undici-types | ~6.21.0 |

7 dependency tùy chọn theo nền tảng, cùng phiên bản 4.0.523:

- @remotion/compositor-darwin-arm64
- @remotion/compositor-darwin-x64
- @remotion/compositor-linux-arm64-gnu
- @remotion/compositor-linux-arm64-musl
- @remotion/compositor-linux-x64-gnu
- @remotion/compositor-linux-x64-musl
- @remotion/compositor-win32-x64-msvc

Lockfile có thể chứa metadata của các nền tảng không được cài trên runner.
Không kết luận cả 7 gói đều cần cài. Bảng này mô tả lớp đầu; cây đầy đủ là mục 20.

### 4.2. Đối soát dependency và điểm dừng phát sinh

- Đã có danh sách chính xác, integrity và metadata dependency/peer/optional.
- Bộ giải npm chạy offline trong tập hữu hạn đã duyệt; không dùng latest hoặc
  thêm một phiên bản chỉ vì nó mới xuất hiện trên registry.
- `npm ci --offline --ignore-scripts --no-audit --fund=false` đạt;
  `npm ls --all` exit 0, không báo dependency thiếu hoặc invalid.
- Giữ nguyên phiên bản dependency gốc; esbuild 0.28.1 của bundler được đặt
  riêng, không thay esbuild 0.28.2 đang có.
- Không GET lại JSON metadata đã đọc. Các lỗi truy cập trước vẫn giữ trong
  lịch sử; không đổi chúng thành truy cập thành công hồi tố.
- Bất kỳ tên/phiên bản/runtime mới nào khác danh sách được duyệt vẫn dừng
  trước cài/push. Python 3.12.3 và ngoại lệ hẹp ở mục 21.1 đã được duyệt;
  quyết định mới không cấp quyền cho runtime hoặc dependency khác.

## 5. Môi trường phải cố định trước benchmark

- Runner dự kiến Ubuntu 24.04 x64, Node 20; ghi phiên bản thực tế, image runner,
  npm, thư viện hệ thống và cấu hình CPU/RAM trong bằng chứng của lượt chạy.
- Đã đọc `TESTED_VERSION` trong archive renderer 4.0.523 được kiểm SRI:
  Chrome Headless Shell **149.0.7790.0**. Chưa tải hoặc mở browser này.
  Trước benchmark cần xác minh executable, VERSION, kiến trúc và SHA-256 thực tế.
- Không lấy phiên bản Chrome của chủ dự án làm phiên bản browser của runner.
- Font từ hai package Fontsource đã nêu đã được kiểm archive và bundle offline;
  phục vụ nội bộ từ bundle; dùng Inter
  400/500/700/800 và Inter Tight 800 theo visual tokens của kênh. Dùng file
  subset Latin cho nội dung tiếng Anh của spike; hash cụ thể ở mục 21. Đợi font tải đủ; không
  âm thầm dùng fallback. Hai bản dùng cùng font.
- Không thêm @remotion/fonts hoặc helper font. Không tự tải font từ CDN lúc render.
- ffprobe đi kèm compositor 4.0.523 đã chạy `-version` offline: n7.1, hash ở
  mục 21; chưa giải mã MP4 thật. Runner phải kiểm lại binary và thư viện liên
  kết; thiếu thì dừng, không tự cài công cụ hoặc đổi cách kiểm MP4.
- Observer dùng `/usr/bin/python3` 3.12.3, thư viện chuẩn `ctypes` và API
  `ptrace` của Linux trong phạm vi đã duyệt; xem mục 21.1 và 22. Thiếu hoặc sai
  runtime, bị từ chối ptrace thì dừng, không cài thêm hoặc tăng quyền/fallback.
- Không giả định Actions, Release hoặc license thương mại miễn phí. Không đọc
  billing, mua gói, dùng license key hoặc gửi telemetry/provider khi chưa được duyệt.
- Phê duyệt benchmark sau này phải chốt thời lượng job, chi phí Actions/CI/lưu trữ,
  điều kiện license và nơi giữ bằng chứng. Không ghi binary vào Git.

## 6. Cảnh thử và hai render đối chứng

Một composition nội bộ 6000×3400; output 1920×1080, 30 fps, 180 giây = 5.400 khung.
Giữ các đối tượng xuyên suốt, không đổi canvas thành các slide hoặc chunk.

- Parallax ba lớp: 0,3 / 1 / 1,3 tốc độ máy quay.
- Camera đi qua năm vùng bằng pan, dolly-in, dolly-out và arc. Arc dùng đường đi
  cong; không tự thêm xoay canvas làm thay đổi yêu cầu hình ảnh.
- Một morph giữa hai chart dùng cùng bộ dữ liệu và cùng định danh đối tượng.
- Blur 3 px trên lớp ngoài tiêu điểm.
- Dữ liệu tổng hợp ghi rõ là synthetic, có nguồn và quy tắc tạo trong fixture.
  Nếu cần sources.json để đối soát, tạo ở thư mục tạm của job từ fixture; không
  thêm file tracked thứ 12. Tuân thủ visual-system, motion-grammar và visual-tokens.

Một benchmark gồm hai render đủ 5.400 khung: **tĩnh trước, động sau**, tuần tự trên
cùng runner. Mỗi render concurrency=1, cùng composition, dữ liệu, browser, font,
độ phân giải, fps và cấu hình encoding. Bản tĩnh vẫn render từng khung; không lặp
một ảnh để tạo MP4. Dùng browser mới cho mỗi bản, không restart giữa một render.

Định nghĩa timer phải giống nhau cho hai bản, từ bắt đầu mở browser tới khi MP4
hoàn tất và browser đóng. Ghi riêng thời gian setup, bundle, kiểm MP4 và tải tài nguyên;
không đổi ranh giới timer sau khi thấy kết quả. Ghi cả renderedFrames/encodedFrames
và concurrency thực tế. Timer tổng 25 phút khác timeout của delayRender.

Giới hạn toàn job được đối soát bằng bằng chứng `jobTiming` riêng: cùng binding
nguồn/môi trường/runner/clock, có tham chiếu và hash, ranh giới từ bắt đầu job tới
sau cleanup cuối, `complete=true`, timestamp hữu hạn và tăng. Khoảng này phải
bao trùm cả hai timer render và gồm setup, bundle, kiểm MP4, lưu bằng chứng,
cleanup. Dữ liệu thiếu hoặc mâu thuẫn là INCONCLUSIVE; khoảng đầy đủ vượt giới
hạn job đã chốt là FAIL, kể cả khi hai timer render vẫn đạt. Không suy thời gian
job từ riêng khoảng hai render, không suy chi phí thực tế từ thời gian job.
Controller đã có bản nháp ghi timestamp Linux monotonic, timer và deadline
job/command; chưa chạy trong GitHub Actions. Validator chỉ kiểm bản ghi đầu vào;
đối soát job sau khi kết thúc vẫn bắt buộc. Job bị ngắt trước khi có đủ bằng chứng không
được tự gán `complete=true` hay nội suy thời điểm hoàn tất.

## 7. Phép đo RAM và quy tắc phân loại

Đo **RSS hiện tại của toàn bộ cây tiến trình Chromium**, gồm browser, renderer,
GPU và utility; không dùng đỉnh tích lũy để chứng minh bộ nhớ ổn định. Ghi riêng
Node/FFmpeg. Tổng RSS có thể đếm lặp trang dùng chung; đây không phải bộ nhớ vật lý
duy nhất như PSS.

- Lấy mẫu mỗi 250 ms; lưu timestamp, thời gian thực giữa các mẫu, tiến độ khung,
  PID, starttime, quan hệ cha/con và RSS từng tiến trình cùng tổng RSS.
- Thu đủ chuỗi thô và 18 cửa sổ không chồng lấn, mỗi cửa sổ 300 khung; giữ cả
  phần đầu, không tùy ý bỏ warm-up. Mỗi cửa sổ phải có bằng chứng tiến độ đầy đủ.
- Với cửa sổ i, M_i là median RSS và P_i là percentile 95. Đặt epsilon bằng
  max(32 MiB, 5% × median(M_1..M_3)).
- G = median(M_16..M_18) - median(M_1..M_3).
- S = hệ số dốc Theil–Sen của 18 median theo chỉ số cửa sổ, nhân 17, để biểu diễn
  mức tăng ước lượng trên toàn bộ chuỗi.

| Kết quả RAM | Quy tắc định trước |
|---|---|
| PASS | Bằng chứng đầy đủ; G <= 0; S <= 0; không có tăng không giảm theo định nghĩa bên dưới; range(M_13..M_18) <= epsilon; range(P_13..P_18) <= 2 × epsilon |
| FAIL | G > 2 × epsilon và S > 2 × epsilon |
| INCONCLUSIVE | Dữ liệu không đủ tin cậy; hoặc có tăng dương chưa đủ điều kiện FAIL; hoặc các trường hợp còn lại |

Thứ tự quyết định: kiểm tính đầy đủ/tin cậy trước; nếu thiếu thì INCONCLUSIVE.
Với bằng chứng đầy đủ, kiểm FAIL trước. Nếu chưa FAIL nhưng G > 0, S > 0,
hoặc một trong hai chuỗi (tổng RSS thô; 18 median cửa sổ) không giảm ở bất kỳ
bước nào và giá trị cuối lớn hơn đầu, kết quả là INCONCLUSIVE. Kiểm cả chuỗi
thô để bước tăng đầu/cuối không bị median hoặc hệ số dốc trung vị che khuất.

Epsilon chỉ phân định mức tăng đủ rõ để FAIL và giới hạn dao động cuối chuỗi;
không phải ngân sách tăng RAM được phép PASS. Ví dụ 18 median 678, 680, …,
712 MiB có epsilon=34 MiB, G=30 MiB, S=34 MiB: INCONCLUSIVE, không PASS.
Chuỗi tăng nhỏ kèm một lần sụt ngắn vẫn phải qua kiểm G/S; không dùng riêng
lần sụt đó để kết luận ổn định. Chuỗi phẳng hoặc giảm với phần đuôi ổn định
có thể PASS. Cách phân loại bảo thủ này có thể để nhiễu tăng nhỏ ở INCONCLUSIVE;
không suy tăng nhỏ là đã chứng minh rò rỉ RAM và không tự cấp lượt chạy lại.

Thiếu cửa sổ, có khoảng trống lấy mẫu >1 giây, thiếu tiến trình hoặc thay PID
không giải thích được làm phép đo INCONCLUSIVE. Một lần RSS giảm ngắn không đủ
để PASS. Quy tắc này là tiêu chí của spike, không phải chuẩn công bố bởi Remotion.

Crash/relaunch có bản nháp observer kernel độc lập với Remotion, cùng kiểm
identity renderer/GPU khi đang render. Không gán sẵn restart=0. Đã đọc các
nhánh retry của renderer 4.0.523 và thêm guard chặn tải lại trang, thay page
hoặc tự tải browser; kiểm offline không chứng minh guard trên browser thật.
Observer ptrace đang chờ duyệt runtime và kiểm trên runner. Không coi console
log hoặc exit 0 là bằng chứng duy nhất; không che giấu crash bằng restart.

## 8. Acceptance và bằng chứng

Giữ bốn acceptance gốc:

| Chỉ số | Ngưỡng |
|---|---|
| Thời gian render động, một worker | <=25 phút |
| RAM Chromium qua 5.400 khung | Không có xu hướng tăng theo tiêu chí mục 7 |
| Crash | 0 |
| Thời gian động / tĩnh | <=3× |

Kiểm cả hai MP4 bằng số khung giải mã thực tế 5.400, fps 30, kích thước
1920×1080 và thời lượng 180 giây. Đối soát với progress log, cấu hình encoding,
SHA nguồn, fixture, lockfile, browser, font, môi trường và thời gian đo.

Chủ dự án xem bằng chứng hình ảnh trên trình duyệt, kiểm tính liên tục của cùng
các đối tượng, đủ năm vùng, parallax, morph và blur. Không tuyên bố nghiệm thu
hình ảnh từ test số học, ảnh lấy mẫu rời hoặc CI/offline xanh.

Nếu một acceptance FAIL thì dừng và báo. Thiếu số đo hoặc khó phân loại thì
INCONCLUSIVE, chưa mở cổng WP-005. Không tự giảm canvas, bỏ blur, chia chunk,
đổi cấu hình, chạy lại hoặc dùng dự phòng như quyền chạy thêm.

## 9. Kiểm trước PR và workflow dự kiến

- Script benchmark không tự chạy khi import hoặc khi test. Offline/CI không mở
  browser, tải browser, render, gọi provider, dùng token hay phát dispatch.
- Test phải phát hiện lỗi có ý nghĩa: cấu hình sai, dữ liệu nguồn thiếu, geometry
  không liên tục, không đủ khung, chuỗi RAM tăng/chập chờn/thiếu dữ liệu và admission
  thiếu điều kiện. Không dùng test giả để tuyên bố có số đo render.
- Validate, test, typecheck và bundle offline của lượt trước ở mục 21; lượt
  tiếp tục từ vật chứng khôi phục ở mục 22. Kiểm diff, giữ state/contracts và
  mọi file ngoài phạm vi nguyên byte.
- Workflow mới chỉ có workflow_dispatch. Không có benchmark tự động theo push/PR,
  không retry/rerun tự động. Chưa chạy workflow trong giai đoạn chuẩn bị PR.
- Chỉ dùng các action đã có và đã pin: checkout
  11d5960a326750d5838078e36cf38b85af677262; setup-node
  49933ea5288caeca8642d1e84afbd3f7d6820020. Không thêm action artifact/Release.
- Nếu chưa có nơi giữ đủ video và log được duyệt, preflight dừng trước render.
- Nhánh dự kiến: wp/WP-004a-canvas-spike. Một PR với bốn mục: Đã làm gì / Đã kiểm
  thế nào / File đã chạm / Rủi ro còn lại. Phần chưa kiểm ghi rõ, không đánh dấu
  acceptance render đạt khi mới chuẩn bị code hoặc CI.

## 10. Hướng dẫn bước tiếp theo cho chủ dự án

1. Agent tiếp tục quyền đã duyệt: đối soát checkpoint, kiểm cuối, push một nhánh
   và mở một PR. Quyết định bỏ thời gian làm điểm chặn nằm ở mục 22; không hỏi
   lại số dư, runtime hoặc phạm vi 11 file đã duyệt.
2. CI phải kiểm Node 20 và observer prerequisite trên tiến trình Node tổng hợp;
   nếu lỗi thì báo đúng nguyên nhân. Sai Python 3.12.3 hoặc bị từ chối ptrace
   thì dừng, không tăng quyền/fallback hoặc chạy browser.
3. Chủ dự án nhận liên kết PR cùng kết quả kiểm, mở Files changed và Checks
   trên đúng head. Không cần gửi metadata, cài phần mềm, chép file hoặc chạy lệnh.
4. Sau review, chủ dự án mới xét phê duyệt merge. Chuẩn bị browser, benchmark,
   nơi lưu bằng chứng và chi phí vẫn được duyệt riêng.

## 11. DoD — chưa hoàn tất

- [ ] Cây dependency, browser/font và license có đủ bằng chứng và quyền cần thiết.
- [ ] Implementation đúng phạm vi; offline/CI đạt và không kích hoạt benchmark.
- [ ] Hai render thật đủ 5.400 khung; có đầy đủ chuỗi RAM và crash observation.
- [ ] Bốn acceptance được phân loại, hai MP4 được đối soát, hình ảnh được chủ dự án nghiệm thu.
- [ ] Chủ dự án quyết định ADR-0007 dựa trên số đo thật; không tự mở cổng WP-005.

Hồ sơ WP-003/WP-004 giữ nguyên: WP-004 đã nghiệm thu qua Hello #30, run
34484922516 attempt 1; H=98ed4d8c02574e2a44f6fde8a66649d8d1736933, chỉ updatedAt
đổi. Giữ lịch sử hai POST (403 rồi 204), hai GET đọc H đã được duyệt bổ sung,
mọi giới hạn/chưa kiểm; không thử lại Sites và không cấp quyền retry hồi tố.

Các mục 12–21 bên dưới giữ lịch sử các lượt trước. Quyền và trạng thái mới hơn
được ghi ở mục 22; không dùng điểm chờ duyệt cũ để yêu cầu chủ dự án duyệt lại.

## 12. Biên bản chuẩn bị offline — 2026-09-10

Checkpoint ở mục 1 đã được xác minh lại trong lượt chuẩn bị này: main/tree,
103 file, state 88 byte và cả hai hash, checks và toàn bộ 84 run đều khớp.
Chưa thay đổi GitHub, tạo nhánh, commit/push, mở PR hoặc chạy CI mới.

Bản làm việc hiện có đúng bốn file trong phạm vi 11 file:

| File | Phần đã chuẩn bị |
|---|---|
| engine/ops/work-packages/WP-004a-canvas-spike.md | Kế hoạch, điều kiện dừng và biên bản này |
| scripts/canvas-spike.ts | Cấu hình bất biến; kiểm cấu hình; bộ phân loại RAM thuần từ bằng chứng đầu vào |
| scripts/canvas-spike.test.ts | 28 kiểm thử cấu hình, xu hướng RAM, độ đầy đủ và vòng đời tiến trình |
| genres/data-explainer/canvas-spike.fixture.json | Dữ liệu tổng hợp có nguồn; năm vùng; định danh đối tượng; lộ trình camera; morph dùng chung dữ liệu |

Đây là implementation một phần. Chưa có bộ lấy mẫu tiến trình thực, bộ quan sát
crash/relaunch, composition TSX, render/encoding, kiểm MP4 hoặc workflow mới.
Bảy đường dẫn còn lại chưa có thay đổi trong bản làm việc. Bản tĩnh vẫn phải
render đủ từng khung khi triển khai renderer; fixture chưa chứng minh việc đó.

### 12.1. Bằng chứng kiểm tra và giới hạn

- Agent chính chạy lại: **28/28 kiểm thử đạt**, Node 24.19.0. Dùng native TS
  stripping và thay import test framework/module trong bộ nhớ để chạy đúng các
  assertion hiện có bằng node:test; không sửa file test để thực hiện phép kiểm.
- Chưa cài dependency. Chưa chạy Vitest thực, strict typecheck, Node 20, validate
  toàn repo, CI hoặc render. Kết quả trên không thay thế các bước đó.
- Fixture qua kiểm tra cấu hình cố định, tổng dữ liệu, nguồn synthetic, năm vùng,
  định danh duy nhất, các đoạn camera nối nhau, biên viewport tại keyframe/control
  point của arc, và morph dùng chung dữ liệu. Không chứng minh mọi đối tượng ở
  mọi khung đều hiện đúng, khả năng đọc chữ, font, parallax hoặc blur.
- Review độc lập đã phát hiện và sửa các trường hợp có thể PASS sai hoặc ném lỗi:
  root Chromium thoát nhưng snapshot không đổi; root/toàn cây RSS bằng 0; sự kiện
  vòng đời thừa hoặc mâu thuẫn; PID tái sử dụng sai thứ tự; identity đã thoát xuất
  hiện lại; mảng mẫu/tiến trình/sự kiện có phần tử khuyết. Các bằng chứng không đủ
  tin cậy này trả INCONCLUSIVE. Không thay ngưỡng số học ở mục 7.
- Bộ phân loại không tự xác minh tuyên bố treeComplete; bộ quan sát thực phải
  cung cấp và chứng minh điều đó. PASS ở đây chỉ nói về tiêu chí RAM trên bằng
  chứng được đưa vào, không chứng minh crash=0 hoặc mở cổng WP-005.
- Đã đối soát bản làm việc chỉ có bốn đường dẫn trên. Lỗi chuẩn hóa đường dẫn
  trong đoạn kiểm tra tạm đã được sửa và kiểm lại đạt; không sửa mã sản phẩm vì
  lỗi của đoạn kiểm tra đó.

Quy ước cửa sổ: completedFrames=N>0 thuộc cửa sổ chứa source frame N-1.
Vì vậy completed300 thuộc cửa sổ khung 0–299; completed301 thuộc 300–599;
completed5400 thuộc 5100–5399. Mẫu tiến độ 0 vẫn giữ ở cửa sổ đầu.
Median/P95 nội suy tuyến tính tại (n-1)×phân vị. Không loại warm-up, không giới hạn
tùy tiện số khung tiến được giữa hai mẫu; khoảng thời gian và đủ 18 cửa sổ vẫn
phải đạt điều kiện đã ghi. Không dùng dữ liệu giả làm bằng chứng benchmark.

### 12.2. Trình tự tiếp tục để bảo toàn mục tiêu

1. Tiếp tục phần chuẩn bị không cần cài trong quyền 120 phút còn lại; ghi rõ phần
   chưa được kiểm bằng runtime đích. Chủ dự án có thể đọc bản này trực tiếp trong
   ChatGPT, không cần sao chép file, dùng terminal hoặc thao tác GitHub.
2. Trước cài/push, giải quyết điều kiện dependency ở mục 4.2 bằng nguồn được phép.
   Hiện chưa có đủ bằng chứng cho toàn bộ cây. Không giải quyết bằng cách cấp
   thêm quyền chung, tự chọn phiên bản, tạo lockfile thiếu hoặc chuyển yêu cầu
   registry đã bị chặn qua công cụ/môi trường khác. Chưa có bước thao tác đơn
   giản nào của chủ dự án được xác minh là gỡ được blocker này.
3. Khi đủ metadata, trình danh sách dependency phát sinh cụ thể để chủ dự án
   review theo điểm dừng đã yêu cầu; sau đó mới cài khi đủ quyền, tích hợp phần
   còn lại, chạy validate/test/typecheck trong môi trường đích, kiểm diff 11 file
   và tính bất biến của mọi file ngoài phạm vi, rồi mở một PR theo quyền đã cấp.
4. Chủ dự án xem Files changed và Checks trên liên kết PR được cung cấp. Merge
   và preflight cần phê duyệt riêng. Trước benchmark phải khóa browser/font,
   xác minh cơ chế đo RAM/crash, license, chi phí và nơi giữ video/log đã được duyệt.
5. Chỉ khi được duyệt benchmark mới chạy một lượt gồm hai render đầy đủ, tĩnh
   rồi động, theo mục 6. Chủ dự án xem hai video trong trình duyệt và nghiệm thu
   hình ảnh; đối soát cả bốn acceptance và hai MP4. FAIL hoặc INCONCLUSIVE thì
   dừng và báo, không tự đổi phép thử/chạy lại. Chủ dự án quyết định ADR sau số
   đo thật; chỉ mở cổng WP-005 khi đã đủ nghiệm thu.

Mục tiêu được bảo toàn bằng phép thử và các điểm nghiệm thu cố định; chưa thể
cam kết canvas đạt hiệu năng trước khi có số đo render thật.

### 12.3. Sổ thời gian tại mốc chốt

Mốc chốt: 2026-09-10T16:41:29.141Z. Tính thời gian thực của lượt làm việc, không nhân
thời gian theo số agent song song và không tính thời gian chờ chủ dự án.

| Khoản | Thời gian |
|---|---|
| WP-004a cộng dồn trước lượt này | 55 phút 27 giây |
| Chuẩn bị PR đã dùng trước lượt này | 20 phút 28 giây |
| Lượt chuẩn bị offline này | 23 phút 10 giây |
| WP-004a cộng dồn đến mốc chốt | 78 phút 37 giây |
| Đã dùng trong quyền chuẩn bị PR 120 phút | 43 phút 38 giây |
| Còn lại trong quyền chuẩn bị PR | 76 phút 22 giây |

Không đặt lại sổ, không chuyển quyền hoặc thời gian từ WP-004 và không coi tổng
ngân sách đề xuất là đã được duyệt.

## 13. Lượt xử lý blocker tiếp theo — bản chuẩn bị chưa đủ điều kiện push

### 13.1. Những phần đã triển khai thêm

Checkpoint được kiểm lại và vẫn khớp toàn bộ mục 1. Bản làm việc hiện có chín
đường dẫn trong phạm vi 11 file. Đây là bản chuẩn bị riêng; GitHub chưa thay đổi.

- `scripts/canvas-spike.ts` bổ sung kiểm tính đầy đủ/nhất quán của preflight và
  bằng chứng nghiệm thu. `readyForReview` không cấp quyền thực thi; kết quả luôn
  giữ `authorizesExecution: false` và `opensWp005: false`.
- Hai MP4 phải có đủ số khung giải mã, fps/thời lượng phân số chính xác, kích
  thước đúng, progress thật, timer chung, cùng nguồn/tài nguyên/runner, hai chuỗi
  RAM thô, quan sát crash độc lập và xác nhận hình ảnh gắn hash cả hai MP4.
- Review độc lập phát hiện và sửa ba lỗ hổng: đổi tên browser nhưng dùng lại
  PID/starttime; dùng cùng nội dung MP4 cho hai bản; thời gian quan sát vượt trần
  job đã khai. Thiếu một render không xóa lỗi đã đo ở bản còn lại. Thiếu bằng
  chứng giữ kết luận tổng INCONCLUSIVE và vẫn hiển thị các gate FAIL đã biết.
- Agent chính chạy lại **44/44 kiểm thử đạt**, bằng Node 24.19.0 và adapter import
  trong bộ nhớ như mục 12.1. Chưa chạy Vitest, typecheck/Node 20 hoặc CI thật.
- `package.json` chuẩn bị pin đúng mười ứng viên trực tiếp đã nêu và thêm lệnh
  test offline; mọi setting/script/dependency cũ được giữ. `tsconfig.json` thêm
  DOM, node types, JSON import và TSX cho đúng composition. Chưa cài gói nào.
- `canvas-spike.tsx` có composition chung tĩnh/động, đối tượng luôn giữ định danh,
  ba lớp parallax, morph giữ giá trị, blur 3 px tại wrapper không scale và chờ
  đúng font với `retries: 0`. Chưa build bằng React/Remotion hoặc kiểm font thật.
- Runbook chỉ bổ sung mục WP-004a. Backlog chỉ đổi nội dung dòng WP-004a và giữ
  trạng thái `todo`; không ghi đã nghiệm thu. Các nội dung lịch sử nguyên vẹn.

Chưa tạo bản cập nhật `package-lock.json` cho cây dependency mới hoặc workflow
benchmark hoàn chỉnh; lockfile trên repo giữ nguyên. Không tạo lockfile thiếu
hoặc workflow giả có thể bị hiểu nhầm là benchmark đã nối. Script hiện là
bộ phân tích thuần; chưa có sampler, adapter renderer, kiểm MP4 thực hoặc đường
thực thi workflow. Chín file nháp không có nghĩa chín file đã hoàn tất DoD.

Hash/reference và phê duyệt trong input chỉ được kiểm tính nhất quán, không tự
chứng thực nội dung hoặc danh tính người duyệt. Bước đối soát dữ liệu thật và
quyền chủ dự án phải diễn ra bên ngoài bộ phân tích trước mọi thực thi.

### 13.2. Bằng chứng môi trường và chi phí đã bổ sung

- [Bảng browser chính thức](https://www.remotion.dev/docs/miscellaneous/chrome-headless-shell#version)
  ghi từ Remotion 4.0.452 dùng Chrome 149.0.7790.0, làm căn cứ cho ứng viên 4.0.523.
  Binary, VERSION, hash và thư viện hệ thống vẫn phải kiểm thực tế sau khi có quyền.
  Không để cơ chế browser quản lý tự xóa/tải lại trong vòng đo.
- [openBrowser](https://www.remotion.dev/docs/renderer/open-browser) và
  [renderMedia](https://www.remotion.dev/docs/renderer/render-media) cho phép truyền
  browser đã mở và tự quản lý đóng. Callback progress cho phép ghi số khung/worker;
  chúng không chứng minh crash=0. Chưa có bằng chứng đủ về PID/API quan sát crash
  và mọi đường retry/relaunch của đúng package 4.0.523; đây vẫn là blocker adapter.
- [delayRender](https://www.remotion.dev/docs/delay-render#retrying) có lựa chọn
  retries; bản font wait đặt 0. Không suy điều này thành toàn renderer không retry.
- [Fontsource subset imports](https://fontsource.org/docs/getting-started/subsets)
  là căn cứ cho các import latin-400/500/700/800 của Inter và latin-800 của Inter
  Tight. Chưa kiểm đường dẫn, license và hash file thực bên trong gói 5.2.5.
- [GitHub runner private](https://docs.github.com/en/actions/reference/runners/github-hosted-runners#standard-github-hosted-runners-for-private-repositories)
  niêm yết Ubuntu x64 tiêu chuẩn: 2 CPU, RAM 8 GB, SSD 14 GB. Label ubuntu-24.04
  không khóa image hằng tuần; phải ghi image/hardware/công cụ thực tế, giữ hai bản
  trong cùng job/VM. Không tự đổi lên runner lớn hơn khi không đạt.
- [Giá Actions](https://docs.github.com/en/billing/reference/actions-runner-pricing)
  cho Linux tiêu chuẩn là 0,006 USD/phút, làm tròn theo từng job. Nếu toàn job
  gồm setup, hai render, đối soát và cleanup không quá 75 phút, dự toán compute
  không khấu trừ quota là 0,45 USD. Đây là điều kiện dự toán, chưa phải trần tiền
  được duyệt; CI khác, lưu bằng chứng, license và thuế/phí áp dụng tính riêng.
  Chưa đọc billing, quota hoặc gói tài khoản của chủ dự án.
- [License FAQ](https://www.remotion.dev/docs/license/faq) có điều kiện miễn phí
  cho cá nhân/nhóm nhỏ và đánh giá chưa dùng thương mại. Chưa tự khai tư cách của
  chủ dự án hoặc kết luận license của mọi package đã kiểm. WP-004a là spike đánh
  giá riêng, không cấp quyền sử dụng sản xuất. Theo
  [telemetry SSR](https://www.remotion.dev/docs/telemetry), việc gửi phụ thuộc
  licenseKey; chưa thêm key hoặc gọi telemetry/provider.

### 13.3. Các điểm dừng còn hiệu lực

| Điểm dừng | Bằng chứng còn thiếu / cách xử lý |
|---|---|
| Cây dependency | Mười manifest chỉ đủ lớp đầu; còn phiên bản chưa giải quyết và các lớp tiếp theo. Cần nguồn metadata được phép, lockfile chính xác và review phần phát sinh trước cài/push. |
| Giới hạn truy cập | Lượt registry trước đã bị chính sách URL của công cụ trình duyệt từ chối. Không dùng proxy, công cụ/môi trường khác hoặc Actions để thực hiện gián tiếp yêu cầu bị chặn. Quyền chung trong chat không gỡ chính sách nền tảng. |
| Adapter thật | Kiểm source/type/lifecycle của đúng package được phép sử dụng; chứng minh quan sát toàn cây/crash và không retry. Không dùng stub để tuyên bố đã nối renderer. |
| Kiểm môi trường đích | Sau khi đủ dependency và quyền, mới cài, chạy Node 20/Vitest/validate/typecheck/build; sửa lỗi thực tế trong 11 file rồi review diff trước một PR. |
| Benchmark và nghiệm thu | Cần phê duyệt riêng sau merge/preflight cho browser, một benchmark hai render, trần chi phí và lưu bằng chứng. Chỉ số đo thật và nghiệm thu hình ảnh mới quyết định kết quả. |

Không coi việc hoàn thành test thuần hoặc tìm được tài liệu browser là đã gỡ
blocker metadata. Chưa có thao tác trên trình duyệt của chủ dự án được xác minh
là có thể gỡ chặn này mà không cần nguồn dữ liệu bổ sung hợp lệ. Không yêu cầu
chủ dự án sao chép từng manifest, chạy terminal hoặc gửi PAT/API key.

### 13.4. Sửa các lỗi hình học đã phát hiện

Camera nháp đầu có đoạn gần đứng yên kéo dài 284 bước khung và tốc độ góc viewport
vượt 800 px/giây. Phương án thử drift theo trục X trong bộ nhớ gây đảo hướng nên
đã bị loại, không ghi vào fixture. Không thêm pulse trang trí để che lỗi camera.

Bản sửa giữ canvas, output, 5.400 khung, năm vùng, morph, parallax, blur và hai
render như cũ. Chỉ chỉnh kế hoạch đường camera trước khi có bất kỳ benchmark nào:

| Keyframe cũ | Bản sửa |
|---|---|
| frame 720, x1300 | frame 720, x1440 |
| frame 2160, x3180 | frame 2040, x3340 |
| frame 3420, y1970 | frame 3420, y2080 |
| frame 4500, x2960 | frame 4320, x2940 |
| frame 5399, x1210 | frame 5399, x1450 |

Segment và plannedFocusFrames liên quan được cập nhật cùng nhau. Camera có phần
tiến đều 8 world px/giây dọc đường đi và phần quãng đường còn lại dùng đúng
cubic-bezier(0.22,1,0.36,1). Arc dùng bảng xấp xỉ độ dài 256 mẫu. Đây là hai thành
phần chuyển động của cùng camera, không phải đổi easing thành linear hoặc xoay
canvas. Các endpoint và hướng tiến dọc đường đều được đối soát.

Nguồn chung đã được thay bằng năm nguồn SVG riêng, luôn giữ mounted tại từng
chart; cỡ chữ được bù scale để giữ 24 px output. Nguồn theo góc dưới trái của phần
chart đọc được; clamp mép trái khi close-up và fade khi nhãn chart rời vùng an
toàn. Publisher dùng tên chuẩn ngắn Meridian, giữ publisherFullName là Meridian
Studio; vẫn có ngày và synthetic. Không ghép từ hoặc bỏ nguồn để né ngân sách chữ.
Một đường lưới vượt biên x6000 trong bản nháp cũng đã được bỏ.

Agent chính đã chạy lại trực tiếp các export thuần của file TSX qua toàn bộ
5.400 khung; loại import và registerRoot trong bộ nhớ, dùng fixture và channel
tokens đã đối chiếu. Không gọi component, React/Remotion, hook, font hoặc browser;
không tạo ảnh/video. Kết quả toán học:

| Kiểm tra | Kết quả |
|---|---|
| Camera hữu hạn, viewport nằm trong canvas, endpoint đúng | Đạt tại toàn bộ khung/endpoint đã kiểm |
| Static model giữ nguyên; định danh data marks giữ nguyên | Đạt |
| Morph đầu/cuối và các giá trị dùng chung | Đạt |
| Số từ đồng thời theo bounds bảo thủ | Tối đa 12 |
| Nguồn chồng nhau / thiếu nguồn trong plannedFocusFrames | 0 / 0 |
| Cỡ nguồn sau scale | 24 px |
| Khoảng gần đứng yên theo sáu điểm tham chiếu đã kiểm | 0; dịch chuyển lớn nhất trong bộ điểm mỗi bước thấp nhất 0,273311 px |
| Tốc độ lớn nhất tại góc/điểm tham chiếu toàn canvas, lớp 0,3 / 1 / 1,3 | 473,19 / 656,26 / 736,18 px/giây |

Ngưỡng chẩn đoán dịch chuyển 0,01 px trong phép quét không phải acceptance mới;
không dùng nó thay cho đánh giá chuyển động có ý nghĩa. Phép đo tốc độ chỉ bao
phủ các điểm/phép biến đổi được kiểm, không là bằng chứng motion blur thực tế.

Fixture giữ camera/source ở trạng thái
`MATHEMATICAL_FINDING_RESOLVED_VISUAL_PENDING`, `geometryRendered: false` và
`visualAcceptance: PENDING`. Còn phải kiểm glyph/font, nhãn–nét/nguồn ở lúc chuyển
vùng, tính liên tục nhìn thấy, nhịp camera và hình ảnh thật. Chưa typecheck generic
React/Remotion của composition. Kiểm hình học này cần được nối vào suite dự án
khi tích hợp với bộ dependency thật; 44 test hiện tại là suite cấu hình/RAM/gates.

### 13.5. Bước tiếp theo cụ thể

1. Chủ dự án đọc mục 13 để biết phần đã sửa và phần chưa đủ bằng chứng; không
   cần tải từng manifest hoặc tự dán code vào GitHub. Quyền chuẩn bị PR còn lại
   vẫn có hiệu lực, không cần duyệt lại.
2. Cổng cần giải quyết trước tiên là metadata dependency được phép truy cập.
   Hiện agent chưa có đường đọc hợp lệ đã xác minh để hoàn tất cây; không xin
   một phê duyệt chung hoặc bịa danh sách phiên bản để che điểm chặn này.
3. Agent tiếp tục viết/kiểm các phần thuần bằng dữ liệu tổng hợp trong 11 file
   mà không cần cài dependency: giải mã số đo, kiểm bằng chứng và điều kiện dừng.
   Sau khi có nguồn metadata đủ kiểm, agent trình bảng phát sinh chính xác,
   giữ điểm dừng trước cài/push; rồi hoàn thiện lockfile, tích hợp adapter/workflow
   và kiểm môi trường đích trước khi mở một PR. Chặn cài/push không chặn mọi sửa
   mã offline đã được duyệt; đây là sửa thứ tự kế hoạch, không mở rộng quyền.
4. Chủ dự án xem diff/checks của PR khi có liên kết. Merge, chuẩn bị browser,
   benchmark và lưu bằng chứng vẫn cần phê duyệt riêng. Không coi yêu cầu xử lý
   mọi blocker là quyền tự mua gói, đổi settings, dùng key hoặc chạy thêm.
5. Giữ bốn acceptance và nghiệm thu hình ảnh. Bất kỳ FAIL/INCONCLUSIVE nào ở
   lượt thật đều dừng; chưa mở cổng WP-005 hoặc Layout Gallery.

### 13.6. Sổ thời gian tại mốc chốt lượt xử lý blocker

Mốc chốt: 2026-09-10T17:15:28.104Z. Thời gian agent song song không được nhân lên;
không tính thời gian chờ chủ dự án, không chuyển ngân sách từ WP-004.

| Khoản | Thời gian |
|---|---|
| Cộng dồn WP-004a trước lượt này | 78 phút 37 giây |
| Chuẩn bị PR đã dùng trước lượt này | 43 phút 38 giây |
| Lượt xử lý blocker này | 27 phút 20 giây |
| Cộng dồn WP-004a đến mốc chốt | 105 phút 57 giây |
| Đã dùng trong quyền chuẩn bị PR 120 phút | 70 phút 58 giây |
| Còn lại trong quyền chuẩn bị PR | 49 phút 02 giây |

Dừng trước cài/push tại blocker đã nêu; thời gian còn lại chưa cấp quyền thực thi
benchmark hoặc bất kỳ ngân sách tổng đề xuất nào.

## 14. Xử lý tiếp phần có thể hoàn tất và xác định đúng giới hạn truy cập

### 14.1. Kết quả kiểm tra quyền

Checkpoint đầu lượt vẫn khớp mục 1, gồm toàn bộ 84 run đã hoàn tất và 31 Hello.
Không đổi checkpoint, truy cập repo dự án khác hoặc thực hiện yêu cầu registry
bị từ chối qua đường khác.

Công cụ quyền của plugin hiện có chỉ điều chỉnh chế độ hỏi/phê duyệt thao tác;
nó không cung cấp quyền sửa allowlist tên miền. Không đổi chế độ quyền để thử
gỡ lỗi URL. Trong các công cụ hiện được cung cấp, chưa tìm thấy thao tác cấp
quyền mạng có thể giải quyết từ chối này.

[Tài liệu OpenAI về internet access](https://learn.chatgpt.com/docs/cloud/internet-access)
mô tả thiết lập theo environment cho Codex cloud, gồm allowlist và HTTP methods.
Chưa có bằng chứng thiết lập đó điều khiển chính sách URL của control-browser
trong phiên ChatGPT Work này. Vì vậy không hướng dẫn chủ dự án đổi môi trường,
bật quyền rộng, dùng Actions/proxy hoặc lặp lại registry như một cách gỡ chặn.

Đây là giới hạn quyền truy cập của nền tảng đã từ chối lượt đọc registry trước;
không phải thiếu PAT, quyền ghi repo hoặc một câu phê duyệt chung của chủ dự án.
Không tạo yêu cầu hỗ trợ thay chủ dự án, không yêu cầu sao chép từng manifest.

### 14.2. Phân biệt phần chuẩn bị và cổng thực thi

| Hạng mục | Việc tiếp tục được trong phạm vi đã duyệt | Điều kiện chưa được thay bằng test giả |
|---|---|---|
| Đọc số đo RSS/MP4 | Viết parser, kiểm dữ liệu thiếu/sai/race bằng fixture | Quan sát toàn cây Chromium và crash thật; giải mã hai MP4 thật |
| Kiểm FPS | Đối soát timestamp từng khung bằng số nguyên/phân số | FPS trung bình không chứng minh nhịp 30 fps của mọi khung |
| Thời gian | Giữ timer render và kiểm tỷ lệ đã chốt | Deadline toàn job phải gồm setup, bundle, kiểm MP4, lưu bằng chứng, cleanup; hai render không chứng minh chi phí toàn job |
| Dependency | Đối chiếu mười manifest đã có; bảo toàn phiên bản cũ | Cây đầy đủ, lockfile nhất quán, phần phát sinh được duyệt trước cài/push |
| Tích hợp renderer | Review code và tài liệu công khai được phép | API/type đúng phiên bản, lifecycle/crash/retry, font thật, Node 20/Vitest/typecheck/build |
| Quyết định canvas | Chuẩn bị phép đo và quy tắc kết luận | Hai render thật và nghiệm thu hình ảnh; WP-005 vẫn đóng |

Thứ tự mục 13.5 đã được sửa: thiếu metadata không ngăn việc chuẩn bị parser hoặc
kiểm logic offline. Tuy nhiên không tạo một workflow giả, lockfile thiếu hoặc PR
có thể bị hiểu là đã nối được benchmark để vượt điểm dừng cài/push.

### 14.3. Phần mã đã sửa và kiểm trực tiếp trong lượt này

Chỉ sửa thêm hai file mã/test đã thuộc phạm vi: `scripts/canvas-spike.ts` và
`scripts/canvas-spike.test.ts`; cập nhật WP này và phần WP-004a của runbook.

- `parseProcStat` giữ starttime dạng chuỗi nguyên, xử lý tên tiến trình chứa
  khoảng trắng/ngoặc. RSS pages được giữ riêng, không đoán kích thước page.
- `parseProcStatus` đọc VmRSS hiện tại theo kB × 1024, không dùng VmHWM/VmPeak.
  `parseProcessRssObservation` đối chiếu stat-before/status/stat-after để phát
  hiện PID reuse, sai thread group/parent, zombie và dữ liệu mất. Kết quả luôn
  giữ `treeComplete: false`, `crashObservationComplete: false`; procfs accounting
  là bất đồng bộ, không được gọi là snapshot nguyên tử hoặc quan sát crash đủ.
- `parseFfprobeVideo` đọc JSON/số khung đã giải mã, phân số rate/time_base,
  duration_ticks và duration toàn container riêng; không lấy nb_frames khai báo
  để thay nb_read_frames. Lỗi đọc/diagnostics/dữ liệu không rõ phải được đối soát.
- `evaluateFrameCadence` dùng BigInt kiểm 5.400 duration và 5.399 khoảng PTS.
  Gate nghiệm thu tĩnh/động tự tính lại từ dữ liệu thô; thiếu/malformed/duration
  chưa biết giữ INCONCLUSIVE. PTS lặp/đảo/nhịp biến thiên có đủ bằng chứng là FAIL.
  FPS trung bình bằng 30 không còn đủ để vượt cổng này.
- Review độc lập không phát hiện lỗi mới cần sửa trong phần decoder/cadence.
  Agent chính chạy lại **57/57 kiểm thử đạt**, gồm 44 test cũ và 13 nhóm mới,
  dùng Node 24.19.0 cùng adapter import/framework trong bộ nhớ. Không cài package,
  không gọi component/browser/FFmpeg. Đây chưa phải Vitest/Node 20/typecheck/CI.

Nguồn kỹ thuật đã đối chiếu: [Linux procfs](https://www.kernel.org/doc/html/latest/filesystems/proc.html),
[ffprobe](https://ffmpeg.org/ffprobe.html),
[AVStream](https://ffmpeg.org/doxygen/trunk/structAVStream.html),
[AVFrame](https://ffmpeg.org/doxygen/trunk/structAVFrame.html).
Các trang API FFmpeg hiện hành không chứng minh phiên bản trên runner có cùng
schema. Parser hiện yêu cầu `frame.pts` và `frame.duration`; phải xác minh với
ffprobe được chốt trước tích hợp thực tế, không tự đổi công cụ hoặc fallback
sang field khác trong benchmark. Không suy `valid: true` thành video được nghiệm
thu: adapter phải kiểm cadence, duration toàn container và đối soát với duration
stream, loại container, command thật và hash của đầu vào/đầu ra.

Chưa có sampler live, process lifecycle observer, renderer adapter, ffprobe
invocation hoặc workflow hoàn chỉnh. Phần chuẩn bị còn chín đường dẫn; kiểm
phạm vi xác nhận không có file ngoài danh sách, setting/dependency/script cũ của
package giữ nguyên, runbook chỉ bổ sung, backlog chỉ dòng WP-004a và vẫn todo.
Lockfile trên repo giữ nguyên. Không mở PR hoặc phát sinh CI/dispatch/render.

### 14.4. Bước tiếp theo và điều kiện tiếp tục

1. Chủ dự án có thể mở bản WP này và xem mục 14; không cần sao chép code, tải
   từng manifest, chạy lệnh hoặc cấp lại quyền chuẩn bị PR đã có.
2. Cổng còn chặn cài/push là nguồn metadata được phép cho cây dependency đầy đủ.
   Muốn vượt cổng này phải có thay đổi quyền truy cập chính thức áp dụng đúng
   môi trường/công cụ, hoặc dữ liệu có nguồn gốc kiểm được đã được cung cấp hợp
   lệ. Chưa xác minh được một nút trên trình duyệt của chủ dự án thực hiện được
   việc này; không đưa thao tác phỏng đoán hoặc nhờ người chạy hộ yêu cầu bị chặn.
3. Khi có đầu vào hợp lệ, lượt tiếp tục phải kiểm lại checkpoint, lập bảng phát
   sinh chính xác để duyệt trước cài/push, hoàn thiện lockfile, tích hợp thật và
   chạy các kiểm tra dự án. Sau đó mới mở một PR theo quyền đã cấp còn thời gian.
4. Chủ dự án xem diff và Checks của PR khi có liên kết. Merge, chuẩn bị tài nguyên,
   một benchmark hai render, trần tiền và nơi lưu bằng chứng vẫn là phạm vi duyệt
   riêng. Giữ nguyên bốn acceptance và nghiệm thu hình ảnh; chưa mở WP-005.

### 14.5. Sổ thời gian tại mốc chốt lượt này

Mốc chốt: 2026-09-10T17:56:02.449Z. Chỉ tính thời gian thực của lượt làm việc; không nhân thời
gian agent song song hoặc tính thời gian chờ chủ dự án.

| Khoản | Thời gian |
|---|---|
| WP-004a cộng dồn trước lượt này | 105 phút 57 giây |
| Chuẩn bị PR đã dùng trước lượt này | 70 phút 58 giây |
| Lượt này | 17 phút 27 giây |
| WP-004a cộng dồn đến mốc chốt | 123 phút 24 giây |
| Đã dùng trong quyền chuẩn bị PR 120 phút | 88 phút 25 giây |
| Còn lại trong quyền chuẩn bị PR | 31 phút 35 giây |

Không đặt lại sổ hoặc chuyển quyền/ngân sách từ WP-004. Main được đọc lại trước
mốc chốt vẫn là `be9e72620e4c6195fd30076af2012900d84c3eb6`. Chưa cài/push/mở PR;
không coi tổng ngân sách đề xuất là đã có hiệu lực.

## 15. Đối chiếu ảnh hưởng lên kế hoạch tổng thể

Đã đọc lại backlog, delivery plan, DoD và WP-006a tại checkpoint đã duyệt.
Main/tree/state/checks/lịch sử vẫn khớp mục 1: 103 file, state 88 byte và đúng
SHA-256, CI/Hello success attempt 1, 84 run gồm 31 Hello, không có run đang chạy.

WP-004a vẫn todo; bản chuẩn bị/test giả chưa đủ để mở WP-005. Backlog đặt WP-005
sau WP-004a; WP-006 và WP-007 sau WP-005; WP-008 sau WP-006/WP-007; WP-009 sau
WP-008. Vì vậy First Light 60 giây của Wave 2 chịu ảnh hưởng trực tiếp. Delivery
plan không cho sang wave sau trước DoD wave hiện tại; không tự nhảy sang code
Wave 3 để tránh cổng canvas. Wave 1 đã nghiệm thu và các hồ sơ đóng giữ nguyên.

Phát hiện các điểm chưa thống nhất trong tài liệu nguồn, chỉ báo cáo, chưa sửa:
- Backlog ghi WP-006 là ba layout đầu; delivery plan và WP-006a ghi năm.
- Backlog đặt WP-006a phụ thuộc WP-006; đầu WP-006a ghi phụ thuộc WP-005.
- Các dòng quanh WP-011 và WP-021 trong backlog có nội dung chèn/lặp/lệch cột,
  gồm lặp WP-009b và WP-017a cùng các dòng WP-010/WP-016 thiếu cột.

Những điểm này cần được chốt trước khi giao WP tương ứng. Không tự chọn quy tắc
thay thế hoặc sửa delivery plan/WP-006a; hai file đó nằm ngoài phạm vi, và backlog
hiện chỉ được phép sửa dòng WP-004a. Không coi chuẩn hóa tài liệu là đã giải quyết
metadata hoặc kiểm chứng canvas.

Kế hoạch repo dùng wave, không có lịch ngày hoàn thành để tính chính xác số ngày
trễ. Timebox một ngày của spike không là bằng chứng sẽ xong trong một ngày khi
nguồn dependency còn bị chặn. Chưa có số đo thật để kết luận canvas thất bại.
Cần ước lượng lại phần tích hợp/CI sau khi có cây dependency; không mặc định thời
gian chuẩn bị còn lại đủ hoàn tất và không tự cộng ngân sách.

### Sổ thời gian lượt đối chiếu kế hoạch

Mốc chốt: 2026-09-10T23:49:32.318Z. Không có sửa code, cài gói, ghi GitHub hoặc thực thi.
Chỉ bổ sung kết luận và sổ này trong bản WP đã thuộc phạm vi.

| Khoản | Thời gian |
|---|---|
| WP-004a cộng dồn trước lượt này | 123 phút 24 giây |
| Chuẩn bị PR đã dùng trước lượt này | 88 phút 25 giây |
| Đọc và đối chiếu kế hoạch lượt này | 2 phút 51 giây |
| WP-004a cộng dồn đến mốc chốt | 126 phút 15 giây |
| Đã dùng trong quyền chuẩn bị PR 120 phút | 91 phút 16 giây |
| Còn lại trong quyền chuẩn bị PR | 28 phút 44 giây |

Không tính thời gian chờ chủ dự án; không dùng lại WP-004 hoặc coi ngân sách tổng
đề xuất là đã được duyệt.

## 16. Hướng dẫn chủ dự án và đề xuất gói tài liệu riêng — chưa duyệt sửa

Checkpoint được kiểm lại trong lượt này, vẫn khớp main/tree, 103 file, state
88 byte và SHA-256, sáu checks, CI/Hello attempt 1, 84 run/31 Hello/không run active.

Đề xuất cụ thể, chỉ tính trong bộ nhớ, chưa sửa các file nguồn:
- WP-006: đổi tên từ Ba layout đầu sang Năm layout đầu, giữ Wave 2/WP-005/todo.
- WP-006a: sửa dependency trong đầu WP thành WP-006 cho khớp backlog.
- Backlog: đưa WP-011/WP-021 về đúng năm cột, giữ lần lượt dependency WP-009a và
  WP-015a đang đọc được ở cột dependency. Xóa bản lặp thứ hai của WP-009b/WP-017a
  và hai dòng cụt WP-010/WP-016; giữ các dòng đầy đủ ban đầu.
- Đối chiếu trong bộ nhớ: hết dòng sai số cột và ID trùng; toàn bộ dòng done
  giữ nguyên. Chưa xác nhận các dependency nghiệp vụ khác đã đủ, chưa đặc tả
  hoặc chuẩn hóa toàn bộ Output/Files in scope của Gallery.

Delivery plan đã ghi năm layout và Gallery sau dựng layout nên không cần sửa
cho ba điểm trên. Phạm vi triển khai đề xuất tối thiểu là một gói mới
WP-DOC-001 gồm ba file:
1. engine/ops/work-packages/WP-DOC-001-plan-consistency.md — đặc tả/phạm vi/kiểm tra.
2. engine/ops/backlog.md — các sửa cụ thể trên và dòng theo dõi WP-DOC-001.
3. engine/ops/work-packages/WP-006a-layout-gallery.md — chỉ dependency ở đầu file.

Đây là đề xuất, chưa tạo WP mới hoặc nhánh/PR. Đề xuất trần riêng 20 phút để
chuẩn bị một PR tài liệu và đọc CI tự động; chưa có hiệu lực, không lấy từ quyền
WP-004a còn lại. Merge duyệt riêng. Guardrails/AGENTS và giới hạn backlog chỉ
dòng WP-004a là lý do phải duyệt phạm vi mới trước sửa.

Gói tài liệu không gỡ blocker registry/lockfile, không hoàn tất WP-004a hoặc
mở WP-005. Không hướng dẫn một nút settings chưa xác minh; không yêu cầu chủ
dự án sao chép file, chạy terminal, gửi PAT hoặc thực hiện hộ request bị chặn.

### Sổ thời gian lượt hướng dẫn

Mốc chốt: 2026-09-11T00:00:27.072Z. Lượt này chỉ đọc, tính đề xuất trong bộ nhớ và ghi hướng dẫn/
sổ thời gian tại WP đã thuộc phạm vi; chưa sửa code hoặc ghi GitHub.

| Khoản | Thời gian |
|---|---|
| WP-004a cộng dồn trước lượt này | 126 phút 15 giây |
| Chuẩn bị PR đã dùng trước lượt này | 91 phút 16 giây |
| Lượt hướng dẫn và chốt đề xuất này | 3 phút 28 giây |
| WP-004a cộng dồn đến mốc chốt | 129 phút 43 giây |
| Đã dùng trong quyền chuẩn bị PR 120 phút | 94 phút 44 giây |
| Còn lại trong quyền chuẩn bị PR | 25 phút 16 giây |

Không tính thời gian chờ chủ dự án; không chuyển thời gian/quyền giữa WP.

## 17. Sửa offline sau khi chốt checkpoint mới — chưa cài/push

### 17.1. Căn cứ và phạm vi lượt này

Chủ dự án yêu cầu “Tiếp tục sửa offline WP-004a” theo đề xuất sửa đúng năm file,
tối đa 20 phút lấy từ 25 phút 16 giây còn lại của quyền chuẩn bị PR. Đây không
phải 20 phút ngân sách bổ sung. Lượt này không tạo commit, push, PR hoặc CI.

Checkpoint hiện hành ở mục 1 đã được đối soát đầu và cuối lượt: main
`8a6099724bf9afd7d8dabfdb18e125052c8c213e`, tree
`72bbbf201d57e20d5cfd3aec85d2b65432e51e7e`, 104 file; state đúng blob, 88 byte,
newline và SHA-256 đã chốt. CI 34551080684 và Hello 34551080719 success attempt 1;
validate/typecheck/guardrails-push/verify đạt, heartbeat/send-hello skipped.
93 run, 35 Hello, không run active, không PR mở tại lần đọc cuối.
Đây là checks của main hiện hành, chưa kiểm code WP-004a trong bản nháp.

WP-DOC-001 đã được chủ dự án nghiệm thu và đóng sau [PR #12](https://github.com/HungQuach301/meridian-studio/pull/12).
Các đề xuất “chưa duyệt” trong mục 15–16 là lịch sử trước đó, không còn là
trạng thái của WP-DOC-001. Lượt này giữ hồ sơ đóng và các sửa tài liệu của gói đó;
không dùng thời gian/quyền của WP-DOC-001 cho WP-004a.

| File sửa trong bản nháp | Thay đổi |
|---|---|
| engine/ops/work-packages/WP-004a-canvas-spike.md | Cập nhật checkpoint hiện hành, rubric RAM và hồ sơ lượt này; giữ lịch sử |
| scripts/canvas-spike.ts | Chặn PASS khi còn tăng dương hoặc tăng không giảm bị phép tổng hợp che khuất |
| scripts/canvas-spike.test.ts | Sửa kỳ vọng hồi quy sai và thêm năm test gồm nhiều trường hợp tổng hợp |
| engine/docs/05-runbook.md | Chỉ sửa phụ lục WP-004a: checkpoint, rubric RAM, trạng thái browser ứng viên |
| engine/ops/backlog.md | Lấy từ main mới, chỉ đổi dòng WP-004a; giữ todo và mọi dòng khác |

Bốn file nháp package.json, tsconfig.json, composition và fixture có SHA-256,
mode giữ nguyên so với đầu lượt. Không tạo helper hoặc đường dẫn mới; thư mục
bản nháp vẫn chín file. Chưa có lockfile mới hoặc workflow canvas-spike hoàn chỉnh.
Đối soát backlog: 36 dòng WP, mỗi dòng năm cột, không ID trùng; thay ngược đúng
dòng WP-004a thì nội dung bằng nguồn main mới. Phần runbook trước phụ lục WP-004a
bằng nguồn main mới. Không sửa pipeline/state.json hoặc các hồ sơ đã đóng.

### 17.2. Lỗi sửa và bằng chứng kiểm offline

Lỗi cũ: chuỗi 18 median tăng từ 678 đến 712 MiB theo bước 2 MiB có G=30 MiB,
S=34 MiB, epsilon=34 MiB nhưng được PASS. Test cũ còn khẳng định kỳ vọng sai đó.
Việc test từng đạt trước đây không chứng minh rubric cũ đáp ứng acceptance RAM.

Rubric mục 7 và code hiện thống nhất:
- Giữ thứ tự dữ liệu thiếu/không tin cậy → INCONCLUSIVE, trước mọi kết luận số học.
- Giữ FAIL khi cả G và S > 2 × epsilon.
- Tăng dương của G hoặc S chưa đủ FAIL → INCONCLUSIVE, kể cả dưới epsilon.
- Kiểm cả chuỗi RSS thô và 18 median không giảm nhưng cuối lớn hơn đầu, để bước
  tăng rất sớm/muộn không bị median hoặc Theil–Sen che khuất.
- Chỉ PASS khi không còn các điều kiện tăng trên và phần đuôi đáp ứng mục 7.
  Chuỗi tăng có một lần sụt không được PASS chỉ vì xuất hiện lần sụt đó.
- Không đổi canvas, blur, frame count, concurrency, timing/crash/ratio, yêu cầu
  hai MP4 hoặc nghiệm thu hình ảnh. Không cấp quyền thử lại benchmark.

Kiểm thực tế bằng Node 24.19.0, đọc TypeScript có sẵn bằng cơ chế loại bỏ type
của Node; chỉ ánh xạ import vitest sang node:test và import .js sang source .ts
trong bộ nhớ. Không tạo file harness, không cài dependency, không gọi browser,
component, renderer, sampler live hoặc ffprobe.

Lượt chạy đầu: 61/62 đạt; test tích hợp mới tra nhầm tên gate “ram” thay vì
“memory”. Đã sửa tên tra cứu, không thay kết quả kỳ vọng để làm test xanh.
Lượt chạy xác minh cuối: **62/62 đạt**, exit 0, không skip/cancel.
Bao gồm tăng nhỏ ở nhiều baseline, một lần sụt ở mẫu/cửa sổ, bước tăng đầu/cuối,
mẫu thô tăng bị median che, đối chứng phẳng/giảm và tăng nhỏ trong từng render
tĩnh/động làm toàn bộ nghiệm thu INCONCLUSIVE. Các test thiếu bằng chứng,
lifecycle, crash, cấu hình, cadence và giới hạn thời gian có sẵn tiếp tục đạt.

Đây là kiểm logic với dữ liệu tổng hợp. Chưa chạy Vitest theo package của repo,
Node 20, typecheck hoặc CI cho bản nháp; chưa có đo RSS/render thật. Một PASS
của hàm phân loại không tự xác thực nguồn dữ liệu đầu vào, cấp quyền thực thi
hoặc mở WP-005.

### 17.3. Blocker còn lại và bước tiếp theo của chủ dự án

1. Mở mục 7 và mục 17 của bản WP này để xem rubric và kết quả sửa; có thể xem
   trực tiếp các file nháp, không cần sao chép code hoặc chạy lệnh.
2. Giữ điểm dừng trước cài/push. 10 manifest hiện có chỉ xác định lớp đầu;
   28 phụ thuộc bổ sung chưa phải cây đầy đủ và chưa được duyệt thêm. Quyền
   chuẩn bị PR đã có vẫn hiệu lực trong phần thời gian còn lại, nhưng không
   bỏ qua điều kiện dependency mà chủ dự án đã đặt.
3. Cần nguồn metadata hợp lệ cho phần thiếu hoặc thay đổi quyền truy cập chính
   thức có thể xác minh. Chưa có bằng chứng chặn URL registry đã được gỡ; không
   dùng công cụ/môi trường khác để thực hiện hộ request bị chặn. Không yêu cầu
   chủ dự án tải hàng loạt manifest, gửi token hoặc làm thao tác settings phỏng đoán.
4. Khi có đầu vào hợp lệ, agent xác minh checkpoint, đưa bảng dependency phát sinh
   có phiên bản/integrity/license/lifecycle để chủ dự án duyệt trước cài/push.
   Sau đó mới khóa dependency, hoàn thiện sampler/lifecycle/renderer/ffprobe/
   workflow và chạy Node 20/Vitest/validate/typecheck. Phải ước lượng lại công
   việc tích hợp theo thời gian còn lại; không mặc định phần dư đủ làm xong PR.
5. Browser vẫn là ứng viên chưa xác minh; font chi tiết/hash, môi trường, license,
   trần chi phí và nơi lưu bằng chứng chưa hoàn tất. Merge, chuẩn bị tài nguyên
   và một benchmark hai render vẫn cần phê duyệt riêng sau khi đủ điều kiện.

WP-004a vẫn todo và chưa nghiệm thu. Cổng WP-005/Layout Gallery giữ đóng;
First Light của Wave 2 vẫn phụ thuộc kết quả canvas thật. Việc sửa offline giảm
rủi ro kết luận RAM sai, chưa giải quyết blocker truy cập/dependency hoặc tạo số
đo hiệu năng để xác nhận mục tiêu. Không thay lịch sử WP-003/WP-004 hoặc thử lại Sites.


### 17.4. Sổ thời gian tại mốc chốt sửa offline

Mốc chốt: 2026-09-11T03:18:25.881Z. Thời gian chờ phản hồi của chủ dự án không tính vào sổ.

| Khoản | Thời gian |
|---|---|
| WP-004a cộng dồn cuối mục 16 | 129 phút 43 giây |
| Lượt read-only chốt checkpoint và rà blocker đã hoàn tất, ngân sách riêng | 8 phút 10 giây |
| WP-004a cộng dồn trước lượt sửa offline này | 137 phút 53 giây |
| Chuẩn bị PR đã dùng trước lượt này | 94 phút 44 giây |
| Lượt sửa offline này, trừ từ phần chuẩn bị PR còn lại | 13 phút 27 giây |
| WP-004a cộng dồn đến mốc chốt | 151 phút 20 giây |
| Đã dùng trong quyền chuẩn bị PR 120 phút | 108 phút 11 giây |
| Còn lại trong quyền chuẩn bị PR | 11 phút 49 giây |

Lượt này nằm trong trần 20 phút đã chấp nhận và không cộng thêm vào quyền 120 phút.
WP-DOC-001 đã đóng với sổ riêng 30 phút 33 giây, không nhập vào các số trên.
Không đặt lại sổ, lấy ngân sách WP-004 hoặc coi tổng ngân sách đề xuất là đã duyệt.

## 18. Tiếp tục offline: kiểm thời gian toàn job

### 18.1. Vấn đề và thay đổi

Chủ dự án yêu cầu “Xử lý tiếp đi”. Tiếp tục trong quyền chuẩn bị PR còn
11 phút 49 giây, giữ điểm dừng trước cài/push và mọi quyền thực thi riêng.

Bản trước chỉ có `observed-job-span`, đo từ render đầu tới render cuối.
Một khoảng render nằm trong trần chưa chứng minh toàn job nằm trong trần:
setup, bundle, kiểm MP4, lưu bằng chứng và cleanup có thể làm job vượt giới hạn.
Đây là khoảng trống trong việc đối soát giới hạn đã nêu ở runbook, không phải
kết quả render thật hoặc lý do đổi bốn acceptance của canvas.

Đã bổ sung `jobTiming` trong bản ghi nghiệm thu offline:
- Tham chiếu bằng chứng và SHA-256; binding cùng source, tài nguyên, môi trường,
  runner job và clock của preflight.
- Ranh giới `job-start-through-final-cleanup`, `complete=true`, timestamp đầu/cuối
  hữu hạn, không âm và cuối lớn hơn đầu.
- `job-timing`: thiếu, sai binding/ranh giới hoặc chưa đầy đủ → INCONCLUSIVE.
- `job-time-limit`: thời gian đầy đủ vượt trần job đã chốt → FAIL; bằng trần
  được chấp nhận. Không có thời gian/giới hạn hợp lệ → INCONCLUSIVE.
- `static.job-coverage` và `dynamic.job-coverage`: khoảng job phải bao trùm từng
  render. Bản ghi mâu thuẫn → INCONCLUSIVE.
- Giữ `observed-job-span` như phép kiểm phần thời gian render đã quan sát.
  Thiếu render không xóa FAIL đã biết của toàn job; tổng thể vẫn INCONCLUSIVE
  khi thiếu bằng chứng, và từng lỗi đã biết vẫn hiện rõ.

Không đo hoặc suy chi phí thực tế trong hàm này. Các giá trị ngân sách trong
test là dữ liệu tổng hợp, không phải phê duyệt chi tiêu. Validator chỉ đối soát
bản ghi được đưa vào; chưa xác thực hash với artifact thật, chưa có observer
toàn job hoặc controller cưỡng chế deadline. Timeout trước khi lưu đủ bằng
chứng không được tự chuyển thành bản ghi hoàn tất.

### 18.2. Kiểm thực tế và phạm vi

**67/67 test tổng hợp đạt**, exit 0; không skip/cancel. Node 24.19.0 với ánh xạ
import trong bộ nhớ như mục 17, không cài dependency hoặc tạo harness file.
Thêm năm test gồm ngưỡng toàn job bằng trần/vượt 1 ms, hai render đạt nhưng job
vượt trần, thiếu/malformed/incomplete record, khác source/runner/clock, khoảng
job không bao trùm render và giữ FAIL của job khi thiếu một render.

Các ca RAM của lượt trước và kiểm cấu hình, MP4/cadence, crash, thứ tự render,
timer động/ratio và nghiệm thu hình ảnh bằng bản ghi tổng hợp tiếp tục đạt.
Chưa chạy Node 20/Vitest, typecheck hay CI cho bản nháp; không có browser,
render, số đo RAM hoặc thời gian job thật.

Chỉ sửa bốn file, đều nằm trong phạm vi đã duyệt:
1. scripts/canvas-spike.ts — thêm bản ghi và kiểm toàn job.
2. scripts/canvas-spike.test.ts — bổ sung dữ liệu tổng hợp và các ca hồi quy.
3. engine/ops/work-packages/WP-004a-canvas-spike.md — mục 6 và hồ sơ mục 18.
4. engine/docs/05-runbook.md — chỉ phụ lục WP-004a.

Backlog, package.json, tsconfig.json, composition và fixture giữ nguyên so với
đầu lượt. Không tạo file mới; bản nháp vẫn chín file. Nguồn runbook có sẵn giữ
nguyên; bản nháp backlog tiếp tục chỉ khác main ở dòng WP-004a và giữ DOC-001 done.

Checkpoint được đọc lại đầu/cuối vẫn là main
`8a6099724bf9afd7d8dabfdb18e125052c8c213e`, tree
`72bbbf201d57e20d5cfd3aec85d2b65432e51e7e`, 104 file, state 88 byte/newline/
blob/SHA-256 đã chốt. CI 34551080684 và Hello 34551080719 success attempt 1;
sáu checks giữ nguyên. 93 run/35 Hello, không run active, không PR mở.
Đây vẫn là checks của main, không phải CI cho bản nháp WP-004a.

### 18.3. Bước tiếp theo và điểm dừng còn lại

1. Chủ dự án mở mục 18 để xem kết quả, cùng mục 6 và phụ lục runbook để xem
   yêu cầu bằng chứng toàn job. Không cần sao chép file, chạy lệnh hoặc cài phần mềm.
2. Cổng cài/push vẫn bị chặn bởi metadata dependency chưa đầy đủ và phần phát sinh
   chưa được duyệt. 10 manifest và 28 phụ thuộc lớp đầu không thay thế cây đầy đủ.
   Không có nguồn metadata mới được xác minh hoặc thay đổi quyền truy cập chính
   thức trong lượt này; không thử đường vòng cho request registry bị chặn.
3. Khi có nguồn hợp lệ, agent mới có thể chốt bảng phát sinh để chủ dự án duyệt,
   khóa dependency, hoàn thiện tích hợp và chạy kiểm thực tế trước PR. Phần thời
   gian chuẩn bị còn lại được ghi bên dưới; cần ước lượng lại phần tích hợp khi
   đã có đầu vào, không tự tăng ngân sách hoặc mặc định phần dư đủ hoàn tất.
4. Quyền chuẩn bị PR đã cấp không cần xin lại; chưa có PR để review/merge.
   Browser/font, điều kiện license, chi phí, nơi lưu bằng chứng, merge và một
   benchmark hai render giữ các điều kiện/phê duyệt riêng đã ghi.
   WP-004a vẫn todo, WP-005 và Layout Gallery chưa mở.


### 18.4. Sổ thời gian tại mốc chốt

Mốc chốt: 2026-09-11T03:54:14.097Z. Không tính thời gian chờ chủ dự án.

| Khoản | Thời gian |
|---|---|
| WP-004a cộng dồn trước lượt này | 151 phút 20 giây |
| Chuẩn bị PR đã dùng trước lượt này | 108 phút 11 giây |
| Lượt tiếp tục offline này | 7 phút 11 giây |
| WP-004a cộng dồn đến mốc chốt | 158 phút 31 giây |
| Đã dùng trong quyền chuẩn bị PR 120 phút | 115 phút 22 giây |
| Còn lại trong quyền chuẩn bị PR | 4 phút 38 giây |

Không tăng trần 120 phút, đặt lại sổ hoặc chuyển thời gian/quyền từ WP khác.
WP-DOC-001 giữ sổ riêng đã đóng; các tổng ngân sách đề xuất chưa được coi là có hiệu lực.

## 19. Bàn giao bản chuẩn bị PR — dừng trước cài/push

### 19.1. Trạng thái chính xác của 11 file

Lượt này đáp ứng yêu cầu “Tiếp tục đi” trong phần chuẩn bị PR còn 4 phút 38 giây.
Chỉ hoàn tất đối soát và bản bàn giao, không tạo thêm code hoặc chạy lại test.
Không coi việc có file nháp là implementation hoàn chỉnh hoặc bằng chứng render.

| File trong phạm vi | Hiện có | Điều kiện còn thiếu trước PR/benchmark |
|---|---|---|
| engine/ops/work-packages/WP-004a-canvas-spike.md | Bản nháp kế hoạch, rubric, giới hạn, lịch sử và sổ thời gian | Bổ sung kết quả tích hợp/CI thực khi có; không đánh dấu nghiệm thu |
| package.json | Bản nháp 10 package trực tiếp pin chính xác và script offline | Cây phát sinh đầy đủ, phê duyệt, lockfile nhất quán và cài được duyệt |
| package-lock.json | Chưa có bản nháp mới; bản repo giữ nguyên | Không tự suy integrity/phiên bản; chờ đủ metadata và quyền |
| tsconfig.json | Bản nháp cấu hình TS/TSX | Typecheck thực trong môi trường dự án |
| .github/workflows/canvas-spike.yml | Chưa có implementation hoàn chỉnh | Runner/manual-only route, giới hạn, nguồn bằng chứng, cơ chế dừng; không dùng stub làm bằng chứng sẵn sàng |
| scripts/canvas-spike.ts | Cấu hình, phân loại RAM, parser procfs/ffprobe, cadence, preflight và đối soát nghiệm thu/toàn job | Collector/lifecycle observer/controller/renderer/ffprobe invocation thật và tích hợp đã kiểm |
| scripts/canvas-spike.test.ts | 67 test tổng hợp của core | Vitest/Node 20 theo repo; bổ sung kiểm tích hợp đúng phần triển khai thực |
| genres/data-explainer/canvas-spike.tsx | Bản nháp composition, camera/morph/parallax/blur và đợi font | Bundle/typecheck, font/browser thực, hai render và nghiệm thu hình ảnh |
| genres/data-explainer/canvas-spike.fixture.json | Dữ liệu tổng hợp, nguồn, vùng/camera/định danh | Đối soát với composition và output thật khi tích hợp |
| engine/docs/05-runbook.md | Phụ lục WP-004a đã cập nhật, phần nguồn giữ nguyên | Hướng dẫn đúng workflow/run thực sau khi được duyệt |
| engine/ops/backlog.md | Bản nháp chỉ dòng WP-004a, vẫn todo; giữ DOC-001 done | Chỉ đóng sau nghiệm thu thật và quyền đóng hồ sơ riêng |

Checkpoint xác minh lại: main `8a6099724bf9afd7d8dabfdb18e125052c8c213e`,
tree `72bbbf201d57e20d5cfd3aec85d2b65432e51e7e`, 104 file; state 88 byte,
newline/blob/SHA-256 giữ đúng mốc mục 1. CI 34551080684/Hello 34551080719
success attempt 1, sáu checks giữ nguyên; 93 run/35 Hello, không run active,
không PR mở tại lần đọc. Không có bằng chứng chặn metadata registry đã được gỡ.

Kết quả 67/67 là lượt kiểm ở mục 18, không phải một lượt kiểm mới trong mục này.
Hai source giữ nguyên so với lượt kiểm đó:
- scripts/canvas-spike.ts SHA-256:
  `b432b5e68b0964fbc86164b008fe42c446b00663b31f280638f67207b32e82c7`.
- scripts/canvas-spike.test.ts SHA-256:
  `77278aad67202c1b1717179c4e52fcd2e63bb7696ecd0f64cbfbacbd40db3c0b`.

### 19.2. Mô tả PR dự kiến — chưa gửi GitHub

Tiêu đề dự kiến: **WP-004a: Chuẩn bị kiểm chứng canvas liên tục 6000×3400**.
Đây là nội dung để review phạm vi, chưa phải PR đã mở. Trước khi dùng phải cập
nhật head SHA, danh sách file thực tế và kết quả kiểm trong môi trường dự án.

**Đã làm gì**

Chuẩn bị spike để kiểm tính khả thi của canvas liên tục bằng một benchmark
gồm hai render đủ 5.400 khung. Bản nháp có composition/fixture và core đối soát
cấu hình, RSS toàn cây Chromium, vòng đời tiến trình, MP4/cadence, thời gian
render/toàn job và nghiệm thu hình ảnh. Giữ canvas 6000×3400, blur 3 px, ba lớp
parallax, năm vùng, morph cùng dữ liệu và bốn acceptance gốc.

**Đã kiểm thế nào**

Gần nhất 67/67 test dữ liệu tổng hợp đạt trên Node 24.19.0 bằng ánh xạ import
trong bộ nhớ. Chưa chạy Node 20/Vitest/validate/typecheck hoặc CI cho bản nháp.
Chưa có render thật, số đo RAM/crash/hiệu năng hoặc nghiệm thu hình ảnh.
CI/Hello của main hiện hành không thay thế kiểm cho thay đổi WP-004a.

**File đã chạm**

Phạm vi được duyệt là 11 file tại mục 3. Hiện bản nháp có chín file; lockfile
mới và workflow hoàn chỉnh chưa có. Backlog chỉ dòng WP-004a; runbook chỉ phụ
lục WP-004a. Giữ nguyên source ngoài phạm vi, contracts, state, ci.yml,
hello.yml, loader/Cockpit và hồ sơ WP-003/WP-004/WP-DOC-001.

**Rủi ro còn lại**

Metadata dependency chưa đủ, phần phát sinh chưa được duyệt; dừng trước
cài/push. Chưa đủ integration, browser/font, schema ffprobe theo phiên bản
thực, cơ chế quan sát crash/retry, deadline/controller, license/chi phí và nơi
lưu bằng chứng. Bộ kiểm bản ghi không tự xác thực bằng chứng hoặc cấp quyền
chạy/merge/đóng WP. Thiếu dữ liệu → INCONCLUSIVE, chưa mở WP-005/Layout Gallery.

### 19.3. Quyết định cần có trước khi làm tiếp

Điểm chặn trước mắt là đầu vào metadata và quyền cho dependency phát sinh,
không phải thiếu một lần duyệt lại chuẩn bị PR. Không đề nghị bỏ điểm dừng,
chọn latest, thay phiên bản hoặc đẩy bản dependency/lockfile chưa đủ lên PR.

Trình tự tiếp theo:
1. Có nguồn metadata đầy đủ được tiếp cận hợp lệ hoặc thay đổi quyền truy cập
   chính thức có thể xác minh. Không có thao tác settings của chủ dự án đã được
   xác minh là sẽ gỡ chặn, nên không đưa hướng dẫn phỏng đoán.
2. Agent đối soát checkpoint, dựng bảng tên/phiên bản/integrity/license/lifecycle
   và phần thay đổi lockfile dự kiến để chủ dự án duyệt phần phát sinh.
3. Dựa trên cây dependency thực, ước lượng lại khối lượng tích hợp/kiểm/CI.
   Phần ngân sách còn lại không phải cam kết đủ hoàn tất; mọi phần bổ sung phải
   được duyệt riêng, không tự đặt lại sổ.
4. Khi đủ điều kiện mới tiếp tục cài, tích hợp, kiểm thực tế và mở một PR theo
   quyền đã có. Merge, chuẩn bị browser, benchmark, Release/Sites/provider vẫn
   giữ phạm vi phê duyệt riêng, chưa được làm.

Chủ dự án chỉ cần mở mục 19 để xem bản bàn giao; không sao chép file, chạy lệnh,
cài phần mềm, gửi token hoặc bấm workflow. Nếu chưa có nguồn hợp lệ ở bước 1,
giai đoạn tích hợp đang BLOCKED; hoàn thiện thêm tài liệu không làm cổng đó đạt.
Bốn acceptance và mục tiêu hình ảnh giữ nguyên; chưa có bằng chứng canvas thất bại.

### 19.4. Đối soát cuối và sổ thời gian

Đối soát bản nháp: chỉ file WP này thay đổi trong lượt bàn giao; tám file còn
lại nguyên SHA-256 và mode, không có file mới. Source/test khớp hash đã kiểm
67/67 ở mục 18. Không chạy lại test, cài dependency hoặc ghi GitHub.

Mốc chốt: 2026-09-11T04:01:41.832Z. Không tính thời gian chờ chủ dự án.

| Khoản | Thời gian |
|---|---|
| WP-004a cộng dồn trước lượt này | 158 phút 31 giây |
| Chuẩn bị PR đã dùng trước lượt này | 115 phút 22 giây |
| Lượt đối soát và bàn giao này | 3 phút 37 giây |
| WP-004a cộng dồn đến mốc chốt | 162 phút 08 giây |
| Đã dùng trong quyền chuẩn bị PR 120 phút | 118 phút 59 giây |
| Còn lại trong quyền chuẩn bị PR | 1 phút 01 giây |

Giữ điểm dừng metadata/dependency. Không tự tăng ngân sách hoặc chuyển quyền
giữa WP; phần thời gian còn lại được giữ nguyên theo sổ, không coi là đã đủ
cho giai đoạn tích hợp còn thiếu.

## 20. Phê duyệt bổ sung và bộ dependency đã đối soát — 2026-09-11

Chủ dự án duyệt bổ sung tối đa 120 phút để hoàn tất chuẩn bị một PR, đúng 11 file ở mục 3; kiểm giấy phép trước khi cài, dừng trước cài/push nếu phát sinh tên/phiên bản ngoài danh sách dưới đây. Cho phép kiểm offline, commit/push nhánh riêng, mở một PR và CI tự động khi đủ điều kiện. Chưa merge, chuẩn bị browser, render, dispatch/rerun, provider, token, Release hoặc Sites.

Mục này cập nhật các blocker metadata ở mục 2, 4 và 10; các mục 12–19 giữ nguyên như lịch sử. Metadata đã hoàn tất: 228 cặp tên/phiên bản, 303 quan hệ dependency, không thiếu peer bắt buộc ở mức khai báo. Lượt hoàn tất có 73 GET HTTP 200, thêm 74 manifest; không GET lại JSON đã đọc. Log gốc 208648 byte, SHA-256 `a65a9dafc582f2030caa283a2b83593a5cc6f79ab07742b9e10bbb1baf6abc56`, đã đối soát nguyên byte sau chuyển về Work.

Bộ giải npm Arborist chạy offline với tập phiên bản hữu hạn từ metadata đã kiểm và lockfile gốc: 326 mục, không có phiên bản ngoài danh sách, không đổi phiên bản ở bất kỳ đường dẫn nào trong 109 mục lockfile gốc. Sau đó cài offline đã hoàn tất; chưa có render. Metadata công khai được tái sử dụng trong bộ nhớ; không giả phản hồi HTTP, không gọi registry để giải lại.

Sáu peer tùy chọn không thuộc bộ cài: `bufferutil`, `utf-8-validate`, `@remotion/video-matting`, `@remotion/whisper-webgpu`, `@swc/helpers`, `webpack-hot-middleware`. Không tự thêm chúng.

### 20.1. Danh sách tên và phiên bản được duyệt cho cây mới

Các gói trực tiếp vẫn đúng 10 phiên bản ở mục 4. Danh sách đầy đủ bên dưới bao gồm dependency bắc cầu và biến thể nền tảng chỉ được ghi metadata trong lockfile; không có nghĩa phải cài mọi nền tảng. Giữ thêm nguyên các mục đã có trong lockfile gốc.

| Package | Phiên bản chính xác |
|---|---|
| `@babel/helper-string-parser` | `7.29.7` |
| `@babel/helper-validator-identifier` | `7.29.7` |
| `@babel/parser` | `7.24.1` |
| `@babel/types` | `7.24.0` |
| `@emnapi/core` | `1.11.3` |
| `@emnapi/runtime` | `1.11.3` |
| `@emnapi/wasi-threads` | `1.2.3` |
| `@esbuild/aix-ppc64` | `0.28.1` |
| `@esbuild/android-arm` | `0.28.1` |
| `@esbuild/android-arm64` | `0.28.1` |
| `@esbuild/android-x64` | `0.28.1` |
| `@esbuild/darwin-arm64` | `0.28.1` |
| `@esbuild/darwin-x64` | `0.28.1` |
| `@esbuild/freebsd-arm64` | `0.28.1` |
| `@esbuild/freebsd-x64` | `0.28.1` |
| `@esbuild/linux-arm` | `0.28.1` |
| `@esbuild/linux-arm64` | `0.28.1` |
| `@esbuild/linux-ia32` | `0.28.1` |
| `@esbuild/linux-loong64` | `0.28.1` |
| `@esbuild/linux-mips64el` | `0.28.1` |
| `@esbuild/linux-ppc64` | `0.28.1` |
| `@esbuild/linux-riscv64` | `0.28.1` |
| `@esbuild/linux-s390x` | `0.28.1` |
| `@esbuild/linux-x64` | `0.28.1` |
| `@esbuild/netbsd-arm64` | `0.28.1` |
| `@esbuild/netbsd-x64` | `0.28.1` |
| `@esbuild/openbsd-arm64` | `0.28.1` |
| `@esbuild/openbsd-x64` | `0.28.1` |
| `@esbuild/openharmony-arm64` | `0.28.1` |
| `@esbuild/sunos-x64` | `0.28.1` |
| `@esbuild/win32-arm64` | `0.28.1` |
| `@esbuild/win32-ia32` | `0.28.1` |
| `@esbuild/win32-x64` | `0.28.1` |
| `@fontsource/inter` | `5.2.5` |
| `@fontsource/inter-tight` | `5.2.5` |
| `@jridgewell/gen-mapping` | `0.3.13` |
| `@jridgewell/resolve-uri` | `3.1.2` |
| `@jridgewell/source-map` | `0.3.11` |
| `@jridgewell/sourcemap-codec` | `1.6.0` |
| `@jridgewell/trace-mapping` | `0.3.31` |
| `@mediabunny/aac-encoder` | `1.55.5` |
| `@mediabunny/flac-encoder` | `1.55.5` |
| `@mediabunny/mp3-encoder` | `1.55.5` |
| `@module-federation/error-codes` | `0.22.0` |
| `@module-federation/runtime` | `0.22.0` |
| `@module-federation/runtime-core` | `0.22.0` |
| `@module-federation/runtime-tools` | `0.22.0` |
| `@module-federation/sdk` | `0.22.0` |
| `@module-federation/webpack-bundler-runtime` | `0.22.0` |
| `@napi-rs/wasm-runtime` | `1.0.7` |
| `@remotion/bundler` | `4.0.523` |
| `@remotion/canvas` | `4.0.523` |
| `@remotion/captions` | `4.0.523` |
| `@remotion/compositor-darwin-arm64` | `4.0.523` |
| `@remotion/compositor-darwin-x64` | `4.0.523` |
| `@remotion/compositor-linux-arm64-gnu` | `4.0.523` |
| `@remotion/compositor-linux-arm64-musl` | `4.0.523` |
| `@remotion/compositor-linux-x64-gnu` | `4.0.523` |
| `@remotion/compositor-linux-x64-musl` | `4.0.523` |
| `@remotion/compositor-win32-x64-msvc` | `4.0.523` |
| `@remotion/licensing` | `4.0.523` |
| `@remotion/media` | `4.0.523` |
| `@remotion/media-parser` | `4.0.523` |
| `@remotion/media-utils` | `4.0.523` |
| `@remotion/player` | `4.0.523` |
| `@remotion/renderer` | `4.0.523` |
| `@remotion/streaming` | `4.0.523` |
| `@remotion/studio` | `4.0.523` |
| `@remotion/studio-codemods` | `4.0.523` |
| `@remotion/studio-protocol` | `4.0.523` |
| `@remotion/studio-shared` | `4.0.523` |
| `@remotion/timeline-utils` | `4.0.523` |
| `@remotion/web-renderer` | `4.0.523` |
| `@remotion/zod-types` | `4.0.523` |
| `@rspack/binding` | `1.7.11` |
| `@rspack/binding-darwin-arm64` | `1.7.11` |
| `@rspack/binding-darwin-x64` | `1.7.11` |
| `@rspack/binding-linux-arm64-gnu` | `1.7.11` |
| `@rspack/binding-linux-arm64-musl` | `1.7.11` |
| `@rspack/binding-linux-x64-gnu` | `1.7.11` |
| `@rspack/binding-linux-x64-musl` | `1.7.11` |
| `@rspack/binding-wasm32-wasi` | `1.7.11` |
| `@rspack/binding-win32-arm64-msvc` | `1.7.11` |
| `@rspack/binding-win32-ia32-msvc` | `1.7.11` |
| `@rspack/binding-win32-x64-msvc` | `1.7.11` |
| `@rspack/core` | `1.7.11` |
| `@rspack/lite-tapable` | `1.1.0` |
| `@rspack/plugin-react-refresh` | `1.6.1` |
| `@tanstack/react-virtual` | `3.14.9` |
| `@tanstack/virtual-core` | `3.17.7` |
| `@tybys/wasm-util` | `0.10.3` |
| `@types/dom-mediacapture-transform` | `0.1.12` |
| `@types/dom-webcodecs` | `0.1.13` |
| `@types/eslint` | `9.6.1` |
| `@types/eslint-scope` | `3.7.7` |
| `@types/estree` | `1.0.9` |
| `@types/json-schema` | `7.0.15` |
| `@types/node` | `20.19.0` |
| `@types/prop-types` | `15.7.15` |
| `@types/react` | `18.2.79` |
| `@types/react-dom` | `18.2.25` |
| `@webassemblyjs/ast` | `1.14.1` |
| `@webassemblyjs/floating-point-hex-parser` | `1.13.2` |
| `@webassemblyjs/helper-api-error` | `1.13.2` |
| `@webassemblyjs/helper-buffer` | `1.14.1` |
| `@webassemblyjs/helper-numbers` | `1.13.2` |
| `@webassemblyjs/helper-wasm-bytecode` | `1.13.2` |
| `@webassemblyjs/helper-wasm-section` | `1.14.1` |
| `@webassemblyjs/ieee754` | `1.13.2` |
| `@webassemblyjs/leb128` | `1.13.2` |
| `@webassemblyjs/utf8` | `1.13.2` |
| `@webassemblyjs/wasm-edit` | `1.14.1` |
| `@webassemblyjs/wasm-gen` | `1.14.1` |
| `@webassemblyjs/wasm-opt` | `1.14.1` |
| `@webassemblyjs/wasm-parser` | `1.14.1` |
| `@webassemblyjs/wast-printer` | `1.14.1` |
| `@xtuc/ieee754` | `1.2.0` |
| `@xtuc/long` | `4.2.2` |
| `acorn` | `8.18.0` |
| `acorn-import-phases` | `1.0.4` |
| `ajv` | `8.20.0` |
| `ajv-formats` | `3.0.1` |
| `ajv-keywords` | `5.1.0` |
| `ast-types` | `0.16.1` |
| `baseline-browser-mapping` | `2.11.22` |
| `browserslist` | `4.28.9` |
| `buffer-from` | `1.1.2` |
| `caniuse-lite` | `1.0.30001810` |
| `chrome-trace-event` | `1.0.4` |
| `commander` | `2.20.3` |
| `cross-spawn` | `7.0.6` |
| `css-loader` | `7.1.4` |
| `cssesc` | `3.0.0` |
| `csstype` | `3.2.3` |
| `define-lazy-prop` | `2.0.0` |
| `electron-to-chromium` | `1.5.427` |
| `enhanced-resolve` | `5.24.5` |
| `error-stack-parser` | `2.1.4` |
| `es-module-lexer` | `2.3.2` |
| `esbuild` | `0.28.1` |
| `escalade` | `3.2.0` |
| `eslint-scope` | `5.1.1` |
| `esprima` | `4.0.1` |
| `esrecurse` | `4.3.0` |
| `estraverse` | `4.3.0` |
| `estraverse` | `5.3.0` |
| `events` | `3.3.0` |
| `execa` | `5.1.1` |
| `fast-deep-equal` | `3.1.3` |
| `fast-uri` | `3.1.7` |
| `fs-monkey` | `1.0.3` |
| `get-stream` | `6.0.1` |
| `glob-to-regexp` | `0.4.1` |
| `graceful-fs` | `4.2.11` |
| `has-flag` | `4.0.0` |
| `html-entities` | `2.6.0` |
| `human-signals` | `2.1.0` |
| `icss-utils` | `5.1.0` |
| `is-docker` | `2.2.1` |
| `is-stream` | `2.0.1` |
| `is-wsl` | `2.2.0` |
| `isexe` | `2.0.0` |
| `jest-worker` | `27.5.1` |
| `js-tokens` | `4.0.0` |
| `json-parse-even-better-errors` | `2.3.1` |
| `json-schema-traverse` | `1.0.0` |
| `loader-runner` | `4.3.2` |
| `loose-envify` | `1.4.0` |
| `lru-cache` | `6.0.0` |
| `mediabunny` | `1.55.5` |
| `memfs` | `3.4.3` |
| `merge-stream` | `2.0.0` |
| `mime-db` | `1.52.0` |
| `mime-types` | `2.1.35` |
| `mimic-fn` | `2.1.0` |
| `nanoid` | `3.3.19` |
| `neo-async` | `2.6.2` |
| `node-releases` | `2.0.55` |
| `npm-run-path` | `4.0.1` |
| `onetime` | `5.1.2` |
| `open` | `8.4.2` |
| `path-key` | `3.1.1` |
| `picocolors` | `1.1.1` |
| `postcss` | `8.5.28` |
| `postcss-modules-extract-imports` | `3.1.0` |
| `postcss-modules-local-by-default` | `4.2.0` |
| `postcss-modules-scope` | `3.2.1` |
| `postcss-modules-values` | `4.0.0` |
| `postcss-selector-parser` | `7.1.6` |
| `postcss-value-parser` | `4.2.0` |
| `prismjs` | `1.30.0` |
| `react` | `18.2.0` |
| `react-dom` | `18.2.0` |
| `react-refresh` | `0.18.0` |
| `recast` | `0.23.21` |
| `remotion` | `4.0.523` |
| `require-from-string` | `2.0.2` |
| `scheduler` | `0.23.2` |
| `schema-utils` | `4.4.0` |
| `semver` | `7.5.3` |
| `semver` | `7.8.5` |
| `shebang-command` | `2.0.0` |
| `shebang-regex` | `3.0.0` |
| `signal-exit` | `3.0.7` |
| `source-map` | `0.6.1` |
| `source-map` | `0.8.0` |
| `source-map-js` | `1.2.1` |
| `source-map-support` | `0.5.21` |
| `stackframe` | `1.3.4` |
| `strip-final-newline` | `2.0.0` |
| `style-loader` | `4.0.0` |
| `supports-color` | `8.1.1` |
| `tapable` | `2.3.3` |
| `terser` | `5.51.2` |
| `terser-webpack-plugin` | `5.6.1` |
| `tiny-invariant` | `1.3.3` |
| `to-fast-properties` | `2.0.0` |
| `tslib` | `2.8.1` |
| `undici-types` | `6.21.0` |
| `update-browserslist-db` | `1.3.3` |
| `util-deprecate` | `1.0.2` |
| `watchpack` | `2.5.2` |
| `webpack` | `5.105.0` |
| `webpack-sources` | `3.5.1` |
| `which` | `2.0.2` |
| `ws` | `8.21.0` |
| `yallist` | `4.0.0` |
| `zod` | `4.5.4` |

### 20.2. Giấy phép và ngân sách

Đã đọc LICENSE.md trong tarball remotion 4.0.523 sau khi kiểm đúng SRI từ manifest: có điều khoản cho phép đánh giá tính phù hợp trước khi sử dụng thương mại. WP-004a chỉ đánh giá kỹ thuật, chưa vận hành thương mại hoặc phân phối sản phẩm phái sinh của Remotion. Kiểm các giấy phép trong gói sẽ cài và giữ notice nguyên bản. Điều kiện sử dụng thương mại sau này phải được đối soát riêng; không mặc định mua license, Actions hoặc Release miễn phí.

Đối soát trước cài trong lượt bổ sung:

- 236 archive tên/phiên bản đã duyệt được kiểm SRI. 32 timeout không nhận được
  dữ liệu được thử lại riêng một lần, đều HTTP 200; 12 archive DefinitelyTyped
  được đọc lại offline theo thư mục gốc thực tế. Không GET lại JSON metadata.
- Remotion License trong renderer: SHA-256
  `bd65083b940f61904f6ef298aade918a7cad72a3e35bc406e36fab365844b673`.
  [Tài liệu media](https://www.remotion.dev/docs/media#license) xác nhận giấy phép
  cho `@remotion/media`, dù package.json của gói thiếu trường license.
- [Acknowledgements](https://www.remotion.dev/docs/acknowledgements) xác nhận
  FFmpeg đi kèm dùng GPLv2+. Archive compositor Linux có FFmpeg/ffprobe và
  thư viện liên kết; không ghi nhầm toàn bộ archive này thành MIT. Chỉ sử dụng
  nội bộ để đánh giá; chưa phân phối lại binary hoặc sản phẩm phần mềm.
- Hai font giữ nguyên SIL OFL-1.1, LICENSE SHA-256
  `18aabf190848725e2576eefb5c29ba06aac1029d02132252a7f312eac2e50cf3`.
  Các gói Mediabunny giữ MPL-2.0; caniuse-lite giữ CC-BY-4.0; các notice
  MIT/ISC/BSD/Apache/Unlicense/0BSD trong dependency giữ nguyên. Không sửa gói
  thứ ba, không loại notice và chưa phân phối bundle/node_modules/font.
- Sáu compositor cho nền tảng khác chỉ nằm trong lockfile; không tải hoặc cài.
- Cài offline từ cache đã kiểm, `--ignore-scripts --no-audit --fund=false`;
  không chạy lifecycle download. Node của máy agent khác Node 20 của CI;
  kết quả offline không được ghi thành đã kiểm runtime Node 20.

WP-004a cộng dồn trước lượt bổ sung: **308 phút 23 giây**. Quyền chuẩn bị PR cũ đã dùng **119 phút 57 giây / 120 phút**; lượt bổ sung này có trần riêng **120 phút**, không đặt lại sổ và không chuyển từ WP trước. Kết quả và thời gian thực tế sẽ được ghi khi chốt PR hoặc gặp điểm dừng.

## 21. Bản nháp tích hợp và điểm duyệt runtime trước push

### 21.1. Đề xuất cụ thể — chưa được duyệt làm runtime

| Thành phần | Phiên bản/phạm vi đề xuất | Mục đích và điểm dừng |
|---|---|---|
| Python hệ thống | `/usr/bin/python3`, chính xác `Python 3.12.3` trên Ubuntu 24.04 x64 | Dùng bản có sẵn; sai phiên bản hoặc thiếu thì dừng, không apt/pip/download |
| Thư viện Python | Chỉ thư viện chuẩn của bản trên: ctypes, os, sys, time, json, signal, selectors, pathlib, zipfile, stat | Observer, marker thời gian và giải nén archive browser trong lượt được duyệt sau này; không package Python ngoài |
| Linux ptrace | API kernel hiện có; chỉ `PTRACE_TRACEME` trên process con do observer tự tạo, theo dõi fork/vfork/clone/exec/exit | Không attach process khác, đổi settings, tăng quyền hoặc fallback nếu bị từ chối |
| Ngoại lệ quy ước TypeScript | Một chuỗi Python trong `scripts/canvas-spike.ts` và đoạn setup nhỏ trong workflow đã nằm trong 11 file | Không thêm helper tracked, không sửa AGENTS/guardrails/architecture; các phần còn lại vẫn TypeScript ESM, không any |

Lý do: quét `/proc` định kỳ đơn thuần có thể bỏ lỡ process sống dưới 250 ms và
không giữ được mã thoát của process cháu. Bản observer đề xuất nhận sự kiện
kernel trước khi process con được tiếp tục, lấy RSS từng process, PID và
starttime, ghi cả mã thoát/signal; có `EXITKILL` để không để browser mồ côi
khi observer chết. RSS không được thay bằng PSS hoặc đỉnh tích lũy.

Giấy phép Python hệ thống đã đọc offline: PSF License Version 2 và notice đi
kèm; giữ nguyên, không phân phối lại Python. File copyright của môi trường
kiểm có SHA-256 `f1cbf908e1daa8789b389fdcf17811ed36b675d736b39a103591399861350382`.
Đây là đối soát notice của bản có sẵn, không phải bằng chứng runtime đã được
chủ dự án duyệt hoặc bản Ubuntu runner đã có cùng hash.

**Giữ điểm dừng trước push/PR.** Căn cứ là điều kiện chủ dự án đặt ra khi có
dependency phát sinh ngoài danh sách và quy ước TypeScript trong AGENTS.md.
Tự ghi Python vào WP không làm phát sinh quyền thực thi. Phê duyệt cần bao
gồm runtime/ngoại lệ này và test prerequisite trên process Node tổng hợp do
test tạo; không cấp quyền mở browser, render hoặc nới quyền kernel.

### 21.2. Implementation đã có trong bản nháp

- Controller chỉ chạy qua lệnh benchmark tường minh và context GitHub owner,
  main, workflow_dispatch, attempt 1. Import/test/bundle không mở Chromium.
- Mỗi bản có browser mới, cùng adapter CDP lấy từ renderer 4.0.523, cùng cờ
  launch/encoding/font/cảnh; render đủ từng khung với concurrency 1. Bản động
  giữ canvas 6000×3400, năm vùng, parallax 0,3/1/1,3, morph và blur 3 px.
- Đã đọc nhánh retry của `set-props-and-env`, `select-composition` và
  `render-frame-and-retry-target-close`. Guard chỉ cho một navigation HTTP
  local thành công mỗi page; lỗi mạng hoặc HTTP khác 200 bị trả thành lỗi
  không mang token retry. Tối đa một page chọn composition và một page render.
  Thay page, CDP target crash hoặc downloader bị gọi thì dừng. Chromium có
  thể tự thay process con; PID/starttime renderer/GPU đổi trong lúc đang
  render được ghi nhận và làm phép thử không đạt, không gán sẵn restart=0.
- Observer lưu JSONL thô, tiến độ, lifecycle và stderr; core RAM kiểm đủ 18
  cửa sổ. Các mẫu mất cây hoặc thiếu lifecycle vẫn INCONCLUSIVE. Kiểm native
  observer trên runner và hành vi adapter/browser thật còn chưa thực hiện.
  RSS Node controller và FFmpeg được ghi ở các bản ghi auxiliary riêng,
  không cộng vào RSS Chromium. Đây là mẫu định kỳ phụ, không được dùng để
  tuyên bố bao phủ lifecycle của Node/FFmpeg như observer Chromium.
- ffprobe dùng binary đã có trong compositor; giữ stdout/stderr thô, đếm
  khung giải mã và kiểm PTS/time_base từng khung, container, fps, kích thước,
  codec H.264/yuv420p và thời lượng của cả hai MP4. Chưa có MP4 thật để đối soát.
- Workflow mới chỉ có workflow_dispatch. Thời lượng job lấy từ phê duyệt
  riêng, phải là số nguyên 1–75 phút; controller/shell có deadline theo phần
  còn lại. GitHub timeout và bước cleanup cũng phải được đối soát sau job.
- Draft Release phải tồn tại và được duyệt riêng; controller không tạo
  Release. Claim benchmark được ghi trước chuẩn bị browser, claim trùng bị
  từ chối. Upload không retry/ghi đè; chỉ gửi MP4 và log/bằng chứng đã liệt kê,
  không gửi nguồn repo hoặc credential. Report luôn chờ owner visual review
  và kết thúc GitHub job; không tự mở WP-005.
- `package.json` đổi cách gọi cùng validator thành `node --import tsx` để
  tránh IPC socket của tsx CLI trong Work; file validator và ci.yml nguyên byte.

### 21.3. Font/browser/công cụ và bằng chứng offline

Các đường dẫn font tính từ `node_modules/@fontsource/`:

| File WOFF2 | SHA-256 |
|---|---|
| inter/files/inter-latin-400-normal.woff2 | dd05e326cf8eac3b55acecf29c842ed73e6e6dd06491cf47f7e8800680ab3e33 |
| inter/files/inter-latin-500-normal.woff2 | b0e7558f4710a1e255b93e3deefe3aebb19f3bb41c150f685a74d3b1a1c79e87 |
| inter/files/inter-latin-700-normal.woff2 | aac638f7503cebb084ec494cf00f75f7d8260d50c2f4e7820bccabba09626a3a |
| inter/files/inter-latin-800-normal.woff2 | e4a6db93190ce6c09e9871496bc63a2b7a59838435e8ec23996afd9619bc3883 |
| inter-tight/files/inter-tight-latin-800-normal.woff2 | e4009d1f0b2dbbd8f0a20971c2e50e8ce5d3b8929999911056256fe7c396b6e2 |

ffprobe thuộc `@remotion/compositor-linux-x64-gnu@4.0.523`, chạy `-version`
offline trả n7.1; SHA-256 binary
`b09efb0caa8553a38c54943dc0a727ea5e70789bd3b90634b8f8fd41ab67834b`.
Không tạo hoặc giải mã video trong lượt này.

Browser được pin theo source renderer là 149.0.7790.0. URL archive tương lai
chỉ là cấu hình; chưa GET, giải nén, kiểm binary hoặc chạy `--version` của
browser. Preflight lượt được duyệt sau này cần cả hash archive và executable,
đối chiếu lại phiên bản và thư viện runner. Font/browser của hai render phải
trùng hash, không thay bằng browser của chủ dự án.

| Kiểm thực tế trong Work | Kết quả / giới hạn |
|---|---|
| Cài package đã kiểm giấy phép/SRI | npm ci offline, ignore-scripts, exit 0; không lifecycle hoặc browser download |
| Cây cài | npm ls --all exit 0, không missing/invalid; không phiên bản ngoài danh sách |
| npm test | 86 PASS, 1 SKIP trên Node 24.19.0/npm 11.9.0 |
| npm run typecheck | PASS, TypeScript 5.9.3 |
| npm run validate | PASS, 13 schema; pipeline/state.json hợp lệ |
| Bundle TSX/font thật | PASS qua @remotion/bundler 4.0.523; output ngoài repo; không mở browser |
| Cú pháp observer/YAML | PASS; parse Python bằng AST, không chạy observer |
| Native observer trên Work | Probe PTRACE_TRACEME riêng trước đó bị từ chối, child exit 99; không tăng quyền hoặc thử lại |
| Test prerequisite trên CI | Chưa chạy; 1 test trên GitHub Actions dự kiến kiểm child exit thường và child SIGTERM do test chủ động tạo; hoàn toàn không dùng browser |
| Node 20, CI trên head mới | Chưa chạy vì chưa push/PR; không ghi kết quả Node 24 thành Node 20 |
| Render, RSS/crash và hình ảnh thật | Chưa thực hiện; acceptance WP-004a chưa được nghiệm thu |

Việc probe Work bị từ chối không chứng minh observer sẽ chạy được trên GitHub
runner. Nếu test prerequisite sau khi được duyệt không đạt, dừng trước
benchmark; không sửa kernel settings, hạ kiểm crash/RAM hoặc tự tìm đường vòng.

### 21.4. Bước tiếp theo của chủ dự án

1. Đọc mục 21.1 trực tiếp trong bản nháp này. Phần cần quyết định là Python
   3.12.3 và ngoại lệ observer, không phải xin lại quyền sửa 11 file.
2. Nếu đồng ý, trả lời: “Duyệt Python 3.12.3 và ngoại lệ observer trong đúng
   11 file; tiếp tục chuẩn bị PR bằng ngân sách bổ sung còn lại; chưa merge,
   chuẩn bị browser hoặc render.” Không cần sao chép file, mở terminal hay PAT.
3. Agent kiểm lại checkpoint, giữ nguyên dependency/phạm vi, tạo nhánh riêng,
   mở một PR và đọc CI tự động trên đúng head. Nếu có dependency khác phát
   sinh thì giữ nguyên điểm dừng; không dùng phê duyệt runtime này cho gói khác.
4. Chủ dự án xem diff/checks qua link PR agent gửi. Sau review mới duyệt merge;
   browser, một benchmark hai render, chi phí và nơi lưu bằng chứng được chốt
   riêng. Đạt CI chỉ mở đường review PR, chưa mở WP-005 hoặc Layout Gallery.


### 21.5. Đối soát cuối và sổ thời gian lượt bổ sung

Đối soát GitHub cuối lượt vẫn khớp mục 1: main `8a6099724bf9afd7d8dabfdb18e125052c8c213e`,
tree `72bbbf201d57e20d5cfd3aec85d2b65432e51e7e`, 104 file; CI 34551080684
và Hello 34551080719 success, attempt 1, đúng head; heartbeat/send-hello skipped.
Lịch sử đủ 93 run, gồm 35 Hello; không có run hoạt động hoặc PR mở.

Bản nháp có 6 file sửa và 5 file mới, đúng 11 file ở mục 3. Không thiếu file
gốc, không có thay đổi ngoài phạm vi. Backlog chỉ đổi dòng WP-004a; toàn bộ
runbook gốc ở checkpoint được giữ nguyên trước phần WP-004a bổ sung. State
vẫn 88 byte, blob/hash đúng mục 1. Không phát hiện mẫu credential trong phạm vi
đã quét; đây không phải chứng nhận audit bảo mật toàn dự án.

Đối chiếu độc lập bảng 228 cặp với biên nhận metadata và lockfile: không thiếu,
không thêm, không đổi 109 vị trí dependency gốc. Lockfile có 326 vị trí package
(327 entry nếu tính cả root); SHA-256
`15bb41977e477547db464ee867f4f71f86cd300e7b09b9523e3bbcf73788843d`.

| Khoản thời gian | Mốc chốt |
|---|---|
| WP-004a cộng dồn trước lượt này | 308 phút 23 giây |
| Lượt chuẩn bị PR bổ sung này | 72 phút 42 giây / 120 phút |
| Còn lại trong 120 phút bổ sung | 47 phút 18 giây |
| WP-004a cộng dồn tại mốc chốt | 381 phút 05 giây |
| Ngân sách chuẩn bị PR cũ | Đã dùng 119 phút 57 giây; còn 3 giây riêng, không đặt lại |

Mốc chốt là `2026-09-11T16:50:21.306Z`. Không tính thời gian chờ chủ dự
án sau mốc này. Không chuyển thời gian WP-DOC-001 hoặc WP trước vào WP-004a.
Chưa tạo nhánh GitHub, commit/push, PR hoặc CI mới. Dừng tại mục 21.1;
phần ngân sách bổ sung còn lại được giữ để tiếp tục sau quyết định runtime.


## 22. Tiếp tục từ vật chứng khôi phục — 2026-09-12

### 22.1. Quyết định hiện hành của chủ dự án

Chủ dự án đã duyệt trong chat nhận bàn giao:

> Duyệt Python 3.12.3, thư viện chuẩn và ngoại lệ observer tại mục 21.1 trong
> đúng 11 file, gồm test prerequisite trên tiến trình Node tổng hợp trong CI.
> Không tăng quyền hoặc fallback khi ptrace bị từ chối.

Sau khi xem MANIFEST, RECOVERY_REPORT và TIME_RECONCILIATION, chủ dự án yêu cầu:

> Tôi không quan trọng thời gian, chỉ cần xong việc, ghi nhớ, đừng hỏi lại tôi
> vấn đề này nữa.

Quyết định mới bỏ thời gian và việc chưa xác minh số dư làm điểm chặn cho phần
chuẩn bị một PR WP-004a đã được duyệt. Agent tiếp tục hoàn tất, không hỏi lại
ngân sách thời gian hoặc coi chuyển chat là lý do cần duyệt lại. Sổ cũ giữ
nguyên: 381 phút 05 giây cộng dồn tại 16:50:21.306Z ngày 11/09, khoản đóng gói
5 phút 49 giây riêng và chênh lệch bộ đếm 453 phút 11 giây chưa giải thích.
Không tự đặt lại 120 phút, sửa số đo lịch sử hoặc biến khoản chưa xác định thành
thời gian đã chứng minh. Chủ dự án ưu tiên hoàn tất công việc đã duyệt.

Phạm vi tiếp tục vẫn đúng 11 file; giữ bộ dependency và ngoại lệ runtime đã
chốt. Không merge, chuẩn bị browser Remotion, render, dispatch/rerun, provider,
Release hoặc Sites. Ngưỡng hiệu năng render và giới hạn/chi phí của lượt
benchmark cần duyệt riêng vẫn nguyên vẹn. Không thử lại probe ptrace đã bị từ
chối trong Work; prerequisite native thuộc CI tự động đã được duyệt.

### 22.2. Vật chứng còn có và phần thiếu

Gói `Meridian-WP004a-evidence.zip`: 80.541.803 byte, SHA-256
`b3db21a4899f5241df48d99cbcfa86de960f2cde78458fa49f761833d5a9dafd`.
MANIFEST có SHA-256
`536219f26fb91c750911d6cd3cf2b752a1db3693e79135e415d2eddf6c9dcc97`.
Đã kiểm 13.994 entry được kê, gồm 12.952 file thường, 1.020 thư mục và 22
symlink; hash/kích thước/mode khớp. Mọi link trỏ vào file trong node_modules.
Các báo cáo khôi phục là ghi chú kiểm kê mới, không phải log thực thi lịch sử.

- Đã khôi phục nguyên byte/mode/link 12.932 file dependency, 233.994.076 byte,
  từ cây đã giải nén còn lưu. Không cài lại hoặc chạy lifecycle để khôi phục.
- 232 vị trí đã cài khớp tên/phiên bản ở package.json và version/resolved/integrity
  của lockfile. 94 vị trí chưa cài đều optional. Cả 109 vị trí lockfile gốc giữ
  nguyên; không có package đã cài ngoài bộ 228 cặp được duyệt cộng dependency gốc.
- Log đã khôi phục trong chat nhận là đúng 208.648 byte/SHA-256 ghi ở mục 20,
  chứa 74 bản META và 146 bản RECEIPT cho 73 request. Gói bổ sung thêm 10 manifest
  tải lên trước đây, không có biên nhận HTTP gốc đi kèm. Hợp lại có bản metadata
  cho 84/228 cặp; 144 cặp còn thiếu bản nguồn chuyển được. Không gọi package.json
  hoặc lockfile đã giải nén là response registry hoặc biên nhận HTTP.
- Metadata `nanoid@3.3.19` là ứng viên không dùng; lockfile giữ bản gốc
  `nanoid@3.3.18`. Không thay phiên bản để ép khớp ứng viên đó.
- Năm WOFF2, notice Remotion renderer, hai LICENSE font và binary ffprobe khớp
  các hash lịch sử ở mục 20.2/21.3. Không chạy ffprobe hoặc giải mã media ở lượt này.
- Cache npm/tarball gốc đã kiểm SRI và stdout/stderr thô của lần kiểm cũ không
  khôi phục được. Hash cây đã giải nén không chứng minh lại SRI tarball đã mất;
  không repack thành tarball gốc, dựng biên nhận hoặc GET lại JSON metadata.
- Kết quả 86 PASS/1 SKIP và typecheck/validate/bundle ở mục 21 là lịch sử.
  Chỉ bảng kiểm mới bên dưới được dùng để mô tả lượt tiếp tục trên cây khôi phục.

### 22.3. Nền source và các kiểm của lượt tiếp tục

Đã đọc lại GitHub trước khi khôi phục working copy: main/tree/state/checks và
93 run/35 Hello khớp mục 1; không run hoạt động hoặc PR mở tại lần đọc đó.
Working copy có đủ 104 blob/mode gốc và tái tạo đúng tree
`72bbbf201d57e20d5cfd3aec85d2b65432e51e7e` trước khi áp dụng 11 file bản nháp.
Không dùng nội dung của repo khác hoặc đổi checkpoint.

Runtime kiểm offline hiện có: Node 24.19.0, npm 11.9.0 và `/usr/bin/python3`
3.12.3. Không giả môi trường Work thành Node 20 hoặc GitHub Actions. Workflow
benchmark dùng phép `int` với thời gian dương thay cho import `math`, giữ nguyên
phép làm tròn xuống và danh sách thư viện chuẩn hẹp đã duyệt. Đây chỉ là mã
chuẩn bị, workflow benchmark chưa chạy.

Lượt kiểm mới hoàn tất trong khoảng 2026-09-12T01:11:45.567633Z–01:11:59.847862Z.
Các lệnh npm dùng offline, ignore-scripts, không audit/fund; không cài lại hoặc
GET metadata. Kết quả trực tiếp trên cây khôi phục:

| Kiểm | Kết quả mới |
|---|---|
| npm ls --all --json | Exit 0; không problems/missing/invalid |
| npm run test | 86 PASS, 1 SKIP; hai file test đạt; native observer chỉ chạy trong CI |
| npm run typecheck | Exit 0 |
| npm run validate | Exit 0; state hợp lệ, 13 schema biên dịch, 0 failure |
| npm run canvas-spike:bundle | Exit 0; bundle TSX/font ở thư mục tạm ngoài repo; không browser |
| Python AST | Observer và hai block Python trong workflow parse được; không thực thi ptrace |
| Bảo toàn nguồn | Đủ 109 file: 6 sửa + 5 thêm; 98 blob/mode ngoài phạm vi nguyên vẹn |
| Phạm vi tài liệu | Backlog chỉ dòng WP-004a; toàn bộ prefix runbook gốc nguyên byte |
| State và rà chuỗi credential | State 88 byte/hash đúng mục 1; không phát hiện mẫu credential trong nguồn đã kiểm |

Log mới, receipt UTC/exit code/hash và snapshot hash source được giữ trong
`Meridian-WP004a-offline-validation.zip`, SHA-256 `647ef203f459eea0523e8f2f939b34a4442b3ed542e253287a16f4c4cab18689`.
Đây là log mới, không tái tạo hoặc thay thế biên nhận/test log lịch sử đã mất.

CI Node 20 và native observer chưa chạy tại lúc chốt commit chuẩn bị này; PR
phải dẫn kết quả CI tự động đúng head sau push. Không ghi kết quả Work thành CI.
Nếu prerequisite bị từ chối ptrace, thiếu/sai runtime hoặc thiếu lifecycle thì
dừng trước benchmark, báo nguyên nhân; không tăng quyền hoặc fallback.
Bản chuẩn bị này chưa merge hoặc chạy browser/render; WP-004a vẫn chưa nghiệm thu.

## 23. Sửa ba lỗi observer/RAM/crash trong PR #13 — 2026-09-12

### 23.1. Quyền và checkpoint trước sửa

Chủ dự án duyệt sửa ba lỗi đã review, bổ sung test hồi quy, cập nhật cùng PR #13
và kiểm CI tự động; giữ phạm vi 11 file cùng dependency đã duyệt. Chưa merge
hoặc chạy browser/benchmark. Các giới hạn và phần vật chứng thiếu ở mục 22
tiếp tục được giữ nguyên, không GET lại metadata.

Đã xác minh lại main `8a6099724bf9afd7d8dabfdb18e125052c8c213e`, main tree
`72bbbf201d57e20d5cfd3aec85d2b65432e51e7e`, head PR
`e6d7708802a82435f0295fe7153b024a8fa6bffb`, PR tree
`bafc39ad41f75936e047d0fbb68c5ced1cc52420`. PR mở, chưa merge, đúng 11 file,
+8139/−115 và một commit tại mốc đó. Sáu run gắn head đều success, attempt 1.
Cả 109 file làm việc khớp blob/mode của tree đã review trước khi sửa.

Lượt sửa chỉ chạm `scripts/canvas-spike.ts`, `scripts/canvas-spike.test.ts` và
hồ sơ WP này. Thêm commit thường trên nhánh hiện có; không sửa lịch sử hoặc
mở PR khác. Head/tree, số commit và thống kê diff sau sửa phải được báo mới
trong PR; không sử dụng thống kê của checkpoint cũ để mô tả bản sửa.

### 23.2. Ba sửa đổi và kiểm hồi quy

| Lỗi | Cách sửa | Kiểm hồi quy |
|---|---|---|
| Cờ đóng cuối che crash | Đọc hết sự kiện wait đang có trước close. Giữ wait status tại PTRACE_EVENT_EXIT, biên nhận SIGKILL và identity riêng từng tiến trình. Chỉ miễn trừ khi kill đã gửi trước exit stop, status khớp terminal wait và signal là SIGKILL; exit đã được ghi nhận trước kill không đổi nguyên nhân. Reconciler tự kiểm lại, không tin cờ expected. | SIGSEGV/nonzero không được miễn trừ; exit có trước cleanup vẫn là crash kể cả signal 9; thiếu/mâu thuẫn identity, receipt, exit stop hoặc terminal status không được coi đầy đủ. Nguyên nhân crash đã biết vẫn hiển thị khi thiếu terminal event. |
| Vai trò thay đổi sau exec làm RAM INCONCLUSIVE | Child giữ vai trò tạm other trước exec. Ghi change=exec với PID/starttime, vai trò trước/sau; nhận diện cờ theo từng argv. RAM chỉ chấp nhận chuyển vai trò có chuỗi exec phù hợp, giữ mẫu ban đầu và toàn bộ cửa sổ. Root exec hoặc đổi ancestry/identity vẫn bị bác bỏ. | Chuỗi tổng hợp đầy đủ 18 cửa sổ giữ nguyên median/P95 khi thêm chuyển other→renderer có bằng chứng; thiếu/sai exec, identity, vai trò trước, ancestry hoặc root restart đều INCONCLUSIVE. |
| Mẫu cleanup làm hỏng RAM | Mẫu cuối ngay trước close chốt ranh giới đo RAM. Observer tiếp tục giữ exit stop, signal receipt và terminal wait, nhưng không phát RSS sau close. Reconciler không đưa mẫu sau close vào RAM và báo vi phạm ranh giới nếu có. | Cleanup nhiều tiến trình, child thoát trước root, giữ đủ 541 mẫu tổng hợp từ progress 0 tới 5400 và 18 cửa sổ. Mẫu RSS chèn sau close không làm biến đổi RAM và không được coi coverage hợp lệ. |

Việc chấp nhận bằng chứng exec không cấp quyền restart: guard còn nhận diện
exec cùng vai trò browser/renderer/GPU trong phần đang render dù PID/starttime
không đổi. Có test phân biệt exec lúc chuẩn bị, đang render và sau progress 5400.
Các ngưỡng RAM/hiệu năng, admission, navigation/page guard và điều kiện một
benchmark hai render giữ nguyên; không tự chạy lại khi FAIL/INCONCLUSIVE.

### 23.3. Kiểm offline và prerequisite CI

Kiểm trên Work với Node 24.19.0/npm 11.9.0, không cài lại dependency. Các lệnh
npm dùng offline/ignore-scripts, không audit/fund. Test đặt GITHUB_ACTIONS=false
để không thực thi ptrace trong Work:

| Kiểm trực tiếp trước commit | Kết quả |
|---|---|
| npm run test | 95 PASS, 1 SKIP; 87 test canvas gồm 1 native SKIP, 9 test validator PASS |
| npm run typecheck | Exit 0 |
| npm run validate | Exit 0; 13 schema, state hợp lệ, 0 failure |
| AST observer Python | PASS; chỉ os, sys, json, time, signal, ctypes, selectors; không chạy kernel observer |
| Dependency và state | package.json/lockfile nguyên byte; 109 vị trí dependency gốc nguyên đối tượng; state giữ 88 byte/SHA-256 đã chốt |

Đã thêm 9 test tổng hợp, đồng thời mở rộng prerequisite native hiện có. Trong
CI đã duyệt, prerequisite kiểm Python chính xác 3.12.3 và dùng một root Node
cùng bốn child Node: một exit 0, một SIGTERM chủ đích, hai child còn sống với
argv thử vai trò renderer/GPU. Sau khi đã thấy các exit và exec cần thiết,
test gửi progress tổng hợp 5400 và close có chủ đích, kiểm cleanup nhiều tiến
trình và không có RSS sau close. Không render bất kỳ khung nào trong probe.
Log kiểm có marker WP004A_OBSERVER_PREREQUISITE, runtime thực tế, số start/exec,
crash chủ đích, trạng thái cleanup và số mẫu sau close.

CI của commit sửa chưa chạy tại lúc ghi hồ sơ này. Sau push phải đọc log thật
trên head mới, xác nhận native test đã chạy, không SKIP và tất cả checks đạt;
không chuyển kết quả offline thành CI. Nếu ptrace bị từ chối hoặc runtime sai,
dừng và báo nguyên nhân, không tăng quyền, cài thêm, fallback hoặc rerun.

### 23.4. Bước tiếp theo và phần chưa nghiệm thu

1. Đối soát 11 file của toàn PR, 98 blob/mode ngoài phạm vi và dependency gốc;
   đọc lại checkpoint trước cập nhật nhánh, khác thì dừng.
2. Cập nhật cùng PR #13 bằng commit thường; đọc CI tự động và cung cấp head/tree,
   diff/số commit cùng link log thật. Hai moderate của Vitest gốc vẫn cần báo rõ.
3. Chủ dự án review bản sửa trên đúng checkpoint mới rồi mới xét quyền merge.
4. Node tổng hợp chỉ kiểm prerequisite và bookkeeping. Chưa có Chromium thật,
   MP4, RSS/crash/hiệu năng hoặc nghiệm thu hình ảnh. Browser, một benchmark,
   license/chi phí/lưu bằng chứng cần duyệt riêng; WP-005/Layout Gallery còn đóng.

## 24. Sửa P1 SIGKILL/cleanup trong cùng PR #13 — 2026-09-12

### 24.1. Quyền và checkpoint

Chủ dự án duyệt sửa P1 vừa review, bổ sung hồi quy, kiểm offline và CI tự động
trong cùng PR #13. Tiếp tục giữ đúng 11 file và dependency đã duyệt; chưa merge
hoặc chạy browser/benchmark. Không hỏi lại về thời gian, GET lại metadata hoặc
dựng vật chứng thiếu. Các giới hạn ở mục 22 vẫn có hiệu lực.

Bốn checkpoint đã xác minh trước sửa:

| Mốc | SHA |
|---|---|
| Main | `8a6099724bf9afd7d8dabfdb18e125052c8c213e` |
| Main tree | `72bbbf201d57e20d5cfd3aec85d2b65432e51e7e` |
| PR head | `5d1b8813a33e4ece1433692216ea8848e865567a` |
| PR tree | `a8e19abac3b137548aafd4a3666f9ef15cf41b79` |

PR mở, chưa merge; tại checkpoint này có 11 file, +8514/−115 và hai commit.
Lượt sửa chỉ chạm script observer, file test hiện có và hồ sơ WP này. Commit
thường nối tiếp head trên nhánh hiện có, không force/amend hoặc tạo PR khác.
Trước cập nhật ref phải đọc lại main/head; khác checkpoint thì dừng.

### 24.2. Nguyên nhân và quy tắc thay thế

Quy tắc SIGKILL ở mục 23.2 chưa chứng minh được nguồn gây thoát: sau lần
waitpid không chặn cuối cùng, SIGKILL bên ngoài có thể bắt đầu group exit nhưng
EXIT stop chưa được observer đọc. SIGKILL cleanup gửi sau đó vẫn có thể trả về
thành công dù kernel bỏ tín hiệu mới. Receipt và status 9 khớp không đủ để
miễn trừ crash. Kết quả kiểm mô hình race trong review không phải chạy kernel
observer hoặc Chromium thật trong Work.

Mục này **thay thế quy tắc miễn trừ SIGKILL tại mục 23.2**:

- Sau mẫu RAM cuối và ranh giới close, gửi một SIGTERM cho mỗi tiến trình để
  yêu cầu thoát bình thường. Chỉ exit code 0, có exit stop khớp terminal wait
  và receipt SIGTERM trước exit stop, mới có thể thuộc đóng cuối hợp lệ.
- Không miễn trừ bất kỳ kết thúc bằng tín hiệu hoặc exit code khác 0 nào.
  Nguyên nhân đã đọc trước cleanup được giữ nguyên; SIGSEGV/nonzero và SIGKILL
  không trùng tín hiệu cleanup đã gửi vẫn là crash đã biết.
- Nếu terminal signal trùng yêu cầu cleanup trước đó mà chưa chứng minh được
  nguồn gây thoát, ghi `unattributedTerminations`; `complete=false` và kết quả
  crash là INCONCLUSIVE. `crashedProcesses` chỉ đếm crash đã biết, không chứng
  minh crash=0 khi còn thiếu khả năng quy nguyên nhân.
- Sau tối đa 2 giây chờ thoát bình thường, SIGKILL chỉ dọn tiến trình còn sống.
  Có cleanup cưỡng bức thì không chứng nhận đóng cuối thành công, kể cả khi
  kill trả về thành công. Không render lại, retry benchmark hoặc dùng observer
  khác. Khi ptrace bị từ chối vẫn dừng, không tăng quyền/fallback.
- Python và TypeScript cùng kiểm quy tắc trên. `lifecycleComplete` mô tả chuỗi
  sự kiện đủ; `complete` còn yêu cầu xác định được nguyên nhân và không cleanup
  cưỡng bức. Cờ summary/expected tự nhận không ghi đè các kiểm độc lập.

Giữ nguyên exec-role đã sửa, ranh giới RAM trước close, 18 cửa sổ, ngưỡng RAM,
admission, phát hiện restart và chặn navigation/page retry. Bộ kiểm benchmark
vẫn dùng `complete`; RAM PASS và restart=0 không bù được crash INCONCLUSIVE.

### 24.3. Hồi quy và kết quả offline

Thêm bốn test hồi quy vào file test hiện có, đồng thời điều chỉnh fixture
cleanup cũ sang exit code 0. Mô hình lịch biểu chạy đúng sáu hàm cleanup/exit và
summary trích từ nguồn Python production, với kill/wait/ptrace giả. Đây là
mô hình thuần tổng hợp dùng thư viện chuẩn; không fork hay gọi ptrace native,
không là cách thử lại quyền bị từ chối trong Work.

| Hồi quy | Kết quả trực tiếp |
|---|---|
| Yêu cầu thoát bình thường, mọi tiến trình exit 0 | Lifecycle đầy đủ; không crash/unknown; giữ 541 mẫu tổng hợp và 18 cửa sổ RAM |
| SIGKILL bên ngoài chưa được đọc, có trước SIGTERM cleanup | kill cleanup trả thành công nhưng bị bỏ trong mô hình; crash vẫn bằng 1; gate crashes FAIL dù RAM PASS |
| SIGKILL bên ngoài bắt đầu ngay trước SIGKILL cưỡng bức, EXIT stop còn trong hàng đợi | Receipt SIGKILL thành công không miễn trừ; một termination chưa rõ nguồn, gate crashes và acceptance INCONCLUSIVE dù RAM PASS/restart=0 |
| Kết thúc bằng SIGTERM sau yêu cầu cleanup, hoặc summary giả báo sạch | Giữ termination chưa rõ nguồn; không công nhận complete hay đóng cuối hợp lệ |

Kiểm trên Work với Node 24.19.0/npm 11.9.0 và Python 3.12.3 hiện có, không
cài lại dependency; npm offline/ignore-scripts, không audit/fund. Test đặt
GITHUB_ACTIONS=false để không thực thi native observer:

| Kiểm trước commit | Kết quả |
|---|---|
| npm run test | 99 PASS, 1 SKIP; 91 test canvas gồm 1 native SKIP; 9 test validator PASS |
| npm run typecheck | Exit 0 |
| npm run validate | Exit 0; state hợp lệ; 13 schema, 0 failure |
| Dependency | package.json/lockfile nguyên byte so với head đã review; giữ 109 vị trí gốc |

### 24.4. Prerequisite CI và điểm chuyển bước

Native prerequisite hiện có được mở rộng thành hai kiểm trên Node tổng hợp,
với Python chính xác 3.12.3 và Node do workflow Node 20 cung cấp. Mỗi kiểm có
một root và bốn child: một exit 0, một crash SIGTERM chủ đích trước cleanup,
hai child có argv renderer/GPU. Chờ marker xác nhận handler sẵn sàng rồi mới
gửi progress **tổng hợp** 5400 và close; không render khung nào.

- `normal-exit`: root và hai child còn sống xử lý SIGTERM bằng exit 0. Phải
  có lifecycle/attribution đầy đủ, một crash chủ đích, unknown=0, đóng cuối hợp lệ.
- `forced-sigkill`: child GPU tổng hợp bỏ qua SIGTERM. Cleanup cưỡng bức phải
  giữ lifecycle đầy đủ nhưng attribution không đầy đủ, một crash đã biết và
  một termination chưa rõ nguồn; không công nhận đóng cuối hợp lệ.
- Cả hai phải có `controlPassed=true`, đúng năm process start, exec renderer/GPU
  và không RSS sau close trong log `WP004A_OBSERVER_PREREQUISITE`. Nếu runtime,
  ptrace hoặc coverage không đạt thì dừng, không fallback/dispatch/rerun.

CI của commit P1 chưa chạy tại lúc ghi hồ sơ này. Sau push cần đọc log thật
cho head mới, xác nhận native test đã chạy và cả hai kiểm trên đạt; ghi SHA,
tree, thống kê diff, số commit và link CI vào mô tả cùng PR. Không dùng kết quả
CI của head cũ hoặc gói offline ở mục 22 để chứng nhận bản sửa P1.

Sau CI xanh, bước tiếp theo là review read-only bản sửa ở bốn checkpoint mới,
rồi mới xem xét quyền merge riêng. Hai cảnh báo moderate của Vitest/mocker
gốc và vật chứng thiếu ở mục 22 tiếp tục được báo, không audit-fix hoặc GET lại
metadata. Node tổng hợp chưa chứng minh hành vi thoát của Chromium: nếu browser
thật kết thúc bằng tín hiệu chưa rõ nguồn hoặc cần SIGKILL, benchmark phải giữ
INCONCLUSIVE. Chưa có browser/MP4/RAM/performance/visual acceptance thật; các
điểm chặn browser, benchmark, license/chi phí/lưu bằng chứng và WP-005/Layout
Gallery chưa được mở bởi bản sửa này.

## 25. PR nhận lệnh tự động — chỉ chuẩn bị, chưa kích hoạt

### 25.1. Quyền hiện hành và checkpoint gốc

Lời duyệt thật của chủ dự án trong chat, được giữ nguyên phần nội dung tác vụ:

> Duyệt chuẩn bị một PR cơ chế nhận lệnh tự động cho HungQuach301/meridian-studio và cập nhật AGENTS.md theo quy tắc vừa chốt. Xác minh checkpoint trước; khác thì dừng. Cho phép CI offline tự động; chưa merge, kích hoạt lệnh thực thi, mở browser hoặc chạy benchmark. Giữ dependency, state, contracts, bằng chứng thiếu và mọi giới hạn WP-004a. Trình rõ ảnh hưởng tới checkpoint và authorization hiện có.

Đây là quyền chuẩn bị PR và CI tự động, không phải lời duyệt thực thi theo source
mới. Bản ghi này trích nội dung chat; không tự đặt một ID tin nhắn nền tảng chưa
được cung cấp. Quyền sửa AGENTS.md là ngoại lệ cụ thể đã được chủ dự án duyệt.

Checkpoint đã đọc lại độc lập trước khi sửa, ngày 2026-09-12:

| Mục | Bằng chứng đã đọc |
|---|---|
| Repository | `HungQuach301/meridian-studio`, private=true |
| Main | `7f2a966a7340a2d44e3486c947d0795251dac2a3` |
| Main tree | `e9041e269500211c6901f15da10cf3bfbb83aa81`; 109 blob |
| Draft Release | ID `387547778`, tag khai báo `wp004a-evidence-7f2a966` |
| Target | Đúng main SHA trên; draft=true, prerelease=false, published_at=null |
| Asset | Cả đối tượng Release và endpoint assets trả về `[]` |
| Lịch sử | Đủ 112 run trên hai trang 100 + 12; không có Canvas hoặc run đang hoạt động |
| Run tạo draft | `34690874856` vẫn failure; actor và triggering_actor là `HungQuach301`, event push |

Failure `RELEASE_COUNT_CHANGED` của run tạo draft tiếp tục được giữ. Đọc lại
draft độc lập không biến workflow đó thành success. Phản hồi danh sách Release
tại thời điểm lỗi vẫn thiếu; không gọi lại danh sách để dựng phản hồi lịch sử.

### 25.2. Files in scope của PR bổ sung này

Phạm vi này áp dụng riêng cho PR nhận lệnh, không viết lại phạm vi 11 file đã
merge của PR #13 hoặc các kiểm bảo toàn của PR đó:

1. `AGENTS.md`: chủ dự án duyệt trong chat; agent chuẩn bị input/workflow và
   thao tác bằng kết nối được hỗ trợ, luôn hướng dẫn bước tiếp theo chi tiết.
2. `engine/ops/work-packages/WP-004a-canvas-spike.md`: chỉ nối thêm mục 25.
3. `scripts/canvas-spike.ts`: dùng chung bộ kiểm dữ liệu authorization; thêm
   entrypoint command và lưu receipt nguồn lệnh trong claim/inventory.
4. `scripts/canvas-spike-command.ts`: admission hẹp cho đúng một slot WP-004a.
5. `scripts/canvas-spike-command.test.ts`: hồi quy tổng hợp và Git thật trong
   thư mục tạm; không browser, provider hoặc ghi GitHub.
6. `.github/workflows/canvas-spike-command.yml`: nhận push trên nhánh lệnh
   chính xác, cùng khóa concurrency với Canvas manual, job tối đa 75 phút.
7. `.github/workflows/ci.yml`: cài theo lock, bỏ lifecycle/audit; báo giới hạn
   của audit cũ, không chứng nhận lại dependency bằng dữ liệu mới.
8. `.github/workflows/hello.yml`: cùng cờ cài dependency; giữ nguyên trigger,
   kiểm offline, admission và các job ghi state/dispatch hiện có.

Không thêm package hoặc sửa package.json, lockfile, tsconfig, state, 13 contracts,
fixture/TSX/font, observer hay workflow Canvas manual. Bảo toàn 104 blob/mode gốc
ngoài năm file gốc được sửa; ba file mới làm tổng số blob thành 112. Lockfile giữ
nguyên byte nên cả 109 vị trí dependency gốc tiếp tục nguyên vẹn.

PR chuẩn bị không có `pipeline/wp004a-command.request`, không tạo nhánh lệnh,
không chứa authorization thật cho source mới. Chỉ CI/Hello offline tự chạy khi
push hoặc mở PR. Cài CI dùng `npm ci --ignore-scripts --no-audit --fund=false`:
có thể tải tarball chính xác trong lock, không giải phiên bản mới, GET lại npm
metadata, chạy lifecycle hoặc audit fix. "Offline" ở đây mô tả bộ kiểm không gọi
browser/provider; không mô tả toàn bộ job GitHub là không có mạng.

### 25.3. Giao thức lệnh và ranh giới tin cậy

Chỉ một nhánh thực thi dành riêng cho slot còn chờ:
`wp/WP-004a-run-wp004a-7f2a966-01`. File lệnh duy nhất là
`pipeline/wp004a-command.request`, mode 100644, tối đa 16384 byte, canonical JSON
UTF-8 do `JSON.stringify(value, null, 2) + '\n'` sinh. Đuôi `.request` phân biệt
lệnh điều khiển với artifact production `.json`; không sửa schema production
hoặc bộ ánh xạ validator để bỏ qua artifact không hợp lệ.

Các trường bắt buộc: `schema=WP-004a-command-v1`,
`operation=execute-one-benchmark`, `requestId=wp004a-7f2a966-01`,
`sourceTreeSha`, `releaseTag=wp004a-evidence-7f2a966`, `ownerApproval`,
`costEstimate`, `authorization` theo dữ liệu `WP-004a-run-v1` đã có.
`ownerApproval` và `costEstimate` đều giữ `id`, nội dung `text`, SHA-256 của đúng
UTF-8 text. Cả năm tham chiếu benchmark/browser/license/cost/storage phải trỏ
về cùng lời duyệt thật được giữ trong command. Trích dẫn phải có source đầy đủ,
benchmark ID và Release ID; agent phải kiểm ngữ nghĩa đủ năm phạm vi trước khi
tạo nhánh. Hash phát hiện thay đổi byte, không chứng minh tác giả hoặc biến một
văn bản tự khai thành sự đồng ý. Nguồn tin cậy là lời duyệt trong chat và push
thật dưới danh tính chủ repository; test ghi rõ SYNTHETIC, không là authorization.

Gọi S là main source đã được duyệt sau merge, T là tree của S, C là commit lệnh.
C phải có đúng một parent S và chỉ thêm đúng file request; mọi blob/mode còn lại
giữ nguyên từ S. Workflow checkout C để đọc Git objects, chép request ra thư mục
tạm rồi checkout detached S. Bộ chạy dùng source S; `GITHUB_SHA` vẫn là C. Không
sửa GITHUB_ACTOR/REF/EVENT_NAME hoặc giả context workflow_dispatch.

Admission yêu cầu GitHub Actions thật, repository private, actor và
triggering_actor đều `HungQuach301`, push tạo nhánh mới với before=zero,
after=C, không force/delete, ref đúng nhánh trên, run_attempt=1. Sau kiểm Git,
chỉ GET các endpoint cố định để đọc repo/main, đúng Release/assets, run hiện tại
và mọi trang lịch sử. Không có API tạo/sửa Release, dispatch hoặc rerun trong
bộ nhận lệnh. Token contents:write ở job chỉ phục vụ worker upload asset vào
draft hiện có; checkout không lưu credential.

Main phải còn S/T; draft phải đúng ID/tag/target S, draft=true,
prerelease=false, published_at=null và cả hai asset views đều rỗng. Run phải
khớp C/ref/push/owner/attempt và đang in_progress. Lịch sử phải đầy đủ, total
nhất quán, ID không trùng; giới hạn 1000 run là điểm dừng rõ ràng, không cắt
trang để suy ra "chưa chạy". Chỉ được có run Canvas command hiện tại; bất kỳ
run Canvas manual/command nào khác, kể cả failed/skipped, đều chặn. CI và Hello
push trên source S phải đã completed/success. Run 34690874856 phải vẫn failure
attempt 1; tên failure lấy từ log preflight đã giữ, không dựng lại Release list.

Admission read-only chạy trước các prerequisite và chạy mới lần nữa ngay trước
worker. Worker giữ claim bền vững trước browser và không ghi đè asset. Khóa
`wp004a-canvas-spike` dùng chung với manual, cancel-in-progress=false. Sai một
kiểm thì dừng; không fallback sang manual, không tự xóa branch/claim để thử lại,
không cấp slot hoặc attempt mới. Tạo nhánh lệnh chính là kích hoạt thực thi;
không được thực hiện dưới quyền chuẩn bị PR này.

### 25.4. Ảnh hưởng checkpoint và authorization

PR chưa merge không đổi main/tree hoặc Release hiện tại. Nếu merge sau một lời
duyệt riêng, main SHA/tree sẽ đổi; agent phải đọc lại cả hai và CI thật. Source
S mới phải là main đã merge, không lấy PR head, commit lệnh C hoặc tự chọn nguồn
khác. Source cũ 7f2a966 không có cơ chế mới và bị command parser từ chối rõ ràng.

Authorization cũ `wp004a-7f2a966-01`, attempt 1, $5/75 phút vẫn chỉ gắn source
7f2a966. PR này không tiêu thụ lượt đó và không chuyển lời duyệt cũ sang S.
Trước kích hoạt phải có lời duyệt cập nhật source S/tree T cho chính slot đó,
đủ năm phạm vi và dự toán có căn cứ; không phát sinh benchmark thứ hai hoặc đặt
lại ngân sách chuẩn bị. Target của draft hiện vẫn 7f2a966: muốn dùng cùng draft
với source S thì cần quyền cập nhật target riêng và đọc lại, hoặc chủ dự án
quyết định phương án khác cụ thể. Agent không tự retarget hoặc chọn Release khác.

Lần push lệnh tương lai còn tự tạo CI (ba job tối đa 10 phút) và Hello verify
(một job tối đa 10 phút), ngoài benchmark 75 phút: dự toán phải tính tối đa 115
runner-phút, chi phí lưu và điều kiện billing thật. Giá $0.006/phút được giữ ở
preflight cũ cho ra $0.69 phần compute theo giả định đó; đây không phải xác nhận
giá/billing mới hoặc tổng tiền đã phát sinh. Không tự tái dùng dự toán $1 cũ;
agent phải đối soát nguồn giá/billing và giới hạn storage trước execution, tổng
không vượt $5. CI chuẩn bị PR thuộc quyền chuẩn bị đã duyệt, không reset ledger.

### 25.5. Giới hạn và bằng chứng không đổi

- Python chính xác 3.12.3, thư viện chuẩn và Node 20; Chrome Headless Shell
  149.0.7790.0 Linux64. Archive SHA-256
  `a3b011ab4c726e215cdeb623907a09cfb48f07054a7271fdda555ee2ae4f804d`;
  executable SHA-256 `08288ffd5b22e39c652d3f4b3a37a0108a8ce167f592c7db67f10cc72e397d3a`.
  Lock SHA-256 `15bb41977e477547db464ee867f4f71f86cd300e7b09b9523e3bbcf73788843d`.
- Chỉ static rồi dynamic, tối đa hai render tuần tự, concurrency=1, mỗi bản
  180 giây/5400 khung; giữ toàn bộ BENCHMARK_SPEC và cấu hình encoding gốc.
- Quy tắc RAM/crash/SIGKILL/cleanup mục 24 nguyên vẹn: RAM trước close, 18 cửa
  sổ, crash đã biết là FAIL; termination chưa quy được nguồn hoặc cleanup cưỡng
  bức là INCONCLUSIVE. Static không đạt thì không mở dynamic. Không retry,
  fallback ptrace hoặc tăng quyền. Node tổng hợp không chứng minh Chromium.
- Native prerequisite chỉ chạy tự động trong CI trên Node tổng hợp với Python
  3.12.3; hai control normal-exit/forced-sigkill phải được đối chiếu từ log thật.
  Work không thử lại ptrace đã bị từ chối; hồi quy bootstrap Python chỉ đọc Git
  và chép input vào thư mục tạm, không observer hoặc browser.
- 144/228 bản metadata gốc còn thiếu; 84 bản giữ lại không bù toàn bộ. Cache,
  tarball và stdout/stderr gốc chưa khôi phục được không được tái tạo thành vật
  chứng cũ. Chữ ký/browser HTTP receipt gốc chưa có. Không GET lại npm metadata.
- Hai cảnh báo moderate lịch sử của Vitest/mocker 3.2.7, GHSA-82fw-gwwq-j7x9,
  chưa được sửa hoặc audit lại. Kiểm `vitest run` không mở mock dev server có
  đường lỗi đó; điều này không chứng nhận hết lỗ hổng hoặc áp dụng cho server
  công khai. Giữ dependency, chưa nâng/cài khác để xóa cảnh báo.
- Chưa có dữ liệu Chromium, video, RAM/performance hoặc owner visual acceptance.
  Benchmark vẫn cần đối soát job cuối, tải đủ video/log/evidence từ đúng draft,
  kiểm byte/hash và chủ dự án xem hình. Giữ draft private, không publish/upload
  browser/provider/Sites, WP-005 và Layout Gallery vẫn đóng.

### 25.6. Kiểm và bước tiếp theo

Bộ hồi quy mới kiểm admission, năm tham chiếu, source cũ, canonical JSON, slot,
cost/runtime/hash, event thật, một parent/một file/mode, nguồn bẩn, remote drift,
lịch sử đầy đủ, lần chạy trước đó, CI nguồn, API GET không retry và bootstrap
Python trích đúng từ workflow trên Git fixture. API và lời duyệt trong test đều
tổng hợp. Kết quả đầy đủ Node 20/Vitest/typecheck/schema và native prerequisite
phải lấy từ CI tự động của head PR này; kết quả Work với Node 24 không thay thế.

Sau push nhánh chuẩn bị, agent đọc CI/Hello rồi mở một PR, ghi SHA/tree/diff,
bảo toàn ngoài phạm vi và log thật vào mô tả PR. Sau đó:

1. Review read-only PR tại checkpoint đầy đủ; chưa merge hoặc kích hoạt.
2. Khi có quyền merge riêng, agent xác minh rồi merge và đọc lại main/tree/CI.
3. Agent chuẩn bị lời duyệt thực thi và dự toán cho S/T, cùng slot attempt 1;
   trình rõ thay đổi target của đúng draft cần được duyệt riêng.
4. Chỉ sau khi quyền và mọi admission đủ, agent tạo đúng một commit/file lệnh
   trên nhánh dành riêng bằng kết nối GitHub hiện có. Chủ dự án không phải viết
   YAML/JSON, tạo workflow hoặc bấm Run workflow.
5. Agent theo dõi đúng run tự sinh, giữ failure/giới hạn và hướng dẫn tải asset
   để kiểm byte/hash; không tự retry/rerun khi bất kỳ bước nào dừng.

### 25.7. Sửa P1 quyền đọc Actions — chưa kích hoạt

Review read-only PR #14 tại main `7f2a966a7340a2d44e3486c947d0795251dac2a3`,
main tree `e9041e269500211c6901f15da10cf3bfbb83aa81`, head
`8fe6e158d9dde382a5b8fcf7e774b572270fc2a7`, PR tree
`57dd1544369af04bda998a2be2cd94ec93753355` phát hiện thiếu `actions: read`.
Job chỉ khai báo `contents: write`, nên Actions permission là none trong khi
admission cần đọc run và toàn bộ lịch sử của repository private. Quy tắc này
được đối chiếu với [GitHub workflow permissions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#permissions)
và [quyền đọc workflow runs](https://docs.github.com/en/rest/actions/workflow-runs#get-a-workflow-run).
Kiểm 403 trước đây là mô phỏng offline, không phải run Canvas thật hoặc probe
token. Năm CI/Hello xanh và 121 test của head cũ không chứng minh quyền này đủ.

Chủ dự án duyệt sửa trong chat:

> Duyệt sửa P1 thiếu actions: read trong PR #14 tại bốn checkpoint trên, đúng ba file đã nêu; bổ sung hồi quy và kiểm CI tự động. Giữ dependency, state, contracts, bằng chứng thiếu và mọi giới hạn WP-004a. Chưa merge, kích hoạt lệnh hoặc chạy benchmark.

Bản sửa chỉ chạm ba file đã có trong phạm vi PR:

- `.github/workflows/canvas-spike-command.yml`: thêm `actions: read` tại job
  benchmark; giữ `contents: write` phục vụ storage đã có. Không cấp Actions
  write, không thay trigger/nhánh/concurrency/timeout hoặc chạy workflow.
- `scripts/canvas-spike-command.test.ts`: thêm hai hồi quy. Kiểm quyền job phải
  đúng hai mục Contents write/Actions read, không dựa vào mặc định. Kiểm full
  admission qua HTTP adapter với Git fixture thật và API tổng hợp: đường 200
  đủ run/history; 403 ở run GET hoặc history GET đều dừng ngay, không retry,
  upload/dispatch, thay source hoặc sửa request. Không mở browser.
- File WP này: nối mục 25.7, giữ toàn bộ nội dung cũ và ranh giới bằng chứng.

Bảo toàn 109 blob/mode ngoài ba file so với head đã review, cùng 104 blob/mode
ngoài phạm vi tổng PR so với main. Không đổi package.json/lockfile, state,
contracts, AGENTS.md, worker, observer hoặc các pin đã duyệt. Hồi quy quyền phải
đỏ với workflow thiếu quyền của head cũ và xanh với bản sửa. Kiểm Work dùng
Node 24.19.0/node:test trên bản TypeScript strip tạm, Python 3.12.3 cho Git
bootstrap; không cài dependency hoặc thử lại ptrace. CI tự động trên head mới
mới là bằng chứng Node 20/Vitest/typecheck/schema và native Node prerequisite;
agent phải đọc log thật rồi ghi kết quả vào mô tả cùng PR.

Đây là sửa cấu hình quyền API đọc, không là bằng chứng end-to-end của Canvas.
Không tạo request/nhánh thực thi, thử token bằng workflow mới, dispatch/rerun,
browser hoặc benchmark. Giữ failure RELEASE_COUNT_CHANGED, phần Release-list
và dependency/browser provenance còn thiếu, hai cảnh báo moderate, attempt 1,
trần $5/job 75 phút và quy tắc không reset ngân sách chuẩn bị. Main và draft
chưa đổi; authorization cũ chưa chuyển sang source mới. Sau CI, bước tiếp theo
là review read-only bản sửa tại head/tree mới trước khi xét quyền merge riêng.

## 26. Nghiệm thu riêng phục hồi tag của draft

### 26.1. Quyết định của chủ dự án — 2026-09-13

Chủ dự án đã nghiệm thu trong chat sau review execution. Trích nguyên nội dung
nghiệm thu và giới hạn liên quan; không tự đặt ID tin nhắn hoặc chữ ký nền tảng:

> Tôi nghiệm thu riêng việc phục hồi tag_name của draft release 387547778 thành wp004a-evidence-7f2a966 qua helper run 34743734728, commit C 00934d5d6b948fba0a42b4c9689ca6950dbddc3c, cùng CI 34743734681 và Hello 34743734658, đều attempt 1.
>
> Chấp nhận html_url hậu kiểm có hậu tố untagged-c15f25bc17abf6d8b00f cho lần chạy này; giữ target S, private, draft=true, prerelease=false, published_at=null và assets=[] theo review. Không coi đây là nghiệm thu toàn bộ WP-004a hoặc quyền benchmark.

Biên bản ghi nhận riêng việc phục hồi tag và chấp nhận URL của lần chạy này.
WP-004a vẫn `todo`; chưa nghiệm thu benchmark, chưa mở WP-005 hoặc Layout Gallery.
Các mục 1–25, gói nguồn, REPORT và log cũ giữ nguyên trạng thái tại thời điểm lập.
Quyết định nghiệm thu mới được nối tại đây, không sửa ngược cờ chờ nghiệm thu
trong hồ sơ execution/review trước đó.

### 26.2. Checkpoint và phạm vi helper đã thực hiện

Repository duy nhất: `HungQuach301/meridian-studio`, private=true.
Đối soát trước chuẩn bị biên bản ngày 2026-09-13T08:20:42.339Z khớp toàn bộ draft,
17 nhánh và 129 run/0 Canvas trong gói review. Đây là nhiều GET normalized,
không phải snapshot nguyên tử hoặc biên nhận HTTP gốc của connector.

| Mốc | Giá trị |
|---|---|
| Main S | `2e068c42e6c4b45dcabef6d3bc019b990d88a95f` |
| Main tree T | `b0fffa10ab989a03ab54ce01c9d10d6e83e393a7` |
| Nhánh helper | `wp/WP-004a-retarget-2e068c4` |
| Commit helper C | `00934d5d6b948fba0a42b4c9689ca6950dbddc3c` |
| Tree helper CT | `a3b8c06273b077ec9e00e7b712a0ab894460ecce` |
| Parent duy nhất H của C | `7d66b8bb26de1f65d444de224b8068dab964d54d` |

C trong mục 26 là commit helper phục hồi tag. C tại mục 25.3 mô tả commit lệnh
benchmark tương lai; không dùng commit helper làm source hoặc lệnh benchmark.

[Commit C](https://github.com/HungQuach301/meridian-studio/commit/00934d5d6b948fba0a42b4c9689ca6950dbddc3c)
có đúng một parent H; H có đúng một parent S. Một lần cập nhật không force nhánh
helper H→C đã phát sinh push thật. Diff C so H chỉ một file
`.github/workflows/wp004a-retarget-release.yml`, +1340/−150, mode 100644,
84168 byte; SHA-256 `663129510ec0ec954229f9bfdc39ec8f6ebaf1440c341b1d581bd278932a7ff3`,
blob `bacf40f6e72536ea5616f72854bdf4c747369792`.
Execution bảo toàn đủ 112 blob/mode của main, gồm dependency, lockfile, state và
contracts; helper chưa merge vào main.

### 26.3. Ba run, PATCH và receipt đã review

| Workflow | Run | Kết quả |
|---|---|---|
| Helper | [34743734728](https://github.com/HungQuach301/meridian-studio/actions/runs/34743734728) | success, attempt 1 |
| CI | [34743734681](https://github.com/HungQuach301/meridian-studio/actions/runs/34743734681) | success, attempt 1 |
| Hello | [34743734658](https://github.com/HungQuach301/meridian-studio/actions/runs/34743734658) | success, attempt 1 |

Cả ba run có head C, event push và đúng nhánh helper; actor/triggering_actor đều
HungQuach301. Năm job thực chạy success; Hello heartbeat/send-hello skipped.
CI/Hello chạy song song và helper không chờ chúng trước PATCH, đúng phạm vi
execution đã duyệt. CI/Hello cũ của H hoặc S không chứng nhận C.

Helper đã thực hiện operation `wp004a-repair-tag-387547778-01`, ghi đúng một
patchAttempt trước transport và nhận PATCH HTTP 200. Payload canonical UTF-8
132 byte, đúng bốn trường:

```json
{"draft":true,"prerelease":false,"tag_name":"wp004a-evidence-7f2a966","target_commitish":"2e068c42e6c4b45dcabef6d3bc019b990d88a95f"}
```

Payload SHA-256: `3c5144331add64938e1040d5102d5da34a42bce49e0b86f30b37cf807f76027c`.
Năm response đã review: GET release trước (2818 byte), GET assets trước (2 byte),
PATCH release (2812 byte), GET release sau (2812 byte), GET assets sau (2 byte).
Cả năm HTTP 200, đủ begin/chunk/end và byte/hash, Content-Length khớp;
response PATCH và GET release sau giống nguyên byte. Tổng 38 predicates đạt:
13 trước PATCH, 12 từ response PATCH, 13 sau PATCH.

Có một tagRepairReceipt; canonical SHA-256 của nội dung receipt là
`e636b7975bb197cb847a6b09babbbeea41c0b40f698e011cab2c2baa9dbfb0c9`.
Digest này không phải SHA-256 của file JSON bọc receipt. Review đã đối chiếu
C/CT/S/T/H, release, tag trước/sau, target, patchCount=1, attempt=1, payload,
name/body hash, lịch sử và cờ không browser/benchmark. Receipt do helper sinh,
không phải chữ ký server độc lập hoặc audit mọi hoạt động ngoài run đó.

Log execution ghi bốn bước ghép source và kiểm hash đạt, Python 3.12.3,
49 hồi quy synthetic đạt trước live API. Review và lượt chuẩn bị tài liệu này
không chạy thêm helper, hồi quy hoặc fixture. Năm response thật dùng
Content-Length; framing 64 KiB, partial/EOF/chunked và các đường 403/timeout
vẫn là bằng chứng offline đã lưu, không phải lỗi mạng đã thử trên GitHub.

### 26.4. Draft và html_url đã được chấp nhận riêng

| Trường | Trạng thái được nghiệm thu |
|---|---|
| Release ID | `387547778` |
| tag_name trước | `untagged-b3f7146405b5c9f50ebf` |
| tag_name sau | `wp004a-evidence-7f2a966` |
| target_commitish | Đúng S trong mục 26.2 |
| Repository | private=true |
| draft / prerelease | true / false |
| published_at | null |
| Assets | `[]` ở release và endpoint assets |
| updated_at sau PATCH | `2026-09-13T06:50:39Z` |
| html_url sau PATCH | [untagged-c15f25bc17abf6d8b00f](https://github.com/HungQuach301/meridian-studio/releases/tag/untagged-c15f25bc17abf6d8b00f) |

Toàn bộ JSON release chỉ đổi tag_name, updated_at và html_url qua PATCH.
html_url trước có hậu tố `untagged-b3f7146405b5c9f50ebf`; URL sau xuất hiện
trong chính response PATCH và GET hậu kiểm, không do agent chọn nguồn khác.
Payload không chứa html_url; trường này không nằm trong PRESERVE của helper.
Chủ dự án đã chấp nhận URL hậu kiểm cho đúng lần chạy này; không suy thành
cam kết ổn định của slug untagged-* hoặc quyền PATCH thêm để đổi URL.

Cùng id/node_id/API URL, target S, name/body/author/created_at và toàn bộ trường
PRESERVE được giữ. Body lịch sử ghi nguồn 7f2a966 vẫn nguyên vẹn. Matching-refs
của tag cũ và tag cần phục hồi đều rỗng; phục hồi tag_name không đồng nghĩa đã
tạo/push Git tag hoặc publish release. Chưa kiểm điều hướng URL bằng browser.

### 26.5. Lịch sử và gói bằng chứng nguyên byte

17 nhánh giữ nguyên tập tên; execution chỉ đổi đầu nhánh helper H→C. Lịch sử
đủ 129 run trên hai trang 100+29, không trùng ID và 0 Canvas. Loại đúng ba run
ở mục 26.3, 126 run cũ khớp từng bộ
`id/path/event/head_sha/run_attempt/status/conclusion`.
Hash canonical dùng JSON sort key, không khoảng trắng, UTF-8, sắp theo ID tăng:

- Baseline 126: `24aa060502cff0c10a2d5f689c29b536704d7f18043df27d5539640bccd72b28`.
- Hậu execution 129: `5292aa300af14df82c2f2a9f5544b011d334768bc29188693f76d57e3f5794ba`.

[Run 34703610757](https://github.com/HungQuach301/meridian-studio/actions/runs/34703610757)
giữ failure `DRAFT_CHANGED`;
[run 34690874856](https://github.com/HungQuach301/meridian-studio/actions/runs/34690874856)
giữ failure `RELEASE_COUNT_CHANGED`; cả hai attempt 1. Tên lỗi lấy từ log thật
đã giữ trong review, không suy từ receipt mới hoặc đổi failure thành success.
Response HTTP gốc còn thiếu của hai failure vẫn thiếu.

| Gói | Byte | SHA-256 |
|---|---:|---|
| Meridian-WP004a-CHUNKED-execution-00934d5.zip | 1750457 | `c8b0ed03928d037dd270d36dc57841c621d817dd93f252976af23d59e3810568` |
| Meridian-WP004a-CHUNKED-execution-readonly-review-00934d5.zip | 1970205 | `9adccdb878988c714cfa7dc828c26e3b72b62c27b12cb75fdaa9cb1fc741cefc` |

Đã đọc MANIFEST, REPORT, evidence và kiểm byte/hash thực tế, CRC, 39 member
execution cùng 17 member review, không tính chính MANIFEST. Các ZIP nguồn
lồng bên trong và log cũ giữ nguyên. Không dựng gói hoặc phản hồi từ tóm tắt.
Log là chuỗi decoded UTF-8 thực nhận; body .bin giải mã từ chunk log thực nhận,
không phải archive log nhị phân gốc, toàn bộ HTTP/TLS wire hoặc file RUNNER_TEMP
tải trực tiếp. Header chỉ là allowlist đã được helper ghi. Raw GITHUB_EVENT_PATH
chưa có trong gói; không dựng lại event. Không xác nhận retention chưa kiểm.

### 26.6. Giới hạn và bước tiếp theo

- Hai moderate Vitest/@vitest/mocker 3.2.7, GHSA-82fw-gwwq-j7x9 giữ nguyên;
  chưa audit lại, nâng dependency hoặc coi run xanh là hết lỗ hổng.
- 144/228 metadata npm gốc, cache/tarball/log gốc và phần response lịch sử thiếu
  tại mục 22.2/25.5 cùng REPORT vẫn thiếu. Không GET lại metadata npm, repack
  hoặc dựng response còn thiếu; năm response mới không thay vật chứng cũ.
- Browser ZIP/publisher digest/signature/HTTP receipt chưa đầy đủ theo hồ sơ.
  Chưa có Chromium, video, RAM/render, hiệu năng hoặc nghiệm thu hình ảnh.
  Hồi quy/fixture và prerequisite trên Node tổng hợp không chứng minh Chromium.
- Giữ slot `wp004a-7f2a966-01`, attempt 1, trần benchmark $5/job 75 phút,
  các pin và gate mục 24–25. Phục hồi tag và ghi biên bản không chuyển quyền
  benchmark hoặc cho phép retry/rerun, fallback, tăng quyền hay tạo slot mới.
- Giữ sổ chuẩn bị: 381 phút 05 giây tại mốc lịch sử đã ghi, 5 phút 49 giây
  đóng gói riêng và chênh lệch 453 phút 11 giây chưa giải thích. Không hỏi lại
  thời gian, đặt lại ngân sách hoặc dùng timestamp readback để lấp chênh lệch.
  Dự toán helper/CI/Hello trong REPORT vẫn là ước tính; quota, cache và billing
  thực tế chưa được xác minh, không đổi settings hoặc chuyển thành ngân sách mới.

Biên bản được chuẩn bị offline từ S, chỉ nối mục 26 của file này và bổ sung ô
trạng thái WP-004a trong backlog, vẫn giữ todo. Không tạo Git object/commit,
push, merge, PATCH, dispatch/rerun, chạy thêm test, browser hoặc benchmark.

Bước tiếp theo là review read-only diff/byte/hash của hai tài liệu, kiểm nguyên
byte toàn bộ phần WP cũ và các ô/dòng backlog khác, đối soát lại S/T/C/CT,
draft, 17 nhánh và 129 run/0 Canvas; khác thì dừng. Sau review mới trình phương án
commit/PR riêng trước thao tác ghi GitHub. Nếu sau này merge tài liệu vào main,
S/T sẽ đổi; việc đó không tự đổi target draft hoặc chuyển authorization benchmark.
Chủ dự án duyệt trong chat; agent tự lấy gói đã lưu và thực hiện phần được duyệt.

## 27. Nghiệm thu riêng execution PR #15

### 27.1. Điều kiện hiệu lực và phạm vi

Nội dung nghiệm thu tại mục này chỉ có hiệu lực sau lời chấp nhận rõ ràng
trong chat của chủ dự án đối với cả năm delta liên kết ở mục 27.2 và execution
Ready/merge đưa đúng hai tài liệu của PR #15 vào main R. Kết quả review kỹ thuật,
quyền đối soát hoặc quyền chuẩn bị tài liệu không tự thay cho quyết định đó.

Khi điều kiện trên được đáp ứng, nghiệm thu chỉ bao gồm execution hai tài liệu
`engine/ops/work-packages/WP-004a-canvas-spike.md` và `engine/ops/backlog.md`
qua [PR #15](https://github.com/HungQuach301/meridian-studio/pull/15).
Giữ nghiệm thu riêng tag/html_url tại mục 26. WP-004a vẫn `todo`; chưa nghiệm thu
toàn bộ WP-004a hoặc benchmark, chưa mở WP-005/Layout Gallery.

### 27.2. Checkpoint, delta và bằng chứng

- R: `719647149266be902030f1f899bfd732427336b2`; tree R = tree D:
  `a815757bf2f654a817c4ae612119274f09657c0a`.
- Ordered parents của R: S `2e068c42e6c4b45dcabef6d3bc019b990d88a95f`,
  D `ecdfe5d6cf118e72474be0377ba7ad321480b660`; D có parent duy nhất S.
  Nhánh tài liệu vẫn D; helper C/CT và mốc T/M giữ nguyên trong hồ sơ. R khác M.
- PR #15 closed/merged, draft=false, base main/S, head D, merge commit R;
  maintainer_can_modify=false, merged_by HungQuach301, đúng nhãn engine ID
  12112112801. Hai file tổng +175/−1, mode 100644; bảo toàn 110 blob/mode khác.
  WP giữ prefix lịch sử 144449 byte; backlog chỉ đổi một ô, vẫn todo.
- Chấp nhận riêng, khi đáp ứng mục 27.1, `pull_requests` từ `[PR #15]` sang `[]`
  của đúng các run `34749461669`, `34749461641`, `34755880116`, `34755880159`,
  `34756374431`. Mọi trường khác của năm run khớp, success/attempt 1.
  129 run gốc nguyên full object; không tuyên bố full JSON 134 run trước merge
  nguyên vẹn và không dùng projection bảy trường thay phép so đầy đủ.
- Nhật ký ghi một Ready và một merge ở tầng agent/connector; không chứng minh
  exactly-once tầng vận chuyển. Ready normalized merge_commit_sha=null khác
  full GET trước merge có M/true/clean; giữ nguyên cả hai representation.
- [CI 34765725655](https://github.com/HungQuach301/meridian-studio/actions/runs/34765725655)
  và [Hello 34765725641](https://github.com/HungQuach301/meridian-studio/actions/runs/34765725641)
  đều success/attempt 1, push/main/R, actor/triggering_actor HungQuach301.
  Bốn job validate/guardrails-push/typecheck/verify lần lượt 31/19/26/78 giây;
  bốn decoded log và raw wrapper khớp metadata. Checkout R và EVENT_CONTEXT
  thật S→R được tách khỏi fixture. Không chạy lại test hoặc lấy lại log.
- Heartbeat/send-hello skipped đúng điều kiện workflow. Giữ completed_at
  sớm hơn started_at một giây trong raw; không sửa timestamp hoặc tính duration âm.
- Đối soát tiếp hoàn tất 28/28 lời gọi đọc đã duyệt qua hai lượt; không phải
  snapshot nguyên tử. Main được quan sát lúc 2026-09-13T22:50:47.162Z;
  18 lượt còn lại kết thúc lúc 2026-09-13T23:06:27.142Z, không GET lại main.
  Đủ 18 nhánh/136 run/0 Canvas. Hai tài liệu đọc tại R khớp nguyên byte/hash.
- Ngoại lệ size đã được chủ dự án duyệt riêng: GET metadata repo và hai trường
  repo nhúng trong GET PR #15 từ 1080 sang 1081. Collection PR có đúng 30 vị trí
  đã liệt kê đổi 1080→1081, khớp index, PR number/id và repo ID/full_name theo
  quy tắc có điều kiện đã duyệt; mọi trường khác khớp. Không mở ngoại lệ toàn cục.

### 27.3. Bảo lưu và giới hạn

Giữ nguyên mọi nguồn/review/preflight/STOP/log lồng và các cờ lịch sử tại thời
điểm lập. Gói review gốc 9122748 byte, SHA-256
`6365472eab8926fd98aa5ef4ef795ce0bda2b4a914c9e0ea18bb44861981ac93`;
gói execution STOP bên trong 8745221 byte, SHA-256
`ef660a81d17225208e45f16d8eeea588fb1e2cdbdc32faf6cb1e34c47d1f86b6`.
Đối soát bổ sung nằm trong `Meridian-WP004a-completed-readonly-proposal-15-7196471.zip`;
biên nhận byte/hash của gói được bàn giao riêng trong chat, không tự tham chiếu hash.

Giữ hai failure `34703610757 DRAFT_CHANGED`, `34690874856 RELEASE_COUNT_CHANGED`,
hai moderate và mọi vật chứng thiếu; ReadTimeout mở PR và RemoteProtocolError
GET assets cũ không được thay bằng response mới. Giữ ghi chú missing/null,
blocked/clean, checker v1 lịch sử còn thiếu, checker v1 mới/output so sai và chú
giải jobs_url/logs_url của GET attempt khác GET run. Giữ cả lỗi đọc Markdown,
assertion URL lịch sử và các phân tích bổ sung; không sửa ngược raw hoặc lịch sử.

Draft 387547778 vẫn target S, tag wp004a-evidence-7f2a966, html_url hậu tố
untagged-c15f25bc17abf6d8b00f; repo private, draft=true, prerelease=false,
published_at=null và assets=[] ở cả hai endpoint. Main R không cấp quyền retarget
hoặc chuyển authorization benchmark. Chưa chứng minh response còn thiếu,
binary log archive, browser/render/RAM/hiệu năng hoặc chất lượng hình ảnh.

Giữ 0,030 USD push + 0,048 USD PR = 0,078 USD cũ. Merge ước tính 0,030 USD từ
1+1+1+2 phút làm tròn từng job theo 0,006 USD/phút; tổng 0,108 USD chỉ là ước tính.
Trần 0,66 USD, phần đã tiêu và sổ cũ nguyên; phạm vi merge hai run/bốn job/
40 phút cấu hình/0,24 USD đã dùng, không cấp lại. 150 phút/0,90 USD danh nghĩa
không là ngân sách mới. Billing/quota/cache/retention chưa xác minh.

Giữ slot `wp004a-7f2a966-01`, attempt 1, mọi giới hạn và sổ thời gian còn lại.
Nghiệm thu và chuẩn bị hồ sơ không cấp quyền ghi GitHub, Ready/merge/PATCH,
dispatch/retry/rerun, provider, browser/benchmark, đổi quyền/token/settings/quota
hoặc triển khai. Mọi bước ghi hoặc thực thi tiếp theo phải được xét riêng.
