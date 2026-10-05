/**
 * Chip chiquito para mostrar una persona asociada a un programa
 * (ej. "Camila Jurfest (psicóloga, sexóloga clínica)").
 * Se usa en SeasonSection, AditionalSection y RadioSection.
 */
export default function PersonBadge({ children }) {
  return (
    <span className="border border-current px-3 py-1 font-mono text-[11px] uppercase tracking-wide sm:text-xs">
      {children}
    </span>
  )
}
