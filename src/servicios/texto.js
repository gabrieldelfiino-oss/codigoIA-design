// Helpers para los textos largos de programas.json (resumen, descripcion),
// que vienen con marcas tipo markdown: **negrita**, *cursiva* y URLs sueltas.

// Parte un texto en trozos; los que matchean la marca quedan en posiciones impares.
const MARCAS = /(\*\*[^*]+\*\*|\*[^*\n]+\*|https?:\/\/[^\s)]+)/g;

export function partirInline(texto) {
  return texto.split(MARCAS);
}

// Texto plano: sin los asteriscos (para recortar o mostrar como bajada).
export function quitarMarcas(texto) {
  return texto ? texto.replace(/\*\*?([^*]+)\*\*?/g, "$1") : texto;
}

// Las fechas pueden venir con hora ("2025-12-10T20:00:00-03:00") o solo como
// día ("2025-05-24"); a estas últimas se las lee en UTC para que no se corran
// un día por la zona horaria.
export function formatFecha(valor) {
  if (!valor) return null;
  const soloDia = valor.length === 10;
  return new Date(valor).toLocaleDateString("es-UY", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: soloDia ? "UTC" : "America/Montevideo",
  });
}
