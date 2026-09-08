# 08 · Bắt đầu từ số không

Viết cho người chưa từng dùng Codex. Làm đúng thứ tự, không nhảy bước.
Mọi ô ```prompt``` là văn bản dán thẳng, không cần sửa gì trừ chỗ ghi `<...>`.

**Chuẩn bị:** một tài khoản GitHub, một gói ChatGPT có Codex, một trình duyệt, file `BOOTSTRAP.md`.

**Bốn giai đoạn:** Project → Chỉnh tài liệu → GitHub → Codex.
Ba giai đoạn đầu làm hoàn toàn trong ChatGPT.

---

# GIAI ĐOẠN 1 · Dựng Project trong ChatGPT

## Bước 1 · Tạo Project

Project là một thư mục chứa nhiều chat, dùng chung file và chỉ dẫn. Mọi chat trong project tự động
thừa hưởng phần Instructions — đây là lý do phải dùng Project thay vì chat rời.

1. Thanh bên trái → **Projects** → **New project**
2. Tên: `Meridian Studio`

## Bước 2 · Dán Instructions cho Project

Mở phần **Instructions** của project, dán nguyên khối này:

```prompt
Dự án: Meridian Studio (repo GitHub: meridian-studio).
Nhà máy sản xuất video YouTube phân tích tài chính cá nhân cho thị trường Mỹ,
vận hành hoàn toàn trong trình duyệt: ChatGPT Sites làm UI, GitHub repo làm nơi lưu
trạng thái, GitHub Actions làm nơi chạy xử lý. Không có server, không có database,
không có máy local.

Tôi là người mới với Codex. Hãy giả định tôi không biết thuật ngữ chuyên ngành trừ
khi tôi dùng nó trước.

Nguyên tắc bắt buộc khi trả lời trong project này:
1. Luôn đọc PROJECT.md, AGENTS.md và engine/ops/guardrails.md trong file đính kèm trước khi
   đề xuất bất cứ gì.
2. Không đề xuất giải pháp cần server chạy liên tục, database ngoài, hay máy local.
3. Không đề xuất sửa file trong thư mục /contracts. Nếu thấy schema sai, nêu vấn đề
   và dừng lại, không tự sửa.
4. Không mở rộng phạm vi. Nếu tôi hỏi A, chỉ trả lời A. Không đề xuất thêm B, C, D.
5. Khi tôi yêu cầu viết tài liệu, viết đúng MỘT file mỗi lần, đầy đủ, dán được ngay.
6. Nếu yêu cầu của tôi mâu thuẫn với tài liệu đính kèm, nói thẳng chỗ mâu thuẫn
   trước khi làm.
7. Trả lời bằng tiếng Việt. Code, tên biến, comment trong code bằng tiếng Anh.
   Nội dung sinh cho kênh YouTube bằng tiếng Anh Mỹ.
```

## Bước 3 · Upload đúng 4 nhóm file

Trong project, phần **Files**, tải lên:

| Upload | Vì sao |
|---|---|
| `BOOTSTRAP.md` | Chứa toàn bộ 63 file tài liệu. Một file là đủ |
| Hai transcript kênh tham chiếu | Bằng chứng gốc để đối chiếu khi bàn về format |
| Ba ảnh lưới video kênh tham chiếu | Cơ sở cho thumbnail spec |

**Không upload gì khác.** File thừa làm loãng ngữ cảnh và khiến trả lời kém đi rõ rệt.

## Bước 4 · Quy ước đặt tên chat

Mỗi chat là một việc. Đặt tên theo mẫu `W{wave} · {chủ đề}`:

```
W0 · Chỉnh tài liệu nền
W0 · Chốt chi phí và nhịp
W1 · WP-000 Scaffold
W1 · Cockpit UI
W2 · Remotion
```

**Một chat cho một chủ đề.** Chat dài lan man là nguyên nhân số một khiến chất lượng trả lời tụt.
Khi thấy chat đã đi lạc chủ đề, mở chat mới.

---

# GIAI ĐOẠN 2 · Chỉnh tài liệu nền (vẫn trong ChatGPT)

Anh chỉ cần đọc và chỉnh **3 file**: `PROJECT.md`, `engine/docs/04-nfr.md`, `channels/us-personal-finance/channel-bible.md`.
Bảy file bắt buộc còn lại dùng nguyên. Xem `START-HERE.md` để biết vì sao.

## Bước 5 · Chat đầu tiên

Tạo chat mới trong project, đặt tên **`W0 · Chỉnh tài liệu nền`**. Dán:

```prompt
Trong BOOTSTRAP.md đính kèm có file PROJECT.md. Hãy:
1. Trích ra nội dung hiện tại của PROJECT.md.
2. Đặt cho tôi tối đa 5 câu hỏi để cá nhân hoá file này (tên dự án, tài khoản GitHub,
   mục tiêu riêng của tôi).
3. Chưa viết lại file. Chỉ hỏi.
```

Trả lời xong, dán tiếp:

