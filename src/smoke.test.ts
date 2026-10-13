import { expect, it } from "vitest";
import { professors } from "./data/db";

it("carga los 20 docentes de ejemplo", () => {
  expect(professors).toHaveLength(20);
});
