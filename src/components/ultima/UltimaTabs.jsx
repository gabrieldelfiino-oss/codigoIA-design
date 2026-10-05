import programas from "../../data/programas.json";
import { getYoutubeThumbnail } from "../../utils/youtube";

/**
 * Lista de las 4 preguntas/episodios de la Temporada 3. Cada fila linkea
 * directo al video de YouTube del programa correspondiente.
 * Acento verde, el color de la última temporada en toda la página.
 */
export default function UltimaTabs({ items }) {
  return (
    <div className="mt-14 flex flex-col divide-y divide-noche/30 border-t-2 border-noche">
      {items.map((item, i) => {
        const programa = programas.find((p) => p.id === item.programaId);
        if (!programa) return null;
        const thumb = getYoutubeThumbnail(programa.linkYoutube);
        const disabled = !programa.linkYoutube;

        const contenido = (
          <div className="grid grid-cols-1 items-start gap-5 py-8 sm:grid-cols-[1fr_11rem] sm:items-center sm:gap-8">
            <div className="min-w-0">
              <h3 className="font-display text-xl font-medium text-noche transition-colors duration-300 group-hover:text-azul sm:text-2xl">
                {item.pregunta}
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-noche/75 sm:text-base">
                {item.descripcion}
              </p>
            </div>

            <div className="hidden h-24 w-40 shrink-0 overflow-hidden border-2 border-noche bg-noche/10 transition-shadow duration-300 group-hover:shadow-[4px_4px_0_0_#2400FF] sm:block">
              {thumb && (
                <img
                  src={thumb}
                  alt={programa.titulo}
                  className="h-full w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                />
              )}
            </div>
          </div>
        );

        if (disabled) {
          return (
            <div key={item.programaId} className="group">
              {contenido}
            </div>
          );
        }

        return (
          <a
            key={item.programaId}
            href={programa.linkYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            {contenido}
          </a>
        );
      })}
    </div>
  );
}
