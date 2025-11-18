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
        aurora: {
          primary: '#8B5CF6',
          'primary-light': '#A78BFA',
          'primary-dark': '#7C3AED',
          secondary: '#EC4899',
          'secondary-light': '#F472B6',
          accent: '#3B82F6',
        },
        midnight: {
          primary: '#4F46E5',
          'primary-light': '#6366F1',
          'primary-dark': '#4338CA',
          secondary: '#F59E0B',
          'secondary-light': '#FBBF24',
          accent: '#06B6D4',
        },
        sakura: {
          primary: '#F472B6',
          'primary-light': '#F9A8D4',
          'primary-dark': '#EC4899',
          secondary: '#14B8A6',
          'secondary-light': '#2DD4BF',
          accent: '#FB923C',
        },
        cosmic: {
          primary: '#6366F1',
          'primary-light': '#818CF8',
          'primary-dark': '#4F46E5',
          secondary: '#06B6D4',
          'secondary-light': '#22D3EE',
          accent: '#A855F7',
        },
        emerald: {
          primary: '#10B981',
          'primary-light': '#34D399',
          'primary-dark': '#059669',
          secondary: '#F59E0B',
          'secondary-light': '#FBBF24',
          accent: '#14B8A6',
        },
        sunset: {
          primary: '#F97316',
          'primary-light': '#FB923C',
          'primary-dark': '#EA580C',
          secondary: '#A855F7',
          'secondary-light': '#C084FC',
          accent: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        heading: ['Syne', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 40px rgba(139, 92, 246, 0.6)',
        'glow-pink': '0 0 40px rgba(236, 72, 153, 0.6)',
        'glow-blue': '0 0 40px rgba(59, 130, 246, 0.6)',
        'glow-indigo': '0 0 40px rgba(79, 70, 229, 0.6)',
        'glow-emerald': '0 0 40px rgba(16, 185, 129, 0.6)',
        'glow-orange': '0 0 40px rgba(249, 115, 22, 0.6)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}