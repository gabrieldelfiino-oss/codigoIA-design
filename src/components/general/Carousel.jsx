import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getBajada, getProgramasPorTemporada, TEMPORADAS } from "../../servicios/programas";
import { getYoutubeThumbnail } from "../../servicios/youtube";
import Isotipo from "../utils/Isotipo";
import Heartbeat from "../utils/Heartbeat";
import Orbes from "../utils/Orbes";
import Spin from "../utils/Spin";
import RouterLink from "../utils/RouterLink";

const AUTO_ADVANCE_MS = 6000;
const HERO_ADVANCE_MS = 10000;

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" aria-hidden="true">
      <path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.3A2.7 2.7 0 0 0 2.4 7.2 28 28 0 0 0 2 12a28 28 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9C6 19 12 19 12 19s6 0 7.7-.3a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.8ZM10 15V9l5 3-5 3Z" />
    </svg>
  );
}

// Slide fija de presentación: es un slide más del carrusel.
const HERO_SLIDE = { id: "hero", tipo: "hero" };

const BTN_PRIMARIO =
  "inline-flex items-center gap-2 rounded-full bg-lima px-6 py-3 text-sm font-medium text-noche transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(196,253,54,0.7)]";
const BTN_SECUNDARIO =
  "inline-flex items-center gap-2 rounded-full border border-gris/40 px-6 py-3 text-sm font-medium text-gris transition duration-200 hover:bg-gris hover:text-noche";

/**
 * Carrusel grande con los episodios de la última temporada (TEMPORADAS.ULTIMA).
 * El primer slide es la presentación del programa; luego siguen los episodios.
 * Avanza solo (se pausa con el cursor encima, con el foco adentro o si la
 * persona pidió menos movimiento); los botones y los puntos permiten moverse.
 */
export default function SeasonCarousel() {
  const episodios = getProgramasPorTemporada(TEMPORADAS.ULTIMA);
  const slides = [HERO_SLIDE, ...episodios];
  const [index, setIndex] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [reducir] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (slides.length < 2 || pausado || reducir) return;
    const duration = slides[index]?.tipo === "hero" ? HERO_ADVANCE_MS : AUTO_ADVANCE_MS;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % slides.length), duration);
    return () => clearTimeout(timer);
  }, [index, slides.length, pausado, reducir]);

  // Le avisa al header si se está viendo el banner del slogan (cuando no, el
  // slogan viaja al header) y vuelve al primer banner al tocar el logo.
  const esHero = slides[index]?.tipo === "hero";
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("carrusel-slide", { detail: { hero: esHero } }));
  }, [esHero]);
  useEffect(() => {
    const alInicio = () => setIndex(0);
    window.addEventListener("carrusel-inicio", alInicio);
    return () => window.removeEventListener("carrusel-inicio", alInicio);
  }, []);

  const actual = slides[index];
  if (!actual) return null;

  const anterior = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const siguiente = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <section
      id="carrusel"
      aria-roledescription="carrusel"
      aria-label="Programas de la última temporada"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
      className="relative h-[70vh] min-h-[500px] w-full overflow-hidden bg-noche text-gris sm:h-[74vh]"
    >
      <AnimatePresence mode="wait">
        {actual.tipo === "hero" ? (
          <motion.div
            key={actual.id}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-noche"
          >
            <Orbes />
            <Spin
              className="pointer-events-none absolute -right-32 -top-32 h-[70vw] max-h-[560px] w-[70vw] max-w-[560px] text-gris/[0.06]"
              durationSeconds={60}
            >
              <Isotipo className="h-full w-full" />
            </Spin>

            <div className="relative flex h-full flex-col justify-center px-6 pb-40 pt-8 sm:px-12 sm:pb-44">
              <span className="mb-6 inline-flex w-fit items-center rounded-full border border-gris/25 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-gris/80">
                Un programa de FIC · Udelar
              </span>
              {/* --eslogan-h2 (0 → 1) lo escribe IntroHeader: el título se desvanece
                  mientras el slogan sale de acá y viaja al header. */}
              <h2
                id="eslogan-hero"
                className="max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl xl:text-6xl"
                style={{ opacity: "calc(1 - var(--eslogan-h2, 0))" }}
              >
                El programa que te ayuda a no estar{" "}
                <Heartbeat className="text-lima">re perdido</Heartbeat> con la IA
              </h2>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href="https://www.youtube.com/@ProyectoFIC_codigoIA" className={BTN_PRIMARIO}>
                  <YoutubeIcon />
                  Ver programas
                </a>
                <span className="rounded-full border border-gris/25 px-4 py-2 font-mono text-xs uppercase tracking-wider text-gris/70">
                  +20 programas
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={actual.id}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-noche"
          >
            <img
              src={getYoutubeThumbnail(actual.linkYoutube, "maxresdefault")}
              alt=""
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noche via-noche/60 to-transparent" />

            <div className="absolute bottom-36 left-6 right-6 sm:bottom-40 sm:left-12 sm:right-12">
              <span className="mb-4 inline-flex rounded-full bg-lila px-3.5 py-1 font-mono text-xs uppercase tracking-wider text-noche">
                Programa {String(index).padStart(2, "0")}
              </span>
              <h2 className="max-w-2xl font-display text-3xl font-semibold leading-[1.02] sm:text-5xl">
                {actual.titulo}
              </h2>
              <p className="mt-4 max-w-xl text-base text-gris/85 sm:text-lg">{getBajada(actual)}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <RouterLink to={`/programa/${actual.id}`} className={BTN_PRIMARIO}>
                  Ver ficha
                </RouterLink>
                {actual.linkYoutube && (
                  <a
                    href={actual.linkYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={BTN_SECUNDARIO}
                  >
                    <YoutubeIcon />
                    Ver en YouTube
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controles: puntos / anterior / siguiente */}
      <div className="absolute bottom-16 left-6 right-6 flex items-center justify-between gap-4 sm:bottom-20 sm:left-12 sm:right-12">
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={s.tipo === "hero" ? "Ir a la presentación" : `Ir a ${s.titulo}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={[
                "h-2 rounded-full transition-all duration-300",
                i === index ? "w-8 bg-lima" : "w-2 bg-gris/40 hover:bg-gris/70",
              ].join(" ")}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={anterior}
            aria-label="Slide anterior"
            className="grid h-11 w-11 place-items-center rounded-full border border-gris/30 text-gris transition-colors hover:bg-gris hover:text-noche"
          >
            ←
          </button>
          <button
            type="button"
            onClick={siguiente}
            aria-label="Slide siguiente"
            className="grid h-11 w-11 place-items-center rounded-full border border-gris/30 text-gris transition-colors hover:bg-gris hover:text-noche"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
