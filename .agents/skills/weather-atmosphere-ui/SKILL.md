---
name: weather-atmosphere-ui
description: Update the atmospheric welcome and weather UI in this Weather App, preserving city selection, local day/night backgrounds and a seven-day forecast.
---

# Weather atmosphere UI

Use this for UI changes in this repository. Read `src/ui/render.js`, `src/ui/scene.js`, `src/css/style.css` and `doc/ver1/02-requirements.md` before editing.

- Follow the user's reference direction: full-viewport photographic sky, blue/lavender tones, white lightweight large typography, translucent controls, generous space and forecast cards below the main weather story. Adapt the composition for mobile; do not copy fake metrics or decorative controls from the reference.
- Opening the app shows the welcome view and city search, even when history exists. Fetch weather only after a place is chosen. Keep keyboard navigation, VI/EN, history and clear error/loading feedback.
- Use local bundled images `assets/sky-day.webp` and `assets/sky-night.webp`. Weather conditions are atmospheric CSS layers controlled by `data-scene`; retain readable translated weather text instead of relying on an icon or background alone.
- Day is 04:00 inclusive to 18:00 exclusive in the selected city's IANA timezone. Other times are night. This is a product rule, not AM/PM or astronomical sunrise. Use the current clock, not `current.time` from an older weather observation. Refresh at minute boundaries and on tab visibility changes.
- Forecast API, validation, translations and rendering must agree on seven consecutive local dates, today plus six. Preserve Celsius, percent humidity and km/h.
- Keep the project in vanilla HTML/CSS/JS with no new framework or build pipeline. Provide legible dark fallback colors when images cannot load; respect reduced motion.
- Run `node tests/logic.mjs`; check 03:59/04:00/17:59/18:00, timezone differences, seven-day validation, navigation and VI/EN. Inspect 360/768/1280px in a real browser when available. Record unexecuted checks as Not Run in `doc/ver1/06-test-plan.md` and update the backlog without claiming Done before its Definition of Done.
