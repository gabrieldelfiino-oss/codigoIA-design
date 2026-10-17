import Isotipo from "./Isotipo";
import RouterLink from "./RouterLink";

/**
 * Cabecera simple de las páginas de segundo nivel (ficha de programa, página
 * de tema): isotipo que lleva a la home y, si `conVolver`, botón "← Volver".
 */
export default function PageHeader({ conVolver = true }) {
  return (
    <header className="flex items-center justify-between px-6 py-5 sm:px-10">
      <RouterLink to="/" aria-label="Volver al inicio" className="text-gris">
        <Isotipo className="h-8 w-8 sm:h-9 sm:w-9" />
      </RouterLink>
      {conVolver && (
      <RouterLink
        to="/"
        className="border-2 border-gris px-4 py-2 font-mono text-xs font-medium uppercase tracking-wider text-gris transition-colors duration-300 hover:border-lima hover:bg-lima hover:text-noche sm:text-sm"
      >
        ← Volver
      </RouterLink>
      )}
    </header>
  );
}
