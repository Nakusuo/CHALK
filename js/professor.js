/* ============================================================
   CHALK · professor.js — Perfil de docente (página standalone)
   Lee el ID desde la URL (?id=X) y renderiza el perfil completo.
   ============================================================ */

const professor = (() => {

    /* ── Inicialización (llamada desde la página) ────────── */

    /**
     * Lee el parámetro ?id de la URL y renderiza el perfil.
     */
    function init() {
        const idParam = components.getUrlParam("id");
        const profId  = parseInt(idParam, 10);

        if (!profId) {
            window.location.href = "home.html";
            return;
        }

        const prof = DB.getProfessor(profId);
        if (!prof) {
            window.location.href = "home.html";
            return;
        }

        // Breadcrumb
        const bc = document.getElementById("prof-breadcrumb");
        if (bc) bc.textContent = prof.name;

        // Renderizar perfil
        const container = document.getElementById("prof-detail");
        if (container) {
            container.innerHTML = _buildProfPage(prof);

            // Animar barras de criterios
            requestAnimationFrame(() => _animateCriteria(prof));
        }
    }

    /* ── Construcción del HTML del perfil ────────────────── */

    function _buildProfPage(prof) {
        const reviews  = DB.getReviewsForProf(prof.id);
        const score    = DB.getProfScore(prof.id);
        const stars    = DB.starsHtml(score);
        const criteria = Object.entries(prof.criteria);
        const totalReviews = DB.getProfReviewCount(prof.id);

        return `
            <!-- Columna lateral -->
            <div>
                <div class="prof-av-big">${prof.emoji}</div>

                <!-- Puntuación grande -->
                <div class="score-block">
                    <div class="score-giant">${score.toFixed(1)}<span>/5</span></div>
                    <div class="score-stars">${stars}</div>
                    <div class="score-sub">${totalReviews} reseña${totalReviews !== 1 ? "s" : ""} de estudiantes</div>
                </div>

                ${prof.verified ? `
                    <div style="margin-bottom:10px">
                        <span class="verified-badge">✔ Docente verificado</span>
                    </div>
                ` : ""}

                <!-- Botones de acción -->
                <div class="action-btns">
                    <a class="btn btn-primary btn-full" href="review.html?id=${prof.id}" style="text-decoration:none">
                        ✍️ Escribir reseña
                    </a>
                    <a class="btn btn-full" href="home.html" style="text-decoration:none">
                        ← Volver a la lista
                    </a>
                </div>

                <!-- Info del docente -->
                <div class="info-block">
                    <div class="info-block-head">Información</div>
                    <div class="info-row">
                        <span class="info-row-label">Experiencia</span>
                        <span class="info-row-val">${prof.experience}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-row-label">Facultad</span>
                        <span class="info-row-val" style="font-size:11px; text-align:right; max-width:130px">${prof.dept.replace("Facultad de ", "")}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-row-label">Reseñas</span>
                        <span class="info-row-val">${totalReviews}</span>
                    </div>
                </div>

                <!-- Cursos -->
                <div class="info-block">
                    <div class="info-block-head">Cursos que dicta</div>
                    ${prof.courses.map(c => `
                        <div class="info-row">
                            <span style="font-size:12px">📚 ${c}</span>
                        </div>
                    `).join("")}
                </div>
            </div>

            <!-- Columna principal -->
            <div>
                <!-- Cabecera del docente -->
                <div class="prof-header-card">
                    <div class="prof-title">${prof.name}</div>
                    <div class="prof-subtitle">${prof.dept}</div>
                    <div class="prof-badges">
                        ${prof.tags.map(t => `<span class="mini-tag" style="font-size:11px; padding:3px 9px">${t}</span>`).join("")}
                    </div>
                </div>

                <!-- Criterios de evaluación -->
                <div class="card" style="margin-bottom:14px">
                    <div class="card-head">📊 Criterios de evaluación</div>
                    <div class="card-body">
                        <div class="accord-grid" id="criteria-grid-${prof.id}">
                            ${criteria.map(([key, val]) => `
                                <div class="accord-bar">
                                    <div class="accord-name">${DB.criteriaLabels[key]}</div>
                                    <div class="accord-track">
                                        <div class="accord-fill" id="fill-${key}" style="width:0%"></div>
                                    </div>
                                    <div class="accord-val" id="val-${key}">0</div>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </div>

                <!-- Reseñas -->
                <div class="reviews-card">
                    <div class="reviews-head">
                        <span class="reviews-head-title">💬 Reseñas de estudiantes</span>
                        <span class="reviews-head-count">${reviews.length} reseña${reviews.length !== 1 ? "s" : ""}</span>
                    </div>
                    <div class="reviews-body">
                        ${reviews.length > 0 ? reviews.map(r => _reviewHtml(r)).join("") : `
                            <div class="no-reviews">
                                <div class="no-reviews-icon">💬</div>
                                <div style="font-size:13px; font-weight:600; margin-bottom:6px">Sin reseñas aún</div>
                                <div style="font-size:12px">¡Sé el primero en calificar a este docente!</div>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;
    }

    /* ── Animar barras de criterios ──────────────────────── */

    function _animateCriteria(prof) {
        Object.entries(prof.criteria).forEach(([key, val]) => {
            const fill  = document.getElementById(`fill-${key}`);
            const valEl = document.getElementById(`val-${key}`);
            if (fill) fill.style.width = `${(val / 5) * 100}%`;
            if (valEl) valEl.textContent = val.toFixed(1);
        });
    }

    /* ── HTML de reseña ───────────────────────────────────── */

    function _reviewHtml(r) {
        const stars = "★".repeat(r.score) + "☆".repeat(5 - r.score);
        const isHelpful = store.isHelpful(r.id);
        const helpCount = (r.helpful || 0) + (isHelpful ? 1 : 0);

        return `
            <div class="review-item">
                <div class="rev-top">
                    <div class="rev-av">${r.initials}</div>
                    <div class="rev-meta">
                        <div class="rev-user">
                            ${r.user}
                            <span class="rev-badge">${r.course}</span>
                        </div>
                        <div class="rev-date">${r.date}</div>
                    </div>
                    <div class="rev-score">${stars}</div>
                </div>
                <div class="rev-pills">
                    ${r.tags.map((tag, i) => {
                        const type = r.tagType?.[i] || "neu";
                        const cls  = type === "pos" ? "rev-pill-pos" : type === "neg" ? "rev-pill-neg" : "rev-pill-neu";
                        return `<span class="rev-pill ${cls}">${tag}</span>`;
                    }).join("")}
                </div>
                <div class="rev-text">${r.text}</div>
                <button class="helpful-btn ${isHelpful ? 'on' : ''}"
                        onclick="professor.toggleHelpful(this, '${r.id}', ${r.helpful || 0})">
                    👍 Útil · <span>${helpCount}</span>
                </button>
            </div>
        `;
    }

    /* ── Toggle "útil" con persistencia ───────────────────── */

    function toggleHelpful(btn, reviewId, baseCount) {
        const isNowHelpful = store.toggleHelpful(reviewId);
        btn.classList.toggle("on", isNowHelpful);
        const span = btn.querySelector("span");
        span.textContent = baseCount + (isNowHelpful ? 1 : 0);
    }

    /* ── API pública ─────────────────────────────────────── */

    return { init, toggleHelpful };
})();
