import { expect, it } from "vitest";
import { plural } from "./ui";

it("pluraliza según la cantidad", () => {
  expect(plural(0, "reseña", "reseñas")).toBe("0 reseñas");
  expect(plural(1, "reseña", "reseñas")).toBe("1 reseña");
  expect(plural(2, "reseña", "reseñas")).toBe("2 reseñas");
});
