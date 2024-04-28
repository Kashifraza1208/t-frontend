/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');
module.exports = withMT({
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
		'path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
		'path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				fontBold: ['Poppins Semi-Bold', 'sans-serif'],
				fontRegular: ['Poppins Regular', 'sans-serif'],
				fontMedium: ['Poppins Medium', 'sans-serif'],
			},
			listStyleType: {
				roman: 'lower-roman',
			},
			colors: {
				primary: '#EB8105',
				secondary: '#FAAC06',
				tertiary: '#ffffff',
			},
		},
		screens: {
			xxs: '320px',
			xs: '425px',
		},
	},
	plugins: [],
});
