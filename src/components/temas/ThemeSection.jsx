import ThemeMap from "./ThemeMap";

/**
 * Sección "Temas" de la home, sobre fondo blanco: el título, el mapa de nodos
 * (solo en pantallas grandes). Cada nodo lleva
 * a /temas/:id.
 */
export default function ThemeSection() {
  return (
    <section id="temas" className="bg-white text-noche">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 sm:py-20">
        <p className="mb-4 inline-block bg-noche px-3 py-1 font-mono text-xs uppercase tracking-widest text-lima">
          /Mapa de temas
        </p>
        <h2 className="max-w-4xl font-display text-4xl font-semibold leading-[1] tracking-tight sm:text-6xl">
          Todo se conecta con la{" "}
          <span className="bg-lima px-2 text-noche">IA</span>
        </h2>
        <p className="mt-5 max-w-2xl text-base text-noche/80 sm:text-lg">
          Pasá el cursor o tabulá por un nodo para iluminar sus caminos. Hacé
          clic en cualquiera para ver los programas de ese tema.
        </p>

        <div className="mt-10 hidden lg:block">
          <ThemeMap />
        </div>
      </div>
    </section>
  );
}
