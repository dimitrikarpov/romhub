/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      keyframes: {
        "random-card-display": {
          "0%": { opacity: "1", width: "100%", height: "100%" },
          "99%": { opacity: "0", width: "100%", height: "100%" },
          "100%": { opacity: "0", width: "0", height: "0" },
        },
        "fade-in-show": {
          "0%": { opacity: "0", transform: "scaleZ(0)" },
          "100%": { opacity: "1", transform: "scaleZ(1)" },
        },
      },
    },
  },
  plugins: [],
}
