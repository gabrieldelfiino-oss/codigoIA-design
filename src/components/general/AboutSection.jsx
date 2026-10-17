import proyecto from "../../data/proyecto.json"

const LINEA = "before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-noche before:content-[''] after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-noche after:content-['']"

/**
 * "Sobre el proyecto": acordeón (details/summary) con el texto de proyecto.json.
 * Fondo lila con halftone; el acordeón es una tarjeta blanca con sombra dura.
 */
export default function AboutSection() {
  const { sobre } = proyecto

  return (
    <section id="sobre-el-proyecto" className="relative overflow-hidden border-b-2 border-noche bg-lila text-noche">
      <div aria-hidden className="halftone-noche halftone-fade pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20">
        <details className="group border-2 border-noche bg-white shadow-[8px_8px_0_0_#1A1A30]">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 font-display text-2xl font-bold uppercase tracking-tight sm:px-8 sm:text-4xl [&::-webkit-details-marker]:hidden">
            Sobre el proyecto
            <span
              aria-hidden
              className={`relative h-10 w-10 shrink-0 border-2 border-noche bg-lima transition-transform duration-200 group-hover:-rotate-6 before:h-0.5 before:w-4 after:h-4 after:w-0.5 group-open:after:hidden ${LINEA}`}
            />
          </summary>
          <div className="grid max-w-[75ch] gap-4 border-t-2 border-noche px-5 py-6 text-base leading-relaxed sm:px-8 sm:text-lg">
            <p>{sobre.proyecto}</p>
            <p>{sobre.efi}</p>
          </div>
        </details>
      </div>
    </section>
  )
}
