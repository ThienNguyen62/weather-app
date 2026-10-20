# 03 — User Stories & Acceptance Criteria

**Status:** Draft 0.1.

Công thức: **As a [user], I want [capability], so that [benefit].**  
Acceptance Criteria (AC) là điều kiện quan sát/kiểm thử được để chấp nhận story.

## US-01 — Tìm thành phố

**User Story:** Là người dùng, tôi muốn nhập tên thành phố để xem thời tiết tại nơi đó.

**Liên quan:** FR-01, FR-02, FR-08.

**AC:**

- AC-01.1: Với chuỗi từ 2 ký tự trở lên, khi nhấn nút Tìm kiếm hoặc Enter thì bắt đầu tra cứu.
- AC-01.2: Với tên tìm thấy, hiển thị tên địa điểm và quốc gia lấy từ dữ liệu API.
- AC-01.3: Với chuỗi trống hoặc 1 ký tự sau khi trim, không gọi API và hiển thị yêu cầu nhập ít nhất 2 ký tự.
- AC-01.4: Với tên không có kết quả, hiển thị thông báo không tìm thấy.
- AC-01.5: Khi có nhiều kết quả, V1 dùng kết quả đầu tiên và luôn cho thấy quốc gia của kết quả đó.

## US-02 — Xem thời tiết hiện tại

**User Story:** Là người dùng, tôi muốn xem thông tin thời tiết hiện tại của địa điểm đã tìm để biết điều kiện ngoài trời.

**Liên quan:** FR-03, FR-04, FR-05, NFR-04.

**AC:**

- AC-02.1: Hiển thị nhiệt độ hiện tại với `°C`.
- AC-02.2: Hiển thị mô tả thời tiết phù hợp với mã thời tiết nhận được.
- AC-02.3: Hiển thị độ ẩm theo `%` và gió theo `km/h`.
- AC-02.4: Có thông tin thời điểm của dữ liệu hiện tại, ghi nhãn rõ.
- AC-02.5: Không hiển thị `undefined`, `null` hoặc `NaN` thay giá trị khi dữ liệu thiếu.

## US-03 — Xem dự báo 3 ngày

**User Story:** Là người dùng, tôi muốn xem dự báo thời tiết vài ngày tới để có thể lên kế hoạch đơn giản.

**Liên quan:** FR-06.

**AC:**

- AC-03.1: Hiển thị đúng **3 ngày liên tiếp** gồm hôm nay và 2 ngày kế tiếp theo timezone địa điểm.
- AC-03.2: Mỗi ngày hiển thị ngày, nhiệt độ cao nhất, thấp nhất và mô tả trạng thái thời tiết.
- AC-03.3: Dữ liệu tương ứng địa điểm người dùng vừa tìm, không còn lẫn dữ liệu của lần tìm trước.

## US-04 — Chuyển ngôn ngữ

**User Story:** Là người dùng, tôi muốn chuyển giao diện sang tiếng Việt hoặc tiếng Anh để dễ sử dụng.

**Liên quan:** FR-07.

**AC:**

- AC-04.1: Khi mở trang, giao diện mặc định tiếng Việt.
- AC-04.2: Có nút chuyển giữa VI và EN mà không cần tải lại trang.
- AC-04.3: Các nhãn trên giao diện, mô tả thời tiết và lỗi chính hiển thị theo ngôn ngữ đã chọn.

## US-05 — Nhận phản hồi khi tìm kiếm gặp vấn đề

**User Story:** Là người dùng, tôi muốn biết khi ứng dụng đang tải hoặc không lấy được dữ liệu để không nhầm rằng ứng dụng đã bị hỏng.

**Liên quan:** FR-08, NFR-05, NFR-06.

**AC:**

- AC-05.1: Trong lúc yêu cầu đang chạy, hiển thị Loading / Đang tải.
- AC-05.2: Khi request lỗi hoặc mạng mất kết nối, hiển thị thông báo lỗi dễ hiểu.
- AC-05.3: Khi không tìm thấy địa điểm, thông báo khác với lỗi kết nối.
- AC-05.4: Có thể thực hiện lại tìm kiếm sau khi xảy ra lỗi.

## US-06 — Ghi nhận nguồn dữ liệu

**User Story:** Là người dùng, tôi muốn biết nguồn cung cấp thông tin thời tiết để có thể tham khảo trực tiếp.

**Liên quan:** FR-09.

**AC:**

- AC-06.1: Giao diện hiển thị liên kết nguồn dữ liệu đến Open-Meteo khi hiển thị thời tiết.
- AC-06.2: Liên kết có tên dễ hiểu và có thể mở được.

## Definition of Done áp dụng cho mọi User Story

- Code của story được triển khai và có thể chạy trên localhost.
- Các AC liên quan đã tự kiểm tra và ghi kết quả vào test plan.
- Không còn lỗi chặn luồng chính của story.
- Code đã được commit vào Git, tài liệu thay đổi nếu phạm vi/hành vi thay đổi.
