import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7c6cf7",
        soft: "#f6f5ff",
      },
      boxShadow: {
        card: "0 8px 24px rgba(89, 79, 170, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
