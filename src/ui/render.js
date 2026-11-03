import { translations, describeWeather } from '../i18n/translations.js';

const byId = id => document.getElementById(id);
const setText = (id, value) => { byId(id).textContent = value; };

// Decorative icons supplement the translated condition; unknown codes stay neutral.
export function weatherIconName(code) {
  if (code === 0) return 'sun';
  if ([1, 2].includes(code)) return 'partly';
  if (code === 3) return 'cloud';
  if ([45, 48].includes(code)) return 'fog';
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snow';
  if ([95, 96, 99].includes(code)) return 'storm';
  return 'unknown';
}

function createWeatherIcon(code) {
  const name = weatherIconName(code);
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', `icon weather-${name}`);
  svg.setAttribute('viewBox', '0 0 48 48');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', `#icon-${name}`);
  svg.append(use);
  return svg;
}

// API timestamps are local wall-clock strings. Format their components in UTC
// to preserve the location's date/time instead of applying the browser timezone.
function formatDate(value, language, withTime = false) {
  return new Intl.DateTimeFormat(language === 'vi' ? 'vi-VN' : 'en-GB', {
    day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC',
    ...(withTime ? { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' } : { weekday: 'short' }),
  }).format(new Date(value + (withTime ? ':00Z' : 'T00:00:00Z')));
}

function cityLabel(city) {
  return [city.name, city.admin1, city.country].filter(Boolean).join(', ');
}
function renderPlaces(id, cities, loading) {
  const list = byId(id);
  // Reuse unchanged buttons so switching language does not lose keyboard focus.
  const signature = JSON.stringify(cities);
  if (list.dataset.places !== signature) {
    list.replaceChildren(...cities.map(city => {
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.cityId = String(city.id);
      button.textContent = cityLabel(city);
      item.append(button);
      return item;
    }));
    list.dataset.places = signature;
  }
  list.querySelectorAll('button').forEach(button => { button.disabled = loading; });
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
  renderPlaces('city-options', state.candidates, state.loading);
  renderPlaces('recent-options', state.history, state.loading);
  byId('city-choices').hidden = !state.candidates.length;
  byId('recent-places').hidden = !state.history.length;
  byId('clear-history').disabled = state.loading;
  byId('results').hidden = !state.weather;
  if (!state.weather) return;
  const { weather, city, language } = state;
  setText('location', cityLabel(city));
  setText('observed', `${t.observed}: ${formatDate(weather.time, language, true)} · ${weather.timezone}`);
  setText('temperature', `${number(weather.temperature)} °C`);
  setText('condition', describeWeather(weather.code, language));
  byId('current-icon').replaceChildren(createWeatherIcon(weather.code));
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
    card.append(heading, createWeatherIcon(day.code), condition, range);
    return card;
  });
  byId('forecast').replaceChildren(...cards);
}
