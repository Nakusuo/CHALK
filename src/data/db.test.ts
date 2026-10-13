import { describe, expect, it } from "vitest";
import { allCourses, dateRank, difficultyLabel, getProfessor, isValidCode, isValidEmail, profBadge, profMetrics, profStats } from "./db";
import type { Review } from "./types";

// Fixture con nota semilla: los docentes reales arrancan sin reseñas.
const p1 = { ...getProfessor(1)!, score: 4.7, reviews: 134 };
const review = (score: number): Review => ({
  id: "user-1", profId: 1, user: "X", initials: "X", date: "Mayo 2025", score, tags: [], tagType: [],
  text: "", helpful: 0, course: "Principios de Algoritmos", difficulty: 3, wouldTakeAgain: true,
});

describe("validadores", () => {
  it("acepta correo UTP", () => expect(isValidEmail("U20240001@utp.edu.pe")).toBe(true));
  it("rechaza otro dominio", () => expect(isValidEmail("U2024@gmail.com")).toBe(false));
  it("código necesita 6+ dígitos", () => {
    expect(isValidCode("U123456")).toBe(true);
    expect(isValidCode("U12345")).toBe(false);
  });
});

describe("profStats", () => {
  it("docente sin reseñas promedia solo las del usuario", () => {
    expect(profStats(getProfessor(1)!, [review(4)])).toEqual({ score: 4, count: 1 });
  });
  it("sin reseñas propias usa la nota semilla", () => {
    expect(profStats(p1, [])).toEqual({ score: 4.7, count: 134 });
  });
  it("promedia reseñas del usuario con las semilla", () => {
    const { score, count } = profStats(p1, [review(1)]);
    expect(count).toBe(135);
    expect(score).toBeCloseTo((4.7 * 134 + 1) / 135, 5);
  });
  it("ignora reseñas de otros docentes", () => {
    expect(profStats(p1, [{ ...review(1), profId: 2 }]).count).toBe(134);
  });
});

describe("profBadge", () => {
  it("top si score ≥ 4.7 y ≥ 90 % lo volvería a llevar", () => {
    expect(profBadge(p1, 4.8, 95)?.type).toBe("top");
  });
  it("docente solo con reseñas de usuario puede tener insignia", () => {
    const rs = [{ ...review(5), wouldTakeAgain: true }];
    const m = profMetrics(getProfessor(1)!, rs);
    expect(profBadge(getProfessor(1)!, m.score, m.wouldTakeAgain)?.type).toBe("top");
  });
  it("null si no cumple nada", () => {
    expect(profBadge({ ...p1, historicalRatings: [] }, 3, 50)).toBeNull();
  });
});

it("difficultyLabel por tramos", () => {
  expect([1, 2, 3, 4, 5].map(difficultyLabel)).toEqual(["Muy fácil", "Fácil", "Moderado", "Difícil", "Muy difícil"]);
});

it("dateRank ordena 'Junio 2025' después de 'Mayo 2025'", () => {
  expect(dateRank({ ...review(5), date: "Junio 2025" })).toBeGreaterThan(dateRank(review(5)));
});

it("allCourses no repite cursos y está ordenado", () => {
  const names = allCourses().map((c) => c.name);
  expect(new Set(names).size).toBe(names.length);
  expect([...names].sort((a, b) => a.localeCompare(b))).toEqual(names);
});

describe("profMetrics", () => {
  const seedP = { ...p1, difficulty: 3, wouldTakeAgain: 80 };
  it("sin reseñas: no calificado y valores nulos", () => {
    expect(profMetrics(getProfessor(1)!, [])).toEqual({ score: 0, count: 0, difficulty: null, wouldTakeAgain: null, rated: false });
  });
  it("dos reseñas del usuario: promedios", () => {
    const rs = [{ ...review(5), difficulty: 2, wouldTakeAgain: true }, { ...review(3), difficulty: 4, wouldTakeAgain: null }];
    expect(profMetrics(getProfessor(1)!, rs)).toEqual({ score: 4, count: 2, difficulty: 3, wouldTakeAgain: 100, rated: true });
  });
  it("wouldTakeAgain es el % de true entre no nulos", () => {
    const rs = [{ ...review(4), wouldTakeAgain: true }, { ...review(4), wouldTakeAgain: false }];
    expect(profMetrics(getProfessor(1)!, rs).wouldTakeAgain).toBe(50);
  });
  it("mezcla semilla ponderada por reseñas", () => {
    const m = profMetrics(seedP, [{ ...review(1), difficulty: 5, wouldTakeAgain: false }]);
    expect(m.count).toBe(135);
    expect(m.score).toBeCloseTo((4.7 * 134 + 1) / 135, 5);
    expect(m.difficulty).toBeCloseTo((3 * 134 + 5) / 135, 5);
    expect(m.wouldTakeAgain).toBeCloseTo((80 * 134) / 135, 5);
    expect(m.rated).toBe(true);
  });
  it("solo votos nulos: calificado pero sin % de recomendación", () => {
    const m = profMetrics(getProfessor(1)!, [{ ...review(4), wouldTakeAgain: null }]);
    expect(m.rated).toBe(true);
    expect(m.wouldTakeAgain).toBeNull();
  });
  it("semilla sin reseñas propias devuelve la semilla", () => {
    expect(profMetrics(seedP, [])).toEqual({ score: 4.7, count: 134, difficulty: 3, wouldTakeAgain: 80, rated: true });
  });
});
