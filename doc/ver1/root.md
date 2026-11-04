# Weather App — bản đồ dự án hiện tại

**Cập nhật:** 2026-11-04. Tài liệu được đối chiếu với source hiện tại, gồm chọn địa điểm, lưu lịch sử/ngôn ngữ và giao diện xanh dương mới.

Đọc file này để biết dự án có gì, bắt đầu đọc code ở đâu và một thao tác của người dùng đi qua những module nào. `root.md` là tài liệu cho người đọc; trình duyệt không thực thi file này.

## 1. Mục tiêu và công nghệ

Weather App giúp người dùng tìm một thành phố, chọn đúng địa điểm và xem thời tiết hiện tại cùng dự báo hôm nay và hai ngày tiếp theo. Giao diện hỗ trợ tiếng Việt/tiếng Anh, trình duyệt máy tính và điện thoại.

- HTML5 xây khung giao diện; CSS3 tạo bố cục và trạng thái tương tác.
- JavaScript thuần dùng ES Modules (`import`/`export`) để chia trách nhiệm giữa các file.
- Trình duyệt gọi trực tiếp hai API Open-Meteo bằng `fetch`.
- `localStorage` lưu ngôn ngữ và địa điểm gần đây trên trình duyệt đang dùng.
- Không có framework, npm, bước build, backend, database hay đăng nhập.
- Node chỉ dùng nếu muốn chạy bộ kiểm tra logic sẵn có; không cần Node để sử dụng app.

## 2. Cấu trúc thư mục

```text
wether project/
├── Agents.md                         # Hướng dẫn làm việc với trợ lý AI
├── README.md                         # Hướng dẫn chạy và giới thiệu bản ban đầu
├── index.html                        # Điểm vào: DOM, SVG symbols, nạp CSS và app.js
├── src/
│   ├── app.js                        # Điều phối sự kiện, state, request và lỗi
│   ├── css/
│   │   └── style.css                 # Giao diện mobile-first, focus/loading/responsive
│   ├── services/
│   │   ├── geocoding.js              # Tìm tối đa 5 địa điểm và kiểm tra dữ liệu địa điểm
│   │   └── weather.js                # Lấy, kiểm tra, chuẩn hóa dữ liệu thời tiết
│   ├── storage/
│   │   └── preferences.js            # Đọc/ghi ngôn ngữ, lịch sử bằng localStorage
│   ├── ui/
│   │   └── render.js                 # State → DOM, định dạng ngày/số, chọn icon SVG
│   └── i18n/
│       └── translations.js           # Nhãn, thông báo và mô tả mã thời tiết VI/EN
├── tests/
│   └── logic.mjs                     # Kiểm tra logic với API/DOM mô phỏng, không cần npm
└── doc/
    └── ver1/
        ├── root.md                   # Bản đồ source hiện tại — file bạn đang đọc
        ├── ProductGoal.md            # Mục tiêu sản phẩm và đối tượng sử dụng
        ├── 01-product-overview.md    # Tổng quan sản phẩm V1
        ├── 02-requirements.md        # Yêu cầu chức năng/phi chức năng của baseline V1
        ├── 03-user-stories.md        # Nhu cầu người dùng và tiêu chí chấp nhận
        ├── 04-technical-design.md    # Thiết kế ban đầu, có phần chưa đồng bộ với source
        ├── 05-backlog.md             # Công việc, trạng thái và nhật ký
        ├── 06-test-plan.md           # Ca kiểm thử và kết quả đã ghi nhận
        ├── 07-roadmap.md             # Định hướng phiên bản
        └── git.md                    # Tài liệu Git của dự án
```

Cây trên tập trung vào source và tài liệu; không liệt kê nội dung quản lý Git trong `.git/`. Thư mục tài liệu thực tế là `doc/ver1/`, không phải `ver1/doc/`.

## 3. Mỗi module phụ trách việc gì?

