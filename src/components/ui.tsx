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
        "num grid shrink-0 place-items-center rounded-xl font-bold",
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
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted motion-reduce:[&>div]:transition-none">
      <div
        className={cx("h-full rounded-full transition-[width] duration-700 ease-out", tone ? toneBg[tone] : "bg-accent")}
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
      <span className={cx("num text-xs font-bold", toneClass[t])}>{value.toFixed(1)}</span>
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
      className={cx("grid shrink-0 place-items-center rounded-full bg-muted font-semibold text-sub", className)}
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      {children}
    </div>
  );
}

export function Stat({
  label,
  value,
  hint,
  children,
  compact,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className={cx("card flex min-w-0 flex-col", compact ? "p-3 sm:p-5" : "p-5")}>
      <div className={cx("truncate font-medium text-sub", compact ? "text-xs sm:text-sm" : "text-sm")}>{label}</div>
      <div className={cx("num font-bold tracking-tight", compact ? "mt-1 text-2xl sm:mt-2 sm:text-4xl" : "mt-2 text-4xl")}>{value}</div>
      {hint && <div className={cx("mt-1 text-xs text-sub", compact && "hidden sm:block")}>{hint}</div>}
      {children && <div className={cx("mt-auto pt-4", compact && "hidden sm:block")}>{children}</div>}
    </div>
  );
}

const TINTS = [
  { bg: "bg-violet-100 text-violet-800 dark:bg-violet-400/20 dark:text-violet-100", dot: "bg-violet-500" },
  { bg: "bg-sky-100 text-sky-800 dark:bg-sky-400/20 dark:text-sky-100", dot: "bg-sky-500" },
  { bg: "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/20 dark:text-emerald-100", dot: "bg-emerald-500" },
  { bg: "bg-amber-100 text-amber-900 dark:bg-amber-400/20 dark:text-amber-100", dot: "bg-amber-500" },
  { bg: "bg-rose-100 text-rose-800 dark:bg-rose-400/20 dark:text-rose-100", dot: "bg-rose-500" },
  { bg: "bg-teal-100 text-teal-800 dark:bg-teal-400/20 dark:text-teal-100", dot: "bg-teal-500" },
];

/** Tono estable por facultad/departamento (misma entrada → mismo color). */
export function tint(key: string) {
  let h = 0;
  for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return TINTS[h % TINTS.length];
}

/** "Ronald Angel Ayra Pinto" → "RA": primer nombre + primer apellido. */
export function initialsOf(name: string) {
  const w = name.trim().split(/\s+/).filter(Boolean);
  if (!w.length) return "?";
  const last = w.length >= 4 ? w[w.length - 2] : w.length === 3 ? w[1] : w[w.length - 1];
  return (w[0][0] + (w.length > 1 ? last[0] : "")).toUpperCase();
}

export function Monogram({ name, tone, size = 44, className }: { name: string; tone: string; size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={cx("grid shrink-0 select-none place-items-center rounded-full font-semibold", tint(tone).bg, className)}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
    >
      {initialsOf(name)}
    </span>
  );
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 pt-2">
      <div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-[34px]">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-sub">{subtitle}</p>}
      </div>
      {actions}
    </div>
  );
}

export function Empty({ icon, title, children }: { icon: ReactNode; title: string; children?: ReactNode }) {
  return (
    <div className="card flex flex-col items-center px-6 py-14 text-center">
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-accent-soft text-accent-ink">{icon}</div>
      <div className="font-semibold">{title}</div>
      {children && <div className="mt-1 max-w-sm text-sm text-sub">{children}</div>}
    </div>
  );
}
