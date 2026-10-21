import { findCity } from './services/geocoding.js';
import { getWeather } from './services/weather.js';
import { render } from './ui/render.js';

const state = { language: 'vi', city: null, weather: null, loading: false, message: 'initial', error: false };
const form = document.getElementById('search-form');
const input = document.getElementById('city');

form.addEventListener('submit', async event => {
  event.preventDefault();
  if (state.loading) return;
  const query = input.value.trim();
  input.value = query;
  state.weather = null;
  state.city = null;
  state.error = false;
  if (Array.from(query).length < 2) {
    state.message = 'invalid';
    state.error = true;
    render(state);
    input.focus();
    return;
  }
  state.loading = true;
  state.message = 'loading';
  render(state);
  // One timeout covers both sequential requests. finally always restores the form.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const city = await findCity(query, state.language, controller.signal);
    if (!city) {
      state.message = 'notFound';
      state.error = true;
    } else {
      const weather = await getWeather(city, controller.signal);
      state.city = city;
      state.weather = weather;
      state.message = 'success';
    }
  } catch (error) {
    state.error = true;
    const knownErrors = ['apiError', 'dataError'];
    state.message = controller.signal.aborted ? 'timeout'
      : knownErrors.includes(error.message) ? error.message
      : error instanceof SyntaxError ? 'dataError' : 'networkError';
  } finally {
    clearTimeout(timeout);
    state.loading = false;
    render(state);
  }
});

document.getElementById('language').addEventListener('click', () => {
  state.language = state.language === 'vi' ? 'en' : 'vi';
  render(state);
});

render(state);
