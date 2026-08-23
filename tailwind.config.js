/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kawaii: {
          pink: {
            50: '#fff0f5',
            100: '#ffe4ee',
            200: '#ffccd8',
            300: '#ffa3bb',
            400: '#ff6b95',
            500: '#ff3366',
            600: '#e61e56',
            700: '#c20f41',
          },
          pastel: {
            lavender: '#f3e8ff',
            mint: '#e6fffa',
            peach: '#fff1e6',
            sky: '#e0f2fe',
            lemon: '#fef9c3',
            rose: '#ffe4e6',
          },
          dark: '#3d2b3d',
          accent: '#ff4d8d',
        },
      },
      animation: {
        'bounce-subtle': 'bounceSubtle 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(1deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
};
