/* ============================================================
   CHALK · home.js — Dashboard principal con filtros avanzados
   Filtros: facultad, sede, curso, tags, ordenamiento, búsqueda.
   ============================================================ */

const home = (() => {
    let activeFac  = "all";
    let activeSede = "all";
    let activeTag  = "all";
    let sortBy     = "score";

    /* ── Inicialización ──────────────────────────────────── */
    function init() {
        _renderHeroStats();
        _renderSidebar();
        _renderFilterChips();
        _renderSortControls();
        render();
    }

    /* ── Hero Stats ──────────────────────────────────────── */
    function _renderHeroStats() {
        const el = document.getElementById("hero-stats");
        if (!el) return;
        const stats = DB.getGlobalStats();
        el.innerHTML = `
            <div class="hero-stat fadein stagger-1">
                <div class="hero-stat-icon">👥 <span>Docentes registrados</span></div>
                <div class="hero-stat-val" id="stat-profs">0</div>
                <div class="hero-stat-sub">En ${DB.sedes.length} sedes a nivel nacional</div>
            </div>
            <div class="hero-stat fadein stagger-2">
                <div class="hero-stat-icon">💬 <span>Total reseñas</span></div>
                <div class="hero-stat-val accent" id="stat-reviews">0</div>
                <div class="hero-stat-sub">De estudiantes UTP verificados</div>
            </div>
            <div class="hero-stat fadein stagger-3">
                <div class="hero-stat-icon">⭐ <span>Calificación promedio</span></div>
                <div class="hero-stat-val" id="stat-avg">0.0</div>
                <div class="hero-stat-sub">Escala de 5.0</div>
            </div>
            <div class="hero-stat fadein stagger-4">
                <div class="hero-stat-icon">📊 <span>Tasa de aprobación</span></div>
                <div class="hero-stat-val accent" id="stat-approval">0%</div>
                <div class="hero-stat-sub">Promedio general</div>
            </div>
        `;
        setTimeout(() => {
            components.animateNumber(document.getElementById("stat-profs"), stats.totalProfs, 800, "", 0);
            components.animateNumber(document.getElementById("stat-reviews"), stats.totalReviews, 1200, "", 0);
            components.animateNumber(document.getElementById("stat-avg"), stats.avgScore, 1000, "", 1);
            components.animateNumber(document.getElementById("stat-approval"), stats.avgApproval, 1000, "%", 0);
        }, 200);
    }

    /* ── Filtro por facultad (desde subnav) ──────────────── */
    function filterByFac(fac) {
        activeFac = fac;
        document.querySelectorAll(".subnav-link[data-fac]").forEach(el => {
            el.classList.toggle("active", el.dataset.fac === fac);
        });
        render();
    }

    /* ── Filtro por sede ─────────────────────────────────── */
    function filterBySede(sedeId) {
        activeSede = sedeId;
        const sel = document.getElementById("sede-filter");
        if (sel) sel.value = sedeId;
        render();
    }

    /* ── Sidebar ─────────────────────────────────────────── */
    function _renderSidebar() {
        const sidebar = document.getElementById("home-sidebar");
        if (!sidebar) return;

        const topProfs = [...DB.professors]
            .sort((a, b) => DB.getProfScore(b.id) - DB.getProfScore(a.id))
            .slice(0, 5);

        sidebar.innerHTML = `
            <div class="sidebar-card">
                <div class="sidebar-head">🏆 Top Docentes</div>
                <div class="sidebar-body">
                    ${topProfs.map((p, i) => `
                        <div class="sidebar-row" onclick="window.location.href='professor.html?id=${p.id}'">
                            <span style="font-weight:800; color: ${i === 0 ? 'var(--color-star)' : i < 3 ? 'var(--utp-red)' : 'var(--color-text-muted)'}; font-size:14px; width:20px; font-family:var(--font-mono)">${i + 1}</span>
                            <span style="flex:1; font-size:12px; font-weight:500">${p.name}</span>
                            <span class="sidebar-num">${DB.getProfScore(p.id).toFixed(1)}</span>
                        </div>
                    `).join("")}
                </div>
            </div>

            <!-- Filtro por sede -->
            <div class="sidebar-card">
                <div class="sidebar-head">📍 Filtrar por sede</div>
                <div class="sidebar-body" style="padding:12px">
                    <select class="fld" id="sede-filter" onchange="home.filterBySede(this.value)" style="font-size:12px">
                        <option value="all">Todas las sedes</option>
                        <optgroup label="Lima Metropolitana">
                            ${DB.sedes.filter(s => s.region === "Lima").map(s => `<option value="${s.id}">${s.name}</option>`).join("")}
                        </optgroup>
                        <optgroup label="Provincias">
                            ${DB.sedes.filter(s => s.region !== "Lima").map(s => `<option value="${s.id}">${s.name} (${s.region})</option>`).join("")}
                        </optgroup>
                    </select>
                </div>
            </div>

            <div class="sidebar-card">
                <div class="sidebar-head">🎓 Facultades</div>
                <div class="sidebar-body">
                    ${DB.faculties.map(f => `
                        <div class="sidebar-row" onclick="home.filterByFac('${f.id}')">
                            <span style="font-size:14px">${f.icon}</span>
                            <span style="font-size:12px; flex:1">${f.name}</span>
                            <span class="sidebar-num">${DB.getFacultyCount(f.id)}</span>
                        </div>
                    `).join("")}
                </div>
            </div>

            <div class="sidebar-card">
                <div class="sidebar-head">ℹ️ Sobre Chalk</div>
                <div class="sidebar-body" style="padding:12px">
                    <p style="font-size:12px; color: var(--color-text-tertiary); line-height:1.8;">
                        Comunidad de estudiantes UTP para calificar y descubrir los mejores docentes en
                        <strong style="color:var(--utp-red)">${DB.sedes.length} sedes</strong> a nivel nacional.
                    </p>
                    <div style="margin-top:12px;padding:8px 12px;background:var(--utp-red-subtle);border:1px solid var(--color-border-accent);border-radius:var(--radius-md);font-size:11px;color:var(--color-text-secondary);">
                        🔒 Todas las reseñas son anónimas y verificadas
                    </div>
                </div>
            </div>
        `;
    }

    /* ── Filter chips (tags) ────────────────────────────── */
    function _renderFilterChips() {
        const container = document.getElementById("filter-chips");
        if (!container) return;
        const allTags = [...new Set(DB.professors.flatMap(p => p.tags))];
        container.innerHTML = `
            <span class="chip on" data-tag="all" onclick="home._filterChip(this, 'all')">Todos</span>
            ${allTags.slice(0, 8).map(tag => `
                <span class="chip" data-tag="${tag}" onclick="home._filterChip(this, '${tag}')">${tag}</span>
            `).join("")}
        `;
    }

    function _filterChip(el, tag) {
        activeTag = tag;
        document.querySelectorAll("#filter-chips .chip").forEach(c => {
            c.classList.toggle("on", c.dataset.tag === tag);
        });
        render();
    }

    /* ── Sort controls ──────────────────────────────────── */
    function _renderSortControls() {
        const el = document.getElementById("sort-controls");
        if (!el) return;
        el.innerHTML = `
            <span class="sort-label">Ordenar por</span>
            <button class="sort-btn active" data-sort="score" onclick="home._sortBy('score', this)">⭐ Calificación</button>
            <button class="sort-btn" data-sort="reviews" onclick="home._sortBy('reviews', this)">💬 Reseñas</button>
            <button class="sort-btn" data-sort="difficulty" onclick="home._sortBy('difficulty', this)">🎯 Dificultad</button>
            <button class="sort-btn" data-sort="wouldTakeAgain" onclick="home._sortBy('wouldTakeAgain', this)">🔄 Recomendación</button>
        `;
    }

    function _sortBy(field, el) {
        sortBy = field;
        document.querySelectorAll(".sort-btn").forEach(b => b.classList.remove("active"));
        el.classList.add("active");
        render();
    }

    /* ── Renderizado principal ───────────────────────────── */
    function render() {
        const query  = (document.getElementById("home-search")?.value || "").toLowerCase().trim();
        const listEl = document.getElementById("prof-list");
        if (!listEl) return;

        let filtered = DB.professors.filter(p => {
            const matchFac  = activeFac === "all" || p.fac === activeFac;
            const matchSede = activeSede === "all" || (p.sedes && p.sedes.includes(activeSede));
            const matchTag  = activeTag === "all" || p.tags.includes(activeTag);
            const matchQ    = !query ||
                p.name.toLowerCase().includes(query) ||
                p.dept.toLowerCase().includes(query) ||
                p.courses.some(c => c.toLowerCase().includes(query)) ||
                (p.sedes && p.sedes.some(s => DB.getSedeName(s).toLowerCase().includes(query)));
            return matchFac && matchSede && matchTag && matchQ;
        });

        filtered.sort((a, b) => {
            switch (sortBy) {
                case "reviews":       return DB.getProfReviewCount(b.id) - DB.getProfReviewCount(a.id);
                case "difficulty":    return (a.difficulty || 0) - (b.difficulty || 0);
                case "wouldTakeAgain": return (b.wouldTakeAgain || 0) - (a.wouldTakeAgain || 0);
                default:              return DB.getProfScore(b.id) - DB.getProfScore(a.id);
            }
        });

        const countEl = document.getElementById("result-count");
        if (countEl) {
            const sedeLabel = activeSede !== "all" ? ` en ${DB.getSedeName(activeSede)}` : "";
            countEl.innerHTML = filtered.length > 0
                ? `Mostrando <strong>${filtered.length}</strong> docente${filtered.length !== 1 ? "s" : ""}${sedeLabel}`
                : "";
        }

        if (filtered.length === 0) {
            listEl.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <div class="empty-state-title">Sin resultados</div>
                    <div class="empty-state-desc">Prueba con otro nombre, curso, sede o facultad.</div>
                </div>
            `;
            return;
        }

        listEl.innerHTML = filtered.map((p, i) => _profCard(p, i)).join("");
    }

    /* ── Tarjeta de docente ──────────────────────────────── */
    function _profCard(p, index) {
        const score       = DB.getProfScore(p.id);
        const stars       = DB.starsHtml(score);
        const reviewCount = DB.getProfReviewCount(p.id);
        const badge       = DB.getProfBadge(p);
        const diffColor   = DB.getDifficultyColor(p.difficulty);
        const sedeNames   = (p.sedes || []).map(s => DB.getSedeName(s)).join(", ");

        return `
            <div class="prow fadein stagger-${Math.min(index + 1, 6)}" onclick="window.location.href='professor.html?id=${p.id}'" role="button" tabindex="0">
                <div class="prow-av">${p.emoji}</div>
                <div class="prow-body">
                    <div class="prow-name">
                        ${p.name}
                        ${p.verified ? '<span class="prow-verified">✔ Verificado</span>' : ""}
                        ${badge ? components.badgeHtml(badge) : ""}
                    </div>
                    <div class="prow-dept">${p.dept} · 📍 ${sedeNames}</div>
                    <div class="prow-metrics">
                        <div class="prow-metric">
                            <span class="prow-metric-val" style="color:${diffColor}">${p.difficulty.toFixed(1)}</span>
                            <span class="prow-metric-label">Dificultad</span>
                        </div>
                        <div class="prow-metric">
                            <span class="prow-metric-val" style="color:var(--color-success)">${p.wouldTakeAgain}%</span>
                            <span class="prow-metric-label">Lo tomaría de nuevo</span>
                        </div>
                        <div class="prow-metric">
                            <span class="prow-metric-val">${p.approvalRate}%</span>
                            <span class="prow-metric-label">Aprobación</span>
                        </div>
                    </div>
                    <div class="prow-tags">
                        ${p.tags.map(t => `<span class="mini-tag">${t}</span>`).join("")}
                        ${p.courses.slice(0, 2).map(c => `<span class="mini-tag mini-tag-accent">📚 ${c}</span>`).join("")}
                    </div>
                </div>
                <div class="prow-right">
                    <div class="big-score">${score.toFixed(1)}</div>
                    <div class="big-score-label">/ 5.0</div>
                    <div class="stars-sm">${stars}</div>
                    <div class="review-count">💬 ${reviewCount} reseña${reviewCount !== 1 ? "s" : ""}</div>
                </div>
            </div>
        `;
    }

    return { init, render, filterByFac, filterBySede, _filterChip, _sortBy };
})();
