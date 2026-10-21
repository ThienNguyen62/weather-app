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

## 5. K?t qu? ki?m tra b?n tri?n khai 2026-10-21

- PASS ki?m tra t?nh: ID HTML kh?ng tr?ng; CSS v? entry module t?n t?i; t?t c? import v? tham chi?u DOM kh?p; kh?a d?ch giao di?n c? c? VI/EN; kh?ng d?ng innerHTML ?? ch?n d? li?u API.
- PASS `git diff --check`: kh?ng c? l?i kho?ng tr?ng.
- ?? r? so?t logic: validate tr??c fetch, response.ok, d? li?u null/thi?u, ba ng?y li?n ti?p, gi? ??a ?i?m, mapping WMO, timeout, finally m? l?i form v? ??i ng?n ng? t? state. ??y l? review source, kh?ng ph?i k?t qu? ch?y.
- Ch?a ch?y ki?m tra c? ph?p b?ng JavaScript engine: kh?ng c? tr?nh duy?t k?t n?i ho?c runtime JavaScript ???c ph?p d?ng trong m?i tr??ng hi?n t?i; kh?ng c?i th?m c?ng c?.
- TC-01..TC-12 gi? Not Run: ch?a ki?m ch?ng submit/Enter, API th?t, loading/offline/retry, VI/EN, viewport 360px, li?n k?t ngo?i v? t?m li?n ti?p tr?n tr?nh duy?t.
- Ch?a ki?m th? Chrome/Edge/Firefox v? ch?a deploy.
- B??c ti?p: ch?y index.html g?c b?ng VS Code Live Server, th?c hi?n t?ng test case v? ghi Pass/Fail v?i b?ng ch?ng th?c t?.
