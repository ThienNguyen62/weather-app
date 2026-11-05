# 04 — Thiết kế kỹ thuật

**Cập nhật 05/11/2026.** HTML/CSS/JavaScript ES Modules; không build, backend hoặc database.

## Luồng

index.html → app.js → Geocoding → tối đa 5 địa điểm → chọn → Forecast → state → render.js. Từng request có timeout 20 giây, AbortController và finally mở lại form. Lỗi không được lưu vào history.

Geocoding dùng count=5 và language; địa điểm là `{id,name,country,admin1,latitude,longitude}`. Forecast dùng forecast_days=7, timezone=auto, Celsius và km/h; trả dữ liệu chuẩn hóa `{timezone,time,temperature,humidity,wind,code,days}`. days có 7 phần tử `{date,code,max,min}`, liên tiếp từ ngày current.time. Kiểm tra HTTP/JSON/trường bắt buộc và timezone hợp lệ.

## Giao diện và nền

Hai trạng thái welcome/weather trong cùng HTML, không có chuyển trang vật lý. Mở app luôn welcome. Khung nền `.sky` dùng `assets/welcome.jpg`. Hai lớp `.sky-day` và `.sky-night` dùng ảnh WebP nội bộ; khi weather, chỉ lớp ứng với giờ địa điểm có opacity 1. Chuyển opacity 0.8 giây tạo crossfade và giữ màu dự phòng nếu ảnh không tải được.

scene.js dùng đồng hồ hiện tại ở timezone địa điểm: 04:00 ≤ giờ < 18:00 là ngày; ngoài khoảng là đêm. app.js tick theo phút và visibilitychange. Giờ dữ liệu current.time hiển thị riêng, không dùng làm đồng hồ hiện tại. Lớp CSS mây/mưa/sương/tuyết bổ sung cho ảnh; mô tả chữ luôn còn.

Sau khi chuyển sang weather, mô tả xuất hiện ở 0.2s, số liệu 0.35s, tiêu đề forecast 0.5s; bảy thẻ bắt đầu từ 0.65s, cách nhau 0.07s. render giữ forecast DOM khi ngôn ngữ/days không đổi; đổi VI/EN tạo thẻ không có entrance. Quay về welcome rồi chọn lại sẽ phát hiệu ứng mới. prefers-reduced-motion tắt animation và transition.

## Module và xác minh

app.js điều phối state; services kiểm tra dữ liệu; render.js chỉ cập nhật DOM qua textContent; scene.js tính giờ và nhóm WMO; preferences.js lưu VI/EN cùng tối đa 5 địa điểm không trùng, không lưu weather. CSS responsive từ mobile.

Skill tái sử dụng tại `.agents/skills/weather-atmosphere-ui/SKILL.md`. Node test mô phỏng không xác minh hình ảnh chuyển động thật. Xem test plan và backlog; chưa deploy.
