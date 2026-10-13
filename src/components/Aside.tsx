import { createContext, type ReactNode, useContext } from "react";
import { createPortal } from "react-dom";

/** Nodo donde cada página monta su columna de contexto (derecha en ≥1280px, debajo en pantallas menores). */
export const AsideContext = createContext<HTMLElement | null | undefined>(undefined);

export default function Aside({ children }: { children: ReactNode }) {
  const target = useContext(AsideContext);
  // Fuera del Layout (tests, vistas sueltas) se dibuja en su lugar.
  if (target === undefined) return <div className="mt-6 space-y-5">{children}</div>;
  if (target === null) return null;
  return createPortal(children, target);
}
