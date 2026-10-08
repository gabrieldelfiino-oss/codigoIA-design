import { useEffect, useState } from "react";

/**
 * Router mínimo casero, sin librerías externas (no hay react-router
 * instalado). Sigue window.location.pathname y se actualiza solo con la
 * navegación nativa del navegador (atrás/adelante) o llamando a
 * `navigate()`, que empuja al historial sin recargar la página.
 */
export function useRoute() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return pathname;
}

export function navigate(path) {
  if (path === window.location.pathname) return;
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}
