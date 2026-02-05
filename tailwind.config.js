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
      colors: {
        primary: {
          DEFAULT: '#0ea5e9',
          50: '#f0f9ff',
          100: '#e0f2fe',
        },
        accent: {
          DEFAULT: '#06b6d4'
        }
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
        }
      },
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

