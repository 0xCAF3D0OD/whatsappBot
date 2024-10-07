module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./assets/**/*.{js,ts,jsx,tsx}",
    "./src/components/QRCodeComponent.js",
  ],
  theme: {
    extend: {
      colors: {
        custom: '#4a5568', // Ajustez cette couleur selon vos besoins
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
  plugins: [],
}