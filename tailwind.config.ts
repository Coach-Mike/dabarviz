import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        arc: {
          emerald: "#10b981",
          gold: "#f59e0b",
          rose: "#f43f5e",
          violet: "#8b5cf6",
        },
      },
    },
  },
  plugins: [],
};
export default config;
