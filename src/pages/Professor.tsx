import { ArrowLeft, BadgeCheck, GitCompare, MapPin, MessageSquareText, PenLine } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FavoriteButton } from "../components/ProfessorCard";
import ReviewItem from "../components/ReviewItem";
import Aside from "../components/Aside";
import { BadgeTag, cx, Empty, Meter, Monogram, Stars, Stat, Tag, tint } from "../components/ui";
import {
  allReviews,
  courseScore,
  criteriaLabels,
  dateRank,
  difficultyLabel,
  difficultyTone,
  getFaculty,
  getProfessor,
  getSedeName,
  profBadge,
  professors,
  profMetrics,
  workloadLabels,
} from "../data/db";
import type { CriteriaKey } from "../data/types";
import { useStore } from "../lib/store";
import NotFound from "./NotFound";

const FILTERS = [
  { id: "recent", label: "Recientes" },
  { id: "helpful", label: "Más útiles" },
  { id: "positive", label: "Positivas" },
  { id: "critical", label: "Críticas" },
] as const;

export default function ProfessorPage() {
  const { id } = useParams();
  const p = getProfessor(Number(id));
  const userReviews = useStore((s) => s.reviews);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("recent");
  const [course, setCourse] = useState("all");

  if (!p) return <NotFound />;
  const { score, count, difficulty, wouldTakeAgain, rated, criteria, distribution } = profMetrics(p, userReviews);

  let reviews = allReviews(userReviews).filter((r) => r.profId === p.id && (course === "all" || r.course === course));
  if (filter === "positive") reviews = reviews.filter((r) => r.score >= 4);
  if (filter === "critical") reviews = reviews.filter((r) => r.score <= 3);
  reviews.sort((a, b) => (filter === "helpful" ? b.helpful - a.helpful : dateRank(b) - dateRank(a)));

  const dist = distribution;
  const distMax = Math.max(1, ...dist);
  // Aprobación, aprendizaje y evolución solo existen en la semilla; criterios y distribución salen de las reseñas.
  const hasSeed = p.reviews > 0;
  const hist = p.historicalRatings;

  const others = professors.filter((o) => o.id !== p.id && o.courses.some((c) => p.courses.includes(c)));
  const peak = Math.max(...dist);

  return (
    <>
      <Link to="/docentes" className="mb-5 inline-flex items-center gap-1.5 rounded text-sm text-sub hover:text-fg">
        <ArrowLeft size={16} /> Docentes
      </Link>

      <section className="card p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <Monogram name={p.name} tone={p.dept} size={88} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-[28px] font-bold leading-tight tracking-tight">{p.name}</h1>
              {p.verified && <BadgeCheck size={20} className="text-accent" aria-label="Verificado" />}
              {rated && <BadgeTag badge={profBadge(p, score, wouldTakeAgain, count)} />}
            </div>
            <div className="mt-1 text-sub">
              {p.dept} · {getFaculty(p.fac)?.name}
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-sub">
              <span className="inline-flex items-center gap-1">
                <MapPin size={14} aria-hidden /> {p.sedes.map(getSedeName).join(", ")}
              </span>
              {p.experience && <span>{p.experience} de experiencia</span>}
            </div>
            {p.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link to={`/docentes/${p.id}/resena`} className="btn-brand">
            <PenLine size={16} /> Escribir reseña
          </Link>
          <Link to={`/comparar?a=${p.id}`} className="btn-outline">
            <GitCompare size={16} /> Comparar
          </Link>
          <FavoriteButton id={p.id} label className="btn-outline h-10 text-fg" />
        </div>
      </section>

      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Nota" value={rated ? score.toFixed(1) : "—"} hint={rated ? "sobre 5.0" : "Sin reseñas aún"}>
          {rated && <Stars value={score} />}
        </Stat>
        <Stat
          label="Lo volvería a llevar"
          value={wouldTakeAgain !== null ? `${Math.round(wouldTakeAgain)}%` : "—"}
          hint={wouldTakeAgain === null ? "Sin votos aún" : undefined}
        >
          {wouldTakeAgain !== null && <Meter value={wouldTakeAgain} max={100} />}
        </Stat>
        <Stat
          label="Dificultad"
          value={difficulty !== null ? difficulty.toFixed(1) : "—"}
          hint={
            difficulty !== null
              ? `${difficultyLabel(difficulty)}${hasSeed ? ` · carga ${workloadLabels[p.workload].toLowerCase()}` : ""}`
              : "Sin reseñas aún"
          }
        >
          {difficulty !== null && <Meter value={difficulty} tone={difficultyTone(difficulty)} />}
        </Stat>
        <Stat label="Reseñas" value={count} hint={count ? "de alumnos" : "Sé el primero"} />
        {hasSeed && (
          <>
            <Stat label="Aprobación" value={`${p.approvalRate}%`}>
              <Meter value={p.approvalRate} max={100} />
            </Stat>
            <Stat label="Aprendizaje" value={`${p.learningScore}%`}>
              <Meter value={p.learningScore} max={100} />
            </Stat>
          </>
        )}
      </div>

      {(criteria !== null || peak > 0) && (
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {criteria !== null && (
            <section className="card p-6">
              <h2 className="mb-5 font-semibold">Criterios</h2>
              <div className="space-y-3.5">
                {(Object.entries(criteria) as [CriteriaKey, number][]).map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[100px_minmax(0,1fr)_32px] items-center gap-3 text-sm">
                    <span className="text-sub">{criteriaLabels[k]}</span>
                    <Meter value={v} />
                    <b className="num text-right">{v.toFixed(1)}</b>
                  </div>
                ))}
              </div>
            </section>
          )}
          {peak > 0 && (
            <section className="card p-6">
              <h2 className="mb-5 font-semibold">Distribución de notas</h2>
              <div
                className="flex h-40 items-end gap-3"
                role="img"
                aria-label={`Reseñas por estrellas: ${dist.map((n, i) => `${5 - i} estrellas, ${n}`).join("; ")}`}
              >
                {[...dist].reverse().map((n, j) => (
                  <div key={j} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                    <span className={cx("num text-xs", n === peak ? "font-bold text-fg" : "text-sub")}>{n}</span>
                    <div
                      className={cx("w-full rounded-lg", n === peak ? "bg-accent" : "bg-accent/20")}
                      style={{ height: `${Math.max(6, (n / distMax) * 75)}%` }}
                    />
                    <span className="num text-xs text-sub">{j + 1}★</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {hasSeed && (
        <section className="card mt-5 p-6">
          <h2 className="mb-4 font-semibold">Evolución por ciclo</h2>
          <div className="flex h-32 items-end gap-3">
            {hist.map((h, i) => (
              <div key={h.cycle} className="flex flex-1 flex-col items-center gap-1">
                <span className="num text-[11px] text-sub">{h.rating.toFixed(1)}</span>
                <div
                  className={cx("w-full rounded-lg", i === hist.length - 1 ? "bg-accent" : "bg-accent/20")}
                  style={{ height: `${((h.rating - 3) / 2) * 80 + 8}px` }}
                />
                <span className="text-[11px] text-sub">{h.cycle}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <MessageSquareText size={18} aria-hidden /> Reseñas
          </h2>
          <div className="flex max-w-full flex-wrap items-center gap-2">
            {p.courses.length > 1 && (
              <select
                className="input h-9 w-auto rounded-full py-0 text-xs"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                aria-label="Curso"
              >
                <option value="all">Todos los cursos</option>
                {p.courses.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            )}
            <div className="seg no-scrollbar max-w-full overflow-x-auto">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  aria-pressed={filter === f.id}
                  className={cx("seg-item", filter === f.id && "seg-on")}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        {reviews.length ? (
          <div className="space-y-4">
            {reviews.map((r) => (
              <ReviewItem key={r.id} r={r} />
            ))}
          </div>
        ) : count === 0 ? (
          <Empty icon={<MessageSquareText />} title="Aún no hay reseñas">
            <Link to={`/docentes/${p.id}/resena`} className="btn-brand mt-3">
              <PenLine size={16} /> Escribe la primera reseña
            </Link>
          </Empty>
        ) : (
          <Empty icon={<MessageSquareText />} title="Sin reseñas en esta vista">
            Prueba otro filtro o sé el primero en contar tu experiencia.
          </Empty>
        )}
      </section>

      <Aside>
        {p.courses.length > 0 && (
          <section className="card p-5">
            <h2 className="mb-3 font-semibold">Cursos que dicta</h2>
            <ul className="space-y-1">
              {p.courses.map((c) => {
                const v = courseScore(p, c, userReviews);
                return (
                  <li key={c}>
                    <Link
                      to={`/cursos?q=${encodeURIComponent(c)}`}
                      className="-mx-2 flex items-center gap-3 rounded-xl px-2 py-2 text-sm hover:bg-muted"
                    >
                      <span className={cx("h-2 w-2 shrink-0 rounded-full", tint(c).dot)} aria-hidden />
                      <span className="min-w-0 flex-1">{c}</span>
                      <b className="num">{v === null ? "—" : v.toFixed(1)}</b>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
        {others.length > 0 && (
          <section className="card p-5">
            <h2 className="mb-3 font-semibold">También dictan estos cursos</h2>
            <ul className="space-y-1">
              {others.slice(0, 6).map((o) => {
                const m = profMetrics(o, userReviews);
                return (
                  <li key={o.id}>
                    <Link to={`/docentes/${o.id}`} className="-mx-2 flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-muted">
                      <Monogram name={o.name} tone={o.dept} size={34} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{o.name}</span>
                        <span className="block truncate text-xs text-sub">{o.courses.filter((c) => p.courses.includes(c)).join(", ")}</span>
                      </span>
                      <b className="num text-sm">{m.rated ? m.score.toFixed(1) : "—"}</b>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
        <Link to={`/comparar?a=${p.id}`} className="card lift flex items-center gap-4 p-5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-ink">
            <GitCompare size={20} aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold">Compáralo con otro docente</span>
            <span className="block text-sm text-sub">Ponlos lado a lado antes de matricularte</span>
          </span>
        </Link>
      </Aside>
    </>
  );
}
