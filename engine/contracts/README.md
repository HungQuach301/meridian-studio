# Contracts

Xương sống của hệ thống. Mỗi artifact có đúng một schema ở đây.

## Quy tắc

1. **Agent KHÔNG được sửa bất cứ file nào trong thư mục này.** Thấy schema sai thì nêu trong mô tả
   PR và dừng lại.
2. Đổi schema chỉ qua ADR mới do chủ dự án viết.
3. Mọi stage phải validate input trước khi xử lý và validate output trước khi ghi.
4. Schema dùng JSON Schema draft 2020-12.

## Ánh xạ stage ↔ artifact

| Stage | Artifact | Schema |
|---|---|---|
| S01–S02 | `signals.json`, `topics.ranked.json` | `signals.schema.json` |
| S03 Gate 1 | `00-brief.json` | `brief.schema.json` |
| S04 | `01-dossier.md`, `01-sources.json` | `sources.schema.json` |
| S05 | `02-factcheck.json` | `factcheck.schema.json` |
| S06 | `03-outline.json` | `outline.schema.json` |
| S07 | `04-script.md` + front-matter | `script.schema.json` |
| S09 | `05-storyboard.json` | `storyboard.schema.json` |
| S10 | `06-timing.json` | `timing.schema.json` |
| S12 | `07-render-manifest.json` | `render-manifest.schema.json` |
| S14a | `08-package.json` | `package.schema.json` |
| S14b | `08-publication.json` | `publication.schema.json` |
| S14c | `09-metrics.json` | `metrics.schema.json` |
| Toàn cục | `pipeline/state.json` | `pipeline-state.schema.json` |
