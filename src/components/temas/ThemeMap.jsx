import { useState } from "react";
import { ARISTAS, CENTRO, NODOS, getVecinos } from "../../servicios/mapa";
import { getProgramasDeTema } from "../../servicios/temas";
import RouterLink from "../utils/RouterLink";

// Si la persona pidió menos movimiento, los trazos punteados quedan quietos.
const REDUCIR_MOVIMIENTO =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const CANTIDAD = Object.fromEntries(
  NODOS.map((n) => [n.id, getProgramasDeTema(n.id).length])
);

const BASE_NODO =
  "absolute inline-flex min-h-[40px] -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 px-3.5 text-center transition-[opacity,background-color,box-shadow,border-color] duration-200 focus-visible:z-[3] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-lima data-[lit=true]:z-[2] data-[lit=true]:border-lima data-[lit=true]:bg-lima data-[lit=true]:text-noche data-[lit=true]:shadow-[0_0_22px_rgba(196,253,54,0.75)] data-[dim=true]:opacity-30";

const ESTILO_NODO = {
  tema: "border-noche bg-lila font-display text-sm font-semibold uppercase tracking-[0.04em] text-noche",
  subtema: "border-gris/60 bg-transparent font-sans text-[13px] font-semibold text-gris",
};

/**
 * Mapa de nodos: el núcleo "IA" al centro, los temas alrededor y sus subtemas
 * más afuera. Al pasar el cursor (o tabular) por un nodo se ilumina su camino
 * con trazo punteado y el resto se atenúa: de un subtema se ilumina el camino
 * hasta el núcleo (por sus temas) y de un tema, el camino al núcleo y sus
 * subtemas. Al hacer clic se abre la página del tema (ThemePage).
 * Los nodos, sus posiciones y las conexiones salen de temas.json y mapa.json.
 */
export default function ThemeMap() {
  const [activo, setActivo] = useState(null);
  const encendidos = new Set(activo ? [activo, ...getVecinos(activo)] : []);

  const aristaEncendida = (e) => {
    if (activo === null) return false;
    // Del núcleo al tema encendido (el activo o el tema padre del subtema).
    if (e.de === CENTRO.id) return encendidos.has(e.a);
    // Entre el nodo activo y sus vecinos.
    return e.de === activo || e.a === activo;
  };

  return (
    <div className="relative aspect-[1200/720] w-full border-2 border-noche bg-noche">
      <svg
        viewBox="0 0 1200 720"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {ARISTAS.map((e) => {
          const lit = aristaEncendida(e);
          return (
            <path
              key={`${e.de}-${e.a}`}
              d={e.d}
              strokeWidth={lit ? 3.5 : 1.5}
              strokeDasharray={lit ? "10 8" : undefined}
              strokeLinecap="butt"
              style={
                lit
                  ? { filter: "drop-shadow(0 0 6px rgba(196,253,54,0.7))" }
                  : undefined
              }
              className={[
                "fill-none transition-opacity duration-200",
                lit
                  ? "stroke-lima opacity-100"
                  : activo
                    ? "stroke-gris opacity-[0.07]"
                    : "stroke-gris opacity-40",
              ].join(" ")}
            >
              {/* Los trazos corren desde el núcleo hacia afuera (10 + 8 = un
                  ciclo del punteado). */}
              {lit && !REDUCIR_MOVIMIENTO && (
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-18"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              )}
            </path>
          );
        })}
      </svg>

      {/* Núcleo */}
      <span className="absolute left-1/2 top-1/2 flex h-24 min-w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-white bg-lima font-display text-[34px] font-semibold text-noche shadow-[0_0_36px_10px_rgba(196,253,54,0.6),0_0_120px_50px_rgba(196,253,54,0.3)]">
        {CENTRO.etiqueta}
      </span>
      <span className="absolute left-1/2 top-[calc(50%+78px)] -translate-x-1/2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-gris">
        {CENTRO.leyenda}
      </span>

      {NODOS.map((nodo) => {
        const lit = encendidos.has(nodo.id);
        const cantidad = CANTIDAD[nodo.id];
        return (
          <RouterLink
            key={nodo.id}
            to={`/temas/${nodo.id}`}
            data-lit={lit}
            data-dim={activo !== null && !lit}
            aria-label={`${nodo.tipo === "tema" ? "Tema" : "Subtema"}: ${nodo.nombre}. ${cantidad} ${cantidad === 1 ? "programa" : "programas"}`}
            style={{ left: `${nodo.mapa.x}%`, top: `${nodo.mapa.y}%` }}
            className={`${BASE_NODO} ${ESTILO_NODO[nodo.tipo]}`}
            onMouseEnter={() => setActivo(nodo.id)}
            onFocus={() => setActivo(nodo.id)}
            onMouseLeave={() => setActivo(null)}
            onBlur={() => setActivo(null)}
          >
            {nodo.nombre}
          </RouterLink>
        );
      })}
    </div>
  );
}
