import { getYoutubeThumbnail } from '../../utils/youtube'
import Isotipo from '../utils/Isotipo'

const CANAL = 'Código IA'

function PlayIcon() {
  return (
    <svg viewBox="0 0 68 48" className="h-10 w-14 drop-shadow-lg sm:h-12 sm:w-16">
      <rect x="0" y="0" width="68" height="48" rx="0" fill="#FF0000" fillOpacity="0.92" />
      <path d="M27 15l18 9-18 9V15z" fill="#fff" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 9V5l7 7-7 7v-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.3A2.7 2.7 0 0 0 2.4 7.2 28 28 0 0 0 2 12a28 28 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9C6 19 12 19 12 19s6 0 7.7-.3a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.8ZM10 15V9l5 3-5 3Z" />
    </svg>
  )
}

/**
 * Grilla de miniaturas que llevan directo al video en YouTube, con la
 * típica sobre-capa de "preview" (título + canal arriba, play en el medio,
 * compartir / ver más tarde abajo a la izq., "Ver en YouTube" abajo a la der.).
 * Sin estado de selección: cada card es un link real, no un tab.
 */
export default function AditionalTabs({ items }) {
  return (
    <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
      {items.map((item) => {
        const thumb = item.linkYoutube ? getYoutubeThumbnail(item.linkYoutube, 'maxresdefault') : null
        const disabled = !item.linkYoutube

        const content = (
          <div className="relative aspect-video w-full overflow-hidden border-2 border-naranja bg-noche transition-all duration-300 group-hover:shadow-[6px_6px_0_0_#FF6B3B]">
            {thumb ? (
              <img
                src={thumb}
                alt={item.titulo}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-gris/40">
                Video no disponible
              </div>
            )}

            {/* Franja superior: logo + título + canal */}
            <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-noche/90 via-noche/40 to-transparent p-3 sm:p-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-lima p-1 text-noche sm:h-8 sm:w-8"><Isotipo className="h-full w-full" /></span>
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-medium text-gris sm:text-base">{item.titulo}</p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-gris/70 sm:text-xs">{CANAL}</p>
                </div>
              </div>
            </div>

            {/* Play central */}
            {!disabled && (
              <div className="absolute inset-0 flex items-center justify-center opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                <PlayIcon />
              </div>
            )}

            {/* Franja inferior: compartir / reloj + "Ver en YouTube" */}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-noche/90 via-noche/30 to-transparent p-3 sm:p-4">
              <div className="flex items-center gap-2 text-gris">
                <span className="bg-noche/70 p-1.5">
                  <ShareIcon />
                </span>
                <span className="bg-noche/70 p-1.5">
                  <ClockIcon />
                </span>
              </div>
              {!disabled && (
                <span className="flex items-center gap-1.5 border-2 border-gris bg-noche/70 px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-wider text-gris transition-colors group-hover:border-lima group-hover:text-lima sm:text-xs">
                  <YoutubeIcon />
                  Ver en YouTube
                </span>
              )}
            </div>
          </div>
        )

        if (disabled) {
          return (
            <div key={item.id} className="group cursor-default">
              {content}
            </div>
          )
        }

        return (
          <a
            key={item.id}
            href={item.linkYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            {content}
          </a>
        )
      })}
    </div>
  )
}
