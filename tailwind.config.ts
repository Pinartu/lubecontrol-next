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
        primary: {
          DEFAULT: "#fac11c",
          hover: "#fbc733",
        },
        secondary: "#121212",
        background: "#ffffff",
        foreground: "#121212",
        success: "#51a551",
        error: "#f05d5d",
        muted: "#4d4d4d",
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
