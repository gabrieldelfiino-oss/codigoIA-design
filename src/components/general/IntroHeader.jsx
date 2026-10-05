import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import BrandTitle from '../utils/BrandTitle'
import Nav from './Nav'

// Cuánto se queda el título grande centrado (ya asentado) antes de
// "convertirse" en header. Se suma al tiempo que tarda en aparecer
// difuminado (ver transition en BrandTitle, ~1.1s) para que no se corten.
const INTRO_DURATION_MS = 2200

export default function IntroHeader({ onIntroDone }) {
  const [introDone, setIntroDone] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroDone(true)
      onIntroDone?.()
    }, INTRO_DURATION_MS)
    return () => clearTimeout(timer)
  }, [onIntroDone])

  return (
    <>
      {/* Header fijo: vacío mientras dura la intro, se llena cuando termina */}
      <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-noche px-6 py-5 sm:px-10">
        {introDone && <BrandTitle variant="small" />}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: introDone ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="ml-auto"
        >
          {introDone && <Nav />}
        </motion.div>
      </header>

      {/* Título grande centrado: solo existe durante la intro.
          Al desmontarse (introDone = true) en el mismo render en que
          BrandTitle "small" se monta arriba, Framer Motion anima
          automáticamente la transición entre ambos vía layoutId. */}
      {!introDone && (
        <div className="fixed inset-0 flex items-center justify-center bg-noche bg-grid-azul">
          <BrandTitle variant="large" />
        </div>
      )}
    </>
  )
}
