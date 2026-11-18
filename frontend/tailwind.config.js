/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Paleta de la marca: cambia estos valores y cambia todo el sitio.
      colors: {
        ink: "#0b0b0b",
        paper: "#f5f3ef",
        gold: { DEFAULT: "#a8834f", soft: "#c5a880" },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "serif"],
        sans: ["Manrope", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
