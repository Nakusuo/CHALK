// Datos base de CHALK. Docentes reales (Lima Norte) sin calificaciones: las métricas salen de reseñas reales.
import type { Faculty, Professor, Review, Sede } from "./types";

export const sedes: Sede[] = [
  {
    "id": "lima-centro",
    "name": "Lima Centro",
    "region": "Lima"
  },
  {
    "id": "lima-norte",
    "name": "Lima Norte",
    "region": "Lima"
  },
  {
    "id": "lima-sur",
    "name": "Lima Sur",
    "region": "Lima"
  },
  {
    "id": "lima-este",
    "name": "Lima Este",
    "region": "Lima"
  },
  {
    "id": "arequipa",
    "name": "Arequipa",
    "region": "Arequipa"
  },
  {
    "id": "chiclayo",
    "name": "Chiclayo",
    "region": "Lambayeque"
  },
  {
    "id": "piura",
    "name": "Piura",
    "region": "Piura"
  },
  {
    "id": "trujillo",
    "name": "Trujillo",
    "region": "La Libertad"
  },
  {
    "id": "huancayo",
    "name": "Huancayo",
    "region": "Junín"
  },
  {
    "id": "chimbote",
    "name": "Chimbote",
    "region": "Áncash"
  },
  {
    "id": "ica",
    "name": "Ica",
    "region": "Ica"
  },
  {
    "id": "iquitos",
    "name": "Iquitos",
    "region": "Loreto"
  },
  {
    "id": "pucallpa",
    "name": "Pucallpa",
    "region": "Ucayali"
  }
];

export const faculties: Faculty[] = [
  {
    "id": "ing",
    "name": "Ingeniería",
    "icon": "⚙️"
  },
  {
    "id": "neg",
    "name": "Negocios y Contabilidad",
    "icon": "📈"
  },
  {
    "id": "derecho",
    "name": "Derecho y Humanidades",
    "icon": "⚖️"
  },
  {
    "id": "comunicaciones",
    "name": "Comunicaciones y Diseño",
    "icon": "🎨"
  },
  {
    "id": "salud",
    "name": "Ciencias de la Salud",
    "icon": "🏥"
  },
  {
    "id": "general",
    "name": "Estudios Generales",
    "icon": "📚"
  }
];

export const careersBySede: Record<string, string[]> = {
  "lima-centro": [
    "Ingeniería de Sistemas e Informática",
    "Ingeniería de Software",
    "Ingeniería Industrial",
    "Ingeniería Civil",
    "Ingeniería Electrónica",
    "Ingeniería Mecatrónica",
    "Ingeniería Mecánica",
    "Administración de Empresas",
    "Administración y Marketing",
    "Administración de Negocios Internacionales",
    "Contabilidad",
    "Administración de Banca y Finanzas",
    "Derecho",
    "Psicología",
    "Ciencias de la Comunicación",
    "Diseño Digital Publicitario",
    "Arquitectura",
    "Medicina Humana",
    "Enfermería",
    "Nutrición y Dietética",
    "Obstetricia",
    "Psicología Clínica"
  ],
  "lima-norte": [
    "Ingeniería de Sistemas e Informática",
    "Ingeniería de Software",
    "Ingeniería Industrial",
    "Ingeniería Civil",
    "Ingeniería Electrónica",
    "Ingeniería Automotriz",
    "Administración de Empresas",
    "Administración y Marketing",
    "Administración de Negocios Internacionales",
    "Contabilidad",
    "Derecho",
    "Psicología",
    "Arquitectura",
    "Diseño Digital Publicitario"
  ],
  "lima-sur": [
    "Ingeniería Civil",
    "Ingeniería Industrial",
    "Ingeniería de Sistemas e Informática",
    "Administración de Empresas",
    "Administración y Marketing",
    "Contabilidad",
    "Derecho",
    "Psicología",
    "Enfermería"
  ],
  "lima-este": [
    "Ingeniería de Sistemas e Informática",
    "Ingeniería Industrial",
    "Ingeniería Civil",
    "Administración de Empresas",
    "Administración y Marketing",
    "Contabilidad",
    "Derecho",
    "Psicología"
  ],
  "arequipa": [
    "Ingeniería de Minas",
    "Ingeniería de Seguridad Industrial y Minera",
    "Ingeniería Civil",
    "Ingeniería Industrial",
    "Ingeniería de Sistemas e Informática",
    "Ingeniería Mecánica",
    "Administración de Empresas",
    "Administración y Marketing",
    "Contabilidad",
    "Derecho",
    "Psicología",
    "Arquitectura"
  ],
  "chiclayo": [
    "Arquitectura",
    "Ingeniería Civil",
    "Ingeniería Industrial",
    "Ingeniería de Sistemas e Informática",
    "Administración de Empresas",
    "Administración y Marketing",
    "Administración de Negocios Internacionales",
    "Contabilidad",
    "Derecho",
    "Psicología"
  ],
  "piura": [
    "Arquitectura",
    "Ingeniería Civil",
    "Ingeniería Industrial",
    "Ingeniería de Sistemas e Informática",
    "Administración de Empresas",
    "Administración y Marketing",
    "Administración de Negocios Internacionales",
    "Contabilidad",
    "Derecho",
    "Psicología"
  ],
  "trujillo": [
    "Arquitectura",
    "Ingeniería Civil",
    "Ingeniería Industrial",
    "Ingeniería de Sistemas e Informática",
    "Administración de Empresas",
    "Administración y Marketing",
    "Administración de Negocios Internacionales",
    "Contabilidad",
    "Derecho",
    "Psicología"
  ],
  "huancayo": [
    "Ingeniería Civil",
    "Ingeniería Industrial",
    "Ingeniería de Sistemas e Informática",
    "Administración de Empresas",
    "Contabilidad",
    "Derecho",
    "Psicología"
  ],
  "chimbote": [
    "Ingeniería Civil",
    "Ingeniería Industrial",
    "Ingeniería de Sistemas e Informática",
    "Administración de Empresas",
    "Contabilidad",
    "Derecho",
    "Psicología"
  ],
  "ica": [
    "Ingeniería Civil",
    "Ingeniería Industrial",
    "Ingeniería de Sistemas e Informática",
    "Administración de Empresas",
    "Contabilidad",
    "Derecho",
    "Psicología"
  ],
  "iquitos": [
    "Administración de Empresas",
    "Derecho",
    "Psicología",
    "Ingeniería Civil",
    "Ingeniería de Sistemas e Informática"
  ],
  "pucallpa": [
    "Administración de Empresas",
    "Derecho",
    "Psicología",
    "Ingeniería Civil",
    "Ingeniería de Sistemas e Informática"
  ]
};

