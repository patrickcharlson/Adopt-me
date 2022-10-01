/** @type {import("tailwindcss").Config} */
module.exports = {
	content: ['./src/**/*.{jsx,js,ts,tsx}', './public/index.html'],
	theme: {
    container: {
      center: true
    },
		extend: {
			colors: {
				primary: '#e91b1b',
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
