import { BarChart3, MessageSquareText, Search } from "lucide-react";
import type { ReactNode } from "react";
import { professors } from "../data/db";
import { Logo, ThemeToggle } from "./Layout";

const POINTS = [
  { icon: Search, text: "Busca docentes por curso, facultad o sede" },
  { icon: BarChart3, text: "Compara notas, dificultad y aprobación" },
  { icon: MessageSquareText, text: "Lee y escribe reseñas de otros alumnos" },
];

export default function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-[#0B0B0E] p-12 text-white lg:flex lg:flex-col">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand/30 blur-3xl" />
        <div className="relative flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand font-mono text-sm font-bold">C</span>
          <span className="font-extrabold tracking-tight">CHALK</span>
        </div>
        <div className="relative mt-auto max-w-md">
          <h2 className="text-4xl font-bold leading-tight tracking-tight">¿Qué tal es este profe? Pregúntale a quien ya lo llevó.</h2>
          <ul className="mt-8 space-y-4">
            {POINTS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-white/80">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/10">
                  <Icon size={18} />
                </span>
                {text}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-white/50">{professors.length} docentes de la UTP Lima Norte.</p>
        </div>
      </aside>
      <section className="flex flex-col px-4 py-6 sm:px-10">
        <div className="flex items-center justify-between">
          <div className="lg:invisible">
            <Logo to="/" />
          </div>
          <ThemeToggle />
        </div>
        <div className="mx-auto my-auto w-full max-w-sm py-10">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-sub">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </section>
    </div>
  );
}

export function Field({ label, error, children }: { label: string; error?: string | false; children: ReactNode }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-medium text-red-600 dark:text-red-400">{error}</span>}
    </label>
  );
}
