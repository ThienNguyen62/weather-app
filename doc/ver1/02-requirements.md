# 02 — Yêu cầu phần mềm V1

**Baseline 1.1 — cập nhật theo yêu cầu ngày 05/11/2026; chờ xác minh đầy đủ.**

## Chức năng bắt buộc

| ID | Yêu cầu |
|---|---|
| FR-01 | Tìm bằng nút hoặc Enter; trim, tối thiểu 2 ký tự; input sai không gọi API. |
| FR-02 | Hiện tối đa 5 địa điểm, có tên, tỉnh/bang nếu có, quốc gia; chỉ gọi Forecast sau khi chọn, theo đúng tọa độ. |
| FR-03 | Hiện nhiệt độ °C và thời điểm dữ liệu theo giờ địa điểm, ghi nhãn rõ. |
| FR-04 | Mô tả WMO bằng VI/EN; mã lạ có mô tả dự phòng. |
| FR-05 | Độ ẩm %, gió km/h; không dùng dữ liệu giả khi lỗi. |
| FR-06 | Đúng 7 ngày liên tiếp: hôm nay và 6 ngày sau theo địa điểm; mỗi ngày có ngày, max/min và mô tả. |
| FR-07 | Đổi VI/EN không reload/fetch lại; lưu lựa chọn, mặc định VI khi chưa lưu. |
| FR-08 | Trạng thái ban đầu, tìm/chờ tải, input sai, không tìm thấy, lỗi API/mạng/JSON/dữ liệu, timeout 20 giây; luôn mở lại form để thử lại. |
| FR-09 | Liên kết ghi nguồn Open-Meteo mở được. |
| FR-10 | Lưu 5 địa điểm mới nhất, không trùng ID, chỉ sau Forecast thành công; chọn lịch sử tải mới; có nút xóa; storage lỗi không làm app dừng. |
| FR-11 | Mở trang luôn có lời chào và welcome.jpg; không tự fetch. Đổi địa điểm trở về lời chào. |
| FR-12 | Sau chọn thành công, dùng sky-day.webp/sky-night.webp và lớp thời tiết thay icon; giữ chữ mô tả và màu nền dự phòng. |
| FR-13 | Ban ngày là [04:00,18:00), còn lại đêm, theo đồng hồ hiện tại ở IANA timezone địa điểm; cập nhật mỗi phút và khi tab hiện lại. |
| FR-14 | Nền crossfade trước; mô tả → số liệu → tiêu đề dự báo → 7 thẻ lần lượt xuất hiện. Tick/đổi VI/EN không phát lại; reduced motion tắt animation/transition. |

## Phi chức năng

| ID | Yêu cầu |
|---|---|
| NFR-01 | Dùng được từ 360px, không tràn ngang. |
| NFR-02 | Kiểm tra Chrome, Edge và Firefox hiện có trên máy kiểm thử. |
| NFR-03 | Không đăng nhập, backend, database hoặc thu thập thông tin cá nhân. |
| NFR-04 | Đơn vị nhất quán: °C, %, km/h; phân biệt current và forecast. |
| NFR-05 | Form có label; Tab/Enter dùng được, focus rõ, thông báo dễ đọc, reduced motion được tôn trọng. |
| NFR-06 | Lỗi không gây treo form hoặc hiển thị undefined/NaN. |
| NFR-07 | Tách service/state/render/storage để dễ học và bảo trì. |

JavaScript thuần, ảnh nội bộ, không công cụ build. Node tests mô phỏng bổ sung cho manual; không coi là bằng chứng layout. Tên địa điểm giữ theo kết quả tìm. Không lưu Forecast. Quy tắc ngày/đêm không phải AM/PM hoặc sunrise/sunset.

Xem [stories](03-user-stories.md), [thiết kế](04-technical-design.md), [kiểm thử](06-test-plan.md).
