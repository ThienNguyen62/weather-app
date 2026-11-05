export const translations = {
  vi: {
    eyebrow: 'THỜI TIẾT MỖI NGÀY', heading: 'Chào ngày mới. Đón mọi thời tiết.', subtitle: 'Tìm một thành phố. Chuẩn bị cho ngày của bạn.',
    cityLabel: 'Tên thành phố', search: 'Tìm kiếm', placeholder: 'Ví dụ: Hanoi, Tokyo, London',
    hint: 'Chọn địa điểm phù hợp từ kết quả tìm kiếm.', current: 'THỜI TIẾT HIỆN TẠI', humidity: 'Độ ẩm', wind: 'Tốc độ gió',
    forecast: 'Thời tiết 7 ngày tới', forecastHint: 'Hôm nay và sáu ngày tiếp theo · Theo giờ địa phương',
    home: 'Đổi địa điểm', day: 'Ban ngày', night: 'Ban đêm', welcomeNote: 'BẦU TRỜI THAY ĐỔI. KẾ HOẠCH VẪN TRONG TAY.',
    source: 'Dữ liệu thời tiết:', note: 'Dự báo có thể thay đổi theo thời gian.',
    initial: 'Nhập tên thành phố để xem thời tiết.', loading: 'Đang tải thời tiết…',
    invalid: 'Vui lòng nhập tên thành phố có ít nhất 2 ký tự.', notFound: 'Không tìm thấy thành phố. Hãy thử tên khác.',
    apiError: 'Dịch vụ thời tiết đang gặp lỗi. Vui lòng thử lại.', networkError: 'Không thể kết nối. Kiểm tra mạng rồi thử lại.',
    dataError: 'Dữ liệu thời tiết không đầy đủ hoặc không hợp lệ. Vui lòng thử lại.', timeout: 'Yêu cầu mất quá nhiều thời gian. Vui lòng thử lại.',
    observed: 'Thời điểm dữ liệu (giờ địa phương)', high: 'Cao', low: 'Thấp', today: 'Hôm nay', unknown: 'Chưa rõ trạng thái thời tiết',
    success: 'Đã cập nhật thời tiết.', searching: 'Đang tìm thành phố…', chooseCity: 'Chọn một địa điểm để xem thời tiết.',
    choicesTitle: 'Chọn thành phố', recentTitle: 'Địa điểm gần đây', clearHistory: 'Xóa lịch sử',
  },
  en: {
    eyebrow: 'EVERYDAY WEATHER', heading: 'A new day. A world of weather.', subtitle: 'Find a city. Get ready for your day.',
    cityLabel: 'City name', search: 'Search', placeholder: 'Try Hanoi, Tokyo, London',
    hint: 'Choose the correct place from the search results.', current: 'CURRENT WEATHER', humidity: 'Humidity', wind: 'Wind speed',
    forecast: 'Your week ahead', forecastHint: 'Today and the next six days · Local time',
    home: 'Change location', day: 'Daytime', night: 'Nighttime', welcomeNote: 'CHANGING SKIES. CLEARER PLANS.',
    source: 'Weather data:', note: 'Forecasts may change over time.',
    initial: 'Enter a city name to see the weather.', loading: 'Loading weather…',
    invalid: 'Please enter a city name with at least 2 characters.', notFound: 'City not found. Try another name.',
    apiError: 'The weather service is unavailable. Please try again.', networkError: 'Unable to connect. Check your connection and try again.',
    dataError: 'Weather data is incomplete or invalid. Please try again.', timeout: 'The request took too long. Please try again.',
    observed: 'Data time (local time)', high: 'High', low: 'Low', today: 'Today', unknown: 'Unknown weather condition',
    success: 'Weather updated.', searching: 'Searching for cities…', chooseCity: 'Choose a place to see the weather.',
    choicesTitle: 'Choose a city', recentTitle: 'Recent places', clearHistory: 'Clear history',
  },
};

// WMO codes documented by Open-Meteo. Unknown future codes have a safe fallback.
const conditions = [
  [[0], 'Trời quang', 'Clear sky'], [[1], 'Chủ yếu trời quang', 'Mainly clear'],
  [[2], 'Có mây rải rác', 'Partly cloudy'], [[3], 'U ám', 'Overcast'],
  [[45], 'Sương mù', 'Fog'], [[48], 'Sương mù đóng băng', 'Depositing rime fog'],
  [[51], 'Mưa phùn nhẹ', 'Light drizzle'], [[53], 'Mưa phùn vừa', 'Moderate drizzle'], [[55], 'Mưa phùn dày', 'Dense drizzle'],
  [[56], 'Mưa phùn đóng băng nhẹ', 'Light freezing drizzle'], [[57], 'Mưa phùn đóng băng dày', 'Dense freezing drizzle'],
  [[61], 'Mưa nhẹ', 'Slight rain'], [[63], 'Mưa vừa', 'Moderate rain'], [[65], 'Mưa to', 'Heavy rain'],
  [[66], 'Mưa đóng băng nhẹ', 'Light freezing rain'], [[67], 'Mưa đóng băng to', 'Heavy freezing rain'],
  [[71], 'Tuyết nhẹ', 'Slight snowfall'], [[73], 'Tuyết vừa', 'Moderate snowfall'], [[75], 'Tuyết dày', 'Heavy snowfall'],
  [[77], 'Hạt tuyết', 'Snow grains'], [[80], 'Mưa rào nhẹ', 'Slight rain showers'],
  [[81], 'Mưa rào vừa', 'Moderate rain showers'], [[82], 'Mưa rào dữ dội', 'Violent rain showers'],
  [[85], 'Tuyết rào nhẹ', 'Slight snow showers'], [[86], 'Tuyết rào dày', 'Heavy snow showers'],
  [[95], 'Dông', 'Thunderstorm'], [[96], 'Dông kèm mưa đá nhẹ', 'Thunderstorm with slight hail'],
  [[99], 'Dông kèm mưa đá mạnh', 'Thunderstorm with heavy hail'],
];

export function describeWeather(code, language) {
  const condition = conditions.find(([codes]) => codes.includes(code));
  return condition ? condition[language === 'vi' ? 1 : 2] : translations[language].unknown;
}
