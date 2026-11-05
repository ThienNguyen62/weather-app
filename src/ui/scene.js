// Use the selected city's clock, independently of the computer's timezone.
export function periodForHour(hour) {
  return hour >= 4 && hour < 18 ? 'day' : 'night';
}

export function localHour(timezone, now = new Date()) {
  return Number(new Intl.DateTimeFormat('en-GB', {
    timeZone: timezone, hour: '2-digit', hourCycle: 'h23',
  }).format(now));
}

export function weatherScene(code) {
  if ([0, 1].includes(code)) return 'clear';
  if ([2, 3].includes(code)) return 'cloudy';
  if ([45, 48].includes(code)) return 'fog';
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snow';
  if ([95, 96, 99].includes(code)) return 'storm';
  return 'unknown';
}
