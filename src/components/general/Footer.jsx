import proyecto from '../../data/proyecto.json'
import Imagotipo from '../utils/Imagotipo'

/**
 * Pie de página: fondo noche imagotipo oficial,
 * links a redes y copyright (todo desde proyecto.json).
 */
export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-noche px-6 py-12 text-gris sm:px-10">
      <div aria-hidden className="halftone-gris halftone-fade pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <Imagotipo className="w-36 text-gris" label={proyecto.nombre} />

        <div className="flex gap-6 font-mono text-xs uppercase tracking-widest">
          <a
            href={proyecto.redes.youtube}
            target="_blank"
            rel="noreferrer"
            className="border-2 border-gris/40 px-3 py-2 transition-colors hover:border-lima hover:bg-lima hover:text-noche"
          >
            /YouTube
          </a>
          <a
            href={proyecto.redes.instagram}
            target="_blank"
            rel="noreferrer"
            className="border-2 border-gris/40 px-3 py-2 transition-colors hover:border-lima hover:bg-lima hover:text-noche"
          >
            /Instagram
          </a>
        </div>

        <span className="font-mono text-xs uppercase tracking-widest text-gris/70">{proyecto.copyright}</span>
      </div>
    </footer>
  )
}
