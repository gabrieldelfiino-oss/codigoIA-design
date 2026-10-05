import raw from '../../utils/Logos/SVG/codigo_ia_isotipo_blanco transparente.svg?raw'

// Se recorta el viewBox al dibujo (el SVG original trae margen) y se pasa el
// relleno a currentColor, así el isotipo toma el color del texto del contenedor
// (text-lima, text-noche, text-gris...), como pide la guía de uso de color.
const markup = raw
  .replace(
    /<svg[^>]*>/,
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="155 156 770 769" fill="none" width="100%" height="100%">'
  )
  .replace(/fill="white"/g, 'fill="currentColor"')

/**
 * Isotipo de Código.IA (el aro de rayos). Se dimensiona desde afuera con
 * className (h-8 w-8, etc.) y se colorea con text-*.
 */
export default function Isotipo({ className = '', label }) {
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`inline-block aspect-square shrink-0 [&>svg]:block [&>svg]:h-full [&>svg]:w-full ${className}`}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}
