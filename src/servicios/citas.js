import citas from "../data/citas.json";
import personas from "../data/personas.json";
import { getProgramaPorId } from "./programas";
import { getProgramasDeTema } from "./temas";

const personasPorId = new Map(personas.map((p) => [p.id, p]));

// Cita enriquecida con su persona y su programa.
function armar(cita) {
  return {
    ...cita,
    persona: personasPorId.get(cita.personaId) ?? null,
    programa: getProgramaPorId(cita.programaId) ?? null,
  };
}

// Citas destacadas de los programas que tocan un tema.
export function getCitasDeTema(temaId) {
  const ids = new Set(getProgramasDeTema(temaId).map((p) => p.id));
  return citas.filter((c) => ids.has(c.programaId)).map(armar);
}

// 905 -> "15:05" · 3725 -> "1:02:05"
export function formatTiempo(segundos = 0) {
  const s = Math.max(0, Math.floor(segundos));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = String(s % 60).padStart(2, "0");
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
}

export function iniciales(nombre = "") {
  return nombre
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}
