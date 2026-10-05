import Imagotipo from '../utils/Imagotipo'

/**
 * Pie de página: fondo noche imagotipo oficial,
 * links a redes y copyright.
 */
export default function Footer() {
  return (
    <footer className="relative w-full bg-noche px-6 py-12 text-gris sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <Imagotipo className="w-36 text-gris" label="Código IA" />

        <div className="flex gap-6 font-mono text-xs uppercase tracking-widest">
          <a
            href="https://www.youtube.com/channel/UCoB5ZY5DohkX1Qi19Ju5y_A"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-lima"
          >
            /YouTube
          </a>
          <a
            href="https://www.instagram.com/codigo.ia/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-lima"
          >
            /Instagram
          </a>
        </div>

        <span className="font-mono text-xs uppercase tracking-widest text-gris/50">Copyright © 2026</span>
      </div>
    </footer>
  )
}
