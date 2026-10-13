import { ArrowLeftRight, GitCompare, Trophy, X } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { cx, Empty, Monogram, PageHeader, plural, Stars } from "../components/ui";
import { criteriaLabels, getProfessor, professors, profMetrics, workloadLabels } from "../data/db";
import type { CriteriaKey, Professor } from "../data/types";
import { useStore } from "../lib/store";

function Picker({
  value,
  other,
  onChange,
  label,
}: {
  value?: Professor;
  other?: Professor;
  onChange: (id: string) => void;
  label: string;
}) {
  return (
    <div className="card flex flex-col items-center p-5 text-center sm:p-6">
      <div className="flex w-full items-center gap-2">
        <select
          className="input h-10 min-w-0 flex-1 rounded-full text-sm font-semibold"
          value={value?.id ?? ""}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
        >
          <option value="">Elegir docente…</option>
          {professors
            .filter((p) => p.id !== other?.id)
            .map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.courses.join(", ")}
              </option>
            ))}
        </select>
        {value && (
          <button className="btn-ghost h-9 w-9 shrink-0 px-0 text-sub" aria-label="Quitar" onClick={() => onChange("")}>
            <X size={16} />
          </button>
        )}
      </div>
      {value ? (
        <>
          <Monogram name={value.name} tone={value.dept} size={84} className="mt-6" />
          <Link to={`/docentes/${value.id}`} className="mt-4 text-lg font-semibold leading-snug hover:text-accent-ink">
            {value.name}
          </Link>
          <div className="mt-0.5 text-sm text-sub">{value.dept}</div>
        </>
      ) : (
        <>
          <span
            className="mt-6 grid h-[84px] w-[84px] place-items-center rounded-full border-2 border-dashed border-line text-sub"
            aria-hidden
          >
            <GitCompare size={24} />
          </span>
          <div className="mt-4 text-sm text-sub">{label}</div>
        </>
      )}
    </div>
  );
}

function Value({ v, win }: { v: string; win: boolean }) {
  return (
    <div className={cx("rounded-xl px-2 py-3 text-center", win && "bg-accent-soft")}>
      <div
        className={cx(
          "num text-[28px] font-bold leading-none tracking-tight sm:text-4xl",
          win ? "text-accent-ink" : v === "—" ? "text-sub" : "text-fg",
        )}
      >
        {v}
      </div>
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
          {
            label: "Calificación",
            get: (p) => {
              const m = profMetrics(p, reviews);
              return m.rated ? m.score : null;
            },
            fmt: (n) => n.toFixed(1),
          },
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
            .map((k) => ({
              label: criteriaLabels[k],
              get: (p: Professor) => profMetrics(p, reviews).criteria?.[k] ?? null,
              fmt: (n: number) => n.toFixed(1),
            }))
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

  const criteriaNames = Object.values(criteriaLabels);
  const groups = [
    { title: "Vista rápida", rows: rows.filter((r) => !criteriaNames.includes(r.label)) },
    { title: "Criterios", rows: rows.filter((r) => criteriaNames.includes(r.label)) },
  ].filter((g) => g.rows.length);

  return (
    <>
      <PageHeader title="Comparar docentes" subtitle="Ponlos lado a lado antes de elegir horario." />
      <div className="relative grid gap-3 sm:grid-cols-2 sm:gap-5">
        <Picker label="Docente A" value={a} other={b} onChange={(v) => set("a", v)} />
        <button
          className="btn mx-auto h-10 w-10 sm:absolute sm:left-1/2 sm:top-[108px] sm:z-10 sm:-translate-x-1/2 bg-surface px-0 text-sub shadow-card hover:text-accent-ink"
          aria-label="Intercambiar"
          onClick={swap}
          disabled={!a && !b}
        >
          <ArrowLeftRight size={16} />
        </button>
        <Picker label="Docente B" value={b} other={a} onChange={(v) => set("b", v)} />
      </div>

      {a && b ? (
        <section className="card mt-5 p-5 sm:p-8">
          <div className="grid grid-cols-2 gap-5 text-center">
            {(["a", "b"] as const).map((k) => {
              const lead = k === "a" ? wins.a > wins.b : wins.b > wins.a;
              return (
                <div key={k} className={cx("text-sm font-semibold", lead ? "text-accent-ink" : "text-sub")}>
                  {lead && <Trophy size={16} className="mr-1 inline" aria-hidden />}
                  <span className="num">{plural(k === "a" ? wins.a : wins.b, "criterio", "criterios")}</span>
                </div>
              );
            })}
          </div>

          {groups.map((g) => (
            <div key={g.title} className="mt-8">
              <h2 className="mb-2 border-b border-line pb-3 text-xl font-bold tracking-tight">{g.title}</h2>
              {g.rows.map((r) => {
                const [va, vb] = [r.get(a), r.get(b)];
                const better = winner(r, a, b);
                return (
                  <div key={r.label} className="border-b border-line py-4 last:border-0">
                    <div className="grid grid-cols-2 gap-5">
                      <Value v={va === null ? "—" : r.fmt(va)} win={better === "a"} />
                      <Value v={vb === null ? "—" : r.fmt(vb)} win={better === "b"} />
                    </div>
                    <div className="mt-1.5 text-center text-xs text-sub">
                      {r.label}
                      {r.lowerBetter && " · menos es mejor"}
                    </div>
                  </div>
                );
              })}
              {g.title === "Vista rápida" && (
                <div className="py-4">
                  <div className="grid grid-cols-2 gap-5 text-center text-lg font-semibold">
                    <div>{workloadLabels[a.workload]}</div>
                    <div>{workloadLabels[b.workload]}</div>
                  </div>
                  <div className="mt-1.5 text-center text-xs text-sub">Carga</div>
                </div>
              )}
            </div>
          ))}

          <div className="mt-4 grid grid-cols-2 gap-5 border-t border-line pt-5">
            {[a, b].map((p) => {
              const m = profMetrics(p, reviews);
              return (
                <div key={p.id} className="flex justify-center text-xs text-sub">
                  {m.rated ? <Stars value={m.score} size={14} /> : "Sin reseñas aún"}
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <div className="mt-5">
          <Empty icon={<GitCompare />} title="Elige dos docentes">
            También puedes llegar aquí desde el perfil de un docente o desde un curso.
          </Empty>
        </div>
      )}
    </>
  );
}
