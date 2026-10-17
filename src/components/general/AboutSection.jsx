import proyecto from "../../data/proyecto.json"

const LINEA = "before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-noche before:content-[''] after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-noche after:content-['']"

/**
 * "Sobre el proyecto": acordeón (details/summary) con el texto de proyecto.json.
 */
export default function AboutSection() {
  const { sobre } = proyecto

  return (
    <section id="sobre-el-proyecto" className="bg-gris text-noche">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24">
        <details className="group rounded-3xl border border-noche/10 bg-white shadow-suave">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 rounded-3xl px-6 py-5 font-display text-2xl font-semibold tracking-tight sm:px-9 sm:text-3xl [&::-webkit-details-marker]:hidden">
            Sobre el proyecto
            <span
              aria-hidden
              className={`relative h-10 w-10 shrink-0 rounded-full bg-lima transition-transform duration-200 group-hover:scale-110 before:h-0.5 before:w-4 after:h-4 after:w-0.5 group-open:after:hidden ${LINEA}`}
            />
          </summary>
          <div className="grid max-w-[75ch] gap-4 px-6 pb-8 pt-1 text-base leading-relaxed text-noche/80 sm:px-9 sm:text-lg">
            <p>{sobre.proyecto}</p>
            <p>{sobre.efi}</p>
          </div>
        </details>
      </div>
    </section>
  )
}
