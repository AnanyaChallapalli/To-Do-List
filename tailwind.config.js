/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'solid-pink': '-8px 9px 0px rgba(238, 0, 100, 1)',
      }
    },
  },
  plugins: [],
}

