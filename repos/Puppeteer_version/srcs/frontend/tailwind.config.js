const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./assets/**/*.js",
    "./assets/**/*.{ts,jsx,tsx}",
    "./assets/pages/**/*.js",
    "./src/components/cardComponent.js",
  ],
  theme: {
      fontSize: {
        xs: [
          "0.75rem",
          {
            lineHeight: "1rem",
          },
        ],
        sm: [
          "0.875rem",
          {
            lineHeight: "1.5rem",
          },
        ],
        base: [
          "1rem",
          {
            lineHeight: "1.75rem",
          },
        ],
        lg: [
          "1.125rem",
          {
            lineHeight: "2rem",
          },
        ],
        xl: [
          "1.25rem",
          {
            lineHeight: "2rem",
          },
        ],
        "2xl": [
          "1.5rem",
          {
            lineHeight: "2rem",
          },
        ],
        "3xl": [
          "2rem",
          {
            lineHeight: "2.5rem",
          },
        ],
        "4xl": [
          "2.5rem",
          {
            lineHeight: "3.5rem",
          },
        ],
        "5xl": [
          "3rem",
          {
            lineHeight: "3.5rem",
          },
        ],
        "6xl": [
          "3.75rem",
          {
            lineHeight: "1",
          },
        ],
        "7xl": [
          "4.5rem",
          {
            lineHeight: "1.1",
          },
        ],
        "8xl": [
          "6rem",
          {
            lineHeight: "1",
          },
        ],
        "9xl": [
          "8rem",
          {
            lineHeight: "1",
          },
        ],
      },
    extend: {
      boxShadow: {
        thick: "0px 7px 32px rgb(0 0 0 / 35%);",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
        "6xl": "5rem",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#101010",
        secondary: "#1a1a1a",
        tertiary: "#262626",
        white: '#fcfcfc',
        zinc: {
          50: '#f1f1f1',
          100: '#e5e5e5',
        },
        // Purple
        //primary:"#080118",
        //secondary:"#140d23",
        //tertiary:"#1d1333",
        // white:"#ececec",
      },
      animation: {
        'draw-circle': 'drawCircle 1s ease-in-out forwards',
        'draw-tick': 'drawTick 0.5s ease-in-out 0.5s forwards',
      },
      keyframes: {
        drawCircle: {
          '0%': { strokeDasharray: '0 1194', strokeDashoffset: '1194' },
          '100%': { strokeDasharray: '1194 1194', strokeDashoffset: '0' },
        },
        drawTick: {
          '0%': { strokeDasharray: '0 350', strokeDashoffset: '350' },
          '100%': { strokeDasharray: '350 350', strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [
      require('@tailwindcss/forms'),
  ],
}