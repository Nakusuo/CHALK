/* ============================================================
   CHALK · components.js — Componentes compartidos entre páginas
   Renderiza topbar (guest / autenticado) y utilidades de auth.
   ============================================================ */

const components = (() => {

    /* ── Renderizar topbar ───────────────────────────────── */

    /**
     * Renderiza la barra de navegación superior.
     * @param {'guest'|'home'|'professor'|'review'} page
     */
    function renderTopbar(page) {
        const container = document.getElementById("topbar-container");
        if (!container) return;

        const user = store.getUser();

        if (!user || page === "guest") {
            container.innerHTML = _guestTopbar();
        } else {
            container.innerHTML = _authTopbar(user, page);
        }
    }

    /* ── Topbar para visitantes (login/register) ─────────── */

    function _guestTopbar() {
        return `
            <div class="topbar">
                <div class="topbar-inner">
                    <a class="logo" href="index.html" style="text-decoration:none">
                        Ch<span class="logo-accent">a</span>lk
                        <span class="logo-badge">UTP</span>
                    </a>
                    <div class="nav-right">
                        <a class="nav-btn" href="index.html" style="text-decoration:none">Iniciar sesión</a>
                        <a class="nav-btn primary" href="register.html" style="text-decoration:none">Registrarse</a>
                    </div>
                </div>
            </div>
        `;
    }

    /* ── Topbar para usuarios autenticados ────────────────── */

    function _authTopbar(user, page) {
        return `
            <div class="topbar">
                <div class="topbar-inner">
                    <a class="logo" href="home.html" style="text-decoration:none">
                        Ch<span class="logo-accent">a</span>lk
                        <span class="logo-badge">UTP</span>
                    </a>
                    <div class="nav-links">
                        <a class="nav-link ${page === "home" ? "active" : ""}" href="home.html" style="text-decoration:none">Docentes</a>
                        <span class="nav-link">Facultades</span>
                        <span class="nav-link">Cursos</span>
                        <span class="nav-link">Comparar</span>
                    </div>
                    <div class="nav-right">
                        <div class="user-chip">
                            <div class="user-av">${user.initials || "U"}</div>
                            <span class="user-name-text">${user.name || ""}</span>
                        </div>
                        <button class="nav-btn" onclick="auth.logout()">Salir</button>
                    </div>
                </div>
            </div>
            ${page === "home" ? _subnav() : ""}
        `;
    }

    /* ── Sub-navegación de facultades (solo en home) ──────── */

    function _subnav() {
        return `
            <div class="subnav">
                <div class="subnav-inner">
                    <div class="subnav-link active" data-fac="all" onclick="home.filterByFac('all')">Todos</div>
                    <div class="subnav-link" data-fac="ing" onclick="home.filterByFac('ing')">Ingeniería</div>
                    <div class="subnav-link" data-fac="neg" onclick="home.filterByFac('neg')">Negocios</div>
                    <div class="subnav-link" data-fac="salud" onclick="home.filterByFac('salud')">Salud</div>
                    <div class="subnav-link" data-fac="derecho" onclick="home.filterByFac('derecho')">Derecho</div>
                    <div class="subnav-right">⭐ Top ciclo 2025-I</div>
                </div>
            </div>
        `;
    }

    /* ── Guardia de autenticación ─────────────────────────── */

    /**
     * Verifica que el usuario esté logueado.
     * Si no lo está, redirige a index.html.
     * @returns {Object|null} El usuario o null si redirige
     */
    function requireAuth() {
        const user = store.getUser();
        if (!user) {
            window.location.href = "index.html";
            return null;
        }
        return user;
    }

    /**
     * Si ya hay sesión activa, redirige al home.
     * Útil para las páginas de login/register.
     * @returns {boolean} true si redirigió
     */
    function redirectIfAuth() {
        if (store.getUser()) {
            window.location.href = "home.html";
            return true;
        }
        return false;
    }

    /* ── Utilidad: leer param de URL ─────────────────────── */

    /**
     * Lee un parámetro de la URL actual.
     * @param {string} name
     * @returns {string|null}
     */
    function getUrlParam(name) {
        return new URLSearchParams(window.location.search).get(name);
    }

    /* ── API pública ─────────────────────────────────────── */

    return { renderTopbar, requireAuth, redirectIfAuth, getUrlParam };
})();
