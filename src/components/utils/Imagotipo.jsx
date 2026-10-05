import raw from '../../utils/Logos/SVG/codigo_ia_imagotipo_blanco transparente.svg?raw'

// Mismo criterio que Isotipo: viewBox recortado al dibujo y color por currentColor.
const markup = raw
  .replace(
    /<svg[^>]*>/,
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="99 99 865 241" fill="none" width="100%" height="100%">'
  )
  .replace(/fill="white"/g, 'fill="currentColor"')

/**
 * Imagotipo horizontal (isotipo + "Código.IA"). Se dimensiona con el ANCHO
 * desde className (w-32, etc.); la altura sale de la proporción del logo.
 */
export default function Imagotipo({ className = '', label = 'Código.IA' }) {
  return (
    <span
      role="img"
      aria-label={label}
      className={`inline-block aspect-[865/241] shrink-0 [&>svg]:block [&>svg]:h-full [&>svg]:w-full ${className}`}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}
