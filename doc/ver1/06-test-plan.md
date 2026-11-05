# 06 — Manual Test Plan (V1)

**Mục đích:** kiểm thử bằng tay dựa trên requirements; chưa cần Jest/Playwright.  
**Môi trường:** localhost trên máy tính, sau đó kiểm tra bản deploy; Chrome/Edge/Firefox phiên bản gần đây và viewport di động 360px.  
**Cách ghi:** `Not Run` / `Pass` / `Fail`, kèm ghi chú khi fail.

## 1. Test cases

| ID | Liên quan | Các bước / Điều kiện | Expected Result | Status |
|---|---|---|---|---|
| TC-01 | FR-01/02 | Nhập `Hanoi`, nhấn Tìm kiếm | Hiển thị địa điểm tìm được kèm quốc gia | Not Run |
| TC-02 | FR-01 | Nhấn Enter khi ô tìm có tên hợp lệ | Thực hiện tìm kiếm như khi click | Not Run |
| TC-03 | FR-01/08 | Để trống hoặc nhập một ký tự | Không gọi API; hiển thị hướng dẫn nhập tối thiểu 2 ký tự | Not Run |
| TC-04 | FR-02/08 | Nhập tên không có kết quả | Thông báo không tìm thấy | Not Run |
| TC-05 | FR-03/04/05 | Tìm địa điểm hợp lệ | Hiển thị nhiệt độ °C, mô tả, độ ẩm %, gió km/h, thời gian dữ liệu; không có `undefined`/`NaN` | Not Run |
| TC-06 | FR-06 | Tìm địa điểm hợp lệ | Có đúng 7 ngày liên tiếp, max/min và mô tả mỗi ngày | Not Run |
| TC-07 | FR-07 | Bấm chuyển VI ⇄ EN sau khi tìm | Nhãn, mô tả và lỗi hiển thị theo ngôn ngữ chọn, không reload | Not Run |
| TC-08 | FR-08 | Trong khi API chưa trả lời | Có trạng thái đang tải dễ nhận thấy | Not Run |
| TC-09 | FR-08/NFR-06 | DevTools → Network → Offline, rồi tìm | Hiển thị lỗi mạng; có thể thử lại sau khi online | Not Run |
| TC-10 | NFR-01 | Đặt viewport 360px, thao tác toàn bộ giao diện | Không tràn ngang, nút và dữ liệu vẫn dùng được | Not Run |
| TC-11 | FR-09 | Sau khi hiển thị thời tiết | Có liên kết ghi nguồn Open-Meteo có thể mở | Not Run |
| TC-12 | FR-02/06 | Tìm 2 thành phố liên tiếp | Kết quả sau chỉ tương ứng địa điểm mới | Not Run |

## 2. Quy tắc kiểm thử dữ liệu thời tiết

### Kiểm thử giao diện mới — UI-01 (2026-11-04)

| ID | Các bước | Kết quả mong đợi | Status |
|---|---|---|---|
| UI-01 | Mở trang ở 360px, 768px và 1280px; thử cả VI và EN | Không tràn ngang, tên dài xuống dòng, nút dễ chạm; desktop có hai cột thời tiết/dự báo | Not Run |
| UI-02 | Dùng Tab, Shift+Tab, Enter để tìm, chọn kết quả, chọn lịch sử, đổi ngôn ngữ và xóa lịch sử | Focus rõ ràng; mọi nút dùng được; không mất focus khi đổi ngôn ngữ | Not Run |
| UI-03 | Tìm và chọn thành phố; đối chiếu mã thời tiết trong Network | Nền phù hợp thời tiết; 7 ngày có mô tả chữ, không phụ thuộc icon | Not Run |
| UI-04 | Thử input sai, không tìm thấy, Slow network và Offline rồi thử lại | Trạng thái loading/lỗi dễ đọc, không kẹt form; không hiện dữ liệu giả | Not Run |
| UI-05 | Bật prefers-reduced-motion trong DevTools | Spinner ngừng chuyển động, không có transition; văn bản đang tải vẫn hiện | Not Run |
| UI-06 | Dùng screen reader kiểm tra form, thông báo và thời tiết | Nhãn theo VI/EN, trạng thái được thông báo; icon trang trí không bị đọc lặp | Not Run |

