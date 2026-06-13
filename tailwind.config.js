/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'rgb(10 10 12)',
        card: 'rgb(17 17 21)',
        border: 'rgb(28 28 35)',
        primary: {
          DEFAULT: '#6366f1',
          hover: '#4f46e5',
        },
        accent: {
          green: '#10b981',
          pink: '#ec4899',
          purple: '#a855f7',
          orange: '#f97316',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
