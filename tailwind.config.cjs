/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js} ./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
    colors: {
      midnight: "#12122b",
    },
  },
  plugins: [require("flowbite/plugin")],
};
