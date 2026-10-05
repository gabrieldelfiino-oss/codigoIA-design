import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const LINKS = [
  { href: '#temporada-3', label: 'Temporada 3', hover: 'hover:bg-lima' },
  { href: '#temporada-2', label: 'Temporada 2', hover: 'hover:bg-naranja' },
  { href: '#codigo-ia-radio', label: 'Código IA Radio', hover: 'hover:bg-lila' },
  { href: '#todos-los-programas', label: 'Todos los programas', hover: 'hover:bg-azul hover:text-gris' },
  { href: '#contacto', label: 'Contacto', hover: 'hover:bg-gris' },
]

/**
 * Botón de menú (derecha del header) + overlay a pantalla completa con los
 * links a cada sección de la página. Las líneas del botón se transforman
 * en una X cuando el menú está abierto.
 */
export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.button
        type="button"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="group relative z-[60] flex h-5 w-8 flex-col justify-center gap-[6px]"
      >
        <motion.span
          animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="block h-[2px] w-full shrink-0 origin-center bg-gris transition-colors duration-300 group-hover:bg-lima"
        />
        <motion.span
          animate={{ rotate: open ? -45 : 0, y: open ? -4 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="block h-[2px] w-full shrink-0 origin-center bg-gris transition-colors duration-300 group-hover:bg-lima"
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col justify-center bg-noche px-6 sm:px-12"
          >
            <nav className="flex flex-col items-start gap-2 sm:gap-3">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                  className={`font-display text-4xl font-medium text-gris transition-colors duration-300 sm:text-6xl px-3 -mx-3 hover:text-noche ${link.hover}`}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
