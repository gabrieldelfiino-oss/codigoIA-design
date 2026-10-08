import programas from "../../data/programas.json";
import { getYoutubeEmbedUrl } from "../../utils/youtube";
import Isotipo from "../utils/Isotipo";
import PersonBadge from "../utils/PersonBadge";
import RouterLink from "../utils/RouterLink";

/**
 * Página de un programa individual (un "nivel de profundidad" nuevo:
 * /programa/:id). Por ahora muestra, sin curar, todos los campos que tiene
 * ese programa en programas.json. A donde se llega al tocar una tarjeta en
 * AllSection (antes esas tarjetas llevaban directo a YouTube).
 */
export default function ProgramPage({ id }) {
  const programa = programas.find((p) => p.id === id);

  return (
    <div className="min-h-screen w-full bg-noche bg-grid-azul">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <RouterLink to="/" aria-label="Volver al inicio" className="text-gris">
          <Isotipo className="h-8 w-8 sm:h-9 sm:w-9" />
        </RouterLink>
        <RouterLink
          to="/"
          className="border-2 border-gris px-4 py-2 font-mono text-xs font-medium uppercase tracking-wider text-gris transition-colors duration-300 hover:border-lima hover:bg-lima hover:text-noche sm:text-sm"
        >
          ← Volver
        </RouterLink>
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-24 pt-6 sm:px-10">
        {!programa ? (
          <div className="py-24 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-lima">
              /No encontrado
            </p>
            <h1 className="mt-4 font-display text-3xl font-medium text-gris sm:text-5xl">
              No encontramos ese programa
            </h1>
            <RouterLink
              to="/"
              className="mt-8 inline-block border-2 border-gris px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-gris transition-colors duration-300 hover:border-lima hover:bg-lima hover:text-noche sm:text-sm"
            >
              Volver al inicio
            </RouterLink>
          </div>
        ) : (
          <>
            <p className="mb-4 inline-block bg-lima px-3 py-1 font-mono text-xs uppercase tracking-widest text-noche">
              /{programa.temporada}
            </p>
            <h1 className="font-display text-3xl font-medium leading-[1.05] text-gris sm:text-5xl">
              {programa.titulo}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-gris/80 sm:text-lg">
              {programa.subtitulo}
            </p>

            <div className="mt-8 aspect-video w-full overflow-hidden border-2 border-gris/20 bg-noche">
              {programa.linkYoutube ? (
                <iframe
                  src={getYoutubeEmbedUrl(programa.linkYoutube)}
                  title={programa.titulo}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gris/40">
                  Video no disponible
                </div>
              )}
            </div>

            {/* Todo lo que tiene este programa en el JSON, sin curar por
                ahora: id, temporada, tema y los links. */}
            <dl className="mt-10 grid gap-6 border-t-2 border-gris/10 pt-8 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-lima">
                  Id
                </dt>
                <dd className="mt-1 text-gris">{programa.id}</dd>
              </div>

              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-lima">
                  Temporada
                </dt>
                <dd className="mt-1 text-gris">{programa.temporada}</dd>
              </div>

              {programa.tema && (
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-lima">
                    Tema
                  </dt>
                  <dd className="mt-1 capitalize text-gris">{programa.tema}</dd>
                </div>
              )}

              {programa.linkYoutube && (
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-lima">
                    YouTube
                  </dt>
                  <dd className="mt-1 break-all">
                    <a
                      href={programa.linkYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gris underline decoration-lima underline-offset-4 hover:text-lima"
                    >
                      {programa.linkYoutube}
                    </a>
                  </dd>
                </div>
              )}

              {programa.linkInstagram && (
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-lima">
                    Instagram
                  </dt>
                  <dd className="mt-1 break-all">
                    <a
                      href={programa.linkInstagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gris underline decoration-lima underline-offset-4 hover:text-lima"
                    >
                      {programa.linkInstagram}
                    </a>
                  </dd>
                </div>
              )}
            </dl>

            {programa.personalidad?.length > 0 && (
              <div className="mt-10">
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-lima">
                  /Participan
                </p>
                <div className="flex flex-wrap gap-2 text-gris">
                  {programa.personalidad.map((persona) => (
                    <PersonBadge key={persona}>{persona}</PersonBadge>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
