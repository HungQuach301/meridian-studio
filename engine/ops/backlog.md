# Backlog

Một WP = một task Codex = một PR. Không giao hai WP trong một task.

| WP | Tên | Wave | Phụ thuộc | Trạng thái |
|---|---|---|---|---|
| WP-000 | **Scaffold cấu trúc dự án — VIỆC ĐẦU TIÊN** | 1 | — | done — [PR #5](https://github.com/HungQuach301/meridian-studio/pull/5); [acceptance Loại 2 đạt](https://github.com/HungQuach301/meridian-studio/actions/runs/34292799413); [CI main đạt](https://github.com/HungQuach301/meridian-studio/actions/runs/34300050168) |
| WP-VAL-001 | Kiểm giả định khán giả (tuỳ chọn, song song) | 0–2 | — | optional |
| WP-001 | CI hardening | 1 | WP-000 | done — [PR #6](https://github.com/HungQuach301/meridian-studio/pull/6); [acceptance Loại 2 đạt](https://github.com/HungQuach301/meridian-studio/actions/runs/34305316494); [CI main sau merge đạt](https://github.com/HungQuach301/meridian-studio/actions/runs/34307853514) |
| WP-002 | Workflow hello + dispatch | 1 | WP-000, WP-001 | done — [PR #7](https://github.com/HungQuach301/meridian-studio/pull/7); chủ dự án nghiệm thu [heartbeat](https://github.com/HungQuach301/meridian-studio/actions/runs/34327921569), [sender](https://github.com/HungQuach301/meridian-studio/actions/runs/34330111639) và [receiver](https://github.com/HungQuach301/meridian-studio/actions/runs/34330212617); cả ba run success, attempt 1 |
| WP-003a | **Spike:** Sites có nạp mã động không | 1 | WP-000 | done — chủ dự án nghiệm thu hồ sơ kết luận và Function/UTF-8 trên Sites v1; [PR #8](https://github.com/HungQuach301/meridian-studio/pull/8), [PR #9](https://github.com/HungQuach301/meridian-studio/pull/9), [ADR-0006 Chấp nhận](../docs/02-adr/ADR-0006-cockpit-delivery.md), [hồ sơ](work-packages/WP-003a-sites-loader-spike.md#10-hồ-sơ-kết-luận-đã-nghiệm-thu); [CI sau merge](https://github.com/HungQuach301/meridian-studio/actions/runs/34371852854) và [Hello sau merge](https://github.com/HungQuach301/meridian-studio/actions/runs/34371852756) success, attempt 1; giữ nguyên các phần chưa kiểm trong ADR-0006 |
| WP-003 | Cockpit UI shell | 1 | WP-001, WP-003a | done — [PR #10](https://github.com/HungQuach301/meridian-studio/pull/10); chủ dự án nghiệm thu [snapshot rỗng](https://github.com/HungQuach301/meridian-studio/blob/4f56a162fbe3184f00e87ba5ca39a938f412f73a/engine/app/README.md#hồ-sơ-nghiệm-thu-snapshot-rỗng-wp-003) tại commit a75be6c1b583c820389648bed6f4eb5cca333ce9; [hồ sơ đóng](work-packages/WP-003-cockpit-shell.md#8-hồ-sơ-đóng-wp-003); [CI sau merge](https://github.com/HungQuach301/meridian-studio/actions/runs/34422376087) và [Hello sau merge](https://github.com/HungQuach301/meridian-studio/actions/runs/34422376095) success, attempt 1; giữ các phần chưa kiểm |
| WP-004 | Nút dispatch từ UI | 1 | WP-002, WP-003 | todo |
| WP-004a | **SPIKE: canvas liên tục 6000x3400** | 2 | WP-002 | todo |
| WP-005 | Remotion setup + render mẫu | 2 | WP-004a | todo |
| WP-006 | Ba layout đầu | 2 | WP-005 | todo |
| WP-006a | **CỔNG CHẶN:** Layout Gallery + duyệt chất lượng | 2 | WP-006 | todo |
| WP-007 | Stage TTS + ASR timing | 2 | WP-005 | todo |
| WP-008 | Ghép ffmpeg + caption | 2 | WP-006, WP-007 | todo |
| WP-009 | Xem video trên cockpit | 2 | WP-008 | todo |
| WP-009a | Interface state backend + provider | 3 | WP-000 | todo |
| WP-009b | Golden set 5 brief trong CI | 3 | WP-001 | todo |
| WP-010 | Stage S04 Research + sổ nguồn | 3 | WP-001 | todo |
| WP-011 | Stage S05 Fact-check | 3 | WP-009a | Interface state backend + provider | 3 | WP-000 | todo |
| WP-009b | Golden set 5 brief trong CI | 3 | WP-001 | todo |
| WP-010 | todo |
| WP-012 | Stage S06 Outline | 3 | WP-011 | todo |
| WP-013 | Stage S07 Script | 3 | WP-012 | todo |
| WP-014 | Gate 2 editor trên cockpit | 3 | WP-013 | todo |
| WP-015 | Stage S09 Storyboard | 4 | WP-013 | todo |
| WP-015a | **S09.5 Preflight — 12 kiểm tra tĩnh** | 4 | WP-015 | todo |
| WP-017a | **S11.5 Proof Render** | 4 | WP-017 | todo |
| WP-016 | Mở rộng 7 layout còn lại (qua gallery) | 4 | WP-006a | todo |
| WP-017 | Stage S11 Asset + license ledger | 4 | WP-015 | todo |
| WP-018 | Render matrix song song | 4 | WP-016, WP-017 | todo |
| WP-019 | Auto-QA kỹ thuật + QA thị giác + Gate 3 | 4 | WP-018 | todo |
| WP-020 | OAuth YouTube | 5 | — | todo |
| WP-021 | Sinh thumbnail | 5 | WP-015a | **S09.5 Preflight — 12 kiểm tra tĩnh** | 4 | WP-015 | todo |
| WP-017a | **S11.5 Proof Render** | 4 | WP-017 | todo |
| WP-016 | todo |
| WP-022 | Stage S14a Packaging | 5 | WP-019, WP-021 | todo |
| WP-023 | Stage S14b Upload + quota meter | 5 | WP-020, WP-022 | todo |
| WP-024 | Stage S14c Metrics | 5 | WP-023 | todo |
| WP-025 | Stage S14d Insight + auto-PR | 6 | WP-024 | todo |
| WP-026 | Fast Lane | 6 | WP-019 | todo |
