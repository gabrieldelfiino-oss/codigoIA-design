import { useEffect, useState } from "react";
import { TEMAS, getProgramasDeTema } from "../../utils/temas";
import { getYoutubeEmbedUrl } from "../../utils/youtube";
import ThemeTabs from "./ThemeTabs";
import PersonBadge from "../utils/PersonBadge";

/**
 * Navegación por temática transversal (Humanidad / Comunicación / Arte...).
 * Cada tab agrupa TODOS los programas con ese tema (ver programas.json), y
 * adentro de cada tema se puede pasar de uno a otro con los botones
 * anterior/siguiente. Mismo patrón técnico que RadioSection (tabs + video
 * embed + ficha), en acento naranja.
 */
export default function ThemeSection() {
  const [activeTemaId, setActiveTemaId] = useState(TEMAS[0]?.id);
  const [index, setIndex] = useState(0);

  const programasDelTema = getProgramasDeTema(activeTemaId);
  const actual = programasDelTema[index];

  // Al cambiar de tema arrancamos siempre desde el primer programa de ese
  // tema, para no quedar "afuera de rango" si el tema anterior tenía más
  // programas que el nuevo.
  useEffect(() => {
    setIndex(0);
  }, [activeTemaId]);

  if (!actual) return null;

  const irAAnterior = () => setIndex((i) => i - 1);
  const irASiguiente = () => setIndex((i) => i + 1);

  return (
    <section id="temas" className="bg-lima">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 sm:py-20">
        <p className="mb-4 inline-block bg-noche px-3 py-1 font-mono text-xs uppercase tracking-widest text-lima">
          /Temas
        </p>
        <h2 className="mb-6 max-w-4xl font-display text-4xl font-semibold leading-[1] tracking-tight text-noche sm:text-5xl">
          Empezá por el tema que más te guste
        </h2>
        {/* <p className="mb-10 max-w-3xl text-noche/80">
          Un mismo tema, muchas miradas: elegí por dónde entrar a la
          Inteligencia Artificial.
        </p> */}

        <ThemeTabs
          items={TEMAS}
          activeId={activeTemaId}
          onSelect={setActiveTemaId}
        />

        <div className="relative mt-10 px-8 sm:px-12">
          {/* Navegación entre los programas de este mismo tema: flechas a
              los costados de todo el bloque (video + ficha), centradas
              verticalmente. Solo aparecen si hay más de un programa; en el
              primero de la lista no se muestra la de "anterior" (no da
              vuelta al final). */}
          {index > 0 && (
            <button
              type="button"
              onClick={irAAnterior}
              aria-label="Programa anterior de este tema"
              className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-noche bg-lima text-noche shadow-[3px_3px_0_0_#1A1A30] transition-colors duration-300 hover:bg-noche hover:text-lima active:scale-95 sm:h-12 sm:w-12"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
          {index < programasDelTema.length - 1 && (
            <button
              type="button"
              onClick={irASiguiente}
              aria-label="Programa siguiente de este tema"
              className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border-2 border-noche bg-lima text-noche shadow-[3px_3px_0_0_#1A1A30] transition-colors duration-300 hover:bg-noche hover:text-lima active:scale-95 sm:h-12 sm:w-12"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

          <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-[1.4fr_1fr]">
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
            <h3 className="mb-3 font-display text-2xl font-semibold leading-[1.1] tracking-tight text-noche sm:text-3xl">
              {actual.titulo}
            </h3>
            <p className="mb-5 text-base text-noche/80 sm:text-lg">{actual.subtitulo}</p>
            {actual.personalidad.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2 text-noche">
                {actual.personalidad.map((persona) => (
                  <PersonBadge key={persona}>{persona}</PersonBadge>
                ))}
              </div>
            )}

          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
