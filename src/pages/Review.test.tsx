import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, expect, it } from "vitest";
import { getProfessor } from "../data/db";
import { resetStoreForTests, store } from "../lib/store";
import ReviewPage from "./Review";

function renderAt(url: string) {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route path="/docentes/:id/resena" element={<ReviewPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  localStorage.clear();
  resetStoreForTests();
  store.login({ code: "U1", email: "U1@utp.edu.pe", name: "A", initials: "A" });
});

it("en modo edición precarga el texto y muestra 'Guardar cambios' al final", () => {
  const r = store.addReview({
    profId: 26, user: "A", initials: "A", date: "Mayo 2025", score: 4, tags: [], tagType: [],
    text: "Texto original suficientemente largo", helpful: 0, course: getProfessor(26)!.courses[0],
    difficulty: 3, wouldTakeAgain: true, workload: "light",
  });
  render(
    <MemoryRouter initialEntries={[`/docentes/26/resena?edit=${r.id}`]}>
      <Routes>
        <Route path="/docentes/:id/resena" element={<ReviewPage />} />
      </Routes>
    </MemoryRouter>,
  );
  expect(screen.getByText(/editar reseña/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Continuar" })).toBeEnabled();
});

it("al editar conserva helpful, id y no duplica", async () => {
  const user = userEvent.setup();
  const r = store.addReview({
    profId: 26, user: "A", initials: "A", date: "Mayo 2025", score: 4, tags: [], tagType: [],
    text: "Texto original suficientemente largo", helpful: 5, course: getProfessor(26)!.courses[0],
    difficulty: 3, wouldTakeAgain: true, workload: "light", authorCode: "ORIG",
  });
  renderAt(`/docentes/26/resena?edit=${r.id}`);
  for (let i = 0; i < 4; i++) await user.click(screen.getByRole("button", { name: "Continuar" }));
  await user.click(screen.getByRole("button", { name: "Guardar cambios" }));
  expect(store.get().reviews).toHaveLength(1);
  expect(store.get().reviews[0]).toMatchObject({ id: r.id, helpful: 5, authorCode: "ORIG" });
});

it("publica una reseña nueva y la guarda una sola vez", async () => {
  const user = userEvent.setup();
  renderAt("/docentes/26/resena");
  for (const k of ["Enseñanza", "Claridad", "Puntualidad", "Trato", "Prácticas", "Accesibilidad"]) {
    await user.click(within(screen.getByRole("radiogroup", { name: k })).getByRole("radio", { name: "4 estrellas" }));
  }
  await user.click(screen.getByRole("button", { name: "Continuar" }));
  await user.click(screen.getByRole("button", { name: /Sí/ }));
  await user.click(screen.getByRole("button", { name: "Ligera" }));
  await user.click(screen.getByRole("button", { name: "Continuar" }));
  await user.click(screen.getByRole("button", { name: "Continuar" }));
  await user.type(screen.getByRole("textbox"), "Excelente docente, explica con mucha claridad.");
  await user.click(screen.getByRole("button", { name: "Continuar" }));
  await user.click(screen.getByRole("button", { name: "Publicar reseña" }));
  const rs = store.get().reviews;
  expect(rs).toHaveLength(1);
  expect(rs[0]).toMatchObject({ profId: 26, text: "Excelente docente, explica con mucha claridad.", score: 4, helpful: 0, authorCode: "U1" });
  expect(rs[0].criteria?.claridad).toBe(4);
});
