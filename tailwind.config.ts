import type { Config } from "tailwindcss";

const config: Config = {

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "mybg": "#F5EAF7",
        "mybgdark": "#292929",
      },
      fontFamily: {
        "Man": ["Manrope", "sans-serif"],
      }
    },
  },
  plugins: [],
};
export default config;
