import { ArrowLeft, Check, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import ReviewItem from "../components/ReviewItem";
import { toast } from "../components/Toast";
import { Avatar, cx, Stars } from "../components/ui";
import { criteriaHints, criteriaLabels, difficultyLabel, getProfessor, MONTHS, profMetrics, tagCategories, workloadLabels } from "../data/db";
import type { CriteriaKey, Review, Workload } from "../data/types";
import { store, useStore } from "../lib/store";
import NotFound from "./NotFound";

const STEPS = ["Criterios", "Experiencia", "Etiquetas", "Comentario", "Revisar"];
const KEYS = Object.keys(criteriaLabels) as CriteriaKey[];
const MAX_TAGS = 3;
const MIN_TEXT = 20;

function StarInput({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex" role="radiogroup" aria-label={label} onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((i) => (
        <button key={i} type="button" role="radio" aria-checked={value === i} aria-label={`${i} estrellas`} className="p-0.5" onMouseEnter={() => setHover(i)} onClick={() => onChange(i)}>
          <Star size={26} strokeWidth={1.5} className={(hover || value) >= i ? "text-amber-400" : "text-line"} fill="currentColor" />
        </button>
      ))}
    </div>
  );
}

export default function ReviewPage() {
  const { id } = useParams();
  const p = getProfessor(Number(id));
  const user = useStore((s) => s.user)!;
  const userReviews = useStore((s) => s.reviews);
  const nav = useNavigate();
  const [params] = useSearchParams();
  const editing = userReviews.find((r) => r.id === params.get("edit") && r.profId === p?.id);

  const [step, setStep] = useState(0);
  const [criteria, setCriteria] = useState<Record<CriteriaKey, number>>(
    () => editing?.criteria ?? (Object.fromEntries(KEYS.map((k) => [k, editing?.score ?? 0])) as Record<CriteriaKey, number>),
  );
  const [difficulty, setDifficulty] = useState(editing?.difficulty ?? 3);
  const [wta, setWta] = useState<boolean | null>(editing?.wouldTakeAgain ?? null);
  const [workload, setWorkload] = useState<Workload | "">(editing?.workload ?? "");
  const [tags, setTags] = useState<{ t: string; type: string }[]>(() =>
    editing ? editing.tags.map((t, i) => ({ t, type: editing.tagType[i] ?? "neu" })) : [],
  );
  const [course, setCourse] = useState(editing?.course ?? p?.courses[0] ?? "");
  const [text, setText] = useState(editing?.text ?? "");
  const [done, setDone] = useState(false);

  if (!p) return <NotFound />;

  const rated = KEYS.filter((k) => criteria[k] > 0);
  const avg = rated.length ? rated.reduce((s, k) => s + criteria[k], 0) / rated.length : 0;
  const { score, count, rated: hasRatings } = profMetrics(p, userReviews);

  const canNext = [rated.length === KEYS.length, wta !== null && !!workload, true, text.trim().length >= MIN_TEXT, true][step];
  const hint = ["Califica los 6 criterios para continuar", "Responde si lo volverías a llevar y la carga", "", `Escribe al menos ${MIN_TEXT} caracteres`, ""][step];

  const now = new Date();
  const draft: Review = {
    id: "preview",
    profId: p.id,
    user: user.name,
    initials: user.initials,
    date: `${MONTHS[now.getMonth()]} ${now.getFullYear()}`,
    score: Math.round(avg),
    tags: tags.map((x) => x.t),
    tagType: tags.map((x) => x.type),
    text: text.trim(),
    helpful: 0,
    course,
    difficulty,
    wouldTakeAgain: wta,
    workload,
    authorCode: user.code,
    criteria,
  };

  function toggleTag(t: string, type: string) {
    setTags((cur) => (cur.some((x) => x.t === t) ? cur.filter((x) => x.t !== t) : cur.length < MAX_TAGS ? [...cur, { t, type }] : cur));
  }

  function submit() {
    const { id: _omit, ...data } = draft;
    void _omit;
    if (editing) {
      store.updateReview(editing.id, { ...data, date: editing.date });
      toast("Reseña actualizada");
      nav(`/docentes/${p!.id}`);
      return;
    }
    store.addReview(data);
    setDone(true);
  }

  if (done)
    return (
      <div className="card mx-auto max-w-lg p-10 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-500/10 text-emerald-600">
          <Check size={28} />
        </div>
        <h1 className="mt-4 text-xl font-bold">¡Gracias por tu reseña!</h1>
        <p className="mt-1 text-sm text-sub">Ya aparece en el perfil de {p.name}.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button className="btn-primary" onClick={() => nav(`/docentes/${p.id}`)}>
            Ver perfil
          </button>
          <Link to="/docentes" className="btn-outline">
            Seguir explorando
          </Link>
        </div>
      </div>
    );

  return (
    <>
      <Link to={`/docentes/${p.id}`} className="mb-6 inline-flex items-center gap-1.5 text-sm text-sub hover:text-fg">
        <ArrowLeft size={16} /> {p.name}
      </Link>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="card h-fit p-5 lg:sticky lg:top-24">
          <Avatar size={48}>{p.emoji}</Avatar>
          <div className="mt-3 font-semibold">{p.name}</div>
          <div className="text-sm text-sub">{p.dept}</div>
          <div className="mt-3 flex items-center gap-2 text-sm">
            {hasRatings ? (
              <>
                <b className="font-mono">{score.toFixed(1)}</b> <Stars value={score} size={12} />
                <span className="text-xs text-sub">({count})</span>
              </>
            ) : (
              <span className="text-xs text-sub">Sin reseñas aún</span>
            )}
          </div>
          <ol className="mt-6 space-y-1 border-t border-line pt-4">
            {STEPS.map((s, i) => (
              <li key={s} className={cx("flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm", i === step ? "bg-muted font-semibold" : "text-sub")}>
                <span className={cx("grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold", i < step ? "bg-emerald-500 text-white" : i === step ? "bg-brand text-white" : "bg-muted")}>
                  {i < step ? <Check size={12} /> : i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </aside>

        <section className="card p-6 sm:p-8">
          <div className="mb-6">
            <div className="eyebrow">
              Paso {step + 1} de {STEPS.length}
            </div>
            {editing && <span className="eyebrow ml-2 text-brand">Editar reseña</span>}
            <h1 className="mt-1 text-xl font-bold">{["Califica los criterios", "¿Cómo fue la experiencia?", "Descríbelo en pocas palabras", "Cuéntanos más", "Revisa y publica"][step]}</h1>
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-brand transition-all" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
            </div>
          </div>

          {step === 0 && (
            <div className="divide-y divide-line">
              {KEYS.map((k) => (
                <div key={k} className="flex flex-wrap items-center justify-between gap-2 py-3">
                  <div>
                    <div className="font-medium">{criteriaLabels[k]}</div>
                    <div className="text-xs text-sub">{criteriaHints[k]}</div>
                  </div>
                  <StarInput label={criteriaLabels[k]} value={criteria[k]} onChange={(v) => setCriteria((c) => ({ ...c, [k]: v }))} />
                </div>
              ))}
              {avg > 0 && (
                <div className="pt-4 text-sm text-sub">
                  Promedio: <b className="font-mono text-fg">{avg.toFixed(1)}</b>
                </div>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-8">
              <div>
                <div className="label">Curso que llevaste</div>
                <select className="input" value={course} onChange={(e) => setCourse(e.target.value)}>
                  {p.courses.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <div className="label">
                  Dificultad: <b className="text-fg">{difficulty.toFixed(1)} · {difficultyLabel(difficulty)}</b>
                </div>
                <input type="range" min={1} max={5} step={0.5} value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))} className="w-full accent-brand" />
                <div className="flex justify-between text-xs text-sub">
                  <span>Muy fácil</span>
                  <span>Muy difícil</span>
                </div>
              </div>
              <div>
                <div className="label">¿Lo volverías a llevar?</div>
                <div className="grid grid-cols-2 gap-2">
                  {[true, false].map((v) => (
                    <button key={String(v)} type="button" className={cx("btn-outline h-12", wta === v && "border-brand bg-brand/10 text-brand")} onClick={() => setWta(v)}>
                      {v ? <ThumbsUp size={16} /> : <ThumbsDown size={16} />} {v ? "Sí" : "No"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="label">Carga académica</div>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(workloadLabels) as Workload[]).map((w) => (
                    <button key={w} type="button" className={cx("btn-outline", workload === w && "border-brand bg-brand/10 text-brand")} onClick={() => setWorkload(w)}>
                      {workloadLabels[w]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <p className="text-sm text-sub">
                Elige hasta {MAX_TAGS} ({tags.length}/{MAX_TAGS}). Es opcional.
              </p>
              {(
                [
                  ["Positivas", tagCategories.positivos, "pos"],
                  ["Neutras", tagCategories.neutros, "neu"],
                  ["A mejorar", tagCategories.negativos, "neg"],
                ] as const
              ).map(([title, list, type]) => (
                <div key={title}>
                  <div className="eyebrow mb-2">{title}</div>
                  <div className="flex flex-wrap gap-2">
                    {list.map((t) => {
                      const on = tags.some((x) => x.t === t);
                      return (
                        <button key={t} type="button" className={cx("chip", on && "chip-on")} aria-pressed={on} onClick={() => toggleTag(t, type)}>
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div>
              <textarea
                className="input h-48 resize-none py-3 leading-relaxed"
                maxLength={600}
                placeholder="¿Cómo son sus clases y evaluaciones? ¿Qué le recomendarías a alguien que va a llevar el curso?"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <div className="mt-1.5 text-right text-xs text-sub">{text.length}/600</div>
            </div>
          )}

          {step === 4 && (
            <div className="rounded-xl border border-dashed border-line px-5">
              <ReviewItem r={draft} readOnly />
            </div>
          )}

          <div className="mt-8 flex items-center gap-3 border-t border-line pt-6">
            {step > 0 && (
              <button className="btn-ghost" onClick={() => setStep(step - 1)}>
                Atrás
              </button>
            )}
            {!canNext && hint && <span className="text-xs text-sub">{hint}</span>}
            <div className="ml-auto">
              {step < STEPS.length - 1 ? (
                <button className="btn-primary" disabled={!canNext} onClick={() => setStep(step + 1)}>
                  Continuar
                </button>
              ) : (
                <button className="btn-primary" onClick={submit}>
                  {editing ? "Guardar cambios" : "Publicar reseña"}
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
