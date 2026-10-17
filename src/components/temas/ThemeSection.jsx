import ThemeMap from "./ThemeMap";
import RouterLink from "../utils/RouterLink";
import { TEMAS } from "../../servicios/temas";

// Un punto de color de la paleta por chip, rotando.
const PUNTOS = ["bg-lila", "bg-lima", "bg-naranja", "bg-azul"];

/**
 * Sección "Temas" de la home, sobre fondo gris: el título, el mapa de nodos
 * (pantallas grandes) y, en pantallas chicas, una lista de chips con los
 * mismos temas. Cada nodo/chip lleva a /temas/:id.
 */
export default function ThemeSection() {
  const temas = TEMAS.filter((t) => t.tipo === "tema");

  return (
    <section id="temas" className="seccion-curva bg-gris text-noche">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-azul">/Mapa de temas</p>
        <h2 className="max-w-4xl font-display text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl">
          Todo se conecta con la <span className="text-azul">IA</span>
        </h2>
        <p className="mt-4 max-w-xl text-base text-noche/75">
          <span className="hidden lg:inline">
            Pasá el cursor o tabulá por un nodo para iluminar sus caminos. Hacé
            clic en cualquiera para ver los programas de ese tema.
          </span>
          <span className="lg:hidden">Elegí un tema para ver los programas que lo tocan.</span>
        </p>

        <div className="mt-10 hidden overflow-hidden rounded-3xl shadow-suave-lg lg:block">
          <ThemeMap />
        </div>

        <ul className="mt-10 flex flex-wrap gap-3 lg:hidden">
          {temas.map((t, i) => (
            <li key={t.id}>
              <RouterLink
                to={`/temas/${t.id}`}
                className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-noche/10 bg-white px-5 py-2 text-base font-medium shadow-suave transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span aria-hidden className={`h-2.5 w-2.5 rounded-full ${PUNTOS[i % PUNTOS.length]}`} />
                {t.nombre}
              </RouterLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
