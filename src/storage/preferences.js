import { isValidCity } from '../services/geocoding.js';

const LANGUAGE_KEY = 'weather.language.v1';
const HISTORY_KEY = 'weather.history.v1';

function read(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}
function write(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Storage is optional. */ }
}
export function loadLanguage() {
  return read(LANGUAGE_KEY) === 'en' ? 'en' : 'vi';
}
export function saveLanguage(language) { write(LANGUAGE_KEY, language); }
export function loadHistory() {
  const saved = read(HISTORY_KEY);
  if (!Array.isArray(saved)) return [];
  return saved.filter(isValidCity).filter((city, index, cities) =>
    cities.findIndex(item => item.id === city.id) === index).slice(0, 5);
}
export function rememberCity(history, city) {
  const updated = [city, ...history.filter(item => item.id !== city.id)].slice(0, 5);
  write(HISTORY_KEY, updated);
  return updated;
}
export function clearHistory() { write(HISTORY_KEY, []); }
