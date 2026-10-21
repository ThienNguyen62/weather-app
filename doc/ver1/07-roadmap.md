# 07 — Roadmap & Versioning

Roadmap là **định hướng**, không phải lời hứa về ngày phát hành. Luôn hoàn thành V1 trước khi quyết định phạm vi V2.

| Phiên bản | Trọng tâm | Ví dụ chức năng |
|---|---|---|
| V1.0 | MVP có thể chạy, tự test | Tìm thành phố, current weather, forecast 3 ngày, VI/EN, lỗi cơ bản |
| V1.1 | Cải thiện độ ổn định, trải nghiệm | Sửa bug, tinh chỉnh UI, accessibility |
| V2.0 | Cá nhân hóa sử dụng | Danh sách kết quả thành phố trùng tên, lịch sử tìm kiếm qua localStorage, 7 ngày |
| V3.0 (nếu cần) | Mở rộng kiến trúc | Có thể chuyển sang React khi UI phức tạp, có thể thêm backend nếu có dữ liệu cần quản lý |

## Nâng cấp hay viết lại?

**Mặc định: nâng cấp ngay trên codebase.**

- Khi thêm lịch sử tìm kiếm: có thể thêm một module `storage/` mà không viết lại toàn bộ app.
- Khi thêm nhiều loại forecast: mở rộng `services/weather.js` và module UI.
- Nếu chuyển từ Vanilla JS sang React: phần UI phải thay đáng kể, nhưng phần API/logic độc lập có thể tái sử dụng hoặc điều chỉnh; đây là một đợt migration/refactor, không mặc định là “đập đi làm lại”.

## Quy tắc quản lý thay đổi

1. Yêu cầu mới → tạo backlog item, xác định đưa vào phiên bản nào.
2. Nếu chức năng thay đổi → sửa `requirements.md`, AC và test case tương ứng.
3. Sau khi test xong, tạo Git tag (ví dụ `v1.0.0`) để đánh dấu code phiên bản phát hành.
4. Với thay đổi kỹ thuật lớn, ghi vài dòng về **lý do**, **lợi ích**, **đánh đổi** trong `04-technical-design.md` hoặc file ADR mới.

## Những việc cố tình **không chuẩn bị trước** ở V1

- Không dùng React chỉ để đón đầu V3.
- Không tạo backend/database khi chưa có use case.
- Không xây authentication hoặc hạ tầng cloud phức tạp.
- Không thiết kế chức năng cho hàng triệu người dùng khi mới đang luyện project cá nhân.
