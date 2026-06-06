/* ============================================================
   CHALK · auth.js — Autenticación con persistencia local
   Login, registro y cierre de sesión con localStorage.
   ============================================================ */

const auth = (() => {

    /* ── Validadores ─────────────────────────────────────── */

    /** Valida correo institucional UTP: U + dígitos + @utp.edu.pe */
    function isValidEmail(email) {
        return /^U\d+@utp\.edu\.pe$/i.test(email.trim());
    }

    /** Valida código de estudiante: U + 6 o más dígitos */
    function isValidCode(code) {
        return /^U\d{6,}$/i.test(code.trim());
    }

    /* ── Sincronizar email desde código (registro) ───────── */

    function syncEmail() {
        const code  = document.getElementById("reg-code").value.trim().toUpperCase();
        const email = document.getElementById("reg-email");
        if (email) email.value = code ? `${code}@utp.edu.pe` : "";
    }

    /* ── Login ───────────────────────────────────────────── */

    function login() {
        const email = document.getElementById("login-email").value.trim();
        const pass  = document.getElementById("login-pass").value;
        let valid = true;

        // Validar email
        const emailErr = document.getElementById("login-email-err");
        if (!isValidEmail(email)) {
            emailErr.classList.add("on");
            valid = false;
        } else {
            emailErr.classList.remove("on");
        }

        // Validar contraseña
        const passErr = document.getElementById("login-pass-err");
        if (pass.length < 1) {
            passErr.classList.add("on");
            valid = false;
        } else {
            passErr.classList.remove("on");
        }

        if (!valid) return;

        // Crear sesión
        const code = email.split("@")[0].toUpperCase();
        const user = {
            code,
            email,
            name: `Estudiante ${code}`,
            initials: code.substring(0, 2),
        };

        store.setUser(user);
        window.location.href = "home.html";
    }

    /* ── Registro ────────────────────────────────────────── */

    function register() {
        const firstName = document.getElementById("reg-name").value.trim();
        const lastName  = document.getElementById("reg-last").value.trim();
        const code      = document.getElementById("reg-code").value.trim().toUpperCase();
        const fac       = document.getElementById("reg-fac").value;
        const pass      = document.getElementById("reg-pass").value;
        let valid = true;

        // Validar código
        const codeErr = document.getElementById("reg-code-err");
        if (!isValidCode(code)) {
            codeErr.classList.add("on");
            valid = false;
        } else {
            codeErr.classList.remove("on");
        }

        // Validar facultad
        const facErr = document.getElementById("reg-fac-err");
        if (!fac) {
            facErr.classList.add("on");
            valid = false;
        } else {
            facErr.classList.remove("on");
        }

        // Validar contraseña
        const passErr = document.getElementById("reg-pass-err");
        if (pass.length < 8) {
            passErr.classList.add("on");
            valid = false;
        } else {
            passErr.classList.remove("on");
        }

        if (!valid) return;

        // Crear sesión
        const fullName = `${firstName || "Estudiante"} ${lastName || code}`.trim();
        const initials = ((firstName[0] || "E") + (lastName[0] || "U")).toUpperCase();

        const user = {
            code,
            email: `${code}@utp.edu.pe`,
            name: fullName,
            initials,
            fac,
        };

        store.setUser(user);
        window.location.href = "home.html";
    }

    /* ── Logout ──────────────────────────────────────────── */

    function logout() {
        store.clearUser();
        window.location.href = "index.html";
    }

    /* ── API pública ─────────────────────────────────────── */

    return { login, register, logout, syncEmail, isValidCode };
})();
