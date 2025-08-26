import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pb: {
          gold: "#d4af37",
          black: "#0a0a0a",
          purple: "#6b2bbf",
          indigo: "#3f51b5",
          white: "#ffffff",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;