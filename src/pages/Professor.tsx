import { ArrowLeft, BadgeCheck, GitCompare, MapPin, MessageSquareText, PenLine } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FavoriteButton } from "../components/ProfessorCard";
import ReviewItem from "../components/ReviewItem";
import { Avatar, BadgeTag, cx, Difficulty, Empty, Meter, plural, ScorePill, Stars, Tag } from "../components/ui";
import {
  allReviews,
  courseScore,
  criteriaLabels,
  dateRank,
  getFaculty,
  getProfessor,
  getSedeName,
  profBadge,
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

  return (
    <>
      <Link to="/docentes" className="mb-6 inline-flex items-center gap-1.5 text-sm text-sub hover:text-fg">
        <ArrowLeft size={16} /> Docentes
      </Link>

      <section className="card p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <Avatar size={72}>{p.emoji}</Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">{p.name}</h1>
              {p.verified && <BadgeCheck size={20} className="text-sky-500" aria-label="Verificado" />}
              {rated && <BadgeTag badge={profBadge(p, score, wouldTakeAgain, count)} />}
            </div>
            <div className="mt-1 text-sub">
              {p.dept} · {getFaculty(p.fac)?.name}
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-sub">
              <span className="inline-flex items-center gap-1">
                <MapPin size={14} /> {p.sedes.map(getSedeName).join(", ")}
              </span>
              {p.experience && <span>{p.experience} de experiencia</span>}
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 sm:flex-col sm:items-end">
            <ScorePill score={rated ? score : null} size="lg" />
            <div className="sm:text-right">
              {rated ? (
                <>
                  <Stars value={score} />
                  <div className="mt-1 text-xs text-sub">{plural(count, "reseña", "reseñas")}</div>
                </>
              ) : (
                <div className="text-xs text-sub">Sin reseñas aún</div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-6">
          <Link to={`/docentes/${p.id}/resena`} className="btn-primary">
            <PenLine size={16} /> Escribir reseña
          </Link>
          <Link to={`/comparar?a=${p.id}`} className="btn-outline">
            <GitCompare size={16} /> Comparar
          </Link>
          <FavoriteButton id={p.id} className="btn-outline w-10" />
        </div>
      </section>

      {rated && (
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            ...(wouldTakeAgain !== null
              ? [{ label: "Lo volvería a llevar", value: `${Math.round(wouldTakeAgain)}%`, v: wouldTakeAgain }]
              : []),
            ...(hasSeed
              ? [
                  { label: "Aprobación", value: `${p.approvalRate}%`, v: p.approvalRate },
                  { label: "Aprendizaje", value: `${p.learningScore}%`, v: p.learningScore },
                ]
              : []),
          ].map((m) => (
            <div key={m.label} className="card p-4">
              <div className="eyebrow">{m.label}</div>
              <div className="mb-3 mt-1 text-2xl font-bold">{m.value}</div>
              <Meter value={m.v} max={100} />
            </div>
          ))}
          {difficulty !== null && (
            <div className="card p-4">
              <div className="eyebrow">Dificultad{hasSeed && ` · Carga ${workloadLabels[p.workload].toLowerCase()}`}</div>
              <div className="mb-3 mt-1 text-2xl font-bold">{difficulty.toFixed(1)}</div>
              <Difficulty value={difficulty} />
            </div>
          )}
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <section className="card p-6">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 font-semibold">
              <MessageSquareText size={18} /> Reseñas
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {p.courses.length > 1 && (
                <select
                  className="input h-8 w-auto rounded-full py-0 text-xs"
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
              {FILTERS.map((f) => (
                <button key={f.id} className={cx("chip", filter === f.id && "chip-on")} onClick={() => setFilter(f.id)}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          {reviews.length ? (
            reviews.map((r) => <ReviewItem key={r.id} r={r} />)
          ) : (
            <div className="mt-4">
              {count === 0 ? (
                <Empty icon={<MessageSquareText />} title="Aún no hay reseñas">
                  <Link to={`/docentes/${p.id}/resena`} className="btn-primary mt-2">
                    <PenLine size={16} /> Escribe la primera reseña
                  </Link>
                </Empty>
              ) : (
                <Empty icon={<MessageSquareText />} title="Sin reseñas en esta vista">
                  Prueba otro filtro o sé el primero en contar tu experiencia.
                </Empty>
              )}
            </div>
          )}
        </section>

        <aside className="space-y-6">
          {p.courses.length > 0 && (
            <section className="card p-5">
              <h2 className="mb-3 font-semibold">Cursos que dicta</h2>
              {p.courses.map((c) => {
                const v = courseScore(p, c, userReviews);
                return (
                  <Link
                    key={c}
                    to={`/cursos?q=${encodeURIComponent(c)}`}
                    className="flex justify-between border-b border-line py-2 text-sm last:border-0 hover:text-brand"
                  >
                    <span>{c}</span>
                    <b className="font-mono">{v === null ? "—" : v.toFixed(1)}</b>
                  </Link>
                );
              })}
            </section>
          )}

          {criteria !== null && (
            <section className="card p-5">
              <h2 className="mb-4 font-semibold">Criterios</h2>
              <div className="space-y-3">
                {(Object.entries(criteria) as [CriteriaKey, number][]).map(([k, v]) => (
                  <div key={k}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-sub">{criteriaLabels[k]}</span>
                      <b className="font-mono">{v.toFixed(1)}</b>
                    </div>
                    <Meter value={v} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {rated && (
            <section className="card p-5">
              <h2 className="mb-4 font-semibold">Distribución de notas</h2>
              <div className="space-y-2">
                {dist.map((n, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs">
                    <span className="w-6 text-sub">{5 - i}★</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-amber-400" style={{ width: `${(n / distMax) * 100}%` }} />
                    </div>
                    <span className="w-6 text-right font-mono text-sub">{n}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {hasSeed && (
            <section className="card p-5">
              <h2 className="mb-4 font-semibold">Evolución por ciclo</h2>
              <div className="flex h-28 items-end gap-2">
                {hist.map((h, i) => (
                  <div key={h.cycle} className="flex flex-1 flex-col items-center gap-1">
                    <span className="font-mono text-[10px] text-sub">{h.rating.toFixed(1)}</span>
                    <div
                      className={cx("w-full rounded-md", i === hist.length - 1 ? "bg-brand" : "bg-brand/25")}
                      style={{ height: `${((h.rating - 3) / 2) * 80 + 8}px` }}
                    />
                    <span className="text-[10px] text-sub">{h.cycle}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </>
  );
}
