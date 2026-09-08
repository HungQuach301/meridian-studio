# 09 · Danh mục tài liệu

> **Đừng đọc file này trước.** Nếu anh mới bắt đầu, đọc `START-HERE.md` — nó chỉ liệt kê 10 file
> bắt buộc. File này là danh mục đầy đủ để tra cứu, không phải danh sách việc phải làm.

Cột **Tầng**: `BẮT BUỘC` = cần trước khi bắt đầu · `W{n}` = viết trước Wave n · `SỐNG` = viết dần
trong lúc chạy · `THAM KHẢO` = đọc một lần rồi để đó.

Toàn bộ tài liệu của dự án, ý nghĩa và ai đọc. Không có tài liệu nào ngoài danh sách này.

## Tầng A · Định hướng (người viết, agent chỉ đọc)

| File | Nội dung | Ý nghĩa | Ai đọc |
|---|---|---|---|
| `PROJECT.md` **[BẮT BUỘC]** | Tên, naming block, mục tiêu, non-goals, nguyên tắc | Điểm neo duy nhất. Đổi tên dự án chỉ sửa ở đây | Người + agent |
| `README.md` | Cửa vào repo, bản đồ thư mục | Chỉ đường cho người mới | Người |
| `AGENTS.md` **[BẮT BUỘC]** | Chỉ dẫn thường trực cho Codex | File agent đọc tự động mọi task. Quan trọng nhất của build pack | Agent |
| `engine/docs/00-vision.md` **[THAM KHẢO]** | Vì sao làm, khán giả, tiêu chí thành công đo được | Ngăn dự án trôi sang "làm cho vui" | Người |
| `engine/docs/01-architecture.md` **[BẮT BUỘC]** | Ba mặt phẳng, luồng, quyết định, giới hạn nền tảng | Bản vẽ kỹ thuật. Agent tra ở đây thay vì tự chọn | Người + agent |
| `engine/engine/docs/02-adr/ADR-0001..0005` | Mỗi quyết định lớn: bối cảnh, phương án loại, lựa chọn, hệ quả | Lịch sử **tại sao**. Ngăn lật lại quyết định cũ mỗi lần gặp khó | Người + agent |
| `engine/docs/03-glossary.md` **[THAM KHẢO]** | Định nghĩa 15 thuật ngữ lõi | Anh và agent nói cùng một thứ tiếng | Người + agent |
| `engine/docs/04-nfr.md` **[BẮT BUỘC]** | Trần chi phí, thời gian, chất lượng, quota, bảo mật | Ràng buộc agent luôn quên nếu không viết ra | Agent |
| `engine/docs/05-runbook.md` **[SỐNG]** | Chạy tập, xử lý sự cố, rollback, xoay khoá | Sổ tay vận hành hằng ngày | Người |
| `engine/docs/06-risk-register.md` **[SỐNG]** | 12 rủi ro: phòng ngừa, giảm thiểu, dấu hiệu sớm | Rà ở đầu mỗi wave | Người |
| `engine/docs/07-delivery-plan.md` | 7 wave, từng bước, outcome, DoD | Kế hoạch triển khai | Người |
| `engine/docs/08-getting-started.md` | Từng bước khởi động với ChatGPT Work + Codex | Hướng dẫn cho người mới | Người |
| `engine/docs/09-document-index.md` | Chính file này | Bản đồ tài liệu | Người |

## Tầng B · Contract (xương sống)

| File | Artifact tương ứng | Ý nghĩa |
|---|---|---|
| `engine/contracts/README.md` | — | Quy tắc đổi contract + bảng ánh xạ stage ↔ artifact |
| `engine/contracts/signals.schema.json` | `signals.json` | Tín hiệu chủ đề và bảng chấm điểm. Chứa bộ lọc `thresholdMatrixFeasible` |
| `engine/contracts/brief.schema.json` | `00-brief.json` | Đề tài + thesis. Ràng buộc `createdBy: human` |
| `engine/contracts/sources.schema.json` | `01-sources.json` | Sổ nguồn. Publisher giới hạn theo danh sách trắng |
| `engine/contracts/factcheck.schema.json` | `02-factcheck.json` | Kết quả đối chất + mức rủi ro YMYL |
| `engine/contracts/outline.schema.json` | `03-outline.json` | 7 mốc cấu trúc, ma trận 3 tầng, cầu nối tò mò |
| `engine/contracts/script.schema.json` | `04-script.md` | Ràng buộc đủ 6 thiết bị và ≥3 thuật ngữ lexicon |
| `engine/contracts/storyboard.schema.json` | `05-storyboard.json` | Scene, layout đóng, license bắt buộc |
| `engine/contracts/timing.schema.json` | `06-timing.json` | Căn chỉnh VO, ràng buộc loudness |
| `engine/contracts/render-manifest.schema.json` | `07-render-manifest.json` | Chunk render song song + kết quả QA |
| `engine/contracts/package.schema.json` | `08-package.json` | 5 title, 3 thumbnail, description, chapter |
| `engine/contracts/publication.schema.json` | `08-publication.json` | Trạng thái đăng, khai báo AI, quota đã dùng |
| `engine/contracts/metrics.schema.json` | `09-metrics.json` | Số liệu ở 3 mốc thời gian |
| `engine/contracts/pipeline-state.schema.json` | `pipeline/state.json` | Trạng thái toàn cục, cockpit đọc file này |

