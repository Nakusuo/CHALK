import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import ReviewItem from "./ReviewItem";
import type { Review } from "../data/types";

const r: Review = {
  id: "preview", profId: 1, user: "A", initials: "A", date: "Mayo 2025", score: 4, tags: [], tagType: [],
  text: "texto", helpful: 0, course: "X", difficulty: 3, wouldTakeAgain: true,
};

it("en modo readOnly no muestra acciones", () => {
  render(<ReviewItem r={r} readOnly />);
  expect(screen.queryByRole("button", { name: /útil/i })).toBeNull();
});
