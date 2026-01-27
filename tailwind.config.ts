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
        'teal-dark': '#005769',
        'mint': '#aed7c4',
        'sand': '#d8c2a6',
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