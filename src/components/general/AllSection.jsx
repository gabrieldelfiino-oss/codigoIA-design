import { getProgramasPorTemporada, getTemporadasRecientesPrimero } from '../../servicios/programas'
import RouterLink from '../utils/RouterLink'

// De la más nueva a la más vieja (según `orden` en temporadas.json).
const GRUPOS = getTemporadasRecientesPrimero()

// Acento sutil por temporada (tira lateral y etiqueta), tomado de los colores del sitio.
const ACENTOS = ['bg-lima text-noche', 'bg-lila text-noche', 'bg-naranja text-noche', 'bg-azul text-gris']

function Chevron() {
  return (
    <svg
      className="h-7 w-7 shrink-0 transition-transform duration-300 group-open:rotate-180"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
      aria-hidden="true"
    >
      <path d="M5 9l7 7 7-7" />
    </svg>
  )
}

/**
 * Explorador de temporadas: un acordeón por temporada (la más reciente abierta)
 * con todos sus programas; cada fila lleva a la ficha del programa.
 */
export default function AllSection() {
  return (
    <section id="todos-los-programas" className="relative w-full overflow-hidden border-b-2 border-noche bg-noche py-20 text-gris sm:py-28">
      <div aria-hidden className="halftone-gris halftone-fade pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <p className="mb-5 inline-block bg-gris px-2.5 py-1.5 font-mono text-xs uppercase tracking-widest text-noche">
          /Temporadas
        </p>
        <h2 className="font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-7xl">
          Todos los <span className="resaltado bg-lima text-noche">programas</span>
        </h2>
        <p className="mt-4 max-w-2xl text-base text-gris/80 sm:text-lg">
          Abrí una temporada para ver sus programas y entrar a cada ficha.
        </p>

        <h3 className="mb-5 mt-12 font-mono text-xs uppercase tracking-widest text-lima">
          /Explorador de temporadas
        </h3>
        <div className="flex flex-col gap-5">
          {GRUPOS.map((temporada, i) => (
            <Temporada key={temporada.id} temporada={temporada} indice={i} abierta={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Temporada({ temporada, indice, abierta }) {
  const programas = getProgramasPorTemporada(temporada.id)
  const acento = ACENTOS[indice % ACENTOS.length]

  return (
    <details open={abierta} className="group border-2 border-gris bg-noche shadow-[6px_6px_0_0_rgba(250,250,250,0.18)] transition-shadow open:shadow-[8px_8px_0_0_#C4FD36]">
      <summary className={`flex min-h-16 cursor-pointer list-none items-center gap-4 px-4 py-5 sm:gap-5 sm:px-6 [&::-webkit-details-marker]:hidden ${acento}`}>
        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="font-display text-2xl font-bold uppercase leading-none tracking-tight sm:text-4xl">
            {temporada.titulo}
          </span>
        </span>
        <span className="shrink-0 border-2 border-noche px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider">
          {programas.length} {programas.length === 1 ? 'EP' : 'EPs'}
        </span>
        <Chevron />
      </summary>

      <div className="flex flex-col gap-3 px-4 py-5 sm:px-6">
        {programas.length === 0 ? (
          <p className="border-2 border-dashed border-gris/25 p-4 text-sm text-gris/60">
            Todavía no hay programas en esta temporada.
          </p>
        ) : (
          programas.map((programa) => <FilaPrograma key={programa.id} programa={programa} />)
        )}
      </div>
    </details>
  )
}

function FilaPrograma({ programa }) {
  return (
    <RouterLink
      to={`/programa/${programa.id}`}
      className="group/fila flex min-h-14 items-center gap-4 border-2 border-gris/30 px-4 py-3 transition-colors hover:border-lima hover:bg-lima hover:text-noche"
    >
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="font-display text-lg font-bold leading-tight transition-colors">
          {programa.titulo}
        </span>
      </span>
      {programa.duracion && (
        <span className="shrink-0 font-mono text-xs opacity-70">{programa.duracion}</span>
      )}
      <span aria-hidden className="shrink-0 font-mono opacity-70 transition-transform group-hover/fila:translate-x-1">
        →
      </span>
    </RouterLink>
  )
}
