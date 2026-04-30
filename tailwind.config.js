/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          purple: '#b026ff',
          blue: '#00f0ff',
          cyan: '#08f7fe',
        },
        dark: {
          900: '#0a0a0a',
          800: '#121212',
          700: '#1e1e1e',
        },
        bg: '#F7F8FA',
        surface: '#FFFFFF',
        border: {
          DEFAULT: '#E2E4E9',
          strong: '#C9CDD6',
        },
        text: {
          primary: '#111318',
          secondary: '#5C6370',
          muted: '#9BA3AF',
        },
        accent: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
        },
        priority: {
          p0: { bg: '#DCFCE7', text: '#15803D', border: '#86EFAC' },
          p1: { bg: '#FEF9C3', text: '#854D0E', border: '#FDE047' },
          p2: { bg: '#FFEDD5', text: '#9A3412', border: '#FDBA74' },
          p3: { bg: '#FEE2E2', text: '#991B1B', border: '#FCA5A5' },
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        'work-sans': ['Work Sans', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      boxShadow: {
        'panel': '0 1px 3px rgba(0, 0, 0, 0.08)',
        'drawer': '0 4px 12px rgba(0, 0, 0, 0.10)',
        'button': '0 1px 2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'grid': 'grid 15s linear infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fade-in 0.2s ease-out',
        'slide-in': 'slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        grid: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(50px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.5))' },
          '50%': { opacity: '.7', filter: 'drop-shadow(0 0 20px rgba(176, 38, 255, 0.8))' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        }
      }
    },
  },
  plugins: [],
}