Kiểm tra đã chạy: `node tests/logic.mjs` Pass (mock API/DOM), gồm tìm trước/chọn sau, tọa độ đã chọn, lịch sử, lưu trữ bị chặn, thử lại sau lỗi và ánh xạ icon với trường hợp mã lạ. Kết quả này không thay thế kiểm thử layout, API thật hay accessibility trên trình duyệt. Browser access host không khả dụng trong phiên thực hiện; các ca trên giữ Not Run.

- Không viết Expected Result kiểu `Hanoi = 28°C`; thời tiết luôn thay đổi.
- So sánh dữ liệu hiển thị với trường tương ứng trong JSON trả về ở tab Network của DevTools.
- Không lấy dữ liệu của thành phố A để kết luận ứng dụng đúng cho thành phố B.
- Chú ý timezone địa điểm khi xác định “hôm nay” trong dự báo 7 ngày.

## 3. Mẫu ghi bug

```text
Bug ID: BUG-01
Tóm tắt: ...
Bước tái hiện: 1. ... 2. ...
Expected: ...
Actual: ...
Môi trường: Trình duyệt / kích thước màn hình
Mức độ: Blocker | Major | Minor
Trạng thái: Open | Fixed | Retested
```

## 4. Điều kiện kết thúc kiểm thử V1

- [ ] Tất cả test case có trạng thái Pass.
- [ ] Không còn bug Blocker/Major trong luồng tìm kiếm và hiển thị dữ liệu.
- [ ] Website chạy trên localhost và sau khi deploy.

## 5. Bổ sung ngày 05/11/2026

| ID | Kịch bản | Kết quả mong đợi | Trạng thái |
|---|---|---|---|
| BG-01 | Mở trang hoặc reload | welcome.jpg, lời chào, không tự fetch | Not Run |
| BG-02 | Chọn địa điểm rồi Đổi địa điểm | Crossfade sang sky-day/night rồi quay lại welcome.jpg | Not Run |
| BG-03 | Giờ địa điểm 03:59 / 04:00 / 17:59 / 18:00 | Đêm / ngày / ngày / đêm; tick và trở lại tab cập nhật đúng | Not Run |
| BG-04 | Hai địa điểm khác timezone | Đồng hồ/nền dùng giờ địa điểm, không phải máy | Not Run |
| BG-05 | WMO rõ/mây/sương/mưa/tuyết/dông/lạ | Lớp nền phù hợp, chữ đọc được, mã lạ trung tính | Not Run |
| BG-06 | Chọn thành công | Nền → mô tả → số liệu → tiêu đề → 7 thẻ xuất hiện lần lượt | Not Run |
| BG-07 | Đợi tick, đổi VI/EN | Không phát lại entrance; vẫn dịch đầy đủ | Not Run |
| BG-08 | Bật reduced motion; chặn ảnh | Bỏ chuyển động; màu dự phòng giữ UI đọc được | Not Run |
| FC-07 | Đối chiếu Network | forecast_days=7, đúng 7 ngày, max/min và giờ khớp JSON | Not Run |
| ST-01 | 6 địa điểm, chọn lại, reload | 5 địa điểm duy nhất mới nhất trước, giữ VI/EN | Not Run |
| ST-02 | Xóa lịch sử | Giữ ngôn ngữ, focus input | Not Run |
| ST-03 | Storage hỏng/bị chặn | App dùng fallback và tiếp tục tìm/chọn | Not Run |

## 6. Bằng chứng và giới hạn

- `node tests/logic.mjs`: **Pass** với API/DOM mô phỏng; kiểm tra 7 ngày, tọa độ, storage, HTTP/JSON/dữ liệu lỗi, timezone, các mốc ngày/đêm, giữ nguyên DOM qua tick và không bật lại entrance khi đổi ngôn ngữ. Không thay thế browser.
- Browser access host không khả dụng ở lần kiểm tra trước. Chuyển động thật, bố cục 360/768/1280px, Chrome/Edge/Firefox, screen reader và bản deploy còn Not Run.
- Không ghi Done khi chưa đạt Definition of Done trong backlog.
