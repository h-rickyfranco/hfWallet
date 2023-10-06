/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('./src/images/background.png')"
      },
      colors: {
        trybeGreen: "#2FC18C"
      }
    },
  },
  plugins: [],
}

