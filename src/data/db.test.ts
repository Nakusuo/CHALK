import { describe, expect, it } from "vitest";
import { allCourses, dateRank, difficultyLabel, getProfessor, isValidCode, isValidEmail, profBadge, profStats } from "./db";
import type { Review } from "./types";

const p1 = getProfessor(1)!;
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
    expect(profBadge({ ...p1, wouldTakeAgain: 95 }, 4.8)?.type).toBe("top");
  });
  it("null si no cumple nada", () => {
    expect(profBadge({ ...p1, wouldTakeAgain: 50, historicalRatings: [] }, 3)).toBeNull();
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
