/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: [
		'bg-light-blue-500',
		{
			pattern: /text-.+/,
			variants: ['lg', 'md', 'sm']
		}
	],
	theme: {
		extend: {
			colors: {
				primary: '#dc2625'
			}
		}
	},
	plugins: []
};
