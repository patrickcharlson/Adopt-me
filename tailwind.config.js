/** @type {import("tailwindcss").Config} */
module.exports = {
	content: ['./src/**/*.{jsx,js,ts,tsx}', './public/index.html'],
	theme: {
		extend: {
			colors: {
				primary: '#e91b1b',
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
