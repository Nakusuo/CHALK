---
name: CHALK
description: Cartel editorial en blanco perla, negro noir y rojo cereza UTP para que alumnos de la UTP Lima Norte elijan docente con métricas de reseñas reales.
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
    fontSize: "clamp(2.75rem, 6vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  metric:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  section:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "20-24px"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2.4vw, 1.75rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.03em"
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
  control: "6px"
  card: "8px"
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
    borderColor: "{colors.cool-gray}"
    rounded: "{rounded.card}"
    padding: "24px"
  rule:
    borderTop: "3px solid {colors.noir-black}"
  block-noir:
    backgroundColor: "{colors.noir-black}"
    textColor: "{colors.cotton}"
  block-cherry:
    backgroundColor: "{colors.cherry-red}"
    textColor: "{colors.cotton}"
  button-primary:
    backgroundColor: "{colors.cherry-red}"
    textColor: "{colors.card-white}"
    rounded: "{rounded.control}"
    height: "40px"
    padding: "0 16px"
  button-primary-hover:
    backgroundColor: "{colors.maroon}"
  button-outline:
    borderColor: "{colors.noir-black}"
    textColor: "{colors.noir-black}"
    rounded: "{rounded.control}"
    height: "40px"
  input:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.noir-black}"
    rounded: "{rounded.control}"
    height: "44px"
    padding: "0 14px"
  segment-on:
    backgroundColor: "{colors.noir-black}"
    textColor: "{colors.cultured-pearl}"
  nav-item-active:
    backgroundColor: "{colors.cherry-red}"
    textColor: "{colors.cotton}"
    rounded: "{rounded.control}"
    height: "40px"
---

# Design System: CHALK

## Overview

**Creative North Star: "El marcador del campus"**

Un cartel editorial en blanco perla, negro noir y rojo cereza. Hay bloques sólidos de color (sidebar Noir, hero Cereza, cabecera Noir del docente, panel Cereza de acceso), tipografía de cartel y cifras gruesas de marcador de estadio. La estructura la dan filetes Noir de 3px, no sombras difusas. Los docentes se leen como filas de una lista con filete y un nombre grande, cada una con su nota en cifra gigante a la derecha. Hay un solo sistema de movimiento: entrada escalonada por ruta, barras que crecen y cifras que cuentan.

El shell son tres columnas dentro de un marco centrado de 1440px: navegación, contenido y contexto. El contexto lo monta cada página en un portal; si una página no lo aporta, el contenido ocupa todo el ancho. En móvil todo colapsa a una barra superior con cajón, y los bloques sólidos van a sangre.

**Key Characteristics:**
- Bloques sólidos Noir y Cereza con texto Cotton; el resto es silencioso (blanco perla, bordes Cool Gray).
- Radios cortos: 8px en tarjetas, 6px en controles.
- Filete Noir de 3px sobre cada métrica y cada encabezado de sección.
- Display de cartel con clamp(), peso 800, tracking −0.03em y cifras tabulares.
- Un solo sistema de movimiento, desactivado con `prefers-reduced-motion`.

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

**Character:** Geist sola, a escala de cartel. Los titulares y las cifras usan la clase `display` (800, tracking −0.03em, line-height 0.95). El cuerpo se queda en 14–15px para que siga siendo legible.

### Hierarchy
- **Display** (800, `clamp(2.75rem, 6vw, 5.5rem)`): "¿Con quién llevas el curso?" en el hero de docentes, con "Hola, {nombre}." como línea real encima.
- **Headline** (800, `clamp(2.25rem, 5vw, 4.5rem)`): nombre del docente en su cabecera Noir; título de página (`PageHeader`) a `clamp(2.25rem, 5vw, 4rem)`; titular del panel de acceso.
- **Metric** (800, `clamp(2.5rem, 5vw, 4.5rem)`; `clamp(1.75rem, 7vw, 4.5rem)` en la fila compacta de 3 en móvil): cifras de `Stat`, Comparar y la nota del docente.
- **Section** (800, 20–24px): encabezados de sección bajo filete.
- **Title** (800, `clamp(1.25rem, 2.4vw, 1.75rem)`): nombre del docente en la fila de lista.
- **Body** (400–500, 14px) y **Label** (600, 12px).

### Named Rules
**The Tabular Numbers Rule.** Toda cifra lleva `num` (tabular-nums) y las métricas usan `display`.
**The Poster Scale Rule.** El display escala con clamp(); nunca hay tracking por debajo de −0.03em.

## Layout

El marco mide 1440px como máximo y va centrado. Desde 1280px: sidebar Noir de 248px, contenido y contexto de 320px (máximo 1192px, gap 24px). Entre 1024 y 1279px: riel Noir de 84px con solo íconos, y el contexto cae debajo. Bajo 1024px: barra superior y cajón Noir. El hero Cereza y la cabecera Noir sangran al borde (`-mx-4`/`-mx-6`), y desde `lg` recuperan el radio de 8px. Las métricas van en filas sin tarjeta, separadas por gaps de 24–32px. Sin reseñas se escribe "Sin reseñas aún" y "—".

## Elevation & Depth

Plano y editorial. Las superficies se separan con un borde de 1px Cool Gray, filetes Noir de 3px y bloques sólidos, no con sombras. Solo quedan sombras mínimas: Card (`0 1px 2px` noir 8%) y Lift (`0 10px 24px -12px` noir 30%), para el cajón móvil.

