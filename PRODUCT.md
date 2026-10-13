# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Alumnos de la UTP sede Lima Norte (principalmente Ingeniería de Sistemas / Software) que, antes de matricularse o elegir horario, quieren saber "¿qué tal es este profe?". Llegan desde el celular o la laptop, comparan docentes de un mismo curso y, al terminar el ciclo, dejan su reseña.

## Product Purpose
Reunir en un solo lugar las opiniones de alumnos sobre los docentes de la UTP Lima Norte: buscar por curso o facultad, ver métricas calculadas a partir de reseñas reales, comparar dos docentes y escribir una reseña guiada. Éxito: un alumno decide con quién llevar un curso en minutos y deja su reseña al final del ciclo.

## Positioning
Hecho por y para alumnos de la UTP: docentes y cursos reales de Lima Norte, sin notas inventadas. Toda métrica sale de reseñas de alumnos; si no hay reseñas, se dice "Sin reseñas aún".

## Operating Context
Época de matrícula y fin de ciclo. Correo institucional `U########@utp.edu.pe`. Ciclos tipo 2025-I. Cursos presenciales y virtuales 24/7 (UTP+ Class).

## Capabilities and Constraints
- Sitio estático (Vite + React + TS + Tailwind, HashRouter) publicado en GitHub Pages.
- Persistencia solo en `localStorage` (claves `chalk_user`, `chalk_reviews`, `chalk_helpful`, `chalk_favorites`, `chalk_theme`); las reseñas no se comparten entre alumnos todavía (backend pendiente).
- Funciones: login/registro con correo UTP, lista de docentes con filtros, perfil de docente, reseña en 5 pasos (6 criterios, dificultad, carga, ¿lo volverías a llevar?, etiquetas, comentario), editar/borrar con deshacer, guardados, facultades, cursos, comparar dos docentes, perfil del alumno, tema claro/oscuro.
- 22 docentes reales de Lima Norte en `src/data/seed.ts`.

## Brand Commitments
- Nombre: CHALK. Idioma: español peruano, tuteo, tono cercano de compañero.
- Rojo UTP `#C8102E` como color de marca.
- Espacio para una ilustración propia (arte que el usuario aportará); no inventar ilustraciones de personas reales.

## Evidence on Hand
- Lista real de docentes y cursos (seed.ts). No hay reseñas semilla: no fabricar reseñas, testimonios ni números de uso.

## Product Principles
1. Nunca mostrar una métrica que no venga de reseñas reales.
2. Decidir rápido: lo importante (nota, dificultad, ¿lo volvería a llevar?) se lee de un vistazo.
3. Escribir una reseña tiene que ser fácil y anónimo-amable.
4. Funciona igual de bien en el celular que en la laptop.

## Accessibility & Inclusion
Contraste AA en ambos temas, navegación con teclado, textos en español claro.
