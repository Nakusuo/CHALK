<p align="center">
  <a href="https://github.com/Nakusuo"><img src="https://raw.githubusercontent.com/Nakusuo/Nakusuo/main/assets/covers/CHALK.svg" width="100%" alt="CHALK — Nakusu"/></a>
</p>

# CHALK

CHALK es una comunidad docente para estudiantes de la UTP: un sitio donde puedes buscar profesores por facultad, sede o curso, ver cómo los califican otros alumnos y dejar tu propia reseña antes de matricularte. La idea nació de algo muy simple: todos preguntamos "¿qué tal es este profe?" antes de elegir horario, y quería tener esas respuestas en un solo lugar.

Lo hice como proyecto de la universidad mientras estudio Ingeniería de Software. Es un sitio multipágina hecho solo con HTML, CSS y JavaScript, sin frameworks ni backend.

![Pantalla de inicio de sesión](docs/capturas/login.png)

## Cómo se ve

**Lista de docentes.** Estadísticas generales, ranking de los mejores calificados, buscador, filtros por etiqueta y sede, y orden por calificación, reseñas, dificultad o recomendación.

![Lista de docentes](docs/capturas/docentes.png)

**Perfil de un docente.** Nota general, porcentaje que lo volvería a llevar, dificultad, aprobación, criterios de evaluación y distribución de calificaciones.

![Perfil de docente](docs/capturas/perfil-docente.png)

**Facultades y sedes.** Cada facultad con su número de docentes, promedio y cursos, más filtros por sede.

![Facultades y sedes](docs/capturas/facultades.png)

**Escribir una reseña.** Un formulario en 5 pasos: primero calificas los criterios con estrellas y luego vas completando el resto.

![Formulario de reseña](docs/capturas/resena.png)

## Qué puedes hacer

- Iniciar sesión o registrarte con tu correo institucional (`U...@utp.edu.pe`); el código de estudiante se valida con expresiones regulares.
- Explorar 20 docentes con datos de ejemplo, repartidos en facultades, sedes y carreras de la UTP.
- Buscar y filtrar docentes por nombre, curso, facultad, sede o etiquetas (Exigente, Explica bien, Puntual...).
- Ver el perfil completo de cada docente con métricas, gráficos animados y las reseñas de otros alumnos, y marcar reseñas como útiles.
- Escribir una reseña paso a paso: criterios con estrellas, dificultad, carga de trabajo, si lo volverías a llevar, etiquetas y comentario, con vista previa antes de enviar.
- Explorar cursos, comparar dos docentes lado a lado y revisar tu perfil.

Todo se guarda en el `localStorage` del navegador (sesión, reseñas y votos de "útil"), así que no necesita servidor ni base de datos.

## Tecnologías

- HTML5 (una página por sección: `index`, `register`, `home`, `professor`, `review`, `facultades`, `cursos`, `compare`, `profile`)
- CSS3 con variables y una hoja por página (`css/`)
- JavaScript vanilla organizado en módulos (`js/auth.js`, `js/storage.js`, `js/data.js`, `js/components.js`, etc.)
- `localStorage` como capa de persistencia

## Cómo correrlo

No hay que instalar nada. Clona el repo y sirve la carpeta con cualquier servidor estático, por ejemplo:

```bash
git clone https://github.com/Nakusuo/CHALK.git
cd CHALK
npx http-server -p 8080
```

Abre `http://localhost:8080` y entra con cualquier correo del tipo `U20240001@utp.edu.pe` y una contraseña cualquiera. También puedes abrir `index.html` directamente en el navegador.
