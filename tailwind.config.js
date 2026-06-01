/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%':   { transform: 'translateY(0px)' },
          '50%':  { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        heartbeat: {
          '0%':   { transform: 'scale(1)' },
          '25%':  { transform: 'scale(1.3)' },
          '50%':  { transform: 'scale(1)' },
          '75%':  { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        float:     'float 3s ease-in-out infinite',
        heartbeat: 'heartbeat 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
