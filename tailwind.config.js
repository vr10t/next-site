module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '376px',
      },
    },
    
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}