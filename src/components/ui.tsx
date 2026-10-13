import { Star } from "lucide-react";
import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
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
        "num grid shrink-0 place-items-center rounded-control font-bold",
        t === null && "bg-muted text-sub",
        t === "good" && "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
        t === "warn" && "bg-amber-500/10 text-amber-700 dark:text-amber-300",
        t === "bad" && "bg-red-500/10 text-red-700 dark:text-red-300",
        size === "md" ? "h-12 w-12 text-lg" : "h-20 w-20 text-3xl rounded-card",
      )}
    >
      {score === null ? "—" : score.toFixed(1)}
    </div>
  );
}

export function Meter({ value, max = 5, tone }: { value: number; max?: number; tone?: keyof typeof toneBg }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div
        className={cx("grow-x h-full rounded-full", tone ? toneBg[tone] : "bg-accent")}
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
    top: "bg-[#C3B79D]/35 text-[#4A3F27] dark:text-[#C3B79D]",
    trending: "bg-accent-soft text-accent-ink",
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

const reducedMotion = () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Cuenta desde 0 hasta la cifra del texto ("4.6", "86%", "1,234") la primera vez que entra en pantalla.
 *  Sin IntersectionObserver o con movimiento reducido muestra el valor final desde el inicio. */
export function CountUp({ value }: { value: string }) {
  const m = value.match(/^(\D*)([\d.,]+)(\D*)$/);
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const canAnimate = !!m && typeof IntersectionObserver !== "undefined" && !reducedMotion();

  useLayoutEffect(() => {
    if (canAnimate && m) setShown(m[1] + m[2].replace(/\d/g, "0") + m[3]);
    else setShown(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (!canAnimate || !m || !ref.current) return;
    const raw = m[2];
    const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
    const target = Number(raw.replace(/,/g, ""));
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - start) / 900);
        const eased = 1 - Math.pow(2, -10 * k);
        const n = k === 1 ? target : target * eased;
        const txt = decimals ? n.toFixed(decimals) : Math.round(n).toLocaleString("es-PE");
        setShown(m[1] + txt + m[3]);
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden>{shown}</span>
    </span>
  );
}

export function Stat({ label, value, hint, children, compact }: { label: string; value: ReactNode; hint?: ReactNode; children?: ReactNode; compact?: boolean }) {
  const v = typeof value === "number" ? String(value) : value;
  return (
    <div className={cx("rule flex min-w-0 flex-col bg-transparent", compact ? "pt-2 sm:pt-3" : "pt-3")}>
      <div className={cx("truncate font-semibold text-fg", compact ? "text-xs sm:text-sm" : "text-sm")}>{label}</div>
      <div
        className={cx(
          "num display mt-2",
          compact ? "text-[clamp(1.75rem,7vw,4.5rem)]" : "text-[clamp(2.5rem,5vw,4.5rem)]",
        )}
      >
        {typeof v === "string" ? <CountUp value={v} /> : v}
      </div>
      {hint && <div className={cx("mt-2 text-xs text-sub", compact && "hidden sm:block")}>{hint}</div>}
      {children && <div className={cx("mt-auto pt-4", compact && "hidden sm:block")}>{children}</div>}
    </div>
  );
}

const TINTS = [
  { bg: "bg-[#F3E6E4] text-[#630000] dark:bg-[#2C2929] dark:text-[#FF8A80]", dot: "bg-[#810100] dark:bg-[#C1272D]" },
  { bg: "bg-[#EBD9D6] text-[#630000] dark:bg-[#2C2929] dark:text-[#F3B3AC]", dot: "bg-[#630000] dark:bg-[#F3B3AC]" },
  { bg: "bg-[#E4E1DF] text-[#1B1717] dark:bg-[#2C2929] dark:text-[#EDEBDD]", dot: "bg-[#1B1717] dark:bg-[#EDEBDD]" },
  { bg: "bg-[#EDEBDD] text-[#5A4E33] dark:bg-[#2C2929] dark:text-[#C3B79D]", dot: "bg-[#C3B79D]" },
  { bg: "bg-[#F0EDEB] text-[#4A4443] dark:bg-[#2C2929] dark:text-[#DCD7D4]", dot: "bg-[#DCD7D4] dark:bg-[#A9A19E]" },
  { bg: "bg-[#DCD7D4] text-[#2C2929] dark:bg-[#2C2929] dark:text-[#A9A19E]", dot: "bg-[#2C2929] dark:bg-[#6E6664]" },
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
        <h1 className="display text-[clamp(2.25rem,5vw,4rem)]">{title}</h1>
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
