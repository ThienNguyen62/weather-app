# 03 — User Stories và tiêu chí chấp nhận

**Cập nhật 05/11/2026.**

| Story | Nhu cầu | Tiêu chí chấp nhận |
|---|---|---|
| US-01 | Tìm đúng thành phố | Nút/Enter tương đương; trim tối thiểu 2 ký tự; tối đa 5 lựa chọn; Forecast đúng tọa độ sau chọn; phân biệt không tìm thấy và lỗi. |
| US-02 | Xem current | °C, mô tả WMO, độ ẩm %, gió km/h, thời điểm dữ liệu; không undefined/NaN. |
| US-03 | Chuẩn bị tuần tới | Đúng 7 ngày liên tiếp theo địa điểm, hôm nay + 6; có max/min và mô tả; không lẫn dữ liệu lần trước. |
| US-04 | Dùng VI/EN | Nhãn, mô tả, lỗi đổi không reload/fetch; nhớ ngôn ngữ; mặc định VI nếu chưa lưu. |
| US-05 | Hiểu trạng thái lỗi | Loading dễ thấy, khóa gửi lặp, timeout 20 giây; có thể thử lại sau lỗi. |
| US-06 | Biết nguồn | Có liên kết Open-Meteo mở được. |
| US-07 | Có trang mở đầu và nền địa phương | Mở trang dùng welcome.jpg, không tự fetch; sau thành công dùng sky-day/sky-night theo [04:00,18:00) ở timezone địa điểm. Đổi địa điểm quay lại welcome. |
| US-08 | Chuyển cảnh nhẹ nhàng | Nền mờ chuyển, mô tả rồi số liệu rồi 7 thẻ xuất hiện lần lượt; không lặp khi tick/đổi ngôn ngữ; reduced motion bỏ hiệu ứng. |
| US-09 | Xem lại địa điểm | Lịch sử 5 ID duy nhất, mới nhất trước, chỉ lưu thành công; chọn lại tải mới; xóa không xóa ngôn ngữ; storage hỏng/bị chặn vẫn dùng app. |

## Definition of Done

Đã kiểm tra AC trên localhost, ghi kết quả; không còn lỗi nghiêm trọng; tài liệu đúng source và thay đổi đã commit. Ca chưa chạy giữ Not Run.
