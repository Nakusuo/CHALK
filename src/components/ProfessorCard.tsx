import { BadgeCheck, Bookmark, MapPin, PenLine, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { getSedeName, profBadge, profMetrics } from "../data/db";
import type { Professor } from "../data/types";
import { store, useStore } from "../lib/store";
import { toast } from "./Toast";
import { BadgeTag, cx, Difficulty, Monogram, plural } from "./ui";

export function FavoriteButton({ id, className, label, onBlock }: { id: number; className?: string; label?: boolean; onBlock?: boolean }) {
  const fav = useStore((s) => s.favorites.includes(id));
  return (
    <button
      className={cx(onBlock ? "btn-on-block" : "btn-ghost h-9 px-0", label ? "px-4" : "w-9", !onBlock && (fav ? "text-accent-ink" : "text-sub hover:text-fg"), className)}
      aria-label={fav ? "Quitar de guardados" : "Guardar docente"}
      aria-pressed={fav}
      onClick={(e) => {
        e.preventDefault();
        store.toggleFavorite(id);
        toast(fav ? "Quitado de guardados" : "Docente guardado");
      }}
    >
      <Bookmark size={18} fill={fav ? "currentColor" : "none"} />
      {label && (fav ? "Guardado" : "Guardar")}
    </button>
  );
}

export default function ProfessorCard({ p, rank }: { p: Professor; rank?: number }) {
  const reviews = useStore((s) => s.reviews);
  const { score, count, difficulty, wouldTakeAgain, rated } = profMetrics(p, reviews);
  return (
    <article className="row flex gap-4 py-6 sm:gap-5">
      <Monogram name={p.name} tone={p.dept} size={52} />
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              {rank !== undefined && <span className="num text-xs text-sub">#{rank}</span>}
              <h3 className="text-[clamp(1.25rem,2.4vw,1.75rem)] font-extrabold leading-tight tracking-[-0.03em]">
                <Link
                  to={`/docentes/${p.id}`}
                  className="outline-none after:absolute after:inset-0 hover:text-accent-ink"
                >
                  {p.name}
                </Link>
              </h3>
              {p.verified && <BadgeCheck size={16} className="text-accent" aria-label="Verificado" />}
              {rated && <BadgeTag badge={profBadge(p, score, wouldTakeAgain, count)} />}
            </div>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm text-sub">
              <span className="truncate">{p.dept}</span>
              <span className="inline-flex items-center gap-1">
                <MapPin size={13} aria-hidden />
                {p.sedes.map(getSedeName).join(", ")}
              </span>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <div className={cx("num display text-[clamp(2rem,4vw,3rem)]", !rated && "text-sub")}>{rated ? score.toFixed(1) : "—"}</div>
            <div className="text-xs text-sub">nota</div>
          </div>
          <FavoriteButton id={p.id} className="relative z-10 -mr-2 -mt-1" />
        </div>

        {p.courses.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Cursos">
            {p.courses.map((c) => (
              <li key={c} className="rounded-control bg-muted px-2 py-0.5 text-xs text-fg/80">
                {c}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 grid items-center gap-x-6 gap-y-3 sm:grid-cols-[auto_minmax(0,1fr)_auto_auto]">
          <div className="flex items-baseline gap-1.5">
            {rated ? (
              <>
                <Star size={14} className="self-center text-amber-400" fill="currentColor" strokeWidth={0} aria-hidden />
                <span className="num text-sm font-semibold">{plural(count, "reseña", "reseñas")}</span>
              </>
            ) : (
              <span className="text-sm text-sub">Sin reseñas aún</span>
            )}
          </div>
          <div className="min-w-0">
            {difficulty !== null ? <Difficulty value={difficulty} /> : <span className="text-xs text-sub">Dificultad: —</span>}
          </div>
          <span className="text-xs text-sub">
            <b className="num text-sm text-fg">{wouldTakeAgain !== null ? `${Math.round(wouldTakeAgain)}%` : "—"}</b> lo volvería a llevar
          </span>
          <Link
            to={`/docentes/${p.id}/resena`}
            className="btn-brand relative z-10 h-8 justify-self-start rounded-control px-3 text-xs sm:justify-self-end"
          >
            <PenLine size={14} /> Reseñar
          </Link>
        </div>
      </div>
    </article>
  );
}
