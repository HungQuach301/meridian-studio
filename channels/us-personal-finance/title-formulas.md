# Title Formulas

Bảy khuôn rút từ teardown kênh tham chiếu, đã bản địa hoá sang tiếng Anh Mỹ.
Packager sinh 5 tiêu đề mỗi tập, mỗi tiêu đề gắn nhãn `formula` theo `package.schema.json`.

## Nguyên tắc xuyên suốt
**Tiêu đề nói về NGƯỜI XEM, không nói về chủ đề.** Nếu bỏ được chữ "you"/"your" mà câu vẫn tự nhiên,
tiêu đề đó chưa đạt.

| # | Formula | Khuôn | Ví dụ |
|---|---|---|---|
| 1 | `numbered-list` | `{N} {things} that {consequence}` | `6 Expenses That Quietly Eat 40% Of Your Paycheck` |
| 2 | `binary-choice` | `{A} or {B}: Which One Is Actually {loaded adjective}?` | `Renting or Buying: Which One Is Actually The Trap?` |
| 3 | `expose` | `Who's Really {surprising claim}?` / `The Truth About {familiar thing}` | `Who's Actually Faking Being Rich?` |
| 4 | `counter-intuitive-command` | `Got {amount}? Don't {obvious action} Yet` | `Got $100K Saved? Don't Invest It Yet` |
| 5 | `age-or-number-anchor` | `At {age}: Where Do You Actually Stand?` | `At 45, Where Should Your Net Worth Actually Be?` |
| 6 | `geo-compare` | `Why {place A} Beats {place B} For {goal}` | `Why Austin Beats Seattle For Building Wealth` |
| 7 | `trend-hook` | `{Current trend} — {caution}` | `The Pickleball Business Boom — Read This First` |

## Ràng buộc kỹ thuật
- ≤ 100 ký tự, lý tưởng 45–65 để không bị cắt trên mobile.
- Title Case, không viết hoa toàn bộ.
- Tối đa một dấu `?` hoặc `!`.
- Không clickbait sai sự thật: điều tiêu đề hứa phải có trong video (chính sách metadata gây hiểu lầm).
- Không dùng số liệu trong tiêu đề nếu không có claimId tương ứng.
