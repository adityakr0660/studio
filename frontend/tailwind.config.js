export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          950: '#07080a',
          900: '#0e1014',
          850: '#14161d',
          800: '#1c1f28',
          700: '#272b38',
          600: '#383d4e',
          500: '#545b72',
          400: '#7d859e',
          300: '#aab1cb',
          200: '#d0d5e6',
          100: '#eaedf6',
          50: '#f6f7fb',
        },
        gold: {
          300: '#f0ce8e',
          400: '#e4b972',
          500: '#d4a359',
          600: '#b8863b',
          700: '#8c6324',
        },
        // Backward-compatible semantic aliases mapped to the new luxury palette
        theme: {
          50: '#14161d',
          100: '#1c1f28',
          200: '#272b38',
          300: '#7d859e',
          400: '#d4a359',
          500: '#d4a359',
          600: '#e4b972',
          700: '#ffffff',
          800: '#0e1014',
          900: '#07080a',
        },
        alabaster: '#faf9f6',
        ivory: '#fcfcfb',
        primary: '#c59b27',
        secondary: '#a16207',
        accent: '#b8863b',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Outfit', 'sans-serif'],
        display: ['Outfit', '"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

