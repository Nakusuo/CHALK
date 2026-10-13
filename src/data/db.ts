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

export function profStats(p: Professor, userReviews: Review[]) {
  const mine = userReviews.filter((r) => r.profId === p.id);
  const count = p.reviews + mine.length;
  const score = mine.length ? (p.score * p.reviews + mine.reduce((s, r) => s + r.score, 0)) / count : p.score;
  return { score, count };
}

export type Badge = { type: "top" | "trending" | "recommended"; label: string };

export function profBadge(p: Professor, score: number): Badge | null {
  if (score >= 4.7 && p.wouldTakeAgain >= 90) return { type: "top", label: "Top" };
  const h = p.historicalRatings;
  if (h.length >= 2 && h[h.length - 1].rating - h[h.length - 2].rating >= 0.2) return { type: "trending", label: "En alza" };
  if (p.wouldTakeAgain >= 90) return { type: "recommended", label: "Recomendado" };
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
