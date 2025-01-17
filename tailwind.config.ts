import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme';
const colors = require('tailwindcss/colors')

function defineConfig(): Config { 
	const Config = {
		content: [
			"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
			"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
			"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		],
		theme: {
			extend: {
				typography: (theme: any) => ({
					DEFAULT: {
						css: {
							maxWidth: '75ch', // Set the max width for the entire typography
							'h1, h2, h3, h4, h5, h6': {
								maxWidth: '75ch', // Set the max width for headers
							},
							p: {
								maxWidth: '75sch', // Set the max width for paragraphs
							},
							// Add more customizations as needed
						},
					},
				}),
				colors: {
					primary: colors.zinc['100'],
					secondary: colors.zinc['200'],
					accent: colors.zinc['50'],
					background: colors.zinc['900'],
					border: colors.zinc['300'],
					text: colors.zinc['100'],
				},
				fontFamily: {
					sans: ['Inter', ...defaultTheme.fontFamily.sans],
					serif: ['Merriweather', ...defaultTheme.fontFamily.serif],
				},
				maxWidth: {
					'text': '100ch', // Increase the text width to 80 characters
				},
				spacing: {
					'128': '32rem',
					'144': '36rem',
				},
				borderRadius: {
					'4xl': '2rem',
				},
			},
		},
		plugins: [
			require("tailwindcss-animate"),
			require('@tailwindcss/typography'),
		]};
	return Config;
};

export default defineConfig() as Config;