import { getProgramasPorTemporada, TEMPORADAS } from "../../utils/programas";
import { getYoutubeThumbnail } from "../../utils/youtube";

/**
 * Los 4 episodios de la última temporada, en formato editorial:
 * a la izquierda título + bajada + "Ver todos →" y a la derecha una grilla
 * de 2 columnas con cards. Cada card es un marco naranja con la miniatura
 * del video inset, un play abajo a la izquierda y, debajo del marco, el
 * título del episodio y la pregunta en grande. Fondo blanco; el naranja
 * (el marco de las cards) es el segundo color predominante.
 */
export default function AditionalSection() {
  const episodios = getProgramasPorTemporada(TEMPORADAS.ULTIMA).slice(0, 4);

  if (episodios.length === 0) return null;

  return (
    <section id="temporada-2" className="relative overflow-hidden bg-white text-noche">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl xl:text-7xl">
              Cuatro miradas sobre la IA en tu vida privada
            </h2>
            <p className="mt-6 max-w-md font-display text-xl font-light leading-snug text-noche/80 sm:text-2xl">
              Desde los desafíos éticos en el aula hasta las transformaciones
              en el arte, los videojuegos y el cine.
            </p>
            <a
              href="#todos-los-programas"
              className="mt-10 inline-flex items-center gap-2 font-display text-lg font-semibold transition-colors hover:text-naranja"
            >
              Ver todos <span aria-hidden>→</span>
            </a>
          </div>

          <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2">
            {episodios.map((episodio) => (
              <Card key={episodio.id} episodio={episodio} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ episodio }) {
  const thumb = episodio.linkYoutube
    ? getYoutubeThumbnail(episodio.linkYoutube, "maxresdefault")
    : null;

  const contenido = (
    <>
      {/* Marco naranja con la miniatura inset */}
      <div className="relative aspect-[5/4] w-full bg-naranja">
        <div className="absolute inset-x-[13.3%] bottom-[16.9%] top-[16.6%] overflow-hidden bg-noche">
          {thumb ? (
            <img
              src={thumb}
              alt={episodio.titulo}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-gris/50">
              Video no disponible
            </div>
          )}
        </div>

        {/* Línea que baja desde la miniatura al hacer hover */}
        <span
          aria-hidden
          className="absolute bottom-0 left-1/2 h-[16.9%] w-px origin-top scale-y-0 bg-noche transition-transform duration-300 group-hover:scale-y-100"
        />

        {/* Play */}
        {episodio.linkYoutube && (
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="absolute bottom-[3.5%] left-[6.5%] h-7 w-7 text-white/90 transition-transform duration-300 group-hover:scale-110 sm:h-8 sm:w-8"
            fill="currentColor"
          >
            <path d="M6 4l14 8-14 8V4z" />
          </svg>
        )}
      </div>

      {/* Meta + pregunta */}
      <div className="mt-4 flex items-baseline justify-between gap-4 text-base">
        <span className="truncate font-light">{episodio.titulo}</span>
        {episodio.linkYoutube && (
          <span className="shrink-0 font-mono text-xs uppercase tracking-wider text-noche/60 group-hover:text-naranja">
            YouTube ↗
          </span>
        )}
      </div>
      <h3 className="mt-1 font-display text-2xl font-semibold leading-[1.1] tracking-tight sm:text-[1.7rem]">
        {episodio.pregunta || episodio.titulo}
      </h3>
    </>
  );

  if (!episodio.linkYoutube) {
    return <div className="group cursor-default">{contenido}</div>;
  }

  return (
    <a
      href={episodio.linkYoutube}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      {contenido}
    </a>
  );
}