/** Docente real sin calificaciones: los ceros son valores de relleno que nunca se muestran; las métricas salen de las reseñas. */
function prof(id: number, name: string, emoji: string, dept: string, fac: string, courses: string[]): Professor {
  return {
    id, name, emoji, dept, fac, courses,
    sedes: ["lima-norte"],
    score: 0,
    reviews: 0,
    verified: false,
    experience: "",
    tags: [],
    criteria: { ensenanza: 0, claridad: 0, puntualidad: 0, trato: 0, practicas: 0, accesibilidad: 0 },
    difficulty: 0,
    workload: "moderate",
    wouldTakeAgain: 0,
    learningScore: 0,
    approvalRate: 0,
    gradeDistribution: [0, 0, 0, 0, 0],
    historicalRatings: [],
    courseRatings: {},
  };
}

const SIS = "Ingeniería de Sistemas / Software";
const HUM = "Humanidades";
const NEG = "Negocios";

export const professors: Professor[] = [
  prof(26, "Augusto Oscar Becerra Pacherres", "🧩", SIS, "ing", ["Diseño de patrones"]),
  prof(27, "Ronald Angel Ayra Pinto", "🗄️", SIS, "ing", ["Base de datos II", "Desarrollo full stack"]),
  prof(28, "Alex Tito Belleza Porras", "🌐", SIS, "ing", ["Taller de programación web"]),
  prof(29, "Rene Alejandro Zamudio Ariza", "🖥️", SIS, "ing", ["Sistemas operativos", "Desarrollo de software"]),
  prof(30, "Anselmo Aniceto Valenzuela Zegarra", "💻", SIS, "ing", ["Algoritmos y estructuras de datos"]),
  prof(31, "Mauricio Azalgara Bedoya", "📋", SIS, "ing", ["Gestión de proyectos"]),
  prof(32, "Victor Alfredo Balcazar Briceño", "📡", SIS, "ing", ["Redes y comunicación de datos I", "Innovación y transformación digital"]),
  prof(33, "Dennis Jeison Cordova Macedo", "🏢", NEG, "neg", ["Administración y organización de empresas"]),
  prof(34, "Enrique Lee Huamani Uriarte", "🎨", SIS, "ing", ["Hojas de estilo en cascada avanzado", "Desarrollo web integrado"]),
  prof(35, "Willabaldo Marcelino Estrada Aro", "🌐", SIS, "ing", ["Marcos de desarrollo web"]),
  prof(36, "Jorge Chicana Aspajo", "⚡", SIS, "ing", ["Java script avanzado"]),
  prof(37, "Jose Manuel Bruno Sarmiento", "🧩", SIS, "ing", ["Análisis y diseño de sistemas de información"]),
  prof(38, "Cinthia Jeanette Calderon Aquiño", "🛠️", SIS, "ing", ["Curso integrador I: sistemas - software"]),
  prof(39, "Roxana Janet Quiroz Valenzuela", "🔐", SIS, "ing", ["Seguridad informática"]),
  prof(40, "Carlos Alberto Ponte Ramirez", "🧠", SIS, "ing", ["Teoría en computación"]),
  prof(41, "Elizabeth Rosa Garcia Alca", "🗣️", HUM, "general", ["Negociación y narrativa"]),
  prof(42, "Miguel Jaeger Rodriguez Lazo", "🧰", SIS, "ing", ["Herramientas de desarrollo"]),
  prof(43, "Juan Jose Silva Nuñez", "📊", SIS, "ing", ["Lenguajes de programación", "Inteligencia de negocios"]),
  prof(44, "Jorge Alfredo Guevara Jimenez", "💡", SIS, "ing", ["Diseño de productos y servicios"]),
  prof(45, "Denis Ivan Cruz Bustamante", "✅", SIS, "ing", ["Calidad de software"]),
  prof(46, "Luis Jaimen Samame Palacios", "📱", SIS, "ing", ["Desarrollo de aplicaciones móviles"]),
  prof(47, "Oscar Adrian Huaman Diaz", "🗣️", HUM, "general", ["Herramientas para la comunicación efectiva"]),
];

export const seedReviews: Review[] = [];


export const tagCategories = {
  "positivos": [
    "Explica muy bien",
    "Dinámico/a",
    "Justo/a en notas",
    "Puntual",
    "Accesible",
    "Motiva al estudio",
    "Buenos ejemplos",
    "Práctico/a"
  ],
  "neutros": [
    "Exigente",
    "Teórico/a",
    "Va al ritmo del sílabo",
    "Tareas frecuentes"
  ],
  "negativos": [
    "Poco claro/a",
    "Impuntual",
    "Difícil de contactar",
    "Notas subjetivas"
  ]
} as const;
