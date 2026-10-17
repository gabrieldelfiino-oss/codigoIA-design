import { useEffect, useRef, useState } from 'react'
import { animate, motion } from 'framer-motion'
import BrandTitle from '../utils/BrandTitle'
import Heartbeat from '../utils/Heartbeat'
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
  const headerRef = useRef(null)
  const sloganRef = useRef(null)

  useEffect(() => {
    if (skip) return
    const timer = setTimeout(() => {
      setIntroDone(true)
      onIntroDone?.()
    }, INTRO_DURATION_MS)
    return () => clearTimeout(timer)
  }, [onIntroDone, skip])

  // Viaje del slogan: sale del título del hero (a su tamaño y en su lugar), se
  // achica y va hacia arriba y al centro del header, mientras el título se
  // desvanece. Avanza (p: 0 → 1) con el scroll por el hero y también cuando el
  // carrusel pasa a otro banner. Solo en pantallas anchas (en las chicas no
  // entra entre logo y buscador). Con "reducir movimiento" no hay tramo
  // intermedio. Todo se escribe directo en los elementos, sin re-renders.
  useEffect(() => {
    if (!introDone) return
    const raiz = document.documentElement
    const ancho = window.matchMedia('(min-width: 1280px)')
    const reducir = window.matchMedia('(prefers-reduced-motion: reduce)')
    const estado = { scroll: 0, slide: 0 }
    // Último lugar conocido del título (coordenadas del documento): sirve de
    // punto de partida aun cuando el banner del slogan no está a la vista.
    const titulo = { x: 48, y: 380, ancho: 880 }
    let viaje = null

    const pintar = () => {
      const el = sloganRef.current
      if (!el) return
      if (!ancho.matches) {
        el.style.opacity = '0'
        raiz.style.setProperty('--eslogan-h2', '0')
        return
      }
      const h2 = document.getElementById('eslogan-hero')
      if (h2) {
        const r = h2.getBoundingClientRect()
        titulo.x = r.left
        titulo.y = r.top + r.height / 2 + window.scrollY
        titulo.ancho = r.width
      }
      let p = Math.max(estado.scroll, estado.slide)
      if (reducir.matches) p = p > 0.5 ? 1 : 0
      const w = el.offsetWidth || 1
      const escala0 = Math.min(3, Math.max(1, (titulo.ancho * 0.92) / w))
      const x0 = titulo.x + (w * escala0) / 2
      const y0 = titulo.y - window.scrollY
      const x1 = window.innerWidth / 2
      const y1 = (headerRef.current?.offsetHeight ?? 72) / 2
      const e = p * p * (3 - 2 * p)
      el.style.transform = `translate(${(x0 + (x1 - x0) * e).toFixed(1)}px, ${(y0 + (y1 - y0) * e).toFixed(1)}px) translate(-50%, -50%) scale(${(escala0 + (1 - escala0) * e).toFixed(3)})`
      el.style.opacity = Math.min(1, p * 6).toFixed(3)
      raiz.style.setProperty('--eslogan-h2', Math.min(1, p / 0.4).toFixed(3))
    }

    const alScrollear = () => {
      estado.scroll = Math.min(1, Math.max(0, window.scrollY / RECORRIDO_SLOGAN_PX))
      pintar()
    }
    const alCambiarSlide = (ev) => {
      viaje?.stop()
      viaje = animate(estado.slide, ev.detail?.hero ? 0 : 1, {
        duration: reducir.matches ? 0 : 0.85,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => {
          estado.slide = v
          pintar()
        },
      })
    }

    alScrollear()
    window.addEventListener('scroll', alScrollear, { passive: true })
    window.addEventListener('resize', alScrollear)
    window.addEventListener('carrusel-slide', alCambiarSlide)
    return () => {
      viaje?.stop()
      window.removeEventListener('scroll', alScrollear)
      window.removeEventListener('resize', alScrollear)
      window.removeEventListener('carrusel-slide', alCambiarSlide)
      raiz.style.removeProperty('--eslogan-h2')
    }
  }, [introDone])

  // Logo = "volver al inicio": sube al principio y vuelve al primer banner.
  const alInicio = (e) => {
    e.preventDefault()
    window.dispatchEvent(new Event('carrusel-inicio'))
    const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reducir ? 'auto' : 'smooth' })
  }

  return (
    <>
      {/* Header fijo: vacío mientras dura la intro, se llena cuando termina */}
      <header
        ref={headerRef}
        className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-noche px-6 py-5 sm:px-10"
      >
        {introDone && (
          <a href="/" aria-label="Código.IA: volver al inicio" onClick={alInicio} className="block rounded-md">
            <BrandTitle variant="small" />
          </a>
        )}

        {/* Slogan del header: su posición, tamaño y opacidad los escribe el efecto de arriba. */}
        {introDone && (
          <p
            ref={sloganRef}
            aria-hidden="true"
            style={{ opacity: 0 }}
            className="pointer-events-none absolute left-0 top-0 hidden whitespace-nowrap font-display text-[15px] font-medium text-gris xl:block"
          >
            El programa que te ayuda a no estar <Heartbeat className="text-lima">re perdido</Heartbeat> con la IA
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
