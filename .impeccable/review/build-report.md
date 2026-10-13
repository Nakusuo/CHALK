# Build report: rediseño campus

## Archivos
- Tokens y base: `index.html` (Geist 400–800, fuera Inter/JetBrains Mono), `tailwind.config.js` (accent/accent-ink/accent-soft, `rounded-card` 16px, `shadow-card`/`shadow-lift`, `ease-out` exponencial), `src/index.css` (variables claro/oscuro, halo radial arriba a la derecha, selección, caret, focus-visible, scrollbars, `.num` tabular, `.lift`, `.seg`, `.btn-brand`; `.eyebrow` eliminado).
- Primitivas: `src/components/ui.tsx` (`Monogram`, `initialsOf`, `tint` con 6 tintes, `Stat` estilo ref 3, `Empty`/`PageHeader` ajustados), test nuevo en `ui.test.ts`.
- Shell: `Layout.tsx` (3 columnas ≥1280, riel de íconos 1024–1279 con contexto debajo, barra superior + cajón <1024, Esc cierra), `Aside.tsx` (portal por contexto; fuera del Layout se pinta en línea), `ArtSlot.tsx` (`./arte/hero.png` o marco punteado "Tu ilustración aquí").
- Componentes: `ProfessorCard.tsx` (article con enlace estirado, cursos en píldoras, métricas, guardar, CTA rojo "Reseñar"), `ReviewItem.tsx` (tarjeta), `Toast.tsx`, `AuthShell.tsx` (split: panel lavanda con ilustración y puntos, tarjeta de formulario).
- Páginas: Home, Professor, Compare, Faculties, Courses, Profile, Review, NotFound, Login, Register.

## Decisiones
- Rojo UTP solo en el logo, "Escribir reseña", "Reseñar" y "Publicar reseña". El resto de botones primarios (Entrar, Continuar, Guardar) pasan a violeta.
- Una sola elevación (sombra violeta con offset); sin combinar borde + sombra. Los inputs llevan borde (son controles, no tarjetas).
- Monograma: primer nombre + primer apellido ("Ronald Angel Ayra Pinto" → RA); tono por `p.dept`. Los puntos de curso usan un tono por nombre de curso para que se distingan (casi todos son de Ingeniería).
- Íconos de facultad: lucide por id (`ing`, `neg`, `derecho`, `comunicaciones`, `salud`, `general`). El campo `icon`/`emoji` de los datos se conserva pero ya no se muestra.
- Columna derecha: Home (ilustración, Mejor calificados, comparar), Professor (Cursos que dicta, docentes de los mismos cursos), Profile (Mis datos), Review (docente + pasos). Compare, Facultades, Cursos y 404 van a una columna (`has-[>aside:empty]`).
- Compare: selector arriba de cada columna, monograma y nombre centrados, filas "Vista rápida" y "Criterios" con números grandes centrados; el ganador va en fondo violeta suave. La lógica `winner` no cambia.
- Distribución: barras verticales de 1★ a 5★, con la mayor resaltada; solo se muestra si hay reseñas escritas en la app (antes salía con barras vacías).
- Orden en Home: un `<select>` en lugar de segmentos (las facultades ya usan segmentos).

## Sin terminar / riesgos
- No hubo revisión en navegador: falta confirmar en pantalla el contraste, el lift y los anchos de 375/1024/1280.
- `public/arte/hero.png` no existe, así que se ve el marco vacío.
- Hay que revisar a ojo la posición del botón Intercambiar en Compare (`top-[108px]`).
- Faltan DESIGN.md y el veredicto de la revisión final (los pide el contrato; aún no se hacen).

## Ronda de correcciones (capturas)
1. AuthShell: el arte queda en `aspect-[4/3] max-h-[38vh]`, así el titular y los 3 puntos caben en un alto de 900px.
2. Compare: bajo 640px los selectores se apilan en una sola columna (select a lo ancho con la X al lado, monograma y nombre debajo, Intercambiar entre ambos). Desde 640px vuelve a ser lado a lado. El encabezado de victorias usa `plural` ("1 criterio" / "N criterios").
3. Home: las métricas son una fila de 3 columnas compacta en móvil (`Stat compact`: número 2xl, sin subtítulo ni barra bajo 640px).
4. Sidebar: el contador de un curso solo se muestra si es mayor que 1.
