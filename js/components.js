/* ============================================================
   CHALK · components.js — Componentes compartidos
   Logo SVG, topbar, gauges, sparklines, badges, comparador.
   ============================================================ */

const components = (() => {

    /* ── Logo con imagen CHALK.png ────────────────────────── */
    function _logoHtml(href) {
        return `
            <a class="logo" href="${href}" style="text-decoration:none">
                <img class="logo-img" src="CHALK.png" alt="Chalk UTP" />
            </a>
        `;
    }

    /* ── Renderizar topbar ───────────────────────────────── */
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

    function _authTopbar(user, page) {
        return `
            <div class="topbar">
                <div class="topbar-inner">
                    ${_logoHtml("home.html")}
                    <div class="nav-links">
                        <a class="nav-link ${page === "home" ? "active" : ""}" href="home.html" style="text-decoration:none">Docentes</a>
                        <a class="nav-link ${page === "facultades" ? "active" : ""}" href="facultades.html" style="text-decoration:none">Facultades</a>
                        <a class="nav-link ${page === "cursos" ? "active" : ""}" href="cursos.html" style="text-decoration:none">Cursos</a>
                        <a class="nav-link ${page === "compare" ? "active" : ""}" href="compare.html" style="text-decoration:none">Comparar</a>
                    </div>
                    <div class="nav-right">
                        <a class="user-chip" href="profile.html" style="text-decoration:none">
                            <div class="user-av">${user.initials || "U"}</div>
                            <span class="user-name-text">${user.name || ""}</span>
                        </a>
                        <button class="nav-btn" onclick="auth.logout()">Salir</button>
                    </div>
                </div>
            </div>
            ${page === "home" ? _subnav() : ""}
        `;
    }

    function _subnav() {
        return `
            <div class="subnav">
                <div class="subnav-inner">
                    <div class="subnav-link active" data-fac="all" onclick="home.filterByFac('all')">Todos</div>
                    ${DB.faculties.map(f => `
                        <div class="subnav-link" data-fac="${f.id}" onclick="home.filterByFac('${f.id}')">${f.icon} ${f.name}</div>
                    `).join("")}
                    <div class="subnav-right">🏆 Ranking ciclo 2025-I</div>
                </div>
            </div>
        `;
    }

    /* ── Gauge circular SVG ──────────────────────────────── */
    function gauge(value, max, size = 80, color = "var(--utp-red)", label = "") {
        const r = (size - 8) / 2;
        const circumference = 2 * Math.PI * r;
        const pct = Math.min(value / max, 1);
        const offset = circumference * (1 - pct);
        return `
            <div class="gauge-wrap" style="width:${size}px;height:${size}px;">
                <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="transform:rotate(-90deg)">
                    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--gray-100)" stroke-width="5"/>
                    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="5"
                            stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" stroke-linecap="round"
                            style="transition:stroke-dashoffset 1s cubic-bezier(.25,.8,.25,1)"/>
                </svg>
                <div class="gauge-label">
                    <div class="gauge-val" style="color:${color}">${typeof value === 'number' ? (value % 1 === 0 ? value : value.toFixed(1)) : value}</div>
                    ${label ? `<div class="gauge-sub">${label}</div>` : ""}
                </div>
            </div>
        `;
    }

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

    function badgeHtml(badge) {
        if (!badge) return "";
        return `<span class="badge-dynamic badge-${badge.type}">${badge.icon} ${badge.label}</span>`;
    }

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

    /* ── Auth helpers ─────────────────────────────────────── */
    function requireAuth() {
        const user = store.getUser();
        if (!user) { window.location.href = "index.html"; return null; }
        return user;
    }

    function redirectIfAuth() {
        if (store.getUser()) { window.location.href = "home.html"; return true; }
        return false;
    }

    function getUrlParam(name) {
        return new URLSearchParams(window.location.search).get(name);
    }

    function animateNumber(el, target, duration = 1000, suffix = "", decimals = 0) {
        if (!el) return;
        const start = performance.now();
        const update = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            el.textContent = current.toFixed(decimals) + suffix;
            if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    }

    return {
        renderTopbar, requireAuth, redirectIfAuth, getUrlParam,
        gauge, sparkline, badgeHtml, difficultyBar, animateNumber,
    };
})();
