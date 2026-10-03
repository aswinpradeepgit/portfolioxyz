export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-soft": "rgb(var(--accent-soft) / <alpha-value>)",
        "on-accent": "rgb(var(--on-accent) / <alpha-value>)",
        board: {
          DEFAULT: "#0B0A08",
          cell: "#1A1814",
          ink: "#F5E9C8",
          amber: "#F5B840",
          dim: "#8C8270",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ["Bricolage Grotesque", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Newsreader", "Georgia", "Cambria", "serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      maxWidth: {
        content: "1100px",
      },
    },
  },
  plugins: [],
}
