/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primaryBg: '#193664', 
      whiteText: '#FFFFFF',
      blackText : '#00000', 
    },
    fontSize : {
      'header': '32px'
    }
  },
  plugins: [],
}

