/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg: '#0B0F19',
        darkCard: '#131A2A',
        darkHover: '#1E293B',
        darkBorder: '#1F293D',
        tradeGreen: '#10B981',
        tradeRed: '#EF4444',
        tradeGold: '#F59E0B',
        tradeCyan: '#06B6D4',
        tradePurple: '#8B5CF6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
