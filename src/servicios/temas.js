import temas from "../data/temas.json";
import programaTema from "../data/programa_tema.json";
import { getProgramaPorId } from "./programas";

// Todos los temas de temas.json. `tipo` es "tema" o "subtema"; los que tienen
// `mapa` ({x, y} en % del lienzo) son nodos del mapa de la home. Un programa
// puede tener varios temas y un tema agrupa varios programas: la relación vive
// en programa_tema.json.
export const TEMAS = [...temas].sort((a, b) => a.orden - b.orden);

export function getTema(id) {
  return TEMAS.find((t) => t.id === id);
}

export function getProgramasDeTema(temaId) {
  return programaTema
    .filter((r) => r.temaId === temaId)
    .map((r) => getProgramaPorId(r.programaId))
    .filter(Boolean);
}

export function getTemasDePrograma(programaId) {
  const ids = new Set(
    programaTema.filter((r) => r.programaId === programaId).map((r) => r.temaId)
  );
  return TEMAS.filter((t) => ids.has(t.id));
}
