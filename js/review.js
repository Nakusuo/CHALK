/* ============================================================
   CHALK · review.js — Formulario de reseña multi-paso
   Lee el ID desde la URL (?id=X) y guarda la reseña en localStorage.
   ============================================================ */

const review = (() => {
    /** ID del docente */
    let profId = null;

    /** Objeto del docente */
    let prof = null;

    /** Paso actual (0-indexed) */
    let step = 0;

    /** Total de pasos */
    const TOTAL_STEPS = 4;

    /** Estado del formulario */
    let formState = {
        criteria: { ensenanza: 0, claridad: 0, puntualidad: 0, trato: 0, practicas: 0, accesibilidad: 0 },
        tagsPos: [],
        tagsNeg: [],
        course: "",
        text: "",
    };

    /* ── Inicialización ──────────────────────────────────── */

    function init() {
        const idParam = components.getUrlParam("id");
        profId = parseInt(idParam, 10);

        if (!profId) {
            window.location.href = "home.html";
            return;
        }

        prof = DB.getProfessor(profId);
        if (!prof) {
            window.location.href = "home.html";
            return;
        }

        step = 0;
        formState = {
            criteria: { ensenanza: 0, claridad: 0, puntualidad: 0, trato: 0, practicas: 0, accesibilidad: 0 },
            tagsPos: [],
            tagsNeg: [],
            course: "",
            text: "",
        };

        // Breadcrumb
        const backLink = document.getElementById("review-back-link");
        if (backLink) {
            backLink.textContent = prof.name;
            backLink.href = `professor.html?id=${prof.id}`;
        }

        _renderSidebar();
        _renderForm();
    }

    /* ── Sidebar ─────────────────────────────────────────── */

    function _renderSidebar() {
        const el = document.getElementById("review-sidebar-info");
        if (!el || !prof) return;

        const score = DB.getProfScore(prof.id);
        const stars = DB.starsHtml(score);
        const totalReviews = DB.getProfReviewCount(prof.id);

        el.innerHTML = `
            <div class="review-sidebar-prof">
                <div class="review-sidebar-av">${prof.emoji}</div>
                <div style="font-size:14px; font-weight:700; color:var(--utp-black)">${prof.name}</div>
                <div style="font-size:11px; color:var(--color-text-secondary); margin-top:2px">${prof.dept}</div>
                <div style="margin-top:8px">
                    <span style="font-size:22px; font-weight:700; color:var(--utp-red)">${score.toFixed(1)}</span>
                    <span style="font-size:11px; color:var(--color-text-muted)">/ 5.0</span>
                </div>
                <div style="color:var(--color-star); font-size:14px; margin-top:2px; letter-spacing:1px">${stars}</div>
                <div style="font-size:10px; color:var(--color-text-muted); margin-top:4px">${totalReviews} reseñas</div>
            </div>
            <div style="padding:12px">
                <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; color:var(--color-text-secondary); margin-bottom:8px">Cursos</div>
                ${prof.courses.map(c => `
                    <div style="font-size:11px; padding:4px 0; border-bottom:1px solid var(--color-border); color:var(--color-text-primary)">📚 ${c}</div>
                `).join("")}
            </div>
        `;
    }

    /* ── Formulario multi-paso ───────────────────────────── */

    function _renderForm() {
        const container = document.getElementById("review-form-container");
        if (!container || !prof) return;

        container.innerHTML = `
            ${_stepBarHtml()}

            <!-- Paso 1: Criterios -->
            <div class="form-section ${step === 0 ? 'on' : ''}" id="form-step-0">
                <div class="form-card">
                    <div class="form-card-head">
                        <span class="form-card-head-icon">📊</span>
                        <span class="form-card-head-title">Califica los criterios</span>
                        <span class="form-card-head-desc">Paso 1 de ${TOTAL_STEPS}</span>
                    </div>
                    <div class="form-card-body">
                        <div class="crit-grid">
                            ${Object.entries(DB.criteriaLabels).map(([key, label]) => `
                                <div class="crit-card">
                                    <div class="crit-title">${label}</div>
                                    <div class="crit-desc">${_criteriaDesc(key)}</div>
                                    <div class="star-row" id="stars-${key}">
                                        ${[1, 2, 3, 4, 5].map(n => `
                                            <span class="s-star" data-crit="${key}" data-val="${n}"
                                                  onclick="review._rateCrit('${key}', ${n})"
                                                  onmouseenter="review._hoverCrit('${key}', ${n})"
                                                  onmouseleave="review._resetCrit('${key}')">☆</span>
                                        `).join("")}
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Paso 2: Etiquetas -->
            <div class="form-section ${step === 1 ? 'on' : ''}" id="form-step-1">
                <div class="form-card">
                    <div class="form-card-head">
                        <span class="form-card-head-icon">🏷️</span>
                        <span class="form-card-head-title">Etiquetas descriptivas</span>
                        <span class="form-card-head-desc">Paso 2 de ${TOTAL_STEPS}</span>
                    </div>
                    <div class="form-card-body">
                        <div class="section-label">Aspectos positivos</div>
                        <div class="tag-cloud">
                            ${DB.tagCategories.positivos.map(tag => `
                                <span class="tag-opt" onclick="review._toggleTag(this, 'pos', '${tag}')">${tag}</span>
                            `).join("")}
                        </div>

                        <div class="section-label">Aspectos neutros</div>
                        <div class="tag-cloud">
                            ${DB.tagCategories.neutros.map(tag => `
                                <span class="tag-opt" onclick="review._toggleTag(this, 'pos', '${tag}')">${tag}</span>
                            `).join("")}
                        </div>

                        <div class="section-label">Aspectos a mejorar</div>
                        <div class="tag-cloud">
                            ${DB.tagCategories.negativos.map(tag => `
                                <span class="tag-opt" onclick="review._toggleTag(this, 'neg', '${tag}')">${tag}</span>
                            `).join("")}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Paso 3: Comentario -->
            <div class="form-section ${step === 2 ? 'on' : ''}" id="form-step-2">
                <div class="form-card">
                    <div class="form-card-head">
                        <span class="form-card-head-icon">✍️</span>
                        <span class="form-card-head-title">Tu comentario</span>
                        <span class="form-card-head-desc">Paso 3 de ${TOTAL_STEPS}</span>
                    </div>
                    <div class="form-card-body">
                        <div class="field-wrap">
                            <label class="field-label" for="review-course">Curso que llevaste con este docente</label>
                            <select class="fld" id="review-course">
                                <option value="">Selecciona un curso</option>
                                ${prof.courses.map(c => `<option value="${c}">${c}</option>`).join("")}
                            </select>
                        </div>

                        <div class="field-wrap">
                            <label class="field-label" for="review-text">Tu experiencia (mín. 30 caracteres)</label>
                            <textarea class="fld" id="review-text"
                                      placeholder="Describe tu experiencia con este docente. ¿Cómo son sus clases? ¿Es accesible? ¿Qué mejoraría?"
                                      maxlength="1000"
                                      oninput="review._updateCharCount()"></textarea>
                            <div class="char-track" id="char-count">0 / 1000</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Paso 4: Vista previa -->
            <div class="form-section ${step === 3 ? 'on' : ''}" id="form-step-3">
                <div class="form-card">
                    <div class="form-card-head">
                        <span class="form-card-head-icon">👁️</span>
                        <span class="form-card-head-title">Vista previa y envío</span>
                        <span class="form-card-head-desc">Paso 4 de ${TOTAL_STEPS}</span>
                    </div>
                    <div class="form-card-body">
                        <div class="rep-notice">
                            ✅ Tu reseña será anónima pero vinculada a tu cuenta. Recuerda ser respetuoso/a y constructivo/a.
                        </div>
                        <div class="preview-box" id="review-preview"></div>
                    </div>
                </div>
            </div>

            <!-- Éxito -->
            <div class="form-section" id="form-success">
                <div class="success-wrap">
                    <div class="success-icon">🎉</div>
                    <div class="success-title">¡Reseña publicada!</div>
                    <div class="success-desc">
                        Gracias por tu aporte a la comunidad Chalk.
                        Tu opinión ayudará a otros estudiantes UTP a elegir mejores docentes.
                    </div>
                    <a class="btn btn-primary" href="professor.html?id=${prof.id}" style="text-decoration:none">Ver perfil del docente</a>
                    <br><br>
                    <a class="btn" href="home.html" style="text-decoration:none">Volver al inicio</a>
                </div>
            </div>

            <!-- Navegación -->
            <div class="form-nav" id="form-nav">
                <button class="btn btn-ghost" id="btn-prev" onclick="review._prevStep()" style="visibility:hidden">← Anterior</button>
                <span class="form-step-info" id="step-info">Paso 1 de ${TOTAL_STEPS}</span>
                <button class="btn btn-primary" id="btn-next" onclick="review._nextStep()">Siguiente →</button>
            </div>
        `;
    }

    /* ── Barra de pasos ─────────────────────────────────── */

    function _stepBarHtml() {
        let html = '<div class="step-bar">';
        for (let i = 0; i < TOTAL_STEPS; i++) {
            const cls = i < step ? "done" : (i === step ? "cur" : "");
            html += `<div class="step-node ${cls}">${i < step ? "✓" : i + 1}</div>`;
            if (i < TOTAL_STEPS - 1) {
                html += `<div class="step-ln ${i < step ? 'done' : ''}"></div>`;
            }
        }
        html += '</div>';
        return html;
    }

    /* ── Navegación entre pasos ──────────────────────────── */

    function _nextStep() {
        if (step === 0) {
            const filled = Object.values(formState.criteria).filter(v => v > 0).length;
            if (filled < 3) {
                alert("Califica al menos 3 criterios para continuar.");
                return;
            }
        }

        if (step === 2) {
            formState.text = document.getElementById("review-text")?.value || "";
            formState.course = document.getElementById("review-course")?.value || "";
            if (formState.text.trim().length < 30) {
                alert("Tu comentario debe tener al menos 30 caracteres.");
                return;
            }
        }

        if (step === 3) {
            _submitReview();
            return;
        }

        step++;
        if (step === 3) _buildPreview();
        _updateStepUI();
    }

    function _prevStep() {
        if (step <= 0) return;
        step--;
        _updateStepUI();
    }

    function _updateStepUI() {
        for (let i = 0; i < TOTAL_STEPS; i++) {
            const sec = document.getElementById(`form-step-${i}`);
            if (sec) sec.classList.toggle("on", i === step);
        }

        document.querySelectorAll(".step-node").forEach((node, i) => {
            node.className = "step-node";
            if (i < step) { node.classList.add("done"); node.textContent = "✓"; }
            else if (i === step) { node.classList.add("cur"); node.textContent = i + 1; }
            else { node.textContent = i + 1; }
        });

        document.querySelectorAll(".step-ln").forEach((ln, i) => {
            ln.classList.toggle("done", i < step);
        });

        const prevBtn = document.getElementById("btn-prev");
        const nextBtn = document.getElementById("btn-next");
        const stepInfo = document.getElementById("step-info");

        if (prevBtn) prevBtn.style.visibility = step > 0 ? "visible" : "hidden";
        if (stepInfo) stepInfo.textContent = `Paso ${step + 1} de ${TOTAL_STEPS}`;
        if (nextBtn) nextBtn.textContent = step === 3 ? "Publicar reseña ✓" : "Siguiente →";
    }

    /* ── Calificación de criterios ───────────────────────── */

    function _rateCrit(key, val) {
        formState.criteria[key] = val;
        _renderStars(key);
    }

    function _hoverCrit(key, val) {
        const container = document.getElementById(`stars-${key}`);
        if (!container) return;
        container.querySelectorAll(".s-star").forEach(s => {
            const v = parseInt(s.dataset.val);
            s.textContent = v <= val ? "★" : "☆";
            s.classList.toggle("on", v <= val);
        });
    }

    function _resetCrit(key) {
        _renderStars(key);
    }

    function _renderStars(key) {
        const container = document.getElementById(`stars-${key}`);
        if (!container) return;
        const current = formState.criteria[key];
        container.querySelectorAll(".s-star").forEach(s => {
            const v = parseInt(s.dataset.val);
            s.textContent = v <= current ? "★" : "☆";
            s.classList.toggle("on", v <= current);
        });
    }

    /* ── Toggle de etiquetas ─────────────────────────────── */

    function _toggleTag(el, type, tag) {
        el.classList.toggle("on");
        const list = type === "pos" ? formState.tagsPos : formState.tagsNeg;
        const idx = list.indexOf(tag);
        if (idx >= 0) list.splice(idx, 1);
        else list.push(tag);
    }

    /* ── Contador de caracteres ──────────────────────────── */

    function _updateCharCount() {
        const textarea = document.getElementById("review-text");
        const counter = document.getElementById("char-count");
        if (textarea && counter) {
            counter.textContent = `${textarea.value.length} / 1000`;
        }
    }

    /* ── Vista previa ────────────────────────────────────── */

    function _buildPreview() {
        const previewEl = document.getElementById("review-preview");
        if (!previewEl) return;

        const user = store.getUser();
        const avgScore = _avgCriteria();
        const stars = "★".repeat(Math.round(avgScore)) + "☆".repeat(5 - Math.round(avgScore));
        const allTags = [...formState.tagsPos, ...formState.tagsNeg];

        const now = new Date();
        const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const dateStr = `${months[now.getMonth()]} ${now.getFullYear()}`;

        previewEl.innerHTML = `
            <div class="preview-box-label">Así se verá tu reseña</div>
            <div style="display:flex; align-items:flex-start; gap:10px; margin-bottom:10px">
                <div class="rev-av">${user?.initials || "EU"}</div>
                <div style="flex:1">
                    <div class="rev-user">
                        ${user?.name || "Estudiante anónimo"}
                        ${formState.course ? `<span class="rev-badge">${formState.course}</span>` : ""}
                    </div>
                    <div class="rev-date">${dateStr}</div>
                </div>
                <div style="color:var(--color-star); font-size:14px; letter-spacing:1px">${stars}</div>
            </div>
            ${allTags.length > 0 ? `
                <div class="rev-pills">
                    ${formState.tagsPos.map(t => `<span class="rev-pill rev-pill-pos">${t}</span>`).join("")}
                    ${formState.tagsNeg.map(t => `<span class="rev-pill rev-pill-neg">${t}</span>`).join("")}
                </div>
            ` : ""}
            <div class="rev-text" style="margin-top:8px">${formState.text || "Sin comentario."}</div>
            <div style="font-size:11px; color:var(--color-text-muted); margin-top:6px">
                Puntuación promedio: <strong style="color:var(--utp-red)">${avgScore.toFixed(1)}</strong> / 5.0
            </div>
        `;
    }

    /* ── Enviar reseña (guarda en localStorage) ──────────── */

    function _submitReview() {
        const user = store.getUser();
        if (!prof || !user) return;

        const avgScore = Math.round(_avgCriteria());
        const allTags = [...formState.tagsPos, ...formState.tagsNeg];
        const tagTypes = [
            ...formState.tagsPos.map(() => "pos"),
            ...formState.tagsNeg.map(() => "neg"),
        ];

        const now = new Date();
        const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const dateStr = `${months[now.getMonth()]} ${now.getFullYear()}`;

        // Guardar en localStorage
        store.addReview({
            profId: prof.id,
            user: user.name,
            initials: user.initials,
            date: dateStr,
            score: avgScore,
            tags: allTags.slice(0, 3),
            tagType: tagTypes.slice(0, 3),
            text: formState.text,
            helpful: 0,
            course: formState.course || prof.courses[0],
        });

        // Mostrar éxito
        for (let i = 0; i < TOTAL_STEPS; i++) {
            const sec = document.getElementById(`form-step-${i}`);
            if (sec) sec.classList.remove("on");
        }
        document.getElementById("form-success")?.classList.add("on");
        document.getElementById("form-nav").style.display = "none";
    }

    /* ── Utilidades ──────────────────────────────────────── */

    function _avgCriteria() {
        const vals = Object.values(formState.criteria).filter(v => v > 0);
        if (vals.length === 0) return 0;
        return vals.reduce((a, b) => a + b, 0) / vals.length;
    }

    function _criteriaDesc(key) {
        const descs = {
            ensenanza: "¿Domina el tema y enseña bien?",
            claridad: "¿Explica de forma clara y ordenada?",
            puntualidad: "¿Llega a tiempo y cumple horarios?",
            trato: "¿Es respetuoso/a con los alumnos?",
            practicas: "¿Las prácticas son útiles y bien diseñadas?",
            accesibilidad: "¿Es accesible fuera de clases?",
        };
        return descs[key] || "";
    }

    /* ── API pública ─────────────────────────────────────── */

    return {
        init,
        _rateCrit, _hoverCrit, _resetCrit,
        _toggleTag, _updateCharCount,
        _nextStep, _prevStep,
    };
})();
