# Weather App V1 — Project Skeleton

Dự án cá nhân thực hành phát triển phần mềm theo Agile/Kanban, bắt đầu từ yêu cầu sản phẩm.

**Trạng thái: chuẩn bị dự án (chưa có code).** Các file `index.html`, `.css` và `.js` đang để **rỗng có chủ đích**. Không thể chạy website ở giai đoạn này.

## Bắt đầu từ đâu?

1. Đọc [`doc/README.md`](doc/README.md) để xem danh sách tài liệu.
2. Review [`doc/01-product-overview.md`](doc/01-product-overview.md) và [`doc/02-requirements.md`](doc/02-requirements.md).
3. Khi thống nhất requirements, bắt đầu task đầu tiên trong [`doc/05-backlog.md`](doc/05-backlog.md).

## Công nghệ dự kiến (chưa triển khai)

- HTML, CSS, JavaScript thuần (ES Modules).
- Open-Meteo Geocoding API và Forecast API.
- VS Code + Live Server (khi bắt đầu làm giao diện).
- Git/GitHub; GitHub Pages (khi đủ điều kiện triển khai).

## Phạm vi V1 (bản nháp)

Tìm kiếm thành phố; xem thời tiết hiện tại; dự báo 3 ngày; giao diện Việt/Anh; thông báo lỗi và trạng thái đang tải. Không có backend, database, đăng nhập hay GPS.

## Cấu trúc

```text
weather-app-v1/
├── doc/                 # Tài liệu Markdown (đã có nội dung bản nháp)
├── css/
│   └── style.css        # Rỗng — viết sau
├── src/
│   ├── app.js           # Rỗng — viết sau
│   ├── services/
│   │   ├── geocoding.js # Rỗng — viết sau
│   │   └── weather.js   # Rỗng — viết sau
│   ├── ui/
│   │   └── render.js    # Rỗng — viết sau
│   └── i18n/
│       └── translations.js # Rỗng — viết sau
├── index.html           # Rỗng — viết sau
└── README.md
```

**Ghi chú:** Có thể điều chỉnh cấu trúc file khi học tới từng bước, không cần tạo thêm framework hay hạ tầng từ bây giờ.
