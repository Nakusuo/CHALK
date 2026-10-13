---
name: CHALK
description: Campus app tranquilo en blanco perla, negro y rojo cereza UTP para que alumnos de la UTP Lima Norte elijan docente con métricas de reseñas reales.
colors:
  cultured-pearl: "#F5F4F2"
  card-white: "#FFFFFF"
  cotton: "#EDEBDD"
  cool-gray: "#DCD7D4"
  noir-black: "#1B1717"
  warm-gray: "#5E5856"
  meteorite: "#2C2929"
  cherry-red: "#810100"
  maroon: "#630000"
  cherry-soft: "#F3E6E4"
  dark-ruby: "#70000E"
  creme: "#C3B79D"
  night-bg: "#0E0C0C"
  night-surface: "#1B1717"
  night-raised: "#2C2929"
  night-red: "#C1272D"
  night-red-ink: "#FF8A80"
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
    backgroundColor: "{colors.cherry-red}"
    textColor: "{colors.card-white}"
    rounded: "{rounded.control}"
    height: "40px"
    padding: "0 16px"
  button-primary-hover:
    backgroundColor: "{colors.maroon}"
  button-brand:
    backgroundColor: "{colors.cherry-red}"
    textColor: "{colors.card-white}"
    rounded: "{rounded.control}"
    height: "40px"
  button-brand-hover:
    backgroundColor: "{colors.maroon}"
  button-outline:
    backgroundColor: "{colors.cotton}"
    textColor: "{colors.noir-black}"
    rounded: "{rounded.control}"
    height: "40px"
  input:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.noir-black}"
    rounded: "{rounded.control}"
    height: "44px"
    padding: "0 14px"
  chip:
    backgroundColor: "{colors.cotton}"
    textColor: "{colors.warm-gray}"
    rounded: "{rounded.chip}"
    height: "32px"
  chip-on:
    backgroundColor: "{colors.cherry-soft}"
    textColor: "{colors.maroon}"
  nav-item-active:
    backgroundColor: "{colors.cherry-soft}"
    textColor: "{colors.maroon}"
    rounded: "{rounded.control}"
    height: "40px"
---

# Design System: CHALK

## Overview

**Creative North Star: "El campus en blanco, negro y cereza"**

Una app de campus tranquila: fondo blanco perla, tarjetas blancas que flotan sobre una sombra neutra difusa, y números grandes que se leen de un vistazo. Cada docente es una tarjeta de métrica (nota, dificultad, "lo volvería a llevar"), no una fila de resultados. Toda la interacción es rojo cereza; el negro noir es el segundo color fuerte. Densidad media, mucho aire, ningún borde duro.

El shell son tres columnas: navegación a la izquierda, contenido al centro, contexto a la derecha. El contexto (ilustración y "Mejor calificados") lo monta cada página en un portal; si la página no aporta contexto, la columna desaparece y el contenido ocupa el ancho completo. En móvil todo colapsa a una barra superior con cajón.

Rechazos confirmados por la build: la lista plana con chips como pantalla de resultados, el negro puro y el blanco puro como fondo, las sombras duras.

**Key Characteristics:**
- Fondo blanco perla liso, sin halo.
- Superficies blancas de 16px de radio con sombra difusa neutra.
- Una sola familia tipográfica (Geist); la jerarquía sale de tamaño, peso y números tabulares.
- Tema oscuro completo por variables (clase `dark`), mismo reparto de roles.
- Foco y hover elevan la tarjeta 2px en vez de cambiar su color.

## Colors

Paleta UTP: rojo cereza, blanco y negro sobre neutros cálidos. Un solo acento (cereza) para todo lo interactivo, negro noir como segundo color fuerte y crema como detalle cálido escaso. Todos los colores son canales RGB en variables CSS (`--bg`, `--surface`, `--muted`, `--line`, `--fg`, `--sub`, `--accent`, `--accent-ink`, `--accent-hover`, `--accent-soft`) para que el tema oscuro los reasigne sin tocar componentes.

