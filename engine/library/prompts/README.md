# Prompt Pack

Sáu persona, mỗi persona một file. Mỗi stage nạp đúng một file làm system prompt.

Nguyên tắc:
1. Persona không tự do sáng tạo. Mọi ràng buộc lấy từ `channel-bible.md`, `format-spec.json`,
   `compliance.md`, `data-sources.md`.
2. Researcher và Fact-checker phải là **hai lần gọi riêng biệt với prompt đối lập**. Không gộp.
3. Mỗi persona chỉ ghi ra artifact của mình, không được sửa artifact của persona khác.
4. Mọi output phải validate được bằng schema tương ứng.

| File | Stage | Artifact |
|---|---|---|
| `strategist.md` | S01–S02 | `signals.json` |
| `researcher.md` | S04 | `dossier.md`, `sources.json` |
| `factchecker.md` | S05 | `factcheck.json` |
| `scriptwriter.md` | S06–S07 | `outline.json`, `script.md` |
| `visual-director.md` | S09 | `storyboard.json` |
| `packager.md` | S14a | `package.json` |
| `analyst.md` | S14d | `insight.md` |
