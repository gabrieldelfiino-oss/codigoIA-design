import { formatTiempo } from "../../servicios/citas";

const VELOCIDADES = [0.75, 1, 1.25, 1.5, 2];
const BTN =
  "border-2 border-gris/40 px-3 py-2 font-mono text-xs text-gris transition-colors hover:border-lima hover:text-lima";

/**
 * Tabs de reproducción (−15 · play · +15 · tiempo · velocidad · ficha).
 * Presentacional: quien la use maneja el estado del reproductor.
 */
export default function ControlesReproduccion({
  etiqueta,
  actual = 0,
  duracion = 0,
  reproduciendo = false,
  velocidad = 1,
  onAtras,
  onToggle,
  onAdelante,
  onVelocidad,
  onFicha,
  onCerrar,
}) {
  return (
    <div className="grid gap-3 border-2 border-lima bg-noche p-4 text-gris">
      <div className="flex items-center justify-between gap-3 font-mono text-xs uppercase tracking-wider">
        <span className="truncate">
          <span className="text-lima">{etiqueta}</span>
        </span>
        {onCerrar && (
          <button type="button" onClick={onCerrar} aria-label="Cerrar" className={BTN}>
            ✕
          </button>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={onAtras} className={BTN}>−15</button>
        <button
          type="button"
          onClick={onToggle}
          aria-label={reproduciendo ? "Pausar" : "Reproducir"}
          className={BTN}
        >
          {reproduciendo ? "❚❚" : "▶"}
        </button>
        <button type="button" onClick={onAdelante} className={BTN}>+15</button>
        <span className="font-mono text-xs">
          {formatTiempo(actual)} / {formatTiempo(duracion)}
        </span>
      </div>
      <div className="flex items-center gap-3 font-mono text-xs uppercase">
        <label className="flex items-center gap-2">
          Vel.
          <select
            value={velocidad}
            onChange={(e) => onVelocidad?.(Number(e.target.value))}
            className="border-2 border-gris/40 bg-noche px-2 py-1 text-gris"
          >
            {VELOCIDADES.map((v) => (
              <option key={v} value={v}>{v}×</option>
            ))}
          </select>
        </label>
        {onFicha && (
          <button type="button" onClick={onFicha} className={`${BTN} ml-auto`}>
            Ficha
          </button>
        )}
      </div>
    </div>
  );
}
