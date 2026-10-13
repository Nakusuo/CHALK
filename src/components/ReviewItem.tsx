import { Pencil, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Review } from "../data/types";
import { store, useStore } from "../lib/store";
import { toast } from "./Toast";
import { Avatar, cx, Stars, Tag } from "./ui";

export default function ReviewItem({ r, showProf, readOnly }: { r: Review; showProf?: string; readOnly?: boolean }) {
  const voted = useStore((s) => !!s.helpful[r.id]);
  const mine = r.id.startsWith("user-");
  return (
    <article className="card p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <Avatar size={38} className="bg-accent-soft text-xs text-accent-ink">
          {r.initials}
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 text-sm">
            <b>{r.user}</b>
            {mine && <span className="rounded-full bg-accent-soft px-2 text-[11px] font-semibold text-accent-ink">Tú</span>}
            <span className="text-sub">· {r.date}</span>
          </div>
          <div className="mt-0.5 text-xs text-sub">
            {showProf ? `${showProf} · ` : ""}
            {r.course}
          </div>
        </div>
        <Stars value={r.score} size={13} />
      </div>
      {r.text && <p className="mt-3 max-w-[70ch] text-[15px] leading-relaxed">{r.text}</p>}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {r.tags.map((t, i) => (
          <Tag key={t} type={r.tagType[i]}>
            {t}
          </Tag>
        ))}
        {r.wouldTakeAgain !== null && (
          <span className="inline-flex items-center gap-1 text-xs text-sub">
            {r.wouldTakeAgain ? <ThumbsUp size={12} /> : <ThumbsDown size={12} />}
            {r.wouldTakeAgain ? "Lo volvería a llevar" : "No lo volvería a llevar"}
          </span>
        )}
        {!readOnly && (
          <div className="ml-auto flex items-center gap-1">
            {mine && (
              <Link to={`/docentes/${r.profId}/resena?edit=${r.id}`} className="btn-ghost h-8 px-2 text-xs text-sub">
                <Pencil size={14} /> Editar
              </Link>
            )}
            {mine && (
              <button
                className="btn-ghost h-8 px-2 text-xs text-sub"
                onClick={() => {
                  store.deleteReview(r.id);
                  toast("Reseña borrada", { label: "Deshacer", onClick: () => store.restoreReview(r) });
                }}
              >
                <Trash2 size={14} /> Borrar
              </button>
            )}
            <button
              className={cx("btn-ghost h-8 px-2 text-xs", voted ? "text-accent-ink" : "text-sub")}
              aria-pressed={voted}
              onClick={() => store.toggleHelpful(r.id)}
            >
              <ThumbsUp size={14} fill={voted ? "currentColor" : "none"} /> Útil ·{" "}
              <span className="num">{r.helpful + (voted ? 1 : 0)}</span>
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
