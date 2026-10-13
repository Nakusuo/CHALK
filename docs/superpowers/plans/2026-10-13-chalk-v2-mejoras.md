# CHALK v2 — Plan de mejoras

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Llevar CHALK v2 (Vite + React + TS) de "funciona" a "listo para publicar": calidad de código, tests, UX más pulida, edición de reseñas, rendimiento y despliegue automático, entregado como release `v2.0.0` siguiendo git flow.

**Architecture:** La app sigue siendo 100 % estática (sin backend). La lógica de dominio vive en `src/data/db.ts` (funciones puras) y el estado en `src/lib/store.ts` (store sobre `localStorage` con `useSyncExternalStore`). Cada mejora es una rama `feature/*` desde `develop` que se integra con `--no-ff`; al final se corta `release/2.0.0`, se mergea a `main`, se etiqueta `v2.0.0` y se devuelve a `develop`.

**Tech Stack:** Vite 5.4, React 18.3, TypeScript 5.6, Tailwind 3.4, React Router 6.28, Vitest 2.1, Testing Library, ESLint 9 (flat config), Prettier 3, GitHub Actions.

**Spec:** este documento (no hay spec aparte; el alcance lo fijó el usuario: "mismas funciones + mejoras", diseño "moderno limpio").

## Global Constraints

- Textos de la interfaz en español neutro peruano, tuteo ("Escribe tu reseña").
- Claves de `localStorage` existentes NO cambian: `chalk_user`, `chalk_reviews`, `chalk_helpful`, `chalk_favorites`, `chalk_theme`.
- Routing con `HashRouter` (debe funcionar en GitHub Pages sin rewrites).
- Versiones de dependencias fijadas exactas (sin `^`) con `npm i -E`.
- Cada rama termina con `npm run lint && npm test && npm run build` en verde antes del merge.
- Commits en formato Conventional Commits en español (`feat:`, `fix:`, `chore:`, `test:`, `docs:`), con la línea `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Nada se sube (`git push`) sin confirmación explícita del usuario.

## Git flow

```
main ───────────────────────────────●──────────── v2.0.0
                                   /  \
develop ──●──●──●──●──●──●──●─────●────●──────────
          │  │  │  │  │  │  │   release/2.0.0
          │  │  │  │  │  │  └ feature/deploy-pages
          │  │  │  │  │  └ feature/code-splitting
          │  │  │  │  └ feature/editar-resena
          │  │  │  └ feature/toasts-y-deshacer (+ feature/fix-preview-voto antes)
          │  │  └ feature/tests-dominio
          │  └ feature/tooling
          └ feature/react-v2 (ya hecho)
