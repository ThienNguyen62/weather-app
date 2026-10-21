# 05 — Product Backlog & Quy trình Agile nhẹ

**Phương pháp:** Kanban đơn giản cho một người làm.  
**Cột công việc:** `To Do` → `Doing` → `Done`.  
**Giới hạn:** một task `Doing` tại một thời điểm nếu có thể.

## 1. Backlog V1

| Task | Nội dung | Liên quan | Ưu tiên | Trạng thái |
|---|---|---|---|---|
| T-01 | Tạo cấu trúc thư mục và tài liệu nháp | Setup | Must | Done (skeleton only) |
| T-02 | Xem lại và chốt requirements V1 | FR-01..09 | Must | Doing |
| T-03 | Thiết kế giao diện tĩnh và responsive | NFR-01, NFR-05 | Must | To Do |
| T-04 | Viết chức năng tìm thành phố qua Geocoding API | US-01 | Must | To Do |
| T-05 | Viết chức năng lấy current + daily từ Forecast API | US-02, US-03 | Must | To Do |
| T-06 | Render thông tin hiện tại và dự báo 3 ngày | US-02, US-03 | Must | To Do |
| T-07 | Hoàn thiện VI/EN và mô tả mã thời tiết | US-04 | Must | To Do |
| T-08 | Loading, validate input, không tìm thấy, lỗi mạng | US-01, US-05 | Must | To Do |
| T-09 | Hiển thị ghi nguồn dữ liệu | US-06 | Must | To Do |
| T-10 | Manual testing và sửa lỗi | Tất cả | Must | To Do |
| T-11 | Viết README hoàn chỉnh và deploy GitHub Pages | Release | Must | To Do |

**Ghi chú:** T-01 chỉ tạo tài liệu và các file code **rỗng**; chưa có giao diện hay tính năng nào được triển khai. Việc khởi tạo Git/GitHub sẽ thực hiện khi bắt đầu development.

## 2. Cách sử dụng Kanban

1. Chọn một task ưu tiên cao từ `To Do` chuyển sang `Doing`.
2. Đọc User Story, Acceptance Criteria và test case liên quan.
3. Viết code, chạy thử, ghi nhận lỗi.
4. Khi đạt Definition of Done, commit rồi chuyển sang `Done`.
5. Nếu phát hiện yêu cầu mới, thêm vào Backlog rồi cân nhắc **V1 hay V2**; không tự động nhồi vào V1.

Khi bắt đầu dùng GitHub Issues/Projects, có thể tạo một issue cho từng task và quản lý trạng thái trên Project Board. Không cần tạo hai backlog khác nhau nếu GitHub đã được sử dụng.

## 3. Definition of Done cho một task

- [ ] Hoạt động đúng theo Acceptance Criteria liên quan.
- [ ] Chạy được qua localhost và không còn lỗi nghiêm trọng khi kiểm thử.
- [ ] Các test case liên quan đã kiểm tra.
- [ ] Code rõ ràng và được commit lên Git.
- [ ] Nếu thay đổi chức năng hoặc cấu trúc, cập nhật `doc/` tương ứng.

## 4. Nhịp Agile gợi ý (không ép Sprint)

- **Trước khi làm:** chọn task hôm nay, nhắc lại AC cần đạt.
- **Trong khi làm:** xử lý lần lượt, tránh quá nhiều việc cùng lúc.
- **Sau khi làm:** kiểm thử và ghi việc chưa hoàn thành.
- **Mỗi tuần hoặc sau một chức năng:** review bản chạy được và tự hỏi điều gì nên cải tiến.

## 5. Nhật ký ngắn

| Ngày | Task | Kết quả / Blocker |
|---|---|---|
| 2026-10-21 | T-01 | Đã tạo bộ tài liệu và các file source rỗng. Chưa có HTML/CSS/JS. |
| 2026-10-21 | T-02 | Đã đồng ý phạm vi V1; đang cập nhật và kiểm tra baseline requirements. |