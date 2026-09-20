/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fff5f7',
          100: '#ffe8ee',
          200: '#ffd1dc',
          300: '#ffb3c6',
          400: '#ff8aa8',
          500: '#f76a8e',
          600: '#e54e74',
          700: '#c43a5c',
          800: '#a02e4a',
          900: '#7a2438',
        },
        cream: {
          50: '#fffdf9',
          100: '#fdf8ef',
          200: '#faf0e0',
          300: '#f5e4cc',
          400: '#eed3b0',
        },
        burgundy: {
          400: '#8a3a4a',
          500: '#6e2a38',
          600: '#5a2230',
          700: '#461a25',
          800: '#33151d',
          900: '#211015',
        },
        rose: {
          50: '#fff7f8',
          100: '#fee8ec',
          200: '#fdd1d9',
          300: '#fbb0bd',
          400: '#f5859a',
          500: '#e8617a',
          600: '#cf4a64',
          700: '#ab3a51',
          800: '#872f42',
          900: '#6a2635',
        },
        warmwhite: '#fffdfb',
        ivory: '#fdf9f3',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Poppins"', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
        telugu: ['"Tiro Telugu"', '"Noto Serif Telugu"', 'serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'float-petal': {
          '0%': { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.7' },
          '90%': { opacity: '0.5' },
          '100%': { transform: 'translateY(110vh) translateX(40px) rotate(360deg)', opacity: '0' },
        },
        'soft-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.08)', opacity: '1' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 24px rgba(247,106,142,0.25)' },
          '50%': { boxShadow: '0 0 44px rgba(247,106,142,0.45)' },
        },
        'heartbeat': {
          '0%, 100%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(1.18)' },
          '30%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(1.12)' },
          '60%': { transform: 'scale(1)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'rise': {
          '0%': { opacity: '0', transform: 'translateY(60px) scale(0.9)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'confetti-fall': {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 1s ease-out forwards',
        'fade-in': 'fade-in 1.4s ease-out forwards',
        'soft-pulse': 'soft-pulse 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3.5s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.6s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'rise': 'rise 0.9s cubic-bezier(0.22,1,0.36,1) forwards',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
