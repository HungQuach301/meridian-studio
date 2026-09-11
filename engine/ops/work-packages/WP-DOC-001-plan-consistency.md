# WP-DOC-001 · Sửa ba điểm lệch của kế hoạch

**Wave:** 2 · **Loại:** tài liệu vận hành
**Phụ thuộc:** WP-004 đã merge và nghiệm thu
**Trạng thái:** in-review — chưa merge, chưa nghiệm thu

## 1. Mục tiêu

Thống nhất số layout đầu và thứ tự Layout Gallery, đồng thời sửa các dòng backlog
bị chèn/lặp để giao việc đúng gói. Đây là gói tài liệu riêng; không hoàn tất
WP-004a hoặc đặc tả triển khai Gallery.

## 2. Input

Repository duy nhất: `HungQuach301/meridian-studio`, private.

- Main được duyệt: `be9e72620e4c6195fd30076af2012900d84c3eb6`.
- Tree: `3ec3c4770468abe3d777a63ce2d88dde4ac6253a`; 103 file.
- State blob: `3ba90b96e8ee3c6d8774d81eb82da8c96a10c6f5`; 88 byte, có newline cuối.
- State SHA-256: `5783182b5c082cf78166e2df38caa46999a25ede101b1568dc54ccef8b40ae36`.
- CI 34488474798 và Hello 34488474882: success, attempt 1.
- Trước lượt ghi: 84 workflow run, gồm 31 Hello; không có run đang chạy.
- Đọc PROJECT, AGENTS, guardrails, architecture, DoD, wp-template, backlog,
  delivery plan, WP-006a và CI hiện có tại commit trên.

Checkpoint khác trước ghi thì dừng; không tự chọn nguồn mới. Các run tự động do
nhánh/PR của gói này được duyệt có thể làm lịch sử tăng sau lần ghi đầu tiên.

## 3. Output

- Dòng WP-006 trong backlog đổi từ ba thành năm layout đầu, giữ Wave/phụ thuộc/todo.
- Đầu WP-006a đổi dependency từ WP-005 sang WP-006, khớp backlog.
- Dòng WP-011/WP-021 trở về đúng năm cột; giữ dependency hiện ghi là WP-009a
  và WP-015a, không suy ra dependency nghiệp vụ mới.
- Xóa bản lặp thứ hai của WP-009b/WP-017a và hai dòng cụt WP-010/WP-016;
  giữ các bản đầy đủ ban đầu.
- Thêm một dòng WP-DOC-001 với trạng thái in-review và liên kết tới hồ sơ này.
- Một PR tài liệu, mô tả đủ bốn mục và kết quả kiểm trên đúng SHA.

Delivery plan đã ghi năm layout nên không cần sửa. Gói này không thay đổi format,
token, dữ liệu hay danh sách layout đóng.

## 4. Files in scope

```
engine/ops/work-packages/WP-DOC-001-plan-consistency.md
engine/ops/backlog.md
engine/ops/work-packages/WP-006a-layout-gallery.md
```

WP-006a chỉ được sửa dependency ở đầu file. Backlog chỉ được sửa các dòng mục 3.
Mọi file khác, gồm WP-004a, delivery plan, runbook, code, workflow, package/lockfile,
contracts, loader/Cockpit và pipeline/state.json, giữ nguyên tại commit nguồn.

## 5. Ràng buộc và quyền

- Dependency được phép thêm: không. Không nâng hoặc giải quyết cây package mới.
- Chủ dự án duyệt chuẩn bị đúng ba file, kiểm tra, commit/push nhánh riêng,
  một PR và CI tự động; tối đa **20 phút riêng**, chưa merge.
- Nhánh: `wp/WP-DOC-001-plan-consistency`. Không force push hoặc ghi main.
- CI tự động dùng workflow và lockfile hiện có; không thêm route hoặc dùng CI
  để giải quyết metadata Remotion đang bị chặn.
- Không browser preparation, render, dispatch/rerun, provider/token, Release,
  Sites, thay settings hoặc mua gói. Không cấp quyền thực thi từ các mức chi phí
  tham chiếu trong NFR; không kết luận Actions miễn phí.
