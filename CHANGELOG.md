# Changelog

## 2.2.0 — 2026-10-13
- Estilo más atrevido: sidebar negro sólido, franja Cherry en el inicio, cabecera del docente en bloque negro con nombre gigante.
- Contraste editorial: radios de 8px, reglas negras, lista de docentes en filas y comparador tipo marcador.
- Movimiento: números que cuentan, barras que crecen y entrada escalonada (respeta reducir movimiento).
- La carga de trabajo sin reseñas ahora muestra "—".

## 2.1.0 — 2026-10-13
- Rediseño completo: layout de tres columnas (navegación, contenido, contexto), tarjetas de métricas grandes y comparador lado a lado.
- Paleta UTP: Cherry, Maroon, Dark Ruby, Cotton, Pearl, Noir y Meteorite; modo oscuro a juego.
- Monogramas en lugar de emojis, espacio para ilustración propia (public/arte/hero.png).
- Perfil del docente con columna de contexto y acceso directo a comparar.

## 2.0.1 — 2026-10-13
- Solo quedan los 22 docentes actuales; se retiraron los 25 anteriores.

## 2.0.0 — 2026-10-13
- Reescritura en Vite + React + TypeScript con diseño nuevo y modo claro/oscuro.
- 22 docentes reales de la UTP Lima Norte; todas las métricas salen de las reseñas de los alumnos.
- Docentes guardados, filtros en la URL y filtro de reseñas por curso.
- Editar tus reseñas y borrarlas con opción de deshacer; editar tu perfil.
- Comparar muestra quién gana en más criterios.
- Carga diferida de páginas (bundle inicial de 240 kB a 202 kB).
- Tests (Vitest), lint, CI y deploy automático a GitHub Pages.
