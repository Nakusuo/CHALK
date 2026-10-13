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
      <aside className="block-cherry hidden flex-col rounded-card p-10 lg:flex xl:p-12">
        <Logo to="/" />
        <ArtSlot className="mt-8 aspect-[4/3] max-h-[30vh] w-full" alt="Ilustración de CHALK" />
        <div className="mt-auto max-w-xl pt-8">
          <h2 className="display text-[clamp(2.5rem,4vw,4.25rem)]">¿Qué tal es este profe? Pregúntale a quien ya lo llevó.</h2>
          <ul className="mt-7 space-y-3">
            {POINTS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-[15px] text-[#EDEBDD]/90 dark:text-white/90">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-control bg-[#EDEBDD] text-[#810100]">
                  <Icon size={17} />
                </span>
                {text}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-[#EDEBDD]/80 dark:text-white/85">
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
        <div className="card mx-auto my-auto w-full max-w-[30rem] p-7 sm:p-10">
          <h1 className="display text-[clamp(2.25rem,4vw,3.25rem)]">{title}</h1>
          <p className="mt-2 text-[15px] text-sub">{subtitle}</p>
          <div className="mt-8 [&_.input]:h-12">{children}</div>
          <p className="mt-8 border-t border-line pt-5 text-xs text-sub">Tus reseñas se guardan en este navegador.</p>
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
