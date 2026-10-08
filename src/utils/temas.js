import programas from "../data/programas.json";

// Temas transversales: cada uno agrupa TODOS los programas que tengan ese
// "tema" en programas.json (ver src/data/programas.json), no un único
// representativo como antes.
export const TEMAS = [
  { id: "humanidad", nombre: "Humanidad" },
  { id: "comunicacion", nombre: "Comunicación" },
  { id: "arte", nombre: "Arte" },
  { id: "finanzas", nombre: "Finanzas" },
];

export function getProgramasDeTema(temaId) {
  return programas.filter((p) => p.tema === temaId);
}
