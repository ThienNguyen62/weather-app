# 05 — Product Backlog

**Cập nhật 05/11/2026.** Nguồn tiến độ chính: doc/ver1/05-backlog.md. Chỉ một task Doing; có source hoặc Node Pass chưa đồng nghĩa Done.

| Task | Nội dung | Trạng thái |
|---|---|---|
| T-01 | Cấu trúc và tài liệu ban đầu | Done — skeleton lịch sử |
| T-02 | Đồng bộ yêu cầu và tài liệu | To Do — đã cập nhật; chờ review/commit |
| T-03 | Responsive | To Do — source có, chờ trình duyệt |
| T-04 | Tìm/chọn tối đa 5 địa điểm | To Do — mock Pass, chờ API thật |
| T-05 | Current và Forecast 7 ngày | To Do — mock Pass, chờ API thật |
| T-06 | Render current và 7 ngày | To Do — mock Pass, chờ trình duyệt |
| T-07 | VI/EN và mô tả WMO | To Do — mock Pass, chờ trình duyệt |
| T-08 | Loading, validation, lỗi | To Do — chờ manual |
| T-09 | Ghi nguồn | To Do — chờ mở liên kết thật |
| T-10 | Manual và sửa lỗi | To Do — sau UI-02 |
| T-11 | GitHub Pages và release | To Do — chưa deploy |
| UI-01 | Giao diện xanh/SVG cũ | To Do — được thay thế bằng UI-02, không coi Done |
| UI-02 | Welcome, nền ngày/đêm, 7 ngày, skill và chuyển cảnh | Doing — chờ xác minh trình duyệt |

## Definition of Done

Đạt AC, có bằng chứng trong test plan; chạy localhost không lỗi nghiêm trọng; tài liệu đúng và đã commit. Release cần kiểm tra bản deploy.

## Nhật ký 05/11/2026

- Giữ chọn địa điểm và lịch sử; chuyển dự báo từ 3 lên 7 ngày. Tạo ảnh sky-day.webp/sky-night.webp và skill weather-atmosphere-ui.
- Bổ sung ảnh welcome.jpg do người dùng cung cấp cho trang mở đầu. Chỉ màn hình weather dùng sky-day trong [04:00,18:00) và sky-night thời gian còn lại, theo giờ hiện tại của địa điểm.
- Thêm crossfade nền, nội dung xuất hiện tuần tự và 7 thẻ lệch nhịp; không phát lại khi tick/đổi VI/EN; hỗ trợ reduced motion.
- Sửa tiếng Việt lỗi mã hóa trong tài liệu của lần cập nhật trước; đồng bộ requirements, stories, thiết kế và hướng dẫn chạy.
- Test logic dùng API/DOM mô phỏng; ca trình duyệt chưa chạy do browser access host không khả dụng ở lần kiểm tra trước. Không suy ra manual Pass. Thay đổi hiện tại chưa commit/push/deploy.

## Bước kế tiếp

Mở Live Server, kiểm tra welcome → chọn → thời tiết → Đổi địa điểm ở 360/768/1280px; ghi Pass/Fail và sửa lỗi trước khi đánh dấu Done.
