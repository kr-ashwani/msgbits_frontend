import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "yellow-800": "#EE5810",
      "yellow-600": "#EE4610",
      "yellow-500": "#F47419",
      "yellow-400": "#F68B1D",
      white: "#fff",
      "white-200": "#F2F1F1",
      "slate-100": "#E4E4E7",
      "slate-300": "#c2bcbc",
      "slate-600": "#A1A1AA",
      black: "#151515",

      "yellow-100": "#FFDFCD",
      "slate-gray": "#6D6D6D",
      "red-500": "#ef4444",
      "green-500": "#22c55e",
      "amber-500": "#f59e0b",
      "blue-500": "#3b82f6",
      "chat-bg": "var(--theme-bg-color)",
      "theme-color": "var(--theme-color)",
      "border-color": "var(--border-color)",
      "setting-icon-color": "var(--settings-icon-color)",
      "body-color": "var(--body-color)",
      "msg-message": "var(--msg-message)",
      "msg-hover-bg": "var(--msg-hover-bg)",
      "theme-bg-color": "var(--theme-bg-color)",
      "button-bg-color": "var(--button-bg-color)",
      "msg-date": "var(--msg-date)",
      "alert-red-500": "#E53E3E",
      "input-bg": "var(--input-bg)",
      "gray-300": "#d1d5db",
      "gray-200": "#e5e7eb",
      "grey-400": "#707079",
      "grey-100": "#F2F2F2",
      "chat-text-bg": "var(--chat-text-bg)",

      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      chart: {
        "1": "hsl(var(--chart-1))",
        "2": "hsl(var(--chart-2))",
        "3": "hsl(var(--chart-3))",
        "4": "hsl(var(--chart-4))",
        "5": "hsl(var(--chart-5))",
      },
    },
    fontFamily: {
      roboSlab: ["var(--font-robotoSlab)"],
      cousine: ["var(--font-cousine)"],
      montserrat: ["var(--font-montserrat)"],
      manrope: ["var(--font-manrope)"],
    },
    extend: {
      borderRadius: {
        "sender-chat-radus": "20px 0 20px 20px",
        "user-chat-radius": "0 20px 20px 20px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      height: {
        "chatRoom-height": "var(--chatRoom-height)",
      },
      backgroundImage: {
        "gradient-button":
          "linear-gradient(100deg, theme(colors[yellow-600]), theme(colors[yellow-400]))",
        "gradient-button-hover":
          "linear-gradient(100deg, theme(colors[yellow-500]), theme(colors[yellow-400]))",
        "gradient-button-click":
          "linear-gradient(100deg, theme(colors[yellow-800]), theme(colors[yellow-600]))",
        "gradient-button-disabled":
          "linear-gradient(100deg, theme(colors[yellow-400]), theme(colors[white-200]))",
        "gradient-overlay-bg": "var(--overlay-bg)",
        "gradient-chat-header-bg": "var(--chat-header-bg)",
      },
      boxShadow: {
        chatAddBtn: "0 0 16px var(--theme-color)",
      },
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
  plugins: [require("tailwindcss-animate")],
};
export default config;
