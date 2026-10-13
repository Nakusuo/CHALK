import { LogOut, Menu, Moon, Sun, X } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { getTheme, setTheme, store, useStore } from "../lib/store";
import { cx } from "./ui";

const NAV = [
  { to: "/docentes", label: "Docentes" },
  { to: "/facultades", label: "Facultades" },
  { to: "/cursos", label: "Cursos" },
  { to: "/comparar", label: "Comparar" },
];

export function Logo({ to = "/docentes" }: { to?: string }) {
  return (
    <Link to={to} className="flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand font-mono text-sm font-bold text-white">C</span>
      <span className="text-base font-extrabold tracking-tight">CHALK</span>
    </Link>
  );
}

export function ThemeToggle() {
  const [theme, set] = useState(getTheme);
  return (
    <button
      className="btn-ghost h-9 w-9 px-0"
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

export default function Layout() {
  const user = useStore((s) => s.user)!;
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  const link = ({ isActive }: { isActive: boolean }) =>
    cx("rounded-lg px-3 py-2 text-sm font-medium transition", isActive ? "bg-muted text-fg" : "text-sub hover:text-fg");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to !== "/docentes"} className={link}>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <ThemeToggle />
            <Link to="/perfil" className="hidden items-center gap-2 rounded-xl py-1 pl-1 pr-3 hover:bg-muted sm:flex">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand/10 text-xs font-bold text-brand">{user.initials}</span>
              <span className="max-w-[140px] truncate text-sm font-medium">{user.name}</span>
            </Link>
            <button className="btn-ghost hidden h-9 w-9 px-0 sm:inline-flex" aria-label="Cerrar sesión" onClick={store.logout}>
              <LogOut size={18} />
            </button>
            <button className="btn-ghost h-9 w-9 px-0 md:hidden" aria-label="Menú" aria-expanded={open} onClick={() => setOpen(!open)}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="border-t border-line px-4 py-3 md:hidden">
            {[...NAV, { to: "/perfil", label: "Mi perfil" }].map((n) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => cx(link({ isActive }), "block")}>
                {n.label}
              </NavLink>
            ))}
            <button className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-sub" onClick={store.logout}>
              Cerrar sesión
            </button>
          </nav>
        )}
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Suspense fallback={<div className="py-24 text-center text-sm text-sub">Cargando…</div>}>
          <Outlet />
        </Suspense>
      </main>
      <footer className="border-t border-line py-8 text-center text-xs text-sub">
        CHALK · Comunidad docente UTP · Reseñas guardadas en tu navegador
      </footer>
    </div>
  );
}
