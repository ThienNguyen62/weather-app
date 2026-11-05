# Weather App — bản đồ source

**Cập nhật 05/11/2026.** Chạy bằng Live Server theo README; tiến độ tại 05-backlog.md.

1. index.html: lời chào, form, danh sách, current, forecast và các lớp nền.
2. src/app.js: state, submit, chọn địa điểm, history, VI/EN, Đổi địa điểm, tick mỗi phút và visibilitychange.
3. src/services/: geocoding lấy tối đa 5 địa điểm; weather kiểm tra và chuẩn hóa current + 7 ngày.
4. src/ui/render.js: state → DOM; giữ thẻ forecast qua tick để không lặp entrance. scene.js: WMO → nhóm trời và timezone → ngày/đêm.
5. src/storage/preferences.js: lưu ngôn ngữ và 5 địa điểm không trùng, không lưu Forecast.
6. src/i18n/translations.js: nhãn và mô tả VI/EN. src/css/style.css: responsive, lớp nền và animation.

## Ảnh và hiệu ứng

assets/welcome.jpg dành cho màn hình mở đầu. assets/sky-day.webp dành cho weather từ 04:00 đến trước 18:00; sky-night.webp dùng thời gian còn lại theo đồng hồ địa điểm. Nền crossfade rồi nội dung lần lượt hiện; reduced motion bỏ chuyển động. Không dùng giờ quan trắc cũ hoặc giờ máy để chọn nền.

Skill tại .agents/skills/weather-atmosphere-ui/SKILL.md mô tả các quy tắc để cập nhật UI tiếp. Xem 04-technical-design.md để biết timing và 06-test-plan.md để xác minh.

Node Pass với API/DOM mô phỏng không chứng minh layout, ảnh chuyển cảnh hoặc accessibility thực tế. Chưa hoàn tất manual/deploy.
