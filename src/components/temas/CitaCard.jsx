import { formatTiempo, iniciales } from "../../servicios/citas";
import { getTemporada } from "../../servicios/programas";

/** Cita destacada: quién la dijo, el texto y un botón que abre el video en ese momento. */
export default function CitaCard({ cita, onReproducir }) {
  const { persona, programa } = cita;
  if (!persona || !programa) return null;
  const temporada = getTemporada(programa.temporadaId);

  return (
    <figure className="group min-w-0 border-2 border-noche bg-white text-noche shadow-[8px_8px_0_0_#1A1A30]">
      <figcaption className="flex flex-wrap items-center gap-3 border-b-2 border-noche p-4">
        <span
          aria-hidden
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-noche bg-azul font-display text-base font-semibold text-gris"
        >
          {iniciales(persona.nombre)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-semibold uppercase leading-tight">
            {persona.nombre}
          </p>
          {persona.profesion && (
            <p className="font-mono text-[11px] uppercase tracking-wider text-noche/70">
              {persona.profesion}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => onReproducir(cita)}
          className="btn-brutal w-full shrink-0 rounded-full text-center sm:w-auto bg-azul px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-gris hover:bg-noche"
        >
          ▶ Reproducir {formatTiempo(cita.inicio)}
        </button>
      </figcaption>
      <blockquote className="p-6 font-serif text-xl italic leading-relaxed sm:text-2xl">
        “{cita.texto}”
      </blockquote>
      <p className="border-t-2 border-noche bg-gris px-5 py-3 font-mono text-[11px] uppercase tracking-wider">
        {temporada?.titulo} · {programa.titulo}
      </p>
    </figure>
  );
}
