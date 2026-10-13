import { useSyncExternalStore } from "react";
import type { Review, User } from "../data/types";

// Claves compatibles con la versión anterior: las sesiones y reseñas guardadas se conservan.
const KEYS = {
  user: "chalk_user",
  reviews: "chalk_reviews",
  helpful: "chalk_helpful",
  favorites: "chalk_favorites",
  theme: "chalk_theme",
} as const;

interface State {
  user: User | null;
  reviews: Review[];
  helpful: Record<string, boolean>;
  favorites: number[];
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* almacenamiento no disponible: el estado vive solo en memoria */
  }
}

let state: State = {
  user: read(KEYS.user, null),
  reviews: read(KEYS.reviews, []),
  helpful: read(KEYS.helpful, {}),
  favorites: read(KEYS.favorites, []),
};

const listeners = new Set<() => void>();

function set(patch: Partial<State>) {
  state = { ...state, ...patch };
  if ("user" in patch) write(KEYS.user, patch.user);
  if ("reviews" in patch) write(KEYS.reviews, patch.reviews);
  if ("helpful" in patch) write(KEYS.helpful, patch.helpful);
  if ("favorites" in patch) write(KEYS.favorites, patch.favorites);
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useStore<T>(selector: (s: State) => T): T {
  return useSyncExternalStore(subscribe, () => selector(state));
}

export const store = {
  get: () => state,
  login: (user: User) => set({ user }),
  logout: () => set({ user: null }),
  updateUser: (patch: Partial<User>) => state.user && set({ user: { ...state.user, ...patch } }),

  addReview(data: Omit<Review, "id" | "createdAt">): Review {
    const review: Review = { ...data, id: "user-" + Date.now(), createdAt: new Date().toISOString() };
    set({ reviews: [...state.reviews, review] });
    return review;
  },
  deleteReview: (id: string) => set({ reviews: state.reviews.filter((r) => r.id !== id) }),

  toggleHelpful: (id: string) => set({ helpful: { ...state.helpful, [id]: !state.helpful[id] } }),

  toggleFavorite(profId: number) {
    const has = state.favorites.includes(profId);
    set({ favorites: has ? state.favorites.filter((f) => f !== profId) : [...state.favorites, profId] });
  },
};

export type Theme = "light" | "dark";

export function getTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(KEYS.theme, theme);
  } catch {
    /* sin persistencia */
  }
}
