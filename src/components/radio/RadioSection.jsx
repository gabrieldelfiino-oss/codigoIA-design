import { useState } from 'react'
import { getProgramasPorTemporada, TEMPORADAS } from '../../utils/programas'
import { getYoutubeEmbedUrl } from '../../utils/youtube'
import RadioTabs from './RadioTabs'
import PersonBadge from '../utils/PersonBadge'

/**
 * Las 4 entrevistas de Código IA Radio (UNI Radio 107.7, programa Fuga de Radio).
 * Mismo patrón que SeasonSection/AditionalSection, en acento violeta.
 */
export default function RadioSection() {
  const episodios = getProgramasPorTemporada(TEMPORADAS.RADIO)
  const [activeId, setActiveId] = useState(episodios[0]?.id)
  const actual = episodios.find((ep) => ep.id === activeId) ?? episodios[0]

  if (!actual) return null

  return (
    <section id="codigo-ia-radio" className="bg-lila">
    <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
      <p className="mb-4 inline-block bg-noche px-3 py-1 font-mono text-xs uppercase tracking-widest text-lila">/Código IA Radio</p>
      <h2 className="mb-4 font-display text-3xl font-medium text-noche sm:text-5xl">
        Código.ia llegó a la radio universitaria
      </h2>
      <p className="mb-10 max-w-3xl text-noche/80">
        Un ciclo de entrevistas a cargo de estudiantes de la FIC, en el marco del programa Fuga de
        Radio de UNI Radio 107.7, sobre la incidencia de la IA en el arte, el cine, los videojuegos
        y la educación.
      </p>

      <RadioTabs items={episodios} activeId={actual.id} onSelect={setActiveId} />

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <div className="aspect-video w-full overflow-hidden border-2 border-noche bg-noche shadow-[6px_6px_0_0_#1A1A30]">
          {actual.linkYoutube ? (
            <iframe
              key={actual.id}
              src={getYoutubeEmbedUrl(actual.linkYoutube)}
              title={actual.titulo}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gris/50">
              Video no disponible
            </div>
          )}
        </div>

        <div>
          <h3 className="mb-2 font-display text-xl font-medium text-noche sm:text-2xl">{actual.titulo}</h3>
          <p className="mb-4 text-noche/80">{actual.subtitulo}</p>
          {actual.personalidad.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {actual.personalidad.map((persona) => (
                <PersonBadge key={persona}>{persona}</PersonBadge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </section>
  )
}
