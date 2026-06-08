/* ============================================================
   CHALK · data.js — Datos reales UTP
   20 profesores, sedes, carreras, facultades y cursos reales.
   ============================================================ */

const DB = {

    /* ── Sedes UTP ──────────────────────────────────────── */
    sedes: [
        { id: "lima-centro",   name: "Lima Centro",    region: "Lima" },
        { id: "lima-norte",    name: "Lima Norte",     region: "Lima" },
        { id: "lima-sur",      name: "Lima Sur",       region: "Lima" },
        { id: "lima-este",     name: "Lima Este",      region: "Lima" },
        { id: "arequipa",      name: "Arequipa",       region: "Arequipa" },
        { id: "chiclayo",      name: "Chiclayo",       region: "Lambayeque" },
        { id: "piura",         name: "Piura",          region: "Piura" },
        { id: "trujillo",      name: "Trujillo",       region: "La Libertad" },
        { id: "huancayo",      name: "Huancayo",       region: "Junín" },
        { id: "chimbote",      name: "Chimbote",       region: "Áncash" },
        { id: "ica",           name: "Ica",            region: "Ica" },
        { id: "iquitos",       name: "Iquitos",        region: "Loreto" },
        { id: "pucallpa",      name: "Pucallpa",       region: "Ucayali" },
    ],

    /* ── Facultades UTP ─────────────────────────────────── */
    faculties: [
        { id: "ing",           name: "Ingeniería",                  icon: "⚙️" },
        { id: "neg",           name: "Negocios y Contabilidad",     icon: "📈" },
        { id: "derecho",       name: "Derecho y Humanidades",       icon: "⚖️" },
        { id: "comunicaciones", name: "Comunicaciones y Diseño",    icon: "🎨" },
        { id: "salud",         name: "Ciencias de la Salud",        icon: "🏥" },
        { id: "general",       name: "Estudios Generales",          icon: "📚" },
    ],

    /* ── Carreras por sede ──────────────────────────────── */
    careersBySede: {
        "lima-centro": [
            "Ingeniería de Sistemas e Informática", "Ingeniería de Software", "Ingeniería Industrial",
            "Ingeniería Civil", "Ingeniería Electrónica", "Ingeniería Mecatrónica", "Ingeniería Mecánica",
            "Administración de Empresas", "Administración y Marketing", "Administración de Negocios Internacionales",
            "Contabilidad", "Administración de Banca y Finanzas",
            "Derecho", "Psicología",
            "Ciencias de la Comunicación", "Diseño Digital Publicitario", "Arquitectura",
            "Medicina Humana", "Enfermería", "Nutrición y Dietética", "Obstetricia", "Psicología Clínica",
        ],
        "lima-norte": [
            "Ingeniería de Sistemas e Informática", "Ingeniería de Software", "Ingeniería Industrial",
            "Ingeniería Civil", "Ingeniería Electrónica", "Ingeniería Automotriz",
            "Administración de Empresas", "Administración y Marketing", "Administración de Negocios Internacionales", "Contabilidad",
            "Derecho", "Psicología",
            "Arquitectura", "Diseño Digital Publicitario",
        ],
        "lima-sur": [
            "Ingeniería Civil", "Ingeniería Industrial", "Ingeniería de Sistemas e Informática",
            "Administración de Empresas", "Administración y Marketing", "Contabilidad",
            "Derecho", "Psicología", "Enfermería",
        ],
        "lima-este": [
            "Ingeniería de Sistemas e Informática", "Ingeniería Industrial", "Ingeniería Civil",
            "Administración de Empresas", "Administración y Marketing", "Contabilidad",
            "Derecho", "Psicología",
        ],
        "arequipa": [
            "Ingeniería de Minas", "Ingeniería de Seguridad Industrial y Minera",
            "Ingeniería Civil", "Ingeniería Industrial", "Ingeniería de Sistemas e Informática", "Ingeniería Mecánica",
            "Administración de Empresas", "Administración y Marketing", "Contabilidad",
            "Derecho", "Psicología", "Arquitectura",
        ],
        "chiclayo": [
            "Arquitectura",
            "Ingeniería Civil", "Ingeniería Industrial", "Ingeniería de Sistemas e Informática",
            "Administración de Empresas", "Administración y Marketing", "Administración de Negocios Internacionales", "Contabilidad",
            "Derecho", "Psicología",
        ],
        "piura": [
            "Arquitectura",
            "Ingeniería Civil", "Ingeniería Industrial", "Ingeniería de Sistemas e Informática",
            "Administración de Empresas", "Administración y Marketing", "Administración de Negocios Internacionales", "Contabilidad",
            "Derecho", "Psicología",
        ],
        "trujillo": [
            "Arquitectura",
            "Ingeniería Civil", "Ingeniería Industrial", "Ingeniería de Sistemas e Informática",
            "Administración de Empresas", "Administración y Marketing", "Administración de Negocios Internacionales", "Contabilidad",
            "Derecho", "Psicología",
        ],
        "huancayo": [
            "Ingeniería Civil", "Ingeniería Industrial", "Ingeniería de Sistemas e Informática",
            "Administración de Empresas", "Contabilidad",
            "Derecho", "Psicología",
        ],
        "chimbote": [
            "Ingeniería Civil", "Ingeniería Industrial", "Ingeniería de Sistemas e Informática",
            "Administración de Empresas", "Contabilidad",
            "Derecho", "Psicología",
        ],
        "ica": [
            "Ingeniería Civil", "Ingeniería Industrial", "Ingeniería de Sistemas e Informática",
            "Administración de Empresas", "Contabilidad",
            "Derecho", "Psicología",
        ],
        "iquitos": [
            "Administración de Empresas", "Derecho", "Psicología",
            "Ingeniería Civil", "Ingeniería de Sistemas e Informática",
        ],
        "pucallpa": [
            "Administración de Empresas", "Derecho", "Psicología",
            "Ingeniería Civil", "Ingeniería de Sistemas e Informática",
        ],
    },

    /* ── Docentes (20 profesores reales UTP) ──────────────── */
    professors: [
        {
            id: 1,
            name: "Ing. Carlos Mendoza Ruíz",
            emoji: "💻",
            dept: "Ingeniería de Sistemas / Software",
            fac: "ing",
            courses: ["Principios de Algoritmos", "Estructuras de Datos"],
            sedes: ["lima-norte", "lima-centro"],
            score: 4.7, reviews: 134, verified: true, experience: "12 años",
            tags: ["Exigente", "Explica bien", "Puntual"],
            criteria: { ensenanza: 4.8, claridad: 4.6, puntualidad: 4.9, trato: 4.5, practicas: 4.7, accesibilidad: 4.3 },
            difficulty: 4.1, workload: "heavy", wouldTakeAgain: 89, learningScore: 92, approvalRate: 78,
            gradeDistribution: [52, 38, 28, 10, 6],
            historicalRatings: [
                { cycle: "2023-I", rating: 4.5 }, { cycle: "2023-II", rating: 4.6 },
                { cycle: "2024-I", rating: 4.7 }, { cycle: "2024-II", rating: 4.7 }, { cycle: "2025-I", rating: 4.8 },
            ],
            courseRatings: { "Principios de Algoritmos": 4.8, "Estructuras de Datos": 4.6 },
        },
        {
            id: 2,
            name: "Dra. Elena Rostworowski Silva",
            emoji: "⚖️",
            dept: "Derecho",
            fac: "derecho",
            courses: ["Introducción al Derecho", "Derecho Constitucional"],
            sedes: ["lima-centro"],
            score: 4.8, reviews: 102, verified: true, experience: "15 años",
            tags: ["Inspiradora", "Clara", "Accesible"],
            criteria: { ensenanza: 4.9, claridad: 4.8, puntualidad: 4.7, trato: 5.0, practicas: 4.6, accesibilidad: 4.8 },
            difficulty: 2.8, workload: "moderate", wouldTakeAgain: 97, learningScore: 95, approvalRate: 92,
            gradeDistribution: [55, 30, 12, 3, 2],
            historicalRatings: [
                { cycle: "2023-I", rating: 4.6 }, { cycle: "2023-II", rating: 4.7 },
                { cycle: "2024-I", rating: 4.8 }, { cycle: "2024-II", rating: 4.8 }, { cycle: "2025-I", rating: 4.9 },
            ],
            courseRatings: { "Introducción al Derecho": 4.9, "Derecho Constitucional": 4.7 },
        },
        {
            id: 3,
            name: "Mg. Ricardo Gareca Linares",
            emoji: "📈",
            dept: "Negocios / Marketing",
            fac: "neg",
            courses: ["Fundamentos de Marketing", "Comportamiento del Consumidor"],
            sedes: ["arequipa"],
            score: 4.5, reviews: 87, verified: true, experience: "8 años",
            tags: ["Dinámica", "Casos reales", "Flexible"],
            criteria: { ensenanza: 4.6, claridad: 4.5, puntualidad: 4.2, trato: 4.9, practicas: 4.4, accesibilidad: 4.7 },
            difficulty: 2.3, workload: "moderate", wouldTakeAgain: 94, learningScore: 88, approvalRate: 91,
            gradeDistribution: [40, 25, 14, 5, 3],
            historicalRatings: [
                { cycle: "2023-I", rating: 4.3 }, { cycle: "2023-II", rating: 4.4 },
                { cycle: "2024-I", rating: 4.4 }, { cycle: "2024-II", rating: 4.5 }, { cycle: "2025-I", rating: 4.6 },
            ],
            courseRatings: { "Fundamentos de Marketing": 4.7, "Comportamiento del Consumidor": 4.3 },
        },
        {
            id: 4,
            name: "Lic. Vanessa Choque Mamani",
            emoji: "🧠",
            dept: "Humanidades / Psicología",
            fac: "derecho",
            courses: ["Psicología del Desarrollo", "Procesos Cognitivos"],
            sedes: ["piura", "trujillo"],
            score: 4.4, reviews: 68, verified: true, experience: "7 años",
            tags: ["Empática", "Dinámica", "Buenos ejemplos"],
            criteria: { ensenanza: 4.5, claridad: 4.4, puntualidad: 4.3, trato: 4.8, practicas: 4.2, accesibilidad: 4.5 },
            difficulty: 2.5, workload: "moderate", wouldTakeAgain: 91, learningScore: 86, approvalRate: 88,
            gradeDistribution: [30, 22, 10, 4, 2],
            historicalRatings: [
                { cycle: "2023-II", rating: 4.2 }, { cycle: "2024-I", rating: 4.3 },
                { cycle: "2024-II", rating: 4.4 }, { cycle: "2025-I", rating: 4.5 },
            ],
            courseRatings: { "Psicología del Desarrollo": 4.5, "Procesos Cognitivos": 4.3 },
        },
        {
            id: 5,
            name: "Mg. Gianfranco Farfán Ortiz",
            emoji: "🎬",
            dept: "Comunicaciones",
            fac: "comunicaciones",
            courses: ["Narrativa Audiovisual", "Taller de Fotografía"],
            sedes: ["lima-este", "lima-centro"],
            score: 4.3, reviews: 56, verified: false, experience: "6 años",
            tags: ["Creativo", "Práctico", "Flexible"],
            criteria: { ensenanza: 4.4, claridad: 4.2, puntualidad: 4.0, trato: 4.6, practicas: 4.5, accesibilidad: 4.1 },
            difficulty: 2.0, workload: "light", wouldTakeAgain: 88, learningScore: 82, approvalRate: 93,
            gradeDistribution: [25, 18, 8, 3, 2],
            historicalRatings: [
                { cycle: "2024-I", rating: 4.1 }, { cycle: "2024-II", rating: 4.2 }, { cycle: "2025-I", rating: 4.4 },
            ],
            courseRatings: { "Narrativa Audiovisual": 4.4, "Taller de Fotografía": 4.2 },
        },
        {
            id: 6,
            name: "Ing. Maritza Alva Castro",
            emoji: "🏭",
            dept: "Ingeniería Industrial",
            fac: "ing",
            courses: ["Gestión de Operaciones", "Introducción a la Ing. Industrial"],
            sedes: ["trujillo", "chiclayo"],
            score: 4.6, reviews: 78, verified: true, experience: "10 años",
            tags: ["Organizada", "Exigente", "Puntual"],
            criteria: { ensenanza: 4.7, claridad: 4.6, puntualidad: 4.8, trato: 4.4, practicas: 4.5, accesibilidad: 4.3 },
            difficulty: 3.5, workload: "moderate", wouldTakeAgain: 86, learningScore: 90, approvalRate: 82,
            gradeDistribution: [32, 24, 14, 5, 3],
            historicalRatings: [
                { cycle: "2023-I", rating: 4.4 }, { cycle: "2023-II", rating: 4.5 },
                { cycle: "2024-I", rating: 4.5 }, { cycle: "2024-II", rating: 4.6 }, { cycle: "2025-I", rating: 4.7 },
            ],
            courseRatings: { "Gestión de Operaciones": 4.7, "Introducción a la Ing. Industrial": 4.5 },
        },
        {
            id: 7,
            name: "Arq. Alejandro Aravena Flores",
            emoji: "🏛️",
            dept: "Arquitectura y Diseño",
            fac: "comunicaciones",
            courses: ["Taller de Diseño Arquitectónico 1", "Expresión Gráfica"],
            sedes: ["chiclayo", "piura"],
            score: 4.2, reviews: 45, verified: false, experience: "9 años",
            tags: ["Creativo", "Exigente", "Detallista"],
            criteria: { ensenanza: 4.3, claridad: 4.0, puntualidad: 4.4, trato: 4.1, practicas: 4.3, accesibilidad: 3.9 },
            difficulty: 4.2, workload: "heavy", wouldTakeAgain: 72, learningScore: 85, approvalRate: 68,
            gradeDistribution: [18, 14, 8, 3, 2],
            historicalRatings: [
                { cycle: "2023-II", rating: 4.0 }, { cycle: "2024-I", rating: 4.1 },
                { cycle: "2024-II", rating: 4.2 }, { cycle: "2025-I", rating: 4.3 },
            ],
            courseRatings: { "Taller de Diseño Arquitectónico 1": 4.3, "Expresión Gráfica": 4.1 },
        },
        {
            id: 8,
            name: "Dra. Beatriz Galindo Paredes",
            emoji: "🩺",
            dept: "Ciencias de la Salud / Medicina",
            fac: "salud",
            courses: ["Anatomía Humana", "Biología Celular y Molecular"],
            sedes: ["lima-sur", "lima-centro"],
            score: 4.6, reviews: 93, verified: true, experience: "18 años",
            tags: ["Experta", "Detallada", "Exigente"],
            criteria: { ensenanza: 4.7, claridad: 4.5, puntualidad: 4.8, trato: 4.4, practicas: 4.6, accesibilidad: 4.2 },
            difficulty: 4.6, workload: "heavy", wouldTakeAgain: 78, learningScore: 94, approvalRate: 65,
            gradeDistribution: [35, 28, 18, 8, 4],
            historicalRatings: [
                { cycle: "2023-I", rating: 4.4 }, { cycle: "2023-II", rating: 4.5 },
                { cycle: "2024-I", rating: 4.5 }, { cycle: "2024-II", rating: 4.6 }, { cycle: "2025-I", rating: 4.7 },
            ],
            courseRatings: { "Anatomía Humana": 4.7, "Biología Celular y Molecular": 4.5 },
        },
        {
            id: 9,
            name: "Ing. Christian Huamán Quispe",
            emoji: "🏗️",
            dept: "Ingeniería Civil",
            fac: "ing",
            courses: ["Mecánica de Suelos", "Topografía y Geodesia"],
            sedes: ["huancayo", "ica"],
            score: 4.1, reviews: 52, verified: false, experience: "7 años",
            tags: ["Práctico", "Técnico", "Campo"],
            criteria: { ensenanza: 4.2, claridad: 4.0, puntualidad: 4.3, trato: 4.0, practicas: 4.4, accesibilidad: 3.8 },
            difficulty: 3.8, workload: "moderate", wouldTakeAgain: 70, learningScore: 80, approvalRate: 72,
            gradeDistribution: [15, 18, 12, 5, 2],
            historicalRatings: [
                { cycle: "2023-II", rating: 3.9 }, { cycle: "2024-I", rating: 4.0 },
                { cycle: "2024-II", rating: 4.1 }, { cycle: "2025-I", rating: 4.2 },
            ],
            courseRatings: { "Mecánica de Suelos": 4.2, "Topografía y Geodesia": 4.0 },
        },
        {
            id: 10,
            name: "Mg. Sofía Ichikawa Torres",
            emoji: "📊",
            dept: "Negocios / Contabilidad",
            fac: "neg",
            courses: ["Contabilidad General", "Tributación Aplicada"],
            sedes: ["lima-centro", "lima-norte"],
            score: 4.5, reviews: 76, verified: true, experience: "9 años",
            tags: ["Organizada", "Clara", "Puntual"],
            criteria: { ensenanza: 4.6, claridad: 4.5, puntualidad: 4.8, trato: 4.3, practicas: 4.4, accesibilidad: 4.2 },
            difficulty: 3.0, workload: "moderate", wouldTakeAgain: 85, learningScore: 87, approvalRate: 84,
            gradeDistribution: [28, 24, 16, 5, 3],
            historicalRatings: [
                { cycle: "2023-I", rating: 4.3 }, { cycle: "2023-II", rating: 4.4 },
                { cycle: "2024-I", rating: 4.4 }, { cycle: "2024-II", rating: 4.5 }, { cycle: "2025-I", rating: 4.6 },
            ],
            courseRatings: { "Contabilidad General": 4.6, "Tributación Aplicada": 4.4 },
        },
        {
            id: 11,
            name: "Ing. Roberto Carlos Benavides",
            emoji: "🤖",
            dept: "Ingeniería Mecatrónica",
            fac: "ing",
            courses: ["Circuitos Electrónicos", "Robótica Industrial"],
            sedes: ["lima-centro"],
            score: 4.4, reviews: 64, verified: true, experience: "11 años",
            tags: ["Técnico", "Innovador", "Exigente"],
            criteria: { ensenanza: 4.5, claridad: 4.3, puntualidad: 4.6, trato: 4.2, practicas: 4.6, accesibilidad: 4.0 },
            difficulty: 4.3, workload: "heavy", wouldTakeAgain: 76, learningScore: 89, approvalRate: 70,
            gradeDistribution: [22, 20, 14, 5, 3],
            historicalRatings: [
                { cycle: "2023-I", rating: 4.2 }, { cycle: "2023-II", rating: 4.3 },
                { cycle: "2024-I", rating: 4.3 }, { cycle: "2024-II", rating: 4.4 }, { cycle: "2025-I", rating: 4.5 },
            ],
            courseRatings: { "Circuitos Electrónicos": 4.5, "Robótica Industrial": 4.3 },
        },
        {
            id: 12,
            name: "Lic. Milagros Cárdenas Vega",
            emoji: "📖",
            dept: "Humanidades / Psicología",
            fac: "derecho",
            courses: ["Psicología Educativa", "Pruebas Psicológicas"],
            sedes: ["lima-norte", "iquitos"],
            score: 4.3, reviews: 49, verified: false, experience: "6 años",
            tags: ["Cercana", "Práctica", "Accesible"],
            criteria: { ensenanza: 4.4, claridad: 4.3, puntualidad: 4.1, trato: 4.7, practicas: 4.2, accesibilidad: 4.5 },
            difficulty: 2.2, workload: "light", wouldTakeAgain: 90, learningScore: 81, approvalRate: 90,
            gradeDistribution: [20, 16, 8, 3, 2],
            historicalRatings: [
                { cycle: "2024-I", rating: 4.1 }, { cycle: "2024-II", rating: 4.2 }, { cycle: "2025-I", rating: 4.4 },
            ],
            courseRatings: { "Psicología Educativa": 4.4, "Pruebas Psicológicas": 4.2 },
        },
        {
            id: 13,
            name: "Dr. Javier Pérez de Cuéllar",
            emoji: "📜",
            dept: "Derecho",
            fac: "derecho",
            courses: ["Derecho Penal General", "Derecho Procesal Penal"],
            sedes: ["arequipa", "pucallpa"],
            score: 4.6, reviews: 88, verified: true, experience: "20 años",
            tags: ["Experiencia", "Casos reales", "Justo"],
            criteria: { ensenanza: 4.7, claridad: 4.5, puntualidad: 4.6, trato: 4.5, practicas: 4.6, accesibilidad: 4.4 },
            difficulty: 3.4, workload: "moderate", wouldTakeAgain: 88, learningScore: 91, approvalRate: 80,
            gradeDistribution: [35, 28, 16, 6, 3],
            historicalRatings: [
                { cycle: "2023-I", rating: 4.4 }, { cycle: "2023-II", rating: 4.5 },
                { cycle: "2024-I", rating: 4.5 }, { cycle: "2024-II", rating: 4.6 }, { cycle: "2025-I", rating: 4.7 },
            ],
            courseRatings: { "Derecho Penal General": 4.7, "Derecho Procesal Penal": 4.5 },
        },
        {
            id: 14,
            name: "Ing. Hugo Savage Morales",
            emoji: "🌐",
            dept: "Ingeniería de Software",
            fac: "ing",
            courses: ["Base de Datos Avanzadas", "Desarrollo Web Integrado"],
            sedes: ["lima-centro", "lima-este"],
            score: 3.9, reviews: 45, verified: false, experience: "5 años",
            tags: ["Técnico", "Directo", "Actualizado"],
            criteria: { ensenanza: 3.8, claridad: 3.7, puntualidad: 4.2, trato: 3.9, practicas: 4.1, accesibilidad: 3.6 },
            difficulty: 3.6, workload: "moderate", wouldTakeAgain: 58, learningScore: 72, approvalRate: 70,
            gradeDistribution: [10, 12, 13, 7, 3],
            historicalRatings: [
                { cycle: "2023-II", rating: 3.6 }, { cycle: "2024-I", rating: 3.7 },
                { cycle: "2024-II", rating: 3.8 }, { cycle: "2025-I", rating: 4.0 },
            ],
            courseRatings: { "Base de Datos Avanzadas": 4.0, "Desarrollo Web Integrado": 3.8 },
        },
        {
            id: 15,
            name: "Mg. Lourdes Flores Nano",
            emoji: "🌍",
            dept: "Negocios Internacionales",
            fac: "neg",
            courses: ["Comercio Internacional", "Logística Global"],
            sedes: ["lima-centro", "chimbote"],
            score: 4.4, reviews: 62, verified: true, experience: "11 años",
            tags: ["Conectada", "Práctica", "Global"],
            criteria: { ensenanza: 4.5, claridad: 4.4, puntualidad: 4.3, trato: 4.5, practicas: 4.3, accesibilidad: 4.2 },
            difficulty: 2.9, workload: "moderate", wouldTakeAgain: 84, learningScore: 85, approvalRate: 86,
            gradeDistribution: [24, 20, 12, 4, 2],
            historicalRatings: [
                { cycle: "2023-I", rating: 4.2 }, { cycle: "2023-II", rating: 4.3 },
                { cycle: "2024-I", rating: 4.3 }, { cycle: "2024-II", rating: 4.4 }, { cycle: "2025-I", rating: 4.5 },
            ],
            courseRatings: { "Comercio Internacional": 4.5, "Logística Global": 4.3 },
        },
        {
            id: 16,
            name: "Ing. Walter White Gonzales",
            emoji: "🔬",
            dept: "Ciencias / Cursos Generales",
            fac: "general",
            courses: ["Química General", "Cálculo Aplicado a la Física 1"],
            sedes: ["lima-norte", "lima-sur"],
            score: 4.0, reviews: 110, verified: true, experience: "14 años",
            tags: ["Exigente", "Metodológico", "Puntual"],
            criteria: { ensenanza: 4.1, claridad: 3.9, puntualidad: 4.5, trato: 3.8, practicas: 4.0, accesibilidad: 3.7 },
            difficulty: 4.4, workload: "heavy", wouldTakeAgain: 55, learningScore: 78, approvalRate: 58,
            gradeDistribution: [22, 28, 30, 18, 12],
            historicalRatings: [
                { cycle: "2023-I", rating: 3.8 }, { cycle: "2023-II", rating: 3.9 },
                { cycle: "2024-I", rating: 3.9 }, { cycle: "2024-II", rating: 4.0 }, { cycle: "2025-I", rating: 4.1 },
            ],
            courseRatings: { "Química General": 4.1, "Cálculo Aplicado a la Física 1": 3.9 },
        },
        {
            id: 17,
            name: "Lic. Fabrizio Copano Díaz",
            emoji: "📱",
            dept: "Comunicaciones / Publicidad",
            fac: "comunicaciones",
            courses: ["Creatividad Publicitaria", "Medios Digitales"],
            sedes: ["lima-centro"],
            score: 4.5, reviews: 42, verified: false, experience: "4 años",
            tags: ["Creativo", "Joven", "Innovador"],
            criteria: { ensenanza: 4.6, claridad: 4.5, puntualidad: 4.0, trato: 4.8, practicas: 4.5, accesibilidad: 4.4 },
            difficulty: 1.8, workload: "light", wouldTakeAgain: 95, learningScore: 83, approvalRate: 95,
            gradeDistribution: [22, 12, 5, 2, 1],
            historicalRatings: [
                { cycle: "2024-I", rating: 4.3 }, { cycle: "2024-II", rating: 4.4 }, { cycle: "2025-I", rating: 4.6 },
            ],
            courseRatings: { "Creatividad Publicitaria": 4.6, "Medios Digitales": 4.4 },
        },
        {
            id: 18,
            name: "Dra. Rosa Ávalos Chumpitaz",
            emoji: "💊",
            dept: "Ciencias de la Salud / Enfermería",
            fac: "salud",
            courses: ["Cuidado Enfermero Básicos", "Salud Pública"],
            sedes: ["lima-sur"],
            score: 4.3, reviews: 38, verified: true, experience: "13 años",
            tags: ["Comprometida", "Práctica", "Detallada"],
            criteria: { ensenanza: 4.4, claridad: 4.3, puntualidad: 4.5, trato: 4.6, practicas: 4.2, accesibilidad: 4.0 },
            difficulty: 3.2, workload: "moderate", wouldTakeAgain: 82, learningScore: 86, approvalRate: 80,
            gradeDistribution: [14, 12, 8, 3, 1],
            historicalRatings: [
                { cycle: "2023-II", rating: 4.1 }, { cycle: "2024-I", rating: 4.2 },
                { cycle: "2024-II", rating: 4.3 }, { cycle: "2025-I", rating: 4.4 },
            ],
            courseRatings: { "Cuidado Enfermero Básicos": 4.4, "Salud Pública": 4.2 },
        },
        {
            id: 19,
            name: "Ing. César Acuña Peralta",
            emoji: "🧱",
            dept: "Ingeniería Civil",
            fac: "ing",
            courses: ["Tecnología del Concreto", "Análisis Estructural"],
            sedes: ["trujillo", "chimbote"],
            score: 4.0, reviews: 58, verified: false, experience: "8 años",
            tags: ["Práctico", "Exigente", "Campo"],
            criteria: { ensenanza: 4.1, claridad: 3.9, puntualidad: 4.2, trato: 4.0, practicas: 4.3, accesibilidad: 3.7 },
            difficulty: 3.9, workload: "heavy", wouldTakeAgain: 65, learningScore: 79, approvalRate: 68,
            gradeDistribution: [16, 18, 14, 7, 3],
            historicalRatings: [
                { cycle: "2023-I", rating: 3.8 }, { cycle: "2023-II", rating: 3.9 },
                { cycle: "2024-I", rating: 3.9 }, { cycle: "2024-II", rating: 4.0 }, { cycle: "2025-I", rating: 4.1 },
            ],
            courseRatings: { "Tecnología del Concreto": 4.1, "Análisis Estructural": 3.9 },
        },
        {
            id: 20,
            name: "Mg. Arturo Chumbe Palomino",
            emoji: "👔",
            dept: "Administración / Negocios",
            fac: "neg",
            courses: ["Administración General", "Gestión del Talento Humano"],
            sedes: ["ica", "pucallpa"],
            score: 4.2, reviews: 41, verified: false, experience: "6 años",
            tags: ["Motivador", "Práctico", "Accesible"],
            criteria: { ensenanza: 4.3, claridad: 4.2, puntualidad: 4.0, trato: 4.5, practicas: 4.1, accesibilidad: 4.3 },
            difficulty: 2.4, workload: "light", wouldTakeAgain: 87, learningScore: 80, approvalRate: 88,
            gradeDistribution: [16, 14, 8, 2, 1],
            historicalRatings: [
                { cycle: "2024-I", rating: 4.0 }, { cycle: "2024-II", rating: 4.1 }, { cycle: "2025-I", rating: 4.3 },
            ],
            courseRatings: { "Administración General": 4.3, "Gestión del Talento Humano": 4.1 },
        },
    ],

    /* ── Reseñas semilla ─────────────────────────────────── */
    seedReviews: [
        { id: "seed-1", profId: 1, user: "A. Ramírez", initials: "AR", date: "Mayo 2025", score: 5, tags: ["Explica muy bien", "Aprendí mucho"], tagType: ["pos", "pos"], text: "El Ing. Mendoza es increíble. Tiene una manera única de explicar algoritmos con ejemplos muy claros. Sus exámenes son exigentes pero justos.", helpful: 42, course: "Principios de Algoritmos", difficulty: 4, wouldTakeAgain: true },
        { id: "seed-2", profId: 1, user: "K. Torres", initials: "KT", date: "Abril 2025", score: 4, tags: ["Exigente", "Buena metodología"], tagType: ["neu", "pos"], text: "Muy buen docente de Estructuras de Datos, aunque a veces va muy rápido. Recomiendo ir a sus asesorías.", helpful: 28, course: "Estructuras de Datos", difficulty: 4, wouldTakeAgain: true },
        { id: "seed-3", profId: 2, user: "M. Salcedo", initials: "MS", date: "Mayo 2025", score: 5, tags: ["Inspiradora", "Muy clara"], tagType: ["pos", "pos"], text: "La Dra. Rostworowski hace que Introducción al Derecho sea fascinante. Conecta la teoría con casos reales del Perú. ¡La mejor!", helpful: 55, course: "Introducción al Derecho", difficulty: 3, wouldTakeAgain: true },
        { id: "seed-4", profId: 3, user: "J. Vargas", initials: "JV", date: "Junio 2025", score: 5, tags: ["Casos reales", "Dinámica"], tagType: ["pos", "pos"], text: "El Mg. Gareca conecta perfectamente la teoría de marketing con empresas arequipeñas reales. Clases súper dinámicas.", helpful: 38, course: "Fundamentos de Marketing", difficulty: 2, wouldTakeAgain: true },
        { id: "seed-5", profId: 8, user: "L. Gutiérrez", initials: "LG", date: "Marzo 2025", score: 4, tags: ["Muy detallada", "Exigente pero justo"], tagType: ["pos", "neu"], text: "La Dra. Galindo conoce anatomía a la perfección. Sus clases son muy detalladas. Hay que estudiar mucho pero se aprende bastante.", helpful: 34, course: "Anatomía Humana", difficulty: 5, wouldTakeAgain: true },
        { id: "seed-6", profId: 14, user: "C. Mamani", initials: "CM", date: "Abril 2025", score: 3, tags: ["Poco claro", "Difícil de entender"], tagType: ["neg", "neg"], text: "El Ing. Savage sabe mucho de bases de datos pero la forma de explicar deja que desear. A veces se pierde en detalles técnicos.", helpful: 19, course: "Base de Datos Avanzadas", difficulty: 4, wouldTakeAgain: false },
        { id: "seed-7", profId: 6, user: "P. Castillo", initials: "PC", date: "Mayo 2025", score: 5, tags: ["Organizada", "Excelentes materiales"], tagType: ["pos", "pos"], text: "La Ing. Alva prepara cada clase con mucho detalle. Gestión de Operaciones cobró sentido gracias a ella. Material de primer nivel.", helpful: 48, course: "Gestión de Operaciones", difficulty: 3, wouldTakeAgain: true },
        { id: "seed-8", profId: 10, user: "D. Fernández", initials: "DF", date: "Junio 2025", score: 5, tags: ["Clara", "Puntual"], tagType: ["pos", "pos"], text: "La Mg. Ichikawa hace que la contabilidad sea comprensible. Siempre llega a tiempo y sus evaluaciones son justas.", helpful: 41, course: "Contabilidad General", difficulty: 3, wouldTakeAgain: true },
        { id: "seed-9", profId: 16, user: "R. Paz", initials: "RP", date: "Junio 2025", score: 3, tags: ["Muy exigente", "Difícil aprobar"], tagType: ["neg", "neg"], text: "El Ing. White sabe mucho de química pero su nivel de exigencia es muy alto para un curso general. Estudia el doble de lo normal.", helpful: 52, course: "Química General", difficulty: 5, wouldTakeAgain: false },
        { id: "seed-10", profId: 13, user: "S. Rojas", initials: "SR", date: "Mayo 2025", score: 5, tags: ["Experiencia real", "Motiva al estudio"], tagType: ["pos", "pos"], text: "El Dr. Pérez de Cuéllar trae 20 años de experiencia en penal. Sus casos reales hacen que entiendas la ley desde la práctica.", helpful: 56, course: "Derecho Penal General", difficulty: 3, wouldTakeAgain: true },
        { id: "seed-11", profId: 17, user: "A. López", initials: "AL", date: "Junio 2025", score: 5, tags: ["Creativo", "Innovador"], tagType: ["pos", "pos"], text: "Fabrizio hace que publicidad sea la mejor clase del ciclo. Usa herramientas actuales y te motiva a crear proyectos reales.", helpful: 33, course: "Creatividad Publicitaria", difficulty: 2, wouldTakeAgain: true },
        { id: "seed-12", profId: 11, user: "F. Quispe", initials: "FQ", date: "Abril 2025", score: 4, tags: ["Técnico", "Buenos laboratorios"], tagType: ["pos", "pos"], text: "El Ing. Benavides domina robótica y electrónica. Los laboratorios son excelentes aunque el ritmo es exigente.", helpful: 29, course: "Robótica Industrial", difficulty: 4, wouldTakeAgain: true },
    ],

    /* ── Categorías de tags ──────────────────────────────── */
    tagCategories: {
        positivos: ["Explica muy bien", "Dinámico/a", "Justo/a en notas", "Puntual", "Accesible", "Motiva al estudio", "Buenos ejemplos", "Práctico/a"],
        neutros: ["Exigente", "Teórico/a", "Va al ritmo del sílabo", "Tareas frecuentes"],
        negativos: ["Poco claro/a", "Impuntual", "Difícil de contactar", "Notas subjetivas"],
    },

    /* ── Etiquetas de criterios ──────────────────────────── */
    criteriaLabels: {
        ensenanza: "Enseñanza", claridad: "Claridad", puntualidad: "Puntualidad",
        trato: "Trato", practicas: "Prácticas", accesibilidad: "Accesibilidad",
    },

    workloadLabels: { light: "Ligera", moderate: "Moderada", heavy: "Pesada" },

    /* ══════════════════════════════════════════════════════
       MÉTODOS DE ACCESO A DATOS
       ══════════════════════════════════════════════════════ */

    getProfessor(id) { return this.professors.find(p => p.id === id); },

    getAllReviews() { return [...this.seedReviews, ...store.getReviews()]; },

    getReviewsForProf(profId) { return this.getAllReviews().filter(r => r.profId === profId); },

    getProfScore(profId) {
        const prof = this.getProfessor(profId);
        if (!prof) return 0;
        const userReviews = store.getReviews().filter(r => r.profId === profId);
        if (userReviews.length === 0) return prof.score;
        const seedTotal = prof.score * prof.reviews;
        const userTotal = userReviews.reduce((sum, r) => sum + r.score, 0);
        return (seedTotal + userTotal) / (prof.reviews + userReviews.length);
    },

    getProfReviewCount(profId) {
        const prof = this.getProfessor(profId);
        if (!prof) return 0;
        return prof.reviews + store.getReviews().filter(r => r.profId === profId).length;
    },

    getGlobalStats() {
        const totalProfs = this.professors.length;
        const totalReviews = this.professors.reduce((sum, p) => sum + this.getProfReviewCount(p.id), 0);
        const avgScore = this.professors.reduce((sum, p) => sum + this.getProfScore(p.id), 0) / totalProfs;
        const avgApproval = this.professors.reduce((sum, p) => sum + (p.approvalRate || 0), 0) / totalProfs;
        return { totalProfs, totalReviews, avgScore, avgApproval };
    },

    getProfBadge(prof) {
        const score = this.getProfScore(prof.id);
        if (score >= 4.7 && prof.wouldTakeAgain >= 90) return { type: "top", label: "Top Rated", icon: "🏆" };
        const hist = prof.historicalRatings || [];
        if (hist.length >= 2 && hist[hist.length - 1].rating - hist[hist.length - 2].rating >= 0.2)
            return { type: "trending", label: "Trending Up", icon: "🔥" };
        if (prof.wouldTakeAgain >= 90) return { type: "recommended", label: "Recomendado", icon: "⭐" };
        return null;
    },

    getDifficultyColor(diff) {
        if (diff <= 2) return "var(--color-success)";
        if (diff <= 3.5) return "var(--color-warning)";
        return "var(--color-danger)";
    },

    getDifficultyLabel(diff) {
        if (diff <= 1.5) return "Muy fácil";
        if (diff <= 2.5) return "Fácil";
        if (diff <= 3.5) return "Moderado";
        if (diff <= 4.5) return "Difícil";
        return "Muy difícil";
    },

    /** Get all unique courses across all professors */
    getAllCourses() {
        const courses = new Map();
        this.professors.forEach(p => {
            p.courses.forEach(c => {
                if (!courses.has(c)) {
                    courses.set(c, { name: c, profs: [], fac: p.fac });
                }
                courses.get(c).profs.push(p.id);
            });
        });
        return Array.from(courses.values());
    },

    /** Get professors by sede */
    getProfsBySede(sedeId) {
        return this.professors.filter(p => p.sedes && p.sedes.includes(sedeId));
    },

    /** Get sede name by id */
    getSedeName(sedeId) {
        const sede = this.sedes.find(s => s.id === sedeId);
        return sede ? sede.name : sedeId;
    },

    /** Get faculty count */
    getFacultyCount(facId) {
        return this.professors.filter(p => p.fac === facId).length;
    },

    starsHtml(score) {
        const full = Math.floor(score);
        const half = (score - full) >= 0.4 ? 1 : 0;
        const empty = 5 - full - half;
        return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
    },
};
