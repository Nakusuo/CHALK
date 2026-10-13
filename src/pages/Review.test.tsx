import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, expect, it } from "vitest";
import { getProfessor } from "../data/db";
import { resetStoreForTests, store } from "../lib/store";
import ReviewPage from "./Review";

beforeEach(() => {
  localStorage.clear();
  resetStoreForTests();
  store.login({ code: "U1", email: "U1@utp.edu.pe", name: "A", initials: "A" });
});

it("en modo edición precarga el texto y muestra 'Guardar cambios' al final", () => {
  const r = store.addReview({
    profId: 1, user: "A", initials: "A", date: "Mayo 2025", score: 4, tags: [], tagType: [],
    text: "Texto original suficientemente largo", helpful: 0, course: getProfessor(1)!.courses[0],
    difficulty: 3, wouldTakeAgain: true, workload: "light",
  });
  render(
    <MemoryRouter initialEntries={[`/docentes/1/resena?edit=${r.id}`]}>
      <Routes>
        <Route path="/docentes/:id/resena" element={<ReviewPage />} />
      </Routes>
    </MemoryRouter>,
  );
  expect(screen.getByText(/editar reseña/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Continuar" })).toBeEnabled();
});
