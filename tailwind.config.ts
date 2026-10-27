import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F7F2EA",
        charcoal: "#202124",
        amber: "#B8753B",
        peach: "#E9B6A4",
        mist: "#A8C8D6",
        ink: "#383532",
        line: "#E8DED2",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "Arial", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(32, 33, 36, 0.08)",
        card: "0 10px 30px rgba(32, 33, 36, 0.06)",
      },
      animation: {
        "float-slow": "float 7s ease-in-out infinite",
        "fade-up": "fadeUp .7s ease both",
      },
      keyframes: {
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        fadeUp: { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
    },
  },
  plugins: [],
};

export default config;
