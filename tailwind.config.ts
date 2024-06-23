import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "yellow-600": "#EE4610",
      "yellow-400": "#F68B1D",
      white: "#fff",
      black: "#151515",
      // "grey-400": "#A4A5AB",
      "grey-400": "#707079",
      "grey-100": "#F2F2F2",
      "yellow-100": "#FFDFCD",
      "slate-gray": "#6D6D6D",
    },
    fontFamily: {
      roboSlab: ["var(--font-robotoSlab)"],
      cousine: ["var(--font-cousine)"],
      montserrat: ["var(--font-montserrat)"],
    },
  },
  plugins: [],
};
export default config;
