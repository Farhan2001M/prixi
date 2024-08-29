import type { Config } from 'tailwindcss'

const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        farhan: "#FF4500",
        polo: "#FF5733",
        sada: "#ff7b66",
        pay: "#00bc99",
        yoyo: "#8A2BE2",
      },
    },
  },
  darkMode: "class",
  plugins: [
    require('daisyui'),
    nextui(),
  ]
}
export default config
















// import type { Config } from 'tailwindcss'

// const config: Config = {
//   content: [
//     './pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './components/**/*.{js,ts,jsx,tsx,mdx}',
//     './app/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['Poppins', 'sans-serif'],
//       },
//       colors: {
//         farhan: "#FF4500",
//         polo: "#FF5733",
//         sada: "#ff7b66",
//         pay: "#00bc99",
//         yoyo: "#8A2BE2",
        
//       },
//     },
//   },
//   plugins: []
// }
// export default config