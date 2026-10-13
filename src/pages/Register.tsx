import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import AuthShell, { Field } from "../components/AuthShell";
import { faculties, isValidCode, sedes } from "../data/db";
import { store } from "../lib/store";

export default function Register() {
  const [f, setF] = useState({ name: "", last: "", code: "", fac: "", sede: "", pass: "" });
  const [tried, setTried] = useState(false);
  const up = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  const code = f.code.trim().toUpperCase();
  const errors = {
    code: !isValidCode(code) && "Debe empezar con U y tener al menos 6 dígitos",
    fac: !f.fac && "Elige tu facultad",
    pass: f.pass.length < 8 && "Mínimo 8 caracteres",
  };

  function submit(e: FormEvent) {
    e.preventDefault();
    setTried(true);
    if (Object.values(errors).some(Boolean)) return;
    const first = f.name.trim();
    const last = f.last.trim();
    store.login({
      code,
      email: `${code}@utp.edu.pe`,
      name: `${first || "Estudiante"} ${last || code}`.trim(),
      initials: ((first[0] || "E") + (last[0] || "U")).toUpperCase(),
      fac: f.fac,
      sede: f.sede || undefined,
    });
  }

  return (
    <AuthShell title="Crea tu cuenta" subtitle="Solo necesitas tu código de estudiante.">
      <form onSubmit={submit} className="space-y-4" noValidate>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Nombre">
            <input className="input" autoComplete="given-name" value={f.name} onChange={up("name")} />
          </Field>
          <Field label="Apellido">
            <input className="input" autoComplete="family-name" value={f.last} onChange={up("last")} />
          </Field>
        </div>
        <Field label="Código de estudiante" error={tried && errors.code}>
          <input className="input uppercase" placeholder="U20240001" value={f.code} onChange={up("code")} />
          {code && <span className="mt-1.5 block text-xs text-sub">Tu correo será {code}@utp.edu.pe</span>}
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Facultad" error={tried && errors.fac}>
            <select className="input" value={f.fac} onChange={up("fac")}>
              <option value="">Elegir…</option>
              {faculties.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Sede (opcional)">
            <select className="input" value={f.sede} onChange={up("sede")}>
              <option value="">Elegir…</option>
              {sedes.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Contraseña" error={tried && errors.pass}>
          <input className="input" type="password" autoComplete="new-password" value={f.pass} onChange={up("pass")} />
        </Field>
        <button className="btn-primary h-12 w-full text-[15px]">Crear cuenta</button>
      </form>
      <p className="mt-6 text-center text-sm text-sub">
        ¿Ya tienes cuenta?{" "}
        <Link to="/" className="link">
          Inicia sesión
        </Link>
      </p>
    </AuthShell>
  );
}
