import proyecto from "../../data/proyecto.json"

// Los campos salen de proyecto.json (contacto.campos); acá solo se decide
// qué tipo de control usa cada uno. Los que no figuran son texto simple.
const TIPOS = { correo: "email", mensaje: "textarea" }

const CLASE_CAMPO =
  "border-2 border-gris/40 bg-transparent px-4 py-3 text-gris placeholder:text-gris/60 focus:border-lima focus:outline-none"

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
    <section id="contacto" className="bg-azul">
    <div className="mx-auto max-w-2xl px-6 py-20 sm:px-10">
      <h2 className="mb-8 font-display text-3xl font-medium text-gris sm:text-5xl">Contacto</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {proyecto.contacto.campos.map((campo) =>
          TIPOS[campo.id] === "textarea" ? (
            <textarea
              key={campo.id}
              name={campo.id}
              placeholder={campo.etiqueta}
              rows={4}
              className={CLASE_CAMPO}
            />
          ) : (
            <input
              key={campo.id}
              type={TIPOS[campo.id] ?? "text"}
              name={campo.id}
              placeholder={campo.etiqueta}
              className={CLASE_CAMPO}
            />
          )
        )}
        <button
          type="submit"
          className="mt-2 w-fit bg-lima px-6 py-3 font-mono text-sm font-medium uppercase tracking-wider text-noche transition-colors hover:bg-gris"
        >
          Enviar
        </button>
      </form>
    </div>
    </section>
  )
}
