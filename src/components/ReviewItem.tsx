import { ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import type { Review } from "../data/types";
import { store, useStore } from "../lib/store";
import { toast } from "./Toast";
import { Avatar, cx, Stars, Tag } from "./ui";

export default function ReviewItem({ r, showProf, readOnly }: { r: Review; showProf?: string; readOnly?: boolean }) {
  const voted = useStore((s) => !!s.helpful[r.id]);
  const mine = r.id.startsWith("user-");
  return (
    <article className="border-b border-line py-5 last:border-0">
      <div className="flex items-start gap-3">
        <Avatar size={36} className="text-xs">
          {r.initials}
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 text-sm">
            <b>{r.user}</b>
            {mine && <span className="rounded bg-brand/10 px-1.5 text-[10px] font-bold text-brand">TÚ</span>}
            <span className="text-sub">· {r.date}</span>
          </div>
          <div className="mt-0.5 text-xs text-sub">
            {showProf ? `${showProf} · ` : ""}
            {r.course}
          </div>
        </div>
        <Stars value={r.score} size={13} />
      </div>
      {r.text && <p className="mt-3 text-sm leading-relaxed">{r.text}</p>}
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
              className={cx("btn-ghost h-8 px-2 text-xs", voted ? "text-brand" : "text-sub")}
              aria-pressed={voted}
              onClick={() => store.toggleHelpful(r.id)}
            >
              <ThumbsUp size={14} fill={voted ? "currentColor" : "none"} /> Útil · {r.helpful + (voted ? 1 : 0)}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
