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
        <input
          type="text"
          name="nombre"
          placeholder="Tu nombre"
          className="border-2 border-gris/40 bg-transparent px-4 py-3 text-gris placeholder:text-gris/60 focus:border-lima focus:outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Tu correo electrónico"
          className="border-2 border-gris/40 bg-transparent px-4 py-3 text-gris placeholder:text-gris/60 focus:border-lima focus:outline-none"
        />
        <input
          type="text"
          name="asunto"
          placeholder="Asunto"
          className="border-2 border-gris/40 bg-transparent px-4 py-3 text-gris placeholder:text-gris/60 focus:border-lima focus:outline-none"
        />
        <textarea
          name="mensaje"
          placeholder="Tu mensaje (opcional)"
          rows={4}
          className="border-2 border-gris/40 bg-transparent px-4 py-3 text-gris placeholder:text-gris/60 focus:border-lima focus:outline-none"
        />
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
