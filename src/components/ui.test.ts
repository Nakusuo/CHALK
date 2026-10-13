import { expect, it } from "vitest";
import { plural } from "./ui";

it("pluraliza según la cantidad", () => {
  expect(plural(0, "reseña", "reseñas")).toBe("0 reseñas");
  expect(plural(1, "reseña", "reseñas")).toBe("1 reseña");
  expect(plural(2, "reseña", "reseñas")).toBe("2 reseñas");
});

it("saca iniciales de nombre y primer apellido", async () => {
  const { initialsOf, tint } = await import("./ui");
  expect(initialsOf("Ronald Angel Ayra Pinto")).toBe("RA");
  expect(initialsOf("Mauricio Azalgara Bedoya")).toBe("MA");
  expect(tint("Sistemas")).toBe(tint("Sistemas"));
});
