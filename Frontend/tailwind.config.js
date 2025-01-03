/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primaryColor: "#0067FF",
        yellowColor: "#FF8000",
        purpleColor:"#6A0DAD",
        irisBlueColor:"#5A4FCF",
        headingColor:"",
        textColor:"",
      },
      animation: {
        "loop-scroll": "loop-scroll 10s linear infinite",
      },
      keyframes:{
        "loop-scroll":{
          from: {transform: 'translateX(0)'},
          to:{
            transform: "translateX(-100%)"
          },
        },
      },

      boxShadow:{
        panelShadow:"rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
      },
    },
  },
  plugins: [],
}

