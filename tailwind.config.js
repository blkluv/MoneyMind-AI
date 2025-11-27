/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#10B981',
        // Light mode colors
        background: '#F9FAFB',
        'text-primary': '#1F2937',
        'text-secondary': '#6B7280',
        'card-bg': '#FFFFFF',
        'border-color': '#E5E7EB',
        // Dark mode colors
        'dark-background': '#111827',
        'dark-text-primary': '#F9FAFB',
        'dark-text-secondary': '#9CA3AF',
        'dark-card-bg': '#1F2937',
        'dark-border-color': '#374151',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}