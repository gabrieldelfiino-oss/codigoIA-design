import programas from "../data/programas.json";

// Nombres de temporada tal cual quedaron guardados en programas.json.
// Centralizados acá para no repetir el string a mano en cada sección.
export const TEMPORADAS = {
  ULTIMA: "Temporada 3",
  ADICIONAL: "Temporada 2",
  RADIO: "Código IA Radio",
  ARCHIVO: "Código IA 2023",
};

export function getProgramasPorTemporada(temporada) {
  return programas.filter((p) => p.temporada === temporada);
}

export default programas;
