import { Star } from "lucide-react";
import type { ReactNode } from "react";
import type { Badge as BadgeT } from "../data/db";
import { difficultyLabel, difficultyTone } from "../data/db";

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value.toFixed(1)} de 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i + 1));
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star size={size} className="absolute inset-0 text-line" fill="currentColor" strokeWidth={0} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star size={size} className="text-amber-400" fill="currentColor" strokeWidth={0} />
            </span>
          </span>
        );
      })}
    </span>
  );
}

const toneClass = {
  good: "text-emerald-600 dark:text-emerald-400",
  warn: "text-amber-600 dark:text-amber-400",
  bad: "text-red-600 dark:text-red-400",
};
const toneBg = { good: "bg-emerald-500", warn: "bg-amber-500", bad: "bg-red-500" };

export function scoreTone(score: number) {
  return score >= 4.3 ? "good" : score >= 3.5 ? "warn" : "bad";
}

export function ScorePill({ score, size = "md" }: { score: number | null; size?: "md" | "lg" }) {
  const t = score === null ? null : scoreTone(score);
  return (
    <div
      className={cx(
        "grid place-items-center rounded-xl font-mono font-bold",
        t === null && "bg-muted text-sub",
        t === "good" && "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
        t === "warn" && "bg-amber-500/10 text-amber-700 dark:text-amber-300",
        t === "bad" && "bg-red-500/10 text-red-700 dark:text-red-300",
        size === "md" ? "h-12 w-12 text-lg" : "h-20 w-20 text-3xl rounded-2xl",
      )}
    >
      {score === null ? "—" : score.toFixed(1)}
    </div>
  );
}

export function Meter({ value, max = 5, tone }: { value: number; max?: number; tone?: keyof typeof toneBg }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div
        className={cx("h-full rounded-full transition-[width] duration-700 ease-out", tone ? toneBg[tone] : "bg-brand")}
        style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
      />
    </div>
  );
}

export function Difficulty({ value }: { value: number }) {
  const t = difficultyTone(value);
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1">
        <Meter value={value} tone={t} />
      </div>
      <span className={cx("font-mono text-xs font-bold", toneClass[t])}>{value.toFixed(1)}</span>
      <span className="text-xs text-sub">{difficultyLabel(value)}</span>
    </div>
  );
}

export function BadgeTag({ badge }: { badge: BadgeT | null }) {
  if (!badge) return null;
  const cls = {
    top: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    trending: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
    recommended: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  }[badge.type];
  return <span className={cx("rounded-md px-2 py-0.5 text-[11px] font-semibold", cls)}>{badge.label}</span>;
}

export function Tag({ children, type = "neu" }: { children: ReactNode; type?: string }) {
  const cls =
    type === "pos"
      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
      : type === "neg"
        ? "bg-red-500/10 text-red-700 dark:text-red-300"
        : "bg-muted text-sub";
  return <span className={cx("rounded-md px-2 py-0.5 text-xs font-medium", cls)}>{children}</span>;
}

export function Avatar({ children, size = 40, className }: { children: ReactNode; size?: number; className?: string }) {
  return (
    <div
      className={cx("grid shrink-0 place-items-center rounded-xl bg-muted font-semibold", className)}
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      {children}
    </div>
  );
}

export function Stat({ label, value, hint }: { label: string; value: ReactNode; hint?: ReactNode }) {
  return (
    <div className="card p-4">
      <div className="eyebrow">{label}</div>
      <div className="mt-1 text-2xl font-bold tracking-tight">{value}</div>
      {hint && <div className="mt-0.5 text-xs text-sub">{hint}</div>}
    </div>
  );
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-sub">{subtitle}</p>}
      </div>
      {actions}
    </div>
  );
}

export function Empty({ icon, title, children }: { icon: ReactNode; title: string; children?: ReactNode }) {
  return (
    <div className="card flex flex-col items-center px-6 py-14 text-center">
      <div className="mb-3 text-sub">{icon}</div>
      <div className="font-semibold">{title}</div>
      {children && <div className="mt-1 max-w-sm text-sm text-sub">{children}</div>}
    </div>
  );
}
