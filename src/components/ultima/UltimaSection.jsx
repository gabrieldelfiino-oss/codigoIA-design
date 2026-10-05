import UltimaTabs from "./UltimaTabs";

const PREGUNTAS = [
  {
    programaId: 14,
    pregunta: "¿La IA está formando a nuestros niños?",
    descripcion:
      "¿Y qué efectos tiene en su desarrollo cognitivo? Conversamos con educadores, psicólogos y familias que conviven con pantallas, algoritmos y contenidos automatizados en la crianza cotidiana. Entre la practicidad y la preocupación.",
  },
  {
    programaId: 13,
    pregunta: "¿Tu terapeuta puede ser un algoritmo?",
    descripcion:
      "Del diván al chatbot: exploramos qué pasa cuando le contás tus dramas más profundos a una máquina que nunca duerme, nunca juzga… y nunca es humana.",
  },
  {
    programaId: 12,
    pregunta: "¿Se puede amar a una IA?",
    descripcion:
      "Aplicaciones que simulan parejas perfectas, voces que te enamoran, compañía instantánea bajo demanda. La pregunta dejó de ser si esto es posible; ahora queremos saber qué estamos perdiendo en el camino.",
  },
  {
    programaId: 15,
    pregunta: "¿Tu billetera está segura?",
    descripcion:
      "Deepfakes, estafas hechas a medida, voces clonadas de tus seres queridos. Cuando la IA se cruza con tu dinero, el juego cambia.",
  },
];

/**
 * Presentación de la Temporada 3 (la última y la más reciente): la bajada
 * editorial completa del ciclo + las 4 preguntas/episodios con link directo
 * a su video en YouTube. Va entre el SeasonCarousel y la AditionalSection.
 */
export default function UltimaSection() {
  return (
    <section id="temporada-3" className="bg-lima">
    <div className="mx-auto max-w-5xl px-6 pb-14 pt-24 sm:px-10 sm:pb-20 sm:pt-32">
      <p className="mb-5 inline-block bg-noche px-3 py-1 font-mono text-xs uppercase tracking-widest text-lima">
        /Temporada 3
      </p>
      <h2 className="max-w-3xl font-display text-4xl font-medium leading-[1.05] text-noche sm:text-6xl">
        ¿Qué ocurre cuando la IA se mete en tu vida privada?
      </h2>

      <div className="mt-8 max-w-2xl space-y-5 text-base text-noche/80 sm:text-lg">
        <p>
          En este ciclo nos metemos en la intimidad de las personas. Un
          territorio donde la inteligencia artificial ya no es ciencia ficción,
          sino parte de la cotidianidad y privacidad humana. Ahí donde nadie te
          avisó que las reglas estaban cambiando. La inteligencia artificial ya
          no es el futuro, es el presente. Y nosotros hacemos las preguntas
          incómodas a los expertos y académicos.
        </p>
        <p>
          Cuatro episodios. Cuatro realidades que ya están acá. Creados y
          producidos por estudiantes de la Facultad de Información y
          Comunicación (FIC, Udelar), con un enfoque crítico y sin filtro.
        </p>
      </div>

      <UltimaTabs items={PREGUNTAS} />
    </div>
    </section>
  );
}