```prompt
Dựa trên câu trả lời của tôi, viết lại toàn bộ PROJECT.md.
Giữ nguyên cấu trúc và mục non-goals. Xuất ra dạng markdown đầy đủ trong một khối code
để tôi copy. Không giải thích thêm.
```

## Bước 6 · Xác nhận trần chi phí

Trần đã chốt: **20 USD/tập, 606 USD/tháng, 30 tập/tháng**. Anh không cần quyết gì thêm, chỉ cần
xác nhận con số khớp với thực tế túi tiền.

Chat mới: **`W0 · Xác nhận chi phí`**

```prompt
Trong BOOTSTRAP.md có file engine/docs/04-nfr.md với trần chi phí đã chốt:
20 USD/tập, 606 USD/tháng, 30 tập/tháng.

Ước tính giúp tôi chi phí thực tế cho một tập video 20 phút gồm:
- Nghiên cứu và kiểm chứng bằng LLM
- Viết kịch bản 3.500 từ
- Sinh storyboard cho ~200 scene
- Sinh voice-over 20 phút bằng TTS
- Sinh 10-15 ảnh nền
- Sinh gói packaging

Cho tôi khoảng dao động, và chỉ ra hạng mục nào chiếm phần lớn chi phí.
Nếu ước tính vượt 20 USD, đề xuất cách cắt giảm theo thứ tự trong mục
"Nếu chi phí trung bình vượt 20 USD/tập" của file đó.
Chưa sửa file.
```

Nếu ước tính lệch nhiều so với 20 USD, dán tiếp:

```prompt
Viết lại toàn bộ engine/docs/04-nfr.md với trần mới: <số> USD/tập, <số> USD/tháng.
Cập nhật cả bảng cảnh báo sớm (70% và 90%) theo con số mới.
Xuất markdown đầy đủ trong một khối code.
```

## Bước 7 · Chỉnh channel bible

Chat mới: **`W0 · Channel Bible`**

```prompt
Trong BOOTSTRAP.md có file channels/us-personal-finance/channel-bible.md. Đọc nó cùng với hai transcript và
ba ảnh thumbnail đính kèm.

Hỏi tôi 5 câu để cá nhân hoá phần định vị và giọng kênh. Đặc biệt hỏi rõ: tôi có muốn
xuất hiện trong video (giọng thật, mặt thật) hay hoàn toàn ẩn danh.
Chưa viết lại file.
```

Lưu ý: câu hỏi ẩn danh hay không quan trọng hơn vẻ ngoài của nó. Ở nhịp 7 tập/tuần, việc có mặt
người thật trong ít nhất một tập mỗi tuần là biện pháp phòng ngừa rủi ro R1.

---

# GIAI ĐOẠN 3 · Đưa lên GitHub

## Bước 8 · Tạo repo

1. `github.com` → nút `+` góc phải trên → **New repository**
2. Repository name: `meridian-studio`
3. Chọn **Private**
4. Tích **Add a README file**
5. **Create repository**

## Bước 9 · Dán BOOTSTRAP.md vào repo

1. Trong repo, bấm **Add file** → **Create new file**
2. Ô tên file gõ: `BOOTSTRAP.md`
3. Dán toàn bộ nội dung file `BOOTSTRAP.md`
4. Cuộn xuống, bấm **Commit changes**

Nếu file quá lớn để dán một lần, dùng **Add file → Upload files** rồi kéo file vào.

## Bước 10 · Dán 3 file đã chỉnh ở Giai đoạn 2

Với mỗi file (`PROJECT.md`, `engine/docs/04-nfr.md`, `channels/us-personal-finance/channel-bible.md`):

1. **Add file** → **Create new file**
2. Gõ **đường dẫn đầy đủ**, ví dụ `engine/docs/04-nfr.md`. GitHub tự tạo thư mục khi anh gõ dấu `/`
3. Dán nội dung → **Commit changes**

Ba file này sẽ ghi đè bản trong BOOTSTRAP khi Codex bung file ở bước sau — nên phải dán **trước**.

---

# GIAI ĐOẠN 4 · Codex

## Bước 11 · Kết nối Codex với repo

1. Mở `chatgpt.com/codex`, đăng nhập
2. Bấm **Connect to GitHub** → cửa sổ GitHub bật lên → **Install and Authorize**
3. Ở màn hình chọn quyền, chọn **Only select repositories** → chọn đúng `meridian-studio`.
   **Không cấp quyền toàn bộ tài khoản.**
4. Quay lại Codex, chọn repo `meridian-studio` → **Create environment**
5. Bật **Agent internet access** — cần để tải Remotion và thư viện

**Phân biệt quan trọng:** ứng dụng GitHub trong ChatGPT thường chỉ **đọc** repo để phân tích.
Để **sinh, sửa và đẩy code** thì phải dùng Codex.
- Chat trong Project = bàn bạc, viết tài liệu.
- Codex = thi công code.

## Bước 12 · Task đầu tiên — bung BOOTSTRAP

Trong Codex, chọn repo, dán:

