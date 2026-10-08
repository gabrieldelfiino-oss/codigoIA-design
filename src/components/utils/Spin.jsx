import { motion } from "framer-motion";

/**
 * Envuelve cualquier contenido (pensado para un logo/isotipo decorativo) y
 * lo hace girar sobre su propio eje en loop infinito, a velocidad
 * constante. El tamaño y la posición se definen con `className` sobre este
 * wrapper (ancho/alto/absolute/etc.), no sobre el contenido.
 *
 * Uso:
 *   <Spin className="absolute h-40 w-40 text-azul/15" durationSeconds={50}>
 *     <Isotipo className="h-full w-full" />
 *   </Spin>
 */
export default function Spin({
  className = "",
  durationSeconds = 40,
  reverse = false,
  children,
}) {
  return (
    <motion.div
      className={className}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration: durationSeconds, ease: "linear", repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
}
