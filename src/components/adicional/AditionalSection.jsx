import { getProgramasPorTemporada, getTemporada, TEMPORADAS } from "../../servicios/programas";
import RouterLink from "../utils/RouterLink";
import Texto from "../utils/Texto";

/**
 * Los episodios de la última temporada, en formato editorial: a la izquierda
 * la temporada (título, pregunta y presentación, de temporadas.json) y
 * "Ver todos →"; a la derecha una grilla de 2 columnas con una card por
 * episodio con número de color, pregunta, resumen y link a su ficha. Fondo blanco.
 */
export default function AditionalSection() {
  const temporada = getTemporada(TEMPORADAS.ULTIMA);
  const episodios = getProgramasPorTemporada(TEMPORADAS.ULTIMA).slice(0, 4);

  if (episodios.length === 0) return null;

  return (
    <section id="cuarta-temporada" className="relative overflow-hidden bg-white text-noche">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 inline-block bg-noche px-3 py-1 font-mono text-xs uppercase tracking-widest text-lima">
              /{temporada?.titulo}
            </p>
            <h2 className="font-display text-4xl font-semibold leading-[1] tracking-tight sm:text-5xl xl:text-6xl">
              {temporada?.subtitulo}
            </h2>
            <Texto className="mt-6 max-w-md text-base leading-relaxed text-noche/80 sm:text-lg">
              {temporada?.descripcion}
            </Texto>
            <a
              href="#todos-los-programas"
              className="mt-10 inline-flex items-center gap-2 font-display text-lg font-semibold transition-colors hover:text-naranja"
            >
              Ver todos <span aria-hidden>→</span>
            </a>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {episodios.map((episodio, i) => (
              <Episodio key={episodio.id} episodio={episodio} numero={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const COLORES = [
  "bg-naranja text-noche",
  "bg-lila text-noche",
  "bg-lima text-noche",
  "bg-azul text-white",
];

function Episodio({ episodio, numero }) {
  return (
    <RouterLink
      to={`/programa/${episodio.id}`}
      className="group flex flex-col border-2 border-noche bg-white p-6 shadow-[6px_6px_0_0_#1A1A30] transition-transform duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#1A1A30]"
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`grid h-16 w-16 shrink-0 place-items-center border-2 border-noche font-display text-4xl font-bold leading-none ${COLORES[(numero - 1) % COLORES.length]}`}
        >
          {String(numero).padStart(2, "0")}
        </span>
        <span className="pt-1 text-right font-mono text-xs uppercase tracking-widest text-noche/60">
          {episodio.titulo}
        </span>
      </div>
      <h3 className="mt-6 font-display text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl">
        {episodio.pregunta || episodio.titulo}
      </h3>
      <Texto className="mt-4 text-base leading-relaxed text-noche/75">{episodio.resumen}</Texto>
      <span className="mt-6 inline-flex items-center gap-2 pt-2 font-mono text-xs font-semibold uppercase tracking-widest transition-colors group-hover:text-naranja">
        Ver programa <span aria-hidden>→</span>
      </span>
    </RouterLink>
  );
}
