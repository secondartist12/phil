import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#08090B",
        carbon: "#202226",
        silver: "#C6C9CD",
        racing: { green: "#A4FF21", red: "#E63946" },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', '"Noto Sans KR"', "sans-serif"],
        sans: ['"Inter Variable"', '"Noto Sans KR"', "system-ui", "sans-serif"],
      },
      letterSpacing: { ultra: "0.32em" },
      keyframes: {
        "scroll-cue": {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "45%": { transform: "scaleY(1)", transformOrigin: "top" },
          "55%": { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
        "hero-in": {
          from: { opacity: "0", transform: "scale(1.06)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        sweep: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(100%)" },
        },
      },
      animation: {
        "scroll-cue": "scroll-cue 2.4s cubic-bezier(.65,0,.35,1) infinite",
        "hero-in": "hero-in 1.6s cubic-bezier(.16,1,.3,1) both",
        "fade-up": "fade-up 1s cubic-bezier(.16,1,.3,1) both",
        sweep: "sweep 3.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
