import proyecto from "../../data/proyecto.json"

// Los campos salen de proyecto.json (contacto.campos); acá solo se decide
// qué tipo de control usa cada uno. Los que no figuran son texto simple.
const TIPOS = { correo: "email", mensaje: "textarea" }
const AUTOCOMPLETE = { nombre: "name", correo: "email" }

const CLASE_CAMPO =
  "rounded-2xl border border-noche/25 bg-gris/45 px-5 py-3 text-base text-noche transition-colors placeholder:text-noche/70 focus:border-noche focus:bg-gris/70 focus:outline-none"

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
    <section id="contacto" className="seccion-curva tx tx-cuadricula-claro bg-lila text-noche">
    <div className="mx-auto max-w-xl px-6 py-14 sm:px-10 sm:py-20">
      <h2 className="mb-8 font-display text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl">
        Contacto
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
          className="mt-4 w-fit rounded-full bg-noche px-8 py-3.5 text-sm font-medium text-gris transition duration-200 hover:-translate-y-0.5 hover:bg-lima hover:text-noche"
        >
          Enviar
        </button>
      </form>
    </div>
    </section>
  )
}
