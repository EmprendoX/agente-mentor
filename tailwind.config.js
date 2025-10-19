/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F172A',
        surface: '#111C34',
        'brand-blue': '#2563EB',
        'brand-green': '#16A34A',
        'brand-orange': '#F97316',
        'brand-purple': '#8B5CF6',
        'brand-yellow': '#FACC15',
      },
    },
  },
  plugins: [],
} 