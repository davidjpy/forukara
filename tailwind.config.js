/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        // './pages/**/*.{js,ts,jsx,tsx}',
        // './components/**/*.{js,ts,jsx,tsx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                'montserrat': ['var(--font-montserrat)'],
            },
            backgroundImage: {
                'splash': "url('../app/(media)/splash_background.webp')",
            },
            colors: {
                'black-rgba-90': 'rgba(0, 0, 0, 0.9)',
                'black-rgba-25': 'rgba(0, 0, 0, 0.25)'
            }
        },
    },
    plugins: [],
};
