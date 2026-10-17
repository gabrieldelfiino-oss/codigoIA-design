import mapa from "../data/mapa.json";
import { TEMAS } from "./temas";

// Geometría del mapa de nodos. Las posiciones salen de temas.json (campo
// `mapa`, en %) y las conexiones tema ↔ subtema de mapa.json. El "núcleo" (IA)
// se conecta con todos los nodos de tipo "tema".
const ANCHO = 1200;
const ALTO = 720;

export const CENTRO = mapa.centro;
export const NODOS = TEMAS.filter((t) => t.mapa);

const redondear = (n) => Math.round(n * 10) / 10;

function punto(id) {
  if (id === CENTRO.id) return [ANCHO / 2, ALTO / 2];
  const nodo = NODOS.find((n) => n.id === id);
  return [(nodo.mapa.x / 100) * ANCHO, (nodo.mapa.y / 100) * ALTO];
}

// Curva cuadrática entre dos nodos; sin punto de control queda recta.
function curva(de, a, control) {
  const [x1, y1] = punto(de);
  const [x2, y2] = punto(a);
  const [cx, cy] = control ?? [(x1 + x2) / 2, (y1 + y2) / 2];
  return `M${redondear(x1)} ${redondear(y1)} Q${redondear(cx)} ${redondear(cy)} ${redondear(x2)} ${redondear(y2)}`;
}

const hayNodo = (id) => NODOS.some((n) => n.id === id);

export const ARISTAS = [
  ...NODOS.filter((n) => n.tipo === "tema").map((n) => ({
    de: CENTRO.id,
    a: n.id,
    d: curva(CENTRO.id, n.id),
  })),
  ...mapa.aristas
    .filter((e) => hayNodo(e.de) && hayNodo(e.a))
    .map((e) => ({ de: e.de, a: e.a, d: curva(e.de, e.a, e.control) })),
];

// Ids de los nodos unidos por una arista a `id` (sin contar el núcleo).
export function getVecinos(id) {
  const vecinos = new Set();
  for (const e of ARISTAS) {
    if (e.de === id && e.a !== CENTRO.id) vecinos.add(e.a);
    if (e.a === id && e.de !== CENTRO.id) vecinos.add(e.de);
  }
  return [...vecinos];
}
