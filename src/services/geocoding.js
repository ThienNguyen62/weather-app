export async function findCity(query, language, signal) {
  const url = new URL('https://geocoding-api.open-meteo.com/v1/search');
  url.search = new URLSearchParams({ name: query, count: '1', language });
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error('apiError');
  const data = await response.json();
  if (!data || data.error) throw new Error('dataError');
  if (data.results === undefined || (Array.isArray(data.results) && data.results.length === 0)) return null;
  const city = data.results?.[0];
  if (!Array.isArray(data.results) || !city || typeof city.name !== 'string' || !city.name.trim()
      || typeof city.country !== 'string' || !city.country.trim()
      || !Number.isFinite(city.latitude) || Math.abs(city.latitude) > 90
      || !Number.isFinite(city.longitude) || Math.abs(city.longitude) > 180) {
    throw new Error('dataError');
  }
  return { name: city.name, country: city.country, latitude: city.latitude, longitude: city.longitude };
}
