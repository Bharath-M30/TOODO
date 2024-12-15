/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "red-hat-display" : ["Red Hat Display", ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}