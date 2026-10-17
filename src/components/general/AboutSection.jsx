import proyecto from "../../data/proyecto.json"

const LINEA = "before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-noche before:content-[''] after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-noche after:content-['']"

/**
 * "Sobre el proyecto": acordeón (details/summary) con el texto de proyecto.json.
 */
export default function AboutSection() {
  const { sobre } = proyecto

  return (
    <section id="sobre-el-proyecto" className="bg-gris text-noche">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10">
        <details className="group border-y-2 border-noche">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-[18px] font-display text-xl font-bold [&::-webkit-details-marker]:hidden">
            Sobre el proyecto
            <span
              aria-hidden
              className={`relative h-8 w-8 shrink-0 border-2 border-noche bg-lima before:h-0.5 before:w-3.5 after:h-3.5 after:w-0.5 group-open:after:hidden ${LINEA}`}
            />
          </summary>
          <div className="grid max-w-[75ch] gap-4 px-5 pb-6 text-base leading-normal">
            <p>{sobre.proyecto}</p>
            <p>{sobre.efi}</p>
          </div>
        </details>
      </div>
    </section>
  )
}
