import assert from 'node:assert/strict';
import { findCities } from '../src/services/geocoding.js';
import { loadLanguage, saveLanguage, loadHistory, rememberCity, clearHistory } from '../src/storage/preferences.js';
import { translations } from '../src/i18n/translations.js';
import { weatherIconName } from '../src/ui/render.js';

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
globalThis.document = { getElementById: el, documentElement: {}, querySelectorAll: () => [],
  createElement: () => new Element(), createElementNS: () => new Element(), querySelector: () => el('city-options').children[0]?.children[0] };
globalThis.localStorage = { getItem: key => saved.get(key) ?? null, setItem: (key, value) => saved.set(key, value) };
clearHistory();
let failWeather = false;
const weather = {
  timezone: 'Asia/Tokyo', current: { time: '2026-11-04T12:00', temperature_2m: 22,
    relative_humidity_2m: 70, weather_code: 0, wind_speed_10m: 5 },
  daily: { time: ['2026-11-04', '2026-11-05', '2026-11-06'], weather_code: [0, 1, 2],
    temperature_2m_max: [25, 26, 27], temperature_2m_min: [20, 21, 22] },
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
assert.equal(el('results').hidden, false);
assert.equal(el('temperature').textContent, '22 °C');
assert.equal(el('forecast').children.length, 3);
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
console.log('PASS: API validation, storage resilience, history limit/deduplication, translations and controller flow (mock API/DOM).');
