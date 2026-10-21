import { translations, describeWeather } from '../i18n/translations.js';

const byId = id => document.getElementById(id);
const setText = (id, value) => { byId(id).textContent = value; };

// API timestamps are local wall-clock strings. Format their components in UTC
// to preserve the location's date/time instead of applying the browser timezone.
function formatDate(value, language, withTime = false) {
  return new Intl.DateTimeFormat(language === 'vi' ? 'vi-VN' : 'en-GB', {
    day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC',
    ...(withTime ? { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' } : { weekday: 'short' }),
  }).format(new Date(value + (withTime ? ':00Z' : 'T00:00:00Z')));
}

export function render(state) {
  const t = translations[state.language];
  const number = value => new Intl.NumberFormat(state.language === 'vi' ? 'vi-VN' : 'en-GB', { maximumFractionDigits: 1 }).format(value);
  document.documentElement.lang = state.language;
  document.querySelectorAll('[data-i18n]').forEach(element => { element.textContent = t[element.dataset.i18n]; });
  byId('city').placeholder = t.placeholder;
  byId('city').setAttribute('aria-invalid', String(state.message === 'invalid'));
  setText('language', state.language === 'vi' ? 'English' : 'Tiếng Việt');
  byId('language').setAttribute('aria-label', state.language === 'vi' ? 'Switch to English' : 'Chuyển sang tiếng Việt');
  byId('search').disabled = state.loading;
  byId('city').disabled = state.loading;
  byId('search-form').setAttribute('aria-busy', String(state.loading));
  setText('message', t[state.message]);
  byId('message').className = 'message' + (state.loading ? ' loading' : state.error ? ' error' : '');
  byId('results').hidden = !state.weather;
  if (!state.weather) return;
  const { weather, city, language } = state;
  setText('location', `${city.name}, ${city.country}`);
  setText('observed', `${t.observed}: ${formatDate(weather.time, language, true)} · ${weather.timezone}`);
  setText('temperature', `${number(weather.temperature)} °C`);
  setText('condition', describeWeather(weather.code, language));
  setText('humidity', `${number(weather.humidity)} %`);
  setText('wind', `${number(weather.wind)} km/h`);
  const cards = weather.days.map((day, index) => {
    const card = document.createElement('article');
    card.className = 'panel day';
    const heading = document.createElement('h3');
    heading.textContent = (index === 0 ? `${t.today} · ` : '') + formatDate(day.date, language);
    const condition = document.createElement('p');
    condition.textContent = describeWeather(day.code, language);
    const range = document.createElement('p');
    range.className = 'range';
    range.textContent = `${t.high}: ${number(day.max)} °C · ${t.low}: ${number(day.min)} °C`;
    card.append(heading, condition, range);
    return card;
  });
  byId('forecast').replaceChildren(...cards);
}
