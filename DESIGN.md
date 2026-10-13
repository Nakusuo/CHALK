---
name: CHALK
description: Campus app tranquilo en lavanda neblina para que alumnos de la UTP Lima Norte elijan docente con métricas de reseñas reales.
colors:
  lavender-mist: "#F4F3FB"
  card-white: "#FFFFFF"
  wash-lilac: "#EFEDFA"
  hairline-lilac: "#E3E0F3"
  ink-night: "#18162B"
  sub-dusk: "#5E5A7A"
  violet-interaction: "#6C5CE7"
  violet-ink: "#5444D0"
  violet-soft: "#ECE9FD"
  halo-lilac: "#D8D0FF"
  utp-red: "#C8102E"
  utp-red-deep: "#9E0B23"
  night-bg: "#100E1D"
  night-surface: "#1B182D"
  night-violet: "#9284FF"
typography:
  display:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "34px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  metric:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "36px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  chip: "9999px"
  control: "12px"
  card: "16px"
  search: "16px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  rail: "84px"
  sidebar: "248px"
  context: "320px"
components:
  card:
    backgroundColor: "{colors.card-white}"
    rounded: "{rounded.card}"
    padding: "24px"
  button-primary:
    backgroundColor: "{colors.violet-interaction}"
    textColor: "{colors.card-white}"
    rounded: "{rounded.control}"
    height: "40px"
    padding: "0 16px"
  button-primary-hover:
    backgroundColor: "{colors.violet-ink}"
  button-brand:
    backgroundColor: "{colors.utp-red}"
    textColor: "{colors.card-white}"
    rounded: "{rounded.control}"
    height: "40px"
  button-brand-hover:
    backgroundColor: "{colors.utp-red-deep}"
  button-outline:
    backgroundColor: "{colors.wash-lilac}"
    textColor: "{colors.ink-night}"
    rounded: "{rounded.control}"
    height: "40px"
  input:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink-night}"
    rounded: "{rounded.control}"
    height: "44px"
    padding: "0 14px"
  chip:
    backgroundColor: "{colors.wash-lilac}"
    textColor: "{colors.sub-dusk}"
    rounded: "{rounded.chip}"
    height: "32px"
  chip-on:
    backgroundColor: "{colors.violet-soft}"
    textColor: "{colors.violet-ink}"
  nav-item-active:
    backgroundColor: "{colors.violet-soft}"
    textColor: "{colors.violet-ink}"
    rounded: "{rounded.control}"
    height: "40px"
---

# Design System: CHALK

## Overview

**Creative North Star: "El campus en neblina"**

Una app de campus tranquila: lavanda neblina de fondo, tarjetas blancas que flotan sobre una sombra violeta difusa, y números grandes que se leen de un vistazo. Cada docente es una tarjeta de métrica (nota, dificultad, "lo volvería a llevar"), no una fila de resultados. La interacción es violeta; el rojo UTP queda reservado a la marca y a la acción de reseñar. Densidad media, mucho aire, ningún borde duro.

El shell son tres columnas: navegación a la izquierda, contenido al centro, contexto a la derecha. El contexto (ilustración y "Mejor calificados") lo monta cada página en un portal; si la página no aporta contexto, la columna desaparece y el contenido ocupa el ancho completo. En móvil todo colapsa a una barra superior con cajón.

Rechazos confirmados por la build: la lista plana con chips como pantalla de resultados, el negro puro y el blanco puro como fondo, las sombras duras.

**Key Characteristics:**
- Lavanda neblina con halo radial violeta arriba a la derecha, fijo al scroll.
- Superficies blancas de 16px de radio con sombra difusa teñida de violeta.
- Una sola familia tipográfica (Geist); la jerarquía sale de tamaño, peso y números tabulares.
- Tema oscuro completo por variables (clase `dark`), mismo reparto de roles.
- Foco y hover elevan la tarjeta 2px en vez de cambiar su color.

## Colors

Paleta restringida: neutros lavanda teñidos hacia el violeta, un acento violeta para todo lo interactivo y un rojo de marca escaso. Todos los neutros son canales RGB en variables CSS (`--bg`, `--surface`, `--muted`, `--line`, `--fg`, `--sub`, `--accent*`) para que el tema oscuro las reasigne sin tocar componentes.