## Tầng C · Build pack

| File | Nội dung | Ý nghĩa |
|---|---|---|
| `engine/ops/guardrails.md` **[BẮT BUỘC]** | 23 điều cấm và phải làm | Hàng rào. Thiếu nó agent sẽ "cải tiến" và làm vỡ hệ thống |
| `engine/ops/definition-of-done.md` | DoD chung cho mọi WP | Chuẩn nghiệm thu, tránh tranh cãi |
| `engine/ops/wp-template.md` | Mẫu 7 mục của một work package | Bảo đảm mọi WP đủ thông tin để agent không phải đoán |
| `engine/ops/backlog.md` | 27 WP xếp theo wave và phụ thuộc | Bảng điều khiển tiến độ |
| `engine/ops/work-packages/WP-000..003` | 4 WP đầu, đã viết đầy đủ | Đủ để bắt đầu Wave 1 ngay |

## Tầng D · Thư viện nghiệp vụ (tài sản lâu dài nhất)

| File | Nội dung | Ý nghĩa |
|---|---|---|
| `channels/us-personal-finance/channel-bible.md` **[BẮT BUỘC]** | Định vị, khán giả, giọng, 6 pillar, cấm kỵ | Bản sắc kênh. Đổi ở đây thì cả kênh đổi |
| `genres/data-explainer/format-spec.json` **[BẮT BUỘC]** | 7 mốc cấu trúc + 6 thiết bị nội dung, máy đọc được | Kết quả teardown mã hoá thành ràng buộc. Quyết định chất lượng đầu ra hơn mọi phần code |
| `channels/us-personal-finance/title-formulas.md` **[W5]** | 7 khuôn tiêu đề bản Mỹ | Packager sinh 5 title theo đây |
| `channels/us-personal-finance/thumbnail-spec.md` **[W5]** | 4 slot cố định, lý do bỏ mascot | Giữ tính bất biến của khuôn, thay lớp hình ảnh |
| `genres/data-explainer/visual-system.md` **[W2]** | Palette, typography, chart grammar, motion | Agent không được tự chọn màu hay font |
| `channels/us-personal-finance/lexicon.md` **[W3]** | 10 thuật ngữ sở hữu bản tiếng Anh | Xây thương hiệu tư tưởng bằng ngôn ngữ |
| `channels/us-personal-finance/topic-map.md` **[W6]** | Bộ lọc chọn đề tài + 12 tập đầu | Signal Scan đọc để biết khoảng trống ở đâu |
| `genres/data-explainer/compliance.md` **[W3]** | YMYL, disclaimer, khai báo AI, bản quyền | Ba lớp bảo vệ trước rủi ro R1 và R7 |
| `channels/us-personal-finance/data-sources.md` **[W3]** | Danh sách trắng 8 nguồn số liệu Mỹ | Researcher chỉ được lấy số từ đây |
| `genres/data-explainer/prompts/README.md` | Nguyên tắc chung prompt pack | |
| `genres/data-explainer/prompts/strategist.md` | Persona S01–S02 | |
| `genres/data-explainer/prompts/researcher.md` | Persona S04 | |
| `genres/data-explainer/prompts/factchecker.md` | Persona S05, đối kháng với Researcher | Phải là hai lần gọi riêng, không gộp |
| `genres/data-explainer/prompts/scriptwriter.md` | Persona S06–S07 | Prompt quan trọng nhất |
| `genres/data-explainer/prompts/visual-director.md` | Persona S09 | |
| `genres/data-explainer/prompts/packager.md` | Persona S14a | |
| `genres/data-explainer/prompts/analyst.md` | Persona S14d | |
| `portfolio/references/anhbataichinh/teardown.md` | Phân tích kênh tham chiếu | Nguồn của `format-spec.json`, `title-formulas.md`, `thumbnail-spec.md` |

## Tầng E · Cấu hình và mã

| File | Nội dung |
|---|---|
| `config/secrets.example.md` | **Tên** secret cần khai, không bao giờ chứa giá trị |
| `.gitignore` | Chặn binary và secret |
| `CHANGELOG.md` | Nhật ký theo wave |
| `pipeline/state.json` | Trạng thái khởi tạo rỗng |
| `.github/workflows/` | Sinh ở Wave 1 (WP-001, WP-002) |
| `engine/app/` | Sinh ở Wave 1 (WP-003) |
| `templates/` | Sinh ở Wave 2 (WP-005, WP-006) |

## Tầng F · Sinh tự động, không viết tay

`episodes/{id}/00-brief.json` → `09-insight.md`. Pipeline ghi ra, anh không tạo thủ công.
