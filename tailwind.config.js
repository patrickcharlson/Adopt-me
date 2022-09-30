/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js, jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: '#e91b1b',
      }
    }
  },
  plugins: []
};
