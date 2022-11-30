/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: { max: '350px' },
      s: { max: '720px' },
    },
    extend: {},
  },
  plugins: [],
};