```

Comandos por cada feature (se repiten en cada tarea):

```bash
git switch develop
git switch -c feature/<nombre>
# ...trabajo y commits...
npm run lint && npm test && npm run build
git switch develop
git merge --no-ff feature/<nombre> -m "merge: feature/<nombre>"
git branch -d feature/<nombre>
```

## Mapa de archivos

| Archivo | Responsabilidad | Tarea |
|---|---|---|
| `eslint.config.js`, `.prettierrc`, `vitest.config.ts`, `src/test/setup.ts` | Tooling | 1 |
| `.github/workflows/ci.yml` | CI: lint + test + build en cada PR | 1 |
| `src/data/db.test.ts` | Tests de funciones puras | 2 |
| `src/lib/store.ts`, `src/lib/store.test.ts` | Store + `updateReview` + `restoreReview` | 2, 4, 5 |
| `src/components/Toast.tsx` | Toasts globales con acción "Deshacer" | 4 |
| `src/components/ReviewItem.tsx` | Borrar con deshacer, botón Editar | 4, 5 |
| `src/pages/Review.tsx` | Modo edición (`?edit=<id>`) | 5 |
| `src/App.tsx` | `React.lazy` por ruta + `Suspense` | 6 |
| `.github/workflows/deploy.yml` | Deploy a GitHub Pages | 7 |
| `README.md`, `docs/capturas/*` | Docs y capturas v2 | 8 |

---

### Task 0: Integrar `feature/react-v2` en `develop`

**Files:** ninguno nuevo.

- [ ] **Step 1: Merge**

```bash
git switch develop
git merge --no-ff feature/react-v2 -m "merge: feature/react-v2"
git branch -d feature/react-v2
```

- [ ] **Step 2: Verificar**

Run: `npm ci && npm run build`
Expected: `✓ built in …` sin errores de TypeScript.

---

### Task 1: Tooling (ESLint, Prettier, Vitest, CI) — `feature/tooling`

**Files:**
- Create: `eslint.config.js`, `.prettierrc`, `vitest.config.ts`, `src/test/setup.ts`, `src/smoke.test.ts`, `.github/workflows/ci.yml`
- Modify: `package.json` (scripts), `tsconfig.json` (types)

**Interfaces:**
- Produces: scripts `npm run lint`, `npm test`, `npm run format`; entorno jsdom con `@testing-library/jest-dom`.

- [ ] **Step 1: Instalar**

```bash
npm i -D -E vitest@2.1.5 jsdom@25.0.1 @testing-library/react@16.0.1 @testing-library/jest-dom@6.6.3 @testing-library/user-event@14.5.2 eslint@9.15.0 @eslint/js@9.15.0 typescript-eslint@8.15.0 eslint-plugin-react-hooks@5.0.0 globals@15.12.0 prettier@3.3.3
```

- [ ] **Step 2: Configs**

`vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", setupFiles: ["./src/test/setup.ts"], globals: false },
});
```

`src/test/setup.ts`:
```ts
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
  localStorage.clear();
});
```

`eslint.config.js`:
```js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: { globals: globals.browser },
    plugins: { "react-hooks": reactHooks },
    rules: { ...reactHooks.configs.recommended.rules },
  },
);
```

`.prettierrc`:
```json
{ "printWidth": 140, "semi": true, "singleQuote": false, "trailingComma": "all" }
```

`package.json` → `scripts`:
```json
"dev": "vite",
"build": "tsc -b && vite build",
"preview": "vite preview",
"lint": "eslint .",
"format": "prettier --write src",
"test": "vitest run",
"test:watch": "vitest"
```

`tsconfig.json` → añadir `"vitest.config.ts"` a `include` (los tests importan `describe/it/expect` desde `vitest`, no se usan globales).

- [ ] **Step 3: Test humo**

`src/smoke.test.ts`:
```ts
import { expect, it } from "vitest";
import { professors } from "./data/db";

it("carga los 20 docentes de ejemplo", () => {
  expect(professors).toHaveLength(20);
});
```

Run: `npm test` → Expected: `1 passed`.
Run: `npm run lint` → Expected: sin errores. Si `react-hooks/rules-of-hooks` marca `Professor.tsx`/`Review.tsx` por el `return` temprano, verificar que todos los hooks estén antes del `if (!p)` (ya lo están).

- [ ] **Step 4: CI**

`.github/workflows/ci.yml`:
```yaml
name: CI
on:
  pull_request:
  push:
    branches: [develop, main]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

- [ ] **Step 5: Commit y merge**

```bash
git add -A
git commit -m "chore: ESLint, Prettier, Vitest y CI"
# merge según la sección Git flow
```

---

### Task 2: Tests del dominio y del store — `feature/tests-dominio`

**Files:**
- Create: `src/data/db.test.ts`, `src/lib/store.test.ts`
- Modify: `src/lib/store.ts` (exportar `resetStoreForTests`)

**Interfaces:**
- Consumes: `profStats`, `profBadge`, `difficultyLabel`, `dateRank`, `isValidEmail`, `isValidCode`, `allCourses`, `getProfessor` de `src/data/db.ts`; `store` de `src/lib/store.ts`.
- Produces: `resetStoreForTests(): void` en `src/lib/store.ts` (relee `localStorage`).

- [ ] **Step 1: Tests de db (deben pasar ya: documentan el comportamiento)**

`src/data/db.test.ts`:
```ts
import { describe, expect, it } from "vitest";
import { allCourses, dateRank, difficultyLabel, getProfessor, isValidCode, isValidEmail, profBadge, profStats } from "./db";
import type { Review } from "./types";

const p1 = getProfessor(1)!;
const review = (score: number): Review => ({
  id: "user-1", profId: 1, user: "X", initials: "X", date: "Mayo 2025", score, tags: [], tagType: [],
  text: "", helpful: 0, course: "Principios de Algoritmos", difficulty: 3, wouldTakeAgain: true,
});

describe("validadores", () => {
  it("acepta correo UTP", () => expect(isValidEmail("U20240001@utp.edu.pe")).toBe(true));
  it("rechaza otro dominio", () => expect(isValidEmail("U2024@gmail.com")).toBe(false));
  it("código necesita 6+ dígitos", () => {
    expect(isValidCode("U123456")).toBe(true);
    expect(isValidCode("U12345")).toBe(false);
  });
});

describe("profStats", () => {
  it("sin reseñas propias usa la nota semilla", () => {
    expect(profStats(p1, [])).toEqual({ score: 4.7, count: 134 });
  });
  it("promedia reseñas del usuario con las semilla", () => {
    const { score, count } = profStats(p1, [review(1)]);
    expect(count).toBe(135);
    expect(score).toBeCloseTo((4.7 * 134 + 1) / 135, 5);
  });
  it("ignora reseñas de otros docentes", () => {
    expect(profStats(p1, [{ ...review(1), profId: 2 }]).count).toBe(134);
  });
});

describe("profBadge", () => {
  it("top si score ≥ 4.7 y ≥ 90 % lo volvería a llevar", () => {
    expect(profBadge({ ...p1, wouldTakeAgain: 95 }, 4.8)?.type).toBe("top");
  });
  it("null si no cumple nada", () => {
    expect(profBadge({ ...p1, wouldTakeAgain: 50, historicalRatings: [] }, 3)).toBeNull();
  });
});

it("difficultyLabel por tramos", () => {
  expect([1, 2, 3, 4, 5].map(difficultyLabel)).toEqual(["Muy fácil", "Fácil", "Moderado", "Difícil", "Muy difícil"]);
});

it("dateRank ordena 'Junio 2025' después de 'Mayo 2025'", () => {
  expect(dateRank({ ...review(5), date: "Junio 2025" })).toBeGreaterThan(dateRank(review(5)));
});

it("allCourses no repite cursos y está ordenado", () => {
  const names = allCourses().map((c) => c.name);
  expect(new Set(names).size).toBe(names.length);
  expect([...names].sort((a, b) => a.localeCompare(b))).toEqual(names);
});
```

Run: `npm test` → Expected: todos PASS.

- [ ] **Step 2: Test del store (falla: falta `resetStoreForTests`)**

`src/lib/store.test.ts`:
```ts
import { beforeEach, describe, expect, it } from "vitest";
import { resetStoreForTests, store } from "./store";

beforeEach(() => {
  localStorage.clear();
  resetStoreForTests();
});

describe("store", () => {
  it("login persiste en chalk_user", () => {
    store.login({ code: "U1", email: "U1@utp.edu.pe", name: "A", initials: "A" });
    expect(JSON.parse(localStorage.getItem("chalk_user")!).code).toBe("U1");
  });

  it("addReview genera id user-* y deleteReview lo quita", () => {
    const r = store.addReview({
      profId: 1, user: "A", initials: "A", date: "Mayo 2025", score: 4, tags: [], tagType: [],
      text: "hola", helpful: 0, course: "X", difficulty: 3, wouldTakeAgain: true,
    });
    expect(r.id).toMatch(/^user-/);
    store.deleteReview(r.id);
    expect(store.get().reviews).toHaveLength(0);
  });

  it("toggleFavorite alterna", () => {
    store.toggleFavorite(3);
    expect(store.get().favorites).toEqual([3]);
    store.toggleFavorite(3);
    expect(store.get().favorites).toEqual([]);
  });

  it("lee datos previos de la v1", () => {
    localStorage.setItem("chalk_helpful", JSON.stringify({ "seed-1": true }));
    resetStoreForTests();
    expect(store.get().helpful["seed-1"]).toBe(true);
  });
});
```

Run: `npm test` → Expected: FAIL `resetStoreForTests is not exported`.

- [ ] **Step 3: Implementar** — en `src/lib/store.ts` convertir la inicialización en función:

```ts
function load(): State {
  return {
    user: read(KEYS.user, null),
    reviews: read(KEYS.reviews, []),
    helpful: read(KEYS.helpful, {}),
    favorites: read(KEYS.favorites, []),
  };
}

let state: State = load();

/** Solo para tests: vuelve a leer localStorage. */
export function resetStoreForTests() {
  state = load();
}
```

Run: `npm test` → Expected: PASS.

- [ ] **Step 4: Commit y merge**

```bash
git add -A
git commit -m "test: dominio y store"
```

---

### Task 3: Bug — el voto "Útil" de la vista previa contamina el store — `feature/fix-preview-voto`

**Contexto:** en `Review.tsx` el paso 5 renderiza `<ReviewItem r={draft} />` con `id: "preview"`; pulsar "Útil" guarda `chalk_helpful.preview = true`.

**Files:**
- Modify: `src/components/ReviewItem.tsx`
- Modify: `src/pages/Review.tsx:~250` (paso 4)
- Test: `src/components/ReviewItem.test.tsx`

**Interfaces:**
- Produces: prop `readOnly?: boolean` en `ReviewItem`.

- [ ] **Step 1: Test que falla**

`src/components/ReviewItem.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import ReviewItem from "./ReviewItem";
import type { Review } from "../data/types";

