/* ============================================================
   CHALK · professor.js — Perfil de docente con métricas completas
   Lee el ID desde la URL (?id=X) y renderiza el perfil completo
   con gráficos, distribución, evolución y reseñas filtradas.
   ============================================================ */

const professor = (() => {

    /** Filtro de reseñas activo */
    let reviewFilter = "all";

    /** ID y datos del docente actual */
    let currentProf = null;

    /* ── Inicialización ──────────────────────────────────── */

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

        currentProf = prof;

        // Breadcrumb
        const bc = document.getElementById("prof-breadcrumb");
        if (bc) bc.textContent = prof.name;

        // Renderizar perfil
        const container = document.getElementById("prof-detail");
        if (container) {
            container.innerHTML = _buildProfPage(prof);

            // Animar barras y números
            requestAnimationFrame(() => {
                _animateCriteria(prof);
                _animateGradeDistribution(prof);
                _animateHistorical(prof);
                _animateMetrics(prof);
            });
        }
    }

    /* ── Construcción del HTML del perfil ────────────────── */

    function _buildProfPage(prof) {
        const reviews  = DB.getReviewsForProf(prof.id);
        const score    = DB.getProfScore(prof.id);
        const stars    = DB.starsHtml(score);
        const criteria = Object.entries(prof.criteria);
        const totalReviews = DB.getProfReviewCount(prof.id);
        const badge    = DB.getProfBadge(prof);
        const diffColor = DB.getDifficultyColor(prof.difficulty);
        const diffLabel = DB.getDifficultyLabel(prof.difficulty);
        const totalGrades = (prof.gradeDistribution || []).reduce((a, b) => a + b, 0);
        const sedeNames = (prof.sedes || []).map(s => DB.getSedeName(s)).join(", ");

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
                    <div style="margin-bottom:var(--space-3)">
                        <span class="verified-badge">✔ Docente verificado</span>
                    </div>
                ` : ""}

                ${badge ? `<div style="margin-bottom:var(--space-3)">${components.badgeHtml(badge)}</div>` : ""}

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
                        <span class="info-row-val" style="font-size:11px; text-align:right; max-width:140px">${prof.dept.replace("Facultad de ", "")}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-row-label">Reseñas</span>
                        <span class="info-row-val">${totalReviews}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-row-label">Carga académica</span>
                        <span class="info-row-val">${DB.workloadLabels[prof.workload] || prof.workload}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-row-label">Sedes</span>
                        <span class="info-row-val" style="font-size:11px;text-align:right;max-width:140px">📍 ${sedeNames}</span>
                    </div>
                </div>

                <!-- Cursos -->
                <div class="info-block">
                    <div class="info-block-head">Cursos que dicta</div>
                    ${prof.courses.map(c => {
                        const courseScore = prof.courseRatings?.[c];
                        return `
                            <div class="course-chip">
                                <span class="course-chip-name">📚 ${c}</span>
                                ${courseScore ? `<span class="course-chip-score">${courseScore.toFixed(1)}</span>` : ""}
                            </div>
                        `;
                    }).join("")}
                </div>
            </div>

            <!-- Columna principal -->
            <div>
                <!-- Cabecera del docente -->
                <div class="prof-header-card fadein">
                    <div class="prof-title">${prof.name}</div>
                    <div class="prof-subtitle">${prof.dept} · 📍 ${sedeNames}</div>
                    <div class="prof-badges">
                        ${prof.tags.map(t => `<span class="mini-tag" style="font-size:11px; padding:4px 10px">${t}</span>`).join("")}
                        ${badge ? components.badgeHtml(badge) : ""}
                    </div>
                </div>

                <!-- Métricas dashboard -->
                <div class="metrics-dashboard fadein stagger-1">
                    <div class="prof-metric-card">
                        <div class="prof-metric-icon">🔄</div>
                        <div class="prof-metric-val" id="metric-wta" style="color:var(--color-success)">0%</div>
                        <div class="prof-metric-label">Lo tomaría de nuevo</div>
                    </div>
                    <div class="prof-metric-card">
                        <div class="prof-metric-icon">🎯</div>
                        <div class="prof-metric-val" id="metric-diff" style="color:${diffColor}">0.0</div>
                        <div class="prof-metric-label">Dificultad</div>
                    </div>
                    <div class="prof-metric-card">
                        <div class="prof-metric-icon">📖</div>
                        <div class="prof-metric-val" id="metric-learn" style="color:var(--color-info)">0%</div>
                        <div class="prof-metric-label">Aprendizaje</div>
                    </div>
                    <div class="prof-metric-card">
                        <div class="prof-metric-icon">✅</div>
                        <div class="prof-metric-val" id="metric-approval" style="color:var(--utp-red)">0%</div>
                        <div class="prof-metric-label">Aprobación</div>
                    </div>
                </div>

                <!-- Nivel de dificultad visual -->
                <div class="card fadein stagger-2" style="margin-bottom:var(--space-4)">
                    <div class="card-head">🎯 Nivel de dificultad</div>
                    <div class="card-body">
                        ${components.difficultyBar(prof.difficulty)}
                        <div style="margin-top:var(--space-3);display:flex;justify-content:space-between;font-size:10px;color:var(--color-text-muted)">
                            <span>Muy fácil</span>
                            <span>Moderado</span>
                            <span>Muy difícil</span>
                        </div>
                    </div>
                </div>

                <!-- Criterios de evaluación -->
                <div class="card fadein stagger-3" style="margin-bottom:var(--space-4)">
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

                <!-- Distribución de calificaciones -->
                <div class="card fadein stagger-4" style="margin-bottom:var(--space-4)">
                    <div class="card-head">📈 Distribución de calificaciones</div>
                    <div class="card-body">
                        <div class="grade-dist" id="grade-dist">
                            ${[5, 4, 3, 2, 1].map((star, i) => {
                                const count = (prof.gradeDistribution || [])[i] || 0;
                                return `
                                    <div class="grade-row">
                                        <div class="grade-label">${"★".repeat(star)}</div>
                                        <div class="grade-bar-track">
                                            <div class="grade-bar-fill star-${star}" id="grade-fill-${star}" style="width:0%"></div>
                                        </div>
                                        <div class="grade-count" id="grade-count-${star}">${count}</div>
                                    </div>
                                `;
                            }).join("")}
                        </div>
                    </div>
                </div>

                <!-- Evolución histórica -->
                ${prof.historicalRatings && prof.historicalRatings.length > 0 ? `
                <div class="card fadein stagger-5" style="margin-bottom:var(--space-4)">
                    <div class="card-head">📅 Evolución histórica del rating</div>
                    <div class="card-body">
                        <div class="hist-chart" id="hist-chart">
                            ${prof.historicalRatings.map((h, i) => `
                                <div class="hist-bar-wrap">
                                    <div class="hist-bar-val">${h.rating.toFixed(1)}</div>
                                    <div class="hist-bar" id="hist-bar-${i}" style="height:0px"></div>
                                    <div class="hist-bar-label">${h.cycle}</div>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </div>
                ` : ""}

                <!-- Reseñas -->
                <div class="reviews-card fadein stagger-6">
                    <div class="reviews-head">
                        <span class="reviews-head-title">💬 Reseñas de estudiantes</span>
                        <span class="reviews-head-count">${reviews.length} reseña${reviews.length !== 1 ? "s" : ""}</span>
                    </div>
                    <div class="review-filter-tabs">
                        <button class="review-filter-tab active" onclick="professor.filterReviews('all', this)">Todas</button>
                        <button class="review-filter-tab" onclick="professor.filterReviews('helpful', this)">Más útiles</button>
                        <button class="review-filter-tab" onclick="professor.filterReviews('recent', this)">Recientes</button>
                        <button class="review-filter-tab" onclick="professor.filterReviews('positive', this)">Positivas</button>
                        <button class="review-filter-tab" onclick="professor.filterReviews('critical', this)">Críticas</button>
                    </div>
                    <div class="reviews-body" id="reviews-body">
                        ${_renderReviews(reviews, "all")}
                    </div>
                </div>
            </div>
        `;
    }

    /* ── Render reviews with filter ──────────────────────── */

    function _renderReviews(reviews, filter) {
        let sorted = [...reviews];

        switch (filter) {
            case "helpful":
                sorted.sort((a, b) => (b.helpful || 0) - (a.helpful || 0));
                break;
            case "recent":
                sorted.sort((a, b) => {
                    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
                    const getMonthIdx = (dateStr) => {
                        const parts = dateStr.split(" ");
                        return months.indexOf(parts[0]) + parseInt(parts[1] || "2025") * 12;
                    };
                    return getMonthIdx(b.date) - getMonthIdx(a.date);
                });
                break;
            case "positive":
                sorted = sorted.filter(r => r.score >= 4);
                break;
            case "critical":
                sorted = sorted.filter(r => r.score <= 3);
                break;
        }

        if (sorted.length === 0) {
            return `
                <div class="no-reviews">
                    <div class="no-reviews-icon">💬</div>
                    <div style="font-size:13px; font-weight:600; margin-bottom:6px; color:var(--color-text-primary)">Sin reseñas en esta categoría</div>
                    <div style="font-size:12px; color:var(--color-text-tertiary)">Prueba con otro filtro o sé el primero en contribuir.</div>
                </div>
            `;
        }

        return sorted.map(r => _reviewHtml(r)).join("");
    }

    function filterReviews(filter, btn) {
        reviewFilter = filter;
        document.querySelectorAll(".review-filter-tab").forEach(t => t.classList.remove("active"));
        btn.classList.add("active");

        const reviews = DB.getReviewsForProf(currentProf.id);
        const body = document.getElementById("reviews-body");
        if (body) {
            body.innerHTML = _renderReviews(reviews, filter);
        }
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

    /* ── Animar distribución de calificaciones ───────────── */

    function _animateGradeDistribution(prof) {
        const dist = prof.gradeDistribution || [];
        const maxCount = Math.max(...dist, 1);

        [5, 4, 3, 2, 1].forEach((star, i) => {
            const count = dist[i] || 0;
            const fill = document.getElementById(`grade-fill-${star}`);
            if (fill) {
                setTimeout(() => {
                    fill.style.width = `${(count / maxCount) * 100}%`;
                }, i * 100);
            }
        });
    }

    /* ── Animar barras históricas ────────────────────────── */

    function _animateHistorical(prof) {
        const ratings = prof.historicalRatings || [];
        if (ratings.length === 0) return;

        const minR = Math.min(...ratings.map(r => r.rating)) - 0.5;
        const maxR = Math.max(...ratings.map(r => r.rating));
        const range = maxR - minR || 1;

        ratings.forEach((h, i) => {
            const bar = document.getElementById(`hist-bar-${i}`);
            if (bar) {
                setTimeout(() => {
                    const pct = ((h.rating - minR) / range);
                    bar.style.height = `${Math.max(8, pct * 48)}px`;
                }, i * 120);
            }
        });
    }

    /* ── Animar métricas numéricas ───────────────────────── */

    function _animateMetrics(prof) {
        setTimeout(() => {
            components.animateNumber(
                document.getElementById("metric-wta"),
                prof.wouldTakeAgain || 0, 1000, "%", 0
            );
            components.animateNumber(
                document.getElementById("metric-diff"),
                prof.difficulty || 0, 800, "", 1
            );
            components.animateNumber(
                document.getElementById("metric-learn"),
                prof.learningScore || 0, 1000, "%", 0
            );
            components.animateNumber(
                document.getElementById("metric-approval"),
                prof.approvalRate || 0, 1000, "%", 0
            );
        }, 300);
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
                            ${r.wouldTakeAgain !== undefined ? `
                                <span style="font-size:10px;color:${r.wouldTakeAgain ? 'var(--color-success)' : 'var(--color-danger)'}">
                                    ${r.wouldTakeAgain ? '👍 Lo tomaría de nuevo' : '👎 No lo tomaría de nuevo'}
                                </span>
                            ` : ""}
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

    return { init, toggleHelpful, filterReviews };
})();
