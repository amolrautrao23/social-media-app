
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      maxHeight: {
        '128': '20rem'
      },
      colors: {
        primary: '#505887',
        secondary: '#242424',
        'primary-white': '#ffffff',
        'primary-light': '#ffffff',
        'primary-black': '#0D0D0D',
      },
      keyframes: {
         'scroll-x': {
           '0%': { transform: 'translateX(0)' },
           '100%': { transform: 'translateX(-50%)' },
         },
       },
       animation: {
         'scroll-x': 'scroll-x 25s linear infinite',
       },
    },
  },
  plugins: [
  ],
};


