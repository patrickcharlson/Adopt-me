/** @type {import("tailwindcss").Config} */
module.exports = {
	content: ['./src/**/*.{jsx,js,ts,tsx}', './public/index.html'],
	theme: {
		extend: {
      backgroundColor: {
        pets: '#efeef1'
      }
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
