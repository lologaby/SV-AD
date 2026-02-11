/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'valentine-pink': '#ff6b9d',
        'valentine-light-pink': '#ffc3d5',
        'valentine-red': '#ff4757',
        'valentine-dark-red': '#c06c84',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
