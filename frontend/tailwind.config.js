/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        gradientStart: '#6366f1',
        gradientEnd: '#a855f7',
      },
    },
  },
  plugins: [],
};