- Không chuyển ngân sách/quyền của WP-004a hoặc WP trước sang gói này.
- Giữ nguyên hồ sơ đã nghiệm thu, bốn acceptance của canvas và các gate người.
- NFR liên quan: giữ cổng chất lượng trước mở rộng sản xuất; không tạo hành vi
  runtime hoặc xử lý dữ liệu/secret mới. Chủ dự án chỉ xem/duyệt trên trình duyệt.

## 6. Acceptance test

Agent thực hiện và ghi bằng chứng trong PR; chủ dự án không chạy lệnh:

1. So diff từ main được duyệt: đúng ba file; WP-006a đúng một thay thế ở đầu file.
2. Mỗi dòng dữ liệu backlog có năm cột; không ID trùng hoặc dòng cụt; không mất
   ID cũ. Chỉ các sửa mục 3 và dòng WP-DOC-001 được phép khác.
3. Mọi dòng done, dòng WP-004a và các dòng không thuộc phạm vi giữ nguyên.
4. So tree/blob toàn repo: file ngoài phạm vi giữ nguyên; state đúng 88 byte/hash.
5. Quét nội dung repo tìm dấu hiệu credential và đối soát hit tài liệu; không
   in giá trị nhạy cảm hoặc tự sửa tài liệu được bảo vệ.
6. Đọc CI push trên commit nhánh: `npm run test`, `npm run validate`,
   `npm run typecheck` và guardrails. Sau đó mở PR, đọc CI ngữ cảnh PR và Hello
   verify; heartbeat/send-hello phải skipped. Chưa đạt hoặc hết giờ thì báo rõ.

Kiểm bảng/diff là kiểm tài liệu. CI xanh không là bằng chứng render, crash, RAM,
chất lượng Gallery hoặc ngân sách thực thi.

## 7. Definition of Done và giới hạn bàn giao

Theo definition-of-done, áp cho gói tài liệu này. Điều kiện stage/idempotence
không áp dụng vì không thêm stage hoặc code. Không có thao tác vận hành mới để
sửa runbook. Chưa tự ghi done trước chủ dự án nghiệm thu.

- [ ] Diff chỉ có ba file và đúng nội dung được duyệt.
- [ ] Kiểm bảng, bảo toàn tree/state và quét credential đã đối soát.
- [ ] CI push và PR đạt trên đúng nguồn; không dispatch/rerun.
- [ ] PR đủ Đã làm gì / Đã kiểm thế nào / File đã chạm / Rủi ro còn lại.
- [ ] Chủ dự án đã xem diff và chốt nghiệm thu; merge là phê duyệt riêng.

Các mục trên được đối soát bằng kết quả thực tế trong PR để không tạo commit
chỉ cập nhật checkbox sau mỗi lượt CI.

WP-004a vẫn todo và bị chặn trước cài/push bởi metadata/lockfile chưa đủ; quyền
PR tài liệu này không gỡ giới hạn truy cập đó. Chưa có hai render thật, chưa mở
WP-005. Output/Files in scope và các phần còn lại của WP-006a chưa được chuẩn hóa
đầy đủ; phải lập đặc tả phù hợp kiến trúc trước khi triển khai Gallery.

Nếu PR này được merge sau phê duyệt riêng, nguồn main sẽ đổi. Việc tiếp tục
WP-004a cần chủ dự án chốt checkpoint mới; không tự dùng commit mới thay mốc cũ.

## 8. Sổ thời gian và bước tiếp theo

Bắt đầu lượt WP-DOC-001: 2026-09-11T00:12:05.650Z.
Ngân sách được duyệt: 20 phút riêng. Thời gian thực tế tới các mốc commit/CI/bàn
giao được ghi trong mô tả PR và phản hồi cuối; không tính thời gian chờ chủ dự án.

Chủ dự án mở PR → Files changed để xem ba file → Checks để xem đúng SHA →
đọc Rủi ro còn lại. Chưa bấm Merge nếu chưa có phê duyệt merge riêng.
