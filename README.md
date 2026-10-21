# Weather App V1

Ứng dụng thời tiết bằng HTML5, CSS3, Vanilla JavaScript ES Modules và Open-Meteo. Không có bước build, npm, backend hay database.

## Chạy trên Windows bằng VS Code Live Server

1. Mở toàn bộ thư mục project trong VS Code.
2. Nếu chưa có, cài extension **Live Server** của **Ritwick Dey** từ Extensions.
3. Nhấp chuột phải vào `index.html` ở thư mục gốc, chọn **Open with Live Server**.
4. Mở địa chỉ localhost mà Live Server cung cấp (thường là `http://127.0.0.1:5500`). Không mở bằng `file://`.
5. Nhập `Hanoi`, nhấn Tìm kiếm hoặc Enter. Cần Internet để gọi API.

## Chức năng

- Tìm thành phố, chọn kết quả đầu tiên và hiển thị quốc gia.
- Thời tiết hiện tại: °C, mô tả, độ ẩm %, gió km/h, thời điểm dữ liệu theo giờ địa điểm.
- Dự báo hôm nay và hai ngày sau, nhiệt độ cao/thấp và mô tả.
- VI/EN không reload; giao diện responsive, nhãn form và thông báo trạng thái.
- Kiểm tra input, loading, không tìm thấy, lỗi mạng/API, dữ liệu thiếu và timeout 20 giây.

## Cấu trúc và luồng dữ liệu

- `index.html`: cấu trúc giao diện, nạp CSS và `src/app.js` bằng `type="module"`.
- `src/css/style.css`: giao diện desktop và mobile.
- `src/app.js`: sự kiện submit, state, validation, timeout, chuyển ngôn ngữ.
- `src/services/geocoding.js`: tên thành phố → tọa độ.
- `src/services/weather.js`: tọa độ → dữ liệu thời tiết đã kiểm tra.
- `src/ui/render.js`: state → DOM qua `textContent`, không gọi API.
- `src/i18n/translations.js`: nhãn VI/EN và mô tả mã WMO.

HTML → app.js nhận submit → Geocoding API → Forecast API → kiểm tra dữ liệu → render.js cập nhật UI.

## Giả định V1

- Không tự tìm thành phố khi mở trang; không lưu lịch sử hoặc ngôn ngữ sau reload.
- Tìm mới ẩn dữ liệu cũ để tránh nhầm địa điểm. Trong lúc tải khóa form; vẫn chuyển được ngôn ngữ.
- Đổi ngôn ngữ dịch nhãn, lỗi và mô tả từ dữ liệu đã tải; tên địa điểm/quốc gia giữ theo kết quả API của lần tìm.
- Ngày giờ API là giờ địa điểm; formatter giữ nguyên các thành phần ngày giờ, không đổi sang múi giờ máy.
- Mã thời tiết chưa biết có mô tả dự phòng; trường bắt buộc thiếu hoặc sai sẽ báo lỗi.

## Kiểm thử

Xem `doc/06-test-plan.md`. Kiểm tra tĩnh không thay thế chạy thực tế trên trình duyệt. Các ca manual chưa chạy vẫn để `Not Run`.

## Tự thực hành

1. Theo dấu `Hanoi` từ submit tới hai URL API bằng DevTools Network; đối chiếu giá trị UI với JSON.
2. Thay một nhãn trong cả hai bản dịch và quan sát khi chuyển VI/EN.
3. Bật Network → Offline, thử tìm rồi tắt Offline và thử lại; giải thích vai trò của `catch` và `finally`.

## Nguồn

- [Forecast API và mã WMO](https://open-meteo.com/en/docs)
- [Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
- [Điều khoản Open-Meteo](https://open-meteo.com/en/terms)

Chưa commit, push hoặc deploy tự động. Trước khi phát hành cần chạy toàn bộ test plan và kiểm tra điều khoản sử dụng hiện hành.
