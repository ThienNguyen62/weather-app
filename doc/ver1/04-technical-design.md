# 04 — Technical Design (định hướng cho V1)

> Đây là thiết kế kỹ thuật nhỏ gọn, **chưa có mã nguồn nào được triển khai**. Mục đích là giúp người mới biết mỗi file phụ trách việc gì.

## 1. Tech Stack

| Thành phần | Lựa chọn V1 | Lý do |
|---|---|---|
| Giao diện | HTML5, CSS3 | Cơ bản, không phụ thuộc framework |
| Logic | JavaScript ES Modules | Tách file đơn giản, thực hành DOM/Fetch |
| Tìm địa điểm | Open-Meteo Geocoding API | Tên địa điểm → tọa độ |
| Thời tiết | Open-Meteo Forecast API | Tọa độ → dữ liệu hiện tại + dự báo |
| Source Control | Git + GitHub | Có lịch sử, dễ chia sẻ/test |
| Deploy | GitHub Pages (dự kiến) | Phù hợp website tĩnh |
| Backend/DB | Chưa dùng | Không có chức năng cần lưu dữ liệu server |

## 2. Sơ đồ luồng dữ liệu

```text
User nhập tên thành phố
       |
       v
app.js (kiểm tra input, quản lý loading/error)
       |
       v
services/geocoding.js --GET--> Geocoding API
       |                      <- name, country, latitude, longitude
       v
services/weather.js   --GET--> Forecast API
       |                      <- current + daily (3 ngày)
       v
ui/render.js (hiển thị kết quả lên DOM)
       |
       v
Người dùng xem thời tiết + ghi nguồn
```

## 3. Các endpoint dự kiến

**Geocoding:**

```text
GET https://geocoding-api.open-meteo.com/v1/search?name=Hanoi&count=1&language=vi
```

- Input: tên địa điểm (`name`), ngôn ngữ (`language`).
- Output cần dùng: `results[0].name`, `country`, `latitude`, `longitude`, `timezone`.
- Có thể không có `results`; xử lý riêng lỗi 'không tìm thấy'.
- `count=1` là quyết định đơn giản cho V1; có thể tăng kết quả và cho chọn trong V2.

**Forecast:**

```text
GET https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=3&timezone=auto&temperature_unit=celsius&wind_speed_unit=kmh
```

- Tọa độ trên là **ví dụ minh họa**, khi chạy phải lấy từ Geocoding API, không hardcode.
- `current`: nhiệt độ, độ ẩm, mã thời tiết, tốc độ gió và thời điểm.
- `daily`: 3 phần tử ứng với ngày địa phương, nhiệt độ max/min, mã thời tiết.
- `timezone=auto`: dữ liệu theo múi giờ địa điểm.
- Chỉ sử dụng các trường thực tế có trong phản hồi; nếu thiếu trường bắt buộc cần báo lỗi.

## 4. Cấu trúc thư mục

```text
weather-app-v1/
├── index.html                 # File rỗng — sẽ tạo giao diện sau
├── css/
│   └── style.css              # File rỗng — sẽ viết CSS sau
├── src/
│   ├── app.js                 # Gắn sự kiện, điều phối tác vụ
│   ├── services/
│   │   ├── geocoding.js       # Hàm tìm tọa độ
│   │   └── weather.js         # Hàm lấy thời tiết
│   ├── ui/
│   │   └── render.js          # Hàm render kết quả, thông báo lỗi
│   └── i18n/
│       └── translations.js    # Chuỗi VI/EN
├── doc/                       # Requirements, design, backlog, test, roadmap
└── README.md                  # Cách cài/chạy dự án
```

## 5. Trách nhiệm module

- `app.js`: đọc giá trị ô tìm, kiểm tra input, điều khiển luồng async, cập nhật trạng thái loading và gọi các hàm khác.
- `services/geocoding.js`: chỉ liên quan HTTP/geocoding + chuẩn hóa kết quả địa điểm.
- `services/weather.js`: chỉ liên quan HTTP/forecast + kiểm tra và chuyển dữ liệu thành cấu trúc có thể render.
- `ui/render.js`: tạo/cập nhật HTML bằng DOM; không gọi API.
- `i18n/translations.js`: tập hợp các câu chữ VI/EN (có thể thêm mô tả WMO sau).

Điểm hay của cách chia này là khi thay API hoặc giao diện ở phiên bản sau, bạn không cần sửa tất cả file cùng một lúc.

## 6. Quy tắc triển khai kỹ thuật

1. Dùng `fetch` và `async/await`.
2. Kiểm tra `response.ok` và xử lý `try/catch`, không chỉ dựa vào `response.json()`.
3. Không tin rằng trường JSON luôn tồn tại; kiểm tra dữ liệu quan trọng trước khi hiển thị.
4. Không gắn dữ liệu từ API vào HTML bằng `innerHTML` không kiểm soát; ưu tiên `textContent` khi chèn văn bản.
5. Thời tiết là dữ liệu động, test không so sánh với một nhiệt độ cố định.
6. Không đưa API key vào frontend. Với Free API phi thương mại hiện tại không cần key.
7. Chạy dự án bằng localhost (VS Code Live Server hoặc HTTP server), không mở trực tiếp file.

## 7. Nguồn chính thức

- [Open-Meteo Weather Forecast API](https://open-meteo.com/en/docs)
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
- [Open-Meteo Free API Terms](https://open-meteo.com/en/terms)
- [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

Khi đăng công khai dự án, ghi nguồn Open-Meteo theo yêu cầu và kiểm tra lại điều khoản sử dụng.

## 8. Quy?t ??nh tri?n khai V1

- Gi? CSS t?i `src/css/style.css` theo c?u tr?c th?c t?. Entry point duy nh?t l? `index.html` ? g?c.
- Form submit d?ng chung cho n?t v? Enter; trim v? ki?m tra ?t nh?t 2 k? t? tr??c khi g?i API.
- M?t l??t t?m c? timeout 20 gi?y cho c? hai request; kh?a form khi t?i v? m? l?i trong finally.
- T?m m?i ?n d? li?u c?. ??i ng?n ng? d?ng l?i state, kh?ng g?i l?i API; t?n ??a ?i?m gi? theo k?t qu? l?n t?m.
- Ng?y gi? l? gi? ??a ?i?m t? API; ??nh d?ng c?c th?nh ph?n b?ng UTC ?? kh?ng b? ??i sang timezone m?y.
- D? li?u b?t bu?c thi?u/sai b? t? ch?i; m? WMO ch?a bi?t c? m? t? d? ph?ng.
- Kh?ng th?m th? vi?n, backend, database ho?c c?ng c? build.
