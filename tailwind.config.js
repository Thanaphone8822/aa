/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Default font family
        'sans': ['Noto Sans Lao', 'Noto Sans', 'system-ui', 'sans-serif'],
        
        // Custom font families you can use
        'lao': ['Noto Sans Lao', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        
        // Mix fonts for different languages
        'mixed': ['Noto Sans Lao', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
} 