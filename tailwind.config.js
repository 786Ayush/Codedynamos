const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */

const customColors = {
  // Example custom colors
  primary: "#18CE6D", // button
  background: "#F8F9FD", // background
  heading: "#183827",
  para: "#747474",
  seperate: "#E3E3E3",
  text01: "#838181"
  // Add more custom colors as needed
};
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "npm i @nextui-org/react framer-motion",
  ],
  extend: {
    // Extend the theme with custom colors
    colors: {
      // Merge custom colors object with existing Tailwind CSS colors
      ...customColors,
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
