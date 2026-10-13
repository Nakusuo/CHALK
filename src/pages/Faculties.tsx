import { BookOpen, Briefcase, Cpu, HeartPulse, type LucideIcon, MapPin, Palette, Scale } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cx, PageHeader, tint } from "../components/ui";

const ICONS: Record<string, LucideIcon> = {
  ing: Cpu,
  neg: Briefcase,
  derecho: Scale,
  comunicaciones: Palette,
  salud: HeartPulse,
  general: BookOpen,
};
import { careersBySede, faculties, professors, profMetrics, sedes } from "../data/db";
import { useStore } from "../lib/store";

export default function Faculties() {
  const reviews = useStore((s) => s.reviews);
  const [sede, setSede] = useState("all");
  const profs = professors.filter((p) => sede === "all" || p.sedes.includes(sede));

  return (
    <>
      <PageHeader title="Facultades y sedes" subtitle="Explora docentes por facultad y por campus." />

      <div className="seg no-scrollbar mb-6 overflow-x-auto">
        {[{ id: "all", name: "Todas las sedes" }, ...sedes].map((s) => (
          <button
            key={s.id}
            aria-pressed={sede === s.id}
            className={cx("seg-item inline-flex items-center gap-1", sede === s.id && "seg-on")}
            onClick={() => setSede(s.id)}
          >
            {s.id !== "all" && <MapPin size={12} />} {s.name}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {faculties.map((f) => {
          const list = profs.filter((p) => p.fac === f.id);
          if (!list.length) return null;
          const rated = list.map((p) => profMetrics(p, reviews)).filter((m) => m.rated);
          const avg = rated.length ? rated.reduce((s, m) => s + m.score, 0) / rated.length : null;
          const Icon = ICONS[f.id] ?? BookOpen;
          const courses = new Set(list.flatMap((p) => p.courses)).size;
          return (
            <Link key={f.id} to={`/docentes?fac=${f.id}${sede !== "all" ? `&sede=${sede}` : ""}`} className="card lift p-6">
              <span className={cx("grid h-11 w-11 place-items-center rounded-control", tint(f.id).bg)}>
                <Icon size={20} aria-hidden />
              </span>
              <h2 className="mt-4 text-[17px] font-semibold">{f.name}</h2>
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-4">
                <div>
                  <div className="num display text-[clamp(2rem,3.5vw,3rem)]">{list.length}</div>
                  <div className="text-xs text-sub">docentes</div>
                </div>
                <div>
                  <div className="num display text-[clamp(2rem,3.5vw,3rem)]">{avg !== null ? avg.toFixed(1) : "—"}</div>
                  <div className="text-xs text-sub">promedio</div>
                </div>
                <div>
                  <div className="num display text-[clamp(2rem,3.5vw,3rem)]">{courses}</div>
                  <div className="text-xs text-sub">cursos</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {sede !== "all" && (
        <section className="card mt-6 p-6">
          <h2 className="font-semibold">Carreras en {sedes.find((s) => s.id === sede)?.name}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {careersBySede[sede]?.map((c) => (
              <span key={c} className="rounded-full bg-muted px-3 py-1 text-xs">
                {c}
              </span>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
