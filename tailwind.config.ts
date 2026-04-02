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
        brand: {
          DEFAULT: "#FFD200",
          hover: "#E6BD00",
          soft: "rgba(255, 210, 0, 0.2)",
        },
        header: "#000000",
        nav: {
          DEFAULT: "#1F1F1F",
          surface: "#2A2A2A",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F5F5F5",
        },
        text: {
          DEFAULT: "#000000",
          secondary: "#333333",
          muted: "#777777",
        },
        border: {
          DEFAULT: "#E0E0E0",
        },
        card: "#FFFFFF",
 /* Semantic aliases for buttons */
        cta: {
          primary: "#FFD200",
          "primary-hover": "#E6BD00",
          secondary: "#000000",
        },
        primary: {
          DEFAULT: "#FFD200",
          hover: "#E6BD00",
        },
        secondary: "#000000",
        background: "#FFFFFF",
        foreground: "#000000",
        muted: "#777777",
      },
      fontFamily: {
        sans: ["var(--font-instrument-sans)", "sans-serif"],
        heading: ["var(--font-work-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
