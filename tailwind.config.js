/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        display: ["'Outfit'", "sans-serif"],
      },
      colors: {
        dark: {
          950: "#07090e",
          900: "#0b0f17",
          850: "#101622",
          800: "#151c2c",
          700: "#1e293b",
        },
        brand: {
          emerald: "#10b981",
          teal: "#14b8a6",
          cyan: "#06b6d4",
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
          xl: "3rem",
        },
      },
    },
  },
  plugins: [],
};