import { faculties, professors, sedes, seedReviews } from "./seed";
import type { CriteriaKey, Professor, Review, Workload } from "./types";

export { careersBySede, faculties, professors, sedes, seedReviews, tagCategories } from "./seed";

export const criteriaLabels: Record<CriteriaKey, string> = {
  ensenanza: "Enseñanza",
  claridad: "Claridad",
  puntualidad: "Puntualidad",
  trato: "Trato",
  practicas: "Prácticas",
  accesibilidad: "Accesibilidad",
};

export const criteriaHints: Record<CriteriaKey, string> = {
  ensenanza: "¿Domina el tema y enseña bien?",
  claridad: "¿Explica de forma clara y ordenada?",
  puntualidad: "¿Llega a tiempo y cumple horarios?",
  trato: "¿Es respetuoso/a con los alumnos?",
  practicas: "¿Las prácticas son útiles y bien diseñadas?",
  accesibilidad: "¿Es accesible fuera de clases?",
};

export const workloadLabels: Record<Workload, string> = { light: "Ligera", moderate: "Moderada", heavy: "Pesada" };

export const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

export const getProfessor = (id: number) => professors.find((p) => p.id === id);
export const getFaculty = (id: string) => faculties.find((f) => f.id === id);
export const getSedeName = (id: string) => sedes.find((s) => s.id === id)?.name ?? id;

export const allReviews = (userReviews: Review[]) => [...seedReviews, ...userReviews];

export interface ProfMetrics {
  score: number;
  count: number;
  difficulty: number | null;
  wouldTakeAgain: number | null;
  rated: boolean;
  /** Promedio por criterio de las reseñas del usuario que lo incluyen; null si ninguna. */
  criteria: Record<CriteriaKey, number> | null;
  /** Reseñas del usuario por estrellas: índice 0 = 5★ … índice 4 = 1★. */
  distribution: number[];
}

const CRITERIA_KEYS = Object.keys(criteriaLabels) as CriteriaKey[];

/** Mezcla la nota semilla (ponderada por p.reviews) con las reseñas del usuario. Sin datos → null. */
export function profMetrics(p: Professor, userReviews: Review[]): ProfMetrics {
  const mine = userReviews.filter((r) => r.profId === p.id);
  const count = p.reviews + mine.length;
  const distribution = [0, 0, 0, 0, 0];
  for (const r of mine) {
    const star = Math.min(5, Math.max(1, Math.round(r.score)));
    distribution[5 - star]++;
  }
  const withCriteria = mine.filter((r) => r.criteria);
  const criteria = withCriteria.length
    ? (Object.fromEntries(
        CRITERIA_KEYS.map((k) => {
          const vals = withCriteria.map((r) => r.criteria![k]).filter((v) => v > 0);
          return [k, vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0];
        }),
      ) as Record<CriteriaKey, number>)
    : null;
  if (count === 0) return { score: 0, count: 0, difficulty: null, wouldTakeAgain: null, rated: false, criteria: null, distribution };
  const sum = (f: (r: Review) => number) => mine.reduce((s, r) => s + f(r), 0);
  const score = (p.score * p.reviews + sum((r) => r.score)) / count;
  const difficulty = (p.difficulty * p.reviews + sum((r) => r.difficulty)) / count;
  const votes = mine.filter((r) => r.wouldTakeAgain !== null);
  const yes = (p.wouldTakeAgain / 100) * p.reviews + votes.filter((r) => r.wouldTakeAgain).length;
  const total = p.reviews + votes.length;
  return { score, count, difficulty, wouldTakeAgain: total ? (yes / total) * 100 : null, rated: true, criteria, distribution };
}

export function profStats(p: Professor, userReviews: Review[]) {
  const { score, count } = profMetrics(p, userReviews);
  return { score, count };
}

export type Badge = { type: "top" | "trending" | "recommended"; label: string };

/** Promedio del curso: nota semilla si existe; si no, reseñas del usuario para ese docente y curso. */
export function courseScore(p: Professor, course: string, userReviews: Review[]): number | null {
  if (p.courseRatings[course] !== undefined) return p.courseRatings[course];
  const mine = userReviews.filter((r) => r.profId === p.id && r.course === course);
  return mine.length ? mine.reduce((s, r) => s + r.score, 0) / mine.length : null;
}

export function profBadge(p: Professor, score: number, wouldTakeAgain: number | null, count: number): Badge | null {
  const wta = wouldTakeAgain ?? 0;
  const enough = count >= 3;
  if (enough && score >= 4.7 && wta >= 90) return { type: "top", label: "Top" };
  const h = p.historicalRatings;
  if (h.length >= 2 && h[h.length - 1].rating - h[h.length - 2].rating >= 0.2) return { type: "trending", label: "En alza" };
  if (enough && wta >= 90) return { type: "recommended", label: "Recomendado" };
  return null;
}

export function difficultyLabel(d: number) {
  if (d <= 1.5) return "Muy fácil";
  if (d <= 2.5) return "Fácil";
  if (d <= 3.5) return "Moderado";
  if (d <= 4.5) return "Difícil";
  return "Muy difícil";
}

export function difficultyTone(d: number): "good" | "warn" | "bad" {
  if (d <= 2) return "good";
  if (d <= 3.5) return "warn";
  return "bad";
}

export function allCourses() {
  const map = new Map<string, { name: string; fac: string; profs: number[] }>();
  for (const p of professors)
    for (const c of p.courses) {
      if (!map.has(c)) map.set(c, { name: c, fac: p.fac, profs: [] });
      map.get(c)!.profs.push(p.id);
    }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/** Convierte "Mayo 2025" en un número ordenable. */
export function dateRank(r: Review) {
  if (r.createdAt) return new Date(r.createdAt).getTime();
  const [m, y] = r.date.split(" ");
  return new Date(Number(y) || 2025, Math.max(0, MONTHS.indexOf(m))).getTime();
}

export const isValidEmail = (e: string) => /^U\d+@utp\.edu\.pe$/i.test(e.trim());
export const isValidCode = (c: string) => /^U\d{6,}$/i.test(c.trim());
