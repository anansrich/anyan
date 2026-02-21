import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f7f5f0",
        secondary: "#ebe8e0",
        forest: "#1a3c27",
        forestLight: "#2d5016",
        sage: "#9ca986",
        sageLight: "#b8c4a8",
        cream: "#d4dfc4",
        charcoal: "#1a2420",
      },
      fontFamily: {
        display: ["'Anton'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      borderRadius: {
        "organic": "2.5rem",
        "organic-lg": "5rem",
      },
      fontSize: {
        "10vw": "10vw",
        "15vw": "15vw",
        "20vw": "20vw",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
