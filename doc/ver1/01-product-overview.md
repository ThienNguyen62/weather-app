# 01 — Product Overview & Scope

**Sản phẩm:** Weather App  
**Phiên bản mục tiêu:** V1 (MVP nhỏ)  
**Trạng thái:** Draft 0.1  
**Người phát triển/chủ sản phẩm:** Cá nhân

## 1. Vấn đề cần giải quyết

Người dùng muốn biết thời tiết hiện tại và thời tiết vài ngày tiếp theo ở một thành phố mà không cần đăng nhập hay trải qua nhiều thao tác.

## 2. Product Goal

Xây dựng website đơn giản cho phép nhập tên thành phố và xem nhiệt độ, tình trạng thời tiết, độ ẩm, tốc độ gió hiện tại cùng dự báo 3 ngày; hỗ trợ tiếng Việt và tiếng Anh.

Mục tiêu học tập phụ: thực hành workflow requirements → design → implementation → testing → deployment; có một codebase dễ nâng cấp.

## 3. Người dùng mục tiêu

- Chính: bản thân người phát triển.
- Phụ: bạn bè/người dùng phổ thông có thể truy cập và thử nghiệm sau khi triển khai public.
- Không có tài khoản, vai trò quản trị hoặc hệ thống phân quyền trong V1.

## 4. Kịch bản sử dụng chính

1. Mở website bằng điện thoại hoặc máy tính.
2. Gõ `Hanoi` / `Hà Nội` và nhấn Tìm kiếm.
3. Xem tên thành phố và quốc gia, thời tiết hiện tại.
4. Xem dự báo 3 ngày (ngày hiện tại + 2 ngày kế tiếp theo múi giờ địa điểm).
5. Có thể chuyển ngôn ngữ giao diện Việt/Anh.

## 5. Trong phạm vi V1

- Tìm kiếm thành phố bằng tên.
- Hiển thị một địa điểm được chọn theo kết quả đầu tiên từ API (có tên quốc gia để nhận biết).
- Thông tin hiện tại: nhiệt độ, mô tả trạng thái thời tiết, độ ẩm, tốc độ gió, thời điểm dữ liệu.
- Dự báo 3 ngày: ngày, nhiệt độ cao nhất/thấp nhất, mô tả trạng thái thời tiết.
- Chuyển giao diện VI/EN bằng nút; mặc định tiếng Việt.
- Xử lý input không hợp lệ, không tìm thấy, lỗi mạng/API và trạng thái tải.
- Thiết kế phù hợp với điện thoại cơ bản.
- Ghi nguồn dữ liệu Open-Meteo khi sử dụng.

## 6. Ngoài phạm vi V1

- Backend riêng, database, đăng nhập hoặc tài khoản người dùng.
- Định vị GPS, bản đồ, biểu đồ nâng cao.
- Lưu lịch sử tìm kiếm/thành phố yêu thích.
- Dự báo theo giờ hoặc cảnh báo thiên tai.
- Quảng cáo, thanh toán, thu phí, SLA hoặc hệ thống giám sát chuyên nghiệp.

## 7. Các giả định cần nhớ

- V1 dùng Open-Meteo Free API cho mục đích phi thương mại, trong các giới hạn mà nhà cung cấp công bố.
- Dữ liệu thời tiết có thể thay đổi theo thời gian, và giá trị dự báo không phải cam kết chính xác tuyệt đối.
- Những địa điểm trùng tên có thể trả về địa điểm không mong muốn. Trong V1 hiển thị rõ quốc gia; cải tiến phần chọn địa điểm ở V2.
- Dùng đơn vị Celsius (`°C`), phần trăm (`%`), km/h.

## 8. Định nghĩa hoàn thành V1 (Success Criteria)

- Tất cả yêu cầu bắt buộc trong `02-requirements.md` được triển khai.
- Các test case bắt buộc trong `06-test-plan.md` đều pass.
- Trải nghiệm chính chạy trên máy tính và điện thoại (không tràn ngang ở 360px).
- Website có thể truy cập sau khi được deploy và có README hướng dẫn.

## 9. Open Questions (có thể quyết định sau)

- Cần cho người dùng chọn một trong nhiều thành phố trùng tên ngay trong V1 không? **Tạm thời: không.**
- Có cần thay đổi đơn vị đo theo ngôn ngữ không? **Tạm thời: không.**
- Có cần ghi nhớ ngôn ngữ sau khi tải lại trang không? **Tạm thời: không.**
