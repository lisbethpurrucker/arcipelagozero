import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'teal-dark': '#5d7678',
        'cream': '#dadcbd',
        'cream-light': '#e8e8d8',
      },
      fontFamily: {
        sans: ['Andret', 'system-ui', 'sans-serif'],
        mono: ['Andret Mono', 'monospace'],
        handwritten: ['Tomato', 'cursive'],
      },
    },
  },
  plugins: [],
};
export default config;