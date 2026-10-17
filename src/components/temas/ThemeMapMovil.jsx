import { useState } from "react";
import { ARISTAS, CENTRO, NODOS, getVecinos } from "../../servicios/mapa";
import { getProgramasDeTema } from "../../servicios/temas";
import RouterLink from "../utils/RouterLink";

// Si la persona pidió menos movimiento, los trazos punteados quedan quietos.
const REDUCIR_MOVIMIENTO =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const LIMA = "196,253,54";
const LILA = "193,114,255";
const BLANCO = "250,250,250";

// ── Geometría en vertical ───────────────────────────────────────────────────
// Tres columnas: el núcleo IA arriba a la izquierda con un tronco que baja,
// los temas en el medio y los subtemas a la derecha. Las posiciones se
// calculan solas a partir de las conexiones de mapa.json (no usa las
// coordenadas de escritorio).
const ANCHO = 360;
const X_TRONCO = 34;
const X_TEMA = 124;
const X_SUB = 292;
const ANCHO_TEMA = 108;
const ANCHO_SUB = 122;
const Y_INICIO = 140;
const SEPARACION = 60;

const TEMAS = NODOS.filter((n) => n.tipo === "tema");
const SUBTEMAS = NODOS.filter((n) => n.tipo !== "tema");
const esTema = (id) => TEMAS.some((t) => t.id === id);

// Orden de las columnas: se ordenan temas y subtemas por el promedio de la
// posición de sus conexiones (heurística del baricentro) para que las líneas
// se crucen lo menos posible.
const vecinosEn = (id, otros) =>
  ARISTAS.filter((e) => e.de === id || e.a === id)
    .map((e) => (e.de === id ? e.a : e.de))
    .filter((v) => otros.includes(v));
const promedioIdx = (id, otros) => {
  const idx = vecinosEn(id, otros).map((v) => otros.indexOf(v));
  return idx.length ? idx.reduce((a, b) => a + b, 0) / idx.length : otros.length;
};
let ordenTemas = TEMAS.map((t) => t.id);
let ordenSubs = SUBTEMAS.map((s) => s.id);
for (let i = 0; i < 6; i++) {
  ordenSubs = [...ordenSubs].sort((a, b) => promedioIdx(a, ordenTemas) - promedioIdx(b, ordenTemas));
  ordenTemas = [...ordenTemas].sort((a, b) => promedioIdx(a, ordenSubs) - promedioIdx(b, ordenSubs));
}

const POS = { [CENTRO.id]: { x: X_TRONCO, y: 46 } };
ordenSubs.forEach((id, i) => {
  POS[id] = { x: X_SUB, y: Y_INICIO + i * SEPARACION };
});
// Cada tema queda a la altura promedio de los subtemas que conecta, sin pisarse.
const promedio = (tema) => {
  const ys = ARISTAS.filter((e) => e.de === tema.id || e.a === tema.id)
    .map((e) => (e.de === tema.id ? e.a : e.de))
    .filter((id) => POS[id])
    .map((id) => POS[id].y);
  return ys.length ? ys.reduce((a, b) => a + b, 0) / ys.length : Y_INICIO;
};
let previo = Y_INICIO - SEPARACION;
ordenTemas.forEach((id) => {
  previo = Math.max(promedio({ id }), previo + SEPARACION);
  POS[id] = { x: X_TEMA, y: previo };
});
const ALTO =
  Math.max(...Object.values(POS).map((p) => p.y)) + SEPARACION - 8;
const Y_TRONCO_FIN = Math.max(...TEMAS.map((t) => POS[t.id].y));

const CANTIDAD = Object.fromEntries(
  NODOS.map((n) => [n.id, getProgramasDeTema(n.id).length])
);

// Conexiones tema ↔ subtema (rectas, de borde a borde) y ramas del tronco.
const CONEXIONES = ARISTAS.filter((e) => e.de !== CENTRO.id).map((e) => {
  const tema = esTema(e.de) ? e.de : e.a;
  const sub = tema === e.de ? e.a : e.de;
  return { tema, sub };
}).filter((c) => POS[c.tema] && POS[c.sub]);

