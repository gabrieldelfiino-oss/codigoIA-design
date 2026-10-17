import personas from "../data/personas.json";
import participacion from "../data/participacion.json";

const personasPorId = new Map(personas.map((p) => [p.id, p]));

// Personas de un programa (participacion.json + personas.json), cada una con
// su `rol` en ese programa: "invitado" o "conduccion".
export function getParticipantes(programaId) {
  return participacion
    .filter((r) => r.programaId === programaId)
    .map((r) => ({ ...personasPorId.get(r.personaId), rol: r.rol }))
    .filter((p) => p.id);
}

// Personas que fueron invitadas en al menos un programa.
export function getInvitados() {
  const ids = new Set(
    participacion.filter((r) => r.rol === "invitado").map((r) => r.personaId)
  );
  return personas.filter((p) => ids.has(p.id));
}

// Ids de los programas en los que participó una persona (en cualquier rol).
export function getProgramasDePersona(personaId) {
  return participacion
    .filter((r) => r.personaId === personaId)
    .map((r) => r.programaId);
}
