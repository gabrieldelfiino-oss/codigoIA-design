import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getProgramasPorTemporada, TEMPORADAS } from "../../utils/programas";
import { getYoutubeThumbnail } from "../../utils/youtube";

const AUTO_ADVANCE_MS = 6000;

function YoutubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 sm:h-5 sm:w-5"
      fill="currentColor"
    >
      <path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.3A2.7 2.7 0 0 0 2.4 7.2 28 28 0 0 0 2 12a28 28 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9C6 19 12 19 12 19s6 0 7.7-.3a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.8ZM10 15V9l5 3-5 3Z" />
    </svg>
  );
}

/**
 * Carrusel grande con los episodios de la última temporada (Temporada 3).
 * Avanza solo cada AUTO_ADVANCE_MS; los puntos de abajo permiten saltar
 * a un episodio puntual. El tamaño se adapta a la pantalla (altura en vh).
 */
export default function SeasonCarousel() {
  const episodios = getProgramasPorTemporada(TEMPORADAS.ULTIMA);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (episodios.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % episodios.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [episodios.length]);

  const actual = episodios[index];
  if (!actual) return null;

  return (
    <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden bg-noche sm:h-[85vh]">
      <AnimatePresence mode="wait">
        <motion.div
          key={actual.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={getYoutubeThumbnail(actual.linkYoutube, "maxresdefault")}
            alt={actual.titulo}
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noche via-noche/50 to-transparent" />

          <div className="absolute bottom-10 left-6 right-6 sm:bottom-16 sm:left-12 sm:right-12">
            <h2 className="max-w-2xl font-display text-3xl font-medium text-gris sm:text-5xl">
              {actual.titulo}
            </h2>
            <p className="mt-3 max-w-xl text-sm text-gris/80 sm:text-base">
              {actual.subtitulo}
            </p>

            {actual.linkYoutube && (
              <a
                href={actual.linkYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 border-2 border-gris bg-noche/60 px-4 py-2 font-mono text-xs font-medium uppercase tracking-wider text-gris transition-colors duration-300 hover:border-lima hover:bg-lima hover:text-noche sm:px-5 sm:py-2.5 sm:text-sm"
              >
                <YoutubeIcon />
                Ver en YouTube
              </a>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-6 flex gap-2 sm:left-12">
        {episodios.map((ep, i) => (
          <button
            key={ep.id}
            type="button"
            aria-label={`Ir a ${ep.titulo}`}
            onClick={() => setIndex(i)}
            className={[
              "h-1.5 transition-all duration-300",
              i === index
                ? "w-8 bg-lima"
                : "w-4 bg-gris/30 hover:bg-gris/60",
            ].join(" ")}
          />
        ))}
      </div>
    </section>
  );
}
