/* ============================================================
   CHALK · components.js — Componentes compartidos entre páginas
   Renderiza topbar (guest / autenticado), logo SVG mejorado,
   gauges, sparklines y utilidades de auth.
   ============================================================ */

const components = (() => {

    /* ── Logo SVG inline (tiza estilizada) ────────────────── */

    function _logoSvg() {
        return `
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="28" height="28" rx="7" fill="url(#chalk-grad)"/>
                <path d="M8 20L18 8" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M18 8L20 6" stroke="white" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                <circle cx="8" cy="20" r="1.5" fill="white" opacity="0.4"/>
                <defs>
                    <linearGradient id="chalk-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#C8102E"/>
                        <stop offset="1" stop-color="#9E0B23"/>
                    </linearGradient>
                </defs>
            </svg>
        `;
    }

    function _logoHtml(href) {
        return `
            <a class="logo" href="${href}" style="text-decoration:none">
                <span class="logo-icon">${_logoSvg()}</span>
                <span class="logo-text">Ch<span class="logo-accent">a</span>lk</span>
                <span class="logo-badge">UTP</span>
            </a>
        `;
    }

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
                    ${_logoHtml("index.html")}
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
                    ${_logoHtml("home.html")}
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
                    <div class="subnav-link" data-fac="ing" onclick="home.filterByFac('ing')">⚙️ Ingeniería</div>
                    <div class="subnav-link" data-fac="neg" onclick="home.filterByFac('neg')">📈 Negocios</div>
                    <div class="subnav-link" data-fac="salud" onclick="home.filterByFac('salud')">🏥 Salud</div>
                    <div class="subnav-link" data-fac="derecho" onclick="home.filterByFac('derecho')">⚖️ Derecho</div>
                    <div class="subnav-right">🏆 Ranking ciclo 2025-I</div>
                </div>
            </div>
        `;
    }

    /* ── Gauge circular SVG ──────────────────────────────── */

    /**
     * Genera un gauge circular SVG.
     * @param {number} value — Valor actual (0-max)
     * @param {number} max — Valor máximo
     * @param {number} size — Tamaño en px
     * @param {string} color — Color del arco
     * @param {string} label — Texto debajo del valor
     * @returns {string}
     */
    function gauge(value, max, size = 80, color = "var(--utp-red)", label = "") {
        const r = (size - 8) / 2;
        const circumference = 2 * Math.PI * r;
        const pct = Math.min(value / max, 1);
        const offset = circumference * (1 - pct);

        return `
            <div class="gauge-wrap" style="width:${size}px;height:${size}px;">
                <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="transform:rotate(-90deg)">
                    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none"
                            stroke="var(--gray-100)" stroke-width="5"/>
                    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none"
                            stroke="${color}" stroke-width="5"
                            stroke-dasharray="${circumference}"
                            stroke-dashoffset="${offset}"
                            stroke-linecap="round"
                            style="transition:stroke-dashoffset 1s cubic-bezier(.25,.8,.25,1)"/>
                </svg>
                <div class="gauge-label">
                    <div class="gauge-val" style="color:${color}">${typeof value === 'number' ? (value % 1 === 0 ? value : value.toFixed(1)) : value}</div>
                    ${label ? `<div class="gauge-sub">${label}</div>` : ""}
                </div>
            </div>
        `;
    }

    /**
     * Genera un mini sparkline de barras.
     * @param {Array} data — Array de { label, value }
     * @param {number} maxVal — Valor máximo para escalar
     * @param {number} height — Altura en px
     * @returns {string}
     */
    function sparkline(data, maxVal = 5, height = 36) {
        if (!data || data.length === 0) return "";
        return `
            <div class="sparkline-wrap" style="height:${height}px" title="${data.map(d => `${d.label}: ${d.value}`).join(' | ')}">
                ${data.map((d, i) => {
                    const h = Math.max(4, (d.value / maxVal) * height);
                    const isLast = i === data.length - 1;
                    return `<div class="sparkline-bar" style="height:${h}px;${isLast ? 'opacity:1;background:var(--utp-red)' : ''}" data-tooltip="${d.label}: ${d.value}"></div>`;
                }).join("")}
            </div>
        `;
    }

    /**
     * Genera badge dinámico HTML.
     * @param {Object} badge — { type, label, icon }
     * @returns {string}
     */
    function badgeHtml(badge) {
        if (!badge) return "";
        return `<span class="badge-dynamic badge-${badge.type}">${badge.icon} ${badge.label}</span>`;
    }

    /**
     * Genera barra de dificultad inline.
     * @param {number} diff — 1 a 5
     * @returns {string}
     */
    function difficultyBar(diff) {
        const pct = (diff / 5) * 100;
        const color = DB.getDifficultyColor(diff);
        const label = DB.getDifficultyLabel(diff);
        return `
            <div style="display:flex;align-items:center;gap:8px;">
                <div class="progress-bar" style="flex:1;height:4px;">
                    <div class="progress-fill" style="width:${pct}%;background:${color};"></div>
                </div>
                <span style="font-size:11px;font-weight:600;color:${color};font-family:var(--font-mono);min-width:20px;">${diff.toFixed(1)}</span>
                <span style="font-size:10px;color:var(--color-text-muted);">${label}</span>
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

    /* ── Animación: contador numérico ────────────────────── */

    /**
     * Anima un número desde 0 hasta el valor target.
     * @param {HTMLElement} el — Elemento a animar
     * @param {number} target — Valor final
     * @param {number} duration — Duración en ms
     * @param {string} suffix — Sufijo (ej: "%", "/5")
     * @param {number} decimals — Cantidad de decimales
     */
    function animateNumber(el, target, duration = 1000, suffix = "", decimals = 0) {
        if (!el) return;
        const start = performance.now();
        const update = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const current = target * eased;
            el.textContent = current.toFixed(decimals) + suffix;
            if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    }

    /* ── API pública ─────────────────────────────────────── */

    return {
        renderTopbar, requireAuth, redirectIfAuth, getUrlParam,
        gauge, sparkline, badgeHtml, difficultyBar, animateNumber,
    };
})();
