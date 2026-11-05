import assert from 'node:assert/strict';
import { findCities } from '../src/services/geocoding.js';
import { loadLanguage, saveLanguage, loadHistory, rememberCity, clearHistory } from '../src/storage/preferences.js';
import { translations } from '../src/i18n/translations.js';
import { weatherIconName, render } from '../src/ui/render.js';
import { getWeather } from '../src/services/weather.js';
import { localHour, periodForHour, weatherScene } from '../src/ui/scene.js';

const city = id => ({ id, name: `City ${id}`, country: 'Test', latitude: id, longitude: id });
const saved = new Map();
globalThis.localStorage = { getItem: key => saved.get(key) ?? null, setItem: (key, value) => saved.set(key, value) };
assert.equal(loadLanguage(), 'vi');
saveLanguage('en'); assert.equal(loadLanguage(), 'en');
saved.set('weather.language.v1', 'broken'); assert.equal(loadLanguage(), 'vi');
let history = [];
for (let id = 1; id <= 7; id++) history = rememberCity(history, city(id));
assert.deepEqual(history.map(x => x.id), [7, 6, 5, 4, 3]);
history = rememberCity(history, city(5));
assert.deepEqual(loadHistory().map(x => x.id), [5, 7, 6, 4, 3]);
saved.set('weather.history.v1', JSON.stringify([city(1), city(1), { id: 2 }, city(3)]));
assert.deepEqual(loadHistory().map(x => x.id), [1, 3]);
saved.set('weather.history.v1', '{bad'); assert.deepEqual(loadHistory(), []);
clearHistory(); assert.deepEqual(loadHistory(), []);
globalThis.localStorage = { getItem() { throw Error('blocked'); }, setItem() { throw Error('blocked'); } };
assert.equal(loadLanguage(), 'vi'); assert.deepEqual(loadHistory(), []);
assert.equal(rememberCity([], city(1)).length, 1); saveLanguage('en'); clearHistory();
assert.deepEqual(Object.keys(translations.vi).sort(), Object.keys(translations.en).sort());
assert.equal(weatherIconName(0), 'sun');
assert.equal(weatherIconName(2), 'partly');
assert.equal(weatherIconName(3), 'cloud');
assert.equal(weatherIconName(45), 'fog');
assert.equal(weatherIconName(65), 'rain');
assert.equal(weatherIconName(86), 'snow');
assert.equal(weatherIconName(99), 'storm');
assert.equal(weatherIconName(1234), 'unknown');
let calls = [];
globalThis.fetch = async url => { calls.push(new URL(url)); return { ok: true, json: async () => ({ results: [city(1), city(2)] }) }; };
assert.equal((await findCities('test', 'vi')).length, 2);
assert.equal(calls[0].searchParams.get('count'), '5');
globalThis.fetch = async () => ({ ok: true, json: async () => ({}) });
assert.deepEqual(await findCities('none', 'vi'), []);
globalThis.fetch = async () => ({ ok: true, json: async () => ({ results: [{}] }) });
await assert.rejects(findCities('bad', 'vi'), /dataError/);

// Minimal DOM harness: verifies controller transitions, not browser layout.
class Element {
  constructor() { this.dataset = {}; this.children = []; this.handlers = {}; this.value = ''; }
  addEventListener(type, handler) { this.handlers[type] = handler; }
  setAttribute() {}
  append(...items) { this.children.push(...items); }
  replaceChildren(...items) { this.children = items; }
  querySelectorAll() { return this.children.flatMap(item => item.children); }
  focus() {}
}
const elements = new Map();
const el = id => { if (!elements.has(id)) elements.set(id, new Element()); return elements.get(id); };
globalThis.document = { getElementById: el, documentElement: { dataset: {} }, querySelectorAll: () => [],
  createElement: () => new Element(), createElementNS: () => new Element(), querySelector: () => el('city-options').children[0]?.children[0] };
