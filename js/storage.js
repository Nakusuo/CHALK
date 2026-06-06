/* ============================================================
   CHALK · storage.js — Capa de persistencia (localStorage)
   Gestiona usuario, reseñas y votos "útil" de forma local.
   ============================================================ */

const store = (() => {
    const KEYS = {
        USER:    "chalk_user",
        REVIEWS: "chalk_reviews",
        HELPFUL: "chalk_helpful",
    };

    /* ── Utilidades privadas ─────────────────────────────── */

    function _get(key) {
        try { return JSON.parse(localStorage.getItem(key)); }
        catch { return null; }
    }

    function _set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    /* ── Sesión de usuario ───────────────────────────────── */

    /** Devuelve el objeto del usuario logueado o null */
    function getUser() {
        return _get(KEYS.USER);
    }

    /** Guarda la sesión del usuario */
    function setUser(user) {
        _set(KEYS.USER, user);
    }

    /** Cierra sesión eliminando los datos del usuario */
    function clearUser() {
        localStorage.removeItem(KEYS.USER);
    }

    /* ── Reseñas del usuario ─────────────────────────────── */

    /** Devuelve todas las reseñas guardadas por el usuario */
    function getReviews() {
        return _get(KEYS.REVIEWS) || [];
    }

    /**
     * Agrega una reseña nueva al almacenamiento local.
     * @param {Object} review — Datos de la reseña
     * @returns {Object} La reseña con ID generado
     */
    function addReview(reviewData) {
        const reviews = getReviews();
        const review = {
            ...reviewData,
            id: "user-" + Date.now(),
            createdAt: new Date().toISOString(),
        };
        reviews.push(review);
        _set(KEYS.REVIEWS, reviews);
        return review;
    }

    /* ── Votos "Útil" ────────────────────────────────────── */

    /** Devuelve el mapa de votos: { reviewId: true/false } */
    function getHelpfulVotes() {
        return _get(KEYS.HELPFUL) || {};
    }

    /**
     * Alterna el voto "útil" de una reseña.
     * @returns {boolean} El nuevo estado del voto
     */
    function toggleHelpful(reviewId) {
        const votes = getHelpfulVotes();
        votes[reviewId] = !votes[reviewId];
        _set(KEYS.HELPFUL, votes);
        return votes[reviewId];
    }

    /** Comprueba si una reseña tiene el voto "útil" del usuario */
    function isHelpful(reviewId) {
        return !!getHelpfulVotes()[reviewId];
    }

    /* ── API pública ─────────────────────────────────────── */

    return {
        getUser, setUser, clearUser,
        getReviews, addReview,
        getHelpfulVotes, toggleHelpful, isHelpful,
    };
})();
