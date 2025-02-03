/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#4b49ac',
        secondary: '#3987d1',
        accent: '#D1E1EB',
        surface: '#dae7ff',
        skyblue: '#81c3d7'
      }
    },
  },
  plugins: [],
}

