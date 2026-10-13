import { BookOpen, GitCompare, Search } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { cx, Empty, Monogram, PageHeader, tint } from "../components/ui";
import { allCourses, courseScore, faculties, getFaculty, getProfessor, professors } from "../data/db";
import { useStore } from "../lib/store";

const COURSES = allCourses();

export default function Courses() {
  const reviews = useStore((s) => s.reviews);
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const fac = params.get("fac") ?? "all";
  const set = (k: string, v: string) => {
    const next = new URLSearchParams(params);
    if (!v || v === "all") next.delete(k);
    else next.set(k, v);
    setParams(next, { replace: true });
  };

  const list = COURSES.filter((c) => (fac === "all" || c.fac === fac) && c.name.toLowerCase().includes(q.toLowerCase().trim()));

  return (
    <>
      <PageHeader title="Cursos" subtitle={`${COURSES.length} cursos y quién los dicta.`} />
      <div className="relative mb-4">
        <Search size={18} aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sub" />
        <input
          className="input h-12 border-fg/80 pl-11"
          aria-label="Buscar curso"
          placeholder="Buscar curso"
          value={q}
          onChange={(e) => set("q", e.target.value)}
        />
      </div>
      <div className="seg no-scrollbar mb-6 overflow-x-auto">
        {[{ id: "all", name: "Todas" }, ...faculties.filter((f) => professors.some((p) => p.fac === f.id))].map((f) => (
          <button
            key={f.id}
            aria-pressed={fac === f.id}
            className={cx("seg-item", fac === f.id && "seg-on")}
            onClick={() => set("fac", f.id)}
          >
            {f.name}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <Empty icon={<BookOpen />} title="No hay cursos con ese nombre" />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {list.map((c) => {
            const rating = (p: NonNullable<ReturnType<typeof getProfessor>>) => courseScore(p, c.name, reviews);
            const profs = c.profs.map((id) => getProfessor(id)!);
            return (
              <div key={c.name} className="card p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className={cx("mt-2 h-2 w-2 shrink-0 rounded-full", tint(c.name).dot)} aria-hidden />
                    <div className="min-w-0">
                      <h2 className="font-semibold">{c.name}</h2>
                      <div className="text-xs text-sub">
                        {getFaculty(c.fac)?.name} · <span className="num">{profs.length}</span>{" "}
                        {profs.length === 1 ? "docente" : "docentes"}
                      </div>
                    </div>
                  </div>
                  {profs.length >= 2 && (
                    <Link
                      to={`/comparar?a=${profs[0].id}&b=${profs[1].id}`}
                      className="btn-ghost h-8 shrink-0 px-2 text-xs text-accent-ink"
                    >
                      <GitCompare size={14} /> Comparar
                    </Link>
                  )}
                </div>
                <ul className="mt-4 space-y-1">
                  {profs
                    .sort((a, b) => (rating(b) ?? -1) - (rating(a) ?? -1))
                    .map((p) => (
                      <li key={p.id}>
                        <Link
                          to={`/docentes/${p.id}`}
                          className="-mx-2 flex items-center gap-3 rounded-control px-2 py-1.5 text-sm hover:bg-muted"
                        >
                          <Monogram name={p.name} tone={p.dept} size={30} />
                          <span className="min-w-0 flex-1 truncate">{p.name}</span>
                          <b className="num text-sm">{rating(p)?.toFixed(1) ?? "—"}</b>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
