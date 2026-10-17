import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getBajada, getProgramasPorTemporada, TEMPORADAS } from "../../servicios/programas";
import { getYoutubeThumbnail } from "../../servicios/youtube";
import Isotipo from "../utils/Isotipo";
import Heartbeat from "../utils/Heartbeat";
import Spin from "../utils/Spin";

const AUTO_ADVANCE_MS = 6000;
const HERO_ADVANCE_MS = 10000;

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

// Slide fija de presentación: repite el contenido del HeroSection (badges,
// título, bajada y CTA) pero vive como un slide más del carrusel, con el
// mismo fondo noche + grilla azul + isotipo gigante.
const HERO_SLIDE = {
  id: "hero",
  tipo: "hero",
};

/**
 * Carrusel grande con los episodios de la última temporada (TEMPORADAS.ULTIMA).
 * El primer slide es la presentación del programa (igual al Hero de
 * apertura); luego siguen los episodios. Avanza solo cada AUTO_ADVANCE_MS;
 * los puntos de abajo permiten saltar a un slide puntual. El tamaño se
 * adapta a la pantalla (altura en vh).
 */
export default function SeasonCarousel() {
  const episodios = getProgramasPorTemporada(TEMPORADAS.ULTIMA);
  const slides = [HERO_SLIDE, ...episodios];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    // La slide de presentación (hero) se queda más tiempo en pantalla que
    // los episodios normales.
    const duration = slides[index]?.tipo === "hero" ? HERO_ADVANCE_MS : AUTO_ADVANCE_MS;
    const timer = setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, duration);
    return () => clearTimeout(timer);
  }, [index, slides.length]);

  const actual = slides[index];
  if (!actual) return null;

  return (
    <section id="carrusel" className="relative h-[70vh] min-h-[420px] w-full overflow-hidden bg-noche sm:h-[85vh]">
      <AnimatePresence mode="wait">
        {actual.tipo === "hero" ? (
          <motion.div
            key={actual.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-noche bg-grid-azul"
          >
            <Spin
              className="pointer-events-none absolute -right-24 -top-24 h-[60vw] max-h-[560px] w-[60vw] max-w-[560px] text-azul/15 sm:-right-32 sm:-top-32"
              durationSeconds={50}
            >
              <Isotipo className="h-full w-full" />
            </Spin>

            <Spin
              className="pointer-events-none absolute -left-16 -bottom-16 h-[36vw] max-h-[340px] w-[36vw] max-w-[340px] text-lima/10 sm:-left-20 sm:-bottom-20"
              durationSeconds={40}
              reverse
            >
              <Isotipo className="h-full w-full" />
            </Spin>

            <div className="relative flex h-full flex-col items-center justify-center px-6 text-center sm:px-12">
              <h2 className="max-w-5xl font-display text-5xl font-semibold leading-[0.95] tracking-tight text-gris sm:text-6xl xl:text-7xl">
                El programa que te ayuda a no estar{" "}
                <Heartbeat className="text-lima">re perdido</Heartbeat> con la IA
              </h2>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <span className="inline-flex items-center gap-2 border-2 border-lima px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-lima">
                  / Un programa de FIC · Udelar
                </span>
                <span className="inline-flex items-center gap-2 border-2 border-gris/30 px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-gris/70">
                  +20 programas
                </span>
              </div>
            </div>

            {/* Mismo anclaje inferior-izquierdo que el botón "Ver en YouTube"
                de los episodios, para que ambos CTA queden en el mismo lugar. */}
            <div className="absolute bottom-10 left-6 right-6 sm:bottom-16 sm:left-12 sm:right-12">
              <a
                href="https://www.youtube.com/@ProyectoFIC_codigoIA"
                className="inline-flex items-center gap-2 border-2 border-gris px-4 py-2 font-mono text-xs font-medium uppercase tracking-wider text-gris transition-colors duration-300 hover:border-lima hover:bg-lima hover:text-noche sm:px-5 sm:py-2.5 sm:text-sm"
              >
                Ver programas
              </a>
            </div>
          </motion.div>
        ) : (
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
                {getBajada(actual)}
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
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 left-6 flex gap-2 sm:left-12">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={s.tipo === "hero" ? "Ir a la presentación" : `Ir a ${s.titulo}`}
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
