import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { Toaster, toast } from "./Toast";

it("muestra el mensaje y ejecuta la acción", async () => {
  const undo = vi.fn();
  render(<Toaster />);
  act(() => toast("Reseña borrada", { label: "Deshacer", onClick: undo }));
  expect(screen.getByRole("status")).toHaveTextContent("Reseña borrada");
  await userEvent.click(screen.getByRole("button", { name: "Deshacer" }));
  expect(undo).toHaveBeenCalledOnce();
  expect(screen.queryByText("Reseña borrada")).toBeNull();
});