```prompt
Đọc BOOTSTRAP.md ở gốc repo. File này chứa toàn bộ tài liệu dự án, mỗi file được phân
tách bằng dòng đánh dấu dạng:

<<<FILE: đường/dẫn/file.md>>>
...nội dung...
<<<END>>>

Nhiệm vụ:
1. Tạo đúng từng file theo đường dẫn và nội dung đã cho.
2. KHÔNG sửa nội dung, KHÔNG thêm file, KHÔNG bớt file.
3. Ba file sau đã tồn tại trong repo với phiên bản mới hơn — GIỮ NGUYÊN bản trong repo,
   không ghi đè bằng bản trong BOOTSTRAP:
   PROJECT.md, engine/docs/04-nfr.md, channels/us-personal-finance/channel-bible.md
4. Sau khi tạo xong toàn bộ, xoá BOOTSTRAP.md.
5. Mở một pull request duy nhất, mô tả PR có đủ 4 mục: Đã làm gì / Đã kiểm thế nào /
   File đã chạm / Rủi ro còn lại.
```

Codex chạy trong sandbox riêng và mở một pull request. Anh mở PR, xem tab **Files changed**,
kiểm ba thứ: đúng số file, ba file được giữ nguyên, BOOTSTRAP đã bị xoá. Đúng thì **Merge**.

## Bước 13 · Task thứ hai — WP-000

```prompt
Đọc PROJECT.md, AGENTS.md, engine/ops/guardrails.md và engine/docs/01-architecture.md.
Thực hiện đúng engine/ops/work-packages/WP-000-scaffold.md.

Ràng buộc:
- Chỉ chạm các file liệt kê trong mục "Files in scope" của WP.
- Chỉ thêm dependency có tên trong mục "Ràng buộc" của WP.
- Không viết logic nghiệp vụ.
- Chạy được acceptance test trong WP trước khi mở PR.

Mở một pull request duy nhất, mô tả PR đủ 4 mục theo AGENTS.md.
```

## Bước 14 · Khi PR sai

Đừng sửa tay. Comment vào PR và giao lại task:

```prompt
PR #<số> chưa đạt. Vấn đề:
1. <mô tả cụ thể vấn đề 1>
2. <mô tả cụ thể vấn đề 2>

Đọc lại engine/ops/guardrails.md và engine/ops/definition-of-done.md.
Sửa trên đúng nhánh của PR này, không mở PR mới.
Không thay đổi gì ngoài các vấn đề tôi nêu.
```

Sửa tay thì agent không học, lần sau sai y hệt.

---

# Nhịp làm việc từ đây

Với mỗi WP tiếp theo, lặp đúng 5 bước:

1. Trong chat project (`W1 · ...`), bàn để viết file `WP-XXX.md`. Prompt mẫu:

```prompt
Tôi cần viết work package tiếp theo: WP-<số> <tên>.
Đọc engine/ops/wp-template.md, engine/ops/backlog.md và engine/docs/07-delivery-plan.md trong BOOTSTRAP.

Viết đầy đủ file engine/ops/work-packages/WP-<số>-<slug>.md theo đúng 7 mục của template.
Mục "Files in scope" phải liệt kê đường dẫn chính xác, không dùng dấu sao.
Mục "Acceptance test" phải là lệnh chạy được hoặc bước kiểm thủ công xác minh được.
Xuất markdown đầy đủ trong một khối code.
```

2. Commit file WP vào repo bằng giao diện GitHub.
3. Sang Codex, giao task trỏ tới đúng file WP đó.
4. Đọc PR → merge hoặc yêu cầu sửa.
5. Cập nhật `engine/ops/backlog.md`.

**Nguyên tắc bất di bất dịch: một WP = một task Codex = một PR.**

---

# Sai lầm hay gặp của người mới

| Sai lầm | Hậu quả | Cách tránh |
|---|---|---|
| Bảo agent "làm hết đi" | PR khổng lồ không đọc nổi, merge mù, hệ thống vỡ sau 3 wave | Một WP một task |
| Đọc hết 63 file trước khi bắt đầu | Rối, nản, bỏ cuộc | Chỉ 10 file ở `START-HERE.md` |
| Viết trước toàn bộ contract và prompt pack | Viết trong lúc chưa biết gì, phải viết lại | Viết đúng trước wave cần |
| Sửa tay khi PR sai | Agent không học, lần sau sai y hệt | Comment vào PR, giao lại task |
| Upload cả chục file vào Project | Trả lời loãng, chất lượng tụt | Chỉ 3 nhóm file ở Bước 3 |
| Một chat dùng cho mọi việc | Ngữ cảnh nhiễu, agent quên chỉ dẫn | Một chat một chủ đề |
| Cấp quyền GitHub cho toàn bộ tài khoản | Bề mặt rủi ro lớn không cần thiết | Only select repositories |
| Nhảy sang Wave 2 khi Wave 1 chưa xong | Nợ kỹ thuật dồn, mất kiểm soát | Đọc DoD trong `07-delivery-plan.md` |
