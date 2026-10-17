import { useEffect, useMemo, useRef, useState } from "react";
import { buscar } from "../../servicios/buscar";
import { navigate } from "../../servicios/router";

const ETIQUETA_TIPO = { tema: "/Tema", programa: "/Programa", invitado: "/Invitado" };

function LupaIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4-4" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Buscador del header: escribe y aparece una lista con temas, programas e
 * invitados que coinciden (ver utils/buscar.js). Flechas ↑↓ para moverse,
 * Enter para abrir (el primero si no se eligió ninguno) y Esc para cerrar.
 */
export default function SearchBar() {
  const [texto, setTexto] = useState("");
  const [abierto, setAbierto] = useState(false);
  const [indice, setIndice] = useState(-1);
  const [pasando, setPasando] = useState(false);
  const [enfocado, setEnfocado] = useState(false);
  const raiz = useRef(null);
  const campo = useRef(null);

  const resultados = useMemo(() => buscar(texto), [texto]);
  const hayConsulta = texto.trim().length >= 2;

  // Cierra la lista al tocar fuera del buscador.
  useEffect(() => {
    const alTocar = (event) => {
      if (!raiz.current?.contains(event.target)) setAbierto(false);
    };
    document.addEventListener("pointerdown", alTocar);
    return () => document.removeEventListener("pointerdown", alTocar);
  }, []);

  const cerrar = () => {
    setAbierto(false);
    setIndice(-1);
  };

  const ir = (resultado) => {
    navigate(resultado.to);
    setTexto("");
    cerrar();
    campo.current?.blur();
  };

  const alTeclear = (event) => {
    if (event.key === "ArrowDown" && resultados.length > 0) {
      event.preventDefault();
      setAbierto(true);
      setIndice((i) => (i + 1) % resultados.length);
    } else if (event.key === "ArrowUp" && resultados.length > 0) {
      event.preventDefault();
      setIndice((i) => (i <= 0 ? resultados.length - 1 : i - 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const elegido = resultados[indice >= 0 ? indice : 0];
      if (elegido) ir(elegido);
    } else if (event.key === "Escape") {
      cerrar();
      campo.current?.blur();
    }
  };

  // En reposo solo se ve la lupa; la barra se despliega al pasar el cursor, al
  // enfocarla (teclado o toque en la lupa) o mientras haya texto escrito.
  const expandido = pasando || enfocado || texto.length > 0;

  return (
    <div
      ref={raiz}
      role="search"
      className={`relative transition-[width] duration-300 ease-out ${expandido ? "w-[min(16rem,58vw)]" : "w-10"}`}
      onPointerEnter={(e) => e.pointerType === "mouse" && setPasando(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setPasando(false)}
      onFocus={() => setEnfocado(true)}
      onBlur={() => setEnfocado(false)}
    >
      <label
        className={`flex h-10 cursor-text items-center rounded-full border text-gris transition-[border-color,background-color,padding] duration-300 hover:border-lima ${
          expandido ? "gap-2 border-gris/30 bg-gris/5 px-4" : "justify-center border-gris/30 px-0 hover:bg-gris/10"
        } focus-within:border-lima`}
      >
        <LupaIcon />
        <span className="sr-only">Buscar un programa, tema o invitado</span>
        <input
          ref={campo}
          type="search"
          value={texto}
          placeholder="Busca algo..."
          role="combobox"
          aria-expanded={abierto && hayConsulta}
          aria-controls="resultados-busqueda"
          autoComplete="off"
          onChange={(event) => {
            setTexto(event.target.value);
            setAbierto(true);
            setIndice(-1);
          }}
          onFocus={() => setAbierto(true)}
          onKeyDown={alTeclear}
          className={`min-w-0 bg-transparent font-mono text-xs tracking-wide text-gris outline-none transition-opacity duration-300 placeholder:text-gris/50 [&::-webkit-search-cancel-button]:hidden ${
            expandido ? "flex-1 opacity-100" : "w-0 opacity-0"
          }`}
        />
      </label>

      {abierto && hayConsulta && (
        <ul
          id="resultados-busqueda"
          role="listbox"
          className="absolute right-0 top-full z-10 mt-2 max-h-[70vh] w-80 max-w-[calc(100vw-3rem)] overflow-y-auto rounded-2xl border border-gris/20 bg-noche shadow-[0_24px_50px_-20px_rgba(0,0,0,0.6)]"
        >
          {resultados.length === 0 ? (
            <li className="px-4 py-3 text-sm text-gris/70">
              Sin resultados para «{texto.trim()}»
            </li>
          ) : (
            resultados.map((resultado, i) => (
              <li key={`${resultado.tipo}-${resultado.id}`} role="option" aria-selected={i === indice}>
                <a
                  href={resultado.to}
                  onClick={(event) => {
                    event.preventDefault();
                    ir(resultado);
                  }}
                  onMouseEnter={() => setIndice(i)}
                  className={[
                    "block px-4 py-2.5 transition-colors",
                    i === indice ? "bg-lima text-noche" : "text-gris",
                  ].join(" ")}
                >
                  <span className="block font-mono text-[10px] uppercase tracking-widest opacity-70">
                    {ETIQUETA_TIPO[resultado.tipo]}
                    {resultado.detalle ? ` · ${resultado.detalle}` : ""}
                  </span>
                  <span className="block truncate text-sm font-medium">
                    {resultado.titulo}
                  </span>
                </a>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
