// Shared validation for API results and saved places.
export function isValidCity(city) {
  return !!city && Number.isSafeInteger(city.id) && city.id > 0
    && typeof city.name === 'string' && !!city.name.trim()
    && typeof city.country === 'string' && !!city.country.trim()
    && (city.admin1 === undefined || typeof city.admin1 === 'string')
    && Number.isFinite(city.latitude) && Math.abs(city.latitude) <= 90
    && Number.isFinite(city.longitude) && Math.abs(city.longitude) <= 180;
}

export async function findCities(query, language, signal) {
  const url = new URL('https://geocoding-api.open-meteo.com/v1/search');
  url.search = new URLSearchParams({ name: query, count: '5', language });
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error('apiError');
  const data = await response.json();
  if (!data || data.error) throw new Error('dataError');
  if (data.results === undefined) return [];
  if (!Array.isArray(data.results) || !data.results.every(isValidCity)) throw new Error('dataError');
  return data.results.slice(0, 5).map(({ id, name, country, admin1, latitude, longitude }) =>
    ({ id, name, country, admin1, latitude, longitude }));
}
