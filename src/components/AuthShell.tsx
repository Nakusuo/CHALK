import { BarChart3, MessageSquareText, Search } from "lucide-react";
import type { ReactNode } from "react";
import { professors } from "../data/db";
import ArtSlot from "./ArtSlot";
import { Logo, ThemeToggle } from "./Layout";

const POINTS = [
  { icon: Search, text: "Busca docentes por curso, facultad o sede" },
  { icon: BarChart3, text: "Compara notas, dificultad y aprobación" },
  { icon: MessageSquareText, text: "Lee y escribe reseñas de otros alumnos" },
];

export default function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="grid min-h-screen gap-6 p-4 sm:p-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <aside className="hidden flex-col rounded-[24px] bg-accent-soft/70 p-10 lg:flex xl:p-12">
        <Logo to="/" />
        <ArtSlot className="mt-10 aspect-[4/3] w-full" alt="Ilustración de CHALK" />
        <div className="mt-auto max-w-md pt-10">
          <h2 className="text-[34px] font-bold leading-[1.15] tracking-tight">¿Qué tal es este profe? Pregúntale a quien ya lo llevó.</h2>
          <ul className="mt-7 space-y-3">
            {POINTS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-[15px] text-fg/80">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-surface text-accent-ink shadow-card">
                  <Icon size={17} />
                </span>
                {text}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-sub">
            <span className="num">{professors.length}</span> docentes de la UTP Lima Norte.
          </p>
        </div>
      </aside>
      <section className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="lg:invisible">
            <Logo to="/" />
          </div>
          <ThemeToggle />
        </div>
        <div className="card mx-auto my-auto w-full max-w-md p-6 sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-sub">{subtitle}</p>
          <div className="mt-7">{children}</div>
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
      {error && <span className="mt-1.5 block text-xs font-medium text-red-700 dark:text-red-300">{error}</span>}
    </label>
  );
}
