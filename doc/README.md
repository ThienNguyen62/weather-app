# Hồ sơ dự án Weather App V1

> Trạng thái: **Draft 0.1 — cần người làm dự án xem lại**. Bộ file này là tài liệu thực hành, không cần duy trì quy trình doanh nghiệp nặng nề.

Đọc theo thứ tự:

| Thứ tự | File | Trả lời câu hỏi |
|---|---|---|
| 1 | [01-product-overview.md](01-product-overview.md) | Tại sao làm app, cho ai, đến đâu là đủ? |
| 2 | [02-requirements.md](02-requirements.md) | App **phải làm được gì**? |
| 3 | [03-user-stories.md](03-user-stories.md) | Người dùng cần gì, biết hoàn thành bằng cách nào? |
| 4 | [04-technical-design.md](04-technical-design.md) | Dùng công nghệ gì, code đặt ở đâu, dữ liệu đi như thế nào? |
| 5 | [05-backlog.md](05-backlog.md) | Tiếp theo cần làm việc gì? |
| 6 | [06-test-plan.md](06-test-plan.md) | Kiểm tra sản phẩm đúng bằng cách nào? |
| 7 | [07-roadmap.md](07-roadmap.md) | Sau V1 mở rộng ra sao? |

## Quy tắc cập nhật (Agile nhẹ)

- `02-requirements.md` là nguồn yêu cầu chính của V1. Một yêu cầu quan trọng nên có ID `FR-xx` hoặc `NFR-xx`.
- `03-user-stories.md` biến nhu cầu thành hành vi và acceptance criteria.
- `05-backlog.md` theo dõi công việc trong giai đoạn chưa tạo GitHub Issues. Về sau có thể chuyển các task sang Issues/Projects.
- Thay đổi phạm vi V1: cập nhật yêu cầu + acceptance criteria + test case liên quan, không âm thầm sửa code.
- Có thể đánh dấu phần nào chưa thống nhất bằng **[Cần xác nhận]**. Không cần chờ viết tài liệu hoàn hảo mới bắt đầu.

## Quyết định tạm thời cho bản nháp

1. V1 phục vụ học và sử dụng cá nhân, có thể công khai cho người khác dùng thử sau này, **không thương mại**.
2. Tìm kiếm địa điểm toàn thế giới; V1 chọn kết quả đầu tiên do API trả về và **hiển thị cả quốc gia**. Lựa chọn danh sách địa điểm sẽ cân nhắc V2.
3. Dự báo 3 ngày **gồm hôm nay và 2 ngày sau**, hiển thị nhiệt độ cao/thấp và tình trạng thời tiết.
4. Mặc định giao diện tiếng Việt, có nút chuyển tiếng Anh; đơn vị °C, %, km/h.
5. Không GPS, không đăng nhập, không lưu lịch sử ở V1.

Các quyết định trên được đề xuất để không mắc kẹt ở khâu lập tài liệu; bạn có thể điều chỉnh chúng trước khi triển khai tính năng tương ứng.