| File | Trách nhiệm chính | Điểm cần đọc |
|---|---|---|
| `index.html` | Định nghĩa form, vùng trạng thái, danh sách địa điểm, lịch sử, kết quả và các SVG symbol | `<script type="module" src="./src/app.js">`, các `id` nối với JavaScript |
| `src/app.js` | Nhận thao tác người dùng, gọi service, cập nhật state và yêu cầu render | `state`, `runRequest()`, submit handler, `selectCity()` |
| `src/services/geocoding.js` | Gọi API tìm địa điểm; không sửa DOM | `findCities()`, `isValidCity()` |
| `src/services/weather.js` | Gọi Forecast theo tọa độ; từ chối dữ liệu thiếu/sai | `getWeather()` |
| `src/storage/preferences.js` | Đọc/ghi JSON; xử lý dữ liệu lưu hỏng hoặc storage bị chặn | `loadLanguage()`, `loadHistory()`, `rememberCity()`, `clearHistory()` |
| `src/ui/render.js` | Hiển thị từ state; không gọi API và không lưu storage | `render()`, `renderPlaces()`, `formatDate()`, `weatherIconName()` |
| `src/i18n/translations.js` | Tra nhãn và mô tả thời tiết theo ngôn ngữ | `translations`, `describeWeather()` |
| `src/css/style.css` | Màu, khoảng cách, typography, card và responsive | Mặc định mobile; breakpoint 540px và 860px; `prefers-reduced-motion` |

Đây là cách tách trách nhiệm đơn giản: **service lấy dữ liệu → app quyết định trạng thái → render hiển thị**. Khi sửa màu hoặc bố cục, thường chỉ cần HTML/CSS; khi sửa cách xử lý dữ liệu, tìm đến service hoặc `app.js`.

## 4. Luồng thực thi

### 4.1 Khi mở trang

1. Trình duyệt đọc `index.html`, dựng DOM và tải CSS.
2. Script `type="module"` tải `src/app.js` cùng các module được import; chạy sau khi HTML được phân tích.
3. `loadLanguage()` và `loadHistory()` đọc dữ liệu đã lưu, tạo state ban đầu.
4. App gắn các handler cho submit, chọn địa điểm, lịch sử, xóa lịch sử và đổi ngôn ngữ.
5. `render(state)` hiển thị giao diện ban đầu và lịch sử nếu có.

**Không gọi API thời tiết khi vừa mở trang.** Việc đọc lịch sử không đồng nghĩa tự tải thời tiết của địa điểm cũ.

### 4.2 Tìm và chọn thành phố

```text
Nhập tên → nhấn Tìm kiếm hoặc Enter
  → app.js: ngăn reload, trim input, xóa kết quả cũ
  → input dưới 2 ký tự? Báo lỗi, không gọi API
  → runRequest('searching'): bật loading và timeout
  → findCities(query, language, signal)
  → Geocoding API → kiểm tra dữ liệu → tối đa 5 địa điểm
  → state.candidates → render danh sách → focus kết quả đầu tiên

Người dùng chọn một kết quả
  → đọc data-city-id → tìm địa điểm tương ứng trong state
  → selectCity(city) → runRequest('loading')
  → getWeather(city, signal)
  → Forecast API theo latitude/longitude của địa điểm đã chọn
  → kiểm tra current/daily → chuẩn hóa dữ liệu
  → cập nhật state.city + state.weather, xóa danh sách ứng viên
  → rememberCity(): cập nhật lịch sử trong state và storage
  → render thời tiết + 3 ngày dự báo → focus tiêu đề địa điểm
```

Hai request thuộc hai thao tác riêng: tìm danh sách trước, chọn địa điểm rồi mới lấy Forecast. Mỗi `runRequest()` có timeout 20 giây riêng.

Các nút địa điểm được render lại khi dữ liệu thay đổi. App gắn handler vào danh sách cha và tìm nút qua `closest()`; cách này gọi là **event delegation**, giúp các nút mới vẫn hoạt động mà không phải gắn handler từng nút.

### 4.3 Lịch sử và đổi ngôn ngữ

- **Chọn lịch sử:** gọi lại `selectCity()` bằng tọa độ đã lưu để lấy thời tiết mới; không cần tìm lại tên qua Geocoding.
- **Lưu lịch sử:** chỉ sau khi Forecast thành công; mới nhất đứng đầu, tối đa 5 địa điểm, không trùng `id`.
- **Xóa lịch sử:** lưu mảng rỗng, cập nhật state, render lại và focus ô tìm. Không xóa lựa chọn ngôn ngữ hoặc kết quả thời tiết đang hiển thị.
- **VI/EN:** đổi `state.language`, lưu lựa chọn và render lại; không reload, không gọi lại API. Nhãn, lỗi, số/ngày và mô tả được định dạng lại; tên địa điểm giữ theo dữ liệu đã nhận ở lần tìm.

### 4.4 Loading và lỗi

