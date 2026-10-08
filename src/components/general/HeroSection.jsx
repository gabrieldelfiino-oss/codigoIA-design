import { motion } from "framer-motion";
import Isotipo from "../utils/Isotipo";

/**
 * Hero de apertura: va justo después de la intro animada (BrandTitle) y
 * antes del carrusel. Repite los motivos de IntroHeader (fondo noche +
 * grilla azul, tipografía Diagramm, isotipo) para presentar el slogan.
 */
export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-noche bg-grid-azul">
      {/* Isotipo gigante de fondo, decorativo */}
      <Isotipo className="pointer-events-none absolute -right-24 -top-24 h-[60vw] max-h-[560px] w-[60vw] max-w-[560px] text-azul/15 sm:-right-32 sm:-top-32" />

      <div className="relative mx-auto max-w-5xl px-6 py-24 sm:px-10 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 border-2 border-lima px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-lima">
            / Un programa de FIC · Udelar
          </span>
          <span className="inline-flex items-center gap-2 border-2 border-gris/30 px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-gris/70">
            +20 programas
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] text-gris sm:text-6xl"
        >
          El programa que te ayuda a no estar{" "}
          <span className="text-lima">re perdido</span> con la IA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 max-w-xl text-base text-gris/80 sm:text-lg"
        >
          Un programa para aprender qué está pasando con la Inteligencia
          Artificial.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <a
            href="https://www.youtube.com/@ProyectoFIC_codigoIA"
            className="border-2 border-gris px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-gris transition-colors duration-300 hover:border-lima hover:bg-lima hover:text-noche sm:text-sm"
          >
            Ver programas
          </a>
        </motion.div>
      </div>
    </section>
  );
}
