/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'hp-blue': '#0096D6',
        'hp-dark-blue': '#0074A6',
        'hp-gray': '#4A4A4A',
        'hp-light-gray': '#F4F4F4',
      }
    },
  },
  plugins: [],
}

