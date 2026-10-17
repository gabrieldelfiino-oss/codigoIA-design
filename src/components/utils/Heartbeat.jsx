import { motion } from "framer-motion";

// Separación entre el inicio del pulso de una letra y la siguiente: esto es
// lo que genera el efecto de "ola" recorriendo la palabra.
const STAGGER_S = 0.06;
// Duración de cada pulso individual (sube y baja).
const PULSE_DURATION_S = 0.45;
// Pausa antes de que la ola vuelva a empezar desde la primera letra.
const PAUSE_BETWEEN_WAVES_S = 1.3;

/**
 * Envuelve texto corto con una animación de "latido" letra por letra: cada
 * carácter pulsa (escala) con un leve corrimiento respecto al anterior,
 * generando una ola que recorre la palabra en loop infinito. El pulso es
 * mínimo (sutil) en cada letra.
 *
 * Accesibilidad: el texto real va completo y oculto visualmente (para lectores
 * de pantalla, que lo leen de corrido) y las letras animadas se ocultan con
 * aria-hidden. Con "reducir movimiento" las letras quedan quietas.
 *
 * Al montarse, arranca enseguida (sin delay extra), así que si este
 * componente vive dentro de algo que solo se monta cuando termina la
 * intro, el latido arranca apenas eso pasa.
 *
 * Uso: <Heartbeat className="text-lima">re perdido</Heartbeat>
 */
export default function Heartbeat({ className = "", children }) {
  const text = typeof children === "string" ? children : String(children);
  const letters = Array.from(text);
  // Mismo largo de ciclo para todas las letras: así el corrimiento inicial
  // (delay) se mantiene en cada repetición y la ola se ve consistente.
  const cycleDuration = PULSE_DURATION_S + PAUSE_BETWEEN_WAVES_S;

  return (
    <span className={`inline-block ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-block">
        {letters.map((letter, i) => (
          <motion.span
            key={`${letter}-${i}`}
            className="inline-block"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{
              duration: PULSE_DURATION_S,
              ease: "easeInOut",
              delay: i * STAGGER_S,
              repeat: Infinity,
              repeatDelay: cycleDuration - PULSE_DURATION_S,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </span>
    </span>
  );
}
