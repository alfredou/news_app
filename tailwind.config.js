/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        cryptoAnimation: {
          '0%': { transform: 'translateX(0)' },      // Posición inicial (sin desplazamiento)
          '100%': { transform: 'translateX(-100%)' } // Posición final (completamente fuera de la pantalla)
        }
      },
      animation: {
          crypto: 'cryptoAnimation 60s linear infinite'
      },
     gridTemplateColumns: {
      custom: 'repeat(2, minmax(0,400px))'
     } 
    },
  },
  plugins: [],
}

