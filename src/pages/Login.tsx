import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import AuthShell, { Field } from "../components/AuthShell";
import { isValidEmail } from "../data/db";
import { store } from "../lib/store";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [tried, setTried] = useState(false);

  const emailErr = !isValidEmail(email) && "Usa tu correo institucional: U########@utp.edu.pe";
  const passErr = !pass && "Ingresa tu contraseña";

  function submit(e: FormEvent) {
    e.preventDefault();
    setTried(true);
    if (emailErr || passErr) return;
    const code = email.trim().split("@")[0].toUpperCase();
    store.login({ code, email: email.trim(), name: `Estudiante ${code}`, initials: code.slice(0, 2) });
  }

  return (
    <AuthShell title="Inicia sesión" subtitle="Entra con tu correo de la UTP.">
      <form onSubmit={submit} className="space-y-4" noValidate>
        <Field label="Correo institucional" error={tried && emailErr}>
          <input className="input" type="email" autoComplete="email" placeholder="U20240001@utp.edu.pe" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label="Contraseña" error={tried && passErr}>
          <input className="input" type="password" autoComplete="current-password" value={pass} onChange={(e) => setPass(e.target.value)} />
        </Field>
        <button className="btn-primary h-11 w-full">Entrar</button>
      </form>
      <p className="mt-6 text-center text-sm text-sub">
        ¿Primera vez?{" "}
        <Link to="/registro" className="font-semibold text-brand hover:underline">
          Crea tu cuenta
        </Link>
      </p>
    </AuthShell>
  );
}
