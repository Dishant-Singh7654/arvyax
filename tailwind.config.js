/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        fitness: {
          primary: '#8e44ad',    // Purple for primary elements
          secondary: '#3498db',  // Blue for accents
          accent: '#2ecc71',     // Green for highlights
          light: '#f0f4f8',      // Light background
          dark: '#2c3e50',       // Dark text
        },
      },
      backgroundImage: {
        'fitness-pattern': "url('/src/assets/images/arvyax-pattern.svg')",
        'gradient-fitness': 'linear-gradient(to right, #8e44ad, #3498db)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
    },
  },
  plugins: [],
};
