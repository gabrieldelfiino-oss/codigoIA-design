import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import BrandTitle from '../utils/BrandTitle'
import Nav from './Nav'
import SearchBar from './SearchBar'

// Cuánto se queda el título grande centrado (ya asentado) antes de
// "convertirse" en header. Se suma al tiempo que tarda en aparecer
// difuminado (ver transition en BrandTitle, ~1.1s) para que no se corten.
const INTRO_DURATION_MS = 2200

// Cuántos px de scroll tarda el slogan en llegar al header.
const RECORRIDO_SLOGAN_PX = 260

// `skip`: la intro ya se vio en esta carga (ej. al volver desde la ficha de un
// programa); arranca directo en el header chico, sin animación ni espera.
export default function IntroHeader({ onIntroDone, skip = false }) {
  const [introDone, setIntroDone] = useState(skip)

  useEffect(() => {
    if (skip) return
    const timer = setTimeout(() => {
      setIntroDone(true)
      onIntroDone?.()
    }, INTRO_DURATION_MS)
    return () => clearTimeout(timer)
  }, [onIntroDone, skip])

  // Progreso (0 → 1) del viaje del slogan: mientras la persona baja por el
  // hero, el título grande se va y el slogan aparece achicado en el header.
  // Solo en pantallas anchas (en las chicas no entra entre logo y buscador).
  // Con "reducir movimiento" el cambio es de un golpe, sin gradiente.
  useEffect(() => {
    if (!introDone) return
    const raiz = document.documentElement
    const ancho = window.matchMedia('(min-width: 1280px)')
    const reducir = window.matchMedia('(prefers-reduced-motion: reduce)')
    let cuadro = 0
    const actualizar = () => {
      cuadro = 0
      let p = Math.min(1, Math.max(0, window.scrollY / RECORRIDO_SLOGAN_PX))
      if (reducir.matches) p = p > 0.5 ? 1 : 0
      raiz.style.setProperty('--eslogan', ancho.matches ? p.toFixed(3) : '0')
    }
    const alMover = () => {
      if (!cuadro) cuadro = requestAnimationFrame(actualizar)
    }
    actualizar()
    window.addEventListener('scroll', alMover, { passive: true })
    window.addEventListener('resize', alMover)
    return () => {
      cancelAnimationFrame(cuadro)
      window.removeEventListener('scroll', alMover)
      window.removeEventListener('resize', alMover)
      raiz.style.removeProperty('--eslogan')
    }
  }, [introDone])

  return (
    <>
      {/* Header fijo: vacío mientras dura la intro, se llena cuando termina */}
      <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-noche px-6 py-5 sm:px-10">
        {introDone && <BrandTitle variant="small" />}

        {/* Slogan del header: nace grande y abajo, y se asienta chico al centro. */}
        {introDone && (
          <p
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[15px] font-medium text-gris xl:block"
            style={{
              opacity: 'var(--eslogan, 0)',
              transform:
                'translate(-50%, calc(-50% + (1 - var(--eslogan, 0)) * 70px)) scale(calc(1 + (1 - var(--eslogan, 0)) * 1.1))',
            }}
          >
            El programa que te ayuda a no estar <span className="text-lima">re perdido</span> con la IA
          </p>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: introDone ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="ml-auto flex min-w-0 items-center gap-4 sm:gap-8"
        >
          {introDone && <SearchBar />}
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
