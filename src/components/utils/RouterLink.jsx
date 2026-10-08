import { navigate } from "../../utils/router";

/**
 * Como un <a> normal (se puede abrir en pestaña nueva, copiar el link,
 * etc.), pero en un click "normal" navega sin recargar toda la página,
 * usando el router mínimo de utils/router.js.
 */
export default function RouterLink({ to, children, onClick, ...rest }) {
  return (
    <a
      href={to}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }
        event.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
