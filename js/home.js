/* ============================================================
   CHALK · home.js — Pantalla principal: lista de docentes
   Renderiza sidebar, filtros, búsqueda y tarjetas de docentes.
   ============================================================ */

const home = (() => {
    /** Filtro de facultad activo */
    let activeFac = "all";

    /** Filtro de tag activo */
    let activeTag = "all";

    /* ── Inicialización ──────────────────────────────────── */

    function init() {
        _renderSidebar();
        _renderFilterChips();
        render();
    }

    /* ── Filtro por facultad (desde subnav) ──────────────── */

    function filterByFac(fac) {
        activeFac = fac;
        document.querySelectorAll(".subnav-link[data-fac]").forEach(el => {
            el.classList.toggle("active", el.dataset.fac === fac);
        });
        render();
    }

    /* ── Renderizado del sidebar ─────────────────────────── */

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
                            <span style="font-weight:700; color: var(--utp-red); font-size:13px; width:18px">${i + 1}</span>
                            <span style="flex:1; font-size:12px">${p.name.split(" ").slice(-1)[0]}, ${p.name.split(" ")[0]}</span>
                            <span class="sidebar-num">${DB.getProfScore(p.id).toFixed(1)}</span>
                        </div>
                    `).join("")}
                </div>
            </div>

            <div class="sidebar-card">
                <div class="sidebar-head">🎓 Facultades</div>
                <div class="sidebar-body">
                    ${DB.faculties.map(f => `
                        <div class="sidebar-row" onclick="home.filterByFac('${f.id}')">
                            <span style="font-size:12px">${f.name}</span>
                            <span class="sidebar-num">${f.count}</span>
                        </div>
                    `).join("")}
                </div>
            </div>

            <div class="sidebar-card">
                <div class="sidebar-head">ℹ️ Sobre Chalk</div>
                <div class="sidebar-body">
                    <p style="font-size:11px; color: var(--color-text-secondary); line-height:1.7;">
                        Comunidad de estudiantes UTP para calificar y descubrir los mejores docentes.
                        Solo acceso con correo institucional <strong>@utp.edu.pe</strong>.
                    </p>
                </div>
            </div>
        `;
    }

    /* ── Renderizado de chips de filtro ──────────────────── */

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

    /* ── Renderizado principal de la lista ───────────────── */

    function render() {
        const query  = (document.getElementById("home-search")?.value || "").toLowerCase().trim();
        const listEl = document.getElementById("prof-list");
        if (!listEl) return;

        let filtered = DB.professors.filter(p => {
            const matchFac = activeFac === "all" || p.fac === activeFac;
            const matchTag = activeTag === "all" || p.tags.includes(activeTag);
            const matchQ   = !query ||
                p.name.toLowerCase().includes(query) ||
                p.dept.toLowerCase().includes(query) ||
                p.courses.some(c => c.toLowerCase().includes(query));
            return matchFac && matchTag && matchQ;
        });

        // Ordenar por score (usando puntaje actualizado)
        filtered.sort((a, b) => DB.getProfScore(b.id) - DB.getProfScore(a.id));

        // Contador
        const countEl = document.getElementById("result-count");
        if (countEl) {
            countEl.innerHTML = filtered.length > 0
                ? `Mostrando <strong>${filtered.length}</strong> docente${filtered.length !== 1 ? "s" : ""}`
                : "";
        }

        // Sin resultados
        if (filtered.length === 0) {
            listEl.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <div class="empty-state-title">Sin resultados</div>
                    <div class="empty-state-desc">Prueba con otro nombre, curso o facultad.</div>
                </div>
            `;
            return;
        }

        listEl.innerHTML = filtered.map(p => _profCard(p)).join("");
    }

    /* ── HTML de tarjeta de docente ──────────────────────── */

    function _profCard(p) {
        const score       = DB.getProfScore(p.id);
        const stars       = DB.starsHtml(score);
        const reviewCount = DB.getReviewsForProf(p.id).length;

        return `
            <div class="prow fadein" onclick="window.location.href='professor.html?id=${p.id}'" role="button" tabindex="0">
                <div class="prow-av">${p.emoji}</div>
                <div class="prow-body">
                    <div class="prow-name">
                        ${p.name}
                        ${p.verified ? '<span style="font-size:10px; color:#2e7d32; margin-left:5px">✔ Verificado</span>' : ""}
                    </div>
                    <div class="prow-dept">${p.dept}</div>
                    <div class="prow-tags">
                        ${p.tags.map(t => `<span class="mini-tag">${t}</span>`).join("")}
                        ${p.courses.slice(0, 2).map(c => `<span class="mini-tag" style="color:var(--utp-red);background:var(--utp-red-light)">📚 ${c}</span>`).join("")}
                    </div>
                </div>
                <div class="prow-right">
                    <div class="big-score">${score.toFixed(1)}</div>
                    <div class="big-score-label">/ 5.0</div>
                    <div class="stars-sm">${stars}</div>
                    <div class="review-count">${reviewCount} reseña${reviewCount !== 1 ? "s" : ""}</div>
                </div>
            </div>
        `;
    }

    /* ── API pública ─────────────────────────────────────── */

    return { init, render, filterByFac, _filterChip };
})();