globalThis.localStorage = { getItem: key => saved.get(key) ?? null, setItem: (key, value) => saved.set(key, value) };
clearHistory();
let failWeather = false;
const weather = {
  timezone: 'Asia/Tokyo', current: { time: '2026-11-04T12:00', temperature_2m: 22,
    relative_humidity_2m: 70, weather_code: 0, wind_speed_10m: 5 },
  daily: { time: Array.from({ length: 7 }, (_, i) => `2026-11-${String(4 + i).padStart(2, '0')}`),
    weather_code: [0, 1, 2, 3, 61, 71, 95], temperature_2m_max: [25, 26, 27, 28, 29, 30, 31],
    temperature_2m_min: [20, 21, 22, 23, 24, 25, 26] },
};
calls = [];
globalThis.fetch = async url => {
  url = new URL(url); calls.push(url);
  if (url.hostname.startsWith('geocoding')) return { ok: true, json: async () => ({ results: [city(1), city(2)] }) };
  if (failWeather) throw new TypeError('offline');
  return { ok: true, json: async () => weather };
};
await import('../src/app.js');
assert.equal(calls.length, 0, 'startup must not fetch');
assert.equal(el('welcome').hidden, false);
assert.equal(document.documentElement.dataset.view, 'welcome');
const submit = async value => { el('city').value = value; await el('search-form').handlers.submit({ preventDefault() {} }); };
const choose = async (list, index = 0) => {
  const button = el(list).children[index].children[0];
  el(list).handlers.click({ target: { closest: () => button } });
  // Event callback starts an async request; flush its promise chain.
  for (let i = 0; i < 20; i++) await Promise.resolve();
};
await submit(' '); assert.equal(calls.length, 0);
await submit('Hanoi'); assert.equal(calls.length, 1, 'search must not fetch weather');
assert.equal(el('city-options').children.length, 2);
await choose('city-options', 1);
assert.equal(calls[1].searchParams.get('latitude'), '2');
assert.equal(calls[1].searchParams.get('forecast_days'), '7');
assert.equal(el('welcome').hidden, true);
assert.equal(document.documentElement.dataset.view, 'weather');
assert.equal(el('results').hidden, false);
assert.equal(el('temperature').textContent, '22 °C');
assert.equal(el('forecast').children.length, 7);
assert.deepEqual(loadHistory().map(x => x.id), [2]);
await choose('recent-options'); assert.equal(calls.length, 3, 'history fetches fresh weather');
assert.equal(loadHistory().length, 1);
await submit('new'); failWeather = true;
await choose('city-options');
assert.equal(el('results').hidden, true);
assert.equal(el('search').disabled, false);
assert.deepEqual(loadHistory().map(x => x.id), [2], 'failed forecast must not enter history');
failWeather = false;
await choose('city-options'); assert.equal(el('results').hidden, false);
el('language').handlers.click(); assert.equal(loadLanguage(), 'en');
el('clear-history').handlers.click(); assert.deepEqual(loadHistory(), []);
assert.equal(el('recent-places').hidden, true);
// Actual clock boundary rules, including cities with a different local date.
for (const [hour, period] of [[0, 'night'], [3, 'night'], [4, 'day'], [12, 'day'], [17, 'day'], [18, 'night'], [23, 'night']]) {
  assert.equal(periodForHour(hour), period);
}
const instant = new Date('2026-11-05T21:00:00Z');
assert.equal(localHour('Asia/Ho_Chi_Minh', instant), 4);
assert.equal(localHour('America/New_York', instant), 16);
for (const [code, scene] of [[0, 'clear'], [3, 'cloudy'], [45, 'fog'], [65, 'rain'], [71, 'snow'], [99, 'storm'], [999, 'unknown']]) {
  assert.equal(weatherScene(code), scene);
}
globalThis.fetch = async () => ({ ok: true, json: async () => weather });
const normalized = await getWeather(city(1));
assert.equal(normalized.days.length, 7);
const sceneState = { language: 'vi', weather: normalized, city: city(1), candidates: [], history: [], loading: false, message: 'success' };
render(sceneState, new Date('2026-11-05T18:59:00Z')); // Tokyo 03:59
assert.equal(document.documentElement.dataset.period, 'night');
render(sceneState, new Date('2026-11-05T19:00:00Z')); // Tokyo 04:00
assert.equal(document.documentElement.dataset.period, 'day');
render(sceneState, new Date('2026-11-06T08:59:00Z')); // Tokyo 17:59
assert.equal(document.documentElement.dataset.period, 'day');
render(sceneState, new Date('2026-11-06T09:00:00Z')); // Tokyo 18:00
assert.equal(document.documentElement.dataset.period, 'night');
for (const mutate of [data => data.daily.time.pop(), data => data.daily.weather_code.pop(), data => data.daily.temperature_2m_max[0] = null,
  data => data.daily.time[1] = data.daily.time[0], data => data.timezone = 'Invalid/Zone']) {
  const invalid = structuredClone(weather); mutate(invalid);
  globalThis.fetch = async () => ({ ok: true, json: async () => invalid });
  await assert.rejects(getWeather(city(1)), /dataError/);
}
globalThis.fetch = async () => ({ ok: false });
await assert.rejects(getWeather(city(1)), /apiError/);
globalThis.fetch = async () => ({ ok: true, json: async () => { throw new SyntaxError('bad JSON'); } });
await assert.rejects(getWeather(city(1)), SyntaxError);
el('home').handlers.click();
assert.equal(el('welcome').hidden, false);
assert.equal(el('results').hidden, true);
assert.equal(document.documentElement.dataset.view, 'welcome');
console.log('PASS: 7-day forecast, day/night boundaries, city timezone, welcome navigation; API validation, storage resilience, history limit/deduplication, translations and controller flow (mock API/DOM).');
