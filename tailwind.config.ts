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
      "white-200": "#F2F1F1",
      "slate-100": "#E4E4E7",
      "slate-300": "#c2bcbc",
      "slate-600": "#A1A1AA",
      black: "#151515",
      // "grey-400": "#A4A5AB",
      "grey-400": "#707079",
      "grey-100": "#F2F2F2",
      "yellow-100": "#FFDFCD",
      "slate-gray": "#6D6D6D",
      "red-500": "#ef4444",
      "green-500": "#22c55e",
      "amber-500": "#f59e0b",
      "blue-500": "#3b82f6",
    },
    fontFamily: {
      roboSlab: ["var(--font-robotoSlab)"],
      cousine: ["var(--font-cousine)"],
      montserrat: ["var(--font-montserrat)"],
    },
    extend: {
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