### Primary
- **Violeta de interacción** (#6C5CE7): botón primario, foco, caret, selección, ícono de verificado. En oscuro sube a #9284FF.
- **Violeta tinta** (#5444D0): hover del primario, texto de enlaces, ítem activo del menú y chip activo (legible sobre violeta suave).
- **Violeta suave** (#ECE9FD): fondo del ítem activo, chip activo, hover de botón outline.

### Secondary
- **Rojo UTP** (#C8102E, hover #9E0B23): el cuadro del logo y el botón "Escribir reseña" dentro de cada tarjeta de docente. Nada más.

### Neutral
- **Lavanda neblina** (#F4F3FB): fondo de página. En oscuro, #100E1D.
- **Blanco tarjeta** (#FFFFFF): superficies. En oscuro, #1B182D.
- **Lila lavado** (#EFEDFA): chips, segmentos, hover de ítems, botón outline.
- **Línea lila** (#E3E0F3): bordes de input, divisores, scrollbar.
- **Tinta noche** (#18162B): texto principal.
- **Gris crepúsculo** (#5E5A7A): texto secundario y etiquetas.
- **Halo lila** (#D8D0FF): solo en el degradado radial del fondo, al 55% de opacidad.

### Named Rules
**The Red Is Brand Rule.** El rojo UTP aparece en el logo y en la acción de reseñar. Nunca en estados, errores decorativos ni navegación.
**The Violet Means Touch Rule.** Si es violeta, se puede tocar o está activo. El violeta no decora.
**The Tinted Neutral Rule.** Ningún neutro es gris puro ni #000/#FFF de fondo; todos llevan matiz violeta.
**The Course Dot Rule.** Los cursos y avatares se distinguen con un punto o chip de color tomado de una paleta de seis tonos (violeta, cielo, esmeralda, ámbar, rosa, verde azulado) elegida por hash del nombre; es identidad de curso, no semántica.

## Typography

**Display Font:** Geist (con system-ui, sans-serif)
**Body Font:** Geist
**Label/Mono Font:** Geist; el único mono es `code` en el marco vacío de la ilustración.

**Character:** Geist sola, sin pareja: neutra y técnica, con el `ss01` activo. El carácter viene de los números grandes y tabulares y del tracking ajustado en titulares.

### Hierarchy
- **Display** (700, 30–34px, 1.2): saludo "Hola, {nombre}" en la portada de docentes.
- **Headline** (700, 28px, 1.25): nombre del docente en su perfil.
- **Metric** (700, 28px móvil / 36px desde `sm`, line-height 1, tabulares): cifras de las tres métricas grandes.
- **Section** (700, 20px): encabezados de grupo con filete inferior (cursos).
- **Title** (600, 17px): nombre de docente en tarjeta y de facultad.
- **Body** (400–500, 14px): texto corrido, ítems de menú (500), cursos del sidebar.
- **Label** (600, 12px): etiquetas de campo, títulos de lista del sidebar, chips (500).

### Named Rules
**The Tabular Numbers Rule.** Toda cifra (notas, contadores, porcentajes, años) lleva la clase `num` (tabular-nums). Las cifras son lo más grande de cada tarjeta.
**The One Family Rule.** Una familia, jerarquía por peso y tamaño. Los titulares usan `text-wrap: balance` y tracking −0.02em.

## Layout

Shell de tres columnas dentro de un marco centrado de 1440px máximo. Desde 1280px: sidebar fija de 248px, contenido y columna de contexto de 320px (contenido y contexto comparten un contenedor de 1192px máximo, gap 24px). Entre 1024 y 1279px: la sidebar se reduce a un riel de 84px con solo íconos (etiquetas con `sr-only`, `title` como ayuda) y la lista de cursos se oculta; el contexto cae debajo del contenido. Bajo 1024px: barra superior sticky de 64px con logo, tema y menú; el menú es un cajón izquierdo (hasta 300px, 85vw) con velo `fg/30`, cierre con Escape y al navegar.

Padding de página 16px (24px desde `sm`), 32px arriba en escritorio, 64px abajo. Ritmo base de 4: separaciones de 4, 8, 12, 16, 20, 24. Dentro de tarjeta, 20px (24px desde `sm`). La sidebar lista cursos con punto de color; el contador solo aparece cuando el curso tiene más de un docente. Sin reseñas se escribe "Sin reseñas aún" y "—", nunca un cero inventado.

## Elevation & Depth

Híbrido suave: las superficies blancas se separan del fondo por tono y por una sombra difusa teñida de violeta; no hay bordes en las tarjetas. La profundidad responde al estado, no al reposo.

### Shadow Vocabulary
- **Card** (`0 1px 2px rgb(76 62 160 / .05), 0 10px 28px -12px rgb(76 62 160 / .18)`): tarjetas, buscador, segmento activo.
- **Lift** (`0 2px 4px rgb(76 62 160 / .06), 0 18px 40px -14px rgb(76 62 160 / .28)`): hover y foco de tarjetas `lift`, y el cajón móvil. En oscuro ambas pasan a negro puro con más opacidad.

### Named Rules
**The Focused Card Lifts Rule.** Una tarjeta interactiva sube 2px y pasa a la sombra Lift en hover, en `:focus-visible` y cuando un hijo tiene foco (`:has(:focus-visible)`); con foco añade un anillo de 2px violeta. Con `prefers-reduced-motion` no hay transición ni desplazamiento. Transición: 180ms, `cubic-bezier(0.16, 1, 0.3, 1)`.
**The Diffuse Violet Shadow Rule.** Las sombras son anchas, de offset vertical y matiz violeta. Nunca desplazamientos duros ni sombra negra en claro.

## Shapes

Formas suaves y consistentes: tarjetas 16px (token `card`), controles y botones 12px (`rounded-xl`), buscador grande 16px, ítems de menú 12px, chips y avatares totalmente redondos. El cuadro del logo es de 12px. El marco vacío de la ilustración usa borde discontinuo violeta al 35% sobre violeta suave al 50%. Sin esquinas rectas ni cortes angulares.

## Components

### Buttons
- **Shape:** 12px, alto 40px, texto 14px semibold, padding horizontal 16px.
- **Primary:** violeta de interacción con texto blanco (texto #120F24 en oscuro); hover a violeta tinta.
- **Brand:** rojo UTP con texto blanco; hover rojo profundo. Solo para reseñar. Dentro de la tarjeta de docente baja a 32px de alto, radio 8px.
- **Outline:** lila lavado con texto de tinta; hover violeta suave con texto violeta tinta.
- **Ghost:** transparente; hover lila lavado. Los botones de ícono son de 36px cuadrados.
- **Disabled:** 50% de opacidad, sin eventos.

### Chips
- **Style:** píldora de 32px, fondo lila lavado, texto gris crepúsculo 12px medio.
- **State:** activo en violeta suave con texto violeta tinta. Los chips de curso dentro de tarjeta son píldoras estáticas de 12px.

### Cards / Containers
- **Corner Style:** 16px. **Background:** blanco tarjeta. **Shadow:** Card en reposo, Lift en estado. **Border:** ninguno. **Padding:** 20/24px.
- **Tarjeta de docente:** nombre en 17px semibold con el enlace extendido a toda la tarjeta, rango y verificado, departamento, cursos como chips, y una fila de métricas (nota con estrella ámbar, barra de dificultad, "% lo volvería a llevar") con el botón rojo a la derecha.

### Inputs / Fields
- **Style:** 44px de alto, 12px de radio, borde línea lila, fondo blanco, texto 14px.
- **Focus:** borde violeta y halo de 4px violeta al 15%. Placeholder en gris crepúsculo.
- **Buscador:** 56px de alto, 16px de radio, borde transparente y sombra Card, ícono a la izquierda.

### Navigation
- Ítems de 40px, ícono de 18px + etiqueta 14px medio. Reposo gris crepúsculo; hover lila lavado; activo violeta suave con texto violeta tinta. Docentes está activo en sus subrutas; el resto requiere coincidencia exacta.
- Pie de la sidebar: avatar de iniciales en círculo violeta suave, tema y salir. En el riel se apila en vertical.
- **Segmento:** contenedor lila lavado con opciones de 12px semibold; la activa es blanca con sombra Card.

### Ranura de ilustración (signature)
Columna de contexto con la ilustración propia en `public/arte/hero.png`; si falta, muestra un marco discontinuo con la ruta esperada. No se inventan ilustraciones de personas.

## Do's and Don'ts

### Do:
- **Do** usar variables RGB (`bg-bg`, `bg-surface`, `text-sub`, `bg-accent-soft`) para todo color de superficie y texto, de modo que el tema oscuro funcione sin ramas.
- **Do** poner `num` en cada cifra y dejar las métricas como lo más grande de su tarjeta.
- **Do** elevar tarjetas interactivas con `lift` y mantener el foco visible con el anillo violeta de 2px.
- **Do** mostrar "Sin reseñas aún" y "—" cuando no hay datos reales.
- **Do** mantener objetivos táctiles de al menos 36px (40–44px en controles principales).

### Don't:
- **Don't** usar el rojo UTP para nada fuera del logo y la acción de reseñar.
- **Don't** usar #000 ni #FFF como fondo de página, ni bordes de 1px como separación de tarjetas.
- **Don't** dar sombras duras ni desplazadas; todas son difusas y violetas.
- **Don't** volver a una lista plana de docentes con filas y chips como contenido principal.
- **Don't** añadir una segunda familia tipográfica ni cifras proporcionales en métricas.
- **Don't** rodear una tarjeta con otra tarjeta; la columna de contexto apila tarjetas, no las anida.

## Not canonized

La build usa `text-[11px]` en el historial del perfil y varios `text-[15px]`/`text-[17px]` sueltos; son valores puntuales, no escala. El texto de 11px queda bajo el piso de legibilidad y se registra como defecto de la build, no como regla. El contrato pedía tarjetas de 20px y fondo #F3F2FA; la build usa 16px y #F4F3FB y esos valores mandan.
