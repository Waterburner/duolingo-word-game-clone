module.exports = {
  theme: {
    extend: {
      fontFamily: {
        openSans: 'Open Sans, sans-serif',
      },
      colors: {
        primary: '#122023',
        secondary: '#263032',
        dark: '#596265',
        focus: '#1b2f34',
      },
    },
  },
  plugins: [],
  content: ['./src/**/*.{js,jsx,ts,tsx,html}', './public/index.html'],
}
