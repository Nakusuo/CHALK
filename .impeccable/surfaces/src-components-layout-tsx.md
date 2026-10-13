---
version: 1
slug: "src-components-layout-tsx"
primary_target: "src/components/Layout.tsx"
related_targets: ["src/pages"]
---

# CHALK app shell (todas las rutas autenticadas)

Mode: Operate. Audiencia: alumnos UTP Lima Norte decidiendo con qué docente llevar un curso.

## Direction contract
THESIS: Un campus app sobrio de tres columnas (navegación · contenido · contexto) en blanco perla, negro carbón y rojo cereza UTP, donde cada docente se lee como una tarjeta de métrica grande; rechaza la lista plana de resultados con chips.
OWN-WORLD: Fondo Cultured Pearl #F5F4F2, tarjetas blancas r=16 con sombra neutra difusa, texto Noir #1B1717, líneas Cool Gray #DCD7D4, rellenos Cotton #EDEBDD; Cherry #810100 para toda interacción (hover Maroon #630000), logo Dark Ruby #70000E, Creme #C3B79D en detalles; números grandes tabulares; sidebar con cursos como lista con punto de color.
STORY: El alumno ve sus cursos a la izquierda, elige uno, ve los docentes como tarjetas de métrica y el panel derecho le muestra contexto (mejor calificado, comparar, ilustración).
FIRST VIEWPORT: Sidebar 248px fija (logo, Docentes/Facultades/Cursos/Comparar/Perfil, lista de cursos con punto de color y contador solo cuando hay más de un docente), centro con buscador + saludo y fila de 3 métricas grandes, derecha 320px con tarjeta de arte (slot de ilustración) y "Mejor calificados". CTA Escribir reseña en rojo dentro de cada tarjeta de docente.
FORM: Pinned by user references (campus community dashboard + soft dashboard + metric cards + Apple compare); seed 4cac2af0 challengers declined; kept from streaming wall: focused card lifts.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
