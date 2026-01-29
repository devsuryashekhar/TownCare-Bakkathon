/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Manual toggle for dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // Blue
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#10b981', // Green
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#f59e0b', // Amber
          foreground: '#1e293b',
        },
        background: {
          light: '#ffffff',
          dark: '#1e293b',
        },
        text: {
          light: '#1e293b',
          dark: '#f1f5f9',
        }
      },
    },
  },
  plugins: [],
}
