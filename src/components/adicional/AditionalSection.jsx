import { getProgramasPorTemporada, TEMPORADAS } from '../../utils/programas'
import AditionalTabs from './AditionalTabs'

/**
 * Los 4 capítulos temáticos de la Temporada 2 (cine, educación, arte,
 * gamificación). Título enorme y centrado arriba, debajo una grilla de
 * miniaturas tipo "preview de YouTube" que llevan directo al video, con
 * borde naranja para destacarlas.
 */
export default function AditionalSection() {
  const episodios = getProgramasPorTemporada(TEMPORADAS.ADICIONAL)

  if (episodios.length === 0) return null

  return (
    <section id="temporada-2" className="bg-noche">
      <div className="mx-auto max-w-6xl bg-noche px-6 pb-24 pt-14 sm:px-10 sm:pb-32 sm:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-5 inline-block bg-naranja px-3 py-1 font-mono text-xs uppercase tracking-widest text-noche">/Temporada 2</p>
          <h2 className="font-display text-4xl font-medium leading-[1.05] text-gris sm:text-6xl">
            Cuatro miradas sobre un presente intervenido por la IA
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base text-gris/70 sm:text-lg">
            Desde los desafíos éticos en el aula hasta las transformaciones en el arte,
            los videojuegos y el cine.
          </p>
        </div>

        <AditionalTabs items={episodios} />
      </div>
    </section>
  )
}
