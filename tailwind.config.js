/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        jellyPink: '#f6e1f2',
        jellyBlue: '#95c3e6',
      },
    },
    screens: {
      xs: { max: '350px' },
      s: { max: '720px' },
    },
  },
  plugins: [],
};
