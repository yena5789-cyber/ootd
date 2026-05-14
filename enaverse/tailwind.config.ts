import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fff8f0",
        cocoa: "#32231f",
        peach: "#ff7a70",
        blush: "#fff0ed",
      },
      boxShadow: {
        card: "0 18px 42px rgba(88, 56, 35, 0.12)",
        soft: "0 10px 28px rgba(255, 122, 112, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
