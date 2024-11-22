/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'moon-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'orbit': 'orbit 2s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ripple': 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite',
        // New golden glow animations
        'golden-glow': 'goldenGlow 2s ease-in-out infinite',
        'golden-pulse': 'goldenPulse 1.5s ease-in-out infinite',
        'border-pulse': 'borderPulse 2s ease-in-out infinite',
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
        // New golden glow keyframes
        goldenGlow: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
        goldenPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        borderPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.8' },
        }
      },
      colors: {
        ripple: 'rgba(250, 0, 0, 0.2)', // Custom ripple color
        // Optional: Add golden color variants if needed
        gold: {
          50: '#FDFBF3',
          100: '#FCF7E6',
          200: '#F9EBBD',
          300: '#F6E094',
          400: '#F2D46B',
          500: '#EEC842',
          600: '#DAB53A',
          700: '#C6A332',
          800: '#B2912A',
          900: '#9E7D22',
        },
      },
    },
  },
  plugins: [],
};