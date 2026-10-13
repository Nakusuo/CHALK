import { ArrowRight, Bookmark, GitCompare, Search, SearchX, Trophy } from "lucide-react";
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProfessorCard from "../components/ProfessorCard";
import Aside from "../components/Aside";
import ArtSlot from "../components/ArtSlot";
import { cx, Empty, Meter, Monogram, Stat } from "../components/ui";
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
  const user = useStore((s) => s.user)!;
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

  const firstName = user.name.split(/\s+/)[0];
  const facs = [{ id: "all", name: "Todas" }, ...faculties.filter((f) => professors.some((p) => p.fac === f.id))];

  return (
    <>
      <section className="block-cherry -mx-4 -mt-4 mb-10 px-5 pb-8 pt-8 sm:-mx-6 sm:px-8 lg:mx-0 lg:mt-0 lg:rounded-card lg:px-10 lg:pb-10 lg:pt-10">
        <p className="text-lg font-semibold">Hola, {firstName}.</p>
        <h1 className="display mt-3 max-w-[14ch] text-[clamp(2.75rem,6vw,5.5rem)]">¿Con quién llevas el curso?</h1>
        <div className="relative mt-8">
          <Search size={20} className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#5E5856]" aria-hidden />
          <input
            className="input h-14 border-transparent bg-white pl-14 text-[15px] text-[#1B1717] placeholder:text-[#5E5856] focus:border-[#1B1717] focus:ring-[#EDEBDD]/40"
            placeholder="Busca por nombre, curso o departamento"
            aria-label="Buscar docentes"
            value={q}
            onChange={(e) => set("q", e.target.value)}
          />
        </div>
      </section>

      <div className="mb-10 grid grid-cols-3 gap-3 sm:gap-6">
        <Stat compact label="Docentes" value={professors.length} hint={`${COURSE_COUNT} cursos en Lima Norte`} />
        <Stat
          compact
          label="Reseñas"
          value={totalReviews.toLocaleString("es-PE")}
          hint={`${ratedList.length} de ${professors.length} docentes con reseñas`}
        >
          <Meter value={ratedList.length} max={professors.length} />
        </Stat>
        <Stat
          compact
          label="Nota promedio"
          value={avg === null ? "—" : avg.toFixed(2)}
          hint={avg === null ? "aún sin reseñas" : "sobre 5.0"}
        >
          {avg !== null && <Meter value={avg} />}
        </Stat>
      </div>

      <div className="seg no-scrollbar overflow-x-auto" role="tablist" aria-label="Facultad">
        {facs.map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={fac === f.id}
            className={cx("seg-item text-sm", fac === f.id && "seg-on")}
            onClick={() => set("fac", f.id)}
          >
            {f.name}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <select
          className="input h-9 w-auto rounded-full py-0 text-xs"
          value={sede}
          onChange={(e) => set("sede", e.target.value)}
          aria-label="Sede"
        >
          <option value="all">Todas las sedes</option>
          {sedes.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <select
          className="input h-9 w-auto rounded-full py-0 text-xs"
          value={tag}
          onChange={(e) => set("tag", e.target.value)}
          aria-label="Etiqueta"
        >
          <option value="all">Cualquier etiqueta</option>
          {TAGS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <button className={cx("chip h-9", saved && "chip-on")} aria-pressed={saved} onClick={() => set("saved", saved ? "" : "1")}>
          <Bookmark size={12} fill={saved ? "currentColor" : "none"} /> Guardados (<span className="num">{favorites.length}</span>)
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm text-sub">
          <b className="num text-fg">{list.length}</b> docente{list.length !== 1 && "s"}
        </span>
        <label className="flex items-center gap-2 text-xs text-sub">
          Ordenar por
          <select
            className="input h-9 w-auto rounded-full py-0 text-xs font-semibold"
            value={sort}
            onChange={(e) => set("sort", e.target.value)}
            aria-label="Ordenar"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="rule mt-4">
        {list.map(({ p }) => (
          <ProfessorCard key={p.id} p={p} />
        ))}
        {list.length === 0 && (
          <Empty icon={<SearchX />} title="Sin resultados">
            <button className="btn-outline mt-3" onClick={() => setParams({}, { replace: true })}>
              Limpiar filtros
            </button>
          </Empty>
        )}
      </div>

      <Aside>
        <ArtSlot className="aspect-[4/3] w-full" alt="Ilustración de CHALK" />
        <section className="card p-5">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold tracking-tight">
            <Trophy size={16} className="text-amber-500" aria-hidden /> Mejor calificados
          </h2>
          {top.length === 0 && (
            <p className="text-sm text-sub">Aún no hay docentes calificados. Abre un perfil y escribe la primera reseña.</p>
          )}
          <ol className="space-y-1">
            {top.map(({ p, score }, i) => (
              <li key={p.id}>
                <Link to={`/docentes/${p.id}`} className="-mx-2 flex items-center gap-3 rounded-control px-2 py-1.5 text-sm hover:bg-muted">
                  <span className="num w-4 text-xs text-sub">{i + 1}</span>
                  <Monogram name={p.name} tone={p.dept} size={30} />
                  <span className="min-w-0 flex-1 truncate">{p.name}</span>
                  <span className="num text-sm font-bold">{score.toFixed(1)}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
        <Link to="/comparar" className="card lift flex items-center gap-4 p-5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-control bg-accent-soft text-accent-ink">
            <GitCompare size={20} aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold">¿Dudas entre dos?</span>
            <span className="block text-sm text-sub">Compáralos lado a lado</span>
          </span>
          <ArrowRight size={18} className="text-sub" aria-hidden />
        </Link>
      </Aside>
    </>
  );
}
