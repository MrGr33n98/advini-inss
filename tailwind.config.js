/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#E6F7EF',
          100: '#C3EBD7',
          200: '#9DDEBF',
          300: '#77D1A6',
          400: '#4FC48E',
          500: '#0F9D58', // Primary green
          600: '#0C7D46',
          700: '#095E34',
          800: '#063E22',
          900: '#031F11',
        },
        'secondary': {
          50: '#ECEEF9',
          100: '#CED3EF',
          200: '#B1B8E5',
          300: '#939DDC',
          400: '#7582D2',
          500: '#3F51B5', // Secondary blue
          600: '#324191',
          700: '#26306D',
          800: '#192048',
          900: '#0D1024',
        },
      },
      fontFamily: {
        'heading': ['Montserrat', 'system-ui', 'sans-serif'],
        'body': ['Open Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('https://images.pexels.com/photos/7551617/pexels-photo-7551617.jpeg')",
      },
    },
  },
  plugins: [],
};