/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        "rubik": ["Rubik"]
      },
      colors: {
        "primary": "#333333",
        "secondary": "#b0b0b0",
        "link": "#377fab",
        "link-hover": "#1f6793"
      }
    },
  },
  plugins: [],
}

