# Weather App

Ứng dụng HTML/CSS/JavaScript thuần, dùng Open-Meteo; không cần npm hoặc bước build.

## Chạy và sử dụng

Mở thư mục trong VS Code, nhấp phải `index.html` → **Open with Live Server**. Dùng localhost, không mở bằng file:// vì ứng dụng dùng ES Modules. Cần Internet để tải thời tiết.

- Mở trang luôn hiện lời chào trên ảnh `assets/welcome.jpg`, không tự gọi API.
- Nhập ít nhất 2 ký tự, chọn một trong tối đa 5 địa điểm; tải thành công chuyển sang màn hình thời tiết.
- Nền chuyển mờ sang `sky-day.webp` từ 04:00 đến trước 18:00, hoặc `sky-night.webp` trong thời gian còn lại, theo đồng hồ hiện tại ở timezone địa điểm.
- Thông tin xuất hiện lần lượt: mô tả, số liệu, tiêu đề dự báo, từng thẻ của 7 ngày. Đổi VI/EN hoặc tick đồng hồ không phát lại hiệu ứng. Chế độ giảm chuyển động tắt hiệu ứng.
- Hiển thị °C, độ ẩm %, gió km/h, thời điểm dữ liệu và hôm nay cùng 6 ngày kế tiếp. Lớp mây/mưa/sương/tuyết bổ sung cho nền; luôn có mô tả bằng chữ.
- Lưu VI/EN và 5 địa điểm gần nhất không trùng ID; chỉ lưu khi Forecast thành công. Chọn lịch sử lấy thời tiết mới; có nút xóa.
- Đổi địa điểm quay lại ảnh welcome. Storage hỏng/bị chặn có fallback; request có timeout 20 giây.

## Source và kiểm thử

`src/app.js` điều phối state; services lấy và kiểm tra dữ liệu; `ui/render.js` hiển thị; `ui/scene.js` chọn ngày/đêm và trạng thái trời; storage lưu lựa chọn; i18n chứa VI/EN.

Chạy `node tests/logic.mjs` nếu máy có Node. Test dùng API/DOM mô phỏng, không thay thế kiểm tra API thật và layout.

- [Bản đồ source](doc/ver1/root.md)
- [Yêu cầu](doc/ver1/02-requirements.md)
- [Backlog](doc/ver1/05-backlog.md)
- [Test plan](doc/ver1/06-test-plan.md)
- [Skill thiết kế](.agents/skills/weather-atmosphere-ui/SKILL.md)

## Giới hạn và phát hành

Ngày/đêm là quy tắc 04:00–18:00 do người dùng chọn, không phải AM/PM hoặc giờ mặt trời mọc/lặn. Đồng hồ nền cập nhật mỗi phút và khi quay lại tab; thời điểm dữ liệu API được hiển thị riêng. Không tự tải lại dữ liệu thời tiết.

Cập nhật ngày **05/11/2026**. Chưa xác minh đầy đủ trên trình duyệt; chưa commit/push/deploy thay đổi này. Sau khi test localhost đạt yêu cầu, review và commit rồi cấu hình GitHub Pages từ nhánh chứa source, thư mục /(root); kiểm tra lại sau deploy.

Nguồn: [Open-Meteo](https://open-meteo.com/), [Forecast API](https://open-meteo.com/en/docs), [Geocoding API](https://open-meteo.com/en/docs/geocoding-api).
