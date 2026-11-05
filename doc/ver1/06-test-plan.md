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
| TC-06 | FR-06 | Tìm địa điểm hợp lệ | Có đúng 3 ngày liên tiếp, max/min và mô tả mỗi ngày | Not Run |
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
| UI-03 | Tìm và chọn thành phố; đối chiếu mã thời tiết trong Network | Icon phù hợp mô tả hiện tại và 3 ngày; icon không thay thế văn bản | Not Run |
| UI-04 | Thử input sai, không tìm thấy, Slow network và Offline rồi thử lại | Trạng thái loading/lỗi dễ đọc, không kẹt form; không hiện dữ liệu giả | Not Run |
| UI-05 | Bật prefers-reduced-motion trong DevTools | Spinner ngừng chuyển động, không có transition; văn bản đang tải vẫn hiện | Not Run |
| UI-06 | Dùng screen reader kiểm tra form, thông báo và thời tiết | Nhãn theo VI/EN, trạng thái được thông báo; icon trang trí không bị đọc lặp | Not Run |

Kiểm tra đã chạy: `node tests/logic.mjs` Pass (mock API/DOM), gồm tìm trước/chọn sau, tọa độ đã chọn, lịch sử, lưu trữ bị chặn, thử lại sau lỗi và ánh xạ icon với trường hợp mã lạ. Kết quả này không thay thế kiểm thử layout, API thật hay accessibility trên trình duyệt. Browser access host không khả dụng trong phiên thực hiện; các ca trên giữ Not Run.

- Không viết Expected Result kiểu `Hanoi = 28°C`; thời tiết luôn thay đổi.
- So sánh dữ liệu hiển thị với trường tương ứng trong JSON trả về ở tab Network của DevTools.
- Không lấy dữ liệu của thành phố A để kết luận ứng dụng đúng cho thành phố B.
- Chú ý timezone địa điểm khi xác định “hôm nay” trong dự báo 3 ngày.

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

## 5. Ki?m th? thi?t k? m?i ? 2026-11-05

| ID | C?c b??c | K?t qu? mong ??i | Status |
|---|---|---|---|
| BG-01 | M? trang m?i v? reload sau khi ?? xem th?i ti?t | L?i ch?o v? form hi?n; kh?ng t? g?i API | Not Run |
| BG-02 | Ch?n ??a ?i?m, sau ?? b?m ??i ??a ?i?m | Th?nh c?ng hi?n th?i ti?t; quay l?i l?i ch?o v? focus input | Not Run |
| BG-03 | D?ng d? li?u ki?m so?t ? 03:59, 04:00, 17:59, 18:00 theo timezone th?nh ph? | ??m, ng?y, ng?y, ??m; c?p nh?t khi tab m? l?i | Not Run |
| BG-04 | Ch?n hai ??a ?i?m kh?c timezone | ??ng h?/n?n d?ng gi? ??a ?i?m, kh?ng d?ng gi? m?y | Not Run |
| BG-05 | Th? WMO clear/cloudy/fog/rain/snow/storm/unknown | N?n/l?p t??ng ?ng, ch? lu?n ??c ???c; kh?ng icon th?i ti?t | Not Run |
| BG-06 | Ch?n t?i ?nh v? b?t reduced motion | M?u d? ph?ng gi? ch? d? ??c, hi?u ?ng d?ng | Not Run |
| BG-07 | ??i chi?u Network v?i d? b?o | forecast_days=7, ??ng 7 ng?y li?n ti?p v? max/min theo JSON | Not Run |
| ST-01 | Ch?n 6 ??a ?i?m, ch?n l?i m?t ??a ?i?m r?i reload | 5 ??a ?i?m m?i nh?t, kh?ng tr?ng ID; reload gi? l?ch s?/ng?n ng? | Not Run |
| ST-02 | X?a l?ch s? sau khi ??i VI/EN | L?ch s? m?t, ng?n ng? gi?; focus input | Not Run |
| ST-03 | JSON localStorage h?ng ho?c storage b? ch?n | App ch?y v?i fallback, v?n t?m/ch?n ???c | Not Run |

## 6. B?ng ch?ng ?? ch?y

- 2026-11-05: `node tests/logic.mjs` Pass: l?u tr?, ch?n ??ng t?a ??, 7 ng?y, HTTP/JSON/d? li?u l?i, timezone kh?ng h?p l?, m?c ng?y/??m v? ?i?u h??ng welcome/weather (API/DOM m? ph?ng).
- `browser access host is unavailable` khi ki?m tra browser inventory. C?c ca tr?nh duy?t tr?n ch?a ???c ch?y, kh?ng suy ra Pass t? Node.
- Ch?a ki?m tra Chrome/Edge/Firefox, screen reader ho?c b?n deploy. Ch?a ghi nh?n bug th?c t? tr?n tr?nh duy?t; ?i?u n?y kh?ng ch?ng minh kh?ng c? bug.
