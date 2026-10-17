import { getProgramasPorTemporada, getTemporadasRecientesPrimero } from '../../servicios/programas'
import RouterLink from '../utils/RouterLink'

// De la más nueva a la más vieja (según `orden` en temporadas.json).
const GRUPOS = getTemporadasRecientesPrimero()

// Acento sutil por temporada (tira lateral y etiqueta), tomado de los colores del sitio.
const ACENTOS = ['bg-lima', 'bg-lila', 'bg-naranja', 'bg-azul']

function Chevron() {
  return (
    <svg
      className="h-6 w-6 shrink-0 text-gris transition-transform duration-300 group-open:rotate-180"
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
    <section id="todos-los-programas" className="w-full bg-noche py-20 text-gris">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <p className="mb-4 inline-block bg-gris px-2.5 py-1.5 font-mono text-xs uppercase tracking-widest text-noche">
          /Temporadas
        </p>
        <h2 className="font-display text-4xl font-medium uppercase leading-[0.97] tracking-tight sm:text-6xl">
          Todos los programas
        </h2>
        <p className="mt-4 max-w-2xl text-base text-gris/70 sm:text-lg">
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
    <details open={abierta} className="group border-2 border-gris/25 bg-gris/[0.03] transition-colors open:border-gris/40">
      <summary className="flex cursor-pointer list-none items-center gap-4 px-4 py-5 sm:gap-5 sm:px-6 [&::-webkit-details-marker]:hidden">
        <span aria-hidden className={`h-12 w-1.5 shrink-0 ${acento}`} />
        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="font-display text-2xl font-bold uppercase leading-none tracking-tight sm:text-4xl">
            {temporada.titulo}
          </span>
        </span>
        <span className="shrink-0 border-2 border-gris/30 px-2.5 py-1 font-mono text-xs uppercase tracking-wider text-lima">
          {programas.length} {programas.length === 1 ? 'EP' : 'EPs'}
        </span>
        <Chevron />
      </summary>

      <div className="flex flex-col gap-2.5 px-4 pb-5 sm:px-6">
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
      className="group/fila flex min-h-14 items-center gap-4 border-2 border-gris/20 px-4 py-3 transition-colors hover:border-lima"
    >
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="font-display text-lg font-bold leading-tight transition-colors group-hover/fila:text-lima">
          {programa.titulo}
        </span>
      </span>
      {programa.duracion && (
        <span className="shrink-0 font-mono text-xs text-gris/60">{programa.duracion}</span>
      )}
      <span aria-hidden className="shrink-0 font-mono text-gris/60 transition-colors group-hover/fila:text-lima">
        →
      </span>
    </RouterLink>
  )
}
