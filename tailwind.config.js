const typography = require('@tailwindcss/typography');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7fe',
          100: '#dcecfd',
          200: '#c0dffc',
          300: '#94ccfa',
          400: '#60b0f6',
          500: '#3990f1',
          600: '#2574e4',
          700: '#1d5fd0',
          800: '#1d4fa9',
          900: '#1d4485',
          950: '#162a52',
        },
        secondary: {
          50: '#fcf5ff',
          100: '#f8eafe',
          200: '#f2d6fe',
          300: '#e9b0fd',
          400: '#df85f9',
          500: '#cd58f0',
          600: '#b53ce0',
          700: '#962bc0',
          800: '#7c239c',
          900: '#65207e',
          950: '#42094f',
        },
        accent: {
          50: '#f0feff',
          100: '#d0feff',
          200: '#a6fcff',
          300: '#67f5ff',
          400: '#22e5ff',
          500: '#00ccf5',
          600: '#00a3cd',
          700: '#0081a6',
          800: '#006988',
          900: '#005670',
          950: '#003848',
        },
        success: {
          50: '#ecfdf5',
          500: '#10b981',
          900: '#064e3b',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          900: '#7f1d1d',
        },
        background: {
          light: {
            primary: '#f8fafc',
            secondary: '#f1f5f9',
            tertiary: '#e2e8f0',
          },
          dark: {
            primary: '#111827',
            secondary: '#1f2937',
            tertiary: '#374151',
          },
        },
        surface: {
          light: {
            primary: '#ffffff',
            secondary: '#f8fafc',
            tertiary: '#f1f5f9',
          },
          dark: {
            primary: '#111827',
            secondary: '#1f2937',
            tertiary: '#374151',
          },
        },
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(135deg, rgba(205, 88, 240, 0.2) 0%, rgba(34, 229, 255, 0.2) 100%)',
        'neon-gradient-intense': 'linear-gradient(135deg, rgba(205, 88, 240, 0.5) 0%, rgba(34, 229, 255, 0.5) 100%)',
        'light-gradient': 'linear-gradient(135deg, rgba(203, 213, 225, 0.4) 0%, rgba(148, 163, 184, 0.1) 100%)',
        'dark-gradient': 'linear-gradient(to bottom, #111827, #1f2937)',
        'hero-gradient': 'linear-gradient(135deg, rgba(57, 144, 241, 0.1) 0%, rgba(205, 88, 240, 0.1) 100%)',
        'light-glow': 'radial-gradient(circle at center, rgba(56, 189, 248, 0.1) 0%, rgba(186, 230, 253, 0.05) 25%, rgba(241, 245, 249, 0) 100%)',
        'hero-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239BA3AF' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
      },
    },
  },
  plugins: [typography],
};