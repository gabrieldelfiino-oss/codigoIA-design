import { useState } from "react";
import { useRoute } from "./utils/router";
import IntroHeader from "./components/general/IntroHeader";
import HeroSection from "./components/general/HeroSection";
import ThemeSection from "./components/temas/ThemeSection";
import SeasonCarousel from "./components/general/Carousel";
import UltimaSection from "./components/ultima/UltimaSection";
import AditionalSection from "./components/adicional/AditionalSection";
import RadioSection from "./components/radio/RadioSection";
import AllSection from "./components/general/AllSection";
import AboutSection from "./components/general/AboutSection";
import ContactForm from "./components/general/ContactForm";
import Footer from "./components/general/Footer";
import ProgramPage from "./components/program/ProgramPage";

// Único "nivel de profundidad" por ahora: la ficha de un programa.
const RUTA_PROGRAMA = /^\/programa\/(\d+)\/?$/;

// La intro (título grande que se vuelve header) se muestra una sola vez por
// carga de la página. Vive a nivel de módulo (y no en el estado de Home)
// porque al ir a la ficha de un programa Home se desmonta, y al volver se
// montaría de cero repitiendo la intro. Al recargar el navegador el módulo se
// evalúa de nuevo y la intro vuelve a verse.
let introYaVista = false;

export default function App() {
  const pathname = useRoute();
  const matchPrograma = pathname.match(RUTA_PROGRAMA);

  if (matchPrograma) {
    return <ProgramPage id={Number(matchPrograma[1])} />;
  }

  return <Home />;
}

function Home() {
  const [introDone, setIntroDone] = useState(introYaVista);

  return (
    <div className="min-h-screen w-full bg-negro">
      <IntroHeader
        skip={introYaVista}
        onIntroDone={() => {
          introYaVista = true;
          setIntroDone(true);
        }}
      />

      {/* El resto de la página no se monta hasta que "Código IA" termina
          de asentarse en el header. */}
      {introDone && (
        <>
          <main className="pt-20 sm:pt-24">
            {/* <HeroSection /> */}
            <SeasonCarousel />
            <ThemeSection />
            {/* <UltimaSection /> */}
            <AditionalSection />
            {/* <RadioSection /> */}
            <AllSection />
            <AboutSection />
            <ContactForm />
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}
