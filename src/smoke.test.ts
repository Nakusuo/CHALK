import { expect, it } from "vitest";
import { professors } from "./data/db";

it("carga los 47 docentes de Lima Norte", () => {
  expect(professors).toHaveLength(47);
});
