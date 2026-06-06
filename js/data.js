/* ============================================================
   CHALK · data.js — Datos semilla y capa de acceso a datos
   Combina datos ficticios con reseñas guardadas en localStorage.
   ============================================================ */

const DB = {

    /* ── Docentes (datos semilla) ─────────────────────────── */
    professors: [
        {
            id: 1,
            name: "Dr. Carlos Mendoza",
            emoji: "👨‍🏫",
            dept: "Facultad de Ingeniería y Arquitectura",
            fac: "ing",
            courses: ["Cálculo I", "Álgebra Lineal", "Matemática Discreta"],
            score: 4.7,
            reviews: 134,
            verified: true,
            experience: "12 años",
            tags: ["Exigente", "Explica bien", "Puntual"],
            criteria: {
                ensenanza: 4.8,
                claridad: 4.6,
                puntualidad: 4.9,
                trato: 4.5,
                practicas: 4.7,
                accesibilidad: 4.3,
            },
        },
        {
            id: 2,
            name: "Mg. Lucía Flores",
            emoji: "👩‍💼",
            dept: "Facultad de Negocios",
            fac: "neg",
            courses: ["Marketing Digital", "Comportamiento del Consumidor"],
            score: 4.5,
            reviews: 87,
            verified: true,
            experience: "8 años",
            tags: ["Dinámica", "Casos reales", "Flexible"],
            criteria: {
                ensenanza: 4.6,
                claridad: 4.5,
                puntualidad: 4.2,
                trato: 4.9,
                practicas: 4.4,
                accesibilidad: 4.7,
            },
        },
        {
            id: 3,
            name: "Dr. Marco Rivera",
            emoji: "⚕️",
            dept: "Facultad de Ciencias de la Salud",
            fac: "salud",
            courses: ["Anatomía I", "Fisiología Humana"],
            score: 4.2,
            reviews: 61,
            verified: false,
            experience: "15 años",
            tags: ["Detallado", "Exigente"],
            criteria: {
                ensenanza: 4.3,
                claridad: 4.0,
                puntualidad: 4.5,
                trato: 4.1,
                practicas: 4.2,
                accesibilidad: 3.9,
            },
        },
        {
            id: 4,
            name: "Mg. Patricia Solís",
            emoji: "⚖️",
            dept: "Facultad de Derecho",
            fac: "derecho",
            courses: ["Derecho Civil", "Derecho Constitucional"],
            score: 4.8,
            reviews: 102,
            verified: true,
            experience: "10 años",
            tags: ["Inspiradora", "Clara", "Accesible"],
            criteria: {
                ensenanza: 4.9,
                claridad: 4.8,
                puntualidad: 4.7,
                trato: 5.0,
                practicas: 4.6,
                accesibilidad: 4.8,
            },
        },
        {
            id: 5,
            name: "Lic. Roberto Huanca",
            emoji: "💻",
            dept: "Facultad de Ingeniería y Arquitectura",
            fac: "ing",
            courses: ["Programación I", "Estructuras de Datos", "Algoritmos"],
            score: 3.9,
            reviews: 45,
            verified: false,
            experience: "5 años",
            tags: ["Técnico", "Directo"],
            criteria: {
                ensenanza: 3.8,
                claridad: 3.7,
                puntualidad: 4.2,
                trato: 3.9,
                practicas: 4.1,
                accesibilidad: 3.6,
            },
        },
        {
            id: 6,
            name: "Dra. Valeria Quispe",
            emoji: "📊",
            dept: "Facultad de Negocios",
            fac: "neg",
            courses: ["Finanzas Corporativas", "Economía Empresarial"],
            score: 4.6,
            reviews: 78,
            verified: true,
            experience: "9 años",
            tags: ["Organizada", "Excelente", "Puntual"],
            criteria: {
                ensenanza: 4.7,
                claridad: 4.6,
                puntualidad: 4.8,
                trato: 4.4,
                practicas: 4.5,
                accesibilidad: 4.3,
            },
        },
    ],

    /* ── Reseñas semilla (de ejemplo) ────────────────────── */
    seedReviews: [
        {
            id: "seed-1",
            profId: 1,
            user: "A. Ramírez",
            initials: "AR",
            date: "Mayo 2025",
            score: 5,
            tags: ["Explica muy bien", "Aprendí mucho"],
            tagType: ["pos", "pos"],
            text: "El Dr. Mendoza es increíble. Tiene una manera única de explicar temas complejos de cálculo con ejemplos muy claros. Sus exámenes son exigentes pero justos.",
            helpful: 42,
            course: "Cálculo I",
        },
        {
            id: "seed-2",
            profId: 1,
            user: "K. Torres",
            initials: "KT",
            date: "Abril 2025",
            score: 4,
            tags: ["Exigente", "Buena metodología"],
            tagType: ["neu", "pos"],
            text: "Muy buen docente, aunque a veces va muy rápido. Recomiendo ir a sus asesorías, ahí es donde realmente conectas con el tema.",
            helpful: 28,
            course: "Álgebra Lineal",
        },
        {
            id: "seed-3",
            profId: 2,
            user: "M. Salcedo",
            initials: "MS",
            date: "Mayo 2025",
            score: 5,
            tags: ["Casos reales", "Muy cercana"],
            tagType: ["pos", "pos"],
            text: "La Mg. Flores conecta perfectamente la teoría con casos de empresas peruanas reales. Sus clases son dinámicas y motivadoras. ¡La mejor de la facultad!",
            helpful: 55,
            course: "Marketing Digital",
        },
        {
            id: "seed-4",
            profId: 4,
            user: "J. Vargas",
            initials: "JV",
            date: "Junio 2025",
            score: 5,
            tags: ["Inspiradora", "Justa en notas"],
            tagType: ["pos", "pos"],
            text: "La Dra. Solís es definitivamente la mejor docente que he tenido en la UTP. Su pasión por el Derecho se transmite en cada clase. Muy recomendada.",
            helpful: 71,
            course: "Derecho Constitucional",
        },
        {
            id: "seed-5",
            profId: 5,
            user: "C. Mamani",
            initials: "CM",
            date: "Abril 2025",
            score: 3,
            tags: ["Poco claro", "Difícil de entender"],
            tagType: ["neg", "neg"],
            text: "El contenido es importante pero la forma de explicar deja mucho que desear. A veces se pierde en detalles técnicos sin conectarlos con la práctica.",
            helpful: 19,
            course: "Programación I",
        },
    ],

    /* ── Categorías de tags por tipo ──────────────────────── */
    tagCategories: {
        positivos: ["Explica muy bien", "Dinámico/a", "Justo/a en notas", "Puntual", "Accesible", "Motiva al estudio", "Buenos ejemplos", "Práctico/a"],
        neutros: ["Exigente", "Teórico/a", "Va al ritmo del sílabo", "Tareas frecuentes"],
        negativos: ["Poco claro/a", "Impuntual", "Difícil de contactar", "Notas subjetivas"],
    },

    /* ── Facultades ──────────────────────────────────────── */
    faculties: [
        { id: "ing",     name: "Ingeniería y Arquitectura", count: 2 },
        { id: "neg",     name: "Negocios",                  count: 2 },
        { id: "salud",   name: "Ciencias de la Salud",      count: 1 },
        { id: "derecho", name: "Derecho",                    count: 1 },
    ],

    /* ── Etiquetas de criterios ──────────────────────────── */
    criteriaLabels: {
        ensenanza:     "Enseñanza",
        claridad:      "Claridad",
        puntualidad:   "Puntualidad",
        trato:         "Trato",
        practicas:     "Prácticas",
        accesibilidad: "Accesibilidad",
    },

    /* ══════════════════════════════════════════════════════
       MÉTODOS DE ACCESO A DATOS
       ══════════════════════════════════════════════════════ */

    /**
     * Busca un docente por su ID.
     * @param {number} id
     * @returns {Object|undefined}
     */
    getProfessor(id) {
        return this.professors.find(p => p.id === id);
    },

    /**
     * Devuelve TODAS las reseñas (semilla + guardadas localmente).
     * @returns {Array}
     */
    getAllReviews() {
        return [...this.seedReviews, ...store.getReviews()];
    },

    /**
     * Devuelve las reseñas de un docente específico.
     * @param {number} profId
     * @returns {Array}
     */
    getReviewsForProf(profId) {
        return this.getAllReviews().filter(r => r.profId === profId);
    },

    /**
     * Calcula el puntaje actualizado de un docente.
     * Combina el promedio semilla con las reseñas del usuario.
     * @param {number} profId
     * @returns {number}
     */
    getProfScore(profId) {
        const prof = this.getProfessor(profId);
        if (!prof) return 0;

        const userReviews = store.getReviews().filter(r => r.profId === profId);
        if (userReviews.length === 0) return prof.score;

        // Ponderar: promedio semilla (basado en N reseñas) + reseñas nuevas
        const seedTotal = prof.score * prof.reviews;
        const userTotal = userReviews.reduce((sum, r) => sum + r.score, 0);
        return (seedTotal + userTotal) / (prof.reviews + userReviews.length);
    },

    /**
     * Devuelve el conteo total de reseñas de un docente.
     * @param {number} profId
     * @returns {number}
     */
    getProfReviewCount(profId) {
        const prof = this.getProfessor(profId);
        if (!prof) return 0;
        const userCount = store.getReviews().filter(r => r.profId === profId).length;
        return prof.reviews + userCount;
    },

    /**
     * Genera HTML de estrellas a partir de un puntaje.
     * @param {number} score
     * @returns {string}
     */
    starsHtml(score) {
        const full  = Math.floor(score);
        const half  = (score - full) >= 0.4 ? 1 : 0;
        const empty = 5 - full - half;
        return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
    },
};
