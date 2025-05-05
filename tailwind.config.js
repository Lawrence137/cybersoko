/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1E40AF', // CyberSoko brand color (blue)
          secondary: '#10B981', // Green for CTAs
          accent: '#F59E0B', // Yellow for highlights
        },
      },
    },
    plugins: [],
  }