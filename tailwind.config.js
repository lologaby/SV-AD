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
        'duo-red': '#FF4B4B',
        'duo-blue': '#1CB0F6',
        'duo-yellow': '#FFC800',
        'duo-orange': '#FF9600',
        'duo-purple': '#CE82FF',
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
