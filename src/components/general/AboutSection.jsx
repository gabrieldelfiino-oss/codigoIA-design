/**
 * Texto institucional del proyecto (FIC, Udelar, EFI). Estático, sin props.
 */
export default function AboutSection() {
  return (
    <section className="bg-gris text-noche">
    <div className="mx-auto max-w-4xl px-6 py-20 sm:px-10">
      <h2 className="mb-6 font-display text-3xl font-medium text-noche sm:text-5xl">Sobre el proyecto</h2>
      <p className="mb-4">
        Código.ia es un proyecto de divulgación transmedia de la Facultad de Información y
        Comunicación (FIC), de la Universidad de la República (Udelar), que aborda la temática de
        la Inteligencia Artificial en diversos campos y áreas de conocimiento. Este proyecto surge
        como parte de la Práctica Pre Profesional (PPP) vinculada a la Unidad Curricular
        «Comunicación e Inteligencia Artificial» del Instituto de Comunicación.
      </p>
      <p>
        Además, Código.ia cuenta con un Espacio de Formación Integral (EFI). Los EFI son espacios
        de trabajo donde la extensión se combina con la enseñanza y la investigación, en donde
        interactúan universitarios y no universitarios.
      </p>
    </div>
    </section>
  )
}
