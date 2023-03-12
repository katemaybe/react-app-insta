/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fill:(theme) => ({
red: theme('colors.red.primary')
    }),
    colors: {

      white: '#ffffff',
      blue: {
        medium: '#005c98'
      },
      black: {
        light:'#262626',
        faded:'00000059'
      },
      gray:{
        base:"#616161",
        background:'#fafafa',
        primary: '#dbdbdb'
      },
      red: {
        primary:'#ed4956'
      }
      // 'purple': '#3f3cbb',
      // 'midnight': '#121063',
      // 'metal': '#565584',
      // 'tahiti': '#3ab7bf',
      // 'silver': '#ecebff',
      // 'bubble-gum': '#ff77e9',
      // 'bermuda': '#78dcca',
    },
    extend: {},
  },
  plugins: [],
  
}