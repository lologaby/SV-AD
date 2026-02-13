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
        // Duolingo brand (design.duolingo.com)
        'duo-green': '#58CC02',
        'duo-green-light': '#89E219',
        'duo-green-bg': '#DCF0D9',
        'duo-green-dark': '#1A7F37',
        'duo-red': '#FF4B4B',
        'duo-red-bg': '#FFEBEE',
        'duo-red-dark': '#C62828',
        'duo-blue': '#1CB0F6',
        'duo-purple': '#CE82FF',
        'duo-yellow': '#FFC800',
        'duo-orange': '#FF9600',
        'duo-eel': '#4B4B4B',
        'duo-snow': '#FFFFFF',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Poppins', 'sans-serif'],
        'duo': ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
