/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "system-ui", "sans-serif"],
      },
      colors: {
        brand: { DEFAULT: "#70000E", ruby: "#70000E", cherry: "#810100", maroon: "#630000", creme: "#C3B79D", cotton: "#EDEBDD", noir: "#1B1717" },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          ink: "rgb(var(--accent-ink) / <alpha-value>)",
          soft: "rgb(var(--accent-soft) / <alpha-value>)",
        },
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        sub: "rgb(var(--sub) / <alpha-value>)",
      },
      borderRadius: { card: "8px", control: "6px" },
      boxShadow: {
        card: "var(--shadow)",
        lift: "var(--shadow-lift)",
      },
      transitionTimingFunction: { out: "cubic-bezier(0.16, 1, 0.3, 1)" },
    },
  },
  plugins: [],
};
