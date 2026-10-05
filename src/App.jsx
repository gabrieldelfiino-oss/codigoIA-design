import { useState } from 'react'
import IntroHeader from './components/general/IntroHeader'
import SeasonCarousel from './components/general/Carousel'
import UltimaSection from './components/ultima/UltimaSection'
import AditionalSection from './components/adicional/AditionalSection'
import RadioSection from './components/radio/RadioSection'
import AllSection from './components/general/AllSection'
import AboutSection from './components/general/AboutSection'
import ContactForm from './components/general/ContactForm'
import Footer from './components/general/Footer'

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <div className="min-h-screen w-full bg-negro">
      <IntroHeader onIntroDone={() => setIntroDone(true)} />

      {/* El resto de la página no se monta hasta que "Código IA" termina
          de asentarse en el header. */}
      {introDone && (
        <>
          <main className="pt-20 sm:pt-24">
            <SeasonCarousel />
            <UltimaSection />
            <AditionalSection />
            <RadioSection />
            <AllSection />
            <AboutSection />
            <ContactForm />
          </main>

          <Footer />
        </>
      )}
    </div>
  )
}