const pct = (v, total) => `${((v / total) * 100).toFixed(2)}%`;

/**
 * Mapa de temas para celular: la misma red en vidrio y neón, pero en vertical
 * y pensada para el dedo. Un toque sobre un nodo ilumina sus caminos y abajo
 * aparece su ficha con el botón para abrir el tema; otro toque lo suelta.
 */
export default function ThemeMapMovil() {
  const [activo, setActivo] = useState(null);
  const encendidos = new Set(activo ? [activo, ...getVecinos(activo)] : []);
  const nodoActivo = NODOS.find((n) => n.id === activo);

  const conexionEncendida = (c) => activo !== null && (c.tema === activo || c.sub === activo);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#050512] shadow-suave-lg">
      {/* Universo: noche profunda con nebulosas suaves y una cuadrícula fina. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 70% 30% at 15% 8%, rgba(196,253,54,0.10), transparent 70%)",
            "radial-gradient(ellipse 80% 35% at 10% 45%, rgba(36,0,255,0.30), transparent 70%)",
            "radial-gradient(ellipse 70% 30% at 90% 70%, rgba(193,114,255,0.18), transparent 70%)",
            "radial-gradient(ellipse 60% 25% at 20% 95%, rgba(255,107,59,0.12), transparent 70%)",
            "linear-gradient(180deg, #12122a 0%, #080818 55%, #040410 100%)",
          ].join(", "),
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(250,250,250,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,250,0.05) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          WebkitMaskImage: "linear-gradient(180deg, #000, transparent 95%)",
          maskImage: "linear-gradient(180deg, #000, transparent 95%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[420px] px-0 pt-2" style={{ aspectRatio: `${ANCHO} / ${ALTO}` }}>
        <svg
          viewBox={`0 0 ${ANCHO} ${ALTO}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <filter id="mapa-movil-neon" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Tronco que baja del núcleo y una rama hacia cada tema. */}
          <line
            x1={X_TRONCO}
            y1={POS[CENTRO.id].y}
            x2={X_TRONCO}
            y2={Y_TRONCO_FIN}
            stroke="#FAFAFA"
            strokeWidth="1"
            strokeLinecap="round"
            style={{ opacity: activo ? 0.12 : 0.35 }}
          />
          {TEMAS.map((t) => {
            const lit = encendidos.has(t.id);
            const y = POS[t.id].y;
            return (
              <g key={t.id}>
                <line
                  x1={X_TRONCO}
                  y1={y}
                  x2={X_TEMA - ANCHO_TEMA / 2}
                  y2={y}
                  strokeWidth={lit ? 1.8 : 1}
                  strokeLinecap="round"
                  strokeDasharray={lit ? "6 5" : undefined}
                  filter={lit ? "url(#mapa-movil-neon)" : undefined}
                  className={lit ? "stroke-lima" : "stroke-gris"}
                  style={{ opacity: lit ? 1 : activo ? 0.1 : 0.35 }}
                >
                  {lit && !REDUCIR_MOVIMIENTO && (
                    <animate attributeName="stroke-dashoffset" from="0" to="-11" dur="0.7s" repeatCount="indefinite" />
                  )}
                </line>
                <circle
                  cx={X_TRONCO}
                  cy={y}
                  r={lit ? 3.5 : 2.5}
                  className={lit ? "fill-lima" : "fill-gris"}
                  style={{ opacity: lit ? 1 : activo ? 0.15 : 0.7 }}
                />
              </g>
            );
          })}

          {/* Conexiones tema ↔ subtema: rectas, de borde a borde. */}
          {CONEXIONES.map((c) => {
            const lit = conexionEncendida(c);
            const a = POS[c.tema];
            const b = POS[c.sub];
            return (
              <line
                key={`${c.tema}-${c.sub}`}
                x1={a.x + ANCHO_TEMA / 2}
                y1={a.y}
                x2={b.x - ANCHO_SUB / 2}
                y2={b.y}
                strokeWidth={lit ? 1.8 : 1}
                strokeLinecap="round"
                strokeDasharray={lit ? "6 5" : undefined}
                filter={lit ? "url(#mapa-movil-neon)" : undefined}
                className={lit ? "stroke-lima" : "stroke-gris"}
                style={{ opacity: lit ? 1 : activo ? 0.08 : 0.3 }}
              >
                {lit && !REDUCIR_MOVIMIENTO && (
                  <animate attributeName="stroke-dashoffset" from="0" to="-11" dur="0.7s" repeatCount="indefinite" />
                )}
              </line>
            );
          })}
        </svg>

        {/* Núcleo */}
        <span
          className="mapa-vidrio absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[20px] font-display text-xl font-semibold text-lima"
          style={{
            left: pct(POS[CENTRO.id].x, ANCHO),
            top: pct(POS[CENTRO.id].y, ALTO),
            "--tono": LIMA,
            "--brillo": 0.5,
            textShadow: "0 0 14px rgba(196,253,54,0.9)",
          }}
        >
          {CENTRO.etiqueta}
        </span>
        <span
          className="absolute -translate-y-1/2 font-mono text-[10px] font-semibold uppercase leading-tight tracking-[0.1em] text-gris/70"
          style={{ left: pct(X_TRONCO + 44, ANCHO), top: pct(POS[CENTRO.id].y, ALTO), maxWidth: "9rem" }}
        >
          {CENTRO.leyenda}
        </span>

        {NODOS.map((nodo) => {
          const tema = nodo.tipo === "tema";
          const lit = encendidos.has(nodo.id);
          const dim = activo !== null && !lit;
          const elegido = activo === nodo.id;
          return (
            <button
              key={nodo.id}
              type="button"
              aria-pressed={elegido}
              aria-label={`${tema ? "Tema" : "Subtema"}: ${nodo.nombre}`}
              onClick={() => setActivo(elegido ? null : nodo.id)}
              data-lit={lit}
              className={[
                "mapa-vidrio absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center leading-[1.15] transition-opacity duration-300",
                tema
                  ? "min-h-[44px] rounded-[16px] px-2 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.04em]"
                  : "min-h-[44px] rounded-2xl px-2.5 py-2 font-sans text-[11px] font-medium",
                lit ? "z-[2] text-lima" : "text-gris",
                dim ? "opacity-30" : "opacity-100",
              ].join(" ")}
              style={{
                left: pct(POS[nodo.id].x, ANCHO),
                top: pct(POS[nodo.id].y, ALTO),
                width: `${((tema ? ANCHO_TEMA : ANCHO_SUB) / ANCHO) * 100}%`,
                "--tono": lit ? LIMA : tema ? LILA : BLANCO,
                "--brillo": tema ? 0.3 : 0.1,
                transform: `translate(-50%, -50%) scale(${elegido ? 1.06 : 1})`,
                textShadow: lit ? "0 0 12px rgba(196,253,54,0.8)" : "0 1px 6px rgba(3,3,16,0.8)",
              }}
            >
              {nodo.nombre}
            </button>
          );
        })}
      </div>

      {/* Ficha del nodo elegido: el toque ilumina, este botón abre el tema. */}
      <div className="relative border-t border-gris/10 bg-noche/60 px-4 py-4 backdrop-blur-md" aria-live="polite">
        {nodoActivo ? (
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-widest text-lima">
                /{nodoActivo.tipo === "tema" ? "Tema" : "Subtema"} · {CANTIDAD[nodoActivo.id]}{" "}
                {CANTIDAD[nodoActivo.id] === 1 ? "programa" : "programas"}
              </p>
              <p className="truncate font-display text-lg font-semibold leading-tight text-gris">
                {nodoActivo.nombre}
              </p>
            </div>
            <RouterLink
              to={`/temas/${nodoActivo.id}`}
              className="shrink-0 rounded-full bg-lima px-5 py-2.5 text-sm font-medium text-noche transition-transform duration-200 active:scale-95"
            >
              Ver tema →
            </RouterLink>
          </div>
        ) : (
          <p className="text-center font-mono text-[11px] uppercase tracking-widest text-gris/60">
            Tocá un nodo para iluminar sus caminos
          </p>
        )}
      </div>
    </div>
  );
}