`runRequest()` tạo `AbortController`, bật loading rồi chạy tác vụ trong `try`. `catch` chuyển lỗi thành khóa thông báo để bản dịch hiển thị. `finally` luôn hủy bộ đếm timeout, tắt loading và render lại.

| Tình huống | Cách xử lý hiện tại |
|---|---|
| Input rỗng hoặc dưới 2 ký tự sau trim | `invalid`; không fetch |
| API không có địa điểm phù hợp | `notFound` |
| HTTP phản hồi không thành công | `apiError` |
| JSON lỗi hoặc dữ liệu bắt buộc sai/thiếu | `dataError` |
| Request bị hủy vì quá 20 giây | `timeout` |
| Các lỗi còn lại khi chạy tác vụ | `networkError` |
| Storage bị chặn/hỏng | Dùng mặc định khi đọc; lỗi ghi được bỏ qua, app tiếp tục hoạt động |

Trong lúc tải, input, nút tìm, chọn địa điểm và xóa lịch sử bị khóa; vẫn đổi được ngôn ngữ. Tìm mới hoặc chọn địa điểm sẽ ẩn thời tiết cũ. Nếu tải Forecast thất bại, địa điểm đó không được thêm vào lịch sử.

## 5. Dữ liệu quan trọng

### State trong bộ nhớ

| Thuộc tính | Ý nghĩa |
|---|---|
| `language` | `'vi'` hoặc `'en'`; mặc định `'vi'` |
| `city` | Địa điểm của lần tải thời tiết thành công, hoặc `null` |
| `weather` | Dữ liệu thời tiết chuẩn hóa, hoặc `null` |
| `candidates` | Danh sách địa điểm để người dùng chọn |
| `history` | Tối đa 5 địa điểm gần đây |
| `loading` | Có tác vụ API đang chạy hay không |
| `message` | Khóa bản dịch, ví dụ `initial`, `searching`, `chooseCity`, `success` |
| `error` | Quyết định cách trình bày thông báo lỗi |

**State** là dữ liệu hiện tại của ứng dụng. **DOM** là những gì trình duyệt hiển thị. App cập nhật state trước rồi gọi `render(state)` để đồng bộ giao diện.

### Địa điểm và thời tiết

- Địa điểm: `{ id, name, country, admin1, latitude, longitude }`; `admin1` có thể không có.
- Thời tiết: `{ timezone, time, temperature, humidity, wind, code, days }`.
- Mỗi ngày trong `days`: `{ date, code, max, min }`; có đúng 3 ngày liên tiếp tính từ ngày của `current.time`.
- Đơn vị hiển thị: °C, %, km/h. Mã `code` được dùng cho cả mô tả VI/EN và icon; mã lạ có phần hiển thị dự phòng.
- `formatDate()` giữ nguyên ngày/giờ địa phương API trả về. Cách dựng ngày với UTC ở đây nhằm tránh trình duyệt tự chuyển sang múi giờ máy, không phải khẳng định thời gian quan trắc là UTC.

**Tên giống nhau chưa chắc cùng địa điểm.** App nhận diện bằng `id`, lấy thời tiết theo tọa độ, hiện nhãn tên + tỉnh/bang + quốc gia. Hiện chưa lưu/hiển thị huyện (`admin2`) hay tọa độ để phân biệt khi nhãn vẫn trùng.

### localStorage

| Khóa | Nội dung |
|---|---|
| `weather.language.v1` | Chuỗi ngôn ngữ được JSON hóa |
| `weather.history.v1` | Mảng địa điểm được JSON hóa |

Không lưu dữ liệu thời tiết. Storage thuộc origin của trang (giao thức + host + cổng); `localhost:5500` và `127.0.0.1:5501` có vùng lưu riêng. Đổi địa chỉ/cổng có thể khiến bạn không thấy lịch sử cũ dù code không xóa nó.

## 6. API được source sử dụng

| Service | Endpoint và tham số chính |
|---|---|
| Geocoding | `https://geocoding-api.open-meteo.com/v1/search` với `name`, `count=5`, `language` |
| Forecast | `https://api.open-meteo.com/v1/forecast` với tọa độ đã chọn, `forecast_days=3`, `timezone=auto`, °C và km/h |

Forecast yêu cầu `current`: `temperature_2m`, `relative_humidity_2m`, `weather_code`, `wind_speed_10m`; `daily`: `weather_code`, `temperature_2m_max`, `temperature_2m_min`.

