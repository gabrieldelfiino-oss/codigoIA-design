/**
 * Chip chiquito para mostrar una persona asociada a un programa
 * (ej. "Camila Jurfest"). Se usa en ThemeSection y ProgramPage.
 */
export default function PersonBadge({ children }) {
  return (
    <span className="border border-current px-3 py-1 font-mono text-[11px] uppercase tracking-wide sm:text-xs">
      {children}
    </span>
  )
}
