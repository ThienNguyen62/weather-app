# 02 — Software Requirements (V1)

**Status:** V1 Requirements 1.0 — đã xác nhận ngày 2026-10-21.
**Quy ước:** FR = Functional Requirement; NFR = Non-functional Requirement.  
**Ưu tiên:** Must = bắt buộc với V1.

## 1. Functional Requirements

| ID | Ưu tiên | Mô tả yêu cầu | Ghi chú |
|---|---|---|---|
| FR-01 | Must | Người dùng nhập tên thành phố và khởi tạo tìm kiếm bằng nút hoặc Enter. | Bỏ khoảng trắng đầu/cuối; input tối thiểu 2 ký tự. |
| FR-02 | Must | Ứng dụng tra cứu tên thành phố và xác định một địa điểm. | V1 sử dụng kết quả phù hợp đầu tiên, hiển thị tên + quốc gia. |
| FR-03 | Must | Hiển thị nhiệt độ hiện tại và thời điểm quan trắc/dữ liệu của địa điểm. | Đơn vị °C; thời gian cần có nhãn rõ ràng. |
| FR-04 | Must | Hiển thị tình trạng thời tiết hiện tại bằng mô tả dễ hiểu. | Từ mã thời tiết của API; VI/EN. |
| FR-05 | Must | Hiển thị độ ẩm tương đối (%) và tốc độ gió (km/h) hiện tại. | Không dùng dữ liệu giả khi có lỗi. |
| FR-06 | Must | Hiển thị dự báo của 3 ngày theo ngày địa phương của địa điểm. | Gồm hôm nay + 2 ngày sau; mỗi ngày có ngày, max/min nhiệt độ, trạng thái thời tiết. |
| FR-07 | Must | Người dùng chuyển giữa giao diện tiếng Việt và tiếng Anh. | Mặc định tiếng Việt; cập nhật các nhãn và mô tả thời tiết. |
| FR-08 | Must | Hiển thị đúng các trạng thái: ban đầu, đang tải, input sai, không tìm thấy và lỗi yêu cầu API/mạng. | Không hiển thị dữ liệu giả như dữ liệu thật. |
| FR-09 | Must | Hiển thị đường dẫn ghi nguồn dữ liệu Open-Meteo trên giao diện thời tiết. | Chèn liên kết đến website nhà cung cấp. |

## 2. Non-functional Requirements

| ID | Ưu tiên | Yêu cầu có thể kiểm tra |
|---|---|---|
| NFR-01 | Must | Giao diện dùng được từ chiều rộng viewport 360px, không tràn ngang ở màn hình chính. |
| NFR-02 | Must | Chạy trên các bản cập nhật gần đây của Chrome, Edge và Firefox. |
| NFR-03 | Must | Không yêu cầu đăng nhập, database, backend tự xây dựng hoặc thu thập dữ liệu cá nhân. |
| NFR-04 | Must | Dùng đơn vị hiển thị thống nhất: °C, %, km/h; phân biệt thời tiết hiện tại với dự báo. |
| NFR-05 | Must | Form có nhãn truy cập được; có thể tìm bằng bàn phím (Enter); thông báo lỗi ở vùng dễ nhận thấy. |
| NFR-06 | Must | Khi mất kết nối/nhận phản hồi lỗi, website hiển thị thông báo dễ hiểu thay vì bị treo hoặc hiển thị giá trị giả. |
| NFR-07 | Should | Tên hàm và module có trách nhiệm rõ ràng, tách logic API ra khỏi logic hiển thị để dễ phát triển V2. |

`Should` trong NFR-07 là quy ước nội bộ của project, không phải yêu cầu về một framework.

## 3. Dữ liệu cần hiển thị

### Thời tiết hiện tại

- Thành phố và quốc gia.
- Nhiệt độ `temperature_2m`.
- Độ ẩm `relative_humidity_2m`.
- Tốc độ gió `wind_speed_10m`.
- Mô tả trạng thái dựa vào `weather_code`.
- Thời điểm dữ liệu `current.time` (hiển thị rõ theo địa phương nếu triển khai chuyển đổi thời gian).

### Dự báo hằng ngày

- Ngày `daily.time`.
- Nhiệt độ tối đa `temperature_2m_max`.
- Nhiệt độ tối thiểu `temperature_2m_min`.
- Mã trạng thái `weather_code` → mô tả VI/EN.
- 3 ngày tính cả hôm nay, theo timezone của địa điểm (`timezone=auto`).

## 4. Quy tắc xử lý tình huống

| Tình huống | Hành vi mong muốn |
|---|---|
| Ô tìm kiếm rỗng hoặc dưới 2 ký tự sau khi trim | Báo người dùng nhập tối thiểu 2 ký tự; không gọi API. |
| Không tìm thấy địa điểm | Thông báo không tìm thấy, không hiển thị thông tin mới giả định. |
| Thành phố trùng tên | Chọn kết quả đầu tiên trong V1 và hiển thị quốc gia để nhận diện. |
| Đang chờ phản hồi | Hiện Loading / Đang tải; tránh gửi nhiều lần ngoài ý muốn. |
| Mất mạng / API phản hồi lỗi | Hiện thông báo lỗi; không coi request lỗi là kết quả thành công. |
| Dữ liệu thời tiết thiếu trường bắt buộc | Hiện lỗi tải dữ liệu; không hiển thị `undefined`/`NaN`. |
| Đổi ngôn ngữ sau khi có dữ liệu | Nhãn và mô tả thời tiết chuyển ngôn ngữ; giá trị số giữ nguyên. |

## 5. Constraints / Ràng buộc dự án

- JavaScript thuần, không dùng framework frontend ở V1.
- Dùng Open-Meteo Geocoding và Forecast API; không cần API key cho sử dụng phi thương mại theo điều khoản hiện hành.
- Không triển khai cơ chế lưu thông tin cá nhân.
- Chỉ kiểm thử thủ công trong V1; automation tests có thể thêm sau.

## 6. Traceability

- User Stories và Acceptance Criteria: [`03-user-stories.md`](03-user-stories.md).
- Sơ đồ dữ liệu, mapping các trường API: [`04-technical-design.md`](04-technical-design.md).
- Bộ test case: [`06-test-plan.md`](06-test-plan.md).

## 7. Quy trình chốt requirements

- [x] Đọc lại FR-01 đến FR-09 và NFR-01 đến NFR-07.
- [x] Điều chỉnh những quyết định đang là mặc định nếu cần.
- [x] Chốt bản baseline là `V1 Requirements 1.0` trước khi hoàn thành Implementation.
