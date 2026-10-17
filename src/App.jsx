import { useEffect, useRef, useState } from "react";
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

  // Accesibilidad en la navegación entre páginas (el router no recarga): al
  // cambiar de ruta se mueve el foco al título de la página y se anuncia su
  // nombre en una región "status" para lectores de pantalla.
  const [anuncio, setAnuncio] = useState("");
  const primeraCarga = useRef(true);
  useEffect(() => {
    if (primeraCarga.current) {
      primeraCarga.current = false;
      return;
    }
    const espera = setTimeout(() => {
      const titulo = document.querySelector("main h1");
      if (titulo) {
        titulo.setAttribute("tabindex", "-1");
        titulo.focus({ preventScroll: true });
      }
      setAnuncio(document.title);
    }, 200);
    return () => clearTimeout(espera);
  }, [pathname]);

  let contenido;
  if (matchPrograma) {
    contenido = <ProgramPage id={decodeURIComponent(matchPrograma[1])} />;
  } else if (matchTema) {
    contenido = <ThemePage id={decodeURIComponent(matchTema[1])} />;
  } else {
    contenido = <Home />;
  }

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-lima focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-noche"
      >
        Saltar al contenido
      </a>
      <div role="status" aria-live="polite" className="sr-only">
        {anuncio}
      </div>
      {contenido}
    </>
  );
}

function Home() {
  const [introDone, setIntroDone] = useState(introYaVista);

  useEffect(() => {
    document.title = "Código.IA · El programa que te ayuda a no estar re perdido con la IA";
  }, []);

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
          <main id="contenido" tabIndex={-1} className="pt-20 outline-none sm:pt-24">
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
