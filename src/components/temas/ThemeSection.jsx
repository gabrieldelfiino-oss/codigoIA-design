import ThemeMap from "./ThemeMap";
import RouterLink from "../utils/RouterLink";
import { TEMAS } from "../../servicios/temas";

// Un color de la paleta por chip, rotando (las clases van completas para Tailwind).
const CHIPS = ["bg-lila", "bg-lima", "bg-naranja", "bg-white"];

/**
 * Sección "Temas" de la home, sobre fondo gris con grilla: el título, el mapa
 * de nodos (pantallas grandes) y, en pantallas chicas, una lista de chips con
 * los mismos temas. Cada nodo/chip lleva a /temas/:id.
 */
export default function ThemeSection() {
  const temas = TEMAS.filter((t) => t.tipo === "tema");

  return (
    <section id="temas" className="relative overflow-hidden border-b-2 border-noche bg-gris bg-grid-gris text-noche">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-24">
        <p className="mb-5 inline-block border-2 border-noche bg-noche px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-lima">
          /Mapa de temas
        </p>
        <h2 className="max-w-4xl font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-7xl">
          Todo se conecta con la{" "}
          <span className="resaltado bg-lima">IA</span>
        </h2>
        <p className="mt-6 max-w-2xl text-base text-noche/80 sm:text-lg">
          <span className="hidden lg:inline">
            Pasá el cursor o tabulá por un nodo para iluminar sus caminos. Hacé
            clic en cualquiera para ver los programas de ese tema.
          </span>
          <span className="lg:hidden">
            Elegí un tema para ver los programas que lo tocan.
          </span>
        </p>

        <div className="mt-12 hidden border-2 border-noche shadow-[10px_10px_0_0_#C172FF] lg:block">
          <ThemeMap />
        </div>

        <ul className="mt-10 flex flex-wrap gap-3 lg:hidden">
          {temas.map((t, i) => (
            <li key={t.id}>
              <RouterLink
                to={`/temas/${t.id}`}
                className={`btn-brutal inline-flex min-h-11 items-center px-4 py-2 font-display text-lg font-semibold uppercase tracking-tight text-noche ${CHIPS[i % CHIPS.length]}`}
              >
                {t.nombre}
              </RouterLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
