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
        prime: {
          black: "#1A1A1A",
          gold: "#C9A961",
          red: "#B33A3A",
          white: "#FFFFFF",
          gray: "#F5F5F5",
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        heading: ['var(--font-heading)', 'sans-serif'],
      },
      screens: {
        'sm': '640px',
        'md': '1024px',
        'lg': '1024px',
      }
    },
  },
  plugins: [],
};
export default config;
