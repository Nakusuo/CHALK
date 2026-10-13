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

  it("restoreReview devuelve una reseña borrada", () => {
    const r = store.addReview({
      profId: 1, user: "A", initials: "A", date: "Mayo 2025", score: 4, tags: [], tagType: [],
      text: "x", helpful: 0, course: "X", difficulty: 3, wouldTakeAgain: true,
    });
    store.deleteReview(r.id);
    store.restoreReview(r);
    expect(store.get().reviews.map((x) => x.id)).toEqual([r.id]);
  });

  it("updateReview modifica solo la reseña indicada", () => {
    const r = store.addReview({
      profId: 1, user: "A", initials: "A", date: "Mayo 2025", score: 4, tags: [], tagType: [],
      text: "antes", helpful: 0, course: "X", difficulty: 3, wouldTakeAgain: true,
    });
    store.updateReview(r.id, { text: "después" });
    expect(store.get().reviews[0]).toMatchObject({ id: r.id, text: "después", score: 4 });
  });
});
