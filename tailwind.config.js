/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ripple: 'rgba(250, 0, 0, 0.2)', // Custom ripple color
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'orbit': 'orbit 2s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ripple': 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(140px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(140px) rotate(-360deg)' },
        },
        ripple: {
          "0%, 100%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(0.9)",
          },
        },
      },
    },
  },
  plugins: [],
};
