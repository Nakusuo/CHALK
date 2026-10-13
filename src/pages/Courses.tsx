import { BookOpen, GitCompare, Search } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { cx, Empty, PageHeader } from "../components/ui";
import { allCourses, faculties, getFaculty, getProfessor } from "../data/db";

const COURSES = allCourses();

export default function Courses() {
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
        <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sub" />
        <input className="input h-12 pl-10" placeholder="Buscar curso" value={q} onChange={(e) => set("q", e.target.value)} />
      </div>
      <div className="mb-6 flex gap-1 overflow-x-auto pb-1">
        {[{ id: "all", name: "Todas" }, ...faculties].map((f) => (
          <button key={f.id} className={cx("chip shrink-0", fac === f.id && "chip-on")} onClick={() => set("fac", f.id)}>
            {f.name}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <Empty icon={<BookOpen />} title="No hay cursos con ese nombre" />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {list.map((c) => {
            const profs = c.profs.map((id) => getProfessor(id)!);
            return (
              <div key={c.name} className="card p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold">{c.name}</h2>
                    <div className="text-xs text-sub">{getFaculty(c.fac)?.name}</div>
                  </div>
                  {profs.length >= 2 && (
                    <Link to={`/comparar?a=${profs[0].id}&b=${profs[1].id}`} className="btn-ghost h-8 px-2 text-xs">
                      <GitCompare size={14} /> Comparar
                    </Link>
                  )}
                </div>
                <ul className="mt-4 space-y-1">
                  {profs
                    .sort((a, b) => (b.courseRatings[c.name] ?? 0) - (a.courseRatings[c.name] ?? 0))
                    .map((p) => (
                      <li key={p.id}>
                        <Link to={`/docentes/${p.id}`} className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm hover:bg-muted">
                          <span>{p.emoji}</span>
                          <span className="min-w-0 flex-1 truncate">{p.name}</span>
                          <b className="font-mono text-xs">{(p.courseRatings[c.name] ?? p.score).toFixed(1)}</b>
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
