import { useRef, useState } from "react";
import { ARISTAS, CENTRO, NODOS, getVecinos } from "../../servicios/mapa";
import { getProgramasDeTema } from "../../servicios/temas";
import RouterLink from "../utils/RouterLink";

// Si la persona pidió menos movimiento: sin inclinación, sin flotar y los
// trazos punteados quedan quietos.
const REDUCIR_MOVIMIENTO =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const CANTIDAD = Object.fromEntries(
  NODOS.map((n) => [n.id, getProgramasDeTema(n.id).length])
);

// Profundidad estable por nodo (0 = lejos, 1 = cerca), derivada del id para
// que no cambie entre renders. Los temas quedan adelante, los subtemas atrás.
function hash(texto) {
  let h = 2166136261;
  for (const c of texto) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return (h >>> 0) / 4294967295;
}
const PROFUNDIDAD = Object.fromEntries(
  NODOS.map((n) => {
    const r = hash(n.id);
    return [n.id, n.tipo === "tema" ? 0.85 + r * 0.15 : 0.3 + r * 0.45];
  })
);
PROFUNDIDAD[CENTRO.id] = 1;

// Esfera: brillo blanco arriba a la izquierda, color al medio y borde oscuro,
// más un halo del mismo color alrededor.
const ESFERA = {
  tema: { luz: "#F3E6FF", color: "#C172FF", sombra: "#4A1E7A", halo: "193,114,255" },
  subtema: { luz: "#FFFFFF", color: "#E4E4F2", sombra: "#4B4B6B", halo: "250,250,250" },
  lit: { luz: "#F6FFE0", color: "#C4FD36", sombra: "#4C6B06", halo: "196,253,54" },
};

const fondoEsfera = ({ luz, color, sombra }) =>
  `radial-gradient(circle at 32% 28%, ${luz} 0%, ${color} 34%, ${sombra} 100%)`;

const INCLINACION_MAX = 5; // grados

/**
 * Mapa de nodos en "3D": el núcleo "IA" al centro, los temas alrededor y sus
 * subtemas más afuera, como esferas luminosas flotando en un fondo profundo.
 * Los nodos lejanos son más chicos, tenues y desenfocados; al mover el mouse
 * el plano se inclina apenas. Al pasar el cursor (o tabular) por un nodo se
 * ilumina su camino con trazo punteado y el resto se atenúa: de un subtema se
 * ilumina el camino hasta el núcleo (por sus temas) y de un tema, el camino al
 * núcleo y sus subtemas. Al hacer clic se abre la página del tema (ThemePage).
 * Los nodos, sus posiciones y las conexiones salen de temas.json y mapa.json.
 */
