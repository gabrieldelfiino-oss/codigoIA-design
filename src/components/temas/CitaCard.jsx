import { formatTiempo, iniciales } from "../../servicios/citas";
import { getTemporada } from "../../servicios/programas";

/** Cita destacada: quién la dijo, el texto y un botón que abre el video en ese momento. */
export default function CitaCard({ cita, onReproducir }) {
  const { persona, programa } = cita;
  if (!persona || !programa) return null;
  const temporada = getTemporada(programa.temporadaId);

  return (
    <figure className="group border-2 border-gris/30 bg-transparent text-gris shadow-[8px_8px_0_0_rgba(196,253,54,0.25)] transition-colors hover:border-lima">
      <figcaption className="flex items-center gap-3 border-b-2 border-gris/30 p-4">
        <span
          aria-hidden
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-gris/30 bg-lila font-sans text-sm text-noche"
        >
          {iniciales(persona.nombre)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg font-semibold uppercase leading-tight">
            <span className="px-1 transition-colors group-hover:bg-lima group-hover:text-noche [box-decoration-break:clone]">
              {persona.nombre}
            </span>
          </p>
          {persona.profesion && (
            <p className="truncate font-mono text-[11px] uppercase tracking-wider text-gris/60">
              {persona.profesion}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => onReproducir(cita)}
          className="shrink-0 border-2 border-azul bg-azul px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-[4px_4px_0_0_rgba(196,253,54,0.6)] transition-transform hover:-translate-y-0.5"
        >
          ▶ Reproducir {formatTiempo(cita.inicio)}
        </button>
      </figcaption>
      <blockquote className="p-5 font-serif text-lg italic leading-relaxed sm:text-xl">
        “{cita.texto}”
      </blockquote>
      <p className="border-t border-gris/20 px-5 py-3 font-mono text-[11px] uppercase tracking-wider">
        {temporada?.titulo} · {programa.titulo}
      </p>
    </figure>
  );
}
