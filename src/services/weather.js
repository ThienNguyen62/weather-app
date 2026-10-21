// Normalize and validate API data before sending it to the UI.
export async function getWeather(city, signal) {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.search = new URLSearchParams({
    latitude: city.latitude, longitude: city.longitude,
    current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    forecast_days: '3', timezone: 'auto', temperature_unit: 'celsius', wind_speed_unit: 'kmh',
  });
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error('apiError');
  const data = await response.json();
  const current = data?.current;
  const daily = data?.daily;
  const numericFields = ['temperature_2m', 'relative_humidity_2m', 'weather_code', 'wind_speed_10m'];
  const dailyFields = ['time', 'weather_code', 'temperature_2m_max', 'temperature_2m_min'];
  if (data?.error || !current || !daily || typeof data.timezone !== 'string'
      || typeof current.time !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(current.time)
      || !numericFields.every(key => Number.isFinite(current[key]))
      || current.relative_humidity_2m < 0 || current.relative_humidity_2m > 100 || current.wind_speed_10m < 0
      || !dailyFields.every(key => Array.isArray(daily[key]) && daily[key].length === 3)) throw new Error('dataError');
  // Validate timestamps without converting them to the browser's timezone.
  const currentDate = new Date(current.time + ':00Z');
  if (!Number.isFinite(currentDate.getTime())
      || currentDate.toISOString().slice(0, 16) !== current.time) throw new Error('dataError');
  const days = daily.time.map((date, index) => {
    const code = daily.weather_code[index];
    const max = daily.temperature_2m_max[index];
    const min = daily.temperature_2m_min[index];
    if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)
        || ![code, max, min].every(Number.isFinite) || max < min
        || !Number.isFinite(Date.parse(date + 'T00:00:00Z'))
        || new Date(date + 'T00:00:00Z').toISOString().slice(0, 10) !== date) throw new Error('dataError');
    return { date, code, max, min };
  });
  if (days[0].date !== current.time.slice(0, 10)
      || days.some((day, index) => index > 0 && Date.parse(day.date) - Date.parse(days[index - 1].date) !== 86400000)) throw new Error('dataError');
  return {
    timezone: data.timezone, time: current.time, temperature: current.temperature_2m,
    humidity: current.relative_humidity_2m, wind: current.wind_speed_10m, code: current.weather_code, days,
  };
}