export default function ThemeMap() {
  const [activo, setActivo] = useState(null);
  const escena = useRef(null);
  const fondo = useRef(null);
  const cuadro = useRef(0);
  const encendidos = new Set(activo ? [activo, ...getVecinos(activo)] : []);

  const aristaEncendida = (e) => {
    if (activo === null) return false;
    // Del núcleo al tema encendido (el activo o el tema padre del subtema).
    if (e.de === CENTRO.id) return encendidos.has(e.a);
    // Entre el nodo activo y sus vecinos.
    return e.de === activo || e.a === activo;
  };

  const inclinar = (ev) => {
    if (REDUCIR_MOVIMIENTO || ev.pointerType !== "mouse") return;
    const r = ev.currentTarget.getBoundingClientRect();
    const dx = (ev.clientX - r.left) / r.width - 0.5;
    const dy = (ev.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(cuadro.current);
    cuadro.current = requestAnimationFrame(() => {
      if (escena.current)
        escena.current.style.transform = `rotateX(${(-dy * INCLINACION_MAX).toFixed(2)}deg) rotateY(${(dx * INCLINACION_MAX).toFixed(2)}deg)`;
      if (fondo.current)
        fondo.current.style.transform = `translate3d(${(-dx * 24).toFixed(1)}px, ${(-dy * 24).toFixed(1)}px, 0) scale(1.08)`;
    });
  };

  const enderezar = () => {
    cancelAnimationFrame(cuadro.current);
    if (escena.current) escena.current.style.transform = "";
    if (fondo.current) fondo.current.style.transform = "";
  };

  return (
    <div
      className="relative aspect-[1200/720] w-full overflow-hidden bg-[#07071a] [perspective:1400px]"
      onPointerMove={inclinar}
      onPointerLeave={enderezar}
    >
      {/* Fondo profundo: degradé de noche a casi negro y nebulosas muy suaves
          en colores de la paleta. Se mueve al revés que la escena (paralaje). */}
      <div
        ref={fondo}
        aria-hidden="true"
        className="absolute -inset-[6%] scale-[1.08] transition-transform duration-700 ease-out"
        style={{
          background: [
            "radial-gradient(ellipse 45% 40% at 22% 30%, rgba(36,0,255,0.32), transparent 70%)",
            "radial-gradient(ellipse 40% 45% at 80% 72%, rgba(255,107,59,0.16), transparent 70%)",
            "radial-gradient(ellipse 35% 30% at 72% 22%, rgba(193,114,255,0.16), transparent 70%)",
            "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(36,0,255,0.14), transparent 75%)",
            "radial-gradient(ellipse 120% 100% at 50% 50%, #1A1A30 0%, #0B0B22 55%, #040410 100%)",
          ].join(", "),
          filter: "blur(8px)",
        }}
      />
      {/* Viñeta: oscurece los bordes para dar sensación de hondura. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 70% at 50% 50%, transparent 55%, rgba(2,2,10,0.75) 100%)",
        }}
      />

      <div
        ref={escena}
        className="absolute inset-[3%] transition-transform duration-500 ease-out [transform-style:preserve-3d]"
      >
        <svg
          viewBox="0 0 1200 720"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <filter id="mapa-brillo" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {ARISTAS.map((e) => {
            const lit = aristaEncendida(e);
            // Las líneas hacia nodos lejanos son más tenues.
            const prof = Math.min(PROFUNDIDAD[e.de], PROFUNDIDAD[e.a]);
            const opacidad = lit ? 1 : activo ? 0.06 : 0.18 + prof * 0.32;
            return (
              <path
                key={`${e.de}-${e.a}`}
                d={e.d}
                strokeWidth={lit ? 2 : 0.6 + prof * 0.6}
                strokeDasharray={lit ? "8 7" : undefined}
                strokeLinecap="round"
                filter={lit ? "url(#mapa-brillo)" : undefined}
                className={`fill-none transition-opacity duration-200 ${lit ? "stroke-lima" : "stroke-gris"}`}
                style={{ opacity: opacidad }}
              >
                {/* Los trazos corren desde el núcleo hacia afuera (8 + 7 = un
                    ciclo del punteado). */}
                {lit && !REDUCIR_MOVIMIENTO && (
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-15"
                    dur="0.8s"
                    repeatCount="indefinite"
                  />
                )}
              </path>
            );
          })}
        </svg>

        {/* Núcleo */}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            aria-hidden="true"
            className="mapa-respirar absolute left-1/2 top-1/2 -ml-[110px] -mt-[110px] h-[220px] w-[220px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(196,253,54,0.45) 0%, rgba(196,253,54,0.12) 40%, transparent 70%)",
            }}
          />
          <span
            className="relative flex h-24 w-24 items-center justify-center rounded-full font-display text-[34px] font-semibold text-noche"
            style={{
              background: fondoEsfera(ESFERA.lit),
              boxShadow:
                "0 0 30px 6px rgba(196,253,54,0.55), inset -8px -10px 22px rgba(26,26,48,0.35)",
            }}
          >
            {CENTRO.etiqueta}
          </span>
        </span>
        <span className="absolute left-1/2 top-[calc(50%+66px)] -translate-x-1/2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-gris/80">
          {CENTRO.leyenda}
        </span>

        {NODOS.map((nodo) => {
          const lit = encendidos.has(nodo.id);
          const dim = activo !== null && !lit;
          const enfocado = activo === nodo.id;
          const prof = PROFUNDIDAD[nodo.id];
          const esTema = nodo.tipo === "tema";
          const cantidad = CANTIDAD[nodo.id];
          const tono = lit ? ESFERA.lit : ESFERA[nodo.tipo];
          const tamano = Math.round((esTema ? 30 : 16) * (0.7 + prof * 0.3));
          // Desenfoque de lejanía: se apaga cuando el nodo está encendido.
          const desenfoque = lit ? 0 : (1 - prof) * 2.4;
          const brillo = lit ? 0.85 : 0.35 + prof * 0.35;
          return (
            <RouterLink
              key={nodo.id}
              to={`/temas/${nodo.id}`}
              aria-label={`${esTema ? "Tema" : "Subtema"}: ${nodo.nombre}. ${cantidad} ${cantidad === 1 ? "programa" : "programas"}`}
              style={{ left: `${nodo.mapa.x}%`, top: `${nodo.mapa.y}%` }}
              className={[
                "group absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-opacity duration-200",
                "focus-visible:outline focus-visible:outline-[2px] focus-visible:outline-offset-2 focus-visible:outline-lima",
                lit ? "z-[2]" : "",
                dim ? "opacity-25" : "opacity-100",
              ].join(" ")}
              onMouseEnter={() => setActivo(nodo.id)}
              onFocus={() => setActivo(nodo.id)}
              onMouseLeave={() => setActivo(null)}
              onBlur={() => setActivo(null)}
            >
              <span
                aria-hidden="true"
                className="mapa-flotar block"
                style={{ animationDelay: `${(-hash(nodo.id) * 6).toFixed(2)}s` }}
              >
                <span
                  className="block rounded-full transition-[transform,filter,box-shadow] duration-300"
                  style={{
                    width: tamano,
                    height: tamano,
                    background: fondoEsfera(tono),
                    filter: `blur(${desenfoque.toFixed(2)}px)`,
                    transform: enfocado ? "scale(1.25)" : "scale(1)",
                    boxShadow: `0 0 ${Math.round(tamano * 0.8)}px ${Math.round(tamano * 0.15)}px rgba(${tono.halo},${brillo})`,
                  }}
                />
              </span>
              <span
                className={[
                  "pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap transition-colors duration-200",
                  esTema
                    ? "font-display text-sm font-semibold uppercase tracking-[0.04em]"
                    : "font-sans text-[12.5px] font-medium",
                  lit ? "text-lima" : esTema ? "text-gris" : "text-gris/70",
                ].join(" ")}
                style={{
                  top: `calc(50% + ${Math.round(tamano / 2) + 6}px)`,
                  textShadow: "0 1px 10px rgba(4,4,16,0.9)",
                }}
              >
                {nodo.nombre}
              </span>
            </RouterLink>
          );
        })}
      </div>
    </div>
  );
}
