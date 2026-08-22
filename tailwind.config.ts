import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0A0F0D",
        surface: "#101714",
        panel: "#0D1310",
        emerald: {
          DEFAULT: "#10B981",
          soft: "#34D399",
          dim: "#0B7A56",
        },
        deepblue: "#1E3A5F",
        cyan: "#22D3EE",
        ink: {
          DEFAULT: "#F4F7F5",
          dim: "#8FA39C",
          faint: "#5C6D67",
        },
        border: "rgba(244, 247, 245, 0.08)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 20% 20%, rgba(16,185,129,0.12), transparent 40%), radial-gradient(circle at 80% 0%, rgba(34,211,238,0.10), transparent 35%), radial-gradient(circle at 50% 100%, rgba(30,58,95,0.25), transparent 45%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(16, 185, 129, 0.15)",
        "glow-cyan": "0 0 40px rgba(34, 211, 238, 0.15)",
        panel: "0 8px 32px rgba(0,0,0,0.4)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
