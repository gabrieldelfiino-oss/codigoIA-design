import programas from '../../data/programas.json'
import { getYoutubeThumbnail } from '../../utils/youtube'

// Orden de las filas: de la más nueva a la más vieja.
const GRUPOS = ['Temporada 3', 'Temporada 2', 'Código IA Radio', 'Código IA 2023']

function ArrowDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-8 w-8 animate-bounce text-lima sm:h-10 sm:w-10"
    >
      <path d="M12 4v16M12 20l-6-6M12 20l6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * Catálogo completo: una fila horizontal con scroll por cada temporada,
 * al estilo Netflix. Cada tarjeta es simple -> imagen y, debajo, el título
 * (estilo "news": caption en texto plano, no superpuesto a la imagen) y
 * lleva directo al video en YouTube.
 */
export default function AllSection() {
  return (
    <section id="todos-los-programas" className="w-full bg-noche py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-10 flex items-center justify-between gap-4">
          <h2 className="font-display text-4xl font-medium text-gris sm:text-6xl">
            Todos los programas
          </h2>
          <ArrowDownIcon />
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-12">
        {GRUPOS.map((temporada) => (
          <FilaProgramas key={temporada} temporada={temporada} />
        ))}
      </div>
    </section>
  )
}

function FilaProgramas({ temporada }) {
  const items = programas.filter((p) => p.temporada === temporada)
  if (items.length === 0) return null

  return (
    <div>
      <h3 className="mb-4 px-6 font-mono text-xs uppercase tracking-widest text-lima sm:px-10">
        /{temporada}
      </h3>
      <div className="flex items-start gap-3 overflow-x-auto px-6 pb-4 sm:gap-4 sm:px-10 [scrollbar-width:thin] [scrollbar-color:#C4FD36_transparent] [@media(hover:none)]:[scrollbar-width:none] [@media(hover:none)]:[&::-webkit-scrollbar]:hidden">
        {items.map((programa) => (
          <TarjetaPrograma key={programa.id} programa={programa} />
        ))}
        <div aria-hidden className="w-px shrink-0 sm:w-6 lg:hidden" />
      </div>
    </div>
  )
}

function TarjetaPrograma({ programa }) {
  const thumb = getYoutubeThumbnail(programa.linkYoutube)
  const disabled = !programa.linkYoutube

  const contenido = (
    <>
      <div className="w-full h-40 sm:h-48 lg:aspect-video lg:h-auto overflow-hidden border-2 border-gris/20 bg-noche transition-colors duration-300 group-hover:border-lima">
        {thumb ? (
          <img
            src={thumb}
            alt={programa.titulo}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gris/30">
            Sin imagen
          </div>
        )}
      </div>
      <p className="mt-2 w-full truncate text-sm font-medium text-gris transition-colors duration-300 group-hover:text-lima sm:text-base">
        {programa.titulo}
      </p>
    </>
  )

  if (disabled) {
    return <div className="group block w-64 shrink-0 cursor-default sm:w-80 lg:w-[calc((100%-3rem)/4)]">{contenido}</div>
  }

  return (
    <a
      href={programa.linkYoutube}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-64 shrink-0 sm:w-80 lg:w-[calc((100%-3rem)/4)]"
    >
      {contenido}
    </a>
  )
}
