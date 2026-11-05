# 01 — Tổng quan sản phẩm

**Cập nhật: 05/11/2026.** Weather App giúp người dùng phổ thông tìm đúng địa điểm và xem thời tiết hiện tại cùng dự báo 7 ngày trên trình duyệt máy tính/điện thoại.

## Trải nghiệm chính

Mở trang chào mừng với welcome.jpg → tìm tên → chọn một trong tối đa 5 địa điểm → nền chuyển sang trời ngày/đêm → thông tin xuất hiện lần lượt. Có thể đổi địa điểm, dùng lịch sử hoặc chuyển VI/EN.

## Phạm vi

- Current: nhiệt độ, mô tả, độ ẩm, gió, thời điểm dữ liệu. Dự báo hôm nay và 6 ngày sau.
- Nền theo thời tiết và giờ hiện tại tại địa điểm: 04:00–17:59 ngày, còn lại đêm.
- Lưu ngôn ngữ và tối đa 5 địa điểm; xử lý loading, lỗi, timeout và storage không khả dụng.
- Responsive từ 360px, hỗ trợ bàn phím và giảm chuyển động; ghi nguồn Open-Meteo.

Không có đăng nhập, backend, database, GPS, dự báo theo giờ hoặc cảnh báo thiên tai. Không thêm framework.

## Thành công

Đạt yêu cầu và test plan, không còn lỗi nghiêm trọng, đã commit và kiểm tra bản deploy. Có source hoặc Node Pass chưa đủ để coi V1 hoàn thành.
