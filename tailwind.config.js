/** @type {import('tailwindcss').Config} */
// Tokens del Sistema de Identidad Visual de Código.IA.
// Los nombres viejos (verde, violeta, negro, blanco, azul-oscuro) se mantienen
// como alias para no tocar cada componente, pero ahora apuntan a la paleta oficial.
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Títulos: Diagramm. Cuerpo: IBM Plex Sans. Etiquetas /SLASH: IBM Plex Mono.
        display: ['"Diagramm"', '"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'Menlo', 'Consolas', 'monospace'],
      },
      colors: {
        // Paleta oficial
        azul: '#2400FF',
        naranja: '#FF6B3B',
        lima: '#C4FD36',
        lila: '#C172FF',
        noche: '#1A1A30', // "Azul oscuro"
        gris: '#FAFAFA',
        // Alias (compatibilidad con clases existentes)
        verde: '#C4FD36',
        violeta: '#C172FF',
        negro: '#1A1A30',
        blanco: '#FAFAFA',
        'azul-oscuro': '#1A1A30',
      },
      // La identidad es de bloques rectos: sin esquinas redondeadas (salvo círculos).
      borderRadius: {
        none: '0',
        sm: '0',
        DEFAULT: '0',
        md: '0',
        lg: '0',
        xl: '0',
        '2xl': '0',
        '3xl': '0',
        full: '9999px',
      },
    },
  },
  plugins: [],
}
