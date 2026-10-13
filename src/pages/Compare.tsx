import { ArrowLeftRight, GitCompare, Trophy, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Avatar, cx, Empty, PageHeader, Stars } from "../components/ui";
import { criteriaLabels, getProfessor, professors, profMetrics, workloadLabels } from "../data/db";
import type { CriteriaKey, Professor } from "../data/types";
import { useStore } from "../lib/store";

function Picker({ value, other, onChange, label }: { value?: Professor; other?: Professor; onChange: (id: string) => void; label: string }) {
  return (
    <div className="card p-4">
      <div className="eyebrow mb-2">{label}</div>
      {value ? (
        <div className="flex items-center gap-3">
          <Avatar size={44}>{value.emoji}</Avatar>
          <div className="min-w-0 flex-1">
            <Link to={`/docentes/${value.id}`} className="block truncate font-semibold hover:text-brand">
              {value.name}
            </Link>
            <div className="truncate text-xs text-sub">{value.dept}</div>
          </div>
          <button className="btn-ghost h-8 w-8 px-0" aria-label="Quitar" onClick={() => onChange("")}>
            <X size={16} />
          </button>
        </div>
      ) : (
        <select className="input" value="" onChange={(e) => onChange(e.target.value)} aria-label={label}>
          <option value="">Elegir docente…</option>
          {professors
            .filter((p) => p.id !== other?.id)
            .map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.courses.join(", ")}
              </option>
            ))}
        </select>
      )}
    </div>
  );
}

export default function Compare() {
  const reviews = useStore((s) => s.reviews);
  const [params, setParams] = useSearchParams();
  const a = getProfessor(Number(params.get("a")));
  const b = getProfessor(Number(params.get("b")));

  const set = (k: "a" | "b", v: string) => {
    const next = new URLSearchParams(params);
    if (v) next.set(k, v);
    else next.delete(k);
    setParams(next, { replace: true });
  };
  const swap = () => setParams({ ...(b && { a: String(b.id) }), ...(a && { b: String(a.id) }) }, { replace: true });

  type Row = { label: string; get: (p: Professor) => number | null; fmt: (n: number) => string; lowerBetter?: boolean };
  // Aprobación y aprendizaje solo existen en la semilla: sin ella no hay nada que comparar.
  const hasSeed = !!a && !!b && (a.reviews > 0 || b.reviews > 0);
  const rows: Row[] =
    a && b
      ? [
          { label: "Calificación", get: (p) => { const m = profMetrics(p, reviews); return m.rated ? m.score : null; }, fmt: (n) => n.toFixed(1) },
          { label: "Reseñas", get: (p) => profMetrics(p, reviews).count, fmt: String },
          { label: "Lo volvería a llevar", get: (p) => profMetrics(p, reviews).wouldTakeAgain, fmt: (n) => `${Math.round(n)}%` },
          { label: "Dificultad", get: (p) => profMetrics(p, reviews).difficulty, fmt: (n) => n.toFixed(1), lowerBetter: true },
          ...(hasSeed
            ? [
                { label: "Aprobación", get: (p: Professor) => (p.reviews ? p.approvalRate : null), fmt: (n: number) => `${n}%` },
                { label: "Aprendizaje", get: (p: Professor) => (p.reviews ? p.learningScore : null), fmt: (n: number) => `${n}%` },
              ]
            : []),
          ...(Object.keys(criteriaLabels) as CriteriaKey[])
            .map((k) => ({ label: criteriaLabels[k], get: (p: Professor) => profMetrics(p, reviews).criteria?.[k] ?? null, fmt: (n: number) => n.toFixed(1) }))
            .filter((row) => row.get(a) !== null || row.get(b) !== null),
        ]
      : [];

  const winner = (r: Row, x: Professor, y: Professor): "a" | "b" | null => {
    const [vx, vy] = [r.get(x), r.get(y)];
    if (vx === null || vy === null || vx === vy) return null;
    return (r.lowerBetter ? vx < vy : vx > vy) ? "a" : "b";
  };

  const wins = rows.reduce(
    (w, r) => {
      const res = winner(r, a!, b!);
      if (!res) return w;
      return res === "a" ? { ...w, a: w.a + 1 } : { ...w, b: w.b + 1 };
    },
    { a: 0, b: 0 },
  );

  return (
    <>
      <PageHeader title="Comparar docentes" subtitle="Ponlos lado a lado antes de elegir horario." />
      <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
        <Picker label="Docente A" value={a} other={b} onChange={(v) => set("a", v)} />
        <button className="btn-outline mx-auto h-10 w-10 px-0" aria-label="Intercambiar" onClick={swap} disabled={!a && !b}>
          <ArrowLeftRight size={16} />
        </button>
        <Picker label="Docente B" value={b} other={a} onChange={(v) => set("b", v)} />
      </div>

      {a && b ? (
        <section className="card mt-6 overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-line bg-muted/50 p-5 text-center">
            <div className={cx("font-semibold", wins.a > wins.b && "text-brand")}>
              {wins.a > wins.b && <Trophy size={16} className="mr-1 inline" />}
              {wins.a} criterios
            </div>
            <span className="text-xs text-sub">vs</span>
            <div className={cx("font-semibold", wins.b > wins.a && "text-brand")}>
              {wins.b > wins.a && <Trophy size={16} className="mr-1 inline" />}
              {wins.b} criterios
            </div>
          </div>
          {rows.map((r) => {
            const [va, vb] = [r.get(a), r.get(b)];
            const better = winner(r, a, b);
            return (
              <div key={r.label} className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-line px-5 py-3 text-sm last:border-0">
                <div className={cx("text-right font-mono", better === "a" ? "font-bold text-emerald-600 dark:text-emerald-400" : "text-sub")}>{va === null ? "—" : r.fmt(va)}</div>
                <div className="w-32 text-center text-xs text-sub sm:w-44">{r.label}</div>
                <div className={cx("font-mono", better === "b" ? "font-bold text-emerald-600 dark:text-emerald-400" : "text-sub")}>{vb === null ? "—" : r.fmt(vb)}</div>
              </div>
            );
          })}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-3 text-sm">
            <div className="text-right">{workloadLabels[a.workload]}</div>
            <div className="w-32 text-center text-xs text-sub sm:w-44">Carga</div>
            <div>{workloadLabels[b.workload]}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 border-t border-line p-5">
            {[a, b].map((p) => {
              const m = profMetrics(p, reviews);
              return (
                <div key={p.id} className={cx("flex items-center gap-2 text-xs text-sub", p === a && "justify-end")}>
                  {m.rated ? <Stars value={m.score} size={12} /> : "Sin reseñas aún"}
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <div className="mt-6">
          <Empty icon={<GitCompare />} title="Elige dos docentes">
            También puedes llegar aquí desde el perfil de un docente o desde un curso.
          </Empty>
        </div>
      )}
    </>
  );
}
