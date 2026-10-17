import programas from "../data/programas.json";
import temporadas from "../data/temporadas.json";
import recursos from "../data/recursos.json";
import { quitarMarcas } from "./texto";

// Temporadas ordenadas por el campo `orden` de temporadas.json (la primera es
// la más vieja).
const temporadasPorOrden = [...temporadas].sort((a, b) => a.orden - b.orden);

// Temporadas por posición relativa al final: ULTIMA es la de mayor `orden` y
// PENULTIMA la anterior. Son ids, tal cual figuran en temporadas.json / en el
// campo `temporadaId` de programas.json; el título sale de getTemporada(id).
// Las demás (Radio, 2023) no tienen clave: se piden por su id.
export const TEMPORADAS = {
  ULTIMA: temporadasPorOrden.at(-1)?.id,
  PENULTIMA: temporadasPorOrden.at(-2)?.id,
};

export function getTemporada(id) {
  return temporadas.find((t) => t.id === id);
}

// De la más nueva a la más vieja (orden de las filas de "Todos los programas").
export function getTemporadasRecientesPrimero() {
  return [...temporadasPorOrden].reverse();
}

export function getProgramasPorTemporada(temporadaId) {
  return programas.filter((p) => p.temporadaId === temporadaId);
}

export function getProgramas() {
  return programas;
}

export function getProgramaPorId(id) {
  return programas.find((p) => p.id === id);
}

export function getRecursos(programaId) {
  return recursos
    .filter((r) => r.programaId === programaId)
    .sort((a, b) => a.orden - b.orden);
}

// Frase corta para acompañar al título: subtítulo, si no la pregunta del
// episodio y, en último caso, el resumen o la descripción (sin marcas).
export function getBajada(programa) {
  return (
    programa.subtitulo ||
    programa.pregunta ||
    quitarMarcas(programa.resumen || programa.descripcion) ||
    null
  );
}
