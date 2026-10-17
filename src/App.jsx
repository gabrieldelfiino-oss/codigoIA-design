import { useEffect, useState } from "react";
import { useRoute } from "./servicios/router";
import IntroHeader from "./components/general/IntroHeader";
import ThemeSection from "./components/temas/ThemeSection";
import SeasonCarousel from "./components/general/Carousel";
import AditionalSection from "./components/adicional/AditionalSection";
import AllSection from "./components/general/AllSection";
import AboutSection from "./components/general/AboutSection";
import ContactForm from "./components/general/ContactForm";
import Footer from "./components/general/Footer";
import ProgramPage from "./components/program/ProgramPage";
import ThemePage from "./components/temas/ThemePage";

// Único "nivel de profundidad" por ahora: la ficha de un programa. El id es
// el slug del programa en programas.json (ej. /programa/arte-e-ia).
const RUTA_PROGRAMA = /^\/programa\/([^/]+)\/?$/;
// Página de un tema o subtema del mapa; el id es el de temas.json.
const RUTA_TEMA = /^\/temas\/([^/]+)\/?$/;

// La intro (título grande que se vuelve header) se muestra una sola vez por
// carga de la página. Vive a nivel de módulo (y no en el estado de Home)
// porque al ir a la ficha de un programa Home se desmonta, y al volver se
// montaría de cero repitiendo la intro. Al recargar el navegador el módulo se
// evalúa de nuevo y la intro vuelve a verse.
let introYaVista = false;

export default function App() {
  const pathname = useRoute();
  const matchPrograma = pathname.match(RUTA_PROGRAMA);
  const matchTema = pathname.match(RUTA_TEMA);

  if (matchPrograma) {
    return <ProgramPage id={decodeURIComponent(matchPrograma[1])} />;
  }

  if (matchTema) {
    return <ThemePage id={decodeURIComponent(matchTema[1])} />;
  }

  return <Home />;
}

function Home() {
  const [introDone, setIntroDone] = useState(introYaVista);

  // Al volver desde otra página con un ancla (ej. "/#temas" desde ThemePage)
  // baja a esa sección una vez montada la home.
  useEffect(() => {
    if (!introDone || !window.location.hash) return;
    document.querySelector(window.location.hash)?.scrollIntoView();
  }, [introDone]);

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
            <SeasonCarousel />
            <ThemeSection />
            <AditionalSection />
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
