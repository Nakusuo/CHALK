import { Bookmark, Search, SearchX, Trophy } from "lucide-react";
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProfessorCard from "../components/ProfessorCard";
import { cx, PageHeader, Stat } from "../components/ui";
import { allCourses, faculties, professors, profMetrics, sedes } from "../data/db";
import { useStore } from "../lib/store";

const SORTS = [
  { id: "score", label: "Calificación" },
  { id: "reviews", label: "Reseñas" },
  { id: "difficulty", label: "Más fáciles" },
  { id: "wta", label: "Recomendación" },
] as const;

const COURSE_COUNT = allCourses().length;
const TAGS = [...new Set(professors.flatMap((p) => p.tags))].sort();

export default function Home() {
  const reviews = useStore((s) => s.reviews);
  const favorites = useStore((s) => s.favorites);
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const fac = params.get("fac") ?? "all";
  const sede = params.get("sede") ?? "all";
  const tag = params.get("tag") ?? "all";
  const sort = params.get("sort") ?? "score";
  const saved = params.get("saved") === "1";

  const set = (k: string, v: string) => {
    const next = new URLSearchParams(params);
    if (!v || v === "all" || (k === "sort" && v === "score")) next.delete(k);
    else next.set(k, v);
    setParams(next, { replace: true });
  };

  const withStats = useMemo(() => professors.map((p) => ({ p, ...profMetrics(p, reviews) })), [reviews]);

  const list = useMemo(() => {
    const term = q.toLowerCase().trim();
    return withStats
      .filter(({ p }) => fac === "all" || p.fac === fac)
      .filter(({ p }) => sede === "all" || p.sedes.includes(sede))
      .filter(({ p }) => tag === "all" || p.tags.includes(tag))
      .filter(({ p }) => !saved || favorites.includes(p.id))
      .filter(({ p }) => !term || [p.name, p.dept, ...p.courses].some((s) => s.toLowerCase().includes(term)))
      .sort((a, b) => {
        if (sort === "reviews") return b.count - a.count;
        if (sort === "difficulty") return (a.difficulty ?? Infinity) - (b.difficulty ?? Infinity) || 0;
        if (sort === "wta") return (b.wouldTakeAgain ?? -1) - (a.wouldTakeAgain ?? -1);
        return b.score - a.score;
      });
  }, [withStats, q, fac, sede, tag, sort, saved, favorites]);

  const totalReviews = withStats.reduce((s, x) => s + x.count, 0);
  const ratedList = withStats.filter((x) => x.rated);
  const avg = ratedList.length ? ratedList.reduce((s, x) => s + x.score, 0) / ratedList.length : null;
  const top = [...ratedList].sort((a, b) => b.score - a.score).slice(0, 5);

  return (
    <>
      <PageHeader title="Docentes" subtitle="Encuentra al profe ideal antes de matricularte." />

      <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Docentes" value={professors.length} />
        <Stat label="Reseñas" value={totalReviews.toLocaleString("es-PE")} />
        <Stat label="Nota promedio" value={avg === null ? "—" : avg.toFixed(2)} hint={avg === null ? "aún sin reseñas" : "sobre 5.0"} />
        <Stat label="Cursos" value={COURSE_COUNT} />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0">
          <div className="relative">
            <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sub" />
            <input className="input h-12 pl-10" placeholder="Busca por nombre, curso o departamento" value={q} onChange={(e) => set("q", e.target.value)} />
          </div>

          <div className="mt-4 flex gap-1 no-scrollbar overflow-x-auto pb-1">
            {[{ id: "all", name: "Todas" }, ...faculties.filter((f) => professors.some((p) => p.fac === f.id))].map((f) => (
              <button key={f.id} className={cx("chip shrink-0", fac === f.id && "chip-on")} onClick={() => set("fac", f.id)}>
                {f.name}
              </button>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <select className="input h-8 w-auto rounded-full py-0 text-xs" value={sede} onChange={(e) => set("sede", e.target.value)} aria-label="Sede">
              <option value="all">Todas las sedes</option>
              {sedes.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <select className="input h-8 w-auto rounded-full py-0 text-xs" value={tag} onChange={(e) => set("tag", e.target.value)} aria-label="Etiqueta">
              <option value="all">Cualquier etiqueta</option>
              {TAGS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <button className={cx("chip", saved && "chip-on")} onClick={() => set("saved", saved ? "" : "1")}>
              <Bookmark size={12} fill={saved ? "currentColor" : "none"} /> Guardados ({favorites.length})
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm text-sub">
              <b className="text-fg">{list.length}</b> docente{list.length !== 1 && "s"}
            </span>
            <div className="flex rounded-xl bg-muted p-1">
              {SORTS.map((s) => (
                <button
                  key={s.id}
                  className={cx("rounded-lg px-3 py-1.5 text-xs font-semibold transition", sort === s.id ? "bg-surface text-fg shadow-card" : "text-sub hover:text-fg")}
                  onClick={() => set("sort", s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {list.map(({ p }) => (
              <ProfessorCard key={p.id} p={p} />
            ))}
            {list.length === 0 && (
              <div className="card flex flex-col items-center px-6 py-14 text-center">
                <SearchX className="mb-3 text-sub" />
                <div className="font-semibold">Sin resultados</div>
                <button className="btn-outline mt-4" onClick={() => setParams({}, { replace: true })}>
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-5">
            <div className="mb-4 flex items-center gap-2 font-semibold">
              <Trophy size={16} className="text-amber-500" /> Mejor calificados
            </div>
            {top.length === 0 && (
              <p className="text-sm text-sub">
                Aún no hay docentes calificados. Abre un perfil y escribe la primera reseña.
              </p>
            )}
            <ol className="space-y-3">
              {top.map(({ p, score }, i) => (
                <li key={p.id}>
                  <Link to={`/docentes/${p.id}`} className="flex items-center gap-3 text-sm hover:text-brand">
                    <span className="w-4 font-mono text-xs text-sub">{i + 1}</span>
                    <span className="min-w-0 flex-1 truncate">{p.name}</span>
                    <span className="font-mono text-xs font-bold">{score.toFixed(1)}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
          <Link to="/comparar" className="card block p-5 transition hover:border-fg/20">
            <div className="font-semibold">¿Dudas entre dos?</div>
            <div className="mt-1 text-sm text-sub">Compáralos lado a lado →</div>
          </Link>
        </aside>
      </div>
    </>
  );
}