const r: Review = {
  id: "preview", profId: 1, user: "A", initials: "A", date: "Mayo 2025", score: 4, tags: [], tagType: [],
  text: "texto", helpful: 0, course: "X", difficulty: 3, wouldTakeAgain: true,
};

it("en modo readOnly no muestra acciones", () => {
  render(<ReviewItem r={r} readOnly />);
  expect(screen.queryByRole("button", { name: /útil/i })).toBeNull();
});
```

Run: `npm test -- ReviewItem` → FAIL (el botón existe).

- [ ] **Step 2: Implementar** — en `ReviewItem` añadir `readOnly` a las props y envolver el bloque `<div className="ml-auto flex items-center gap-1">…</div>` en `{!readOnly && (…)}`. En `Review.tsx` usar `<ReviewItem r={draft} readOnly />`.

- [ ] **Step 3:** `npm test` PASS → commit `fix: la vista previa de reseña no registra votos` → merge.

---

### Task 4: Toasts y "Deshacer" al borrar — `feature/toasts-y-deshacer`

**Files:**
- Create: `src/components/Toast.tsx`, `src/components/Toast.test.tsx`
- Modify: `src/lib/store.ts` (`restoreReview`), `src/components/ReviewItem.tsx`, `src/App.tsx`, `src/pages/Profile.tsx` (usar toast en "Guardar cambios")

**Interfaces:**
- Produces:
  - `store.restoreReview(review: Review): void` — reinserta respetando el orden por `createdAt`.
  - `toast(message: string, action?: { label: string; onClick: () => void }): void` exportado de `Toast.tsx`.
  - `<Toaster />` montado una vez en `App.tsx` dentro de `HashRouter`.

- [ ] **Step 1: Test que falla**

`src/components/Toast.test.tsx`:
```tsx
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { Toaster, toast } from "./Toast";