Hai service dùng `response.ok`, kiểm tra JSON và truyền `signal` vào `fetch`. Không hardcode nhiệt độ hay tọa độ trong luồng chạy app. Dữ liệu cố định trong `tests/logic.mjs` chỉ là dữ liệu mô phỏng để kiểm tra, không được app import.

## 7. Cách chạy và kiểm tra

1. Mở toàn bộ thư mục dự án trong VS Code.
2. Nhấp phải `index.html` → **Open with Live Server**; dùng đúng địa chỉ server cung cấp.
3. Nhập `Hanoi`, nhấn Enter; chọn một kết quả rồi xem thời tiết. Cần Internet để gọi API.
4. Thử đổi VI/EN, tải lại trang, chọn lịch sử và xóa lịch sử.

Chạy qua HTTP localhost, tránh mở `file://` vì app dùng ES Modules. Không có lệnh `npm install` hoặc `npm run dev`.

Nếu máy đã có Node, chạy từ thư mục gốc:

```sh
node tests/logic.mjs
```

Bộ kiểm tra dùng `node:assert/strict`, API và DOM mô phỏng. Nó kiểm tra một số nhánh dữ liệu/lưu trữ, luồng tìm → chọn → tải, thử lại sau lỗi và ánh xạ icon. Nó **không xác minh bố cục, API thật, browser compatibility, screen reader hoặc toàn bộ tình huống lỗi**.

Theo kết quả đã ghi nhận, bộ kiểm tra logic đã Pass. Kiểm thử UI thực tế ở 360px/tablet/desktop, bàn phím và screen reader vẫn còn chờ trong [test plan](06-test-plan.md). Task UI-01 chưa Done; không suy ra hoàn thành chỉ từ việc đã có source.

## 8. Cần thư mục `.agent` chưa?

**Khuyến nghị cho dự án này: chưa cần.** Dự án nhỏ, quy tắc làm việc đã có trong `Agents.md`, kế hoạch/tiến độ có trong `doc/ver1/`; tạo thêm nơi lưu hướng dẫn lúc này dễ gây trùng nội dung.

- `Agents.md` hiện có: quy tắc làm việc với trợ lý, khác với JavaScript của app. Tên chuẩn trong tài liệu Codex là `AGENTS.md`; file thực tế ở dự án hiện mang tên `Agents.md`.
- `.agent/`: có thể là quy ước tự chọn để gom kế hoạch/quy trình AI, không phải thành phần cần thiết để Weather App chạy.
- Chỉ cân nhắc thêm nơi chứa quy trình riêng khi có nhiều tác vụ lặp lại hoặc kế hoạch dài cần quản lý độc lập. Khi đó phải chỉ rõ trong hướng dẫn chính nơi nào là nguồn thông tin chuẩn.

Theo [hướng dẫn chính thức về workflow với Codex](https://developers.openai.com/cookbook/examples/codex/iterating-development-workflows-with-codex), `AGENTS.md` là tùy chọn và cấu trúc workflow cần điều chỉnh theo dự án. Không tạo `.agent/` chỉ vì một dự án khác có nó.

## 9. Thứ tự đọc để hiểu code

1. [Mục tiêu sản phẩm](ProductGoal.md) → hiểu app phục vụ ai.
2. [index.html](../../index.html) → xác định form và các vùng kết quả theo `id`.
3. [app.js](../../src/app.js) → đọc state, submit handler và `selectCity()`.
4. [geocoding.js](../../src/services/geocoding.js) và [weather.js](../../src/services/weather.js) → theo dấu dữ liệu vào/ra.
5. [render.js](../../src/ui/render.js) và [translations.js](../../src/i18n/translations.js) → xem dữ liệu trở thành giao diện.
6. [preferences.js](../../src/storage/preferences.js) → hiểu dữ liệu nào tồn tại sau reload.
7. [style.css](../../src/css/style.css), [test plan](06-test-plan.md), [backlog](05-backlog.md) → xem thiết kế và phần còn cần xác minh.

**Lưu ý tài liệu:** README và thiết kế ban đầu còn có mô tả `count=1`, tự chọn kết quả đầu tiên, chưa lưu lịch sử/ngôn ngữ hoặc chưa triển khai source. Những đoạn này chưa phản ánh bản hiện tại. `root.md` mô tả source tại ngày cập nhật; requirements/roadmap vẫn cần được đồng bộ khi chốt phạm vi phiên bản. Nếu sau này code thay đổi, cập nhật lại tài liệu này cùng task liên quan.