### Named Rules
**The Rule System Rule.** Las métricas (`Stat`), los encabezados de sección y la parte superior de las listas llevan `rule`: filete Noir de 3px. Las filas de lista se separan con un filete inferior de 1px. En Comparar, cada fila lleva un filete Noir de 2px.
**The Cherry Rule Slide Rule.** Al pasar o enfocar una fila (`.row`) o una tarjeta (`.lift`), un filete cereza de 3px entra de izquierda a derecha por arriba (320ms). La tarjeta además sube 2px. Con foco de teclado aparece un contorno cereza de 2px; dentro de un bloque sólido, el contorno es Cotton.

## Motion

Un solo sistema, con ease-out exponencial (`cubic-bezier(0.16, 1, 0.3, 1)`):
- **Entrada por ruta** (`.stagger`): los hijos del contenido suben 14px y aparecen en 560ms, escalonados 60ms (máx. 300ms). El contenedor se monta con `key` de ruta, así que la animación corre una vez por navegación. La columna de contexto entra a 200ms.
- **Barras** (`.grow-x`, `.grow-y`): crecen desde 0 en 900ms.
- **Cifras** (`CountUp`): cuentan desde 0 en 900ms la primera vez que entran en pantalla (IntersectionObserver). El valor real está siempre en `aria-label`.
- **Reducido:** con `prefers-reduced-motion`, o sin IntersectionObserver, todo se muestra en su estado final y sin transiciones.

## Shapes

Tarjetas 8px (`rounded-card`), controles 6px (`rounded-control`), opciones de segmento 4px. Chips de filtro y avatares son redondos; los chips de curso son de 6px. La barra de distribución va redondeada solo arriba (4px).

## Components

### Buttons
- **Primary/Brand:** rojo cereza, texto blanco, hover granate. 40px de alto, 6px de radio.
- **Outline:** borde Noir 80% y texto Noir; hover se invierte (relleno Noir, texto Pearl).
- **On block** (`btn-on-block`): borde Cotton 45% y texto Cotton sobre bloques sólidos; hover blanco al 10%.
- **Ghost:** transparente; hover Cotton.

### Bloques sólidos
- **Sidebar Noir** (#1B1717; #2C2929 en oscuro): ítems Cotton al 75%; el activo es relleno Cereza (#C1272D en oscuro) con texto Cotton/blanco. Los puntos de curso llevan un anillo Cotton al 40%.
- **Hero Cereza** (#810100; #C1272D con texto blanco en oscuro): saludo, display y buscador blanco dentro.
- **Cabecera de docente Noir:** nombre a escala headline en Cotton y un cuadro Cotton de la nota con la cifra en cereza. Debajo: "Escribir reseña" en cereza, y Comparar y Guardar como botones `on block`.
- **Panel de acceso Cereza:** logo, ranura de ilustración (máx. 30vh), titular display, tres puntos y una nota al pie.

### Listas y tarjetas
- **Fila de docente** (`.row`): monograma, nombre grande, departamento y sede, cursos como chips de 6px, una cifra de nota gigante a la derecha, y una fila con reseñas, dificultad, "% lo volvería a llevar" y "Reseñar".
- **Tarjeta** (`.card`): borde de 1px Cool Gray, 8px de radio, sin sombra. Se usa en la columna de contexto, en formularios, en Facultades y Cursos, y en las reseñas.
- **Segmento:** contenedor blanco con borde; la opción activa va en relleno Noir con texto Pearl.

### Comparar (marcador)
Cada lado lleva un selector y un monograma. Debajo, los grupos "Vista rápida" y "Criterios" con filete de 3px, y filas con filete Noir de 2px y cifras de `clamp(2.25rem, 6vw, 4.5rem)`. El ganador va en un bloque Cereza con la cifra en blanco.

### Ranura de ilustración (signature)
Muestra `public/arte/hero.png`; si falta, un marco discontinuo Cool Gray sobre Cotton con la ruta esperada. No se inventan ilustraciones de personas.

## Do's and Don'ts

### Do:
- **Do** usar los bloques sólidos solo donde están definidos (sidebar, hero, cabecera de docente, panel de acceso) y dejar el resto silencioso.
- **Do** poner `num` en cada cifra y `display` en métricas y titulares.
- **Do** separar con filetes (`rule`, `.row`) en vez de sombras.
- **Do** respetar `prefers-reduced-motion` en cada animación nueva.
- **Do** mostrar "Sin reseñas aún" y "—" cuando no hay datos reales.

### Don't:
- **Don't** volver a sombras difusas, radios de 16px o tarjetas que flotan.
- **Don't** usar texto con degradado, vidrio, emoji ni etiquetas eyebrow sobre titulares.
- **Don't** añadir colores fuera de la paleta UTP ni otra familia tipográfica.
- **Don't** animar cada elemento por su cuenta; todo pasa por stagger, grow o CountUp.
- **Don't** rodear una tarjeta con otra tarjeta.

## Not canonized

Hay valores puntuales (`text-[11px]` en el historial, `text-[15px]`), y los badges usan `rounded-md`. La barra de progreso del asistente de reseña conserva su transición de ancho propia.
