import { Bookmark, LogOut, MessageSquareText } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import ProfessorCard from "../components/ProfessorCard";
import ReviewItem from "../components/ReviewItem";
import { toast } from "../components/Toast";
import Aside from "../components/Aside";
import { Empty, PageHeader, Stat } from "../components/ui";
import { faculties, getFaculty, getProfessor, getSedeName, sedes } from "../data/db";
import { store, useStore } from "../lib/store";

export default function Profile() {
  const user = useStore((s) => s.user)!;
  const mine = useStore((s) => s.reviews);
  const favorites = useStore((s) => s.favorites);
  const helpful = useStore((s) => s.helpful);
  const [form, setForm] = useState({ name: user.name, fac: user.fac ?? "", sede: user.sede ?? "" });

  const avg = mine.length ? mine.reduce((s, r) => s + r.score, 0) / mine.length : 0;

  function save(e: FormEvent) {
    e.preventDefault();
    const name = form.name.trim() || user.name;
    const parts = name.split(/\s+/);
    store.updateUser({
      name,
      initials: ((parts[0]?.[0] ?? "E") + (parts[1]?.[0] ?? parts[0]?.[1] ?? "")).toUpperCase(),
      fac: form.fac || undefined,
      sede: form.sede || undefined,
    });
    toast("Datos guardados");
  }

  return (
    <>
      <PageHeader
        title={user.name}
        subtitle={[user.email, user.fac && getFaculty(user.fac)?.name, user.sede && getSedeName(user.sede)].filter(Boolean).join(" · ")}
        actions={
          <button className="btn-outline" onClick={store.logout}>
            <LogOut size={16} /> Cerrar sesión
          </button>
        }
      />

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Reseñas escritas" value={mine.length} />
        <Stat label="Nota media que das" value={avg ? avg.toFixed(1) : "—"} />
        <Stat label="Docentes guardados" value={favorites.length} />
        <Stat label="Votos útiles" value={Object.values(helpful).filter(Boolean).length} />
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <MessageSquareText size={18} /> Mis reseñas
          </h2>
          {mine.length ? (
            <div className="space-y-4">
              {[...mine].reverse().map((r) => (
                <ReviewItem key={r.id} r={r} showProf={getProfessor(r.profId)?.name} />
              ))}
            </div>
          ) : (
            <div>
              <Empty icon={<MessageSquareText />} title="Aún no escribes reseñas">
                <Link to="/docentes" className="link">
                  Busca a un docente
                </Link>{" "}
                que hayas llevado y cuenta cómo te fue.
              </Empty>
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <Bookmark size={18} /> Guardados
          </h2>
          {favorites.length ? (
            <div className="rule">
              {favorites.map((id) => {
                const p = getProfessor(id);
                return p && <ProfessorCard key={id} p={p} />;
              })}
            </div>
          ) : (
            <Empty icon={<Bookmark />} title="Nada guardado todavía">
              Usa el marcador en cualquier docente para tenerlo a mano.
            </Empty>
          )}
        </section>
      </div>

      <Aside>
        <form onSubmit={save} className="card space-y-4 p-6">
          <h2 className="font-semibold">Mis datos</h2>
          <label className="block">
            <span className="label">Nombre</span>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label className="block">
            <span className="label">Facultad</span>
            <select className="input" value={form.fac} onChange={(e) => setForm({ ...form, fac: e.target.value })}>
              <option value="">Sin especificar</option>
              {faculties.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="label">Sede</span>
            <select className="input" value={form.sede} onChange={(e) => setForm({ ...form, sede: e.target.value })}>
              <option value="">Sin especificar</option>
              {sedes.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          <div className="text-xs text-sub">Código: {user.code}</div>
          <button className="btn-primary w-full">Guardar cambios</button>
        </form>
      </Aside>
    </>
  );
}
