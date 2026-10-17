import { getProgramas, getProgramaPorId, getTemporada } from "./programas";
import { TEMAS } from "./temas";
import { getInvitados, getProgramasDePersona } from "./personas";

const MINIMO_CARACTERES = 2;

// Compara sin importar mayúsculas ni tildes ("educacion" encuentra "Educación").
const normalizar = (texto) =>
  (texto ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

const coincide = (q, ...campos) =>
  campos.some((campo) => normalizar(campo).includes(q));

/**
 * Busca `consulta` en temas, programas e invitados. Devuelve una lista de
 * { tipo, id, titulo, detalle, to }, donde `to` es la ruta a la que lleva
 * cada resultado: el tema, la ficha del programa o, para una persona, la ficha
 * de su primer programa.
 */
export function buscar(consulta, limite = 8) {
  const q = normalizar(consulta).trim();
  if (q.length < MINIMO_CARACTERES) return [];

  const temas = TEMAS.filter((t) => coincide(q, t.nombre)).map((t) => ({
    tipo: "tema",
    id: t.id,
    titulo: t.nombre,
    detalle: t.tipo === "subtema" ? "Subtema" : "Tema",
    to: `/temas/${t.id}`,
  }));

  const programas = getProgramas()
    .filter((p) => coincide(q, p.titulo, p.subtitulo, p.pregunta))
    .map((p) => ({
      tipo: "programa",
      id: p.id,
      titulo: p.titulo,
      detalle: getTemporada(p.temporadaId)?.titulo,
      to: `/programa/${p.id}`,
    }));

  const invitados = getInvitados()
    .filter((persona) => coincide(q, persona.nombre))
    .map((persona) => {
      const programa = getProgramaPorId(getProgramasDePersona(persona.id)[0]);
      return programa
        ? {
            tipo: "invitado",
            id: persona.id,
            titulo: persona.nombre,
            detalle: programa.titulo,
            to: `/programa/${programa.id}`,
          }
        : null;
    })
    .filter(Boolean);

  return [...temas, ...programas, ...invitados].slice(0, limite);
}
