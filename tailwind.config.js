/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A1A1A',
          700: '#141414',
          500: '#1A1A1A',
        },
        surface: {
          light: '#F5F3F0',
          DEFAULT: '#F5F3F0',
          dark: '#1A1A1A',
        },
        content: {
          primary: '#1A1A1A',
          secondary: '#4A4A4A',
          inverse: '#F5F3F0',
        },
        beige: {
          light: '#F5F3F0',
          dark: '#1A1A1A',
        },
        dark: '#1A1A1A',
      },
      fontFamily: {
        sans: ['Heebo', 'system-ui', 'sans-serif'],
        heading: ['Heebo', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
