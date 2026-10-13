import { BadgeCheck, Bookmark, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { getSedeName, profBadge, profStats } from "../data/db";
import type { Professor } from "../data/types";
import { store, useStore } from "../lib/store";
import { Avatar, BadgeTag, cx, Difficulty, ScorePill, Stars } from "./ui";

export function FavoriteButton({ id, className }: { id: number; className?: string }) {
  const fav = useStore((s) => s.favorites.includes(id));
  return (
    <button
      className={cx("btn-ghost h-9 w-9 px-0", fav && "text-brand", className)}
      aria-label={fav ? "Quitar de guardados" : "Guardar docente"}
      aria-pressed={fav}
      onClick={(e) => {
        e.preventDefault();
        store.toggleFavorite(id);
      }}
    >
      <Bookmark size={18} fill={fav ? "currentColor" : "none"} />
    </button>
  );
}

export default function ProfessorCard({ p, rank }: { p: Professor; rank?: number }) {
  const reviews = useStore((s) => s.reviews);
  const { score, count } = profStats(p, reviews);
  return (
    <Link to={`/docentes/${p.id}`} className="card group flex gap-4 p-4 transition hover:-translate-y-0.5 hover:border-fg/20 sm:p-5">
      <Avatar size={48}>{p.emoji}</Avatar>
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              {rank !== undefined && <span className="font-mono text-xs text-sub">#{rank}</span>}
              <h3 className="font-semibold group-hover:text-brand">{p.name}</h3>
              {p.verified && <BadgeCheck size={16} className="text-sky-500" aria-label="Verificado" />}
              <BadgeTag badge={profBadge(p, score)} />
            </div>
            <div className="mt-0.5 truncate text-sm text-sub">{p.dept}</div>
          </div>
          <FavoriteButton id={p.id} className="-mr-2 -mt-1" />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-sub">
          <span className="inline-flex items-center gap-1.5">
            <Stars value={score} size={12} /> {count} reseñas
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin size={12} />
            {p.sedes.map(getSedeName).join(", ")}
          </span>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <Difficulty value={p.difficulty} />
          <span className="text-xs text-sub">
            <b className="text-fg">{p.wouldTakeAgain}%</b> lo volvería a llevar
          </span>
        </div>
      </div>
      <div className="hidden sm:block">
        <ScorePill score={score} />
      </div>
    </Link>
  );
}
