import { MapPin } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cx, PageHeader } from "../components/ui";
import { careersBySede, faculties, professors, profMetrics, sedes } from "../data/db";
import { useStore } from "../lib/store";

export default function Faculties() {
  const reviews = useStore((s) => s.reviews);
  const [sede, setSede] = useState("all");
  const profs = professors.filter((p) => sede === "all" || p.sedes.includes(sede));

  return (
    <>
      <PageHeader title="Facultades y sedes" subtitle="Explora docentes por facultad y por campus." />

      <div className="mb-6 flex gap-1 no-scrollbar overflow-x-auto pb-1">
        {[{ id: "all", name: "Todas las sedes" }, ...sedes].map((s) => (
          <button key={s.id} className={cx("chip shrink-0", sede === s.id && "chip-on")} onClick={() => setSede(s.id)}>
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
          const courses = new Set(list.flatMap((p) => p.courses)).size;
          return (
            <Link key={f.id} to={`/docentes?fac=${f.id}${sede !== "all" ? `&sede=${sede}` : ""}`} className={"card p-5 transition hover:-translate-y-0.5 hover:border-fg/20"}>
              <div className="text-2xl">{f.icon}</div>
              <h2 className="mt-3 font-semibold">{f.name}</h2>
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-4 text-center">
                <div>
                  <div className="font-mono text-lg font-bold">{list.length}</div>
                  <div className="text-[11px] text-sub">docentes</div>
                </div>
                <div>
                  <div className="font-mono text-lg font-bold">{avg !== null ? avg.toFixed(1) : "—"}</div>
                  <div className="text-[11px] text-sub">promedio</div>
                </div>
                <div>
                  <div className="font-mono text-lg font-bold">{courses}</div>
                  <div className="text-[11px] text-sub">cursos</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {sede !== "all" && (
        <section className="card mt-8 p-6">
          <h2 className="font-semibold">Carreras en {sedes.find((s) => s.id === sede)?.name}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {careersBySede[sede]?.map((c) => (
              <span key={c} className="rounded-lg bg-muted px-2.5 py-1 text-xs">
                {c}
              </span>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