it("muestra el mensaje y ejecuta la acción", async () => {
  const undo = vi.fn();
  render(<Toaster />);
  act(() => toast("Reseña borrada", { label: "Deshacer", onClick: undo }));
  expect(screen.getByRole("status")).toHaveTextContent("Reseña borrada");
  await userEvent.click(screen.getByRole("button", { name: "Deshacer" }));
  expect(undo).toHaveBeenCalledOnce();
  expect(screen.queryByText("Reseña borrada")).toBeNull();
});
```

Run → FAIL (módulo no existe).

- [ ] **Step 2: Implementar `Toast.tsx`**

```tsx
import { useEffect, useState } from "react";

type Action = { label: string; onClick: () => void };
type Item = { id: number; message: string; action?: Action };

let push: (i: Item) => void = () => {};
let seq = 0;

export function toast(message: string, action?: Action) {
  push({ id: ++seq, message, action });
}

export function Toaster() {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    push = (i) => setItems((cur) => [...cur.slice(-2), i]);
    return () => {
      push = () => {};
    };
  }, []);
  useEffect(() => {
    if (!items.length) return;
    const t = setTimeout(() => setItems((cur) => cur.slice(1)), 5000);
    return () => clearTimeout(t);
  }, [items]);
  const dismiss = (id: number) => setItems((cur) => cur.filter((x) => x.id !== id));

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4">
      {items.map((i) => (
        <div key={i.id} role="status" className="flex items-center gap-4 rounded-xl bg-fg px-4 py-3 text-sm text-bg shadow-lg">
          {i.message}
          {i.action && (
            <button
              className="font-semibold text-brand-100 hover:underline"
              onClick={() => {
                i.action!.onClick();
                dismiss(i.id);
              }}
            >
              {i.action.label}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: `restoreReview` en el store (con test)** — añadir a `store.test.ts`:

```ts
it("restoreReview devuelve una reseña borrada", () => {
  const r = store.addReview({
    profId: 1, user: "A", initials: "A", date: "Mayo 2025", score: 4, tags: [], tagType: [],
    text: "x", helpful: 0, course: "X", difficulty: 3, wouldTakeAgain: true,
  });
  store.deleteReview(r.id);
  store.restoreReview(r);
  expect(store.get().reviews.map((x) => x.id)).toEqual([r.id]);
});
```

Implementación en `store`:
```ts
restoreReview: (r: Review) =>
  set({ reviews: [...state.reviews, r].sort((a, b) => (a.createdAt ?? "").localeCompare(b.createdAt ?? "")) }),
```

- [ ] **Step 4: Cablear**
  - `App.tsx`: renderizar `<Toaster />` justo dentro de `<HashRouter>`.
  - `ReviewItem.tsx`, botón Borrar:
    ```tsx
    onClick={() => {
      store.deleteReview(r.id);
      toast("Reseña borrada", { label: "Deshacer", onClick: () => store.restoreReview(r) });
    }}
    ```
  - `Profile.tsx`: quitar el estado `saved` y el `setTimeout`; tras `store.updateUser(...)` llamar `toast("Datos guardados")`; el botón vuelve a decir siempre "Guardar cambios".
  - `ProfessorCard.tsx` `FavoriteButton`: tras `toggleFavorite`, `toast(fav ? "Quitado de guardados" : "Docente guardado")`.

- [ ] **Step 5:** `npm run lint && npm test && npm run build` → commit `feat: toasts y deshacer al borrar reseñas` → merge.

---

### Task 5: Editar reseña propia — `feature/editar-resena`

**Files:**
- Modify: `src/lib/store.ts` (`updateReview`), `src/pages/Review.tsx`, `src/components/ReviewItem.tsx`
- Test: `src/lib/store.test.ts`, `src/pages/Review.test.tsx`

**Interfaces:**
- Consumes: `toast` (Task 4), `ReviewItem` `readOnly` (Task 3).
- Produces: `store.updateReview(id: string, patch: Partial<Review>): void`; ruta `/docentes/:id/resena?edit=<reviewId>`.
- Para poder precargar criterios hay que guardarlos: añadir `criteria?: Record<CriteriaKey, number>` a `Review` en `src/data/types.ts` y guardarlo en `submit()`. Reseñas antiguas sin `criteria` se precargan con `score` en los 6 criterios.

- [ ] **Step 1: Test del store (falla)**

```ts
it("updateReview modifica solo la reseña indicada", () => {
  const r = store.addReview({
    profId: 1, user: "A", initials: "A", date: "Mayo 2025", score: 4, tags: [], tagType: [],
    text: "antes", helpful: 0, course: "X", difficulty: 3, wouldTakeAgain: true,
  });
  store.updateReview(r.id, { text: "después" });
  expect(store.get().reviews[0]).toMatchObject({ id: r.id, text: "después", score: 4 });
});
```

Implementación:
```ts
updateReview: (id: string, patch: Partial<Review>) =>
  set({ reviews: state.reviews.map((r) => (r.id === id ? { ...r, ...patch, id: r.id } : r)) }),
```

- [ ] **Step 2: Test de la página (falla)**

`src/pages/Review.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, expect, it } from "vitest";
import { resetStoreForTests, store } from "../lib/store";
import ReviewPage from "./Review";

beforeEach(() => {
  localStorage.clear();
  resetStoreForTests();
  store.login({ code: "U1", email: "U1@utp.edu.pe", name: "A", initials: "A" });
});

it("en modo edición precarga el texto y muestra 'Guardar cambios' al final", () => {
  const r = store.addReview({
    profId: 1, user: "A", initials: "A", date: "Mayo 2025", score: 4, tags: [], tagType: [],
    text: "Texto original suficientemente largo", helpful: 0, course: "Principios de Algoritmos",
    difficulty: 3, wouldTakeAgain: true, workload: "light",
  });
  render(
    <MemoryRouter initialEntries={[`/docentes/1/resena?edit=${r.id}`]}>
      <Routes>
        <Route path="/docentes/:id/resena" element={<ReviewPage />} />
      </Routes>
    </MemoryRouter>,
  );
  expect(screen.getByText(/editar reseña/i)).toBeInTheDocument();
  // criterios precargados → "Continuar" habilitado en el paso 1
  expect(screen.getByRole("button", { name: "Continuar" })).toBeEnabled();
});
```

- [ ] **Step 3: Implementar en `Review.tsx`**
  - `const [params] = useSearchParams(); const editing = userReviews.find((r) => r.id === params.get("edit") && r.profId === p?.id);`
  - Inicializar cada `useState` desde `editing` cuando exista, por ejemplo:
    ```ts
    const [criteria, setCriteria] = useState(() =>
      editing?.criteria ?? (Object.fromEntries(KEYS.map((k) => [k, editing?.score ?? 0])) as Record<CriteriaKey, number>),
    );
    const [text, setText] = useState(editing?.text ?? "");
    // idem difficulty, wta (editing?.wouldTakeAgain ?? null), workload, course,
    // tags: editing ? editing.tags.map((t, i) => ({ t, type: editing.tagType[i] ?? "neu" })) : []
    ```
  - Sobre el título del paso añadir `{editing && <span className="eyebrow text-brand">Editar reseña</span>}`.
  - `submit()`: `if (editing) { store.updateReview(editing.id, { ...data, date: editing.date }); toast("Reseña actualizada"); nav(`/docentes/${p.id}`); return; }` y añadir `criteria` a `data`.
  - Botón final: `{editing ? "Guardar cambios" : "Publicar reseña"}`.
- [ ] **Step 4: `ReviewItem.tsx`** — junto a Borrar, si `mine && !readOnly`:
  ```tsx
  <Link to={`/docentes/${r.profId}/resena?edit=${r.id}`} className="btn-ghost h-8 px-2 text-xs text-sub">
    <Pencil size={14} /> Editar
  </Link>
  ```
- [ ] **Step 5:** verde → commit `feat: editar reseñas propias` → merge.

---

### Task 6: Code splitting por ruta — `feature/code-splitting`

**Files:** Modify `src/App.tsx`.

- [ ] **Step 1: Medir antes** — `npm run build`, anotar el tamaño de `assets/index-*.js` (hoy ≈ 250 kB / 76 kB gzip).
- [ ] **Step 2: Implementar** — reemplazar los imports de páginas autenticadas por:
  ```tsx
  import { lazy, Suspense } from "react";
  const Home = lazy(() => import("./pages/Home"));
  const ProfessorPage = lazy(() => import("./pages/Professor"));
  const ReviewPage = lazy(() => import("./pages/Review"));
  const Faculties = lazy(() => import("./pages/Faculties"));
  const Courses = lazy(() => import("./pages/Courses"));
  const Compare = lazy(() => import("./pages/Compare"));
  const Profile = lazy(() => import("./pages/Profile"));
  ```
  `Login`, `Register`, `NotFound` siguen estáticos. En `Layout.tsx` envolver `<Outlet />` con
  `<Suspense fallback={<div className="py-24 text-center text-sm text-sub">Cargando…</div>}>`.
- [ ] **Step 3: Medir después** — `npm run build` debe mostrar varios chunks; el `index-*.js` inicial tiene que bajar. Navegar todas las rutas con `npm run preview` sin errores en consola.
- [ ] **Step 4:** commit `perf: carga diferida de páginas` → merge.

---

### Task 7: Deploy a GitHub Pages — `feature/deploy-pages`

**Files:** Create `.github/workflows/deploy.yml`.

- [ ] **Step 1:**
```yaml
name: Deploy
on:
  push:
    branches: [main]
permissions: { contents: read, pages: write, id-token: write }
concurrency: { group: pages, cancel-in-progress: true }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci && npm test && npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: "${{ steps.d.outputs.page_url }}" }
    steps:
      - id: d
        uses: actions/deploy-pages@v4
```
`vite.config.ts` ya usa `base: "./"` y `HashRouter`, así que no hace falta más.
- [ ] **Step 2:** `npm run build && npx vite preview` → abrir `/`, entrar, navegar a `#/docentes/1`, recargar: debe seguir en la misma página.
- [ ] **Step 3:** commit `ci: deploy a GitHub Pages` → merge.
- [ ] **Paso manual del usuario:** en GitHub → Settings → Pages → Source: "GitHub Actions".

---

### Task 8: Release 2.0.0

**Files:** Modify `README.md`, `package.json` (versión), Create `docs/capturas/*.png` (v2), `CHANGELOG.md`.

- [ ] **Step 1: Cortar release**
```bash
git switch develop
git switch -c release/2.0.0
```
- [ ] **Step 2: Capturas nuevas** — `npm run dev`, tomar capturas (claro y oscuro) de login, docentes, perfil docente, facultades y reseña; guardarlas en `docs/capturas/` con los mismos nombres que usa el README; quitar del README la nota "Las capturas de arriba son de la versión 1".
- [ ] **Step 3: `CHANGELOG.md`**
```md
# Changelog

## 2.0.0 — 2026-10-13
- Reescritura en Vite + React + TypeScript con diseño nuevo y modo claro/oscuro.
- Docentes guardados, filtros en la URL, filtro de reseñas por curso.
- Editar y borrar (con deshacer) tus reseñas; edición de perfil.
- Comparar muestra quién gana en más criterios.
- Tests (Vitest), lint, CI y deploy automático a GitHub Pages.
```
- [ ] **Step 4:** `"version": "2.0.0"` en `package.json` (ya lo está; verificar). `npm run lint && npm test && npm run build` verde. Commit `docs: release 2.0.0`.
- [ ] **Step 5: Cerrar release**
```bash
git switch main
git merge --no-ff release/2.0.0 -m "release: 2.0.0"
git tag -a v2.0.0 -m "CHALK 2.0.0"
git switch develop
git merge --no-ff release/2.0.0 -m "merge: release/2.0.0 a develop"
git branch -d release/2.0.0
```
- [ ] **Step 6: Publicar (solo con OK del usuario)**
```bash
git push origin main develop --follow-tags
```

---

## Fuera de alcance (backlog para v2.1)

- Backend real / autenticación de verdad (hoy todo es `localStorage`).
- Moderación de reseñas y reportes.
- i18n.