### Primary
- **Rojo cereza** (#810100): botones primarios (Entrar, Continuar, Escribir reseña, Reseñar), foco, caret, selección, enlaces, ítem activo del menú, segmentos activos, barras de métrica y criterios, barra máxima de la distribución, ganador en Comparar. En oscuro el relleno sube a #C1272D y el texto de acento a #FF8A80, para cumplir AA sobre #1B1717.
- **Granate** (#630000): hover y estado presionado del primario (#A31F24 en oscuro).
- **Cereza suave** (#F3E6E4): fondo del ítem activo, chips activos y ganador en Comparar (#3C1616 en oscuro).

### Secondary
- **Rubí oscuro** (#70000E): cuadro del logo, con la letra en blanco.
- **Crema** (#C3B79D): detalle cálido escaso; insignia "Top" y un tono de punto de curso.

### Neutral
- **Cultured Pearl** (#F5F4F2): fondo de página, sin halo. En oscuro, #0E0C0C.
- **Blanco tarjeta** (#FFFFFF): superficies. En oscuro, #1B1717.
- **Cotton** (#EDEBDD): rellenos neutros (chips, segmentos, botón secundario, marco de la ilustración). En oscuro, #2C2929.
- **Cool Gray** (#DCD7D4): bordes de input, divisores, scrollbar. En oscuro, #3A3535.
- **Noir** (#1B1717): texto principal. En oscuro, el texto pasa a Cotton #EDEBDD.
- **Gris cálido** (#5E5856): texto secundario y etiquetas (AA sobre Pearl y Cotton). En oscuro, #A9A19E.

### Named Rules
**The Red Means Touch Rule.** Si es rojo cereza, se puede tocar o está activo. El rojo no decora.
**The Ruby Is Brand Rule.** El rubí oscuro #70000E solo aparece en el cuadro del logo; el rojo UTP #C8102E ya no se usa en la interfaz.
**The Warm Neutral Rule.** Los neutros son cálidos (Pearl, Cotton, Cool Gray, Noir); nada de lavanda, violeta ni grises azulados.
**The Course Dot Rule.** Cursos y monogramas toman uno de seis tonos (cereza, granate, noir, crema, cool gray, meteorito) por hash del nombre: fondos claros con texto oscuro en claro y #2C2929 con texto tintado en oscuro. Es identidad, no semántica.

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

Híbrido suave: las superficies blancas se separan del fondo por tono y por una sombra difusa neutra; no hay bordes en las tarjetas. La profundidad responde al estado, no al reposo.

### Shadow Vocabulary
- **Card** (`0 1px 2px rgb(76 62 160 / .05), 0 10px 28px -12px rgb(76 62 160 / .18)`): tarjetas, buscador, segmento activo.
- **Lift** (`0 2px 4px rgb(76 62 160 / .06), 0 18px 40px -14px rgb(76 62 160 / .28)`): hover y foco de tarjetas `lift`, y el cajón móvil. En oscuro ambas pasan a negro puro con más opacidad.

### Named Rules
**The Focused Card Lifts Rule.** Una tarjeta interactiva sube 2px y pasa a la sombra Lift en hover, en `:focus-visible` y cuando un hijo tiene foco (`:has(:focus-visible)`); con foco añade un anillo de 2px rojo cereza. Con `prefers-reduced-motion` no hay transición ni desplazamiento. Transición: 180ms, `cubic-bezier(0.16, 1, 0.3, 1)`.
**The Diffuse Neutral Shadow Rule.** Las sombras son anchas, de offset vertical y en noir a baja opacidad. Nunca desplazamientos duros.

## Shapes

Formas suaves y consistentes: tarjetas 16px (token `card`), controles y botones 12px (`rounded-xl`), buscador grande 16px, ítems de menú 12px, chips y avatares totalmente redondos. El cuadro del logo es de 12px. El marco vacío de la ilustración usa borde discontinuo Cool Gray sobre Cotton. Sin esquinas rectas ni cortes angulares.

## Components

### Buttons
- **Shape:** 12px, alto 40px, texto 14px semibold, padding horizontal 16px.
- **Primary:** rojo cereza con texto blanco; hover granate.
- **Brand (reseñar):** mismo rojo cereza que el primario, con texto blanco y hover granate. Dentro de la tarjeta de docente baja a 32px de alto, radio 8px.
- **Outline:** relleno Cotton con texto noir; hover Cool Gray.
- **Ghost:** transparente; hover Cotton. Los botones de ícono son de 36px cuadrados.
- **Disabled:** 50% de opacidad, sin eventos.

### Chips
- **Style:** píldora de 32px, fondo Cotton, texto gris cálido 12px medio.
- **State:** activo en cereza suave con texto cereza. Los chips de curso dentro de tarjeta son píldoras estáticas de 12px.

### Cards / Containers
- **Corner Style:** 16px. **Background:** blanco tarjeta. **Shadow:** Card en reposo, Lift en estado. **Border:** ninguno. **Padding:** 20/24px.
- **Tarjeta de docente:** nombre en 17px semibold con el enlace extendido a toda la tarjeta, rango y verificado, departamento, cursos como chips, y una fila de métricas (nota con estrella ámbar, barra de dificultad, "% lo volvería a llevar") con el botón rojo a la derecha.

### Inputs / Fields
- **Style:** 44px de alto, 12px de radio, borde Cool Gray, fondo blanco, texto 14px.
- **Focus:** borde cereza y halo de 4px cereza al 15%. Placeholder en gris cálido.
- **Buscador:** 56px de alto, 16px de radio, borde transparente y sombra Card, ícono a la izquierda.

### Navigation
- Ítems de 40px, ícono de 18px + etiqueta 14px medio. Reposo gris cálido; hover Cotton; activo cereza suave con texto cereza. Docentes está activo en sus subrutas; el resto requiere coincidencia exacta.
- Pie de la sidebar: avatar de iniciales en círculo cereza suave, tema y salir. En el riel se apila en vertical.
- **Segmento:** contenedor Cotton con opciones de 12px semibold; la activa es blanca con sombra Card.

### Ranura de ilustración (signature)
Columna de contexto con la ilustración propia en `public/arte/hero.png`; si falta, muestra un marco discontinuo con la ruta esperada. No se inventan ilustraciones de personas.

## Do's and Don'ts

### Do:
- **Do** usar variables RGB (`bg-bg`, `bg-surface`, `text-sub`, `bg-accent-soft`) para todo color de superficie y texto, de modo que el tema oscuro funcione sin ramas.
- **Do** poner `num` en cada cifra y dejar las métricas como lo más grande de su tarjeta.
- **Do** elevar tarjetas interactivas con `lift` y mantener el foco visible con el anillo cereza de 2px.
- **Do** mostrar "Sin reseñas aún" y "—" cuando no hay datos reales.
- **Do** mantener objetivos táctiles de al menos 36px (40–44px en controles principales).

### Don't:
- **Don't** usar rojo cereza para decorar, ni volver a la lavanda o al violeta.
- **Don't** usar #000 ni #FFF como fondo de página, ni bordes de 1px como separación de tarjetas.
- **Don't** dar sombras duras ni desplazadas; todas son difusas y neutras.
- **Don't** volver a una lista plana de docentes con filas y chips como contenido principal.
- **Don't** añadir una segunda familia tipográfica ni cifras proporcionales en métricas.
- **Don't** rodear una tarjeta con otra tarjeta; la columna de contexto apila tarjetas, no las anida.

## Not canonized

La build usa `text-[11px]` en el historial del perfil y varios `text-[15px]`/`text-[17px]` sueltos; son valores puntuales, no escala. El texto de 11px queda bajo el piso de legibilidad y se registra como defecto de la build, no como regla. El contrato pedía tarjetas de 20px; la build usa 16px y ese valor manda. La paleta lavanda/violeta original se sustituyó por la paleta UTP del usuario.
