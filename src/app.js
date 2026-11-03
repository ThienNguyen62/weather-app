import { findCities } from './services/geocoding.js';
import { getWeather } from './services/weather.js';
import { render } from './ui/render.js';
import { loadLanguage, saveLanguage, loadHistory, rememberCity, clearHistory } from './storage/preferences.js';

const state = {
  language: loadLanguage(), city: null, weather: null, candidates: [], history: loadHistory(),
  loading: false, message: 'initial', error: false,
};
const form = document.getElementById('search-form');
const input = document.getElementById('city');

// All requests share error handling; finally always unlocks the interface.
async function runRequest(message, action) {
  state.loading = true;
  state.error = false;
  state.message = message;
  render(state);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    await action(controller.signal);
  } catch (error) {
    state.error = true;
    state.message = controller.signal.aborted ? 'timeout'
      : ['apiError', 'dataError'].includes(error.message) ? error.message
      : error instanceof SyntaxError ? 'dataError' : 'networkError';
  } finally {
    clearTimeout(timeout);
    state.loading = false;
    render(state);
  }
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  if (state.loading) return;
  const query = input.value.trim();
  input.value = query;
  state.weather = null;
  state.city = null;
  state.candidates = [];
  state.error = false;
  if (Array.from(query).length < 2) {
    state.message = 'invalid';
    state.error = true;
    render(state);
    input.focus();
    return;
  }
  await runRequest('searching', async signal => {
    state.candidates = await findCities(query, state.language, signal);
    state.message = state.candidates.length ? 'chooseCity' : 'notFound';
    state.error = !state.candidates.length;
  });
  document.querySelector('#city-options button')?.focus();
});

async function selectCity(city) {
  if (state.loading) return;
  state.weather = null;
  state.city = null;
  await runRequest('loading', async signal => {
    const weather = await getWeather(city, signal);
    state.city = city;
    state.weather = weather;
    state.candidates = [];
    state.history = rememberCity(state.history, city);
    state.message = 'success';
  });
  if (state.weather) document.getElementById('location').focus();
}

// Event delegation keeps handlers valid when render replaces the buttons.
for (const [id, collection] of [['city-options', 'candidates'], ['recent-options', 'history']]) {
  document.getElementById(id).addEventListener('click', event => {
    const button = event.target.closest('button[data-city-id]');
    if (!button) return;
    const city = state[collection].find(item => String(item.id) === button.dataset.cityId);
    if (city) selectCity(city);
  });
}
document.getElementById('clear-history').addEventListener('click', () => {
  clearHistory();
  state.history = [];
  render(state);
  input.focus();
});
document.getElementById('language').addEventListener('click', () => {
  state.language = state.language === 'vi' ? 'en' : 'vi';
  saveLanguage(state.language);
  render(state);
});
render(state);
