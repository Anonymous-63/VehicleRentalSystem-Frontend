/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#428CB7',
        secondary: '#8BB9D4',
        accent: '#D1E1EB',
        surface: '#72faca',
        skyblue: '#81c3d7'
      }
    },
  },
  plugins: [],
}

