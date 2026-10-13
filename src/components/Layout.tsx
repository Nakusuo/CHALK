import { BookOpen, Building2, GitCompare, LogOut, Menu, Moon, Sun, UserRound, Users, X } from "lucide-react";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { allCourses, getProfessor } from "../data/db";
import { getTheme, setTheme, store, useStore } from "../lib/store";
import { AsideContext } from "./Aside";
import { cx, tint } from "./ui";

const NAV = [
  { to: "/docentes", label: "Docentes", icon: Users },
  { to: "/facultades", label: "Facultades", icon: Building2 },
  { to: "/cursos", label: "Cursos", icon: BookOpen },
  { to: "/comparar", label: "Comparar", icon: GitCompare },
  { to: "/perfil", label: "Perfil", icon: UserRound },
];

const COURSES = allCourses();

export function Logo({ to = "/docentes", compact }: { to?: string; compact?: boolean }) {
  return (
    <Link to={to} className="flex items-center gap-2.5 rounded-lg" aria-label="CHALK, ir al inicio">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand text-[15px] font-extrabold text-white">C</span>
      <span className={cx("text-[17px] font-extrabold tracking-tight", compact && "lg:hidden xl:inline")}>CHALK</span>
    </Link>
  );
}

export function ThemeToggle() {
  const [theme, set] = useState(getTheme);
  return (
    <button
      className="btn-ghost h-9 w-9 shrink-0 px-0 text-sub hover:text-fg"
      aria-label={theme === "dark" ? "Usar tema claro" : "Usar tema oscuro"}
      onClick={() => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        set(next);
      }}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

/** Cursos de los docentes guardados; si no hay, los cursos con más docentes. */
function useSidebarCourses() {
  const favorites = useStore((s) => s.favorites);
  return useMemo(() => {
    const mine = new Set(favorites.flatMap((id) => getProfessor(id)?.courses ?? []));
    const list = mine.size ? COURSES.filter((c) => mine.has(c.name)) : [...COURSES].sort((a, b) => b.profs.length - a.profs.length);
    return { title: mine.size ? "Mis cursos" : "Cursos", items: list.slice(0, 6) };
  }, [favorites]);
}

function NavItems({ rail }: { rail?: boolean }) {
  return (
    <ul className="space-y-1">
      {NAV.map(({ to, label, icon: Icon }) => (
        <li key={to}>
          <NavLink
            to={to}
            end={to !== "/docentes"}
            title={rail ? label : undefined}
            className={({ isActive }) =>
              cx(
                "flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors",
                rail && "lg:justify-center lg:px-0 xl:justify-start xl:px-3",
                isActive ? "bg-accent-soft text-accent-ink" : "text-sub hover:bg-muted hover:text-fg",
              )
            }
          >
            <Icon size={18} className="shrink-0" />
            <span className={cx(rail && "lg:sr-only xl:not-sr-only")}>{label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

function CourseList() {
  const { title, items } = useSidebarCourses();
  return (
    <div>
      <h2 className="mb-2 px-3 text-xs font-semibold text-sub">{title}</h2>
      <ul className="space-y-0.5">
        {items.map((c) => (
          <li key={c.name}>
            <Link
              to={`/cursos?q=${encodeURIComponent(c.name)}`}
              className="flex h-9 items-center gap-3 rounded-xl px-3 text-sm text-fg/85 transition-colors hover:bg-muted hover:text-fg"
            >
              <span className={cx("h-2 w-2 shrink-0 rounded-full", tint(c.name).dot)} aria-hidden />
              <span className="min-w-0 flex-1 truncate">{c.name}</span>
              {c.profs.length > 1 && (
                <span className="num text-xs text-sub" aria-label={`${c.profs.length} docentes`}>
                  {c.profs.length}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserChip({ rail }: { rail?: boolean }) {
  const user = useStore((s) => s.user)!;
  return (
    <div className={cx("flex items-center gap-1", rail && "lg:flex-col xl:flex-row")}>
      <Link
        to="/perfil"
        className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl p-1.5 transition-colors hover:bg-muted"
        title={rail ? user.name : undefined}
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-soft text-xs font-bold text-accent-ink">
          {user.initials}
        </span>
        <span className={cx("min-w-0 flex-1 truncate text-sm font-medium", rail && "lg:hidden xl:block")}>{user.name}</span>
      </Link>
      <ThemeToggle />
      <button
        className="btn-ghost h-9 w-9 shrink-0 px-0 text-sub hover:text-fg"
        aria-label="Cerrar sesión"
        title="Salir"
        onClick={store.logout}
      >
        <LogOut size={18} />
      </button>
    </div>
  );
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [slot, setSlot] = useState<HTMLElement | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[84px_minmax(0,1fr)] xl:grid-cols-[248px_minmax(0,1fr)]">
      {/* Barra lateral: riel de íconos en 1024–1279, completa desde 1280 */}
      <aside className="sticky top-0 hidden h-screen flex-col gap-8 px-4 py-6 lg:flex xl:px-5">
        <div className="lg:mx-auto xl:mx-0 xl:px-1">
          <Logo compact />
        </div>
        <nav aria-label="Principal">
          <NavItems rail />
        </nav>
        <div className="hidden min-h-0 overflow-y-auto no-scrollbar xl:block">
          <CourseList />
        </div>
        <div className="mt-auto">
          <UserChip rail />
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-2 bg-bg/95 px-4 lg:hidden">
          <Logo />
          <div className="ml-auto flex items-center gap-1">
            <ThemeToggle />
            <button className="btn-ghost h-9 w-9 px-0" aria-label="Menú" aria-expanded={open} onClick={() => setOpen(!open)}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </header>

        {open && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button className="absolute inset-0 bg-fg/30" aria-label="Cerrar menú" onClick={() => setOpen(false)} />
            <nav
              aria-label="Principal"
              className="absolute inset-y-0 left-0 flex w-[min(300px,85vw)] flex-col gap-8 overflow-y-auto bg-surface px-4 py-6 shadow-lift"
            >
              <div className="flex items-center justify-between px-1">
                <Logo />
                <button className="btn-ghost h-9 w-9 px-0" aria-label="Cerrar menú" onClick={() => setOpen(false)}>
                  <X size={18} />
                </button>
              </div>
              <NavItems />
              <CourseList />
              <div className="mt-auto">
                <UserChip />
              </div>
            </nav>
          </div>
        )}

        <div className="mx-auto grid w-full max-w-[1240px] gap-6 px-4 pb-16 pt-4 sm:px-6 lg:pt-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:has-[>aside:empty]:grid-cols-1">
          <main className="min-w-0">
            <AsideContext.Provider value={slot}>
              <Suspense fallback={<div className="py-24 text-center text-sm text-sub">Cargando…</div>}>
                <Outlet />
              </Suspense>
            </AsideContext.Provider>
          </main>
          <aside ref={setSlot} aria-label="Contexto" className="min-w-0 space-y-5 empty:hidden" />
        </div>
        <footer className="px-4 pb-8 text-center text-xs text-sub">
          CHALK · Comunidad docente UTP · Reseñas guardadas en tu navegador
        </footer>
      </div>
    </div>
  );
}
