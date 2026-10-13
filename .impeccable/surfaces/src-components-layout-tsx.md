---
version: 1
slug: "src-components-layout-tsx"
primary_target: "src/components/Layout.tsx"
related_targets: ["src/pages"]
---

# CHALK app shell (todas las rutas autenticadas)

Mode: Operate. Audiencia: alumnos UTP Lima Norte decidiendo con qué docente llevar un curso.

## Direction contract
THESIS: Un campus app tranquilo de tres columnas (navegación · contenido · contexto) en lavanda neblina, donde cada docente se lee como una tarjeta de métrica grande; rechaza la lista plana de resultados con chips.
OWN-WORLD: Fondo lavanda #F3F2FA con halo radial, superficies blancas r=20 con sombra difusa violeta, violeta #6D5DF5 para interacción, rojo UTP #C8102E solo para marca y CTA de reseñar; números grandes tabulares; sidebar con cursos como lista con punto de color.
STORY: El alumno ve sus cursos a la izquierda, elige uno, ve los docentes como tarjetas de métrica y el panel derecho le muestra contexto (mejor calificado, comparar, ilustración).
FIRST VIEWPORT: Sidebar 248px fija (logo, Docentes/Facultades/Cursos/Comparar/Perfil, lista de cursos con punto de color y contador solo cuando hay más de un docente), centro con buscador + saludo y fila de 3 métricas grandes, derecha 320px con tarjeta de arte (slot de ilustración) y "Mejor calificados". CTA Escribir reseña en rojo dentro de cada tarjeta de docente.
FORM: Pinned by user references (campus community dashboard + soft dashboard + metric cards + Apple compare); seed 4cac2af0 challengers declined; kept from streaming wall: focused card lifts.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
