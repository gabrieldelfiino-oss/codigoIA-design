import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getBajada, getProgramasPorTemporada, TEMPORADAS } from "../../servicios/programas";
import { TEMAS } from "../../servicios/temas";
import { getYoutubeThumbnail } from "../../servicios/youtube";
import Isotipo from "../utils/Isotipo";
import Heartbeat from "../utils/Heartbeat";
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
const HERO_SLIDE = {
  id: "hero",
  tipo: "hero",
};

// Colores de la paleta que rotan en las "etiquetas" de los episodios.
const ACENTOS_EP = ["bg-naranja", "bg-lila", "bg-lima", "bg-azul text-gris"];

/**
 * Carrusel grande con los episodios de la última temporada (TEMPORADAS.ULTIMA).
 * El primer slide es la presentación del programa; luego siguen los episodios.
 * Avanza solo (se pausa con el cursor encima, con el foco adentro o si la
 * persona pidió menos movimiento); los botones y los puntos permiten moverse.
 * Debajo va una tira de temas en movimiento.
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
    const timer = setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, duration);
    return () => clearTimeout(timer);
  }, [index, slides.length, pausado, reducir]);

  const actual = slides[index];
  if (!actual) return null;

  const anterior = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const siguiente = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <>
      <section
        id="carrusel"
        aria-roledescription="carrusel"
        aria-label="Programas de la última temporada"
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
        onFocus={() => setPausado(true)}
        onBlur={() => setPausado(false)}
        className="relative h-[78vh] min-h-[520px] w-full overflow-hidden border-b-2 border-noche bg-lila text-noche sm:h-[85vh]"
      >
        <AnimatePresence mode="wait">
          {actual.tipo === "hero" ? (
            <motion.div
              key={actual.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-lila bg-grid-noche"
            >
              {/* Isotipo gigante que gira, cortado por el borde (gesto de marca) */}
              <Spin
                className="pointer-events-none absolute -right-28 -top-28 h-[70vw] max-h-[560px] w-[70vw] max-w-[560px] text-azul/90 sm:-right-44 sm:-top-44 lg:-right-32"
                durationSeconds={50}
              >
                <Isotipo className="h-full w-full" />
              </Spin>
              <Spin
                className="pointer-events-none absolute -bottom-24 -left-20 h-[44vw] max-h-[360px] w-[44vw] max-w-[360px] text-lima"
                durationSeconds={40}
                reverse
              >
                <Isotipo className="h-full w-full" />
              </Spin>
              <div aria-hidden className="halftone-noche halftone-fade pointer-events-none absolute inset-x-0 bottom-0 h-1/2 rotate-180 opacity-70" />

              <div className="relative flex h-full flex-col justify-center px-6 pb-28 pt-8 sm:px-12 sm:pb-32">
                <span className="mb-6 inline-flex w-fit items-center gap-2 border-2 border-noche bg-noche px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-wider text-lima">
                  / Un programa de FIC · Udelar
                </span>
                <h2 className="max-w-5xl font-display text-[2.9rem] lg:max-w-[64%] font-semibold uppercase leading-[0.92] tracking-tight sm:text-7xl xl:text-[5rem]">
                  El programa que te ayuda a no estar{" "}
                  <span className="resaltado bg-lima">
                    <Heartbeat>re perdido</Heartbeat>
                  </span>{" "}
                  con la IA
                </h2>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="https://www.youtube.com/@ProyectoFIC_codigoIA"
                    className="btn-brutal inline-flex items-center gap-2 bg-noche px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-lima hover:bg-lima hover:text-noche sm:text-sm"
                  >
                    <YoutubeIcon />
                    Ver programas
                  </a>
                  <span className="inline-flex items-center border-2 border-noche px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-wider">
                    +20 programas
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={actual.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-noche"
            >
              <img
                src={getYoutubeThumbnail(actual.linkYoutube, "maxresdefault")}
                alt=""
                className="h-full w-full object-cover opacity-70"
              />
              <div aria-hidden className="halftone-gris absolute inset-0 opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-noche via-noche/60 to-transparent" />

              <div className="absolute bottom-24 left-6 right-6 sm:bottom-28 sm:left-12 sm:right-12">
                <span
                  className={`mb-4 inline-flex border-2 border-noche px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-noche ${ACENTOS_EP[(index - 1) % ACENTOS_EP.length]}`}
                >
                  /Programa {String(index).padStart(2, "0")}
                </span>
                <h2 className="max-w-3xl font-display text-4xl font-semibold uppercase leading-[0.95] text-gris sm:text-6xl">
                  <span className="resaltado bg-noche/0">{actual.titulo}</span>
                </h2>
                <p className="mt-4 max-w-xl text-base text-gris/90 sm:text-lg">
                  {getBajada(actual)}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <RouterLink
                    to={`/programa/${actual.id}`}
                    className="btn-brutal btn-brutal-gris inline-flex items-center gap-2 border-noche bg-lima px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-noche sm:text-sm"
                  >
                    Ver ficha
                  </RouterLink>
                  {actual.linkYoutube && (
                    <a
                      href={actual.linkYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border-2 border-gris bg-noche/60 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-gris transition-colors duration-200 hover:bg-gris hover:text-noche sm:text-sm"
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

        {/* Controles: anterior / puntos / siguiente */}
        <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between gap-4 sm:bottom-7 sm:left-12 sm:right-12">
          <div className="flex gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={s.tipo === "hero" ? "Ir a la presentación" : `Ir a ${s.titulo}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={[
                  "h-3 border-2 border-noche transition-all duration-300",
                  i === index ? "w-10 bg-lima" : "w-3 bg-gris hover:bg-lima",
                ].join(" ")}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={anterior}
              aria-label="Slide anterior"
              className="btn-brutal grid h-11 w-11 place-items-center bg-gris font-mono text-lg font-bold text-noche"
            >
              ←
            </button>
            <button
              type="button"
              onClick={siguiente}
              aria-label="Slide siguiente"
              className="btn-brutal grid h-11 w-11 place-items-center bg-lima font-mono text-lg font-bold text-noche"
            >
              →
            </button>
          </div>
        </div>
      </section>

      <TiraDeTemas />
    </>
  );
}

// Tira en movimiento con los temas del mapa (sale de temas.json). Es adorno:
// la navegación real a los temas está en la sección de abajo.
function TiraDeTemas() {
  const nombres = TEMAS.filter((t) => t.tipo === "tema").map((t) => t.nombre);
  if (nombres.length === 0) return null;

  const grupo = (oculto) => (
    <ul className="flex shrink-0 items-center" aria-hidden={oculto || undefined}>
      {nombres.map((n) => (
        <li key={n} className="flex items-center">
          <span className="px-6 font-display text-xl font-semibold uppercase tracking-tight sm:text-2xl">
            {n}
          </span>
          <Isotipo className="h-5 w-5 text-lima sm:h-6 sm:w-6" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee overflow-hidden border-b-2 border-noche bg-noche py-3 text-gris" role="presentation">
      <div className="animate-marquee flex w-max">
        {grupo(false)}
        {grupo(true)}
      </div>
    </div>
  );
}
