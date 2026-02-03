/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.astro",
  ],
  theme: {
    extend: {
      colors: {
        max: {
          blue: '#3BA0FF',
          glow: '#00C8FF',
          electric: '#00E4FF',
          bg: '#F6FAFF',
          sidebar: '#F0F6FF',
          grayDark: '#3A3A3A',
          gray: '#6B7280',
          grayLight: '#A8B1C4',
          icon: '#9AA7B8'
        }
      }
    },
  },
  plugins: [],
}
