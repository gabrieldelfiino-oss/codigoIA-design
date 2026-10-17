import proyecto from "../../data/proyecto.json"

// Los campos salen de proyecto.json (contacto.campos); acá solo se decide
// qué tipo de control usa cada uno. Los que no figuran son texto simple.
const TIPOS = { correo: "email", mensaje: "textarea" }
const AUTOCOMPLETE = { nombre: "name", correo: "email" }

const CLASE_CAMPO =
  "border-2 border-noche bg-gris px-4 py-3 text-base text-noche shadow-[4px_4px_0_0_#C4FD36] transition-shadow placeholder:text-noche/60 focus:shadow-[6px_6px_0_0_#C4FD36]"

/**
 * Formulario de contacto: por ahora solo UI, sin envío real.
 * Cuando se defina un servicio (EmailJS, Formspree, backend propio),
 * handleSubmit es el único lugar que hay que tocar.
 */
export default function ContactForm() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: conectar a un servicio de envío cuando se decida cuál usar.
  }

  return (
    <section id="contacto" className="relative overflow-hidden border-b-2 border-noche bg-azul text-gris">
    <div aria-hidden className="halftone-lima halftone-fade pointer-events-none absolute inset-0 opacity-40" />
    <div className="relative mx-auto max-w-2xl px-6 py-20 sm:px-10 sm:py-28">
      <h2 className="mb-10 font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-7xl">
        <span className="resaltado bg-lima text-noche">Contacto</span>
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {proyecto.contacto.campos.map((campo) =>
          TIPOS[campo.id] === "textarea" ? (
            <textarea
              key={campo.id}
              name={campo.id}
              placeholder={campo.etiqueta}
              aria-label={campo.etiqueta}
              rows={4}
              className={CLASE_CAMPO}
            />
          ) : (
            <input
              key={campo.id}
              type={TIPOS[campo.id] ?? "text"}
              name={campo.id}
              placeholder={campo.etiqueta}
              aria-label={campo.etiqueta}
              autoComplete={AUTOCOMPLETE[campo.id]}
              className={CLASE_CAMPO}
            />
          )
        )}
        <button
          type="submit"
          className="btn-brutal mt-4 w-fit bg-lima px-7 py-3.5 font-mono text-sm font-semibold uppercase tracking-wider text-noche hover:bg-gris"
        >
          Enviar
        </button>
      </form>
    </div>
    </section>
  )
}
